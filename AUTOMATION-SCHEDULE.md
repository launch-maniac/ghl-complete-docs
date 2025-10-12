# GHL Complete Docs - Automation Schedule

**Last Updated:** ${new Date().toISOString()}
**Status:** Fully Automated

---

## Overview

All documentation sources are automatically monitored and extracted to keep your GHL knowledge library up-to-date.

---

## Daily Automated Updates

### 1. GitHub Repositories Sync 📦
- **Workflow:** `.github/workflows/github-sync.yml`
- **Schedule:** Daily at 2:00 AM UTC (6:00 PM PT / 9:00 PM ET)
- **Cron:** `0 2 * * *`
- **Duration:** ~5-10 minutes
- **Extracts:**
  - ghl-marketplace-app-template (READMEs, examples)
  - ghl-sdk-examples (code samples)
  - highlevel-api-sdk (SDK documentation)
  - flutter-ffmpeg-kit (integration patterns)
  - naive-ui (UI components)
  - pocketpub (integration examples)
  - appengine-local-taskqueue (infrastructure patterns)
  - hugo-book (documentation structure)
- **Output:** `content/github/` + search index update
- **Monitoring:** Auto-creates GitHub issue on failure

### 2. Video Tutorials Sync 🎥
- **Workflow:** `.github/workflows/video-sync.yml`
- **Schedule:** Daily at 7:30 AM UTC (12:30 AM PT / 3:30 AM ET)
- **Cron:** `30 7 * * *`
- **Timing:** 30 minutes after YouTube API quota reset
- **Duration:** ~30-60 minutes
- **Extracts:**
  - YouTube @gohighlevel channel
  - All video tutorials and training content
  - Video metadata, descriptions, thumbnails
- **Output:** `content/videos/` + search index update
- **Special:** Creates weekly release tag on Mondays
- **Monitoring:** Auto-creates GitHub issue on failure

---

## Every 3 Hours (8x Daily)

### 3. Marketplace & Changelog Sync 🛍️📋
- **Workflow:** `.github/workflows/marketplace-ideas-sync.yml`
- **Schedule:** Every 3 hours (8 times per day)
- **Cron:** `0 */3 * * *`
- **Run Times (UTC):** 12am, 3am, 6am, 9am, 12pm, 3pm, 6pm, 9pm
- **Duration:** ~15-30 minutes
- **Extracts:**
  - **Marketplace Documentation**
    - marketplace.gohighlevel.com/docs
    - App development guides
    - OAuth implementation
    - SSO configuration
  - **Official Changelog**
    - ideas.gohighlevel.com/changelog (RSS feed)
    - Latest product updates
    - Feature announcements
  - **Help Center**
    - help.gohighlevel.com/support/solutions
    - Support articles (partial)
  - **API Documentation**
    - developers.gohighlevel.com
    - highlevel.stoplight.io (partial)
- **Output:** `content/marketplace/`, `content/ideas/changelog/` + search index
- **Note:** User suggestions in `content/ideas/boards/` are extracted but NOT indexed
- **Monitoring:** Auto-creates GitHub issue on failure

---

## Complete Schedule Summary

| Time (UTC) | Time (PT) | Time (ET) | What Runs |
|------------|-----------|-----------|-----------|
| 12:00 AM | 4:00 PM | 7:00 PM | Marketplace & Changelog |
| 02:00 AM | 6:00 PM | 9:00 PM | **GitHub Repos** |
| 03:00 AM | 7:00 PM | 10:00 PM | Marketplace & Changelog |
| 06:00 AM | 10:00 PM | 1:00 AM | Marketplace & Changelog |
| 07:30 AM | 11:30 PM | 2:30 AM | **Video Tutorials** |
| 09:00 AM | 1:00 AM | 4:00 AM | Marketplace & Changelog |
| 12:00 PM | 4:00 AM | 7:00 AM | Marketplace & Changelog |
| 03:00 PM | 7:00 AM | 10:00 AM | Marketplace & Changelog |
| 06:00 PM | 10:00 AM | 1:00 PM | Marketplace & Changelog |
| 09:00 PM | 1:00 PM | 4:00 PM | Marketplace & Changelog |

**Total Daily Runs:** 10 automated extractions

---

## What Gets Updated

### Continuously (Every 3 Hours)
- ✅ Marketplace documentation
- ✅ Official changelog
- ✅ Help center articles
- ✅ API documentation (partial)

### Daily
- ✅ GitHub repositories (READMEs, code examples)
- ✅ YouTube videos and tutorials

### Extracted but Not Indexed (Yet)
- ⏳ User suggestions from ideas.gohighlevel.com/boards
  - Stored in `content/ideas/boards/`
  - Can be added to search when needed

---

## Automation Features

### Smart Commits
- Detailed commit messages with extraction stats
- Timestamps for audit trail
- Statistics embedded in commit

### Error Handling
- `continue-on-error: true` prevents partial failures from blocking workflow
- Auto-creates GitHub issues when workflows fail completely
- Labels: `bug`, `automated`, specific workflow label

### Performance
- Concurrent prevention (only one instance runs at a time)
- Optimized timeouts:
  - GitHub sync: 30 minutes
  - Marketplace/Changelog: 45 minutes
  - Videos: 120 minutes (handles 900+ videos)

