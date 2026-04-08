---
title: "Schema Markup Form View: Missing Fields Visibility"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69d61e450b34ccdc90bfe772"
author: "Sales &amp; Marketing"
pubDate: "2026-04-08T09:27:54.000Z"
link: "https://ideas.gohighlevel.com/changelog/schema-markup-form-view-missing-fields-visibility"
categories: new
url: "https://ideas.gohighlevel.com/changelog/schema-markup-form-view-missing-fields-visibility"
index: 7
---

**Problem Statement**

When AI generates schema markup, the form view only renders fields it has UI definitions for — any unsupported fields are silently dropped. Users see an incomplete schema with no indication that fields are missing or how to access them.

**What We Did**

Added a contextual warning banner in the form view that appears when a schema contains fields the form view can't render.

Warning appears per schema, only when unmapped fields exist

-   "View details" expands to show the exact field names (with dot notation for nested fields, e.g., estimatedCost.value)
-   Shows first 5 fields with a "+X more" indicator if the list is long
-   Includes a clickable "JSON view" link to switch directly to full editing
-   Warning dynamically recalculates — if fields get mapped in future updates or the user removes them, the banner disappears automatically

**Modules Impacted**

-   Website/Funnel builder

**Benefits**

-   Transparency: Users now know exactly which fields exist but aren't visible in form view
-   Guidance: Clear direction to switch to JSON view for full editing
-   No disruption: Fully mapped schemas are completely unaffected

**How to Use**

-   Add schema using AI or JSON script & load form view
-   If unmapped fields exist, an amber warning banner appears below the schema type
-   Click "View details" to see which fields are missing from form view
-   Click "JSON view" in the banner to switch and edit all fields

![Screenshot 2026-04-08 at 2](https://canny-assets.io/images/16b58312368e43803ff6e8e44982345e.png)

![Screenshot 2026-04-08 at 2](https://canny-assets.io/images/5c5f4fa3a59b55361e2af7894cd73258.png)