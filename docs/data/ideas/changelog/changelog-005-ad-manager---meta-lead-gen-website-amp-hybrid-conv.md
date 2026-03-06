---
title: "Ad Manager - Meta lead gen: Website &amp; hybrid conversion locations"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69aad37ee6a9826fc3d3787f"
author: "Manas Dixit"
pubDate: "2026-03-06T13:27:20.000Z"
link: "https://ideas.gohighlevel.com/changelog/ad-manager-meta-lead-gen-website-hybrid-conversion-locations"
categories: ad manager,new
url: "https://ideas.gohighlevel.com/changelog/ad-manager-meta-lead-gen-website-hybrid-conversion-locations"
index: 5
---

# 👀 **What’s New?**

1.  Added **Conversion Location** selection at Ad Set level:

-   Instant Forms (default)
-   Website
-   Website and Instant Forms

![image](https://canny-assets.io/images/da31ddcdbfeb5883434c1e1d945f404b.png)

1.  Introduced **Dataset (Pixel)** selection (required for Website & Hybrid).
2.  Added **Conversion Event** dropdown for both website and Hybrid(Instant form and Website).
3.  Added **Destination URL field** at Ad level (required for Website & Hybrid).
4.  Hybrid support now allows both **Lead Form + Website URL** in the same ad.

# 👷 **How It Works:**

1.  Select Objective: Lead Generation.
2.  At Ad Set level, choose Conversion Location:

-   **Instant Forms** > Lead form only (existing behaviour).
-   **Website** > Requires Dataset + Conversion Event.

![image](https://canny-assets.io/images/76b83fdeb8a2b3bd2014e2cc0a7f0d99.png)

-   **Website & Instant Forms** > Requires Dataset + Conversion Event.

![image](https://canny-assets.io/images/9ba241bba7b0c8b71d2004a1014f29f9.png)

1.  At Ad level:

-   Website > Destination URL required.

![image](https://canny-assets.io/images/5180417de3a01a76dd1da7fd5ed0f455.png)

-   Instant Forms > Lead Form required.
-   Hybrid > Both required and then Meta optimises which one to show to users as per their optimisation engine rules.

![image](https://canny-assets.io/images/9c54817f5602d2291f42211048ae409d.png)

1.  Publish is blocked if required fields are missing.

# ⭐**Why It Matters:**

-   Brings HL closer to **Meta Ads Manager parity**.
-   Enables **website-based lead optimization** using Pixel events.
-   Supports **hybrid lead collection** (Website + Instant Forms).
-   Improves performance flexibility for advanced advertisers.

# 📝 **Notes:**

1.  Conversion Location cannot be changed after publish (Meta limitation).
2.  Instant Forms remains default for backward compatibility.
3.  Reporting adapts dynamically based on selected conversion location.