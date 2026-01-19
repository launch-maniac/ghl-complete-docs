---
title: "Workflow Updates: Enhanced &amp;quot;Opportunity Changed&amp;quot; Trigger"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "6968aefdaacf96e2e3f02138"
author: "Divyam Bhadoria"
pubDate: "2026-01-15T11:08:37.000Z"
link: "https://ideas.gohighlevel.com/changelog/workflow-updates-enhanced-opportunity-changed-trigger"
categories: automations,new,improved
url: "https://ideas.gohighlevel.com/changelog/workflow-updates-enhanced-opportunity-changed-trigger"
index: 9
---

# What's New

The Opportunity Changed trigger now supports event-based operators. Previously, this trigger worked as a filter—firing for any change on opportunities matching specific field values. Now, with Has Changed and Has Changed To operators, you can trigger workflows only when a specific field actually changes.

# New Operators for Standard Fields

![Screenshot 2026-01-15 at 2](https://canny-assets.io/images/19154a7e2621a3c0b7cb3ef5e2d8257d.png)

![Screenshot 2026-01-15 at 2](https://canny-assets.io/images/a9fb955c4d95f4da4fc17864ad74ef4e.png)

![Screenshot 2026-01-15 at 2](https://canny-assets.io/images/b978c9c070f113f35cfaecfb0cdbe1fd.png)

![Screenshot 2026-01-15 at 2](https://canny-assets.io/images/078f30f231ca57472dbf9cd4d85a9776.png)

![Screenshot 2026-01-15 at 2](https://canny-assets.io/images/05d315ca4e83b382f641ace2808a7a91.png)

# New Operators for Custom Fields

![Screenshot 2026-01-15 at 2](https://canny-assets.io/images/183484b0902b54f1126d7b4ee15c5586.png)

![Screenshot 2026-01-15 at 2](https://canny-assets.io/images/b72f5fe9b70932598fe0187517ec5a6b.png)

![Screenshot 2026-01-15 at 2](https://canny-assets.io/images/163fc05a3f1830b7dc0d5a0ecd0290ce.png)

![Screenshot 2026-01-15 at 2](https://canny-assets.io/images/48a3168dad578cc95ec218808f7b4c76.png)

![Screenshot 2026-01-15 at 2](https://canny-assets.io/images/12a63dcff25093f48ed8770013de280e.png)

![Screenshot 2026-01-15 at 2](https://canny-assets.io/images/4f0b3c8c8465edc624b61f28e3860eea.png)

# Why This Matters

Previously, setting a trigger with "Assigned To = John" would fire on every update to John's opportunities—notes, lead value, tags—creating unintended triggers. Now, with "Has Changed To," you can trigger only when the Assigned To field changes to a specific user, ignoring all other updates.

# How to Use

Add or edit an Opportunity Changed trigger, select your field (standard or custom), and choose from the new operators. Existing workflows default to "Equals" behavior, nothing breaks.