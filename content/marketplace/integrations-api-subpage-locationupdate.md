---
title: "LocationUpdate"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/69nmspzfqtcdk-location"
extracted_at: "2025-10-07T03:39:38.713Z"
---

# Location

Called whenever a location is updated.

> Available to Agency Level Apps for all sub-accounts or to specific sub-accounts.

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

  "type": "LocationUpdate",

  "id": "ve9EPM428h8vShlRW1KT",

  "companyId": "otg8dTQqGLh3Q6iQI55w",

  "name": "Loram ipsum",

  "email": "mailer@example.com",

  "stripeProductId": "prod\_xyz123abc"

}