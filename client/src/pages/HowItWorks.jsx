import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import { FLOW, PHASES } from '../data/content.js';

export default function HowItWorks() {
  return (
    <>
      <Seo title="How It Works" description="A structured four-stage engagement: discover, assess, remediate and assure." />
      <div className="process-hero">
        <div className="label">Our Approach</div>
        <h1>How an engagement works</h1>
        <p style={{ marginTop: '1.25rem' }}>A structured, four-stage engagement — from scoping to continuous assurance — with evidence produced at every step.</p>
      </div>

      <div className="process-bottom-bar">
        <div className="pb-flow" role="list" aria-label="Delivery flow">
          {FLOW.map(([label, hl], i) => (
            <div className="pb-step" role="listitem" key={label}>
              <div className={`pb-chip${hl ? ' c' : ''}`}>{label}</div>
              {i < FLOW.length - 1 && <div className="pb-arrow" aria-hidden="true">→</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="label">The Stages</div>
        <h2 style={{ marginBottom: '2rem' }}>From first conversation to audit-ready proof.</h2>
        <div className="phases-grid">
          {PHASES.map((p, i) => (
            <Reveal className="phase" key={p.n} delay={i * 70}>
              <div className="phase-num">{p.n}</div>
              <div className="phase-time">{p.time}</div>
              <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
