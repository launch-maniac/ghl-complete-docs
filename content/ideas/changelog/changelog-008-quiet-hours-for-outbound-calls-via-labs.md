---
title: "Quiet hours for Outbound Calls (via Labs)"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "68d2b34a7bfd5f3fe7b1e082"
author: "Ronak Jindal"
pubDate: "2025-10-14T15:47:46.000Z"
link: "https://ideas.gohighlevel.com/changelog/quiet-hours-for-outbound-calls-via-labs"
categories: phone system,new
url: "https://ideas.gohighlevel.com/changelog/quiet-hours-for-outbound-calls-via-labs"
index: 8
---

10th of September, 2025

**Quiet hours for Outbound Calls**

**Summary**

Reduce after-hours outreach and improve answer rates with warnings based on the contact’s local time. The dialer shows the contact’s current time and prompts before placing a call outside professional hours (before 8am or after 9pm).

**What’s new**

-   Quiet-hours prompt on outbound calls from the web dialer

![Screenshot 2025-09-03 at 6](https://canny-assets.io/images/401ceb6c8fcf9ab557d8cb77126f6cd8.png)

-   Contact’s current local time shown in the dialer when it differs from the user’s time

![Screenshot 2025-09-03 at 6](https://canny-assets.io/images/2ca2cc18fc0a8728faba03150c301deb.png)

**How it works**

-   We store each contact’s timezone using this priority:

1.  timezone provided on import/creation
2.  inferred from phone number area code (new)
3.  sub-account (location) timezone

-   If a call/SMS is attempted outside 8am–9pm in the contact’s timezone, the user sees a warning with options (e.g., Cancel / Call anyway).
-   Applies to native Phone System and Twilio-integrated sub-accounts.

**Controls**

-   Enabled by default for all sub-accounts
-   Admins (agency and sub-account) can turn warnings off in: Settings → Phone Numbers → Additional Settings → Outbound Call → “Avoid calling people during quiet hours (9pm to 8am)”

![Screenshot 2025-09-04 at 1](https://canny-assets.io/images/7e72542cc82d5941672a1fb735fdddd5.png)

**Why it matters**

-   More considerate outreach → higher answer rates
-   Reduces complaints and risk of being reported for spammy behavior

**Notes and limitations**

-   Area-code inference is best-effort and may be inaccurate for ported or virtual numbers
-   For cross-country calls, the contact’s quiet hours apply
-   Deskphone and mobile app behaviour are unchanged; prompts appear in the web app dialer. Mobile app support coming soon
-   Quiet hours support for SMS coming soon
-   Does not apply to workflow calls. You can configure it under each workflow's settings
-   Available via Labs

![Screenshot 2025-09-04 at 12](https://canny-assets.io/images/643ce431f71b1736e83e65a82e8f1dcb.png)