---
title: "Marketplace App Update: AI Agent Modules Now Support App Versioning"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69f0b726a65d2dc98bb2f944"
author: "Samiksha Dhabekar"
pubDate: "2026-04-28T13:34:36.000Z"
link: "https://ideas.gohighlevel.com/changelog/marketplace-app-update-ai-agent-modules-now-support-app-versioning"
categories: app marketplace,conversation ai,voice ai,new
url: "https://ideas.gohighlevel.com/changelog/marketplace-app-update-ai-agent-modules-now-support-app-versioning"
index: 9
---

# Overview

We’ve expanded app update versioning to include AI Agent modules, including Conversation AI and Voice AI templates.

Earlier, app versioning supported the release flow for app updates, but AI Agent module changes were not fully tied to app versions. With this update, AI Agent template changes are now version-controlled, making releases safer, clearer, and easier to manage.

# What’s new

-   AI Agent template changes must now be made through the app versioning flow.
-   Developers can no longer edit AI Agent templates directly on a Live version.
-   To make changes, developers should go to Manage → Versions, clone the Live version as a Draft, make updates in the Draft, and publish the new version.

# Versioning behavior

-   Updates to an existing Conversation AI or Voice AI template are treated as a Minor version update by default.
-   This includes changes to agent details, descriptions, use cases, supported channels, actions, template configuration, template link updates, or disabling/enabling an existing template link.
-   A Major version is required when AI Agent templates are added for the first time to an existing Live app.
-   For example, if a Live app did not previously include Conversation AI or Voice AI templates, and the developer adds one or both in a Draft version, the update must be published as a Major version.

# Why this matters

This update gives developers better control over how AI Agent changes are released and gives users more visibility into what changed before updating an installed app.

AI Agent updates are now easier to track, review, and adopt through Marketplace release notes and version updates.

# What' next

-   We are in the process of expanding app versioning to other Marketplace modules as well.

In case of any further questions, please reach out to