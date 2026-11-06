import React from 'react';
import { Link } from 'react-router-dom';
import { contact } from '../config/contact.js';
import './Footer.scss';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-sections">
        <div>
          <h2>
            RankShelter<span>.</span>
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
          {contact.email && <a href={'mailto:' + contact.email}>{contact.email}</a>}
          {contact.phone && (
            <a href={'tel:' + contact.phone.replace(/[^+\d]/g, '')}>{contact.phone}</a>
          )}
          {contact.whatsapp && (
            <a
              href={'https://wa.me/' + contact.whatsapp.replace(/\D/g, '')}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          )}
          {contact.address && <p>{contact.address}</p>}
          {!contact.email && !contact.phone && !contact.whatsapp && (
            <Link to="/contact">Contact information coming soon</Link>
          )}
        </div>
      </div>
      <div className="container copyright">
        © {new Date().getFullYear()} RankShelter. All rights reserved. Contact details
        to be finalized before launch.
      </div>
    </footer>
  );
}
