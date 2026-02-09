---
title: "Advanced Tag filtering in Triggers"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "6985c5d8b1f5f269995ac72c"
author: "Divyam Bhadoria"
pubDate: "2026-02-06T10:51:32.000Z"
link: "https://ideas.gohighlevel.com/changelog/advanced-tag-filtering-in-triggers"
categories: automations,new,improved
url: "https://ideas.gohighlevel.com/changelog/advanced-tag-filtering-in-triggers"
index: 9
---

Tag filtering in workflow triggers just got a massive upgrade! We're introducing advanced tag operators with multi select support — giving you the power to build precise, flexible trigger conditions like never before.

# What's New

"Has Tag" is now renamed to "Tag" and comes packed with three major upgrades:

**1️⃣ New Operators**

Two brand-new operators join the existing Equals to & Not equals to:

-   Any of — Fires when any one of the selected tags is present
-   None of — Fires when none of the selected tags are present

![Screenshot 2026-02-06 at 4](https://canny-assets.io/images/2f07aeacc5e598226a535f56ea780a6e.png)

**2️⃣ Multiselect Support Across All Operators**

All four operators now support selecting multiple tags at once:

-   Equals to / Not equals to
-   Any of / None of

![Screenshot 2026-02-06 at 4](https://canny-assets.io/images/bba19351aa732fa757b42d986ff63bd2.png)

**3️⃣ Multiple Tag Filter Instances**

You can now add multiple instances of the "Tag" filter within a single trigger, combined with AND logic between them, enabling powerful negative filtering.

Example: Want contacts tagged "Lead" but not tagged "Low Quality"? Simply add: → Tag Equals to "Lead" → Tag Not equals to "Low Quality"

![Screenshot 2026-02-06 at 4](https://canny-assets.io/images/1878f5ca347010042876ca91ead55ac6.png)

# Now Live For

-   Contact Created Trigger
-   Contact DND Trigger

# Up Next

Expanding to opportunity based triggers and more:

-   Opportunity Created
-   Opportunity Changed
-   Opportunity Status Changed
-   Pipeline Stage Changed
-   Invoice