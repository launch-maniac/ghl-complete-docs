---
title: "Social Planner Post API 🚀"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "6905ace45e174e35a41962d9"
author: "Sales &amp; Marketing"
pubDate: "2025-11-01T07:19:58.000Z"
link: "https://ideas.gohighlevel.com/changelog/social-planner-post-api"
categories: new
url: "https://ideas.gohighlevel.com/changelog/social-planner-post-api"
index: 9
---

**What’s New in Social Planner:**

Creating and editing posts via API just got smarter and more flexible! The Social Planner Post API now supports platform specific parameters for Facebook, Instagram, LinkedIn, Pinterest, and YouTube, making cross platform posting seamless and optimised.

**😇 Key Highlights**

-   Platform Specific Fields: Each platform (Facebook, Instagram, LinkedIn, Pinterest, YouTube) now accepts its own details objects like post type, title, link, or media format.
-   Smarter Media Handling: A new media Optimisation flag enhances image quality before publishing, ensuring your posts always look their best.
-   Full Compatibility: All new parameters are optional and backward compatible existing integrations continue to work without any change.

**🔍 Supported in APIs:**

-   POST /social-planner/posts → Create Post
-   PUT /social-planner/posts/{id} → Edit Post
-   GET /social-planner/posts and GET /social-planner/posts/{id} → Retrieve posts with the new fields

**💡Why This Matters**

-   Unified and flexible post creation for all major platforms
-   Fine tuned control for each platform’s behavior and content type
-   Higher-quality, optimized media delivery
-   Zero migration effort with no breaking changes

Updated API documentation is live at: [https://marketplace.gohighlevel.com/docs/ghl/social-planner/post/index.html](https://marketplace.gohighlevel.com/docs/ghl/social-planner/post/index.html)