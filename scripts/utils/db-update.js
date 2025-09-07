const fs = require('fs-extra');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const matter = require('gray-matter');

class DatabaseUpdater {
  constructor() {
    this.dbPath = path.join(__dirname, '../../database/ghl-docs.db');
    this.contentDir = path.join(__dirname, '../../content');
    this.db = null;
  }

  async update() {
    console.log('💾 Updating database...');
    
    try {
      // Ensure database directory exists
      await fs.ensureDir(path.dirname(this.dbPath));
      
      // Initialize database
      await this.initDatabase();
      
      // Clear existing data
      await this.clearTables();
      
      // Process content
      await this.processContent();
      
      // Generate statistics
      await this.generateStats();
      
      console.log('✅ Database updated successfully');
      
    } catch (error) {
      console.error('❌ Database update error:', error);
      throw error;
    } finally {
      if (this.db) {
        this.db.close();
      }
    }
  }

  async initDatabase() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          reject(err);
          return;
        }
        
        // Create tables
        this.db.serialize(() => {
          // Documents table
          this.db.run(`
            CREATE TABLE IF NOT EXISTS documents (
              id TEXT PRIMARY KEY,
              title TEXT NOT NULL,
              category TEXT NOT NULL,
              content TEXT,
              url TEXT,
              votes INTEGER DEFAULT 0,
              status TEXT,
              extracted_at TEXT,
              file_path TEXT,
              word_count INTEGER,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
          `);
          
          // Categories table
          this.db.run(`
            CREATE TABLE IF NOT EXISTS categories (
              name TEXT PRIMARY KEY,
              document_count INTEGER DEFAULT 0,
              last_updated TEXT,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
          `);
          
          // Statistics table
          this.db.run(`
            CREATE TABLE IF NOT EXISTS statistics (
              key TEXT PRIMARY KEY,
              value TEXT,
              updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
          `);
          
          // Search index table
          this.db.run(`
            CREATE VIRTUAL TABLE IF NOT EXISTS search_index USING fts5(
              id, title, content, category, tags
            )
          `);
          
          resolve();
        });
      });
    });
  }

  async clearTables() {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run('DELETE FROM documents');
        this.db.run('DELETE FROM categories');
        this.db.run('DELETE FROM search_index');
        this.db.run('DELETE FROM statistics', resolve);
      });
    });
  }

  async processContent() {
    const categories = ['help', 'ideas', 'marketplace', 'official'];
    
    for (const category of categories) {
      await this.processCategory(category);
    }
  }

  async processCategory(categoryName) {
    const categoryPath = path.join(this.contentDir, categoryName);
    
    if (!(await fs.pathExists(categoryPath))) {
      console.log(`Category ${categoryName} not found, skipping...`);
      return;
    }
    
    console.log(`  Processing category: ${categoryName}`);
    let documentCount = 0;
    let lastUpdated = null;
    
    await this.processDirectory(categoryPath, categoryName, (count, updated) => {
      documentCount += count;
      if (!lastUpdated || (updated && updated > lastUpdated)) {
        lastUpdated = updated;
      }
    });
    
    // Insert category statistics
    await this.insertCategory(categoryName, documentCount, lastUpdated);
  }

  async processDirectory(dirPath, category, callback) {
    try {
      const items = await fs.readdir(dirPath);
      let count = 0;
      let lastUpdated = null;
      
      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stat = await fs.stat(itemPath);
        
        if (stat.isDirectory()) {
          await this.processDirectory(itemPath, category, callback);
        } else if (item.endsWith('.md') && !item.startsWith('_')) {
          const updated = await this.processMarkdownFile(itemPath, category);
          count++;
          
          if (!lastUpdated || (updated && updated > lastUpdated)) {
            lastUpdated = updated;
          }
        }
      }
      
      if (callback) {
        callback(count, lastUpdated);
      }
    } catch (error) {
      console.error(`Error processing directory ${dirPath}:`, error.message);
    }
  }

  async processMarkdownFile(filePath, category) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const parsed = matter(content);
      
      const id = path.basename(filePath, '.md');
      const title = parsed.data.title || id;
      const textContent = parsed.content.replace(/[#*`\[\]()]/g, '').trim();
      const wordCount = textContent.split(/\s+/).length;
      
      // Insert document
      await this.insertDocument({
        id,
        title,
        category,
        content: textContent,
        url: parsed.data.url || '',
        votes: parsed.data.votes || 0,
        status: parsed.data.status || '',
        extracted_at: parsed.data.extracted_at || new Date().toISOString(),
        file_path: path.relative(this.contentDir, filePath),
        word_count: wordCount
      });
      
      // Insert into search index
      await this.insertSearchIndex({
        id,
        title,
        content: textContent,
        category,
        tags: this.extractTags(parsed.data, textContent).join(' ')
      });
      
      return parsed.data.extracted_at || new Date().toISOString();
      
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error.message);
      return null;
    }
  }

  extractTags(frontmatter, content) {
    const tags = [];
    
    if (frontmatter.category) tags.push(frontmatter.category);
    if (frontmatter.board) tags.push(frontmatter.board);
    if (frontmatter.status) tags.push(frontmatter.status);
    
    // Extract keywords (simplified)
    const keywords = content.toLowerCase().match(/\b(api|webhook|integration|automation|funnel|pipeline|crm|marketing|sales|email|sms|calendar)\b/g) || [];
    tags.push(...[...new Set(keywords)].slice(0, 5));
    
    return [...new Set(tags)];
  }

  insertDocument(doc) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO documents (
          id, title, category, content, url, votes, status, 
          extracted_at, file_path, word_count
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      this.db.run(sql, [
        doc.id, doc.title, doc.category, doc.content, doc.url,
        doc.votes, doc.status, doc.extracted_at, doc.file_path, doc.word_count
      ], resolve);
    });
  }

  insertSearchIndex(doc) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO search_index (id, title, content, category, tags)
        VALUES (?, ?, ?, ?, ?)
      `;
      
      this.db.run(sql, [
        doc.id, doc.title, doc.content, doc.category, doc.tags
      ], resolve);
    });
  }

  insertCategory(name, count, lastUpdated) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT OR REPLACE INTO categories (name, document_count, last_updated)
        VALUES (?, ?, ?)
      `;
      
      this.db.run(sql, [name, count, lastUpdated], resolve);
    });
  }

  async generateStats() {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        // Total documents
        this.db.get('SELECT COUNT(*) as total FROM documents', (err, row) => {
          if (!err && row) {
            this.db.run(
              'INSERT OR REPLACE INTO statistics (key, value) VALUES (?, ?)',
              ['total_documents', row.total.toString()]
            );
          }
        });
        
        // Documents by category
        this.db.all('SELECT category, COUNT(*) as count FROM documents GROUP BY category', (err, rows) => {
          if (!err && rows) {
            rows.forEach(row => {
              this.db.run(
                'INSERT OR REPLACE INTO statistics (key, value) VALUES (?, ?)',
                [`${row.category}_count`, row.count.toString()]
              );
            });
          }
        });
        
        // Last update timestamp
        this.db.run(
          'INSERT OR REPLACE INTO statistics (key, value) VALUES (?, ?)',
          ['last_updated', new Date().toISOString()],
          resolve
        );
      });
    });
  }
}

// Run if called directly
if (require.main === module) {
  new DatabaseUpdater().update()
    .then(() => {
      console.log('✅ Database update completed');
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = DatabaseUpdater;