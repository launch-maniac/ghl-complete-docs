---
title: "InboundMessage"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/b7ada313a6066-inbound-message"
extracted_at: "2025-09-22T06:31:14.710Z"
---

# InboundMessage

Called whenever a contact sends a message to the user.

Channel

Call

Voicemail

SMS

GMB

FB

IG

Email

Live Chat

#### [

Message Schema

](#message-schema)

type

string

locationId

string

attachments

array

body

string

contactId

string

contentType

string

conversationId

string

dateAdded

string

direction

string

messageType

string

status

string

messageId

string

userId

string

conversationProviderId

string

callDuration

number

callStatus

string

#### [

Example(Message)

](#examplemessage)

{

  "type": "InboundMessage",

  "locationId": "l1C08ntBrFjLS0elLIYU",

  "attachments": \[\],

  "body": "This is a test message",

  "contactId": "cI08i1Bls3iTB9bKgFJh",

  "contentType": "text/plain",

  "conversationId": "fcanlLgpbQgQhderivVs",

  "dateAdded": "2021-04-21T11:31:45.750Z",

  "direction": "inbound",

  "messageType": "SMS",

  "status": "delivered",

  "conversationProviderId": "cI08i1Bls3iTB9bKgF01"

}

#### [

Example(Call)

](#examplecall)

{

  "type": "OutboundMessage",

  "locationId": "0d48aEf7q67DAu134bpy",

  "attachments": \["call recording url"\],

  "contactId": "gblakL5aYQC4glDtP1r2t3",

  "conversationId": "SGDqZrzmwTr19d10aHkt9F",

  "dateAdded": "2024-05-08T11:57:42.250Z",

  "direction": "inbound",

  "messageType": "CALL",

  "userId": "xsmF1xxhmC92ZpL1lj7aLa",

  "messageId": "tyW42xCD0HQpb3hhfLcx",

  "status": "completed",

  "callDuration": 120,

  "callStatus": "completed"

}

Example for unattended incoming call going to voicemail -

{

  "type": "InboundMessage",

  "locationId": "0dalah57827q67DAuXUxbpy",

  "attachments": \["voicemail url"\],

  "contactId": "gb7laj5aYQC4glDtP1r5",

  "conversationId": "SGDqZrzmwTA5P7LHkt9F",

  "dateAdded": "2024-05-08T12:00:56.193Z",

  "direction": "inbound",

  "messageType": "CALL",

  "messageId": "QkNS0DNje0FjoLQdD5O3",

  "status": "voicemail"

}

### [

Call Status Details

](#call-status-details)

For inbound calls:

-   When the call is answered by a person, `status` will be `completed` and `callStatus` will be `completed`
-   When the call goes to voicemail, `status` will be `voicemail` and `callStatus` will be `voicemail`
-   The `callDuration` field indicates the length of the call in seconds

#### [

Email Message Schema

](#email-message-schema)

type

string

locationId

string

attachments

array

body

string

contactId

string

conversationId

string

dateAdded

string

direction

string

messageType

string

emailMessageId

string

threadId

string

provider

string

to

string

cc

string

bcc

string

userId

string

conversationProviderId

string

#### [

Example(Email)

](#exampleemail)

{

  "type": "InboundMessage",

  "locationId": "kF4NJ5gzRyQF2gKFD34G",

  "body": "<div style=\\"font-family: verdana, geneva; font-size: 11pt;\\">Testing Email Notification</div>",

  "contactId": "3bN9f8LYJFG8F232XMUbfq",

  "conversationId": "yCdNo6pwyTLYKgg6V2gj",

  "dateAdded": "2024-01-12T12:59:04.045Z",

  "direction": "inbound",

  "messageType": "Email",

  "emailMessageId": "sddfDSF3G56GHG",

  "from": "Internal Notify <sample@email.service>",

  "threadId": "sddfDSF3G56GHG",

  "subject": "Order Confirmed",

  "to": \["testprasath95@gmail.com"\],

  "conversationProviderId": "cI08i1Bls3iTB9bKgF01"

}

#### For listening to inbound messages

You need to change the Messaging webhook to -

[https://services.leadconnectorhq.com/conversations/providers/twilio/inbound\_message](https://services.leadconnectorhq.com/conversations/providers/twilio/inbound_message)

You can find it inside your Twilio Account -

`Phone Numbers` > `Active Number` > `Click on the number` > `Messaging` > `A Message comes in`

If you want to revert, here's the old messaging webhook url -

[https://services.leadconnectorhq.com/appengine/twilio/incoming\_message](https://services.leadconnectorhq.com/appengine/twilio/incoming_message)

[InboundMessage](#inboundmessage "InboundMessage")[Call Status Details](#call-status-details "Call Status Details")