---
title: "How to reconnect broken Marketplace Apps?
                    
                    
                      

   Modified on Sat, 17 May at  6:35 AM"
category: "marketplace"
type: "developer-resources-subpage"
url: "https://help.gohighlevel.com/support/solutions/articles/155000003717-how-to-reconnect-broken-marketplace-apps-"
extracted_at: "2025-09-20T16:17:47.557Z"
---

1.  [Home](/support/home)
2.  [Knowledge base](/support/solutions)
3.  [Developer Resources](/support/solutions/48000450445)
4.  [Developer Resources](/support/solutions/folders/48000668553)
5.  [...](#)
    -   [Knowledge base](/support/solutions)
    -   [Developer Resources](/support/solutions/48000450445)
    -   [Developer Resources](/support/solutions/folders/48000668553)
6.  How to reconnect broken Marketplace Apps?

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

# How to reconnect broken Marketplace Apps?

Modified on: Sat, 17 May, 2025 at 6:35 AM

  

In case developers lose access to access token or refresh token due to any reason - either due to an incident from HighLevel or due to an error on the developer's end - we have provided a solution. 

  

You can now use the **Reconnect API** to get back the authorisation code that can be used in [Get Access Token API](https://highlevel.stoplight.io/docs/integrations/00d0c0ecaa369-get-access-token) (OAuth - Authorisation grant flow) to get back a new set of access and refresh tokens. 

This enables you to reinstate the connection without having to trouble your users.

  
For Sub-Account App connections:

```javascript
curl --location 'https://services.leadconnectorhq.com/oauth/reconnect' \
--header 'Content-Type: application/json' \
--data '{
    "clientKey": "<client_id>",
    "clientSecret": "<client_secret>",
    "locationId": "<locationID where the app was installed>"
}'
```

JavaScript

  

For Agency connections:

```javascript
curl --location 'https://services.leadconnectorhq.com/oauth/reconnect' \
--header 'Content-Type: application/json' \
--data '{
    "clientKey": "<client_id>",
    "clientSecret": "<client_secret>",
    "companyId": "<company where the app was installed>"
}'
```

JavaScript

  

Response of the API:

```javascript
{
    "authorizationCode": "<auth_code>",
    "expiresAt": "2024-10-08T13:35:43.887Z",
    "traceId": "trace-ID-ref"
}
```

JavaScript

  

  

**IMPORTANT**: If you are concerned on how do I receive Official Support for HighLevel API-Related Issues or Broken Marketplace Apps? Please visit [https://developers.gohighlevel.com/](https://developers.gohighlevel.com/) for API documentations and support.

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

-   [Experiment: Waiving Premium Action/Trigger Charges for Selected Marketplace Apps](/support/solutions/articles/155000004719-experiment-waiving-premium-action-trigger-charges-for-selected-marketplace-apps)
-   [Marketplace- Agency Reselling for Apps with Usage-Based Pricing](/support/solutions/articles/155000005501-marketplace-agency-reselling-for-apps-with-usage-based-pricing)
-   [How to get started with the Developer's Marketplace](/support/solutions/articles/155000000136-how-to-get-started-with-the-developer-s-marketplace)
-   [App Marketplace - Refund Policy](/support/solutions/articles/155000004699-app-marketplace-refund-policy)
-   [Selling Snapshots on the App Marketplace](/support/solutions/articles/155000003709-selling-snapshots-on-the-app-marketplace)
-   [API Security - OAuth Consent for Marketplace Apps](/support/solutions/articles/155000005002-api-security-oauth-consent-for-marketplace-apps)

**X**

0 of 0