---
title: "CampaignStatusUpdate"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/ZG9jOjI5NjM5MjYx-campaign"
extracted_at: "2025-10-06T15:18:40.090Z"
---

# Campaign

Called whenever a campaign status is updated

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

status

string

templateId

string

replied

string

dateAdded

string

#### [

Example

](#example)

{

  "type": "CampaignStatusUpdate",

  "locationId": "ve9EPM428h8vShlRW1KT",

  "id": "2hxvXh8Fjc69SvujEWMD",

  "contactId": "CWBf1PR9LvvBkcYqiXlc",

  "status": "paused",

  "templateId": "Y2I9XM7aO1hncuSOlc9L",

  "replied": "Loram ipsum",

  "dateAdded": "2021-11-26T12:41:02.193Z"

}