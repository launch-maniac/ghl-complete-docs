# GHL Complete Docs 📚

> Complete GoHighLevel documentation extraction and intelligence system with AI-powered search, video tutorials, interactive API explorer, and comprehensive monitoring.

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](package.json)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](package.json)
[![Docs](https://img.shields.io/badge/docs-brain.launchmaniac.com-blue.svg)](https://brain.launchmaniac.com)

## 🎯 Overview

GHL Complete Docs is a comprehensive documentation extraction and intelligence system for GoHighLevel. It automatically scrapes, processes, and indexes documentation from multiple official sources to create a unified, searchable knowledge base.

### 📊 Current Stats
- **107 total documents** extracted and processed
- **6 official sources** continuously monitored
- **3 content categories** (Marketplace, Videos, Changelog)
- **100% extraction success rate** with real-time monitoring

## ✨ Features

### 🔍 **Multi-Source Documentation Extraction**
- **Marketplace Documentation** (marketplace.gohighlevel.com)
- **API Documentation** (developers.gohighlevel.com + highlevel.stoplight.io)
- **Help Articles** (help.gohighlevel.com)
- **Video Tutorials** (YouTube @gohighlevel)
- **Feature Requests & Changelog** (ideas.gohighlevel.com RSS feed)
- **Community Resources** (various sources)

### 🤖 **Intelligent Processing**
- RSS feed parsing for real-time updates
- HTML to Markdown conversion with proper formatting
- Metadata extraction and categorization
- Automatic content freshness monitoring
- Duplicate detection and handling

### 📈 **Analytics & Monitoring**
- Real-time extraction statistics
- Error monitoring and alerting
- Performance metrics tracking
- Content categorization analytics
- Search analytics (ready for AI integration)

### 🎨 **Developer Experience**
- Configurable emoji output (`NO_EMOJI=true` for CI/CD)
- Comprehensive logging with structured output
- GitHub Actions integration for automated syncing
- Modular architecture for easy extension

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/launch-maniac/ghl-complete-docs.git
cd ghl-complete-docs

# Install dependencies
npm install

# Run initial extraction
npm run extract:all

# Generate statistics
npm run stats
```

## 🛠️ Usage

### Available Scripts

| Script | Description | Example |
|--------|-------------|---------|
| `npm run extract:ideas` | Extract changelog from ideas.gohighlevel.com | RSS feed parsing |
| `npm run extract:marketplace` | Scrape marketplace documentation | API docs, guides |
| `npm run extract:videos` | Extract YouTube video tutorials | Channel scraping |
| `npm run extract:all` | Run all extractors sequentially | Full sync |
| `npm run stats` | Generate extraction statistics | Analytics report |
| `npm run monitor` | Run error monitoring system | Health checks |
| `npm run serve` | Serve docs locally (port 8000) | Development |
| `npm run dev` | Development mode (extract:all) | Development |

### Environment Variables

```bash
# Disable emojis in console output (great for CI/CD)
NO_EMOJI=true npm run extract:all
DISABLE_EMOJIS=true npm run stats

# Example output with emojis disabled:
# STARTING Starting RSS feed extraction...
# SUCCESS Extraction complete: 10 documents
```

### Example Usage

```bash
# Extract only changelog updates
npm run extract:ideas

# Extract with clean output for CI
NO_EMOJI=true npm run extract:all

# Generate comprehensive stats
npm run stats

# Monitor for errors
npm run monitor

# Serve documentation locally
npm run serve
# Visit http://localhost:8000
```

## 📁 Project Structure

```
ghl-complete-docs/
├── 📄 README.md                    # This file
├── 📦 package.json                 # Project configuration
├── 📁 scripts/                     # Extraction & processing scripts
│   ├── 📁 extract/                # Data extraction scripts
│   │   ├── canny-api-extractor.js  # Ideas/changelog RSS extraction
│   │   ├── marketplace-scraper.js   # Marketplace documentation
│   │   └── video-scraper.js        # YouTube video tutorials
│   ├── 📁 analytics/              # Analytics & reporting
│   │   └── generate-stats.js       # Statistics generation
│   ├── 📁 monitoring/             # Error monitoring
│   │   └── error-monitor.js        # Health monitoring system
│   └── 📁 utils/                  # Shared utilities
│       └── emoji.js               # Configurable emoji support
├── 📁 content/                    # Extracted content (Markdown)
│   ├── 📁 marketplace/            # Marketplace documentation
│   ├── 📁 videos/                 # Video tutorial transcripts
│   └── 📁 ideas/                  # Changelog entries
├── 📁 docs/                       # Generated documentation
│   └── 📁 data/                   # Processed data & indexes
│       └── master-index.json      # Main statistics file
├── 📁 .github/                    # GitHub Actions workflows
│   └── 📁 workflows/
│       └── daily-sync.yml         # Automated daily extraction
└── 📁 assets/                     # Static assets
```

## 🔄 Automated Workflows

### GitHub Actions Daily Sync
The repository includes automated workflows that run daily to keep documentation up-to-date:

- **Schedule**: Daily at 6 AM UTC
- **Triggers**: Manual dispatch, push to main
- **Actions**: Extract all sources, generate stats, commit updates
- **Notifications**: Automated commit messages with stats

## 📊 Data Sources & Coverage

| Source | Type | Documents | Status | Last Sync |
|--------|------|-----------|---------|-----------|
| **marketplace.gohighlevel.com** | Marketplace Docs | 25 | ✅ Active | Real-time |
| **highlevel.stoplight.io** | API Documentation | 48 | ✅ Active | Real-time |
| **help.gohighlevel.com** | Help Articles | 17 | ✅ Active | Real-time |
| **ideas.gohighlevel.com** | Changelog (RSS) | 10 | ✅ Active | Real-time |
| **youtube.com/@gohighlevel** | Video Tutorials | 6 | ✅ Active | Daily |
| **developers.gohighlevel.com** | API Docs | 1 | ✅ Active | Real-time |

## 🔧 Configuration

### Extraction Settings
Configure extraction behavior in `package.json`:

```json
{
  "config": {
    "extraction": {
      "rateLimit": 2000,        // Delay between requests (ms)
      "timeout": 30000,         // Request timeout (ms)
      "retries": 3              // Number of retry attempts
    },
    "monitoring": {
      "errorThreshold": 5,      // Error threshold for alerts
      "alertWebhook": false,    // Webhook notifications
      "githubIssues": true      // Auto-create GitHub issues
    }
  }
}
```

### Emoji Configuration
Control console output formatting:

```bash
# Default: Emojis enabled
📊 Generating documentation statistics...
✅ Stats generated: 107 total documents

# Disabled: Clean text output
NO_EMOJI=true npm run stats
GENERATING Generating documentation statistics...
SUCCESS Stats generated: 107 total documents
```

## 🤝 Contributing

### Development Setup

1. **Fork the repository**
2. **Clone your fork**: `git clone https://github.com/your-username/ghl-complete-docs.git`
3. **Install dependencies**: `npm install`
4. **Run tests**: `npm test` (when available)
5. **Make changes** and test locally
6. **Submit a pull request**

### Adding New Extractors

1. Create a new extractor in `scripts/extract/`
2. Follow the existing pattern (RSS/API/scraping)
3. Add emoji utility for consistent output
4. Update `package.json` scripts
5. Add extraction stats to analytics

### Code Style
- Use consistent emoji patterns with fallbacks
- Include comprehensive error handling
- Add detailed console logging
- Follow existing naming conventions

## 📋 API Reference

### Statistics API
The system generates a comprehensive statistics file at `docs/data/master-index.json`:

```json
{
  "totalDocuments": 107,
  "lastUpdate": "2025-09-20T20:10:50.271Z",
  "categories": {
    "Marketplace Documentation": 151,
    "Changelog": 10,
    "Video Tutorials": 6
  },
  "sources": { ... },
  "healthMetrics": {
    "extractionSuccessRate": 1.0,
    "averageResponseTime": 800,
    "uptime": 1.0,
    "errorsLast24h": 0
  }
}
```

## 🔍 Search & AI Integration

The system is designed to support advanced search capabilities:

- **Semantic Search**: Ready for vector embeddings
- **Intent Detection**: Query analysis and categorization
- **Analytics**: Search pattern tracking
- **Real-time Updates**: Fresh content for AI responses

## 📱 Deployment

### Production Deployment
```bash
# Build for production
npm run deploy

# Serve documentation
npm run serve

# Monitor health
npm run monitor
```

### Docker Support
```dockerfile
# Dockerfile example (to be added)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 8000
CMD ["npm", "run", "serve"]
```

## 🐛 Troubleshooting

### Common Issues

**Extraction Failures**
```bash
# Check error logs
npm run monitor

# Test individual extractors
npm run extract:ideas
npm run extract:marketplace
npm run extract:videos
```

**Missing Dependencies**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**CI/CD Issues**
```bash
# Use clean output for automated systems
NO_EMOJI=true npm run extract:all
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GoHighLevel** for providing comprehensive documentation
- **Launch Maniac** for development and maintenance
- **Open Source Community** for tools and libraries used

## 📞 Support

- **Documentation**: [brain.launchmaniac.com](https://brain.launchmaniac.com)
- **Issues**: [GitHub Issues](https://github.com/launch-maniac/ghl-complete-docs/issues)
- **Email**: office@launchmaniac.com

---

**Built with ❤️ by [Launch Maniac](https://launchmaniac.com)**

*Empowering GoHighLevel users with comprehensive, searchable documentation.*