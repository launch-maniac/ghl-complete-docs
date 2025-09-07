const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');

class IdeasScraper {
  constructor() {
    this.baseUrl = 'https://ideas.gohighlevel.com';
    this.outputDir = path.join(__dirname, '../../content/ideas');
    this.stats = {
      boards: 0,
      posts: 0,
      comments: 0,
      errors: 0
    };
  }

  async scrape() {
    console.log('💡 Starting Ideas Portal extraction...');
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
      
      // Go to ideas portal
      await page.goto(this.baseUrl, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Wait for content to load and try multiple selectors
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Get all boards/categories
      const boards = await page.evaluate(() => {
        const selectors = [
          '.board-item a', 
          '.category a', 
          '.boards a',
          '[class*="board"] a',
          '[class*="category"] a',
          '.nav-item a',
          'nav a'
        ];
        
        let links = [];
        for (const selector of selectors) {
          const elements = document.querySelectorAll(selector);
          if (elements.length > 0) {
            links = Array.from(elements);
            break;
          }
        }
        
        return links.map(link => ({
          title: link.textContent.trim(),
          url: link.href
        })).filter(item => item.title && item.url && !item.url.includes('#'));
      });

      console.log(`📋 Found ${boards.length} boards`);
      this.stats.boards = boards.length;

      // Process each board (limit for testing)
      for (const board of boards.slice(0, 2)) {
        await this.scrapeBoard(page, board);
      }

      // Generate index
      await this.generateIndex();
      
      console.log(`✅ Ideas extraction complete: ${this.stats.posts} posts`);
      
    } catch (error) {
      console.error('❌ Ideas extraction error:', error);
      this.stats.errors++;
    } finally {
      await browser.close();
    }

    return this.stats;
  }

  async scrapeBoard(page, board) {
    console.log(`  📋 Processing board: ${board.title}`);
    
    try {
      await page.goto(board.url, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      const boardSlug = this.slugify(board.title);
      const boardDir = path.join(this.outputDir, 'boards', boardSlug);
      await fs.ensureDir(boardDir);

      // Scroll to load more posts
      await this.autoScroll(page);

      // Extract all posts with multiple selectors
      const posts = await page.evaluate(() => {
        const selectors = [
          '.post-item', 
          '.idea-item', 
          'article',
          '.posts .post',
          '[class*="post"]',
          '.ideas .idea',
          '[class*="idea"]'
        ];
        
        let postElements = [];
        for (const selector of selectors) {
          postElements = document.querySelectorAll(selector);
          if (postElements.length > 0) break;
        }
        
        return Array.from(postElements).map(post => {
          const titleEl = post.querySelector('h1, h2, h3, .title, [class*="title"]');
          const descEl = post.querySelector('.description, .content, p, [class*="description"]');
          const voteEl = post.querySelector('.vote-count, .votes, [class*="vote"]');
          const statusEl = post.querySelector('.status, .badge, [class*="status"]');
          const commentEl = post.querySelector('.comment-count, [class*="comment"]');
          const linkEl = post.querySelector('a');
          
          return {
            title: titleEl?.textContent?.trim() || '',
            description: descEl?.textContent?.trim() || '',
            votes: parseInt(voteEl?.textContent?.replace(/\D/g, '')) || 0,
            status: statusEl?.textContent?.trim() || 'open',
            comments: parseInt(commentEl?.textContent?.replace(/\D/g, '')) || 0,
            url: linkEl?.href || ''
          };
        }).filter(post => post.title);
      });

      console.log(`    Found ${posts.length} posts`);

      // Save posts (limit for testing)
      for (const post of posts.slice(0, 5)) {
        await this.savePost(post, boardDir, boardSlug);
      }

      // Save board metadata
      await fs.writeJson(path.join(boardDir, '_meta.json'), {
        title: board.title,
        url: board.url,
        postCount: posts.length,
        extracted: new Date().toISOString()
      });

    } catch (error) {
      console.error(`    ❌ Error in board ${board.title}:`, error.message);
      this.stats.errors++;
    }
  }

  async savePost(post, boardDir, boardSlug) {
    if (!post.title) return;
    
    const filename = this.slugify(post.title || 'untitled') + '.md';
    const filepath = path.join(boardDir, filename);

    const content = `---
title: "${post.title.replace(/"/g, '\\"')}"
board: "${boardSlug}"
status: "${post.status}"
votes: ${post.votes}
comments: ${post.comments}
url: "${post.url}"
extracted_at: "${new Date().toISOString()}"
---

# ${post.title}

${post.description}

**Status:** ${post.status}  
**Votes:** ${post.votes}  
**Comments:** ${post.comments}

${post.url ? `[View Original](${post.url})` : ''}
`;

    await fs.writeFile(filepath, content);
    this.stats.posts++;
  }

  async autoScroll(page) {
    try {
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 100;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight || totalHeight > 3000) {
              clearInterval(timer);
              resolve();
            }
          }, 100);
        });
      });
    } catch (error) {
      console.log('Auto-scroll error (non-fatal):', error.message);
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
      boards: {}
    };

    try {
      const boardsDir = path.join(this.outputDir, 'boards');
      if (await fs.pathExists(boardsDir)) {
        const boards = await fs.readdir(boardsDir);
        
        for (const board of boards) {
          if (board.startsWith('.')) continue;
          
          const boardPath = path.join(boardsDir, board);
          const stat = await fs.stat(boardPath);
          
          if (stat.isDirectory()) {
            const files = await fs.readdir(boardPath);
            const posts = files
              .filter(f => f.endsWith('.md'))
              .map(f => f.replace('.md', ''));
            
            index.boards[board] = {
              postCount: posts.length,
              posts: posts
            };
          }
        }
      }
    } catch (error) {
      console.error('Error generating ideas index:', error);
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
  new IdeasScraper().scrape()
    .then(stats => {
      console.log('📊 Final stats:', stats);
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = IdeasScraper;