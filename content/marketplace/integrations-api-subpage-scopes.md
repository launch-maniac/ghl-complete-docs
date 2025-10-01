---
title: "Scopes"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/vcctp9t1w8hja-scopes"
extracted_at: "2025-10-01T18:21:38.496Z"
---

# **Scopes**

Here is a list of the scopes you require to access the API Endpoints and Webhook Events.

Scope

API Endpoints

Webhook Events

Access Type

businesses.readonly

GET /businesses

Sub-Account

 

GET /businesses/:businessId

Sub-Account

businesses.write

POST /businesses

Sub-Account

 

PUT /businesses/:businessId

Sub-Account

 

DELETE /businesses/:businessId

Sub-Account

calendars.write

POST /calendars/

Sub-Account

 

PUT /calendars/:calendarId

Sub-Account

 

DELETE /calendars/:calendarId

Sub-Account

calendars.readonly

GET /calendars/

Sub-Account

 

GET /calendars/:calendarId

Sub-Account

 

GET /calendars/:calendarId/free-slots

Sub-Account

calendars/groups.readonly

GET /calendars/groups

Sub-Account

calendars/groups.write

POST /calendars/groups

Sub-Account

 

POST /calendars/groups/validate-slug

Sub-Account

 

DELETE /calendars/groups/:groupId

Sub-Account

 

PUT /calendars/groups/:groupId

Sub-Account

 

PUT /calendars/groups/:groupId/status

Sub-Account

calendars/resources.readonly

GET /calendars/resources/:resourceType

Sub-Account

 

GET /calendars/resources/:resourceType/:id

Sub-Account

calendars/resources.write

POST /calendars/resources

Sub-Account

 

PUT /calendars/resources/:resourceType/:id

Sub-Account

 

DELETE /calendars/resources/:resourceType/:id

Sub-Account

calendars/events.readonly

GET /calendars/events/appointments/:eventId

Sub-Account

 

GET /calendars/events

Sub-Account

 

GET /calendars/blocked-slots

Sub-Account

 

GET /calendars/appointments/:appointmentId/notes

Sub-Account

 

GET /calendars/:calendarId/notifications/:notificationId

Sub-Account

 

GET /calendars/:calendarId/notifications

Sub-Account

calendars/events.write

DELETE /calendars/events/:eventId

Sub-Account

 

POST /calendars/events/block-slots

Sub-Account

 

PUT /calendars/events/block-slots/:eventId

Sub-Account

 

POST /calendars/events/appointments

Sub-Account

 

PUT /calendars/events/appointments/:eventId

Sub-Account

 

POST /calendars/appointments/:appointmentId/notes

Sub-Account

 

PUT /calendars/appointments/:appointmentId/notes/:noteId

Sub-Account

 

DELETE /calendars/appointments/:appointmentId/notes/:noteId

Sub-Account

 

POST /calendars/:calendarId/notifications

Sub-Account

 

PUT /calendars/:calendarId/notifications/:notificationId

Sub-Account

 

DELETE /calendars/:calendarId/notifications/:notificationId

Sub-Account

campaigns.readonly

GET /campaigns/

CampaignStatusUpdate

Sub-Account

contacts.readonly

GET /contacts/:contactId

ContactCreate

Sub-Account

 

GET /contacts/:contactId/tasks

ContactDelete

Sub-Account

 

GET /contacts/:contactId/tasks/:taskId

ContactDndUpdate

Sub-Account

 

GET /contacts/:contactId/notes

ContactTagUpdate

Sub-Account

 

GET /contacts/:contactId/notes/:id

NoteCreate

Sub-Account

 

GET /contacts/:contactId/appointments

NoteDelete

Sub-Account

 

GET /contacts/

TaskCreate

Sub-Account

 

GET /contacts/business/:businessId

TaskDelete

Sub-Account

contacts.write

POST /contacts/

 

Sub-Account

 

PUT /contacts/:contactId

 

Sub-Account

 

DELETE /contacts/:contactId

 

