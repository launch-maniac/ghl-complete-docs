---
title: "AssociationCreate"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/6515428358733-association-created"
extracted_at: "2025-09-25T01:02:53.476Z"
---

# Association Created

## [

Overview

](#overview)

This webhook response is triggered when a new association is created between objects, such as linking contacts to custom objects. Currently, only contact-to-contact , contact to custom object and custom object to custom object associations are supported. There are plans to expand support for additional associations in the future.

For example, in a real estate system, a company may want to associate potential buyers with specific properties. In this case:

-   The **first object** (buyer) would be a custom object representing the interested person.
-   The **second object** (property) would be a custom object representing the real estate listing.
-   The **association label** might be "Interested Buyer," indicating that the buyer has shown interest in the property.
-   The system could store multiple buyers per property (many-to-many relationship), allowing for flexible tracking of interest.

## [

Schema

](#schema)

The webhook response follows the JSON schema below:

id

string

associationType

string

firstObjectKey

string

firstObjectLabel

string

secondObjectKey

string

secondObjectLabel

string

key

string

locationId

string

## [

Field Descriptions

](#field-descriptions)

### [

`id`

](#id)

-   Type: `string`
-   Unique identifier for the association.

### [

`associationType`

](#associationtype)

-   Type: `string`
-   Specifies the type of association (e.g., `USER_DEFINED` or `SYSTEM_DEFINED`).

### [

`firstObjectKey`

](#firstobjectkey)

-   Type: `string`
-   Key representing the first object in the association.

### [

`firstObjectLabel`

](#firstobjectlabel)

-   Type: `string`
-   Readable label for the first object.

### [

`secondObjectKey`

](#secondobjectkey)

-   Type: `string`
-   Key representing the second object in the association.

### [

`secondObjectLabel`

](#secondobjectlabel)

-   Type: `string`
-   Readable label for the second object.

### [

`key`

](#key)

-   Type: `string`
-   Unique key assigned to the association.

### [

`locationId`

](#locationid)

-   Type: `string`
-   Identifies the location associated with the created association.

## [

Example Response

](#example-response)

{

  "id": "67ade73d1119d2ac7ad0c475",

  "associationType": "USER\_DEFINED",

  "firstObjectKey": "custom\_objects.real\_estate\_buyer",

  "firstObjectLabel": "Interested Buyer",

  "secondObjectKey": "custom\_objects.property",

  "secondObjectLabel": "Property",

  "key": "buyer\_property\_interest",

  "locationId": "eHy2cOSZxMQzQ6Yyvl8P"

}

## [

Additional Notes

](#additional-notes)

-   Ensure that your webhook listener is capable of processing `POST` requests.
-   The `firstObjectKey` and `secondObjectKey` help define relationships between entities.
-   The `traceId` is useful for debugging and logging purposes.

[Association Created](#association-created "Association Created")[Overview](#overview "Overview")[Schema](#schema "Schema")[Field Descriptions](#field-descriptions "Field Descriptions")[](#id)[](#associationtype)[](#firstobjectkey)[](#firstobjectlabel)[](#secondobjectkey)[](#secondobjectlabel)[](#key)[](#locationid)[Example Response](#example-response "Example Response")[Additional Notes](#additional-notes "Additional Notes")