---
title: "Enhanced Form Tracking &amp; Custom Field Capture"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "695fb6b476bbb1622b6b9efb"
author: "Sales &amp; Marketing"
pubDate: "2026-01-08T13:53:19.000Z"
link: "https://ideas.gohighlevel.com/changelog/enhanced-form-tracking-custom-field-capture"
categories: external tracking script,new,improved
url: "https://ideas.gohighlevel.com/changelog/enhanced-form-tracking-custom-field-capture"
index: 6
---

# 🚀 Overview

Form tracking now captures more than just name and email.

External Tracking has been enhanced to detect, capture, and map custom fields from both HighLevel forms and standard HTML forms, with improved field-level accuracy.

# ✨ What’s New: Custom Field Capture

You can now capture a wide range of custom field types, including:

-   Single-line & multi-line text fields
-   Dropdowns (single & multi-select)
-   Checkboxes & radio buttons
-   Ratings & scores
-   Number, monetary & date picker fields
-   File uploads & signatures (metadata only)
-   Source, captcha & boolean fields

**Fields are captured only when they:**

-   Are visible on the form
-   Have a valid name attribute

# 🔁 Smarter Field Mapping

Custom fields are mapped using a consistent priority order:

-   Field name matches a GHL property or custom field key
-   Field label matches a GHL display name
-   Field name matches label text (case-insensitive)

If no match is found, the field is stored as unmapped\_field, making it easy to identify and correct mapping issues.

# 🏷️ Better Data Handling

Captured fields are stored with awareness of their data type:

-   Text, number, and choice-based fields
-   Single-select vs multi-select values
-   Metadata-only handling for file uploads and signatures

This ensures consistent and reliable usage of field data across downstream workflows.

# ⚠️ Important Notes

1.  Hidden or disabled fields are not captured (unless explicitly configured)
2.  Third-party widgets or iframe-based inputs are supported only if the value is visible in the DOM and has a name attribute
3.  File uploads and signatures capture metadata only — files are not stored