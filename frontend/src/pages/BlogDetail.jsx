import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  Calendar,
  Sparkles,
  Share2,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import useContent from '../hooks/useContent.js';
import { getBlog, getBlogs } from '../services/api.js';
import { defaultBlogs } from '../data/defaultContent.js';
import './BlogDetail.scss';

export default function BlogDetail() {
  const { slug } = useParams();
  const { data: blog, loading, error } = useContent(() => getBlog(slug), slug);
  const { data: allBlogs } = useContent(getBlogs);

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: blog?.title || 'RankShelter Insight',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  }

  if (loading) {
    return (
      <main className="blog-detail-loading container section">
        <p>Loading research article...</p>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="blog-detail-error container section">
        <div className="error-card">
          <h2>Article Not Found</h2>
          <p>{error || 'The requested article could not be located.'}</p>
          <Link to="/blog" className="button button-dark">
            Back to Journal <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  const related = (Array.isArray(allBlogs) ? allBlogs : defaultBlogs)
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 2);

  return (
    <main className="blog-detail-page">
      {/* 1. ARTICLE HEADER HERO */}
      <header className="article-header-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/blog">Field Notes</Link>
            <span>/</span>
            <span className="current">{blog.title}</span>
          </div>

          <div className="article-meta-top">
            <span className="category-pill">{blog.category || 'SEARCH INTELLIGENCE'}</span>
            <span className="dot">•</span>
            <span className="meta-item">
              <Clock size={13} /> 5 Min Read
            </span>
            <span className="dot">•</span>
            <span className="meta-item">
              <Calendar size={13} /> 2026 Edition
            </span>
          </div>

          <h1>{blog.title}</h1>
          <p className="article-lead-hook">{blog.excerpt}</p>

          <div className="author-bar">
            <div className="author-info">
              <div className="author-avatar">RS</div>
              <div>
                <strong>RankShelter Engineering Desk</strong>
                <small>Autonomous Search & GEO Research</small>
              </div>
            </div>

            <button className="share-button" onClick={handleShare}>
              <Share2 size={15} /> <span>Share Article</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. ARTICLE BODY WRAPPER */}
      <section className="container article-body-container">
        {blog.imageUrl && (
          <div className="article-featured-image">
            <img src={blog.imageUrl} alt={blog.title} />
          </div>
        )}

        <div className="article-content-wrapper">
          {/* EXECUTIVE KEY TAKEAWAYS */}
          <div className="key-takeaways-card">
            <div className="takeaway-head">
              <Sparkles size={18} />
              <h4>Executive Summary & Key Takeaways</h4>
            </div>
            <ul>
              <li>
                Traditional 10 blue links are rapidly being superseded by AI answer engines like
                ChatGPT Search, Google AI Overviews, and Perplexity Pro.
              </li>
              <li>
                Winning citations requires structured entity consensus, robust Schema.org JSON-LD,
                and high-authority editorial mentions.
              </li>
              <li>
                Real-time autonomous monitoring prevents algorithm drop surprises by catching crawl
                and ranking anomalies within hours instead of monthly cycles.
              </li>
            </ul>
          </div>

          {/* MAIN ARTICLE BODY */}
          <article className="article-prose">
            <p className="prose-lead">{blog.content}</p>

            <h2>The Paradigm Shift in Modern Search Discovery</h2>
            <p>
              In competitive enterprise verticals, search traffic isn't just about targeting high-volume
              keywords anymore. High-intent decision makers increasingly interact with conversational
              prompts and complex contextual queries. If your digital footprint isn't clearly
              mapped into entity knowledge graphs, your brand simply doesn't exist to AI models.
            </p>

            <blockquote className="featured-quote">
              "The brands that dominate the next decade of organic search will not be those who
              write the longest blog posts, but those who build the clearest algorithmic consensus
              across the open web."
            </blockquote>

            <h2>Actionable Principles for Modern Growth</h2>
            <p>
              To safeguard your organic revenue and capitalize on conversational search, modern brands
              must prioritize three fundamental pillars:
            </p>

            <div className="prose-checklist">
              <div>
                <CheckCircle2 size={18} />
                <span>
                  <strong>Entity Graph Cohesion:</strong> Align brand mentions, Wikipedia/Wikidata entities,
                  and company registries so AI models identify your authoritative specialty.
                </span>
              </div>
              <div>
                <CheckCircle2 size={18} />
                <span>
                  <strong>High-Intent Content Pillars:</strong> Shift away from thin vanity blog posts
                  toward bottom-of-funnel comparison matrices and transactional problem-solving hubs.
                </span>
              </div>
              <div>
                <CheckCircle2 size={18} />
                <span>
                  <strong>Autonomous Bot Sentinel:</strong> Deploy automated monitoring that checks crawl
                  budgets, Core Web Vitals, and keyword shifts every 3 hours.
                </span>
              </div>
            </div>
          </article>

          {/* ARTICLE END CTA BANNER */}
          <div className="article-cta-box">
            <div className="cta-left">
              <span className="cta-pill">TAKE ACTION</span>
              <h3>Want to implement these search strategies for your brand?</h3>
              <p>
                Let our senior search engineering team audit your current search footprint and build a
                custom roadmap.
              </p>
            </div>
            <div className="cta-right">
              <Link to="/contact" className="button button-green">
                Request Strategy Consultation <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RELATED ARTICLES */}
      {related.length > 0 && (
        <section className="container related-articles-section section">
          <div className="section-title">
            <span className="eyebrow">CONTINUE READING</span>
            <h2>More search <em>intelligence.</em></h2>
          </div>

          <div className="related-articles-grid">
            {related.map((item) => (
              <Link
                key={item.id || item.slug}
                to={`/blog/${item.slug}`}
                className="related-blog-card"
              >
                <small>{item.category || 'FIELD NOTES'}</small>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <span className="read-more">
                  Read Analysis <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
