---
title: "Conversation Unread Webhook"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/a90fe823ceca6-conversation"
extracted_at: "2025-10-02T21:17:46.594Z"
---

# Conversation

Called whenever a conversations unread status is updated

#### [

Schema

](#schema)

type

string

locationId

string

id

string

contactId

string

unreadCount

number

inbox

boolean

starred

boolean

deleted

boolean

#### [

Example

](#example)

{

  "type": "ConversationUnreadUpdate",

  "locationId": "ADVlSQnPsdq3hinusd6C3",

  "id": "MzKIpg0rEIH2ZUGKf6BS",

  "contactId": "zsYhPBOUsEHtrK508Wm9",

  "deleted": false,

  "inbox": false,

  "starred": true,

  "unreadCount": 0

}