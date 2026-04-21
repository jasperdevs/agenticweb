import { createReadStream, existsSync } from 'node:fs';
import path from 'node:path';
import { PUBLIC_DIR } from './config.js';

const MIME_TYPES = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.ico', 'image/x-icon']
]);

export function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

export function sendText(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

export async function readJsonBody(req, limitBytes = 64_000) {
  let total = 0;
  const chunks = [];
  for await (const chunk of req) {
    total += chunk.length;
    if (total > limitBytes) throw new Error('Request body too large.');
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export function sendNdjson(res, payload) {
  res.write(`${JSON.stringify(payload)}\n`);
}

export async function serveStatic(req, res) {
  let pathname;
  try {
    const rawPath = String(req.url || '/').split(/[?#]/, 1)[0] || '/';
    pathname = decodeURIComponent(rawPath);
  } catch {
    sendText(res, 400, 'Bad request');
    return;
  }
  if (pathname === '/') pathname = '/index.html';

  const requestedPath = path.resolve(PUBLIC_DIR, `.${pathname}`);
  const relativePath = path.relative(PUBLIC_DIR, requestedPath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    sendText(res, 403, 'Forbidden');
    return;
  }

  const filePath = existsSync(requestedPath) ? requestedPath : path.join(PUBLIC_DIR, 'index.html');
  const ext = path.extname(filePath).toLowerCase();
  const type = MIME_TYPES.get(ext) || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  createReadStream(filePath).pipe(res);
}
