import React from 'react';
import ServiceCard from '../components/ServiceCard.jsx';
import useContent from '../hooks/useContent.js';
import { getServices } from '../services/api.js';
import './Services.scss';

export default function Services() {
  const { data, loading, error } = useContent(getServices);

  return (
    <main className="container services-page section">
      <div className="page-title">
        <span className="eyebrow">WHAT WE DO</span>
        <h1>
          Expertise that moves <em>businesses forward.</em>
        </h1>
        <p>From technical SEO to content strategy, choose the services that match your ambitions.</p>
      </div>

      {loading ? (
        <p>Loading services...</p>
      ) : error ? (
        <p className="notice">{error}</p>
      ) : Array.isArray(data) && data.length > 0 ? (
        <div className="services-list">
          {data.map((s, i) => (
            <ServiceCard key={s.id} item={s} index={i} />
          ))}
        </div>
      ) : (
        <p>No published services yet.</p>
      )}
    </main>
  );
}
