import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Clock,
  MessageCircle,
  ChevronDown,
  BarChart3
} from 'lucide-react';
import useContent from '../hooks/useContent.js';
import { getService, getServices } from '../services/api.js';
import { contact } from '../config/contact.js';
import { defaultServices } from '../data/defaultContent.js';
import './ServiceDetail.scss';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { data: service, loading, error } = useContent(() => getService(slug), slug);
  const { data: allServices } = useContent(getServices);
  const [openFaq, setOpenFaq] = useState(0);

  const phoneHref = contact.phone
    ? 'tel:' + contact.phone.replace(/[^+\d]/g, '')
    : '';
  const whatsappHref = contact.whatsapp
    ? 'https://wa.me/' + contact.whatsapp.replace(/\D/g, '')
    : 'https://wa.me/';

  const deliverables = [
    'Comprehensive technical crawl & entity graph diagnosis',
    'Custom Schema.org JSON-LD structural data implementation',
    'High-intent commercial query & competitor gap mapping',
    'Generative engine citation optimization (ChatGPT & Perplexity)',
    'Core Web Vitals speed tuning & crawl budget optimization',
    'Dedicated weekly executive performance summaries'
  ];

  const workflowSteps = [
    {
      num: '01',
      title: 'Algorithmic Audit & Entity Mapping',
      desc: 'We analyze your current domain footprint, competitor knowledge graphs, and uncover missing high-intent commercial opportunities.'
    },
    {
      num: '02',
      title: 'Structural Architecture & Schema',
      desc: 'We engineer technical site taxonomy, inject semantic schema models, and optimize on-page signals for both classic search and generative AI engines.'
    },
    {
      num: '03',
      title: 'Authority Outreach & Content Engine',
      desc: 'We deploy editorial link acquisition and conversion-oriented pillar assets designed to compound organic traffic and authority.'
    },
    {
      num: '04',
      title: '24/7 Autonomous Sentinel Tracking',
      desc: 'Continuous real-time tracking daemons monitor rankings, indexation status, and backlink health every 3 hours to safeguard your positions.'
    }
  ];

  const faqs = [
    {
      q: 'How quickly does this service produce ranking results?',
      a: 'Technical fixes and Core Web Vitals optimizations typically show initial ranking velocity within 30 to 45 days. Broader commercial term dominance and AI engine citation compounding typically occur within 3 to 6 months.'
    },
    {
      q: 'Do you work on flexible monthly scopes or long lock-in contracts?',
      a: 'We operate on transparent, performance-driven monthly scopes. We believe sustained results earn retention, which is why our clients maintain a 98% long-term partnership rate without predatory lock-in contracts.'
    },
    {
      q: 'How do you report progress and campaign metrics?',
      a: 'You receive real-time dashboard visibility, automated weekly performance updates, and dedicated monthly strategy consultations highlighting revenue growth, conversion rates, and new keyword expansions.'
    }
  ];

  if (loading) {
    return (
      <main className="service-detail-loading container section">
        <div className="loader-box">
          <Zap size={28} className="spin" />
          <p>Loading specialized architecture...</p>
        </div>
      </main>
    );
  }

  if (error || !service) {
    return (
      <main className="service-detail-error container section">
        <div className="error-card">
          <h2>Service Architecture Not Found</h2>
          <p>{error || 'The requested service could not be located.'}</p>
          <Link to="/services" className="button button-dark">
            View All Services <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  const otherServices = (Array.isArray(allServices) ? allServices : defaultServices)
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <main className="service-detail-page">
      {/* 1. HERO HEADER */}
      <section className="service-hero-section">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            <span className="current">{service.name}</span>
          </div>

          <div className="hero-grid">
            <div className="hero-text-col">
              <div className="service-badge-pill">
                <Sparkles size={14} />
                <span>{service.badge || 'ENTERPRISE ARCHITECTURE'}</span>
              </div>
              <h1>{service.name}</h1>
              <p className="hero-lead-desc">{service.description}</p>

              <div className="service-quick-metrics">
                <div>
                  <small>CRAWL FREQUENCY</small>
                  <strong>Every 3 Hours</strong>
                </div>
                <div className="divider"></div>
                <div>
                  <small>COMPLIANCE</small>
                  <strong>100% White-Hat</strong>
                </div>
                <div className="divider"></div>
                <div>
                  <small>REPORTING</small>
                  <strong>Real-Time Dashboard</strong>
                </div>
              </div>
            </div>

            {service.imageUrl && (
              <div className="hero-image-col">
                <div className="image-frame">
                  <img src={service.imageUrl} alt={service.name} />
                  <div className="image-glass-tag">
                    <ShieldCheck size={18} />
                    <span>RankShelter Verified Architecture</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. MAIN 2-COLUMN DETAIL BODY */}
      <section className="container service-main-body">
        <div className="service-content-layout">
          {/* LEFT: STRATEGY, DELIVERABLES, WORKFLOW & FAQ */}
          <div className="service-narrative-col">
            <div className="section-block">
              <span className="eyebrow">STRATEGIC OVERVIEW</span>
              <h2>Engineered for measurable search dominance.</h2>
              <div className="service-article-content">
                <p className="lead-paragraph">
                  {service.content || service.description}
                </p>
                <p>
                  Modern search engines and generative answer engines no longer reward isolated tactics.
                  We architect integrated campaigns that align technical speed, brand entities, and
                  high-intent content so your domain becomes the undisputed consensus choice across both
                  traditional SERPs and conversational AI answers.
                </p>
              </div>
            </div>

            {/* KEY DELIVERABLES CHECKLIST */}
            <div className="section-block deliverables-block">
              <span className="eyebrow">SCOPE & DELIVERABLES</span>
              <h3>What you receive with this architecture:</h3>
              <div className="deliverables-grid">
                {deliverables.map((item, idx) => (
                  <div className="deliverable-item" key={idx}>
                    <CheckCircle2 size={20} className="check-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-PHASE ROADMAP */}
            <div className="section-block roadmap-block">
              <span className="eyebrow">EXECUTION ROADMAP</span>
              <h3>Systematic 4-phase delivery process</h3>
              <div className="workflow-steps-list">
                {workflowSteps.map((step, idx) => (
                  <div className="workflow-step-card" key={idx}>
                    <div className="step-num">{step.num}</div>
                    <div className="step-text">
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TECH STACK PILLS */}
            <div className="section-block tech-stack-block">
              <span className="eyebrow">INTELLIGENCE & TOOLING STACK</span>
              <h3>Enterprise technology stack powering this service:</h3>
              <div className="stack-pills">
                <span>Schema.org JSON-LD</span>
                <span>OpenAI Entity Graph</span>
                <span>Ahrefs Enterprise</span>
                <span>Screaming Frog Spiders</span>
                <span>Google Search Console API</span>
                <span>Cloudflare Workers</span>
                <span>Core Web Vitals CI</span>
              </div>
            </div>

            {/* FAQ ACCORDION */}
            <div className="section-block service-faq-block">
              <span className="eyebrow">FREQUENTLY ASKED QUESTIONS</span>
              <h3>Common questions about this architecture</h3>
              <div className="faq-list">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className={`faq-card ${openFaq === idx ? 'open' : ''}`}
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  >
                    <div className="faq-question">
                      <h4>{faq.q}</h4>
                      <ChevronDown size={18} />
                    </div>
                    {openFaq === idx && (
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: STICKY CONSULTATION & PROPOSAL CARD */}
          <aside className="service-sidebar-col">
            <div className="sticky-proposal-card">
              <div className="card-top-header">
                <span className="pulse-dot"></span>
                <span>ACTIVE DEPLOYMENT SLOTS OPEN</span>
              </div>

              <h3>Deploy This Architecture</h3>
              <p>
                Get a custom roadmap, competitor analysis, and projected timeline tailored to your domain.
              </p>

              <div className="features-checklist">
                <div>
                  <ShieldCheck size={16} />
                  <span>NDA Protected Consultation</span>
                </div>
                <div>
                  <Clock size={16} />
                  <span>2-Hour Guaranteed Response</span>
                </div>
                <div>
                  <BarChart3 size={16} />
                  <span>Real-Time Dashboard Access</span>
                </div>
              </div>

              <div className="card-cta-actions">
                <Link
                  className="button button-green full-width"
                  to={`/contact?service=${encodeURIComponent(service.name)}`}
                >
                  Request Proposal & Audit <ArrowUpRight size={17} />
                </Link>

                <a
                  className="button button-outline-dark full-width"
                  href={contact.whatsapp ? whatsappHref : 'https://wa.me/'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={17} /> Chat with Lead Strategist
                </a>
              </div>

              <div className="card-guarantee-note">
                <small>
                  No lock-in contracts • Transparent monthly retainers • 98% client retention
                </small>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 3. RELATED SERVICES GRID */}
      {otherServices.length > 0 && (
        <section className="related-services-section container section">
          <div className="section-title">
            <span className="eyebrow">COMPLEMENTARY CAPABILITIES</span>
            <h2>
              Explore other <em>growth architectures.</em>
            </h2>
          </div>

          <div className="related-grid">
            {otherServices.map((item) => (
              <Link
                key={item.id || item.slug}
                to={`/services/${encodeURIComponent(item.slug)}`}
                className="related-service-card"
              >
                <span className="related-badge">{item.badge || 'SPECIALIZED'}</span>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <span className="card-arrow">
                  Explore Architecture <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
