# Codegen Browser

A local Chrome-like browser shell where synthetic addresses generate self-contained static HTML pages.

## Install

```powershell
npx agenticweb
```

From the repository root:

```powershell
npm install
npm start
```

For a permanent install:

```powershell
npm install -g agenticweb
agenticweb
```

Open:

```text
http://localhost:8787
```

## Codex OAuth

Agentic Web wraps Codex OAuth directly:

```powershell
npx agenticweb login
npx agenticweb status
npx agenticweb
```

The browser also exposes the same login flow through the Codex button.

## AI SDK Mode

Set an API key to stream model text directly through the Vercel AI SDK:

```powershell
$env:OPENAI_API_KEY="your_key_here"
$env:AI_PROVIDER="ai-sdk"
npx agenticweb
```

## Notes

Generated pages are forced to static HTML and CSS only. The sanitizer removes script tags, inline event handlers, `javascript:` URLs, and generated iframes. Browser navigation still works because the parent shell intercepts normal links and forms.
