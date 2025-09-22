---
title: "PriceUpdate"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/d894abee643b0-price"
extracted_at: "2025-09-22T06:34:29.354Z"
---

# Price

Called whenever a price is updated

#### [

Schema

](#schema)

\_id

string

membershipOffers

array\[object\]

label

string

value

string

\_id

string

variantOptionIds

array\[string\]

locationId

string

product

string

userId

string

name

string

type

string

currency

string

amount

number

recurring

object

interval

string

intervalCount

number

createdAt

string

updatedAt

string

compareAtPrice

number

trackInventory

null

availableQuantity

number

allowOutOfStockPurchases

boolean

#### [

Example

](#example)

"\_id": "655b33aa2209e60b6adb87a7",

  "membershipOffers": \[

    {

      "label": "top\_50",

      "value": "50",

      "\_id": "655b33aa2209e60b6adb87a7"

    }

  \],

  "variantOptionIds": \[

    "h4z7u0im2q8",

    "h3nst2ltsnn"

  \],

  "locationId": "3SwdhCsvxI8Au3KsPJt6",

  "product": "655b33a82209e60b6adb87a5",

  "userId": "6YAtzfzpmHAdj0e8GkKp",

  "name": "Red / S",

  "type": "one\_time",

  "currency": "INR",

  "amount": 199999,

  "recurring": {

    "interval": "day",

    "intervalCount": 1

  },

  "createdAt": "2023-11-20T10:23:38.645Z",

  "updatedAt": "2024-01-23T09:57:04.852Z",

  "compareAtPrice": 2000000,

  "trackInventory": null,

  "availableQuantity": 5,

  "allowOutOfStockPurchases": true

}