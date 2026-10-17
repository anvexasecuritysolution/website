import { TitleCase, Emphasis } from '../components/CopyStyle.jsx';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import PageHero, { AsideCard } from '../components/PageHero.jsx';
import { PHASES } from '../data/content.js';

const DELIVERY_FLOW = ['Enquiry', 'Written proposal', 'Authorisation', 'Assessment', 'Remediation', 'Retest', 'Handover'];
const DELIVERY_ICONS = ['mail', 'filecheck', 'lock', 'shield', 'wrench', 'refresh', 'vault'];

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
        <p><Emphasis>We agree the scope, assess the risks, support remediation and document the results. Monitoring, recurring reviews and ongoing assurance are included when they form part of your agreed engagement.</Emphasis></p>
      </PageHero>
      <section className="wrap" aria-labelledby="testing-safeguards-title">
        <div className="label">Before testing begins</div><h2 id="testing-safeguards-title"><TitleCase>Agree how the work and your information will be handled.</TitleCase></h2>
        <div className="engage-grid">
          <Reveal className="engage-cell"><h3><TitleCase>Authority and scope</TitleCase></h3><p><Emphasis>Document asset ownership or testing permission, environments, access, exclusions and third-party constraints. Testing starts within the authorised scope.</Emphasis></p></Reveal>
          <Reveal className="engage-cell" delay={70}><h3><TitleCase>Operational safeguards</TitleCase></h3><p><Emphasis>Agree the testing window, escalation contact and stop conditions. Discuss backups, staging and synthetic data. Testing can affect availability, so safeguards must match the environment.</Emphasis></p></Reveal>
          <Reveal className="engage-cell" delay={140}><h3><TitleCase>Confidentiality and handover</TitleCase></h3><p><Emphasis>Agree confidentiality terms, report recipients, secure access sharing, evidence retention and credential revocation. Confirm the retest window and final deliverables in writing.</Emphasis></p></Reveal>
        </div>
      </section>

      <div className="process-bottom-bar delivery-journey-bar">
        <ol className="delivery-journey" aria-label="Delivery flow">
          {DELIVERY_FLOW.map((label, i) => (
            <li key={label} style={{ '--journey-delay': `${i * 2 - 14}s` }}>
              <span className="delivery-journey-number" aria-hidden="true">
                <Icon name={DELIVERY_ICONS[i]} size={24} />
                <span className="delivery-step-count">{String(i + 1).padStart(2, '0')}</span>
              </span>
              <strong><TitleCase>{label}</TitleCase></strong>
            </li>
          ))}
        </ol>
      </div>

      <div className="wrap">
        <div className="label">The stages</div>
        <h2 style={{ marginBottom: '2rem' }}><TitleCase>What each delivery stage includes.</TitleCase></h2>
        <div className="phases-grid">
          {PHASES.map((p, i) => (
            <Reveal className="phase" key={p.n} delay={i * 70}>
              <div className="phase-num">{p.n}</div>
              <div className="phase-time">{p.time}</div>
              <ul>{p.items.map((it) => <li key={it}><Emphasis>{it}</Emphasis></li>)}</ul>
            </Reveal>
          ))}
        </div>
        <p className="note"><Emphasis>A one-time assessment and a recurring engagement have different coverage; the proposal confirms the activities, responsibilities and schedule included.</Emphasis></p>
      </div>
    </>
  );
}
