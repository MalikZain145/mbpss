import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, Check } from 'lucide-react';
import { submitContactForm } from '../api';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setApiError('');
    try {
      await submitContactForm(form);
      setSubmitted(true);
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try calling us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-inner">
          <div className="section-label">Get in Touch</div>
          <h1 className="page-title">Contact MBPSS</h1>
          <p>We're here to help — speak to our team for a fast, free quote.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>Contact</span>
          </div>
        </div>
      </section>

      <section className="contact-body">
        <div className="container contact-inner">
          {/* Info */}
          <div className="contact-info">
            <h2>Let's Talk</h2>
            <p>Whether you need a single EPC or ongoing compliance management for a portfolio — our team is ready to help.</p>

            <div className="contact-cards">
              <a href="tel:+447540387542" className="contact-card">
                <div className="contact-card-icon"><Phone size={22} /></div>
                <div>
                  <h4>Call Us</h4>
                  <span>+44 7540 387542</span>
                  <p>Mon–Fri 8am–6pm, Sat 9am–4pm</p>
                </div>
              </a>
              <a href="mailto:info@mbpss.co.uk" className="contact-card">
                <div className="contact-card-icon"><Mail size={22} /></div>
                <div>
                  <h4>Email Us</h4>
                  <span>info@mbpss.co.uk</span>
                  <p>We reply within 2 hours</p>
                </div>
              </a>
              <div className="contact-card">
                <div className="contact-card-icon"><MapPin size={22} /></div>
                <div>
                  <h4>Our Office</h4>
                  <span>340 West End Lane</span>
                  <p>London, NW6 1LN</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon"><Clock size={22} /></div>
                <div>
                  <h4>Opening Hours</h4>
                  <span>Mon–Fri: 8am – 6pm</span>
                  <p>Saturday: 9am – 4pm</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="contact-map">
              <div className="map-placeholder">
                <MapPin size={40} />
                <p>340 West End Lane, London NW6 1LN</p>
                <a
                  href="https://maps.google.com/?q=340+West+End+Lane+London+NW6+1LN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <div className="success-icon"><Check size={32} /></div>
                <h3>Message Sent!</h3>
                <p>Thank you for getting in touch. A member of our team will respond within 2 hours.</p>
                <button className="btn-outline" onClick={() => setSubmitted(false)}>Send Another Message</button>
              </div>
            ) : (
              <>
                <h2>Send Us a Message</h2>
                <p>Fill in the form below and we'll get back to you within 2 hours.</p>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required placeholder="John Smith" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+44 7xxx xxxxxx" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="service">Service Required</label>
                    <select id="service" name="service" value={form.service} onChange={handleChange}>
                      <option value="">Select a service...</option>
                      <option value="domestic-epc">Domestic EPC</option>
                      <option value="domestic-eicr">Domestic EICR</option>
                      <option value="gas-safety">Gas Safety Certificate (CP12)</option>
                      <option value="pat-testing">PAT Testing</option>
                      <option value="fire-risk">Fire Risk Assessment</option>
                      <option value="asbestos">Asbestos Survey</option>
                      <option value="legionella">Legionella Risk Assessment</option>
                      <option value="commercial-epc">Commercial EPC</option>
                      <option value="commercial-eicr">Commercial EICR</option>
                      <option value="other">Other / Multiple Services</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us about your property and what you need..." />
                  </div>
                  {apiError && <div className="form-error">{apiError}</div>}
                  <button type="submit" className="btn-primary form-submit" disabled={loading}>
                    {loading ? 'Sending...' : <><Send size={16} /> Send Message</>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
