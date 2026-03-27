---
title: "AI Builder coming out of Labs"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69c3f5096ee42f47afd09f5c"
author: "Divyam Bhadoria"
pubDate: "2026-03-25T14:50:47.000Z"
link: "https://ideas.gohighlevel.com/changelog/ai-builder-coming-out-of-labs"
categories: automations,new,improved
url: "https://ideas.gohighlevel.com/changelog/ai-builder-coming-out-of-labs"
index: 9
---

Workflow AI Builder is now enabled by default for all agencies via Labs.

Over the last quarter, we've shipped major performance upgrades, new capabilities, and reliability improvements that make AI Builder significantly faster, smarter, and more production ready.

# What's New:

**Performance**

-   2X Faster Workflow Creation: Average creation time has dropped from 50 to 60 seconds down to under 30 seconds. Simpler prompts complete in as little as 15 seconds.
-   10X Faster Template Generation: Template prompts that previously took up to 90 seconds are now ready in under 6 to 7 seconds.
-   Error Reduction: Substantially fewer generation errors, with targeted fixes around condition generation and node generation failures.
-   Improved Action and Trigger Selection: The AI is now significantly more accurate at picking the right actions and triggers based on your prompt and use case.

**New Capabilities**

-   Post Generation To Do List: After the AI builds your workflow, you now get a clear to do list of items that need your input (credentials, custom values, etc.). Clicking any to do item takes you directly to the relevant action. No more publishing incomplete workflows by accident.
-   Workflow Settings and Naming via AI: The AI Builder can now configure workflow settings and rename your workflow, all from your prompt. Another step toward full AI control over every element in the builder.
-   Conversational Editing for If/Else and Wait Actions: Previously, editing If/Else and Wait conditions after generation required manual changes. Now you can have a multi turn conversation with the AI to edit these. This also lays the groundwork for upcoming standalone If/Else AI and Wait AI, targeting one of the highest contributors of support tickets.
-   Voice Dictation: Describe your workflow using voice input. This makes building workflows faster and more accessible to all segments of users.
-   Smarter Wait Step Generation: New guardrails and expanded scope for wait steps, including validators around specific dates, branching of wait steps, and advanced time window configuration, all achievable in a single prompt.
-   Autosave Support: If autosave is enabled in your workflows, AI Builder now respects it. Your AI generated workflows are saved automatically after generation or editing. Nothing is ever lost.
-   Integration App Support: AI Builder now understands and supports all integration apps (Asana, ClickUp, and more). Tell it to create a task in ClickUp, and it will select and configure the right integration action.
-   Data Linking Across Actions: The output of one action can now be referenced by another action when built through AI. For example, a GPT action's output can be used inside an email body, and the AI Builder handles the mapping for you. This works across a wide variety of supported actions.

![06aeb8629a49dfd4ecfbaed393fec45b](https://canny-assets.io/images/d1929b88575e560bd2df5da918d3ba90.gif)

![3d9b4f74658a63063f279fe778b8e0f9](https://canny-assets.io/images/48832edbd18ef812d5bd8f8c05351384.gif)

# Want to opt out?

Agency level: Head to Labs and disable Workflow AI Builder for your entire agency & all the sublocations.

Location level: Go to Automations > Global Workflow Settings and toggle off AI Builder for that specific location.