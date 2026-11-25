import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp, X } from 'lucide-react';
import Chatbot from './Chatbot.jsx';
import './FloatingAction.scss';

export default function FloatingAction() {
  const [showTop, setShowTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [unreadBadge, setUnreadBadge] = useState(true);

  useEffect(() => {
    function handleScroll() {
      setShowTop(window.scrollY > 400);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function toggleChat() {
    setChatOpen((prev) => {
      const next = !prev;
      if (next) setUnreadBadge(false);
      return next;
    });
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      {/* Interactive AI Chatbot Window */}
      <Chatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />

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

        {/* AI Strategist Chatbot Toggle Button */}
        <button
          type="button"
          onClick={toggleChat}
          className={`float-btn chat-trigger-pill ${chatOpen ? 'chat-active' : ''}`}
          title={chatOpen ? 'Close AI Chat' : 'Chat with RankShelter AI Strategist'}
          aria-expanded={chatOpen}
          aria-label={chatOpen ? 'Close AI Chat' : 'Open AI Chatbot'}
        >
          <span className="live-pulse-dot"></span>
          {chatOpen ? <X size={20} /> : <MessageCircle size={20} />}
          <span className="pill-label">{chatOpen ? 'Close Chat' : 'Chat with Strategist'}</span>
          {unreadBadge && !chatOpen && <span className="notification-badge">AI</span>}
        </button>
      </aside>
    </>
  );
}
