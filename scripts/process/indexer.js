const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

class ContentIndexer {
  constructor() {
    this.contentDir = path.join(__dirname, '../../content');
    this.outputDir = path.join(__dirname, '../../docs/data');
    this.stats = {
      categories: 0,
      documents: 0,
      errors: 0
    };
  }

  async index() {
    console.log('🔍 Indexing content...');
    
    try {
      await fs.ensureDir(this.outputDir);
      
      const masterIndex = {
        generated: new Date().toISOString(),
        version: '1.0.0',
        stats: {},
        categories: {},
        documents: []
      };
      
      // Process each category
      const categories = ['help', 'ideas', 'marketplace', 'official'];
      
      for (const category of categories) {
        console.log(`  📂 Indexing ${category}...`);
        const categoryData = await this.indexCategory(category);
        masterIndex.categories[category] = categoryData;
        masterIndex.documents.push(...categoryData.documents);
        this.stats.categories++;
      }
      
      // Generate final statistics
      masterIndex.stats = {
        totalDocuments: masterIndex.documents.length,
        categories: this.stats.categories,
        generatedAt: new Date().toISOString(),
        errors: this.stats.errors
      };
      
      // Save master index
      await this.saveIndex('master-index.json', masterIndex);
      
      // Generate category-specific indexes
      for (const [categoryName, categoryData] of Object.entries(masterIndex.categories)) {
        await this.saveIndex(`${categoryName}-index.json`, categoryData);
      }
      
      // Generate search-optimized index
      await this.generateSearchIndex(masterIndex.documents);
      
      console.log(`✅ Indexing complete:`);
      console.log(`  - Categories: ${this.stats.categories}`);
      console.log(`  - Documents: ${masterIndex.documents.length}`);
      console.log(`  - Errors: ${this.stats.errors}`);
      
    } catch (error) {
      console.error('❌ Indexing error:', error);
      throw error;
    }

    return this.stats;
  }

  async indexCategory(categoryName) {
    const categoryPath = path.join(this.contentDir, categoryName);
    const categoryData = {
      name: categoryName,
      path: categoryPath,
      documents: [],
      subcategories: {},
      stats: {
        totalDocuments: 0,
        lastUpdated: null,
        avgWordCount: 0
      }
    };
    
    try {
      if (!(await fs.pathExists(categoryPath))) {
        console.log(`    ⚠️  Category ${categoryName} not found`);
        return categoryData;
      }
      
      await this.indexDirectory(categoryPath, categoryName, categoryData);
      
      // Calculate statistics
      if (categoryData.documents.length > 0) {
        const totalWords = categoryData.documents.reduce((sum, doc) => sum + (doc.wordCount || 0), 0);
        categoryData.stats.avgWordCount = Math.round(totalWords / categoryData.documents.length);
        
        const lastUpdated = categoryData.documents
          .map(doc => doc.extractedAt)
          .filter(date => date)
          .sort()
          .pop();
        categoryData.stats.lastUpdated = lastUpdated;
      }
      
      categoryData.stats.totalDocuments = categoryData.documents.length;
      this.stats.documents += categoryData.documents.length;
      
    } catch (error) {
      console.error(`Error indexing category ${categoryName}:`, error.message);
      this.stats.errors++;
    }
    
    return categoryData;
  }

