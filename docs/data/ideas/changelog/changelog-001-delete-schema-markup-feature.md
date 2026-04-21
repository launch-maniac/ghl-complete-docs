---
title: "Delete Schema Markup Feature"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69e7953a2e251f0044940731"
author: "Sales &amp; Marketing"
pubDate: "2026-04-21T15:31:30.000Z"
link: "https://ideas.gohighlevel.com/changelog/delete-schema-markup-feature"
categories: new
url: "https://ideas.gohighlevel.com/changelog/delete-schema-markup-feature"
index: 1
---

**What's New?**

You can now delete schema markup directly from any page — individual schemas or all schemas at once — across the Website & Funnel Builder. This enhancement closes a critical gap in the Schema Markup Generator, giving users a straightforward way to remove outdated, incorrect, or unwanted schema markup through three flexible methods: Form View, JSON View, and AI chat.

**Why This Enhancement?**

In the initial release of the Schema Markup Generator, there was no straightforward way to remove schema markup from a page once it had been added. If a user accidentally added schema, added the wrong type, or simply wanted to start fresh, they had no clean path to clear it out. This created friction for users managing evolving SEO strategies and left pages with stale or irrelevant structured data.

This enhancement eliminates that pain point by providing clear, confirmation-backed deletion flows across every surface where schema is managed — including conversational removal through AI.

**Key Highlights**

-   Three Ways to Delete — Delete via Form View, JSON View, or AI chat, whichever fits the user's workflow
-   Individual or Bulk Deletion — Remove a single schema or clear all schemas from a page in one action
-   AI-Powered Deletion — Use Schema Markup AI, Ask AI or Funnel AI to remove schemas conversationally
-   Confirmation Safeguard — Destructive actions trigger a "This action cannot be undone" dialog before deletion is committed
-   Recovery via Version History — Accidentally deleted schema can be recovered by restoring a previous page version and copying the JSON script back
-   Works for Websites & Funnels — Applies to all page types in the Website Builder and Funnel Builder

**How to Use**

Access: Website/Funnel Builder → Edit Page → SEO & AI search optimization (left panel) → Schema Markup

**Method 1 — Delete from Form View**

1.  Open the Add/Edit Schema pop-up and stay in Form View
2.  In the Schemas list (left panel), click the three-dot menu next to the schema you want to remove
3.  Select Delete to remove that specific schema
4.  To delete all schemas, remove each one from the list, then click Validate & Save
5.  Confirm on the "Delete all schema markup?" prompt → Click Yes, Delete

![Screenshot 2026-04-21 at 3](https://canny-assets.io/images/e9d39479a0e4ceb954102425cf5fc989.png)

![Screenshot 2026-04-21 at 3](https://canny-assets.io/images/9b7a957e03ca959ef4c6b1a8ac6afc63.png)

**Method 2 — Delete from JSON View**

1.  Open the Add/Edit Schema pop-up and switch to JSON View
2.  Clear the JSON-LD code (remove all schema markup code from the editor)
3.  Click Validate & Save
4.  Confirm on the "Delete all schema markup?" prompt → Click Yes, Delete

![Screenshot 2026-04-21 at 8](https://canny-assets.io/images/74d7f161da37bcc9716a9538b8915398.png)

![Screenshot 2026-04-21 at 3](https://canny-assets.io/images/0316225f21fff7072aca02545c2a8502.png)

**Method 3 — Delete via AI Chat**

1.  Open Funnel AI, Ask AI or Schema Markup AI
2.  Send a prompt such as "remove all schema markup from this page" or "delete the Organization schema"
3.  AI reviews existing schema, evaluates the request, and removes the targeted schema(s)
4.  Confirmation appears in-chat with a link to View schema markup

![Screenshot 2026-04-21 at 4](https://canny-assets.io/images/ff6532cca116c111dc986766d7ff6798.png)

**Recovery Option — Restore Deleted Schema via Version History**

1.  If schema markup is deleted by mistake, it can be recovered using the page's version history:
2.  Open the page in the Website/Funnel Builder
3.  Access Version History from the builder toolbar
4.  Restore a previous version of the page that contained the schema markup
5.  Open the Schema Markup editor → switch to JSON View → copy the JSON-LD script
6.  Return to the latest version of the page → open Schema Markup → JSON View → paste the copied script
7.  Click Validate & Save and publish the page

**Good to Know**

1.  Deletion is page-specific — it only affects the page you're editing
2.  Deletion is not truly irreversible — schema can be recovered via version history by restoring a previous version and copying the JSON script forward (see Recovery Option above)
3.  Changes reflect in preview immediately after saving, but go live only on publish