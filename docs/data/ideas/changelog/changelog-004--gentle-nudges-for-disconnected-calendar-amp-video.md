---
title: "🔔 Gentle Nudges for Disconnected Calendar &amp; Video Integrations"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "691ad2cbf294dd86dea538d8"
author: "Mayank Jain"
pubDate: "2025-11-17T11:02:07.000Z"
link: "https://ideas.gohighlevel.com/changelog/gentle-nudges-for-disconnected-calendar-video-integrations"
categories: calendar,new,improved
url: "https://ideas.gohighlevel.com/changelog/gentle-nudges-for-disconnected-calendar-video-integrations"
index: 4
---

# 🧭 Overview

When a **calendar or video conferencing integration disconnects**, users may not notice it immediately — leading to missed bookings, missing video conferencing links, or confusion due to broken sync. To help users **stay connected**, we’ve introduced a series of smart **reminders** delivered over time via email, SMS, or push notifications based on user preferences.

These nudges are designed to be helpful, not disruptive — encouraging users to take action while respecting their attention.

# 🚀 What’s New?

**✅ Automated Reminder Cadence**

-   If a calendar or video conferencing tool integration disconnects, users will now receive gentle prompts on **Day 1, Day 3, Day 7, and Day 14**, encouraging them to reconnect. The notification channel(s) (email, SMS, push) depends on the user’s notification settings.

**✅ Frequency Limits**

-   To prevent notification fatigue, **no more than four nudges** will be sent per disconnection event. After Day 14, notifications stop automatically.

**✅ Auto-Cancel on Reconnection**

-   As soon as the user reconnects their integration, all pending reminders are cancelled — no unnecessary follow-ups.

# 🔧 How It Works

-   A user’s calendar (Google, Outlook, iCloud) or video conferencing tool (Zoom, Teams, etc.) becomes disconnected
-   The user receives reminders on Day 1, Day 3, Day 7 and Day 14 via their configured channels.
-   The channels can be configured by navigating to **My Profile > Notifications > Calendar Notifications**

![image](https://canny-assets.io/images/2cb1498531525d0a674db6031ce08be7.png)

-   Once the user reconnects, no more reminders are sent
-   If no reconnection happens, notifications stop after the final reminder

# 🎯 Why This Matters

-   🛠 Helps users **stay connected** without having to check manually
-   ⏰ **Prevents missed bookings** or **missing meeting location links** due to unnoticed disconnects
-   📬 Honors communication preferences by using only opted-in channels
-   🙌 Reduces downstream support reach outs tied to calendar, events sync or video conferencing integration issues

`Note: This feature is currently available for Meetings only. Support for Services will follow shortly.`