---
title: "InvoiceSent"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/287f2b117bf2a-invoice"
extracted_at: "2025-10-06T00:57:46.506Z"
---

# Invoice

Called whenever an invoice is sent

#### [

Schema

](#schema)

\_id

string

status

string

liveMode

boolean

amountPaid

number

altId

string

altType

string

name

string

businessDetails

object

name

string

address

string

phoneNo

string

website

string

logoUrl

string

customValues

array\[string\]

invoiceNumber

string

currency

string

contactDetails

object

id

string

phoneNo

string

email

string

customFields

array\[string\]

name

string

address

object

additionalEmails

array\[object\]

companyName

string

issueDate

string

dueDate

string

discount

object

type

string

value

number

invoiceItems

array\[object\]

taxes

array

\_id

string

productId

string

priceId

string

currency

string

name

string

qty

number

amount

number

total

number

title

string

amountDue

number

createdAt

string

updatedAt

string

totalSummary

object

subTotal

number

discount

number

#### [

Example

](#example)

{

  "\_id": "6578278e879ad2646715ba9c",

  "status": "sent",

  "liveMode": false,

  "amountPaid": 0,

  "altId": "6578278e879ad2646715ba9c",

  "altType": "location",

  "name": "New Invoice",

  "businessDetails": {

    "name": "ABC Corp.",

    "address": "9931 Beechwood, TX",

    "phoneNo": "+1-214-559-6993",

    "website": "wwww.example.com",

    "logoUrl": "https://example.com/logo.png",

    "customValues": \["string"\]

  },

  "invoiceNumber": "19",

  "currency": "USD",

  "contactDetails": {

    "id": "6578278e879ad2646715ba9c",

    "phoneNo": "+1-214-559-6993",

    "email": "alex@example.com",

    "customFields": \["string"\],

    "name": "Alex",

    "address": {

      "countryCode": "US",

      "addressLine1": "9931 Beechwood",

      "addressLine2": "Beechwood",

      "city": "St. Houston",

      "state": "TX",

      "postalCode": "559-6993"

    },

    "additionalEmails": \[

      {

        "email": "alex@example.com"

      }

    \],

    "companyName": "ABC Corp."

  },

  "issueDate": "2023-01-01",

  "dueDate": "2023-01-01",

  "discount": {

    "type": "percentage",

    "value": 10

  },

  "invoiceItems": \[

    {

      "taxes": \[\],

      "\_id": "c6tZZU0rJBf30ZXx9Gli",

      "productId": "c6tZZU0rJBf30ZXx9Gli",

      "priceId": "c6tZZU0rJBf30ZXx9Gli",

      "currency": "USD",

      "name": "Macbook Pro",

      "qty": 1,

      "amount": 999

    }

  \],

  "total": 999,

  "title": "INVOICE",

  "amountDue": 999,

  "createdAt": "2023-12-12T09:27:42.355Z",

  "updatedAt": "2023-12-12T09:27:42.355Z",

  "totalSummary": {

    "subTotal": 999,

    "discount": 0

  }

}