#!/usr/bin/env node

/**
 * Build Search Index
 * Generates a comprehensive search index from all extracted documentation
 */

const fs = require('fs-extra');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../content');
const DOCS_DATA_DIR = path.join(__dirname, '../docs/data');
const OUTPUT_FILE = path.join(DOCS_DATA_DIR, 'search-index.json');

// Category configurations
const CATEGORIES = {
    'marketplace': {
        name: 'Marketplace Documentation',
        type: 'documentation',
        sourceUrl: 'https://marketplace.gohighlevel.com/docs'
    },
    'videos': {
        name: 'Video Tutorials',
        type: 'video',
        sourceUrl: 'https://youtube.com/@gohighlevel'
    },
    'ideas': {
        name: 'Changelog',
        type: 'documentation',
        sourceUrl: 'https://ideas.gohighlevel.com/changelog',
        subfolder: 'changelog'  // Only process official changelog, not suggestions/boards
    },
    'github': {
        name: 'Code Examples',
        type: 'code',
        sourceUrl: 'https://github.com/GoHighLevel'
    }
};

console.log('Building search index...');

async function buildSearchIndex() {
    const searchIndex = [];
    let totalProcessed = 0;

    // Process each content category
    for (const [categoryKey, categoryConfig] of Object.entries(CATEGORIES)) {
        const categoryPath = path.join(CONTENT_DIR, categoryKey);

        if (!fs.existsSync(categoryPath)) {
            console.log(`Skipping ${categoryKey} - directory not found`);
            continue;
        }

        console.log(`Processing ${categoryKey}...`);

        const docs = await processCategory(categoryPath, categoryConfig);
        searchIndex.push(...docs);
        totalProcessed += docs.length;

        console.log(`  Added ${docs.length} documents from ${categoryKey}`);
    }

    // Write the search index
    await fs.ensureDir(DOCS_DATA_DIR);
    await fs.writeJSON(OUTPUT_FILE, searchIndex, { spaces: 2 });

    console.log(`\nSearch index built successfully!`);
    console.log(`Total documents indexed: ${totalProcessed}`);
    console.log(`Output: ${OUTPUT_FILE}`);

    return searchIndex;
}

async function processCategory(categoryPath, categoryConfig) {
    const documents = [];

    // If subfolder is specified, only process that subfolder
    let targetPath = categoryPath;
    if (categoryConfig.subfolder) {
        targetPath = path.join(categoryPath, categoryConfig.subfolder);

        if (!fs.existsSync(targetPath)) {
            console.log(`  Warning: Subfolder ${categoryConfig.subfolder} not found in ${categoryPath}`);
            return documents;
        }
    }

    // Read all markdown files recursively
    const files = await getAllMarkdownFiles(targetPath);

    for (const filePath of files) {
        try {
            const doc = await processMarkdownFile(filePath, categoryPath, categoryConfig);
            if (doc) {
                documents.push(doc);
            }
        } catch (error) {
            console.error(`  Error processing ${filePath}:`, error.message);
        }
    }

    return documents;
}

async function getAllMarkdownFiles(dirPath) {
    const files = [];

    async function traverse(currentPath) {
        const entries = await fs.readdir(currentPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);

            if (entry.isDirectory()) {
                await traverse(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.md')) {
                files.push(fullPath);
            }
        }
    }

    await traverse(dirPath);
    return files;
}

async function processMarkdownFile(filePath, categoryPath, categoryConfig) {
    const content = await fs.readFile(filePath, 'utf-8');
    const relativePath = path.relative(categoryPath, filePath);
    const fileName = path.basename(filePath, '.md');

    // Extract metadata from markdown
    const metadata = extractMetadata(content);
    const title = sanitizeText(metadata.title || extractTitle(content) || fileName);
    const description = metadata.description || extractDescription(content);
    const url = metadata.url || generateUrl(categoryConfig.sourceUrl, relativePath);

    // Generate unique ID
    const id = generateId(categoryConfig.name, relativePath);

    // Extract tags
    const tags = extractTags(content, title);

    return {
        id,
        title,
        content: description,
        description,
        category: categoryConfig.name,
        url,
        type: categoryConfig.type,
        tags,
        lastUpdated: metadata.date || new Date().toISOString().split('T')[0],
        slug: fileName,
        filePath: relativePath,
        extractedAt: new Date().toISOString()
    };
}

