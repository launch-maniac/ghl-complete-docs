const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const TurndownService = require('turndown');

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
      errors: 0
    };
  }

  async scrape() {
    console.log('🛍️ Starting Comprehensive Marketplace Documentation extraction...');
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
        {
          url: 'https://developers.gohighlevel.com/',
          type: 'community',
          crawlSubpages: true
        },
        {
          url: 'https://help.gohighlevel.com/support/solutions/folders/48000668553',
          type: 'developer-resources',
          crawlSubpages: true
        },
        {
          url: 'https://help.gohighlevel.com/support/solutions/48000668553',
          type: 'developer-help'
        },
        {
          url: 'https://highlevel.stoplight.io/docs/integrations/',
          type: 'integrations-api',
          crawlSubpages: true
        }
      ];

      for (const targetUrl of marketplaceUrls) {
        try {
          console.log(`🔍 Scraping ${targetUrl.type}: ${targetUrl.url}`);
          await this.scrapeMarketplaceSource(page, targetUrl);
          
          // If crawlSubpages is enabled, discover and scrape linked pages
          if (targetUrl.crawlSubpages) {
            await this.crawlSubpages(page, targetUrl);
          }
          
          await this.delay(2000); // Rate limiting
        } catch (error) {
          console.error(`❌ Error scraping ${targetUrl.type}:`, error.message);
          this.stats.errors++;
        }
      }
      
      // Look for additional marketplace sections in the main API docs
      await this.scrapeMarketplaceSectionsFromAPI(page);
      
      // Generate index
      await this.generateIndex();
      
      console.log(`✅ Marketplace extraction complete: ${this.stats.docs} documents`);
      
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
        console.log(`  ⚠️ No substantial content found for ${targetUrl.type}`);
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
            // Filter for relevant documentation links
            const relevantKeywords = [
              'api', 'docs', 'documentation', 'guide', 'tutorial', 
              'marketplace', 'app', 'developer', 'integration',
              'webhook', 'oauth', 'auth', 'endpoint', 'reference',
              'getting started', 'quick start', 'setup', 'install'
            ];
            
            const isRelevant = relevantKeywords.some(keyword => 
              link.text.includes(keyword) || link.url.toLowerCase().includes(keyword)
            );
            
            const isSameDomain = link.url.includes(baseHost) || 
                               link.url.includes('gohighlevel.com') ||
                               link.url.includes('highlevel.stoplight.io');
            
            return isRelevant && isSameDomain && link.title.length > 3;
          })
          .slice(0, 50); // Process up to 50 subpages per source
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
          
          await this.delay(1000);
        } catch (error) {
          console.log(`      ⚠️ Could not access subpage: ${subpage.title}`);
        }
      }

    } catch (error) {
      console.error(`Error crawling subpages for ${parentUrl.type}:`, error.message);
    }
  }

  async scrapeMarketplaceSectionsFromAPI(page) {
    try {
      console.log('🔍 Looking for marketplace sections in main API docs...');
      
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
          
          await this.delay(1000);
        } catch (error) {
          console.log(`    ⚠️ Could not access ${section.title}`);
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
      console.log(`  ✅ Saved: ${filename}`);

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
}

// Run if called directly
if (require.main === module) {
  new MarketplaceScraper().scrape()
    .then(stats => {
      console.log('📊 Final stats:', stats);
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = MarketplaceScraper;