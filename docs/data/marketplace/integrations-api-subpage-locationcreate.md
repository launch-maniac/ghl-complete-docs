---
title: "LocationCreate"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/4sn3a9hsczi43-location"
extracted_at: "2025-09-21T03:50:28.725Z"
---

# Location

Called whenever a location is created.

> Available only to Agency Level Apps.

#### [

Schema

](#schema)

type

string

id

string

name

string

email

string

stripeProductId

string

companyId

string

#### [

Example

](#example)

{

  "type": "LocationCreate",

  "id": "ve9EPM428h8vShlRW1KT",

  "companyId": "otg8dTQqGLh3Q6iQI55w",

  "name": "Loram ipsum",

  "email": "mailer@example.com",

  "stripeProductId": "prod\_xyz123abc"

}