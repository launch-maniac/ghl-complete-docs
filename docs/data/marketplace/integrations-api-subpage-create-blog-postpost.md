---
title: "Create Blog Postpost"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/c24ff055e7cf8-create-blog-post"
extracted_at: "2025-10-02T12:27:36.800Z"
---

# Create Blog Post

post

https://services.leadconnectorhq.com/blogs/posts

The "Create Blog Post" API allows you create blog post for any given blog site. Please use blogs/post.write

## [

Request

](#Request)

Security: Bearer Auth

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

### [

Body

](#request-body)

application/json

application/json

title

string

required

Example:

Your blog title

locationId

string

required

Example:

Location ID

blogId

string

required

You can find the blog id from blog site dashboard link

Example:

Blog ID

imageUrl

string

required

Example:

Image URl

description

string

required

Example:

A short description

rawHTML

string

required

Example:

<h1>Your blog content</h1>

status

string

required

Allowed values:

DRAFTPUBLISHEDSCHEDULEDARCHIVED

Example:

This can be PUBLISHED OR SCHEDULED OR ARCHIVED OR DRAFT

imageAltText

string

required

Example:

Alt text for your blog image

categories

array\[string\]

required

This needs to be array of category ids, which you can get from the category get api call.

Example:

\["9c48df2694a849b6089f9d0d3513efe","6683abde331c041f32c07aee"\]

tags

array\[string\]

Example:

\["blog","seo"\]

author

string

required

This needs to be author id, which you can get from the author get api call.

Example:

6683abde331c041f32c07aea

urlSlug

string

required

Example:

any-blog-post-url

canonicalLink

string

Example:

https://tryghl.blog/post/testing-unsplash

publishedAt

string

required

Provide ISO timestamp

Example:

2025-02-05T18:30:47.000Z

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

object

required

Object containing response data of blog post create.

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

Authorization\*:

Version\*:

2021-07-28

2021-07-28

Body

{ "title": "Your blog title", "locationId": "Location ID", "blogId": "Blog ID", "imageUrl": "Image URl", "description": "A short description", "rawHTML": "<h1>Your blog content</h1>", "status": "DRAFT", "imageAltText": "Alt text for your blog image", "categories": \[ "9c48df2694a849b6089f9d0d3513efe", "6683abde331c041f32c07aee" \], "tags": \[ "blog", "seo" \], "author": "6683abde331c041f32c07aea", "urlSlug": "any-blog-post-url", "canonicalLink": "https://tryghl.blog/post/testing-unsplash", "publishedAt": "2025-02-05T18:30:47.000Z" }

1

{

2

  "title": "Your blog title",

3

  "locationId": "Location ID",

4

  "blogId": "Blog ID",

5

  "imageUrl": "Image URl",

6

  "description": "A short description",

7

  "rawHTML": "<h1>Your blog content</h1>",

8

  "status": "DRAFT",

9

  "imageAltText": "Alt text for your blog image",

10

  "categories": \[

11

    "9c48df2694a849b6089f9d0d3513efe",

12

    "6683abde331c041f32c07aee"

13

  \],

14

  "tags": \[

15

    "blog",

16

    "seo"

17

  \],

18

  "author": "6683abde331c041f32c07aea",

19

  "urlSlug": "any-blog-post-url",

20

  "canonicalLink": "https://tryghl.blog/post/testing-unsplash",

21

  "publishedAt": "2025-02-05T18:30:47.000Z"

22

}

/\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

.sl-code-editor\[id="react-aria-2-16"\] textarea { padding-left: 28px !important; word-break: break-all !important; }

Send API Request

Live Server

Request Sample: Shell / cURL

curl --request POST \\

  --url https://services.leadconnectorhq.com/blogs/posts \\

  --header 'Accept: application/json' \\

  --header 'Authorization: Bearer 123' \\

  --header 'Content-Type: application/json' \\

  --header 'Version: 2021-07-28' \\

  --data '{

  "title": "Your blog title",

  "locationId": "Location ID",

  "blogId": "Blog ID",

  "imageUrl": "Image URl",

  "description": "A short description",

  "rawHTML": "<h1>Your blog content</h1>",

  "status": "DRAFT",

  "imageAltText": "Alt text for your blog image",

  "categories": \[

    "9c48df2694a849b6089f9d0d3513efe",

    "6683abde331c041f32c07aee"

  \],

  "tags": \[

    "blog",

    "seo"

  \],

  "author": "6683abde331c041f32c07aea",

  "urlSlug": "any-blog-post-url",

  "canonicalLink": "https://tryghl.blog/post/testing-unsplash",

  "publishedAt": "2025-02-05T18:30:47.000Z"

}'

Response Example

1

{

2

  "data": {

3

    "categories": \[

4

      "659ecabc4a37969a2b7cc370",

5

      "6683abde331c041f32c07aee"

6

    \],

7

    "tags": \[

8

      "Apple",

9

      "Banana"

10

    \],

11

    "archived": false,

12

    "\_id": "66c381b38be80858b9af62b6",

13

    "title": "Banana is good source of energy",

14

    "description": "Description",

15

    "imageUrl": "https://storage.googleapis.com/ghl-test/fACm0Ojm5oC70G3DcFmE/media/66b5aa3b1745b2713a8d033f.jpeg",

16

    "status": "PUBLISHED",

17

    "imageAltText": "alt",

18

    "urlSlug": "banana-good-energy",

19

    "canonicalLink": "https://blog.chatgpts.agency/post/test-8384",

20

    "author": "659ec9634a3796e4e47cc360",

21

    "publishedAt": "2024-08-19T17:14:57.000Z",

22

    "updatedAt": "2024-08-19T17:32:36.182Z"

23

  }

24

}