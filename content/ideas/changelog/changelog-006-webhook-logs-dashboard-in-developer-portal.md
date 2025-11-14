---
title: "Webhook Logs Dashboard in Developer Portal"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "6915b7803bf9f1b1857601e9"
author: "Karthik Anand (HighLevel)"
pubDate: "2025-11-13T11:17:09.000Z"
link: "https://ideas.gohighlevel.com/changelog/webhook-logs-dashboard-in-developer-portal"
categories: app marketplace,api,new
url: "https://ideas.gohighlevel.com/changelog/webhook-logs-dashboard-in-developer-portal"
index: 6
---

# 🧭 Overview

We’ve added a Webhook Logs dashboard in the Developer Portal (Insights → Logs) to make debugging webhook issues fast, transparent, and self-serve.

Until now, developers and support teams had to file support tickets just to confirm if HighLevel had delivered a webhook — and we often discovered the issue wasn’t on HighLevel's end.

This new dashboard gives developers full visibility into webhook deliveries, retries, and responses — no support ticket needed.

# ✨ What’s new?

-   New “Webhook Logs” tab under Developer Portal → Insights → Logs
-   Developer experience optimised for debugging: Search by any substring in payload
-   30-day retention window
-   Detail Panel: click any event row to view: Webhook ID, Attempt #, Event Name, Timestamps, Full Payload (with “Copy” button)
-   Timezone-aware views — defaults to Central Time, overrides saved for future sessions

# 💻 How to use it as a Developer

1.  Go to Developer Portal → Insights → Logs → Webhook Logs
2.  Filter or search by webhook ID, event type, or timestamp
3.  Click any row to open the detail panel and inspect payloads, response statuses, and retry history
4.  Copy payloads easily for debugging
5.  Adjust timezone once — it’ll be remembered for future visits

# 💡 Why this is important

This feature puts webhook visibility directly into developers’ hands — reducing support tickets, accelerating issue resolution, and increasing trust in HighLevel’s delivery infrastructure.

# Preview Images:

![image](https://canny-assets.io/images/4cd7efdaef176039dfa8eb4617e4d019.png)

![image](https://canny-assets.io/images/3574af471586c1eb83b76278389f3cf9.png)