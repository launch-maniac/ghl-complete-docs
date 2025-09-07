const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const matter = require('gray-matter');

class Deduplicator {
  constructor() {
    this.contentDir = path.join(__dirname, '../../content');
    this.stats = {
      total: 0,
      duplicates: 0,
      removed: 0,
      errors: 0
    };
    this.seenHashes = new Map(); // hash -> {path, title, size}
  }

  async deduplicate() {
    console.log('🔍 Deduplicating content...');
    
    try {
      // First pass: collect all files and their hashes
      await this.collectHashes(this.contentDir);
      
      // Second pass: remove duplicates
      await this.removeDuplicates();
      
      console.log(`✅ Deduplication complete:`);
      console.log(`  - Total files: ${this.stats.total}`);
      console.log(`  - Duplicates found: ${this.stats.duplicates}`);
      console.log(`  - Files removed: ${this.stats.removed}`);
      console.log(`  - Errors: ${this.stats.errors}`);
      
    } catch (error) {
      console.error('❌ Deduplication error:', error);
      throw error;
    }

    return this.stats;
  }

  async collectHashes(dirPath) {
    try {
      if (!(await fs.pathExists(dirPath))) {
        return;
      }

      const items = await fs.readdir(dirPath);
      
      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stat = await fs.stat(itemPath);
        
        if (stat.isDirectory()) {
          await this.collectHashes(itemPath);
        } else if (item.endsWith('.md') && !item.startsWith('_')) {
          await this.processFile(itemPath);
        }
      }
    } catch (error) {
      console.error(`Error collecting hashes from ${dirPath}:`, error.message);
      this.stats.errors++;
    }
  }

  async processFile(filePath) {
    try {
      this.stats.total++;
      
      const content = await fs.readFile(filePath, 'utf8');
      const parsed = matter(content);
      
      // Create content hash (excluding frontmatter metadata like extracted_at)
      const contentForHashing = this.normalizeContent(parsed.content);
      const hash = this.createHash(contentForHashing);
      
      const title = parsed.data.title || path.basename(filePath, '.md');
      const size = content.length;
      
      if (this.seenHashes.has(hash)) {
        // Duplicate found
        const existing = this.seenHashes.get(hash);
        console.log(`  🔄 Duplicate found:`);
        console.log(`    Original: ${existing.path} (${title})`);
        console.log(`    Duplicate: ${filePath} (${title})`);
        
        // Mark for removal (keep the one with better metadata or shorter path)
        const shouldKeepNew = this.shouldKeepNewFile(existing, {
          path: filePath,
          title,
          size,
          frontmatter: parsed.data
        });
        
        if (shouldKeepNew) {
          // Mark existing for removal, keep new
          existing.markForRemoval = true;
          this.seenHashes.set(hash, {
            path: filePath,
            title,
            size,
            frontmatter: parsed.data
          });
        } else {
          // Mark new file for removal
          this.seenHashes.get(hash).duplicates = this.seenHashes.get(hash).duplicates || [];
          this.seenHashes.get(hash).duplicates.push(filePath);
        }
        
        this.stats.duplicates++;
      } else {
        // First occurrence
        this.seenHashes.set(hash, {
          path: filePath,
          title,
          size,
          frontmatter: parsed.data
        });
      }
      
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error.message);
      this.stats.errors++;
    }
  }

  normalizeContent(content) {
    return content
      // Remove excessive whitespace
      .replace(/\s+/g, ' ')
      // Remove markdown formatting for comparison
      .replace(/[#*`_\[\]()]/g, '')
      // Convert to lowercase
      .toLowerCase()
      .trim();
  }

  createHash(content) {
    return crypto.createHash('md5').update(content).digest('hex');
  }

  shouldKeepNewFile(existing, newFile) {
    // Prefer files with more metadata
    const existingMetaCount = Object.keys(existing.frontmatter || {}).length;
    const newMetaCount = Object.keys(newFile.frontmatter || {}).length;
    
    if (newMetaCount > existingMetaCount) {
      return true;
    } else if (existingMetaCount > newMetaCount) {
      return false;
    }
    
    // Prefer files with URLs (original sources)
    if (newFile.frontmatter?.url && !existing.frontmatter?.url) {
      return true;
    } else if (existing.frontmatter?.url && !newFile.frontmatter?.url) {
      return false;
    }
    
    // Prefer files with shorter paths (likely in main categories)
    const existingDepth = existing.path.split(path.sep).length;
    const newDepth = newFile.path.split(path.sep).length;
    
    if (newDepth < existingDepth) {
      return true;
    } else if (existingDepth < newDepth) {
      return false;
    }
    
    // Prefer larger files (more content)
    return newFile.size > existing.size;
  }

  async removeDuplicates() {
    for (const [hash, fileInfo] of this.seenHashes.entries()) {
      try {
        // Remove file marked for removal
        if (fileInfo.markForRemoval) {
          await this.removeFile(fileInfo.path);
          this.stats.removed++;
        }
        
        // Remove duplicate files
        if (fileInfo.duplicates) {
          for (const duplicatePath of fileInfo.duplicates) {
            await this.removeFile(duplicatePath);
            this.stats.removed++;
          }
        }
      } catch (error) {
        console.error(`Error removing duplicates for hash ${hash}:`, error.message);
        this.stats.errors++;
      }
    }
  }

  async removeFile(filePath) {
    try {
      console.log(`  🗑️  Removing duplicate: ${path.basename(filePath)}`);
      await fs.remove(filePath);
    } catch (error) {
      console.error(`Error removing file ${filePath}:`, error.message);
      throw error;
    }
  }

  async findSimilarTitles() {
    // Additional method to find files with very similar titles
    const titleGroups = new Map();
    
    for (const [hash, fileInfo] of this.seenHashes.entries()) {
      const normalizedTitle = fileInfo.title.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      if (!titleGroups.has(normalizedTitle)) {
        titleGroups.set(normalizedTitle, []);
      }
      titleGroups.get(normalizedTitle).push(fileInfo);
    }
    
    // Report groups with multiple files
    for (const [title, files] of titleGroups.entries()) {
      if (files.length > 1) {
        console.log(`  ⚠️  Similar titles found: "${title}" (${files.length} files)`);
        files.forEach(file => console.log(`    - ${file.path}`));
      }
    }
  }
}

// Run if called directly
if (require.main === module) {
  new Deduplicator().deduplicate()
    .then(stats => {
      console.log('📊 Deduplication stats:', stats);
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = Deduplicator;