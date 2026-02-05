---
title: "🌍 Localized Email Notifications for Sub-Accounts"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "698075f53e3193b01b4c85df"
author: "Karthik"
pubDate: "2026-02-02T10:30:55.000Z"
link: "https://ideas.gohighlevel.com/changelog/localized-email-notifications-for-sub-accounts"
categories: email system,improved
url: "https://ideas.gohighlevel.com/changelog/localized-email-notifications-for-sub-accounts"
index: 7
---

**Overview**

We’ve added internationalization (i18n) support for notification emails sent to sub-accounts. Emails are now delivered in the sub-account’s preferred platform language, creating a more localized and consistent experience.

**What’s New**

-   Notification emails now respect the **platform language preference** set at the **sub-account level**
-   Language is resolved **at send time**, ensuring the correct locale is applied
-   **English** is used as the default when: No language preference is set, or A translation is unavailable

**Notes**

-   This update currently applies **only to CSV import analysis emails** sent to sub-accounts
-   Emails sent to **agency users** will continue to be delivered in **English**