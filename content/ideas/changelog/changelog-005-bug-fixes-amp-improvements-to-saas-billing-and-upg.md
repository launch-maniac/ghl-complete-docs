---
title: "Bug Fixes &amp; Improvements to SaaS Billing and Upgrades"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69662e05926a27b86307f412"
author: "Aryan Goyal"
pubDate: "2026-01-13T11:41:56.000Z"
link: "https://ideas.gohighlevel.com/changelog/bug-fixes-improvements-to-saas-billing-and-upgrades"
categories: saas mode,fixed,improved
url: "https://ideas.gohighlevel.com/changelog/bug-fixes-improvements-to-saas-billing-and-upgrades"
index: 5
---

We’ve rolled out a few important fixes to improve reliability and accuracy across SaaS billing and subscription management.

✅ **What’s Fixed**

**BGN Currency Removal (Compliance Update)**

-   Effective January 1, 2026, Bulgaria transitioned from Bulgarian Lev (BGN) to Euro (EUR). As a result;
-   All SaaS prices created in BGN have been discontinued.
-   Subscriptions associated with BGN prices were effectively canceled.
-   Creation of new prices or SaaS plan categories in BGN is now blocked.

This ensures compliance with updated currency regulations.

**Incorrect Amount Shown for Special Prices During Reactivation**

-   Issue occurred for special prices (custom prices created outside SaaS Configurator).
-   When a subscription with a special price went into cancelled state and the sub-account attempted reactivation, the payment modal showed an incorrect amount.
-   Fix: The reactivation flow now correctly displays the actual special price amount.

**Fixed Upgrade Permission for SaaS V2 Sub-Accounts**

-   Agencies can control whether sub-accounts are allowed to upgrade their SaaS plans via a setting in SaaS Configurator (default: OFF).
-   A bug prevented this setting from propagating to sub-accounts on SaaS V2. Even when agencies enabled upgrades, sub-accounts still could not upgrade.
-   Fix: The setting now correctly flows to sub-accounts. Upgrade functionality works as expected when enabled by the agency.

💡 **Why This Matters**

These fixes ensure:

-   Accurate billing during reactivation
-   Reliable upgrade paths for growing SaaS businesses
-   Alignment with updated currency regulations

No action required on your end - everything is already live and working as expected.