---
title: "AppUninstall"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/0a921b6da92ca-app"
extracted_at: "2025-10-04T18:26:09.214Z"
---

# App

Called whenever an app is uninstalled

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

#### [

Example

](#example)

-   For Location Level App Uninstall

{

  "type": "UNINSTALL",

  "appId": "ve9EPM428h8vShlRW1KT",

  "locationId": "otg8dTQqGLh3Q6iQI55w"

}

-   For Agency Level App Uninstall

{

  "type": "UNINSTALL",

  "appId": "ve9EPM428h8vShlRW1KT",

  "companyId": "otg8dTQqGLh3Q6iQI55w"

}