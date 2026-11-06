import React from 'react';
import { Mail, Phone, MessageCircle, MapPin, Clock3, ArrowUpRight } from 'lucide-react';
import { contact } from '../config/contact.js';
import './Contact.scss';

export default function Contact() {
  const phoneHref = contact.phone ? 'tel:' + contact.phone.replace(/[^+\d]/g, '') : '';
  const whatsappHref = contact.whatsapp
    ? 'https://wa.me/' + contact.whatsapp.replace(/\D/g, '')
    : '';
  const hasDetails = !!(
    contact.email ||
    contact.phone ||
    contact.whatsapp ||
    contact.address ||
    contact.hours
  );

  return (
    <main className="contact-page container section">
      <div className="page-title">
        <span className="eyebrow">CONTACT US</span>
        <h1>
          Let's talk about your <em>next big move.</em>
        </h1>
        <p>
          Looking for SEO, link building or digital marketing support? Reach out and tell
          us what you need.
        </p>
      </div>

      <div className="contact-content">
        <section className="contact-intro">
          <span className="eyebrow">LET'S CONNECT</span>
          <h2>
            Let's grow <em>together.</em>
          </h2>
          <p>Tell us about your goals and we'll help you choose the right next step.</p>
          {!hasDetails && (
            <p className="contact-unconfigured">
              Business contact details will appear here once they are verified and
              configured.
            </p>
          )}
        </section>

        <section className="contact-details" aria-label="Contact methods">
          {contact.phone && (
            <a className="contact-method" href={phoneHref}>
              <span className="contact-method-icon">
                <Phone size={23} />
              </span>
              <span>
                <small>PHONE</small>
                <strong>{contact.phone}</strong>
              </span>
              <ArrowUpRight size={18} />
            </a>
          )}

          {contact.whatsapp && (
            <a
              className="contact-method"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-method-icon">
                <MessageCircle size={23} />
              </span>
              <span>
                <small>WHATSAPP</small>
                <strong>Chat on WhatsApp</strong>
              </span>
              <ArrowUpRight size={18} />
            </a>
          )}

          {contact.email && (
            <a className="contact-method" href={'mailto:' + contact.email}>
              <span className="contact-method-icon">
                <Mail size={23} />
              </span>
              <span>
                <small>EMAIL</small>
                <strong>{contact.email}</strong>
              </span>
              <ArrowUpRight size={18} />
            </a>
          )}

          {contact.address && (
            <div className="contact-method">
              <span className="contact-method-icon">
                <MapPin size={23} />
              </span>
              <span>
                <small>OFFICE</small>
                <strong>{contact.address}</strong>
              </span>
            </div>
          )}

          {contact.hours && (
            <div className="contact-method">
              <span className="contact-method-icon">
                <Clock3 size={23} />
              </span>
              <span>
                <small>WORKING HOURS</small>
                <strong>{contact.hours}</strong>
              </span>
            </div>
          )}

          {!hasDetails && (
            <div className="contact-method contact-pending">
              <span className="contact-method-icon">
                <Mail size={23} />
              </span>
              <span>
                <small>CONTACT DETAILS</small>
                <strong>Coming soon</strong>
              </span>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
