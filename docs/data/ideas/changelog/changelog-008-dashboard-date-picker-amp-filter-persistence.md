---
title: "Dashboard Date Picker &amp; Filter Persistence"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69a6ce873e26fea265c8f770"
author: "Sales &amp; Marketing"
pubDate: "2026-03-09T08:19:16.000Z"
link: "https://ideas.gohighlevel.com/changelog/dashboard-date-picker-filter-persistence"
categories: reporting,dashboard,improved
url: "https://ideas.gohighlevel.com/changelog/dashboard-date-picker-filter-persistence"
index: 8
---

# 🚀 Overview

We’ve enhanced dashboards and custom reports to persist date ranges and filter selections per user.

The system now remembers the date range and filters you select. When you refresh the page or return later, your selections remain exactly as you left them.

# ✨ What’s New

**Dashboard Updates**

• Dashboard date range now saves automatically per user

• Widget dropdown values now persist based on user selection (no longer defaulting to the first pipeline value)

• Selected values remain saved until manually changed

• AI Summary now reflects the selected pipeline instead of always using the first pipeline in the dropdown

• If a saved filter (such as a pipeline) is deleted, we automatically select the first available option

• Duplicated dashboards retain relevant date and filter settings

• Introduced comparison date range on a dashboard level date filter - which will also be applicable to general widgets

• Widget level comparison will take preference over dashboard level if explicitly mentioned

**Custom Reports Updates**

• Custom reports now follow the same persistence logic as dashboards

• Dropdown values are saved for all users when the report creator clicks “Save”

• Email sharing sends a snapshot of the report values at the time of email generation

• Subsequent report changes do not impact already sent emails

• Introduced comparison date range for custom report builder - which will also be applicable to general widgets

• For custom report builder, widget level comparison will take preference over report level if explicitly mentioned

# 📝 Important Notes

• Widget-level date settings can still differ from the dashboard date

• Snapshot restores do not copy user-specific preferences

# 💡 Why This Matters

You no longer need to reset filters every time you open a dashboard. Your reports stay consistent, and previously sent emails won’t change even if you update filters later.