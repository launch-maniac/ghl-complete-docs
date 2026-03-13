---
title: "Advanced filters 2.0: New operators and improved consistency"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69b38790ff8f11cb8b09e9a3"
author: "Rakhi Laddar"
pubDate: "2026-03-13T05:04:02.000Z"
link: "https://ideas.gohighlevel.com/changelog/advanced-filters-20-new-operators-and-improved-consistency"
categories: new
url: "https://ideas.gohighlevel.com/changelog/advanced-filters-20-new-operators-and-improved-consistency"
index: 2
---

We have improved the advanced filtering for smartlists to bring better consistency, clarity, and standardization. Earlier, filters had inconsistent operators across different data types and some commonly expected operators were missing. We have standardized how operators behave across date, numeric, and string filters while cleaning up existing logic. This update also resolves a long-standing issue related to future date filtering. The goal is to standardize filter behavior across data types while improving usability and reducing confusion for users.

Added **commonly requested operators** for date filters: **_today, tomorrow, yesterday, this week, this quarter, this year, before date, and after date_** to the existing set of date operators

![1](https://canny-assets.io/images/540c6ead39f863c8b838539715657515.png)

![2](https://canny-assets.io/images/4b1c6c0869f032a758c7f5689780ebda.png)

**Standardized string filter operators** to ensure consistent behavior across fields

![4](https://canny-assets.io/images/68d78573a759ef989c92b2a09f606687.png)

Introduced **_DND as a suffix for SMS, email, call, WhatsApp_**, etc., making communication-related filtering easier.

![5](https://canny-assets.io/images/54637557d639894090b9f986f28c7210.png)

**_Renamed Pipeline filters -> Opportunity_** to better align with terminology commonly used and understood by our customers.

![6](https://canny-assets.io/images/c9c36a82218a819ef0672c088e82daea.png)

Enhanced **_email and WhatsApp status operators_** to better reflect the underlying status criteria and cover additional matching scenarios.

![7](https://canny-assets.io/images/c10a38f8720d0e92f638e082381c8400.png)

Improved **_filtering and operators for Numeric fields_** \- added more options.

![8](https://canny-assets.io/images/b00f9a47e25cc9c5e4aab014bdc5b202.png)

The updates are applicable to tasks, custom objects and companies