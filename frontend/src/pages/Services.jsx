import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home as HomeIcon, Building2, HardHat, Zap, Shield, Map, FileText, Droplets, Flame, Key, AlertTriangle, Phone, MessageSquare } from 'lucide-react';
import './Services.css';

const allServices = {
  residential: [
    { icon:<Zap size={24}/>,            title:'EPC (Residential)',                    desc:'Energy Performance Certificate — required for all sales and lettings. Valid 10 years.',                          slug:'epc-residential' },
    { icon:<Map size={24}/>,            title:'Floorplan (2D & 3D)',                  desc:'Professional 2D and 3D floorplans for property listings and marketing.',                                         slug:'floorplan' },
    { icon:<FileText size={24}/>,       title:'Inventory',                            desc:'Detailed check-in and check-out inventory reports for landlords and agents.',                                    slug:'inventory' },
    { icon:<Droplets size={24}/>,       title:'Legionella Risk Assessment',           desc:'Protect tenants and comply with legal obligations under the HSE Approved Code of Practice.',                    slug:'legionella' },
    { icon:<Shield size={24}/>,         title:'PAT Testing',                          desc:'Portable Appliance Testing to ensure all electrical equipment is safe.',                                        slug:'pat-testing' },
    { icon:<Flame size={24}/>,          title:'Fire Risk Assessment',                 desc:'Comprehensive fire risk assessments and prioritised action plans.',                                             slug:'fire-risk' },
    { icon:<Key size={24}/>,            title:'HMO / Additional / Selective Licence', desc:'Full licence application support and compliance guidance for landlords.',                                       slug:'hmo-licence' },
    { icon:<AlertTriangle size={24}/>,  title:'Eviction Support',                     desc:'Section 8 and Section 21 notice preparation and professional eviction support.',                               slug:'eviction' },
  ],
  commercial: [
    { icon:<Zap size={24}/>,            title:'EPC (Commercial)',                     desc:'Energy Performance Certificates for all commercial and non-domestic buildings.',                               slug:'epc-commercial' },
    { icon:<Map size={24}/>,            title:'Floorplan (2D & 3D)',                  desc:'Commercial floorplans for marketing, planning and property management purposes.',                               slug:'floorplan' },
    { icon:<FileText size={24}/>,       title:'Inventory',                            desc:'Commercial property inventory and schedule of condition reports.',                                              slug:'inventory' },
    { icon:<Droplets size={24}/>,       title:'Legionella Risk Assessment',           desc:'Water system risk assessments for commercial properties and public buildings.',                                slug:'legionella' },
    { icon:<Shield size={24}/>,         title:'PAT Testing',                          desc:'PAT testing for commercial offices, retail units and all public buildings.',                                   slug:'pat-testing' },
    { icon:<Flame size={24}/>,          title:'Fire Risk Assessment',                 desc:'Statutory fire risk assessments for commercial and multi-occupancy buildings.',                                slug:'fire-risk' },
  ],
  'new-build': [
    { icon:<Zap size={24}/>,            title:'SAP EPC',                              desc:'Standard Assessment Procedure energy calcs for new build and converted properties.',                           slug:'sap-epc' },
    { icon:<Droplets size={24}/>,       title:'Water Calculations (Part G)',          desc:'Part G water usage calculations required for Building Regulations compliance.',                                slug:'water-calculations' },
    { icon:<Map size={24}/>,            title:'Floorplan (2D & 3D)',                  desc:'2D and 3D floorplans for new build developments and planning submissions.',                                    slug:'floorplan' },
    { icon:<Flame size={24}/>,          title:'Fire Risk Assessment',                 desc:'Fire risk assessments for new build developments and converted properties.',                                   slug:'fire-risk' },
  ],
};

export default function Services() {
  const [activeTab, setActiveTab] = useState('residential');
  return (
    <div className="services-page">
      <section className="page-hero">
        <div className="page-hero-bg"/>
        <div className="container page-hero-inner">
          <div className="section-label">All Services</div>
          <h1 className="page-title">Property Services</h1>
          <p>Complete solutions for residential, commercial and new build properties.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>Services</span>
          </div>
        </div>
      </section>

      <section className="services-body">
        <div className="container">
          <div className="services-tabs-large">
            <button className={`stab ${activeTab==='residential'?'active':''}`} onClick={()=>setActiveTab('residential')}><HomeIcon size={18}/>Residential</button>
            <button className={`stab ${activeTab==='commercial'?'active':''}`}  onClick={()=>setActiveTab('commercial')}><Building2 size={18}/>Commercial</button>
            <button className={`stab ${activeTab==='new-build'?'active':''}`}   onClick={()=>setActiveTab('new-build')}><HardHat size={18}/>New Build</button>
          </div>

          <div className="services-list">
            {allServices[activeTab].map((s,i) => (
              <Link key={i} to={`/services/${s.slug}`} className="service-row">
                <div className="service-row-icon">{s.icon}</div>
                <div className="service-row-body"><h3>{s.title}</h3><p>{s.desc}</p></div>
                <div className="service-row-cta">
                  <span className="quote-tag">Get a Quote</span>
                </div>
                <div className="service-row-arrow"><ArrowRight size={18}/></div>
              </Link>
            ))}
          </div>

          <div className="services-quote-banner">
            <div className="sqb-content">
              <MessageSquare size={28}/>
              <div>
                <h3>Looking for a price?</h3>
                <p>Contact us for a fast, no-obligation quote tailored to your property.</p>
              </div>
            </div>
            <div className="sqb-actions">
              <Link to="/quote" className="btn-primary">Request a Quote <ArrowRight size={16}/></Link>
              <a href="tel:+447540387542" className="btn-secondary"><Phone size={16}/> Call Us</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
