---
title: "Unlocking Customization: Enhancing Marketplace Apps with Custom JavaScript
                    
                    
                      

   Modified on Fri, 29 Nov, 2024 at 12:03 AM"
category: "marketplace"
type: "developer-resources-subpage"
url: "https://help.gohighlevel.com/support/solutions/articles/155000003278-unlocking-customization-enhancing-marketplace-apps-with-custom-javascript"
extracted_at: "2025-09-20T16:17:42.416Z"
---

1.  [Home](/support/home)
2.  [Knowledge base](/support/solutions)
3.  [Developer Resources](/support/solutions/48000450445)
4.  [Developer Resources](/support/solutions/folders/48000668553)
5.  [...](#)
    -   [Knowledge base](/support/solutions)
    -   [Developer Resources](/support/solutions/48000450445)
    -   [Developer Resources](/support/solutions/folders/48000668553)
6.  Unlocking Customization: Enhancing Marketplace Apps with ...

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

# Unlocking Customization: Enhancing Marketplace Apps with Custom JavaScript

Modified on: Fri, 29 Nov, 2024 at 12:03 AM

Custom JavaScript and CSS via the Marketplace Apps

The custom JS feature enhances our platform’s capabilities by adding Custom JavaScript codes on the Marketplace APPs. This functionality allows developers to personalize and extend the platform’s features within agency-distributed apps.

  

Introduction

The ability to integrate Custom JavaScript and CSS into our platform opens up a range of possibilities for developers looking to enhance the functionality and aesthetics of their agency-distributed apps. This feature supports a higher degree of customization and allows for more dynamic interactions within the platform. However, to maintain the integrity, security, and performance of our platform, all custom scripts must undergo a thorough review process before they can be deployed.

  

Distribution Type

The app must be of distribution type - Agency or Agency & Sub-account for adding custom Javascript code.

  

Review Process and Guidelines

When submitting custom JavaScript or CSS for agency distribution apps, adhere to the following guidelines to ensure a smooth review process. The review process has a Service Level Agreement (SLA) of up to 10 days. Once approved, scripts will be embedded into the agency apps.

  

Guidelines for Custom Scripts

-   Sensitive Data Access: Custom scripts must not access sensitive data to prevent unintended data manipulation or conflicts.
    
-   Obfuscated Code: Avoid using obfuscated code. Clear, readable code is required to prevent potential security risks and ensure script intentions are transparent.
    
-   Database Access: Custom scripts must not directly access the database to maintain data integrity and security.
    
-   Remote File References: All logic should be self-contained. Remote file references or on-the-fly script loads are not permitted.
    
-   Embedding Scripts: Ensure your JavaScript code is properly embedded within <script> tags for correct integration with the DOM.
    
-   Avoid Console Logs: Do not include console.log statements in your custom scripts to maintain clean and efficient code.
    

  

Testing Before Submission

To avoid potential issues, thoroughly test your custom scripts before submission. You can do this by adding them to the Custom JavaScript & Custom CSS section in the Agency view under Settings -> Company. If you lack agency access, consider creating a sandbox account to simulate the environment and test your scripts.

  

By following these guidelines, you contribute to a secure and reliable platform experience for all users. We appreciate your cooperation and look forward to seeing the innovative ways you enhance our platform!

  

[](https://highlevel.stoplight.io/docs/integrations/342bca923152a-custom-js)[How to utilize custom JS Wrapper Function?](https://highlevel.stoplight.io/docs/integrations/342bca923152a-custom-js) 

  

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

-   [Marketplace- Agency Reselling for Apps with Usage-Based Pricing](/support/solutions/articles/155000005501-marketplace-agency-reselling-for-apps-with-usage-based-pricing)
-   [Usage Based Pricing on App Markeptlace](/support/solutions/articles/155000005111-usage-based-pricing-on-app-markeptlace)
-   [Marketplace - Agency Control Over Daily Usage Limits for Usage-Based Apps](/support/solutions/articles/155000006235-marketplace-agency-control-over-daily-usage-limits-for-usage-based-apps)
-   [Experiment: Waiving Premium Action/Trigger Charges for Selected Marketplace Apps](/support/solutions/articles/155000004719-experiment-waiving-premium-action-trigger-charges-for-selected-marketplace-apps)
-   [Developer Guide for selling Web-Widgets on the App Marketplace](/support/solutions/articles/155000003915-developer-guide-for-selling-web-widgets-on-the-app-marketplace)
-   [How to get started with the Developer's Marketplace](/support/solutions/articles/155000000136-how-to-get-started-with-the-developer-s-marketplace)

**X**

0 of 0