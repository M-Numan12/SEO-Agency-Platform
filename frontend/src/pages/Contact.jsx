import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { contact } from '../config/contact.js';
import { saveInquiry } from '../services/inquiries.js';
import './Contact.scss';

export default function Contact() {
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [service, setService] = useState('Website Audit');
  const [message, setMessage] = useState('');

  const phoneHref = contact.phone ? 'tel:' + contact.phone.replace(/[^+\d]/g, '') : '';
  const whatsappHref = contact.whatsapp
    ? 'https://wa.me/' + contact.whatsapp.replace(/\D/g, '')
    : '';

  function handleSubmit(e) {
    e.preventDefault();
    saveInquiry({
      name,
      email,
      website,
      service,
      message,
    });
    setFormSent(true);
  }

  return (
    <main className="contact-page container section">
      <div className="page-title contact-header-hero">
        <div className="contact-pill">
          <Sparkles size={14} /> CONNECT WITH SENIOR STRATEGISTS
        </div>
        <h1>
          Let's talk about your <em>next big growth move.</em>
        </h1>
        <p>
          Whether you want to dominate classic Google search, secure citations in ChatGPT &
          Perplexity, or deploy 24/7 autonomous SEO monitoring, our team is ready.
        </p>
      </div>

      <div className="contact-content-grid">
        {/* LEFT: INTERACTIVE PROPOSAL FORM */}
        <section className="contact-form-section">
          {formSent ? (
            <div className="form-success-box animate-fade-in">
              <CheckCircle2 size={54} className="success-icon" />
              <h2>Inquiry Received!</h2>
              <p>
                Thank you, <strong>{name || 'Partner'}</strong>. We have received your project
                brief. An SEO director will review your domain and respond within 2 business hours.
              </p>
              <div className="success-summary">
                <div>
                  <small>Target Focus</small>
                  <strong>{service}</strong>
                </div>
                {website && (
                  <div>
                    <small>Domain</small>
                    <strong>{website}</strong>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="button button-dark"
                onClick={() => setFormSent(false)}
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form className="proposal-form" onSubmit={handleSubmit}>
              <div className="form-head">
                <h3>Request a Custom Growth Proposal</h3>
                <p>Fill out the details below and we'll audit your search footprint:</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@yourbrand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Website URL</label>
                  <input
                    type="text"
                    placeholder="yourbrand.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Primary Focus</label>
                  <select value={service} onChange={(e) => setService(e.target.value)}>
                    <option value="Website Audit">Website Audit</option>
                    <option value="On-Page SEO">On-Page SEO</option>
                    <option value="Digital PR">Digital PR</option>
                    <option value="Link Building">Link Building</option>
                    <option value="Guest Posting">Guest Posting</option>
                    <option value="Link Insertion">Link Insertion</option>
                    <option value="PBN Backlinks">PBN Backlinks</option>
                    <option value="Content Writing">Content Writing</option>
                    <option value="Complete Monthly Growth Retainer">
                      Complete Monthly Growth Retainer
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Project Details / Growth Objectives *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your target keywords, competitors, or current organic challenges..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button type="submit" className="button button-green submit-btn">
                <span>Request Growth Roadmap & Audit</span> <Send size={16} />
              </button>

              <div className="form-guarantee">
                <ShieldCheck size={16} />
                <span>NDA Protected • Zero spam policy • 2-hour response SLA</span>
              </div>
            </form>
          )}
        </section>

        {/* RIGHT: DIRECT CHANNELS & PROMISES */}
        <section className="contact-info-section">
          <div className="direct-channels-card">
            <h3>Direct Contact Channels</h3>
            <p className="direct-lead">
              Need immediate answers? Connect with our senior team through our verified channels:
            </p>

            <div className="channel-list">
              <a
                className="channel-item"
                href={contact.email ? 'mailto:' + contact.email : 'mailto:growth@rankshelter.com'}
              >
                <span className="channel-icon mail">
                  <Mail size={22} />
                </span>
                <div className="channel-meta">
                  <small>OFFICIAL EMAIL</small>
                  <strong>{contact.email || 'growth@rankshelter.com'}</strong>
                </div>
                <ArrowUpRight size={18} />
              </a>

              {contact.whatsapp ? (
                <a
                  className="channel-item"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="channel-icon whatsapp">
                    <MessageCircle size={22} />
                  </span>
                  <div className="channel-meta">
                    <small>WHATSAPP MESSENGER</small>
                    <strong>Chat with Growth Strategist</strong>
                  </div>
                  <ArrowUpRight size={18} />
                </a>
              ) : (
                <a
                  className="channel-item"
                  href="mailto:growth@rankshelter.com?subject=WhatsApp%20Inquiry"
                >
                  <span className="channel-icon whatsapp">
                    <MessageCircle size={22} />
                  </span>
                  <div className="channel-meta">
                    <small>WHATSAPP DESK</small>
                    <strong>Live Strategist Chat (On Request)</strong>
                  </div>
                  <ArrowUpRight size={18} />
                </a>
              )}

              {contact.phone && (
                <a className="channel-item" href={phoneHref}>
                  <span className="channel-icon phone">
                    <Phone size={22} />
                  </span>
                  <div className="channel-meta">
                    <small>PHONE CALL</small>
                    <strong>{contact.phone}</strong>
                  </div>
                  <ArrowUpRight size={18} />
                </a>
              )}

              {contact.address && (
                <div className="channel-item">
                  <span className="channel-icon pin">
                    <MapPin size={22} />
                  </span>
                  <div className="channel-meta">
                    <small>STUDIO OFFICE</small>
                    <strong>{contact.address}</strong>
                  </div>
                </div>
              )}
            </div>

            <div className="sla-badge-box">
              <div className="sla-dot-pulse"></div>
              <div>
                <strong>Guaranteed Response:</strong>
                <span> All legitimate inquiries receive a tailored response within 2 hours.</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
