---
title: "Sender Domain Settings in Email Campaigns for LC Users"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69404048d0e1f2db6f8364f4"
author: "Shreya Banerjee"
pubDate: "2025-12-15T17:11:20.000Z"
link: "https://ideas.gohighlevel.com/changelog/sender-domain-settings-in-email-campaigns-for-lc-users"
categories: email builder,email system,new
url: "https://ideas.gohighlevel.com/changelog/sender-domain-settings-in-email-campaigns-for-lc-users"
index: 7
---

We’ve introduced Sender Domain settings inside Email Campaigns for our LC users to give them more control and reduce email delivery failures.

❓ **What was the problem?**

-   Campaigns were failing when the sender email had issues—for example, using a public domain address or when the sender email didn’t match the selected sending domain.
-   Users were also restricted to default settings and couldn’t choose which domain a specific campaign should use.

✨ **What’s new?**

**Shared Domains (Agency or GHL)**

If a campaign is sent using a public or shared email address, we will automatically modify it to make it compliant so the campaign doesn’t fail.

![image](https://canny-assets.io/images/5437c9b4be5bda75dbaf99396643ca0b.png)

**One Dedicated Domain (Default or Agency Dedicated)**

The correct sender domain is automatically pre-selected. The UI now checks the sender email and alerts users if there are issues, along with clear error messages.

![image](https://canny-assets.io/images/ce3b6d59147bbda491239b1353ec7b0b.png)

**Multiple Domain Setup**

Users can now choose a single domain or all domains (based on domain configuration rules) for their campaign.

![image](https://canny-assets.io/images/93388ede12234c43c21a94be4904d24b.png)

A quick-access link in the UI allows users to easily review their domain configuration.

🤝 **Benefits**

-   Fewer email failures due to improved domain compliance
-   More flexibility to select the right domain for each campaign

🔍 **Where to find it?**

Marketing → Emails → Campaigns → Send or Schedule

📌 **Note**:

For non-LC users (e.g., SMTP users), nothing changes—your process stays the same.