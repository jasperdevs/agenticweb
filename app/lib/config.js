import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
export const ROOT_DIR = path.dirname(path.dirname(__filename));
export const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
export const ASSETS_DIR = path.join(ROOT_DIR, '..', 'assets');

export const config = Object.freeze({
  get version() { return process.env.SLOPWEB_VERSION || '1.0.0'; },
  get port() { return Number(process.env.PORT || 8787); },
  get allowLan() { return process.env.SLOPWEB_ALLOW_LAN === '1'; },
  get host() { return process.env.HOST || (process.env.SLOPWEB_ALLOW_LAN === '1' ? '0.0.0.0' : 'localhost'); },
  get codexBin() { return stripWrappingQuotes(process.env.CODEX_BIN || 'codex'); },
  get codexModel() { return process.env.CODEX_MODEL || 'gpt-5.3-codex-spark'; },
  get codexReasoningEffort() { return process.env.CODEX_REASONING_EFFORT || 'low'; },
  get codexTimeoutMs() { return Number(process.env.CODEX_TIMEOUT_MS || 120_000); },
  get aiProvider() { return (process.env.SLOPWEB_PROVIDER || process.env.AI_PROVIDER || 'auto').toLowerCase(); },
  get aiSdkModel() { return process.env.SLOPWEB_MODEL || process.env.AI_SDK_MODEL || ''; },
  get aiSdkBaseUrl() { return stripWrappingQuotes(process.env.SLOPWEB_BASE_URL || process.env.AI_SDK_BASE_URL || ''); },
  get aiSdkTimeoutMs() { return Number(process.env.AI_SDK_TIMEOUT_MS || process.env.CODEX_TIMEOUT_MS || 120_000); }
});

export function stripWrappingQuotes(value) {
  const text = String(value || '').trim();
  if (text.length >= 2) {
    const first = text[0];
    const last = text[text.length - 1];
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) return text.slice(1, -1);
  }
  return text;
}

export function shouldTryAiSdk() {
  if (config.aiProvider === 'codex') return false;
  if (['local', 'ai-sdk'].includes(config.aiProvider)) return true;
  return config.aiProvider === 'auto' || Boolean(config.aiSdkBaseUrl);
}
