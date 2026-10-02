import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import PageHero, { AsideCard } from '../components/PageHero.jsx';
import { STEPS } from '../data/content.js';

export default function Services() {
  return (
    <>
      <Seo title="Services" description="Our eight-step lifecycle: asset discovery, VAPT and risk, remediation, retest, control mapping, continuous watch, incident response, evidence and audit." />
      <PageHero
        label="Our services"
        title="Test it once. Keep it secure after that."
        aside={<AsideCard title="The lifecycle at a glance" tiles={STEPS.map((s) => ({ k: s.n, label: s.title }))} />}
      >
        <p>Your first VAPT is a start, not the finish. Your environment changes every week, with new assets, new vulnerabilities and new access, so the security loop keeps running.</p>
        <div className="lifecycle-tagline">↻ Check again <span>→</span> Find what's new <span>→</span> Repeat</div>
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
          <p><strong style={{ color: 'var(--amber)' }}>Then go round again.</strong> Step 8 isn't the finish line. New assets appear, new vulnerabilities are disclosed and regulations change, so we return to step 1.</p>
        </div>
      </div>
    </>
  );
}
