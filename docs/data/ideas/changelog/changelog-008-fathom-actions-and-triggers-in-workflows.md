---
title: "Fathom actions and triggers in Workflows."
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69c4d062999fc17b80b46bd1"
author: "Srikanth Chellaboina"
pubDate: "2026-03-26T06:21:24.000Z"
link: "https://ideas.gohighlevel.com/changelog/fathom-actions-and-triggers-in-workflows"
categories: new
url: "https://ideas.gohighlevel.com/changelog/fathom-actions-and-triggers-in-workflows"
index: 8
---

**Overview:**

We’ve introduced Fathom actions and triggers in Workflows.

This allows users to turn meeting conversations into automated workflows such as follow-ups, task creation, and internal notifications without manual effort.

**Triggers :**

-   New Recording

Trigger workflows when a new meeting recording is available in Fathom.

**What it does:**

-   Fires when a meeting recording is created and processed
-   Provides metadata such as recording ID, meeting details, transcript, and more

![Trigger list](https://canny-assets.io/images/f3dfec75e98d64721d460e417285e8e2.png)

![Trigger to test](https://canny-assets.io/images/73ee89283f96f08bad86b3d851f5dd67.png)

![Trigger test sucessful](https://canny-assets.io/images/5e1ee46e08836851a53e4a79a5ff959d.png)

**Actions:**

**List Recordings**

Retrieve a list of available Fathom recordings for the connected account.

**What it does:**

-   Fetch recordings based on the connected user
-   Allows selection of recordings for downstream actions

**Fetch Transcript**

Retrieve the transcript for a selected recording.

**What it does:**

-   Provides full meeting transcript
-   Enables use of transcript data in AI and other workflow steps

**Fetch Summary**

Retrieve the AI-generated summary for a selected recording.

**What it does:**

-   Provides concise meeting summaries
-   Can be used for task extraction, notifications, and follow-ups

![actions list](https://canny-assets.io/images/f51538d2a61ec4f11ececec6eefb7520.png)

![Action](https://canny-assets.io/images/205c506dfc30d3d0655097e1efb70b08.png)

**Integration Setup**

Connect Fathom to start using triggers and actions in workflows.

**Steps:**

-   Go to Workflow Builder and search for Fathom
-   Select any Fathom trigger or action
-   Click Connect Now and sign in using your Fathom account

![connect now](https://canny-assets.io/images/a590835c416035451a948e98ffd8d4c5.png)

-   Alternative:
-   Go to Settings → Integrations
-   Find Fathom and connect your account

![integrations](https://canny-assets.io/images/fc8eeaf246ad2817883c0dcd10d97230.png)

**Use Cases**

1.  Use transcripts from Fathom to generate personalized follow-up emails.

-   Trigger when transcript is generated
-   Extract competitors mentioned in the call using Manus
-   Generate context-aware follow-ups using AI action
-   Send emails automatically based on the conversation

![fathom + manus](https://canny-assets.io/images/9e915831202991f5e131a000aa0e88d6.png)

1.  Client Call → Auto Summary + Task Assignment

Automatically convert meeting summaries into actionable tasks in clickup.

-   Fetch meeting summary from Fathom
-   Extract action items using AI
-   Create tasks in ClickUp
-   Send internal notifications to the team for visibility

![fathom+CU](https://canny-assets.io/images/94e514d9a02aaa8663af60b546704536.png)

**FAQs**

**When does the “New Recording” trigger fire?**

The trigger fires after the meeting recording is processed and available in Fathom. This may take a few minutes after the call ends for the summary to be processed.

**Can I map Fathom recordings to contacts in HighLevel?**

Yes, but mapping is not automatic. You can match contacts using participant details (such as email) within your workflow.

**Is Fathom a premium action in workflows?**

Yes. Fathom actions (such as fetching transcripts, summaries, or recordings) are considered premium workflow actions and will be charged at default rate per execution.