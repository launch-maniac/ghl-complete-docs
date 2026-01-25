---
title: "Start Building Now"
category: "marketplace"
type: "api-section"
url: "https://marketplace.gohighlevel.com/docs/Authorization/authorization_doc"
extracted_at: "2026-01-25T15:10:19.221Z"
---

-   [](/docs/)
-   Authorization

On this page

# Authorization

Authorization is the process of granting or denying access to resources based on a user's verified identity and permissions. It determines what a user can do within a system after they have been authenticated (proven their identity). Essentially, it's about verifying that a user has the right to access specific resources or perform certain actions.

* * *

## HighLevel currently supports two types of authorization:[​](#highlevel-currently-supports-two-types-of-authorization "Direct link to HighLevel currently supports two types of authorization:")

-   [Private Integration Token](/docs/Authorization/PrivateIntegrationsToken)
-   [OAuth 2.0 Flow](/docs/Authorization/OAuth2.0)

* * *

### When should I use a Private Integration Token?[​](#when-should-i-use-a-private-integration-token "Direct link to When should I use a Private Integration Token?")

You should use a Private Integration Token if:

-   Your use case involves accessing our API endpoints for internal purposes.
-   If you don't need webhooks or custom design or pages.
-   If you need to access only 1 sub-account at a time.

#### Example use cases:[​](#example-use-cases "Direct link to Example use cases:")

-   Internal data synchronization
-   Custom reporting dashboards
-   Automated tasks within your own system

* * *

### When should I use OAuth 2.0 Flow?[​](#when-should-i-use-oauth-20-flow "Direct link to When should I use OAuth 2.0 Flow?")

You should use OAuth 2.0 Flow if:

-   You're developing a full-scale integration intended for public use.
-   Your integration requires features like webhooks and custom modules.
-   You need advanced security features and standardized authorization management.

#### Example use cases:[​](#example-use-cases-1 "Direct link to Example use cases:")

-   Third-party applications
-   Creating custom conversation providers/custom workflow actions and triggers, etc.
-   Services requiring secure user authorization

* * *

## Share your feedback

★★★★★

[

Previous

How to Update Your APP

](/docs/oauth/HowToUpdateYourAPP)[

Next

Private Integrations Token

](/docs/Authorization/PrivateIntegrationsToken)

-   [HighLevel currently supports two types of authorization:](#highlevel-currently-supports-two-types-of-authorization)
    -   [When should I use a Private Integration Token?](#when-should-i-use-a-private-integration-token)
    -   [When should I use OAuth 2.0 Flow?](#when-should-i-use-oauth-20-flow)