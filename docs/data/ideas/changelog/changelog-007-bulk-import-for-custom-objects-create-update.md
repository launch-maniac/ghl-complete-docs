---
title: "Bulk Import for Custom Objects (Create + Update)"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "699ed7bac28b85a2fe2bd306"
author: "Pallavi Kothari"
pubDate: "2026-02-25T11:11:59.000Z"
link: "https://ideas.gohighlevel.com/changelog/bulk-import-for-custom-objects-create-update"
categories: crm,custom objects,new
url: "https://ideas.gohighlevel.com/changelog/bulk-import-for-custom-objects-create-update"
index: 7
---

You can now import Custom Object records in bulk — with the same create/update flow you’re used to for Contacts and Opportunities.

This feature is currently under Subaccount > Labs > "Company and Custom Object Import"

# ✅ What’s new

-   Create, Update, or Create + Update Custom Object records via CSV
-   Duplicate handling using your object’s unique fields
-   Control whether blank cells overwrite existing values
-   Track imports in Bulk Actions, including success/error stats

# 🧭 How it works

1.  Go to Custom Object → Import

![Screenshot 2026-02-25 at 4](https://canny-assets.io/images/83a5cbfcd75c512df06ee0b524d2b3e6.png)

1.  Upload your CSV
2.  Choose an import mode:

-   Create (creates new records)
-   Update (requires Record ID)
-   Create + Update (updates if Record ID exists, otherwise creates)

![Screenshot 2026-02-25 at 4](https://canny-assets.io/images/adf3e16a57dacde6d6ffb463ffe740be.png)

1.  Map columns → review → start import

![Screenshot 2026-02-25 at 4](https://canny-assets.io/images/738b281daefea8c7fd15fd18d0a5af5d.png)

![Screenshot 2026-02-25 at 4](https://canny-assets.io/images/0b19eb7135aa83fcef902bf3b21004cd.png)

1.  Track progress + results in Bulk Actions

![Screenshot 2026-02-25 at 4](https://canny-assets.io/images/63b947526fe54e70b412d1ad74953e61.png)

![Screenshot 2026-02-25 at 4](https://canny-assets.io/images/e2aba71573d4ae39e412eb4d12842d6a.png)

# 🧠 Duplicate + unique field logic

If your object has multiple unique fields mapped, you’ll choose one to dedupe on.

If any other unique field conflicts, that row fails (so you don’t accidentally create bad duplicates).

# ⚠️ Notes

• Only one Custom Object can be imported at a time (multi-object imports coming later).