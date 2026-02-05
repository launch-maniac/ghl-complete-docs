---
title: "Standard Builder: Pause Workflow Actions"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69849fb2338075648c5b12ff"
author: "Ashwin Raghunandan"
pubDate: "2026-02-05T14:22:15.000Z"
link: "https://ideas.gohighlevel.com/changelog/standard-builder-pause-workflow-actions"
categories: automations,new
url: "https://ideas.gohighlevel.com/changelog/standard-builder-pause-workflow-actions"
index: 3
---

**What’s new?**

The pause actions feature is now live on the Standard Builder!

You can now enable or disable any action inside a workflow - without deleting it.

Turn off individual nodes temporarily while testing or debugging, so you can experiment freely without breaking your automation.

**How it works**

In the Standard Builder, hover over any node and toggle the Pause/Play switch.

![Kapture 2026-02-05 at 19](https://canny-assets.io/images/583140473df244d5155fc1c85fa6529d.gif)

-   Disabled nodes are visibly dimmed and skipped during execution.
-   Enabled nodes run normally once re-activated.

If a disabled node is the only path to downstream steps, the contact will skip the disabled nodes and only execute the active nodes.

**How to use it**

-   Open a workflow in the Standard Builder.
-   Use the toggle on any node to disable it.
-   Re-enable when ready - no need to rebuild or reconnect.

**Why we built it**

Previously, stopping a step meant deleting or disconnecting it — risking lost work and broken logic. Now you can pause parts of a workflow safely, making testing, troubleshooting, and iteration much faster.