---
title: "Mistral AI: Workflow Actions"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69f08d5e6f59efe09dba0eaf"
author: "Product Team"
pubDate: "2026-04-28T10:41:27.000Z"
link: "https://ideas.gohighlevel.com/changelog/mistral-ai-workflow-actions"
categories: automations,new
url: "https://ideas.gohighlevel.com/changelog/mistral-ai-workflow-actions"
index: 9
---

**Overview**

AI is most useful when it sits inside the rest of your automation, not as a separate manual step. The Mistral AI integration lets your workflows call Mistral language models, generate embeddings for semantic search, and analyze images — using your own Mistral API key, with the response available as a workflow variable for any later step.

This means workflows can reply to a customer in their own language, look up the closest match in a knowledge base, or pull structured data out of an uploaded receipt — without sending the contact off to a third-party tool.

**About the Integration**

Mistral AI is a French AI lab that builds open-weight and frontier language models. The integration ships three actions:

-   Create Chat Completion — text generation across the Mistral Large, Medium, Small, Ministral and Magistral families.
-   Create Embeddings — turn any text into a 1024-dimension vector for semantic search, classification or clustering.
-   Analyze Image (Vision) — send an image plus a prompt to a vision-capable Mistral model and receive a structured natural-language answer.

All three actions are premium actions

**Key Benefits of Mistral AI in Workflows**

-   Strong multilingual coverage — Mistral models are trained natively on 40+ languages, with particular strength in European languages. Useful when your contact list is not English-first.
-   Native image understanding — receipts, IDs, charts, screenshots and product photos can be read inside a workflow without integrating a separate OCR vendor.
-   Reasoning models on demand — for multi-step logic problems, choose Magistral and let the model think through the steps before answering.

**How to Set Up Mistral AI**

Before any Mistral AI action can run, the integration has to be connected. The connection allows your workflows to securely call Mistral using your API key.

Connect via the Workflow Builder (recommended)

