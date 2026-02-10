---
title: "Conversation AI - Generate Conversation Summary &amp; Transcript"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69899a6604f92e28e2731c45"
author: "Abhishek Kumar"
pubDate: "2026-02-10T10:28:22.000Z"
link: "https://ideas.gohighlevel.com/changelog/conversation-ai-generate-conversation-summary-transcript"
categories: conversation ai,new
url: "https://ideas.gohighlevel.com/changelog/conversation-ai-generate-conversation-summary-transcript"
index: 1
---

# What’s New

You can now automatically generate conversation summaries and full transcripts for every Conversation AI session - giving you instant visibility, audit-ability, and actionable insights from AI-driven conversations.

Summaries are generated intelligently based on inactivity, bot sleep events, or session boundaries, and can be saved to contact records, trigger workflows, or sent via email - no manual effort required.

This update introduces a unified, session-based conversation log with powerful automation hooks to drive CRM actions, insights, and follow-ups.

**Needs to enabled from Agency Labs**

# How It Works

Conversation summaries and transcripts are generated per session and always reflect the latest session only.

**A summary is created when:**

-   The configured inactivity time expires (no messages from user or bot), or
-   The bot is put to sleep due to:
-   Maximum message limit reached
-   Workflow-based bot sleep
-   Stop Bot condition
-   Human handover
-   Manual or workflow message sent

**Each new summary:**

-   Replaces the previous summary
-   Includes only messages sent after the last summary was generated
-   Both inbound and all outbound messages are included.
-   Summaries and transcripts are generated only for messages that occur while the feature is enabled.

# How to Configure

1.  Navigate to AI Agents → Conversation AI
2.  Select an existing bot or create a new one
3.  Go to the Bot Goals tab
4.  Enable Conversation Summary

**Optional Settings**

-   Set an Inactivity Time (e.g., 15 minutes)
-   Define a Minimum Message Count required to generate a summary
-   Automatically save the summary to a contact field (previous summary is replaced)
-   Trigger a workflow instantly when a summary is generated
-   Configure email notifications for one or more recipients: All admins , All users , Contact’s assigned user, Specific users, Custom email addresses

**Workflow & Automation Power**

-   Trigger workflows without a trigger when a summary is generated
-   Access conversation data using workflow variables:

```
Conversation AI → Summary

Conversation AI → Transcript
```

**Use GPT actions to:**

-   Generate insights
-   Extract key information
-   Update contact fields from transcripts

A- ppend multiple summaries or transcripts over time

-   Perform advanced CRM automations

# Why It Matters

Previously, Conversation AI lacked a centralised, contextual record of past interactions making audits, reviews, and insight extraction difficult.

This update helps you:

-   Gain full visibility into AI conversations
-   Enable auditing the conversation
-   Identify common customer questions to improve FAQs and bots
-   Trigger CRM actions automatically based on real conversation outcomes

Help doc - [https://help.leadconnectorhq.com/support/solutions/articles/155000006602-conversation-ai-summary-and-transcript](https://help.leadconnectorhq.com/support/solutions/articles/155000006602-conversation-ai-summary-and-transcript)

![image](https://canny-assets.io/images/4a766413a7a3df667b1082a6ae5d8597.png)

![image](https://canny-assets.io/images/6de2156f6423150a162f93e3b27c0e7d.png)