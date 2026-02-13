---
title: "New Email Template Update API 🚀"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "698df817a4e7d8ad7fbf6761"
author: "Shreya Banerjee"
pubDate: "2026-02-12T15:58:57.000Z"
link: "https://ideas.gohighlevel.com/changelog/new-email-template-update-api"
categories: email builder,api,new
url: "https://ideas.gohighlevel.com/changelog/new-email-template-update-api"
index: 5
---

We’ve introduced a new endpoint that allows updating Email Builder templates and email settings in a single API call.

🚀 **What is New?**

**New Endpoint** PATCH `/emails/builder/:templateId`

• Updates existing email builder templates.

• Maintains all existing update behavior.

• Now supports updating: subject fromName fromEmail previewText

**Simplified Editor Payload**

-   Streamlined structure for passing editor type and editor content.
-   Replaced `type, html/dnd,` and `isPlainText` with a simplified structure using `editorType` and `editorContent,` with `isPlainText` now derived automatically.

✅ **Impact**

-   Full control of template content and email settings via API.
-   Faster campaign updates without previous limitations.
-   Simpler, cleaner integration experience.
-   Fully backward compatible.

🔍 **Notes**

-   All template settings fields are optional.
-   fromEmail is validated for proper email format.

📝 **Help Doc:** [https://marketplace.gohighlevel.com/docs/ghl/emails/patch-template/index.html](https://marketplace.gohighlevel.com/docs/ghl/emails/patch-template/index.html)