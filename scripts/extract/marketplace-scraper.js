const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const TurndownService = require('turndown');

class MarketplaceScraper {
  constructor() {
    this.baseUrl = 'https://marketplace.gohighlevel.com';
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
    console.log('🛍️ Starting Marketplace Documentation extraction...');
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
      
      // Try different marketplace URLs
      const urls = [
        `${this.baseUrl}/docs`,
        `${this.baseUrl}/documentation`,
        `${this.baseUrl}/help`,
        this.baseUrl
      ];

      let foundContent = false;
      
      for (const url of urls) {
        try {
          console.log(`Trying URL: ${url}`);
          await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 30000
          });
          
          // Check if page has documentation content
          const hasContent = await page.evaluate(() => {
            const indicators = [
              '.docs', '.documentation', '.help',
              '[class*="doc"]', '[class*="guide"]',
              'article', '.content'
            ];
            
            return indicators.some(selector => 
              document.querySelector(selector)
            );
          });
          
          if (hasContent) {
            foundContent = true;
            await this.scrapeMarketplaceDocs(page, url);
            break;
          }
        } catch (error) {
          console.log(`Failed to access ${url}:`, error.message);
          continue;
        }
      }
      
      if (!foundContent) {
        console.log('⚠️ No marketplace documentation found or accessible');
        // Create placeholder content
        await this.createPlaceholder();
      }

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

  async scrapeMarketplaceDocs(page, baseUrl) {
    try {
      // Look for documentation links
      const docLinks = await page.evaluate(() => {
        const selectors = [
          '.docs a', '.documentation a', '.help a',
          'nav a', '.nav a', '.menu a',
          '[class*="doc"] a', '[class*="guide"] a'
        ];
        
        let links = [];
        for (const selector of selectors) {
          const elements = document.querySelectorAll(selector);
          if (elements.length > 0) {
            links = Array.from(elements).map(link => ({
              title: link.textContent.trim(),
              url: link.href
            })).filter(item => item.title && item.url);
            break;
          }
        }
        
        return links;
      });

      console.log(`📑 Found ${docLinks.length} documentation links`);
      this.stats.categories = docLinks.length;

      // Process each documentation page
      for (const link of docLinks.slice(0, 3)) { // Limit for testing
        await this.scrapeDocPage(page, link);
      }

    } catch (error) {
      console.error('Error scraping marketplace docs:', error);
      this.stats.errors++;
    }
  }

  async scrapeDocPage(page, docLink) {
    try {
      console.log(`  📄 Processing: ${docLink.title}`);
      
      await page.goto(docLink.url, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Extract content
      const content = await page.evaluate(() => {
        const selectors = [
          '.content', '.docs-content', '.documentation',
          'main', 'article', '.main-content',
          '[class*="content"]'
        ];
        
        for (const selector of selectors) {
          const element = document.querySelector(selector);
          if (element) {
            return element.innerHTML;
          }
        }
        return '';
      });

      if (content) {
        // Convert to markdown
        const markdown = this.turndown.turndown(content);

        // Create frontmatter
        const frontmatter = `---
title: "${docLink.title.replace(/"/g, '\\"')}"
category: "marketplace"
url: "${docLink.url}"
extracted_at: "${new Date().toISOString()}"
---

`;

        // Save document
        const filename = this.slugify(docLink.title) + '.md';
        const filepath = path.join(this.outputDir, filename);
        await fs.writeFile(filepath, frontmatter + markdown);
        
        this.stats.docs++;
      }

    } catch (error) {
      console.error(`    ❌ Error scraping ${docLink.title}:`, error.message);
      this.stats.errors++;
    }
  }

  async createPlaceholder() {
    const placeholderContent = `---
title: "Marketplace Documentation Placeholder"
category: "marketplace"
extracted_at: "${new Date().toISOString()}"
---

# GoHighLevel Marketplace Documentation

This is a placeholder for marketplace documentation. The marketplace documentation may be:

- Protected behind authentication
- Not publicly accessible
- Integrated within the main platform

## Alternative Sources

For marketplace-related documentation, check:

1. **Main GHL Help Center**: help.gohighlevel.com
2. **API Documentation**: highlevel.stoplight.io
3. **Community Forum**: Community discussions and guides

## Contributing

If you have access to marketplace documentation or know of public resources, please contribute by:

1. Opening an issue with the documentation URL
2. Submitting a pull request with updated scraper logic
3. Providing access credentials (if appropriate)
`;

    await fs.writeFile(
      path.join(this.outputDir, 'placeholder.md'),
      placeholderContent
    );
    
    this.stats.docs = 1;
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
      documents: []
    };

    try {
      const files = await fs.readdir(this.outputDir);
      
      for (const file of files) {
        if (file.endsWith('.md')) {
          const filePath = path.join(this.outputDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          
          // Extract title from frontmatter
          const titleMatch = content.match(/title: "(.+)"/);
          const title = titleMatch ? titleMatch[1] : file.replace('.md', '');
          
          index.documents.push({
            filename: file,
            title: title,
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