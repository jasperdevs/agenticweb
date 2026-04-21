<p align="center">
  <img src="./assets/logo.png" alt="Agentic Web logo" width="220" />
</p>

<h1 align="center">Agentic Web</h1>

<p align="center">A new web where every site is generated with AI.</p>

## About

Agentic Web is an early project for exploring AI-generated websites: pages, interfaces, and web experiences produced by agents instead of hand-built from scratch.

## Install

After the package is published to npm, the fastest way to run Agentic Web is:

```powershell
npx agenticweb
```

Then open:

```text
http://localhost:8787
```

For a permanent install:

```powershell
npm install -g agenticweb
agenticweb
```

The app starts on `localhost` by default. LAN access is off unless you opt in with `--lan`.

If port `8787` is busy, Agentic Web automatically picks the next open port and prints the URL.

## Run From Source

If you are working from this repository:

```powershell
npm install
npm start
```

The first app is Codegen Browser, a local browser shell where synthetic addresses generate self-contained static HTML pages.

## Codex Login

Agentic Web includes a Codex OAuth wrapper. Run this once to connect:

```powershell
npx agenticweb login
```

Check auth status:

```powershell
npx agenticweb status
```

Start the browser:

```powershell
npx agenticweb
```

For direct AI SDK streaming instead:

```powershell
$env:OPENAI_API_KEY="your_key_here"
$env:AI_PROVIDER="ai-sdk"
npx agenticweb
```

## CLI Options

```powershell
agenticweb login
agenticweb status
agenticweb doctor
agenticweb --port 9000
agenticweb --strict-port
agenticweb --mock
agenticweb --lan
```

`agenticweb login` uses bundled Codex when available, then falls back to an existing `codex` command, `npx @openai/codex`, or `npm exec @openai/codex`.

## Package Status

This repository is ready to publish as the `agenticweb` npm package, but it has not been published from this repo yet. Until it is published, use the source install flow above.
