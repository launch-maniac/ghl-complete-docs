const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const TurndownService = require('turndown');

class HelpScraper {
  constructor() {
    this.baseUrl = 'https://help.gohighlevel.com';
    this.outputDir = path.join(__dirname, '../../content/help');
    this.turndown = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-'
    });
    this.stats = {
      categories: 0,
      articles: 0,
      errors: 0
    };
  }

  async scrape() {
    console.log('🌐 Starting Help Documentation extraction...');
    await fs.ensureDir(this.outputDir);
    
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
      
      // Navigate to help home
      await page.goto(`${this.baseUrl}/support/home`, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Extract all categories
      const categories = await page.evaluate(() => {
        const links = document.querySelectorAll('.category-list a, .folder-list a, .categories a, [class*="category"] a');
        return Array.from(links).map(link => ({
          title: link.textContent.trim(),
          url: link.href
        })).filter(item => item.title && item.url);
      });

      console.log(`📁 Found ${categories.length} categories`);
      this.stats.categories = categories.length;

      // Process each category
      for (const category of categories.slice(0, 3)) { // Limit for testing
        await this.scrapeCategory(page, category);
      }

      // Generate index
      await this.generateIndex();
      
      console.log(`✅ Extraction complete: ${this.stats.articles} articles`);
      
    } catch (error) {
      console.error('❌ Extraction error:', error);
      this.stats.errors++;
    } finally {
      await browser.close();
    }

    return this.stats;
  }

  async scrapeCategory(page, category) {
    console.log(`  📂 Processing: ${category.title}`);
    
    try {
      await page.goto(category.url, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Get all articles
      const articles = await page.evaluate(() => {
        const links = document.querySelectorAll('.article-list a, .solutions a, [class*="article"] a, [class*="solution"] a');
        return Array.from(links).map(link => ({
          title: link.textContent.trim(),
          url: link.href
        })).filter(item => item.title && item.url);
      });

      console.log(`    Found ${articles.length} articles`);

      const categorySlug = this.slugify(category.title);
      const categoryDir = path.join(this.outputDir, categorySlug);
      await fs.ensureDir(categoryDir);

      // Save category metadata
      await fs.writeJson(path.join(categoryDir, '_meta.json'), {
        title: category.title,
        url: category.url,
        articleCount: articles.length,
        extracted: new Date().toISOString()
      });

      // Process each article (limit for testing)
      for (const article of articles.slice(0, 2)) {
        await this.scrapeArticle(page, article, categoryDir, categorySlug);
      }

    } catch (error) {
      console.error(`    ❌ Error in category ${category.title}:`, error.message);
      this.stats.errors++;
    }
  }

  async scrapeArticle(page, article, outputDir, categorySlug) {
    try {
      console.log(`    📄 ${article.title}`);
      
      await page.goto(article.url, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Extract content with multiple selectors
      const content = await page.evaluate(() => {
        const selectors = [
          '.article-content', 
          '.solution-content', 
          '.content', 
          'main', 
          '.main-content',
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

      // Convert to markdown
      const markdown = this.turndown.turndown(content);

      // Extract metadata
      const metadata = await page.evaluate(() => {
        return {
          lastUpdated: document.querySelector('.article-updated, .modified-date, .updated')?.textContent?.trim() || '',
          author: document.querySelector('.article-author, .author, .by-author')?.textContent?.trim() || '',
          helpful: document.querySelector('.helpful-count, .vote-count, .votes')?.textContent?.trim() || '0'
        };
      });

      // Create frontmatter
      const frontmatter = `---
title: "${article.title.replace(/"/g, '\\"')}"
category: "${categorySlug}"
url: "${article.url}"
extracted_at: "${new Date().toISOString()}"
last_updated: "${metadata.lastUpdated}"
author: "${metadata.author}"
helpful_count: ${parseInt(metadata.helpful) || 0}
---

`;

      // Save article
      const filename = this.slugify(article.title) + '.md';
      const filepath = path.join(outputDir, filename);
      await fs.writeFile(filepath, frontmatter + markdown);
      
      this.stats.articles++;

    } catch (error) {
      console.error(`      ❌ Error scraping ${article.title}:`, error.message);
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
      categories: {}
    };

    try {
      const categories = await fs.readdir(this.outputDir);
      
      for (const category of categories) {
        if (category.startsWith('.') || category.endsWith('.json')) continue;
        
        const categoryPath = path.join(this.outputDir, category);
        const stat = await fs.stat(categoryPath);
        
        if (stat.isDirectory()) {
          const files = await fs.readdir(categoryPath);
          const articles = files
            .filter(f => f.endsWith('.md'))
            .map(f => f.replace('.md', ''));
          
          index.categories[category] = {
            articleCount: articles.length,
            articles: articles
          };
        }
      }
    } catch (error) {
      console.error('Error generating index:', error);
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
  new HelpScraper().scrape()
    .then(stats => {
      console.log('📊 Final stats:', stats);
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = HelpScraper;