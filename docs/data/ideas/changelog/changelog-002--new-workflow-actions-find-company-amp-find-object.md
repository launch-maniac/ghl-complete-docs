---
title: "🔍 New Workflow Actions: Find Company &amp; Find Object Record"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "68dbb94ee4ef975090794300"
author: "Aayush Singhal"
pubDate: "2025-10-13T07:53:50.000Z"
link: "https://ideas.gohighlevel.com/changelog/new-workflow-actions-find-company-find-object-record"
categories: automations,custom objects,companies,new
url: "https://ideas.gohighlevel.com/changelog/new-workflow-actions-find-company-find-object-record"
index: 2
---

We’re excited to expand our **Find Record** capabilities across all workflow types!

-   **Find Contact** already exists.
-   **Find Company** is now available in company-based workflows.
-   **Find Object Record** is now available in custom object-based workflows.

These actions allow you to automatically look up and use existing records inside your CRM based on incoming webhook data. Whether you’re matching a **Contact**, a **Company**, or a **Custom Object**, you can now update, associate, or branch workflow logic without manual searching.

# ✨ What’s New

You can now:

-   **Search Existing Records** – Match on fields like Record ID, External ID, Company Domain, VIN, etc
-   **Tie-Break Smartly** – Choose between the **Earliest** or **Latest** record if multiple matches exist.
-   **Flexible Filters** – Add multiple conditions with AND logic for precise control.
-   **Outcome Branching** – Handle both _Record Found_ and _Record Not Found_ scenarios directly in workflows.
-   **Seamless Skipping** – If the workflow already starts with the same object (e.g., “Car Created” or “Company Created”), this step is skipped automatically.

# 🛠 How It Works

1.  Add the **Find Company** or **Find Object Record** action in a workflow.
2.  Ensure your workflow starts with an **Inbound Webhook** trigger — the payload fields power your filters (e.g., `{{inboundWebhookRequest.body.petname}}`, `{{inboundWebhookRequest.body.domain}}`).
3.  Configure your filters:

-   **Left side** = object field to match.
-   **Right side** = webhook payload field or fixed value.

1.  Pick your **Filter On** setting: **Earliest** vs **Latest** record.
2.  Define **Outcomes**: branch the flow if a record is found or not.

# 💡 Why It Matters

-   📌 **Accuracy** – Match records using unique identifiers like External ID or Domain for deterministic results.
-   🤝 **Flexibility** – Apply multiple filters to handle complex use cases.
-   ⏱ **Efficiency** – Automate record lookups instead of manual checks.
-   🚀 **Scalability** – Build workflows that adapt dynamically to real-world webhook payloads.