---
title: "AI Agent Action now has MCP (Model Context Protocol) as Tool"
type: "changelog"
source: "ideas.gohighlevel.com"
guid: "69e2307fa20d0129da43ee02"
author: "Divyam Bhadoria"
pubDate: "2026-04-17T14:02:00.000Z"
link: "https://ideas.gohighlevel.com/changelog/ai-agent-action-now-has-mcp-model-context-protocol-as-tool"
categories: automations,new
url: "https://ideas.gohighlevel.com/changelog/ai-agent-action-now-has-mcp-model-context-protocol-as-tool"
index: 4
---

# What's New

The AI Agent action now supports MCP connections, allowing your agent to connect to external apps and services in real time. Instead of being limited to data inside your CRM, the agent can now reach search engines, browsers, databases, APIs, and any MCP-compatible server, directly within a workflow.

![Screenshot 2026-04-17 at 7](https://canny-assets.io/images/f1124c22616292f0a12eba29e05f7e6f.png)

-   MCP tool connections — Connect any MCP compatible server as a tool for your agent, giving it real-time access to external data and services.
-   Automatic tool discovery — Test a connection and instantly see every tool the server offers.
-   Granular tool control — Enable or disable individual tools per agent.

![Screenshot 2026-04-17 at 7](https://canny-assets.io/images/c5ab67d20c503452cce255dc14d31964.png)

![Screenshot 2026-04-17 at 7](https://canny-assets.io/images/aa740e7a5bf1b86e3fe293240d3510ae.png)

# How to Use

1.  Open the AI Agent node in your workflow.
2.  Click Add Tools and go to the MCP tab.
3.  Click Add Connection and configure: Connection Name, Server URL, Transport Type (HTTP Streamable or SSE), and Auth Type (None, Bearer Token, API Key, OAuth2, or Custom Header).
4.  Click Test Connection to discover available tools.
5.  Select which tools the agent can use, then save.

![Screenshot 2026-04-17 at 7](https://canny-assets.io/images/1f0a11db6f002470ef763b920e0d3d12.png)

Any MCP-compatible server works out of the box. Popular options include Exa (AI-powered web search), Tavily (real-time web search and page extraction), and Browserbase (full browser automation). Custom MCP servers and open-source options are also supported.

# Why This Matters

-   Beyond CRM data — The AI Agent is no longer confined to what's stored in your account. It can pull live information from any connected external service during a workflow run.
-   Open ecosystem — MCP is an open standard with a growing library of prebuilt servers. You're not locked into a fixed set of integrations.
-   Extensible by design — Start with a prebuilt MCP server today and plug in custom or internal tools as your needs grow.
-   Granular control — You decide exactly which tools each agent can access, keeping workflows predictable and secure.
-   Technical Details

Transport types: HTTP Streamable, SSE

-   Auth options: None, Bearer Token, API Key, OAuth2, Custom Header
-   Tool discovery is automatic via Test Connection
-   Tool selection is configurable at the agent level