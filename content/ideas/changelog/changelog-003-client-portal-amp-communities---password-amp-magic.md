---
title: "Client Portal &amp; Communities - Password &amp; Magic Link updates"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "6996c8fbb65e9aac4e8fd472"
author: "Shivani Gera"
pubDate: "2026-02-19T08:27:41.000Z"
link: "https://ideas.gohighlevel.com/changelog/client-portal-communities-password-magic-link-updates"
categories: communities,client portal,improved,fixed,new
url: "https://ideas.gohighlevel.com/changelog/client-portal-communities-password-magic-link-updates"
index: 3
---

What's New?

• TTL-aware magic links: Replaced permanent community login links (from Agency Dashboard) with short-lived links to prevent unauthorized access.

• Session Expiry: Users can now choose to invalidate all active sessions across devices during any password change or reset.

Fixes:

• User enumeration prevention: Standardised error responses across Login, Forgot Password, and OTP flows to prevent attackers from verifying if an email exists in our system.

• Users V1 update API: Added XSS payload sanitisation and limiting updates to an approved list of fields to prevent unintended modifications.

Next Steps:

• Enforcing Strong Password Policy: Backend enforcement is next. It is already rolled out partially, with the UI enforcing the new policy on all apps.

![image](https://canny-assets.io/images/1be0f564b38e56654d8ef8efea2b0bd0.png)

![image](https://canny-assets.io/images/a867835272c4953dd89982ccef9ef633.png)

![image](https://canny-assets.io/images/2db83b456021c3b81a743fea3b6adfbd.png)

![image](https://canny-assets.io/images/5896a8827a30cbc9fda0aa382fcd5771.png)

![image](https://canny-assets.io/images/8a4ad80984f87a1f42632ce36626a799.png)