### Search Index
- Automatically rebuilt after each extraction
- Includes all new/updated content
- Currently indexes: 262 documents

---

## Manual Triggers

All workflows can be manually triggered via GitHub Actions:

```bash
# Via GitHub UI: Actions → Select Workflow → Run workflow

# Or via gh CLI:
gh workflow run marketplace-ideas-sync.yml
gh workflow run video-sync.yml
gh workflow run github-sync.yml
```

### Manual Options Available:
- **Marketplace/Changelog:** Choose specific source (marketplace, ideas, or both)
- **Videos:** Force full sync instead of incremental
- **GitHub:** Force full re-extraction of all repositories

---

## Monitoring & Alerts

### Success Indicators
- ✅ Commit pushed with updated content
- ✅ Search index rebuilt
- ✅ Statistics generated
- ✅ No GitHub issues created

### Failure Indicators
- ❌ Workflow marked as failed
- ❌ GitHub issue auto-created with:
  - Failure date in title
  - Link to workflow logs
  - Relevant labels (`bug`, `automated`, workflow-specific)

### Manual Monitoring
```bash
# Check recent workflow runs
gh run list --limit 10

# View specific workflow
gh run view <run-id>

# Check for issues
gh issue list --label automated
```

---

## Current Document Counts

| Source | Documents | Update Frequency |
|--------|-----------|------------------|
| Marketplace Documentation | 100 | Every 3 hours |
| Video Tutorials | 148 | Daily |
| Official Changelog | 10 | Every 3 hours |
| GitHub Code Examples | 4 | Daily |
| **Total Indexed** | **262** | - |
| User Suggestions (stored) | 76 | Every 3 hours |

---

## Future Enhancements (Planned)

### To Add:
1. ⏳ **Blog Extraction** - Weekly
   - blog.gohighlevel.com or gohighlevel.com/blog
   - Target: +50-100 documents

2. ⏳ **Complete Help Center** - Weekly deep crawl
   - All support folders
   - Target: +300 documents

3. ⏳ **Complete API Documentation** - Weekly
   - All Stoplight.io endpoints
   - Target: +150 documents

4. ⏳ **Community Forum** - Weekly (if accessible)
   - Popular solved threads
   - Target: +100 documents

5. ⏳ **Integration Partners** - Monthly
   - Zapier documentation
   - Make.com scenarios
   - Target: +100 documents

---

## Maintenance

### No Manual Intervention Needed
- All extractions run automatically
- Search index auto-rebuilds
- Changes auto-commit
- Errors auto-reported

### Recommended Reviews
- **Weekly:** Check for any failed workflow issues
- **Monthly:** Review extraction statistics
- **Quarterly:** Audit document coverage

### Cost
- **GitHub Actions:** Free tier includes 2,000 minutes/month
- **Current Usage:** ~100-150 minutes/day
- **Monthly Total:** ~3,000-4,500 minutes (may need paid plan)

---

## Configuration Files

### Workflows
- `.github/workflows/marketplace-ideas-sync.yml` - Marketplace & changelog
- `.github/workflows/video-sync.yml` - Video tutorials
- `.github/workflows/github-sync.yml` - GitHub repositories (NEW)

### Scripts
- `scripts/extract/marketplace-scraper.js` - Marketplace extraction
- `scripts/extract/canny-api-extractor.js` - Changelog/ideas RSS
- `scripts/extract/video-scraper.js` - YouTube videos
- `scripts/extract/github-extractor.js` - GitHub repos (NEW)
- `scripts/build-search-index.js` - Search index builder

### NPM Commands
```bash
npm run extract:marketplace  # Marketplace docs
npm run extract:ideas        # Changelog RSS
npm run extract:videos       # YouTube videos
npm run extract:github       # GitHub repos (NEW)
npm run extract:all          # All sources
npm run build:search         # Rebuild search index
npm run stats                # Generate statistics
```

---

## Timezone Reference

**Workflow Times in Different Zones:**

| Workflow | UTC | PT (Los Angeles) | ET (New York) | UK (London) |
|----------|-----|------------------|---------------|-------------|
| GitHub Sync | 02:00 | 18:00 (6 PM) | 21:00 (9 PM) | 02:00 (2 AM) |
| Video Sync | 07:30 | 23:30 (11:30 PM) | 02:30 (2:30 AM) | 07:30 (7:30 AM) |
| Marketplace (1st) | 00:00 | 16:00 (4 PM) | 19:00 (7 PM) | 00:00 (12 AM) |
| Marketplace (2nd) | 03:00 | 19:00 (7 PM) | 22:00 (10 PM) | 03:00 (3 AM) |
| Marketplace (3rd) | 06:00 | 22:00 (10 PM) | 01:00 (1 AM) | 06:00 (6 AM) |

---

## Status Dashboard

View live automation status:
- **GitHub Actions:** https://github.com/launch-maniac/ghl-complete-docs/actions
- **Latest Commits:** https://github.com/launch-maniac/ghl-complete-docs/commits/main
- **Issues:** https://github.com/launch-maniac/ghl-complete-docs/issues?q=is%3Aissue+label%3Aautomated

---

Generated: ${new Date().toISOString()}
Next Review: Weekly
