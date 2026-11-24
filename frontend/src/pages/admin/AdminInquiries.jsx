import React, { useEffect, useState } from 'react';
import {
  Mail,
  ExternalLink,
  Trash2,
  Download,
  Filter,
  CheckCircle,
  Clock,
  Send,
  MessageSquare,
  Building
} from 'lucide-react';
import {
  getInquiries,
  updateInquiryStatus,
  deleteInquiry
} from '../../services/inquiries.js';
import './AdminInquiries.scss';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setInquiries(getInquiries());
  }, []);

  function handleStatusChange(id, status) {
    const updated = updateInquiryStatus(id, status);
    if (updated) setInquiries(updated);
  }

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      const updated = deleteInquiry(id);
      if (updated) setInquiries(updated);
    }
  }

  function handleExportCSV() {
    if (!inquiries.length) return alert('No inquiries to export');
    const headers = ['ID,Name,Email,Website,Service,Status,Date,Message'];
    const rows = inquiries.map((inq) => {
      const safeMsg = (inq.message || '').replace(/"/g, '""');
      return `"${inq.id}","${inq.name}","${inq.email}","${inq.website || ''}","${inq.service}","${inq.status}","${new Date(inq.createdAt).toLocaleDateString()}","${safeMsg}"`;
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rankshelter_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const filtered = inquiries.filter((inq) => {
    if (filter === 'All') return true;
    return inq.status === filter;
  });

  const newCount = inquiries.filter((i) => i.status === 'New').length;

  return (
    <main className="admin-inquiries-page">
      <div className="inquiries-header">
        <div>
          <span className="eyebrow">LEADS & CLIENT INQUIRIES</span>
          <h1>Client Inquiries ({inquiries.length})</h1>
          <p>Review and follow up with potential clients who submitted the website forms.</p>
        </div>
        <div className="inquiries-actions">
          <button className="button button-outline-dark" onClick={handleExportCSV}>
            <Download size={16} /> Export Leads CSV
          </button>
        </div>
      </div>

      <div className="inquiries-filters-bar">
        <div className="filter-tabs">
          {['All', 'New', 'Contacted', 'Proposal Sent', 'Closed'].map((st) => (
            <button
              key={st}
              className={`filter-btn ${filter === st ? 'active' : ''}`}
              onClick={() => setFilter(st)}
            >
              {st}
              {st === 'New' && newCount > 0 && <span className="new-badge">{newCount}</span>}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="inquiries-empty">
          <MessageSquare size={44} />
          <h3>No inquiries found</h3>
          <p>Any visitor submitting the proposal or audit forms will automatically appear here.</p>
        </div>
      ) : (
        <div className="inquiries-list">
          {filtered.map((inq) => (
            <div className={`inquiry-card status-${(inq.status || 'new').toLowerCase().replace(/\s+/g, '-')}`} key={inq.id}>
              <div className="inquiry-card-head">
                <div className="client-info">
                  <h3>{inq.name}</h3>
                  <a href={`mailto:${inq.email}`} className="client-email">
                    <Mail size={14} /> {inq.email}
                  </a>
                  {inq.website && (
                    <a
                      href={inq.website.startsWith('http') ? inq.website : `https://${inq.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="client-website"
                    >
                      <ExternalLink size={13} /> {inq.website.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>

                <div className="inquiry-meta-head">
                  <div className="date-tag">
                    <Clock size={13} /> {new Date(inq.createdAt).toLocaleDateString()} at{' '}
                    {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <select
                    className={`status-select ${inq.status.toLowerCase().replace(/\s+/g, '-')}`}
                    value={inq.status}
                    onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                  >
                    <option value="New">Status: New</option>
                    <option value="Contacted">Status: Contacted</option>
                    <option value="Proposal Sent">Status: Proposal Sent</option>
                    <option value="Closed">Status: Closed</option>
                  </select>
                  <button
                    className="delete-btn"
                    title="Delete inquiry"
                    onClick={() => handleDelete(inq.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="inquiry-service-badge">
                <strong>Focus Area:</strong> {inq.service}
              </div>

              <div className="inquiry-message">
                <p>{inq.message}</p>
              </div>

              <div className="inquiry-actions-row">
                <a
                  href={`mailto:${inq.email}?subject=RankShelter%20SEO%20Proposal%20for%20${encodeURIComponent(inq.name)}`}
                  className="button button-dark-sm"
                >
                  <Send size={14} /> Reply via Email
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

