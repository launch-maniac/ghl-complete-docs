---
title: "🚀 Snapshot Load Retry"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "6989f2d572810147997c63d3"
author: "Harsh Chhabra"
pubDate: "2026-02-11T11:56:36.000Z"
link: "https://ideas.gohighlevel.com/changelog/snapshot-load-retry"
categories: snapshot,new
url: "https://ideas.gohighlevel.com/changelog/snapshot-load-retry"
index: 5
---

Failed pushes no longer mean starting from scratch.

# ✨ What’s New

-   Retry Failed Pushes directly from the View History page
-   Retry All failed sub-accounts in a batch with a single click
-   Selective Retry — choose specific sub-accounts to retry instead of the entire batch
-   Live Progress Tracking for retries on the same page

![Screenshot 2026-02-04 at 5](https://canny-assets.io/images/1e6f577b42b16302e80b9fc39b5fe5cd.png)

![Screenshot 2026-02-04 at 5](https://canny-assets.io/images/3899be45349f209c359fb985c1bbb603.png)

![Screenshot 2026-02-09 at 12](https://canny-assets.io/images/1178176420f5e4b9d522fe898e73e227.png)

# ⏱️ Important Constraints

Retries are intentionally limited to keep your data accurate:

-   48-Hour Retry Window: Pushes older than 48 hours can’t be retried
-   Snapshot Version Lock: If the snapshot has been refreshed or updated since the original push, retries are disabled. A new push is required to use the latest snapshot version

# 🎯 Why This Matters

-   Faster Recovery from failed pushes
-   Fewer Steps & Less Rework — no need to recreate pushes
-   Cleaner History — all retries stay tied to the original push

# 👉 Try It Out

Head to **Snapshot → Push History** and use the new retry actions on failed pushes.

**🔮 What’s Coming Next**

We’re working on asset-level retries, which will let you:

-   Inspect failures inside a sub-account
-   Retry only specific assets (e.g. workflows, forms) instead of the entire account