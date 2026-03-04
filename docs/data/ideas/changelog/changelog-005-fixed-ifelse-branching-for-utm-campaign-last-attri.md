---
title: "Fixed: If/Else branching for UTM Campaign (Last Attribution)"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69a6f3593bf7ff24afb6b4c0"
author: "Ashwin Raghunandan"
pubDate: "2026-03-03T15:00:37.000Z"
link: "https://ideas.gohighlevel.com/changelog/fixed-if-else-branching-for-utm-campaign-last-attribution"
categories: automations,fixed
url: "https://ideas.gohighlevel.com/changelog/fixed-if-else-branching-for-utm-campaign-last-attribution"
index: 5
---

**Overview**

Users had reported inconsistent behavior - the custom value picker would fall back to the campaign variable when UTM Campaign (Last Attribution) was empty, but If/Else conditions would not. This caused workflows to branch unexpectedly.

**What’s new**

If/Else conditions now correctly apply the same fallback logic as the custom value picker for UTM Campaign (Last Attribution).

**What’s changed**

If UTM Campaign (Last Attribution) is empty, If/Else conditions will now automatically use the campaign variable as a fallback, ensuring consistent behavior across both areas.