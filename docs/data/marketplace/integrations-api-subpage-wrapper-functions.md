---
title: "Wrapper Functions"
category: "marketplace"
type: "integrations-api-subpage"
url: "https://highlevel.stoplight.io/docs/integrations/342bca923152a-custom-js"
extracted_at: "2025-10-06T18:36:51.081Z"
---

# CustomJS

## [

Wrapper functions

](#wrapper-functions)

HighLevel provides functions to render contextual data & some utilities that can help developers customize experience for the user.

### [

1\. Local Storage and Cookies Management:

](#1-local-storage-and-cookies-management)

This feature provides utility methods to interact with localStorage and cookies efficiently.

**Local Storage Wrapper:**

-   Store data with a maximum size of 5KB per entry.
-   The wrapper automatically prefixes keys to prevent key collisions with `custom_`.
-   Stored data is automatically cleaned up when the Vue instance is destroyed.

_Usage:_

await  AppUtils.Storage.setData(key,  value); //  Store  data

await  AppUtils.Storage.getData(key); //  Retrieve  data

  

**Cookies Wrapper:**

-   Store data with a maximum size of 5KB per entry.
-   Set cookies with optional expiration (maximum of 2 days from the time of creation).
-   The wrapper automatically prefixes keys to prevent key collisions with `custom_`.

_Usage:_

await AppUtils.Storage.setCookie(key, value, expiryInHours)

//or

await AppUtils.Storage.setCookie(key, value) // Store data in a cookie

await AppUtils.Storage.getCookie(key) // Retrieve cookie value

* * *

### [

2\. Custom Events:

](#2-custom-events)

You can listen to custom application events for specific lifecycle hooks or activities.

**Events:**

-   **routeLoaded**: Emitted when the first route is loaded after application startup.
-   **routeChangeEvent**: Emitted on every route change after the initial route load.

_Usage:_

window.addEventListener('routeLoaded',callback)

window.addEventListener('routeChangeEvent',callback)

* * *

### [

3\. Routing Methods:

](#3-routing-methods)

Custom scripts can now control routing within the application via exposed methods.

**Methods:**

-   **getCurrentRoute()**: Get the current route info.
-   **navigate(options:INavigationOptions)**: Allows you to navigate to a different route via name or path.

interface INavigationOptions{

  name?: string

  path?: string

  params?: Record<string,  string\>

  query?: Record<string,  string\>

  replace?: boolean

  append?: boolean

}

_Usage:_

await AppUtils.RouteHelper.navigate({name: 'integrations-settings-v2'}); // Navigate to integrations page on current location

const path \= '/integration'

await AppUtils.RouteHelper.navigate({path}) // Navigates to marketplace apps page

const currentRoute \= await AppUtils.RouteHelper.getCurrentRoute();

console.log(currentRoute); // Logs current route information {fullPath, name, params, path, query}

* * *

### [

4\. Utility Methods:

](#4-utility-methods)

A set of utility methods is now available to provide essential contextual data for custom scripts.

**Methods:**

-   User Info: `getCurrentUser()` – Retrieves current user's information.
-   Current Location: `getCurrentLocation()` – Retrieves data about the user's current location.
-   Company Info: `getCompany()` – Retrieves information about the current company.

_Usage:_

const userInfo \= await AppUtils.Utilities.getCurrentUser();//{id, name, firstName, lastName, email, type, role}

const currentLocation \= await AppUtils.Utilities.getCurrentLocation();//{id, name, address: {address, city, country}}

const companyInfo \= AppUtils.Utilities.getCompany();//{id, name}

[CustomJS](#customjs "CustomJS")[Wrapper functions](#wrapper-functions "Wrapper functions")[1\. Local Storage and Cookies Management:](#1-local-storage-and-cookies-management "1. Local Storage and Cookies Management:")[2\. Custom Events:](#2-custom-events "2. Custom Events:")[3\. Routing Methods:](#3-routing-methods "3. Routing Methods:")[4\. Utility Methods:](#4-utility-methods "4. Utility Methods:")