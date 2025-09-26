---
title: "Get List of Filesget"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/0a4bf8cac58a9-get-list-of-files"
extracted_at: "2025-09-26T06:25:15.778Z"
---

# Get List of Files

get

https://services.leadconnectorhq.com/medias/files

Fetches list of files and folders from the media library

## [

Request

](#Request)

Security: Bearer Auth

### [

Query Parameters

](#Query-Parameters)

limit

string

Number of files to show in the listing

Examples:

10

offset

string

Number of files to skip in listing

Examples:

5

query

string

Query text

Examples:

Test file

type

string

Type

Examples:

file

altId

string

required

location or agency Id

altType

string

required

AltType

Allowed values:

agencylocation

Examples:

location

sortBy

string

required

Field to sorting the file listing by

Examples:

createdAt

sortOrder

string

required

Direction in which file needs to be sorted

Examples:

asc

parentId

string

parent id or folder id

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

Successful response

### [

Body

](#response-body)

application/json

application/json

responses

/

200

files

array\[string\]

required

Array of File Objects

Example:

{"altId":"locationId","altType":"location","name":"file name","parentId":"parent folder id","url":"file url","path":"file path"}

Auth

Token:

Parameters

altId\*:

altType\*:

agencylocation

location

sortBy\*:

sortOrder\*:

limit:

offset:

parentId:

query:

type:

Authorization\*:

Version\*:

2021-07-28

2021-07-28

Send API Request

Live Server

Request Sample: Shell / cURL

curl --request GET \\

  --url 'https://services.leadconnectorhq.com/medias/files?sortBy=createdAt&sortOrder=asc&altType=location' \\

  --header 'Accept: application/json' \\

  --header 'Authorization: Bearer 123' \\

  --header 'Version: 2021-07-28'

Response Example

1

{

2

  "files": {

3

    "altId": "locationId",

4

    "altType": "location",

5

    "name": "file name",

6

    "parentId": "parent folder id",

7

    "url": "file url",

8

    "path": "file path"

9

  }

10

}