-   Open Automation → Workflows and pick (or create) a workflow.
-   In the builder, click Add to insert a new step.
-   Open the Apps tab and search for Mistral AI.
-   Select any Mistral AI action — Create Chat Completion, Create Embeddings, or Analyze Image.
-   Click Connect Now on the action card.
-   Paste your Mistral API key. To generate one: log in to [console.mistral.ai](http://console.mistral.ai), open API Keys, click Create new key, give it a recognizable name, then copy the key.
-   Click Save to complete the connection.

Connect via Settings (alternative path)

-   Go to Settings → Integrations.
-   Locate Mistral AI in the integrations list and click Connect.
-   Paste your Mistral API key and click Save.

![image](https://canny-assets.io/images/3b2da4e0fcba1958d9ee1672e08d7308.png)

![image](https://canny-assets.io/images/3e906cc142a1f5e6ff5ca60b1f9706ab.png)

**List of Actions**

-   Create Chat Completion - Send a prompt (and optional system prompt) to a Mistral language model and receive a generated text response.
-   Create Embeddings - Convert input text into a 1024-dimension vector for semantic search, RAG, classification or clustering.
-   Analyze Image (Vision) - Send an image URL and a prompt to a vision-capable Mistral model and receive a natural-language answer about the image.

![image](https://canny-assets.io/images/18d03accc95bc02275594e081239b6ce.png)

**List of Triggers**

There are no Mistral AI triggers in this iteration. Mistral AI is currently action-only — workflows can call Mistral models from any step, but cannot be initiated by a Mistral event. Trigger support may be added in a later release.

**Example: Setting Up an Action (Create Chat Completion)**

This walkthrough creates an automated multilingual reply. The workflow listens for an inbound message, asks Mistral to draft a friendly response in the contact’s language, and sends it back over email.

**Step 1: Add the action**

Open or create a workflow. Click Add to insert a step.

-   In the right panel, switch to the Apps tab.
-   Find Mistral AI and click to expand its actions.
-   Choose Create Chat Completion.

**Step 2: Configure the action**

-   The configuration panel exposes the standard prompt + model fields:
-   Action Name — Give the step a meaningful label such as ‘Draft Multilingual Reply’.
-   System Prompt (optional) — Lock down the AI’s persona. Example: ‘You are a friendly support agent. Always reply in the contact’s preferred language. Keep responses under 80 words.’
-   Prompt (required) — Provide the actual instruction with workflow variables inline. Example: ‘Reply to this message from {{contact.first\_name}}: {{trigger.message\_body}}. Their preferred language is {{contact.language}}.’
-   Model (required) — Select a Mistral model. Use Mistral Large for highest-quality multilingual output; switch to Mistral Small or Ministral for faster, cheaper runs.
-   Optional tuning — Adjust temperature for creativity, max tokens for length, and other supported parameters as exposed by the action.

**Step 3: Save and use the output**

-   Click Save Action. The generated response is exposed as a workflow output variable that can be inserted into a Send Email step, written to a custom field, or evaluated by a conditional.

**Example: Setting Up Analyze Image (Vision)**

This example pulls structured data out of an uploaded receipt and writes it to the contact record.

-   Add a step and select the Analyze Image (Vision) action under Mistral AI.
-   Set the Action Name to ‘Parse Receipt Image’.
-   In the Image URL field, insert the workflow variable that holds the uploaded image — for example, the file URL from a Form Submission step or a Media Storage entry.
-   Set the System Prompt to: ‘You are a receipt parser. Always respond with valid JSON only.’
-   Set the Prompt to: ‘Extract vendor\_name, total\_amount, currency and purchase\_date from this receipt. Return a JSON object with exactly those four keys.’
-   Choose a vision-capable model from the dropdown.
-   Run Test Action with a sample receipt URL to confirm the JSON shape, then save.
-   In subsequent steps, parse the JSON output and use the parsed values to update contact custom fields, create an Opportunity, or send an internal Slack notification.

**Common Use Cases**

1.  Multilingual customer reply generation

Inbound message → Mistral AI Create Chat Completion → Send Email/SMS

-   Trigger when a contact replies in any supported language (native French, English, Spanish, German, Italian, Portuguese, with broad coverage of Dutch, Japanese, Korean, Chinese, Arabic, and more)
-   Use Mistral Large for high-quality, native multilingual responses
-   Maintain brand tone via the System Prompt and personalize using contact variables

2\. Semantic FAQ matching for inbound questions

Inbound email/customer replied → Create Embeddings → Vector lookup → Send templated reply

-   Embed the inbound question and compare against pre-embedded FAQ entries to reply with the closest match
-   Handles paraphrased questions out of the box without brittle keyword matching
-   Use the same embedding action one time as a setup step to index your FAQ content

3\. Receipt and document extraction from images

Inbound webhook -> Image upload (form / inbound MMS) → Analyze Image (Vision) → Update contact Create opportunity

-   Send a receipt, ID, or photo to Pixtral Large with a structured prompt (e.g. "return JSON with vendor, date, total")
-   Auto-populate custom fields without manual data entry
-   Works for damage photos, IDs, business cards, and any image-based intake flow

**Frequently Asked Questions**

Q: What is Mistral AI?

Mistral AI is an AI lab that develops open-weight and frontier language and vision models. The integration gives Workflows direct, governed access to those models using your own API key.

Q: Which Mistral models are available in the model dropdown?

Models from the Mistral Large, Medium, Small, Ministral and Magistral families. The list is refreshed periodically as Mistral retires legacy versions and ships new ones.

Q: Do I need a separate Mistral account?

Yes. Bring your own API key from [console.mistral.ai](http://console.mistral.ai). Inference is billed by Mistral directly based on your account tier and chosen model.

Q: Are Mistral AI actions premium workflow actions?

Yes. All three actions consume premium action credits at the standard automation rate, in addition to Mistral usage charges.

Q: Can I use workflow variables inside prompts?

Yes. Both the System Prompt and the Prompt accept inline variables — contact fields, custom fields, trigger payload values, and the outputs of earlier workflow steps.

Q: Where is the AI-generated response stored?

It is exposed as a workflow output variable on the action. Use it in messages, write it to custom fields, or pass it to downstream steps. It is not persisted as a separate record by default.

Q: What happens if Mistral returns an error or times out?

The action surfaces the error to the workflow execution log, and the workflow continues based on its configured branching. Always test the action before publishing, and add a fallback branch if reliability matters.

Q: Can the generated response be used in SMS or email messages?

Yes. The output variable can be inserted into Send SMS, Send Email, internal notifications, and any other messaging action.

Q: What is the embedding output dimension?

1024 dimensions. The vector is suitable for direct use with major vector databases. Pass it to a webhook action that writes to your vector store.

Q: What image formats does Analyze Image accept?

Standard PNG and JPEG via direct URL, including images stored in Media Storage that are referenced by file URL. Images are processed at native resolution by the underlying vision model.

Q: Are these actions production-ready?

All three actions are released as Beta. They are safe to use in live workflows; expect incremental UX changes — for example, additional models added to the dropdown — as the integration moves out of Beta.