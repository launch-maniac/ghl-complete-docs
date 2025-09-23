---
title: "Google connection: Permissions missing warning"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "68d271ecfbcb6db23d4b64a3"
author: "Rishabh Gupta"
pubDate: "2025-09-23T12:17:37.000Z"
link: "https://ideas.gohighlevel.com/changelog/google-connection-permissions-missing-warning"
categories: integrations,new
url: "https://ideas.gohighlevel.com/changelog/google-connection-permissions-missing-warning"
index: 1
---

Google’s latest OAuth flow lets users select only some permissions (scopes) when connecting an app. That flexibility can leave required permissions ungranted, which then breaks features (e.g., connecting Google Business Profile).

This release adds clear in-app warnings and a one-click fix so users can grant missing permissions, if required.

# What’s New

-   Google Oauth from integration page now gives scopes with checkbox, Users can select scopes that they want.**(It is recommended to select all scopes)**
-   Warning badge on the Google integration card whenever required scopes are missing.
-   Details screen listing highlighting which scopes are missing, and which features are affected
-   Reconnect CTA that re-runs Google OAuth so users can grant the additional scopes.

# How to use:

1.  Go to Settings → Integrations → Google.
2.  If you see a warning on your primary Google account, click the message.
3.  Review the missing scopes & affected features, then click Reconnect.
4.  In Google’s consent screen, allow the additional scopes and finish.
5.  Return to the integration page; the warning should be cleared.

# Why it Matters

1.  Reduces “it’s connected but not working” confusion.
2.  Self-serve remediation for common tickets (e.g., “Primary Google connected, GBP is not connecting”).
3.  Fewer support escalations.

# Preview:

Permissions with checkbox in Oauth flow:

![Optional_Scopes_Oauth](https://canny-assets.io/images/3d889af091e8af59db4f5d60490e3e1b.png)

Warning on Google card, if all scopes are not added:

![Warning message](https://canny-assets.io/images/e11ee024cb29663646d84f72ac5eb346.png)

Permission feature mapping to guide which permissions affect which features

![Scope_feature mapping](https://canny-assets.io/images/b537aea66d4793db320bcaaa0c567c2f.png)