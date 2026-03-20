---
title: "Product Price &amp; Variant Level Coupons"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69bbaebaa14b87d15f647926"
author: "Sales &amp; Marketing"
pubDate: "2026-03-19T08:16:09.000Z"
link: "https://ideas.gohighlevel.com/changelog/product-price-variant-level-coupons"
categories: payments,new
url: "https://ideas.gohighlevel.com/changelog/product-price-variant-level-coupons"
index: 10
---

# What’s New?

Businesses can now apply coupons at a more granular level by targeting specific prices or variants within a product, instead of being limited to applying coupons to entire products. This enhancement gives greater flexibility in running targeted promotions and ensures coupons are applied exactly where intended.

**Price & Variant Level Targeting**

-   Coupons can now be configured to apply to: Entire products (existing behavior), or Specific prices or variants within a product
-   When selecting products during coupon creation: A nested selection view allows you to choose: All prices/variants under a product, or Individual prices or variants
-   Selecting a product automatically includes: All current and future prices/variants
-   Applies to both: New coupons and Existing coupons (via Edit)
-   This removes the need for workarounds like duplicating products or removing variants for targeted discounts.

**Checkout Behavior Updated**

All supported checkouts now respect the updated coupon logic, including:

-   Funnels
-   Forms
-   Ecommerce / Store
-   Payment Links
-   Calendars

Coupons will only apply if the selected price or variant matches the configuration.

Existing subscriptions and past transactions will continue using the older coupon logic to maintain backward compatibility.

**Workflow Trigger Enhancements**

Workflow triggers have been updated to support this new level of granularity.

For triggers like: Coupon Code Applied and Coupon Code Redeemed - You can now filter based on: Product → Price / Variant (dependent filters)

How this works:

-   You must first select the Product
-   Then, the system dynamically enables: Relevant Prices or Variants under that product
-   These are dependent filters, meaning: Price/Variant filters are only available after product selection
-   This allows workflows such as: Triggering actions only when a specific variant is purchased with a coupon
-   Targeting automation based on pricing tier-level discounts

**Backward Compatibility**

-   Existing coupons continue to work as-is
-   Existing subscriptions / recurring payments and their future transactions are not affected
-   New logic applies only to: Newly created coupons, Updated coupons and Future Orders

# Where Can I Find This?

-   Payments → Coupons → Create / Edit Coupon → Select products → choose prices or variants within them
-   Automation → Workflows → Coupon Triggers (Apply product-based filters, then refine using price/variant filters

# What’s Next?

-   Configuring and generating single use coupons from the UI & Workflow actions.
-   Buy X Get Y coupons

# Visuals

**Configuring Coupons with Product Prices / Variants -**

![Screenshot 2026-03-18 at 7](https://canny-assets.io/images/5279e33d3692492e55b6eb14a1b1faa2.png)

![Screenshot 2026-03-19 at 10](https://canny-assets.io/images/75c88ba447b2e4c17fa09d7478079698.png)

**Checkout Sample-**

![Screenshot 2026-03-18 at 7](https://canny-assets.io/images/08c46733f3cc46850e44397dfebc9379.png)

![Screenshot 2026-03-18 at 7](https://canny-assets.io/images/c246b1d30baf4a4ceb8487928ab0a6db.png)

**Workflow Triggers -**

![Screenshot 2026-03-18 at 7](https://canny-assets.io/images/e4ce3d4faf9b50003ab632ee00165bdb.png)

![Screenshot 2026-03-18 at 7](https://canny-assets.io/images/a733e2776b9864124a27af810236a9c5.png)