---
title: "AppInstall"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/ed3e2ba9e37fe-app"
extracted_at: "2025-10-05T03:44:54.620Z"
---

# App

Called whenever an app is installed

#### [

Schema

](#schema)

type

string

appId

string

companyId

string

locationId

string

userId

string

planId

string

trial

object

onTrial

boolean

trialDuration

number

trialStartDate

any

isWhitelabelCompany

boolean

whitelabelDetails

object

domain

string

logoUrl

string

companyName

string

-   Note: The User ID and Company ID may be available when a new token is generated. In case of app installation via future locations, you may not get these fields.

#### [

Example

](#example)

-   For Location Level App Install if company is whitelabeled

{

  "type": "INSTALL",

  "appId": "ve9EPM428h8vShlRW1KT",

  "locationId": "otg8dTQqGLh3Q6iQI55w",

  "companyId": "otg8dTQqGLh3Q6iQI55w",

  "userId": "otg8dTQqGLh3Q6iQI55w",

  "planId": "66a0419a0dffa47fb5f8b22f",

  "trial": {

    "onTrial": true,

    "trialDuration": 10,

    "trialStartDate": "2024-07-23T23:54:51.264Z"

  },

  "isWhitelabelCompany": true,

  "whitelabelDetails": {

    "domain": "example.com",

    "logoUrl": "https://example.com/logo.png"

  },

  "companyName": "Example Company"

}

-   For Location Level App Install if company is non whitelabeled

{

  "type": "INSTALL",

  "appId": "ve9EPM428h8vShlRW1KT",

  "locationId": "otg8dTQqGLh3Q6iQI55w",

  "companyId": "otg8dTQqGLh3Q6iQI55w",

  "userId": "otg8dTQqGLh3Q6iQI55w",

  "planId": "66a0419a0dffa47fb5f8b22f",

  "trial": {

    "onTrial": true,

    "trialDuration": 10,

    "trialStartDate": "2024-07-23T23:54:51.264Z"

  },

  "isWhitelabelCompany": false,

  "whitelabelDetails": {},

  "companyName": "Example Company"

}

-   For Agency Level App Install

{

  "type": "INSTALL",

  "appId": "ve9EPM428h8vShlRW1KT",

  "companyId": "otg8dTQqGLh3Q6iQI55w",

  "planId": "66a0419a0dffa47fb5f8b22f",

  "trial": {

    "onTrial": true,

    "trialDuration": 10,

    "trialStartDate": "2024-07-23T23:54:51.264Z"

  }

}