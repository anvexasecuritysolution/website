import { Link } from 'react-router-dom';
import { TitleCase, Emphasis } from '../components/CopyStyle.jsx';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import PageHero, { AsideCard } from '../components/PageHero.jsx';
import { STEPS } from '../data/content.js';
import { SERVICE_PAGES } from '../../shared/service-pages.js';
import { SECURITY_DOMAINS } from '../data/positioning.js';

export default function Services() {
  return (
    <>
      <Seo title="Services" description="Web application, API, server and network security assessments, with remediation guidance, retesting and separately scoped compliance or ongoing support." />
      <PageHero
        label="Our services"
        title="Security services matched to your priorities."
        aside={<AsideCard title="The Lifecycle at a Glance" tiles={STEPS.map((s) => ({ k: s.n, label: s.title }))} />}
      >
        <p><Emphasis>Assess the systems your business relies on: web applications, APIs, servers and networks. For Indian MSMEs and startups, we define the testing scope, validate weaknesses and provide guidance your technical team can act on.</Emphasis></p>
        <div className="hero-acts">
          <Link to="/contact?plan=land" className="btn btn-c">Discuss an Assessment</Link>
          <a href="#assessment-coverage" className="btn btn-ghost">Explore Assessment Coverage</a>
        </div>
      </PageHero>
      <section className="wrap" id="assessment-coverage" aria-labelledby="core-services-title"><div className="label">Core Assessments</div><h2 id="core-services-title"><TitleCase>Choose the systems you need assessed.</TitleCase></h2><div className="security-domain-grid services-assessment-grid">{SECURITY_DOMAINS.map((domain, i) => <Reveal className="ab security-domain-card" key={domain.title}><div className="ab-icon"><Icon name={domain.icon} /></div><h3><TitleCase>{domain.title}</TitleCase></h3><p><Emphasis>{domain.text}</Emphasis></p><p className="domain-outcome"><strong>Your outcome:</strong> {domain.outcome}</p><Link className="home-service-link" to={`/services/${SERVICE_PAGES[i].slug}`}>Explore {domain.title}</Link></Reveal>)}</div></section>
      <div className="lifecycle-steps">
        <div className="label">Delivery and Supporting Work</div>
        <h2><TitleCase>How the Work Fits Together.</TitleCase></h2>
        <p className="home-section-intro">The four assessment areas above define what we test. The activities below explain how we deliver the work and what additional support you can discuss.</p>
        {[{ title: 'Assessment Delivery', text: 'Discovery, testing, fix guidance and retesting are agreed as part of your assessment proposal.', steps: STEPS.slice(0, 4) }, { title: 'Additional Support', text: 'Control mapping and audit preparation are included only where scoped. Monitoring and incident response need a separate agreement covering availability and responsibilities.', steps: STEPS.slice(4) }].map((group) => (
        <section className="services-delivery-group" key={group.title} aria-label={group.title}>
        <div className="services-group-heading"><h3>{group.title}</h3><p>{group.text}</p></div>
        <ol className="services-work-grid" start={Number(group.steps[0].n)}>
          {group.steps.map((s, i) => (
            <li key={s.n} id={`service-${s.n}`}>
              <Reveal className="ab services-work-card" delay={i * 70}>
                <div className="services-work-card-top"><div className="ab-icon"><Icon name={['search', 'shield', 'wrench', 'refresh', 'clipboard', 'radar', 'shieldalert', 'filecheck'][Number(s.n) - 1]} /></div><span className="services-work-number" aria-hidden="true">{s.n}</span></div>
                <h4><TitleCase>{s.title}</TitleCase></h4>
                <p><Emphasis>{s.text}</Emphasis></p>
                <span className={`step-tag ${s.tone}`}>{s.tag}</span>
              </Reveal>
            </li>
          ))}
        </ol>
        </section>
        ))}
        <div className="reassess">
          <Icon name="refresh" size={24} />
          <p><strong style={{ color: 'var(--amber)' }}>When should you reassess?</strong> Consider a new review after major releases, infrastructure changes or newly disclosed threats affecting your systems. The schedule for recurring work is agreed separately.</p>
        </div>
      </div>
      <section className="wrap" id="services-deliverables" aria-labelledby="services-deliverables-title">
        <div className="label">Your Deliverables</div>
        <h2 id="services-deliverables-title"><TitleCase>What Your Team Receives.</TitleCase></h2>
        <p className="home-section-intro">Your proposal confirms the reports and follow-up included. Depending on the scope, these cover:</p>
        <div className="security-domain-grid services-assessment-grid">
          {[
            { title: 'Management Summary', text: 'The main risks, business impact and priorities for your decision-makers.' },
            { title: 'Technical Findings', text: 'Evidence of the weaknesses found, affected systems and recommended fixes for your technical team.' },
            { title: 'Retest Results', text: 'The outcome of agreed fix checks, including unresolved findings and any testing limits.' },
            { title: 'Control Mapping', text: 'Where included, a record linking relevant findings and evidence to the framework controls in scope.' },
          ].map((item, i) => <Reveal className="ab security-domain-card" key={item.title} delay={i * 70}><h3>{item.title}</h3><p><Emphasis>{item.text}</Emphasis></p></Reveal>)}
        </div>
      </section>
      <section className="wrap" aria-labelledby="testing-references-title">
        <div className="label">Testing References</div>
        <h2 id="testing-references-title"><TitleCase>Recognised Guidance, Applied to Your Scope.</TitleCase></h2>
        <div className="engage-grid">
          <Reveal className="engage-cell"><h3><TitleCase>OWASP Top 10:2025</TitleCase></h3><a className="services-reference-link" href="https://top10.owasp.org/2025/" target="_blank" rel="noopener noreferrer">Read the Official Guide</a><p><Emphasis>A reference for major web application risks. We use it to identify relevant risk areas, such as access control and configuration, when planning your assessment.</Emphasis></p></Reveal>
          <Reveal className="engage-cell" delay={70}><h3><TitleCase>OWASP API Security Top 10:2023</TitleCase></h3><a className="services-reference-link" href="https://api-security.owasp.org/editions/2023/en/0x03-introduction/" target="_blank" rel="noopener noreferrer">Read the Official Guide</a><p><Emphasis>API-specific risks. We use it to plan checks around who can access records, how users authenticate and how endpoints can be misused.</Emphasis></p></Reveal>
          <Reveal className="engage-cell" delay={140}><h3><TitleCase>OWASP Testing Guide (WSTG)</TitleCase></h3><a className="services-reference-link" href="https://owasp.org/projects/web-security-testing-guide" target="_blank" rel="noopener noreferrer">Read the Official Guide</a><p><Emphasis>Test guidance we use to structure relevant checks, including session handling, input validation and business workflows.</Emphasis></p></Reveal>
        </div>
        <p className="note"><Emphasis>The Top 10 lists are risk-awareness references, not complete testing checklists or certifications. Your proposal defines the checks, access and testing depth included.</Emphasis></p>
        <p className="note">For regulatory and audit preparation support, see <Link to="/about#frameworks">Frameworks and Technical Readiness</Link>.</p>
      </section>
    </>
  );
}
