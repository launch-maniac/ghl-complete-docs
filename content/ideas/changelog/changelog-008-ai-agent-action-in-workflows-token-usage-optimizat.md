---
title: "AI Agent Action in workflows: Token Usage Optimization"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69e23e1f18add47e8fa753f8"
author: "Divyam Bhadoria"
pubDate: "2026-04-17T14:06:49.000Z"
link: "https://ideas.gohighlevel.com/changelog/ai-agent-action-in-workflows-token-usage-optimization"
categories: automations,new
url: "https://ideas.gohighlevel.com/changelog/ai-agent-action-in-workflows-token-usage-optimization"
index: 8
---

# What's New

The AI Agent action now uses significantly fewer tokens per execution with no impact on output quality. Since usage is billed per token, this directly translates to lower costs and more room to scale.

![87b732f3da014c4fc28229805bd89e7f](https://canny-assets.io/images/5a941dda8882d01cac00f03b6184e83e.png)

# What Changed

-   Cleaner context — Duplicate and internal data that was being sent to the model on every turn has been stripped out. Raw database internals, redundant contact data, and unnecessary workflow metadata are no longer included.
-   Smarter tool responses — Tool outputs previously included dozens of irrelevant fields per record (e.g., 30+ permission fields per user). Now only relevant fields like name, email, and phone are passed to the model.
-   Conversation memory management — Long-running agents now automatically summarize older conversation steps while keeping recent ones in full detail, instead of sending the entire history every turn.
-   Structured output optimization — The final extraction step no longer duplicates the entire context, saving thousands of tokens per execution.

# Results

Tested on the same workflow and contact with zero quality loss:

First LLM call: 36% token reduction

Total execution: 20% token reduction

# Why This Matters

Every workflow execution is now leaner. Same output quality, fewer tokens, lower cost — meaning you can run more automations without increasing spend.