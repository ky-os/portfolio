# Serena MCP (repo-local setup)

This repo includes local MCP server config files so MCP-enabled clients can run Serena against this workspace.

## What’s included

- `.cursor/mcp.json`: Cursor workspace MCP config
- `.windsurf/mcp.json`: Windsurf workspace MCP config
- `.vscode/mcp.json`: VS Code workspace MCP config (if your VS Code MCP integration supports workspace config files)

All configs launch Serena via Docker (no local Python tooling required).

## Prereqs

- Docker Desktop installed and running
- Ability to pull `ghcr.io/oraios/serena:latest`

## How it runs

The MCP server is started with stdio transport and the project mounted to `/workspace/project` inside the container.

If you prefer running via `uvx` instead of Docker, Serena supports:

```bash
uvx --from git+https://github.com/oraios/serena serena start-mcp-server --context ide-assistant --project "$(pwd)"
```
