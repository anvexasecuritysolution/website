const BASE = (import.meta.env.VITE_API_URL || '') + '/api';

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

export const api = {
  posts: () => request('/posts'),
  post: (slug) => request(`/posts/${encodeURIComponent(slug)}`),
  submitLead: (payload) => request('/leads', { method: 'POST', body: payload }),
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  leads: (token) => request('/leads', { token }),
  updateLead: (token, id, status) => request(`/leads/${id}`, { method: 'PATCH', body: { status }, token }),
};
