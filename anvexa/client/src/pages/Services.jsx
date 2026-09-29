import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import PageHero, { AsideCard } from '../components/PageHero.jsx';
import { STEPS } from '../data/content.js';

export default function Services() {
  return (
    <>
      <Seo title="Services" description="A continuous lifecycle: asset discovery, VAPT and risk, remediation, retest, control mapping, continuous watch, incident response, evidence and audit." />
      <PageHero
        label="The Lifecycle"
        title="Secure once. Operate continuously."
        aside={<AsideCard title="The lifecycle at a glance" tiles={STEPS.map((s) => ({ k: s.n, label: s.title }))} />}
      >
        <p>Security doesn't end after the first VAPT. The environment changes every day — so the security loop keeps moving.</p>
        <div className="lifecycle-tagline">↻ Reassess <span>→</span> Discover <span>→</span> Continue</div>
      </PageHero>
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
          <Icon name="refresh" size={24} />
          <p><strong style={{ color: 'var(--amber)' }}>Reassess continuously.</strong> The lifecycle doesn't end at step 8. New assets are discovered, new vulnerabilities emerge, regulations update. The loop runs perpetually.</p>
        </div>
      </div>
    </>
  );
}
