---
title: "Gift Cards – Gift Card Creation, Selling, Sending &amp; Redemption Now Available for All"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69ce6243e0aedf02dabc071d"
author: "Sales &amp; Marketing"
pubDate: "2026-04-02T12:52:42.000Z"
link: "https://ideas.gohighlevel.com/changelog/gift-cards-gift-card-creation-selling-sending-redemption-now-available-for-all"
categories: payments,new
url: "https://ideas.gohighlevel.com/changelog/gift-cards-gift-card-creation-selling-sending-redemption-now-available-for-all"
index: 7
---

# What’s New?

Businesses can now run a complete, **end-to-end Gift Card System** inside the platform. This release introduces the **ability to create, sell, send, track, and redeem Gift Cards** across a wide range of checkouts. After running in **Labs for some time**, collecting solid customer feedback and implementing some of it immediately, we have launched Gift Cards for all agencies & sub-accounts.

Gift Cards function as a **flexible prepaid balance that customers can purchase for themselves or others—or that businesses can issue directly** for loyalty, compensation, refunds, or promotions.

This launch includes the following major capabilities:

**1\. Create Fully Customizable Gift Card Products**

Businesses can now create Gift Card Products from the new Gift Cards module under Payments. Gift Card Products include a **rich set of attributes**, such as:

-   Gift card name, description, terms & conditions along with an option to attach a redemption link in the emails
-   Expiry date (applies to all Gift Card Orders created from this product and is optional)
-   Artwork and branding elements - Custom Upload along with Creating your own gradients
-   Multiple denominations support with per-denomination inventory
-   Automatic taxes application using the Gift Card tax category (optional)
-   Categorization with 'Categories' (optional)
-   All of the above information can be reviewed with a preview of the gift card before creating the gift card

Additional nuances with gift card creation:

-   Gift Card Products **can be edited, archived, or deactivated** at any time.
-   When deactivated, their Sell and Send actions are disabled, and the dedicated checkout link or Store (where this gift card was added as a product) stops working immediately. On any other checkout if the gift card was added as a product, it would still continue to be sold unless manually removed.
-   Inventory definition separately for every denomination is not possible today. Once the inventory is defined, it applies individually to each denomination i.e. if quantity = 100 with 2 denominations, each denomination gets 100 i.e. a total of 200 gift cards.
-   Only automatic taxes with a fixed category are available for gift card related taxation.
-   Gift Card gets created on the last step of the process.

**2\. Sell Gift Cards Through Test & Live Mode Checkouts**

Every Gift Card Product **automatically receives a dedicated checkout page** in both Test and Live modes.

Businesses can sell Gift Cards through:

-   Dedicated Gift Card Checkout Link (unique per product)
-   **Embed Code** — add the dedicated checkout directly into any website page
-   **QR Code** — ideal for in-store displays or print campaigns or sharing via apps — redirect to the dedicated gift card checkout link
-   **Existing Checkouts** by adding the Gift Card as a Product to: Funnels (One-step and Two-step order forms), Forms (Sell Product), Payment Links, Invoices, Store, Calendar Payments (if products are supported) and Websites

At the dedicated checkout link, customers:

-   Choose a denomination from available options within the gift card product
-   Choose **Buy for 'Yourself'** or **Buy for 'Someone Else'**
-   “Someone Else”: captures recipient + purchaser (transaction receipt goes to purchaser; Gift Card goes to recipient)
-   Select **immediate or scheduled delivery**
-   Complete payment (in Live or Test mode depending on the link)
-   Gift Card Order for scheduled deliveries remains inactive until the scheduled delivery time but if the code is accessed, it can still be used for redemption.
-   Gift Cards **sold/purchased in test or live mode** can only be **used for redemption on checkouts in test or live modes respectively** i.e. redemption cannot be done for test gift cards on live checkouts or vice versa.

For gift cards purchased via existing checkouts:

-   If the invoice, payment link, store, funnel, etc. is in test mode, any gift card product purchased would also be purchased in test mode and can be redeemed only in test mode.
-   When gift card is sold as a product on any existing checkouts, the gift card is delivered to the email address of the customer buying the gift card.

**3\. Send Gift Cards Directly (No Payment Required)**

Businesses can issue gift cards to any customer using the Send flow (Live mode only). This makes it ideal for compensation, reward programs, customer delight, or replacing credits.

Process to send gift cards to customers:

-   Choose Customer from existing customers list
-   Add a personal message that would be sent with the gift card — you can also use _'Write with AI'_ to draft the message
-   Deliver via Email, SMS, QR link (via email), or PDF (via email) — you can send via any 1 mode where the mode would be active based on the availability of email address or phone number of the customer
-   Schedule delivery for a future date — Gift Card email/SMS is sent and becomes active on the scheduled date, without requiring a payment
-   View the preview of the communication content (non-editable) with the gift card and other details

Additional nuances with respect to sending gift cards:

-   Gift Cards issued via 'Send' appear under Gift Card Orders but not in the general Payments → Orders list, since no monetary purchase occurred.
-   Gift Cards direct **sending is currently only available in Live mode**.
-   Currently, you can only send 1 gift card to 1 customer in one flow, sending to multiple customers in a single attempt is not possible.
-   Sending a gift card also impacts inventory and reduces the inventory every time a gift card is sent.

**4\. Track All Gift Cards Using Gift Card Orders**

