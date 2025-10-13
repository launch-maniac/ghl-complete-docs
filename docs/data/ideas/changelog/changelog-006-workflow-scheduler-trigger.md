---
title: "Workflow Scheduler Trigger"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "68e885f03a7758daa2a00b53"
author: "Ashwin Raghunandan"
pubDate: "2025-10-13T13:53:59.000Z"
link: "https://ideas.gohighlevel.com/changelog/workflow-scheduler-trigger"
categories: automations,new
url: "https://ideas.gohighlevel.com/changelog/workflow-scheduler-trigger"
index: 6
---

**What’s new?**

You can now **trigger workflows on a schedule**, not just by contact or event.

Run automations every few hours, or days, or at an exact time of day — all without manual workarounds.

The new Scheduler trigger is complete with multiple time intervals and an optional advanced cron style setup.

![image](https://canny-assets.io/images/8fc2d57d2b8bb5b10486c91727d34261.png)

**How it works**

When adding a trigger, choose Scheduler. Then configure:

**Intervals:**

-   Hour (e.g., every 6 hours)
-   Day (e.g., every 2 days at 9:00 AM)
-   Daily at a specific time (e.g., every day at 6:00 AM)
-   Weekly / Monthly with Nth weekday (e.g., 2nd Friday, 4th Monday)
-   One-off date/time (run once on a specific date)
-   Advanced (cron-style) for complex schedules.

**Advanced Settings:**

-   Skip Weekends: Toggle to automatically avoid Saturdays/Sundays.
-   Stop On: Set an end date; the trigger stops firing after that date.

**Check Trigger Schedule (Preview)**

Quickly verify your setup before publishing. The Check Trigger Schedule panel shows the next 5 execution times based on your selections (interval, time, Nth weekday like 2nd Friday/4th Monday, timezone, Skip Weekends, and Stop After).

-   Click Check to reveal Next executions.
-   Preview respects all settings: timezone, Skip Weekends, Stop After, and advanced options.
-   If Stop After limits the window, you’ll see fewer than 5 dates or “No upcoming runs.”
-   Use this to sanity-check complex schedules (e.g., “2nd Friday 4:30 PM”) before you Publish.

![image](https://canny-assets.io/images/8dd2367fa5d5f8bdd69e40525cccb257.png)

The workflow will execute automatically according to your account’s timezone. You’ll also see active status and last run indicators to confirm your scheduler is working as expected.

**Contactless by Design**

-   Scheduler starts workflows without a contact, it will directly trigger the workflow based on the time set.
-   Contact-based actions are skipped. If you include a contact-only action, it won’t run and the execution log will show: “Action skipped because there is no contact present in the workflow as Scheduler is a contactless trigger.”
-   Contactless actions are best suited help you choose compatible steps (e.g., webhooks, Google Sheets, Slack, Airtable, Asana, data updates, internal notifications).

**Validations & Rules**

-   **Publish flow**: As with any trigger, schedules won’t run until you Publish the workflow.
-   **Execution logs**: Skipped actions (due to no contact) are clearly marked; you can trace runs by Last Run and preview upcoming runs via Check dates.

**How to use it**

-   Go to **Automations → Workflows → Add Trigger.**
-   Select **Scheduler**.
-   Choose the schedule type (hour/day/specific time/one-off).
-   Save and **Publish** the workflow.

**Why we built it**

Agencies and locations routinely need “run this every morning” or “the 2nd Friday at 10 AM.” Until now, many relied on Wait workarounds or external schedulers. Scheduler delivers a native, first-class clock trigger with clear presets and optional cron power — closing a long-standing parity gap with other automation tools.

**Example Use cases**

-   Sheet refresh: Update a Airtable records every 4 hours via the Airtable integration.
-   Send routine updates — Automatically send a daily summary or weekly performance report.
-   Trigger reminders — Schedule automated follow-ups every morning at 8 AM.