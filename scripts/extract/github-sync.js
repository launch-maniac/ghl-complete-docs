const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

class GitHubSync {
  constructor() {
    this.outputDir = path.join(__dirname, '../../content/official');
    this.githubAPI = 'https://api.github.com';
    this.stats = {
      repos: 0,
      files: 0,
      errors: 0
    };
  }

  async sync() {
    console.log('🔄 Starting GitHub repositories sync...');
    await fs.ensureDir(this.outputDir);
    
    try {
      // Known GoHighLevel repositories
      const repos = [
        'GoHighLevel/gohighlevel-api-docs',
        'GoHighLevel/gohighlevel-examples',
        'GoHighLevel/gohighlevel-sdk',
        'GoHighLevel/webhook-examples'
      ];

      for (const repo of repos) {
        await this.syncRepository(repo);
      }

      // Also search for other potential repos
      await this.searchGoHighLevelRepos();

      // Generate index
      await this.generateIndex();
      
      console.log(`✅ GitHub sync complete: ${this.stats.files} files from ${this.stats.repos} repos`);
      
    } catch (error) {
      console.error('❌ GitHub sync error:', error);
      this.stats.errors++;
    }

    return this.stats;
  }

  async syncRepository(repoPath) {
    try {
      console.log(`  📦 Syncing repository: ${repoPath}`);
      
      const [owner, repo] = repoPath.split('/');
      const repoDir = path.join(this.outputDir, repo);
      await fs.ensureDir(repoDir);

      // Get repository information
      const repoInfo = await this.getRepoInfo(owner, repo);
      if (!repoInfo) {
        console.log(`    ⚠️ Repository ${repoPath} not found or not accessible`);
        return;
      }

      // Get repository contents
      const contents = await this.getRepoContents(owner, repo);
      
      let fileCount = 0;
      for (const item of contents) {
        if (item.type === 'file' && this.shouldSyncFile(item.name)) {
          await this.downloadFile(owner, repo, item, repoDir);
          fileCount++;
        } else if (item.type === 'dir') {
          // Recursively sync directories (limit depth)
          await this.syncDirectory(owner, repo, item.path, repoDir, 1);
        }
      }

      // Save repository metadata
      await fs.writeJson(path.join(repoDir, '_repo_meta.json'), {
        ...repoInfo,
        syncedAt: new Date().toISOString(),
        fileCount: fileCount
      });

      this.stats.repos++;
      this.stats.files += fileCount;
      console.log(`    ✅ Synced ${fileCount} files from ${repo}`);

    } catch (error) {
      console.error(`    ❌ Error syncing ${repoPath}:`, error.message);
      this.stats.errors++;
    }
  }

  async syncDirectory(owner, repo, dirPath, baseDir, depth) {
    if (depth > 2) return; // Limit recursion depth

    try {
      const contents = await this.getRepoContents(owner, repo, dirPath);
      const localDir = path.join(baseDir, dirPath);
      await fs.ensureDir(localDir);

      for (const item of contents) {
        if (item.type === 'file' && this.shouldSyncFile(item.name)) {
          await this.downloadFile(owner, repo, item, baseDir);
          this.stats.files++;
        } else if (item.type === 'dir' && depth < 2) {
          await this.syncDirectory(owner, repo, item.path, baseDir, depth + 1);
        }
      }
    } catch (error) {
      console.error(`Error syncing directory ${dirPath}:`, error.message);
    }
  }

  async downloadFile(owner, repo, fileItem, baseDir) {
    try {
      const response = await axios.get(fileItem.download_url);
      const filePath = path.join(baseDir, fileItem.path);
      
      // Ensure directory exists
      await fs.ensureDir(path.dirname(filePath));
      await fs.writeFile(filePath, response.data);
      
    } catch (error) {
      console.error(`Error downloading ${fileItem.path}:`, error.message);
    }
  }

  async getRepoInfo(owner, repo) {
    try {
      const response = await axios.get(`${this.githubAPI}/repos/${owner}/${repo}`);
      return {
        name: response.data.name,
        description: response.data.description,
        url: response.data.html_url,
        stars: response.data.stargazers_count,
        forks: response.data.forks_count,
        updated: response.data.updated_at
      };
    } catch (error) {
      if (error.response?.status === 404) {
        return null; // Repository not found
      }
      throw error;
    }
  }

  async getRepoContents(owner, repo, path = '') {
    try {
      const url = `${this.githubAPI}/repos/${owner}/${repo}/contents${path ? '/' + path : ''}`;
      const response = await axios.get(url);
      return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
      console.error(`Error getting contents for ${owner}/${repo}/${path}:`, error.message);
      return [];
    }
  }

  async searchGoHighLevelRepos() {
    try {
      console.log('  🔍 Searching for additional GoHighLevel repositories...');
      
      const searchQuery = 'org:GoHighLevel OR gohighlevel OR "go high level"';
      const response = await axios.get(`${this.githubAPI}/search/repositories`, {
        params: {
          q: searchQuery,
          sort: 'stars',
          order: 'desc'
        }
      });

      const foundRepos = response.data.items
        .filter(repo => !repo.private && repo.size > 0)
        .slice(0, 5); // Limit to top 5 results

      console.log(`    Found ${foundRepos.length} additional repositories`);

      for (const repo of foundRepos) {
        const repoPath = `${repo.owner.login}/${repo.name}`;
        if (this.stats.repos < 10) { // Limit total repos
          await this.syncRepository(repoPath);
        }
      }

    } catch (error) {
      console.error('Error searching repositories:', error.message);
    }
  }

  shouldSyncFile(filename) {
    const extensions = ['.md', '.txt', '.json', '.yml', '.yaml', '.js', '.ts', '.py'];
    const important = ['README', 'CHANGELOG', 'LICENSE', 'CONTRIBUTING'];
    
    return extensions.some(ext => filename.toLowerCase().endsWith(ext)) ||
           important.some(name => filename.toUpperCase().includes(name));
  }

  async generateIndex() {
    const index = {
      generated: new Date().toISOString(),
      stats: this.stats,
      repositories: []
    };

    try {
      const repos = await fs.readdir(this.outputDir);
      
      for (const repo of repos) {
        if (repo.startsWith('.')) continue;
        
        const repoDir = path.join(this.outputDir, repo);
        const metaFile = path.join(repoDir, '_repo_meta.json');
        
        if (await fs.pathExists(metaFile)) {
          const meta = await fs.readJson(metaFile);
          index.repositories.push({
            name: repo,
            ...meta
          });
        }
      }
    } catch (error) {
      console.error('Error generating GitHub index:', error);
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
  new GitHubSync().sync()
    .then(stats => {
      console.log('📊 Final stats:', stats);
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = GitHubSync;