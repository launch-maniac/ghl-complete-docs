---
title: "Documents &amp; Contracts: Assign fillable fields Dynamically from Workflows"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "695f740506bb62adbb93034f"
author: "Sales &amp; Marketing"
pubDate: "2026-01-08T09:51:38.000Z"
link: "https://ideas.gohighlevel.com/changelog/documents-contracts-assign-fillable-fields-dynamically-from-workflows"
categories: documents &amp; contracts,new,improved
url: "https://ideas.gohighlevel.com/changelog/documents-contracts-assign-fillable-fields-dynamically-from-workflows"
index: 10
---

**What’s New?**

You can now assign fillable fields in Documents & Contracts templates dynamically to the workflow "From user"

**How to Use?**

**Step 1**

1.  Create a Template with Sender Field - Go to Payments → Documents & Contracts → Templates.

![Screenshot 2026-01-08 at 14](https://canny-assets.io/images/bd9593d0795fbd8a441fdb791de639d5.png)

1.  Click New and open the template editor. Add a Signature or any other fillable field.
2.  Set “To be signed by” → Sender.

![Screenshot 2026-01-08 at 14](https://canny-assets.io/images/5233f56cbc082a50384881a2ace5c938.png)

![Screenshot 2026-01-08 at 14](https://canny-assets.io/images/4d4034c92467da31fbc0fd641ae385ef.png)

1.  Save the template.

**Step 2**

1.  Use the Template in a Workflow. Open Workflows and add the action Send Documents & Contracts.

![Screenshot 2026-01-08 at 14](https://canny-assets.io/images/caf15995700646c9062eb31b0ddf76ea.png)

1.  Select the From User (this controls email sending credentials).
2.  Choose your template with Sender fields in it. System identifies if the template has those fields.

![Screenshot 2026-01-08 at 14](https://canny-assets.io/images/47ad7218ff5dc8e7c9480aa3c7aabb9b.png)

1.  Under Assign Sender Fields To, select:

-   From User → if the signer should be the workflow sender, or
-   Template Owner → if the signer should be the user who last updated the template.

![Screenshot 2026-01-08 at 14](https://canny-assets.io/images/ee218184e23ef6e8c36728738eae8543.png)

1.  Choose sending mode and channel (Email / Direct).
2.  Save and publish the workflow.

_The system automatically checks and assigns the Sender field correctly before sending._

**Why We Built This?**

Agencies and teams told us they were struggling with multiple sales reps sending the same contract with signer not being changed dynamically based on workflow.

This is especially useful for sales teams, onboarding flows, and multi-user agencies where ownership changes but the document remains the same.