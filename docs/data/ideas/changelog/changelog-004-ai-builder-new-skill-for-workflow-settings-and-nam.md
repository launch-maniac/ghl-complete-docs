---
title: "AI Builder: New Skill For Workflow Settings and Naming"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69b3b3f34b107fed230b93b8"
author: "Divyam Bhadoria"
pubDate: "2026-03-13T07:02:26.000Z"
link: "https://ideas.gohighlevel.com/changelog/ai-builder-new-skill-for-workflow-settings-and-naming"
categories: automations,new,improved
url: "https://ideas.gohighlevel.com/changelog/ai-builder-new-skill-for-workflow-settings-and-naming"
index: 4
---

The AI Builder and Assistant can now configure workflow settings and rename workflows directly from a natural language prompt. Previously, settings like re-entry, business hours, and sender details required manual configuration after every AI interaction. Now, a single prompt can produce a fully configured, correctly named, production-ready workflow with zero manual steps.

# What's New

**Workflow Naming via AI**

The AI Builder can now name workflows automatically during generation. If a user provides a name, it's applied directly. If no name is given, the AI generates one based on context. Users can also ask the AI to rename workflows they're currently editing.

**Full Workflow Settings Access**

The AI Builder and Assistant can now read, configure, and update all core workflow settings directly from a prompt:

-   Re entry, Multiple Opportunities, Stop on Response: Enable, disable, or check the current state of these toggles. The agent can also confirm whether a setting is currently enabled for a given workflow.
-   Time Zone and Time Windows: Set or update the workflow time zone. Add, modify, or review business hour time windows (e.g., "Set this workflow to only run Monday to Friday, 10am to 6pm").
-   Sender Details: View or update From Name, From Email, and From Number without opening the settings panel.
-   Mark Conversations as Read: Enable or disable this setting through a simple prompt.

![Screenshot 2026-03-05 at 9](https://canny-assets.io/images/bcc3c6557119f0f99773fdcfe3ea02d5.png)

![Screenshot 2026-03-05 at 10](https://canny-assets.io/images/24b581d2e0e858eb5f457f23b792699c.png)

# Why This Matters

Users can now describe an entire workflow configuration in a single prompt, including the name, settings, and actions and have it all applied instantly.

For example, while editing an existing appointment reminder workflow, a user can say:

"Rename this to Appointment Follow Up v2, update the sender email to , add an SMS follow-up if there's no response within 48 hours, and restrict it to Monday through Friday, 9am to 6pm."

The rename, settings updates, and new action are all handled without navigating through settings tabs.

This brings the AI Builder closer to full control over everything on the Workflows UI, letting users go from a description to a complete, production-ready automation in one step.