  async indexDirectory(dirPath, categoryName, categoryData, subcategory = '') {
    try {
      const items = await fs.readdir(dirPath);
      
      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stat = await fs.stat(itemPath);
        
        if (stat.isDirectory()) {
          const subCategoryName = subcategory ? `${subcategory}/${item}` : item;
          
          // Initialize subcategory if not exists
          if (!categoryData.subcategories[item]) {
            categoryData.subcategories[item] = {
              name: item,
              path: subCategoryName,
              documents: [],
              documentCount: 0
            };
          }
          
          // Recursively index subdirectory
          await this.indexDirectory(itemPath, categoryName, categoryData, subCategoryName);
          
        } else if (item.endsWith('.md') && !item.startsWith('_')) {
          const document = await this.indexDocument(itemPath, categoryName, subcategory);
          if (document) {
            categoryData.documents.push(document);
            
            // Add to subcategory if applicable
            if (subcategory) {
              const mainSubCategory = subcategory.split('/')[0];
              if (categoryData.subcategories[mainSubCategory]) {
                categoryData.subcategories[mainSubCategory].documents.push(document);
                categoryData.subcategories[mainSubCategory].documentCount++;
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error indexing directory ${dirPath}:`, error.message);
      this.stats.errors++;
    }
  }

  async indexDocument(filePath, category, subcategory) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const parsed = matter(content);
      
      // Extract text content and calculate word count
      const textContent = parsed.content.replace(/[#*`_\[\]()]/g, '').trim();
      const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
      
      const document = {
        id: path.basename(filePath, '.md'),
        title: parsed.data.title || path.basename(filePath, '.md'),
        category: category,
        subcategory: subcategory || null,
        filePath: path.relative(this.contentDir, filePath),
        url: parsed.data.url || null,
        extractedAt: parsed.data.extracted_at || null,
        lastUpdated: parsed.data.last_updated || null,
        wordCount: wordCount,
        excerpt: this.generateExcerpt(textContent),
        tags: this.extractTags(parsed.data, textContent),
        metadata: {
          votes: parsed.data.votes || 0,
          status: parsed.data.status || null,
          author: parsed.data.author || null,
          board: parsed.data.board || null,
          helpfulCount: parsed.data.helpful_count || 0
        }
      };
      
      return document;
      
    } catch (error) {
      console.error(`Error indexing document ${filePath}:`, error.message);
      this.stats.errors++;
      return null;
    }
  }

  generateExcerpt(content, maxLength = 200) {
    return content
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, maxLength)
      .replace(/\s+\S*$/, '') // Remove partial word at end
      + (content.length > maxLength ? '...' : '');
  }

  extractTags(frontmatter, content) {
    const tags = new Set();
    
    // Add frontmatter tags
    if (frontmatter.category) tags.add(frontmatter.category);
    if (frontmatter.board) tags.add(frontmatter.board);
    if (frontmatter.status) tags.add(frontmatter.status);
    
    // Extract keywords from content
    const keywords = content.toLowerCase().match(/\b(api|webhook|integration|automation|funnel|pipeline|crm|marketing|sales|email|sms|calendar|appointment|contact|lead|campaign|workflow|template|form|landing|page|domain|tracking|conversion|analytics|reporting|custom|field|trigger|action|sequence|broadcast|nurture|segment|tag|note|task|opportunity|deal|invoice|payment|subscription|membership|course|community|phone|call|voicemail|settings|user|team|agency|location|client|business)\b/g) || [];
    
    // Add most frequent keywords (limit to prevent tag explosion)
    const keywordCounts = {};
    keywords.forEach(keyword => {
      keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
    });
    
    const topKeywords = Object.entries(keywordCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([keyword]) => keyword);
    
    topKeywords.forEach(keyword => tags.add(keyword));
    
    return Array.from(tags);
  }

  async saveIndex(filename, data) {
    const filePath = path.join(this.outputDir, filename);
    await fs.writeJson(filePath, data, { spaces: 2 });
    console.log(`    💾 Saved ${filename}`);
  }

  async generateSearchIndex(documents) {
    console.log('  🔍 Generating search index...');
    
    const searchIndex = documents.map(doc => ({
      id: doc.id,
      title: doc.title,
      category: doc.category,
      content: doc.excerpt,
      url: doc.url,
      tags: doc.tags.join(' '),
      votes: doc.metadata.votes,
      status: doc.metadata.status,
      wordCount: doc.wordCount
    }));
    
    await this.saveIndex('search-index.json', searchIndex);
    
    // Also save a lightweight version for initial page load
    const lightIndex = searchIndex.map(doc => ({
      id: doc.id,
      title: doc.title,
      category: doc.category,
      excerpt: doc.content.substring(0, 100) + '...',
      url: doc.url
    }));
    
    await this.saveIndex('search-index-light.json', lightIndex);
    
    console.log(`    🔍 Search index: ${searchIndex.length} documents`);
  }
}

// Run if called directly
if (require.main === module) {
  new ContentIndexer().index()
    .then(stats => {
      console.log('📊 Indexing stats:', stats);
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = ContentIndexer;