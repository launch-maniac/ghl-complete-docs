# GHL Complete Docs - Project Commands

## Project Information
- **Repository**: https://github.com/launch-maniac/ghl-complete-docs
- **Live Site**: https://brain.launchmaniac.com
- **Issues**: https://github.com/launch-maniac/ghl-complete-docs/issues
- **Version**: 2.0.0
- **License**: MIT

## Quick Commands (Most Used)
```bash
# Extract all documentation sources
npm run extract:all

# Generate statistics report
npm run stats

# Clean output for CI/automation
NO_EMOJI=true npm run extract:all
NO_EMOJI=true npm run stats

# Monitor for errors
npm run monitor

# Serve documentation locally
npm run serve
# Visit http://localhost:8000
```

## Extraction Commands
```bash
# Individual extractors
npm run extract:ideas           # Extract changelog from RSS feed
npm run extract:marketplace     # Scrape marketplace documentation
npm run extract:videos         # Extract YouTube video tutorials

# Direct script execution (bypass npm)
node scripts/extract/canny-api-extractor.js
node scripts/extract/marketplace-scraper.js
node scripts/extract/video-scraper.js

# Clean extraction (no emojis)
NO_EMOJI=true npm run extract:ideas
NO_EMOJI=true npm run extract:marketplace
NO_EMOJI=true npm run extract:videos
```

## Development Commands
```bash
# Development mode (runs extract:all)
npm run dev

# Install dependencies
npm install

# Serve docs locally
npm run serve
python3 -m http.server 8000 --directory docs

# Check for issues
npm run monitor
node scripts/monitoring/error-monitor.js
```

## Analysis & Statistics
```bash
# Generate comprehensive stats
npm run stats
node scripts/analytics/generate-stats.js

# Clean stats output
NO_EMOJI=true npm run stats

# Count extracted documents
find content -name "*.md" -type f | wc -l

# Check content by source
ls -la content/marketplace/ | wc -l
ls -la content/videos/ | wc -l
ls -la content/ideas/ | wc -l

# View master statistics file
cat docs/data/master-index.json | jq '.'
```

## File Analysis Commands
```bash
# Explore extracted content
ls -la content/
tree content/ -I 'node_modules'

# Check specific content types
ls content/marketplace/
ls content/videos/
ls content/ideas/changelog/

# Find recent extractions
find content -name "*.md" -mtime -1 -type f

# Content size analysis
du -sh content/*
du -sh docs/*

# Search content
grep -r "keyword" content/
find content -name "*.md" -exec grep -l "search_term" {} \;
```

## Environment Variables
```bash
# Disable emojis (recommended for clean output)
export NO_EMOJI=true
export DISABLE_EMOJIS=true

# Then run any command normally
npm run extract:all
npm run stats

# Or use inline
NO_EMOJI=true npm run extract:all
DISABLE_EMOJIS=true npm run stats
```

## Git Operations
```bash
# Standard workflow
git status
git add .
git commit -m "Update documentation extraction"
git push origin main

# Check recent changes
git log --oneline -10
git diff HEAD~1

# Repository management
git remote -v
git branch -a

# Pull latest changes
git pull origin main
```

## GitHub Operations
```bash
# GitHub CLI commands
gh repo view launch-maniac/ghl-complete-docs
gh issue list
gh pr list

# Workflow management
gh workflow list
gh workflow run daily-sync.yml
gh run list --limit 5

# Create issue
gh issue create --title "Issue title" --body "Description"

# View workflow runs
gh run view
```

## Cloudflare Operations
```bash
# Note: Replace with actual API keys/tokens when needed

# DNS management for brain.launchmaniac.com
# CLOUDFLARE_API_TOKEN="your-token" wrangler

# Pages deployment
# wrangler pages project list
# wrangler pages deploy docs --project-name=ghl-docs

# Cache purging
# curl -X POST "https://api.cloudflare.com/client/v4/zones/ZONE_ID/purge_cache"
```

## External Service Monitoring
```bash
# Check GoHighLevel sources
curl -I https://marketplace.gohighlevel.com/
curl -I https://help.gohighlevel.com/
curl -I https://ideas.gohighlevel.com/api/changelog/feed.rss
curl -I https://developers.gohighlevel.com/

# Test RSS feed
curl -s https://ideas.gohighlevel.com/api/changelog/feed.rss | head -20

# Check live documentation site
curl -I https://brain.launchmaniac.com
```

## Debugging & Troubleshooting
```bash
# Check for extraction errors
npm run monitor

# Test individual extractors
node scripts/extract/canny-api-extractor.js
node scripts/extract/marketplace-scraper.js 2>&1 | tee marketplace.log
node scripts/extract/video-scraper.js 2>&1 | tee video.log

# Check dependencies
npm list
npm outdated

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check system requirements
node --version
python3 --version
```

## Log Analysis
```bash
# View extraction logs (if generated)
tail -f logs/extraction.log
tail -f logs/errors.log

# Check GitHub Actions logs
gh run view --log

# Monitor real-time extraction
npm run extract:all 2>&1 | tee extraction-$(date +%Y%m%d-%H%M%S).log
```

## Performance Monitoring
```bash
# Check file counts by source
echo "Marketplace docs: $(find content/marketplace -name '*.md' | wc -l)"
echo "Video docs: $(find content/videos -name '*.md' | wc -l)"
echo "Changelog docs: $(find content/ideas -name '*.md' | wc -l)"

# Storage usage
du -sh content/
du -sh docs/
df -h .

# Process monitoring during extraction
top -p $(pgrep -f "node scripts")
ps aux | grep "node scripts"
```

## Useful File Paths
```bash
# Configuration
./package.json                    # Project configuration
./.github/workflows/daily-sync.yml # GitHub Actions workflow

# Scripts
./scripts/extract/               # Extraction scripts
./scripts/analytics/             # Analytics and reporting
./scripts/monitoring/            # Error monitoring
./scripts/utils/                 # Shared utilities

# Content
./content/marketplace/           # Marketplace documentation
./content/videos/               # Video tutorials
./content/ideas/                # Changelog and feature requests

# Generated
./docs/data/master-index.json   # Main statistics
./docs/index.html               # Documentation website
```

## Quick Checks
```bash
# Project health check
npm run stats && echo "Last extraction: $(stat -f %Sm docs/data/master-index.json)"

# Content freshness
find content -name "*.md" -mtime -1 -type f | wc -l

# GitHub sync status
git status --porcelain | wc -l

# Site availability
curl -o /dev/null -s -w "%{http_code}\n" https://brain.launchmaniac.com
```

## Emergency Commands
```bash
# Force clean extraction
rm -rf content/*
NO_EMOJI=true npm run extract:all

# Reset to last commit
git reset --hard HEAD
git clean -fd

# Quick deploy
NO_EMOJI=true npm run deploy
git add . && git commit -m "Emergency documentation update" && git push
```