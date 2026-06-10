import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import './LegalPages.css';

const sections = [
  {
    title: '1. Introduction',
    content: `These Terms and Conditions ("Terms") govern your use of the MBPSS website (www.mbpss.co.uk) and the services provided by MBPSS Property Solutions ("MBPSS", "we", "us", "our"), a company registered in England and Wales, with our registered office at 340 West End Lane, London, NW6 1LN.

By accessing our website or booking any of our services, you confirm that you have read, understood and agree to be bound by these Terms. If you do not agree to these Terms, please do not use our website or services.

These Terms were last updated on 1 January 2025.`
  },
  {
    title: '2. Our Services',
    content: `MBPSS provides professional property services including, but not limited to:

• Energy Performance Certificates (EPC) — residential and commercial
• Floorplans (2D and 3D)
• Inventory Reports
• Legionella Risk Assessments
• PAT Testing (Portable Appliance Testing)
• Fire Risk Assessments
• SAP EPC for new and converted builds
• Water Usage Calculations (Part G)
• HMO, Additional and Selective Licence support
• Eviction Support (Section 8 and Section 21)

All services are carried out by qualified, accredited professionals. Service availability may vary by location. We reserve the right to add, modify or withdraw services at any time without prior notice.`
  },
  {
    title: '3. Booking and Payment',
    content: `3.1 Bookings can be made online via our website, by telephone on +44 7540 387542, or by email at info@mbpss.co.uk.

3.2 A booking is only confirmed once you receive a written confirmation from MBPSS. We reserve the right to decline any booking at our discretion.

3.3 Payment is due at the time of booking unless otherwise agreed in writing. We accept all major credit and debit cards. All prices are quoted inclusive of VAT unless stated otherwise.

3.4 Fixed prices are provided for standard properties. For non-standard or complex properties, we reserve the right to adjust the quoted price after the initial assessment. Any price adjustment will be communicated to you before the service proceeds.

3.5 For commercial and large-scale projects, payment terms may be agreed separately in writing.`
  },
  {
    title: '4. Cancellation and Rescheduling',
    content: `4.1 You may cancel or reschedule a booking free of charge provided you give at least 48 hours' notice before the scheduled appointment.

4.2 Cancellations made with less than 48 hours' notice may incur a cancellation fee of up to 50% of the service price.

4.3 Cancellations made on the day of the appointment or where the assessor is unable to gain access to the property will be charged at the full service price.

4.4 MBPSS reserves the right to cancel or reschedule an appointment due to unforeseen circumstances, including but not limited to assessor illness, adverse weather conditions or circumstances beyond our reasonable control. In such cases, we will notify you as soon as practicable and arrange an alternative appointment at no additional cost.`
  },
  {
    title: '5. Property Access and Client Obligations',
    content: `5.1 You are responsible for ensuring that the assessor is given safe and reasonable access to all parts of the property required for the service to be carried out.

5.2 You must ensure that all relevant areas, appliances, meters, fuse boards and loft spaces (where applicable) are accessible at the time of the appointment.

5.3 If the assessor is unable to complete the service due to restricted access or unsafe conditions, a revisit fee may apply.

5.4 You confirm that you have the legal right to authorise the assessment of the property, either as the owner, occupier or authorised agent of the owner.

5.5 For inventory services, you must ensure the property is in its final condition before check-in and that all keys and access codes are provided.`
  },
  {
    title: '6. Certificates, Reports and Accuracy',
    content: `6.1 All EPCs, reports and certificates produced by MBPSS are based on the information available and visible at the time of the assessment. We cannot be held responsible for information that was not disclosed, accessible or visible during the assessment.

6.2 EPCs are lodged on the national register in accordance with current regulations. The rating assigned is based on the Standard Assessment Procedure (SAP) methodology and reflects the assessed condition of the property at the time of inspection.

6.3 If you believe an error has been made in a certificate or report, please contact us within 14 days of issue. We will investigate and, where an error is confirmed, reissue the document at no additional charge.

6.4 MBPSS assessors exercise professional judgment in the preparation of all reports. Our liability is limited to the cost of the service provided.`
  },
  {
    title: '7. Limitation of Liability',
    content: `7.1 To the maximum extent permitted by law, MBPSS shall not be liable for any indirect, incidental, special, consequential or punitive damages arising from your use of our services or website.

7.2 Our total liability to you in connection with any service shall not exceed the amount paid by you for that service.

7.3 Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded by law.

7.4 We do not accept liability for any loss or damage caused by circumstances beyond our reasonable control, including but not limited to acts of God, fire, flood, severe weather, pandemic, civil unrest, or failure of third-party systems.`
  },
  {
    title: '8. Intellectual Property',
    content: `8.1 All content on the MBPSS website, including text, graphics, logos, images, floorplan designs and software, is the property of MBPSS or its licensors and is protected by applicable intellectual property laws.

8.2 You may not reproduce, distribute, modify or create derivative works from any content on our website without our prior written consent.

8.3 Floorplans, reports and certificates produced by MBPSS are provided for the use of the client and the specific property only. They may not be reproduced or sold to third parties without our written consent.`
  },
  {
    title: '9. Third-Party Services and Links',
    content: `Our website may contain links to third-party websites or reference third-party services. These are provided for your convenience only. MBPSS does not endorse or accept any responsibility for the content, privacy practices or services of any third-party website. Your use of third-party websites is at your own risk.`
  },
  {
    title: '10. Governing Law and Disputes',
    content: `10.1 These Terms are governed by and construed in accordance with the laws of England and Wales.

10.2 Any dispute arising out of or in connection with these Terms or our services shall first be attempted to be resolved through informal negotiation. If we are unable to resolve the dispute informally, you agree to submit to the exclusive jurisdiction of the courts of England and Wales.

10.3 If you are a consumer, you may also have the right to use the Online Dispute Resolution platform provided by the European Commission at http://ec.europa.eu/consumers/odr/.`
  },
  {
    title: '11. Changes to These Terms',
    content: `We reserve the right to update these Terms at any time. Changes will be posted on this page with an updated effective date. Your continued use of our website or services after any changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically.`
  },
  {
    title: '12. Contact Us',
    content: `If you have any questions about these Terms and Conditions, please contact us:

MBPSS Property Solutions
340 West End Lane
London, NW6 1LN

Telephone: +44 7540 387542
Email: info@mbpss.co.uk`
  },
];

