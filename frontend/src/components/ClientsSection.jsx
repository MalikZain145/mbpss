import React, { useEffect, useRef } from 'react';
import './ClientsSection.css';

function useAos(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => el.classList.add('aos-visible'), delay); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]); // eslint-disable-line react-hooks/exhaustive-deps
  return ref;
}

const clients = [
  { name: 'Bravo Investment House',     url: 'https://www.bravo-investment.com/',                          initials: 'BI',  color: '#1a3a6e' },
  { name: 'John D Wood',                url: 'https://www.johndwood.co.uk',                                initials: 'JDW', color: '#2c5282' },
  { name: 'County Rents',               url: 'https://www.countyrents.co.uk',                              initials: 'CR',  color: '#276749' },
  { name: 'Corridy Property',           url: 'https://corridyproperty.co.uk/',                             initials: 'CP',  color: '#744210' },
  { name: 'AZ Property',                url: 'https://azproperty.co.uk/',                                  initials: 'AZ',  color: '#553c9a' },
  { name: 'Ash Ponsonby',               url: 'https://www.ashponsonby.com/',                               initials: 'AP',  color: '#1a3a6e' },
  { name: 'AMM Properties',             url: 'https://www.ammproperties.co.uk/pages/about-us',             initials: 'AMM', color: '#9b2c2c' },
  { name: 'The Collaborative London',   url: 'https://www.thecollaborativelondon.co.uk/',                  initials: 'TCL', color: '#22543d' },
  { name: 'RS Estate Agents',           url: 'https://rsestateagents.co.uk/',                              initials: 'RS',  color: '#2a4365' },
  { name: 'IPS Property Services',      url: 'https://www.estatepropertyagents.co.uk/6401/ips-property-services', initials: 'IPS', color: '#702459' },
  { name: 'Lawsons & Daughters',        url: 'https://www.lawsonsanddaughters.com/#/',                     initials: 'L&D', color: '#3d2c0a' },
  { name: 'Sequence Properties',        url: 'https://www.sequenceproperties.co.uk/',                      initials: 'SEQ', color: '#1a365d' },
  { name: 'HMO Property Licensing',     url: 'https://hmopropertylicensing.co.uk/',                        initials: 'HMO', color: '#276749' },
  { name: 'My Paragon',                 url: 'https://www.myparagon.co.uk/',                               initials: 'MP',  color: '#742a2a' },
  { name: 'KFH',                        url: 'https://www.kfh.co.uk/',                                     initials: 'KFH', color: '#2c5282' },
  { name: 'Bond Docwra',                url: 'https://bonddocwra.com/hmo-properties/',                     initials: 'BD',  color: '#3c366b' },
  { name: 'Mizen',                      url: 'https://www.mizen.co.uk/',                                   initials: 'MZ',  color: '#1a4731' },
];


function ClientCard({ client, delay }) {
  const ref = useAos(delay);
  return (
    <a ref={ref} href={client.url} target="_blank" rel="noopener noreferrer"
      className="client-card aos-scale" title={client.name}>
      <div className="client-logo" style={{ background: client.color }}>
        <span>{client.initials}</span>
      </div>
      <span className="client-name">{client.name}</span>
    </a>
  );
}

export default function ClientsSection() {
  return (
    <section className="clients-section">
      <div className="container">
        <div className="clients-header aos-fade-up" ref={useAos(0)}>
          <div className="section-label">Trusted By</div>
          <h2 className="section-title">Clients We Work With</h2>
          <p className="section-desc">Proud to work with some of London's leading property companies, estate agents and letting agents.</p>
        </div>

        <div className="clients-grid">
          {clients.map((client, i) => (
            <ClientCard key={i} client={client} delay={i * 40}/>
          ))}
        </div>

        <div className="clients-marquee-wrap" aria-hidden="true">
          <div className="clients-marquee">
            {[...clients, ...clients].map((client, i) => (
              <a key={i} href={client.url} target="_blank" rel="noopener noreferrer" className="marquee-item" title={client.name}>
                <div className="marquee-logo" style={{ background: client.color }}>
                  <span>{client.initials}</span>
                </div>
                <span>{client.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
