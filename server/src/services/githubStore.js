import { env } from '../config/env.js';

// Appends each lead to a JSON array file in a GitHub repo (one commit per lead).
// Optional: does nothing unless GITHUB_TOKEN and GITHUB_REPO are set.
const { token, repo, branch, path, apiUrl } = env.github;
export const githubEnabled = Boolean(token && repo);

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'anvexa-leads',
};
const url = () => `${apiUrl}/repos/${repo}/contents/${path.split('/').map(encodeURIComponent).join('/')}`;

async function readFile() {
  const res = await fetch(`${url()}?ref=${encodeURIComponent(branch)}`, { headers });
  if (res.status === 404) return { sha: undefined, list: [] };
  if (!res.ok) throw new Error(`GitHub read failed (${res.status})`);
  const data = await res.json();
  const text = Buffer.from(data.content || '', 'base64').toString('utf8');
  let list = [];
  try { list = text.trim() ? JSON.parse(text) : []; } catch { throw new Error(`${path} is not valid JSON — fix it in the repo`); }
  if (!Array.isArray(list)) throw new Error(`${path} must contain a JSON array`);
  return { sha: data.sha, list };
}

async function appendOnce(record) {
  const { sha, list } = await readFile();
  list.push(record);
  const res = await fetch(url(), {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `New lead: ${record.email}`,
      content: Buffer.from(JSON.stringify(list, null, 2) + '\n').toString('base64'),
      branch,
      ...(sha ? { sha } : {}),
    }),
  });
  if (res.status === 409 || res.status === 422) { const e = new Error('conflict'); e.conflict = true; throw e; }
  if (!res.ok) throw new Error(`GitHub write failed (${res.status})`);
}

// Serialise writes so two simultaneous submissions can't overwrite each other.
let queue = Promise.resolve();
export function saveLeadToGithub(record) {
  if (!githubEnabled) return Promise.resolve();
  const job = queue.then(async () => {
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try { return await appendOnce(record); } catch (e) { if (!e.conflict || attempt === 3) throw e; }
    }
    return undefined;
  });
  queue = job.catch(() => {});
  return job;
}