export default function TermsConditions() {
  const [open, setOpen] = useState(null);
  return (
    <div className="legal-page">
      <section className="page-hero">
        <div className="page-hero-bg"/>
        <div className="container page-hero-inner">
          <div className="section-label">Legal</div>
          <h1 className="page-title">Terms & Conditions</h1>
          <p>Last updated: 1 January 2025</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>Terms & Conditions</span>
          </div>
        </div>
      </section>
      <section className="legal-body">
        <div className="container legal-inner">
          <div className="legal-content">
            <div className="legal-intro">
              <p>Please read these Terms and Conditions carefully before using MBPSS services. These Terms form a legally binding agreement between you and MBPSS Property Solutions.</p>
            </div>
            <div className="legal-accordion">
              {sections.map((s, i) => (
                <div key={i} className={`la-item ${open===i?'la-item--open':''}`}>
                  <button className="la-q" onClick={()=>setOpen(open===i?null:i)}>
                    <span>{s.title}</span>
                    <ChevronDown size={18}/>
                  </button>
                  {open===i && (
                    <div className="la-a">
                      {s.content.split('\n\n').map((para, j) => (
                        <p key={j}>{para}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <aside className="legal-sidebar">
            <div className="legal-sidebar-card">
              <h4>Legal Documents</h4>
              <Link to="/terms" className="legal-nav-link legal-nav-link--active">Terms & Conditions</Link>
              <Link to="/privacy-policy" className="legal-nav-link">Privacy Policy</Link>
              <Link to="/cookies" className="legal-nav-link">Cookie Policy</Link>
            </div>
            <div className="legal-sidebar-card">
              <h4>Questions?</h4>
              <p>If you have any questions about our legal policies, please contact us.</p>
              <a href="mailto:info@mbpss.co.uk" className="btn-outline" style={{marginTop:'12px',justifyContent:'center'}}>Email Us</a>
              <a href="tel:+447540387542" className="btn-primary" style={{marginTop:'10px',justifyContent:'center'}}>Call Us</a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
