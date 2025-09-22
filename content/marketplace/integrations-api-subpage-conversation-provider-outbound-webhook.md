---
title: "Conversation Provider Outbound Webhook"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/cb1e396045d93-conversation-provider-outbound-message"
extracted_at: "2025-09-22T06:30:58.430Z"
---

# Conversation Provider - Outbound Message

Called whenever a user sends a message to a contact and has a custom provider as the default channel in the settings.

> Conversation Provider - Outbound Message differs from the structure of our other webhooks which may appear similar upon first glance however, the documentation below is accurate and only what is listed will be necessary for a successful execution.

Channel

Supported Modules

SMS

Web App, Mobile App, Workflows, Bulk Actions

Email

Web App, Mobile App, Workflows, Bulk Actions

#### [

Schema

](#schema)

contactId

string

locationId

string

messageId

string

emailMessageId

string

type

any

attachments

array

message

string

phone

string

emailTo

string

emailFrom

string

html

string

subject

string

userId

string

#### [

Example for SMS

](#example-for-sms)

{

  "contactId": "GKBhT6BfwY9mjzXAU3sq",

  "locationId": "GKAWb4yu7A4LSc0skQ6g",

  "messageId": "GKJxs4P5L8dWc5CFUITM",

  "type": "SMS",

  "phone": "+15864603685",

  "message": "The text message to be sent to the contact",

  "attachments": \["https://www.google.com/images/branding/googlelogo/1x/googlelogo\_color\_272x92dp.png"\],

  "userId": "GK56r6wdJDrkUPd0xsmx"

}

#### [

Example for Email

](#example-for-email)

{

  "contactId": "GKKFF0QB9gV8fGA6zEbr",

  "locationId": "GKifVDyQeo7nwe27vMP0",

  "messageId": "GK56r6wdJDrkUPd0xsmx",

  "emailMessageId": "GK56r6wdJDrkUPd0xsmx",

  "type": "Email",

  "emailTo": \["abc@gmail.com"\],

  "emailFrom": "From Name <email@gmail.com>",

  "attachments": \["https://www.google.com/images/branding/googlelogo/1x/googlelogo\_color\_272x92dp.png"\],

  "html": "<div style=\\"font-family: verdana, geneva; font-size: 11pt;\\"><p>Testing an outobund email from custom provider.</p></div>",

  "subject": "Subject from Conversation Page",

  "userId": "GK56r6wdJDrkUPd0xsmx"

}