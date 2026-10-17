import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import PageHero, { AsideCard } from '../components/PageHero.jsx';
import { PHASES } from '../data/content.js';

const DELIVERY_FLOW = ['Enquiry', 'Written proposal', 'Authorisation', 'Assessment', 'Remediation', 'Retest', 'Handover'];

export default function HowItWorks() {
  return (
    <>
      <Seo title="How It Works" description="How an Anvexa engagement runs in four stages: discover, assess, remediate and assure." />
      <PageHero
        label="How we work"
        title="What happens after you contact us"
        aside={(
          <AsideCard title="Your engagement at a glance" tiles={[
            { icon: 'search', label: 'Discover' },
            { icon: 'shield', label: 'Assess' },
            { icon: 'wrench', label: 'Remediate' },
            { icon: 'vault', label: 'Verify and hand over' },
          ]} />
        )}
      >
        <p>We agree the scope, assess the risks, support remediation and document the results. Monitoring, recurring reviews and ongoing assurance are included when they form part of your agreed engagement.</p>
      </PageHero>
      <section className="wrap" aria-labelledby="testing-safeguards-title">
        <div className="label">Before testing begins</div><h2 id="testing-safeguards-title">Agree how the work and your information will be handled.</h2>
        <div className="engage-grid">
          <Reveal className="engage-cell"><h3>Authority and scope</h3><p>Document asset ownership or testing permission, environments, access, exclusions and third-party constraints. Testing starts within the authorised scope.</p></Reveal>
          <Reveal className="engage-cell" delay={70}><h3>Operational safeguards</h3><p>Agree the testing window, escalation contact and stop conditions. Discuss backups, staging and synthetic data. Testing can affect availability, so safeguards must match the environment.</p></Reveal>
          <Reveal className="engage-cell" delay={140}><h3>Confidentiality and handover</h3><p>Agree confidentiality terms, report recipients, secure access sharing, evidence retention and credential revocation. Confirm the retest window and final deliverables in writing.</p></Reveal>
        </div>
      </section>

      <div className="process-bottom-bar">
        <div className="pb-flow" role="list" aria-label="Delivery flow">
          {DELIVERY_FLOW.map((label, i) => (
            <div className="pb-step" role="listitem" key={label}>
              <div className="pb-chip c">{label}</div>
              {i < DELIVERY_FLOW.length - 1 && <div className="pb-arrow" aria-hidden="true">→</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="label">The stages</div>
        <h2 style={{ marginBottom: '2rem' }}>What each delivery stage includes.</h2>
        <div className="phases-grid">
          {PHASES.map((p, i) => (
            <Reveal className="phase" key={p.n} delay={i * 70}>
              <div className="phase-num">{p.n}</div>
              <div className="phase-time">{p.time}</div>
              <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </Reveal>
          ))}
        </div>
        <p className="note">A one-time assessment and a recurring engagement have different coverage; the proposal confirms the activities, responsibilities and schedule included.</p>
      </div>
    </>
  );
}
