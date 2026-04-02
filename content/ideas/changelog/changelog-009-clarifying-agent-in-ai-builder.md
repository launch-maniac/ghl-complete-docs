---
title: "Clarifying Agent in AI Builder"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69ce3b4482780d63af784fb2"
author: "Divyam Bhadoria"
pubDate: "2026-04-02T09:50:44.000Z"
link: "https://ideas.gohighlevel.com/changelog/clarifying-agent-in-ai-builder"
categories: automations,new,improved
url: "https://ideas.gohighlevel.com/changelog/clarifying-agent-in-ai-builder"
index: 9
---

The AI Builder now gathers missing context before generating or editing workflows, producing significantly better first outputs and reducing the need for follow-up revisions.

# What's New

Previously, when a user provided a vague prompt like "follow up with the customer," the AI Builder would make assumptions and generate a full workflow — often requiring multiple rounds of revision. The same applied to edit requests: vague instructions led to changes that didn't always match user intent. Each revision cycle passed the entire workflow in context, increasing time to value.

The new Clarifying Agent detects gaps in the user's request and surfaces up to three focused questions before generation or editing begins. By collecting the right inputs upfront, the AI Builder delivers a more accurate first output for both new builds and edits, with fewer revisions and lower cost per interaction.

![ezgif](https://canny-assets.io/images/5edac7551559c194d57124d37cc8ea2f.gif)

# When Does It Activate?

The Clarifying Agent only intervenes when specific, high-impact details are missing:

-   Trigger not specified — The user hasn't defined what initiates the workflow (e.g., form submission, appointment booked, tag added).
-   Channel not provided — The user hasn't indicated the communication channel (e.g., SMS, email, WhatsApp).
-   Timing not defined — The user hasn't specified when an action should occur (e.g., immediately, after one hour, after one day).
-   Unsupported platform referenced — If the user mentions a channel that isn't supported, the agent flags it and asks which supported channel to use instead.

# How It Works

Open the AI Builder and describe the workflow you want to build or the edit you want to make.

If key details are missing, the Clarifying Agent surfaces targeted questions before the AI proceeds.

Select from the provided options or type a custom response.

Skip any question to let the AI decide on your behalf.

The AI Builder generates or edits the workflow with all additional context incorporated.

Questions are presented in a clean multiple-choice format. When multiple questions are surfaced, navigation arrows allow users to move between them. Every question is skippable.

# Why This Matters

The quality of any AI-generated output depends on the context it receives. The Clarifying Agent ensures the AI Builder has the right inputs before it begins, leading to better first outputs, fewer post-generation revisions, and a faster path from idea to live workflow.