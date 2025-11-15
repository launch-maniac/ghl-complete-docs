---
title: "Agency&amp;apos;s Reselling Config API"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69118cbe7921b2880b53e83e"
author: "Karthik Anand (HighLevel)"
pubDate: "2025-11-14T03:36:30.000Z"
link: "https://ideas.gohighlevel.com/changelog/agencys-reselling-config-api"
categories: app marketplace,api,new
url: "https://ideas.gohighlevel.com/changelog/agencys-reselling-config-api"
index: 7
---

# 🚀 Overview

We’ve released an API that lets app developers fetch the reselling prices agencies have set (including any markups) so they can display the correct, whitelabeled reselling price to the sub-account on custom pages or checkout flows.

# ✨ What’s new?

-   Get Rebilling Config for App API to retrieve the current agency-set pricing for your app/meters.
-   The response includes reselling rates across all pricing types - Subscriptions, One-time, Usage-based.

# 🔗 [API Documentation for Get Rebilling Config for App](https://marketplace.gohighlevel.com/docs/ghl/marketplace/get-rebilling-config-for-app/index.html)

# 🧑‍💻 How to use it as a Developer

1.  Use the Sub-account token and call the Get Rebilling Config for App endpoint.
2.  Read the returned pricing configuration (agency’s upsold price for the relevant app/meter).
3.  Render those values on your custom pages—e.g., plan cards, paywalls, and checkouts—to show the final, client-facing price.

# 💡 Why this is important

Custom meters and flexible billing are powerful, but pricing must be consistent and whitelabeled. This API prevents accidental exposure of internal rates and ensures the sub-account only sees the final price they intend—across Marketplace and custom experiences built by app developers.