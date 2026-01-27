---
title: "AI Builder: Smarter Wait Step Generation"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "6970d3fdb678427f2901dfe5"
author: "Divyam Bhadoria"
pubDate: "2026-01-21T13:29:28.000Z"
link: "https://ideas.gohighlevel.com/changelog/ai-builder-smarter-wait-step-generation"
categories: automations,improved,fixed
url: "https://ideas.gohighlevel.com/changelog/ai-builder-smarter-wait-step-generation"
index: 6
---

We've leveled up how AI Builder handles Wait steps, making them more reliable, predictable, and capable of handling complex multi-step requests in a single prompt.

# What's New

**Handle Complex Wait Requests in One Go**

You can now describe intricate, multi-layered wait logic in a single prompt and AI Builder nails it.

**For example:** "Add a wait with a delay of 3 minutes, then another with a delay of 10 hours, then another but only run it on Tuesday-Thursday between 10am-5pm, then add an SMS and then wait for reply with a timeout of 10 minutes."

AI Builder correctly generates all wait types: time delays, business hour windows, and reply-based waits with timeouts, all properly configured.

![image (29)](https://canny-assets.io/images/0d98dcc6a7f8b41b505a8ac36f15b244.png)

![image (30)](https://canny-assets.io/images/4e1c0fe00daf334fa447aa842b135c80.png)

![image (31)](https://canny-assets.io/images/7d00a04ec846832efaa0f2b1425912b3.png)

![image (32)](https://canny-assets.io/images/76619743c8a42ec9feb72f4c12afa288.png)

![image (33)](https://canny-assets.io/images/206f4faca3a9f46947510788cbd14f66.png)

# What's Fixed

**Safer Wait Times**

Negative/invalid values blocked, units normalized, extreme values capped and "years" intelligently interpreted as days.

**Predictable Wait Type Selection**

Simple delays and time window phrasing produce time based waits. Timeout branches only appear when you explicitly request them.

**Protected Workflow Structure**

Time waits enforced as single path. Accidental multi path nodes auto corrected with no broken transitions.

**Timezone & Multi-Path Improvements**

Timezone fields populate correctly. Multi path wait types always include configured timeout values.

# Why It Matters

Complex automation logic that previously required manual configuration can now be generated instantly through natural language, saving time and eliminating common errors.