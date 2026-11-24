import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { contact } from '../config/contact.js';
import './FloatingAction.scss';

export default function FloatingAction() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowTop(window.scrollY > 400);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappHref = contact.whatsapp
    ? 'https://wa.me/' + contact.whatsapp.replace(/\D/g, '')
    : 'https://wa.me/';

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <aside className="floating-actions-container" aria-label="Quick contact & navigation">
      {/* Scroll to Top */}
      {showTop && (
        <button
          type="button"
          className="float-btn top-btn"
          title="Back to Top"
          aria-label="Back to top"
          onClick={scrollToTop}
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* WhatsApp Quick Chat */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="float-btn whatsapp-pill"
        title="Chat with an SEO Strategist on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <span className="live-pulse-dot"></span>
        <MessageCircle size={20} />
        <span className="pill-label">Chat with Strategist</span>
      </a>
    </aside>
  );
}
