---
title: "Internal Notifications: Contactless Triggers Support"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "68cc1f87de014c8916beb912"
author: "Ashwin Raghunandan"
pubDate: "2025-09-19T14:29:30.000Z"
link: "https://ideas.gohighlevel.com/changelog/internal-notifications-contactless-triggers-support"
categories: automations,improved
url: "https://ideas.gohighlevel.com/changelog/internal-notifications-contactless-triggers-support"
index: 6
---

**What’s new?**

Internal Notification (in-app, email, SMS) now works even when no contact is enrolled in the workflow. This includes workflows started by webhooks, Marketplace triggers, and other event-based automations - so your team can be alerted about operational events that don’t involve a contact record. We’ve also updated recipient logic for email/SMS to handle cases where “Assigned User” isn’t available.

**How it works**

1.  **In-app Internal Notification:**

-   Triggers with or without a contact, compatible with webhook/Marketplace/event-based triggers.

1.  **Email (To field):**

-   All Users: Sends to all team members’ email addresses.
-   Specific Users: Sends to selected users.
-   Assigned User: If a contact exists and has an assigned user → send; if no contact or no assigned user → skip this step.

1.  **SMS (To phone):**

-   All Users: Populates with users’ phone numbers.
-   Specific Users: Sends to selected users.
-   Assigned User: If a contact exists with a valid assigned user phone → send; else → skip this step.

**How to use it**

-   Create (or open) a workflow with a webhook or Marketplace trigger (e.g., task created on Clickup).
-   Add Internal Notification and choose In-App, Email, or SMS.
-   Select recipients (All Users, Specific Users, or Assigned User) and save/publish.
-   You can combine with other workflow actions (e.g., Assign to User, task creation, webhooks) to fully automate handoffs.

**Why we built it**

Teams increasingly automate back-office events (marketplace apps, webhooks, form tools) where no contact is present. Previously, many users created “dummy” contacts or added extra steps just to notify their team - an awkward workaround. This change lets you alert the right people instantly without forcing contact creation, keeping notifications in the same workflows you already use.

**Use Cases**

-   Your form submission trigger further creates a ClickUp task. When the external system confirms “task created,” your workflow fires an Internal Notification to the fulfillment team:
-   If you choose In-App or Specific Users (email/SMS), the alert sends even though no contact entered the workflow.

**Preview**

![image](https://canny-assets.io/images/8ff98988628868a325aa129e87528e77.png)