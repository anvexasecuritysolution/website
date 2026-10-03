import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import PipelineRing from '../components/PipelineRing.jsx';
import Dashboard from '../components/Dashboard.jsx';
import { FRAMEWORKS, FRAMEWORKS_NOTE, GAP_CARDS, ABOUT_BLOCKS, ENGAGE, RETENTION } from '../data/content.js';

export default function Home() {
  return (
    <>
      <Seo description="Anvexa is an Indian cybersecurity company covering asset discovery, VAPT, remediation, compliance, monitoring, incident response and audit evidence in one continuous lifecycle." />

      <section className="hero">
        <div className="hero-text">
          <div className="hero-badge">Cybersecurity for Indian businesses</div>
          <h1>A security report is where the work starts, not where it ends.</h1>
          <p>We run asset discovery and VAPT, follow remediation through to retest, map controls to the frameworks you answer to, and keep the evidence your auditors and customers will ask for.</p>
          <div className="hero-acts">
            <Link to="/services" className="btn btn-c">See what we do →</Link>
            <Link to="/contact" className="btn btn-ghost">Talk to us</Link>
          </div>
        </div>
        <div className="pipeline-visual"><div className="pipeline-ring"><PipelineRing /></div></div>
      </section>

      <section className="wrap-sm">
        <div className="label">Rules and standards we work with</div>
        <div className="stats-row">
          {FRAMEWORKS.map((f) => (
            <div className="stat-item" key={f.name}>
              <div className="stat-num">{f.name}</div>
              <div className="stat-sub">{f.text}</div>
              <div className="stat-who"><b>Who it's for:</b> {f.who}</div>
            </div>
          ))}
        </div>
        <p className="note">{FRAMEWORKS_NOTE}</p>
      </section>

      <section className="wrap why-now">
        <div className="label">Why Now</div>
        <h2 className="two-line"><span>The Problem Isn't a Lack of Security Tools.</span> <span>It's the Gap Between Having Them and Continuously Operating Them.</span></h2>
        <p style={{ marginTop: '1rem' }}>Organisations are investing more, but many still operate with fragmented visibility, reactive remediation and limited in-house expertise. The operational layer is where we focus.</p>
        <div className="gap-grid">
          {GAP_CARDS.map((c, i) => (
            <Reveal key={c.title} className={`gap-card ${c.kind}`} delay={i * 80}>
              <div className="gap-icon"><Icon name={c.icon} /></div>
              <h4>{c.title}</h4>
              <div className="pb-flow gap-flow" role="list" aria-label={c.title}>
                {c.steps.map((label, j) => (
                  <div className="pb-step" role="listitem" key={label}>
                    <div className={`pb-chip${c.kind === 'solution' ? ' c' : ''}`}>{label}</div>
                    {j < c.steps.length - 1 && <div className="pb-arrow" aria-hidden="true">→</div>}
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap">
        <div className="label">What we do</div>
        <h2>Finding vulnerabilities is the easy part. Proving they are remediated is what counts.</h2>
        <p style={{ marginTop: '1rem' }}>We don't ask you to replace your existing security products. We pull in the important signals and turn them into prioritised actions.</p>
        <div className="about-blocks">
          {ABOUT_BLOCKS.map((b, i) => (
            <Reveal as="div" className="ab" key={b.title} delay={(i % 3) * 80}>
              <div className="ab-icon"><Icon name={b.icon} /></div>
              <h4>{b.n} · {b.title}</h4>
              <p>{b.text}</p>
            </Reveal>
          ))}
        </div>
        <div style={{ marginTop: '2rem' }}><Link to="/services" className="btn btn-a">See the full lifecycle</Link></div>
      </section>

      <section className="wrap">
        <div className="label">What you see</div>
        <h2>Clear answers, without the extra work on your side.</h2>
        <Dashboard />
        <p className="note">Illustrative example. Sample figures are for demonstration only.</p>
      </section>

      <section className="wrap">
        <div className="label">Working with us</div>
        <h2>Most clients start with an assessment and stay on for ongoing security.</h2>
        <p style={{ marginTop: '1rem' }}>A one-off assessment shows you where you stand. The monthly work keeps you there.</p>
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
        <div className="label">Why clients stay</div>
        <h2>It gets more useful the longer we work together.</h2>
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
          <h3>Want to know where your gaps are?</h3>
          <p style={{ marginTop: '.5rem' }}>Tell us what you need to protect. We'll map your assets, risks, controls and monitoring into a practical security roadmap.</p>
        </div>
        <Link to="/contact" className="btn btn-c">Book a call →</Link>
      </div>
    </>
  );
}
