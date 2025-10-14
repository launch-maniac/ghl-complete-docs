---
title: "Workflow Builder: Auto Save Changes"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "68e7a464bf84cb0d3c578d3a"
author: "Ashwin Raghunandan"
pubDate: "2025-10-14T12:47:52.000Z"
link: "https://ideas.gohighlevel.com/changelog/workflow-builder-auto-save-changes"
categories: automations,new
url: "https://ideas.gohighlevel.com/changelog/workflow-builder-auto-save-changes"
index: 10
---

**What’s new?**

Introducing Auto Save in the Workflow Builder - the simplest way to build faster, smarter, and with total peace of mind.

No more losing progress or remembering to hit Save every few steps. With Auto Save enabled, your edits are continuously saved in the background while you design and refine your workflows, so you can stay focused on the logic and not the clicks.

Currently in Labs Beta, this upgrade brings reliability and speed to your workflow editing experience.

**How it works**

Auto Save continuously writes canvas edits to your draft; nothing goes live until you Publish.

![Kapture 2025-10-11 at 05](https://canny-assets.io/images/e8f3e9ef7359deaa229ead7d6b972ced.gif)

**How to enable it**

1.  After enabling Auto Save in **Labs**, open a workflow. You’ll see a pop-up where you can choose to **Enable Auto Save Now** or **Continue with Manual Save**.

![image](https://canny-assets.io/images/2ff49eded1750fbab7afba05a06466c1.png)

1.  Or alternatively, you can go to **Global Workflow Settings → Auto Save** and toggle it On.

![image](https://canny-assets.io/images/ae1d2e4d77237153ef398e876dee08e6.png)

Once enabled, just build as usual - your edits will save automatically.

When your draft is ready, click Publish to make it live.

**Why we built it**

To eliminate lost work and speed up iteration so you can focus on workflow logic, not saving your changes with each step.

**Notes & Limitations**

-   **Draft-only:** Auto Save works only when the workflow is in Draft. It is disabled for Published workflows. Publish to push changes live.
-   **Configuration Changes:** It does not auto-save configuration changes made inside an action/trigger.
-   **Session versioning:** Each editing session writes to an Auto-saved entry in Version History (with timestamp + editor). Use Save Version in the version history anytime to create a named checkpoint.
-   **Multi-editor & multi-tab:** No real-time co-editing/locking. Last save wins. If multiple users (or tabs) edit the same workflow, the most recent auto-save becomes the current draft; Version History shows who saved when.

**Additional Note** -

At launch, Auto Save is available through the **Labs Beta.**

To access it, go to **Settings → Labs**, search for the feature name, and enable it via the toggle.