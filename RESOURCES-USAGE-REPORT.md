# GHL Complete Docs - Resources Usage Report

## Resources from .claude/CLAUDE.md

### Currently Being Used ✅

1. **https://ideas.gohighlevel.com/changelog**
   - Script: `scripts/extract/canny-api-extractor.js`
   - Method: RSS feed extraction
   - Output: `content/ideas/`
   - Documents: 86 changelog entries
   - Status: ACTIVE

2. **https://help.gohighlevel.com/support/solutions**
   - Script: `scripts/extract/marketplace-scraper.js`
   - Method: Web scraping (multiple folders)
   - Output: `content/marketplace/`
   - Documents: Included in marketplace extraction
   - Status: ACTIVE

3. **https://marketplace.gohighlevel.com/docs/oauth/GettingStarted**
   - Script: `scripts/extract/marketplace-scraper.js`
   - Method: Web scraping
   - Output: `content/marketplace/`
   - Documents: Part of marketplace documentation
   - Status: ACTIVE

### NOT Currently Being Used ❌

4. **https://github.com/GoHighLevel/ghl-marketplace-app-template**
   - Type: GitHub Repository
   - Content: Sample code/templates
   - Status: NOT EXTRACTED

5. **https://github.com/GoHighLevel/ghl-sdk-examples**
   - Type: GitHub Repository
   - Content: SDK examples and code samples
   - Status: NOT EXTRACTED

6. **https://github.com/GoHighLevel/highlevel-api-sdk**
   - Type: GitHub Repository (duplicate in list)
   - Content: Official API SDK
   - Status: NOT EXTRACTED

7. **https://github.com/GoHighLevel/flutter-ffmpeg-kit**
   - Type: GitHub Repository
   - Content: Flutter FFmpeg integration
   - Status: NOT EXTRACTED (Not GHL-specific)

8. **https://github.com/GoHighLevel/naive-ui**
   - Type: GitHub Repository
   - Content: UI components library
   - Status: NOT EXTRACTED (Not documentation)

9. **https://github.com/GoHighLevel/pocketpub**
   - Type: GitHub Repository
   - Content: PocketPub integration
   - Status: NOT EXTRACTED (Not GHL-specific)

10. **https://github.com/GoHighLevel/appengine-local-taskqueue**
    - Type: GitHub Repository
    - Content: App Engine task queue
    - Status: NOT EXTRACTED (Infrastructure tool)

11. **https://github.com/GoHighLevel/hugo-book**
    - Type: GitHub Repository
    - Content: Hugo documentation theme
    - Status: NOT EXTRACTED (Documentation tooling)

---

## Additional Resources Being Used (Not in CLAUDE.md)

### Active Extraction Sources

1. **https://www.youtube.com/@gohighlevel/videos**
   - Script: `scripts/extract/video-scraper.js`
   - Method: YouTube API
   - Output: `content/videos/`
   - Documents: 148 video tutorials
   - Status: ACTIVE

2. **https://developers.gohighlevel.com/**
   - Script: `scripts/extract/marketplace-scraper.js`
   - Method: Web scraping (multiple endpoints)
   - Output: `content/marketplace/`
   - Documents: Developer documentation
   - Status: ACTIVE

3. **https://highlevel.stoplight.io/docs/integrations/**
   - Script: `scripts/extract/marketplace-scraper.js`
   - Method: API documentation scraping
   - Output: `content/marketplace/`
   - Documents: API reference documentation
   - Status: ACTIVE

---

## Summary Statistics

### Currently Extracted
- **Total Documents**: 334
- **Marketplace Documentation**: 100 documents
- **Video Tutorials**: 148 documents
- **Changelog Entries**: 86 documents

### Sources Used
- ideas.gohighlevel.com (RSS feed)
- marketplace.gohighlevel.com (web scraping)
- help.gohighlevel.com (web scraping)
- developers.gohighlevel.com (web scraping)
- highlevel.stoplight.io (web scraping)
- youtube.com/@gohighlevel (API)

### Sources NOT Used
- 8 GitHub repositories (code samples, SDKs, tooling)
- These are primarily code repositories, not documentation sources

---

## Recommendations

### High Priority - Should Add ✨

1. **GitHub Repository READMEs**
   - Extract README.md from key repositories
   - Repositories to prioritize:
     - ghl-marketplace-app-template (setup guides)
     - ghl-sdk-examples (code examples)
     - highlevel-api-sdk (SDK documentation)

2. **GitHub Repository Documentation Folders**
   - Many repos have `/docs` folders with additional documentation
   - Should be extracted and indexed

### Medium Priority - Consider Adding 🤔

3. **GitHub Issues & Discussions**
   - Common problems and solutions
   - Community Q&A
   - Could be valuable for troubleshooting queries

4. **GitHub Release Notes**
   - SDK version updates
   - Breaking changes
   - Migration guides

### Low Priority - May Not Be Needed ⚠️

5. **Infrastructure Repositories**
   - flutter-ffmpeg-kit (not GHL-specific)
   - naive-ui (UI library, not docs)
   - pocketpub (third-party integration)
   - appengine-local-taskqueue (infrastructure)
   - hugo-book (documentation tooling)

---

## Implementation Plan

### To Add GitHub Repository Documentation:

```bash
# Create new extraction script
scripts/extract/github-repo-extractor.js

# Extract content from:
1. README.md files
2. /docs folders
3. /examples folders (as code samples)
4. CHANGELOG.md / Release notes

# Configuration:
const GITHUB_REPOS = [
  'GoHighLevel/ghl-marketplace-app-template',
  'GoHighLevel/ghl-sdk-examples',
  'GoHighLevel/highlevel-api-sdk'
];
```

### Script Template:
```javascript
// Use GitHub API to:
// 1. Fetch repository metadata
// 2. Download README.md
// 3. Scan for /docs directory
// 4. Extract relevant markdown files
// 5. Parse code examples
// 6. Save to content/github/
```

---

## Notes

- The current extraction focuses on **documentation content** (text, guides, videos)
- GitHub repositories contain **code samples** which are different from documentation
- Adding GitHub repos would increase document count by ~20-50 documents
- Would provide valuable code examples and integration guides
- READMEs often contain setup instructions not found elsewhere

---

Generated: ${new Date().toISOString()}
Version: 1.0
