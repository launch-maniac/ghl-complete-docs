---
title: "OrderStatusUpdate"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/9f1caf85e3890-order"
extracted_at: "2025-09-28T09:21:48.738Z"
---

# Order

Called whenever an order's status field updated

#### [

Schema

](#schema)

type

string

altId

string

altType

string

\_id

string

contactId

string

contactSnapshot

object

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

status

string

fulfillmentStatus

string

currency

string

amount

number

liveMode

boolean

items

array\[object\]

name

string

qty

number

product

object

price

object

amountSummary

object

discount

number

shipping

number

subtotal

number

tax

number

taxSummary

array\[object\]

\_id

string

amount

number

calculation

string

name

string

rate

number

source

object

id

string

name

string

type

string

subType

string

meta

object

createdAt

string

updatedAt

string

#### [

Example

](#example)

{

  "type": "OrderStatusUpdate",

  "locationId": "Z4Bxl8J4SaPEPLq9IQ8g",

  "\_id": "660ed43bfdf9fc05a0de7a40",

  "altId": "Z4Bxl8J4SaPEPLq9IQ8g",

  "altType": "location",

  "status": "completed",

  "taxSummary": \[

    {

      "\_id": "63770f5cecf298787c752075",

      "name": "10%",

      "calculation": "exclusive",

      "rate": 10,

      "amount": 12.1

    }

  \],

  "fulfillmentStatus": "unfulfilled",

  "contactId": "ff2JstbQJfRuofXzeT0M",

  "currency": "USD",

  "amount": 150.1,

  "liveMode": false,

  "amountSummary": {

    "subtotal": 138,

    "discount": 0,

    "tax": 12.1,

    "shipping": 0

  },

  "source": {

    "type": "website",

    "subType": "store",

    "id": "nohc1pPZJlpZTpxJfLCp",

    "name": "Ecom Store",

    "meta": {

      "stepId": "dca58f2c-943b-4a92-b591-5d79f37df0a1",

      "pageId": "IoJJMciJZIRBSzGZcjl4",

      "domain": "ghl.shareef.me",

      "pageUrl": "/checkout"

    }

  },

  "createdAt": "2024-04-04T16:24:27.036Z",

  "updatedAt": "2024-04-04T16:24:31.297Z",

  "contactSnapshot": {

    "id": "ff2JstbQJfRuofXzeT0M",

    "locationId": "Z4Bxl8J4SaPEPLq9IQ8g",

    "firstName": "Maxwell",

    "lastName": "Schmidt",

    "email": "limof@mailinator.com",

    "phone": "+2389372075506",

    "dnd": false,

    "source": "Ecom Store",

    "address1": "Velit consequuntur ",

    "city": "Eius eveniet provid",

    "state": "Ea provident volupt",

    "postalCode": "61131",

    "tags": \[\],

    "country": "CV",

    "dateAdded": "2024-04-04T16:24:21.375Z"

  },

  "items": \[

    {

      "name": "Men's classic tee - XL / Charcoal",

      "qty": 1,

      "product": {

        "\_id": "660ed1ff95e1dc88d5b0d346",

        "name": "Men's classic tee",

        "availableInStore": true,

        "taxes": \[\],

        "variants": \[

          {

            "id": "6xcxyf3ufjm",

            "name": "Size",

            "options": \[

              {

                "id": "pq72pwv2dd",

                "name": "S"

              },

              {

                "id": "oxyrtisnrch",

                "name": "M"

              },

              {

                "id": "e90dmjc49m7",

                "name": "L"

              },

              {

                "id": "100p40ngait",

                "name": "XL"

              },

              {

                "id": "1g0zjf4s57l",

                "name": "2XL"

              },

              {

                "id": "x3qgphbudz",

                "name": "3XL"

              },

              {

                "id": "4spdojmrhlh",

                "name": "4XL"

              }

            \]

          },

          {

            "id": "06to66ownvc5",

            "name": "Color",

            "options": \[

              {

                "id": "7uhq7ky7bge",

                "name": "Maroon"

              },

              {

                "id": "qeac76hvr1c",

                "name": "Black"

              },

              {

                "id": "yhgmvthkf49",

                "name": "Navy"

              },

              {

                "id": "plg4elfx0sq",

                "name": "Red"

              },

              {

                "id": "7etdl015ljk",

                "name": "Royal"

              },

              {

                "id": "yj1jw5ga5bk",

                "name": "Charcoal"

              }

            \]

          }

        \]

      },

      "price": {

        "\_id": "660ed20095e1dcd37bb0d392",

        "name": "XL / Charcoal",

        "type": "one\_time",

        "currency": "USD",

        "amount": 17,

        "variantOptionIds": \["100p40ngait", "yj1jw5ga5bk"\]

      }

    },

    {

      "name": "Tshirt - Green / S",

      "qty": 1,

      "product": {

        "\_id": "64f84dea1e2c5ae21f0714dd",

        "name": "Tshirt",

        "description": "<p>Here is the <span style=\\"color: rgb(206, 145, 120); color: rgb(206, 145, 120)\\">onDeleteMedia</span></p>",

        "availableInStore": true,

        "taxes": \[

          {

            "\_id": "63770f5cecf298787c752075",

            "calculation": "exclusive",

            "deleted": false,

            "altId": "Z4Bxl8J4SaPEPLq9IQ8g",

            "altType": "location",

            "name": "10%",

            "rate": 10,

            "createdAt": "2022-11-18T04:51:40.067Z",

            "updatedAt": "2022-11-18T04:51:40.067Z",

            "\_\_v": 0

          }

        \],

        "variants": \[

          {

            "id": "mhpty6azkx",

            "name": "Color",

            "options": \[

              {

                "id": "j1kri8rtkz",

                "name": "Red"

              },

              {

                "id": "qxd87i00pr",

                "name": "Green"

              }

            \]

          },

          {

            "id": "14ykjkzqfe",

            "name": "Size",

            "options": \[

              {

                "id": "nk794wey5a",

                "name": "S"

              }

            \]

          }

        \]

      },

      "price": {

        "\_id": "64f84dec1e2c5ae21f0714e1",

        "name": "Green / S",

        "type": "one\_time",

        "currency": "USD",

        "amount": 121,

        "variantOptionIds": \["qxd87i00pr", "nk794wey5a"\]

      }

    }

  \]

}