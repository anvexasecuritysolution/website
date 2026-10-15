import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import PageHero, { AsideCard } from '../components/PageHero.jsx';
import { FRAMEWORK_GUIDE } from '../data/frameworks.js';
import DevelopmentPartner from '../components/DevelopmentPartner.jsx';

const approach = [
  { icon: 'search', title: 'Understand your environment', text: 'We start with your systems, business priorities and existing security tools, so the work addresses the risks you actually face.' },
  { icon: 'wrench', title: 'Work alongside your team', text: 'Findings need people who can act on them. We help your technical team understand the issues, agree priorities and track remediation.' },
  { icon: 'filecheck', title: 'Verify and document', text: 'We retest remediated findings and keep the results connected to the original issue, giving your team a clear record of what changed.' },
  { icon: 'refresh', title: 'Agree the next step', text: 'An assessment and an ongoing engagement serve different needs. We define the scope with you, including any follow-up testing, monitoring or reporting.' },
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
        <div>
          <div>
            <div className="label">Our approach</div>
            <h2>How we work with your team.</h2>
            <p style={{ marginTop: '1rem' }}>Our role is to make security findings understandable, actionable and verifiable within the scope we agree.</p>
            <div className="about-blocks">
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
        <p className="home-section-intro">Laws set obligations, standards organise security practices, and assurance reports provide independent evidence. We help connect the requirements relevant to your business with practical technical work.</p>
        <div className="framework-guide-grid">
          {FRAMEWORK_GUIDE.map((framework, i) => (
            <Reveal as="article" className="ab framework-guide-card" key={framework.title} delay={(i % 2) * 70}>
              <p className="framework-kind">{framework.type}</p>
              <h3>{framework.title}</h3>
              <p>{framework.explanation}</p>
              <dl>
                <dt>Who it’s relevant to</dt><dd>{framework.audience}</dd>
              </dl>
            </Reveal>
          ))}
        </div>
        <p className="note">Applicability depends on your business, scope and current notifications. Anvexa supports technical readiness and evidence; certification, assurance and regulatory decisions remain with the relevant independent bodies.</p>
      </section>
      <DevelopmentPartner />
    </>
  );
}
