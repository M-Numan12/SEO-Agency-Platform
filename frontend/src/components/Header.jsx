import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp, ArrowUpRight, ChevronDown, ArrowRight } from 'lucide-react';
import { getServices } from '../services/api';
import './Header.scss';

// Initial menu while the API is loading. Published services from PostgreSQL replace these.
const defaultServices = [
  { name: 'Search Engine Optimization', slug: 'search-engine-optimization' },
  { name: 'Link Building', slug: 'link-building' },
  { name: 'Content Marketing', slug: 'content-marketing' },
  { name: 'Social Media Marketing', slug: 'social-media-marketing' },
  { name: 'Guest Posting', slug: 'guest-posting' },
  { name: 'Technical SEO', slug: 'technical-seo' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [services, setServices] = useState(defaultServices);
  const location = useLocation();
  const servicesRef = useRef(null);

  useEffect(() => {
    let active = true;
    getServices()
      .then(items => {
        if (active && Array.isArray(items)) {
          setServices(items.filter(item => item.slug && item.name));
        }
      })
      .catch(() => {
        // Show the starter service links until the backend is available.
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleOutside(event) {
      if (!servicesRef.current?.contains(event.target)) setServicesOpen(false);
    }
    function handleEscape(event) {
      if (event.key === 'Escape') setServicesOpen(false);
    }
    document.addEventListener('pointerdown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('pointerdown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const closeMenu = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={closeMenu} aria-label="RankShelter home">
          <span className="brand-logo"><TrendingUp /></span>
          <span>RankShelter<b>.</b><small>SEO & DIGITAL MARKETING</small></span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          aria-controls="main-navigation"
          onClick={() => setMobileOpen(value => !value)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

        <nav id="main-navigation" className={mobileOpen ? 'nav-open' : ''} aria-label="Main navigation">
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>

          <div
            ref={servicesRef}
            className={`nav-dropdown ${servicesOpen ? 'dropdown-open' : ''}`}
          >
            <div className="nav-dropdown-trigger">
              <NavLink
                to="/services"
                className={location.pathname.startsWith('/services') ? 'active' : ''}
                onClick={closeMenu}
              >
                Services
              </NavLink>
              <button
                type="button"
                className="nav-dropdown-toggle"
                aria-label="Show services submenu"
                aria-expanded={servicesOpen}
                aria-controls="services-submenu"
                onClick={() => setServicesOpen(value => !value)}
              >
                <ChevronDown size={16} />
              </button>
            </div>

            <div id="services-submenu" className="nav-dropdown-panel">
              <span className="dropdown-label">WHAT WE OFFER</span>
              {services.length ? services.map(service => (
                <Link
                  key={service.id ?? service.slug}
                  to={`/services/${encodeURIComponent(service.slug)}`}
                  onClick={closeMenu}
                  className="dropdown-service"
                >
                  <span>{service.name}</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              )) : <span className="dropdown-empty">No services published yet.</span>}
              <Link to="/services" onClick={closeMenu} className="dropdown-all">
                View All Services <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/blog" onClick={closeMenu}>Blog</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          <Link className="button button-dark" to="/contact" onClick={closeMenu}>
            Start a Project <ArrowUpRight size={17} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
