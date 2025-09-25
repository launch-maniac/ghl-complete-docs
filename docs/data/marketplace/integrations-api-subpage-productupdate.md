---
title: "ProductUpdate"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/442a01f1c6d9c-product"
extracted_at: "2025-09-25T06:33:33.165Z"
---

# Product

Called whenever a product is updated

#### [

Schema

](#schema)

\_id

string

description

string

variants

array\[object\]

id

string

name

string

options

array\[object\]

medias

array\[object\]

id

string

title

string

url

string

type

string

isFeatured

boolean

locationId

string

name

string

productType

string

availableInStore

boolean

userId

string

createdAt

string

updatedAt

string

statementDescriptor

string

image

string

#### [

Example

](#example)

{

  "\_id": "655b33a82209e60b6adb87a5",

  "description": "This is a really awesome product",

  "variants": \[

    {

      "id": "38s63qmxfr4",

      "name": "Size",

      "options": \[

        {

          "id": "h4z7u0im2q8",

          "name": "XL"

        }

      \]

    }

  \],

  "medias": \[

    {

      "id": "fzrgusiuu0m",

      "title": "1dd7dcd0-e71d-4cf7-a06b-6d47723d6a29.png",

      "url": "https://storage.googleapis.com/ghl-test/3SwdhCsvxI8Au3KsPJt6/media/sample.png",

      "type": "image",

      "isFeatured": true

    }

  \],

  "locationId": "3SwdhCsvxI8Au3KsPJt6",

  "name": "Awesome Product",

  "productType": "PHYSICAL",

  "availableInStore": true,

  "userId": "6YAtzfzpmHAdj0e8GkKp",

  "createdAt": "2023-11-20T10:23:36.515Z",

  "updatedAt": "2024-01-23T09:57:04.846Z",

  "statementDescriptor": "abcde",

  "image": "https://storage.googleapis.com/ghl-test/3SwdhCsvxI8Au3KsPJt6/media/65af8d5df88bdb4b1022ee90.png"

}