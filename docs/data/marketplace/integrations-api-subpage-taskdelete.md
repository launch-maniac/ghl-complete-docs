---
title: "TaskDelete"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/ZG9jOjI5NjI5Mjg0-task"
extracted_at: "2025-10-06T01:03:02.067Z"
---

# Task

Called whenever a task is deleted

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

  "type": "TaskDelete",

  "locationId": "ve9EPM428h8vShlRW1KT",

  "id": "UlRWGLSXh0ji5qbiGu4i",

  "assignedTo": "63e4qiWDsFJjOYAC8phG",

  "body": "Loram ipsum",

  "contactId": "CWBf1PR9LvvBkcYqiXlc",

  "title": "Loram ipsum",

  "dateAdded": "2021-11-26T12:41:02.193Z",

  "dueDate": "2021-11-26T12:41:02.193Z"

}