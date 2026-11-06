import React, { useEffect, useState } from 'react';
import { NavLink, Navigate, Outlet, useNavigate, Link } from 'react-router-dom';
import { authApi } from '../../services/adminApi.js';
import './AdminLayout.scss';

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    let active = true;
    authApi
      .me()
      .then((r) => {
        if (active) setUser(r.user);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  async function logout() {
    try {
      await authApi.logout();
      nav('/admin/login', { replace: true });
    } catch (e) {
      alert(e.message);
    }
  }

  if (!ready) return <p className="container section">Checking session...</p>;
  if (!user) return <Navigate replace to="/admin/login" />;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link to="/" className="admin-brand">
          RankShelter.
        </Link>
        <small>CONTENT MANAGEMENT</small>
        <nav>
          <NavLink end to="/admin">
            Dashboard
          </NavLink>
          <NavLink to="/admin/blogs">Manage Blogs</NavLink>
          <NavLink to="/admin/services">Manage Services</NavLink>
          <Link to="/" target="_blank" rel="noreferrer">
            View Website
          </Link>
        </nav>
        <button onClick={logout}>Log Out</button>
      </aside>
      <div className="admin-main">
        <header>
          RankShelter Admin Panel <span>{user.email}</span>
        </header>
        <div className="admin-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
