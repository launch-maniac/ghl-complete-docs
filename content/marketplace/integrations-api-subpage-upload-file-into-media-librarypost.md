---
title: "Upload File into Media Librarypost"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/f737851451054-upload-file-into-media-library"
extracted_at: "2025-09-21T09:13:12.384Z"
---

# Upload File into Media Library

post

https://services.leadconnectorhq.com/medias/upload-file

If hosted is set to true then fileUrl is required. Else file is required. If adding a file, maximum allowed is 25 MB

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

multipart/form-data

multipart/form-data

file

string<binary>

hosted

boolean

fileUrl

string

name

string

parentId

string

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

fileId

string

required

ID of the uploaded file

Example:

file.pdf

Auth

Token:

Parameters

Authorization\*:

Version\*:

2021-07-28

2021-07-28

Body

file:

Upload

hosted:

Omit hosted

fileUrl:

Omit fileUrl

name:

Omit name

parentId:

Omit parentId

Send API Request

Live Server

Request Sample: Shell / cURL

curl --request POST \\

  --url https://services.leadconnectorhq.com/medias/upload-file \\

  --header 'Accept: application/json' \\

  --header 'Authorization: Bearer 123' \\

  --header 'Content-Type: multipart/form-data' \\

  --header 'Version: 2021-07-28' \\

  --form file\= \\

  --form hosted\= \\

  --form fileUrl\= \\

  --form name\= \\

  --form parentId\=

Response Example

1

{

2

  "fileId": "file.pdf"

3

}