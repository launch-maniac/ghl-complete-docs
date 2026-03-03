---
title: "Connect Call (IVR) Action: Now Supports Call Whisper"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69a6e646b21eee53cc1d7681"
author: "Ashwin Raghunandan"
pubDate: "2026-03-03T15:12:57.000Z"
link: "https://ideas.gohighlevel.com/changelog/connect-call-ivr-action-now-supports-call-whisper"
categories: automations,new
url: "https://ideas.gohighlevel.com/changelog/connect-call-ivr-action-now-supports-call-whisper"
index: 3
---

**What’s new?**

The Connect Call (IVR) action now supports an optional Call Whisper message. When a call is transferred to another number, you can play a private “heads-up” message to the person who answers before the caller is connected.

**How it works**

If Add Whisper Message is toggled on, the system plays your configured message to the call recipient first, then connects the caller. You can control the message text, voice, and how many times it repeats (loops).

**How to use it**

-   In your workflow, open Connect Call (IVR).
-   Toggle Add Whisper Message on and enter the message settings.
-   Save the action - your recipient will hear the whisper before the call connects.

**Why we built it**

Transferred calls often arrive with zero context. Call Whisper helps your team answer confidently by sharing key details up front - without the caller hearing it.

**Use case example**

-   The whisper message can say, “You’ve got a call from {{[contact.name](http://contact.name)}} about their appointment request,” so the recipient knows who’s calling and why before they answer.

**Additional Notes**

-   Whisper is optional and only plays when enabled.
-   The whisper is played to the recipient only, before the call connects.
-   You can configure number of loops to repeat the message.
-   Currently, whisper messages support English only.
-   Keep whisper messages short so recipients can hear the context quickly before pickup.

**Preview**

![image](https://canny-assets.io/images/c86d0f05bb80ae6af4de0a6b7697fbce.png)