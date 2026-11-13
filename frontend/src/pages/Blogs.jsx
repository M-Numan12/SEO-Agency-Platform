import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight, BookOpen } from 'lucide-react';
import BlogCard from '../components/BlogCard.jsx';
import useContent from '../hooks/useContent.js';
import { getBlogs } from '../services/api.js';
import './Blogs.scss';

export default function Blogs() {
  const { data, loading, error } = useContent(getBlogs);

  return (
    <main className="container blog-page section">
      <div className="page-title blogs-header-hero">
        <div className="blogs-pill">
          <BookOpen size={14} /> FIELD NOTES & SEARCH INTELLIGENCE
        </div>
        <h1>
          Insights for <em>what's next in search.</em>
        </h1>
        <p>
          Battle-tested strategies, algorithmic breakdowns, and generative engine optimization
          frameworks written by our senior SEO engineering team.
        </p>
      </div>

      {loading ? (
        <p className="loading-state">Loading intelligence articles...</p>
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

      {/* BOTTOM NEWSLETTER / AUDIT BOX */}
      <div className="blogs-subscribe-box">
        <div className="sub-inner">
          <span className="sub-badge">
            <Sparkles size={14} /> THE RANKSHELTER DISPATCH
          </span>
          <h2>Stay ahead of every search algorithm update.</h2>
          <p>
            Get our confidential monthly teardowns of Google Core Updates, ChatGPT Search citations,
            and high-converting SEO playbooks.
          </p>
          <div className="sub-actions">
            <Link className="button button-green" to="/contact">
              Subscribe & Request Domain Audit <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
