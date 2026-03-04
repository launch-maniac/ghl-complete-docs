---
title: "Assign User Action: Now Assign to IVR Responder with Custom Variables"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69a6e78bb83285f98b8ae13c"
author: "Ashwin Raghunandan"
pubDate: "2026-03-03T15:40:35.000Z"
link: "https://ideas.gohighlevel.com/changelog/assign-user-action-now-assign-to-ivr-responder-with-custom-variables"
categories: automations,new
url: "https://ideas.gohighlevel.com/changelog/assign-user-action-now-assign-to-ivr-responder-with-custom-variables"
index: 3
---

**What’s new?**

IVR Connect Call now exposes new variables: 'Answered By User ID', 'Answered By Device', and 'Answered By Phone Number'.

You can use Answered By User ID inside the Assign User action to automatically assign the contact to the person who picked up the call. These variables are also available in the custom variable picker, so they can be referenced in other workflow actions like Notes, SMS, Email, and more.

**How it works**

When a call reaches your IVR and is routed through Connect Call, the system captures who answered. In workflows, you can reference these values dynamically - most commonly passing Answered By User ID into Assign User to set ownership, or inserting the other variables into messages and notes.

**How to use it**

-   Add an Assign User action after your IVR → Connect Call step.
-   In the Users field, switch to Dynamic and select Connect Call → Answered By User ID.
-   Save and publish the workflow.

**Why we built it**

Previously, contact ownership had to be set manually or assigned to a fixed user. Now, ownership automatically matches the person who actually spoke to the lead - keeping follow-ups, tasks, and reporting accurate.

**Use Case example**

A lead calls your IVR and the call is routed through Connect Call. John answers the phone. The workflow uses Answered By User ID from the Connect Call step, and the contact is automatically assigned to John.

**Additional Notes**

-   Works for both single or multiple users configured in Connect Call.
-   Assignment happens only if the call is successfully answered.
-   Uses the first connected user as the owner.
-   Assign User will not work if the Connect Call routes to a Custom Phone Number (no associated user ID).
-   To assign dynamically, you must use Answered By User ID (not device or phone number).

**Preview**

![image](https://canny-assets.io/images/f318fb783a22dc7f322b3cc396854903.png)