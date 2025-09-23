---
title: "Marketplace | Automated webhook retries"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "68d2684318a687c3b87e6ee1"
author: "Karthik Anand (HighLevel)"
pubDate: "2025-09-23T09:29:38.000Z"
link: "https://ideas.gohighlevel.com/changelog/marketplace-automated-webhook-retries"
categories: app marketplace,api,new
url: "https://ideas.gohighlevel.com/changelog/marketplace-automated-webhook-retries"
index: 2
---

# 🚀 Overview

We’ve rolled out a smarter error handling and retry system for Marketplace app developers! This ensures more predictable webhook delivery behavior and prevents accidental server overload when rate limits are hit.

# ✨ What’s new?

-   **Retries only on HTTP 429s**: We now retry webhook deliveries only when your endpoint returns a 429 (rate limit) response.
-   **Jitter protection**: Randomized retry timing prevents the “thundering herd” problem and spreads load evenly across servers.

**Retry schedule**:

-   Interval: 10 minutes between retries (with jitter)
-   Max attempts: 6 retries
-   Total retry duration: ~1 hour 10 minutes

**Retry Conditions:**

-   Retries stop if you return any status other than 429
-   We do not retry on 5xx server errors – those are treated as permanent failures.

# 🛠 How to use it as a Developer?

Here’s how you can make the most of this system:

✅ Return 200 OK for successful deliveries

✅ Even if processing fails internally, still return 200 OK to acknowledge receipt:

❌ Only use error codes when absolutely necessary:

-   408 → Server too slow
-   429 → Too many requests
-   5xx → Server is down/broken (no retries will be attempted)

# 💡 Why this is important?

This new system makes webhook delivery more reliable, reduces server stress during peak loads, and gives you predictable retry behavior you can build against. Developers now have more control, fewer surprises, and safer scaling.

# ⏩ What's next?

Webhook dashboard for marketplace app developers to track the webhook delivery status and webhook contents in the Marketplace developer portal.