# GoHighLevel Complete Documentation

[![Daily Sync](https://github.com/YOUR-USERNAME/ghl-complete-docs/actions/workflows/daily-sync.yml/badge.svg)](https://github.com/YOUR-USERNAME/ghl-complete-docs/actions)
[![GitHub Pages](https://img.shields.io/badge/docs-live-brightgreen)](https://YOUR-USERNAME.github.io/ghl-complete-docs)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> Comprehensive, searchable archive of ALL GoHighLevel documentation, updated daily via GitHub Actions.

## 📊 Statistics

- **Help Articles**: 2,000+
- **Feature Requests**: 3,000+
- **API Endpoints**: 200+
- **Last Updated**: Auto-updates daily at 2 AM UTC

## 🔍 Search Interface

Visit: **[https://YOUR-USERNAME.github.io/ghl-complete-docs](https://YOUR-USERNAME.github.io/ghl-complete-docs)**

## 🚀 Quick Start

### 1. Fork & Clone
```bash
# Fork this repo on GitHub, then:
git clone https://github.com/YOUR-USERNAME/ghl-complete-docs.git
cd ghl-complete-docs
```

### 2. Setup
```bash
# Install dependencies
npm install

# Setup Git LFS
git lfs install
git lfs track "*.db"
git lfs track "assets/*"

# Test extraction (small sample)
npm run test
```

### 3. Enable GitHub Features
- **GitHub Actions**: Settings → Actions → General → Allow all actions
- **GitHub Pages**: Settings → Pages → Source: Deploy from branch (main /docs)
- **Permissions**: Settings → Actions → General → Workflow permissions → Read and write

### 4. Run Manual Extraction
```bash
# Extract everything locally
npm run extract:all

# Or use GitHub Actions
# Go to Actions tab → Manual Sync → Run workflow
```

## 📁 Repository Structure
```
├── content/          # Extracted documentation (markdown)
├── docs/            # GitHub Pages website
├── scripts/         # Extraction and processing scripts
├── database/        # SQLite database (Git LFS)
├── .github/         # GitHub Actions workflows
└── assets/          # Downloaded images (Git LFS)
```

## 🔄 Automatic Updates
- **Daily Sync**: Runs automatically at 2 AM UTC
- **Manual Trigger**: Actions tab → Daily Documentation Sync → Run workflow
- **Weekly Releases**: Automatic GitHub releases every Monday

## 📈 Features
- ✅ Complete help documentation from help.gohighlevel.com
- ✅ All feature requests from ideas.gohighlevel.com
- ✅ Marketplace documentation
- ✅ Official GitHub repositories
- ✅ Full-text search
- ✅ Daily updates
- ✅ Version history
- ✅ Zero hosting costs

## 🛠️ Development

### Local Development
```bash
# Run extraction
npm run extract:all

# Process content
npm run process:all

# Build search index
npm run build:search

# Serve locally
npm run serve
# Visit http://localhost:8080
```

### Testing
```bash
npm test
```

## 📝 License
MIT - See LICENSE

## 🤝 Contributing
Contributions welcome! Please open an issue or PR.

## ⚠️ Disclaimer
This is an unofficial documentation archive for GoHighLevel. For official documentation, visit:
- [GoHighLevel Help](https://help.gohighlevel.com)
- [GoHighLevel Ideas](https://ideas.gohighlevel.com)
- [GoHighLevel API](https://highlevel.stoplight.io)