---
title: "🔄 New Workflow Actions: Add &amp; Remove Associated Records from Workflows"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "68dbcafcca76c57e104b9130"
author: "Aayush Singhal"
pubDate: "2025-10-13T07:53:28.000Z"
link: "https://ideas.gohighlevel.com/changelog/new-workflow-actions-add-remove-associated-records-from-workflows"
categories: automations,contacts,custom objects,companies,new
url: "https://ideas.gohighlevel.com/changelog/new-workflow-actions-add-remove-associated-records-from-workflows"
index: 4
---

We’re excited to announce two powerful new workflow actions — now available across **all workflow types: Contact-based, Company-based, and Custom Object-based workflows**.

These actions make automation across **contacts, companies, and custom objects (and their associations)** more flexible than ever:

-   **Add Associated Records to Workflow**
-   **Remove Associated Records from Workflow**

\---

# ✨ What’s New

# ➕ Add Associated Records to Workflow

Automatically enroll associated records into another workflow.

-   **Select an Object** – Choose which type of record (Contact, Company, or Custom Object).
-   **Association Label** – Pick which associations should be included.
-   **Target Workflow** – Choose the workflow the records should be added to.

**Examples**

-   _Car ↔ Dealer (Custom Object)_: When a Car status = “Ready for Sale,” automatically add its Dealers (label: Assigned Dealer) into a Dealer Notification Workflow.
-   _Contact ↔ Contact_: When a Student record triggers, add associated Parent contacts (label: Parent-Child) into a Semester Start Notification Workflow.
-   _Company ↔ Contact_: When a Company is added to the VIP Client Program, add all associated Employees into the VIP Communication Workflow.

# ➖ Remove Associated Records from Workflow

Automatically unenroll associated records from another workflow.

-   **Select an Object** – Choose the type of record to remove (Contact, Company, or Custom Object).
-   **Association Label** – Target which associated records should be removed.
-   **Target Workflow** – Select the workflow the records should be removed from.

**Examples**

-   _Car ↔ Dealer (Custom Object)_: When a Car is marked “Sold,” remove its associated Dealers from the Dealer Notification Workflow so they stop receiving alerts.
-   _Contact ↔ Contact_: When a Student graduates, remove associated Parents (label: Parent-Child) from the Semester Start Notification Workflow to prevent irrelevant updates.
-   _Company ↔ Contact_: When a Company becomes Inactive, remove associated Employees from the Active Clients Communication Workflow.

\---

# 🛠 How It Works

1.  Add either **Add Associated Records to Workflow** or **Remove Associated Records from Workflow** inside your workflow.
2.  Select the **Object Type** and the **Association Label**.
3.  Pick the **Target Workflow**.
4.  Save and publish — records will be automatically added or removed based on associations.

\---

# 🤔 Why It Matters

-   📌 **Cross-Object Automation** – Extend workflows beyond just contacts to companies and custom objects.
-   ⏱ **Efficiency** – Reduce manual updates when associated records change.
-   🔒 **Control** – Remove records immediately when they no longer qualify.

\---

# ✅ Notes & Best Practices

-   Ensure **associations (labels)** are set up in your subaccount before using these actions.
-   At least one matching association must exist for the action to run.
-   Removals are immediate; to re-enroll, use a separate workflow action.
-   Works with **Contacts, Companies, and Custom Objects**.