import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import { GAP_CARDS } from '../data/content.js';

export default function DeliveryComparison() {
  return (
    <section className="wrap why-now" aria-labelledby="delivery-comparison-title">
      <div className="label">Following Through</div>
      <h2 id="delivery-comparison-title">From a Report to Verified Action.</h2>
      <p className="home-section-intro">The difference is what happens after a finding: an owner, an agreed deadline, fix guidance and a recorded retest.</p>
      <div className="gap-grid">
        {GAP_CARDS.map((card, index) => (
          <Reveal key={card.title} className={`gap-card ${card.kind}`} delay={index * 80}>
            <div className="gap-icon"><Icon name={card.icon} /></div>
            <h3>{card.title}</h3>
            <div className="pb-flow gap-flow" role="list" aria-label={card.title}>
              {card.steps.map((label, step) => (
                <div className="pb-step" role="listitem" key={label}>
                  <div className={`pb-chip${card.kind === 'solution' ? ' c' : ''}`}>{label}</div>
                  {step < card.steps.length - 1 && <div className="pb-arrow" aria-hidden="true">→</div>}
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
