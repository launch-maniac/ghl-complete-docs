---
title: "Inbound Email Trigger for Workflows"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69e1179de5382219847b4f34"
author: "Ashwin Raghunandan"
pubDate: "2026-04-16T17:48:32.000Z"
link: "https://ideas.gohighlevel.com/changelog/inbound-email-trigger-for-workflows"
categories: automations,new
url: "https://ideas.gohighlevel.com/changelog/inbound-email-trigger-for-workflows"
index: 2
---

**What’s new?**

You can now start a workflow whenever an inbound email is received in your mailbox. This covers cold emails from brand-new senders, warm emails from existing contacts, and, if you allow it, replies inside existing threads - so you can automate lead capture, routing, support intake, and follow-up from the moment an email arrives.

**Why this matters**

Every inbound email is a potential lead, support request, or deal moving forward - and now your workflows can act on it instantly. The Inbound Email trigger captures emails the moment they land, including first-touch messages from people who aren't in your CRM yet. That means sales teams can route and respond to cold inquiries automatically, support teams can assign incoming requests without manual sorting, and ops teams can kick off processes as soon as a signed document or form hits the inbox.

**How it works**

The trigger fires when an inbound email is received and can be narrowed with filters for mailbox, sender, CC, subject, body, attachments, and whether the message was tied to a workflow. You can also choose to run it only for new email conversations, which helps avoid retriggering on every reply in the same thread.

**Available filters**

-   Email Sent To / Mailbox - Matches the receiving mailbox.
-   From - Matches the sender’s email address.
-   CC - Checks copied recipients.
-   Subject - Matches the email subject line.
-   Body (plain text) - Checks the email body.
-   Has Attachments - Checks whether attachments are present.
-   Replied to Workflow - Checks whether the email came from a specific workflow.
-   Contact Tag - Filters by whether the contact has or does not have a specific tag.

**Custom value picker**

-   {{message\_id}} - Unique message ID of the inbound email.
-   {{subject}} - Subject line of the inbound email.
-   {{body\_plain}} - Plain-text body content of the email.
-   {{[from.email](http://from.email)}} - Sender’s email address.
-   {{[from.name](http://from.name)}} - Sender’s display name.
-   {{cc}} - CC recipients of the inbound email.
-   {{inboundEmail.bodyFullPlain}} - Full Body (Includes reply thread)

**How to use it**

-   Go to Automations > Workflows > Add Trigger and add the Inbound Email trigger.
-   Add filters based on mailbox, sender, subject, body, attachments, or workflow reply source.
-   Save the trigger, then add actions like create contact, assign, tag, notify, or reply.

**Common use cases**

-   Inbox routing: Check which mailbox received the email and send sales@, support@, or billing@ traffic into different workflow paths.
-   Subject-based assignment: Catch emails with subjects like “refund” and route them faster.
-   Attachment intake: Trigger only when attachments are present so teams can react to forms, documents, or proofs as soon as they arrive.
-   First-touch autoresponder: Use the inbound email body in downstream actions to send a more contextual first response.

**Additional notes**

-   Full cold inbound capture is supported for LC Email dedicated domains and Mailgun dedicated domains. Gmail/Outlook two-way sync, shared domains, and other SMTP setups do not support full cold inbound capture.
-   This trigger is separate from Customer Replied, so both can exist at the same time. In some cases an email can match both, so filters and the reply tracking setting can help control overlap.
-   Each sub-account should use its own dedicated email subdomain. Reusing the same domain across multiple sub-accounts can lead to unpredictable inbound routing

**Preview:**

![image](https://canny-assets.io/images/528b6033a3f294d221e3ba471679f430.png)

![image](https://canny-assets.io/images/98ff789ca7ab07bed3135a2195e8b448.png)