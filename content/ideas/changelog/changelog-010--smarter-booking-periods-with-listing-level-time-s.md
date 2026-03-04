---
title: "🗓️ Smarter Booking Periods with Listing-Level Time Selection Control for Rentals"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69a69f9dc2b773fad6ce9ab1"
author: "Mayank Jain"
pubDate: "2026-03-03T12:23:58.000Z"
link: "https://ideas.gohighlevel.com/changelog/smarter-booking-periods-with-listing-level-time-selection-control-for-rentals"
categories: calendar,new,improved
url: "https://ideas.gohighlevel.com/changelog/smarter-booking-periods-with-listing-level-time-selection-control-for-rentals"
index: 10
---

# 🧭 Overview

We’ve significantly improved how **Booking Periods** work in Rentals to make date and time behavior clearer, more intuitive, and easier to configure.

With this update, businesses can now **enable or disable time selection at the listing level**, giving them full control over whether customers choose dates only or dates and times — without relying on hidden global settings.

Previously, booking behavior (such as time selection, duration calculation, and multi-day pricing) could depend on global setting configurations, leading to accidental multi-day charges and confusion around rental start/end times.

Booking logic is now explicit, visible, and self-contained within each listing — so businesses can clearly understand how bookings are calculated and charged.

# 🚀 What’s New

**✅ Clear Booking Period Options**

You now see three clearly defined **Booking Period modes**:

-   **Date & Time Selector**
-   **Date Selector**
-   **Fixed Durations**

Each mode now has visible, predictable behavior — with no hidden dependencies.

**🕒 Date & Time Selector**

-   Always shows date and time pickers in the booking widget
-   Ideal for hourly rentals or bookings where customers must choose a start time and end time
-   Behavior is no longer affected by hidden global settings

![Rentals Booking Period Dropdown](https://canny-assets.io/images/182f3f47327284b61012822298451a58.png)

**📅 Date Selector**

-   Customers select start and end **dates only**
-   **Default Rental Start Time and Rental End Time** are always visible in listing settings
-   Default times (e.g., 3:00 PM start / 11:00 AM end) are clearly applied to calculate duration

This is perfect for vacation rentals, overnight stays, and date-based pricing models.

![Rentals Booking Period Date Selector](https://canny-assets.io/images/033a8f658b40c708cdbd75b301fab1aa.png)

**⏱️ Fixed Durations**

For listings with predefined booking durations:

-   Optionally allow customers to select a start time
-   If time selection is disabled, the default **Rental Start Time** is applied automatically
-   End time is automatically calculated based on the selected duration
-   Monthly bookings roll over to the next calendar month with smart date handling

![Rentals Booking Period Fixed Durations](https://canny-assets.io/images/4dddb1e4af4f16c693179ea0e6a8708e.png)

**🔒 Smart Compatibility Rules**

To prevent unsupported configurations:

-   When **Booking Period = Date Selector**, hourly pricing is disabled
-   When **Booking Unit = Hour**, Date Selector is disabled

This ensures only valid combinations can be selected.

**⚙️ Improved Discoverability**

-   “**Disable Time Selector**” behavior is now surfaced clearly within the listing directly and has been **removed from Global Settings**
-   Booking logic is now self-contained within each listing

**🔄 Migration for Existing Listings**

To ensure a smooth transition:

-   Existing listings were mapped to the correct Booking Period mode
-   Default Rental Start/End times were populated where required

# 🎯 Why This Matters

-   Eliminates accidental multi-day charges
-   Makes rental start/end times visible and predictable
-   Gives businesses control to enable time selection for some listings and disable for others
-   Improves clarity for both admins and customers
-   Increases adoption for vacation rentals and flexible pricing models
-   This update brings Rentals one step closer to being fully intuitive and self-explanatory