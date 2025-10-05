---
title: "PlanChange"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/d36e6a58fa1c2-plan-change"
extracted_at: "2025-10-05T01:04:20.836Z"
---

# Plan Change

Called whenever user changes the plan for a paid app.

#### [

Schema

](#schema)

type

string

Example:

PLAN\_CHANGE

appId

string

Example:

ve9EPM428h8vShlRW1KT

locationId

string

Example:

otg8dTQqGLh3Q6iQI55w

companyId

string

Example:

otg8dTQqGLh3Q6iQI55w

userId

string

Example:

otg8dTQqGLh3Q6iQI55w

currentPlanId

string

Example:

66a0419a0dffa47fb5f8b22f

newPlanId

string

Example:

66a0419a0dffa47fb5f8b22f

#### [

Example

](#example)

{

  "type": "PLAN\_CHANGE",

  "appId": "ve9EPM428h8vShlRW1KT",

  "locationId": "otg8dTQqGLh3Q6iQI55w",

  "companyId": "otg8dTQqGLh3Q6iQI55w",

  "userId": "otg8dTQqGLh3Q6iQI55w",

  "currentPlanId": "66a0419a0dffa47fb5f8b22f",

  "newPlanId": "66a0419a0dffa47fb5f8b22f"

}