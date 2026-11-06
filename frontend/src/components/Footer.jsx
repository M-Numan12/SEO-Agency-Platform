import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-sections">
        <div>
          <h2>
            elevate<span>.</span>
          </h2>
          <p>
            Building stronger digital foundations through thoughtful SEO, content and
            growth strategy.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/blog">Blog</Link>
        </div>
        <div>
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>Let's connect</h4>
          <p>hello@example.com</p>
          <p>Serving clients worldwide</p>
        </div>
      </div>
      <div className="container copyright">
        © {new Date().getFullYear()} Elevate Digital. Placeholder brand and contact
        information.
      </div>
    </footer>
  );
}
