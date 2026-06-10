import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import './LegalPages.css';

const sections = [
  {
    title: '1. What Are Cookies?',
    content: `Cookies are small text files that are placed on your device (computer, tablet or smartphone) when you visit a website. They are widely used to make websites work more efficiently, to remember your preferences, and to provide information to the website owner about how the site is being used.

Cookies do not typically contain personally identifiable information, but personal data that we store about you may be linked to information stored in and obtained from cookies.

You can control and manage cookies in various ways — please see Section 6 for more information.`
  },
  {
    title: '2. How We Use Cookies',
    content: `MBPSS uses cookies on our website (www.mbpss.co.uk) for the following purposes:

• To ensure the website functions correctly and pages load as expected
• To remember your preferences and settings during your visit
• To understand how visitors use our website so we can improve it
• To measure the effectiveness of our services and marketing
• To provide a more personalised experience

We only use cookies that are necessary or that you have consented to. We do not use cookies to collect sensitive personal information or to target you with advertising from third-party ad networks.`
  },
  {
    title: '3. Types of Cookies We Use',
    content: `Strictly Necessary Cookies
These cookies are essential for the website to function. They enable core functionality such as security, network management and accessibility. You cannot opt out of these cookies as the website cannot function properly without them.

Examples:
• Session cookies that keep you logged in during your visit
• Security cookies that protect against cross-site request forgery
• Load balancing cookies that distribute traffic across our servers

Performance and Analytics Cookies
These cookies collect information about how visitors use our website, such as which pages are visited most often and whether error messages are received. All information collected is aggregated and anonymous.

We use Google Analytics to help us understand how our website is used. Google Analytics sets cookies that collect information such as the number of visitors, where visitors came from, and which pages they visited. You can opt out of Google Analytics by visiting https://tools.google.com/dlpage/gaoptout.

Functionality Cookies
These cookies allow our website to remember choices you make (such as your preferred language or the region you are in) and provide enhanced, more personal features.

Examples:
• Remembering your service selections during the booking process
• Storing review data you have submitted (stored locally in your browser)

Third-Party Cookies
Some pages on our website may include content from third-party services such as Google Maps or embedded video. These third parties may set their own cookies. We have no control over these cookies and recommend you check the relevant third-party privacy policies.`
  },
  {
    title: '4. Cookie Duration',
    content: `Session Cookies: These are temporary cookies that expire when you close your browser. They are used to keep track of your activity during a single browsing session.

Persistent Cookies: These remain on your device for a set period of time specified in the cookie, or until you delete them manually. We use persistent cookies to remember your preferences between visits.

Our analytics cookies (Google Analytics) typically persist for up to 2 years. Our functionality cookies persist for up to 12 months.`
  },
  {
    title: '5. Consent',
    content: `When you first visit our website, you will be shown a cookie consent notice. By continuing to use our website after seeing this notice, or by clicking "Accept", you consent to our use of non-essential cookies as described in this policy.

Strictly necessary cookies do not require your consent as they are essential for the website to function.

You may withdraw your consent at any time by adjusting your browser settings as described in Section 6 below. Please note that withdrawing consent may affect your experience of our website.

We record your consent choices and the date on which consent was given.`
  },
  {
    title: '6. How to Control Cookies',
    content: `You have the right to decide whether to accept or reject cookies (other than strictly necessary cookies). You can manage your cookie preferences in the following ways:

Browser Settings
Most web browsers allow you to control cookies through their settings. You can:
• View cookies stored on your device
• Delete some or all cookies
• Block cookies from specific websites
• Block all cookies (note: this may affect website functionality)

For guidance on managing cookies in your browser:
• Google Chrome: Settings > Privacy and Security > Cookies
• Mozilla Firefox: Options > Privacy & Security > Cookies
• Safari: Preferences > Privacy > Cookies
• Microsoft Edge: Settings > Cookies and Site Permissions

Opt-Out Tools
• Google Analytics: https://tools.google.com/dlpage/gaoptout
• Your Online Choices (EU): www.youronlinechoices.com

Please note that if you delete or block cookies, some features of our website may not work correctly.`
  },
  {
    title: '7. Changes to This Cookie Policy',
    content: `We may update this Cookie Policy from time to time to reflect changes in technology, legislation or our data practices. We will post the updated policy on this page with a revised effective date.

We recommend that you check this page periodically to stay informed about our use of cookies.`
  },
  {
    title: '8. Contact Us',
    content: `If you have any questions about our use of cookies or this Cookie Policy, please contact us:

MBPSS Property Solutions
340 West End Lane, London, NW6 1LN

Email: info@mbpss.co.uk
Telephone: +44 7540 387542

You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at www.ico.org.uk if you believe we are not handling your data in accordance with the law.`
  },
];

