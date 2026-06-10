import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import './LegalPages.css';

const sections = [
  {
    title: '1. Who We Are',
    content: `MBPSS Property Solutions ("MBPSS", "we", "us", "our") is a property services company registered in England and Wales, with our registered office at 340 West End Lane, London, NW6 1LN.

We are the data controller responsible for your personal data collected through our website (www.mbpss.co.uk) and in connection with our services.

If you have any questions about this Privacy Policy or how we handle your personal data, please contact us at:

Email: info@mbpss.co.uk
Telephone: +44 7540 387542
Address: 340 West End Lane, London, NW6 1LN`
  },
  {
    title: '2. What Personal Data We Collect',
    content: `We collect and process the following categories of personal data:

Identity Data: your full name, and in some cases your role or occupation (e.g. landlord, letting agent, tenant).

Contact Data: your email address, telephone number and postal address.

Property Data: the address, postcode, type and size of the property in connection with which services are requested.

Booking Data: details of the services you have booked, your preferred appointment dates, and any special access instructions.

Payment Data: payment card details are processed securely by our payment provider. We do not store your full card number on our systems.

Communication Data: records of correspondence between us, including emails, phone calls and messages submitted through our website.

Technical Data: your IP address, browser type and version, time zone, browser plug-in types, operating system and platform, and other technology on the devices you use to access our website.

Review Data: if you submit a review through our website, we collect your name, role and review content.

We do not knowingly collect data from children under the age of 16.`
  },
  {
    title: '3. How We Collect Your Data',
    content: `We collect personal data in the following ways:

Direct interactions: when you fill in a form on our website, call us, email us, book a service, make a payment or submit a review.

Automated technologies: when you browse our website, we may automatically collect Technical Data using cookies and similar technologies. Please see our Cookie Policy for more information.

Third parties: we may receive data about you from third parties such as payment processors, analytics providers or referring estate agents or letting agents.`
  },
  {
    title: '4. How We Use Your Personal Data',
    content: `We use your personal data for the following purposes:

To provide our services: to process your booking, arrange and carry out the assessment or service, and issue certificates and reports.

To manage our relationship with you: to communicate with you about your booking, respond to enquiries and send service reminders.

To process payments: to take payment for services you have booked.

To improve our website and services: to analyse how our website is used and to improve our offerings.

To comply with legal obligations: to comply with our legal and regulatory obligations, including lodging EPCs on the national register.

To send marketing communications: with your consent, to send you information about our services that may be of interest to you. You may opt out at any time.

We will only use your personal data for the purposes for which we collected it, unless we reasonably consider that we need to use it for another reason that is compatible with the original purpose.`
  },
  {
    title: '5. Legal Basis for Processing',
    content: `We process your personal data on the following legal bases under the UK General Data Protection Regulation (UK GDPR):

Performance of a contract: where processing is necessary to provide the services you have requested or to take steps prior to entering into a contract with you.

Legal obligation: where processing is necessary for us to comply with a legal obligation, such as lodging EPCs on the national register.

Legitimate interests: where processing is necessary for our legitimate business interests, such as improving our website and services, fraud prevention and direct marketing to existing customers, provided your interests and rights do not override our interests.

Consent: where you have given us explicit consent to process your data, such as for email marketing or for posting your review on our website. You may withdraw consent at any time.`
  },
  {
    title: '6. Sharing Your Personal Data',
    content: `We may share your personal data with the following categories of third parties:

Service providers: companies that provide IT systems, payment processing, email delivery and other services on our behalf. These parties process data on our instructions and are bound by data processing agreements.

Regulatory bodies: where required by law, we share data with regulatory bodies such as the national EPC register (Landmark), Gas Safe Register, and NICEIC.

Professional advisers: lawyers, accountants and insurers where necessary.

Business transfers: in the event of a merger, acquisition or sale of all or part of our business, your data may be transferred to the relevant third party.

We do not sell your personal data to third parties. We do not share your data with third parties for their own marketing purposes.`
  },
  {
    title: '7. Data Retention',
    content: `We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, including satisfying any legal, accounting or reporting requirements.

Booking and service records are retained for 6 years from the date of service in accordance with our legal obligations.

EPC lodgement data is retained on the national register for 20 years in accordance with the Energy Performance of Buildings Regulations.

Marketing data is retained until you unsubscribe or request deletion.

Payment records are retained for 7 years in accordance with HMRC requirements.

After the applicable retention period, your data is securely deleted or anonymised.`
  },
  {
    title: '8. Your Rights',
    content: `Under UK GDPR, you have the following rights in relation to your personal data:

Right of access: to request a copy of the personal data we hold about you.

Right to rectification: to request that we correct any inaccurate or incomplete data.

Right to erasure: to request that we delete your personal data in certain circumstances.

Right to restrict processing: to request that we restrict the processing of your data in certain circumstances.

Right to data portability: to receive your personal data in a structured, commonly used format.

Right to object: to object to our processing of your data based on legitimate interests or for direct marketing purposes.

Right to withdraw consent: where processing is based on consent, you may withdraw that consent at any time.

To exercise any of these rights, please contact us at info@mbpss.co.uk. We will respond within 30 days. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at www.ico.org.uk.`
  },
  {
    title: '9. Data Security',
    content: `We take appropriate technical and organisational measures to protect your personal data against accidental loss, unauthorised access, alteration or disclosure. These measures include SSL encryption on our website, secure payment processing through accredited payment providers, access controls on our internal systems, and staff training on data protection.

While we take all reasonable steps to protect your data, no method of transmission over the internet is 100% secure. If you suspect a data breach, please contact us immediately at info@mbpss.co.uk.`
  },
  {
    title: '10. Cookies',
    content: `Our website uses cookies to improve your experience and to help us understand how our website is used. For full details of the cookies we use and how to control them, please see our Cookie Policy.`
  },
  {
    title: '11. Changes to This Privacy Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or in applicable law. We will post the updated policy on this page with a revised effective date. We encourage you to review this policy periodically. Where changes are material, we will notify you by email or by a prominent notice on our website.`
  },
  {
    title: '12. Contact and Complaints',
    content: `If you have any questions, concerns or complaints about how we handle your personal data, please contact us:

MBPSS Property Solutions
340 West End Lane, London, NW6 1LN
Email: info@mbpss.co.uk
Telephone: +44 7540 387542

If you are not satisfied with our response, you have the right to complain to the Information Commissioner's Office (ICO):
Website: www.ico.org.uk
Telephone: 0303 123 1113`
  },
];