Sub-Account

 

POST /contacts/:contactId/tasks

 

Sub-Account

 

PUT /contacts/:contactId/tasks/:taskId

 

Sub-Account

 

PUT /contacts/:contactId/tasks/:taskId/completed

 

Sub-Account

 

DELETE /contacts/:contactId/tasks/:taskId

 

Sub-Account

 

POST /contacts/:contactId/tags

 

Sub-Account

 

DELETE /contacts/:contactId/tags

 

Sub-Account

 

POST /contacts/:contactId/notes

 

Sub-Account

 

PUT /contacts/:contactId/notes/:id

 

Sub-Account

 

DELETE /contacts/:contactId/notes/:id

 

Sub-Account

 

POST /contacts/:contactId/campaigns/:campaignId

 

Sub-Account

 

DELETE /contacts/:contactId/campaigns/removeAll

 

Sub-Account

 

DELETE /contacts/:contactId/campaigns/:campaignId

 

Sub-Account

 

POST /contacts/:contactId/workflow/:workflowId

 

Sub-Account

 

DELETE /contacts/:contactId/workflow/:workflowId

 

Sub-Account

objects/schema.readonly

GET /objects/:key

 

Sub-Account

 

GET /objects

 

Sub-Account

objects/schema.write

 

Sub-Account

objects/record.readonly

GET /objects/:schemaKey/records/:id

 

Sub-Account

objects/record.write

POST /objects/:schemaKey/records

 

Sub-Account

 

PUT /objects/:schemaKey/records/:id

 

Sub-Account

 

DELETE /objects/:schemaKey/records/:id

 

Sub-Account

conversations.readonly

GET /conversations/:conversationsId

ConversationUnreadWebhook

Sub-Account

 

GET /conversations/search

 

Sub-Account

conversations.write

POST /conversations/

 

Sub-Account

 

PUT /conversations/:conversationsId

 

Sub-Account

 

DELETE /conversations/:conversationsId

 

Sub-Account

conversations/message.readonly

GET conversations/messages/:messageId/locations/:locationId/recording

InboundMessage

Sub-Account

 

OutboundMessage

Sub-Account

 

GET conversations/locations/:locationId/messages/:messageId/transcription

InboundMessage

Sub-Account

 

OutboundMessage

Sub-Account

 

GET conversations/locations/:locationId/messages/:messageId/transcription/download

InboundMessage

Sub-Account

 

OutboundMessage

conversations/message.write

POST /conversations/messages

ConversationProviderOutboundMessage

Sub-Account

 

POST /conversations/messages/inbound

 

Sub-Account

 

POST /conversations/messages/upload

 

Sub-Account

 

PUT /conversations/messages/:messageId/status

 

Sub-Account

 

DELETE /conversations/messages/:messageId/schedule

 

Sub-Account

 

DELETE /conversations/messages/email/:emailMessageId/schedule

 

Sub-Account

conversations/livechat.write

POST /conversations/providers/live-chat/typing

 

Sub-Account

forms.readonly

GET /forms/

 

Sub-Account

 

GET /forms/submissions

 

Sub-Account

invoices.readonly

GET /invoices/

 

Sub-Account

 

GET /invoices/:invoiceId

 

Sub-Account

 

GET /invoices/generate-invoice-number

 

Sub-Account

invoices.write

POST /invoices

 

Sub-Account

 

PUT /invoices/:invoiceId

 

Sub-Account

 

DELETE /invoices/:invoiceId

 

Sub-Account

 

POST /invoices/:invoiceId/send

 

Sub-Account

 

POST /invoices/:invoiceId/void

 

Sub-Account

 

POST /invoices/:invoiceId/record-payment

 

Sub-Account

 

POST /invoices/text2pay

 

Sub-Account

invoices/schedule.readonly

GET /invoices/schedule/

 

Sub-Account

 

GET /invoices/schedule/:scheduleId

 

Sub-Account

invoices/schedule.write

POST /invoices/schedule

 

