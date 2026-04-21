export function makePrompt({ address, history = [] }) {
  const safeHistory = Array.isArray(history)
    ? history.slice(-4).map(item => String(item).slice(0, 120))
    : [];

  return `Return only one complete self-contained HTML file for:
${address}

Start with <!doctype html>. Include <html>, <head>, and <body>.
Use embedded <style> and embedded <script> if useful. No external assets, CDNs, iframes, trackers, network calls, credential/payment collection, malware, or parent/window access.
Make it feel like a real page for the address. Links/forms should point to plausible synthetic:// or normal-looking addresses so Slopweb can generate the next page.
Do not explain. Do not use markdown. Do not copy protected layouts/text.
History: ${safeHistory.length ? safeHistory.join(' | ') : 'none'}`;
}

export function makeJsonPrompt({ address, history = [] }) {
  const safeHistory = Array.isArray(history)
    ? history.slice(-8).map(item => String(item).slice(0, 200))
    : [];

  return `Return JSON with title, summary, html for ${address}.
html must be one complete self-contained document starting <!doctype html>. Embedded CSS and JS are allowed. No external network, iframes, trackers, credentials, payments, malware, or parent/window access.
History: ${safeHistory.length ? safeHistory.join(' | ') : 'none'}`;
}
