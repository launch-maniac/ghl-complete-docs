---
title: "Advanced Builder: Go-To Connections for Triggers"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "68ee2469bf0e204784217dd4"
author: "Ashwin Raghunandan"
pubDate: "2025-10-15T09:52:33.000Z"
link: "https://ideas.gohighlevel.com/changelog/advanced-builder-go-to-connections-for-triggers"
categories: automations,new
url: "https://ideas.gohighlevel.com/changelog/advanced-builder-go-to-connections-for-triggers"
index: 8
---

**What’s New**

You can now set a start action per trigger. Drag Go-To connections from the trigger to any action on the canvas - this means no more single entry path, you can define the entry path for each of your triggers!

**Why You’ll Love It**

Different triggers, different journeys. Aim each trigger at the exact node it should begin from and keep complex entry logic tidy (no giant if-else stacks).

**How It Works**

-   **Select a trigger** → drag its connector to the target action.
-   **Visual cue:** Go-To links for triggers render as a dashed line with an arrowhead (normal paths stay solid).
-   **Execution behavior:** When the trigger matches, the workflow jumps directly to that target action and continues from there.

![image](https://canny-assets.io/images/a630ce10fd074aeacfd068e5da93825b.png)

_You can set multiple Go-To connections for each trigger, allowing you to define exactly where a contact should start when that specific trigger fires._

**How To Use It**

-   Open your workflow in Advanced Builder.
-   Add/position your triggers and actions.
-   From each trigger, drag the dashed Go-To connection to the action where it should start.
-   Reassign later by dragging the same connector to a new node.
-   Save → Publish when ready.

**Additional Notes**

-   **Advanced Builder only:** Go-To Connections for Triggers are only available for the advanced builder upon release. This feature will be coming soon to the Standard Builder as well.
-   **Defaults & saving:** Unassigned (“dangling”) triggers auto-connect to the Root (first) action. All triggers must connect to exactly one action to save the workflow. Reassign anytime by dragging the dashed connector.
-   **Single enrollment per contact:** the same contact won’t run concurrently down multiple branches.
-   **Switching back to Standard Builder:** remove Advanced-only features (Go-To Triggers, Delinked nodes, Disabled nodes) first.

**Why it matters**

Previously, multiple entry paths meant duplicate workflows or deep if-else chains. Now, Go-To connections for triggers give you clean, maintainable, and dynamic routing - all within a single workflow