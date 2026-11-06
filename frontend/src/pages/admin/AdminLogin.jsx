import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../../services/adminApi.js';
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
      await authApi.login(email, password);
      nav('/admin', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="admin-login">
      <form onSubmit={submit}>
        <span className="eyebrow">RANKSHELTER ADMIN ACCESS</span>
        <h1>Welcome back.</h1>
        <p>Sign in to manage RankShelter blogs and services.</p>
        <label className="form-control">
          Email
          <input
            type="email"
            autoComplete="username"
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
        <button disabled={busy} className="button button-dark">
          {busy ? 'Signing in...' : 'Sign In'}
        </button>
        <Link to="/">Back to Website</Link>
      </form>
    </main>
  );
}
