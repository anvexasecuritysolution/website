import { validateLead } from '../../shared/leads.js';

export class ApiError extends Error {
  constructor(message, status, fields) { super(message); this.status = status; this.fields = fields || {}; }
}

export function createApi({ base = '/api', web3formsKey = '', sheetsUrl = '', localPosts = [], fetchImpl = globalThis.fetch, submitSheets, timeoutMs = 30_000 }) {
  async function fetchJson(url, options) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetchImpl(url, { ...options, signal: controller.signal });
      let data;
      try { data = await res.json(); } catch { throw new ApiError('The service returned an invalid response. Please try again.', 502); }
      if (!res.ok) throw new ApiError(data.message || 'Request failed.', res.status, data.errors);
      return data;
    } catch (err) {
      if (err instanceof ApiError) throw err;
      throw new ApiError(controller.signal.aborted ? 'The request timed out. Please try again.' : 'Network error. Please check your connection and try again.', 0);
    } finally { clearTimeout(timer); }
  }

  const request = (path, { method = 'GET', body, token } = {}) => fetchJson(base + path, {
    method,
    headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });

  // Fall back only when the backend is unavailable, never for intentional 404/401/403 responses.
  const unavailable = (error) => error.status === 0 || error.status >= 500;
  return {
    async posts() {
      try {
        const posts = await request('/posts');
        if (!Array.isArray(posts)) throw new ApiError('Invalid article response.', 502);
        return posts;
      } catch (err) {
        if (!unavailable(err)) throw err;
        return [...localPosts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).map(({ body, ...rest }) => rest);
      }
    },
    async post(slug) {
      try {
        const post = await request(`/posts/${encodeURIComponent(slug)}`);
        if (!post?.slug || !Array.isArray(post.body)) throw new ApiError('Invalid article response.', 502);
        return post;
      } catch (err) {
        if (!unavailable(err)) throw err;
        const found = localPosts.find((post) => post.slug === slug);
        if (!found) throw new ApiError('Article not found.', 404);
        return found;
      }
    },
    async submitLead(payload) {
      if (payload?.website) return { ok: true };
      const { data, errors } = validateLead(payload);
      if (Object.keys(errors).length) throw new ApiError('Please check the highlighted fields.', 422, errors);
      if (!web3formsKey && !sheetsUrl) {
        const result = await request('/leads', { method: 'POST', body: data });
        if (result.ok !== true) throw new ApiError('We could not confirm your request. Please try again.', 502);
        return result;
      }
      const { website, ...fields } = data;
      const record = { ...fields, submittedAt: new Date().toISOString(), status: 'new' };
      const jobs = [];
      if (web3formsKey) jobs.push(fetchJson('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: web3formsKey, subject: `New Anvexa enquiry from ${data.firstName} ${data.lastName}`.trim(), from_name: 'Anvexa website', name: `${data.firstName} ${data.lastName}`.trim(), botcheck: '', ...record }),
      }).then((result) => { if (result.success !== true) throw new ApiError(result.message || 'The email service could not confirm delivery.', 502); }));
      if (sheetsUrl) jobs.push(submitSheets(sheetsUrl, record));
      const results = await Promise.allSettled(jobs);
      // A successful destination must explicitly acknowledge persistence/delivery.
      if (!results.some((result) => result.status === 'fulfilled')) {
        throw new ApiError('We could not confirm delivery. Please try again or contact us by email.', 502);
      }
      return { ok: true };
    },
    login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
    leads: (token) => request('/leads', { token }),
    updateLead: (token, id, status) => request(`/leads/${id}`, { method: 'PATCH', body: { status }, token }),
  };
}
