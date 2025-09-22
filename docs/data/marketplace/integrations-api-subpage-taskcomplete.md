---
title: "TaskComplete"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/1eff163faf3e0-task"
extracted_at: "2025-09-22T06:35:06.647Z"
---

# Task

Called whenever a task is completed

#### [

Schema

](#schema)

type

string

locationId

string

id

string

assignedTo

string

body

string

contactId

string

title

string

dateAdded

string

dueDate

string

#### [

Example

](#example)

{

  "type": "TaskComplete",

  "locationId": "ve9EPM428h8vShlRW1KT",

  "id": "5HrB1IbmnKMBXloldFuP",

  "assignedTo": "bNl8QNGXhIQJLv8eeASQ",

  "body": "testing",

  "contactId": "WFwVrSSjZ2CNHbZThQX2",

  "dateAdded": "2021-11-29T13:37:28.304Z",

  "dueDate": "2021-12-22T06:55:00.000Z",

  "title": "test"

}