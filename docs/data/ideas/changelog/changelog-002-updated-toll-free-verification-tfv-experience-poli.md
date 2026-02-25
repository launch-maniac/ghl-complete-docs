---
title: "Updated Toll-Free Verification (TFV) Experience + Political Campaign Updates"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "699dd61cd2745692057d7b61"
author: "Nikunj Sharma"
pubDate: "2026-02-24T17:20:08.000Z"
link: "https://ideas.gohighlevel.com/changelog/updated-toll-free-verification-tfv-experience-political-campaign-updates"
categories: phone system,new
url: "https://ideas.gohighlevel.com/changelog/updated-toll-free-verification-tfv-experience-political-campaign-updates"
index: 2
---

We’ve rolled out major updates to the Messaging Toll-Free Verification (TFV) flow to align with updated carrier requirements — especially for Political Election Campaign use cases.

This release includes:

-   A redesigned multi-step TFV experience
-   Additional required business fields
-   New Political Campaign requirements
-   Campaign Verify (CV) Auth Token support for political use cases

🔄 1. Redesigned Toll-Free Verification Flow

Step 1: Business & Contact Information

Updated and expanded fields include:

-   Legal Entity Name
-   Business DBA (Doing Business As) name
-   Legal Entity Type (Sole Proprietor, Private Profit, Public Profit, Non-Profit, Government)
-   Business Registration Authority (required if not Sole Proprietor)
-   Business Registration Number (required if not Sole Proprietor)
-   Business Registration Country (required if not Sole Proprietor)
-   Website URL
-   First & Last Name
-   Email
-   Country Code & Phone Number

![Screenshot 2026-02-24 at 9](https://canny-assets.io/images/6624b13919aa95f01e176784b228f4eb.png)

Step 2: Business Location

-   Country Code
-   State
-   Address Line 1
-   City
-   Postal/Zip Code

![Screenshot 2026-02-24 at 9](https://canny-assets.io/images/200525e375c0a84878015cec0e389665.png)

Step 3: Messaging Use Case

-   Enhanced messaging transparency requirements now include:
-   Estimated Monthly Volume
-   Opt-In Type (Mobile / QR Code / Paper Form, etc.)
-   Use Case Categories
-   Opt-In Workflow Image URLs (publicly accessible proof required)
-   Detailed Use Case Description
-   Sample Message Content

Users must certify agreement to the Terms of Service before submission.

![Screenshot 2026-02-24 at 9](https://canny-assets.io/images/9c9e4568625c02348bcdd01923fd7a2c.png)

**🗳️NEW: Political Election Campaign Requirements:**

Carriers have introduced stricter compliance standards for Political Election Campaigns using toll-free numbers.

**Effective February 17, 2026:**

-   All new and existing toll-free verifications under Political Election Campaigns must include a valid Campaign Verify (CV) Auth Token
-   Without a valid token, political use cases may be rejected or restricted.

**Campaign Verify Token Requirement :**

When selecting Use Case Category -Political Election Campaigns, the following additional fields now appear:

-   Campaign Vetting Token (CV Auth Token)
-   Vetting Provider (Campaign Verify)

The CV Auth Token must follow this format: cv|<version>|mno|tfree|<id>|<secret>

**How to Obtain a Campaign Verify Token:**

Political organizations must complete the verification process directly with Campaign Verify before submitting Toll-Free Verification.

Users must follow the official Campaign Verify process outlined here: [https://www.campaignverify.org/our-process](https://www.campaignverify.org/our-process)

**Steps include:**

-   Register your political organization.
-   Complete identity and eligibility verification.
-   Undergo required compliance checks.
-   Receive your CV Auth Token upon approval.
-   Enter the token in the Toll-Free Verification form.

![Screenshot 2026-02-24 at 9](https://canny-assets.io/images/1db3efaff0f28e8f4834166cba07a7b5.png)

**Important Compliance Notes :**

-   Applies to both new and existing toll-free numbers.
-   Required for federal, state, and local political campaigns.
-   Carriers may reject traffic without proper Campaign Verify authentication.
-   Increased messaging throughput and compliance approval depend on valid verification.

**Who Is Impacted?**

-   Agencies or sub-accounts looking to send political messaging
-   Existing toll-free numbers already approved under political use cases

**Benefits of This Update:**

-   Reduced rejection risk
-   Better transparency into use case validation
-   Stronger compliance alignment for political messaging