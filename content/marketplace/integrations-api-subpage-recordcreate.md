---
title: "RecordCreate"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/eaa107154bbc4-record-create"
extracted_at: "2025-09-21T03:54:27.223Z"
---

# Record Create

## [

Overview

](#overview)

This webhook response is triggered when a new record or business is created.

## [

Schema

](#schema)

The webhook response follows the JSON schema below:

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

Field Descriptions

](#field-descriptions)

### [

`type`

](#type)

-   Type: `string`
-   Indicates the type of record created.

### [

`locationId`

](#locationid)

-   Type: `string`
-   Identifies the location associated with the created record.

### [

`owners`

](#owners)

-   Type: `array of strings`
-   Represents the unique identifiers of users who own the record.

### [

`followers`

](#followers)

-   Type: `array of strings`
-   List of users who are following the record for updates.

### [

`properties`

](#properties)

-   Type: `array of objects`
-   Contains key-value pairs representing additional details about the record.
    -   **`key`**: The property name.
    -   **`valueString`**: The corresponding value as a string.

### [

`id`

](#id)

-   Type: `string`
-   Unique identifier for the created record.

### [

`timestamp`

](#timestamp)

-   Type: `string`
-   Format: `date-time`
-   Represents the date and time when the record was created.

## [

Example Response

](#example-response)

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

## [

Additional Notes

](#additional-notes)

-   Ensure that your webhook listener is capable of processing `POST` requests.
-   The `owners` and `followers` fields help in managing record access and tracking.
-   The `properties` array allows extensibility by enabling dynamic field storage.

* * *

[Record Create](#record-create "Record Create")[Overview](#overview "Overview")[Schema](#schema "Schema")[Field Descriptions](#field-descriptions "Field Descriptions")[](#type)[](#locationid)[](#owners)[](#followers)[](#properties)[](#id)[](#timestamp)[Example Response](#example-response "Example Response")[Additional Notes](#additional-notes "Additional Notes")