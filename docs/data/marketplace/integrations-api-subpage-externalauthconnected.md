---
title: "ExternalAuthConnected"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/7afbc237f52a0-external-auth-connected"
extracted_at: "2025-10-05T15:17:50.738Z"
---

# EXTERNAL\_AUTH\_CONNECTED

Called whenever external authentication (OAuth2 or Basic) is connected successfully for an app/location/company.

#### [

Schema

](#schema)

type

string

required

Allowed value:

EXTERNAL\_AUTH\_CONNECTED

appId

string

required

locationId

string

required

companyId

string

required

authType

string

required

Allowed values:

oauth2basic

scopes

string

isAutoRefreshTokenEnabled

boolean

timestamp

string<date-time>

required

webhookId

string

required

-   Note: `scopes` and `isAutoRefreshTokenEnabled` are present only for OAuth2 connections.

#### [

Example

](#example)

-   For OAuth2 External Auth Connection

{

  "type": "EXTERNAL\_AUTH\_CONNECTED",

  "appId": "6800a826637cd0457e0d11e1",

  "locationId": "76sPakGvkoG3WyTyZkhk",

  "companyId": "zzyG7A4x6bRJl5SlhQhH",

  "authType": "oauth2",

  "scopes": "crm.objects.contacts.write crm.schemas.contacts.write oauth crm.schemas.contacts.read crm.objects.contacts.read",

  "isAutoRefreshTokenEnabled": true,

  "timestamp": "2025-05-19T12:48:50.972Z",

  "webhookId": "42f1d489-dc91-4749-a2a2-8c441989a3b5"

}

-   For Basic Auth External Auth Connection

{

  "type": "EXTERNAL\_AUTH\_CONNECTED",

  "appId": "66e96b579245705d69e5ba6a",

  "locationId": "76sPakGvkoG3WyTyZkhk",

  "companyId": "zzyG7A4x6bRJl5SlhQhH",

  "authType": "basic",

  "timestamp": "2025-05-19T15:40:36.811Z",

  "webhookId": "3b12bbc1-0be0-4678-aa76-771e88d27423"

}

-   Note: The payload always includes `type`, `appId`, `locationId`, `companyId`, `authType`, `timestamp`, and `webhookId`. For OAuth2, `scopes` and `isAutoRefreshTokenEnabled` are also included.