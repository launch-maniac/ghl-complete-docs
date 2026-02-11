---
title: "OpenRouter Actions &amp; Triggers"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "6985d6ababf6c72b00e7bbf8"
author: "Srikanth Chellaboina"
pubDate: "2026-02-06T12:02:54.000Z"
link: "https://ideas.gohighlevel.com/changelog/openrouter-actions-triggers"
categories: new
url: "https://ideas.gohighlevel.com/changelog/openrouter-actions-triggers"
index: 9
---

**Overview:**

We’ve launched the OpenRouter app for HighLevel Workflows, enabling user to use AI model responses directly into their automations. With OpenRouter, users can now use multiple models like Perplexity, Claude, OpenAI, Gemini and many more. Upto 300+ of them.

**What’s Improved?**

HighLevel workflows can now invoke AI models via OpenRouter to generate real-time responses from custom prompts. Teams can automate content creation, summarization, and personalized messaging using system-level instructions and workflow variables.

**Key Enhancements**

Actions (HighLevel → OpenRouter)

Use AI-generated outputs directly within your workflows:

**Generate Response** – Send a prompt to a selected OpenRouter AI model and receive a generated response that can be reused across workflow steps.

Action Capabilities

System Prompt (Optional) – Define the AI’s role, tone, or behavior (e.g., support agent, marketer, concise responder).

Prompt (Required) – Provide the main instruction, question, or task, including dynamic workflow variables.

Model Selection (Required) – Choose from multiple AI models based on quality, speed, creativity, and cost.

![open router action](https://canny-assets.io/images/e82aafe2c0cb9d9d6664348f666b3f99.png)

![Screenshot 2026-02-06 at 17](https://canny-assets.io/images/ac60687561336b415ff88e879c7c7194.png)

**Why It Matters**

Usecases like Manual content creation can now be plugged into a workflow. With OpenRouter in Workflows, users can:

Generate personalized emails, SMS, and WhatsApp messages at scale

Create any image or video content with models like veo.

**Test Action**

We have launched openrouter action with test action feature which will allow users to test the action before execution, allowing users to save the schema and use in subsequent actions as custom values.

![Screenshot 2026-02-06 at 17](https://canny-assets.io/images/bc2be64d6abe46783783fc6265bb2e57.png)

**Impact & Use Cases**

1.  AI-Powered Customer Replies

Automatically generate contextual email or SMS responses using contact data and inbound messages.

1.  Message & Form Summarization

Summarize long form submissions or inbound conversations into concise notes or CRM fields.

1.  Personalized Follow-Ups

Create tailored follow-up messages using workflow variables like name, service, or appointment details.

**How to Connect**

1.  In Workflows, add an action and search for OpenRouter.
2.  If not connected, click Connect Now and authenticate using your OpenRouter API key.
3.  Select an AI model, configure your System Prompt and Prompt, then test the action.
4.  Use the generated response in messages, custom fields, conditions, or downstream actions.

![open router](https://canny-assets.io/images/fa65ab6ee8193d97fd85a8f5a9158fda.png)

![Screenshot 2026-02-06 at 17](https://canny-assets.io/images/d905fcd4b499f8f96f75037a89ded02e.png)

**Best Practices**

-   Be specific in your Prompt for higher-quality responses
-   Use the System Prompt to control tone and intent
-   Test multiple models to find the best fit
-   Keep prompts concise and clear
-   Use workflow variables to personalize outputs

**Frequently Asked Questions**

**Can I use workflow variables in the prompt?**

Yes. You can use supported workflow variables in both the Prompt and System Prompt fields to generate personalized AI responses.

**What is the difference between System Prompt and Prompt?**

The System Prompt defines the AI’s role, tone, or behavior, while the Prompt contains the main instruction or question sent to the model.

**Which AI model should I choose?**

Model choice depends on your use case - lighter models work well for simple tasks, while advanced models are better for creative or complex responses.

**Can I store the AI-generated response in a custom field?**

Yes. The generated response can be mapped to custom fields, used in messages, or passed to other workflow actions.

**Do OpenRouter actions cost extra in HighLevel?**

Yes. OpenRouter actions and triggers are premium workflow actions and are billed at standard automation rates, in addition to OpenRouter usage charges.

**Does HighLevel include AI credits for OpenRouter?**

No. HighLevel does not include AI credits for OpenRouter. AI usage is billed by OpenRouter, along with standard automation rates in HighLevel. This will just like any other premium action.