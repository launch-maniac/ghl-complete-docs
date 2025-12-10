---
title: "Call Dispositions: Set and choose Call outcome and trigger workflows"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69205aba34e53ad1f8d4a130"
author: "Ronak Jindal"
pubDate: "2025-12-10T10:50:26.000Z"
link: "https://ideas.gohighlevel.com/changelog/call-dispositions-set-and-choose-call-outcome-and-trigger-workflows"
categories: phone system,new
url: "https://ideas.gohighlevel.com/changelog/call-dispositions-set-and-choose-call-outcome-and-trigger-workflows"
index: 1
---

3rd of December, 2025

# Custom Dispositions: Choose an outcome for your call. Use it to trigger workflows

# What’s new

-   Post-call picker in the Web Dialer: select one disposition (example: Follow Up)

![image](https://canny-assets.io/images/3ca6b5b46c8c66ac40c40dfb0d3e3930.png)

-   Customizable: sub-account admins can create, edit, and delete dispositions.

![Screenshot 2025-12-10 at 2](https://canny-assets.io/images/9ad37f19a0e76a39ef34660611fc5cef.png)

-   Automation-ready: new Workflow filter under "Call Details" called "Custom Disposition" for follow-ups (send messages, tag, re-enqueue in Power Dialer, etc.)

![Screenshot 2025-12-10 at 2](https://canny-assets.io/images/ee9b6749570496c0d5ec1f3c583ebc1c.png)

-   Saved to the record: disposition appears in Call Reporting table and filters (coming soon)

# Why it matters

-   Faster wrap-up -> more calls per day
-   Cleaner automation -> triggers based on what the rep selected, not only system status
-   Better visibility -> consistent outcomes you can query and audit (reporting coming soon)

# How it works

1) Finish a call

2) Pick one disposition

3) Workflows fire immediately when the chosen disposition matches your automation rules

# Setup (admins)

1) Go to Settings -> Phone System -> Voice -> Call Dispositions

2) Review the defaults and add or edit up to 10 dispositions total

3) In Workflows, use the Custom Disposition filter to define follow-ups

# Examples

-   Requested Appointment -> send SMS with booking link and create a follow-up task
-   Follow Up -> re-enqueue into Power Dialer in 2 days
-   Not Interested -> add a "Do not nurture – called" tag and remove from a campaign

# Important for existing automations

-   If you use Call Status to drive workflows, Call Dispositions may work better for you
-   Renaming a disposition: existing workflows continue working with the new name
-   Deleting a disposition: workflows referencing it will stop firing; update them first

PS: Mobile app support for Dispositions is coming in a few weeks