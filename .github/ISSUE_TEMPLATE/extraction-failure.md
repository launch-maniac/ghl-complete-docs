---
name: Extraction Failure
about: Automatically created when extraction fails
title: 'Extraction failed: [DATE]'
labels: ['bug', 'automated']
---

## Extraction Failure Report

**Date:** {{ date }}
**Workflow:** {{ workflow }}
**Run ID:** {{ run_id }}

### Details
The automated documentation extraction workflow has failed. 

### Logs
[View detailed logs]({{ logs_url }})

### Next Steps
- Check the workflow logs for specific error messages
- Verify website accessibility and structure changes
- Update scrapers if necessary
- Re-run manually once issues are resolved

---
*This issue was automatically created by the GitHub Actions workflow.*