export default function PrivacyPolicy() {
  const [open, setOpen] = useState(null);
  return (
    <div className="legal-page">
      <section className="page-hero">
        <div className="page-hero-bg"/>
        <div className="container page-hero-inner">
          <div className="section-label">Legal</div>
          <h1 className="page-title">Privacy Policy</h1>
          <p>Last updated: 1 January 2025</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>Privacy Policy</span>
          </div>
        </div>
      </section>
      <section className="legal-body">
        <div className="container legal-inner">
          <div className="legal-content">
            <div className="legal-intro">
              <p>MBPSS Property Solutions is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store and protect your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
            </div>
            <div className="legal-accordion">
              {sections.map((s, i) => (
                <div key={i} className={`la-item ${open===i?'la-item--open':''}`}>
                  <button className="la-q" onClick={()=>setOpen(open===i?null:i)}>
                    <span>{s.title}</span><ChevronDown size={18}/>
                  </button>
                  {open===i && (
                    <div className="la-a">
                      {s.content.split('\n\n').map((para,j)=><p key={j}>{para}</p>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <aside className="legal-sidebar">
            <div className="legal-sidebar-card">
              <h4>Legal Documents</h4>
              <Link to="/terms" className="legal-nav-link">Terms & Conditions</Link>
              <Link to="/privacy-policy" className="legal-nav-link legal-nav-link--active">Privacy Policy</Link>
              <Link to="/cookies" className="legal-nav-link">Cookie Policy</Link>
            </div>
            <div className="legal-sidebar-card">
              <h4>Your Rights</h4>
              <p>To exercise your data rights or make a complaint, contact our team.</p>
              <a href="mailto:info@mbpss.co.uk" className="btn-outline" style={{marginTop:'12px',justifyContent:'center'}}>Email Us</a>
              <a href="tel:+447540387542" className="btn-primary" style={{marginTop:'10px',justifyContent:'center'}}>Call Us</a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
