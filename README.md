<p align="center">
  <img src="./assets/logo.png" alt="Agentic Web logo" width="220" />
</p>

<h1 align="center">Agentic Web</h1>

<p align="center">A new web where every site is generated with AI.</p>

## About

Agentic Web is an early project for exploring AI-generated websites: pages, interfaces, and web experiences produced by agents instead of hand-built from scratch.

## Run

```powershell
npm install
npm start
```

Open:

```text
http://localhost:8787
```

The first app is Codegen Browser, a local browser shell where synthetic addresses generate self-contained static HTML pages. By default it binds to `127.0.0.1` and uses your local Codex CLI auth.

## Codex Setup

```powershell
npm i -g @openai/codex
codex login
npm start
```

For direct AI SDK streaming instead, set `OPENAI_API_KEY` and `AI_PROVIDER=ai-sdk` before starting.
