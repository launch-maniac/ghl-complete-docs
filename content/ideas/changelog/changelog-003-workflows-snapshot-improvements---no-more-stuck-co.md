---
title: "Workflows: Snapshot improvements - no more “stuck” contacts"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "696e3fa0c40fa0194bfa7179"
author: "Ashwin Raghunandan"
pubDate: "2026-01-19T14:30:38.000Z"
link: "https://ideas.gohighlevel.com/changelog/workflows-snapshot-improvements-no-more-stuck-contacts"
categories: automations,improved,new
url: "https://ideas.gohighlevel.com/changelog/workflows-snapshot-improvements-no-more-stuck-contacts"
index: 3
---

**Overview**

When you refresh a snapshot, it can delete steps in related workflows. Before, contacts waiting on those deleted steps could get stuck and needed manual cleanup. Now we auto-remove those contacts and show a brief heads-up only when a workflow is affected - so nothing stalls and you know exactly what changed.

**What’s new**

-   If a snapshot refresh deletes a step (eg. wait step), any contacts waiting on that step are now removed automatically so they don’t get stuck.
-   You’ll see a one-time heads-up the next time you open an affected workflow (shown only when it applies).
-   In the Execution Logs, you’ll also see “Removed by - Snapshot Refresh” with details in the side panel.

**How it works**

1.  Refresh a snapshot.
2.  If steps were removed, the system cleans up waiting contacts and shows a brief notice on first open.
3.  No action needed.

**Why it matters**

-   Prevents stuck contacts, keeps automations accurate, and saves time on manual cleanup.

**Notes**

-   Applies to workflows created from snapshots when a refresh deletes steps.
-   Directly deleting a step in a workflow already removes waiting contacts (unchanged).

**Preview**

![image](https://canny-assets.io/images/2608789fa419342341916d37bb2fbcca.png)

![image](https://canny-assets.io/images/4f1847825903baf9ef4d2d359df105dd.png)