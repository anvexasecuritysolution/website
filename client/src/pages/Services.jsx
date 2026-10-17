import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import PageHero, { AsideCard } from '../components/PageHero.jsx';
import { STEPS } from '../data/content.js';
import { SECURITY_DOMAINS } from '../data/positioning.js';

export default function Services() {
  return (
    <>
      <Seo title="Services" description="Web application, API, server and network security assessments, with remediation guidance, retesting and separately scoped compliance or ongoing support." />
      <PageHero
        label="Our services"
        title="Security services matched to your priorities."
        aside={<AsideCard title="The lifecycle at a glance" tiles={STEPS.map((s) => ({ k: s.n, label: s.title }))} />}
      >
        <p>Assess the systems your business relies on: web applications, APIs, servers and networks. For Indian MSMEs and startups, we define the testing scope, validate weaknesses and provide guidance your technical team can act on.</p>
      </PageHero>
      <section className="wrap" aria-labelledby="core-services-title"><div className="label">Assessment coverage</div><h2 id="core-services-title">Choose the systems you need assessed.</h2><div className="security-domain-grid services-assessment-grid">{SECURITY_DOMAINS.map((domain) => <Reveal className="ab security-domain-card" key={domain.title}><div className="ab-icon"><Icon name={domain.icon} /></div><h3>{domain.title}</h3><p>{domain.text}</p><p className="domain-outcome"><strong>Your outcome:</strong> {domain.outcome}</p></Reveal>)}</div></section>
      <div className="lifecycle-steps">
        <div className="label">Assessment and follow-up services</div><h2>From identifying risks to verifying improvements.</h2><p className="home-section-intro">The services below explain what each part of an engagement covers. Your proposal confirms which are included. Monitoring and incident support require a separate scope and availability agreement.</p>
        <ol className="step-timeline" style={{ listStyle: 'none' }}>
          {STEPS.map((s) => (
            <li className="step-item" key={s.n} id={`service-${s.n}`}>
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
          <p><strong style={{ color: 'var(--amber)' }}>When should you reassess?</strong> Consider a new review after major releases, infrastructure changes or newly disclosed threats affecting your systems. The schedule for recurring work is agreed separately.</p>
        </div>
      </div>
    </>
  );
}
