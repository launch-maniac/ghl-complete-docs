---
title: "Apify actions and triggers in workflows"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69d8f4417080ec7a0487f78b"
author: "Srikanth Chellaboina"
pubDate: "2026-04-16T14:02:28.000Z"
link: "https://ideas.gohighlevel.com/changelog/apify-actions-and-triggers-in-workflows"
categories: new
url: "https://ideas.gohighlevel.com/changelog/apify-actions-and-triggers-in-workflows"
index: 5
---

We’ve added Apify actions and triggers to Workflows. Users can now run scraping jobs, execute Apify actors, and process external data inside workflows. No need of webhooks or third party apps to connect with Apify.

Key Enhancements

Triggers (Apify → HighLevel):

Finished Actor Run: Fires when an Apify actor completes execution

Finished Task Run: Fires when an Apify task finishes execution

![Screenshot 2026-04-10 at 17](https://canny-assets.io/images/ff15eef60b59f04950c9727922d419e1.png)

Actions (HighLevel → Apify):

Run A Task: Execute predefined Apify tasks

Run An Actor: Run actors with custom inputs

Scrape Single URL: Extract structured data from any webpage

Fetch Dataset Items: Retrieve scraped/output data

Find Last Task Run / Actor Run: Get latest execution details

![Screenshot 2026-04-10 at 17](https://canny-assets.io/images/ad9e7fb7ef4b87033dbb438d65544d34.png)

**Use Cases**

1.  Automatically scrape local businesses from Google Maps via Apify and enroll them into HighLevel outreach campaigns.
2.  Monitor competitor changes with Apify and trigger instant alerts and tasks in HighLevel for quick action.
3.  Data Enrichment: Automatically scrape a lead’s website and enrich contact fields with business details for better segmentation and personalization.

![Screenshot 2026-04-10 at 17](https://canny-assets.io/images/20e8d822a461a195a82ae37a940614e1.png)

![Screenshot 2026-04-10 at 17](https://canny-assets.io/images/a19df01f2a74b17e0b0c0fdfd6636f93.png)

How to Connect

-   In Workflows, search for Apify actions or triggers
-   If your Apify account is already connected, setup fields will appear instantly
-   If not, click Connect Now and authenticate using your API key
-   Alternatively, connect via Settings → Integrations → Apify

Frequently Asked Questions

Q: How do I handle large datasets?

It is best advised to use a wait step after any actor and then with Fetch Dataset Items to process the data with array action.

Q: Are there any charges for using Apify actions and triggers?

Yes, usage is based on Apify pricing (compute and storage) and premium workflow usage, as applicable