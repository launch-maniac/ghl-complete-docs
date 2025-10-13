---
title: "Trigger Stats for Workflows"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "68e88cdb50088ccbe644e5d8"
author: "Ashwin Raghunandan"
pubDate: "2025-10-13T13:40:23.000Z"
link: "https://ideas.gohighlevel.com/changelog/trigger-stats-for-workflows"
categories: automations,new
url: "https://ideas.gohighlevel.com/changelog/trigger-stats-for-workflows"
index: 7
---

**What’s new?**

You can now **view real time trigger performance** directly inside your workflows.

See exactly how many contacts were attempted, matched, or unmatched and dig into detailed, contact-level reasons for misfires.

This release takes workflow debugging and optimization to the next level, giving you clear, actionable insight right where you build.

**How it works**

Switch your workflow to Stats View to see performance metrics for every trigger.

Each trigger card shows:

-   Attempted — total contacts evaluated.
-   Matched — contacts that met all trigger conditions.
-   Unmatched — contacts that didn’t qualify.

![image](https://canny-assets.io/images/e7e5f0fa2bc1a54595b6e37c632b7f55.png)

Click on any trigger to open the Trigger Stats Panel and review:

-   Contact names, emails, and timestamps.
-   Match status for each contact.
-   Clear “Reason for Unmatch” details to help you diagnose issues fast.
-   You can also filter by date range or search for a specific contact.

![image](https://canny-assets.io/images/21de7dc59d07377afd28591e57138ef2.png)

![image](https://canny-assets.io/images/b94ebb2475dc6003a57368da86e61837.png)

**How to use it**

-   Open any workflow and switch to Stats View.
-   Review Attempted, Matched, and Unmatched counts on each trigger card.
-   Click a trigger to open detailed stats and identify why contacts didn’t match.

**Simple example**

You’ve built a workflow triggered when a contact is created and filtered by Contact Type = Customer. After switching to Stats View, you notice most entries are marked Unmatched.

Clicking into the details reveals the reason:

-   Received value: lead
-   Expected value: customer

You update your filter — and instantly see the next batch matching correctly.

**Why we built it**

Previously, users had no clear visibility into why triggers fired — or didn’t.

Now, you can see exactly how your triggers perform, making it easier to debug, optimize logic, and ensure workflows run smoothly.

**Note**

At launch, **Trigger Stats** will be available through the **Labs Beta**.

To access it, go to **Settings → Labs**, search for “Trigger Stats,” and enable it via the toggle.