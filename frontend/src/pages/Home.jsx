import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, Shield, Home as HomeIcon, Building2, HardHat, Star, Check,
  ArrowRight, Phone, Clock, Award, ChevronDown,
  Map, Droplets, FileText, Flame, Key, AlertTriangle,
  ChevronLeft, ChevronRight, MessageSquare, Send, X,
  Users
} from 'lucide-react';
import ClientsSection from '../components/ClientsSection';
import { getApprovedReviews, submitReview } from '../api';
import './Home.css';

/* ══════════════════════════════════════
   SCROLL ANIMATION HOOK (inline — no extra file needed)
══════════════════════════════════════ */
function useAos(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('aos-visible'), delay);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ── SERVICES ── */
const allServices = {
  residential: [
    { icon: <Zap size={28}/>,           title: 'EPC (Residential)',            desc: 'Energy Performance Certificates for all residential properties. Valid 10 years, required for all sales and lettings.',         slug: 'epc-residential',    color: '#f59e0b' },
    { icon: <Map size={28}/>,           title: 'Floorplan (2D & 3D)',          desc: 'Professional 2D and 3D floorplans for property listings, marketing and planning applications.',                               slug: 'floorplan',          color: '#6366f1' },
    { icon: <FileText size={28}/>,      title: 'Inventory',                    desc: 'Detailed check-in and check-out inventory reports for landlords and letting agents.',                                        slug: 'inventory',          color: '#10b981' },
    { icon: <Droplets size={28}/>,      title: 'Legionella Risk Assessment',   desc: 'Legionella risk assessments to protect tenants and comply with landlord legal obligations.',                                 slug: 'legionella',         color: '#06b6d4' },
    { icon: <Shield size={28}/>,        title: 'PAT Testing',                  desc: 'Portable Appliance Testing to ensure all electrical equipment in your property is safe to use.',                            slug: 'pat-testing',        color: '#8b5cf6' },
    { icon: <Flame size={28}/>,         title: 'Fire Risk Assessment',         desc: 'Comprehensive fire risk assessments and prioritised action plans for residential properties and HMOs.',                      slug: 'fire-risk',          color: '#ef4444' },
    { icon: <Key size={28}/>,           title: 'HMO / Licence',               desc: 'HMO, additional and selective licence applications and compliance support for landlords.',                                   slug: 'hmo-licence',        color: '#f97316' },
    { icon: <AlertTriangle size={28}/>, title: 'Eviction',                    desc: 'Professional eviction support and Section 8 / Section 21 notice preparation for landlords.',                                slug: 'eviction',           color: '#dc2626' },
  ],
  commercial: [
    { icon: <Zap size={28}/>,           title: 'EPC (Commercial)',             desc: 'Energy Performance Certificates for all commercial and non-domestic buildings.',                                            slug: 'epc-commercial',     color: '#f59e0b' },
    { icon: <Shield size={28}/>,        title: 'PAT Testing',                  desc: 'Portable Appliance Testing for commercial offices, retail units and public buildings.',                                     slug: 'pat-testing',        color: '#8b5cf6' },
    { icon: <Droplets size={28}/>,      title: 'Legionella Risk Assessment',   desc: 'Water system Legionella risk assessments for commercial properties and landlords.',                                         slug: 'legionella',         color: '#06b6d4' },
    { icon: <Flame size={28}/>,         title: 'Fire Risk Assessment',         desc: 'Statutory fire risk assessments for commercial, public and multi-occupancy buildings.',                                     slug: 'fire-risk',          color: '#ef4444' },
    { icon: <Map size={28}/>,           title: 'Floorplan (2D & 3D)',          desc: 'Commercial floorplans for marketing, planning and property management.',                                                    slug: 'floorplan',          color: '#6366f1' },
    { icon: <FileText size={28}/>,      title: 'Inventory',                    desc: 'Commercial property inventory and schedule of condition reports.',                                                         slug: 'inventory',          color: '#10b981' },
  ],
  'new-build': [
    { icon: <Zap size={28}/>,           title: 'SAP EPC',                      desc: 'Standard Assessment Procedure energy calculations for new build and converted properties.',                                  slug: 'sap-epc',            color: '#f59e0b' },
    { icon: <Droplets size={28}/>,      title: 'Water Calculations',           desc: 'Part G water usage calculations for new build and converted properties — required for Building Regulations.',                slug: 'water-calculations', color: '#06b6d4' },
    { icon: <Map size={28}/>,           title: 'Floorplan (2D & 3D)',          desc: '2D and 3D floorplans for new build properties, developers and planning submissions.',                                       slug: 'floorplan',          color: '#6366f1' },
    { icon: <Flame size={28}/>,         title: 'Fire Risk Assessment',         desc: 'Fire risk assessments for new build developments and converted properties.',                                                slug: 'fire-risk',          color: '#ef4444' },
  ],
};

