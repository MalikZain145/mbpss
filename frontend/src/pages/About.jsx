import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Award, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-inner">
          <div className="section-label">About MBPSS</div>
          <h1 className="page-title">London's Trusted Property<br />Certification Experts</h1>
          <p>Over 15 years of experience delivering professional property compliance services.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>About Us</span>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="about-story">
        <div className="container about-story-inner">
          <div className="about-story-content">
            <div className="section-label">Our Story</div>
            <h2 className="section-title">Built on a Foundation<br />of Trust & Expertise</h2>
            <p>MBPSS was founded with a simple mission: to make property compliance straightforward, affordable, and reliable for landlords, letting agents, and property developers across the UK.</p>
            <p>Based in London, our team of fully accredited assessors has grown to cover the whole of the UK. We work with everyone from first-time landlords with a single property to large property management companies with hundreds of units in their portfolio.</p>
            <p>We believe that compliance shouldn't be complicated. That's why we've built a seamless service that gets you the certificates you need, quickly and at a fair price — with outstanding customer support every step of the way.</p>
            <div className="about-values">
              {['Fast turnaround — most certs same day', 'Fully accredited & insured assessors', 'Competitive, personalised pricing', 'Covering all of London & the UK'].map((v, i) => (
                <div key={i} className="about-value">
                  <Check size={16} />
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-stats-panel">
            <h3>MBPSS by the Numbers</h3>
            {[
              { num: '10,000+', label: 'Certificates Issued' },
              { num: '98%', label: 'Customer Satisfaction' },
              { num: '15+', label: 'Years in Business' },
              { num: '500+', label: 'Happy Clients' },
            ].map((s, i) => (
              <div key={i} className="about-stat">
                <span className="about-stat-num">{s.num}</span>
                <span className="about-stat-label">{s.label}</span>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Leadership</div>
            <h2 className="section-title">Meet Our CEO</h2>
          </div>
          <div className="ceo-card">
            <div className="ceo-avatar">MA</div>
            <div className="ceo-info">
              <h3>Maryum Amir</h3>
              <p className="ceo-title">Chief Executive Officer — MBPSS Property Solutions</p>
              <p className="ceo-bio">Maryum founded MBPSS with a clear vision: to make property compliance fast, transparent and accessible for landlords, letting agents and developers across London and the UK. Under her leadership, MBPSS has grown into one of London's most trusted property services providers, serving hundreds of clients with a commitment to quality and professionalism.</p>
              <div className="ceo-tags">
                <span>Property Expert</span>
                <span>Compliance Specialist</span>
                <span>London & UK Wide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="about-contact">
        <div className="container about-contact-inner">
          <div>
            <Award size={32} />
            <h3>Ready to Get Certified?</h3>
            <p>Contact our friendly team today for a fast, no-obligation quote.</p>
          </div>
          <div className="about-contact-details">
            <a href="tel:+447540387542" className="about-contact-item">
              <Phone size={20} />
              <span>+44 7540 387542</span>
            </a>
            <a href="mailto:info@mbpss.co.uk" className="about-contact-item">
              <Mail size={20} />
              <span>info@mbpss.co.uk</span>
            </a>
            <div className="about-contact-item">
              <MapPin size={20} />
              <span>340 West End Lane, London NW6 1LN</span>
            </div>
          </div>
          <Link to="/quote" className="btn-primary">
            Get Free Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
