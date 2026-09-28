import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import { ABOUT_BLOCKS, REGULATIONS } from '../data/content.js';

export default function About() {
  return (
    <>
      <Seo title="About" description="Anvexa connects the broken security lifecycle — discovery, remediation, compliance, monitoring and evidence — for India's SMBs." />
      <div className="about-hero wrap">
        <div className="label">Who We Are</div>
        <h1>Built for India's SMB security gap — not for enterprise budgets.</h1>
        <p style={{ fontSize: '1rem', marginTop: '1.25rem' }}>Anvexa Security Solutions was founded on a single insight: India's small and mid-market businesses are spending more on cybersecurity, but getting less actual security. Tools are being purchased. Reports are being filed. And yet 40% experienced a cyber incident in the last two years.</p>
        <p style={{ marginTop: '1rem' }}>We connect the broken lifecycle — discovery, remediation, compliance, monitoring, and evidence — into one continuous service. Our mission: safer businesses, stronger compliance, a more secure India.</p>
        <div className="hero-actions-mt">
          <Link to="/contact" className="btn btn-c">Talk to us</Link>
          <Link to="/services" className="btn btn-ghost">Our Services</Link>
        </div>
      </div>
      <hr className="divider" />
      <div className="wrap">
        <div className="about-cols">
          <div>
            <div className="label">What We Do</div>
            <h2>Cybersecurity Operations + Continuous Compliance + Evidence</h2>
            <p style={{ marginTop: '1rem' }}>For Indian SMBs and mid-market companies that need real security — not another PDF.</p>
            <div className="about-blocks">
              {ABOUT_BLOCKS.map((b) => (
                <div className="ab" key={b.title}>
                  <div className="ab-icon" aria-hidden="true">{b.icon}</div>
                  <h4>{b.title}</h4>
                  <p>{b.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="label">What Creates the Need</div>
            <h2>Regulatory pressure that won't ease off.</h2>
            <div className="regulations">
              {REGULATIONS.map((r) => (
                <div className="reg" key={r.title} style={r.hl ? { borderColor: 'rgba(0,212,232,.25)', background: 'var(--cyan-dim)' } : undefined}>
                  <div className="reg-icon" aria-hidden="true">{r.icon}</div>
                  <div>
                    <div className="reg-title" style={r.hl ? { color: 'var(--cyan)' } : undefined}>{r.title}</div>
                    <div className="reg-text">{r.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