const stats = [
  { value: '10,000+', label: 'Certificates Issued' },
  { value: '98%',     label: 'Customer Satisfaction' },
  { value: '24hr',    label: 'Average Turnaround' },
  { value: '15+',     label: 'Years Experience' },
];

const faqs = [
  { q: 'How quickly can I get an EPC?',              a: 'We can usually arrange a visit within 24-48 hours and issue the certificate the same day as the assessment.' },
  { q: 'Do I need a Legionella risk assessment?',    a: 'Yes. Landlords have a legal duty under the Health and Safety at Work Act 1974 to assess the risk of Legionella in their rental properties.' },
  { q: 'What is included in an Inventory report?',   a: 'Our inventory reports cover the full condition and contents of the property at check-in and check-out, with timestamped photos.' },
  { q: 'What is a SAP EPC for new builds?',          a: 'A SAP (Standard Assessment Procedure) EPC is required for all newly built homes and converted properties to demonstrate energy compliance.' },
  { q: 'Can MBPSS help with HMO licensing?',         a: 'Yes. We assist landlords with HMO, additional and selective licence applications and ensure full compliance with local authority requirements.' },
  { q: 'What areas do you cover?',                   a: 'We cover all of London and the surrounding counties. We also have a national network for properties across the UK.' },
];

/* ══════════════════
   STAR RATING
══════════════════ */
function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="star-picker">
      {[1,2,3,4,5].map(n => (
        <button key={n} type="button"
          className={`star-pick ${n <= (hovered || value) ? 'star-pick--on' : ''}`}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}>
          <Star size={28} fill={n <= (hovered || value) ? '#c9a84c' : 'none'} color="#c9a84c"/>
        </button>
      ))}
    </div>
  );
}

