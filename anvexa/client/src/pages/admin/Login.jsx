import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Seo from '../../components/Seo.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminLogin() {
  const { token, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (token) return <Navigate to="/admin/leads" replace />;

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true); setError('');
    try {
      await login(email, password);
      navigate('/admin/leads', { replace: true });
    } catch (ex) {
      setError(ex.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-card">
      <Seo title="Admin sign in" noindex />
      <div className="label">Admin</div>
      <h2 style={{ marginBottom: '1.5rem' }}>Sign in</h2>
      <form className="contact-form" onSubmit={onSubmit}>
        <div className="field"><label htmlFor="a-email">Email</label><input id="a-email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div className="field"><label htmlFor="a-pass">Password</label><input id="a-pass" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
        {error && <div className="form-error" role="alert">{error}</div>}
        <button className="form-btn" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  );
}
