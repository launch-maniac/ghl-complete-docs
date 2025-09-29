---
title: "OpportunityDelete"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/ZG9jOjI5NjI5Mjg1-opportunity"
extracted_at: "2025-09-29T21:20:33.232Z"
---

# Opportunity

Called whenever an opportunity is deleted

#### [

Schema

](#schema)

type

string

locationId

string

id

string

assignedTo

string

contactId

string

monetaryValue

number

name

string

pipelineId

string

pipelineStageId

string

source

string

status

string

dateAdded

string

#### [

Example

](#example)

{

  "type": "OpportunityDelete",

  "locationId": "ve9EPM428h8vShlRW1KT",

  "id": "wWhVuzqpRuOA1ZVWi4FC",

  "assignedTo": "bNl8QNGXhIQJLv8eeASQ",

  "contactId": "cJAWDskpkJHbRbhAT7bs",

  "monetaryValue": 40,

  "name": "Loram ipsu",

  "pipelineId": "VDm7RPYC2GLUvdpKmBfC",

  "pipelineStageId": "e93ba61a-53b3-45e7-985a-c7732dbcdb69",

  "source": "Loram ipsu",

  "status": "open",

  "dateAdded": "2021-11-26T12:41:02.193Z"

}