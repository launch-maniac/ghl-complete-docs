---
title: "How to Use Webhook.site to Troubleshoot your API Requests
                    
                    
                      

   Modified on Thu, 23 Jun, 2022 at 11:19 AM"
category: "marketplace"
type: "developer-resources-subpage"
url: "https://help.gohighlevel.com/support/solutions/articles/48001212085-how-to-use-webhook-site-to-troubleshoot-your-api-requests"
extracted_at: "2025-09-20T16:17:21.200Z"
---

1.  [Home](/support/home)
2.  [Knowledge base](/support/solutions)
3.  [Developer Resources](/support/solutions/48000450445)
4.  [Developer Resources](/support/solutions/folders/48000668553)
5.  [...](#)
    -   [Knowledge base](/support/solutions)
    -   [Developer Resources](/support/solutions/48000450445)
    -   [Developer Resources](/support/solutions/folders/48000668553)
6.  How to Use Webhook.site to Troubleshoot your API Requests

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

# How to Use Webhook.site to Troubleshoot your API Requests

Modified on: Thu, 23 Jun, 2022 at 11:19 AM

  

  

## Things To Note:

The steps in this article are for Advanced Integration and for informational purposes only.   
  
While **we do not currently service or support either the Basic or Advanced API** due to their complexities, we have many tools and groups to help you get started and connected! For assistance with APIs, you can join our Developer Council Slack Community here: [https://www.gohighlevel.com/dev-slack](https://www.gohighlevel.com/dev-slack)  
  
We also hold a **Developer Council Zoom Call once a month** (second to last Friday) which you can find on the Events calendar here: [https://www.gohighlevel.com/events](https://www.gohighlevel.com/events)  
  
[](https://developers.gohighlevel/)**For more information and links to our API documentation, visit our developer's website:** **[https://developers.gohighlevel.com/](https://developers.gohighlevel.com/)**

  

##   
STEPS:

* * *

### 1\. [Go to Webhook.site](https://webhook.site/#!/8d254d9f-2bad-4959-b3e2-e3a262d06c76)  
  

  

  

### **2\. Click on "Copy to clipboard" next to your unique Testing Webhook on the homepage**

  

![Click on "Copy to clipboard" next to your unique Testing Webhook on the homepage](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/48204558661/original/AMwU34bm7Qtr34Kv-qg5tlrcbmjHLwVPEg.png?1647882452)  
  
  
  

  

  

### **3\. Go to Your Custom Integration like Zapier or other third-party solution**

For this example, we are using Zapier, and to use Webook.site to test you will need to click "Set Up Action" 

  

![Go to Your Custom Integration like Zapier, or other third-party solution](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/48204558665/original/y413VeWzjcuvSTcRG3D7Qr0i-WG1OsdbRg.png?1647882452)  
  

  
  

  

### **4\. Replace the HighLevel API URL with the Webhook.site testing URL**

Temporarily swap out the HighLevel API URL for the Webhook.site URL for testing purposes. You'll follow a similar process for any other custom integration that is POSTING data into HighLevel. 

  

![Replace the HighLevel API URL with the Webhook.site testing URL](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/48204558659/original/u3eeM4pSIkQSw2ivNF_WpkezIC7Rrd2j4Q.png?1647882452)  
  
  

  

  

  

### **5\. Save your updates**

Make sure to save your changes, then run whatever flow you have in place that would normally execute the webhook. If your tool or integration (like Zapier, Integromat, etc.) has a built-in testing tool, don't utilize this. Instead, use a real-world example. If the webhook is triggered when a form is submitted, go to the form and submit a test. If the automation fires when an action is performed in an external system, perform said action.  
  
This will provide you and your developers with the most accurate information, and will be incredibly valuable when troubleshooting advanced API-related issues.  
  

  
  
  

### **6\. Review Payload Data**

Next, you'll be presented with the raw data being received by HighLevel anytime the webhook is executed. You can compare this with the information available on our API documentation websites to test your configuration. 

  

![Review Payload Data](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/48204626853/original/rZKm85AvhyACSqZ3wxKtgoFf4Zkh8lDLMQ.png?1647895301)  
  

  
  
  

### **7\. Click Copy**

Click Copy in the Upper Right of the Raw Data input box to copy the entire Payload. Save this for troubleshooting with your developers, or with the HighLevel team.

![Click Copy](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/48204626854/original/KfqMVOZpTrJV0t0LHq6GHcGcIK1t1AR3oQ.png?1647895301)

[](https://app.tango.us/app/workflow/3219af23-e023-4d83-8a49-c05eadbd7aa9?utm_source=magicCopy&utm_medium=magicCopy&utm_campaign=referral%20link%20tracking)

  

[](https://app.tango.us/app/workflow/3219af23-e023-4d83-8a49-c05eadbd7aa9?utm_source=magicCopy&utm_medium=magicCopy&utm_campaign=referral%20link%20tracking)

  

## Related Articles:

[HighLevel API](https://help.gohighlevel.com/support/solutions/articles/48001060529-highlevel-api)

[Creating Subaccounts Using Zapier](https://help.gohighlevel.com/support/solutions/articles/48001207048-creating-subaccounts-using-zapier)

  

  
  
  

* * *

# **Troubleshooting:**

  

  

**For more information and links to our API documentation, visit our developer's website:** **[https://developers.gohighlevel.com/](https://developers.gohighlevel.com/)** 

  

The steps in this article are for Advanced Integration and for informational purposes only.   
  
While **we do not currently service or support either the Basic or Advanced API** due to their complexities, we have many tools and groups to help you get started and connected! For assistance with APIs, you can join our Developer Council Slack Community here: [https://www.gohighlevel.com/dev-slack](https://www.gohighlevel.com/dev-slack)  
  
We also hold a Developer Council Zoom Call once a month (second to last Friday) which you can find on the Events calendar here: [https://www.gohighlevel.com/events](https://www.gohighlevel.com/events)  
  
[](https://developers.gohighlevel/)**For more information and links to our API documentation, visit our developer's website:** **[https://developers.gohighlevel.com/](https://developers.gohighlevel.com/)**

  

  

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

-   [Creating Sub-Accounts using Zapier](/support/solutions/articles/48001207048-creating-sub-accounts-using-zapier)
-   [How to Use Webhooks in HighLevel (Zapier)](/support/solutions/articles/155000001183-how-to-use-webhooks-in-highlevel-zapier-)
-   [How to get started with the Developer's Marketplace](/support/solutions/articles/155000000136-how-to-get-started-with-the-developer-s-marketplace)
-   [How to setup Replies in MailGun](/support/solutions/articles/48000987293-how-to-setup-replies-in-mailgun)
-   [How to Use the New SaaS Plan Created Webhook](/support/solutions/articles/155000005897-how-to-use-the-new-saas-plan-created-webhook)
-   [Manychat to HighLevel Integration](/support/solutions/articles/48001158874-manychat-to-highlevel-integration)

**X**

0 of 0