const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const TurndownService = require('turndown');

class VideoTutorialScraper {
  constructor() {
    this.outputDir = path.join(__dirname, '../../content/videos');
    this.turndown = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-'
    });
    this.stats = {
      channels: 0,
      videos: 0,
      playlists: 0,
      errors: 0
    };
    
    // GHL-related video sources
    this.videoSources = [
      {
        type: 'youtube_channel',
        name: 'GoHighLevel Official',
        urls: [
          'https://www.youtube.com/@GoHighLevel/videos',
          'https://www.youtube.com/@GoHighLevel/playlists'
        ],
        searchTerms: ['gohighlevel', 'highlevel', 'api', 'tutorial', 'training']
      },
      {
        type: 'youtube_search',
        name: 'GHL API Tutorials',
        searchQueries: [
          'GoHighLevel API tutorial',
          'GoHighLevel API v2 guide',
          'HighLevel API integration',
          'GoHighLevel automation tutorial',
          'GoHighLevel webhook setup',
          'GoHighLevel marketplace development'
        ]
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
    console.log('🎥 Starting Video Tutorial extraction...');
    await fs.ensureDir(this.outputDir);
    
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ]
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
      
      // Set user agent to avoid detection
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      
      for (const source of this.videoSources) {
        try {
          console.log(`🎬 Processing ${source.name}...`);
          
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
      
      console.log(`✅ Video extraction complete: ${this.stats.videos} videos from ${this.stats.channels} sources`);
      
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
        console.log(`  📺 Scraping YouTube: ${url}`);
        
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
            
            if (href && titleElement) {
              const title = titleElement.textContent?.trim() || titleElement.getAttribute('aria-label');
              const videoId = href.match(/v=([^&]+)/)?.[1];
              
              if (title && videoId) {
                videos.push({
                  id: videoId,
                  title: title,
                  url: href,
                  thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                });
              }
            }
          }
          
          return videos.slice(0, 50); // Limit to avoid overwhelming
        });

        console.log(`    📑 Found ${videos.length} videos`);
        
        // Filter for GHL-related content
        const relevantVideos = videos.filter(video => 
          this.isRelevantToGHL(video.title)
        );
        
        console.log(`    🎯 ${relevantVideos.length} relevant videos`);
        
        // Save video metadata
        for (const video of relevantVideos) {
          await this.saveVideoMetadata(video, source.name);
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
        console.log(`  🔍 Searching YouTube: ${query}`);
        
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
        category: 'video-tutorial',
        type: 'youtube'
      };

      // Create markdown content
      const frontmatter = `---
title: "${video.title.replace(/"/g, '\\"')}"
video_id: "${video.id}"
url: "${video.url}"
thumbnail: "${video.thumbnail}"
source: "${source}"
category: "videos"
type: "tutorial"
platform: "youtube"
extracted_at: "${new Date().toISOString()}"
${video.embeddedIn ? `embedded_in: "${video.embeddedIn}"` : ''}
---

# ${video.title}

**Video ID:** \`${video.id}\`  
**Source:** ${source}  
**Platform:** YouTube

## Quick Access
- [🎥 Watch on YouTube](${video.url})
- [📷 Thumbnail](${video.thumbnail})

## Description
This tutorial video covers GoHighLevel platform features and functionality. Access the full video content through the YouTube link above.

## Related Resources
- Check the [GoHighLevel Support Portal](https://help.gohighlevel.com/) for additional documentation
- Visit the [Developer Community](https://developers.gohighlevel.com/) for API resources
- Explore the [Official Documentation](https://marketplace.gohighlevel.com/docs/) for integration guides

---
*Video content extracted from ${source} on ${new Date().toLocaleDateString()}*
`;

      // Save to file
      const filename = this.slugify(`${video.id}-${video.title}`) + '.md';
      const filepath = path.join(this.outputDir, filename);
      await fs.writeFile(filepath, frontmatter);
      
      console.log(`  ✅ Saved: ${filename}`);

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
      sources: this.videoSources.map(s => ({ name: s.name, type: s.type })),
      videos: []
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
          
          if (titleMatch && videoIdMatch && urlMatch) {
            index.videos.push({
              filename: file,
              title: titleMatch[1],
              videoId: videoIdMatch[1],
              url: urlMatch[1],
              source: sourceMatch ? sourceMatch[1] : 'Unknown',
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

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run if called directly
if (require.main === module) {
  new VideoTutorialScraper().scrape()
    .then(stats => {
      console.log('📊 Final video stats:', stats);
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal video extraction error:', error);
      process.exit(1);
    });
}

module.exports = VideoTutorialScraper;