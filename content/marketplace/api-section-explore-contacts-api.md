---
title: "Explore Contacts API →"
category: "marketplace"
type: "api-section"
url: "https://marketplace.gohighlevel.com/docs/ghl/contacts/contacts"
extracted_at: "2026-01-08T09:13:04.193Z"
---

-   [](/docs/)
-   Contacts
-   Contacts

# Contacts

Documentation for Contacts API

[

## 📄️ Get Contact

Get Contact

](/docs/ghl/contacts/get-contact)

[

## 📄️ Update Contact

Please find the list of acceptable values for the \`country\` field <a href='https://highlevel.stoplight.io/docs/integrations/ZG9jOjI4MzUzNDIy-country-list' target='\_blank'>here</a>

](/docs/ghl/contacts/update-contact)

[

## 📄️ Delete Contact

Delete Contact

](/docs/ghl/contacts/delete-contact)

[

## 📄️ Upsert Contact

Please find the list of acceptable values for the \`country\` field <a href='https://highlevel.stoplight.io/docs/integrations/ZG9jOjI4MzUzNDIy-country-list' target='\_blank'>here</a><br/><br/>The Upsert API will adhere to the configuration defined under the “Allow Duplicate Contact” setting at the Location level. If the setting is configured to check both Email and Phone, the API will attempt to identify an existing contact based on the priority sequence specified in the setting, and will create or update the contact accordingly.<br/><br/>If two separate contacts already exist—one with the same email and another with the same phone—and an upsert request includes both the email and phone, the API will update the contact that matches the first field in the configured sequence, and ignore the second field to prevent duplication.

](/docs/ghl/contacts/upsert-contact)

[

## 📄️ Get Contacts By BusinessId

Get Contacts By BusinessId

](/docs/ghl/contacts/get-contacts-by-business-id)

[

## 📄️ Create Contact

Please find the list of acceptable values for the \`country\` field <a href='https://highlevel.stoplight.io/docs/integrations/ZG9jOjI4MzUzNDIy-country-list' target='\_blank'>here</a>

](/docs/ghl/contacts/create-contact)

[

## 📄️ Get Contacts

Get Contacts

](/docs/ghl/contacts/get-contacts)

[

Previous

Introduction

](/docs/ghl/contacts/contacts-api)[

Next

Get Contact

](/docs/ghl/contacts/get-contact)