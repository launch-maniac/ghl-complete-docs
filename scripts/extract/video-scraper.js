const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const TurndownService = require('turndown');
const https = require('https');
const os = require('os');
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
      errors: 0
    };
    
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

  getBrowserConfig() {
    const baseConfig = {
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-extensions',
        '--no-first-run',
        '--disable-default-apps',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ],
      timeout: 60000,
      protocolTimeout: 60000
    };

    // Try to find Chrome executable path
    const homedir = os.homedir();
    const possibleChromePaths = [
      // Puppeteer cache locations
      path.join(homedir, '.cache/puppeteer/chrome/mac_arm-127.0.6533.88/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'),
      path.join(homedir, '.cache/puppeteer/chrome/mac_arm-121.0.6167.85/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'),

      // Standard Chrome installations
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',

      // Linux paths
      '/usr/bin/google-chrome',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium'
    ];

    // Find the first available Chrome binary
    for (const chromePath of possibleChromePaths) {
      if (fs.existsSync(chromePath)) {
        console.log(`${getEmojiWithSpace('🔧', 'CHROME')}Using Chrome at: ${chromePath}`);
        baseConfig.executablePath = chromePath;
        break;
      }
    }

    // For CI environments (like GitHub Actions), don't specify executablePath
    if (process.env.CI) {
      console.log(`${getEmojiWithSpace('🤖', 'CI')}Running in CI environment, using default Chrome`);
      delete baseConfig.executablePath;
    }

    return baseConfig;
  }

  async scrape() {
    console.log(`${getEmojiWithSpace('🎥', 'STARTING')}Starting Video Tutorial extraction with freshness monitoring...`);
    await fs.ensureDir(this.outputDir);
    await fs.ensureDir(this.expiredDir);
    
    // First, clean up expired videos
    await this.cleanupExpiredVideos();

    const browser = await puppeteer.launch(this.getBrowserConfig());

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
      
      // Set user agent to avoid detection
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      
      for (const source of this.videoSources) {
        try {
          console.log(`${getEmojiWithSpace('🎬', 'PROCESSING')}Processing ${source.name}...`);
          
          if (source.type === 'youtube_channel') {
            await this.scrapeYouTubeChannel(page, source);
          } else if (source.type === 'youtube_search') {
            await this.scrapeYouTubeSearch(page, source);
          } else if (source.type === 'platform_videos') {
            await this.scrapePlatformVideos(page, source);
          }
          
          await this.delay(3000); // Rate limiting
        } catch (error) {
          console.error(`❌ Error processing ${source.name}:`, error.message);
          this.stats.errors++;
        }
      }
      
      // Generate index
      await this.generateIndex();
      
      console.log(`${getEmojiWithSpace('✅', 'SUCCESS')}Video extraction complete: ${this.stats.videos} videos from ${this.stats.channels} sources`);
      
    } catch (error) {
      console.error('❌ Video extraction error:', error);
      this.stats.errors++;
    } finally {
      await browser.close();
    }

    return this.stats;
  }

  async scrapeYouTubeChannel(page, source) {
    for (const url of source.urls) {
      try {
        console.log(`  ${getEmojiWithSpace('📺', 'SCRAPING')}Scraping YouTube: ${url}`);
        
        await page.goto(url, {
          waitUntil: 'networkidle2',
          timeout: 30000
        });

        // Wait for content to load
        await this.delay(3000);
        
        // Extract video information
        const videos = await page.evaluate(() => {
          const videoElements = document.querySelectorAll('a[href*="/watch?v="]');
          const videos = [];
          
          for (const element of videoElements) {
            const href = element.href;
            const titleElement = element.querySelector('[aria-label]') || 
                                element.querySelector('#video-title') ||
                                element.querySelector('.ytd-video-meta-block #video-title');
            
            // Try to get publish date from various selectors
            const dateElement = element.querySelector('#metadata-line span:nth-child(2)') ||
                               element.querySelector('.ytd-video-meta-block #metadata-line span:last-child') ||
                               element.querySelector('[aria-label*="ago"]');
            
            if (href && titleElement) {
              const title = titleElement.textContent?.trim() || titleElement.getAttribute('aria-label');
              const videoId = href.match(/v=([^&]+)/)?.[1];
              const publishedText = dateElement?.textContent?.trim() || '';
              
              if (title && videoId) {
                videos.push({
                  id: videoId,
                  title: title,
                  url: href,
                  thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
                  publishedText: publishedText
                });
              }
            }
          }
          
          return videos.slice(0, 50); // Limit to avoid overwhelming
        });

        console.log(`    📑 Found ${videos.length} videos`);
        
        // Filter for videos within the last 180 days (if specified)
        let filteredVideos = videos;
        if (source.daysBack) {
          const cutoffDate = new Date();
          cutoffDate.setDate(cutoffDate.getDate() - source.daysBack);
          
          filteredVideos = videos.filter(video => {
            const videoDate = this.parseYouTubeDate(video.publishedText);
            return !videoDate || videoDate >= cutoffDate; // Include if date unknown or within range
          });
          
          console.log(`    📅 ${filteredVideos.length} videos within last ${source.daysBack} days`);
        }
        
        // Filter for GHL-related content
        const relevantVideos = filteredVideos.filter(video => 
          this.isRelevantToGHL(video.title)
        );
        
        console.log(`    🎯 ${relevantVideos.length} relevant videos`);
        
        // Enrich and save video metadata with freshness analysis
        for (const video of relevantVideos) {
          const enrichedVideo = await this.enrichVideoMetadata(video, source.name);
          if (enrichedVideo && !this.isVideoExpired(enrichedVideo)) {
            await this.saveVideoMetadata(enrichedVideo, source.name);
          } else if (enrichedVideo) {
            await this.moveToExpired(enrichedVideo, 'Age limit exceeded');
          }
        }
        
        this.stats.videos += relevantVideos.length;
        
      } catch (error) {
        console.error(`    ❌ Error scraping ${url}:`, error.message);
        this.stats.errors++;
      }
    }
    
    this.stats.channels++;
  }

  async scrapeYouTubeSearch(page, source) {
    for (const query of source.searchQueries) {
      try {
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
        console.log(`  ${getEmojiWithSpace('🔍', 'SEARCHING')}Searching YouTube: ${query}`);
        
        await page.goto(searchUrl, {
          waitUntil: 'networkidle2',
          timeout: 30000
        });

        await this.delay(3000);
        
        // Extract search results
        const videos = await page.evaluate(() => {
          const videoElements = document.querySelectorAll('a[href*="/watch?v="]');
          const videos = [];
          
          for (const element of videoElements) {
            const href = element.href;
            const titleElement = element.querySelector('#video-title') ||
                                element.querySelector('[aria-label]');
            
            if (href && titleElement) {
              const title = titleElement.textContent?.trim() || titleElement.getAttribute('aria-label');
              const videoId = href.match(/v=([^&]+)/)?.[1];
              
              if (title && videoId && !videos.find(v => v.id === videoId)) {
                videos.push({
                  id: videoId,
                  title: title,
                  url: href,
                  thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                });
              }
            }
          }
          
          return videos.slice(0, 20); // Limit search results
        });

        console.log(`    📑 Found ${videos.length} search results`);
        
        // Save video metadata
        for (const video of videos) {
          await this.saveVideoMetadata(video, `Search: ${query}`);
        }
        
        this.stats.videos += videos.length;
        
      } catch (error) {
        console.error(`    ❌ Error searching for "${query}":`, error.message);
        this.stats.errors++;
      }
    }
  }

  async scrapePlatformVideos(page, source) {
    for (const url of source.urls) {
      try {
        console.log(`  📖 Scraping platform videos: ${url}`);
        
        await page.goto(url, {
          waitUntil: 'networkidle2',
          timeout: 30000
        });

        // Look for embedded YouTube videos
        const embeddedVideos = await page.evaluate(() => {
          const iframes = document.querySelectorAll('iframe[src*="youtube.com"]');
          const videos = [];
          
          for (const iframe of iframes) {
            const src = iframe.src;
            const videoId = src.match(/embed\/([^?]+)/)?.[1];
            
            if (videoId) {
              // Try to find title from surrounding content
              const container = iframe.closest('article, .content, .help-article');
              const titleElement = container?.querySelector('h1, h2, h3, .title') ||
                                 document.querySelector('h1, .page-title');
              
              const title = titleElement?.textContent?.trim() || `GHL Tutorial - ${videoId}`;
              
              videos.push({
                id: videoId,
                title: title,
                url: `https://www.youtube.com/watch?v=${videoId}`,
                thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
                embeddedIn: url
              });
            }
          }
          
          return videos;
        });

        console.log(`    📑 Found ${embeddedVideos.length} embedded videos`);
        
        // Save video metadata
        for (const video of embeddedVideos) {
          await this.saveVideoMetadata(video, source.name);
        }
        
        this.stats.videos += embeddedVideos.length;
        
      } catch (error) {
        console.error(`    ❌ Error scraping platform videos from ${url}:`, error.message);
        this.stats.errors++;
      }
    }
  }

  isRelevantToGHL(title) {
    const relevantKeywords = [
      'gohighlevel', 'highlevel', 'ghl', 'api', 'automation',
      'workflow', 'funnel', 'crm', 'marketing', 'webhook',
      'integration', 'marketplace', 'developer', 'tutorial',
      'training', 'setup', 'guide', 'demo'
    ];
    
    const titleLower = title.toLowerCase();
    return relevantKeywords.some(keyword => titleLower.includes(keyword));
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
        type: 'youtube'
      };

      // Create enhanced markdown content with freshness indicators
      const publishedDateStr = video.publishedDate ? video.publishedDate.toISOString() : 'unknown';
      const freshnessStatus = video.freshnessStatus || { status: 'unknown', message: 'Date not available' };
      
      // Add visual freshness indicator
      let freshnessEmoji = '❓';
      switch (freshnessStatus.status) {
        case 'fresh': freshnessEmoji = '🟢'; break;
        case 'warning': freshnessEmoji = '🟡'; break;
        case 'expired': freshnessEmoji = '🔴'; break;
      }

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

