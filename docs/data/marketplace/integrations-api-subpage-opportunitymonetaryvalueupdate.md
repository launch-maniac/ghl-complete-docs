---
title: "OpportunityMonetaryValueUpdate"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/4e1db6481a2bd-opportunity"
extracted_at: "2025-09-30T00:57:55.470Z"
---

# Opportunity

Called whenever an opportunity's monetary value field is updated

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

  "type": "OpportunityMonetaryValueUpdate",

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