---
title: "ContactUpdate"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/7e676c417682f-contact"
extracted_at: "2025-10-04T00:53:10.248Z"
---

# Contact

Called whenever the specific fields in contact is updated

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

  "type": "ContactUpdate",

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