Sub-Account

 

PUT /invoices/schedule/:scheduleId

 

Sub-Account

 

DELETE /invoices/schedule/:scheduleId

 

Sub-Account

 

POST /invoices/schedule/:scheduleId/schedule

 

Sub-Account

 

POST /invoices/schedule/:scheduleId/auto-payment

 

Sub-Account

 

POST /invoices/schedule/:scheduleId/cancel

 

Sub-Account

invoices/template.readonly

GET /invoices/template/

 

Sub-Account

 

GET /invoices/template/:templateId

 

Sub-Account

invoices/template.write

POST /invoices/template/

 

Sub-Account

 

PUT /invoices/template/:templateId

 

Sub-Account

 

DELETE /invoices/template/:templateId

 

Sub-Account

links.readonly

GET /links/

 

Sub-Account

links.write

POST /links/

 

Sub-Account

 

PUT /links/:linkId

 

Sub-Account

 

DELETE /links/:linkId

 

Sub-Account

locations.readonly

GET /locations/:locationId

LocationCreate

Sub-Account, Agency

LocationUpdate

Sub-Account, Agency

GET /locations/search

 

Sub-Account, Agency

GET /locations/timeZones

 

Sub-Account

locations.write

POST /locations/

 

Agency

PUT /locations/:locationId

 

Agency

DELETE /locations/:locationId

 

Agency

locations/customValues.readonly

GET /locations/:locationId/customValues

 

Sub-Account

 

GET /locations/:locationId/customValues/:id

 

Sub-Account

locations/customValues.write

POST /locations/:locationId/customValues

 

Sub-Account

 

PUT /locations/:locationId/customValues/:id

 

Sub-Account

 

DELETE /locations/:locationId/customValues/:id

 

Sub-Account

locations/customFields.readonly

GET /locations/:locationId/customFields

 

Sub-Account

 

GET /locations/:locationId/customFields/:id

 

Sub-Account

 

GET /custom-fields/:id

 

Sub-Account

 

GET /custom-field/object-key/:key

 

Sub-Account

locations/customFields.write

POST /locations/:locationId/customFields

 

Sub-Account

 

PUT /locations/:locationId/customFields/:id

 

Sub-Account

 

DELETE /locations/:locationId/customFields/:id

 

Sub-Account

locations/tags.readonly

GET /locations/:locationId/tags

 

Sub-Account

GET /locations/:locationId/tags/:tagId

 

Sub-Account

locations/tags.write

POST /locations/:locationId/tags/

 

Sub-Account

 

PUT /locations/:locationId/tags/:tagId

 

Sub-Account

 

DELETE /locations/:locationId/tags/:tagId

 

Sub-Account

locations/templates.readonly

GET /locations/:locationId/templates

 

Sub-Account

locations/tasks.readonly

POST /locations/:locationId/tasks/search

 

Sub-Account

medias.readonly

GET /medias/files

 

Sub-Account

medias.write

POST /medias/upload-file

 

Sub-Account

funnels/redirect.readonly

GET /funnels/lookup/redirect/list

 

Sub-Account

funnels/redirect.write

POST /funnels/lookup/redirect

 

Sub-Account

funnels/page.readonly

GET /funnels/page

 

Sub-Account

funnels/funnel.readonly

GET /funnels/funnel/list

 

Sub-Account

funnels/pagecount.readonly

GET /funnels/page/count

 

Sub-Account

 

DELETE /funnels/lookup/redirect/:id

 

Sub-Account

 

PATCH /funnels/lookup/redirect/:id

 

Sub-Account

 

DELETE /medias/:fileId

 

Sub-Account

opportunities.readonly

GET /opportunities/search

OpportunityCreate

Sub-Account

 

GET /opportunities/:id

OpportunityDelete

Sub-Account

 

GET /opportunities/pipelines

OpportunityStageUpdate

Sub-Account

 

 

OpportunityStatusUpdate

Sub-Account

 

 

OpportunityMonetaryValueUpdate

