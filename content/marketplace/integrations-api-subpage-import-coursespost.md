---
title: "Import Coursespost"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/7ca9bb420fe98-import-courses"
extracted_at: "2025-09-29T21:12:36.627Z"
---

# Import Courses

post

https://services.leadconnectorhq.com/courses/courses-exporter/public/import

Import Courses through public channels

## [

Request

](#Request)

Security: Bearer Auth

### [

Headers

](#request-headers)

Authorization

string

required

Access Token

Example:

Bearer 9c48df2694a849b6089f9d0d3513efe

### [

Body

](#request-body)

application/json

application/json

locationId

string

required

userId

string

products

array\[object\]

required

title

string

required

description

string

required

imageUrl

string

categories

array\[object\]

required

instructorDetails

object

## [

Responses

](#Responses)

201

Auth

Token:

Parameters

Authorization\*:

Body

{ "locationId": "string", "userId": "string", "products": \[ { "title": "string", "description": "string", "imageUrl": "string", "categories": \[ { "title": "string", "visibility": "published", "thumbnailUrl": "string", "posts": \[ { "title": "string", "visibility": "published", "thumbnailUrl": "string", "contentType": "video", "description": "string", "bucketVideoUrl": "string", "postMaterials": \[ { "title": "string", "type": "pdf", "url": "string" } \] } \], "subCategories": \[ { "title": "string", "visibility": "published", "thumbnailUrl": "string", "posts": \[ { "title": "string", "visibility": "published", "thumbnailUrl": "string", "contentType": "video", "description": "string", "bucketVideoUrl": "string", "postMaterials": \[ { "title": "string", "type": "pdf", "url": "string" } \] } \] } \] } \], "instructorDetails": { "name": "string", "description": "string" } } \] }

1

{

2

  "locationId": "string",

3

  "userId": "string",

4

  "products": \[

5

    {

6

      "title": "string",

7

      "description": "string",

8

      "imageUrl": "string",

9

      "categories": \[

10

        {

11

          "title": "string",

12

          "visibility": "published",

13

          "thumbnailUrl": "string",

14

          "posts": \[

15

            {

16

              "title": "string",

17

              "visibility": "published",

18

              "thumbnailUrl": "string",

19

              "contentType": "video",

20

              "description": "string",

21

              "bucketVideoUrl": "string",

22

              "postMaterials": \[

23

                {

24

                  "title": "string",

25

                  "type": "pdf",

26

                  "url": "string"

27

                }

28

              \]

29

            }

30

          \],

31

          "subCategories": \[

32

            {

33

              "title": "string",

34

              "visibility": "published",

35

              "thumbnailUrl": "string",

36

              "posts": \[

37

                {

38

                  "title": "string",

39

                  "visibility": "published",

40

                  "thumbnailUrl": "string",

41

                  "contentType": "video",

42

                  "description": "string",

43

                  "bucketVideoUrl": "string",

44

                  "postMaterials": \[

45

                    {

46

                      "title": "string",

47

                      "type": "pdf",

48

                      "url": "string"

49

                    }

50

                  \]

51

                }

52

              \]

53

            }

54

          \]

55

        }

56

      \],

57

      "instructorDetails": {

58

        "name": "string",

59

        "description": "string"

60

      }

61

    }

62

  \]

63

}

/\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

.sl-code-editor\[id="react-aria-2-10"\] textarea { padding-left: 28px !important; word-break: break-all !important; }

Send API Request

Live Server

Request Sample: Shell / cURL

curl --request POST \\

  --url https://services.leadconnectorhq.com/courses/courses-exporter/public/import \\

  --header 'Authorization: Bearer 123' \\

  --header 'Content-Type: application/json' \\

  --data '{

  "locationId": "string",

  "userId": "string",

  "products": \[

    {

      "title": "string",

      "description": "string",

      "imageUrl": "string",

      "categories": \[

        {

          "title": "string",

          "visibility": "published",

          "thumbnailUrl": "string",

          "posts": \[

            {

              "title": "string",

              "visibility": "published",

              "thumbnailUrl": "string",

              "contentType": "video",

              "description": "string",

              "bucketVideoUrl": "string",

              "postMaterials": \[

                {

                  "title": "string",

                  "type": "pdf",

                  "url": "string"

                }

              \]

            }

          \],

          "subCategories": \[

            {

              "title": "string",

              "visibility": "published",

              "thumbnailUrl": "string",

              "posts": \[

                {

                  "title": "string",

                  "visibility": "published",

                  "thumbnailUrl": "string",

                  "contentType": "video",

                  "description": "string",

                  "bucketVideoUrl": "string",

                  "postMaterials": \[

                    {

                      "title": "string",

                      "type": "pdf",

                      "url": "string"

                    }

                  \]

                }

              \]

            }

          \]

        }

      \],

      "instructorDetails": {

        "name": "string",

        "description": "string"

      }

    }

  \]

}'