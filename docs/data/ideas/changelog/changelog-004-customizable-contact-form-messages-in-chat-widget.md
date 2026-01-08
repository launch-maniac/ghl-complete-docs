---
title: "Customizable Contact Form Messages in Chat Widget"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "695f443617fc49104a52e9e7"
author: "Manas Dixit"
pubDate: "2026-01-08T07:39:09.000Z"
link: "https://ideas.gohighlevel.com/changelog/customizable-contact-form-messages-in-chat-widget"
categories: chat widget,new
url: "https://ideas.gohighlevel.com/changelog/customizable-contact-form-messages-in-chat-widget"
index: 4
---

# 👀 What’s New?

Sub-accounts can now customize the **“Please share your contact details” default prompt** shown in the Chat Widget. This enhancement introduces **two distinct, editable message fields,** giving users full control over how and when contact details are requested, both automatically and agent-triggered.

# 👷 How It Works:

A - On the left panel of the chat widget builder section > under 'Chat Window' tab, Contact Form Intro Message (Auto Prompt) is present:

1.  **Visible only when “Enable Contact Form” is ON**

![image](https://canny-assets.io/images/2bd1b5bbcd1c27c4dba6ff3dac96392a.png)

1.  Shown **automatically before the contact form** appears in the chat widget
2.  Default text: “Please share your contact details”
3.  If left **blank**, the widget skips this message and directly renders the contact form

B - On the left panel of the chat widget builder section > under 'Chat Window' tab, Contact Form System Message (Agent-Triggered) is present:

1.  Always visible in the builder (regardless of toggle state)

![image](https://canny-assets.io/images/594815ec40d502a0a7f6630728c17a0e.png)

1.  Shown **when an agent clicks “Request Contact Details”** from the Conversations panel

![image](https://canny-assets.io/images/cc131d440e50ba5e58002faa9dabc6c8.png)

1.  Default text: “Please share your contact details”
2.  If left **blank**, the widget skips the message and directly shows the contact form

Both applies to:

-   Live Chat
-   All-in-One (Live Chat)

# ⭐ Why It Matters:

-   Eliminates confusion caused by hardcoded system prompts
-   Improves visitor trust and conversion rates
-   Significantly reduces high-severity support tickets
-   Strengthens white-labeling and brand consistency for agencies and SaaS users

# 📝 Notes:

1.  When Enable Contact Form is OFF:

-   Only the Contact Form System Message is used (agent-triggered flow)

1.  When Enable Contact Form is ON:

-   Visitors see the Contact Form Intro Message automatically
-   Agents can still request contact details manually using the system message

1.  Leaving either field blank skips the prompt and shows the form directly