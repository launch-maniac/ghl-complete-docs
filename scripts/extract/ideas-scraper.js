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

      // Wait for content to load
      await new Promise(resolve => setTimeout(resolve, 5000));

      // DEBUG: Log what's actually on the page
      await page.evaluate(() => {
        console.log('🔍 DEBUGGING PAGE CONTENT:');
        
        // Log all class names that might contain posts
        const allClasses = [...document.querySelectorAll('*')]
          .map(el => [...el.classList])
          .flat()
          .filter(c => c.includes('post') || c.includes('idea') || c.includes('item') || c.includes('feedback'))
          .filter((c, i, arr) => arr.indexOf(c) === i); // unique
        console.log('📝 Found relevant classes:', allClasses);
        
        // Log any text content that looks like posts
        const possiblePosts = document.body.innerText
          .split('\n')
          .filter(text => text.trim().length > 20 && text.trim().length < 200)
          .filter(text => !text.includes('©') && !text.includes('Privacy'))
          .slice(0, 10);
        console.log('📄 Possible post content:', possiblePosts);
        
        // Log page title and URL for context
        console.log('🌐 Page:', document.title, window.location.href);
        
        // Check for common Canny/feedback platform elements
        const cannySelectors = ['.c-post', '.post', '.idea', '.feedback-item', '[data-testid*="post"]', '.entry'];
        cannySelectors.forEach(sel => {
          const elements = document.querySelectorAll(sel);
          if (elements.length > 0) {
            console.log(`✅ Found ${elements.length} elements with selector: ${sel}`);
          }
        });
      });

      // Scroll to load more posts
      await this.autoScroll(page);

      // Try multiple selector strategies with enhanced debugging
      const posts = await page.evaluate(() => {
        console.log('🔄 Starting post extraction...');
        
        // Enhanced selector list including common feedback platform patterns
        const selectors = [
          // Canny platform selectors
          '.c-post',
          '.post',
          '.postTitle',
          
          // Generic feedback platform selectors
          '.post-item', 
          '.idea-item', 
          '.feedback-item',
          '.post-list-item',
          '.ideas-list-item',
          '[data-test="post-item"]',
          '[data-testid*="post"]',
          
          // Broader selectors
          'article',
          '.posts .post',
          '[class*="post"]',
          '.ideas .idea',
          '[class*="idea"]',
          '.list-item',
          'div[role="article"]',
          '.entry'
        ];
        
        let foundPosts = [];
        
        for (const selector of selectors) {
          const elements = document.querySelectorAll(selector);
          console.log(`🔍 Trying selector "${selector}": found ${elements.length} elements`);
          
          if (elements.length > 0) {
            console.log(`✅ Using selector: ${selector} (${elements.length} posts)`);
            
            foundPosts = Array.from(elements).map((post, index) => {
              // More flexible title extraction
              const titleSelectors = ['h1', 'h2', 'h3', '.title', '[class*="title"]', '.c-post-title', '.post-title'];
              let titleEl = null;
              for (const titleSel of titleSelectors) {
                titleEl = post.querySelector(titleSel);
                if (titleEl) break;
              }
              
              // More flexible description extraction
              const descSelectors = ['.description', '.content', 'p', '[class*="description"]', '.c-post-body', '.post-body', '.excerpt'];
              let descEl = null;
              for (const descSel of descSelectors) {
                descEl = post.querySelector(descSel);
                if (descEl) break;
              }
              
              // Extract other metadata
              const voteEl = post.querySelector('.vote-count, .votes, [class*="vote"], .c-vote');
              const statusEl = post.querySelector('.status, .badge, [class*="status"], .c-status');
              const commentEl = post.querySelector('.comment-count, [class*="comment"], .c-comment');
              const linkEl = post.querySelector('a');
              
              const title = titleEl?.textContent?.trim() || post.textContent?.split('\n')[0]?.trim() || '';
              const description = descEl?.textContent?.trim() || '';
              
              if (index < 3) {
                console.log(`📄 Post ${index + 1}:`, {
                  title: title.substring(0, 50),
                  hasDescription: !!description,
                  hasLink: !!linkEl,
                  element: post.className
                });
              }
              
              return {
                title: title,
                description: description,
                votes: parseInt(voteEl?.textContent?.replace(/\D/g, '')) || 0,
                status: statusEl?.textContent?.trim() || 'open',
                comments: parseInt(commentEl?.textContent?.replace(/\D/g, '')) || 0,
                url: linkEl?.href || ''
              };
            }).filter(post => post.title && post.title.length > 3);
            
            if (foundPosts.length > 0) {
              console.log(`✅ Successfully extracted ${foundPosts.length} posts using selector: ${selector}`);
              break;
            }
          }
        }
        
        // If no structured posts found, try extracting any text that looks like post titles
        if (foundPosts.length === 0) {
          console.log('🔄 No structured posts found, trying text extraction...');
          const textNodes = [...document.querySelectorAll('*')]
            .map(el => el.textContent?.trim())
            .filter(text => text && text.length > 10 && text.length < 200)
            .filter(text => !text.includes('©') && !text.includes('Privacy'))
            .slice(0, 10);
            
          foundPosts = textNodes.map(text => ({
            title: text,
            description: '',
            votes: 0,
            status: 'unknown',
            comments: 0,
            url: window.location.href
          }));
        }
        
        console.log(`📊 Final extraction result: ${foundPosts.length} posts`);
        return foundPosts;
      });

      console.log(`    Found ${posts.length} posts`);

      // Save posts (limit for testing but increase the limit)
      for (const post of posts.slice(0, 10)) {
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