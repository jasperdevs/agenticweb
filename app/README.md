# Slopweb

A local shell where synthetic addresses generate self-contained HTML pages.

## Install

```powershell
npx slopweb
```

```powershell
pnpm dlx slopweb
```

From the repository root:

```powershell
pnpm install
pnpm start
```

For a permanent install:

```powershell
npm install -g slopweb
slopweb
```

Open:

```text
http://localhost:8787
```

## Codex OAuth

Slopweb wraps Codex OAuth directly:

```powershell
npx slopweb login
npx slopweb status
npx slopweb
```

The app also exposes the same login flow through the Codex button. Slopweb uses an existing `codex` command when it finds one, then falls back to `npx @openai/codex`.

## AI SDK Mode

Set an API key to stream model text directly through the Vercel AI SDK:

```powershell
npm install -g slopweb ai @ai-sdk/openai zod
$env:OPENAI_API_KEY="your_key_here"
$env:AI_PROVIDER="ai-sdk"
slopweb
```

## Slash Commands

Type these in the address bar:

```text
/help
/search robots making websites
/go synthetic://news/world-wire
/source
/login
/clear
```

## Notes

Generated pages are self-contained HTML files. External network calls, generated iframes, embeds, and `javascript:` URLs are blocked; links and forms route back through the shell.
