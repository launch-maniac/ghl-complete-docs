---
title: "Conversation AI - Enable Triggers / Instructions in Knowledge Base"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69cda809164ce6d37ccb4cd9"
author: "Abhishek Kumar"
pubDate: "2026-04-13T11:19:03.000Z"
link: "https://ideas.gohighlevel.com/changelog/conversation-ai-enable-triggers-instructions-in-knowledge-base"
categories: conversation ai,new
url: "https://ideas.gohighlevel.com/changelog/conversation-ai-enable-triggers-instructions-in-knowledge-base"
index: 3
---

# What’s New

We are introducing a triggers / instructions to enhance how Conversation AI interacts with the Knowledge Base (KB).

With this update, users can define explicit triggers or instructions for when the AI should use the Knowledge Base, giving more control over response accuracy and reducing cases where the AI misses KB or relevant information.

By default, nothing changes for existing setup. The current behaviour where the AI agent decides when to use the KB remains unchanged unless triggers are configured.

Additionally, we’ve **expanded how Knowledge Bases can be configured:**

-   You can now create up to **4 triggers**
-   Each trigger can have up to **7 Knowledge Bases attached**
-   Previously, users could only configure 7 Knowledge Bases in total

# How it Works?

**1\. Default Behaviour (No Change)**

-   If no trigger conditions are defined, the AI will continue to:
-   Autonomously decide when to query the Knowledge Base.
-   Follow the existing behaviour.

**2\. Define Trigger Conditions (New – Optional)**

-   Users can configure specific conditions or instructions within the Knowledge Base.
-   These act as signals for the AI to explicitly invoke the KB when certain scenarios are met.
-   Users can configure up to 4 triggers within the Knowledge Base
-   Each trigger can include up to 7 Knowledge Bases
-   These triggers act as signals for the AI to explicitly invoke the KB when certain scenarios are met

**3\. Dynamic KB Invocation**

-   When a trigger condition is present:
-   The system evaluates the condition at execution.
-   If matched, the AI prioritises retrieving information from the Knowledge Base.

**4\. Dynamic Decisioning Making**

-   The AI can still:
-   Independently decide to use the KB when needed.
-   Combine autonomous reasoning with user-defined control

# Why this Matters

-   Reduces cases where the AI misses relevant KB information
-   Improves response accuracy and reliability
-   Gives users more deterministic control, especially for critical workflows
-   Aligns Conversation AI with tool-based architecture patterns (similar to Voice AI)

# Note

-   This is a new release and may evolve based on feedback.
-   **Existing workflows will not be impacted unless triggers are configured**.

![Screenshot 2026-04-02 at 5](https://canny-assets.io/images/4639ce8f4a4dd2ae385f40558ce583d5.png)

![Screenshot 2026-04-02 at 5](https://canny-assets.io/images/54adb006ee287efb7772144e0f3abfd4.png)