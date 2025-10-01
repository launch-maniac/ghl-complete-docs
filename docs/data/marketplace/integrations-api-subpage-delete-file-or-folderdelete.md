---
title: "Delete File or Folderdelete"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/fb48a2a324010-delete-file-or-folder"
extracted_at: "2025-10-01T06:26:19.840Z"
---

# Delete File or Folder

delete

https://services.leadconnectorhq.com/medias/{id}

Deletes specific file or folder from the media library

## [

Request

](#Request)

Security: Bearer Auth

### [

Path Parameters

](#Path-Parameters)

id

string

required

### [

Query Parameters

](#Query-Parameters)

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

Auth

Token:

Parameters

id\*:

altId\*:

altType\*:

agencylocation

location

Authorization\*:

Version\*:

2021-07-28

2021-07-28

Send API Request

Live Server

Request Sample: Shell / cURL

curl --request DELETE \\

  --url 'https://services.leadconnectorhq.com/medias/{id}?altType=location' \\

  --header 'Authorization: Bearer 123' \\

  --header 'Version: 2021-07-28'