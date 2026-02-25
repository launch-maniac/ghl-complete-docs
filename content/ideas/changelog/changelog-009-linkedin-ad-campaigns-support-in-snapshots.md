---
title: "LinkedIn Ad Campaigns Support in Snapshots"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "699e91115b13bf8302dad792"
author: "Manas Dixit"
pubDate: "2026-02-25T08:44:01.000Z"
link: "https://ideas.gohighlevel.com/changelog/linkedin-ad-campaigns-support-in-snapshots"
categories: snapshot,ad manager,new
url: "https://ideas.gohighlevel.com/changelog/linkedin-ad-campaigns-support-in-snapshots"
index: 9
---

# 👀 What’s New?

-   Added support for **“Ad Campaigns – LinkedIn”** in Account Snapshots.
-   Agencies can now **create and load snapshots including LinkedIn campaign structures** across sub-accounts.
-   LinkedIn campaigns follow full hierarchy preservation: **Campaign Group > Campaign > Ad**
-   LinkedIn asset now appears in: **Create Snapshot** modal (with selected/total count format) and load Snapshot – Step 2 (Select Assets to Push)
-   If LinkedIn is not connected in the destination sub-account, campaigns are imported as **Draft** (no blocking).
-   Conflict detection and overwrite behaviour fully aligned with existing Google/Meta snapshot logic.

# 👷 How It Works:

Navigate to **Agency View > Account Snapshots > Create New Snapshot**

![image](https://canny-assets.io/images/2f180a745bb803758a3e6dac8a5dc90f.png)

1.  Expand **“Ad Campaigns – LinkedIn”** under Marketing assets.
2.  Select specific campaigns or choose all (count shown as Selected/Total).
3.  Save the snapshot and the LinkedIn hierarchy is preserved in payload.

**To Load:**

-   Go to the specific **Sub-Account** where you want to have these campaigns > **Load Snapshot** from **Actions**
-   In Step 2, select **LinkedIn Ad Campaigns** to push.

![image](https://canny-assets.io/images/435f01e66b242d0609166bbcba833893.png)

-   System performs standard conflict check (Step 3) and the imported campaigns are created as **Draft** in destination.

# ⭐ Why It Matters:

-   Enables agencies to **replicate LinkedIn campaign setups** instantly across client accounts.
-   Eliminates manual recreation of campaign groups, campaigns and ads.
-   Maintains platform parity with existing Google & Meta snapshot capabilities for Ad Manager.
-   Scales multi-client LinkedIn operations efficiently for agencies.

# 📝 Notes:

-   Imported campaigns are always created in Draft state.
-   Lead Gen Forms are intentionally excluded (LinkedIn account-specific limitation).
-   Snapshot logic reuses existing conflict and overwrite behaviour, no new overwrite modes introduced.
-   Reporting data, billing history, and ad account credentials are not transferred.