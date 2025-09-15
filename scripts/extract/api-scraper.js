const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const TurndownService = require('turndown');

class APIScraper {
  constructor() {
    this.stoplightUrl = 'https://highlevel.stoplight.io';
    this.marketplaceUrl = 'https://marketplace.gohighlevel.com/docs';
    this.outputDir = path.join(__dirname, '../../content/api');
    this.turndown = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-'
    });
    this.stats = {
      endpoints: 0,
      pages: 0,
      errors: 0
    };
  }

  async scrape() {
    console.log('🔧 Starting API Documentation extraction...');
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
      
      // Extract from marketplace docs first (more accessible)
      await this.extractMarketplaceDocs(page);
      
      // Then try Stoplight docs
      await this.extractStoplightDocs(page);

    } catch (error) {
      console.error('❌ Error during extraction:', error.message);
      this.stats.errors++;
    } finally {
      await browser.close();
    }

    console.log(`✅ API extraction complete: ${this.stats.pages} pages, ${this.stats.endpoints} endpoints`);
    console.log(`📊 Final stats:`, this.stats);
  }

  async extractMarketplaceDocs(page) {
    try {
      console.log('📖 Extracting from marketplace.gohighlevel.com/docs...');
      
      await page.goto(this.marketplaceUrl, { 
        waitUntil: 'networkidle2',
        timeout: 60000 
      });

      // Wait for content to load
      await page.waitForTimeout(3000);

      // Look for navigation or sidebar with API sections
      const navItems = await page.evaluate(() => {
        const items = [];
        
        // Try to find navigation links
        const navLinks = document.querySelectorAll('nav a, .sidebar a, [role="navigation"] a');
        navLinks.forEach(link => {
          const href = link.href;
          const text = link.textContent?.trim();
          if (href && text && (
            href.includes('/docs/') || 
            href.includes('/api/') ||
            text.toLowerCase().includes('api') ||
            text.toLowerCase().includes('endpoint') ||
            text.toLowerCase().includes('reference')
          )) {
            items.push({ href, text });
          }
        });

        // Also look for API sections in the main content
        const sections = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        sections.forEach(heading => {
          const text = heading.textContent?.trim();
          if (text && (
            text.toLowerCase().includes('api') ||
            text.toLowerCase().includes('endpoint') ||
            text.toLowerCase().includes('reference')
          )) {
            const nextElement = heading.nextElementSibling;
            if (nextElement) {
              items.push({ 
                href: window.location.href, 
                text: text,
                content: nextElement.outerHTML 
              });
            }
          }
        });

        return items;
      });

      console.log(`Found ${navItems.length} potential API documentation items`);

      // Extract main page content
      await this.extractPageContent(page, 'api-overview', 'API Overview');

      // Extract individual API pages if found
      for (const item of navItems.slice(0, 20)) { // Limit to prevent timeout
        try {
          if (item.href !== page.url()) {
            await page.goto(item.href, { waitUntil: 'networkidle2', timeout: 30000 });
            await page.waitForTimeout(2000);
          }
          
          const filename = this.sanitizeFilename(item.text || 'api-page');
          await this.extractPageContent(page, filename, item.text);
          
        } catch (error) {
          console.log(`⚠️ Could not extract ${item.text}: ${error.message}`);
          this.stats.errors++;
        }
      }

    } catch (error) {
      console.log(`⚠️ Marketplace docs extraction failed: ${error.message}`);
      this.stats.errors++;
    }
  }

  async extractStoplightDocs(page) {
    try {
      console.log('📖 Extracting from highlevel.stoplight.io...');
      
      // Try common Stoplight API paths
      const stoplightPaths = [
        '/docs/integrations',
        '/docs/integrations/0443d7d1a4bd0-standard-response-fields',
        '/docs/integrations/a04191c0fabf9-authorization',
        '/docs/integrations/00d0c0ecaa369-get-access-token',
        '/docs/integrations/7fd1120fbd540-conversations-api'
      ];

      for (const apiPath of stoplightPaths) {
        try {
          const url = `${this.stoplightUrl}${apiPath}`;
          console.log(`Trying: ${url}`);
          
          await page.goto(url, { 
            waitUntil: 'networkidle2',
            timeout: 30000 
          });

          await page.waitForTimeout(3000);

          // Check if page loaded successfully
          const title = await page.title();
          if (title && !title.includes('404') && !title.includes('Not Found')) {
            const filename = this.sanitizeFilename(apiPath.split('/').pop() || 'stoplight-api');
            await this.extractPageContent(page, filename, title);
          }

        } catch (error) {
          console.log(`⚠️ Could not access ${apiPath}: ${error.message}`);
        }
      }

    } catch (error) {
      console.log(`⚠️ Stoplight docs extraction failed: ${error.message}`);
      this.stats.errors++;
    }
  }

  async extractPageContent(page, filename, title) {
    try {
      const content = await page.evaluate(() => {
        // Try to find the main content area
        const contentSelectors = [
          'main',
          '[role="main"]',
          '.main-content',
          '.content',
          '.documentation',
          '.api-content',
          'article',
          '.markdown-body'
        ];

        let contentElement = null;
        for (const selector of contentSelectors) {
          contentElement = document.querySelector(selector);
          if (contentElement) break;
        }

        // Fallback to body if no main content found
        if (!contentElement) {
          contentElement = document.body;
        }

        // Remove navigation, headers, footers
        const elementsToRemove = contentElement.querySelectorAll(
          'nav, header, footer, .navbar, .sidebar, .breadcrumb, .navigation'
        );
        elementsToRemove.forEach(el => el.remove());

        return {
          html: contentElement.innerHTML,
          title: document.title,
          url: window.location.href
        };
      });

      if (content.html && content.html.trim().length > 100) {
        const markdown = this.turndown.turndown(content.html);
        
        const frontMatter = `---
title: "${title || content.title}"
url: "${content.url}"
extracted: "${new Date().toISOString()}"
type: "api"
---

`;

        const fullContent = frontMatter + markdown;
        
        const filePath = path.join(this.outputDir, `${filename}.md`);
        await fs.writeFile(filePath, fullContent, 'utf8');
        
        this.stats.pages++;
        console.log(`📄 Saved: ${filename}.md`);

        // Count endpoints mentioned in the content
        const endpointMatches = markdown.match(/\/api\/|\/v[0-9]+\/|GET |POST |PUT |DELETE |PATCH /gi);
        if (endpointMatches) {
          this.stats.endpoints += endpointMatches.length;
        }
      }

    } catch (error) {
      console.log(`⚠️ Could not extract content for ${filename}: ${error.message}`);
      this.stats.errors++;
    }
  }

  sanitizeFilename(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .substring(0, 100);
  }
}

// Run the scraper
if (require.main === module) {
  const scraper = new APIScraper();
  scraper.scrape()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('💥 Fatal error:', error);
      process.exit(1);
    });
}

module.exports = APIScraper;