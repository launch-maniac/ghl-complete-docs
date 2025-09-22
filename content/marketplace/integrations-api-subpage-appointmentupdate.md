---
title: "AppointmentUpdate"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/5849bb2764faa-appointment"
extracted_at: "2025-09-22T00:57:28.499Z"
---

# Appointment

Called whenever an appointment is updated

#### [

Schema

](#schema)

type

string

locationId

string

appointment

object

id

string

address

string

title

string

calendarId

string

contactId

string

groupId

string

appointmentStatus

string

assignedUserId

string

users

array

notes

string

source

string

startTime

string

endTime

string

dateAdded

string

dateUpdated

string

#### [

Example

](#example)

{

  "type": "AppointmentCreate",

  "locationId": "0007BWpSzSwfiuSl0tR2",

  "appointment": {

    "id": "0007BWpSzSwfiuSl0tR2",

    "address": "https://example.com/meeting",

    "title": "Appointment with GHL Dev team",

    "calendarId": "BqTwX8QFwXzpegMve9EQ",

    "contactId": "9NkT25Vor1v4aQatFsv2",

    "groupId": "9NkT25Vor1v4aQatFsv2",

    "appointmentStatus": "confirmed",

    "assignedUserId": "YlWd2wuCAZQzh2cH1fVZ",

    "users": \[

      "YlWd2wuCAZQzh2cH1fVZ",

      "9NkT25Vor1v4aQatFsv2"

    \],

    "notes": "Some dummy note",

    "source": "booking\_widget",

    "startTime": "2023-09-25T16:00:00+05:30",

    "endTime": "2023-09-25T16:00:00+05:30",

    "dateAdded": "2023-09-25T16:00:00+05:30",

    "dateUpdated": "2023-09-25T16:00:00+05:30"

  }

}