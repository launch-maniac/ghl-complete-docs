const fs = require('fs-extra');
const path = require('path');

class StatsGenerator {
  constructor() {
    this.contentDir = path.join(__dirname, '../../content');
  }

  async generate() {
    console.log('📊 Generating statistics...');
    
    const stats = {
      timestamp: new Date().toISOString(),
      totalDocuments: 0,
      categories: {},
      lastUpdated: null,
      errors: 0
    };

    // Process each category
    await this.processCategory('help', stats);
    await this.processCategory('ideas', stats);
    await this.processCategory('marketplace', stats);
    await this.processCategory('official', stats);

    // Output stats
    this.outputStats(stats);
    return stats;
  }

  async processCategory(categoryName, stats) {
    const categoryPath = path.join(this.contentDir, categoryName);
    
    try {
      if (!(await fs.pathExists(categoryPath))) {
        stats.categories[categoryName] = {
          documents: 0,
          subcategories: 0,
          lastUpdate: null
        };
        return;
      }

      const categoryStats = await this.analyzeDirectory(categoryPath);
      stats.categories[categoryName] = categoryStats;
      stats.totalDocuments += categoryStats.documents;

      // Update overall last updated time
      if (!stats.lastUpdated || (categoryStats.lastUpdate && categoryStats.lastUpdate > stats.lastUpdated)) {
        stats.lastUpdated = categoryStats.lastUpdate;
      }

    } catch (error) {
      console.error(`Error processing category ${categoryName}:`, error.message);
      stats.errors++;
    }
  }

  async analyzeDirectory(dirPath) {
    let documents = 0;
    let subcategories = 0;
    let lastUpdate = null;
    let totalSize = 0;

    try {
      const items = await fs.readdir(dirPath);

      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stat = await fs.stat(itemPath);

        if (stat.isDirectory()) {
          subcategories++;
          // Recursively analyze subdirectories
          const subStats = await this.analyzeDirectory(itemPath);
          documents += subStats.documents;
          totalSize += subStats.totalSize;
          
          if (!lastUpdate || (subStats.lastUpdate && subStats.lastUpdate > lastUpdate)) {
            lastUpdate = subStats.lastUpdate;
          }
        } else if (item.endsWith('.md') && !item.startsWith('_')) {
          documents++;
          totalSize += stat.size;
          
          if (!lastUpdate || stat.mtime > new Date(lastUpdate)) {
            lastUpdate = stat.mtime.toISOString();
          }
        }
      }
    } catch (error) {
      console.error(`Error analyzing directory ${dirPath}:`, error.message);
    }

    return {
      documents,
      subcategories,
      lastUpdate,
      totalSize: this.formatBytes(totalSize)
    };
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  outputStats(stats) {
    console.log('\n📊 DOCUMENTATION STATISTICS');
    console.log('=' .repeat(50));
    console.log(`Generated: ${new Date(stats.timestamp).toLocaleString()}`);
    console.log(`Total Documents: ${stats.totalDocuments}`);
    console.log(`Last Updated: ${stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleString() : 'Never'}`);
    console.log(`Errors: ${stats.errors}`);
    
    console.log('\n📁 BY CATEGORY:');
    for (const [category, data] of Object.entries(stats.categories)) {
      console.log(`  ${category.toUpperCase()}:`);
      console.log(`    Documents: ${data.documents}`);
      console.log(`    Subcategories: ${data.subcategories}`);
      console.log(`    Size: ${data.totalSize}`);
      console.log(`    Last Update: ${data.lastUpdate ? new Date(data.lastUpdate).toLocaleString() : 'Never'}`);
    }

    // Generate summary for commit messages
    const summary = this.generateSummary(stats);
    console.log('\n📝 SUMMARY FOR COMMIT:');
    console.log(summary);
  }

  generateSummary(stats) {
    const total = stats.totalDocuments;
    const help = stats.categories.help?.documents || 0;
    const ideas = stats.categories.ideas?.documents || 0;
    const marketplace = stats.categories.marketplace?.documents || 0;
    const official = stats.categories.official?.documents || 0;

    return `Updated documentation: ${total} total documents
- 📚 Help: ${help} articles
- 💡 Ideas: ${ideas} posts  
- 🛍️ Marketplace: ${marketplace} docs
- 🔧 Official: ${official} files

Last sync: ${new Date().toLocaleDateString()}`;
  }
}

// Run if called directly
if (require.main === module) {
  new StatsGenerator().generate()
    .then(() => {
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = StatsGenerator;