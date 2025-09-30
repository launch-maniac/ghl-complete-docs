---
title: "Get Blogs by Location IDget"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/14987af581f3d-get-blogs-by-location-id"
extracted_at: "2025-09-30T18:25:54.860Z"
---

# Get Blogs by Location ID

get

https://services.leadconnectorhq.com/blogs/site/all

The "Get Blogs by Location ID" API allows you get blogs using Location ID.Please use blogs/list.readonly

## [

Request

](#Request)

Security: Bearer Auth

### [

Query Parameters

](#Query-Parameters)

searchTerm

string

search for any post by name

Examples:

ai news

limit

number

required

Examples:

4

locationId

string

required

Examples:

ve9EPM428h8vShlRW1KT

skip

number

required

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

data

array\[object\]

required

Object containing response data of blog

\_id

string

required

Unique identifier of the blog

Example:

lMOzIQZne5m6zQ528sT6

name

string

required

Name of the blog

Example:

My blog

Auth

Token:

Parameters

limit\*:

locationId\*:

skip\*:

searchTerm:

Authorization\*:

Version\*:

2021-07-28

2021-07-28

Send API Request

Live Server

Request Sample: Shell / cURL

curl --request GET \\

  --url 'https://services.leadconnectorhq.com/blogs/site/all?locationId=ve9EPM428h8vShlRW1KT&skip=0&limit=4' \\

  --header 'Accept: application/json' \\

  --header 'Authorization: Bearer 123' \\

  --header 'Version: 2021-07-28'

Response Example

1

{

2

  "data": \[

3

    {

4

      "\_id": "lMOzIQZne5m6zQ528sT6",

5

      "name": "My blog"

6

    }

7

  \]

8

}