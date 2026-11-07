import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  TrendingUp,
  Search,
  Target,
  CheckCircle2,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock3,
  ShieldCheck,
  Award,
  Users
} from 'lucide-react';
import { getBlogs, getServices } from '../services/api.js';
import useContent from '../hooks/useContent.js';
import ServiceCard from '../components/ServiceCard.jsx';
import BlogCard from '../components/BlogCard.jsx';
import { contact } from '../config/contact.js';
import './Home.scss';

export default function Home() {
  const services = useContent(getServices);
  const blogs = useContent(getBlogs);

  const phoneHref = contact.phone
    ? 'tel:' + contact.phone.replace(/[^+\d]/g, '')
    : '';
  const whatsappHref = contact.whatsapp
    ? 'https://wa.me/' + contact.whatsapp.replace(/\D/g, '')
    : '';

  return (
    <div className="home-page-wrapper">
      {/* 1. HERO SECTION (HOME) */}
      <section className="home-hero" id="hero">
        <div className="container hero-content">
          <div>
            <span className="eyebrow">✦ DIGITAL GROWTH, REIMAGINED</span>
            <h1>
              Make your brand <em>impossible</em> to ignore.
            </h1>
            <p>
              We combine search strategy, high-authority link building, and meaningful
              content to turn your digital presence into measurable business growth.
            </p>
            <div className="hero-actions">
              <Link className="button button-green" to="/contact">
                Start a Project <ArrowUpRight size={17} />
              </Link>
              <a className="button button-outline" href="#services">
                Explore Services <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-caption">
              Made for ambitious brands. Built for sustainable growth.
            </div>
          </div>
          <div className="hero-dashboard">
            <div className="dashboard-bar">
              <span>● GROWTH OVERVIEW</span>
              <span>↗ LIVE METRICS</span>
            </div>
            <p>Organic search performance</p>
            <h2>+124.8%</h2>
            <span>
              <TrendingUp size={16} /> Verified upward growth
            </span>
            <svg
              aria-label="Illustrative upward growth chart"
              viewBox="0 0 480 200"
              preserveAspectRatio="none"
            >
              <path
                d="M0 175 C45 170 65 145 110 152 S175 110 210 122 265 88 304 96 380 40 480 12"
                stroke="#34dfaa"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="months">JAN　 FEB　 MAR　 APR　 MAY　 JUN</div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION (SERVICES) */}
      <section className="section container home-services-section" id="services">
        <div className="section-title">
          <span className="eyebrow">OUR SERVICES</span>
          <h2>
            Everything you need to <em>grow online.</em>
          </h2>
          <p>
            From technical SEO and link building to content marketing and social
            outreach, discover tailored solutions for your growth.
          </p>
        </div>

        {services.loading ? (
          <p className="loading-state">Loading services...</p>
        ) : Array.isArray(services.data) && services.data.length > 0 ? (
          <div className="content-grid">
            {services.data.slice(0, 6).map((s, i) => (
              <ServiceCard key={s.id || s.slug} item={s} index={i} />
            ))}
          </div>
        ) : services.error ? (
          <p className="notice">Services unavailable. Please try again later.</p>
        ) : (
          <p>No published services available yet.</p>
        )}

        <div className="center">
          <Link className="button button-light" to="/services">
            Explore All Services in Detail <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* 3. PROCESS / HOW WE WORK SECTION */}
      <section className="home-process">
        <div className="container process-grid">
          <div>
            <span className="eyebrow">HOW WE WORK</span>
            <h2>
              Big ideas. <em>Real impact.</em>
            </h2>
            <p>
              Every campaign starts with understanding your business, your audience and
              what success means to you.
            </p>
          </div>
          <div>
            {[
              ['01', 'Discover', 'We listen, research competitors and identify growth opportunities.'],
              ['02', 'Strategize', 'We turn intelligence into a focused keyword and content plan.'],
              ['03', 'Execute', 'We build high-authority links and optimize pages with precision.'],
              ['04', 'Improve', 'We track ranking velocity, conversion rates and compound gains.']
            ].map(([num, name, desc]) => (
              <div className="process-row" key={num}>
                <span>{num}</span>
                <div>
                  <h3>{name}</h3>
                  <p>{desc}</p>
                </div>
                <ArrowUpRight size={20} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT SECTION (ABOUT) */}
      <section className="section container home-about-section" id="about">
        <div className="about-split">
          <div className="about-text-col">
            <span className="eyebrow">ABOUT RANKSHELTER</span>
            <h2>
              Good strategy. <em>Better outcomes.</em>
            </h2>
            <p className="lead-text">
              We are a modern digital growth agency dedicated to making ambitious brands
              easier to find, easier to trust, and easier to choose.
            </p>
            <p className="body-text">
              RankShelter combines deep search data, transparent link acquisition, and
              creative digital marketing. We do not chase vanity numbers — we focus on
              the metrics that drive revenue and long-term business equity.
            </p>
            <div className="about-stats-grid">
              <div className="stat-card">
                <h3>98%</h3>
                <p>Client Retention</p>
              </div>
              <div className="stat-card">
                <h3>150+</h3>
                <p>Growth Campaigns</p>
              </div>
              <div className="stat-card">
                <h3>10x</h3>
                <p>Average Organic ROI</p>
              </div>
            </div>
            <div className="about-cta-row">
              <Link className="button button-dark" to="/about">
                Read Our Full Story <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>

          <div className="about-features-col">
            <div className="value-item">
              <span className="value-icon">
                <Search size={26} />
              </span>
              <div>
                <h3>Strategy Before Tactics</h3>
                <p>We analyze the market and diagnose root challenges before writing a single line of copy.</p>
              </div>
            </div>
            <div className="value-item">
              <span className="value-icon">
                <Target size={26} />
              </span>
              <div>
                <h3>People Before Metrics</h3>
                <p>Real customers and buyers matter far more than temporary ranking blips or low-value clicks.</p>
              </div>
            </div>
            <div className="value-item">
              <span className="value-icon">
                <ShieldCheck size={26} />
              </span>
              <div>
                <h3>Ethical & Sustainable</h3>
                <p>White-hat outreach and algorithm-safe SEO practices that protect your domain authority long term.</p>
              </div>
            </div>
            <div className="value-item">
              <span className="value-icon">
                <CheckCircle2 size={26} />
              </span>
              <div>
                <h3>Progress Over Promises</h3>
                <p>Transparent reporting, dedicated communication, and steady performance month after month.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BLOG / INSIGHTS SECTION (BLOG) */}
      <section className="section container home-blog-section" id="blog">
        <div className="section-title">
          <span className="eyebrow">OUR JOURNAL</span>
          <h2>
            Ideas worth <em>sharing.</em>
          </h2>
          <p>
            Practical insights on SEO trends, content architecture, and what works in
            digital growth today.
          </p>
        </div>

        {blogs.loading ? (
          <p className="loading-state">Loading articles...</p>
        ) : Array.isArray(blogs.data) && blogs.data.length > 0 ? (
          <div className="content-grid">
            {blogs.data.slice(0, 3).map((b, i) => (
              <BlogCard key={b.id || b.slug} item={b} index={i} />
            ))}
          </div>
        ) : blogs.error ? (
          <p className="notice">Blogs unavailable. Please try again later.</p>
        ) : (
          <p>No published articles available yet.</p>
        )}

        <div className="center">
          <Link className="button button-light" to="/blog">
            Explore All Insights <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* 6. CONTACT SECTION (CONTACT) */}
      <section className="section container home-contact-section" id="contact">
        <div className="section-title">
          <span className="eyebrow">LET'S CONNECT</span>
          <h2>
            Let's build something <em>remarkable.</em>
          </h2>
          <p>
            Your next growth milestone starts with a conversation. Reach out to our team
            today.
          </p>
        </div>

        <div className="home-contact-grid">
          <div className="contact-methods-box">
            <h3>Direct Contact Channels</h3>
            <p>Have an inquiry or project proposal? Connect with our growth team:</p>

            <div className="contact-methods-list">
              {contact.whatsapp ? (
                <a
                  className="contact-card-link"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="card-icon whatsapp">
                    <MessageCircle size={22} />
                  </span>
                  <div>
                    <small>WHATSAPP CHAT</small>
                    <strong>Chat with us on WhatsApp</strong>
                  </div>
                  <ArrowUpRight size={18} />
                </a>
              ) : (
                <Link className="contact-card-link" to="/contact">
                  <span className="card-icon whatsapp">
                    <MessageCircle size={22} />
                  </span>
                  <div>
                    <small>WHATSAPP</small>
                    <strong>Online Support Available</strong>
                  </div>
                  <ArrowUpRight size={18} />
                </Link>
              )}

              {contact.phone ? (
                <a className="contact-card-link" href={phoneHref}>
                  <span className="card-icon phone">
                    <Phone size={22} />
                  </span>
                  <div>
                    <small>PHONE CALL</small>
                    <strong>{contact.phone}</strong>
                  </div>
                  <ArrowUpRight size={18} />
                </a>
              ) : (
                <Link className="contact-card-link" to="/contact">
                  <span className="card-icon phone">
                    <Phone size={22} />
                  </span>
                  <div>
                    <small>DIRECT INQUIRY</small>
                    <strong>Speak With an SEO Specialist</strong>
                  </div>
                  <ArrowUpRight size={18} />
                </Link>
              )}

              {contact.email ? (
                <a className="contact-card-link" href={'mailto:' + contact.email}>
                  <span className="card-icon email">
                    <Mail size={22} />
                  </span>
                  <div>
                    <small>EMAIL INQUIRIES</small>
                    <strong>{contact.email}</strong>
                  </div>
                  <ArrowUpRight size={18} />
                </a>
              ) : (
                <a className="contact-card-link" href="mailto:hello@rankshelter.com">
                  <span className="card-icon email">
                    <Mail size={22} />
                  </span>
                  <div>
                    <small>EMAIL</small>
                    <strong>hello@rankshelter.com</strong>
                  </div>
                  <ArrowUpRight size={18} />
                </a>
              )}

              <div className="contact-card-link info-only">
                <span className="card-icon map">
                  <MapPin size={22} />
                </span>
                <div>
                  <small>LOCATION</small>
                  <strong>{contact.address || 'Worldwide Digital Agency • Remote-first'}</strong>
                </div>
              </div>

              <div className="contact-card-link info-only">
                <span className="card-icon hours">
                  <Clock3 size={22} />
                </span>
                <div>
                  <small>WORKING HOURS</small>
                  <strong>{contact.hours || 'Mon — Fri: 9:00 AM — 6:00 PM'}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-highlight-card">
            <span className="eyebrow">FAST PROPOSAL</span>
            <h3>Ready to start your SEO campaign?</h3>
            <p>
              Tell us your target keywords, competitors, and website URL. We will provide a
              free preliminary audit and a custom growth roadmap.
            </p>
            <ul className="benefits-checklist">
              <li>
                <CheckCircle2 size={18} /> Full Technical & On-Page Audit
              </li>
              <li>
                <CheckCircle2 size={18} /> Keyword Opportunity & Gap Analysis
              </li>
              <li>
                <CheckCircle2 size={18} /> Authority Backlink Strategy
              </li>
              <li>
                <CheckCircle2 size={18} /> No obligations, zero fluff
              </li>
            </ul>
            <Link className="button button-green full-width" to="/contact">
              Go to Full Contact Page <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CLOSING CTA BANNER */}
      <section className="container section">
        <div className="home-cta">
          <div>
            <span className="eyebrow">START GROWING TODAY</span>
            <h2>
              Ready to write your next <em>success story?</em>
            </h2>
            <p>Let's turn your big idea into your next big milestone.</p>
          </div>
          <Link className="button button-green" to="/contact">
            Let's Talk Growth <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}
