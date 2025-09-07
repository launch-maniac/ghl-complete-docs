const fs = require('fs-extra');
const path = require('path');
const TurndownService = require('turndown');

class MarkdownConverter {
  constructor() {
    this.contentDir = path.join(__dirname, '../../content');
    this.turndown = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
      emDelimiter: '*'
    });
    
    this.stats = {
      processed: 0,
      converted: 0,
      errors: 0
    };
    
    // Configure turndown rules
    this.setupTurndownRules();
  }

  setupTurndownRules() {
    // Preserve line breaks in specific contexts
    this.turndown.addRule('lineBreaks', {
      filter: 'br',
      replacement: () => '  \n'
    });

    // Handle tables better
    this.turndown.addRule('tables', {
      filter: 'table',
      replacement: (content) => {
        return '\n' + content + '\n';
      }
    });

    // Handle code blocks
    this.turndown.addRule('codeBlocks', {
      filter: ['pre'],
      replacement: (content, node) => {
        const language = node.querySelector('code')?.className?.match(/language-(\w+)/)?.[1] || '';
        return '\n```' + language + '\n' + content + '\n```\n';
      }
    });

    // Handle images with alt text
    this.turndown.addRule('images', {
      filter: 'img',
      replacement: (content, node) => {
        const alt = node.getAttribute('alt') || '';
        const src = node.getAttribute('src') || '';
        const title = node.getAttribute('title') || '';
        
        return src ? `![${alt}](${src}${title ? ` "${title}"` : ''})` : '';
      }
    });
  }

  async process() {
    console.log('🔄 Processing markdown files...');
    
    try {
      await this.processDirectory(this.contentDir);
      
      console.log(`✅ Markdown processing complete:`);
      console.log(`  - Processed: ${this.stats.processed} files`);
      console.log(`  - Converted: ${this.stats.converted} files`);
      console.log(`  - Errors: ${this.stats.errors} files`);
      
    } catch (error) {
      console.error('❌ Markdown processing error:', error);
      throw error;
    }

    return this.stats;
  }

  async processDirectory(dirPath) {
    try {
      if (!(await fs.pathExists(dirPath))) {
        return;
      }

      const items = await fs.readdir(dirPath);
      
      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stat = await fs.stat(itemPath);
        
        if (stat.isDirectory()) {
          await this.processDirectory(itemPath);
        } else if (item.endsWith('.md')) {
          await this.processMarkdownFile(itemPath);
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${dirPath}:`, error.message);
      this.stats.errors++;
    }
  }

  async processMarkdownFile(filePath) {
    try {
      this.stats.processed++;
      
      const content = await fs.readFile(filePath, 'utf8');
      
      // Check if file needs processing (has HTML content)
      if (this.needsConversion(content)) {
        const processed = await this.convertFile(content, filePath);
        
        if (processed !== content) {
          await fs.writeFile(filePath, processed);
          this.stats.converted++;
          console.log(`  ✅ Converted: ${path.basename(filePath)}`);
        }
      }
      
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
      this.stats.errors++;
    }
  }

  needsConversion(content) {
    // Check for HTML tags that need conversion
    const htmlPatterns = [
      /<\/?(div|p|span|strong|em|ul|ol|li|h[1-6]|table|tr|td|th|thead|tbody|img|a)[^>]*>/i,
      /&[a-zA-Z]+;/, // HTML entities
      /<br\s*\/?>/i
    ];
    
    return htmlPatterns.some(pattern => pattern.test(content));
  }

  async convertFile(content, filePath) {
    try {
      // Split content into frontmatter and body
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const body = frontmatterMatch[2];
        
        // Convert HTML in body to markdown
        const convertedBody = this.convertHtmlToMarkdown(body);
        
        return `---\n${frontmatter}\n---\n\n${convertedBody}`;
      } else {
        // No frontmatter, convert entire content
        return this.convertHtmlToMarkdown(content);
      }
      
    } catch (error) {
      console.error(`Error converting ${filePath}:`, error.message);
      return content; // Return original if conversion fails
    }
  }

  convertHtmlToMarkdown(html) {
    try {
      // Pre-process HTML
      let processed = html
        // Fix common HTML entities
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        // Clean up whitespace
        .replace(/\s+/g, ' ')
        .trim();
      
      // Convert to markdown
      const markdown = this.turndown.turndown(processed);
      
      // Post-process markdown
      return markdown
        // Fix excessive line breaks
        .replace(/\n{3,}/g, '\n\n')
        // Clean up list formatting
        .replace(/^(\s*)- \s+/gm, '$1- ')
        // Fix header spacing
        .replace(/^(#{1,6})\s*(.+)$/gm, '$1 $2')
        .trim();
        
    } catch (error) {
      console.error('HTML to Markdown conversion error:', error.message);
      return html; // Return original if conversion fails
    }
  }
}

// Run if called directly
if (require.main === module) {
  new MarkdownConverter().process()
    .then(stats => {
      console.log('📊 Processing stats:', stats);
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = MarkdownConverter;