---
title: "RecordDelete"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/81b40da792ba7-delete-record"
extracted_at: "2025-09-24T21:23:40.938Z"
---

# Delete Record

## [

Overview

](#overview)

The `Delete Record` is triggered whenever a record or business (company) is deleted from the system.

## [

Schema

](#schema)

The webhook payload follows a structured JSON schema, which defines the format and expected data types of the event payload.

type

string

locationId

string

owners

array\[string\]

followers

array\[string\]

properties

array\[object\]

key

string

valueString

string

id

string

timestamp

string<date-time>

## [

Explanation of Fields

](#explanation-of-fields)

Field

Type

Description

`type`

`string`

The type of event.

`locationId`

`string`

Unique identifier for the location associated with the deleted record.

`owners`

`array of strings`

List of user IDs that were assigned as owners of the deleted record.

`followers`

`array of strings`

List of user IDs that were following the deleted record.

`properties`

`array of objects`

Key-value pairs containing additional metadata about the record.

`id`

`string`

Unique identifier of the deleted record.

`timestamp`

`string (ISO 8601 format)`

The timestamp when the deletion event occurred.

## [

Example Payload

](#example-payload)

{

  "id": "679b8f9bde6a0c356a0311b3",

  "locationId": "eHy2cOSZxMQzQ6Yyvl8P",

  "timestamp": "2025-02-10T08:26:05.961Z",

  "owners": \["60d5ec49f72b2a001f5f9d91"\],

  "followers": \["60d5ec49f72b2a001f5f9d93", "60d5ec49f72b2a001f5f9d94"\],

  "properties": \[

    {

      "key": "pet\_name",

      "valueString": "buddy"

    }

  \]

}

[Delete Record](#delete-record "Delete Record")[Overview](#overview "Overview")[Schema](#schema "Schema")[Explanation of Fields](#explanation-of-fields "Explanation of Fields")[Example Payload](#example-payload "Example Payload")