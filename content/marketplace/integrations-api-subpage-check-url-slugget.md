---
title: "Check url slugget"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/12bccbf6f8881-check-url-slug"
extracted_at: "2025-10-05T18:23:25.976Z"
---

# Check url slug

get

https://services.leadconnectorhq.com/blogs/posts/url-slug-exists

The "Check url slug" API allows check the blog slug validation which is needed before publishing any blog post. Please use blogs/check-slug.readonly. you can find the POST ID from the post edit url.

## [

Request

](#Request)

Security: Bearer Auth

### [

Query Parameters

](#Query-Parameters)

postId

string

Examples:

66f429b8afdce84227a4610d

locationId

string

required

Examples:

ve9EPM428h8vShlRW1KT

urlSlug

string

required

### [

Headers

](#request-headers)

Authorization

string

required

Access Token

Example:

Bearer 9c48df2694a849b6089f9d0d3513ef

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

exists

boolean

required

Indicates whether the url slug exists or not

Auth

Token:

Parameters

locationId\*:

urlSlug\*:

postId:

Authorization\*:

Version\*:

2021-07-28

2021-07-28

Send API Request

Live Server

Request Sample: Shell / cURL

curl --request GET \\

  --url 'https://services.leadconnectorhq.com/blogs/posts/url-slug-exists?locationId=ve9EPM428h8vShlRW1KT' \\

  --header 'Accept: application/json' \\

  --header 'Authorization: Bearer 123' \\

  --header 'Version: 2021-07-28'

Response Example

1

{

2

  "exists": true

3

}