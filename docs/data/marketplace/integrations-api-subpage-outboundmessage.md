---
title: "OutboundMessage"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/028dcf92ee0b9-outbound-message"
extracted_at: "2025-09-22T15:20:50.668Z"
---

# OutboundMessage

Called whenever a user sends a message to a contact.

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

source

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

  "type": "OutboundMessage",

  "locationId": "l1C08ntBrFjLS0elLIYU",

  "attachments": \[\],

  "body": "This is a test message",

  "contactId": "cI08i1Bls3iTB9bKgFJh",

  "contentType": "text/plain",

  "conversationId": "fcanlLgpbQgQhderivVs",

  "dateAdded": "2021-04-21T11:31:45.750Z",

  "direction": "inbound",

  "messageType": "SMS",

  "source": "app",

  "status": "delivered",

  "conversationProviderId": "cI08i1Bls3iTB9bKgF01"

}

#### [

Example(Call and Voicemail)

](#examplecall-and-voicemail)

{

  "type": "OutboundMessage",

  "locationId": "0d48aEf7q67DAu134bpy", 

  "attachments": \["call recording url"\],

  "contactId": "gblakL5aYQC4glDtP1r2t3",

  "conversationId": "SGDqZrzmwTr19d10aHkt9F",

  "dateAdded": "2024-05-08T11:57:42.250Z",

  "direction": "outbound",

  "messageType": "CALL",

  "userId": "xsmF1xxhmC92ZpL1lj7aLa",

  "messageId": "tyW42xCD0HQpb3hhfLcx",

  "status": "completed",

  "callDuration": 120,

  "callStatus": "completed"

}

### [

Call Status Details

](#call-status-details)

For outbound calls:

-   When the call is answered by a person, `status` will be `completed` and `callStatus` will be `completed`
-   When the call reaches voicemail, `status` will be `completed` and `callStatus` will be `voicemail`
-   The `callDuration` field indicates the length of the call in seconds

#### [

Example(Voicemail send through workflow)

](#examplevoicemail-send-through-workflow)

{

  "type": "OutboundMessage",

  "locationId": "0d48aEf7q67DAuXUxbpy",

  "attachments": \["voicemail url"\],

  "contactId": "gb7xwL5aYQC4glDtP1r5",

  "conversationId": "SGDqZrzmwTr5P7aHkt9F",

  "dateAdded": "2024-05-08T12:04:55.828Z",

  "direction": "outbound",

  "messageType": "VoiceMail",

  "messageId": "hhYtaQM2I9ym8qhU9CmM",

  "status": "completed"

}

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

source

string

conversationProviderId

string

#### [

Example(Email)

](#exampleemail)

{

  "type": "OutboundMessage",

  "locationId": "kF4NJ5gzRyQF2gKFD34G",

  "body": "<div style=\\"font-family: verdana, geneva; font-size: 11pt;\\">Testing Email Notification</div>",

  "contactId": "3bN9f8LYJFG8F232XMUbfq",

  "conversationId": "yCdNo6pwyTLYKgg6V2gj",

  "dateAdded": "2024-01-12T12:59:04.045Z",

  "direction": "outbound",

  "messageType": "Email",

  "emailMessageId": "sddfDSF3G56GHG",

  "from": "Internal Notify <sample@email.service>",

  "threadId": "sddfDSF3G56GHG",

  "subject": "Order Confirmed",

  "to": \["example@email.com"\],

  "source": "app",

  "conversationProviderId": "cI08i1Bls3iTB9bKgF01"

}

[OutboundMessage](#outboundmessage "OutboundMessage")[Call Status Details](#call-status-details "Call Status Details")