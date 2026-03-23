---
title: "Enhanced Meta Pixel Tracking for Funnel and Website Builder!"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69bbea0da14b87d15fb8d986"
author: "Sales &amp; Marketing"
pubDate: "2026-03-19T12:54:23.000Z"
link: "https://ideas.gohighlevel.com/changelog/enhanced-meta-pixel-tracking-for-funnel-and-website-builder"
categories: funnels and websites,e-commerce stores,new,improved
url: "https://ideas.gohighlevel.com/changelog/enhanced-meta-pixel-tracking-for-funnel-and-website-builder"
index: 10
---

# ✨ Overview

We’ve improved Meta Pixel tracking to make event tracking more accurate and reliable across supported pages and checkout experiences.

With this update, standard Meta events can now be tracked through both the browser pixel and Meta’s Conversions API (CAPI). This helps reduce duplicate tracking, improve attribution, and give you more reliable conversion data.

# 🆕 What’s new

-   You can now track key customer actions, including landing on a page (PageView), viewing products or offers (ViewContent), starting checkout (InitiateCheckout), adding payment details (AddPaymentInfo), and completing a purchase (Purchase).
-   Tracking now works through both the Browser Pixel and Server-Side API (CAPI) for more reliable reporting.
-   PageView events are captured on every page load. ViewContent events are now exclusively captured on store product-listing, product-detail, or offer pages.
-   Duplicate events are better controlled on single-page funnel experiences; clicking scroll-to-section or anchor links does not trigger extra PageView or ViewContent events.
-   We now track when a customer starts checkout (InitiateCheckout in 1/2 step order forms and cart checkout buttons) and when they enter payment details (AddPaymentInfo on make payment buttons). The InitiateCheckout event also sends additional comprehensive order details.
-   Purchase events fired on order confirmation, upsell, or thank you elements now send comprehensive order details (value, currency, product/funnel content IDs) and hashed user data (SHA256 hashed email, first name, last name, and phone number). They also use actual order IDs (joined if multiple exist) instead of random event IDs for exact attribution.

# 🎯 Why it matters

-   You get more reliable Meta tracking across more parts of the customer journey
-   Browser and server events now work together more effectively, helping reduce duplicate reporting
-   Better checkout and purchase tracking gives you clearer conversion data for campaign optimization

# 💡 Example use cases

-   Track page visits across all funnels and websites, and specific content views for products and offers.
-   Measure when a customer starts checkout, adds payment details, or completes a purchase.
-   Improve Meta attribution with stronger deduplication and exact order-based event IDs.

# ⚠️ Important

For best results, add events from the Events tab only. Adding events in both the Events tab and through settings (via custom scripts) simultaneously will produce inconsistent tracking results.

![image](https://canny-assets.io/images/339d4ffcdc13633c3b9d23ef6a833c21.png)

![image](https://canny-assets.io/images/8156f138d37a896b6c0d8ed0bc432fae.png)

![image](https://canny-assets.io/images/3fe5fcbd79c3b02c129504e181f48c7c.png)

![image](https://canny-assets.io/images/9d7c5fcd9cb7265598d543d7d7fb51a5.png)

![image](https://canny-assets.io/images/e3627b5504ee6a034803cd36d2ccb449.png)