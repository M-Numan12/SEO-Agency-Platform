import React from 'react';
import useContent from '../hooks/useContent';
import { getServices } from '../services/api';
import ServiceCard from '../components/ServiceCard';
import './Services.scss';

export default function Services() {
  const { data, loading, error } = useContent(getServices);
  return <main className="services-page container section">
    <div className="page-title">
      <span className="eyebrow">OUR SERVICES</span>
      <h1>Services that help your business <em>grow.</em></h1>
      <p>Explore our SEO and digital marketing solutions.</p>
    </div>
    {loading && <p role="status">Loading services...</p>}
    {error && <p className="notice" role="alert">Unable to load services: {error}</p>}
    {!loading && !error && (data?.length
      ? <div className="services-grid">{data.map((item, index) =>
          <ServiceCard key={item.id} item={item} index={index} />)}</div>
      : <p>No published services available yet.</p>)}
  </main>;
}
