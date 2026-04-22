---
title: "Custom Date Reminder: Now for Custom Objects, Opportunities and Companies"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69e6321497a0966bc44407fc"
author: "Product Team"
pubDate: "2026-04-21T14:18:17.000Z"
link: "https://ideas.gohighlevel.com/changelog/custom-date-reminder-now-for-custom-objects-opportunities-and-companies"
categories: automations,new,improved
url: "https://ideas.gohighlevel.com/changelog/custom-date-reminder-now-for-custom-objects-opportunities-and-companies"
index: 6
---

**What’s new?**

Custom date reminders now work with date fields on more record types, not just Contact custom date fields in contact-based workflows. With this update, you can use Opportunity date fields in contact-based workflows, Custom Object date fields in custom object–based workflows, and Company date fields in company-based workflows.

**How it works**

Custom date reminder triggers can now evaluate date fields based on the supported object in the workflow. In contact-based workflows, this includes Opportunity date fields. In custom object–based and company-based workflows, the trigger reads date fields from the same object the workflow is built around and starts the workflow when the reminder timing matches.

**How to use it**

-   Create or open a workflow for Contacts, Custom Objects, or Companies.
-   Choose a custom date reminder trigger and select the supported date field for that workflow type.
-   Set the timing for when the workflow should run before, on, or after that date.

**Why we built it**

Previously, custom date reminders were limited to Contact date fields inside contact-based workflows, which limited certain use cases. This update removes that restriction so you can automate date-driven follow-ups across more parts of your CRM without workarounds.

**Simple examples**

-   You can trigger a contact-based workflow from an Opportunity close date to remind the contact before a renewal conversation.
-   You can trigger a custom object–based workflow from a custom object expiry date to send an internal reminder when that record needs attention.

**Additional notes**

-   These are the field types supported now: Opportunity date fields in contact-based workflows, Custom Object date fields in custom object–based workflows, and Company date fields in company-based workflows.

**Preview**

![image](https://canny-assets.io/images/e98c1fdb4a31d57d0a0dc550fa9abc56.png)