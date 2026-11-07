import React from 'react';
import BlogCard from '../components/BlogCard.jsx';
import useContent from '../hooks/useContent.js';
import { getBlogs } from '../services/api.js';
import './Blogs.scss';

export default function Blogs() {
  const { data, loading, error } = useContent(getBlogs);

  return (
    <main className="container blog-page section">
      <div className="page-title">
        <span className="eyebrow">OUR INSIGHTS</span>
        <h1>
          Insights for <em>what's next.</em>
        </h1>
        <p>Ideas, advice, and proven practices for sustainable digital growth.</p>
      </div>

      {loading ? (
        <p>Loading articles...</p>
      ) : Array.isArray(data) && data.length > 0 ? (
        <div className="blog-list blogs-grid">
          {data.map((b, i) => (
            <BlogCard key={b.id || b.slug} item={b} index={i} />
          ))}
        </div>
      ) : error ? (
        <p className="notice">{error}</p>
      ) : (
        <p>No published articles yet.</p>
      )}
    </main>
  );
}
