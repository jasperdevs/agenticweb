const MAX_SOURCE_PREVIEW = 80000;

export function securityMeta() {
  return `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: blob:; style-src 'unsafe-inline'; script-src 'none'; font-src data:; media-src data: blob:; connect-src 'none'; form-action 'none'; base-uri 'none'">`;
}

export function sanitizeClientHtml(html) {
  return String(html || '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<script\b[^>]*\/?\s*>/gi, '')
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src|action|formaction)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, '$1="#"')
    .replace(/(href|src|action|formaction)\s*=\s*javascript:[^\s>]+/gi, '$1="#"')
    .replace(/<iframe\b[\s\S]*?<\/iframe>/gi, '')
    .replace(/<iframe\b[^>]*\/?\s*>/gi, '')
    .replace(/<object\b[\s\S]*?<\/object>/gi, '')
    .replace(/<embed\b[^>]*\/?\s*>/gi, '');
}

export function composeSrcdoc(html) {
  let doc = sanitizeClientHtml(html || '<!doctype html><title>Empty</title><body></body>');
  if (/^\s*```/i.test(doc)) doc = doc.replace(/^\s*```(?:html)?/i, '').replace(/```\s*$/i, '').trim();
  if (!/^\s*<!doctype html>/i.test(doc)) doc = `<!doctype html>\n${doc}`;

  const meta = securityMeta();
  if (/<head[^>]*>/i.test(doc)) doc = doc.replace(/<head([^>]*)>/i, `<head$1>${meta}`);
  else if (/<html[^>]*>/i.test(doc)) doc = doc.replace(/<html[^>]*>/i, match => `${match}<head>${meta}</head>`);
  else doc = `<!doctype html><html><head>${meta}</head><body>${doc}</body></html>`;
  return doc;
}

export function updateSourcePreview(sourceEl, statusEl, rawHtml) {
  const text = String(rawHtml || '');
  sourceEl.textContent = text.length > MAX_SOURCE_PREVIEW ? `… trimmed ${text.length - MAX_SOURCE_PREVIEW} chars …\n` + text.slice(-MAX_SOURCE_PREVIEW) : text;
  sourceEl.scrollTop = sourceEl.scrollHeight;
  statusEl.textContent = text.length ? `${Math.round(text.length / 1024)}kb` : 'waiting';
}
