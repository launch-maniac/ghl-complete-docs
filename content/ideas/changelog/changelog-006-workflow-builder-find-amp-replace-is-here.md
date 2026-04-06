---
title: "Workflow Builder: Find &amp; Replace Is Here"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69ce77227b883254e6591e4f"
author: "Ashwin Raghunandan"
pubDate: "2026-04-02T15:01:12.000Z"
link: "https://ideas.gohighlevel.com/changelog/workflow-builder-find-replace-is-here"
categories: automations,new
url: "https://ideas.gohighlevel.com/changelog/workflow-builder-find-replace-is-here"
index: 6
---

**What’s new?**

You can now use Find & Replace inside a single workflow to quickly locate and update what matters most. Search by custom values, tags, or text, then replace supported custom values and tags one at a time or across the entire workflow in just a few clicks.

**How it works**

Click the new search icon or use Alt+F / Option+F to open the Find panel. Choose whether you want to search by custom values, tags, or text, then enter your search. Matching results appear instantly, the first result opens automatically, and the builder moves to that node on the canvas so you can review it. You can move through search results and the canvas will keep jumping to the selected node. With Replace turned on, you can choose a replacement from the custom value picker and apply it to the current match or all supported matches in the workflow.

**How to use it**

-   Open a workflow and click Find or press Alt+F / Option+F.
-   Choose custom values, tags, or text, then enter what you want to find and move through the results.
-   Use Replace or Replace All to swap supported custom values or tags with your desired value.

**Why we built it**

Large workflows are hard to scan when you need to find one value, one tag, or one step used in multiple places. This makes updates faster, reduces manual hunting, and helps you update workflows without opening every action one by one.

**Some use case examples**

-   You can search for the tag HighPriority and replace it with Urgent across all actions in the workflow.
-   A team searches for the custom value Agency Email and replaces it with Support Email everywhere it is used in email steps.

**Additional notes**

-   Find and Replace is available both on the Standard Builder and the Advanced Builder
-   Search works within one workflow, supports partial matches, and is case-insensitive.
-   Users can search by custom values, tags, or text, then move through matches while the builder automatically jumps to the selected node on the canvas.
-   Replace supports custom values and tags only, and Replace All applies only within the current workflow.
-   Changes can be reverted using the 'Undo' action.
-   Step names and trigger names can be found through text search, but not replaced in this version.
-   A quick in-app tutorial is also available to guide users through the feature.

**Preview**

Quick tutorial on using Find and Replace -

![Kapture 2026-04-02 at 20](https://canny-assets.io/images/62a14539cd6800b7d501c51370f5db28.gif)

Navigation between the nodes found -

![Kapture 2026-04-02 at 20](https://canny-assets.io/images/1529f09bfc3e443f7c84737fe4be8e54.gif)

Example of using the Replace feature -

![Kapture 2026-04-02 at 20](https://canny-assets.io/images/e6b26e4fea70a8827f9eff75a690a512.gif)