function extractMetadata(content) {
    const metadata = {};

    // Extract frontmatter if present
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];

        // Parse YAML-like frontmatter
        const lines = frontmatter.split('\n');
        for (const line of lines) {
            const match = line.match(/^(\w+):\s*(.+)$/);
            if (match) {
                metadata[match[1].toLowerCase()] = match[2].trim().replace(/^["']|["']$/g, '');
            }
        }
    }

    // Extract URL if present
    const urlMatch = content.match(/\[.*?\]\((https?:\/\/[^\s)]+)\)/);
    if (urlMatch) {
        metadata.url = urlMatch[1];
    }

    // Extract date
    const dateMatch = content.match(/(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
        metadata.date = dateMatch[1];
    }

    return metadata;
}

function extractTitle(content) {
    // Try to find the first heading
    const headingMatch = content.match(/^#\s+(.+)$/m);
    if (headingMatch) {
        return headingMatch[1].trim();
    }

    // Try to find first bold text
    const boldMatch = content.match(/\*\*(.+?)\*\*/);
    if (boldMatch) {
        return boldMatch[1].trim();
    }

    return null;
}

function sanitizeText(text) {
    if (!text) return '';

    return text
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
        .replace(/[\uD800-\uDFFF]/g, '') // Remove unpaired surrogates
        .replace(/[^\x20-\x7E\u00A0-\uFFFF]/g, '') // Keep only valid characters
        .trim();
}

function extractDescription(content) {
    // Remove frontmatter
    let text = content.replace(/^---\n[\s\S]*?\n---\n/, '');

    // Remove markdown syntax
    text = text
        .replace(/^#+\s+/gm, '') // Remove headings
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
        .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1') // Remove bold/italic
        .replace(/`([^`]+)`/g, '$1') // Remove code
        .replace(/^[-*+]\s+/gm, '') // Remove list markers
        .replace(/^\d+\.\s+/gm, '') // Remove numbered lists
        .replace(/\n\n+/g, ' ') // Replace multiple newlines with space
        .trim();

    // Clean up special characters that cause JSON encoding issues
    text = text
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
        .replace(/[\uD800-\uDFFF]/g, '') // Remove unpaired surrogates
        .replace(/[^\x20-\x7E\u00A0-\uFFFF]/g, ''); // Keep only valid characters

    // Take first 250 characters
    if (text.length > 250) {
        text = text.substring(0, 250).trim() + '...';
    }

    return text || 'GoHighLevel documentation and resources';
}

function extractTags(content, title) {
    const tags = new Set();

    // Common GHL keywords
    const keywords = [
        'api', 'oauth', 'authentication', 'webhook', 'contact', 'crm',
        'automation', 'workflow', 'calendar', 'booking', 'email', 'sms',
        'pipeline', 'opportunity', 'funnel', 'marketplace', 'app', 'integration',
        'location', 'agency', 'sub-account', 'custom field', 'trigger', 'action'
    ];

    const textLower = (title + ' ' + content).toLowerCase();

    for (const keyword of keywords) {
        if (textLower.includes(keyword)) {
            tags.add(keyword);
        }
    }

    // Limit to 10 tags
    return Array.from(tags).slice(0, 10);
}

function generateUrl(baseUrl, relativePath) {
    // Remove .md extension and convert to URL path
    const urlPath = relativePath
        .replace(/\.md$/, '')
        .replace(/\\/g, '/');

    return `${baseUrl}/${urlPath}`;
}

function generateId(category, relativePath) {
    // Create a unique ID from category and file path
    return category.toLowerCase().replace(/\s+/g, '-') + '-' +
           relativePath
               .replace(/\.md$/, '')
               .replace(/[/\\]/g, '-')
               .replace(/[^a-z0-9-]/gi, '-')
               .toLowerCase();
}

// Run the builder
buildSearchIndex()
    .then(() => {
        console.log('\nDone!');
        process.exit(0);
    })
    .catch(error => {
        console.error('Error building search index:', error);
        process.exit(1);
    });
