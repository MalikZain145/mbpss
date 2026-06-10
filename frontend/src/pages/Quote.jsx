import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, Phone, Send, MessageSquare } from 'lucide-react';
import { submitQuoteRequest } from '../api';
import './Quote.css';

const SERVICE_LIST = [
  { id:'epc-residential',  label:'EPC — Residential' },
  { id:'epc-commercial',   label:'EPC — Commercial' },
  { id:'floorplan-2d',     label:'Floorplan — 2D' },
  { id:'floorplan-3d',     label:'Floorplan — 3D' },
  { id:'floorplan-2d-3d',  label:'Floorplan — 2D & 3D Combined' },
  { id:'inventory',        label:'Inventory Report' },
  { id:'legionella',       label:'Legionella Risk Assessment' },
  { id:'pat-testing',      label:'PAT Testing' },
  { id:'fire-risk',        label:'Fire Risk Assessment' },
  { id:'sap-epc',          label:'SAP EPC (New/Converted Build)' },
  { id:'water-calc',       label:'Water Calculations (Part G)' },
  { id:'hmo-licence',      label:'HMO / Additional / Selective Licence' },
  { id:'eviction',         label:'Eviction Support' },
];

const PROPERTY_TYPES = [
  'Flat / Apartment','Terraced House','Semi-Detached House',
  'Detached House','HMO','Commercial Unit','New Build','Converted Property','Other'
];

