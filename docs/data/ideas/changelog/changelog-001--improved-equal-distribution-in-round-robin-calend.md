---
title: "🚀 Improved Equal Distribution in Round Robin Calendars"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69ddfc399066d7b0ad06f21b"
author: "Swadha Bhoj"
pubDate: "2026-04-15T02:29:04.000Z"
link: "https://ideas.gohighlevel.com/changelog/improved-equal-distribution-in-round-robin-calendars"
categories: calendar,improved,new
url: "https://ideas.gohighlevel.com/changelog/improved-equal-distribution-in-round-robin-calendars"
index: 1
---

We’ve upgraded the **“Optimize for Equal Distribution”** logic to ensure fairer and more consistent appointment allocation across your team.

Appointments are now distributed intelligently within each month, helping maintain balance and prevent any team member from getting overloaded.

\---

**✅ What’s New**

-   Appointment distribution is now **calculated monthly**, based on the booking date
-   Bookings are assigned to the **least-booked team member** in that month
-   If a team member gets too far ahead, their **availability is temporarily limited**
-   Availability updates dynamically to maintain **fair distribution across the team**
-   Troubleshooting View highlights imbalance with a **“ROUND ROBIN” status**

\---

**🔐 How It Works**

-   This logic applies only when **“Any Available Staff”** is selected
-   If a specific team member is chosen, the booking will go through regardless of distribution

**When a booking is made:**

-   The system checks how many appointments each team member has in that month
-   The **least-booked member is prioritized**
-   If there’s a tie, the system uses the **predefined team order**
-   If the selected member is unavailable, the system moves to the **next eligible member**

\---

**📊 Monthly Distribution Logic**

-   Distribution is evaluated **within the same month as the booking**
-   No team member can be more than **3 appointments ahead** of another
-   If this limit is exceeded, their **availability is temporarily hidden** and it is restored once others catch up

\---

**💡 Example**

If a customer is booking an appointment for **April**, the system only considers bookings in **April**.

-   User A has **3 bookings in April**
-   User B has **0 bookings in April**

User A will be temporarily hidden until User B receives bookings and the gap reduces.

\---

**⚠️ Important Notes**

-   Adding or removing a team member will **reset distribution counts**
-   Switching between **“Optimize for Equal Distribution”** and **“Optimize for Availability”** will also reset counts

\---

**💡 Best Practices**

-   Disable **“Allow Staff Selection”** to maintain true equal distribution
-   Works best when team members have **similar or overlapping availability**

\---

**🎯 Why This Matters**

-   Ensures **fair workload distribution** across your team
-   Reduces confusion from uneven scheduling
-   Improves **predictability and reliability** of Round Robin bookings