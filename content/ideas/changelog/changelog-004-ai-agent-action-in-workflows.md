---
title: "AI Agent Action in Workflows"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69d6111a1acf40fdbdb22ec5"
author: "Divyam Bhadoria"
pubDate: "2026-04-08T13:07:08.000Z"
link: "https://ideas.gohighlevel.com/changelog/ai-agent-action-in-workflows"
categories: automations,new
url: "https://ideas.gohighlevel.com/changelog/ai-agent-action-in-workflows"
index: 4
---

# What's New

We've launched the AI Agent action in Workflow AI, bringing autonomous reasoning and decision-making into workflows. Until now, workflows were purely deterministic , every decision had to be pre defined as a branch, every condition anticipated, every field manually mapped.

The AI Agent changes that. Describe your goal, give the agent access to tools, and it plans the sequence, decides the inputs, handles edge cases, and executes all within a single workflow step.

![Screenshot 2026-04-08 at 2](https://canny-assets.io/images/4eeb9bc3af3a9c3f5c1ab682aceee5c1.png)

![Screenshot 2026-04-08 at 2](https://canny-assets.io/images/87b732f3da014c4fc28229805bd89e7f.png)

# Key Capabilities

**Full CRM Awareness**

The agent automatically searches and pulls context from across the entire CRM — contact details, pipeline data, calendar availability, opportunity history, and custom fields. No manual variable mapping or lookup steps required.

**Natural Language Instructions**

Skip rigid dropdowns and field-by-field configuration. Write instructions in your own words — say "assign the deal to Sarah" and the agent resolves "Sarah" to the actual CRM user. Reference "the Enterprise pipeline" and it identifies the correct one. Instructions can range from a quick paragraph to a detailed multi-page playbook.

**Enhance Prompt**

Write rough, casual instructions and click Enhance Prompt. The AI restructures your input into a well-organized prompt with numbered steps, edge case handling, and messaging guidelines — turning a one line note into a production ready prompt.

![GIFRecording2026-04-07at18](https://canny-assets.io/images/d26ca23bf1088dda5615d527e4ad686c.gif)

**Ready to Use Templates**

Pre built agent configurations for the highest-impact use cases, each prefilled with instructions and tools. One click to add the required trigger, one click to apply, and everything remains fully editable:

![Screenshot2026-04-06at20](https://canny-assets.io/images/3543070dfb45f88b10c064fc90e25826.png)

-   **Form Lead Follow Up:** Qualify and book appointments from form submissions
-   **No Show Appointment Recovery:** Send personalized SMS and email with a rebooking link
-   **Facebook Lead Nurturing**: Engage inbound Facebook leads with personalized outreach
-   **Stale Deal Nudge Agent**: Re-engage stale pipeline opportunities with context-aware messaging
-   **Lead Research & Enrichment:** Research and enrich new contacts automatically
-   **Call Transcript Summary & Action Items**: Summarize calls, extract action items, and notify your team
-   **Instagram / Facebook Comment to DM:** Send personalized DMs based on comment context
-   **Lead Pipeline Tracker:** Track leads through stages with periodic check-ins, powered by Conversation Memory
-   **New Appointment: Enrich & Confirm**: Enrich contacts, confirm new appointments, and generate pre-meeting briefs for reps.
-   **Quiz Lead Scoring & Routing**: Segment quiz leads into hot, warm, or cold tiers and notify the team internally.
-   **Task Creation from Won Deals**: Auto-create fulfillment and onboarding tasks in ClickUp or Asana when deals are won.

**Per Tool Control**

Each tool includes a Let AI decide all field values toggle. Turn it on for full autonomy at runtime, or turn it off to lock specific fields (e.g., always assign to a particular user) while letting the agent decide the rest. Individual fields can also be toggled independently, giving you a full spectrum from fully autonomous to semi-autonomous configurations.

![GIFRecording2026-04-06at20](https://canny-assets.io/images/5ceb6d2b384b368564d1726742be0818.gif)

**Conversation Memory**

When enabled, the agent retains a rolling summary of past executions for the same contact. A lead pipeline tracker, for example, remembers what it sent last week and adjusts its messaging accordingly — evolving from a one-shot decision maker into an ongoing relationship manager.

**Structured Output**

The agent can return results as Text or JSON with a user-defined schema (String, Number, Boolean properties). Output feeds directly into If/Else branches, field updates, or downstream workflow steps. For example, the agent can qualify a lead and return {"qualified": true, "score": 85} for the workflow to branch on.

**Full Execution Transparency**

Every run produces a detailed trace in Execution Logs showing every LLM reasoning step, every tool call (with exact inputs and outputs), timestamps, token counts, and success/failure status. Toggle between table view and raw JSON to make prompt refinement a tight feedback loop.

![_Umdeshfp6Wt-nH6PHIhYGP_Ws4HJVrE7w](https://canny-assets.io/images/34e95769798566b13f02d7c837f8e331.png)

**Multiple Model Options**

Choose between GPT-5.2 (Low/Medium/High thinking), GPT-5.1 (Low/Medium/High thinking), and GPT-5 Nano (Fastest). GPT-5.2 Low thinking is the recommended default for most use cases.

# How to Use

1.  Open your workflow and click + Add Action.
2.  Search for "Agent" or scroll to the Workflow AI category.
3.  Select AI Agent.
4.  Choose a template or select Build Your Own to start from scratch.
5.  Write your instructions describing what the agent should do.
6.  Add the tools the agent can use (up to 10 per agent).
7.  Configure advanced options such as Conversation Memory and Output Format as needed.
8.  Save and publish.

![GIFRecording2026-04-06at19](https://canny-assets.io/images/9c9b76357431027c918b9e29b589f0fa.gif)

# Pricing

AI Agent pricing is transparent and usage-based. Each execution costs:

-   LLM tokens: Total tokens consumed across all the agent's reasoning and tool calls, multiplied by the rate of the selected model. Lighter models like GPT-5 Nano cost less per token, higher-reasoning models like GPT-5.2 High thinking cost more. This falls under External AI models pricing rate.
-   Premium tool executions: If the agent uses premium app integrations like ClickUp, Airtable, or Notion, those are charged at the same per-execution rate they already have as standalone workflow actions.

Standard CRM tools (Send SMS, Update Contact, Add Tag, etc.) don't add any premium charge.

# Why This Matters

The AI Agent transforms Workflows from a deterministic automation platform into one where a true CRM agent can evaluate context, make judgment calls, and execute actions on its own — all within the workflow system you already know. Instead of mapping every branch and condition by hand, you describe the outcome you want and let the agent handle the reasoning, freeing you to build smarter automations in a fraction of the time.