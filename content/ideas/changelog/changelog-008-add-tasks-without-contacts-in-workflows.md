---
title: "Add Tasks Without Contacts in Workflows"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "68d3faf5f2a77a3ea441512c"
author: "Ashwin Raghunandan"
pubDate: "2025-09-25T11:28:17.000Z"
link: "https://ideas.gohighlevel.com/changelog/add-tasks-without-contacts-in-workflows"
categories: automations,improved
url: "https://ideas.gohighlevel.com/changelog/add-tasks-without-contacts-in-workflows"
index: 8
---

**What’s new?**

You can now use the 'Add Task' workflow action to create contactless tasks. Previously, this action required a contact to pass through the workflow; otherwise the step was skipped. Contactless tasks support assignee, due date, priority, and notes - just like contact-attached tasks.

**How it works**

When the 'Add Task' step runs, it will create a standalone task if no contact is present at runtime. If a contact exists, the task will attach to that contact as usual. All task fields (assignee, due date, priority, description) are honored in both cases.

**How to use it**

-   In your workflow, add an action for 'Add Task' and set assignee, due date, and priority.
-   Run the workflow from a non-contact trigger (Eg. Inbound Webhook) to create a contactless task.
-   Save and publish.

**Why we built it**

Agencies often need internal to-dos that aren’t tied to a person - ops checklists, billing follow-ups, content deadlines. This removes the “must have a contact” blocker so workflows can automate those tasks too.

**Preview**

![image](https://canny-assets.io/images/165e293d664d9ac794d0030015238bfe.png)