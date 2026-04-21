export async function checkAuthStatus() {
  const res = await fetch('/api/auth/status');
  if (!res.ok) throw new Error(`Auth check failed: ${res.status}`);
  return res.json();
}

export async function readNdjsonStream(response, onEvent) {
  if (!response.body) throw new Error('Streaming is not supported in this client.');
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let newline;
      while ((newline = buffer.indexOf('\n')) !== -1) {
        const line = buffer.slice(0, newline).trim();
        buffer = buffer.slice(newline + 1);
        if (line) onEvent(JSON.parse(line));
      }
    }
    const last = buffer.trim();
    if (last) onEvent(JSON.parse(last));
  } finally {
    reader.releaseLock();
  }
}
