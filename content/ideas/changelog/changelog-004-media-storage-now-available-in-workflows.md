---
title: "Media Storage Now Available in Workflows!"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69bd39db235c963762d4312c"
author: "Ashwin Raghunandan"
pubDate: "2026-03-24T15:15:35.000Z"
link: "https://ideas.gohighlevel.com/changelog/media-storage-now-available-in-workflows"
categories: automations,new
url: "https://ideas.gohighlevel.com/changelog/media-storage-now-available-in-workflows"
index: 4
---

**What’s new?**

You can now attach files from Media Storage directly inside supported workflow actions. Instead of re-uploading the same file or pasting media links by hand, you can now choose an existing asset or upload a new file when adding attachments to an SMS/MMS, voicemail, chat, and other supported workflow steps.

**How it works**

When you click Add Attachment, you’ll now see a modal with two options: Upload a file or Choose from Media Storage. After you select a file, the system checks the file type and size using the same validation rules already used by each action, then attaches the file to that workflow step. If you copy the action, the attached media carries over too.

**How to use it**

-   Open a media supported workflow action and click Add Attachment.
-   Choose Upload a file or Choose from Media Storage.
-   Select your file and save the action once validation passes.

**Why we built it**

Before this update, users had to manage assets outside the platform, repeatedly upload the same file, or copy and paste media URLs into each workflow action. This removes that extra work and makes it faster to reuse approved assets across workflows.

**Simple use case example**

-   A marketing agency can attach the same PDF guide from Media Storage to multiple Send Instagram DM actions without uploading it every time.

**Additional Notes**

-   Available in supported workflow actions that allow media attachments. Email action is not supported at launch and is currently a work in progress. It will be released very soon.
-   File type and size validation still applies based on the action, and the current upload validation behavior remains unchanged.
-   Unsupported file types or oversized files will show an inline error and cannot be inserted.
-   If an action is copied, its attached media will carry over. Existing workflows with previously uploaded media will continue to work as expected.

**Preview**

![image](https://canny-assets.io/images/5cc08ee518dcbed5d3473eddb2dba9d9.png)

_In supported workflow actions, the attachment flow now includes Choose from Media Storage alongside Upload a file._

![Kapture 2026-03-20 at 20](https://canny-assets.io/images/ec102e3d1f22e5360e543104993faffa.gif)