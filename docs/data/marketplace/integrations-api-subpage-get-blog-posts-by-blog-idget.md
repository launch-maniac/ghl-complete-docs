---
title: "Get Blog posts by Blog IDget"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/b8beb7b0883e6-get-blog-posts-by-blog-id"
extracted_at: "2025-09-22T12:29:07.105Z"
---

# Get Blog posts by Blog ID

get

https://services.leadconnectorhq.com/blogs/posts/all

The "Get Blog posts by Blog ID" API allows you get blog posts for any given blog site using blog ID.Please use blogs/posts.readonly

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

status

string

Allowed values:

PUBLISHEDSCHEDULEDARCHIVEDDRAFT

Examples:

PUBLISHED

blogId

string

required

Examples:

66f429b8afdce84227a4610d

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

offset

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

blogs

array\[object\]

required

Object containing response data of blog posts

categories

array\[string\]

required

Array of category IDs associated with the blog post

Example:

\["659ecabc4a37969a2b7cc370","6683abde331c041f32c07aee"\]

tags

array\[string\]

Array of tags associated with the blog post

Example:

\["Apple","Banana"\]

archived

boolean

required

Indicates whether the blog post is archived

Example:

false

\_id

string

required

Unique identifier of the blog post

Example:

66c381b38be80858b9af62b6

title

string

required

Title of the blog post

Example:

Banana is good source of energy

description

string

required

Description of the blog post

Example:

Description

imageUrl

string

required

URL of the image associated with the blog post

Example:

https://storage.googleapis.com/ghl-test/fACm0Ojm5oC70G3DcFmE/media/66b5aa3b1745b2713a8d033f.jpeg

status

string

required

Publication status of the blog post

Example:

PUBLISHED

imageAltText

string

required

Alternative text for the blog post image

Example:

alt

urlSlug

string

required

URL slug for the blog post

Example:

banana-good-energy

canonicalLink

string

Canonical link of the blog post

Example:

https://blog.chatgpts.agency/post/test-8384

author

string

Identifier of the author of the blog post

Example:

659ec9634a3796e4e47cc360

publishedAt

string

required

Timestamp when the blog post was published

Example:

2024-08-19T17:14:57.000Z

updatedAt

string

required

Timestamp when the blog post was last updated

Example:

2024-08-19T17:32:36.182Z

Auth

Token:

Parameters

blogId\*:

limit\*:

locationId\*:

offset\*:

searchTerm:

status:

Not SetPUBLISHEDSCHEDULEDARCHIVEDDRAFT

select an option

Authorization\*:

Version\*:

2021-07-28

2021-07-28

Send API Request

Live Server

Request Sample: Shell / cURL

curl --request GET \\

  --url 'https://services.leadconnectorhq.com/blogs/posts/all?locationId=ve9EPM428h8vShlRW1KT&blogId=66f429b8afdce84227a4610d&limit=4&offset=0' \\

  --header 'Accept: application/json' \\

  --header 'Authorization: Bearer 123' \\

  --header 'Version: 2021-07-28'

Response Example

1

{

2

  "blogs": \[

3

    {

4

      "categories": \[

5

        "659ecabc4a37969a2b7cc370",

6

        "6683abde331c041f32c07aee"

7

      \],

8

      "tags": \[

9

        "Apple",

10

        "Banana"

11

      \],

12

      "archived": false,

13

      "\_id": "66c381b38be80858b9af62b6",

14

      "title": "Banana is good source of energy",

15

      "description": "Description",

16

      "imageUrl": "https://storage.googleapis.com/ghl-test/fACm0Ojm5oC70G3DcFmE/media/66b5aa3b1745b2713a8d033f.jpeg",

17

      "status": "PUBLISHED",

18

      "imageAltText": "alt",

19

      "urlSlug": "banana-good-energy",

20

      "canonicalLink": "https://blog.chatgpts.agency/post/test-8384",

21

      "author": "659ec9634a3796e4e47cc360",

22

      "publishedAt": "2024-08-19T17:14:57.000Z",

23

      "updatedAt": "2024-08-19T17:32:36.182Z"

24

    }

25

  \]

26

}