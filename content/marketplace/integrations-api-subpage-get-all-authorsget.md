---
title: "Get all authorsget"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/2ad8896e803e7-get-all-authors"
extracted_at: "2025-09-28T18:23:11.507Z"
---

# Get all authors

get

https://services.leadconnectorhq.com/blogs/authors

The "Get all authors" Api return the blog authors for a given location ID. Please use "blogs/author.readonly"

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

Number of authors to show in the listing

Examples:

5

locationId

string

required

Location Id

Examples:

ve9EPM428h8vShlRW1KT

offset

number

required

Number of authors to skip in listing

Examples:

0

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

authors

array\[object\]

required

Array of authors

\_id

string

required

Example:

lMOzIQZne5m6zQ528sT6

name

string

required

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

https://tryghl.blog/post/technology

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

  --url 'https://services.leadconnectorhq.com/blogs/authors?locationId=ve9EPM428h8vShlRW1KT&limit=5&offset=0' \\

  --header 'Accept: application/json' \\

  --header 'Authorization: Bearer 123' \\

  --header 'Version: 2021-07-28'

Response Example

1

{

2

  "authors": \[

3

    {

4

      "\_id": "lMOzIQZne5m6zQ528sT6",

5

      "name": "HighLevel",

6

      "locationId": "lMOzIQZne5m6zQ528sT6",

7

      "updatedAt": "2025-01-03T11:06:35.822Z",

8

      "canonicalLink": "https://tryghl.blog/post/technology"

9

    }

10

  \]

11

}