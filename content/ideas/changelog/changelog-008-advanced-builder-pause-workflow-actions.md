---
title: "Advanced Builder: Pause Workflow Actions"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "68e8912209e87fc0eb4e5158"
author: "Ashwin Raghunandan"
pubDate: "2025-10-15T09:51:59.000Z"
link: "https://ideas.gohighlevel.com/changelog/advanced-builder-pause-workflow-actions"
categories: automations,new
url: "https://ideas.gohighlevel.com/changelog/advanced-builder-pause-workflow-actions"
index: 8
---

**What’s new?**

You can now enable or disable any action inside a workflow - without deleting it.

Turn off individual nodes temporarily while testing or debugging, so you can experiment freely without breaking your automation.

**How it works**

In the Advanced Builder, hover over any node and toggle the Enable/Disable switch.

![Kapture 2025-10-11 at 00](https://canny-assets.io/images/eb71210a8fbbe56603750afde9162564.gif)

-   Disabled nodes are visibly dimmed and skipped during execution.
-   Enabled nodes run normally once re-activated.

If a disabled node is the only path to downstream steps, the contact will skip the disabled nodes and only execute the active nodes.

**How to use it**

-   Open a workflow in the Advanced Builder.
-   Right-click or use the toggle on any node to disable it.
-   Re-enable when ready — no need to rebuild or reconnect.

**Notes & Limitations**

-   This feature is **available only in Advanced Builder.**
-   If a workflow uses disabled nodes (or other Advanced-only features like Go-To or delinked nodes), you’ll need to remove or re-enable them before switching back to Standard Builder.

**Why we built it**

Previously, stopping a step meant deleting or disconnecting it — risking lost work and broken logic. Now you can pause parts of a workflow safely, making testing, troubleshooting, and iteration much faster.