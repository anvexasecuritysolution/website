import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import PageHero, { AsideCard } from '../components/PageHero.jsx';
import { TIERS } from '../data/content.js';

export default function Pricing() {
  return (
    <>
      <Seo title="Pricing" description="Start with an assessment and grow into continuous security. Every engagement is scoped to your environment." />
      <PageHero
        label="Pricing"
        title={<>Start with a scan.<br />Stay for the security.</>}
        aside={(
          <AsideCard title="Included in every engagement" tiles={[
            { icon: 'phone', label: 'Free discovery call' },
            { icon: 'scan', label: 'Scoped to your environment' },
            { icon: 'filecheck', label: 'Evidence at every step' },
            { icon: 'badge', label: 'A dedicated security contact' },
          ]} />
        )}
      >
        <p>Every engagement begins with an assessment and grows into a continuous partnership. No lock-in at step one — prove value first.</p>
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
      <p className="pricing-note">All engagements are scoped to your environment. Contact us for a tailored quote — no templates, no surprises.</p>
    </>
  );
}
