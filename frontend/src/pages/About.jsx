import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Search,
  Target,
  ShieldCheck,
  Bot,
  Cpu,
  BarChart3,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import './About.scss';

export default function About() {
  return (
    <main className="about-page">
      {/* 1. HERO SECTION */}
      <section className="about-hero container section">
        <div className="about-hero-text">
          <div className="about-badge">
            <span className="live-dot"></span>
            <span>NEXT-GEN SEARCH & AUTOMATION STUDIO</span>
          </div>
          <h1>
            Engineered for growth. <em>Driven by intelligence.</em>
          </h1>
          <p className="about-lead">
            RankShelter is an elite search optimization studio built for the AI era.
            We blend deep search intelligence, 24/7 autonomous monitoring bots, and
            editorial authority outreach to make high-growth brands impossible to outrank.
          </p>
          <div className="about-hero-actions">
            <Link className="button button-green" to="/contact">
              Start a Growth Project <ArrowUpRight size={17} />
            </Link>
            <Link className="button button-outline" to="/services">
              View Our Capabilities <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        <div className="about-art-card">
          <div className="art-glow"></div>
          <div className="art-inner">
            <div className="art-badge">
              <Sparkles size={16} /> AI SEARCH & GEO READY
            </div>
            <TrendingUp size={72} className="art-icon" />
            <h3>Dominate Search Across Google & AI Engines</h3>
            <p>From classic SERPs to ChatGPT and Perplexity citations.</p>
            <div className="art-stats">
              <div>
                <strong>98%</strong>
                <small>Retention Rate</small>
              </div>
              <div className="sep"></div>
              <div>
                <strong>10x</strong>
                <small>Average ROI</small>
              </div>
              <div className="sep"></div>
              <div>
                <strong>24/7</strong>
                <small>Autonomous Bot</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="about-stats-strip">
        <div className="container stats-flex">
          <div className="stat-unit">
            <h2>150+</h2>
            <p>High-Growth Campaigns Executed</p>
          </div>
          <div className="stat-unit">
            <h2>98.4%</h2>
            <p>Client Partnership Retention</p>
          </div>
          <div className="stat-unit">
            <h2>10x</h2>
            <p>Average Organic Revenue Multiplier</p>
          </div>
          <div className="stat-unit">
            <h2>0</h2>
            <p>Algorithmic Penalties (100% White-Hat)</p>
          </div>
        </div>
      </section>

      {/* 3. CORE PRINCIPLES & VALUES */}
      <section className="about-values section">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">OUR CORE PHILOSOPHY</span>
            <h2>
              Principles that separate us from <em>traditional agencies.</em>
            </h2>
            <p>
              We don't sell vanity traffic or deliver outdated monthly PDFs. We build resilient,
              revenue-generating search foundations that compound over years.
            </p>
          </div>

          <div className="about-values-grid">
            <div className="value-card">
              <div className="icon-wrap">
                <Search size={28} />
              </div>
              <h3>Strategy Before Tactics</h3>
              <p>
                We dissect your market, audit competitor entity graphs, and locate hidden high-intent
                commercial queries before touching a line of code or copy.
              </p>
            </div>

            <div className="value-card">
              <div className="icon-wrap">
                <Bot size={28} />
              </div>
              <h3>Autonomous 24/7 Sentinel</h3>
              <p>
                Search algorithms don't sleep. Our autonomous crawl daemons monitor your top rankings,
                Core Web Vitals, and indexing health every 3 hours.
              </p>
            </div>

            <div className="value-card">
              <div className="icon-wrap">
                <Cpu size={28} />
              </div>
              <h3>Generative AI & GEO Mastery</h3>
              <p>
                We optimize your brand entities, semantic schema, and contextual knowledge graphs so
                AI engines like ChatGPT and Perplexity cite you as the authoritative answer.
              </p>
            </div>

            <div className="value-card">
              <div className="icon-wrap">
                <ShieldCheck size={28} />
              </div>
              <h3>100% Ethical Editorial Outreach</h3>
              <p>
                Zero PBNs, zero spam directories. Every backlink we secure is an authentic editorial citation
                earned on high-traffic, real-audience industry publications.
              </p>
            </div>

            <div className="value-card">
              <div className="icon-wrap">
                <Target size={28} />
              </div>
              <h3>Revenue Before Vanity Metrics</h3>
              <p>
                Rankings without conversions are meaningless. We prioritize buyers, decision-makers, and
                commercial intent searches that fuel direct bottom-line revenue.
              </p>
            </div>

            <div className="value-card">
              <div className="icon-wrap">
                <BarChart3 size={28} />
              </div>
              <h3>Radical Transparency</h3>
              <p>
                No hidden tactics or vague explanations. You get real-time client dashboard access, clear
                weekly logs, and straightforward strategic communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 4-STEP GROWTH FRAMEWORK */}
      <section className="about-framework-section container section">
        <div className="section-title">
          <span className="eyebrow">OUR METHODOLOGY</span>
          <h2>
            The 4-stage <em>growth engine.</em>
          </h2>
          <p>A proven, systematic framework engineered to unlock exponential search velocity.</p>
        </div>

        <div className="framework-steps">
          <div className="step-card">
            <div className="step-number">01</div>
            <h4>Algorithmic & Entity Diagnosis</h4>
            <p>
              Complete technical crawl, Core Web Vitals audit, entity knowledge graph mapping, and competitor
              gap analysis to uncover quick wins and foundational snags.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <h4>Intent Architecture & GEO Realignment</h4>
            <p>
              Reconstructing site architecture, deploying high-intent commercial content, and injecting structured
              JSON-LD schema to secure Google AI Overviews and ChatGPT search citations.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <h4>Authority Link Building Flywheel</h4>
            <p>
              White-hat editorial outreach to journalists and tier-1 industry publications, generating high-DR
              backlinks that dramatically boost domain authority and trust.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">04</div>
            <h4>Autonomous 24/7 Defense & Scaling</h4>
            <p>
              Continuous crawler monitoring, instant drop alerts, backlink loss detection, and iterative content
              refreshing to protect your #1 rankings forever.
            </p>
          </div>
        </div>

        <div className="about-bottom-cta">
          <h2>Ready to turn search into your #1 revenue channel?</h2>
          <p>Let's conduct a comprehensive audit of your domain and architect your custom roadmap.</p>
          <Link className="button button-green" to="/contact">
            Schedule a Strategy Consultation <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
