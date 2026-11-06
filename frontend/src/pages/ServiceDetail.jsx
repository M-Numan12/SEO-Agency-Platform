import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useContent from '../hooks/useContent.js';
import { getService } from '../services/api.js';
import './ServiceDetail.scss';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { data, loading, error } = useContent(() => getService(slug), slug);

  return (
    <main className="service-detail container section">
      {loading ? (
        'Loading service...'
      ) : error ? (
        <p className="notice">{error}</p>
      ) : (
        <>
          <span className="eyebrow">OUR SERVICES</span>
          <h1>{data?.name}</h1>
          <p className="lead">{data?.description}</p>
          {data?.imageUrl && <img src={data.imageUrl} alt={data?.name || 'Service image'} />}
          <article className="detail-body">{data?.content || data?.description}</article>
          <Link className="button button-dark" to="/contact">
            Discuss This Service
          </Link>
        </>
      )}
    </main>
  );
}
