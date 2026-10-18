import { TitleCase } from './CopyStyle.jsx';
import { Link } from 'react-router-dom';
import SocialIcon from './SocialIcon.jsx';
import Icon from './Icon.jsx';
import { SOCIALS, CONTACT } from '../data/content.js';
import { openCookieSettings } from '../privacy/consent.js';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="brand footer-brand-link" aria-label="Anvexa Security Solutions — home">
            <img src="/anvexa-mark.svg" alt="" width="47" height="40" />
            <span className="brand-text"><b>ANVEXA</b><small>Security Solutions</small></span>
          </Link>
          <p>We help Indian MSMEs and Startups identify Security Weaknesses in Web Applications, APIs, Servers and Networks, prioritise fixes and verify agreed changes through Scoped Testing and Remediation Guidance.</p>
          {SOCIALS.some((so) => so.url) && <div className="follow-row">
            <span className="follow-label">Follow us on</span>
            <div className="social-row">
            {SOCIALS.filter((so) => so.url).map((so) => (
              <a
                key={so.name}
                className={`social-link ${so.name}`}
                href={so.url}
                aria-label={`Anvexa on ${so.label}`}
                target="_blank" rel="noopener noreferrer"
              >
                <SocialIcon name={so.name} />
              </a>
            ))}
            </div>
          </div>}
        </div>
        <div className="fc fc-services">
          <h4><TitleCase>Services</TitleCase></h4>
          <ul>
            {['Asset Discovery & VAPT', 'Remediation & Retest', 'Compliance Mapping', 'Monitoring Support', 'Incident Response Support', 'Evidence & Audit Preparation'].map((t) => (
              <li key={t}><Link to="/services">{t}</Link></li>
            ))}
          </ul>
        </div>
        <div className="fc">
          <h4><TitleCase>Company</TitleCase></h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
          </ul>
        </div>
        <div className="fc">
          <h4><TitleCase>Frameworks & Technical Readiness</TitleCase></h4>
          <ul>
            {['CERT-In', 'DPDP Act 2023', 'ISO 27001', 'SOC 2', 'PCI DSS', 'SEBI / RBI / IRDAI'].map((t) => (
              <li key={t}><Link to="/about#frameworks">{t}</Link></li>
            ))}
          </ul>
        </div>
        <div className="fc fc-contact">
          <h4><TitleCase>Contact Us</TitleCase></h4>
          <ul>
            <li><a href={`mailto:${CONTACT.email}`}><Icon name="mail" size={16} /><span>{CONTACT.email}</span></a></li>
            <li><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}><Icon name="phone" size={16} /><span>{CONTACT.phone}</span></a></li>
            <li className="fc-loc"><Icon name="pin" size={16} /><span>{CONTACT.address}</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Anvexa Security Solutions. All rights reserved.</p>
        <p className="footer-legal"><Link to="/privacy">Privacy Policy</Link> · <Link to="/terms">Terms of Service</Link> · <button type="button" className="footer-cookie-settings" onClick={openCookieSettings}>Cookie settings</button></p>
      </div>
    </footer>
  );
}
