---
title: "Integration page UI/UX revamp"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "696f775a4fc4e1663336520b"
author: "Rishabh Gupta"
pubDate: "2026-01-20T12:51:29.000Z"
link: "https://ideas.gohighlevel.com/changelog/integration-page-ui-ux-revamp"
categories: new
url: "https://ideas.gohighlevel.com/changelog/integration-page-ui-ux-revamp"
index: 6
---

# 🚀 Overview

The **Integration Page** is now **faster**, **cleaner**, and **more structured**, delivering a significantly improved user experience.

We’ve modernized the layout with a **consistent card-based design**, removing ad-hoc flexibility to prevent future inconsistencies. Alongside this, several technical improvements eliminate legacy issues and improve long-term scalability.

# 📍How to Enable:

Settings → Labs → Toggle on “Revamped Integration Page”

# ✨ What’s New?

**🆕 New Card Layout**

-   Structured card layout with a single primary CTA
-   Dedicated 3-dot menu for integration-specific options such as: support documentation, form mapping, troubleshooting, disconnect and settings

**⚙️ Core Actions:**

-   **Connect** – Start a new connection
-   **Manage** – Redirection to product pages or manage connected accounts

**⚡Additional Enhancements:**

-   Consistent modal layouts across all integrations
-   Standardized error messages, logos, and descriptions for a cohesive experience
-   Unified Accounts modal, eliminating duplicate Google cards
-   Faster page load times through API performance enhancements
-   Search functionality added for quicker discovery
-   Per-account and per-integration disconnect support with confirmation for safer management
-   Connection-level and integration-level error notifications where applicable
-   Consistent, role-based access control across native integrations
-   Grey-label support document for each integration on the page

**🚀 Technical enhancements:**

-   Reduced unused JavaScript payload by ~50% (from 8.4 MiB → 4.1 MiB)
-   Improved accessibility score from 77 → 90
-   Significantly reduced Workflow app load times
-   Improved Lighthouse performance score by 40%
-   Expanded language translation coverage for frontend
-   Delivered multiple API-level improvements, aligning the experience with native integrations and improving overall reliability
-   Adopted high rise design system across integration, eliminating legacy design systems

**💡 Why It Matters:**

This update removes UI inconsistencies, improves discoverability, and significantly enhances performance. The legacy page also had multiple stability issues and was not scalable in supporting new integrations.

**🔍 Preview:**

Home page:

![HomePAGE](https://canny-assets.io/images/7a8e856b11637acc8d393a538b99e77f.png)

Search on integration page:

![SEARCH](https://canny-assets.io/images/1471458588b8df618677743e29ceedbd.png)

Manage account modal: Google/Slack/Tiktok Messaging

![GoogleAccountModal](https://canny-assets.io/images/57cc9b67aced72613a579524109b8417.png)

Form listing modal:

![FormListing](https://canny-assets.io/images/314fe276b9161860df00ca6d603be833.png)

Form mapping modal:

![FormMapping](https://canny-assets.io/images/f8f8308b48c7ac8ee9151ae14a1c8418.png)