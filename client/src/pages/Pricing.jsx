import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import PageHero, { AsideCard } from '../components/PageHero.jsx';
import { TIERS } from '../data/content.js';

export default function Pricing() {
  return (
    <>
      <Seo title="Pricing" description="Anvexa prices each engagement after looking at your environment. Start with a one-time assessment or go straight to ongoing security." />
      <PageHero
        label="Pricing"
        title="Pricing based on your scope."
        aside={(
          <AsideCard title="Included in every engagement" tiles={[
            { icon: 'phone', label: 'Free discovery call' },
            { icon: 'scan', label: 'Scoped to your environment' },
            { icon: 'filecheck', label: 'Evidence at every step' },
            { icon: 'badge', label: 'One named contact' },
          ]} />
        )}
      >
        <p>Start with a defined assessment or discuss a recurring review schedule. We confirm the assets, testing depth, deliverables, retest window and fees in a written proposal. Specialist monitoring or response support needs a separate availability and scope discussion.</p>
      </PageHero>
      <div className="pricing-grid">
        {TIERS.map((t, i) => (
          <Reveal className={`tier${t.featured ? ' featured' : ''}`} key={t.name} delay={i * 70}>
            <div className="tier-head">
              <div className={`tier-badge ${t.badge}`}>{t.name}</div>
              <h3>{t.title}</h3>
              <div className="tier-type">{t.type}</div>
            </div>
            <div className="tier-price">{t.price} <span>{t.unit}</span></div>
            <ul className="tier-features">{t.features.map((f) => <li key={f}>{f}</li>)}</ul>
            <div className="tier-cta">
              <Link to={`/contact?plan=${t.badge}`} className={`btn ${t.ctaClass}`}>{t.cta}</Link>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="pricing-note">Fees are quoted after scoping. Your written proposal confirms the included work and any optional services before the engagement begins.</p>
      <section className="wrap" aria-labelledby="quote-scope-title">
        <div className="label">What shapes your quote</div>
        <h2 id="quote-scope-title">Three things we clarify before pricing.</h2>
        <div className="engage-grid">
          <Reveal className="engage-cell"><h3>Environment and scope</h3><p>The applications, APIs, cloud resources or infrastructure in scope, their complexity and any testing restrictions.</p></Reveal>
          <Reveal className="engage-cell" delay={70}><h3>Coverage and frequency</h3><p>Whether you need a single assessment or recurring work, including the required monitoring coverage, review schedule and response support.</p></Reveal>
          <Reveal className="engage-cell" delay={140}><h3>Deliverables and timing</h3><p>The reports, retesting, evidence and handover you need, along with target dates and dependencies on your team.</p></Reveal>
        </div>
      </section>
    </>
  );
}
