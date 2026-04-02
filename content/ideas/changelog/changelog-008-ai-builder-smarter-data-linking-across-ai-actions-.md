---
title: "AI Builder: Smarter Data Linking Across AI Actions &amp; Create Task"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69ce56dd346b79cd96f207c7"
author: "Divyam Bhadoria"
pubDate: "2026-04-02T11:48:33.000Z"
link: "https://ideas.gohighlevel.com/changelog/ai-builder-smarter-data-linking-across-ai-actions-create-task"
categories: automations,fixed
url: "https://ideas.gohighlevel.com/changelog/ai-builder-smarter-data-linking-across-ai-actions-create-task"
index: 8
---

# Overview

We've shipped major improvements to how AI Builder links data into AI actions and the Create Task action, making generated workflows significantly more accurate and reliable.

# What's New

Smarter Data Linking Across AI Actions

AI Builder now correctly passes the actual variable or data into action fields instead of inserting redundant prompts or instructions. Previously, AI Builder would inject a full prompt into an action's input field (e.g., "Summarize the following text into bullet points...") rather than simply passing the variable holding the value. Since these actions already know what to do, the extra instructions were redundant and sometimes caused unexpected output.

Now, AI Builder cleanly passes just the relevant variable (e.g., {{message.body}}, into each action's input field, letting the action perform as designed.

# Actions improved:

-   AI Summarize — Passes the target variable directly into the input field instead of wrapping it in summarization instructions.
-   AI Translate — Passes the source text variable cleanly, no longer adds translation prompts on top.
-   AI Intent Detection — Correctly links the content variable for sentiment or intent analysis.
-   AI Decision Maker — Passes the standard value for the content on which the decision needs to be made. Also resolves an issue where branch names were being left empty by AI Builder.

![Screenshot 2026-04-02 at 4](https://canny-assets.io/images/1acc6217f9ceefc70f748863c2e6fb49.png)

# Create Task Action Improvement

The task description field now contains an actual, human-readable task description for the assignee, not a prompt instructing the system to create a task.

Before: Description would read something like "Create a follow-up call task for the new lead."

After: Description reads something like "Follow up with {{[contact.name](http://contact.name)}} to discuss their inquiry and schedule a discovery call."

This makes the generated task immediately actionable for the person it's assigned to.

# Why This Matters

These improvements make AI Builder-generated workflows production-ready out of the box — less manual cleanup, fewer broken automations, and a much smoother experience from prompt to live workflow.