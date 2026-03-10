---
title: "Fixed: &amp;apos;Assign to User&amp;apos; Now Skips Inactive Users"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69aaf45727fb794d611fc61e"
author: "Ashwin Raghunandan"
pubDate: "2026-03-06T16:07:56.000Z"
link: "https://ideas.gohighlevel.com/changelog/fixed-assign-to-user-now-skips-inactive-users"
categories: automations,fixed
url: "https://ideas.gohighlevel.com/changelog/fixed-assign-to-user-now-skips-inactive-users"
index: 8
---

**Overview**

In workflows using the Assign to User action with Split Traffic, deactivated or deleted users were not revalidated at runtime. This could cause contacts to be assigned to inactive users, leading to missed follow-ups.

**What’s new**

The Assign to User action now validates each user’s status when the step runs and skips any inactive or deleted users.

**What’s changed**

If a user in the configured Split Traffic list is no longer active, they are excluded from assignment at execution time.

**Additional Notes**

-   The existing split distribution order does not reset. Traffic continues to distribute as if the deleted user never existed.
-   If only one user was configured and that user is deleted, the step is skipped.