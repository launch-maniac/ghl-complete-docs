---
title: "Developer Guide for selling Web-Widgets on the App Marketplace
                    
                    
                      

   Modified on Fri, 29 Aug at  2:59 AM"
category: "marketplace"
type: "developer-resources-subpage"
url: "https://help.gohighlevel.com/support/solutions/articles/155000003915-developer-guide-for-selling-web-widgets-on-the-app-marketplace"
extracted_at: "2025-09-20T16:17:50.352Z"
---

1.  [Home](/support/home)
2.  [Knowledge base](/support/solutions)
3.  [Developer Resources](/support/solutions/48000450445)
4.  [Developer Resources](/support/solutions/folders/48000668553)
5.  [...](#)
    -   [Knowledge base](/support/solutions)
    -   [Developer Resources](/support/solutions/48000450445)
    -   [Developer Resources](/support/solutions/folders/48000668553)
6.  Developer Guide for selling Web-Widgets on the App Market...

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

# Developer Guide for selling Web-Widgets on the App Marketplace

Modified on: Fri, 29 Aug, 2025 at 2:59 AM

This guide aims to help developers create custom widgets for use in funnel builder and integrate them seamlessly. We will cover how to create, set up, and render custom widgets using HTML, CSS, and JavaScript or any JS frameworks like Angular, React, Vue along with communication between your custom widget application and the funnel builder.

  

  

**TABLE OF CONTENTS**

-   [Prerequisites](#Prerequisites)
-   [Overview](#Overview)
-   [Step-by-Step Guide](#Step-by-Step-Guide)
    -   [Step 1: Register yourself as a developer on the App Marketplace](#Step-1%3A-Register-yourself-as-a-developer-on-the-App-Marketplace)
    -   [Step 2: Setting Up Your Custom Widget](#Step-2%3A-Setting-Up-Your-Custom-Widget)
    -   [Step 3: Integrating With the Funnel Builder](#Step-3%3A-Integrating-With-the-Funnel-Builder)
    -   [Step 4: Communication Between Application and Funnel Builder](#Step-4%3A-Communication-Between-Application-and-Funnel-Builder)
        
        -   [✅ Upload Format Supported](#%E2%9C%85-Upload-Format-Supported)
        -   [❌ .rar or Other Formats](#%E2%9D%8C-.rar-or-Other-Formats%E2%80%8B)
        -   [Best Practice](#Best-Practice)
        

* * *

## **Prerequisites**

  

-   Basic knowledge of HTML, CSS, JavaScript or Experience with JS frontend frameworks (Angular, React, Vue or similar)  
      
    
-   Familiarity with iFrames.  
      
    
-   Understanding of event-driven programming.

* * *

## **Overview**

  

Custom widgets allow you to extend functionalities of a funnel builder by embedding custom elements like price banners or other interactive components.

* * *

## **Step-by-Step Guide**

  

### **Step 1:** Register yourself as a developer on the App Marketplace

-   Sign up as a developer on the App Marketplace. 
-   Click on 'Create App' and start your app creation journey.

  

  

### **Step 2:** Setting Up Your Custom Widget

**Create Your Application**

  

Develop an independent web application which allows users to interact with UI elements and generate HTML, CSS and JS (if required) which will render the custom widget element based on the settings that they choose.

  

-   The application should have the following functions which emits HTML, CSS and JS  
      
    -   createHtml() => Returns the HTML code for the widget  
          
        
    -   createJS() => Returns the JS code required for the widget to run in the website (optional)  
          
        
    -   createCss() => Returns the css code required for the widget styles.

  

The application should use postmate for iFrame communication between the funnel builder. The widget code can be emitted to the funnel builder via an event emit.

  

Example:

  

parent?.emit('code', {

html: html as string,

js: js as string,

elementStore: elementSettings as Object

})

Copy

  

Parameters:

  

html : HTML content required for widget to render along with styles

  

Example: 

  

<style>{Your styles goes here}</style>  
<div class="hl-banner">{Your HTML content goes here}</div>

  

Copy

  

js : JS code required for the  widget to run (optional) 

  

Note: make sure you don't wrap your js code inside <script /> tag

  

Note: If its a JS based application then all the code required  for interacting with the funnel/website popup, or other JS events specified in the upcoming sections should be included in the JS  emitted to the parent

  

elementStore: All the variables that represents the settings of the widget (variable names can be anything of your preference)

  

Example:

  

settings: {

widgetHeight: number

widgetWidth: number

image: string

}

Copy

  

  

-   On application initialization or the initial handshake, expect for the following payload
-     
    
-   { elementStore: Object } // The elementStore which is emitted by your application while sending the code to parent. Use this to prefill settings which is already saved by user for your widget in the funnel builder.
    
    Copy
    

  

and ensure that you emit the initial state of preview  
  

-   parent?.emit('code', {  
    html: html as string,  
    js: js as string,  
    elementStore: elementSettings as Object  
    })  
      
    

Note: ensure that you emit the initial state Make sure that the data received is filled to all the respective settings of your widgets so that we can show the previously saved values on revisits

  

  

### **Step 3:** Integrating With the Funnel Builder

  

1\. Upload to Marketplace

-   Build the project and upload the HTML, CSS & JS file or dist folder as a zip to the marketplace app
-   Ensure it adheres to the platform's guidelines and submission requirements.

⚠️

avoid using absolute path while building ensure you use relative paths in your project.

  

apps/

│

├── app1/

│   ├──index.html

│   ├──css/

│   │   └── style.css

│   └──js/

│       └── script.js

│

└── app2/

    ├──index.html

    ├──css/

    │   └── style.css

    └──js/

        └── script.js

  

index.html

absolute path : css/style.css (Avoid this)

relative path: ./css/style.css

  

2\. Add Custom Widget to Funnel Elements  
  

-   Once approved and available in the marketplace, the funnel builder will list your widget under a “Custom Widgets” or similar section.  
      
    
-   Users can install the custom widget from the marketplace.  
      
    
-   Drag and Drop Widget to Funnel Builder

  

3\. Limited Settings Configuration

-   Configure limited settings (like margin, padding, visibility, and custom classes) to be editable directly from the funnel builder’s settings area.  
      
    
-   Main widget settings should be configured through an external pop-up handled by your application.

  

4\. Render the Widget

  

-   Ensure the funnel builder can render the widget by interpreting the generated HTML, CSS, and JavaScript.

  

  

### **Step 4:** Communication Between Application and Funnel Builder

  

Using iFrames

-   Host(will take care of hosting) your settings application inside an iframe within the funnel builder.
-   Make sure it generates and communicates HTML, CSS, and JS code as settings are adjusted.

  

  

Step 5: Events and JS Integration 

Custom widget events allow your custom widget to communicate with the funnel preview environment. This communication is for creating interactive web applications where actions in the widget can trigger responses in the funnel preview, resulting in a smoother and more integrated user experience.

  

Key Concepts

-   Event Emission: Your custom widget can send out signals (events) when users interact with it, like clicking a button or changing a setting.
-   Event Handling: The funnel preview listens for these signals and performs certain actions in response, like opening a popup or moving to the next step in a funnel.

  

Events:

  

    1. customWidgetOpenPopup 

  

Description: This event triggers an action to open a popup on the preview side.

Example:

  

  var event = new Event('customWidgetOpenPopup');

window.dispatchEvent(event)

Copy

2\. customWidgetGoToNextStep

  

Description: This event triggers an action to move to the next step/page in the funnel/website.

Example:

  

var event = new Event('customWidgetGoToNextStGoToNextStep');

window.dispatchEvent(event)

Copy

  

If you're using any framework router, make sure you use it in createMemoryHistory. 

  

For reference, see the Vue Router Memory Mode.

  

CSS Note: Ensure that if you are utilizing media query for mobile devices, you also take into account the compatibility with the funnel builder mobile mode by targeting the class with a .--mobile prefix.

  

Example: Marketing Price Banner Widget

github.com

https://github.com/b805rohit/marketing-price-banner

  

A Checklist before submitting your widget app for review

When developing and integrating custom widgets into a funnel builder, it's crucial to ensure they function effectively without causing any disruptions or conflicts. Please test your app to ensure it meets the criteria mentioned in this checklist before submitting the app for review. 

# 

  

1.  **Ensure it does not disrupt builder functionality:** Verify that the widget integrates smoothly and does not interfere with the core functionalities of the funnel builder.  
      
    
2.  **Confirm it does not conflict with other elements:** Ensure that your widget does not overlap or interfere with other elements already present in the builder, which could lead to visual or functional issues.  
      
    
3.  **Check for any external scripts:** Be vigilant about any unintended external scripts being included with your widget, especially if it's not meant to have such inclusions. These could introduce security risks or functionality conflicts.  
      
    
4.  **Verify that it does not disrupt the white labeling process**: If the application supports white labeling, ensure that the widget preserves this capability and does not inadvertently expose brand-specific details.  
      
    
5.  **Ensure app state remains consistent and persistent:** Confirm that the widget maintains its state across various interactions and revisits, ensuring a consistent user experience.  
      
    
6.  **Check that the initial state is correctly displayed:** On loading, the widget should accurately reflect the initial state as intended, displaying all predefined settings and configurations.  
      
    
7.  **Test all settings to ensure they function properly:** Go through each configurable setting within the widget to verify they perform as expected, without bugs or unexpected behavior.

  

By carefully reviewing each of these points, you can assure the quality and reliability of your custom widgets in the funnel builder environment. This checklist serves as a quality assurance tool to catch potential issues before deployment.

* * *

According to the HighLevel Developer Guide for selling web widgets on the App Marketplace, there **is** an option to upload files, but with specific guidelines:

  

#### **✅ Upload Format Supported**

  

You are expected to:

-   **Build your widget project** (i.e., HTML, CSS, JS).  
      
    
-   **Bundle it into a `.zip` file** (not `.rar`).  
      
    
-   **Upload the `.zip` file** to the App Marketplace during the widget setup process.  
      
    

#### ❌ **.rar or Other Formats**

-   .RAR files are not supported.
-   Only `.zip` is mentioned as the accepted archive format.
    

  

  

#### Best Practice

  

When creating your widget:

  

-   Use **relative paths** for assets.  
      
    
-   Keep your build clean — no unnecessary files or folders.  
      
    
-   Ensure your HTML, CSS, and JS are in the correct directory structure before zipping.  
      
    

If you're using a frontend framework (like React or Vue), zip the **build/dist folder**, not the entire project directory.

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

-   [Marketplace App Distribution Type](/support/solutions/articles/155000002141-marketplace-app-distribution-type)
-   [Selling Snapshots on the App Marketplace](/support/solutions/articles/155000003709-selling-snapshots-on-the-app-marketplace)
-   [Listing Conversation AI and Voice AI Templates on the Marketplace](/support/solutions/articles/155000005412-listing-conversation-ai-and-voice-ai-templates-on-the-marketplace)
-   [Installing Marketplace Apps Directly from the Workflow Builder](/support/solutions/articles/155000005791-installing-marketplace-apps-directly-from-the-workflow-builder)
-   [How to Resell Marketplace Apps as a Part of SaaS Plans](/support/solutions/articles/155000006142-how-to-resell-marketplace-apps-as-a-part-of-saas-plans)
-   [App Marketplace - Refund Policy](/support/solutions/articles/155000004699-app-marketplace-refund-policy)

**X**

0 of 0