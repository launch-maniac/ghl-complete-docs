---
title: "[Compliance] Stay compliant with ACH payment on Stripe"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69a168204ef0c45ff8743e33"
author: "Sales &amp; Marketing"
pubDate: "2026-02-27T09:56:19.000Z"
link: "https://ideas.gohighlevel.com/changelog/compliance-stay-compliant-with-ach-payment-on-stripe"
categories: payments,new
url: "https://ideas.gohighlevel.com/changelog/compliance-stay-compliant-with-ach-payment-on-stripe"
index: 4
---

# Overview

Stripe is tightening requirements for ACH Direct Debit to align with Nacha operating rules. If you accept US bank account payments through HighLevel using Stripe, you may need to update your Stripe account details so customers can clearly identify your business on bank statements and have a way to contact you. [Stripe doc](https://support.stripe.com/questions/configure-your-account-for-nacha-compliance)

# NOTE - effective 20 March 2026

# Who needs to take action?

-   You have a Stripe account connected to HighLevel and accept ACH Direct Debit or plan to accept US bank account payments
-   Your subaccount/client who has a Stripe account connected to HighLevel and accepts ACH Direct Debit or plan to accept US bank account payments

# What you need to do in Stripe

You must choose how Stripe should classify your bank payment transactions. Stripe provides three options:

1.  Automatically classify transactions - Stripe determines whether each transaction represents a purchase of goods based on available signals such as merchant information and transaction details. This works for most businesses and requires no code changes.
2.  Classify all ACH transactions as goods - Choose this if you exclusively sell physical or digital products. All ACH transactions are classified as purchases of goods.
3.  Do not classify any transactions as goods - Choose this if you provide services, accept donations, or collect bill payments rather than selling goods.

# How to configure transaction classification in Stripe

1.  Open your Stripe Dashboard
2.  Go to Settings, then Payment, then look for Link

![image](https://canny-assets.io/images/ada19f7222ddab21ba4ad4cd56a988fd.png)

![image](https://canny-assets.io/images/fb0374a9cb1df942722bf7408135cecc.png)

1.  Locate the Nacha compliance section

![image](https://canny-assets.io/images/1c268ee6aeb7bb7b6b3b9e91fc44a470.png)

1.  Select one of the three classification options
2.  Save your changes

# FAQ

**Does HighLevel make these updates for me?**

No. These are settings on your Stripe account, so you must update them in Stripe Dashboard.

**I am not sure what to select here, who can help?**

This change and setting of the option is fully in control of Stripe. If you are facing issues in getting complete clarity, you must try reaching out to Stripe support.