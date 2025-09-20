const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const TurndownService = require('turndown');
const https = require('https');
const axios = require('axios');
const { getEmojiWithSpace } = require('../utils/emoji');

class MarketplaceScraper {
  constructor() {
    this.outputDir = path.join(__dirname, '../../content/marketplace');
    this.turndown = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-'
    });
    this.stats = {
      categories: 0,
      docs: 0,
      errors: 0,
      successful: 0,
      failed: [], // Track failed URLs for debugging
      retries: 0,
      startTime: Date.now()
    };
  }

  async scrape() {
    console.log(`${getEmojiWithSpace('🛍️', 'STARTING')}Starting Comprehensive Marketplace Documentation extraction...`);
    await fs.ensureDir(this.outputDir);
    
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--disable-blink-features=AutomationControlled',
        '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
      ]
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });

      // Enhanced headers to appear more like a real browser
      await page.setExtraHTTPHeaders({
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      });
      
      // Comprehensive marketplace documentation URLs
      const marketplaceUrls = [
        {
          url: 'https://marketplace.gohighlevel.com/docs/',
          type: 'marketplace-docs',
          crawlSubpages: true
        },
        {
          url: 'https://marketplace.gohighlevel.com/docs/ghl/marketplace/developer-marketplace-api/',
          type: 'api'
        },
        // Enhanced developers.gohighlevel.com coverage
        {
          url: 'https://developers.gohighlevel.com/',
          type: 'developer-portal',
          crawlSubpages: true
        },
        {
          url: 'https://developers.gohighlevel.com/docs',
          type: 'developer-docs',
          crawlSubpages: true
        },
        {
          url: 'https://developers.gohighlevel.com/api',
          type: 'api-docs',
          crawlSubpages: true
        },
        {
          url: 'https://developers.gohighlevel.com/guides',
          type: 'developer-guides',
          crawlSubpages: true
        },
        {
          url: 'https://developers.gohighlevel.com/quickstart',
          type: 'developer-quickstart',
          crawlSubpages: true
        },
        {
          url: 'https://developers.gohighlevel.com/webhooks',
          type: 'webhooks-docs',
          crawlSubpages: true
        },
        {
          url: 'https://developers.gohighlevel.com/oauth',
          type: 'oauth-docs',
          crawlSubpages: true
        },
        // Comprehensive help.gohighlevel.com categories
        {
          url: 'https://help.gohighlevel.com/support/solutions',
          type: 'help-main',
          crawlSubpages: true
        },
        {
          url: 'https://help.gohighlevel.com/support/solutions/folders/48000668553',
          type: 'developer-resources',
          crawlSubpages: true
        },
        {
          url: 'https://help.gohighlevel.com/support/solutions/folders/48000668552',
          type: 'getting-started',
          crawlSubpages: true
        },
        {
          url: 'https://help.gohighlevel.com/support/solutions/folders/48000668554',
          type: 'conversations',
          crawlSubpages: true
        },
        {
          url: 'https://help.gohighlevel.com/support/solutions/folders/48000668555',
          type: 'campaigns',
          crawlSubpages: true
        },
        {
          url: 'https://help.gohighlevel.com/support/solutions/folders/48000668556',
          type: 'contacts',
          crawlSubpages: true
        },
        {
          url: 'https://help.gohighlevel.com/support/solutions/folders/48000668557',
          type: 'calendars',
          crawlSubpages: true
        },
        {
          url: 'https://help.gohighlevel.com/support/solutions/folders/48000668558',
          type: 'workflows',
          crawlSubpages: true
        },
        {
          url: 'https://help.gohighlevel.com/support/solutions/folders/48000668559',
          type: 'funnels',
          crawlSubpages: true
        },
        {
          url: 'https://help.gohighlevel.com/support/solutions/folders/48000668560',
          type: 'websites',
          crawlSubpages: true
        },
        {
          url: 'https://help.gohighlevel.com/support/solutions/folders/48000668561',
          type: 'payments',
          crawlSubpages: true
        },
        {
          url: 'https://help.gohighlevel.com/support/solutions/folders/48000668562',
          type: 'reputation',
          crawlSubpages: true
        },
        {
          url: 'https://help.gohighlevel.com/support/solutions/folders/48000668563',
          type: 'reporting',
          crawlSubpages: true
        },
        {
          url: 'https://help.gohighlevel.com/support/solutions/folders/48000668564',
          type: 'mobile-app',
          crawlSubpages: true
        },
        {
          url: 'https://help.gohighlevel.com/support/solutions/folders/48000668565',
          type: 'settings',
          crawlSubpages: true
        },
        {
          url: 'https://help.gohighlevel.com/support/solutions/folders/48000668566',
          type: 'agency-tools',
          crawlSubpages: true
        },
        {
          url: 'https://help.gohighlevel.com/support/solutions/folders/48000668567',
          type: 'integrations',
          crawlSubpages: true
        },
        {
          url: 'https://highlevel.stoplight.io/docs/integrations/',
          type: 'integrations-api',
          crawlSubpages: true
        },
        // Note: ideas.gohighlevel.com/changelog now handled via Canny API (see canny-api-extractor.js)
      ];

      // Process URLs with controlled concurrency for better performance
      const maxConcurrency = 3; // Process 3 URLs simultaneously
      const urlChunks = this.chunkArray(marketplaceUrls, maxConcurrency);

      for (const chunk of urlChunks) {
        const promises = chunk.map(async (targetUrl) => {
          const retryCount = 3;
          let attempt = 0;

          while (attempt < retryCount) {
            try {
              console.log(`${getEmojiWithSpace('🔍', 'SCRAPING')}Scraping ${targetUrl.type}: ${targetUrl.url} (attempt ${attempt + 1})`);
              await this.scrapeMarketplaceSource(page, targetUrl);

              // If crawlSubpages is enabled, discover and scrape linked pages
              if (targetUrl.crawlSubpages) {
                await this.crawlSubpages(page, targetUrl);
              }

              this.stats.successful++;
              console.log(`${getEmojiWithSpace('✅', 'SUCCESS')}Successfully scraped ${targetUrl.type}`);
              break; // Success, exit retry loop

            } catch (error) {
              attempt++;
              console.error(`❌ Error scraping ${targetUrl.type} (attempt ${attempt}):`, error.message);

              if (attempt >= retryCount) {
                console.error(`🚫 Failed to scrape ${targetUrl.type} after ${retryCount} attempts`);
                this.stats.errors++;
                this.stats.failed.push({
                  url: targetUrl.url,
                  type: targetUrl.type,
                  error: error.message,
                  attempts: attempt
                });
              } else {
                // Exponential backoff: wait longer between retries
                const backoffDelay = Math.min(8000 * Math.pow(2, attempt - 1), 45000);
                console.log(`⏳ Waiting ${backoffDelay}ms before retry...`);
                await this.delay(backoffDelay);
              }
            }
          }
        });

        // Wait for all URLs in this chunk to complete
        await Promise.allSettled(promises);

        // Enhanced rate limiting between chunks for gentler scraping
        if (urlChunks.indexOf(chunk) < urlChunks.length - 1) {
          await this.delay(5000); // Increased from 2s to 5s
        }
      }
      
      // Look for additional marketplace sections in the main API docs
      await this.scrapeMarketplaceSectionsFromAPI(page);

      // Discover URLs from sitemaps for comprehensive coverage
      await this.discoverUrlsFromSitemaps(page);

      // Generate index
      await this.generateIndex();
      
      console.log(`${getEmojiWithSpace('✅', 'SUCCESS')}Marketplace extraction complete: ${this.stats.docs} documents`);
      
    } catch (error) {
      console.error('❌ Marketplace extraction error:', error);
      this.stats.errors++;
    } finally {
      await browser.close();
    }

    return this.stats;
  }

  async scrapeMarketplaceSource(page, targetUrl) {
    try {
      // Note: ideas.gohighlevel.com/changelog is now handled via Canny API

      await page.goto(targetUrl.url, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Check if page loads successfully
      const pageTitle = await page.title();
      console.log(`  📄 Page title: ${pageTitle}`);

      let content = '';
      let title = '';

      // Universal content extraction approach
      const extractedData = await page.evaluate(() => {
        // Try multiple content selectors in order of preference
        const contentSelectors = [
          'main', '.content', '.docs-content', 'article', '.main-content',
          '[role="main"]', '.documentation', '.api-docs', '.guide-content',
          '.help-content', '.article-content', '.post-content', '.page-content',
          '.container .content', '#content', '.doc-content'
        ];
        
        let content = '';
        let title = document.title || '';
        
        // Extract title from various sources
        const titleSelectors = ['h1', '.page-title', '.doc-title', '.title', 'title'];
        for (const selector of titleSelectors) {
          const titleEl = document.querySelector(selector);
          if (titleEl && titleEl.textContent.trim()) {
            title = titleEl.textContent.trim();
            break;
          }
        }
        
        // Extract content
        for (const selector of contentSelectors) {
          const element = document.querySelector(selector);
          if (element && element.innerHTML.trim().length > 300) {
            content = element.innerHTML;
            break;
          }
        }
        
        // Fallback to body if no specific content found
        if (!content || content.trim().length < 300) {
          const body = document.body;
          if (body) {
            // Remove navigation, header, footer elements
            const clone = body.cloneNode(true);
            const elementsToRemove = clone.querySelectorAll('nav, header, footer, .nav, .header, .footer, .sidebar, .menu');
            elementsToRemove.forEach(el => el.remove());
            content = clone.innerHTML;
          }
        }
        
        return { content, title };
      });
      
      content = extractedData.content;
      title = extractedData.title || this.generateTitleFromType(targetUrl.type);

      if (content && content.trim().length > 300) { // Lowered threshold
        await this.saveDocument(content, title, targetUrl.url, targetUrl.type);
      } else {
        console.log(`  ${getEmojiWithSpace('⚠️', 'WARNING')}No substantial content found for ${targetUrl.type}`);
      }

    } catch (error) {
      console.error(`    ❌ Error processing ${targetUrl.type}:`, error.message);
      this.stats.errors++;
    }
  }

  async crawlSubpages(page, parentUrl) {
    try {
      console.log(`  🔗 Discovering subpages for ${parentUrl.type}...`);
      
      await page.goto(parentUrl.url, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Extract all relevant links from the page
      const subpageLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href]'));
        const baseHost = window.location.hostname;
        
        return links
          .map(link => ({
            title: link.textContent.trim(),
            url: link.href,
            text: link.textContent.toLowerCase()
          }))
          .filter(link => {
            // Comprehensive filtering for all documentation content
            const relevantKeywords = [
              // Original technical terms
              'api', 'docs', 'documentation', 'guide', 'tutorial',
              'marketplace', 'app', 'developer', 'integration',
              'webhook', 'oauth', 'auth', 'endpoint', 'reference',
              'getting started', 'quick start', 'setup', 'install',

              // Help and support content
              'help', 'support', 'how to', 'faq', 'troubleshoot',
              'solution', 'article', 'knowledge', 'base',

              // Feature and product content
              'feature', 'automation', 'workflow', 'campaign',
              'contact', 'lead', 'funnel', 'landing', 'page',
              'crm', 'pipeline', 'opportunity', 'calendar',
              'appointment', 'booking', 'email', 'sms', 'phone',
              'reputation', 'review', 'social', 'conversation',
              'ai', 'chat', 'bot', 'voice', 'call', 'tracking',

              // Business and marketing terms
              'agency', 'client', 'sub-account', 'white-label',
              'billing', 'payment', 'subscription', 'pricing',
              'report', 'analytics', 'dashboard', 'metric',

              // Technical and configuration
              'custom', 'field', 'tag', 'trigger', 'action',
              'template', 'form', 'survey', 'membership',
              'course', 'community', 'affiliate', 'tracking'
            ];
            
            const isRelevant = relevantKeywords.some(keyword =>
              link.text.includes(keyword) || link.url.toLowerCase().includes(keyword)
            );

            // Also include documentation-like URLs even without keywords
            const isDocumentationUrl = link.url.includes('/docs/') ||
                                      link.url.includes('/help/') ||
                                      link.url.includes('/support/') ||
                                      link.url.includes('/guide/') ||
                                      link.url.includes('/tutorial/') ||
                                      link.url.includes('/article/') ||
                                      link.url.includes('/solution/');

            const isSameDomain = link.url.includes(baseHost) ||
                               link.url.includes('gohighlevel.com') ||
                               link.url.includes('highlevel.stoplight.io');

            return (isRelevant || isDocumentationUrl) && isSameDomain && link.title.length > 3;
          })
          .slice(0, 500); // Process up to 500 subpages per source for comprehensive coverage
      });

      console.log(`    📑 Found ${subpageLinks.length} relevant subpages`);

      for (const subpage of subpageLinks) {
        try {
          console.log(`    📄 Processing subpage: ${subpage.title}`);
          
          await page.goto(subpage.url, { 
            waitUntil: 'networkidle2', 
            timeout: 20000 
          });
          
          const content = await page.evaluate(() => {
            const selectors = [
              'main', '.content', '.docs-content', 'article',
              '.main-content', '[role="main"]', '.documentation',
              '.api-docs', '.guide-content'
            ];
            
            for (const selector of selectors) {
              const element = document.querySelector(selector);
              if (element && element.innerHTML.trim().length > 500) {
                return element.innerHTML;
              }
            }
            return '';
          });

          if (content && content.trim().length > 300) {
            await this.saveDocument(content, subpage.title, subpage.url, `${parentUrl.type}-subpage`);
          }
          
          await this.delay(3000); // Increased from 1s to 3s for gentler scraping
        } catch (error) {
          console.log(`      ${getEmojiWithSpace('⚠️', 'WARNING')}Could not access subpage: ${subpage.title}`);
        }
      }

    } catch (error) {
      console.error(`Error crawling subpages for ${parentUrl.type}:`, error.message);
    }
  }

  async scrapeMarketplaceSectionsFromAPI(page) {
    try {
      console.log(`${getEmojiWithSpace('🔍', 'SEARCHING')}Looking for marketplace sections in main API docs...`);
      
      await page.goto('https://marketplace.gohighlevel.com/docs/', {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Look for marketplace-related navigation or sections
      const marketplaceSections = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        return links
          .filter(link => {
            const text = link.textContent.toLowerCase();
            const href = link.href.toLowerCase();
            return (text.includes('marketplace') || 
                   text.includes('app') || 
                   text.includes('developer') ||
                   href.includes('marketplace') ||
                   href.includes('app'));
          })
          .map(link => ({
            title: link.textContent.trim(),
            url: link.href
          }))
          .filter(item => item.title && item.url && item.url.startsWith('http'));
      });

      console.log(`  📑 Found ${marketplaceSections.length} marketplace-related sections`);

      for (const section of marketplaceSections) {
        try {
          await page.goto(section.url, { waitUntil: 'networkidle2', timeout: 20000 });
          
          const content = await page.evaluate(() => {
            const main = document.querySelector('main') || 
                        document.querySelector('.content') ||
                        document.querySelector('article');
            return main ? main.innerHTML : '';
          });

          if (content && content.trim().length > 200) {
            await this.saveDocument(content, section.title, section.url, 'api-section');
          }
          
          await this.delay(3000); // Increased from 1s to 3s for gentler scraping
        } catch (error) {
          console.log(`    ${getEmojiWithSpace('⚠️', 'WARNING')}Could not access ${section.title}`);
        }
      }

    } catch (error) {
      console.error('Error scraping marketplace sections from API:', error.message);
    }
  }

  async saveDocument(content, title, url, type) {
    try {
      // Convert HTML to markdown
      const markdown = this.turndown.turndown(content);

      // Create frontmatter
      const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
category: "marketplace"
type: "${type}"
url: "${url}"
extracted_at: "${new Date().toISOString()}"
---

`;

      // Save document
      const filename = this.slugify(`${type}-${title}`) + '.md';
      const filepath = path.join(this.outputDir, filename);
      await fs.writeFile(filepath, frontmatter + markdown);
      
      this.stats.docs++;
      console.log(`  ${getEmojiWithSpace('✅', 'SAVED')}Saved: ${filename}`);

    } catch (error) {
      console.error(`    ❌ Error saving document ${title}:`, error.message);
      this.stats.errors++;
    }
  }

  slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 80);
  }

  async generateIndex() {
    const index = {
      generated: new Date().toISOString(),
      stats: this.stats,
      documents: []
    };

    try {
      const files = await fs.readdir(this.outputDir);
      
      for (const file of files) {
        if (file.endsWith('.md')) {
          const filePath = path.join(this.outputDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          
          // Extract metadata from frontmatter
          const titleMatch = content.match(/title: "(.+)"/);
          const typeMatch = content.match(/type: "(.+)"/);
          const urlMatch = content.match(/url: "(.+)"/);
          
          const title = titleMatch ? titleMatch[1] : file.replace('.md', '');
          const type = typeMatch ? typeMatch[1] : 'unknown';
          const url = urlMatch ? urlMatch[1] : '';
          
          index.documents.push({
            filename: file,
            title: title,
            type: type,
            url: url,
            slug: file.replace('.md', '')
          });
        }
      }
    } catch (error) {
      console.error('Error generating marketplace index:', error);
    }

    await fs.writeJson(
      path.join(this.outputDir, 'index.json'),
      index,
      { spaces: 2 }
    );
  }

  generateTitleFromType(type) {
    const titleMap = {
      'marketplace-docs': 'Marketplace Documentation Hub',
      'api': 'Marketplace API Documentation',
      'community': 'HighLevel Developers Community',
      'developer-resources': 'Developer Resources',
      'developer-help': 'Developer Help Articles',
      'integrations-api': 'Integrations API Documentation'
    };
    return titleMap[type] || `${type.charAt(0).toUpperCase() + type.slice(1)} Documentation`;
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async discoverUrlsFromSitemaps(page) {
    console.log(`${getEmojiWithSpace('🗺️', 'DISCOVERING')}Discovering URLs from sitemaps...`);

    const sitemapUrls = [
      'https://marketplace.gohighlevel.com/sitemap.xml',
      'https://help.gohighlevel.com/sitemap.xml',
      'https://developers.gohighlevel.com/sitemap.xml',
      'https://highlevel.stoplight.io/sitemap.xml'
    ];

    for (const sitemapUrl of sitemapUrls) {
      try {
        console.log(`  📋 Checking sitemap: ${sitemapUrl}`);

        const response = await axios.get(sitemapUrl, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; GHL-DocBot/1.0)',
          }
        });

        if (response.status === 200 && response.data) {
          const urls = this.parseSitemap(response.data);
          console.log(`    📑 Found ${urls.length} URLs in sitemap`);

          // Process discovered URLs
          for (const url of urls.slice(0, 200)) { // Limit to prevent overwhelming
            try {
              console.log(`    📄 Processing sitemap URL: ${url}`);

              await page.goto(url, {
                waitUntil: 'networkidle2',
                timeout: 20000
              });

              const content = await page.evaluate(() => {
                const selectors = [
                  'main', '.content', '.docs-content', 'article',
                  '.main-content', '[role="main"]', '.documentation',
                  '.api-docs', '.guide-content', '.help-content',
                  '.article-content'
                ];

                for (const selector of selectors) {
                  const element = document.querySelector(selector);
                  if (element && element.innerHTML.trim().length > 500) {
                    return element.innerHTML;
                  }
                }
                return '';
              });

              const title = await page.title();

              if (content && content.trim().length > 300) {
                await this.saveDocument(content, title, url, 'sitemap-discovered');
              }

              await this.delay(3000); // Increased from 1s to 3s for gentler scraping
            } catch (error) {
              console.log(`      ${getEmojiWithSpace('⚠️', 'WARNING')}Could not access sitemap URL: ${url}`);
            }
          }
        }
      } catch (error) {
        console.log(`    ${getEmojiWithSpace('⚠️', 'WARNING')}Could not access sitemap: ${sitemapUrl}`);
      }
    }
  }

  parseSitemap(xmlContent) {
    const urls = [];

    // Simple XML parsing for <loc> tags
    const locMatches = xmlContent.match(/<loc>(.*?)<\/loc>/g);

    if (locMatches) {
      for (const match of locMatches) {
        const url = match.replace(/<\/?loc>/g, '');
        if (this.isRelevantSitemapUrl(url)) {
          urls.push(url);
        }
      }
    }

    return urls;
  }

  isRelevantSitemapUrl(url) {
    // Filter for documentation-related URLs
    const documentationPatterns = [
      '/docs/', '/help/', '/support/', '/guide/', '/tutorial/',
      '/article/', '/solution/', '/api/', '/reference/', '/changelog'
    ];

    const excludePatterns = [
      '/login', '/signup', '/logout', '/account', '/billing',
      '/admin', '/dashboard', '/settings', '/profile'
    ];

    const hasDocPattern = documentationPatterns.some(pattern => url.includes(pattern));
    const hasExcludePattern = excludePatterns.some(pattern => url.includes(pattern));

    return hasDocPattern && !hasExcludePattern;
  }

  // Note: scrapeChangelogPage method removed - changelog extraction now handled via Canny API

  // Helper method to split array into chunks for concurrent processing
  chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  // Enhanced stats reporting with timing and failure details
  generateFinalReport() {
    const duration = (Date.now() - this.stats.startTime) / 1000;
    const successRate = this.stats.successful / (this.stats.successful + this.stats.errors) * 100;

    console.log(`\n${getEmojiWithSpace('📊', 'REPORT')}EXTRACTION COMPLETE - DETAILED REPORT`);
    console.log('=' .repeat(60));
    console.log(`${getEmojiWithSpace('⏱️', 'DURATION')}Total Duration: ${duration.toFixed(1)}s`);
    console.log(`📝 Documents Extracted: ${this.stats.docs}`);
    console.log(`${getEmojiWithSpace('✅', 'SUCCESS')}Successful Sources: ${this.stats.successful}`);
    console.log(`${getEmojiWithSpace('❌', 'ERRORS')}Failed Sources: ${this.stats.errors}`);
    console.log(`📈 Success Rate: ${successRate.toFixed(1)}%`);
    console.log(`🔄 Total Retries: ${this.stats.retries}`);

    if (this.stats.failed.length > 0) {
      console.log('\n🚨 FAILED SOURCES:');
      this.stats.failed.forEach(failure => {
        console.log(`  • ${failure.type}: ${failure.url}`);
        console.log(`    Error: ${failure.error}`);
        console.log(`    Attempts: ${failure.attempts}`);
      });
    }

    console.log('=' .repeat(60));
    return this.stats;
  }
}

// Run if called directly
if (require.main === module) {
  new MarketplaceScraper().scrape()
    .then(stats => {
      const finalStats = stats.generateFinalReport();
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = MarketplaceScraper;