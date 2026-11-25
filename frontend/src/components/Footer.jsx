import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Sparkles, Bot, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';
import { contact } from '../config/contact.js';
import RankShelterIcon from './RankShelterIcon.jsx';
import './Footer.scss';

export default function Footer() {
  const phoneHref = contact.phone
    ? 'tel:' + contact.phone.replace(/[^+\d]/g, '')
    : '';
  const whatsappHref = contact.whatsapp
    ? 'https://wa.me/' + contact.whatsapp.replace(/\D/g, '')
    : '';

  return (
    <footer className="site-footer">
      <div className="container footer-sections">
        <div className="footer-brand-col">
          <Link to="/" className="footer-brand" aria-label="RankShelter Home">
            <span className="brand-icon">
              <RankShelterIcon size={24} />
            </span>
            <span className="brand-name">
              RankShelter<b>.</b>
            </span>
          </Link>
          <p className="footer-tagline">
            Next-generation search intelligence, 24/7 autonomous monitoring bots, and
            generative engine optimization (GEO) engineered to build enduring digital authority.
          </p>
          <div className="footer-pill">
            <Sparkles size={14} /> AI SEARCH & SERP DOMINANCE
          </div>
        </div>

        <div className="footer-links-col">
          <h4>Services</h4>
          <Link to="/services/website-audit">Website Audit</Link>
          <Link to="/services/on-page-seo">On-Page SEO</Link>
          <Link to="/services/digital-pr">Digital PR</Link>
          <Link to="/services/link-building">Link Building</Link>
          <Link to="/services/guest-posting">Guest Posting</Link>
          <Link to="/services/link-insertion">Link Insertion</Link>
          <Link to="/services/pbn-backlinks">PBN Backlinks</Link>
          <Link to="/services/content-writing">Content Writing</Link>
        </div>

        <div className="footer-links-col">
          <h4>Studio</h4>
          <Link to="/">Home</Link>
          <Link to="/services">All Services</Link>
          <Link to="/blog">Insights & Journal</Link>
          <Link to="/about">Our Methodology</Link>
          <Link to="/contact">Growth Inquiry</Link>
        </div>

        <div className="footer-contact-col">
          <h4>Connect Directly</h4>
          <p className="contact-blurb">
            Ready to analyze your domain or launch an autonomous growth campaign?
          </p>
          {contact.email ? (
            <a className="footer-contact-item" href={'mailto:' + contact.email}>
              <Mail size={16} /> {contact.email}
            </a>
          ) : (
            <a className="footer-contact-item" href="mailto:growth@rankshelter.com">
              <Mail size={16} /> growth@rankshelter.com
            </a>
          )}

          {contact.whatsapp ? (
            <a
              className="footer-contact-item"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight size={16} /> WhatsApp Direct Chat
            </a>
          ) : null}

          {contact.phone ? (
            <a className="footer-contact-item" href={phoneHref}>
              <ArrowUpRight size={16} /> {contact.phone}
            </a>
          ) : null}

          <div className="footer-audit-link-wrap">
            <Link className="footer-audit-link" to="/contact">
              Request Free SEO & AI Audit <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="container copyright">
        <div>
          © {new Date().getFullYear()} RankShelter Studio. All rights reserved.
        </div>
        <div className="footer-extra-links">
          <span>Autonomous SEO & Generative Engine Optimization</span>
        </div>
      </div>
    </footer>
  );
}
