---
title: "Google Forms – Actions &amp; Triggers in Workflows"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "6972ff232f6e35f8d54d1f6f"
author: "Srikanth Chellaboina"
pubDate: "2026-01-23T04:59:03.000Z"
link: "https://ideas.gohighlevel.com/changelog/google-forms-actions-triggers-in-workflows"
categories: new
url: "https://ideas.gohighlevel.com/changelog/google-forms-actions-triggers-in-workflows"
index: 4
---

**✨ New**

-   Native Google Forms integration added to Workflows
-   Capture Google Form responses and trigger automations directly inside HighLevel.
-   Eliminates the need for third-party tools like Zapier or Pabbly.

**🔔 Triggers (Google Forms → HighLevel) (Coming Soon)**

**New Response (Near Real-Time)** : Fires when a new response is submitted to a selected Google Form.

-   Polls every 5 minutes.
-   Each response triggers the workflow only once.

**Trigger outputs include:**

-   Form ID & Form Name
-   Individual question responses
-   Respondent details
-   Submission timestamp

**⚙️ Actions (HighLevel → Google Forms)**

-   **Find Form by ID** : Locate a Google Form using Form ID (supports dynamic input).
-   **Find Form by Name** : Locate a Google Form using Form Name (dropdown selection).
-   **Find Response by ID** : Retrieve a specific response using Form ID and Response ID.
-   **Find Responses by Form Name** : Retrieve all responses from a selected form.

Supports pagination using next page token.

All actions include Found / Not Found branches for conditional workflows.

![Screenshot 2026-01-23 at 10](https://canny-assets.io/images/1dc5c4267a8bc43c4830c79489c469d0.png)

![Screenshot 2026-01-23 at 10](https://canny-assets.io/images/cd34587122a4e96b1babad4afc6aae3a.png)

**🔁 Key Functionalities**

-   Map Google Form responses directly to CRM fields.
-   Use response data in If/Else conditions.
-   Build workflows based on historical form submissions.

![Screenshot 2026-01-23 at 10](https://canny-assets.io/images/0ed39806d04093e7ad64ba00ad3267f8.png)

![Screenshot 2026-01-23 at 10](https://canny-assets.io/images/c22c0f7ae8e60227819ed5f134d8d915.png)

**🔌 Integration**

-   Connect via Workflows → Triggers / Actions → Google Forms.
-   Authenticate using Google OAuth.
-   Manage connections via Settings → Integrations → Google Forms.

![Screenshot 2026-01-23 at 10](https://canny-assets.io/images/e33cdf9b73c162797ca0cdb5dca1d5c5.png)

**📝 Notes**

-   Triggers are near real-time (5-minute polling).
-   One-way sync only (Workflows read from Google Forms).
-   Google Forms actions are billed at standard automation rates.
-   Fully compatible with conditional logic in workflows.