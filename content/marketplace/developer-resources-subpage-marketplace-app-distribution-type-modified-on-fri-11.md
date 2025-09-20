---
title: "Marketplace App Distribution Type
                    
                    
                      

   Modified on Fri, 11 Jul at  6:07 PM"
category: "marketplace"
type: "developer-resources-subpage"
url: "https://help.gohighlevel.com/support/solutions/articles/155000002141-marketplace-app-distribution-type"
extracted_at: "2025-09-20T16:17:36.427Z"
---

1.  [Home](/support/home)
2.  [Knowledge base](/support/solutions)
3.  [Developer Resources](/support/solutions/48000450445)
4.  [Developer Resources](/support/solutions/folders/48000668553)
5.  [...](#)
    -   [Knowledge base](/support/solutions)
    -   [Developer Resources](/support/solutions/48000450445)
    -   [Developer Resources](/support/solutions/folders/48000668553)
6.  Marketplace App Distribution Type

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

# Marketplace App Distribution Type

Modified on: Fri, 11 Jul, 2025 at 6:07 PM

Below is a developer-facing guide covering both the new, simplified Marketplace distribution model and the OAuth flow you’ll need to implement to obtain the correct access tokens.

* * *

**TABLE OF CONTENTS**

-   [App Distribution Model](#App-Distribution-Model)
-   [Distribution scenarios](#Distribution-scenarios)
-   [Article elaborating pricing models supported for each distribution model](#Article-elaborating-pricing-models-supported-for-each-distribution-model)
-   [Backward compatibility](#Backward-compatibility)
-   [Target User: Agency](#Target-User%3A-Agency)
-   [Target User: Sub-account - Both Can Install](#Target-User%3A-Sub-account---Both-Can-Install)
-   [Target User: Sub-account - Only Agency Can Install](#Target-User%3A-Sub-account---Only-Agency-Can-Install)

* * *

## App Distribution Model

  

To configure your desired app distribution model, you have three fields:

Field

Values

Description

Who is the target user of the app?

‘Agency’ / ‘Sub-account’

-   Who is going to interact with the app? 
    
-   In other words, whose access token does the app ultimately need?
    
-   For 95% of the apps, this would be **“Sub-account” (Recommended)**
    
-   This field cannot be modified once set.  
      
    

Who can install the app?

‘Both Agency and Sub-account’ / ‘Agency Only’

-   Which user(s) may see and install the app from the Marketplace UI?
    
-   The **recommended option is “Both Agency & Sub-account”**, to ensure your app has the maximum reach
    
-   Use "Agency Only" If you’re build an app exclusively as a fully white-labelled SaaS feature that only agencies can discover and install to their sub-accounts. 
    

Can this app be bulk-installed by agencies?

‘Yes’ / ‘No’

-   This is **purely for backwards compatibility** of apps already in the Marketplace. All apps added to the Marketplace going forward will be set to "Yes" (mandatory).
    
-   If ‘Yes’, an agency owner/admin can install your app to multiple subaccounts in one operation.
    
-   Once set to 'Yes', this field cannot be reverted back to 'No'.
    

##   

* * *

## Distribution scenarios

  

Developer’s distribution config scenarios

User Installation Scenarios

Getting the right access token

Who is the target user?

Who can install the app?

Can the app be bulk-installed by agencies?

Step 1: Identifying the type of installation from [Get Access Token API](https://marketplace.gohighlevel.com/docs/ghl/oauth/get-access-token) 

Step 2: 

Agency

NA

NA

Agency user installs the app

“isBulkInstallation” : false,

“userType” : ”Company”

NA

Sub-account 

Agency & sub-account

No

Sub-account user installs the app

“isBulkInstallation” : false,

“userType” : ”Location”

NA

Agency user installs the app

“isBulkInstallation” : false,

“userType" : "Location”

NA

Yes

Sub-account user installs the app

“isBulkInstallation” : false,

“userType" : "Location”

NA

\[NEW and RECOMMENDED\]

Agency user installs the app

“isBulkInstallation” : true,

“userType" : "Company”

1. [Get sub-accounts where app is installed](https://marketplace.gohighlevel.com/docs/ghl/oauth/get-installed-location)

  

2. [Get Location Token using Agency Token](https://marketplace.gohighlevel.com/docs/ghl/oauth/get-location-access-token) for every location where app is installed

  

3\. Listen to [AppInstall webhook event](https://marketplace.gohighlevel.com/docs/webhook/AppInstall) for automatic future installations or installs done as part of a SaaS plan, and [Get Location Token using Agency Token](https://marketplace.gohighlevel.com/docs/ghl/oauth/get-location-access-token) for the newly installed locations.

  

Agency Only

Yes

Agency user installs the app

“isBulkInstallation” : true,

“userType" : "Company”

  

## **[](https://help.gohighlevel.com/support/solutions/articles/155000001217-set-up-your-app-pricing#Distribution-Types-and-Pricing-Models)[Article elaborating pricing models supported for each distribution model](https://help.gohighlevel.com/support/solutions/articles/155000001217-set-up-your-app-pricing#Distribution-Types-and-Pricing-Models)**

* * *

## Backward compatibility

  

For all existing apps, to ensure the existing installation flow and token exchange mechanism is maintained, we have configured the fields as follows for the existing/legacy distribution types:

  

  

Legacy Distribution Type  

Developer’s distribution config mapping to ensure backward compatibility  

Recommendation on how you can maximise the reach for your app  

Who is the target user?  

Who can install the app?  

Can the app be bulk-installed by agencies?  

Agency Only  

Agency  

NA  

NA  

NA  

Sub-account Only  

Sub-account 

Agency & sub-account  

No  

1\. Develop the token exchange mechanism for bulk-installation flow as mentioned above.  
2\. Once done, set "Can the app be bulk-installed by agencies?" to "Yes"  

Agency & Sub-account  

Sub-account 

Agency Only  

Yes  

To make the app accessible to sub-accounts, you must ensure the app does not require any agency-level access such as:  

-   Agency Level Scopes - companies.readonly, companies.write, location.write, saas/location.write, snapshots.readonly, snapshots.write, custom-menu-link.readonly, custom-menu-link.write
-   Module > Snapshots
-   Module > CustomJS

  
If your app does not require any of the above:  
1\. Develop the OAuth flow for installation by sub-account admins, which would generate a **userType: Location** token, as mentioned above.  
2\. Once done, change "Who can install the app?" **to** "**Agency & sub-account"**

  

* * *

## **Target User: Agency**

  

Choose the Agency distribution type if your app's functionalities are applicable only to agency-level accounts.  
  

![](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/155048583581/original/w4Mv3eWxtc7ky1cU_fU1FfLuBdg8fYAt_w.png?1750392548)

  

  
**App Listing**: Apps will be listed solely in the agency level app marketplace.

  

![](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/155048583594/original/f4TxfrBHaJTtETQV7pYDWWQ4nI5z7bz-vw.png?1750392601)

  

  

**Installation and Uninstallation**:  Only agency administrators or owners have the authority to install or uninstall the app at the agency account level.

  

**Payments**: For paid applications, the installing agency is responsible for the app's cost.

  

**Re-selling**: Agencies cannot re-sell these apps, as they are not available for installation at the sub-account level.

* * *

## **Target User: Sub-account - Both Can Install**

  

Select the Sub-account (both can install) type if your app's functionalities are intended for sub-account level accounts.  
  

![](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/155048583624/original/kJtU4fEgullilWG0fxoAnDDRM-hJdD-cdg.png?1750392750)

  

  
**App Listing**: These apps are available to both agency owners/admins and sub-account admins to install. These apps are listed in both Marketplaces.

  
![](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/155048583635/original/eYRbavl9kxE3dTmJWUzJ26BuxrtACE9o4g.png?1750392836)

  

  

**Installation and Uninstallation**:  Both Sub-account admins and agency admins can install the app. 

Sub-account admins can discover and install these apps to their respective sub-accounts.

  

### ![](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/155023404538/original/lQxf69LOM8uFEPOdE9MQ6M8gYq-b4GDkoA.png?1711222807)

  

  

**Bulk Installation**: If bulk-installation is supported by the app developer, agency admins can bulk-install such apps. If not, agency admins can install the app one sub-account at a time. Agencies can automatically install these apps for future sub-accounts if they choose the 'all sub-accounts' option during the initial installation.  
  

![](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/155023404499/original/MqHiBlSiuQlJPZxBKZ49b7ZdsXzUeYZ6tw.png?1711222532)

  

  

**Payments**:  The sub-account installing a paid app will bear its cost.

  

**Re-selling**:  These apps can be re-sold by agencies.

* * *

## **Target User: Sub-account - Only Agency Can Install**

  

Opt for type Sub-account (only agency can install) distribution if your app is designed such a way that agency owners are the only relevant installers.  
  

![](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/155048584235/original/ifH_YbCWG2-uY5wxZFLw6jeWGAm3Ma0PpQ.png?1750394316)

  

  
**App Listing**: These apps will only show up in the agency view of the Marketplace.  
  

![](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/155023404478/original/ZaZlYBRJIocjPL0AfUJkH_yXBSpC_BEoWg.png?1711222458)

  

  
**Installation and Uninstallation**: Installation and uninstallation of these apps at the sub-account level must be carried out by agency admins or owners only.

  

**Bulk Installation**: If enabled, Agency admins can bulk-install such apps. If not, agency admins can install the app one sub-account at a time. Agencies can automatically install these apps for future sub-accounts if they choose the 'all sub-accounts' option during the initial installation.  
  

![](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/155023404499/original/MqHiBlSiuQlJPZxBKZ49b7ZdsXzUeYZ6tw.png?1711222532)

  

  

**Re-selling**: Agencies can re-sell these apps to their sub-accounts, with the agency paying the base price set by the developer and sub-accounts paying a marked-up price set by the agency.[](https://help.gohighlevel.com/en/support/solutions/articles/155000001220)[](https://help.gohighlevel.com/en/support/solutions/articles/155000001220)

  

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

-   [Changing Your App Pricing Plan in the App Marketplace](/support/solutions/articles/155000003967-changing-your-app-pricing-plan-in-the-app-marketplace)
-   [Agency-Level Marketplace Apps Installation](/support/solutions/articles/155000001057-agency-level-marketplace-apps-installation)
-   [One-Time Pricing Model in the App Marketplace](/support/solutions/articles/155000003674-one-time-pricing-model-in-the-app-marketplace)
-   [Configure Marketplace App Listing Type](/support/solutions/articles/155000001559-configure-marketplace-app-listing-type)
-   [How to get started with the Developer's Marketplace](/support/solutions/articles/155000000136-how-to-get-started-with-the-developer-s-marketplace)
-   [Selling Snapshots on the App Marketplace](/support/solutions/articles/155000003709-selling-snapshots-on-the-app-marketplace)

**X**

0 of 0