A new Gift Card Orders tab is available under Payments → Gift Cards, showing every issued card—whether purchased or directly sent. This tab becomes visible only after the first gift card is sent or sold.

The gift card orders page lists all the sold or sent gift cards along with their statuses, balances, filters and customer details. All cards on this page are clickable and open up a detailed page for that order.

The gift card order details page acts as the single source of truth for all Gift Cards in the account. For each Gift Card Order, businesses can view:

-   Purchaser info
-   Recipient info
-   Denomination
-   Expiry date (same as that of the gift card product)
-   Remaining balance
-   Status (Scheduled, Active, Inactive)
-   Hidden Gift Card number (visible inside the order details page)
-   Delivery method and delivery schedule

**5\. Redeem Gift Cards Across Multiple Checkouts**

Customers can now redeem gift cards on all checkouts that support the Gift Card Redemption UI. This includes:

-   Funnels
-   Forms
-   Payment Links
-   Invoices
-   Store checkout
-   Calendar payments (where applicable)
-   Any checkout using supported payment providers (Stripe, NMI, [Authorize.net](http://Authorize.net), Square) --> in case of partial payments or subscription purchases; More providers support coming in soon.
-   For a **payment entirely done with gift card for only one-time products**, the checkouts would be supporting gift card redemption agnostic of the payment provider.

**Redemption Behavior:**

-   Customers enter their Gift Card number at checkout
-   The remaining balance is shown instantly
-   Redemption can cover: Full amount (if balance ≥ order/invoice total & products are one-time)
-   Redemption can cover: Partial amount with the remaining balance charged to another payment method
-   Transactions show a new “Gift Card Balance Used” entry
-   Subscription purchases: If a subscription product is in the cart, the system will always collect an additional payment method even when the gift card covers the full initial charge (due to future billing requirements).
-   Gift card option on redemption is available only if at least 1 gift card product is created and either sent or purchased by a customer.
-   Gift card cannot be used on upsell purchases i.e. cannot be redeemed for buying anything via the Upsell flow.

# Major modifications included post Labs release:

Based on customer feedback we have ensured that the redemption now clearly calls out the following:

-   _Gift card applied_ - amount used from the gift card
-   _Remaining gift card balance_ - amount left in the gift card after redemption
-   _Amount left to pay_ - amount left to be paid that's not covered by the gift card (field only visible if additional payment is required)

# Where Can I Find This?

-   Payments → Gift Cards → Gift Card Products --> Create, edit, archive, deactivate, sell, or send Gift Cards.
-   Payments → Gift Cards → Gift Card Orders --> Track all issued Gift Cards, view balances, and open order details.
-   Dedicated 'Sell' checkout link / embed / QR --> Available under each Gift Card Product → Sell section.
-   Dedicated 'Send' --> Available under each Gift Card Product → Send section
-   Dedicated 'Send' --> Available under each Gift Card Product → QR Code → Issue Gift Card
-   Existing Checkouts --> Add Gift Cards as products to sell them through Funnels, Forms, Payment Links, Stores, etc.
-   Redeem via the Payment Element under any supported checkout and payment provider combination

# What’s Next?

Future enhancements planned:

-   Gift card redemption on off-session payments
-   Sending gift cards in 'Test' mode
-   User permissions for creation, issuing, and redemption
-   Dedicated link for customers to check balances
-   Usage transaction history log inside each Gift Card Order
-   Gift card triggers and actions - automation / workflow support
-   Public APIs, triggers, actions
-   Mobile app & POS support

# Visuals:

**Gift Card Product Creation:**

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/f4deff5bbea59130d408d66f9a7dd21f.jpeg)

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/7c525aed9caa365e412d3dd18888d939.jpeg)

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/6c0e203813c310598c43e7e366146530.jpeg)

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/9384352980c10cf337d25bd3d0100360.jpeg)

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/07dd96b928cdc46b9cb6051cca551fe3.jpeg)

**Gift Card Product - Sell with Direct Checkout Link:**

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/41b454b90c0eecd77e1c5f7c5a064795.jpeg)

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/3e8a19b7691b80783e128df08402a215.jpeg)

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/38f98ade75e5af06db83840228269900.jpeg)

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/d144a3cf05e08a0b66aac35dd3fd2d63.jpeg)

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/9aa5b3f6ab92207aff42d32605f0a7e0.jpeg)

**Gift Card Product - Send to Customers:**

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/e908bdde9b4599fe7b642d4eab1509ec.jpeg)

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/03df1bcb64cb5d00ad66c7f071a78d08.jpeg)

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/c68cec8b822c19ea6d5c5f791e09c91c.jpeg)

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/5fdb27f445fbc6d8a41c66c118537e36.jpeg)

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/a72a5f5c144534a59f967cae2fac2525.jpeg)

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/c36207865cf8c875c4df039eab5236c7.jpeg)

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/8a2ee3ed5575e0cb0046fb491f99a015.jpeg)

**Gift Card Redemption:**

![Screenshot 2026-04-02 at 6](https://canny-assets.io/images/6e1524536156aa59888a56c525be06ac.png)

**Additional Visuals:**

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/ec56eaf2c779bcedcc1687c75bcc1f7b.jpeg)

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/9d94fefa8c79c1a69c7830cc3c6ac797.jpeg)

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/d8b83d08c8c6b23a748e06aef5da2c85.jpeg)

![WhatsApp Image 2025-11-20 at 12](https://canny-assets.io/images/77091161d27f56e0fc0bb941e8cd23b9.jpeg)