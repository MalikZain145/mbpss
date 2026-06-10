import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, ChevronDown, ChevronRight } from 'lucide-react';
import MBPSSLogo from './MBPSSLogo';
import './Navbar.css';

const residentialServices = [
  { name: 'EPC (Residential)', slug: 'epc-residential' },
  { name: 'Floorplan (2D & 3D)', slug: 'floorplan' },
  { name: 'Inventory', slug: 'inventory' },
  { name: 'Legionella Risk Assessment', slug: 'legionella' },
  { name: 'PAT Testing', slug: 'pat-testing' },
  { name: 'Fire Risk Assessment', slug: 'fire-risk' },
  { name: 'HMO / Licence', slug: 'hmo-licence' },
  { name: 'Eviction Support', slug: 'eviction' },
];

const commercialServices = [
  { name: 'EPC (Commercial)', slug: 'epc-commercial' },
  { name: 'Floorplan (2D & 3D)', slug: 'floorplan' },
  { name: 'Inventory', slug: 'inventory' },
  { name: 'Legionella Risk Assessment', slug: 'legionella' },
  { name: 'PAT Testing', slug: 'pat-testing' },
  { name: 'Fire Risk Assessment', slug: 'fire-risk' },
];

const newBuildServices = [
  { name: 'SAP EPC', slug: 'sap-epc' },
  { name: 'Water Calculations (Part G)', slug: 'water-calculations' },
  { name: 'Floorplan (2D & 3D)', slug: 'floorplan' },
  { name: 'Fire Risk Assessment', slug: 'fire-risk' },
];

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);   // visible state
  const [menuClosing, setMenuClosing]     = useState(false);   // play close anim
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const closeTimer  = useRef(null);
  const navItemRef  = useRef(null);
  const location    = useLocation();

  /* scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* route change → instantly close, no animation */
  useEffect(() => {
    clearTimeout(closeTimer.current);
    setMenuOpen(false);
    setMenuClosing(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  /* body scroll lock */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const forceClose = useCallback(() => {
    clearTimeout(closeTimer.current);
    setMenuClosing(true);
    closeTimer.current = setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 220);
  }, []);

  const handleMouseEnterTrigger = () => {
    clearTimeout(closeTimer.current);
    setMenuClosing(false);
    setMenuOpen(true);
  };

  const handleMouseLeaveTrigger = () => {
    /* small grace period — if pointer reaches the menu before timer fires, timer is cleared */
    closeTimer.current = setTimeout(forceClose, 120);
  };

  const handleMouseEnterMenu = () => {
    clearTimeout(closeTimer.current);
    setMenuClosing(false);
  };

  const handleMouseLeaveMenu = () => {
    forceClose();
  };

  return (
    <>
      {/* ── Top Bar ── */}
      <div className="topbar">
        <div className="container topbar-inner">
          <span className="topbar-text">Professional Property Certification Services across London & UK</span>
          <div className="topbar-links">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" className="navbar-logo">
            <MBPSSLogo />
          </Link>

          {/* Desktop links */}
          <div className="navbar-desktop">
            <div
              ref={navItemRef}
              className={`nav-item nav-item--dropdown ${menuOpen ? 'nav-item--active' : ''}`}
              onMouseEnter={handleMouseEnterTrigger}
              onMouseLeave={handleMouseLeaveTrigger}
            >
              <span className="nav-link">
                Services
                <ChevronDown size={15} className={menuOpen ? 'chevron-up' : ''} />
              </span>
            </div>
            <Link to="/about"   className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>

          <div className="navbar-actions">
            <a href="tel:+447540387542" className="navbar-phone">
              <Phone size={16} /> +44 7540 387542
            </a>
            <Link to="/quote" className="btn-primary btn-sm">Get Quote</Link>

            {/* ── Mobile Toggle ── always shows correct icon ── */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`toggle-icon ${mobileOpen ? 'toggle-icon--open' : ''}`}>
                <span className="bar bar1" />
                <span className="bar bar2" />
                <span className="bar bar3" />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mega Menu (desktop) ── */}
      {(menuOpen || menuClosing) && (
        <div
          className={`mega-menu ${menuClosing ? 'mega-menu--out' : 'mega-menu--in'}`}
          onMouseEnter={handleMouseEnterMenu}
          onMouseLeave={handleMouseLeaveMenu}
        >
          {/* bridge strip — fills gap between navbar and menu so hover doesn't break */}
          <div className="mega-bridge" />
          <div className="mega-menu-inner">
            <div className="mega-col">
              <h4 className="mega-col-title">Residential</h4>
              {residentialServices.map(s => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="mega-link">
                  <ChevronRight size={13} />{s.name}
                </Link>
              ))}
            </div>
            <div className="mega-col">
              <h4 className="mega-col-title">Commercial</h4>
              {commercialServices.map(s => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="mega-link">
                  <ChevronRight size={13} />{s.name}
                </Link>
              ))}
            </div>
            <div className="mega-col">
              <h4 className="mega-col-title">New Build</h4>
              {newBuildServices.map(s => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="mega-link">
                  <ChevronRight size={13} />{s.name}
                </Link>
              ))}
            </div>
            <div className="mega-col mega-col--cta">
              <h4>Need a Certificate?</h4>
              <p>Fast quotes from our certified assessors.</p>
              <Link to="/quote" className="btn-primary" style={{justifyContent:'center'}}>Get Free Quote</Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Slide-in Menu ── */}
      <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu-inner">
          <div
            className="mobile-nav-item"
            onClick={() => setMobileServicesOpen(o => !o)}
          >
            <span>Services</span>
            <ChevronDown size={18} className={mobileServicesOpen ? 'rotated' : ''} />
          </div>

          {mobileServicesOpen && (
            <div className="mobile-submenu">
              <p className="mobile-submenu-cat">Residential</p>
              {residentialServices.map(s => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="mobile-link">{s.name}</Link>
              ))}
              <p className="mobile-submenu-cat">Commercial</p>
              {commercialServices.map(s => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="mobile-link">{s.name}</Link>
              ))}
              <p className="mobile-submenu-cat">New Build</p>
              {newBuildServices.map(s => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="mobile-link">{s.name}</Link>
              ))}
            </div>
          )}

          <Link to="/about"   className="mobile-link">About Us</Link>
          <Link to="/contact" className="mobile-link">Contact</Link>
          <Link to="/quote"   className="mobile-cta btn-primary">Get Free Quote</Link>
          <a href="tel:+447540387542" className="mobile-phone">
            <Phone size={16} /> +44 7540 387542
          </a>
        </div>
      </div>

      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}
    </>
  );
}
