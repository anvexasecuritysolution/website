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
        title={<>Start with a scan.<br />Stay if it helps.</>}
        aside={(
          <AsideCard title="Included in every engagement" tiles={[
            { icon: 'phone', label: 'Free discovery call' },
            { icon: 'scan', label: 'Scoped to your environment' },
            { icon: 'filecheck', label: 'Evidence at every step' },
            { icon: 'badge', label: 'One named contact' },
          ]} />
        )}
      >
        <p>Most clients begin with a single assessment and decide later whether to continue. There is no lock-in at the start. We'd rather earn the next step.</p>
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
      <p className="pricing-note">We price every project after looking at your environment, so we don't publish fixed rates. Get in touch and we'll send you a quote.</p>
    </>
  );
}
