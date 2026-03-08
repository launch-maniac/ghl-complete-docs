---
title: "🔕 No External Update Emails for “Showed” &amp; “No Show” Status Changes"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69aa96852f4fbc303f141ee6"
author: "Mayank Jain"
pubDate: "2026-03-06T09:03:07.000Z"
link: "https://ideas.gohighlevel.com/changelog/no-external-update-emails-for-showed-no-show-status-changes"
categories: calendar,improved,new
url: "https://ideas.gohighlevel.com/changelog/no-external-update-emails-for-showed-no-show-status-changes"
index: 8
---

# 🧭 Overview

We’ve improved how appointment status changes behave when marked as **Showed** or **No** **Show**.

Previously, updating these statuses would upload the event to connected calendars (Google, Outlook, iCloud), which triggered external **event update emails** to attendees — even though nothing meaningful had changed from their perspective.

With this update, marking an appointment as Showed or No Show will no longer push updates and emails to third-party calendars.

# 🚀 What’s Changed

**✅ No Event Update Emails for “Showed” or "No Show"**

Changing the status to "**Showed**" or "**No Show**"will no longer trigger external update emails.

**✅ Internal Tracking Still Works as Expected**

Status changes are still reflected inside the system for reporting, and automation logic — only external calendar updates has been adjusted.

# 🎯 Why This Matters

-   Prevents unnecessary “Appointment Updated” emails
-   Avoids confusion for customers
-   Keeps external calendar behavior clean and intentional
-   Ensures status tracking remains operational, not customer-facing