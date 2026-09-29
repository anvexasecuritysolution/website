import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import PageHero, { AsideCard } from '../components/PageHero.jsx';
import { ABOUT_BLOCKS, REGULATIONS } from '../data/content.js';

export default function About() {
  return (
    <>
      <Seo title="About" description="Anvexa connects the security lifecycle — discovery, remediation, compliance, monitoring and evidence — into one continuous service." />
      <PageHero
        label="Who We Are"
        title="Security operations built around your business, not around a report."
        aside={(
          <AsideCard title="Anvexa Security Solutions" mark="/anvexa-mark.svg" tiles={[
            { icon: 'refresh', label: 'Continuous, not point-in-time' },
            { icon: 'filecheck', label: 'Evidence at every step' },
            { icon: 'landmark', label: 'Mapped to Indian frameworks' },
            { icon: 'shield', label: 'One team, start to audit' },
          ]} />
        )}
      >
        <p>Anvexa Security Solutions connects the security lifecycle — discovery, remediation, compliance, monitoring and evidence — into one continuous service. Organisations are investing more in security tools, yet assessments end as documents and controls go unverified. We close that gap.</p>
        <p style={{ marginTop: '1rem' }}>Our mission: safer businesses, stronger compliance, a more secure India.</p>
        <div className="hero-actions-mt">
          <Link to="/contact" className="btn btn-c">Talk to us</Link>
          <Link to="/services" className="btn btn-ghost">Our Services</Link>
        </div>
      </PageHero>
      <div className="wrap">
        <div className="about-cols">
          <div>
            <div className="label">What We Do</div>
            <h2>Security Operations + Continuous Compliance + Evidence</h2>
            <p style={{ marginTop: '1rem' }}>Real security outcomes — not another PDF.</p>
            <div className="about-blocks">
              {ABOUT_BLOCKS.map((b, i) => (
                <Reveal as="div" className="ab" key={b.title} delay={(i % 3) * 80}>
                  <div className="ab-icon"><Icon name={b.icon} /></div>
                  <h4>{b.title}</h4>
                  <p>{b.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <div className="label">Regulatory Landscape</div>
            <h2>Obligations that keep expanding.</h2>
            <div className="regulations">
              {REGULATIONS.map((r, i) => (
                <Reveal as="div" className="reg" key={r.title} delay={i * 70}>
                  <div className="reg-icon"><Icon name={r.icon} size={18} /></div>
                  <div>
                    <div className="reg-title">{r.title}</div>
                    <div className="reg-text">{r.text}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
