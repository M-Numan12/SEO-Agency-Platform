import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TrendingUp, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { authApi } from '../../services/adminApi.js';
import RankShelterIcon from '../../components/RankShelterIcon.jsx';
import './AdminLogin.scss';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);

    try {
      // 1. Try Express backend authentication if running
      await authApi.login(email, password);
      localStorage.setItem('rankshelter_admin_session', JSON.stringify({ email }));
      nav('/admin', { replace: true });
    } catch (err) {
      // 2. Fallback master credentials for static hosting environments
      const isMasterPass =
        password === 'rankshelter2026' ||
        password === 'admin123' ||
        password === 'admin';

      if (isMasterPass && email.trim()) {
        localStorage.setItem(
          'rankshelter_admin_session',
          JSON.stringify({ email: email.trim() })
        );
        nav('/admin', { replace: true });
      } else {
        setError(
          'Invalid credentials. (Hint: default master password is "rankshelter2026")'
        );
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="admin-login">
      <form onSubmit={submit}>
        <div className="login-brand">
          <RankShelterIcon size={40} />
          <span>RankShelter<b>.</b></span>
        </div>
        <span className="eyebrow">RESTRICTED ACCESS</span>
        <h1>Control Suite Login</h1>
        <p>Sign in to manage RankShelter leads, SEO services, and blog insights.</p>

        <label className="form-control">
          Work Email
          <input
            type="email"
            autoComplete="username"
            placeholder="admin@rankshelter.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="form-control">
          Password
          <input
            type="password"
            autoComplete="current-password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <button disabled={busy} className="button button-green full-width">
          {busy ? 'Verifying...' : 'Access Admin Suite'} <ArrowRight size={16} />
        </button>

        <div className="login-footer">
          <Link to="/">← Return to Public Website</Link>
        </div>
      </form>
    </main>
  );
}
