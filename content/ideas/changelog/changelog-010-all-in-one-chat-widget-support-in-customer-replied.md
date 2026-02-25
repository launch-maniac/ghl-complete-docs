---
title: "All-in-One Chat widget support in Customer Replied trigger"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "6996f53426bfb678477f57a5"
author: "Manas Dixit"
pubDate: "2026-02-19T11:48:02.000Z"
link: "https://ideas.gohighlevel.com/changelog/all-in-one-chat-widget-support-in-customer-replied-trigger"
categories: automations,chat widget,new
url: "https://ideas.gohighlevel.com/changelog/all-in-one-chat-widget-support-in-customer-replied-trigger"
index: 10
---

# 🚀 Summary

You can now trigger workflows when a customer replies through an **All-in-One Chat widget**. This enhancement allows you to:

1.  Select **All-in-One Chat** directly from the Reply Channel dropdown
2.  Filter replies by **Chat Type** (Chat Widget or Live Chat)

-   Select specific **All-in-One Chat** Widgets
-   Build more precise automation based on how customers reply

This makes automation cleaner, more flexible and easier to configure for unified chat setups.

# ✨ What’s New?

**1️⃣ All-in-One Chat added to Reply Channel**

Inside the **Customer Replied** trigger:

Go to: **Reply Channel** from the filter options and you will now see:

-   All In One Chat
-   Chat Widget
-   (Other communication types like Email, Messenger, etc.)

Selecting **All In One Chat** activates additional filtering options specific to unified chat widgets.

2️⃣ **Smart Filter Expansion When “All In One Chat” is Selected**

Once you select **Reply Channel = All In One Chat**, two additional filters appear:

**A**. **Chat Type** is with dropdown options:

-   Chat Widget
-   Live Chat

This allows you to decide whether the reply should come from:

-   A full All-in-One Chat Widget setup
-   Or specifically from Live Chat within that setup

**B**. Contextual Third-Level Filter (Dynamic)

**Depending on what you select under Chat Type is**, the next filter changes dynamically:

If: **Chat Type is = Chat Widget**, you will see:

**Chat Widget is** > dropdown listing only All-in-One chat widgets

If: **Chat Type is** \= Live Chat you will see:

**Live Chat is** \> dropdown listing All-in-One Live Chat configurations

This ensures you only see relevant widget options, no unrelated chat setups appear.

# 🛠️ How to Use It

1.  Go to **Automation > Workflows** and Add **trigger: Customer Replied**
2.  Under **Reply Channel**, select **All In One Chat**

![image](https://canny-assets.io/images/9b8c719e54b9d5fecb70a0384a76ad0b.png)

1.  Choose **Chat Type is**: **Chat Widget or Live Chat**

![image](https://canny-assets.io/images/4833e2b3d37bd2c1f91a9d65ec458533.png)

1.  Select the specific widget under: **Chat Widget is or Live Chat is**

![image](https://canny-assets.io/images/5f5c3c17ea79f1252cbbcd91ab82b286.png)

![image](https://canny-assets.io/images/613d499ddf10c8932c2d58020cafdaf0.png)

1.  Click Save Trigger, add relevant actions and publish your workflow.

Now, the workflow will only run when **a customer replies through the selected All-in-One Chat** configuration.

# 🎯 Why This Matters

-   **Previously**, All-in-One Chat replies were not clearly distinguishable, requiring separate Chat Widget or Live Chat triggers, which made setup confusing.
-   **Now**, All-in-One Chat is a dedicated trigger option with structured, intuitive filters that show only relevant widgets, making automation more precise and easier to manage across channels.

# 📝 Notes

1.  This inclusion of **All-in-One Chat widgets** is applicable only on the customer replied trigger.
2.  Existing Chat Widget triggers continue working as before.
3.  No migration is required for existing workflows but this option will be visible for existing workflows too for user to select if needed.
4.  The system automatically identifies replies correctly based on channel type.