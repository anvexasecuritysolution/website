import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import PageHero, { AsideCard } from '../components/PageHero.jsx';
import { ABOUT_BLOCKS, REGULATIONS } from '../data/content.js';

export default function About() {
  return (
    <>
      <Seo title="About" description="Anvexa Security Solutions is a Noida-based cybersecurity team covering VAPT, remediation, compliance, monitoring and audit evidence." />
      <PageHero
        label="About us"
        title="Security work built around your business, not around a report."
        aside={(
          <AsideCard title="Anvexa Security Solutions" mark="/anvexa-mark.svg" tiles={[
            { icon: 'refresh', label: 'Ongoing, not a one-off test' },
            { icon: 'filecheck', label: 'Evidence at every step' },
            { icon: 'landmark', label: 'Mapped to Indian frameworks' },
            { icon: 'shield', label: 'One team from test to audit' },
          ]} />
        )}
      >
        <p>Anvexa Security Solutions is a cybersecurity team based in Noida. We cover the whole chain: asset discovery, VAPT, remediation, compliance, monitoring and audit evidence. Too many assessments end as a PDF nobody acts on, and too many controls go unverified. We built Anvexa to close that gap.</p>
        <p style={{ marginTop: '1rem' }}>What we want is simple: safer businesses, compliance that holds up, and a more secure India.</p>
        <div className="hero-actions-mt">
          <Link to="/contact" className="btn btn-c">Get in touch</Link>
          <Link to="/services" className="btn btn-ghost">Our services</Link>
        </div>
      </PageHero>
      <div className="wrap">
        <div className="about-cols">
          <div>
            <div className="label">What we do</div>
            <h2>Security operations, compliance and evidence in one place</h2>
            <p style={{ marginTop: '1rem' }}>You end up with problems actually fixed, not another PDF.</p>
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
            <div className="label">The rules</div>
            <h2>The list of obligations keeps getting longer.</h2>
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
