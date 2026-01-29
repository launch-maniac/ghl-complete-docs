---
title: "AI-Powered A2P Compliance Validation"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "697a4211cc48445984acfa24"
author: "Nikunj Sharma"
pubDate: "2026-01-28T17:52:57.000Z"
link: "https://ideas.gohighlevel.com/changelog/ai-powered-a2p-compliance-validation"
categories: phone system,new
url: "https://ideas.gohighlevel.com/changelog/ai-powered-a2p-compliance-validation"
index: 2
---

**What’s New**

-   We’ve introduced a new AI-powered Compliance Review for A2P campaign submissions to help identify common compliance gaps before your application is submitted to carriers.
-   This review validates your Opt-in Form, Privacy Policy, and Terms of Service links against key CTIA, TCR, and carrier requirements, and provides clear, actionable feedback directly in the submission flow.

**Why This Matters**

-   A significant number of A2P campaigns are rejected due to non-compliant opt-in flows, missing or incomplete Privacy Policies and/or Terms of Service links with Opt-in form errors being the single biggest contributor to A2P rejections.
-   Previously, these issues were often identified only after carrier review, leading to delays, resubmissions, and additional back-and-forth.
-   This update helps surface those issues earlier so you can address them before submission, thereby greatly reducing the likelihood of rejection.

**How It Works**

Right before you review your A2P application in the campaign flow, the Opt-in form URL submitted is automatically scanned and validated to retrieve and further validate the following URLs:

-   Privacy Policy
-   Terms of Service

Following this, Compliance Review modal opens automatically

![Screenshot 2026-01-28 at 10](https://canny-assets.io/images/cb0fa4bb6cb7734c31882abd2e5b9242.png)

**The modal experience:**

-   Count of Compliance Criteria passed by the Opt-in form,Privacy Policy and Terms of Service
-   Line-by-line validation with simple explanations
-   Clear guidance on what needs to be updated(using Tool-tips and soon-to-be released Support Articles)
-   Campaign submission is blocked until the compliance review is complete.

![Screenshot 2026-01-28 at 10](https://canny-assets.io/images/4922ba3640434aab34133d9ea61e8b0f.png)

![Screenshot 2026-01-28 at 10](https://canny-assets.io/images/a678b253e8d8c17ee30fa5f6fbb41335.png)

Once the compliance review is complete, you can then choose address all missing criteria flagged in the compliance review or proceed further with the A2P submission at their own risk.

![Screenshot 2026-01-28 at 10](https://canny-assets.io/images/636e3ca2c8f34c0c2a85dc5182bf61ce.png)

**What We Validate:**

We validate against a dynamic list of carrier mandated compliance criteria, as stated below(and subject to change)

**Opt-in Form :**

-   Business name clearly displayed
-   Explicit consent checkbox (not pre-checked)
-   Privacy Policy and Terms of Service links
-   Opt-out instructions
-   Message frequency, message type, and data rate disclosures
-   Non Mandatory checkboxes

**Privacy Policy:**

-   What data is collected and how it’s used
-   SMS opt-in details
-   Cookie and tracking practices
-   Data security and handling
-   User Rights
-   Clear statement on whether mobile data is shared or sold

**Terms of Service:**

-   Description of the SMS program and use cases
-   Opt-out instructions
-   Message and data rate disclosures
-   Customer support contact information
-   Age restriction (18+)
-   Carrier liability disclaimer
-   Link to Privacy Policy

**Important Note :**

1.  This Compliance review experience is limited to "Website Form" and "Facebook Lead Form" Opt-in Methods and will expand to validate all Opt-in Methods in the future.
2.  You will not be prevented from proceeding with your A2P submission, even if some criteria are flagged as missing in your Opt-in forms, Privacy Policy, or Terms of Service.
3.  While this compliance review is designed to reduce common causes of rejection, the feedback and suggestions provided do not guarantee carrier approval.
4.  Final approval decisions depend on a multitude of additional factors, including but not limited to:

-   Campaign use case and content
-   Carrier-specific policies and enforcement