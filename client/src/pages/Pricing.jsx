import { TitleCase, Emphasis } from '../components/CopyStyle.jsx';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import PageHero, { AsideCard } from '../components/PageHero.jsx';
import { TIERS } from '../data/content.js';

export default function Pricing() {
  return (
    <>
      <Seo title="Pricing" description="Security assessment and recurring review pricing based on your systems, testing scope and deliverables. Monitoring and incident support are scoped separately." />
      <PageHero
        label="Pricing"
        title="Pricing based on your scope."
        aside={(
          <AsideCard title="Before and During Your Engagement" tiles={[
            { icon: 'phone', label: 'Initial scope discussion' },
            { icon: 'scan', label: 'Scope and fees agreed in writing' },
            { icon: 'filecheck', label: 'Evidence-Backed Assessment Findings' },
            { icon: 'badge', label: 'Responsibilities agreed before work starts' },
          ]} />
        )}
      >
        <p><Emphasis>Start with a defined assessment or discuss a recurring review schedule. We confirm the assets, testing depth, deliverables, retest window and fees in a written proposal. Specialist monitoring or response support needs a separate availability and scope discussion.</Emphasis></p>
      </PageHero>
      <div className="pricing-grid">
        {TIERS.map((t, i) => (
          <Reveal className={`tier${t.featured ? ' featured' : ''}`} key={t.name} delay={i * 70}>
            <div className="tier-head">
              <div className={`tier-badge ${t.badge}`}>{t.name}</div>
              <h3><TitleCase>{t.title}</TitleCase></h3>
              <div className="tier-type">{t.type}</div>
            </div>
            <div className="tier-price">{t.price} <span>{t.unit}</span></div>
            <ul className="tier-features">{t.features.map((f) => <li key={f}><Emphasis>{f}</Emphasis></li>)}</ul>
            <div className="tier-cta">
              <Link to={`/contact?plan=${t.badge}`} className={`btn ${t.ctaClass}`}>{t.cta}</Link>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="pricing-note-wrap"><p className="pricing-note"><Emphasis>Not sure which option fits? Tell us about your systems and priorities. We will discuss what needs testing, then confirm the scope, deliverables and fees in a written proposal before work begins.</Emphasis></p></div>
      <section className="wrap" aria-labelledby="quote-scope-title">
        <div className="label">What shapes your quote</div>
        <h2 id="quote-scope-title"><TitleCase>Three things we clarify before pricing.</TitleCase></h2>
        <div className="engage-grid">
          <Reveal className="engage-cell"><h3><TitleCase>Environment and scope</TitleCase></h3><p><Emphasis>The applications, APIs, cloud resources or infrastructure in scope, their complexity and any testing restrictions.</Emphasis></p></Reveal>
          <Reveal className="engage-cell" delay={70}><h3><TitleCase>Coverage and frequency</TitleCase></h3><p><Emphasis>Recurring reviews are assessments on an agreed schedule or after significant changes. They do not include continuous monitoring. Monitoring hours, alert handling and incident response commitments are agreed separately.</Emphasis></p></Reveal>
          <Reveal className="engage-cell" delay={140}><h3><TitleCase>Deliverables and timing</TitleCase></h3><p><Emphasis>The reports, retesting, evidence and handover you need, along with target dates and dependencies on your team.</Emphasis></p></Reveal>
        </div>
      </section>
    </>
  );
}
