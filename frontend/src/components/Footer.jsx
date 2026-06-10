import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import MBPSSLogo from './MBPSSLogo';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* CTA Band */}
      <div className="footer-cta">
        <div className="container footer-cta-inner">
          <div>
            <h3>Ready to Book Your Certificate?</h3>
            <p>Fast turnaround · Certified assessors · Competitive pricing</p>
          </div>
          <div className="footer-cta-actions">
            <Link to="/quote" className="btn-primary">Get Free Quote <ArrowRight size={16} /></Link>
            <a href="tel:+447540387542" className="btn-secondary">Call Now</a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <MBPSSLogo />
            <p className="footer-desc">
              MBPSS provides professional property certification and compliance services for residential, commercial and new build properties across London and the UK.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            </div>
          </div>

          {/* Residential Services */}
          <div className="footer-col">
            <h4>Residential Services</h4>
            <ul>
              <li><Link to="/services/epc-residential">EPC (Residential)</Link></li>
              <li><Link to="/services/floorplan">Floorplan (2D &amp; 3D)</Link></li>
              <li><Link to="/services/inventory">Inventory</Link></li>
              <li><Link to="/services/legionella">Legionella Risk Assessment</Link></li>
              <li><Link to="/services/pat-testing">PAT Testing</Link></li>
              <li><Link to="/services/fire-risk">Fire Risk Assessment</Link></li>
              <li><Link to="/services/hmo-licence">HMO / Licence</Link></li>
              <li><Link to="/services/eviction">Eviction Support</Link></li>
            </ul>
          </div>

          {/* Commercial & New Build */}
          <div className="footer-col">
            <h4>Commercial Services</h4>
            <ul>
              <li><Link to="/services/epc-commercial">EPC (Commercial)</Link></li>
              <li><Link to="/services/floorplan">Floorplan (2D &amp; 3D)</Link></li>
              <li><Link to="/services/inventory">Inventory</Link></li>
              <li><Link to="/services/legionella">Legionella Risk Assessment</Link></li>
              <li><Link to="/services/pat-testing">PAT Testing</Link></li>
              <li><Link to="/services/fire-risk">Fire Risk Assessment</Link></li>
            </ul>
            <h4 style={{ marginTop: '24px' }}>New Build</h4>
            <ul>
              <li><Link to="/services/sap-epc">SAP EPC</Link></li>
              <li><Link to="/services/water-calculations">Water Calculations (Part G)</Link></li>
              <li><Link to="/services/floorplan">Floorplan (2D &amp; 3D)</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <Phone size={16} />
                <a href="tel:+447540387542">+44 7540 387542</a>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} />
                <a href="mailto:info@mbpss.co.uk">info@mbpss.co.uk</a>
              </div>
              <div className="footer-contact-item">
                <MapPin size={16} />
                <address>340 West End Lane,<br />London, NW6 1LN</address>
              </div>
            </div>
            <div className="footer-badges">
              <div className="badge">✓ Fully Accredited</div>
              <div className="badge">✓ Fully Insured</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} MBPSS Property Solutions. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
