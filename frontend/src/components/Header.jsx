import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, TrendingUp, ArrowUpRight } from 'lucide-react';
import './Header.scss';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          to="/"
          className="brand"
          onClick={() => setOpen(false)}
          aria-label="RankShelter home"
        >
          <span className="brand-logo">
            <TrendingUp />
          </span>
          <span>
            RankShelter<b>.</b>
            <small>SEO & DIGITAL MARKETING</small>
          </span>
        </Link>
        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? 'nav-open' : ''}>
          {[
            ['/', 'Home'],
            ['/services', 'Services'],
            ['/about', 'About'],
            ['/blog', 'Blog'],
            ['/contact', 'Contact']
          ].map(([path, text]) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              onClick={() => setOpen(false)}
            >
              {text}
            </NavLink>
          ))}
          <Link
            className="button button-dark"
            to="/contact"
            onClick={() => setOpen(false)}
          >
            Start a Project <ArrowUpRight size={17} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
