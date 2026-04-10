---
title: "Drip Action: Major Upgrades"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69d79ad34257c5c67ed69b4d"
author: "Divyam Bhadoria"
pubDate: "2026-04-09T12:49:41.000Z"
link: "https://ideas.gohighlevel.com/changelog/drip-action-major-upgrades"
categories: automations,new,improved
url: "https://ideas.gohighlevel.com/changelog/drip-action-major-upgrades"
index: 10
---

The Drip action has been upgraded with a set of transparency and reliability improvements, giving users full visibility into how their drip schedules will run and ensuring pacing is preserved across workflow state changes.

# What's New

**Drip Preview**

A live schedule preview is now available inside the Drip action during configuration. Users can see exactly when each batch is projected to run before publishing.

-   Batch table displaying batch number and scheduled send time, with up to 10 batches previewed
-   Inline warning surfaced when a Workflow Time Window is active, so schedule conflicts are caught before publishing: "Workflow time window (8 AM - 7 PM, Mon-Tue-Wed-Thu-Fri) is shifting some batches to the next available slot." The time window is a clickable link that opens the relevant setting directly.
-   The preview is shown during first-time setup and is hidden when contacts are already queued in the drip, keeping the editing view clean

![ezgif](https://canny-assets.io/images/c7856508b948eb962e7ec02c8d14dbd9.gif)

![ScreenRecording2026-04-09at5](https://canny-assets.io/images/1f93f35aad664a722cd50d1d2b662308.gif)

**Action Statistics, Batch Schedule & Insights**

The statistics icon on the Drip action has been redesigned as a proper, discoverable button. Clicking it opens a detailed view of everything happening inside the drip.

-   Summary cards showing contacts currently in the drip, next batch details, and ETAs
-   Full batch schedule table with every batch, its scheduled send time, and any active constraints affecting timing
-   Time Window setting surfaced directly inside this view, with a redirection link to jump into the setting without leaving the screen
-   Status column, pagination, and existing capabilities (move to next step, delete, contact hyperlink) consolidated in one place
-   When drip settings are edited on a workflow with contacts already queued, a clear note clarifies that updated settings will apply only to new contacts entering the workflow

![ScreenRecording2026-04-09at6](https://canny-assets.io/images/1af1b91d8a8513df7d8be5466dad2806.gif)

**Batch Size Change Warning**

When batch size is updated on a previously published workflow with contacts already queued, a soft blue informational note is shown:

"Note: Contacts already queued in this drip will use the previous batch size. New contacts will use the updated batch size."

This appears only when the workflow has been published at least once and contacts are actually present in the Drip action, keeping the message relevant and non-intrusive.

**Auto-Pause on Draft, Auto-Resume on Publish**

When a workflow moves from Published to Draft with contacts queued in a Drip action, those contacts are now paused for the full duration the workflow remains in Draft. Once republished, the drip resumes from where it left off instead of bursting all queued contacts out at once, preserving the original pacing and protecting sender reputation.

**Drip Narration on Hover**

A tooltip now appears on hover of the Drip action (similar to the Wait step), allowing users to read the full configuration without opening the action. Examples:

-   "Batches of 100 contacts, every 5 minutes"
-   "Batches of 1.5K contacts, every 30 minutes"

![ScreenRecording2026-04-09at5](https://canny-assets.io/images/069084a74efe950c955d7745c4b8fc48.gif)

**Updated Field Tooltips Inside the Drip Action**

Tooltips on the individual fields inside the Drip action have been refreshed with clearer descriptions and examples, so users can understand what each field does directly in context.

# Why This Matters

Drip schedules previously behaved in ways users couldn't easily explain, driven by three recurring gaps: 1)Active Workflow Time Windows silently shifting batch times

2)Mid-run setting changes applying only to new contacts without clear indication.

3)Workflows toggling between Published and Draft causing queued contacts to burst out all at once.

This release closes those gaps by surfacing constraints directly in the product, preserving drip pacing across publish state changes, and delivering reduction in guesswork around drip scheduling.

# Good to Know

-   The schedule preview shows a maximum of 10 batches; if fewer exist, all are shown
-   The preview is hidden while editing a Drip action that already has contacts in it
-   The batch size warning only appears on workflows that have been published at least once and currently hold contacts in the drip
-   The "settings apply to new contacts only" note is shown only when drip settings are edited on a workflow with contacts already queued