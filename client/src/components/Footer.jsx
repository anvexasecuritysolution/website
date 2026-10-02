import { Link } from 'react-router-dom';
import SocialIcon from './SocialIcon.jsx';
import Icon from './Icon.jsx';
import { SOCIALS, CONTACT } from '../data/content.js';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="brand footer-brand-link" aria-label="Anvexa Security Solutions — home">
            <img src="/anvexa-mark.svg" alt="" width="47" height="40" />
            <span className="brand-text"><b>ANVEXA</b><small>Security Solutions</small></span>
          </Link>
          <p>We find hidden vulnerabilities, help remediate the critical ones and verify every fix. We also map your controls to the frameworks you answer to and keep testing as your environment changes.</p>
          <div className="follow-row">
            <span className="follow-label">Follow us on</span>
            <div className="social-row">
            {SOCIALS.map((so) => (
              <a
                key={so.name}
                className="social-link"
                href={so.url || '#'}
                aria-label={`Anvexa on ${so.label}`}
                {...(so.url ? { target: '_blank', rel: 'noopener noreferrer' } : { onClick: (e) => e.preventDefault() })}
              >
                <SocialIcon name={so.name} />
              </a>
            ))}
            </div>
          </div>
        </div>
        <div className="fc">
          <h4>Services</h4>
          <ul>
            {['Asset Discovery & VAPT', 'Remediation & Retest', 'Compliance Mapping', 'Continuous Monitoring', 'Incident Response', 'Evidence Vault'].map((t) => (
              <li key={t}><Link to="/services">{t}</Link></li>
            ))}
          </ul>
        </div>
        <div className="fc">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="fc">
          <h4>Compliance</h4>
          <ul>
            {['CERT-In', 'DPDP Act 2023', 'ISO 27001', 'SOC 2', 'PCI DSS', 'SEBI / RBI / IRDAI'].map((t) => (
              <li key={t}><Link to="/about">{t}</Link></li>
            ))}
          </ul>
        </div>
        <div className="fc fc-contact">
          <h4>Contact Us</h4>
          <ul>
            <li><a href={`mailto:${CONTACT.email}`}><Icon name="mail" size={16} /><span>{CONTACT.email}</span></a></li>
            <li><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}><Icon name="phone" size={16} /><span>{CONTACT.phone}</span></a></li>
            <li className="fc-loc"><Icon name="pin" size={16} /><span>{CONTACT.address}</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Anvexa Security Solutions. All rights reserved.</p>
        <p className="footer-legal"><Link to="/privacy">Privacy Policy</Link> · <Link to="/terms">Terms of Service</Link></p>
      </div>
    </footer>
  );
}
