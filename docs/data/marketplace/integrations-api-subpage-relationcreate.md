---
title: "RelationCreate"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/54b668f99aada-relation-create"
extracted_at: "2025-09-30T18:35:52.649Z"
---

# Relation Create

## [

Overview

](#overview)

This webhook response is triggered when an relation between objects is created.

For example, in a business management system, a company may want to establish an association between a custom object record and a contact. In this case:

-   The **second object** (contact) would represent a person associated with the custom object record.
-   The **first object** (custom object) could represent an entity such as a project or a transaction.
-   The system allows for dynamic relationships between entities, facilitating better data management.

## [

Schema

](#schema)

The webhook response follows the JSON schema below:

id

string

firstObjectKey

string

firstRecordId

string

secondObjectKey

string

secondRecordId

string

associationId

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
-   Unique identifier for the created association.

### [

`firstObjectKey`

](#firstobjectkey)

-   Type: `string`
-   Key representing the first object in the association.

### [

`firstRecordId`

](#firstrecordid)

-   Type: `string`
-   Identifier of the first object’s specific record.

### [

`secondObjectKey`

](#secondobjectkey)

-   Type: `string`
-   Key representing the second object in the association.

### [

`secondRecordId`

](#secondrecordid)

-   Type: `string`
-   Identifier of the second object’s specific record.

### [

`associationId`

](#associationid)

-   Type: `string`
-   Unique identifier for the association that was created.

### [

`locationId`

](#locationid)

-   Type: `string`
-   Identifies the location associated with the created association.

## [

Example Response

](#example-response)

{

  "id": "67ae0d741119d218c9d0c477",

  "firstObjectKey": "custom\_objects.mad",

  "firstRecordId": "67a349a79b28947ec1f65bb5",

  "secondObjectKey": "contact",

  "secondRecordId": "emqfhnG3g9D9chy9inTz",

  "associationId": "669e5795add2094075906c65",

  "locationId": "eHy2cOSZxMQzQ6Yyvl8P"

}

## [

Additional Notes

](#additional-notes)

-   The `firstObjectKey` and `secondObjectKey` define the relationship between the created entities.

[Relation Create](#relation-create "Relation Create")[Overview](#overview "Overview")[Schema](#schema "Schema")[Field Descriptions](#field-descriptions "Field Descriptions")[](#id)[](#firstobjectkey)[](#firstrecordid)[](#secondobjectkey)[](#secondrecordid)[](#associationid)[](#locationid)[Example Response](#example-response "Example Response")[Additional Notes](#additional-notes "Additional Notes")