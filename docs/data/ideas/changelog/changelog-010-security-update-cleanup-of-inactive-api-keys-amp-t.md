---
title: "Security Update: Cleanup of inactive API Keys &amp; transition to PIT"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69e754642660a61959f7c04a"
author: "Samiksha Dhabekar"
pubDate: "2026-04-21T10:45:22.000Z"
link: "https://ideas.gohighlevel.com/changelog/security-update-cleanup-of-inactive-api-keys-transition-to-pit"
categories: new
url: "https://ideas.gohighlevel.com/changelog/security-update-cleanup-of-inactive-api-keys-transition-to-pit"
index: 10
---

# Overview

We’ve improved how legacy v1 API keys are managed to reduce the risk of stale credentials and support the move to Private Integration Tokens (PIT).

Legacy API keys that have been unused for more than 90 days are now automatically marked as Expired. This applies to both Agency-level and Location-level keys. Active keys are not affected.

If an expired key is still needed, it can be made usable again by rotating or refreshing it. New v1 key creation is no longer supported, and PIT should be used for any new credentials going forward.

# What’s included?

-   Automatic expiration for legacy v1 keys inactive for more than 90 days
-   Support for both Agency-level and Location-level keys
-   Ability to restore expired keys through rotation or refresh
-   Removal of new v1 key creation
-   Email notifications for keys nearing expiration
-   Recommendation to use Private Integration Tokens (PIT) for new credentials

# Why it matters?

This update improves security by reducing exposure from unused legacy credentials and helps standardize new integrations on PIT.

![image](https://canny-assets.io/images/274eae08bc16dfc58263d34a4f152a4b.png)

![image](https://canny-assets.io/images/1ce3b638da048cecfbed0a9dbf6f78fd.png)