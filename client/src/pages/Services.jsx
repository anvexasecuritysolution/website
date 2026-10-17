import { TitleCase, Emphasis } from '../components/CopyStyle.jsx';
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
        <p><Emphasis>Assess the systems your business relies on: web applications, APIs, servers and networks. For Indian MSMEs and startups, we define the testing scope, validate weaknesses and provide guidance your technical team can act on.</Emphasis></p>
      </PageHero>
      <section className="wrap" aria-labelledby="core-services-title"><div className="label">Assessment coverage</div><h2 id="core-services-title"><TitleCase>Choose the systems you need assessed.</TitleCase></h2><div className="security-domain-grid services-assessment-grid">{SECURITY_DOMAINS.map((domain) => <Reveal className="ab security-domain-card" key={domain.title}><div className="ab-icon"><Icon name={domain.icon} /></div><h3><TitleCase>{domain.title}</TitleCase></h3><p><Emphasis>{domain.text}</Emphasis></p><p className="domain-outcome"><strong>Your outcome:</strong> {domain.outcome}</p></Reveal>)}</div></section>
      <section className="wrap" aria-labelledby="testing-references-title">
        <div className="label">Testing References</div>
        <h2 id="testing-references-title"><TitleCase>Recognised Guidance, Applied to Your Scope.</TitleCase></h2>
        <div className="engage-grid">
          <Reveal className="engage-cell"><h3><TitleCase>OWASP Top 10:2025</TitleCase></h3><p><Emphasis>A reference for major web application risks, including broken access control, injection and security misconfiguration.</Emphasis></p></Reveal>
          <Reveal className="engage-cell" delay={70}><h3><TitleCase>OWASP API Security Top 10:2023</TitleCase></h3><p><Emphasis>API-specific risks, including broken object-level authorisation, broken authentication and unrestricted resource consumption.</Emphasis></p></Reveal>
          <Reveal className="engage-cell" delay={140}><h3><TitleCase>OWASP Testing Guide (WSTG)</TitleCase></h3><p><Emphasis>Structured guidance for planning web application checks, such as session handling, input validation and business logic testing.</Emphasis></p></Reveal>
        </div>
        <p className="note"><Emphasis>The Top 10 lists are risk-awareness references, not complete testing checklists or certifications. Your proposal defines the checks, access and testing depth included.</Emphasis></p>
      </section>
      <div className="lifecycle-steps">
        <div className="label">Assessment and follow-up services</div><h2><TitleCase>From identifying risks to verifying improvements.</TitleCase></h2><p className="home-section-intro"><Emphasis>The services below explain what each part of an engagement covers. Your proposal confirms which are included. Monitoring and incident support require a separate scope and availability agreement.</Emphasis></p>
        <ol className="step-timeline" style={{ listStyle: 'none' }}>
          {STEPS.map((s) => (
            <li className="step-item" key={s.n} id={`service-${s.n}`}>
              <div className="step-num-wrap"><div className={`step-num ${s.tone === 'a' ? 'amber-n' : 'cyan-n'}`}>{s.n}</div></div>
              <Reveal className="step-body">
                <h3><TitleCase>{s.title}</TitleCase></h3>
                <p><Emphasis>{s.text}</Emphasis></p>
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