function ProgressBar({ step }) {
  const steps = ['Select Service','Property Details','Your Details'];
  return (
    <div className="progress-wrap">
      {steps.map((label, i) => (
        <React.Fragment key={i}>
          <div className={`ps ${step > i+1?'ps--done':''} ${step===i+1?'ps--active':''}`}>
            <div className="ps-circle">
              {step > i+1 ? <Check size={14}/> : i+1}
            </div>
            <span>{label}</span>
          </div>
          {i < steps.length-1 && <div className={`ps-line ${step > i+1?'ps-line--done':''}`}/>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Quote() {
  const [searchParams] = useSearchParams();
  const initService = searchParams.get('service') || '';

  const [step, setStep]           = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [apiError, setApiError]   = useState('');

  const [selected, setSelected] = useState(() => {
    const match = SERVICE_LIST.find(s =>
      s.label.toLowerCase().includes(initService.toLowerCase())
    );
    return match ? [match.id] : [];
  });

  const [form, setForm] = useState({
    propertyType:'', postcode:'', bedrooms:'',
    address:'', notes:'', name:'', email:'',
    phone:'', preferredDate:'',
  });

  const toggle = id => setSelected(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
  );
  const fc = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const selectedServices = SERVICE_LIST.filter(s => selected.includes(s.id));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setApiError('');
    try {
      await submitQuoteRequest({
        name:             form.name,
        email:            form.email,
        phone:            form.phone,
        selectedServices: selectedServices.map(s => s.label),
        propertyType:     form.propertyType,
        postcode:         form.postcode || 'Not provided',
        bedrooms:         form.bedrooms,
        address:          form.address,
        preferredDate:    form.preferredDate,
        notes:            form.notes,
      });
      setSubmitted(true);
    } catch(err) {
      setApiError(err.message || 'Something went wrong. Please call us directly on +44 7540 387542.');
    } finally {
      setLoading(false);
    }
  };

  /* ── SUCCESS ── */
  if (submitted) return (
    <div className="quote-page">
      <div className="container quote-success">
        <div className="success-circle"><Check size={40}/></div>
        <h2>Quote Request Sent!</h2>
        <p>Thank you, <strong>{form.name}</strong>. We've received your request and will be in touch within 2 hours with a personalised quote.</p>
        <div className="success-summary">
          <h4>Services Requested</h4>
          {selectedServices.map((s,i) => <p key={i}>• {s.label}</p>)}
          {form.postcode && <p style={{marginTop:8,color:'var(--mid-gray)',fontSize:13}}>Property: {form.propertyType || ''}{form.postcode ? `, ${form.postcode}` : ''}</p>}
        </div>
        <div className="success-actions">
          <Link to="/" className="btn-primary">Back to Home</Link>
          <a href="tel:+447540387542" className="btn-outline"><Phone size={16}/> Call Us</a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="quote-page">
      <section className="page-hero">
        <div className="page-hero-bg"/>
        <div className="container page-hero-inner">
          <div className="section-label">Free Quote</div>
          <h1 className="page-title">Request a Quote</h1>
          <p>Tell us what you need — we'll get back within 2 hours with a tailored price.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>Request a Quote</span>
          </div>
        </div>
      </section>

      <section className="quote-body">
        <div className="container quote-layout">

          {/* LEFT: progress + step card */}
          <div className="quote-main">
            <ProgressBar step={step}/>

            <div className="quote-card">

              {/* ══ STEP 1 ══ */}
              {step===1 && (
                <div>
                  <h2>Which services do you need?</h2>
                  <p>Select one or more — we'll quote for all together.</p>
                  <div className="qs-grid">
                    {SERVICE_LIST.map(s => (
                      <button
                        key={s.id} type="button"
                        className={`qs-btn ${selected.includes(s.id)?'qs-btn--on':''}`}
                        onClick={() => toggle(s.id)}
                      >
                        <div className="qs-check">{selected.includes(s.id)&&<Check size={12}/>}</div>
                        <span className="qs-name">{s.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="step-footer">
                    {selected.length > 0 && (
                      <div className="step-total">
                        <Check size={14}/> {selected.length} service{selected.length>1?'s':''} selected
                      </div>
                    )}
                    <button
                      className="btn-primary step-next"
                      onClick={() => setStep(2)}
                      disabled={selected.length===0}
                    >
                      Continue <ArrowRight size={16}/>
                    </button>
                  </div>
                </div>
              )}

              {/* ══ STEP 2 ══ */}
              {step===2 && (
                <div>
                  <h2>Property Details</h2>
                  <p>Help us understand your property so we can quote accurately.</p>
                  <div className="rf-group">
                    <label>Property Type</label>
                    <div className="prop-grid">
                      {PROPERTY_TYPES.map(pt => (
                        <button key={pt} type="button"
                          className={`prop-btn ${form.propertyType===pt?'prop-btn--on':''}`}
                          onClick={() => setForm(f => ({...f, propertyType:pt}))}>
                          {pt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="rf-group">
                      <label>Postcode</label>
                      <input name="postcode" value={form.postcode} onChange={fc} placeholder="e.g. NW6 1LN"/>
                    </div>
                    <div className="rf-group">
                      <label>Bedrooms</label>
                      <select name="bedrooms" value={form.bedrooms} onChange={fc}>
                        <option value="">Select...</option>
                        {['Studio','1','2','3','4','5+'].map(b=><option key={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="rf-group">
                    <label>Full Address</label>
                    <input name="address" value={form.address} onChange={fc} placeholder="Street address"/>
                  </div>
                  <div className="rf-group">
                    <label>Additional Notes</label>
                    <textarea name="notes" value={form.notes} onChange={fc} rows={3} placeholder="Access notes, special requirements..."/>
                  </div>
                  <div className="step-footer">
                    <button className="btn-outline" onClick={() => setStep(1)}><ArrowLeft size={16}/> Back</button>
                    <button className="btn-primary" onClick={() => setStep(3)}>
                      Continue <ArrowRight size={16}/>
                    </button>
                  </div>
                </div>
              )}

              {/* ══ STEP 3 ══ */}
              {step===3 && (
                <form onSubmit={handleSubmit}>
                  <h2>Your Contact Details</h2>
                  <p>We'll use these to send your personalised quote within 2 hours.</p>
                  <div className="form-row">
                    <div className="rf-group">
                      <label>Full Name *</label>
                      <input name="name" value={form.name} onChange={fc} required placeholder="John Smith"/>
                    </div>
                    <div className="rf-group">
                      <label>Phone Number *</label>
                      <input name="phone" value={form.phone} onChange={fc} required placeholder="+44 7xxx xxxxxx"/>
                    </div>
                  </div>
                  <div className="rf-group">
                    <label>Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={fc} required placeholder="john@example.com"/>
                  </div>
                  <div className="rf-group">
                    <label>Preferred Date</label>
                    <input name="preferredDate" type="date" value={form.preferredDate} onChange={fc}
                      min={new Date().toISOString().split('T')[0]}/>
                  </div>

                  <div className="order-summary">
                    <h4>Services Requested</h4>
                    {selectedServices.map((s,i) => (
                      <div key={i} className="order-row"><span>• {s.label}</span></div>
                    ))}
                    <div className="order-note">
                      <MessageSquare size={14}/> We'll send a personalised quote within 2 hours.
                    </div>
                  </div>

                  {apiError && <div className="form-error">{apiError}</div>}

                  <div className="step-footer">
                    <button type="button" className="btn-outline" onClick={() => setStep(2)}>
                      <ArrowLeft size={16}/> Back
                    </button>
                    <button
                      type="submit"
                      className="btn-primary btn-submit"
                      disabled={loading || !form.name || !form.email || !form.phone}
                    >
                      <Send size={15}/> {loading ? 'Sending...' : 'Send Quote Request'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT: sidebar */}
          <aside className="quote-sidebar">
            {selectedServices.length > 0 && (
              <div className="sidebar-order">
                <h4>Your Selection</h4>
                {selectedServices.map((s,i) => (
                  <div key={i} className="sidebar-item">
                    <Check size={13}/> <span>{s.label}</span>
                  </div>
                ))}
                <div className="sidebar-quote-note">
                  <MessageSquare size={14}/> We'll quote all services together
                </div>
              </div>
            )}
            <div className="sidebar-trust">
              <h4>Why Choose MBPSS?</h4>
              {[
                'No-obligation free quotes',
                'Response within 2 hours',
                'Fully accredited assessors',
                'Competitive pricing',
                '100% compliance guaranteed',
              ].map((item,i) => (
                <div key={i} className="trust-row"><Check size={14}/><span>{item}</span></div>
              ))}
            </div>
            <div className="sidebar-phone">
              <p>Prefer to speak to us?</p>
              <a href="tel:+447540387542" className="btn-primary" style={{width:'100%',justifyContent:'center'}}>
                <Phone size={16}/> +44 7540 387542
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
