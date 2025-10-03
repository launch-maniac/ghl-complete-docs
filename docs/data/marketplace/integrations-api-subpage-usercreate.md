---
title: "UserCreate"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/f5f95c6d45f71-user"
extracted_at: "2025-10-03T12:36:39.719Z"
---

# User

Called whenever a user is created

#### [

Schema

](#schema)

{

  "type": "string",

  "locationId": "string",

  "companyId": "string",

  "id": "string",

  "firstName": "string",

  "lastName": "string",

  "email": "string",

  "phone": "string",

  "extension": "string",

  "role": "string",

  "permissions": {

    "adwordsReportingEnabled": "boolean",

    "affiliateManagerEnabled": "boolean",

    "agentReportingEnabled": "boolean",

    "appointmentsEnabled": "boolean",

    "assignedDataOnly": "boolean",

    "attributionsReportingEnabled": "boolean",

    "bloggingEnabled": "boolean",

    "botService": "boolean",

    "bulkRequestsEnabled": "boolean",

    "campaignsEnabled": "boolean",

    "campaignsReadOnly": "boolean",

    "cancelSubscriptionEnabled": "boolean",

    "communitiesEnabled": "boolean",

    "contactsEnabled": "boolean",

    "contentAiEnabled": "boolean",

    "conversationsEnabled": "boolean",

    "dashboardStatsEnabled": "boolean",

    "facebookAdsReportingEnabled": "boolean",

    "funnelsEnabled": "boolean",

    "invoiceEnabled": "boolean",

    "leadValueEnabled": "boolean",

    "marketingEnabled": "boolean",

    "membershipEnabled": "boolean",

    "onlineListingsEnabled": "boolean",

    "opportunitiesEnabled": "boolean",

    "paymentsEnabled": "boolean",

    "phoneCallEnabled": "boolean",

    "recordPaymentEnabled": "boolean",

    "refundsEnabled": "boolean",

    "reviewsEnabled": "boolean",

    "settingsEnabled": "boolean",

    "socialPlanner": "boolean",

    "tagsEnabled": "boolean",

    "triggersEnabled": "boolean",

    "websitesEnabled": "boolean",

    "workflowsEnabled": "boolean",

    "workflowsReadOnly": "boolean"

  },

  "locations": \["string"\]

}

#### [

Example (For Sub Account User)

](#example-for-sub-account-user)

{

  "type": "UserCreate",

  "locationId": "ve9EPM428h8vShlRW1KT",

  "id": "ve9EPM428h8vShlRW1KT",

  "firstName": "John",

  "lastName": "Doe",

  "email": "john.doe+2@example.com",

  "phone": "+13235559998",

  "extension": "111",

  "role": "user",

  "permissions": {

    "adwordsReportingEnabled": true,

    "affiliateManagerEnabled": false,

    "agentReportingEnabled": true,

    "appointmentsEnabled": true,

    "assignedDataOnly": false,

    "attributionsReportingEnabled": true,

    "bloggingEnabled": true,

    "botService": false,

    "bulkRequestsEnabled": true,

    "campaignsEnabled": true,

    "campaignsReadOnly": false,

    "cancelSubscriptionEnabled": true,

    "communitiesEnabled": true,

    "contactsEnabled": true,

    "contentAiEnabled": true,

    "conversationsEnabled": true,

    "dashboardStatsEnabled": true,

    "facebookAdsReportingEnabled": true,

    "funnelsEnabled": true,

    "invoiceEnabled": true,

    "leadValueEnabled": true,

    "marketingEnabled": true,

    "membershipEnabled": true,

    "onlineListingsEnabled": true,

    "opportunitiesEnabled": true,

    "paymentsEnabled": true,

    "phoneCallEnabled": true,

    "recordPaymentEnabled": true,

    "refundsEnabled": true,

    "reviewsEnabled": true,

    "settingsEnabled": true,

    "socialPlanner": true,

    "tagsEnabled": true,

    "triggersEnabled": true,

    "websitesEnabled": true,

    "workflowsEnabled": true,

    "workflowsReadOnly": false

  }

}

#### [

Example (For Agency User)

](#example-for-agency-user)

{

  "type": "UserCreate",

  "companyId": "ve9EPM428h8vShlRW1KT",

  "id": "ve9EPM428h8vShlRW1KT",

  "firstName": "John",

  "lastName": "Doe",

  "email": "john.doe+3@example.com",

  "phone": "+13235559997",

  "extension": "1112",

  "role": "admin",

  "permissions": {

    "adwordsReportingEnabled": true,

    "affiliateManagerEnabled": false,

    "agentReportingEnabled": true,

    "appointmentsEnabled": true,

    "assignedDataOnly": false,

    "attributionsReportingEnabled": true,

    "bloggingEnabled": true,

    "botService": false,

    "bulkRequestsEnabled": true,

    "campaignsEnabled": true,

    "campaignsReadOnly": false,

    "cancelSubscriptionEnabled": true,

    "communitiesEnabled": true,

    "contactsEnabled": true,

    "contentAiEnabled": true,

    "conversationsEnabled": true,

    "dashboardStatsEnabled": true,

    "facebookAdsReportingEnabled": true,

    "funnelsEnabled": true,

    "invoiceEnabled": true,

    "leadValueEnabled": true,

    "marketingEnabled": true,

    "membershipEnabled": true,

    "onlineListingsEnabled": true,

    "opportunitiesEnabled": true,

    "paymentsEnabled": true,

    "phoneCallEnabled": true,

    "recordPaymentEnabled": true,

    "refundsEnabled": true,

    "reviewsEnabled": true,

    "settingsEnabled": true,

    "socialPlanner": true,

    "tagsEnabled": true,

    "triggersEnabled": true,

    "websitesEnabled": true,

    "workflowsEnabled": true,

    "workflowsReadOnly": false

  },

  "locations": \["ve9EPM428h8vShlRW1KT"\]

}