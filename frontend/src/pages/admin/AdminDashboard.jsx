import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/adminApi.js';
import './AdminDashboard.scss';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ blogs: '—', services: '—' });
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([adminApi.list('blogs'), adminApi.list('services')])
      .then(([blogs, services]) =>
        setCounts({
          blogs: Array.isArray(blogs) ? blogs.length : 0,
          services: Array.isArray(services) ? services.length : 0,
        })
      )
      .catch((e) => setError(e.message));
  }, []);

  return (
    <main className="admin-dashboard">
      <span className="eyebrow">OVERVIEW</span>
      <h1>Dashboard</h1>
      <p>Manage all your public content in one place.</p>
      {error && <p className="form-error">{error}</p>}
      <div className="stats">
        <Link to="/admin/blogs">
          <span>Blog Posts</span>
          <strong>{counts.blogs}</strong>
          <small>Manage blogs →</small>
        </Link>
        <Link to="/admin/services">
          <span>Services</span>
          <strong>{counts.services}</strong>
          <small>Manage services →</small>
        </Link>
      </div>
    </main>
  );
}
