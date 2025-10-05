---
title: "ContactDndUpdate"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/3f5bd46e27550-contact"
extracted_at: "2025-10-05T06:28:32.370Z"
---

# Contact

Called whenever a contact's dnd field is updated

#### [

Schema

](#schema)

type

string

locationId

string

id

string

address1

string

city

string

companyName

string

country

string

source

string

dateAdded

string

dateOfBirth

string

dnd

boolean

dndSettings

object

SMS

object

Email

object

GMB

object

FB

object

WhatsApp

object

Call

object

email

string

name

string

firstName

string

lastName

string

phone

string

postalCode

string

state

string

tags

array

website

string

attachments

array

assignedTo

string

customFields

array\[object\]

id

string

value

string or number or array or object

#### [

Example

](#example)

{

  "type": "ContactDndUpdate",

  "locationId": "ve9EPM428h8vShlRW1KT",

  "id": "nmFmQEsNgz6AVpgLVUJ0",

  "address1": "3535 1st St N",

  "city": "ruDolomitebika",

  "state": "AL",

  "companyName": "Loram ipsum",

  "country": "DE",

  "source": "xyz form",

  "dateAdded": "2021-11-26T12:41:02.193Z",

  "dateOfBirth": "2000-01-05T00:00:00.000Z",

  "dnd": true,

  "dndSettings": {

    "SMS": {

      "status": "inactive",

      "message": "Some message",

      "code": "101"

    },

    "Call": {

      "status": "inactive",

      "message": "Some message",

      "code": "101"

    },

    "Email": {

      "status": "active",

      "message": "Some message",

      "code": "101"

    },

    "GMB": {

      "status": "active",

      "message": "Some message",

      "code": "101"

    },

    "FB": {

      "status": "active",

      "message": "Some message",

      "code": "101"

    },

    "WhatsApp": {

      "status": "active",

      "message": "Some message",

      "code": "101"

    }

  },

  "email": "JohnDeo@gmail.comm",

  "name": "John Deo",

  "firstName": "John",

  "lastName": "Deo",

  "phone": "+919509597501",

  "postalCode": "452001",

  "tags": \["id magna sed Lorem", "Duis dolor commodo aliqua"\],

  "website": "https://www.google.com/",

  "attachments": \[\],

  "assignedTo": "nmFmQEsNgz6AVpgLVUJ0",

  "customFields": \[

    {

      "id": "BcdmQEsNgz6AVpgLVUJ0",

      "value": "XYZ Corp"

    }

  \]

}