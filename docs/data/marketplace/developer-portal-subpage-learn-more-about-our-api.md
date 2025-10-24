---
title: "Learn More About Our API"
category: "marketplace"
type: "developer-portal-subpage"
url: "https://help.gohighlevel.com/support/solutions/articles/48001060529-highlevel-api"
extracted_at: "2025-10-24T12:22:24.924Z"
---

1.  [Home](/support/home)
2.  [Knowledge base](/support/solutions)
3.  [Developer Resources](/support/solutions/48000450445)
4.  [Developer Resources](/support/solutions/folders/48000668553)
5.  [...](#)
    -   [Knowledge base](/support/solutions)
    -   [Developer Resources](/support/solutions/48000450445)
    -   [Developer Resources](/support/solutions/folders/48000668553)
6.  HighLevel API

All Articles

Recent Searches

Clear all

No recent searches

Popular Articles

* * *

Articles

[View all](/support/search/solutions)

* * *

Topics

[View all](/support/search/topics)

* * *

Tickets

[View all](/support/search/tickets)

![no results](/assets/cdn/portal/images/no-results.png)

Sorry! nothing found for  

# HighLevel API

Modified on: Fri, 26 Sep, 2025 at 10:09 AM

**Please Note:** V1 APIs has reached end-of-support. 
Existing connections/integrations will continue to work, however no support will be provided for V1 APIs. 

Want to migrate from V1 to V2? (with a ton of new functionalities and security features)
[](https://help.gohighlevel.com/a/solutions/articles/155000003054?portalId=48000045315)Check out - [Private Integrations](https://help.gohighlevel.com/a/solutions/articles/155000003054?portalId=48000045315)

  

**TABLE OF CONTENTS**

-   [HighLevel API Documentation](#HighLevel-API-Documentation)
-   [How to Get Help or Support for the HighLevel API](#How-to-Get-Help-or-Support-for-the-HighLevel-API)
-   [How to Submit a New API-Related Idea to HighLevel](#How-to-Submit-a-New-API-Related-Idea-to-HighLevel)
-   [Differences Between API Access Across Plan Levels](#Differences-Between-API-Access-Across-Plan-Levels)
-   [What are the Rate Limits for API 1.0 & API 2.0?](#What-are-the-Rate-Limits-for-API-1.0-&-API-2.0?)

## **HighLevel API Documentation**

[**https://marketplace.gohighlevel.com/docs/**](https://marketplace.gohighlevel.com/docs/)

* * *

## **How to Get Help or Support for the HighLevel API**

**At this time, HighLevel Support does NOT provide setup code auditing or developer consultative services on API-Related topics. However, if your setup is complete and correct - yet an error persists, you may have encountered an API Bug we need to fix.   
  
You can report this bug by filling out this form: [](https://speakwith.us/dev-ticket)[https://developers.gohighlevel.com/support](https://developers.gohighlevel.com/support)**

-   **For any questions relating to the HighLevel API, join the developer Slack group to ask our community of talented customers here: [](https://join.slack.com/t/ghl-developer-council/shared_invite/zt-puqvvhdu-lpgk5YaijZfe9XT_b1LEpg)[](https://www.gohighlevel.com/dev-slack)[https://developers.gohighlevel.com/join-dev-community](https://developers.gohighlevel.com/join-dev-community)**

-   **HighLevel Devs host a monthly a Developer Council Call on the second to last Friday, which you can find on the events calendar here: [https://www.gohighlevel.com/events](https://www.gohighlevel.com/events)**
-   ******Check out our** [**Developers Landing Page**](https://developers.gohighlevel.com/), where you can find the Developer Marketplace, Documentation, Slack Channel, and more! -->  [https://developers.gohighlevel.com/](https://developers.gohighlevel.com/)****

## **How to Submit a New API-Related Idea to HighLevel**

**Our API Docs list all available endpoints that are publicly available. If you don’t see an endpoint on either of the API developer sites listed below, we recommend visiting our [GitHub Issues page](https://github.com/GoHighLevel/highlevel-api-docs) to submit your request.  
**

### 

## **Differences Between API Access Across Plan Levels**

**Basic API access is included with our Starter and Unlimited plans, while Advanced API access is available on our Agency Pro plan.** 

**In addition to the future endpoints that will be released in our OAuth 2.0 API (which is only available in our Advanced API access), this tier unlocks the use of Agency API Keys where lower plan levels only access Location API Keys.** 

**![](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/48227025193/original/qVjiLkUumrEo5aDB8Cjz8gbaVT_Y2E8mFg.jpg?1652973498)  
  
**

## **What are the Rate Limits for API 1.0 & API 2.0?**

  

**GHL has implemented rate limits on our public V2 APIs using OAuth to ensure optimal performance and stability. These limits have been adjusted to:**

**Burst limit: A maximum of 100 API requests per 10 seconds for each Marketplace app (i.e., client) per resource (i.e., Location or Company).**

**Daily limit: 200,000 API requests per day for each Marketplace app (i.e., client) per resource (i.e., Location or Company).**

**These new limits contribute to better overall performance and stability of our system.**

**To monitor your limited usage, refer to the following API response headers:**

**'X-RateLimit-Limit-Daily': Your daily limit**

**'X-RateLimit-Daily-Remaining': The remaining number of requests for the day**

**'X-RateLimit-Interval-Milliseconds': The time interval for burst requests**

**'X-RateLimit-Max': The maximum request limit in the specified time interval**

**'X-RateLimit-Remaining': The remaining number of requests in the current time interval**

# **[](https://help.gohighlevel.com/support/solutions/articles/48001205369-how-to-update-your-api-keys#Troubleshooting)**

  

document.querySelectorAll('.portal-attachment-thumbnail-img').forEach(function(img) { img.addEventListener('error', function () { attachment\_error\_image(this); }); }); const attachment\_error\_image = (attachment) => { const parentElement = attachment.parentElement; const defaultIcon = \`<span class="icon-file-empty"></span><span class="fw-attachment-ext">${attachment.dataset.extension}</span>\`; parentElement.innerHTML = defaultIcon; };

Was this article helpful?

No Yes

That’s Great!

Thank you for your feedback

Sorry! We couldn't be helpful

Thank you for your feedback

Your e-mail address \* 

Let us know how can we improve this article! \*

  Need more information

  Difficult to understand

  Inaccurate/irrelevant content

  Missing/broken link

Select at least one of the reasons

Please give your comments

CAPTCHA verification is required.

 Cancel Send

Feedback sent

We appreciate your effort and will try to fix the article

[Print](javascript:print\(\))

## Articles in this Folder

-   [HighLevel API](/support/solutions/articles/48001060529-highlevel-api)
-   [How to Use Webhook.site to Troubleshoot your API Requests](/support/solutions/articles/48001212085-how-to-use-webhook-site-to-troubleshoot-your-api-requests)
-   [How to get started with the Developer's Marketplace](/support/solutions/articles/155000000136-how-to-get-started-with-the-developer-s-marketplace)
-   [Set Up Your App Pricing](/support/solutions/articles/155000001217-set-up-your-app-pricing)
-   [Configure Marketplace App Listing Type](/support/solutions/articles/155000001559-configure-marketplace-app-listing-type)
-   [Marketplace App Distribution Type](/support/solutions/articles/155000002141-marketplace-app-distribution-type)

## Related Articles

-   [How to get started with the Developer's Marketplace](/support/solutions/articles/155000000136-how-to-get-started-with-the-developer-s-marketplace)
-   [How to reconnect broken Marketplace Apps?](/support/solutions/articles/155000003717-how-to-reconnect-broken-marketplace-apps-)
-   [Conversation AI Public API](/support/solutions/articles/155000006639-conversation-ai-public-api)
-   [Public API Endpoints for SaaS Configurator](/support/solutions/articles/155000005768-public-api-endpoints-for-saas-configurator)
-   [How to build a custom payments integration on the platform](/support/solutions/articles/155000002620-how-to-build-a-custom-payments-integration-on-the-platform)
-   [Marketplace Apps - Managing External Connections](/support/solutions/articles/155000004585-marketplace-apps-managing-external-connections)

**X**

0 of 0