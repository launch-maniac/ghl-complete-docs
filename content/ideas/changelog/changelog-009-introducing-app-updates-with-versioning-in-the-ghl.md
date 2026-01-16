---
title: "Introducing App Updates with Versioning in the GHL Marketplace"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "6965d123e9a8cb4a321c46ef"
author: "Samiksha Dhabekar"
pubDate: "2026-01-14T04:14:19.000Z"
link: "https://ideas.gohighlevel.com/changelog/introducing-app-updates-with-versioning-in-the-ghl-marketplace"
categories: app marketplace,new
url: "https://ideas.gohighlevel.com/changelog/introducing-app-updates-with-versioning-in-the-ghl-marketplace"
index: 9
---

We are introducing App Updates powered by explicit App Versioning in the HighLevel Marketplace.

This release is a foundational platform improvement that enables developers to ship updates safely and allows existing users to upgrade apps without uninstalling and reinstalling. It replaces the legacy Marketplace behavior and establishes a modern, controlled, and transparent update lifecycle.

# ✅ Important Context: How Updates Worked Before

Previously, the GHL Marketplace did not support in-place app updates. Developers were required to make changes directly on the live app, and while new installations received the latest version, existing installs could not be upgraded. To access updates, users had to uninstall and reinstall the app, which often resulted in:

-   Loss of existing configurations
-   Disruption to active workflows
-   Reluctance to adopt new releases
-   Increased operational risk for agencies and sub-accounts

# 🔮 What’s New

With this release:

-   Apps now support in-place updates
-   Existing installs can be upgraded safely
-   App configuration is preserved during updates
-   Users can see what changed before updating
-   Developers can release updates without impacting live users
-   This brings the Marketplace in line with modern app ecosystems.

# ✨ Key Capabilities

1.  Explicit App Versioning

Apps now consist of multiple explicit versions. Each version maintains its own:

-   Lifecycle status
-   Review record
-   Release notes
-   Change history

Live versions are never edited directly.

1.  Version Lifecycle States

Each app version progresses through defined states:

-   Draft – Editable working copy
-   In Review – Submitted for Marketplace review (public apps)
-   Live – Approved and installable
-   Deprecated – Scheduled for removal
-   Disapproved – Rejected version; editable like Draft

This ensures predictable, auditable releases.

1.  Version Limits & Safety Rules

To prevent unstable or excessive versions:

-   Only one Draft or Disapproved version at a time
-   Maximum of 3 total versions per app
-   (Live + In Review + Deprecated) ≤ 2
-   (Draft + Disapproved + In Review) = 1

These limits protect platform stability and review clarity.

1.  Creating a New Version

-   Developers clone the latest Live version to create a Draft
-   All development occurs without impacting production users
-   A new Draft cannot be created until the current Draft or Disapproved version is resolved.

1.  Publishing an Update: Semantic Versioning

Developers must select a version type:

-   Major (x.0.0) – Breaking or incompatible changes
-   Minor (x.y.0) – Backward-compatible enhancements
-   Patch (x.y.z) – Bug fixes only

1.  Release Notes: Release notes are shown directly to users during the update flow.

# User Experience When an Update Is Available

When a new version goes Live:

-   Installed apps show an Update button
-   Displays version-specific release notes
-   Major updates require explicit user confirmation
-   Minor and Patch updates follow a standard safe flow

This prevents surprise changes and builds trust.

![image](https://canny-assets.io/images/cd44f450ea04b7db9bca9e69ebc27296.png)

![image](https://canny-assets.io/images/fb6af74c7e1b3dc71f3b98d86c57e76b.png)

![image](https://canny-assets.io/images/09094fe8dc24bd566fc2b67f1447140d.png)

![image](https://canny-assets.io/images/1250f49777f19422e2c6eeb1cb73ed22.png)

![image](https://canny-assets.io/images/dcfb9710cf386797deda1b88b159431e.png)

![image](https://canny-assets.io/images/58bfa7daa5c3dd9951322982864967c1.png)

![image](https://canny-assets.io/images/42160a253fd849681ddcf66b1b03d7db.png)

![image](https://canny-assets.io/images/daf2ccb77d30c07ea02029dcfdcf4bca.png)

![image](https://canny-assets.io/images/251ca4890fb1adf0cc6ef5ec6c39fda8.png)

![image](https://canny-assets.io/images/f6c576094e711f5155be64cc5dd0b671.png)

![image](https://canny-assets.io/images/d30de63c3198bd1088b17453a7fae0c5.png)

![image](https://canny-assets.io/images/9f33a878233f239cf18ef2eda5f956cd.png)

# 🧩 Module Update Behavior (Current State)

-   Modules are currently associated with the app, not a specific version
-   Changes to module functionality may become visible immediately after saving

**Guidance**

-   Use Major versions when introducing new module capabilities
-   Use private apps for testing
-   Apply changes to live apps only when changes are production-ready

# 🗑️ Deprecating Old Versions

Live versions can be scheduled for removal with a minimum 3-day notice. On the deprecation date:

-   The version is removed
-   All installs using that version are automatically uninstalled
-   This prevents outdated or unsafe versions from lingering.

# 🔜 What’s Next

We’re actively working on:

-   Version-aware module updates
-   Version-aware pricing updates
-   Safer release controls and clearer update propagation

This release establishes the foundation for these improvements.

**For more details, please check:** [https://marketplace.gohighlevel.com/docs/oauth/HowToUpdateYourAPP/index.html](https://marketplace.gohighlevel.com/docs/oauth/HowToUpdateYourAPP/index.html)

**For questions or concerns:**

📧