#!/usr/bin/env node

/**
 * GitHub Repository Extractor
 * Extracts documentation, READMEs, and code examples from GoHighLevel GitHub repositories
 */

const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const TurndownService = require('turndown');
const { getEmojiWithSpace } = require('../utils/emoji');

class GitHubExtractor {
  constructor() {
    this.outputDir = path.join(__dirname, '../../content/github');
    this.dataDir = path.join(__dirname, '../../docs/data/github');

    // GitHub repositories to extract
    this.repositories = [
      {
        owner: 'GoHighLevel',
        repo: 'ghl-marketplace-app-template',
        description: 'Marketplace app development template and examples'
      },
      {
        owner: 'GoHighLevel',
        repo: 'ghl-sdk-examples',
        description: 'SDK usage examples and code samples'
      },
      {
        owner: 'GoHighLevel',
        repo: 'highlevel-api-sdk',
        description: 'Official API SDK documentation'
      }
    ];

    this.turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-'
    });

    this.stats = {
      repositories: 0,
      documents: 0,
      codeExamples: 0,
      errors: 0,
      startTime: Date.now()
    };

    // GitHub API token (optional, increases rate limit)
    this.githubToken = process.env.GITHUB_TOKEN || null;
  }

  async extract() {
    console.log(`${getEmojiWithSpace('🔥', 'STARTING')}Starting GitHub repository extraction...`);

    await fs.ensureDir(this.outputDir);
    await fs.ensureDir(this.dataDir);

    for (const repo of this.repositories) {
      try {
        console.log(`\n${getEmojiWithSpace('📦', 'PROCESSING')}Processing ${repo.owner}/${repo.repo}...`);
        await this.extractRepository(repo);
        this.stats.repositories++;
      } catch (error) {
        console.error(`${getEmojiWithSpace('❌', 'ERROR')}Failed to extract ${repo.owner}/${repo.repo}:`, error.message);
        this.stats.errors++;
      }
    }

    // Generate index
    await this.generateIndex();

    const duration = ((Date.now() - this.stats.startTime) / 1000).toFixed(2);
    console.log(`\n${getEmojiWithSpace('✅', 'SUCCESS')}GitHub extraction complete in ${duration}s`);
    console.log(`  Repositories: ${this.stats.repositories}`);
    console.log(`  Documents: ${this.stats.documents}`);
    console.log(`  Code Examples: ${this.stats.codeExamples}`);
    console.log(`  Errors: ${this.stats.errors}`);

    return this.stats;
  }

  async extractRepository(repoInfo) {
    const { owner, repo } = repoInfo;
    const repoPath = path.join(this.outputDir, `${owner}-${repo}`);
    await fs.ensureDir(repoPath);

    // 1. Extract README
    console.log(`  ${getEmojiWithSpace('📄', 'EXTRACTING')}Extracting README...`);
    await this.extractReadme(owner, repo, repoPath);

    // 2. Extract /docs folder
    console.log(`  ${getEmojiWithSpace('📚', 'EXTRACTING')}Extracting /docs folder...`);
    await this.extractDocsFolder(owner, repo, repoPath);

    // 3. Extract code examples
    console.log(`  ${getEmojiWithSpace('💻', 'EXTRACTING')}Extracting code examples...`);
    await this.extractCodeExamples(owner, repo, repoPath);

    // 4. Extract repository metadata
    await this.extractRepoMetadata(owner, repo, repoPath);
  }

  async extractReadme(owner, repo, outputPath) {
    try {
      const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
      const response = await this.githubApiRequest(readmeUrl);

      if (response.data && response.data.content) {
        // Decode base64 content
        const content = Buffer.from(response.data.content, 'base64').toString('utf-8');

        const filePath = path.join(outputPath, 'README.md');
        await fs.writeFile(filePath, content);

        this.stats.documents++;
        console.log(`    ${getEmojiWithSpace('✓', 'SUCCESS')}README.md extracted`);
      }
    } catch (error) {
      console.log(`    ${getEmojiWithSpace('⚠️', 'WARNING')}No README found or error: ${error.message}`);
    }
  }

  async extractDocsFolder(owner, repo, outputPath) {
    try {
      const docsUrl = `https://api.github.com/repos/${owner}/${repo}/contents/docs`;
      const response = await this.githubApiRequest(docsUrl);

      if (response.data && Array.isArray(response.data)) {
        const docsPath = path.join(outputPath, 'docs');
        await fs.ensureDir(docsPath);

        for (const item of response.data) {
          if (item.type === 'file' && (item.name.endsWith('.md') || item.name.endsWith('.mdx'))) {
            await this.downloadFile(item.download_url, path.join(docsPath, item.name));
            this.stats.documents++;
          } else if (item.type === 'dir') {
            // Recursively extract subdirectories
            await this.extractDirectory(owner, repo, `docs/${item.name}`, path.join(docsPath, item.name));
          }
        }

        console.log(`    ${getEmojiWithSpace('✓', 'SUCCESS')}Docs folder extracted`);
      }
    } catch (error) {
      console.log(`    ${getEmojiWithSpace('⚠️', 'WARNING')}No /docs folder found or error: ${error.message}`);
    }
  }

  async extractDirectory(owner, repo, dirPath, outputPath) {
    try {
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${dirPath}`;
      const response = await this.githubApiRequest(url);

      if (response.data && Array.isArray(response.data)) {
        await fs.ensureDir(outputPath);

        for (const item of response.data) {
          if (item.type === 'file' && (item.name.endsWith('.md') || item.name.endsWith('.mdx'))) {
            await this.downloadFile(item.download_url, path.join(outputPath, item.name));
            this.stats.documents++;
          } else if (item.type === 'dir') {
            await this.extractDirectory(owner, repo, `${dirPath}/${item.name}`, path.join(outputPath, item.name));
          }
        }
      }
    } catch (error) {
      // Silent fail for missing directories
    }
  }

  async extractCodeExamples(owner, repo, outputPath) {
    try {
      // Look for examples, samples, or src directories
      const exampleDirs = ['examples', 'samples', 'demo', 'src'];

      for (const dir of exampleDirs) {
        try {
          const url = `https://api.github.com/repos/${owner}/${repo}/contents/${dir}`;
          const response = await this.githubApiRequest(url);

          if (response.data && Array.isArray(response.data)) {
            const examplesPath = path.join(outputPath, 'examples', dir);
            await fs.ensureDir(examplesPath);

            // Extract JS, TS, and markdown files
            for (const item of response.data) {
              if (item.type === 'file') {
                const ext = path.extname(item.name);
                if (['.js', '.ts', '.jsx', '.tsx', '.md', '.mdx'].includes(ext)) {
                  await this.downloadFile(item.download_url, path.join(examplesPath, item.name));
                  this.stats.codeExamples++;
                }
              } else if (item.type === 'dir') {
                await this.extractExamplesDirectory(owner, repo, `${dir}/${item.name}`, path.join(examplesPath, item.name));
              }
            }
          }
        } catch (error) {
          // Silent fail for missing example directories
        }
      }

      if (this.stats.codeExamples > 0) {
        console.log(`    ${getEmojiWithSpace('✓', 'SUCCESS')}${this.stats.codeExamples} code examples extracted`);
      }
    } catch (error) {
      console.log(`    ${getEmojiWithSpace('⚠️', 'WARNING')}Error extracting code examples: ${error.message}`);
    }
  }

  async extractExamplesDirectory(owner, repo, dirPath, outputPath) {
    try {
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${dirPath}`;
      const response = await this.githubApiRequest(url);

      if (response.data && Array.isArray(response.data)) {
        await fs.ensureDir(outputPath);

        for (const item of response.data) {
          if (item.type === 'file') {
            const ext = path.extname(item.name);
            if (['.js', '.ts', '.jsx', '.tsx', '.md', '.mdx'].includes(ext)) {
              await this.downloadFile(item.download_url, path.join(outputPath, item.name));
              this.stats.codeExamples++;
            }
          }
        }
      }
    } catch (error) {
      // Silent fail
    }
  }

  async extractRepoMetadata(owner, repo, outputPath) {
    try {
      const url = `https://api.github.com/repos/${owner}/${repo}`;
      const response = await this.githubApiRequest(url);

      if (response.data) {
        const metadata = {
          name: response.data.name,
          fullName: response.data.full_name,
          description: response.data.description,
          url: response.data.html_url,
          stars: response.data.stargazers_count,
          forks: response.data.forks_count,
          lastUpdated: response.data.updated_at,
          topics: response.data.topics || [],
          language: response.data.language,
          license: response.data.license?.name || 'Unknown',
          extractedAt: new Date().toISOString()
        };

        const metadataPath = path.join(outputPath, 'metadata.json');
        await fs.writeJSON(metadataPath, metadata, { spaces: 2 });
      }
    } catch (error) {
      console.log(`    ${getEmojiWithSpace('⚠️', 'WARNING')}Could not extract metadata: ${error.message}`);
    }
  }

  async downloadFile(url, outputPath) {
    try {
      const response = await axios.get(url, {
        headers: this.getHeaders(),
        timeout: 30000
      });

      await fs.writeFile(outputPath, response.data);
    } catch (error) {
      console.error(`    Error downloading ${url}:`, error.message);
    }
  }

  async githubApiRequest(url) {
    const headers = this.getHeaders();

    try {
      const response = await axios.get(url, { headers, timeout: 30000 });
      return response;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Not found');
      }
      throw error;
    }
  }

  getHeaders() {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'GHL-Complete-Docs-Extractor'
    };

    if (this.githubToken) {
      headers['Authorization'] = `token ${this.githubToken}`;
    }

    return headers;
  }

  async generateIndex() {
    console.log(`\n${getEmojiWithSpace('📊', 'GENERATING')}Generating index...`);

    const index = {
      repositories: [],
      totalDocuments: this.stats.documents,
      totalCodeExamples: this.stats.codeExamples,
      lastUpdate: new Date().toISOString()
    };

    for (const repo of this.repositories) {
      const repoPath = path.join(this.outputDir, `${repo.owner}-${repo.repo}`);
      const metadataPath = path.join(repoPath, 'metadata.json');

      if (await fs.pathExists(metadataPath)) {
        const metadata = await fs.readJSON(metadataPath);
        index.repositories.push(metadata);
      }
    }

    const indexPath = path.join(this.dataDir, 'index.json');
    await fs.writeJSON(indexPath, index, { spaces: 2 });

    console.log(`  ${getEmojiWithSpace('✓', 'SUCCESS')}Index generated: ${indexPath}`);
  }
}

// Run the extractor
if (require.main === module) {
  const extractor = new GitHubExtractor();
  extractor.extract()
    .then(() => {
      console.log(`\n${getEmojiWithSpace('🎉', 'COMPLETE')}GitHub extraction complete!`);
      process.exit(0);
    })
    .catch(error => {
      console.error(`\n${getEmojiWithSpace('💥', 'FATAL')}Fatal error:`, error);
      process.exit(1);
    });
}

module.exports = GitHubExtractor;
