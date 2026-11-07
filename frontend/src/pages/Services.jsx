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
        <span className="eyebrow">OUR SERVICES</span>
        <h1>
          Services that help your business <em>grow.</em>
        </h1>
        <p>
          From technical SEO to content strategy, choose the services that match your
          ambitions.
        </p>
      </div>

      {loading && <p role="status">Loading services...</p>}
      {!loading && Array.isArray(data) && data.length > 0 ? (
        <div className="services-grid services-list">
          {data.map((item, index) => (
            <ServiceCard key={item.id || item.slug} item={item} index={index} />
          ))}
        </div>
      ) : error ? (
        <p className="notice" role="alert">
          Unable to load services: {error}
        </p>
      ) : (
        !loading && <p>No published services available yet.</p>
      )}
    </main>
  );
}
