---
title: "Dashboard &amp; Custom Report Performance Optimisation"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "696f59d64b8b763eae972575"
author: "Sales &amp; Marketing"
pubDate: "2026-01-20T10:41:08.000Z"
link: "https://ideas.gohighlevel.com/changelog/dashboard-custom-report-performance-optimisation"
categories: dashboard,new
url: "https://ideas.gohighlevel.com/changelog/dashboard-custom-report-performance-optimisation"
index: 1
---

# 🚀 Overview

We’ve shipped multiple backend performance optimisations across Dashboards and Custom Reports to reduce redundant API calls, improve load times, and enhance overall responsiveness across navigation and builders.

# ✨ What’s New

**Dashboard Improvements**

-   Widget definition APIs now trigger only when adding a widget, instead of firing on drawer open or tab navigation
-   Removed redundant widget data API calls during:

1.  Cancelling dashboard edits
2.  Saving dashboards without changes
3.  Saving dashboards after widget updates
4.  Saving widgets when no data changes occur
5.  Applying quick filters across different module widgets

-   Improved dashboard mount performance by converting sequential API calls into parallel execution

**Custom Report Improvements**

-   Optimised report navigation by preventing previous page API calls when switching between report pages
-   Improved data loading by moving users, pipelines, and currency symbol APIs from list view to builder view
-   Enhanced Custom Report builder performance by converting sequential API calls into parallel execution

# 💡 Why This Matters

These optimisations significantly reduce unnecessary network requests, resulting in:

-   Faster load times
-   Smoother navigation
-   A more responsive experience when working with Dashboards and Custom Reports, especially for complex or data-heavy setups

# 📝 Note

These updates are backend-only performance enhancements and do not introduce any UI or workflow changes for users.