Sub-Account

opportunities.write

DELETE /opportunities/:id

 

Sub-Account

 

PUT /opportunities/:id/status

 

Sub-Account

 

POST /opportunities

 

Sub-Account

 

PUT /opportunities/:id

 

Sub-Account

payments/integration.readonly

GET /payments/integrations/provider/whitelabel

 

Sub-Account

payments/integration.write

POST /payments/integrations/provider/whitelabel

 

Sub-Account

payments/orders.readonly

GET /payments/orders/

 

Sub-Account

 

GET /payments/orders/:orderId

 

Sub-Account

 

GET /payments/orders/:orderId/fulfillments

 

Sub-Account

payments/orders.write

POST /payments/orders/:orderId/fulfillments

 

Sub-Account

payments/transactions.readonly

GET /payments/transactions/

 

Sub-Account

 

GET /payments/transactions/:transactionId

 

Sub-Account

payments/subscriptions.readonly

GET /payments/subscriptions/

 

Sub-Account

 

GET /payments/subscriptions/:subscriptionId

 

Sub-Account

payments/coupons.readonly

GET /payments/coupon

 

Sub-Account

 

GET /payments/coupon/list

 

Sub-Account

payments/coupons.write

POST /payments/coupon

 

Sub-Account

 

PUT /payments/coupon

 

Sub-Account

 

DEL /payments/coupon

 

Sub-Account

products.readonly

GET /products/

 

Sub-Account

 

GET /products/:productId

 

Sub-Account

products.write

POST /products/

 

Sub-Account

 

PUT /products/:productId

 

Sub-Account

 

DELETE /products/:productId

 

Sub-Account

products/prices.readonly

GET /products/:productId/price/

 

Sub-Account

 

GET /products/:productId/price/:priceId

 

Sub-Account

products/prices.write

POST /products/:productId/price/

 

Sub-Account

 

PUT /products/:productId/price/:priceId

 

Sub-Account

 

DELETE /products/:productId/price/:priceId

 

Sub-Account

oauth.readonly

GET /oauth/installedLocations

 

Agency

oauth.write

POST /oauth/locationToken

 

Agency

saas/location.write

PUT /update-saas-subscription/:locationId

 

Agency

 

POST /enable-saas/:locationId

 

Sub-Account, Agency

saas/location.read

GET /locations

 

Sub-Account, Agency

saas/company.write

POST /bulk-disable-saas/:companyId

 

Sub-Account, Agency

snapshots.readonly

GET /snapshots

 

Agency

socialplanner/account.readonly

GET /social-media-posting/:locationId/accounts

 

Sub-Account

socialplanner/account.write

DELETE /social-media-posting/:locationId/accounts/:id

 

Sub-Account

socialplanner/csv.readonly

GET /social-media-posting/:locationId/csv

 

Sub-Account

 

GET /social-media-posting/:locationId/csv/:id

 

Sub-Account

socialplanner/csv.write

POST /social-media-posting/:locationId/csv

 

Sub-Account

 

POST /social-media-posting/:locationId/set-accounts

 

Sub-Account

 

DELETE /social-media-posting/:locationId/csv/:id

 

Sub-Account

 

PATCH /social-media-posting/:locationId/csv/:id

 

Sub-Account

 

POST /social-media-posting/:locationId/posts/bulk-delete

 

Sub-Account

 

DELETE /social-media-posting/:locationId/csv/:csvId/post/:postId

 

Sub-Account

socialplanner/category.readonly

GET /social-media-posting/:locationId/categories

 

Sub-Account

 

GET /social-media-posting/:locationId/categories/:id

 

Sub-Account

socialplanner/oauth.readonly

GET /social-media-posting/oauth/facebook/start

 

Sub-Account

 

GET /social-media-posting/oauth/:locationId/facebook/accounts/:accountId

 

Sub-Account

 

GET /social-media-posting/oauth/google/start

 

Sub-Account

 

GET /social-media-posting/oauth/:locationId/google/locations/:accountId

 

