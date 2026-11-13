import React, { useState } from 'react';
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
  Users,
  Sparkles,
  Bot,
  Zap,
  Activity,
  Cpu,
  BarChart3,
  ChevronDown,
  Globe,
  Check,
  X as CloseIcon,
  Send
} from 'lucide-react';
import { getBlogs, getServices } from '../services/api.js';
import useContent from '../hooks/useContent.js';
import ServiceCard from '../components/ServiceCard.jsx';
import BlogCard from '../components/BlogCard.jsx';
import { contact } from '../config/contact.js';
import { caseStudies } from '../data/defaultContent.js';
import './Home.scss';

export default function Home() {
  const services = useContent(getServices);
  const blogs = useContent(getBlogs);

  // Live Audit State
  const [auditUrl, setAuditUrl] = useState('');
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditResult, setAuditResult] = useState(null);

  // Active Automation Tab
  const [activeTab, setActiveTab] = useState(0);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // Contact Form State
  const [formSent, setFormSent] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');

  const phoneHref = contact.phone
    ? 'tel:' + contact.phone.replace(/[^+\d]/g, '')
    : '';
  const whatsappHref = contact.whatsapp
    ? 'https://wa.me/' + contact.whatsapp.replace(/\D/g, '')
    : '';

  function handleRunAudit(e) {
    e.preventDefault();
    if (!auditUrl.trim()) return;
    setAuditLoading(true);
    setAuditResult(null);

    setTimeout(() => {
      setAuditLoading(false);
      setAuditResult({
        url: auditUrl.replace(/^https?:\/\//, ''),
        score: 93,
        geoReadiness: 'High (89%)',
        coreWebVitals: 'Good (0.9s LCP)',
        keywordsFound: 46,
        opportunities: [
          '3 missing schema entity types for Google AI Overviews',
          '12 high-intent commercial keywords on Page 2 ready to rank',
          'Mobile Cumulative Layout Shift (CLS) can be reduced by 0.04s'
        ]
      });
    }, 1800);
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    setFormSent(true);
  }

  const automationFeatures = [
    {
      title: 'Real-Time Rank Pulse',
      icon: Activity,
      badge: '24/7 AUTONOMOUS',
      desc: 'Our bots track your top 500 commercial keywords every 3 hours across mobile, desktop, and local SERPs. Any drop triggers instant counter-action protocols.',
      stat: '3-Hour Scan Frequency',
      terminal: [
        '[09:14] Bot indexed 420 ranking positions for rankshelter.com',
        '[09:15] Shift detected: "enterprise seo strategy" rose +3 positions to #2',
        '[09:16] Competitor position alert: 4 competitor URLs dropped from Top 5'
      ]
    },
    {
      title: 'Generative Engine Optimization (GEO)',
      icon: Cpu,
      badge: 'AI SEARCH READY',
      desc: 'We map brand entities and structural consensus data so your content is prominently cited in ChatGPT Search, Perplexity Pro, and Google Gemini Overviews.',
      stat: '98% Citation Accuracy',
      terminal: [
        '[10:02] Analyzing conversational prompt queries in ChatGPT Search',
        '[10:03] Entity graph alignment validated: Schema.org structured data active',
        '[10:04] AI Overview citation confirmed for 18 primary service terms'
      ]
    },
    {
      title: 'Autonomous Crawl & Index Sentinel',
      icon: Bot,
      badge: 'ZERO CRAWL WASTE',
      desc: 'Automatic detection of 404s, redirect loops, and rendering snags before they impact your organic visibility or Google crawl budget.',
      stat: '0.01s Latency Detection',
      terminal: [
        '[11:20] Health check complete: 0 orphaned pages, 0 broken redirect chains',
        '[11:21] Core Web Vitals speed audit: LCP 0.82s (99.4th percentile)',
        '[11:22] Indexing bot validated fresh canonical tags on all pillar pages'
      ]
    },
    {
      title: 'Backlink Authority Defender',
      icon: ShieldCheck,
      badge: 'WHITE-HAT DISCOVERY',
      desc: 'Continuous monitoring of your inbound link velocity. Automated alerts if an authority backlink goes offline, with instant automated recovery outreach.',
      stat: '100% Manual Outreach',
      terminal: [
        '[12:45] Verified 14 new editorial links from DR 70+ publications',
        '[12:46] Anchor text diversity profile healthy (91% branded & topical)',
        '[12:47] 0 toxic backlinks identified; disavow protocol fully optimized'
      ]
    }
  ];

  const faqs = [
    {
      q: 'How does AI-Driven SEO & GEO differ from traditional agency work?',
      a: 'Traditional agencies run manual audits once a month and focus purely on basic keywords. Our AI & Automation platform continuously monitors ranking shifts, tracks brand citations inside generative engines like ChatGPT and Perplexity, and fixes technical vulnerabilities in hours rather than weeks.'
    },
    {
      q: 'How soon can we expect measurable organic improvements?',
      a: 'While full domain compounding takes 3 to 6 months, technical optimization, Core Web Vitals fixes, and on-page intent realignment typically produce visible ranking velocity and traffic upticks within the first 30 to 45 days.'
    },
    {
      q: 'Are your link building strategies safe from Google algorithm penalties?',
      a: 'Absolutely. We do not use private blog networks (PBNs), automated link farms, or paid comment links. Every link we build is an authentic editorial citation earned on real, vetted industry publications with genuine audience traffic.'
    },
    {
      q: 'Do you provide regular automated reporting?',
      a: 'Yes. Clients receive real-time dashboard access, automated weekly performance summaries, and dedicated monthly strategy consultations highlighting revenue growth, keyword rankings, and new opportunities.'
    }
  ];

  return (
    <div className="home-page-wrapper">
      {/* 1. HERO SECTION */}
      <section className="home-hero" id="hero">
        <div className="hero-backdrop-glow"></div>
        <div className="container hero-content">
          <div className="hero-main-col">
            <div className="hero-pill-badge">
              <span className="live-dot"></span>
              <span className="pill-text">NEXT-GEN AI & AUTOMATED SEO STUDIO</span>
              <span className="pill-year">2026</span>
            </div>

            <h1>
              Make your brand <em>impossible</em> to outrank.
            </h1>

            <p className="hero-subtext">
              We engineer search dominance through generative AI optimization, autonomous
              monitoring, high-velocity link building, and high-intent content architecture.
            </p>

            {/* LIVE AUDIT SCANNER INPUT */}
            <form className="hero-audit-form" onSubmit={handleRunAudit}>
              <div className="audit-input-wrap">
                <Globe size={19} className="globe-icon" />
                <input
                  type="text"
                  placeholder="Enter your website URL (e.g. yourbrand.com)"
                  value={auditUrl}
                  onChange={(e) => setAuditUrl(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={auditLoading}
                className="button button-green audit-btn"
              >
                {auditLoading ? (
                  <span className="btn-loading">
                    <Zap size={16} className="spin" /> Scanning...
                  </span>
                ) : (
                  <span>
                    Scan Website <ArrowRight size={16} />
                  </span>
                )}
              </button>
            </form>

            {/* AUDIT RESULT PREVIEW MODAL / CARD */}
            {auditResult && (
              <div className="audit-result-card animate-fade-in">
                <div className="audit-header">
                  <div>
                    <span className="audit-tag">LIVE AUDIT COMPLETE</span>
                    <h4>{auditResult.url}</h4>
                  </div>
                  <div className="audit-score-circle">
                    <span className="score-val">{auditResult.score}</span>
                    <small>/100</small>
                  </div>
                </div>
                <div className="audit-metrics-row">
                  <div>
                    <small>AI Search Readiness</small>
                    <strong>{auditResult.geoReadiness}</strong>
                  </div>
                  <div>
                    <small>Speed / Core Vitals</small>
                    <strong>{auditResult.coreWebVitals}</strong>
                  </div>
                  <div>
                    <small>Untapped Keywords</small>
                    <strong>{auditResult.keywordsFound} Queries</strong>
                  </div>
                </div>
                <ul className="audit-opps">
                  {auditResult.opportunities.map((opp, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={15} /> {opp}
                    </li>
                  ))}
                </ul>
                <div className="audit-actions">
                  <Link className="button button-dark-sm" to="/contact">
                    Get Full Roadmap & Audit Report <ArrowUpRight size={14} />
                  </Link>
                  <button
                    type="button"
                    className="audit-close"
                    onClick={() => setAuditResult(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <div className="hero-actions">
              <Link className="button button-green" to="/contact">
                Start a Growth Project <ArrowUpRight size={17} />
              </Link>
              <a className="button button-outline" href="#services">
                Explore Services & Pricing <ArrowRight size={17} />
              </a>
            </div>

            <div className="hero-proof-bar">
              <div className="proof-avatars">
                <span className="av a1">★</span>
                <span className="av a2">✦</span>
                <span className="av a3">↗</span>
              </div>
              <div className="proof-text">
                <strong>4.9 / 5.0 Star Rating</strong>
                <span>from 140+ high-growth tech & commerce brands</span>
              </div>
            </div>
          </div>

          {/* HERO LIVE DASHBOARD PREVIEW */}
          <div className="hero-dashboard-col">
            <div className="hero-dashboard">
              <div className="dashboard-topbar">
                <div className="live-status">
                  <span className="pulse-indicator"></span>
                  <span>AUTONOMOUS ENGINE ACTIVE</span>
                </div>
                <span className="badge-tag">AI OVERVIEW v2.6</span>
              </div>

              <div className="dashboard-metrics-summary">
                <div>
                  <small>Monthly Organic Traffic</small>
                  <h3>482,910</h3>
                  <span className="stat-gain">
                    <TrendingUp size={14} /> +124.8% vs Q3
                  </span>
                </div>
                <div>
                  <small>Generative AI Citations</small>
                  <h3>18,420</h3>
                  <span className="stat-gain">
                    <Sparkles size={14} /> Top Citation Rate
                  </span>
                </div>
              </div>

              {/* INTERACTIVE GROWTH SVG CHART */}
              <div className="chart-container">
                <svg
                  aria-label="Interactive upward growth chart"
                  viewBox="0 0 480 200"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34dfaa" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#34dfaa" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 175 C45 170 65 145 110 152 S175 110 210 122 265 88 304 96 380 40 480 12 L480 200 L0 200 Z"
                    fill="url(#chartGlow)"
                  />
                  <path
                    d="M0 175 C45 170 65 145 110 152 S175 110 210 122 265 88 304 96 380 40 480 12"
                    stroke="#34dfaa"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <div className="chart-months">
                  <span>JAN</span>
                  <span>FEB</span>
                  <span>MAR</span>
                  <span>APR</span>
                  <span>MAY</span>
                  <span>JUN</span>
                </div>
              </div>

              {/* LIVE BOT ACTIVITY LOG CAROUSEL */}
              <div className="mini-feed">
                <div className="feed-header">
                  <Bot size={14} /> Live Automation Stream
                </div>
                <div className="feed-item">
                  <span className="time">Just now</span>
                  <p>Keyword <strong>#1 ranking confirmed</strong> for "b2b enterprise seo"</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TRUST BADGES STRIP */}
        <div className="brand-trust-strip">
          <div className="container trust-flex">
            <span className="trust-title">TRUSTED BY LEADERS IN:</span>
            <div className="trust-tags">
              <span>Cloud & SaaS</span>
              <span>•</span>
              <span>Enterprise E-Commerce</span>
              <span>•</span>
              <span>FinTech</span>
              <span>•</span>
              <span>Healthcare Tech</span>
              <span>•</span>
              <span>Direct-to-Consumer</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="section container home-services-section" id="services">
        <div className="section-title">
          <span className="eyebrow">OUR SPECIALIZED SERVICES</span>
          <h2>
            Engineered for visibility, built for <em>revenue.</em>
          </h2>
          <p>
            Whether conquering classic Google search or dominating new conversational AI engines,
            choose modern solutions designed to scale.
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
            Explore All 6 Full Service Architectures <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* 3. AI & AUTOMATION SPOTLIGHT SUITE */}
      <section className="home-automation-spotlight">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">AUTONOMOUS ADVANTAGE</span>
            <h2>
              The power of <em>24/7 SEO automation.</em>
            </h2>
            <p>
              Manual agency audits belong in the past. Explore our automated intelligent
              workflows that continuously defend and expand your organic market share.
            </p>
          </div>

          <div className="automation-showcase-box">
            {/* TABS SELECTOR */}
            <div className="automation-tabs-bar">
              {automationFeatures.map((feat, idx) => {
                const TabIcon = feat.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    className={`tab-btn ${activeTab === idx ? 'active' : ''}`}
                    onClick={() => setActiveTab(idx)}
                  >
                    <TabIcon size={18} />
                    <span>{feat.title}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT DETAIL */}
            <div className="automation-tab-body">
              <div className="tab-info-col">
                <span className="feature-badge">
                  {automationFeatures[activeTab].badge}
                </span>
                <h3>{automationFeatures[activeTab].title}</h3>
                <p className="tab-desc">{automationFeatures[activeTab].desc}</p>
                <div className="stat-pill">
                  <Zap size={16} />
                  <span>{automationFeatures[activeTab].stat}</span>
                </div>
                <div className="tab-actions">
                  <Link className="button button-dark" to="/contact">
                    Deploy Automation for Your Site <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

              {/* TERMINAL CODE PREVIEW */}
              <div className="tab-terminal-col">
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="d red"></span>
                    <span className="d yellow"></span>
                    <span className="d green"></span>
                  </div>
                  <span className="terminal-title">rankshelter-agent --mode=autonomous</span>
                </div>
                <div className="terminal-body">
                  <p className="terminal-prompt">$ initiating continuous monitoring daemon...</p>
                  {automationFeatures[activeTab].terminal.map((line, lIdx) => (
                    <p key={lIdx} className="terminal-log">
                      {line}
                    </p>
                  ))}
                  <p className="terminal-status">
                    <span className="blink-cursor">_</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON MATRIX (TRADITIONAL VS RANKSHELTER) */}
      <section className="section container home-comparison-section">
        <div className="section-title">
          <span className="eyebrow">WHY AMBITIOUS BRANDS CHOOSE US</span>
          <h2>
            Traditional SEO agencies vs. <em>RankShelter.</em>
          </h2>
          <p>See why high-growth companies fire slow retainer agencies and partner with us.</p>
        </div>

        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Capability / Approach</th>
                <th className="dim-head">Traditional SEO Agencies</th>
                <th className="highlight-head">RankShelter AI & Automation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Auditing Cadence</td>
                <td className="bad">
                  <CloseIcon size={16} /> Manual PDF reports once a month
                </td>
                <td className="good">
                  <Check size={18} /> 24/7 continuous autonomous monitoring
                </td>
              </tr>
              <tr>
                <td>AI & Generative Search (GEO)</td>
                <td className="bad">
                  <CloseIcon size={16} /> Ignores ChatGPT & Perplexity
                </td>
                <td className="good">
                  <Check size={18} /> Full entity mapping & GEO citation engineering
                </td>
              </tr>
              <tr>
                <td>Backlink Quality</td>
                <td className="bad">
                  <CloseIcon size={16} /> Cheap PBNs & spam guest posts
                </td>
                <td className="good">
                  <Check size={18} /> 100% genuine high-DR editorial outreach
                </td>
              </tr>
              <tr>
                <td>Crawl Anomaly Response</td>
                <td className="bad">
                  <CloseIcon size={16} /> Discovered weeks after revenue loss
                </td>
                <td className="good">
                  <Check size={18} /> Instant automated bot alert & recovery
                </td>
              </tr>
              <tr>
                <td>Contracts & Transparency</td>
                <td className="bad">
                  <CloseIcon size={16} /> 12-month lock-in contracts
                </td>
                <td className="good">
                  <Check size={18} /> Performance-driven, complete dashboard transparency
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. PROVEN RESULTS & CASE STUDIES */}
      <section className="section container home-case-studies">
        <div className="section-title">
          <span className="eyebrow">VERIFIED PERFORMANCE</span>
          <h2>
            Compounding results for <em>modern leaders.</em>
          </h2>
          <p>Real organic revenue growth delivered with precision engineering.</p>
        </div>

        <div className="case-grid">
          {caseStudies.map((cs, idx) => (
            <div className="case-card" key={idx}>
              <div className="case-head">
                <span className="client-badge">{cs.client}</span>
                <span className="case-duration">{cs.duration}</span>
              </div>
              <div className="case-growth">
                <h2>{cs.growth}</h2>
                <small>{cs.metric}</small>
              </div>
              <p className="case-detail">{cs.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ABOUT SECTION */}
      <section className="section container home-about-section" id="about">
        <div className="about-split">
          <div className="about-text-col">
            <span className="eyebrow">ABOUT RANKSHELTER</span>
            <h2>
              Good strategy. <em>Better outcomes.</em>
            </h2>
            <p className="lead-text">
              We are a modern digital growth studio dedicated to making ambitious brands
              easier to find, easier to trust, and easier to choose.
            </p>
            <p className="body-text">
              RankShelter combines deep search intelligence, autonomous ranking bots, and
              creative digital marketing. We do not chase vanity numbers — we focus on
              the commercial search queries that compound enterprise value.
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
                Read Our Story & Methodology <ArrowUpRight size={17} />
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
                <p>We analyze the market and diagnose root challenges before touching a single line of copy.</p>
              </div>
            </div>
            <div className="value-item">
              <span className="value-icon">
                <Target size={26} />
              </span>
              <div>
                <h3>People Before Metrics</h3>
                <p>Real customers and high-intent buyers matter far more than temporary low-value clicks.</p>
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

      {/* 7. BLOG / JOURNAL SECTION */}
      <section className="section container home-blog-section" id="blog">
        <div className="section-title">
          <span className="eyebrow">OUR JOURNAL</span>
          <h2>
            Ideas worth <em>sharing.</em>
          </h2>
          <p>
            Practical insights on SEO trends, generative AI engines, and what works in
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
            Explore All Insights & Guides <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* 8. INTERACTIVE FAQ ACCORDION */}
      <section className="section container home-faq-section">
        <div className="section-title">
          <span className="eyebrow">FREQUENTLY ASKED QUESTIONS</span>
          <h2>
            Everything you need to <em>know.</em>
          </h2>
          <p>Clear, direct answers about our process, capabilities, and expectations.</p>
        </div>

        <div className="faq-container">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`faq-item ${openFaq === idx ? 'open' : ''}`}
              onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
            >
              <div className="faq-question">
                <h4>{faq.q}</h4>
                <ChevronDown size={20} className="faq-icon" />
              </div>
              {openFaq === idx && (
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. CONTACT & DIRECT INQUIRY SUITE */}
      <section className="section container home-contact-section" id="contact">
        <div className="section-title">
          <span className="eyebrow">LET'S CONNECT</span>
          <h2>
            Let's build something <em>remarkable.</em>
          </h2>
          <p>
            Your next growth milestone starts with a conversation. Send us a message or
            reach out directly through our channels.
          </p>
        </div>

        <div className="home-contact-grid">
          {/* QUICK INQUIRY FORM */}
          <div className="contact-form-box">
            {formSent ? (
              <div className="form-success-card animate-fade-in">
                <CheckCircle2 size={48} className="success-icon" />
                <h3>Thank you, {formName || 'friend'}!</h3>
                <p>
                  We have received your growth inquiry. An SEO director will review your
                  website and reply within 4 business hours.
                </p>
                <button
                  type="button"
                  className="button button-dark"
                  onClick={() => setFormSent(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit}>
                <h3>Send Us a Growth Inquiry</h3>
                <p>Tell us about your brand and what you want to achieve:</p>

                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Johnson"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Project Goals / Website URL</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="What are your target keywords or growth goals? (e.g. scale traffic 3x, rank for ChatGPT search)"
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                  />
                </div>

                <button type="submit" className="button button-dark full-width">
                  Send Proposal Request <Send size={16} />
                </button>
              </form>
            )}
          </div>

          {/* DIRECT CHANNELS CARD */}
          <div className="contact-methods-box">
            <h3>Direct Contact Channels</h3>
            <p>Prefer instant messaging or email? Connect with our team directly:</p>

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
                    <strong>Instant Chat Available</strong>
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
                    <small>DIRECT PHONE</small>
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
        </div>
      </section>

      {/* 10. CLOSING CTA BANNER */}
      <section className="container section">
        <div className="home-cta">
          <div>
            <span className="eyebrow">JOIN 140+ GROWTH BRANDS</span>
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
