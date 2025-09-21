const fs = require('fs-extra');
const path = require('path');
const TurndownService = require('turndown');
const https = require('https');
const axios = require('axios');
const { getEmojiWithSpace } = require('../utils/emoji');

// Polyfill fetch for Node.js environments that don't have it
if (typeof fetch === 'undefined') {
  global.fetch = function(url, options = {}) {
    return new Promise((resolve, reject) => {
      const req = https.request(url, {
        method: options.method || 'GET',
        headers: options.headers || {}
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            json: () => Promise.resolve(JSON.parse(data)),
            text: () => Promise.resolve(data)
          });
        });
      });
      req.on('error', reject);
      if (options.body) req.write(options.body);
      req.end();
    });
  };
}

class VideoTutorialScraper {
  constructor() {
    this.outputDir = path.join(__dirname, '../../content/videos');
    this.expiredDir = path.join(__dirname, '../../content/videos/expired');
    this.turndown = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-'
    });
    this.stats = {
      channels: 0,
      videos: 0,
      playlists: 0,
      expired: 0,
      updated: 0,
      errors: 0,
      transcripts: 0,
      transcriptsFailed: 0
    };

    // YouTube API configuration
    this.youtubeApiKey = process.env.YOUTUBE_API_KEY || 'AIzaSyDjHgwNxPf5ss4Lg2QnP8MFgEQ2p57fdW0';
    this.youtubeApiBase = 'https://www.googleapis.com/youtube/v3';
    
    // Video freshness configuration
    this.freshnessConfig = {
      maxAgeMonths: 6,           // Videos older than 6 months are flagged
      warningAgeMonths: 4,       // Videos 4-6 months old get warning
      criticalTopics: [          // These topics have shorter freshness windows
        'api v2', 'oauth', 'marketplace', 'new features', 'updates'
      ],
      criticalMaxAgeMonths: 3,   // Critical topics expire after 3 months
      evergreen: [               // These topics don't expire
        'basic setup', 'fundamentals', 'getting started', 'intro'
      ]
    };
    
    // Focus on official GoHighLevel channel for last 180 days
    this.videoSources = [
      {
        type: 'youtube_channel',
        name: 'GoHighLevel Official - Last 180 Days',
        urls: [
          'https://www.youtube.com/@gohighlevel/videos'
        ],
        channelHandle: '@gohighlevel',
        daysBack: 180,
        searchTerms: ['api', 'tutorial', 'training', 'update', 'new', 'feature', 'guide'],
        priority: 'high'
      },
      {
        type: 'platform_videos',
        name: 'GHL Support Portal Embedded',
        urls: [
          'https://help.gohighlevel.com/support/solutions/folders/48000668553',
          'https://help.gohighlevel.com/support/solutions/articles/48001060529-highlevel-api'
        ]
      }
    ];
  }


  async scrape() {
    console.log(`${getEmojiWithSpace('🎥', 'STARTING')}Starting Video Tutorial extraction with transcript support...`);
    await fs.ensureDir(this.outputDir);
    await fs.ensureDir(this.expiredDir);

    // First, clean up expired videos
    await this.cleanupExpiredVideos();

    try {
      for (const source of this.videoSources) {
        try {
          console.log(`${getEmojiWithSpace('🎬', 'PROCESSING')}Processing ${source.name}...`);

          if (source.type === 'youtube_channel') {
            await this.scrapeYouTubeChannelHttp(source);
          } else if (source.type === 'youtube_search') {
            await this.scrapeYouTubeSearchHttp(source);
          } else if (source.type === 'platform_videos') {
            await this.scrapePlatformVideosHttp(source);
          }

          await this.delay(2000); // Rate limiting
        } catch (error) {
          console.error(`❌ Error processing ${source.name}:`, error.message);
          this.stats.errors++;
        }
      }

      // Generate index
      await this.generateIndex();

      console.log(`${getEmojiWithSpace('✅', 'SUCCESS')}Video extraction complete: ${this.stats.videos} videos, ${this.stats.transcripts} transcripts`);

    } catch (error) {
      console.error('❌ Video extraction error:', error);
      this.stats.errors++;
    }

    return this.stats;
  }

  async fetchAllVideosFromAPI(channelHandle, publishedAfter) {
    const allVideos = [];
    let pageToken = null;
    const channelId = 'UCXFiV4qDX5ipE-DQcsm1j4g'; // @gohighlevel channel ID

    try {
      console.log(`    🔄 Fetching ALL videos from channel (no date filtering in API)...`);

      do {
        const url = new URL(`${this.youtubeApiBase}/search`);
        url.searchParams.set('part', 'snippet');
        url.searchParams.set('channelId', channelId);
        url.searchParams.set('order', 'date');
        url.searchParams.set('type', 'video');
        url.searchParams.set('maxResults', '50');
        // REMOVED: publishedAfter filter to get more results
        url.searchParams.set('key', this.youtubeApiKey);

        if (pageToken) {
          url.searchParams.set('pageToken', pageToken);
        }

        console.log(`    🔄 Fetching page ${Math.floor(allVideos.length / 50) + 1} of videos...`);
        const response = await axios.get(url.toString());
        const data = response.data;

        console.log(`    📊 API Response: ${data.items?.length || 0} items, totalResults: ${data.pageInfo?.totalResults}, nextPageToken: ${data.nextPageToken ? 'present' : 'none'}`);

        if (data.items && data.items.length > 0) {
          for (const item of data.items) {
            allVideos.push({
              id: item.id.videoId,
              title: item.snippet.title,
              url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
              thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
              publishedDate: new Date(item.snippet.publishedAt),
              description: item.snippet.description,
              publishedText: item.snippet.publishedAt
            });
          }
        }

        pageToken = data.nextPageToken;
        console.log(`    📄 Page ${Math.floor(allVideos.length / 50)} complete: +${data.items?.length || 0} videos, running total: ${allVideos.length}`);

        // Safety limit to prevent infinite loops (raised for comprehensive extraction)
        if (allVideos.length > 1200) {
          console.log(`    ⚠️  Hit safety limit of 1200 videos`);
          break;
        }

      } while (pageToken);

      console.log(`    ✅ Pagination complete: ${allVideos.length} total videos extracted`);

      // Step 3: Filter by date client-side (more reliable than API filtering)
      const cutoffDate = new Date(publishedAfter);
      const filteredVideos = allVideos.filter(video => video.publishedDate >= cutoffDate);

      console.log(`    🗓️  Date filtering: ${filteredVideos.length} videos after ${cutoffDate.toLocaleDateString()} (${allVideos.length - filteredVideos.length} filtered out)`);

      return filteredVideos;
    } catch (error) {
      console.error(`API fetch error:`, error.message);
      return [];
    }
  }

  async scrapeYouTubeChannelHttp(source) {
    try {
      console.log(`  ${getEmojiWithSpace('📺', 'SCRAPING')}Fetching YouTube videos via API: ${source.channelHandle}`);

      // Calculate cutoff date for filtering (proper 6-month calculation)
      const cutoffDate = new Date();
      cutoffDate.setMonth(cutoffDate.getMonth() - 6); // Proper 6-month period
      const publishedAfter = cutoffDate.toISOString();

      console.log(`    📅 Extracting videos published after: ${publishedAfter} (6 months ago)`);

      // Get all videos from YouTube Data API with pagination
      const videos = await this.fetchAllVideosFromAPI(source.channelHandle, publishedAfter);
      console.log(`    📑 Found ${videos.length} videos`);

      // All videos are already filtered by date from API
      const filteredVideos = videos;
      console.log(`    📅 ${filteredVideos.length} videos within last ${source.daysBack || 180} days`);

      // All videos from official GoHighLevel channel are relevant
      const relevantVideos = filteredVideos;
      console.log(`    🎯 ${relevantVideos.length} relevant videos`);

      // Enrich and save video metadata with transcripts
      for (const video of relevantVideos) {
        const enrichedVideo = await this.enrichVideoMetadata(video, source.name);
        if (enrichedVideo && !this.isVideoExpired(enrichedVideo)) {
          // Extract transcript for this video
          const transcript = await this.extractTranscript(enrichedVideo.id);
          enrichedVideo.transcript = transcript;
          await this.saveVideoMetadata(enrichedVideo, source.name);
        } else if (enrichedVideo) {
          await this.moveToExpired(enrichedVideo, 'Age limit exceeded');
        }
      }

      this.stats.videos += relevantVideos.length;

    } catch (error) {
      console.error(`    ❌ Error scraping API:`, error.message);
      this.stats.errors++;
    }

    this.stats.channels++;
  }

  extractVideosFromHtml(htmlContent) {
    const videos = [];

    // YouTube uses various patterns for video links, try multiple approaches
    const videoPatterns = [
      /href="\/watch\?v=([^"&]+)"[^>]*>[\s\S]*?aria-label="([^"]+)"/g,
      /"videoId":"([^"]+)"[\s\S]*?"title":{"runs":\[{"text":"([^"]+)"/g,
      /"watchEndpoint":{"videoId":"([^"]+)"}[\s\S]*?"text":"([^"]+)"/g
    ];

    for (const pattern of videoPatterns) {
      let match;
      while ((match = pattern.exec(htmlContent)) !== null) {
        const videoId = match[1];
        const title = match[2];

        if (videoId && title && !videos.find(v => v.id === videoId)) {
          videos.push({
            id: videoId,
            title: title.replace(/\\u0026/g, '&').replace(/\\"/g, '"'),
            url: `https://www.youtube.com/watch?v=${videoId}`,
            thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            publishedText: '' // Will be enriched later
          });
        }
      }
    }

    return videos.slice(0, 50); // Limit to avoid overwhelming
  }

  async scrapeYouTubeSearchHttp(source) {
    // For now, focus on channel extraction. Search can be added later.
    console.log(`  ${getEmojiWithSpace('⚠️', 'SKIP')}YouTube search not implemented in HTTP mode yet`);
  }

  async scrapePlatformVideosHttp(source) {
    for (const url of source.urls) {
      try {
        console.log(`  📖 Scraping platform videos: ${url}`);

        const response = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          },
          timeout: 30000
        });

        const htmlContent = response.data;

        // Look for embedded YouTube videos
        const embeddedVideos = this.extractEmbeddedVideos(htmlContent, url);

        console.log(`    📑 Found ${embeddedVideos.length} embedded videos`);

        // Save video metadata with transcripts
        for (const video of embeddedVideos) {
          const transcript = await this.extractTranscript(video.id);
          video.transcript = transcript;
          await this.saveVideoMetadata(video, source.name);
        }

        this.stats.videos += embeddedVideos.length;

      } catch (error) {
        console.error(`    ❌ Error scraping platform videos from ${url}:`, error.message);
        this.stats.errors++;
      }
    }
  }

  extractEmbeddedVideos(htmlContent, sourceUrl) {
    const videos = [];
    const iframePattern = /<iframe[^>]+src="[^"]*youtube\.com\/embed\/([^"?]+)[^"]*"[^>]*>/g;

    let match;
    while ((match = iframePattern.exec(htmlContent)) !== null) {
      const videoId = match[1];

      if (videoId) {
        // Try to find title from surrounding content
        const titlePattern = /<h[1-6][^>]*>([^<]+)<\/h[1-6]>/gi;
        const titleMatch = htmlContent.match(titlePattern);
        const title = titleMatch ? titleMatch[0].replace(/<[^>]+>/g, '').trim() : `GHL Tutorial - ${videoId}`;

        videos.push({
          id: videoId,
          title: title,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          embeddedIn: sourceUrl
        });
      }
    }

    return videos;
  }

  // YouTube API Methods for Transcript Extraction
  async extractTranscript(videoId) {
    try {
      console.log(`    ${getEmojiWithSpace('📝', 'TRANSCRIPT')}Checking transcript availability for ${videoId}...`);

      // Step 1: Get available captions (this works with API key)
      const captionsUrl = `${this.youtubeApiBase}/captions?part=snippet&videoId=${videoId}&key=${this.youtubeApiKey}`;
      const captionsResponse = await axios.get(captionsUrl);

      if (!captionsResponse.data.items || captionsResponse.data.items.length === 0) {
        console.log(`    ${getEmojiWithSpace('⚠️', 'NO_CAPTIONS')}No captions available for ${videoId}`);
        this.stats.transcriptsFailed++;
        return null;
      }

      // Step 2: Find the best caption track (prefer English, then auto-generated)
      const captions = captionsResponse.data.items;
      let bestCaption = captions.find(cap => cap.snippet.language === 'en' && cap.snippet.trackKind !== 'asr') ||
                       captions.find(cap => cap.snippet.language === 'en') ||
                       captions[0];

      if (!bestCaption) {
        console.log(`    ${getEmojiWithSpace('⚠️', 'NO_SUITABLE')}No suitable captions found for ${videoId}`);
        this.stats.transcriptsFailed++;
        return null;
      }

      // Step 3: Try to download transcript (requires OAuth2, will likely fail)
      try {
        const transcriptUrl = `${this.youtubeApiBase}/captions/${bestCaption.id}?tfmt=srt&key=${this.youtubeApiKey}`;
        const transcriptResponse = await axios.get(transcriptUrl);

        // Step 4: Parse and clean the SRT content
        const cleanTranscript = this.parseSrtToText(transcriptResponse.data);

        console.log(`    ${getEmojiWithSpace('✅', 'SUCCESS')}Transcript extracted (${cleanTranscript.length} chars)`);
        this.stats.transcripts++;

        return {
          language: bestCaption.snippet.language,
          trackKind: bestCaption.snippet.trackKind,
          name: bestCaption.snippet.name,
          text: cleanTranscript,
          wordCount: cleanTranscript.split(/\s+/).length
        };

      } catch (downloadError) {
        // OAuth2 required for transcript download - provide metadata instead
        console.log(`    ${getEmojiWithSpace('⚠️', 'OAUTH_REQUIRED')}Transcript download requires OAuth2, providing metadata only`);
        this.stats.transcriptsFailed++;

        return {
          language: bestCaption.snippet.language,
          trackKind: bestCaption.snippet.trackKind,
          name: bestCaption.snippet.name,
          text: null,
          wordCount: 0,
          available: true,
          requiresAuth: true,
          captionId: bestCaption.id
        };
      }

    } catch (error) {
      console.log(`    ${getEmojiWithSpace('❌', 'FAILED')}Transcript check failed for ${videoId}: ${error.message}`);
      this.stats.transcriptsFailed++;
      return null;
    }
  }

  parseSrtToText(srtContent) {
    if (!srtContent || typeof srtContent !== 'string') {
      return '';
    }

    // Remove SRT timestamps and formatting
    const lines = srtContent.split('\n');
    const textLines = [];

    for (const line of lines) {
      const trimmed = line.trim();
      // Skip empty lines, sequence numbers, and timestamp lines
      if (trimmed &&
          !trimmed.match(/^\d+$/) &&
          !trimmed.match(/^\d{2}:\d{2}:\d{2}/) &&
          !trimmed.includes('-->')) {
        // Clean up HTML entities and formatting
        const cleaned = trimmed
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/<[^>]+>/g, '') // Remove HTML tags
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();

        if (cleaned) {
          textLines.push(cleaned);
        }
      }
    }

    return textLines.join(' ').trim();
  }



  async saveVideoMetadata(video, source) {
    try {
      const videoData = {
        id: video.id,
        title: video.title,
        url: video.url,
        thumbnail: video.thumbnail,
        source: source,
        embeddedIn: video.embeddedIn || null,
        extractedAt: new Date().toISOString(),
        publishedDate: video.publishedDate,
        freshnessStatus: video.freshnessStatus,
        contentCategory: video.contentCategory,
        category: 'video-tutorial',
        type: 'youtube',
        transcript: video.transcript
      };

      // Create enhanced markdown content with freshness indicators and transcripts
      const publishedDateStr = video.publishedDate ? video.publishedDate.toISOString() : 'unknown';
      const freshnessStatus = video.freshnessStatus || { status: 'unknown', message: 'Date not available' };

      // Add visual freshness indicator
      let freshnessEmoji = '❓';
      switch (freshnessStatus.status) {
        case 'fresh': freshnessEmoji = '🟢'; break;
        case 'warning': freshnessEmoji = '🟡'; break;
        case 'expired': freshnessEmoji = '🔴'; break;
      }

      // Add transcript information to frontmatter
      const transcriptInfo = video.transcript ? {
        hasTranscript: video.transcript.available || !!video.transcript.text,
        transcriptLanguage: video.transcript.language,
        transcriptType: video.transcript.trackKind,
        wordCount: video.transcript.wordCount,
        requiresAuth: video.transcript.requiresAuth || false,
        available: video.transcript.available || false
      } : {
        hasTranscript: false,
        transcriptLanguage: 'none',
        transcriptType: 'none',
        wordCount: 0,
        requiresAuth: false,
        available: false
      };

      const frontmatter = `---
title: "${video.title.replace(/"/g, '\\"')}"
video_id: "${video.id}"
url: "${video.url}"
thumbnail: "${video.thumbnail}"
source: "${source}"
published_date: "${publishedDateStr}"
freshness_status: "${freshnessStatus.status}"
freshness_message: "${freshnessStatus.message}"
content_category: "${video.contentCategory || 'standard'}"
age_in_months: "${freshnessStatus.ageInMonths || 'unknown'}"
has_transcript: ${transcriptInfo.hasTranscript}
transcript_language: "${transcriptInfo.transcriptLanguage}"
transcript_type: "${transcriptInfo.transcriptType}"
word_count: ${transcriptInfo.wordCount}
category: "videos"
type: "tutorial"
platform: "youtube"
extracted_at: "${new Date().toISOString()}"
${video.embeddedIn ? `embedded_in: "${video.embeddedIn}"` : ''}
---

# ${freshnessEmoji} ${video.title}

**Video ID:** \`${video.id}\`
**Source:** ${source}
**Platform:** YouTube
**Published:** ${video.publishedDate ? video.publishedDate.toLocaleDateString() : 'Unknown'}
**Content Type:** ${video.contentCategory || 'Standard'}
**Transcript:** ${transcriptInfo.available ?
  (transcriptInfo.requiresAuth ? '🔐 Available (requires OAuth2)' :
   (transcriptInfo.wordCount > 0 ? `✅ Available (${transcriptInfo.wordCount} words)` : '✅ Available (metadata only)')) :
  '❌ Not available'}

## ${freshnessEmoji} Freshness Status
**${freshnessStatus.message}**

${freshnessStatus.status === 'warning' ? '⚠️ **Warning:** This video is approaching the age limit and may contain outdated information. Please verify with latest documentation.' : ''}
${freshnessStatus.status === 'expired' ? '🚨 **Expired:** This video has exceeded the freshness threshold and may contain significantly outdated information. Please check for newer alternatives.' : ''}
${freshnessStatus.status === 'fresh' ? '✅ This video contains current information and is within the freshness window.' : ''}

${video.transcript && video.transcript.text ?
`## 📝 Full Transcript

**Language:** ${video.transcript.language}
**Type:** ${video.transcript.trackKind === 'asr' ? 'Auto-generated' : 'Manual'}
**Word Count:** ${video.transcript.wordCount}

${video.transcript.text}

---

` :
(video.transcript && video.transcript.available ?
`## 📝 Transcript Information

**Language:** ${video.transcript.language}
**Type:** ${video.transcript.trackKind === 'asr' ? 'Auto-generated' : 'Manual'}
**Status:** 🔐 Available but requires OAuth2 authentication

⚠️ **Note:** This video has captions available on YouTube, but downloading transcripts requires OAuth2 authentication which is not implemented in this scraper. You can view the captions directly on YouTube.

---

` :
`## 📝 Transcript
❌ **Transcript not available** - This video does not have captions or transcripts available.

---

`)}## Quick Access
- [🎥 Watch on YouTube](${video.url})
- [📷 Thumbnail](${video.thumbnail})
${video.embeddedIn ? `- [📄 Original Context](${video.embeddedIn})` : ''}

## Content Guidelines
${video.contentCategory === 'critical' ? '⚡ **Critical Topic:** This video covers rapidly evolving features (API, OAuth, Marketplace) and expires after 3 months.' : ''}
${video.contentCategory === 'evergreen' ? '🌿 **Evergreen Content:** This video covers fundamental concepts that remain relevant over time.' : ''}
${video.contentCategory === 'standard' ? '📚 **Standard Content:** This video covers general platform features with a 6-month freshness window.' : ''}

## Description
This tutorial video covers GoHighLevel platform features and functionality. ${transcriptInfo.hasTranscript ? 'The full transcript is available above for easy reference and searching.' : 'Access the full video content through the YouTube link above.'}

${freshnessStatus.status !== 'fresh' ? `
## Alternative Resources
Since this video may be outdated, consider these current resources:
- [📚 Latest Help Documentation](https://help.gohighlevel.com/)
- [🔧 Current API Documentation](https://marketplace.gohighlevel.com/docs/)
- [👥 Developer Community](https://developers.gohighlevel.com/)
- [🎥 Recent Video Tutorials](./index.html) - Check for newer videos on this topic
` : ''}

## Related Resources
- Check the [GoHighLevel Support Portal](https://help.gohighlevel.com/) for additional documentation
- Visit the [Developer Community](https://developers.gohighlevel.com/) for API resources
- Explore the [Official Documentation](https://marketplace.gohighlevel.com/docs/) for integration guides

---
*Video content extracted from ${source} on ${new Date().toLocaleDateString()}*
*Transcript extraction: ${transcriptInfo.hasTranscript ? `✅ ${transcriptInfo.wordCount} words (${transcriptInfo.transcriptLanguage})` : '❌ Not available'}*
*Freshness monitored: Videos expire after ${video.contentCategory === 'critical' ? '3' : video.contentCategory === 'evergreen' ? 'never' : '6'} months*
`;

      // Save to file
      const filename = this.slugify(`${video.id}-${video.title}`) + '.md';
      const filepath = path.join(this.outputDir, filename);
      await fs.writeFile(filepath, frontmatter);
      
      console.log(`  ${getEmojiWithSpace('✅', 'SAVED')}Saved: ${filename}`);

    } catch (error) {
      console.error(`    ❌ Error saving video ${video.id}:`, error.message);
      this.stats.errors++;
    }
  }

  slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 100);
  }

  async generateIndex() {
    const index = {
      generated: new Date().toISOString(),
      stats: this.stats,
      freshnessConfig: this.freshnessConfig,
      sources: this.videoSources.map(s => ({ name: s.name, type: s.type })),
      videos: [],
      freshnessSummary: {
        fresh: 0,
        warning: 0,
        expired: 0,
        unknown: 0,
        byCategory: {
          critical: { fresh: 0, warning: 0, expired: 0 },
          standard: { fresh: 0, warning: 0, expired: 0 },
          evergreen: { fresh: 0, warning: 0, expired: 0 }
        }
      }
    };

    try {
      const files = await fs.readdir(this.outputDir);
      
      for (const file of files) {
        if (file.endsWith('.md')) {
          const filePath = path.join(this.outputDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          
          // Extract metadata from frontmatter
          const titleMatch = content.match(/title: "(.+)"/);
          const videoIdMatch = content.match(/video_id: "(.+)"/);
          const urlMatch = content.match(/url: "(.+)"/);
          const sourceMatch = content.match(/source: "(.+)"/);
          const publishedMatch = content.match(/published_date: "(.+)"/);
          const freshnessStatusMatch = content.match(/freshness_status: "(.+)"/);
          const contentCategoryMatch = content.match(/content_category: "(.+)"/);
          const ageMatch = content.match(/age_in_months: "(.+)"/);
          
          if (titleMatch && videoIdMatch && urlMatch) {
            const freshnessStatus = freshnessStatusMatch ? freshnessStatusMatch[1] : 'unknown';
            const contentCategory = contentCategoryMatch ? contentCategoryMatch[1] : 'standard';
            
            // Update freshness summary stats
            index.freshnessSummary[freshnessStatus]++;
            if (index.freshnessSummary.byCategory[contentCategory]) {
              index.freshnessSummary.byCategory[contentCategory][freshnessStatus]++;
            }
            
            index.videos.push({
              filename: file,
              title: titleMatch[1],
              videoId: videoIdMatch[1],
              url: urlMatch[1],
              source: sourceMatch ? sourceMatch[1] : 'Unknown',
              publishedDate: publishedMatch ? publishedMatch[1] : null,
              freshnessStatus: freshnessStatus,
              contentCategory: contentCategory,
              ageInMonths: ageMatch ? ageMatch[1] : null,
              slug: file.replace('.md', '')
            });
          }
        }
      }
    } catch (error) {
      console.error('Error generating video index:', error);
    }

    await fs.writeJson(
      path.join(this.outputDir, 'index.json'),
      index,
      { spaces: 2 }
    );
  }

  async cleanupExpiredVideos() {
    console.log('🧹 Cleaning up expired videos...');
    
    try {
      const files = await fs.readdir(this.outputDir);
      const videoFiles = files.filter(f => f.endsWith('.md') && f !== 'index.md');
      
      for (const file of videoFiles) {
        const filePath = path.join(this.outputDir, file);
        const content = await fs.readFile(filePath, 'utf8');
        
        // Extract metadata from frontmatter
        const publishedMatch = content.match(/published_date: "(.+)"/);
        const titleMatch = content.match(/title: "(.+)"/);
        
        if (publishedMatch && titleMatch) {
          const publishedDate = new Date(publishedMatch[1]);
          const title = titleMatch[1];
          
          if (this.isVideoExpiredByDate(publishedDate, title)) {
            console.log(`  📅 Moving expired video: ${title}`);
            await this.moveToExpired({ title, publishedDate }, 'Routine expiry check');
            await fs.remove(filePath);
            this.stats.expired++;
          }
        }
      }
      
      console.log(`${getEmojiWithSpace('✅', 'SUCCESS')}Expired video cleanup complete: ${this.stats.expired} videos moved`);
    } catch (error) {
      console.error('❌ Error during expired video cleanup:', error.message);
    }
  }

  async enrichVideoMetadata(video, source) {
    try {
      // Try to extract publish date from the publishedText
      const publishedDate = this.parsePublishedDate(video.publishedText);
      
      // If we couldn't parse the date from the page, try to get it via oembed API
      if (!publishedDate) {
        const oembedData = await this.getVideoOembedData(video.id);
        if (oembedData && oembedData.upload_date) {
          video.publishedDate = new Date(oembedData.upload_date);
        }
      } else {
        video.publishedDate = publishedDate;
      }
      
      // Calculate freshness status
      video.freshnessStatus = this.calculateFreshnessStatus(video);
      
      // Determine content category for expiry rules
      video.contentCategory = this.categorizeVideoContent(video.title);
      
      return video;
    } catch (error) {
      console.error(`    ⚠️ Error enriching video ${video.id}:`, error.message);
      return video; // Return original video if enrichment fails
    }
  }

  parsePublishedDate(publishedText) {
    if (!publishedText) return null;
    
    const now = new Date();
    const text = publishedText.toLowerCase();
    
    // Handle "X ago" format
    const agoMatch = text.match(/(\d+)\s*(minute|hour|day|week|month|year)s?\s*ago/);
    if (agoMatch) {
      const value = parseInt(agoMatch[1]);
      const unit = agoMatch[2];
      
      const date = new Date(now);
      switch (unit) {
        case 'minute':
          date.setMinutes(date.getMinutes() - value);
          break;
        case 'hour':
          date.setHours(date.getHours() - value);
          break;
        case 'day':
          date.setDate(date.getDate() - value);
          break;
        case 'week':
          date.setDate(date.getDate() - (value * 7));
          break;
        case 'month':
          date.setMonth(date.getMonth() - value);
          break;
        case 'year':
          date.setFullYear(date.getFullYear() - value);
          break;
      }
      return date;
    }
    
    // Try to parse as regular date
    const parsedDate = new Date(publishedText);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
    
    return null;
  }

  async getVideoOembedData(videoId) {
    try {
      // Use YouTube's oembed API to get video metadata
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log(`    ${getEmojiWithSpace('⚠️', 'WARNING')}Could not fetch oembed data for ${videoId}`);
    }
    return null;
  }

  categorizeVideoContent(title) {
    const titleLower = title.toLowerCase();
    
    // Check for critical topics that expire faster
    for (const topic of this.freshnessConfig.criticalTopics) {
      if (titleLower.includes(topic.toLowerCase())) {
        return 'critical';
      }
    }
    
    // Check for evergreen content
    for (const topic of this.freshnessConfig.evergreen) {
      if (titleLower.includes(topic.toLowerCase())) {
        return 'evergreen';
      }
    }
    
    return 'standard';
  }

  calculateFreshnessStatus(video) {
    if (!video.publishedDate) {
      return { status: 'unknown', message: 'Unable to determine video age' };
    }
    
    const now = new Date();
    const ageInMonths = (now - video.publishedDate) / (1000 * 60 * 60 * 24 * 30.44);
    
    const category = video.contentCategory || 'standard';
    let maxAge, warningAge;
    
    switch (category) {
      case 'critical':
        maxAge = this.freshnessConfig.criticalMaxAgeMonths;
        warningAge = maxAge * 0.75; // 75% of max age
        break;
      case 'evergreen':
        return { status: 'fresh', message: 'Evergreen content - always relevant' };
      default:
        maxAge = this.freshnessConfig.maxAgeMonths;
        warningAge = this.freshnessConfig.warningAgeMonths;
    }
    
    if (ageInMonths >= maxAge) {
      return { 
        status: 'expired', 
        message: `Video is ${ageInMonths.toFixed(1)} months old (max: ${maxAge})`,
        ageInMonths: ageInMonths.toFixed(1)
      };
    } else if (ageInMonths >= warningAge) {
      return { 
        status: 'warning', 
        message: `Video is ${ageInMonths.toFixed(1)} months old (approaching expiry)`,
        ageInMonths: ageInMonths.toFixed(1)
      };
    } else {
      return { 
        status: 'fresh', 
        message: `Video is ${ageInMonths.toFixed(1)} months old (fresh)`,
        ageInMonths: ageInMonths.toFixed(1)
      };
    }
  }

  isVideoExpired(video) {
    if (!video.publishedDate) {
      return false; // Don't expire videos without date info
    }
    
    const category = video.contentCategory || 'standard';
    if (category === 'evergreen') {
      return false; // Evergreen content never expires
    }
    
    const now = new Date();
    const ageInMonths = (now - video.publishedDate) / (1000 * 60 * 60 * 24 * 30.44);
    const maxAge = category === 'critical' 
      ? this.freshnessConfig.criticalMaxAgeMonths 
      : this.freshnessConfig.maxAgeMonths;
    
    return ageInMonths >= maxAge;
  }

  isVideoExpiredByDate(publishedDate, title) {
    const video = { publishedDate, title, contentCategory: this.categorizeVideoContent(title) };
    return this.isVideoExpired(video);
  }

  async moveToExpired(video, reason) {
    try {
      const expiredEntry = {
        video: video,
        expiredAt: new Date().toISOString(),
        reason: reason,
        originalSource: video.source || 'unknown'
      };
      
      const expiredFile = path.join(this.expiredDir, `expired-${Date.now()}.json`);
      await fs.writeJson(expiredFile, expiredEntry, { spaces: 2 });
      
      console.log(`  📅 Moved to expired: ${video.title} (${reason})`);
      this.stats.expired++;
    } catch (error) {
      console.error(`    ❌ Error moving video to expired:`, error.message);
    }
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Alias for parsePublishedDate to maintain consistency  
  parseYouTubeDate(publishedText) {
    return this.parsePublishedDate(publishedText);
  }
}

// Run if called directly
if (require.main === module) {
  new VideoTutorialScraper().scrape()
    .then(stats => {
      console.log(`${getEmojiWithSpace('📊', 'STATS')}Final video stats:`, stats);
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal video extraction error:', error);
      process.exit(1);
    });
}

module.exports = VideoTutorialScraper;