Sub-Account

 

GET /social-media-posting/oauth/instagram/start

 

Sub-Account

 

GET /social-media-posting/oauth/:locationId/instagram/accounts/:accountId

 

Sub-Account

 

GET /social-media-posting/oauth/linkedin/start

 

Sub-Account

 

GET /social-media-posting/oauth/:locationId/linkedin/accounts/:accountId

 

Sub-Account

 

GET /social-media-posting/oauth/tiktok/start

 

Sub-Account

 

GET /social-media-posting/oauth/:locationId/tiktok/accounts/:accountId

 

Sub-Account

 

GET /social-media-posting/oauth/tiktok-business/start

 

Sub-Account

 

GET /social-media-posting/oauth/:locationId/tiktok-business/accounts/:accountId

 

Sub-Account

 

GET /social-media-posting/oauth/twitter/start

 

Sub-Account

 

GET /social-media-posting/oauth/:locationId/twitter/accounts/:accountId

 

Sub-Account

socialplanner/oauth.write

POST /social-media-posting/oauth/:locationId/facebook/accounts/:accountId

 

Sub-Account

 

POST /social-media-posting/oauth/:locationId/google/locations/:accountId

 

Sub-Account

 

POST /social-media-posting/oauth/:locationId/instagram/accounts/:accountId

 

Sub-Account

 

POST /social-media-posting/oauth/:locationId/linkedin/accounts/:accountId

 

Sub-Account

 

POST /social-media-posting/oauth/:locationId/tiktok/accounts/:accountId

 

Sub-Account

 

POST /social-media-posting/oauth/:locationId/twitter/accounts/:accountId

 

Sub-Account

socialplanner/post.readonly

GET /social-media-posting/:locationId/posts/:id

 

Sub-Account

 

POST /social-media-posting/:locationId/posts/list

 

Sub-Account

socialplanner/post.write

POST /social-media-posting/:locationId/posts

 

Sub-Account

 

PUT /social-media-posting/:locationId/posts/:id

 

Sub-Account

 

DELETE /social-media-posting/:locationId/posts/:id

 

Sub-Account

 

PATCH /social-media-posting/:locationId/posts/:id

 

Sub-Account

socialplanner/tag.readonly

GET /social-media-posting/:locationId/tags

 

Sub-Account

 

POST /social-media-posting/:locationId/tags/details

 

Sub-Account

socialplanner/statistics.readonly

POST /social-media-posting/statistics

 

Sub-Account

surveys.readonly

GET /surveys/

 

Sub-Account

 

GET /surveys/submissions

 

Sub-Account

users.readonly

GET /users/

 

Sub-Account, Agency

 

GET /users/:userId

 

Sub-Account, Agency

users.write

POST /users/

 

Sub-Account, Agency

 

DELETE /users/:userId

 

Sub-Account, Agency

 

PUT /users/:userId

 

Sub-Account, Agency

workflows.readonly

GET /workflows/

 

Sub-Account

courses.write

POST courses/courses-exporter/public/import

 

Sub-Account

emails/builder.readonly

GET emails/builder

 

Sub-Account

emails/builder.write

POST emails/builder

 

Sub-Account

 

POST /emails/builder/data

 

Sub-Account

 

DELETE /emails/builder/:locationId/:templateId

 

Sub-Account

emails/schedule.readonly

GET emails/schedule

 

Sub-Account, Agency

blogs/post.write

POST /blogs/posts

 

Sub-Account

blogs/post-update.write

PUT /blogs/posts/:postId

 

Sub-Account

blogs/check-slug.readonly

GET /blogs/posts/url-slug-exists

 

Sub-Account

blogs/category.readonly

GET /blogs/categories

 

Sub-Account

blogs/author.readonly

GET /blogs/authors

 

Sub-Account

blogs/posts.readonly

GET /blogs/posts/all

 

Sub-Account

blogs/list.readonly

GET /blogs/site/all

 

Sub-Account