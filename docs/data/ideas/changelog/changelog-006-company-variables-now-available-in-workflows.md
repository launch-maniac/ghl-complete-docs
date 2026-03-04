---
title: "Company Variables Now Available in Workflows"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69a6e353df2f0355979165b2"
author: "Ashwin Raghunandan"
pubDate: "2026-03-03T14:47:18.000Z"
link: "https://ideas.gohighlevel.com/changelog/company-variables-now-available-in-workflows"
categories: automations,new
url: "https://ideas.gohighlevel.com/changelog/company-variables-now-available-in-workflows"
index: 6
---

**What’s new?**

You can now use company-based variables inside contact based workflows. In addition to contact fields, you can reference company details like company name, phone, email, website, address, and other company fields. These are available in both the Custom Value picker and If/Else branches.

**How it works**

When building a workflow, company fields now appear alongside contact fields in the variable picker. If a contact is associated with a company, the workflow can dynamically pull that company’s details into messages, notes, and conditions, or use them to drive If/Else logic.

**How to use it**

-   Open a workflow and add or edit an action or If/Else branch.
-   Select the Custom Value picker and choose a Company field.
-   Insert it into your message, note, or branch condition.

**Why we built it**

Many users manage contacts tied to businesses. This update removes the need for workarounds and manual mapping, making it easier to personalize communication and automate decisions based on company-level data.

**Use Cases**

-   Add the Company Name variable (from the contact’s associated company record) into an email body to personalize outreach to a business contact.
-   Create an If/Else branch that checks the Company Address (City) field and routes contacts differently based on their company’s location.

**Additional Notes**

-   Company variables only compute if the contact is associated with a company. If not, the value will be blank.
-   Available in both the Custom Value picker and If/Else conditions.

**Preview**

![image](https://canny-assets.io/images/62c00534ad7756ace227668b7e1633f4.png)

![image](https://canny-assets.io/images/3b8ae6f6467c532bfbe08849c0e14106.png)