const cookieTable = [
  { name: '_ga',          type: 'Analytics',   provider: 'Google Analytics', purpose: 'Registers a unique ID to generate statistical data on website usage', duration: '2 years' },
  { name: '_gid',         type: 'Analytics',   provider: 'Google Analytics', purpose: 'Registers a unique ID to generate statistical data on website usage', duration: '24 hours' },
  { name: '_gat',         type: 'Analytics',   provider: 'Google Analytics', purpose: 'Used to throttle request rate',                                       duration: '1 minute' },
  { name: 'mbpss_reviews',type: 'Functionality',provider: 'MBPSS',           purpose: 'Stores user-submitted reviews locally in your browser',               duration: 'Persistent' },
  { name: 'PHPSESSID',    type: 'Necessary',   provider: 'MBPSS',            purpose: 'Maintains your session state across page requests',                   duration: 'Session' },
];

export default function CookiePolicy() {
  const [open, setOpen] = useState(null);
  return (
    <div className="legal-page">
      <section className="page-hero">
        <div className="page-hero-bg"/>
        <div className="container page-hero-inner">
          <div className="section-label">Legal</div>
          <h1 className="page-title">Cookie Policy</h1>
          <p>Last updated: 1 January 2025</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>Cookie Policy</span>
          </div>
        </div>
      </section>
      <section className="legal-body">
        <div className="container legal-inner">
          <div className="legal-content">
            <div className="legal-intro">
              <p>This Cookie Policy explains how MBPSS Property Solutions uses cookies and similar tracking technologies on our website. It should be read alongside our Privacy Policy.</p>
            </div>

            <div className="legal-accordion">
              {sections.map((s,i) => (
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

            {/* Cookie Table — desktop table + mobile cards */}
            <div className="cookie-table-wrap">
              <h3>Cookies Currently Used on This Website</h3>

              {/* Desktop: normal table */}
              <div className="cookie-table-scroll cookie-table-desktop">
                <table className="cookie-table">
                  <thead>
                    <tr>
                      <th>Cookie Name</th>
                      <th>Type</th>
                      <th>Provider</th>
                      <th>Purpose</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookieTable.map((c,i)=>(
                      <tr key={i}>
                        <td><code>{c.name}</code></td>
                        <td><span className={`cookie-type cookie-type--${c.type.toLowerCase()}`}>{c.type}</span></td>
                        <td>{c.provider}</td>
                        <td>{c.purpose}</td>
                        <td>{c.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile: stacked cards */}
              <div className="cookie-cards-mobile">
                {cookieTable.map((c,i)=>(
                  <div key={i} className="cookie-card">
                    <div className="cookie-card-header">
                      <code className="cookie-card-name">{c.name}</code>
                      <span className={`cookie-type cookie-type--${c.type.toLowerCase()}`}>{c.type}</span>
                    </div>
                    <div className="cookie-card-row">
                      <span className="cookie-card-label">Provider</span>
                      <span className="cookie-card-value">{c.provider}</span>
                    </div>
                    <div className="cookie-card-row">
                      <span className="cookie-card-label">Purpose</span>
                      <span className="cookie-card-value">{c.purpose}</span>
                    </div>
                    <div className="cookie-card-row">
                      <span className="cookie-card-label">Duration</span>
                      <span className="cookie-card-value">{c.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="legal-sidebar">
            <div className="legal-sidebar-card">
              <h4>Legal Documents</h4>
              <Link to="/terms" className="legal-nav-link">Terms & Conditions</Link>
              <Link to="/privacy-policy" className="legal-nav-link">Privacy Policy</Link>
              <Link to="/cookies" className="legal-nav-link legal-nav-link--active">Cookie Policy</Link>
            </div>
            <div className="legal-sidebar-card">
              <h4>Manage Cookies</h4>
              <p>You can control cookies through your browser settings at any time.</p>
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{marginTop:'12px',justifyContent:'center',fontSize:'12px'}}>Opt out of Analytics</a>
            </div>
            <div className="legal-sidebar-card">
              <h4>Questions?</h4>
              <p>Contact us about our cookie practices.</p>
              <a href="mailto:info@mbpss.co.uk" className="btn-outline" style={{marginTop:'12px',justifyContent:'center'}}>Email Us</a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
