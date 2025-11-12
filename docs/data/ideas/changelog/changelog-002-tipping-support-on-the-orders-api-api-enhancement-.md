---
title: "Tipping support on the Orders API (API enhancement only)"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69140e92c8d5d53fc3ff4e27"
author: "Sales &amp; Marketing"
pubDate: "2025-11-12T04:43:41.000Z"
link: "https://ideas.gohighlevel.com/changelog/tipping-support-on-the-orders-api-api-enhancement-only"
categories: payments,new
url: "https://ideas.gohighlevel.com/changelog/tipping-support-on-the-orders-api-api-enhancement-only"
index: 2
---

# What’s New?

Businesses can now offer customers the option to add tips during checkout, enabling a more flexible and personalized payment experience across various product types.

This is majorly an API enhancement support for any checkout to implement tipping on their end and make it available on their checkouts. More settings related to tipping and an option to view and collect tips directly on the payment element will be available in the next phase.

With this update, tipping is now supported in the Payment Summary API and across all related order and transaction layers — ensuring accurate total calculations and transparent reporting.

**Key Highlights**

Comprehensive API Enhancement:

-   The Payment Summary API now includes tipping as an optional input field.
-   API calculations automatically include the tip in the total payment due.
-   Error handling ensures invalid or missing tip values are flagged gracefully.

UI Enhancements for Transparency:

-   Tip amount (if applicable on the checkout and enabled by the checkout) now appears in Transaction Details, Order Details, and Receipts.
-   For Invoices, existing tipping behavior is retained — if the tip amount is greater than 0, it is displayed; if 0, it remains hidden.

CSV Exports:

-   A new “Tip Amount” column (if applicable on the checkout and enabled by the checkout) is added to Orders CSV, showing the tip paid at order placement.
-   Transactions CSV uses the existing tipping field for consistent reporting.

# Where Can I Find This?

-   Tipping support is available on the Payment Summary API and can be used by any internal team to pass their tip values/amounts to order totals.

# What’s Next?

-   Support for custom tipping configurations (such as predefined tip percentages) on Payment Settings.
-   Collection of tip directly from the payment element.
-   Extended analytics dashboards to visualize tipping adoption and value contribution.
-   Broader UI customization support for how and where tipping is displayed during checkout.

# Visual

![image (38)](https://canny-assets.io/images/e03feef10d73cff2ebe80e12bb3bfe44.png)