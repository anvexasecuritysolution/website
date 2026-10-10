import { createHmac } from 'node:crypto';

export class RateLimitError extends Error {
  constructor() { super('Too many submissions. Please try again later.'); this.status = 429; }
}

export function githubConfig() {
  return {
    token: process.env.GITHUB_TOKEN, repo: process.env.GITHUB_REPO,
    branch: process.env.GITHUB_BRANCH || 'main', path: process.env.GITHUB_LEADS_PATH || 'data/leads.json',
    storageMode: process.env.GITHUB_STORAGE_MODE || 'array', recordsPath: process.env.GITHUB_RECORDS_PATH || 'data/leads',
    ratePath: process.env.GITHUB_RATE_PATH || 'data/_rate-limits', apiUrl: process.env.GITHUB_API_URL || 'https://api.github.com',
  };
}

function store(config, signal) {
  if (!config.token || !config.repo) throw new Error('GITHUB_TOKEN / GITHUB_REPO are not set');
  const headers = {
    Authorization: `Bearer ${config.token}`, Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'anvexa-leads',
  };
  const url = (path) => `${config.apiUrl}/repos/${config.repo}/contents/${path.split('/').map(encodeURIComponent).join('/')}`;
  return {
    async read(path, fallback) {
      const target = `${url(path)}?ref=${encodeURIComponent(config.branch)}`;
      const res = await fetch(target, { headers, signal });
      if (res.status === 404) return { sha: undefined, value: fallback };
      if (!res.ok) throw new Error(`GitHub read failed (${res.status})`);
      const file = await res.json();
      let text;
      if (file.encoding === 'base64' && typeof file.content === 'string') text = Buffer.from(file.content, 'base64').toString('utf8');
      else {
        // GitHub omits inline content above 1 MB. Never interpret this as an empty lead list.
        const raw = await fetch(target, { headers: { ...headers, Accept: 'application/vnd.github.raw+json' }, signal });
        if (!raw.ok) throw new Error(`GitHub raw read failed (${raw.status})`);
        text = await raw.text();
      }
      let value;
      try { value = JSON.parse(text); } catch { throw new Error(`${path} is not valid JSON`); }
      return { sha: file.sha, value };
    },
    async write(path, value, sha, message) {
      const res = await fetch(url(path), {
        method: 'PUT', headers: { ...headers, 'Content-Type': 'application/json' }, signal,
        body: JSON.stringify({ message, content: Buffer.from(JSON.stringify(value, null, 2) + '\n').toString('base64'), branch: config.branch, ...(sha ? { sha } : {}) }),
      });
      if (res.ok) return true;
      if (res.status === 409 || res.status === 422) return false;
      throw new Error(`GitHub write failed (${res.status})`);
    },
  };
}

async function retry(signal, attempt) {
  signal.throwIfAborted();
  await new Promise((resolve, reject) => {
    const abort = () => { clearTimeout(timer); reject(signal.reason); };
    const timer = setTimeout(() => { signal.removeEventListener('abort', abort); resolve(); }, 100 * attempt + Math.random() * 100);
    signal.addEventListener('abort', abort, { once: true });
  });
}

export async function appendJson(record, config = githubConfig()) {
  const signal = AbortSignal.timeout(config.timeoutMs ?? 12_000);
  const github = store(config, signal);
  if (!['array', 'records'].includes(config.storageMode)) throw new Error('GITHUB_STORAGE_MODE must be array or records');
  const path = config.storageMode === 'records'
    ? `${config.recordsPath}/${record.submittedAt.slice(0, 10).replaceAll('-', '/')}/${record.id}.json` : config.path;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const { sha, value } = await github.read(path, config.storageMode === 'records' ? null : []);
    if (config.storageMode === 'records' && value) {
      if (value.id === record.id) return;
      throw new Error('Lead record already exists');
    }
    if (config.storageMode === 'array' && !Array.isArray(value)) throw new Error(`${path} must contain a JSON array`);
    if (config.storageMode === 'array' && value.some((lead) => lead.id === record.id)) return;
    const next = config.storageMode === 'records' ? record : [...value, record];
    if (await github.write(path, next, sha, `Save lead ${record.id}`)) return;
    if (attempt < 5) await retry(signal, attempt);
  }
  throw new Error('GitHub write conflict. Please try again.');
}

// Shared by all serverless instances: SHA-checked writes prevent concurrent requests bypassing the limit.
export async function consumeRateLimit(ip, config = githubConfig(), now = Date.now()) {
  const signal = AbortSignal.timeout(config.rateTimeoutMs ?? 8_000);
  const github = store(config, signal);
  const hash = createHmac('sha256', config.token).update(ip).digest('hex');
  const path = `${config.ratePath}/${hash.slice(0, 2)}/${hash}.json`;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const { sha, value } = await github.read(path, []);
    if (!Array.isArray(value) || value.some((t) => typeof t !== 'number')) throw new Error('Invalid rate-limit data');
    const recent = value.filter((t) => now - t < 3600_000);
    if (recent.length >= 8) throw new RateLimitError();
    if (await github.write(path, [...recent, now], sha, 'Update submission rate limit')) return;
    if (attempt < 5) await retry(signal, attempt);
  }
  throw new Error('Could not reserve a submission. Please try again.');
}
