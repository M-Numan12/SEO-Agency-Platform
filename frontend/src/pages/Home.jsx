import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, TrendingUp } from 'lucide-react';
import { getBlogs, getServices } from '../services/api.js';
import useContent from '../hooks/useContent.js';
import ServiceCard from '../components/ServiceCard.jsx';
import BlogCard from '../components/BlogCard.jsx';
import './Home.scss';

export default function Home() {
  const services = useContent(getServices);
  const blogs = useContent(getBlogs);

  return (
    <>
      <section className="home-hero">
        <div className="container hero-content">
          <div>
            <span className="eyebrow">✦ DIGITAL GROWTH, REIMAGINED</span>
            <h1>
              Make your brand <em>impossible</em> to ignore.
            </h1>
            <p>
              We combine search strategy, meaningful content, and creative technology
              to turn your digital presence into measurable business growth.
            </p>
            <div className="hero-actions">
              <Link className="button button-green" to="/contact">
                Start a Project <ArrowUpRight size={17} />
              </Link>
              <Link className="button button-outline" to="/services">
                Explore Services <ArrowRight size={17} />
              </Link>
            </div>
            <div className="hero-caption">
              Made for ambitious brands. Built for sustainable growth.
            </div>
          </div>
          <div className="hero-dashboard">
            <div className="dashboard-bar">
              <span>● GROWTH OVERVIEW</span>
              <span>↗ DEMO</span>
            </div>
            <p>Website performance</p>
            <h2>+124.8%</h2>
            <span>
              <TrendingUp size={16} /> Illustrative growth chart
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

      <section className="section container">
        <div className="section-title">
          <span className="eyebrow">WHAT WE DO</span>
          <h2>
            Everything you need to <em>grow online.</em>
          </h2>
          <p>One strategic partner for visibility, credibility, and sustainable growth.</p>
        </div>
        {services.loading ? (
          <p>Loading services...</p>
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
            Explore All Services <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

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
              ['01', 'Discover', 'We listen, research and identify opportunities.'],
              ['02', 'Strategize', 'We turn research into a focused growth plan.'],
              ['03', 'Execute', 'We deliver with creativity and precision.'],
              ['04', 'Improve', 'We measure outcomes and keep learning.']
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

      <section className="section container">
        <div className="section-title">
          <span className="eyebrow">LATEST INSIGHTS</span>
          <h2>
            Ideas worth <em>sharing.</em>
          </h2>
          <p>Practical thinking on SEO, content and what's next.</p>
        </div>
        {blogs.loading ? (
          <p>Loading blogs...</p>
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
            Explore Our Blog <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <section className="container section">
        <div className="home-cta">
          <div>
            <span className="eyebrow">LET'S BUILD SOMETHING GREAT</span>
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
    </>
  );
}
