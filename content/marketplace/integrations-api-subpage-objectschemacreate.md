---
title: "ObjectSchemaCreate"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/5838fbea129d7-object-schema-create"
extracted_at: "2025-10-03T00:59:42.059Z"
---

# Object Schema Create

## [

Overview

](#overview)

The **Object Schema Create** is triggered whenever a custom object is created. This webhook allows systems to listen for new custom objects and take appropriate actions based on the event.

## [

Schema

](#schema)

The webhook payload follows the JSON schema below:

labels

object

description

string

searchableProperties

array

primaryDisplayProperty

string

key

string

locationId

string

createdBy

object

updatedBy

object

timestamp

string<date-time>

objectType

string

Allowed value:

USER\_DEFINED

Default:

USER\_DEFINED

## [

Field Descriptions

](#field-descriptions)

### [

`labels`

](#labels)

An object that defines the human-readable names associated with the custom object.

-   **`singular`**: The name of the object in singular form (e.g., `"pet"`).
-   **`plural`**: The name of the object in plural form (e.g., `"pets"`).

### [

`description`

](#description)

-   Type: `string`
-   A brief explanation of the custom object.

### [

`searchableProperties`

](#searchableproperties)

-   Type: `array`
-   List of properties that are indexed for search.

### [

`primaryDisplayProperty`

](#primarydisplayproperty)

-   Type: `string`
-   Required: ✅
-   The key property used to display the custom object.

### [

`key`

](#key)

-   Type: `string`
-   Required: ✅
-   Unique identifier for the custom object type.

### [

`locationId`

](#locationid)

-   Type: `string`
-   Required: ✅
-   Identifies the location associated with the custom object.

### [

`createdBy`

](#createdby)

-   Type: `object`
-   Metadata about the user who created the object.

### [

`updatedBy`

](#updatedby)

-   Type: `object`
-   Metadata about the user who last updated the object.

### [

`timestamp`

](#timestamp)

-   Type: `string`
-   Format: `date-time`
-   The date and time when the object was created.

### [

`objectType`

](#objecttype)

-   Type: `string`
-   Default: `"USER_DEFINED"`
-   Specifies the type of object, currently supports only `USER_DEFINED`.

## [

Example Payload

](#example-payload)

{

  "id": "6798a1a18fc746e0eba2ccfe",

  "labels": {

    "singular": "pet",

    "plural": "pets"

  },

  "description": "Pet's Description",

  "searchableProperties": \[

    "custom\_objects.pets.pet\_name"

  \],

  "primaryDisplayProperty": "custom\_objects.pets.pet\_name",

  "key": "custom\_objects.pets",

  "locationId": "eHy2cOSZxMQzQ6Yyvl8P",

  "updatedAt": "2025-01-28T09:21:37.311Z",

  "createdAt": "2025-01-28T09:21:37.311Z",

  "objectType": "USER\_DEFINED",

  "timestamp": "2025-02-10T08:26:05.961Z"

}

## [

Additional Notes

](#additional-notes)

-   Ensure your webhook listener is set up to handle `POST` requests.
-   The payload format may change in future versions; check for updates regularly.
-   The `key` field should be unique within a given `locationId`.

* * *

[Object Schema Create](#object-schema-create "Object Schema Create")[Overview](#overview "Overview")[Schema](#schema "Schema")[Field Descriptions](#field-descriptions "Field Descriptions")[](#labels)[](#description)[](#searchableproperties)[](#primarydisplayproperty)[](#key)[](#locationid)[](#createdby)[](#updatedby)[](#timestamp)[](#objecttype)[Example Payload](#example-payload "Example Payload")[Additional Notes](#additional-notes "Additional Notes")