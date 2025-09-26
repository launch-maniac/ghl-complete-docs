---
title: "Get all categoriesget"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/8ebd3128ee462-get-all-categories"
extracted_at: "2025-09-26T06:26:07.544Z"
---

# Get all categories

get

https://services.leadconnectorhq.com/blogs/categories

The "Get all categories" Api return the blog categoies for a given location ID. Please use "blogs/category.readonly"

## [

Request

](#Request)

Security: Bearer Auth

### [

Query Parameters

](#Query-Parameters)

limit

number

required

Number of categories to show in the listing

locationId

string

required

Examples:

ve9EPM428h8vShlRW1KT

offset

number

required

Number of categories to skip in listing

### [

Headers

](#request-headers)

Authorization

string

required

Access Token

Example:

Bearer 9c48df2694a849b6089f9d0d3513efe

Version

string

required

API Version

Allowed value:

2021-07-28

## [

Responses

](#Responses)

200

400

401

422

Successful response

### [

Body

](#response-body)

application/json

application/json

responses

/

200

categories

array\[object\]

required

Array of categories

\_id

string

required

Example:

lMOzIQZne5m6zQ528sT6

label

string

Example:

HighLevel

locationId

string

required

Example:

lMOzIQZne5m6zQ528sT6

updatedAt

string

required

Example:

2025-01-03T11:06:35.822Z

canonicalLink

string

required

Example:

https://tryghl.blog/doc/category/agency-growth

urlSlug

string

required

Example:

agency-growth

Auth

Token:

Parameters

limit\*:

locationId\*:

offset\*:

Authorization\*:

Version\*:

2021-07-28

2021-07-28

Send API Request

Live Server

Request Sample: Shell / cURL

curl --request GET \\

  --url 'https://services.leadconnectorhq.com/blogs/categories?locationId=ve9EPM428h8vShlRW1KT' \\

  --header 'Accept: application/json' \\

  --header 'Authorization: Bearer 123' \\

  --header 'Version: 2021-07-28'

Response Example

1

{

2

  "categories": \[

3

    {

4

      "\_id": "lMOzIQZne5m6zQ528sT6",

5

      "label": "HighLevel",

6

      "locationId": "lMOzIQZne5m6zQ528sT6",

7

      "updatedAt": "2025-01-03T11:06:35.822Z",

8

      "canonicalLink": "https://tryghl.blog/doc/category/agency-growth",

9

      "urlSlug": "agency-growth"

10

    }

11

  \]

12

}