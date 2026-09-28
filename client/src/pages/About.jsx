import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import { ABOUT_BLOCKS, REGULATIONS } from '../data/content.js';

export default function About() {
  return (
    <>
      <Seo title="About" description="Anvexa connects the security lifecycle — discovery, remediation, compliance, monitoring and evidence — into one continuous service." />
      <div className="about-hero wrap">
        <div className="label">Who We Are</div>
        <h1>Security operations built around your business, not around a report.</h1>
        <p style={{ marginTop: '1.25rem' }}>Anvexa Security Solutions connects the security lifecycle — discovery, remediation, compliance, monitoring and evidence — into one continuous service. Organisations are investing more in security tools, yet assessments end as documents and controls go unverified. We close that gap.</p>
        <p style={{ marginTop: '1rem' }}>Our mission: safer businesses, stronger compliance, a more secure India.</p>
        <div className="hero-actions-mt">
          <Link to="/contact" className="btn btn-c">Talk to us</Link>
          <Link to="/services" className="btn btn-ghost">Our Services</Link>
        </div>
      </div>
      <div className="wrap">
        <div className="about-cols">
          <div>
            <div className="label">What We Do</div>
            <h2>Security Operations + Continuous Compliance + Evidence</h2>
            <p style={{ marginTop: '1rem' }}>Real security outcomes — not another PDF.</p>
            <div className="about-blocks">
              {ABOUT_BLOCKS.map((b) => (
                <div className="ab" key={b.title}>
                  <div className="ab-icon"><Icon name={b.icon} /></div>
                  <h4>{b.title}</h4>
                  <p>{b.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="label">Regulatory Landscape</div>
            <h2>Obligations that keep expanding.</h2>
            <div className="regulations">
              {REGULATIONS.map((r) => (
                <div className="reg" key={r.title}>
                  <div className="reg-icon"><Icon name={r.icon} size={18} /></div>
                  <div>
                    <div className="reg-title">{r.title}</div>
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
