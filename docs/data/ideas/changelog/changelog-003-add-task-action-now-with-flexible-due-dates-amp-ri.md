---
title: "Add Task Action: Now with Flexible Due Dates &amp; Rich Text!"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69d660ace174aa97eca6f116"
author: "Ashwin Raghunandan"
pubDate: "2026-04-08T14:27:37.000Z"
link: "https://ideas.gohighlevel.com/changelog/add-task-action-now-with-flexible-due-dates-rich-text"
categories: automations,improved,new
url: "https://ideas.gohighlevel.com/changelog/add-task-action-now-with-flexible-due-dates-rich-text"
index: 3
---

**What’s new?**

We’ve improved the Add Task workflow action so you can set due dates with much more flexibility. You can now configure task due dates using days, weeks, months, or years, add a specific due time, see a live preview of the evaluated due date, and create task descriptions with rich text formatting.

**How it works**

In the Add Task action, the due date is now configured through a Due In input with a numeric value and time unit. You can optionally set a specific time, and the action shows a live preview of what the final due date and time would be if the workflow ran right now. Task descriptions now support rich text and keep their formatting when saved and displayed in Tasks.

**How to use it**

-   In Add Task, enter a value in Due In and choose days, weeks, months, or years.
-   Optionally select a due time and enable Exclude Weekends if needed.
-   Add a rich text description, then review the live due date preview before saving.

**Why we built it**

Earlier the task action was limited with due dates to a very short window, which made it hard to plan follow-up work beyond 5 days or assign tasks for a specific time of day. This update gives you more control over long-term task planning and helps you create clearer, more detailed tasks directly from workflows.

**Simple use case**

-   A real estate team can create a task due in 2 weeks at 10:30 AM for a follow-up call after a property tour.

**Additional Notes**

-   Existing workflows that use the current day-based due date setup continue to work the same way.
-   If Exclude Weekends is enabled, weekends are skipped when calculating the due date, and the live preview uses the same logic as final task creation.
-   Rich text formatting is preserved when the task is saved and displayed across task surfaces.

**Preview**

![image](https://canny-assets.io/images/7bd9de36e165018c83159125af1ce4b1.png)

![Kapture 2026-04-08 at 19](https://canny-assets.io/images/c4bb63fa8e27e53099a45b0a042fb40d.gif)