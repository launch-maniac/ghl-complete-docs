---
title: "📋 Extended Conditional Logic Support in Calendar Booking Forms"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69df319a1fcc658d2f3a6c56"
author: "Mayank Jain"
pubDate: "2026-04-15T06:56:03.000Z"
link: "https://ideas.gohighlevel.com/changelog/extended-conditional-logic-support-in-calendar-booking-forms"
categories: calendar,new
url: "https://ideas.gohighlevel.com/changelog/extended-conditional-logic-support-in-calendar-booking-forms"
index: 3
---

# 🧭 Overview

We’ve enhanced how **Form conditional logic** works within Calendar booking flows when using custom forms, bringing more consistency, control, and reliability to your booking experience.

Forms support powerful conditions like **redirect to URL, custom messages, disqualifying leads, and show/hide fields**. With this update, these behaviors now work seamlessly and predictably when forms are used within booking flows.

# ✅ What’s New

-   **Disqualify lead** logic is now enforced **before booking**, preventing unwanted appointments.
-   **Redirects to URL and custom messages** from forms are handled consistently after submission.
-   New confirmation page setting: “**Use custom form rules**” to control the post-booking experience.
-   **Show/Hide field** logic continues to work seamlessly within booking flows.

**Note** : Support for conditional logic in booking flows will be extended to **Services (v2) and Rentals** in an **upcoming** update.

# 🔐 How It Works

**When a user fills out a form during booking:**

-   **Show/Hide field logic dynamically adjusts fields** based on user input.
-   The system evaluates **Disqualify lead conditions first**.

**If the lead is disqualified:**

-   No appointment is created
-   No payment is collected
-   The configured **redirect page or custom message** is shown

**If the booking is successful:**

You can choose the confirmation page experience under **Confirmation Page settings**:

1.  Default
2.  Redirect URL
3.  Use custom form rules

![Screenshot 2026-04-15 at 11](https://canny-assets.io/images/e12aa0334aae6c03cabf990b3eb022e8.png)

**When Use custom form rules is selected:**

-   The form’s redirect or custom message is shown after booking
-   If none is configured, it falls back to the default confirmation page

# 🎯 Why This Matters

-   Ensures **lead qualification happens before scheduling**, avoiding invalid bookings.
-   Delivers a **predictable and consistent booking experience**.
-   Enables more **dynamic and personalized forms** using show/hide logic.
-   Gives greater control over **post-booking confirmation flows**.