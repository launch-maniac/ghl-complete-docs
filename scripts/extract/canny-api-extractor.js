const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const TurndownService = require('turndown');
const { getEmojiWithSpace } = require('../utils/emoji');

class CannyRssExtractor {
  constructor() {
    this.rssUrl = 'https://ideas.gohighlevel.com/api/changelog/feed.rss';
    this.outputDir = path.join(__dirname, '../../content/ideas');
    this.turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-'
    });
    this.stats = {
      changelog: 0,
      posts: 0,
      boards: 0,
      errors: 0,
      startTime: Date.now()
    };
  }

  async extract() {
    console.log(`${getEmojiWithSpace('🔥', 'STARTING')}Starting RSS feed extraction for ideas.gohighlevel.com...`);
    await fs.ensureDir(this.outputDir);

    try {
      // Extract changelog entries from RSS feed
      await this.extractChangelogFromRss();

      // Generate index
      await this.generateIndex();

      console.log(`${getEmojiWithSpace('✅', 'SUCCESS')}RSS feed extraction complete: ${this.stats.changelog} changelog entries`);

    } catch (error) {
      console.error(`${getEmojiWithSpace('❌', 'ERROR')}RSS feed extraction error:`, error);
      this.stats.errors++;
    }

    return this.stats;
  }

  async extractChangelogFromRss() {
    console.log(`${getEmojiWithSpace('📝', 'EXTRACTING')}Extracting changelog from RSS feed...`);

    try {
      console.log(`  ${getEmojiWithSpace('🔗', 'FETCHING')}Fetching RSS feed: ${this.rssUrl}`);
      const response = await axios.get(this.rssUrl, {
        headers: {
          'User-Agent': 'GHL-Complete-Docs/2.0.0',
          'Accept': 'application/rss+xml, application/xml, text/xml'
        },
        timeout: 30000
      });

      const rssContent = response.data;
      console.log(`  ${getEmojiWithSpace('📄', 'FETCHED')}RSS feed fetched successfully (${rssContent.length} characters)`);

      // Parse RSS entries using regex (simple approach)
      const entries = this.parseRssEntries(rssContent);
      console.log(`  ${getEmojiWithSpace('📚', 'FOUND')}Found ${entries.length} changelog entries`);

      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        await this.saveChangelogEntry(entry, i + 1);
      }

      this.stats.changelog = entries.length;

    } catch (error) {
      console.error(`${getEmojiWithSpace('❌', 'ERROR')}Error extracting changelog from RSS:`, error.message);
      this.stats.errors++;
    }
  }

  parseRssEntries(rssContent) {
    const entries = [];

    // Use regex to extract RSS items
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let itemMatch;

    while ((itemMatch = itemRegex.exec(rssContent)) !== null) {
      const itemContent = itemMatch[1];

      const entry = {
        title: this.extractXmlValue(itemContent, 'title'),
        description: this.extractXmlValue(itemContent, 'description'),
        link: this.extractXmlValue(itemContent, 'link'),
        pubDate: this.extractXmlValue(itemContent, 'pubDate'),
        guid: this.extractXmlValue(itemContent, 'guid'),
        author: this.extractXmlValue(itemContent, 'author') || this.extractXmlValue(itemContent, 'dc:creator'),
        categories: this.extractAllXmlValues(itemContent, 'category')
      };

      if (entry.title && entry.description) {
        entries.push(entry);
      }
    }

    return entries;
  }

  extractXmlValue(content, tagName) {
    const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim().replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1') : null;
  }

  extractAllXmlValues(content, tagName) {
    const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'gi');
    const values = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      values.push(match[1].trim().replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1'));
    }

    return values;
  }

  async saveChangelogEntry(entry, index) {
    try {
      // Convert HTML content to markdown
      const markdown = this.turndownService.turndown(entry.description || entry.title);

      // Create filename
      const sanitizedTitle = entry.title
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
        .substring(0, 50);

      const filename = `changelog-${index.toString().padStart(3, '0')}-${sanitizedTitle}.md`;
      const outputPath = path.join(this.outputDir, 'changelog', filename);

      // Parse pubDate
      const pubDate = entry.pubDate ? new Date(entry.pubDate).toISOString() : new Date().toISOString();

      // Prepare frontmatter
      const frontmatter = {
        title: entry.title,
        type: 'changelog',
        source: 'ideas.gohighlevel.com',
        guid: entry.guid,
        author: entry.author || 'GoHighLevel',
        pubDate: pubDate,
        link: entry.link,
        categories: entry.categories || [],
        url: entry.link || 'https://ideas.gohighlevel.com/changelog',
        index: index
      };

      // Create the markdown content with frontmatter
      const markdownContent = this.createMarkdownWithFrontmatter(frontmatter, markdown);

      // Save the file
      await fs.ensureDir(path.dirname(outputPath));
      await fs.writeFile(outputPath, markdownContent, 'utf8');

      console.log(`    ${getEmojiWithSpace('💾', 'SAVED')}Saved changelog entry: ${filename}`);

    } catch (error) {
      console.error(`    ${getEmojiWithSpace('❌', 'ERROR')}Error saving changelog entry ${entry.title}:`, error.message);
      this.stats.errors++;
    }
  }

  // Note: savePost method removed since we're only extracting changelog via RSS

  createMarkdownWithFrontmatter(frontmatter, content) {
    const frontmatterString = Object.entries(frontmatter)
      .map(([key, value]) => `${key}: ${typeof value === 'string' ? `"${value}"` : value}`)
      .join('\n');

    return `---
${frontmatterString}
---

${content}`;
  }

  // Note: makeApiCall method removed since we're using RSS feed instead of API

  async generateIndex() {
    console.log(`${getEmojiWithSpace('📑', 'GENERATING')}Generating index...`);

    const indexData = {
      source: 'ideas.gohighlevel.com',
      type: 'rss-feed',
      extracted: new Date().toISOString(),
      stats: {
        changelog: this.stats.changelog,
        errors: this.stats.errors
      },
      categories: [
        'changelog'
      ]
    };

    const indexPath = path.join(this.outputDir, 'index.json');
    await fs.writeJson(indexPath, indexData, { spaces: 2 });

    console.log(`  ${getEmojiWithSpace('📝', 'SAVED')}Index saved to: ${indexPath}`);
  }

  // Generate detailed final report
  generateFinalReport() {
    const duration = (Date.now() - this.stats.startTime) / 1000;

    console.log(`\n${getEmojiWithSpace('📊', 'REPORT')}RSS FEED EXTRACTION COMPLETE`);
    console.log('='.repeat(50));
    console.log(`${getEmojiWithSpace('⏱️', 'DURATION')}Duration: ${duration.toFixed(1)}s`);
    console.log(`${getEmojiWithSpace('📝', 'ENTRIES')}Changelog Entries: ${this.stats.changelog}`);
    console.log(`${getEmojiWithSpace('❌', 'ERRORS')}Errors: ${this.stats.errors}`);
    console.log('='.repeat(50));

    return this.stats;
  }
}

// Run if called directly
if (require.main === module) {
  const extractor = new CannyRssExtractor();
  extractor.extract()
    .then(stats => {
      const finalStats = extractor.generateFinalReport();
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = CannyRssExtractor;