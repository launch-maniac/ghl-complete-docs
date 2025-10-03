---
title: "User Context in Marketplace Apps"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/adfc6ad89ffb8-user-context-in-marketplace-apps"
extracted_at: "2025-10-03T06:23:08.687Z"
---

# User Context in Marketplace Apps

HighLevel provides a secure mechanism for accessing authenticated user information through signed tokens. This guide explains how you can generate and use `Shared Secret` key to access user context in secured manner.

## [

Setting Up Shared Secret

](#setting-up-shared-secret)

### [

Generating a Shared Secret Key

](#generating-a-shared-secret-key)

First you'll need to generate a Shared Secret key for your application:

1.  Navigate to your application's Advanced Settings
2.  Go to the Auth section
3.  Under Shared Secret, click the Generate button to create your Shared Secret key

![Shared Secret Key Generation](https://i.imgur.com/Xw3LGpo.png)

## [

Frontend Implementation Methods

](#frontend-implementation-methods)

There are two ways in which you can access this data in your frontend, depending on where your code runs:

### [

1\. Custom JavaScript Implementation

](#1-custom-javascript-implementation)

If you're using custom JavaScript injected into HighLevel pages, use the `exposeSessionDetails` method:

async function getUserData() {

  try {

    // APP\_ID is your application's unique identifier

    const encryptedUserData \= await window.exposeSessionDetails(APP\_ID)

    // Send this encrypted data to your backend for decryption

    const response \= await fetch('your-backend-endpoint', {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json'

      },

      body: JSON.stringify({ encryptedData: encryptedUserData })

    })

    const userData \= await response.json()

    return userData

  } catch (error) {

    console.error('Failed to fetch session details:', error)

    throw error

  }

}

### [

2\. Custom Pages Implementation

](#2-custom-pages-implementation)

If you're trying to get user context in custom page, use the `postMessage` method to communicate with the parent window:

async function getUserData() {

  try {

    const encryptedUserData \= await new Promise((resolve) \=> {

      // Request user data from parent window

      window.parent.postMessage({ message: 'REQUEST\_USER\_DATA' }, '\*')

      // Listen for the response

      const messageHandler \= ({ data }) \=> {

        if (data.message \=== 'REQUEST\_USER\_DATA\_RESPONSE') {

          window.removeEventListener('message', messageHandler)

          resolve(data.payload)

        }

      }

      window.addEventListener('message', messageHandler)

    })

    // Send encrypted data to your backend for decryption

    const response \= await fetch('your-backend-endpoint', {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json'

      },

      body: JSON.stringify({ encryptedData: encryptedUserData })

    })

    const userData \= await response.json()

    return userData

  } catch (error) {

    console.error('Failed to fetch user data:', error)

    throw error

  }

}

## [

Backend Implementation

](#backend-implementation)

Regardless of which frontend method you use, the backend decryption process remains the same:

const CryptoJS \= require('crypto-js')

function decryptUserData(encryptedUserData, sharedSecretKey) {

  try {

    const decrypted \= CryptoJS.AES.decrypt(encryptedUserData, sharedSecretKey).toString(CryptoJS.enc.Utf8)

    return JSON.parse(decrypted)

  } catch (error) {

    throw new Error('Failed to decrypt user data')

  }

}

// Example Express endpoint

app.post('/decrypt-user-data', (req, res) \=> {

  try {

    const { encryptedData } \= req.body

    const userData \= decryptUserData(encryptedData, process.env.GHL\_APP\_SHARED\_SECRET)

    res.json(userData)

  } catch (error) {

    res.status(400).json({ error: 'Failed to decrypt user data' })

  }

})

## [

Decrypted Data Structure

](#decrypted-data-structure)

After decryption, the data will be returned as a JSON object containing user information. The structure varies based on whether the user is accessing from an Agency or Location context.

### [

Agency Context

](#agency-context)

When accessing from an Agency context, the decrypted data will have the following structure:

{

  "userId": "MKQJ7wOVVmNOMvrnKKKK", // Unique identifier for the user

  "companyId": "GNb7aIv4rQFVb9iwNl5K", // Unique identifier for the company/agency

  "role": "admin", // User's role in the system

  "type": "agency", // Indicates this is an agency user

  "userName": "John Doe", // Full name of the user

  "email": "johndoe@gmail.com" // User's email address

}

### [

Location Context

](#location-context)

When accessing from a Location context, the decrypted data will include an additional `activeLocation` field:

{

  "userId": "MKQJ7wOVVmNOMvrnKKKK", // Unique identifier for the user

  "companyId": "GNb7aIv4rQFVb9iwNl5K", // Unique identifier for the company/agency

  "role": "admin", // User's role in the system

  "type": "agency", // Indicates this is an agency user

  "activeLocation": "yLKVZpNppIdYpah4RjNE", // Unique identifier for the active location

  "userName": "John Doe", // Full name of the user

  "email": "johndoe@gmail.com" // User's email address

}

### [

Field Descriptions

](#field-descriptions)

Field

Type

Description

userId

string

Unique identifier for the user

companyId

string

Unique identifier for the company/agency

role

string

User's role in the system (e.g., 'admin', 'user')

type

string

Context type ('agency' or 'location')

activeLocation

string

(Location context only) Unique identifier for the active location

userName

string

Full name of the user

email

string

User's email address

### [

Reference Implementation

](#reference-implementation)

For a complete example implementation, you can refer to our marketplace app template repository:

[GoHighLevel Marketplace App Template](https://github.com/GoHighLevel/ghl-marketplace-app-template/tree/main)

The relevant implementation can be found in the `/decrypt-sso` endpoint of the template.

### [

Security Considerations

](#security-considerations)

-   Never expose your Shared Secret key in client-side code
-   Always perform decryption on your backend
-   Store your Shared Secret key securely using environment variables
-   Use HTTPS for all communications between your frontend and backend
-   Regularly rotate your Shared Secret keys for enhanced security

[User Context in Marketplace Apps](#user-context-in-marketplace-apps "User Context in Marketplace Apps")[Setting Up Shared Secret](#setting-up-shared-secret "Setting Up Shared Secret")[Generating a Shared Secret Key](#generating-a-shared-secret-key "Generating a Shared Secret Key")[Frontend Implementation Methods](#frontend-implementation-methods "Frontend Implementation Methods")[1\. Custom JavaScript Implementation](#1-custom-javascript-implementation "1. Custom JavaScript Implementation")[2\. Custom Pages Implementation](#2-custom-pages-implementation "2. Custom Pages Implementation")[Backend Implementation](#backend-implementation "Backend Implementation")[Decrypted Data Structure](#decrypted-data-structure "Decrypted Data Structure")[Agency Context](#agency-context "Agency Context")[Location Context](#location-context "Location Context")[Field Descriptions](#field-descriptions "Field Descriptions")[Reference Implementation](#reference-implementation "Reference Implementation")[Security Considerations](#security-considerations "Security Considerations")