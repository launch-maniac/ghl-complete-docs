---
title: "Enhanced CSV Exports for Transactions, Orders &amp; Subscriptions"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "6938515dba7800595dfea39e"
author: "Sales &amp; Marketing"
pubDate: "2025-12-10T05:31:00.000Z"
link: "https://ideas.gohighlevel.com/changelog/enhanced-csv-exports-for-transactions-orders-subscriptions"
categories: payments,improved,fixed
url: "https://ideas.gohighlevel.com/changelog/enhanced-csv-exports-for-transactions-orders-subscriptions"
index: 2
---

Businesses can now access significantly more detailed, consistent, and reliable CSV exports across Transactions, Orders, and Subscriptions. These upgrades improve accounting accuracy, tax reporting, reconciliation workflows, and downstream data processing.

# What’s New?

This release introduces a major revamp to all three payment-related CSV exports — ensuring accurate subtotal calculations, precise tax breakdowns, and **product-level data for every transaction record**.

**Key enhancements include:**

-   Clear Tax Visibility
-   New breakdown between: Total Tax Amount (Excluded in prices) → taxes added on top and Total Tax Amount (Included in prices) → taxes built into the product price
-   Fixes inconsistencies between invoice-based and other transactions
-   Improved handling of multiple tax types on a single order

**Rich Product-Level Details**

All exports now include:

-   Line item name, price, quantity, and product ID
-   Per-product subtotal and discount calculation
-   Invoice related discounts in the same column as product discounts (In the Transactions CSV)
-   Multi-row format when multiple products and their corresponding tax entries exist per order/transaction/subscription
-   Enables correct financial allocation

**Improved Payment & Status Clarity**

-   Total Amount Paid vs Total Amount Due to clarify partial payments where Amount Due reflects the original amount due (considers subtotal, discount and taxes) and paid reflects the actual transaction amount (considers the payment towards due along with tips and processing charges)
-   Payment Method included at export level (e.g. Card, PayPal, ACH, Wallet, Manual)
-   Better handling of: Amount dues, Negative values for invoice discounts removed and Redeemed Gift Cards (included in Transactions CSV)

**Correct Handling of 0 vs Blank Values**

Businesses can rely on:

-   0 (zero) shown only when the field exists but the amount is zero
-   Blank shown only when the field is truly not applicable

(Prevents reporting errors in Excel → SUM, COUNT, pivots, etc.)

**Ensures:**

-   Consistent column ordering
-   Stable formatting for BI pipelines or downloadable audit trails

# Why It Matters

This update enables:

-   Easier reconciliation with accounting systems
-   More accurate tax reporting — especially for mixed inclusive/exclusive taxes
-   Product-level revenue breakouts for finance teams

# What’s Next?

We plan to continue improving financial reporting with Export performance improvements for large data sets

# Visuals:

![image](https://canny-assets.io/images/a9bf324952d45297f3ffb06a53e384fd.png)

![image](https://canny-assets.io/images/992d25cc536e486287d1634a8df2083e.png)

![image](https://canny-assets.io/images/21c3b4250bd7a7e3194e4ff493e39b29.png)

![image](https://canny-assets.io/images/d32fa0bfb32ee0c44307c7360ef1b3a0.png)

![image](https://canny-assets.io/images/348fcab00de51d68f088d5f12393e305.png)

![image](https://canny-assets.io/images/ca653691df87772a4fea0ad36f7cc1a3.png)