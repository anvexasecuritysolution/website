import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import CountUp from '../components/CountUp.jsx';
import PipelineRing from '../components/PipelineRing.jsx';
import { STATS, GAP_CARDS, ENGAGE } from '../data/content.js';

export default function Home() {
  return (
    <>
      <Seo
        description="Continuous security operations, compliance evidence and lifecycle protection for modern organisations — from first discovery to audit-ready proof."
      />
      <section className="hero">
        <div className="hero-text">
          <div className="hero-badge">Enterprise-Ready Cybersecurity — 2026 Roadmap</div>
          <h1>The product is not a VAPT report.</h1>
          <p>Anvexa delivers continuous security operations, compliance evidence, and lifecycle protection for modern organisations — from first discovery to audit-ready proof.</p>
          <div className="hero-acts">
            <Link to="/contact" className="btn btn-c">Start with a Free Assessment</Link>
            <Link to="/services" className="btn btn-ghost">See How It Works</Link>
          </div>
        </div>
        <div className="pipeline-visual">
          <div className="pipeline-ring"><PipelineRing /></div>
        </div>
      </section>

      <div className="stats-row">
        {STATS.map((s) => (
          <div className="stat-item" key={s.t}>
            <div className={`stat-num ${s.c}`}><CountUp value={s.n} /></div>
            <div className="stat-sub">{s.t}</div>
          </div>
        ))}
      </div>

      <section className="wrap">
        <div className="label">The Market Gap</div>
        <h2>Spending is rising. Capability is missing.</h2>
        <p style={{ marginTop: '1rem' }}>Cybersecurity tools are being purchased. But VAPT becomes a PDF with no follow-up. Compliance becomes a checklist done once, then forgotten. Logs exist — but nobody watches them continuously. The gap is the lifecycle.</p>
        <div className="gap-grid">
          {GAP_CARDS.map((c, i) => (
            <Reveal key={c.title} className={`gap-card ${c.kind}`} delay={(i % 2) * 80}>
              <div className="gap-icon" aria-hidden="true">{c.icon}</div>
              <h4>{c.title}</h4>
              <p>{c.text}</p>
            </Reveal>
          ))}
        </div>
        <div style={{ marginTop: '2rem' }}>
          <Link to="/services" className="btn btn-a">See the Full Lifecycle</Link>
        </div>
      </section>

      <hr className="divider" />

      <section className="wrap">
        <div className="label">How We Engage</div>
        <h2>Land. Fix. Retain. Expand.</h2>
        <p style={{ marginTop: '1rem' }}>Every engagement starts with a security assessment and grows into a long-term partnership.</p>
        <div className="engage-grid">
          {ENGAGE.map((e) => (
            <div key={e.k} className={`engage-cell${e.hl ? ' hl' : ''}`}>
              <div className="k" style={{ color: e.color }}>{e.k}</div>
              <h4>{e.title}</h4>
              <p>{e.text}</p>
            </div>
          ))}
        </div>
        <p className="note">Assessment opens the door · Compliance keeps you protected · Monitoring never sleeps · Evidence proves it</p>
      </section>
    </>
  );
}
