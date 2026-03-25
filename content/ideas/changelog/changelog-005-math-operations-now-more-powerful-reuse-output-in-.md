---
title: "Math Operations Now More Powerful: Reuse Output in Later Steps"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69bd5c8c736a4ec37cd9d799"
author: "Ashwin Raghunandan"
pubDate: "2026-03-24T15:02:44.000Z"
link: "https://ideas.gohighlevel.com/changelog/math-operations-now-more-powerful-reuse-output-in-later-steps"
categories: automations,improved
url: "https://ideas.gohighlevel.com/changelog/math-operations-now-more-powerful-reuse-output-in-later-steps"
index: 5
---

**What’s new?**

Math Operation now saves its result as an output custom variable, so you can use that value in the next workflow actions without first writing it to a custom field. You can also reference one Math Operation’s output inside another Math Operation. This makes it much easier to manipulate and use your math outputs.

**How it works**

When a Math Operation runs, its result is stored as that action’s output custom variable. In later steps, you can pick that output from the custom value picker and use it in other actions, including another Math Operation. If you also choose to update a field, the same result is written to that specific record field.

**How to use it**

-   Add a Math Operation step and configure your calculation.
-   Leave Update field empty to use the result as output only, or select a field to save it to the record too.
-   In the next action, choose the Math Operation output from the custom value picker.

**Why we built it**

Before this update, users often had to save a Math Operation result into a custom field or custom value just to use it again later in the workflow. This removes that extra step and gives you one consistent output to reference across following actions.

**Simple Use Case**

-   A fitness workflow calculates a member’s total sessions completed from a form value, then uses that output in a later step to decide which follow-up message to send.

**Additional Notes**

-   Math Operation output can now be reused in subsequent workflow actions. One Math Operation can reference the output of a previous Math Operation.
-   If the selected field type for a referenced Math Operation changes, any dependent Math Operation will be skipped until you review and update its configuration.
-   For older legacy Math Operation actions, users may see the output of the last executed legacy Math Operation until that action is opened and saved again.

**Preview**

![image](https://canny-assets.io/images/c498078b736309ceb232a5956a0f365f.png)

_Math operation in the Custom Value Picker_

![image](https://canny-assets.io/images/35cb89ef8bb2f80cd347ea7b75cb9953.png)

_Ability to reference existing math operation results for further calculations_