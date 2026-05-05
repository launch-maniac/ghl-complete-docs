---
title: "Conversation AI - Separate Controls for Bot Sleep on Manual vs Workflow Messages"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69f4b9fac257cf7843317d1c"
author: "Abhishek Kumar"
pubDate: "2026-05-01T14:39:47.000Z"
link: "https://ideas.gohighlevel.com/changelog/conversation-ai-separate-controls-for-bot-sleep-on-manual-vs-workflow-messages"
categories: conversation ai,new
url: "https://ideas.gohighlevel.com/changelog/conversation-ai-separate-controls-for-bot-sleep-on-manual-vs-workflow-messages"
index: 8
---

# What’s New

We are introducing more granular controls for how Conversation AI pauses (sleeps) when outbound messages are sent.

With this update, the setting “Send bot to sleep when I send a” has been split into two independent options:

-   Manual Message
-   Workflow Message

This gives users greater flexibility in controlling bot behavior based on how messages are triggered, improving automation precision and reducing unintended bot pauses.

By default, existing setups will continue to behave as they currently do, ensuring no disruption unless users modify these settings.

# How it Works?

**1\. Default Behaviour (No Change)**

-   If no changes are made:
-   The bot will continue to follow the previously configured sleep behavior.
-   Existing automation and manual interactions remain unaffected.

**2\. Independent Sleep Controls (New)**

-   Users can now configure bot sleep behavior separately for:
-   Manual Messages (messages sent directly by a user)
-   Workflow Messages (messages sent via automations/workflows)

This allows:

-   Sleeping the bot only for manual interactions
-   Sleeping the bot only for automated messages

Or both (same as previous behavior

**3\. More Precise Automation Handling**

With separated controls:

-   Manual interventions can pause the bot without affecting workflows
-   Automated messages can be sent without unintentionally stopping the bot
-   Greater flexibility in hybrid (manual + automated) communication strategies

**4\. Reactivation Remains Configurable**

-   The “Reactivate bot after” setting continues to work as before
-   Applies regardless of whether sleep was triggered by manual or workflow messages

**Why this Matters**

-   Prevents unnecessary bot pauses during automated workflows
-   Enables better control in mixed manual + automation use cases
-   Improves conversation continuity and user experience

Gives users more granular and predictable bot behavior

# Note

**This is an enhancement to existing functionality. Current behavior will remain unchanged unless users update the new settings.**

![Screenshot 2026-05-01 at 7](https://canny-assets.io/images/1a0747b9ea7ba4c5d5a9b639c5568091.png)