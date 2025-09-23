---
title: "LCEmailStats"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/8ee6e13e6c912-lc-email"
extracted_at: "2025-09-23T12:32:57.352Z"
---

# LC Email

Called whenever an email is sent, gives the statistics of the said email.

> Available only to Location Level Apps.

#### [

Schema

](#schema)

LCEmailStats

type

string

locationId

string

companyId

string

webhookPayload

object

event

string

id

string

timestamp

integer

flags

object

message

object

log-level

string

recipient

string

recipient-domain

string

tags

array

recipient-provider

string

campaigns

array

delivery-status

object

envelope

object

#### [

Example

](#example)

{

  "type": "LCEmailStats",

  "locationId": "ve9EPM428h8vShlRW1KT",

  "companyId": "ve9EPM428h8vShlRW1KT",

  "webhookPayload": {

    "event": "delivered",

    "id": "ve9EPM428h8vShlRW1KT",

    "timestamp": 1714032441,

    "flags": {

      "is-authenticated": true,

      "is-routed": false,

      "is-big": false,

      "is-system-test": false,

      "is-test-mode": false

    },

    "message": {

      "attachments": \[\],

      "headers": {

        "message-id": "<message-id>",

        "from": "Aaditya Chakravarty <dummy@example.com>",

        "to": "test@example.com"

      },

      "size": 1725

    },

    "log-level": "info",

    "recipient": "test@example.com",

    "recipient-domain": "example.com",

    "tags": \["loc\_ve9EPM428h8vShlRW1KT", "com\_ve9EPM428h8vShlRW1KT", "et\_other"\],

    "recipient-provider": "Other",

    "campaigns": \[\],

    "delivery-status": {

      "attempt-no": 1,

      "code": 250,

      "message": "OK",

      "description": "",

      "session-seconds": 0.087,

      "enhanced-code": "",

      "mx-host": "mail.example.com",

      "utf8": true,

      "i-first-delivery-attempt-seconds": 0.047

    },

    "envelope": {

      "sender": "<sender-id>",

      "targets": "test@example.com",

      "transport": "smtp",

      "sending-ip": "127.0.0.1",

      "i-ip-pool-id": "65cc66e77a4d4f63649d394c",

      "i-ip-pool-name": "<pool-name>"

    }

  }

}