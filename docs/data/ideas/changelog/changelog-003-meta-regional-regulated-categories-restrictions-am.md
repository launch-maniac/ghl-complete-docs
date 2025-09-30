---
title: "Meta regional regulated categories restrictions &amp; missing CTA for Lead Gen ads"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "68da912af6d203c6e08cc9f2"
author: "Manas Dixit"
pubDate: "2025-09-29T14:07:35.000Z"
link: "https://ideas.gohighlevel.com/changelog/meta-regional-regulated-categories-restrictions-missing-cta-for-lead-gen-ads"
categories: ad manager,new
url: "https://ideas.gohighlevel.com/changelog/meta-regional-regulated-categories-restrictions-missing-cta-for-lead-gen-ads"
index: 3
---

# 👀 What’s New?

1.  **Regional Regulated Categories Error Messaging**

-   Certain countries like Taiwan, Singapore and Australia have **extra ad restrictions** under Meta’s policies. Running ads here requires special parameters and verified IDs that are not supported in our platform today due to Meta API restrictions.
-   To avoid campaign failures, we now show a **clear error message upfront** whenever a restricted region is selected:

1.  `"Ads targeting {RegionName} fall under Meta's regional regulated categories, which are not supported via our platform."`

2. **In simple terms**: If you pick one of these restricted regions, we’ll immediately inform you that it’s not supported, so you don’t waste time setting up a campaign that Meta will later reject.

-   **Current restricted values:**
-   **AUSTRALIA\_FINSERV** : Financial Service ads targeting Australia
-   **TAIWAN\_UNIVERSAL** : All ads targeting Taiwan
-   **SINGAPORE\_UNIVERSAL** : All ads targeting Singapore
-   When **Worldwide** is selected as the targeted location

1.  **“Get Offer” CTA for Meta Lead Gen Campaigns**

-   The missing **Get Offer** call-to-action is now available for Lead Generation ads.
-   This helps advertisers highlight promotions or discounts directly in the ad, making campaigns more engaging and conversion-friendly.

# 👷 How It Works:

1.  When you try to set up a campaign targeting a restricted region, the system gives you a clear message on our current limitation.
2.  While creating a Lead Generation campaign on Meta, you’ll see **Get Offer** as a new CTA option.

# ⭐ Why it Matters:

-   **For regional rules**: Users avoid hidden failures, we’re transparent about what’s supported vs. not supported.
-   **For Lead Gen ads**: More flexibility in CTAs means more ways to connect with leads and boost sign-ups.