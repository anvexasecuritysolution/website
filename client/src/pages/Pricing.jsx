import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import { TIERS } from '../data/content.js';

export default function Pricing() {
  return (
    <>
      <Seo title="Pricing" description="Start with an assessment and grow into continuous security. Every engagement is scoped to your environment." />
      <div className="pricing-hero">
        <div className="label">Pricing</div>
        <h1>Start with a scan.<br />Stay for the security.</h1>
        <p style={{ marginTop: '1.25rem', fontSize: '1rem' }}>Every engagement begins with an assessment and grows into a continuous partnership. No lock-in at step one — prove value first.</p>
      </div>
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
