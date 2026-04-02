---
title: "Appointment Triggers now supports appointment guests!"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69cd1e2ac705d770b30e702e"
author: "Ashwin Raghunandan"
pubDate: "2026-04-01T14:58:03.000Z"
link: "https://ideas.gohighlevel.com/changelog/appointment-triggers-now-supports-appointment-guests"
categories: automations,calendar,new,improved
url: "https://ideas.gohighlevel.com/changelog/appointment-triggers-now-supports-appointment-guests"
index: 4
---

**What’s new?**

We’ve enhanced both Customer Booked Appointment and Appointment Status workflow triggers to support guest contacts. You can now choose who gets enrolled when an appointment-based trigger fires: Contact only, Contact and Guests, or Guests only.

**How it works**

When the trigger runs, the system checks who is attached to the appointment at that moment and enrolls records based on the option you selected. If you choose Contact and Guests, the workflow runs once for the primary contact and once for each guest. If you choose Guests only, the primary contact is skipped.

**How to use it**

-   Add a Customer Booked Appointment or Appointment Status trigger to your workflow.
-   In 'Who should be enrolled into the workflow?' choose Contact only, Contact and Guests, or Guests only.
-   Save the trigger and publish your workflow.

**Why we built it**

Appointment workflows were previously limited to the primary contact, which made it hard to automate reminders, confirmations, and follow-ups for multi-participant appointments. This update closes that gap and lets you message the right people automatically.

**Additional Notes**

-   Applies to Customer Booked Appointment and Appointment Status triggers.
-   None of your existing trigger configurations will be impacted, default behavior remains Contact only for backward compatibility.
-   For the appointment booked trigger, guests added after the appointment is booked are not enrolled by that earlier trigger event.

**Preview**

![image](https://canny-assets.io/images/0e7640c7036f61b072ca0bf3d63452d5.png)