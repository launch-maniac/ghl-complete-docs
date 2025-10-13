---
title: "Mark Custom Object Fields as Unique"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "68ecb73f6d897f6592140837"
author: "Pallavi Kothari"
pubDate: "2025-10-13T09:21:25.000Z"
link: "https://ideas.gohighlevel.com/changelog/mark-custom-object-fields-as-unique"
categories: new
url: "https://ideas.gohighlevel.com/changelog/mark-custom-object-fields-as-unique"
index: 1
---

Introducing the Unique Fields capability for Custom Objects. It enforces data integrity, prevents duplication across records, and sets the foundation for advanced de-duplication controls in future releases.

# What’s New?

Added the option to mark a custom field as “Unique” during creation.

![Screenshot 2025-10-13 at 12](https://canny-assets.io/images/7bb95fdbacb5d966f5eadfbee15915d3.png)

Supported field types: Single Line, Multi Line, Number, and Phone.

Option also available when creating new Custom Objects (to mark Primary Display Field as Unique).

![Screenshot 2025-10-13 at 1](https://canny-assets.io/images/ba707b965290ef9604c8a38feb2f6bfd.png)

Enforced limit of 10 unique fields per object (system-wide per subaccount).

Global uniqueness enforcement: no duplicates allowed across the subaccount, regardless of creation source (UI, Workflows, Forms, or APIs).

![Screenshot 2025-10-13 at 12](https://canny-assets.io/images/6a393b7de68303805dd788891d9a151a.png)

![Screenshot 2025-10-13 at 12](https://canny-assets.io/images/dba5969708d3a4deabcda1070ea82ac4.png)

**Irreversible downgrade:** once a field is marked unique, reverting to non-unique is possible but cannot be re-marked unique again.

# How to Use

1.  Navigate to Settings → Custom Fields or while creating a Custom Object.
2.  Choose a supported field type and toggle “Mark Field as Unique.”
3.  Save changes — this setting applies globally across the subaccount.
4.  When creating or importing records, duplicate entries in unique fields will trigger validation errors or warnings.

# Why This Matters

Guarantees data consistency across complex Custom Objects.

Reduces accidental duplication from bulk updates, or automated workflows.