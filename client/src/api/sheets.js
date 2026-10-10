// Apps Script cannot expose a readable cross-origin POST response. Read a non-sensitive,
// random-token receipt through its supported JSONP Content Service instead.
export async function submitSheets(url, record, { fetchImpl = globalThis.fetch, windowImpl = window, documentImpl = document, timeoutMs = 25_000, pollMs = 750 } = {}) {
  const endpoint = new URL(url);
  if (endpoint.protocol !== 'https:' || endpoint.hostname !== 'script.google.com' || !/^\/macros\/s\/[^/]+\/exec$/.test(endpoint.pathname)) throw new Error('Invalid Google Sheets endpoint.');
  const receipt = windowImpl.crypto.randomUUID().replaceAll('-', '');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const capability = await readReceipt(endpoint, receipt, controller.signal, windowImpl, documentImpl);
    if (capability.version !== 2) throw new Error('Please update the Google Sheets integration.');
    await fetchImpl(endpoint.href, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ ...record, receipt }), signal: controller.signal });
    while (!controller.signal.aborted) {
      const result = await readReceipt(endpoint, receipt, controller.signal, windowImpl, documentImpl);
      if (result.ok === true) return;
      if (result.ok === false) throw new Error(result.message || 'The sheet rejected the enquiry.');
      await pause(pollMs, controller.signal);
    }
    throw new Error('Could not confirm the enquiry was saved.');
  } finally { clearTimeout(timer); controller.abort(); }
}

function pause(ms, signal) {
  return new Promise((resolve, reject) => {
    signal.throwIfAborted();
    const abort = () => { clearTimeout(timer); reject(new Error('Confirmation timed out.')); };
    const timer = setTimeout(() => { signal.removeEventListener('abort', abort); resolve(); }, ms);
    signal.addEventListener('abort', abort, { once: true });
  });
}

function readReceipt(endpoint, receipt, signal, windowImpl, documentImpl) {
  return new Promise((resolve, reject) => {
    signal.throwIfAborted();
    const callback = `anvexaReceipt_${receipt}`;
    const script = documentImpl.createElement('script');
    const target = new URL(endpoint);
    target.searchParams.set('receipt', receipt);
    target.searchParams.set('callback', callback);
    target.searchParams.set('_', String(Date.now()));
    const cleanup = () => { script.remove(); delete windowImpl[callback]; signal.removeEventListener('abort', abort); };
    const abort = () => { cleanup(); reject(new Error('Confirmation timed out.')); };
    windowImpl[callback] = (value) => { cleanup(); resolve(value || { pending: true }); };
    script.onerror = () => { cleanup(); reject(new Error('Could not read the delivery receipt.')); };
    script.src = target.href;
    signal.addEventListener('abort', abort, { once: true });
    documentImpl.head.appendChild(script);
  });
}
