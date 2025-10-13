---
title: "Shipping Charges Based on Product &amp; App Shipping Profiles"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "68ecffe3a3fea5ce3f5099ef"
author: "Sales &amp; Marketing"
pubDate: "2025-10-13T14:30:50.000Z"
link: "https://ideas.gohighlevel.com/changelog/shipping-charges-based-on-product-app-shipping-profiles"
categories: e-commerce stores,new
url: "https://ideas.gohighlevel.com/changelog/shipping-charges-based-on-product-app-shipping-profiles"
index: 2
---

# What’s New?

We’ve introduced Shipping Profiles to give store owners greater flexibility in configuring shipping rates. With this update, merchants can define **custom shipping profiles** for specific products or app integrations, while still maintaining the **general shipping profile** as a fallback.

# Key Features:

1.  **Multiple Shipping Profiles**

-   Create and manage multiple custom shipping profiles.
-   Associate profiles with specific products, product groups, or app integrations.
-   Define zones, rate types (flat, weight-based, price-based, free shipping).

1.  **General Profile as Default**

-   Products not assigned to any custom profile automatically fall into the **General Shipping Profile**.

1.  **Product Assignment Rules**

-   A product can only belong to one custom profile at a time.
-   If a product is reassigned to a new profile, it will automatically override its previous assignment.
-   Removing a product from all custom profiles defaults it back to the General profile.

1.  **App Integrations**

-   Third-party apps can define their own profiles via API.
-   Merchants can override app rates with their own custom profiles.

1.  **Checkout Logic**

-   If multiple products from different profiles are in a cart, the system combines applicable shipping rates.
-   If profiles have different names → The system will display “**Shipping**” as the rate name.
-   If profiles share the same name → The rates are summed and displayed under that shared name.

# How to Use It?

1.  Go to **Payments → Settings → Shipping & Delivery → Custom Profiles**.
2.  Click "**Add Custom**" CTA to create new profile.
3.  Enter profile details (unique profile name, store selection, product assignment, zones, and rates).
4.  Save and test with sample orders to confirm correct rate application.

# Key Points & Edge Cases

-   Products not assigned to a profile always default to the General Profile.
-   A product can only belong to one custom profile. Assigning it to a new one overrides the old.
-   Two custom profiles cannot share the same name.
-   Mixed-cart logic ensures correct calculation and display of combined shipping charges.
-   If a third-party app fails to return rates, the system defaults to a safe fallback rate.

# Images

_General Profile Setup:_

![image](https://canny-assets.io/images/b280c53e3ad2afa52e609bc7a9a65eaa.png)

![image](https://canny-assets.io/images/901dce77d10304527f2815420d180f62.png)

_Custom Profile Setup:_

![image](https://canny-assets.io/images/7f971cebd3e23577bc9649612534b302.png)

_Select Stores for Custom Profile:_

![image](https://canny-assets.io/images/27f631206a034cb78b30f1f8982b474d.png)

_Select Products for Custom Profile:_

![image](https://canny-assets.io/images/dd8e778d0a65b5ffe81077a0d4c3629b.png)

![image](https://canny-assets.io/images/f87744bc7c8ad4e748e54796123e07ba.png)

![image](https://canny-assets.io/images/a94e76044f87a1202fb28cb33eec0d05.png)

_Setup Custom Shipping Zone:_

![image](https://canny-assets.io/images/038cdb57203a43a56593ce5c70f9e61b.png)

![image](https://canny-assets.io/images/4e62e3e251bd9a749cc55dc90d12daa6.png)