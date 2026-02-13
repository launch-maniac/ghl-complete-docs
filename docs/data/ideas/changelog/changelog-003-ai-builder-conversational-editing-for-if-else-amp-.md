---
title: "AI Builder: Conversational Editing for If-Else &amp; Wait Actions"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "698f1e60dd00a3f9841d4421"
author: "Divyam Bhadoria"
pubDate: "2026-02-13T12:54:07.000Z"
link: "https://ideas.gohighlevel.com/changelog/ai-builder-conversational-editing-for-if-else-wait-actions"
categories: automations,new,improved
url: "https://ideas.gohighlevel.com/changelog/ai-builder-conversational-editing-for-if-else-wait-actions"
index: 3
---

AI Builder now supports editing If-Else and Wait actions directly through conversation. Previously, while these actions could be created via AI and other action types could be edited conversationally, modifying If-Else and Wait actions required manual configuration. This update delivers a fully seamless workflow building experience.

# What's New

Multi-Turn Editing for Complex Actions

Edit workflow logic conversationally without switching to manual configuration. Simply describe the changes you want to make.

![Screenshot 2026-02-13 at 6](https://canny-assets.io/images/8598fc0567d8c375ec3c253e956e0956.png)

**Wait Action Editing**

-   Update wait attributes including time delays, window settings, and reply conditions
-   Add or remove timeout branches without disrupting existing workflow structure
-   Convert between wait types (e.g., multi-branch "wait for email reply" to simple time delay, or to a conditional wait)
-   Existing branch configurations remain intact when modifying attributes only

![Screenshot 2026-02-13 at 6](https://canny-assets.io/images/314b8e80ecef00505aa253011cd76503.png)

**If-Else Action Editing**

-   Add new branches or remove existing ones while preserving remaining logic
-   Update branch conditions, change AND/OR operators, or append new condition segments
-   All modifications maintain existing branch nodes and downstream actions

![Screenshot 2026-02-13 at 6](https://canny-assets.io/images/d6d3e9841214f0fd948e191152914621.png)

# Why This Matters

These actions involve complex branching logic with numerous permutations, making accurate interpretation of user intent particularly challenging. This update eliminates the need to exit the conversational flow when refining workflow logic—users can now create, iterate, and finalize entire workflows without leaving AI Builder.