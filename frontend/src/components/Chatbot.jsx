import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Send,
  X,
  MessageCircle,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  RefreshCw,
  User,
  ShieldCheck,
  ChevronRight,
  FileText
} from 'lucide-react';
import { contact } from '../config/contact.js';
import { saveInquiry } from '../services/inquiries.js';
import './Chatbot.scss';

const FAQ_CHIPS = [
  { label: '🔍 Free Website Audit', query: 'Tell me about your Website Audit service' },
  { label: '🚀 All 8 Services', query: 'What services does RankShelter offer?' },
  { label: '🔗 Link Building & PR', query: 'How does your link building and Digital PR work?' },
  { label: '⚡ PBN & Link Insertion', query: 'Tell me about PBN Backlinks and Link Insertion' },
  { label: '✍️ SEO Content Writing', query: 'Do you offer SEO content writing?' },
  { label: '💰 Pricing & Retainers', query: 'How much do your SEO packages cost?' },
  { label: '💬 Talk on WhatsApp', query: 'Can I chat with a human on WhatsApp?' },
  { label: '📋 Request a Custom Quote', query: 'I want a custom strategy quote' },
];

const BOT_RESPONSES = [
  {
    keywords: ['audit', 'website audit', 'review my site', 'analyze'],
    text: `🔍 **Website Audit & Technical Diagnosis**:
Our deep-dive audit is the foundational first step. We inspect:
• Crawl bottlenecks & indexation bugs
• Schema.org JSON-LD microdata & entity graphs
• Core Web Vitals speed & render latency
• Backlink profile health & penalty risks

You receive an actionable, prioritized roadmap detailing exactly what is holding your domain back.

Would you like us to audit your domain? You can fill the quick form below or drop your URL!`,
    action: { type: 'form', defaultService: 'Website Audit' },
    link: '/services/website-audit',
  },
  {
    keywords: ['on page', 'on-page', 'onpage', 'meta tags', 'schema'],
    text: `⚡ **On-Page SEO Optimization**:
We transform your pages into algorithmic magnets:
• High-intent commercial keyword placement
• Engineered title tags & semantic H1-H6 structure
• Custom Schema.org microdata for Google AI Overviews
• Internal link equity distribution to high-converting pages

Result: Maximum topical relevance and immediate search rank lift.`,
    link: '/services/on-page-seo',
  },
  {
    keywords: ['digital pr', 'pr', 'press', 'media', 'journalists'],
    text: `📰 **Digital PR & Authority Outreach**:
The highest tier of search authority. We craft proprietary industry studies and newsworthy hooks that national media and top-tier publications want to cover.
• Earn mainstream news mentions & journalist citations
• High-authority backlinks from DR 80-95+ publications
• Unrivaled brand trust that competitors cannot duplicate.`,
    link: '/services/digital-pr',
  },
  {
    keywords: ['link building', 'backlinks', 'links', 'off page'],
    text: `🔗 **Authority Link Building Campaigns**:
High-velocity, contextual backlink acquisition from vetted niche domains:
• Real-traffic publications only (no spam, no link farms)
• Strict vetting: DA/DR 40-90+ with clean anchor history
• Safe white-hat outreach that fuels permanent rank gains.`,
    link: '/services/link-building',
  },
  {
    keywords: ['guest post', 'guest posting', 'guest article'],
    text: `🌐 **Premium Guest Posting**:
High-DR editorial placements on leading industry blogs and media outlets.
• Publication prospecting in your specific vertical
• High-quality copywriting by native specialists
• Guaranteed permanent in-content contextual backlinks.`,
    link: '/services/guest-posting',
  },
  {
    keywords: ['insertion', 'link insertion', 'niche edits', 'curated links'],
    text: `📑 **Curated Link Insertions (Niche Edits)**:
Fast-track your rankings by inserting your contextual link directly into aged, established blog posts that Google has already indexed and awarded ranking authority.
• Immediate link equity transfer
• Faster ranking momentum without waiting for new articles to age.`,
    link: '/services/link-insertion',
  },
  {
    keywords: ['pbn', 'private blog network', 'power links'],
    text: `⚡ **High-Power PBN Backlinks**:
Engineered for hyper-competitive niches where standard outreach needs extra firepower:
• Aged authority domains with pristine historical backlink profiles
• Diverse IP C-blocks, unique DNS setups & zero footprints
• Delivers the aggressive ranking push needed to break into the Top 3.`,
    link: '/services/pbn-backlinks',
  },
  {
    keywords: ['content', 'content writing', 'copywriting', 'articles', 'blogging'],
    text: `✍️ **SEO Content Writing & Copywriting**:
Search traffic without conversions produces zero enterprise value.
• High-intent keyword optimization with semantic search mapping
• Compelling landing pages, comparison guides, and pillar articles
• Written by native experts to rank on Page 1 and convert visitors.`,
    link: '/services/content-writing',
  },
  {
    keywords: ['services', 'offer', 'what do you do', 'all services'],
    text: `🚀 **RankShelter's 8 Specialized SEO Architectures**:
1. **Website Audit** (Deep Technical Diagnosis)
2. **On-Page SEO** (Core Relevance & Schema)
3. **Digital PR** (Tier-1 Media Citations DR 80-95+)
4. **Link Building** (Authority Backlink Acquisition)
5. **Guest Posting** (Editorial Media Placements)
6. **Link Insertion** (Curated Niche Edits on Aged Posts)
7. **PBN Backlinks** (Targeted High-Power Push)
8. **Content Writing** (SEO-Driven High-Converting Copy)

Which architecture fits your current growth target?`,
    link: '/services',
  },
  {
    keywords: ['price', 'pricing', 'cost', 'packages', 'rate', 'how much'],
    text: `💰 **Investment & Custom Scopes**:
Every campaign is engineered around your domain's current authority, competitive gap, and organic revenue targets.
• We offer monthly growth retainers and modular link bundles
• Every scope includes 24/7 autonomous monitoring & transparent reporting
• No locking long-term contracts; we earn your business through measurable rankings.

Fill out the form below or message us directly on WhatsApp to get a tailored proposal!`,
    action: { type: 'form', defaultService: 'General Growth Inquiry' },
  },
  {
    keywords: ['whatsapp', 'human', 'call', 'talk', 'phone', 'contact'],
    text: `📱 **Direct Human Connection**:
Our senior search strategists are available directly via WhatsApp and email.
Click below to open a direct WhatsApp chat, or share your details and we will call you back!`,
    action: { type: 'whatsapp' },
  },
  {
    keywords: ['quote', 'proposal', 'hire', 'start', 'get started'],
    text: `📋 **Request a Tailored Strategy Proposal**:
Please provide your domain URL and email address below. A Senior SEO Strategist will review your website and prepare a custom growth roadmap within 2 hours!`,
    action: { type: 'form', defaultService: 'Custom Strategy Proposal' },
  },
];