/* ══════════════════
   REVIEWS SECTION — connected to backend
══════════════════ */
function ReviewsSection() {
  const [reviews, setReviews]     = useState([]);
  const [totalReviews, setTotal]  = useState(0);
  const [avgRating, setAvg]       = useState(0);
  const [showForm, setShowForm]   = useState(false);
  const [idx, setIdx]             = useState(0);
  const [form, setForm]           = useState({ name:'', role:'', rating:5, text:'' });
  const [submitted, setSubmitted] = useState(false);
  const [submitErr, setSubmitErr] = useState('');
  const headRef  = useAos(0);
  const emptyRef  = useAos(100);

  const loadReviews = async () => {
    try {
      const data = await getApprovedReviews();
      setReviews(data.reviews || []);
      setTotal(data.total || 0);
      setAvg(data.averageRating || 0);
      setIdx(0);
    } catch {}
  };

  useEffect(() => { loadReviews(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (reviews.length < 2) return;
    const t = setInterval(() => setIdx(i => (i + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, [reviews.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitErr('');
    if (!form.name || !form.text || !form.rating) return;
    try {
      await submitReview(form);
      setSubmitted(true);
      setTimeout(() => { setShowForm(false); setSubmitted(false); setForm({ name:'', role:'', rating:5, text:'' }); }, 2500);
    } catch(err) { setSubmitErr(err.message || 'Failed to submit. Please try again.'); }
  };

  return (
    <section className="reviews-section">
      <div className="container">
        <div className="section-header" ref={headRef}>
          <div className="section-label">Customer Reviews</div>
          <h2 className="section-title">What Our Clients Say</h2>
          {totalReviews > 0 && (
            <div className="reviews-live-stats">
              {[...Array(5)].map((_,i)=><Star key={i} size={15} fill={i<Math.round(avgRating)?'#c9a84c':'none'} color="#c9a84c"/>)}
              <span>{avgRating}★ average from {totalReviews} verified review{totalReviews!==1?'s':''}</span>
            </div>
          )}
          <button className="btn-review-open" onClick={() => setShowForm(true)}>
            <MessageSquare size={16}/> Leave a Review
          </button>
        </div>

        {reviews.length === 0 ? (
          <div className="reviews-empty aos-fade-up" ref={emptyRef}>
            <Star size={48} color="#c9a84c"/>
            <h3>Be the first to leave a review!</h3>
            <p>Share your experience with MBPSS and help other property owners.</p>
            <button className="btn-primary" onClick={() => setShowForm(true)}>
              <MessageSquare size={16}/> Write a Review
            </button>
          </div>
        ) : (
          <>
            <div className="reviews-carousel">
              <div className="reviews-track" style={{ transform:`translateX(-${idx * 100}%)` }}>
                {reviews.map((r,i) => (
                  <div key={i} className="review-card">
                    <div className="review-stars">
                      {[...Array(r.rating)].map((_,j) => <Star key={j} size={16} fill="#c9a84c" color="#c9a84c"/>)}
                    </div>
                    <p className="review-text">"{r.text}"</p>
                    <div className="review-author">
                      <div className="review-avatar">{r.name.charAt(0).toUpperCase()}</div>
                      <div>
                        <strong>{r.name}</strong>
                        <span>{r.role || 'Verified Customer'}{r.date ? ` · ${r.date}` : ''}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="carousel-controls">
              <button onClick={() => setIdx(i => (i - 1 + reviews.length) % reviews.length)}><ChevronLeft size={20}/></button>
              <div className="carousel-dots">
                {reviews.map((_,i) => (
                  <button key={i} className={`dot ${i===idx?'dot--active':''}`} onClick={() => setIdx(i)}/>
                ))}
              </div>
              <button onClick={() => setIdx(i => (i+1) % reviews.length)}><ChevronRight size={20}/></button>
            </div>
          </>
        )}
      </div>

      {showForm && (
        <div className="review-modal-overlay" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="review-modal">
            <button className="review-modal-close" onClick={() => setShowForm(false)}><X size={20}/></button>
            {submitted ? (
              <div className="review-success">
                <div className="success-tick"><Check size={32}/></div>
                <h3>Thank you!</h3>
                <p>Your review has been posted.</p>
              </div>
            ) : (
              <>
                <h3>Leave a Review</h3>
                <p>Share your experience with MBPSS</p>
                <form onSubmit={handleSubmit} className="review-form">
                  <div className="rf-row">
                    <div className="rf-group">
                      <label>Your Name *</label>
                      <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="John Smith"/>
                    </div>
                    <div className="rf-group">
                      <label>Your Role</label>
                      <input value={form.role} onChange={e=>setForm({...form,role:e.target.value})} placeholder="e.g. Landlord, Tenant"/>
                    </div>
                  </div>
                  <div className="rf-group">
                    <label>Rating *</label>
                    <StarRating value={form.rating} onChange={v=>setForm({...form,rating:v})}/>
                  </div>
                  <div className="rf-group">
                    <label>Your Review *</label>
                    <textarea required rows={4} value={form.text} onChange={e=>setForm({...form,text:e.target.value})} placeholder="Tell us about your experience..."/>
                  </div>
                  <button type="submit" className="btn-primary rf-submit">
                    <Send size={15}/> Post Review
                  </button>
                  {submitErr && <div style={{color:'#ef4444',fontSize:13,marginTop:4}}>{submitErr}</div>}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function ServiceCard({ service: s, delay }) {
  const ref = useAos(delay);
  return (
    <Link ref={ref} to={`/services/${s.slug}`} className="service-card aos-scale">
      <div className="service-card-icon" style={{background:`${s.color}15`,color:s.color}}>{s.icon}</div>
      <h3>{s.title}</h3>
      <p>{s.desc}</p>
      <div className="service-card-link">Learn more <ArrowRight size={14}/></div>
    </Link>
  );
}

function HowStep({ step, idx }) {
  const ref = useAos(idx * 120);
  return (
    <div ref={ref} className="how-step aos-fade-up">
      <div className="step-number">{step.num}</div>
      <h4>{step.title}</h4>
      <p>{step.desc}</p>
    </div>
  );
}

/* ══════════════════
   HOME PAGE
══════════════════ */
export default function Home() {
  const [activeTab, setActiveTab] = useState('residential');
  const [activeFaq, setActiveFaq] = useState(null);

  /* section refs for AOS */
  const statsRef    = useAos(0);
  const svcHeader   = useAos(0);
  const whyLeft     = useAos(0);
  const whyRight    = useAos(150);
  const howRef      = useAos(0);
  const faqLeft     = useAos(0);
  const faqRight    = useAos(100);

  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-grid"/>
          <div className="hero-glow"/>
        </div>
        <div className="container hero-inner">
          <div className="hero-content">
            <div className="section-label">London's Trusted Property Experts</div>
            <h1 className="hero-title">
              Property Services<br/>
              <span className="hero-title-accent">Done Right.</span>
            </h1>
            <p className="hero-subtitle">
              Professional EPC, Floorplans, Inventory, Legionella, PAT Testing, Fire Risk, HMO Licensing, Eviction support and more — across London & the UK.
            </p>
            <div className="hero-actions">
              <Link to="/quote" className="btn-primary hero-btn">
                Request a Quote <ArrowRight size={18}/>
              </Link>
              <a href="tel:+447540387542" className="btn-secondary hero-btn">
                <Phone size={18}/> +44 7540 387542
              </a>
            </div>
            <div className="hero-trust">
              <div className="trust-item"><Check size={14}/> Same Day Certificates</div>
              <div className="trust-item"><Check size={14}/> Fully Accredited</div>
              <div className="trust-item"><Check size={14}/> Free Quotes</div>
              <div className="trust-item"><Check size={14}/> UK Wide Coverage</div>
            </div>
          </div>
          <div className="hero-card-wrap">
            <div className="hero-quote-card">
              <h3>Quick Quote</h3>
              <p>What service do you need?</p>
              <div className="quick-quote-btns">
                {['EPC','Floorplan','Inventory','Legionella','PAT Testing','Fire Risk','HMO Licence','Eviction'].map(s => (
                  <Link key={s} to={`/quote?service=${encodeURIComponent(s)}`} className="quick-quote-btn">{s}</Link>
                ))}
              </div>
              <Link to="/quote" className="btn-primary" style={{width:'100%',justifyContent:'center',marginTop:'8px'}}>
                Get a Free Quote
              </Link>
              <div className="hero-card-footer"><Clock size={14}/> We respond within 2 hours</div>
            </div>
          </div>
        </div>
        <div className="hero-scroll"><ChevronDown size={20}/></div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-bar">
        <div className="container stats-inner" ref={statsRef}>
          {stats.map((s,i) => (
            <div key={i} className={`stat-item aos-fade-up`} style={{transitionDelay:`${i*80}ms`}}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services-section">
        <div className="container">
          <div className="section-header aos-fade-up" ref={svcHeader}>
            <div className="section-label">What We Offer</div>
            <h2 className="section-title">Complete Property<br/>Services</h2>
            <p className="section-desc">From a single EPC to full compliance management — we cover all your property service needs.</p>
          </div>
          <div className="services-tabs">
            {[
              { id:'residential', label:'Residential', Icon:HomeIcon },
              { id:'commercial',  label:'Commercial',  Icon:Building2 },
              { id:'new-build',   label:'New Build',   Icon:HardHat },
            ].map(({id,label,Icon}) => (
              <button key={id} className={`services-tab ${activeTab===id?'active':''}`} onClick={()=>setActiveTab(id)}>
                <Icon size={16}/> {label}
              </button>
            ))}
          </div>
          <div className="services-grid">
            {allServices[activeTab].map((s,i) => (
              <ServiceCard key={`${activeTab}-${i}`} service={s} delay={i*60}/>
            ))}
          </div>
          <div className="services-cta">
            <Link to="/services" className="btn-outline">View All Services <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="why-section">
        <div className="container why-inner">
          <div className="why-content aos-fade-left" ref={whyLeft}>
            <div className="section-label">Why MBPSS?</div>
            <h2 className="section-title">The UK's Most Trusted<br/>Property Services Partner</h2>
            <p className="section-desc">We combine speed, quality and expertise to deliver a seamless service — whether you're a landlord with one property or managing hundreds.</p>
            <div className="why-list">
              {[
                { icon:<Clock size={20}/>,  title:'Same-Day Certificates',  desc:'Most certificates issued within hours of the assessment.' },
                { icon:<Award size={20}/>,  title:'Fully Accredited',        desc:'All our assessors are fully qualified and accredited in their specialist fields.' },
                { icon:<Users size={20}/>,  title:'Experienced Team',        desc:'15+ years serving landlords, agents and developers.' },
                { icon:<Shield size={20}/>, title:'Guaranteed Compliance',   desc:'All work meets current UK legislation and standards.' },
              ].map((item,i) => (
                <div key={i} className="why-item">
                  <div className="why-item-icon">{item.icon}</div>
                  <div><h4>{item.title}</h4><p>{item.desc}</p></div>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-primary">About MBPSS <ArrowRight size={16}/></Link>
          </div>
          <div className="why-visual aos-fade-right" ref={whyRight}>
            <div className="why-image-card">
              <div className="why-cert-badges">
                {['RICS\nAccredited','Fully\nInsured','UK Wide\nCoverage','15+ Years\nExperience'].map((b,i) => (
                  <div key={i} className="cert-badge"><Check size={16}/><span>{b}</span></div>
                ))}
              </div>
            </div>
            <div className="why-floating-stat">
              <span className="big-num">98%</span>
              <span>Customer satisfaction rate</span>
              <div className="star-row">
                {[...Array(5)].map((_,i) => <Star key={i} size={14} fill="#c9a84c" color="#c9a84c"/>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-section">
        <div className="container">
          <div className="section-header aos-fade-up" ref={howRef}>
            <div className="section-label">Simple Process</div>
            <h2 className="section-title">Get a Quote in 3 Easy Steps</h2>
          </div>
          <div className="how-steps">
            {[
              { num:'01', title:'Request a Quote',        desc:'Fill in our quick online form or call us. Tell us about your property and the services you need.' },
              { num:'02', title:'We Send You a Price',    desc:'We review your requirements and respond within 2 hours with a competitive, personalised quote.' },
              { num:'03', title:'Book & Get Certified',   desc:'Confirm the booking, our assessor visits at a time that suits you, and your certificate is issued the same day.' },
            ].map((step,i) => (
              <HowStep key={i} step={step} idx={i}/>
            ))}
          </div>
          <div className="how-cta">
            <Link to="/quote" className="btn-primary">Request a Free Quote <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <ClientsSection/>

      {/* ── REVIEWS ── */}
      <ReviewsSection/>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <div className="container faq-inner">
          <div className="faq-left aos-fade-left" ref={faqLeft}>
            <div className="section-label">FAQs</div>
            <h2 className="section-title">Frequently Asked<br/>Questions</h2>
            <p>Can't find your answer? Our team is ready to help.</p>
            <a href="tel:+447540387542" className="btn-primary" style={{marginTop:'24px'}}>
              <Phone size={16}/> Call Us Now
            </a>
          </div>
          <div className="faq-list aos-fade-right" ref={faqRight}>
            {faqs.map((f,i) => (
              <div key={i} className={`faq-item ${activeFaq===i?'faq-item--open':''}`}>
                <button className="faq-q" onClick={()=>setActiveFaq(activeFaq===i?null:i)}>
                  <span>{f.q}</span><ChevronDown size={18}/>
                </button>
                {activeFaq===i && <p className="faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