## ${freshnessEmoji} Freshness Status
**${freshnessStatus.message}**

${freshnessStatus.status === 'warning' ? '⚠️ **Warning:** This video is approaching the age limit and may contain outdated information. Please verify with latest documentation.' : ''}
${freshnessStatus.status === 'expired' ? '🚨 **Expired:** This video has exceeded the freshness threshold and may contain significantly outdated information. Please check for newer alternatives.' : ''}
${freshnessStatus.status === 'fresh' ? '✅ This video contains current information and is within the freshness window.' : ''}

## Quick Access
- [🎥 Watch on YouTube](${video.url})
- [📷 Thumbnail](${video.thumbnail})
${video.embeddedIn ? `- [📄 Original Context](${video.embeddedIn})` : ''}

## Content Guidelines
${video.contentCategory === 'critical' ? '⚡ **Critical Topic:** This video covers rapidly evolving features (API, OAuth, Marketplace) and expires after 3 months.' : ''}
${video.contentCategory === 'evergreen' ? '🌿 **Evergreen Content:** This video covers fundamental concepts that remain relevant over time.' : ''}
${video.contentCategory === 'standard' ? '📚 **Standard Content:** This video covers general platform features with a 6-month freshness window.' : ''}

## Description
This tutorial video covers GoHighLevel platform features and functionality. Access the full video content through the YouTube link above.

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