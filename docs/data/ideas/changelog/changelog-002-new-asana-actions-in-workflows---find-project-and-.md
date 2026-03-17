---
title: "New Asana actions in workflows - Find Project and Find section"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69b92a6ae8dccf351e6cbbd2"
author: "Srikanth Chellaboina"
pubDate: "2026-03-17T10:20:26.000Z"
link: "https://ideas.gohighlevel.com/changelog/new-asana-actions-in-workflows-find-project-and-find-section"
categories: new
url: "https://ideas.gohighlevel.com/changelog/new-asana-actions-in-workflows-find-project-and-find-section"
index: 2
---

**Find Project** :

Easily search and retrieve an Asana project within your workflows.

**What it does:**

-   Locate projects by name and retreive its project ID
-   Use the project data in downstream steps

**Why it matters:**

-   No more hardcoding project IDs or saving in custom value picker.

![image](https://canny-assets.io/images/d923b4e7443e48f541ed9f47848a1b6f.png)

![image](https://canny-assets.io/images/dbe5ebd3210a7643a8561f560eaf4b7a.png)

**Find sections:**

Find sections within a specific Asana project to use the schema in subsequent actions. Outputs a section ID.

**What it does:**

-   Fetch sections and their ID inside a selected project
-   Dynamically route and create tasks in the specific section

**Why it matters:**

-   Earlier creating tasks in a specific section wasn't possible because users had to harcode the particular section ID, with this we can find it dynamically.

![image](https://canny-assets.io/images/79bc89db8941a3f2c3fc3a7c0f67de34.png)

![image](https://canny-assets.io/images/fdf7e9f7fa00fc2a1f369b024141cdf9.png)

**Use Cases**

-   Using find project - Users can retrieve the project ID with the name instead of saving the project ID in custom value pickers.
-   Using the section ID from Find section action, you can pass this dynamically into "create task" to create a task in that particular section.

![Screenshot 2026-03-17 at 15](https://canny-assets.io/images/9511ef116019fa745cb5473ecd6deb9d.png)