import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Home, ArrowUpRight, Compass, HelpCircle } from 'lucide-react';
import './NotFound.scss';

export default function NotFound() {
  return (
    <main className="not-found-page container section">
      <div className="not-found-card">
        <div className="not-found-glow"></div>
        <div className="card-badge">
          <Search size={14} /> 404 CRAWL NOTICE
        </div>
        <h1>404</h1>
        <h2>URL Not Indexed in SERP Architecture</h2>
        <p>
          The page or asset you are looking for has been moved, re-canonicalized, or does
          not exist in our current site taxonomy.
        </p>

        <div className="not-found-actions">
          <Link className="button button-green" to="/">
            <Home size={16} /> Return to Homepage
          </Link>
          <Link className="button button-outline-dark" to="/services">
            Explore Capabilities <ArrowRight size={16} />
          </Link>
          <Link className="button button-light" to="/contact">
            Speak With Us <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="not-found-shortcuts">
          <span>Popular Navigation:</span>
          <Link to="/services">AI Search & GEO</Link>
          <span>•</span>
          <Link to="/services">SEO Automation</Link>
          <span>•</span>
          <Link to="/blog">Field Notes</Link>
          <span>•</span>
          <Link to="/about">Our Methodology</Link>
        </div>
      </div>
    </main>
  );
}
