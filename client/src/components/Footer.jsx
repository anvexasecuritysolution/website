import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme.js';

export default function Footer() {
  const { theme } = useTheme();
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" aria-label="Anvexa Security Solutions — home"><img className="footer-logo" src={theme === 'light' ? '/anvexa-logo.svg' : '/anvexa-logo-dark.svg'} alt="Anvexa Security Solutions" width="200" height="175" /></Link>
          <p>Continuous Cybersecurity, Simplified. Safer businesses, stronger compliance, a more secure India.</p>
        </div>
        <div className="fc">
          <h4>Services</h4>
          <ul>
            {['Asset Discovery & VAPT', 'Risk & Remediation', 'Compliance Mapping', 'Continuous Monitoring', 'Evidence Vault'].map((t) => (
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
            {['CERT-In', 'DPDP 2023', 'ISO 27001', 'SOC 2', 'SEBI / RBI'].map((t) => (
              <li key={t}><Link to="/about">{t}</Link></li>
            ))}
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
