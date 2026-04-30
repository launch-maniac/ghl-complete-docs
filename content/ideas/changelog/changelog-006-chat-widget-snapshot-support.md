---
title: "Chat Widget – Snapshot Support"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69f2064e5bf0a1aca48b0fc7"
author: "Manas Dixit"
pubDate: "2026-04-29T13:31:29.000Z"
link: "https://ideas.gohighlevel.com/changelog/chat-widget-snapshot-support"
categories: snapshot,chat widget,new
url: "https://ideas.gohighlevel.com/changelog/chat-widget-snapshot-support"
index: 6
---

# 🚀 Summary:

Chat Widget configurations can now be included in Snapshots, allowing agencies to replicate widget setups across sub-accounts with proper handling of account-specific dependencies like WhatsApp numbers, Voice AI agents, and integrations.

# ✨ What's New?

1.  Chat Widget support in Snapshots

-   Replicate chat widgets (Email/SMS, Live Chat, WhatsApp, Facebook, Instagram, Voice AI, All-in-One) across sub-accounts.

1.  Smart dependency handling

-   WhatsApp numbers: mapped if available, else left empty
-   Voice AI agents: auto-selected if available in target account
-   Media assets: migrated dynamically
-   Location-level fields (locale, country, agency details): auto-mapped

1.  Graceful fallback behaviour

-   Widgets are created even if dependencies (WhatsApp, FB/IG, Voice AI) are missing
-   Fallback state shown (e.g., widget unavailable)
-   Save / Get Code actions disabled when required setup is incomplete
-   Helper tooltips guide users

1.  Controlled custom field behaviour

-   Custom fields are not auto-created during snapshot load
-   Users must explicitly include them to avoid conflicts

# 🛠 How to Use?

1.  Go to Account Snapshots (Agency View)
2.  Create a snapshot from a source sub-account
3.  Include Chat Widget in snapshot assets

![image](https://canny-assets.io/images/b9d05e3b893fc92b517455b3ea82db13.png)

1.  Load the snapshot into a target sub-account

![image](https://canny-assets.io/images/9f7be82d95869fdd8ef816ea84152150.png)

1.  Open Sites > Chat Widgets in the target sub-account, you'll see the source sub-account widgets present
2.  Complete any missing integrations (if required) and use it on any digital property

# 🌟 Why This Feature?

-   Reduces onboarding time for agencies.
-   Enables reuse of chat widget configurations across accounts.
-   Maintains consistency in communication setup.
-   Handles account-specific dependencies safely without breaking setup.

# 📝 Notes:

1.  Widgets may require manual setup if dependencies are missing.
2.  WhatsApp numbers, FB/IG connections, and Voice AI agents are account-specific.
3.  Snapshot load does not guarantee publish-ready state without required integrations.