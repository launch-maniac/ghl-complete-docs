---
title: "Workflows: New fields in Custom Values &amp; If/Else - Medium ID, Task ID, Note Created by, Contact Engagement Score"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "697b49983e098f0dc1c34967"
author: "Ashwin Raghunandan"
pubDate: "2026-01-29T13:55:18.000Z"
link: "https://ideas.gohighlevel.com/changelog/workflows-new-fields-in-custom-values-if-else-medium-id-task-id-note-created-by"
categories: automations,improved,new
url: "https://ideas.gohighlevel.com/changelog/workflows-new-fields-in-custom-values-if-else-medium-id-task-id-note-created-by"
index: 2
---

**What's new**

We’ve expanded the Custom Value picker and If/Else so you can use four new fields in workflows:

-   Contact -> Attribution Medium ID (from First/Latest Attribution)
-   Task ID
-   Note created by (Name)
-   Contact Engagement Score

These appear anywhere you pick custom value / merge fields or set If/Else conditions.

**Why we’re doing this**

Users have asked for more ways to build real-world workflows. With these new fields, you can now pinpoint where the lead came from, point to the exact task id, know who wrote a note, and act on a contact’s engagement level. Together, they make everyday automations clearer and more precise.

**Who it’s for**

Anyone building workflows - Agency Admins and sub-account users alike. If your account uses Engagement Scoring, you’ll also see the score as a field. ￼

**How to use**

In the Workflow Builder, open the custom value picker / merge field or add an If/Else step - these fields will now appear like any other field.

**Contact Engagement Score**

-   Engagement Score is available in locations with scoring set up under Settings → Manage Scoring.
-   Workflow Example: If the engagement score is 20+, move the contact to a faster follow-up branch; otherwise keep them on the standard path.

**Contact -> Attribution -> Medium ID**

-   To check attribution details, open a contact → Activity → First / Latest Attribution. ￼
-   Workflow Example: Mark Instagram DM leads and include the medium ID when you report the conversion from ads.

**Note Created by**

-   When you have a note based trigger, you can find the note created by merge field show up
-   Workflow Example: If the note author’s name includes “Success,” notify the Success team; otherwise notify Ops.

**Task ID**

-   Task ID appears when the workflow is task-related (Task Added/Completed/Reminder) or right after Add Task. ￼
-   Workflow Example: Send the Task ID to your project/ticket tool so the same task is updated there.

**Additional Notes**

If a value isn’t available for a contact or event, it will be empty; your workflow still runs.