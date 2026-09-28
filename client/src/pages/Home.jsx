import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import PipelineRing from '../components/PipelineRing.jsx';
import { FRAMEWORKS, GAP_CARDS, ENGAGE } from '../data/content.js';

export default function Home() {
  return (
    <>
      <Seo description="Continuous security operations, compliance evidence and lifecycle protection — from first discovery to audit-ready proof." />
      <section className="hero">
        <div className="hero-text">
          <div className="hero-badge">Managed cybersecurity &amp; compliance</div>
          <h1>Continuous security. Audit-ready proof.</h1>
          <p>Anvexa delivers continuous security operations, compliance evidence and lifecycle protection — from first discovery to audit-ready proof.</p>
          <div className="hero-acts">
            <Link to="/contact" className="btn btn-c">Book a Free Assessment</Link>
            <Link to="/services" className="btn btn-ghost">Explore the Lifecycle</Link>
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
        <div className="label">The Gap</div>
        <h2>Security spending is rising. Assurance is not.</h2>
        <p style={{ marginTop: '1rem' }}>Tools are purchased and assessments are performed — yet findings go untracked, compliance is treated as a once-a-year exercise and logs go unreviewed. The gap is the lifecycle.</p>
        <div className="gap-grid">
          {GAP_CARDS.map((c, i) => (
            <Reveal key={c.title} className={`gap-card ${c.kind}`} delay={(i % 2) * 80}>
              <div className="gap-icon"><Icon name={c.icon} /></div>
              <h4>{c.title}</h4>
              <p>{c.text}</p>
            </Reveal>
          ))}
        </div>
        <div style={{ marginTop: '2rem' }}><Link to="/services" className="btn btn-a">See the Full Lifecycle</Link></div>
      </section>

      <section className="wrap">
        <div className="label">How We Engage</div>
        <h2>Assess. Remediate. Monitor. Respond.</h2>
        <p style={{ marginTop: '1rem' }}>Every engagement starts with an assessment and grows into a long-term security partnership.</p>
        <div className="engage-grid">
          {ENGAGE.map((e) => (
            <div key={e.k} className="engage-cell">
              <div className="k">{e.k}</div>
              <h4>{e.title}</h4>
              <p>{e.text}</p>
            </div>
          ))}
        </div>
        <p className="note">Assessment sets the baseline · Compliance keeps controls mapped · Monitoring never sleeps · Evidence proves it</p>
      </section>
    </>
  );
}
