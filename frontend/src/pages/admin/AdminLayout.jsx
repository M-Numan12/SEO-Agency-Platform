import React, { useEffect, useState } from 'react';
import { NavLink, Navigate, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Briefcase,
  ExternalLink,
  LogOut,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { authApi } from '../../services/adminApi.js';
import { getInquiries } from '../../services/inquiries.js';
import './AdminLayout.scss';

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [newCount, setNewCount] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    let active = true;

    // Check inquiries count
    const inqs = getInquiries();
    setNewCount(inqs.filter((i) => i.status === 'New').length);

    // Try backend authentication first
    authApi
      .me()
      .then((r) => {
        if (active && r?.user) setUser(r.user);
      })
      .catch(() => {
        // Fallback to local admin session for static hosting
        const localUser = localStorage.getItem('rankshelter_admin_session');
        if (active && localUser) {
          try {
            setUser(JSON.parse(localUser));
          } catch {
            setUser({ email: 'admin@rankshelter.com' });
          }
        }
      })
      .finally(() => {
        if (active) setReady(true);
      });

    return () => {
      active = false;
    };
  }, []);

  async function logout() {
    try {
      await authApi.logout().catch(() => {});
    } finally {
      localStorage.removeItem('rankshelter_admin_session');
      setUser(null);
      nav('/admin/login', { replace: true });
    }
  }

  if (!ready) return <p className="container section">Checking admin credentials...</p>;
  if (!user) return <Navigate replace to="/admin/login" />;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link to="/" className="admin-brand">
          <TrendingUp size={22} /> RankShelter<span>.</span>
        </Link>
        <div className="sidebar-role">
          <ShieldCheck size={13} />
          <span>AGENCY CONTROL SUITE</span>
        </div>

        <nav>
          <NavLink end to="/admin" className={({ isActive }) => (isActive ? 'active' : '')}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/inquiries"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <MessageSquare size={18} />
            <span>Client Inquiries</span>
            {newCount > 0 && <span className="nav-badge">{newCount}</span>}
          </NavLink>

          <NavLink
            to="/admin/services"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <Briefcase size={18} />
            <span>Manage Services</span>
          </NavLink>

          <NavLink
            to="/admin/blogs"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <FileText size={18} />
            <span>Manage Blogs</span>
          </NavLink>

          <div className="nav-divider"></div>

          <Link to="/" target="_blank" rel="noreferrer" className="nav-external">
            <ExternalLink size={17} />
            <span>View Live Site</span>
          </Link>
        </nav>

        <button className="logout-btn" onClick={logout}>
          <LogOut size={16} /> <span>Sign Out</span>
        </button>
      </aside>

      <div className="admin-main">
        <header>
          <div className="admin-header-title">
            RankShelter Studio Manager
          </div>
          <div className="admin-header-user">
            <span className="dot-online"></span>
            <span>{user.email || 'Admin'}</span>
          </div>
        </header>
        <div className="admin-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
