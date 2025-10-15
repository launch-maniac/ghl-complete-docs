---
title: "Advanced Builder: De-Linked Nodes for Workflows"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "68ee6dd90125c986ff765787"
author: "Ashwin Raghunandan"
pubDate: "2025-10-15T10:02:56.000Z"
link: "https://ideas.gohighlevel.com/changelog/advanced-builder-de-linked-nodes-for-workflows"
categories: automations,new
url: "https://ideas.gohighlevel.com/changelog/advanced-builder-de-linked-nodes-for-workflows"
index: 5
---

**What’s New!**

Lay out independent branches in your workflows. Design multiple mini-flows side-by-side in one canvas.

**Why You’ll Love It**

Branch out your workflows visually - separate paths are easy to read, test, and evolve. Pair this with go-to connections for triggers to start any mini workflows branch from the triggers.

![image](https://canny-assets.io/images/8731608ab8ffbbea17c5a263581eecb0.png)

**How It Works**

-   **Delinked = independent nodes:** Drop actions anywhere in the canvas that isn’t wired into the main line.
-   **Start it with a trigger:** Attach a trigger using the Go-To connections (dashed link) so that trigger begins on this branch.
-   **Execution Behavior:** Each branch can run independently within the same workflow

**How To Use It**

-   Open your workflow in Advanced Builder.
-   Build one or more delinked clusters of actions.
-   Use the Go-To connection from the chosen trigger to the first node of each cluster.
-   (Optional) Add sticky notes/colors to label each branch.
-   Save → Publish when satisfied.

**Additional Notes**

-   **Advanced Builder only:** Go-To Connections for Triggers are only available for the advanced builder upon release.
-   **Single enrollment per contact:** the same contact won’t run concurrently down multiple branches.
-   **Switching back to Standard Builder:** remove Advanced-only features (Go-To Triggers, Delinked nodes, Disabled nodes) first.