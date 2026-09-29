import localPosts from '../data/posts.js';

const BASE = (import.meta.env.VITE_API_URL || '') + '/api';
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '';
const SHEETS_URL = import.meta.env.VITE_SHEETS_URL || '';

export class ApiError extends Error {
  constructor(message, status, fields) {
    super(message);
    this.status = status;
    this.fields = fields || {};
  }
}

async function request(path, { method = 'GET', body, token } = {}) {
  let res;
  try {
    res = await fetch(BASE + path, {
      method,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError('Network error. Please check your connection and try again.', 0);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(data.message || 'Request failed.', res.status, data.errors);
  return data;
}

// Serverless lead capture: email via Web3Forms and/or a row in Google Sheets.
// Used when VITE_WEB3FORMS_KEY / VITE_SHEETS_URL are set; otherwise the /api backend is used.
async function submitServerless(p) {
  const record = {
    submittedAt: new Date().toISOString(),
    firstName: p.firstName, lastName: p.lastName, email: p.email, company: p.company,
    industry: p.industry, service: p.service, message: p.message, status: 'new',
  };
  const jobs = [];
  if (WEB3FORMS_KEY) {
    jobs.push(
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Anvexa enquiry from ${p.firstName} ${p.lastName || ''}`.trim(),
          from_name: 'Anvexa website',
          name: `${p.firstName} ${p.lastName || ''}`.trim(),
          ...record,
        }),
      }).then(async (r) => {
        const d = await r.json().catch(() => ({}));
        if (!r.ok || d.success === false) throw new Error(d.message || 'Email service rejected the request.');
      })
    );
  }
  if (SHEETS_URL) {
    // text/plain + no-cors avoids a CORS preflight; Apps Script still receives the body.
    jobs.push(fetch(SHEETS_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(record) }));
  }
  const results = await Promise.allSettled(jobs);
  if (!results.some((r) => r.status === 'fulfilled')) {
    throw new ApiError('We could not send your request right now. Please check your connection and try again.', 0);
  }
  return { ok: true };
}

export const api = {
  // Blog: use the API when available, otherwise the bundled articles.
  posts: () =>
    request('/posts')
      .then((d) => (Array.isArray(d) ? d : Promise.reject(new Error('no api'))))
      .catch(() => [...localPosts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).map(({ body, ...rest }) => rest)),
  post: (slug) =>
    request(`/posts/${encodeURIComponent(slug)}`)
      .then((d) => (d && d.slug ? d : Promise.reject(new Error('no api'))))
      .catch(() => {
        const found = localPosts.find((x) => x.slug === slug);
        if (!found) throw new ApiError('Article not found.', 404);
        return found;
      }),
  submitLead: (payload) => {
    if (payload.website) return Promise.resolve({ ok: true }); // honeypot filled: bot
    if (WEB3FORMS_KEY || SHEETS_URL) return submitServerless(payload);
    return request('/leads', { method: 'POST', body: payload });
  },
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  leads: (token) => request('/leads', { token }),
  updateLead: (token, id, status) => request(`/leads/${id}`, { method: 'PATCH', body: { status }, token }),
};
