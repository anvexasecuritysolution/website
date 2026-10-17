import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import PageHero, { AsideCard } from '../components/PageHero.jsx';
import { FRAMEWORK_GUIDE } from '../data/frameworks.js';
import DevelopmentPartner from '../components/DevelopmentPartner.jsx';

const approach = [
  { icon: 'search', title: 'Business context matters', text: 'A customer portal, an internal ERP and a public API carry different risks. Recommendations should reflect the data, users and business operations involved.' },
  { icon: 'wrench', title: 'Practical collaboration', text: 'Your developers and IT staff know your systems. We value their context and discuss constraints so recommendations can fit the way your team works.' },
  { icon: 'filecheck', title: 'Claims need evidence', text: 'We distinguish observed weaknesses from assumptions and explain limitations. A report should make clear what was tested and what remains uncertain.' },
  { icon: 'refresh', title: 'Clear commitments', text: 'We distinguish assessment work from ongoing monitoring and specialist response. Service boundaries and responsibilities should be clear before you commit.' },
];

export default function About() {
  return (
    <>
      <Seo title="About" description="Anvexa Security Solutions is a Noida-based cybersecurity team covering VAPT, remediation, compliance, monitoring and audit evidence." />
      <PageHero
        label="About us"
        title="Security work built around your business, not around a report."
        aside={(
          <AsideCard title="Anvexa Security Solutions" mark="/anvexa-mark.svg" tiles={[
            { icon: 'refresh', label: 'Defined assessment scopes' },
            { icon: 'filecheck', label: 'Evidence at every step' },
            { icon: 'landmark', label: 'Mapped to Indian frameworks' },
            { icon: 'shield', label: 'Developer handover and retesting' },
          ]} />
        )}
      >
        <p>Anvexa Security Solutions is a cybersecurity startup based in Noida, focused on web application, API, server and network security for Indian MSMEs and startups. We help teams understand vulnerabilities, plan fixes and verify remediation, with deliverables and access agreed for each engagement.</p>
        <p style={{ marginTop: '1rem' }}>What we want is simple: safer businesses, compliance that holds up, and a more secure India.</p>
        <div className="hero-actions-mt">
          <Link to="/contact" className="btn btn-c">Get in touch</Link>
          <Link to="/services" className="btn btn-ghost">Our services</Link>
        </div>
      </PageHero>
      <div className="wrap">
        <div>
          <div>
            <div className="label">Our principles</div>
            <h2>What guides our decisions.</h2>
            <p style={{ marginTop: '1rem' }}>These principles shape how we discuss risk, make recommendations and set expectations with your team.</p>
            <div className="about-blocks about-principles-grid">
              {approach.map((b, i) => (
                <Reveal as="div" className="ab" key={b.title} delay={(i % 3) * 80}>
                  <div className="ab-icon"><Icon name={b.icon} /></div>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
      <section className="wrap framework-guide" aria-labelledby="framework-guide-title" id="frameworks">
        <div className="label">Rules and frameworks explained</div>
        <h2 id="framework-guide-title">Understand what applies to your business.</h2>
        <p className="home-section-intro">A quick guide to key requirements and how our technical work supports them.</p>
        <div className="framework-guide-grid">
          {FRAMEWORK_GUIDE.map((framework, i) => (
            <Reveal as="article" className="ab framework-guide-card" key={framework.title} delay={(i % 2) * 70}>
              <p className="framework-kind">{framework.type}</p>
              <h3>{framework.title}</h3>
              <ul className="framework-points">
                <li>{framework.explanation}</li>
                <li><strong>For:</strong> {framework.audience}</li>
                <li><strong>We help:</strong> {framework.support}</li>
              </ul>
            </Reveal>
          ))}
        </div>
        <p className="note">Applicability depends on scope, exemptions and current notifications. We support technical readiness; independent bodies handle certification and assurance.</p>
      </section>
      <DevelopmentPartner />
    </>
  );
}
