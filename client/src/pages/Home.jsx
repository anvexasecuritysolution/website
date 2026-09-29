import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import PipelineRing from '../components/PipelineRing.jsx';
import Dashboard from '../components/Dashboard.jsx';
import { FRAMEWORKS, GAP_CARDS, ABOUT_BLOCKS, ENGAGE, FLOW, RETENTION } from '../data/content.js';

export default function Home() {
  return (
    <>
      <Seo description="Anvexa connects asset discovery, VAPT, remediation, compliance, monitoring, incident response and audit evidence into one continuous security lifecycle." />

      <section className="hero">
        <div className="hero-text">
          <div className="hero-badge">Always-On Cybersecurity, Built for Indian Businesses</div>
          <h1>Security that doesn't stop at the report.</h1>
          <p>Anvexa connects asset discovery, VAPT, remediation, compliance, monitoring, incident response and audit evidence into one continuous security lifecycle.</p>
          <div className="hero-acts">
            <Link to="/services" className="btn btn-c">Explore the Platform →</Link>
            <Link to="/contact" className="btn btn-ghost">Talk to Our Team</Link>
          </div>
        </div>
        <div className="pipeline-visual"><div className="pipeline-ring"><PipelineRing /></div></div>
      </section>

      <section className="wrap-sm">
        <div className="label">Frameworks We Map To</div>
        <div className="stats-row">
          {FRAMEWORKS.map((f) => (
            <div className="stat-item" key={f.name}>
              <div className="stat-num">{f.name}</div>
              <div className="stat-sub">{f.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap">
        <div className="label">Why Now</div>
        <h2 className="two-line"><span>The problem isn't a lack of security tools.</span> <span>It's the gap between having them and continuously operating them.</span></h2>
        <p style={{ marginTop: '1rem' }}>Organisations are investing more, but many still operate with fragmented visibility, reactive remediation and limited in-house expertise. The operational layer is where we focus.</p>
        <div className="gap-grid">
          {GAP_CARDS.map((c, i) => (
            <Reveal key={c.title} className={`gap-card ${c.kind}`} delay={i * 80}>
              <div className="gap-icon"><Icon name={c.icon} /></div>
              <h4>{c.title}</h4>
              <p>{c.text}</p>
            </Reveal>
          ))}
        </div>
        <div className="pb-flow home-flow" role="list" aria-label="From requirement to verification">
          {FLOW.map(([label, hl], i) => (
            <div className="pb-step" role="listitem" key={label}>
              <div className={`pb-chip${hl ? ' c' : ''}`}>{label}</div>
              {i < FLOW.length - 1 && <div className="pb-arrow" aria-hidden="true">→</div>}
            </div>
          ))}
        </div>
      </section>

      <section className="wrap">
        <div className="label">One Operating Layer</div>
        <h2>Security findings are only the beginning. Proof is the outcome.</h2>
        <p style={{ marginTop: '1rem' }}>We don't ask customers to replace every security product. We connect the important signals and turn them into actions.</p>
        <div className="about-blocks">
          {ABOUT_BLOCKS.map((b, i) => (
            <Reveal as="div" className="ab" key={b.title} delay={(i % 3) * 80}>
              <div className="ab-icon"><Icon name={b.icon} /></div>
              <h4>{b.n} · {b.title}</h4>
              <p>{b.text}</p>
            </Reveal>
          ))}
        </div>
        <div style={{ marginTop: '2rem' }}><Link to="/services" className="btn btn-a">See the Full Lifecycle</Link></div>
      </section>

      <section className="wrap">
        <div className="label">Customer Experience</div>
        <h2>Maximum output. Minimum customer effort.</h2>
        <Dashboard />
        <p className="note">Illustrative example — sample figures shown for demonstration only.</p>
      </section>

      <section className="wrap">
        <div className="label">How We Engage</div>
        <h2>Start with an assessment. Continue with continuous security.</h2>
        <p style={{ marginTop: '1rem' }}>One-time work opens the relationship. Recurring operations create durable value.</p>
        <div className="engage-grid">
          {ENGAGE.map((e, i) => (
            <Reveal as="div" key={e.k} className="engage-cell" delay={i * 80}>
              <div className="k">{e.k}</div>
              <h4>{e.title}</h4>
              <p>{e.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap">
        <div className="label">Why Customers Stay</div>
        <h2>The value compounds over time.</h2>
        <div className="engage-grid">
          {RETENTION.map((r, i) => (
            <Reveal as="div" className="retain-card" key={r.title} delay={i * 80}>
              <div className="ab-icon"><Icon name={r.icon} /></div>
              <h4>{r.title}</h4>
              <p>{r.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="cta-band">
        <div>
          <h3>Ready to make security operational?</h3>
          <p style={{ marginTop: '.5rem' }}>Tell us what you need to protect. We'll map the assets, risks, controls and monitoring required to build a practical security roadmap.</p>
        </div>
        <Link to="/contact" className="btn btn-c">Request a Demo →</Link>
      </div>
    </>
  );
}
