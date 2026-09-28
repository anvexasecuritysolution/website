import { useCallback, useEffect, useState } from 'react';
import Seo from '../../components/Seo.jsx';
import { api } from '../../api/client.js';
import { useAuth } from '../../context/AuthContext.jsx';

const STATUSES = ['new', 'contacted', 'qualified', 'closed'];

export default function AdminLeads() {
  const { token, logout } = useAuth();
  const [leads, setLeads] = useState(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      setLeads(await api.leads(token));
      setError('');
    } catch (ex) {
      if (ex.status === 401) logout();
      setError(ex.message);
    }
  }, [token, logout]);

  useEffect(() => { load(); }, [load]);

  async function changeStatus(id, status) {
    const prev = leads;
    setLeads((ls) => ls.map((l) => (l._id === id ? { ...l, status } : l)));
    try { await api.updateLead(token, id, status); } catch (ex) { setLeads(prev); setError(ex.message); }
  }

  return (
    <div className="admin">
      <Seo title="Leads" noindex />
      <div className="admin-bar">
        <div>
          <div className="label">Admin</div>
          <h2>Leads {leads && <span className="cyan">({leads.length})</span>}</h2>
        </div>
        <div style={{ display: 'flex', gap: '.5rem' }}>
          <button className="btn btn-ghost btn-sm" onClick={load}>Refresh</button>
          <button className="btn btn-ghost btn-sm" onClick={logout}>Sign out</button>
        </div>
      </div>
      {error && <div className="form-error" role="alert" style={{ marginBottom: '1rem' }}>{error}</div>}
      {!leads && !error && <p className="state-msg" style={{ padding: 0 }}>Loading…</p>}
      {leads && (
        <div className="table-wrap">
          <table className="leads">
            <thead><tr><th>Received</th><th>Contact</th><th>Company</th><th>Interest</th><th>Message</th><th>Status</th></tr></thead>
            <tbody>
              {leads.length === 0 && <tr><td colSpan="6" style={{ color: 'var(--muted)' }}>No leads yet.</td></tr>}
              {leads.map((l) => (
                <tr key={l._id}>
                  <td>{new Date(l.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                  <td>{l.firstName} {l.lastName}<small><a href={`mailto:${l.email}`} style={{ color: 'var(--cyan)' }}>{l.email}</a></small></td>
                  <td>{l.company || '—'}<small>{l.industry}</small></td>
                  <td>{l.service || '—'}</td>
                  <td style={{ maxWidth: 280, whiteSpace: 'pre-wrap' }}>{l.message || '—'}</td>
                  <td>
                    <select className="status-sel" aria-label={`Status for ${l.firstName}`} value={l.status} onChange={(e) => changeStatus(l._id, e.target.value)}>
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
