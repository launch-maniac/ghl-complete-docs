---
title: "🗓️ Control Default Personal Calendar Creation"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69b00d7c570a8816b552fbe4"
author: "Mayank Jain"
pubDate: "2026-03-10T12:32:20.000Z"
link: "https://ideas.gohighlevel.com/changelog/control-default-personal-calendar-creation"
categories: calendar,new,improved
url: "https://ideas.gohighlevel.com/changelog/control-default-personal-calendar-creation"
index: 4
---

# 🧭 Overview

We’ve introduced more flexibility for agencies when adding new users to subaccounts.

Previously, a personal calendar was automatically created whenever a new user was added to a subaccount. While helpful for simple setups and easier onboarding, some agencies using snapshots, predefined calendar structures, or adding team members who don’t require personal calendars needed additional control over this behavior.

**Agencies can now choose whether personal calendars are created automatically**.

# ✅ What’s New

-   Agencies can now control automatic personal calendar creation for new users.
-   The behavior is governed by the **Preloaded Example Data** setting at the agency level.
-   When disabled, new users will no longer receive an automatically created personal calendar.
-   Manual calendar creation remains fully supported.

# 🔐 How It Works

-   If **Preloaded Example Data is enabled**, **personal calendars will continue to be created** automatically for newly added users (default behavior).
-   If **Preloaded Example Data is disabled**, **no personal calendar will be created** when adding new users.
-   This setting applies only to users added after the flag is changed.
-   Existing calendars remain unaffected.

# 🛠 How to Use

-   Go to **Agency View**
-   Navigate to **Settings**
-   Go to **Company**
-   Open the **Advanced Settings** tab
-   Toggle **Preloaded Example Data** ON or OFF based on your preference

![Screenshot 2026-03-10 at 5](https://canny-assets.io/images/88c04cddb4e8c2276f558924989624b9.png)

# 🎯 Why This Matters

-   Gives agencies greater control over how new users are set up.
-   Supports teams using snapshots and structured calendar configurations.
-   Helps maintain clean, intentional subaccount setups.
-   Preserves the existing automatic calendar creation experience for agencies that prefer it.