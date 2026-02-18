---
title: "Manus triggers and actions in Workflows"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "699309fe8ad508922ad0e04b"
author: "Srikanth Chellaboina"
pubDate: "2026-02-16T12:17:01.000Z"
link: "https://ideas.gohighlevel.com/changelog/manus-triggers-and-actions-in-workflows"
categories: new
url: "https://ideas.gohighlevel.com/changelog/manus-triggers-and-actions-in-workflows"
index: 5
---

**What’s Improved?**

We’ve added native Manus triggers and actions to Workflows, enabling you to create, manage, and automate Manus tasks directly inside HighLevel - without relying on third-party automation tools.

This integration allows you to trigger workflows based on Manus task activity and perform task operations like creating, updating, continuing, fetching, or deleting tasks - all from within GHL.

Manus is a task-based AI system where each task:

• Starts with an initial prompt

• Processes structured AI logic

• Returns a response or output

• Can be continued with additional prompts

**With this integration, HighLevel can both:**

Send instructions to Manus

React to Manus task lifecycle events

**Key Enhancements**

**Triggers (Manus → HighLevel)**

These triggers initiate workflows when activity happens in Manus:

-   **New Task Created** – Fires when a new task is created in Manus
-   **Task Stopped** – Fires when a Manus task is stopped or completed

![image](https://canny-assets.io/images/644b1a02b589e0ead0cadd3e0b0566ef.png)

**Important Notes:**

Triggers fire only when a task is created via a workflow action

Tasks created directly inside the Manus app will not trigger workflow

**Actions (HighLevel → Manus)**

Manage Manus tasks directly inside workflows:

-   **Create Task** – Create a new task in Manus
-   **Get Task** – Retrieve details of a specific task
-   **Update Task** – Modify task metadata or parameters
-   **Fetch Tasks** – Retrieve a list of tasks
-   **Delete Task** – Remove a task
-   **Continue a Task with a Prompt** – Add a follow-up prompt to an existing task

![image](https://canny-assets.io/images/069c264e089ec23b41bea6659abd4bbc.png)

**How to Connect**

**From Workflow Builder**

-   Go to Automation → Workflows
-   Add a Manus trigger or action
-   Click Connect Now
-   Authenticate using your Manus API key

**From Integrations Page**

-   Go to Settings → Integrations
-   Select Manus
-   Click Connect
-   Enter your API key

**Getting Your API Key**

-   Navigate to Manus API Settings
-   Click Create New
-   Copy the generated key
-   Paste it into HighLevel when prompted

![image](https://canny-assets.io/images/165e79911dbda6f0e2bb53c79b5ab554.png)

**Best Practice**

Store the Task ID returned from “Create Task” in a custom field.

You’ll need it to:

-   Get Task
-   Continue Task
-   Update Task
-   Delete Task

This enables structured, multi-step AI workflows.

**Notes**

-   Triggers poll every 5 minutes
-   Only tasks created via workflows trigger events
-   Full AI outputs and lifecycle history are available in Manus
-   Manus actions and triggers are premium workflow steps
-   AI usage is billed by Manus separately
-   Task limits depend on your Manus subscription

**Frequently Asked Questions**

**Where can I view the full output of a Manus task?**

Full task details, prompt history, and lifecycle status are available in the Manus dashboard. HighLevel confirms task initiation and returns the Task ID

**How do I retrieve task output inside HighLevel?**

Use the Get Task action and reference the stored Task ID

**Why might a task fail?**

Common reasons include:

-   Integration disconnected
-   Invalid Task ID
-   Task already stopped
-   Missing required prompt input
-   API authorization failure

Check Automation → Workflows → Execution Logs for details

**Are Manus actions premium?**

Yes, they follow HighLevel Premium Workflow billing rules

**Does HighLevel include AI credits for Manus?**

No. AI usage is billed directly by Manus, along with standard automation rates in HighLevel.