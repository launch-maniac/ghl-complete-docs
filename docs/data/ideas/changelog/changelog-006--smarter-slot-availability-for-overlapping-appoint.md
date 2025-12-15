---
title: "⏱️ Smarter Slot Availability for Overlapping Appointments"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "693fc2cd818a1528a8e65b90"
author: "Mayank Jain"
pubDate: "2025-12-15T08:19:07.000Z"
link: "https://ideas.gohighlevel.com/changelog/smarter-slot-availability-for-overlapping-appointments"
categories: calendar,new,improved
url: "https://ideas.gohighlevel.com/changelog/smarter-slot-availability-for-overlapping-appointments"
index: 6
---

# 🧭 Overview

We’ve improved how slot availability is calculated for calendars that allow **multiple appointments per slot**.

**Previously**, when a single **appointment overlapped** multiple time slots, the system would **block all affected slots entirely** — even if those slots still had remaining capacity.

**Now**, overlapping appointments only **reduce the availability by 1** in each slot they span. Slots are blocked only when their true capacity limit is reached — not just because they were partially overlapped. This logic now powers both the internal appointment modal and the public booking widget, providing more accurate and flexible scheduling.

# 🚀 What’s New?

**✅ Overlapping Appointments Now Reduce, Not Block, Slot Capacity**

The system checks all slots that an appointment overlaps and reduces their availability by 1 — rather than fully blocking them. The slot remains available for others until the per-slot appointment limit is actually hit.

**✅ Examples:**

1.  **🗓 Manual Booking via In-App Appointment Modal**

-   **Setup**: 15-minute slots, 5 appointments allowed per slot
-   **Custom Appointment**: 10:15 to 10:45 AM (spans 10:00–10:30 AM and 10:30–11:00 AM slots)
-   **Old behavior**: Both slots were fully blocked
-   **New behavior**: Only 1 count is subtracted from each slot, allowing 4 more appointments in both

1.  **🌐 Booking Widget (with 5-minute intervals)**

-   **Setup**: 15-min duration, 5-min slot intervals, 5 appointments per slot
-   **Appointment**: Customer selects 10:00–10:15 AM
-   **Result**: System subtracts only 1 appointment count from all overlapping slots capacity (e.g., 10:05–10:20 AM, 10:10–10:25 AM), leaving slots available until capacity is reached

**✅ Applies Across Calendar Types**

-   Personal Calendars
-   Round Robin Calendars
-   Event Calendars

**✅ Consistent Logic Across Internal & External Booking**

No matter where the booking happens — the system uses the same calculation for :

-   ✅ **Public booking widget appointments**
-   ✅ **Custom time appointments** made via the **in-app** appointment modal

# 🎯 Why This Matters

-   🧠 **Accurate availability representation** — no more blocking slots prematurely
-   📅 **Better availability utilization** — especially helpful for high-traffic calendars
-   🤝 **Consistent behavior across booking channels** (admin + widget)