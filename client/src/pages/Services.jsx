import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import { STEPS } from '../data/content.js';

export default function Services() {
  return (
    <>
      <Seo title="Services" description="Eight steps, one continuous loop: asset discovery, VAPT, risk prioritization, remediation, re-test, compliance mapping, monitoring and evidence." />
      <div className="lifecycle-intro">
        <div className="label">The Lifecycle</div>
        <h1>Eight steps. One continuous loop. Zero gaps.</h1>
        <p style={{ marginTop: '1.25rem', fontSize: '1rem' }}>This is not a point-in-time assessment. It is an operational model that reassesses continuously — turning findings into fixes, fixes into evidence, and evidence into business confidence.</p>
        <div className="lifecycle-tagline">Find <span>→</span> Fix <span>→</span> Verify <span>→</span> Monitor <span>→</span> Prove</div>
      </div>
      <div className="lifecycle-steps">
        <ol className="step-timeline" style={{ listStyle: 'none' }}>
          {STEPS.map((s) => (
            <li className="step-item" key={s.n}>
              <div className="step-num-wrap"><div className={`step-num ${s.tone === 'a' ? 'amber-n' : 'cyan-n'}`}>{s.n}</div></div>
              <Reveal className="step-body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className={`step-tag ${s.tone}`}>{s.tag}</span>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="reassess">
          <span aria-hidden="true" style={{ fontSize: '1.2rem' }}>🔄</span>
          <p><strong style={{ color: 'var(--amber)' }}>Reassess continuously.</strong> The lifecycle doesn't end at step 8. New assets are discovered, new vulnerabilities emerge, regulations update. The loop runs perpetually.</p>
        </div>
      </div>
    </>
  );
}
