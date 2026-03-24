---
title: "Advanced Builder: Set Default Path for Workflow Branches"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69c199267531df590143b06d"
author: "Ashwin Raghunandan"
pubDate: "2026-03-23T20:11:03.000Z"
link: "https://ideas.gohighlevel.com/changelog/advanced-builder-set-default-path-for-workflow-branches"
categories: automations,new
url: "https://ideas.gohighlevel.com/changelog/advanced-builder-set-default-path-for-workflow-branches"
index: 7
---

**What’s new?**

You can now change the Default Path in Advanced Builder workflows. In workflows with multiple parallel branches, this lets you choose which branch contacts enter by default when they come from another workflow or when you run a workflow test.

**How it works**

The root node is now labeled Default Path. On the first action in each branch, you can click the branch icon to set that branch as the default path. Once selected, workflow tests and contacts entering from other workflows will follow that branch.

**How to use it**

-   Open a workflow with multiple parallel branches in Advanced Builder.
-   Click the branch icon on the first action of the branch you want to use.
-   Set that branch as the Default Path and run your test or enrollment.

**Why we built it**

Testing and configuring workflows with parallel branches was harder when only one root path handled workflow tests and cross-workflow entries. This update gives you more control, makes branch-level testing easier, and helps you validate each path without rearranging your workflow.

**Simple example**

When testing a workflow with multiple reminder branches, you can set one branch as the Default Path so your test contact enters that specific branch first.

**Additional Notes**

-   The root node is now called Default Path in Advanced Builder workflows with multiple parallel branches.
-   You can set the default path from the first action in any branch using the branch icon, with tooltips to explain the behavior.
-   The default path is used for workflow tests and for contacts entering from another workflow.
-   A solid trigger connector means the branch is the Default Path. A dashed trigger connector means the branch is reached through a Go To connector and is not the default path.

**Preview**

![Kapture 2026-03-24 at 01](https://canny-assets.io/images/73b5390d8dbd36b585f51f7011f13dd4.gif)