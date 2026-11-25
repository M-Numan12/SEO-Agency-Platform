import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight, Zap } from 'lucide-react';
import ServiceCard from '../components/ServiceCard.jsx';
import useContent from '../hooks/useContent.js';
import { getServices } from '../services/api.js';
import './Services.scss';

export default function Services() {
  const { data, loading, error } = useContent(getServices);

  return (
    <main className="container services-page section">
      <div className="page-title services-header-hero">
        <div className="services-pill">
          <Sparkles size={14} /> 2026 ARCHITECTURE SUITE
        </div>
        <h1>
          Services that turn search into <em>compounding revenue.</em>
        </h1>
        <p>
          Whether conquering classic Google search algorithms or dominating conversational
          generative engines like ChatGPT and Perplexity, our specialized architectures are
          engineered to scale.
        </p>
      </div>

      {loading && <p className="loading-state" role="status">Loading services architecture...</p>}

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

      {/* BOTTOM SERVICE BANNER */}
      <div className="services-cta-banner">
        <div className="cta-content">
          <span className="banner-badge">
            <Zap size={14} /> TAILORED ENTERPRISE SCOPES
          </span>
          <h2>Need a custom multi-channel growth architecture?</h2>
          <p>
            We build bespoke packages blending 24/7 autonomous monitoring, high-DR editorial link
            building, and Generative Engine Optimization for venture-backed and enterprise brands.
          </p>
          <div className="cta-actions">
            <Link className="button button-green" to="/contact">
              Request a Custom Strategy Consultation <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
