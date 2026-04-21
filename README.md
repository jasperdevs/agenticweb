<p align="center">
  <img src="./assets/logo.png" alt="Slopweb logo" width="220" />
</p>

<h1 align="center">Slopweb</h1>

<p align="center">A new web where AI generates every page.</p>

## Install

```powershell
npm install -g slopweb
slopweb
```

Open:

```text
http://localhost:8787
```

Slopweb starts on `localhost` by default. If port `8787` is busy, it picks the next open port and prints the URL.

<details>
<summary>Try without installing</summary>

```powershell
npx slopweb
```

```powershell
pnpm dlx slopweb
```

</details>

<details>
<summary>Codex login</summary>

Slopweb uses an existing `codex` command when it finds one, then falls back to `npx @openai/codex`.

Connect Codex once:

```powershell
slopweb login
```

Check status:

```powershell
slopweb status
```

Sign out:

```powershell
slopweb logout
```

</details>

<details>
<summary>CLI options</summary>

```powershell
slopweb
slopweb open
slopweb --port 9000
slopweb -p 9000 -o
slopweb --strict-port
slopweb --mock
slopweb --lan
slopweb health
slopweb doctor
```

`--lan` exposes the local server on your network. Keep the default for normal local use.

</details>

<details>
<summary>Slash commands</summary>

Type these in the Slopweb address bar:

```text
/help
/search robots making websites
/go synthetic://news/world-wire
/source
/login
/clear
```

</details>

<details>
<summary>AI SDK mode</summary>

Use direct model streaming with an API key:

```powershell
npm install -g ai @ai-sdk/openai zod
$env:OPENAI_API_KEY="your_key_here"
$env:AI_PROVIDER="ai-sdk"
slopweb
```

</details>

<details>
<summary>Run from source</summary>

```powershell
pnpm install
pnpm start
```

Run checks:

```powershell
pnpm run check
```

</details>

<details>
<summary>License</summary>

MIT

</details>
