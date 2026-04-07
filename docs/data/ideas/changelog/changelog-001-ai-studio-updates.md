---
title: "AI Studio Updates"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69d3ddb09fb67dc4f914f5f3"
author: "Sales &amp; Marketing"
pubDate: "2026-04-06T16:24:25.000Z"
link: "https://ideas.gohighlevel.com/changelog/ai-studio-updates"
categories: new
url: "https://ideas.gohighlevel.com/changelog/ai-studio-updates"
index: 1
---

# Enhancements

• **Folder navigation with breadcrumbs**

When browsing projects inside a folder, a breadcrumb trail (e.g. "All Projects > My Folder") helps you navigate back easily.

• **Package names in details feed**

When the AI adds or removes a dependency, the activity card now shows the package name instead of a generic message.

# Bug Fixes

• **Fixed preview not loading during code generation**

Internal health checks to the preview were being blocked by security rules, causing the preview to appear stuck on "not ready." This is now resolved and live previews load with better reliability.

• **Fixed inconsistent preview status**

The live preview status could vary depending on which server handled your request, sometimes incorrectly showing "not running." Status is now always checked live and consistent.

• **Fixed long project names breaking the top bar**

Very long project names no longer push toolbar buttons off-screen.

• **Fixed auto-fix overwriting AI response**

When the AI automatically fixed build errors, the original helpful summary was sometimes replaced with technical fix details. The original response is now preserved.

• **Fixed package installation on project reopen**

Reopening a project with extra installed packages (e.g. axios) would sometimes fail to restore them. Dependencies are now properly saved and restored.

• **Prevented search engines from indexing preview links**

Preview URLs are now marked as non-indexable so they won't appear in search results. Published sites are unaffected.

• **Fixed false "Something went wrong" during AI thinking**

During extended thinking phases, the app would sometimes incorrectly show an error.

The system now properly tracks thinking activity to prevent false alarms.

# Internal Improvements

• **Sandbox keep-alive during long generations**

The coding sandbox could time out if the AI spent several minutes thinking before writing files. It now stays alive throughout the entire generation.

• **Modal environment separation**

Staging and production sandboxes now run in isolated environments to prevent cross-contamination.

• **Preview worker cleanup**

Removed unused screenshot capture code and stale comments from the injected preview script.

![image (1)](https://canny-assets.io/images/9793c418df0f9060cb6c8eefbe5b33aa.png)

![image (2)](https://canny-assets.io/images/52909495669ceeae5c5bc1f429c2f5b4.png)

![image](https://canny-assets.io/images/e89798100497a4627f8a14b1bad457bd.png)