export default function Chatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `👋 **Welcome to RankShelter Studio!**\n\nI am your **AI SEO & Digital Growth Strategist**. How can I assist you with your search rankings, backlinks, or technical audit today?`,
      chips: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [leadFormState, setLeadFormState] = useState({
    name: '',
    email: '',
    website: '',
    service: 'Website Audit',
    submitted: false,
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const whatsappHref = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
        'Hi RankShelter, I would like to consult on an SEO growth campaign for my website.'
      )}`
    : 'https://wa.me/?text=Hi%20RankShelter%2C%20I%20would%20like%20to%20discuss%20SEO%20services';

  function handleSend(userText) {
    const text = (userText || input).trim();
    if (!text) return;

    const userMsgId = Date.now();
    const newMessages = [...messages, { id: userMsgId, sender: 'user', text }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // AI Response matching
    setTimeout(() => {
      const lower = text.toLowerCase();

      // Check if user entered an email or domain directly
      const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(lower);
      const hasUrl = /(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/.test(lower);

      if (hasEmail || (hasUrl && lower.split(' ').length <= 4)) {
        saveInquiry({
          name: 'Chat Visitor',
          email: hasEmail ? text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)[0] : 'Via Chat',
          website: hasUrl ? text.match(/(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/)[0] : '',
          service: 'Direct Chatbot Lead Capture',
          message: `Visitor sent via AI Chatbot: "${text}"`,
        });

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: `🎉 **Thank you! We received your domain details.**\n\nOur Senior SEO Engineering team has registered your request. We will examine your site and get back to you within 2 hours with an actionable roadmap.\n\nYou can also connect with us immediately on WhatsApp for instant priority answers.`,
            action: { type: 'whatsapp' },
          },
        ]);
        setIsTyping(false);
        return;
      }

      // Keyword match
      let matched = null;
      for (const item of BOT_RESPONSES) {
        if (item.keywords.some((kw) => lower.includes(kw))) {
          matched = item;
          break;
        }
      }

      if (matched) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: matched.text,
            link: matched.link,
            action: matched.action,
          },
        ]);
      } else {
        // Fallback friendly guidance
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: `That is an excellent question! At RankShelter, we specialize in 8 proven search optimization architectures — from technical audits and on-page restructuring to high-authority link insertions and Digital PR.\n\nWould you like a **free preliminary website audit**, or would you like to speak directly with an SEO Strategist on WhatsApp?`,
            chips: true,
            action: { type: 'form', defaultService: 'Custom Strategy Inquiry' },
          },
        ]);
      }
      setIsTyping(false);
    }, 700);
  }

  function handleChipClick(chip) {
    handleSend(chip.query);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!leadFormState.email && !leadFormState.website) return;

    saveInquiry({
      name: leadFormState.name || 'Chat Visitor',
      email: leadFormState.email || 'N/A',
      website: leadFormState.website || '',
      service: leadFormState.service || 'Chatbot Strategy Request',
      message: `Lead captured via AI Chatbot form. Requested Service: ${leadFormState.service}`,
    });

    setLeadFormState((prev) => ({ ...prev, submitted: true }));

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: 'bot',
        text: `✅ **Strategy Request Confirmed!**\n\nThank you, **${leadFormState.name || 'valued partner'}**! Your domain (**${
          leadFormState.website || 'website'
        }**) has been assigned to our senior search engineering desk. We will analyze your entity graph, backlink authority, and competitive ranking gaps.\n\nFeel free to chat with us directly on WhatsApp below anytime.`,
        action: { type: 'whatsapp' },
      },
    ]);
  }

  function handleResetChat() {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: `👋 **Welcome back!**\n\nI'm ready to guide your domain to Page 1 rankings. Select a topic below or type your questions:`,
        chips: true,
      },
    ]);
    setLeadFormState({
      name: '',
      email: '',
      website: '',
      service: 'Website Audit',
      submitted: false,
    });
  }

  if (!isOpen) return null;

  return (
    <div className="rankshelter-chatbot-panel" role="dialog" aria-label="AI SEO Strategist Chatbot">
      {/* 1. CHAT HEADER */}
      <div className="chat-header">
        <div className="header-agent-info">
          <div className="agent-avatar-wrap">
            <Bot size={20} />
            <span className="live-status-dot"></span>
          </div>
          <div className="agent-text">
            <h4>RankShelter AI Strategist</h4>
            <p>
              <span className="status-indicator"></span> 24/7 Autonomous SEO Advisor
            </p>
          </div>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="action-btn"
            title="Reset Conversation"
            onClick={handleResetChat}
            aria-label="Reset Conversation"
          >
            <RefreshCw size={15} />
          </button>
          <button
            type="button"
            className="action-btn close-btn"
            title="Close Chat"
            onClick={onClose}
            aria-label="Close Chat"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* 2. CHAT BODY */}
      <div className="chat-body">
        <div className="chat-security-banner">
          <ShieldCheck size={13} />
          <span>Confidential Domain Analysis • Senior SEO Engineering</span>
        </div>

        {messages.map((m) => (
          <div key={m.id} className={`chat-bubble-row ${m.sender === 'user' ? 'user-row' : 'bot-row'}`}>
            {m.sender === 'bot' && (
              <div className="bot-avatar-tiny">
                <Bot size={14} />
              </div>
            )}
            <div className="bubble-content">
              <div className="bubble-text">
                {m.text.split('\n').map((line, idx) => {
                  if (!line.trim()) return <br key={idx} />;
                  // Bold parser
                  const parts = line.split(/(\*\*.*?\*\*)/g);
                  return (
                    <p key={idx}>
                      {parts.map((p, i) => {
                        if (p.startsWith('**') && p.endsWith('**')) {
                          return <strong key={i}>{p.slice(2, -2)}</strong>;
                        }
                        return p;
                      })}
                    </p>
                  );
                })}
              </div>

              {/* Service Link if provided */}
              {m.link && (
                <div className="bubble-link-wrap">
                  <Link to={m.link} onClick={onClose} className="bubble-service-link">
                    <span>Explore this Service</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              )}

              {/* WhatsApp Action button */}
              {m.action?.type === 'whatsapp' && (
                <div className="bubble-whatsapp-wrap">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bubble-whatsapp-btn"
                  >
                    <MessageCircle size={15} />
                    <span>Open Direct WhatsApp Chat</span>
                  </a>
                </div>
              )}

              {/* Quick Inquiry Form Inside Chat */}
              {m.action?.type === 'form' && !leadFormState.submitted && (
                <form className="in-chat-lead-form" onSubmit={handleFormSubmit}>
                  <div className="form-header">
                    <Sparkles size={14} />
                    <span>Get a Free Custom SEO Strategy</span>
                  </div>
                  <div className="form-inputs">
                    <input
                      type="text"
                      placeholder="Your Name (e.g. John Doe)"
                      value={leadFormState.name}
                      onChange={(e) => setLeadFormState({ ...leadFormState, name: e.target.value })}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Work Email * (e.g. john@brand.com)"
                      value={leadFormState.email}
                      onChange={(e) => setLeadFormState({ ...leadFormState, email: e.target.value })}
                    />
                    <input
                      type="text"
                      required
                      placeholder="Your Website URL * (e.g. yourbrand.com)"
                      value={leadFormState.website}
                      onChange={(e) => setLeadFormState({ ...leadFormState, website: e.target.value })}
                    />
                    <select
                      value={leadFormState.service}
                      onChange={(e) => setLeadFormState({ ...leadFormState, service: e.target.value })}
                    >
                      <option value="Website Audit">Website Audit</option>
                      <option value="On-Page SEO">On-Page SEO</option>
                      <option value="Digital PR">Digital PR</option>
                      <option value="Link Building">Link Building</option>
                      <option value="Guest Posting">Guest Posting</option>
                      <option value="Link Insertion">Link Insertion</option>
                      <option value="PBN Backlinks">PBN Backlinks</option>
                      <option value="Content Writing">Content Writing</option>
                    </select>
                  </div>
                  <button type="submit" className="form-submit-btn">
                    <span>Submit for Free Audit</span>
                    <ChevronRight size={15} />
                  </button>
                </form>
              )}

              {/* Quick prompt chips */}
              {m.chips && (
                <div className="chat-chips-grid">
                  {FAQ_CHIPS.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="chat-chip"
                      onClick={() => handleChipClick(chip)}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-bubble-row bot-row typing-row">
            <div className="bot-avatar-tiny">
              <Bot size={14} />
            </div>
            <div className="bubble-content typing-bubble">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. CHAT FOOTER INPUT */}
      <form
        className="chat-footer-input"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          type="text"
          placeholder="Ask anything about our SEO & backlinks..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={!input.trim()}
          aria-label="Send message"
          className="send-button"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
