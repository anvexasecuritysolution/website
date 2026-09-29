// Appends a record to a JSON array file in a GitHub repo (Contents API).
// Env (set in Vercel): GITHUB_TOKEN, GITHUB_REPO="owner/name", GITHUB_BRANCH, GITHUB_LEADS_PATH
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function appendJson(record) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  const path = process.env.GITHUB_LEADS_PATH || 'data/leads.json';
  if (!token || !repo) throw new Error('GITHUB_TOKEN / GITHUB_REPO are not set');

  const url = `https://api.github.com/repos/${repo}/contents/${path.split('/').map(encodeURIComponent).join('/')}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'anvexa-leads',
  };

  // Several serverless instances can write at once; on a sha conflict re-read and retry.
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    let sha;
    let list = [];
    const get = await fetch(`${url}?ref=${encodeURIComponent(branch)}`, { headers });
    if (get.status !== 404) {
      if (!get.ok) throw new Error(`GitHub read failed (${get.status})`);
      const data = await get.json();
      sha = data.sha;
      const text = Buffer.from(data.content || '', 'base64').toString('utf8');
      try { list = text.trim() ? JSON.parse(text) : []; } catch { throw new Error(`${path} is not valid JSON`); }
      if (!Array.isArray(list)) throw new Error(`${path} must contain a JSON array`);
    }
    list.push(record);
    const put = await fetch(url, {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `New lead: ${record.email}`,
        content: Buffer.from(JSON.stringify(list, null, 2) + '\n').toString('base64'),
        branch,
        ...(sha ? { sha } : {}),
      }),
    });
    if (put.ok) return;
    if ((put.status === 409 || put.status === 422) && attempt < 5) { await sleep(150 * attempt + Math.random() * 250); continue; }
    throw new Error(`GitHub write failed (${put.status})`);
  }
}
