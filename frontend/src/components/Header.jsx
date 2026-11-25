import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  TrendingUp,
  ArrowUpRight,
  ChevronDown,
  ArrowRight,
  FileSearch,
  FileCheck,
  PenTool,
  Link2,
  Globe,
  FilePlus2,
  Network,
  Megaphone,
  Briefcase
} from 'lucide-react';
import { getServices } from '../services/api';
import { defaultServices } from '../data/defaultContent.js';
import RankShelterIcon from './RankShelterIcon.jsx';
import './Header.scss';

const serviceIconMap = {
  'website-audit': { icon: FileSearch, color: '#2563eb', bg: '#eff6ff' },
  'on-page-seo': { icon: FileCheck, color: '#059669', bg: '#ecfdf5' },
  'content-writing': { icon: PenTool, color: '#0891b2', bg: '#ecfeff' },
  'link-building': { icon: Link2, color: '#6366f1', bg: '#eef2ff' },
  'guest-posting': { icon: Globe, color: '#ea580c', bg: '#fff7ed' },
  'link-insertion': { icon: FilePlus2, color: '#0284c7', bg: '#f0f9ff' },
  'pbn-backlinks': { icon: Network, color: '#0f766e', bg: '#f0fdfa' },
  'digital-pr': { icon: Megaphone, color: '#7c3aed', bg: '#f5f3ff' },
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [services, setServices] = useState(defaultServices);
  const location = useLocation();
  const servicesRef = useRef(null);

  useEffect(() => {
    let active = true;
    getServices()
      .then((items) => {
        if (active && Array.isArray(items) && items.length > 0) {
          setServices(items.filter((item) => item.slug && item.name));
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
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
          <span className="brand-logo">
            <RankShelterIcon size={32} />
          </span>
          <span>
            RankShelter<b>.</b>
            <small>SEO & DIGITAL MARKETING</small>
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          aria-controls="main-navigation"
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

        <nav
          id="main-navigation"
          className={mobileOpen ? 'nav-open' : ''}
          aria-label="Main navigation"
        >
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>

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
                onClick={() => setServicesOpen((value) => !value)}
              >
                <ChevronDown size={16} />
              </button>
            </div>

            {/* SERVICES OVERVIEW DROPDOWN (2-COLUMN GRID) */}
            <div id="services-submenu" className="nav-dropdown-panel services-mega-panel">
              <div className="dropdown-mega-header">
                <h3>Services Overview</h3>
              </div>

              <div className="services-2col-grid">
                {services.map((service) => {
                  const meta = serviceIconMap[service.slug] || {
                    icon: Briefcase,
                    color: '#0ba97e',
                    bg: '#e6f9f3',
                  };
                  const IconComponent = meta.icon;

                  return (
                    <Link
                      key={service.id ?? service.slug}
                      to={`/services/${encodeURIComponent(service.slug)}`}
                      onClick={closeMenu}
                      className="dropdown-service-item"
                    >
                      <span
                        className="service-icon-box"
                        style={{ color: meta.color, background: meta.bg }}
                      >
                        <IconComponent size={19} />
                      </span>
                      <span className="service-title-text">{service.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="dropdown-mega-footer">
                <Link to="/services" onClick={closeMenu} className="view-all-link">
                  <span>View All 8 Specialized Architectures</span> <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          <NavLink to="/blog" onClick={closeMenu}>
            Blog
          </NavLink>
          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>

          <Link className="button button-dark" to="/contact" onClick={closeMenu}>
            Start a Project <ArrowUpRight size={17} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
