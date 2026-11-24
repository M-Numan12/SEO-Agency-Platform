import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Briefcase,
  FileText,
  TrendingUp,
  ArrowRight,
  Clock,
  Sparkles,
  Zap,
  ExternalLink
} from 'lucide-react';
import { adminApi } from '../../services/adminApi.js';
import { getInquiries } from '../../services/inquiries.js';
import { defaultServices, defaultBlogs } from '../../data/defaultContent.js';
import './AdminDashboard.scss';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    inquiries: 0,
    newInquiries: 0,
    blogs: defaultBlogs.length,
    services: defaultServices.length,
  });
  const [recentInquiries, setRecentInquiries] = useState([]);

  useEffect(() => {
    // Inquiries from storage
    const inqs = getInquiries();
    const newCount = inqs.filter((i) => i.status === 'New').length;
    setRecentInquiries(inqs.slice(0, 3));

    // Services & Blogs (with API fallback)
    Promise.all([
      adminApi.list('blogs').catch(() => defaultBlogs),
      adminApi.list('services').catch(() => defaultServices),
    ]).then(([blogs, services]) => {
      setCounts({
        inquiries: inqs.length,
        newInquiries: newCount,
        blogs: Array.isArray(blogs) ? blogs.length : defaultBlogs.length,
        services: Array.isArray(services) ? services.length : defaultServices.length,
      });
    });
  }, []);

  return (
    <main className="admin-dashboard">
      <div className="dash-header">
        <div>
          <span className="eyebrow">STUDIO OVERVIEW</span>
          <h1>Admin Control Center</h1>
          <p>Monitor client leads, manage service offerings, and publish research articles.</p>
        </div>
        <div className="dash-quick-links">
          <Link to="/admin/inquiries" className="button button-green">
            <MessageSquare size={16} /> View All Leads
          </Link>
        </div>
      </div>

      {/* METRICS STATS GRID */}
      <div className="stats-grid">
        <Link to="/admin/inquiries" className="stat-box highlight">
          <div className="stat-top">
            <MessageSquare size={22} />
            {counts.newInquiries > 0 && (
              <span className="new-pill">{counts.newInquiries} NEW</span>
            )}
          </div>
          <strong>{counts.inquiries}</strong>
          <span>Total Inquiries / Leads</span>
          <small>Manage client pipeline →</small>
        </Link>

        <Link to="/admin/services" className="stat-box">
          <div className="stat-top">
            <Briefcase size={22} />
          </div>
          <strong>{counts.services}</strong>
          <span>Active SEO Architectures</span>
          <small>Edit services & pricing →</small>
        </Link>

        <Link to="/admin/blogs" className="stat-box">
          <div className="stat-top">
            <FileText size={22} />
          </div>
          <strong>{counts.blogs}</strong>
          <span>Research Articles & Notes</span>
          <small>Publish new insights →</small>
        </Link>
      </div>

      {/* RECENT INQUIRIES PREVIEW SECTION */}
      <div className="dash-section">
        <div className="section-head">
          <h3>Recent Client Inquiries</h3>
          <Link to="/admin/inquiries">
            View All ({counts.inquiries}) <ArrowRight size={14} />
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <div className="empty-box">No client inquiries received yet.</div>
        ) : (
          <div className="recent-list">
            {recentInquiries.map((inq) => (
              <div className="recent-card" key={inq.id}>
                <div className="recent-main">
                  <strong>{inq.name}</strong>
                  <span className="recent-email">{inq.email}</span>
                  <span className="recent-service">{inq.service}</span>
                </div>
                <div className="recent-meta">
                  <span className={`status-badge ${inq.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {inq.status}
                  </span>
                  <small>
                    <Clock size={12} /> {new Date(inq.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QUICK ACTIONS BANNER */}
      <div className="quick-guide-banner">
        <div>
          <h4>How do client inquiries work?</h4>
          <p>
            When a visitor fills out the Growth Inquiry or Audit form on the website, their message
            is instantly recorded in your <strong>Client Inquiries</strong> pipeline. You can
            review their target domain, change lead status, and respond directly via email!
          </p>
        </div>
      </div>
    </main>
  );
}
