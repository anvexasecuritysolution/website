import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import PipelineRing from '../components/PipelineRing.jsx';
import Dashboard from '../components/Dashboard.jsx';
import { SECURITY_DOMAINS } from '../data/positioning.js';
import { FRAMEWORKS, ENGAGE, GAP_CARDS } from '../data/content.js';

const enquiries = [
  { plan: 'land', need: 'Before a launch, customer security review or first assessment.', label: 'Discuss an assessment' },
  { plan: 'retain', need: 'When releases and infrastructure changes need regular security checks.', label: 'Discuss ongoing security' },
  { plan: 'expand', need: 'When you need monitoring advice or want to establish incident support arrangements.', label: 'Discuss response requirements' },
];

const engagement = [
  { title: 'Agree scope and safeguards', text: 'We identify the applications, APIs, servers or network assets to assess. Before testing, we agree written authorisation, access, the testing window, exclusions and stop conditions.' },
  { title: 'Assess and validate the risks', text: 'Testing combines discovery and technical checks with validation appropriate to the scope. For applications and APIs, this includes permissions and business workflows; infrastructure work checks exposure and configuration.' },
  { title: 'Help your team remediate', text: 'We explain the findings to your developers or IT team, recommend fixes and track actions. Where a fix needs more time, we document agreed interim safeguards.' },
  { title: 'Retest and hand over the evidence', text: 'We check the agreed fixes, record any remaining issues and hand over the results. Recurring monitoring or reassessment can be scoped separately.' },
];

const applications = [
  { icon: 'building', title: 'Business websites & CMS', examples: 'Company websites, content platforms and public enquiry forms', focus: 'Admin access, form security, exposed information and configuration weaknesses.' },
  { icon: 'shield', title: 'SaaS & subscription platforms', examples: 'Multi-tenant products, account dashboards and subscription services', focus: 'Tenant separation, user roles, sign-in flows and access to customer data.' },
  { icon: 'lock', title: 'E-commerce applications', examples: 'Online stores, customer accounts, carts and checkout integrations', focus: 'Order access, pricing logic, account security and payment integration boundaries.' },
  { icon: 'filecheck', title: 'Education & healthcare portals', examples: 'Learning systems, admissions platforms, appointment booking and patient-facing portals', focus: 'Record access, document uploads, session handling and user permissions.' },
  { icon: 'link', title: 'APIs & mobile-app backends', examples: 'REST APIs, backend services and third-party integrations', focus: 'Authentication tokens, object-level access, input validation and exposed endpoints.' },
  { icon: 'search', title: 'ERPs & internal applications', examples: 'HR, finance, inventory, CRM tools and operational dashboards', focus: 'Privilege boundaries, staff access, sensitive records and administrative actions.' },
];

export default function Home() {
  return (
    <>
      <Seo description="Web application, API, server and network security assessments for Indian MSMEs and startups. Anvexa helps prioritise vulnerabilities, guide fixes and verify remediation." />
      <section className="hero">
        <div className="hero-text">
          <div className="hero-badge">Cybersecurity for Indian MSMEs & startups</div>
          <h1>Find and fix risks across your apps, APIs, servers and networks.</h1>
          <p>Anvexa helps growing businesses assess security weaknesses, prioritise the fixes and verify remediation. Get findings your developers can use and a clear summary for business decisions.</p>
          <div className="hero-acts">
            <Link to="/contact?plan=land" className="btn btn-c">Discuss your security scope →</Link>
            <a href="#application-coverage" className="btn btn-ghost">See what we assess</a>
          </div>
        </div>
        <div className="pipeline-visual"><div className="pipeline-ring"><PipelineRing /></div></div>
      </section>

      <section className="wrap home-applications" aria-labelledby="home-applications-title" id="application-coverage">
        <div className="label">What we assess</div>
        <h2 id="home-applications-title">Four connected areas of your business security.</h2>
        <p className="home-section-intro">Start with the systems that matter to your business. We agree which assets, environments and testing activities are included before work begins.</p>
        <div className="security-domain-grid">
          {SECURITY_DOMAINS.map((domain, i) => (
            <Reveal as="article" className="ab security-domain-card" key={domain.title} delay={(i % 2) * 70}>
              <div className="ab-icon"><Icon name={domain.icon} /></div>
              <h3>{domain.title}</h3><p>{domain.text}</p>
            </Reveal>
          ))}
        </div>
        <figure className="scope-figure"><img src="/assessment-scope.svg" width="1080" height="340" loading="lazy" alt="Assessment scope connects web applications, APIs, servers and networks, with testing boundaries agreed before work starts." /><figcaption>Illustrative scope diagram. Your proposal defines the components and access included.</figcaption></figure>
        <div className="application-coverage-examples" aria-labelledby="application-examples-title">
        <h3 id="application-examples-title">Where this applies in your business.</h3>
        <p className="home-section-intro">For IT MSMEs and startups, these systems often hold customer, student, patient or staff data. We scope testing around the applications you use and the access each user should have.</p>
        <div className="home-application-grid">
          {applications.map((application, i) => (
            <Reveal as="article" className="ab home-application-card" key={application.title} delay={(i % 3) * 70}>
              <div className="ab-icon"><Icon name={application.icon} /></div>
              <h3>{application.title}</h3>
              <p>{application.examples}.</p>
              <p className="home-application-focus"><strong>What we check:</strong> {application.focus}</p>
            </Reveal>
          ))}
        </div>
        </div>
        <p className="note">Testing is limited to systems you own or are authorised to have assessed.</p>
        <Link to="/contact?plan=land" className="home-service-link">Discuss your application <span aria-hidden="true">→</span></Link>
      </section>

      <section className="wrap home-process" aria-labelledby="home-process-title" id="security-process">
        <div className="label">What happens next</div>
        <h2 id="home-process-title">From agreed scope to verified fixes.</h2>
        <p className="home-section-intro">You know what will be tested, how findings will be shared and what evidence your team receives. Fix implementation remains with your team unless separately agreed.</p>
        <ol className="home-process-grid">
          {engagement.map((stage, i) => (
            <li key={stage.title}>
              <Reveal className="ab" delay={i * 70}>
                <span className="home-stage-number" aria-hidden="true">0{i + 1}</span>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Link to="/how-it-works" className="home-service-link">Explore the delivery process <span aria-hidden="true">→</span></Link>
      </section>

      <section className="wrap home-services" aria-labelledby="home-services-title" id="choose-support">
        <div className="label">Choose your starting point</div>
        <h2 id="home-services-title">What do you need help with?</h2>
        <p className="home-section-intro">Begin with a focused assessment. Plan recurring checks as your product and infrastructure change, with any monitoring or response coverage confirmed separately.</p>
        <div className="engage-grid">
          {ENGAGE.map((service, i) => (
            <Reveal as="div" key={service.k} className="engage-cell" delay={i * 80}>
              <div className="k">{service.k}</div>
              <h3>{service.title}</h3>
              <p className="home-service-need">{enquiries[i].need}</p>
              <p>{service.text}</p>
              <Link to={`/contact?plan=${enquiries[i].plan}`} className="home-service-link">{enquiries[i].label} <span aria-hidden="true">→</span></Link>
            </Reveal>
          ))}
        </div>
        <div className="home-section-links">
          <Link to="/services">See all services <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="wrap why-now" aria-labelledby="why-now-title">
        <div className="label">Why Now</div>
        <h2 id="why-now-title">A finding needs an owner, a fix and verification.</h2>
        <p className="home-section-intro">An assessment helps you prioritise. Following through on remediation and checking changes makes that work useful beyond the report.</p>
        <aside className="research-context" aria-label="Published security research">
          <div><strong>20%</strong><p>of breaches in Verizon’s 2025 DBIR involved vulnerability exploitation as an initial access vector.</p></div>
          <div><strong>30%</strong><p>of breaches in the same report involved a third party.</p></div>
          <p className="research-source">Source: <a href="https://www.verizon.com/about/news/2025-data-breach-investigations-report" target="_blank" rel="noopener noreferrer">Verizon 2025 DBIR</a>, published 23 April 2025. Global research, not India-only data or Anvexa performance figures.</p>
        </aside>
        <div className="gap-grid">
          {GAP_CARDS.map((card, i) => (
            <Reveal key={card.title} className={`gap-card ${card.kind}`} delay={i * 80}>
              <div className="gap-icon"><Icon name={card.icon} /></div>
              <h3>{card.title}</h3>
              <div className="pb-flow gap-flow" role="list" aria-label={card.title}>
                {card.steps.map((label, j) => (
                  <div className="pb-step" role="listitem" key={label}>
                    <div className={`pb-chip${card.kind === 'solution' ? ' c' : ''}`}>{label}</div>
                    {j < card.steps.length - 1 && <div className="pb-arrow" aria-hidden="true">→</div>}
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap-sm home-frameworks" aria-labelledby="home-frameworks-title" id="compliance-support">
        <h2 id="home-frameworks-title">Support for the frameworks you answer to.</h2>
        <p className="home-section-intro">Security testing and compliance evidence should work together. We connect relevant findings, remediation and verification records to your applicable controls, helping you prepare for audits and customer security reviews.</p>
        <ul className="home-framework-list" aria-label="Supported frameworks">
          {FRAMEWORKS.map((framework) => <li key={framework.name}>{framework.name}</li>)}
        </ul>
        <p className="note">Requirements vary with your sector, licence and the data you handle. <Link to="/about">Rules and frameworks explained <span aria-hidden="true">→</span></Link></p>
      </section>

      <section className="wrap" aria-labelledby="home-dashboard-title">
        <div className="label">Your assessment deliverables</div>
        <h2 id="home-dashboard-title">Useful to your developers. Clear to your decision-makers.</h2>
        <div className="engage-grid">
          <Reveal className="engage-cell"><h3>Management summary</h3><p>Scope, business impact, priorities and remaining risks in language your leadership team can use.</p></Reveal>
          <Reveal className="engage-cell" delay={70}><h3>Technical findings</h3><p>Affected assets, supporting evidence, severity rationale, testing limitations and recommended fixes.</p></Reveal>
          <Reveal className="engage-cell" delay={140}><h3>Verification record</h3><p>Results for agreed retests, with resolved and unresolved findings distinguished. Retest terms are confirmed in the proposal.</p></Reveal>
        </div>
        <p className="home-section-intro"><a href="/sample-security-report.html" target="_blank" rel="noopener noreferrer" className="home-service-link">View an illustrative report format →</a></p>
        <details className="sample-dashboard"><summary>See an illustrative reporting view</summary>
        <Dashboard />
        <p className="note">Illustrative example. Sample figures are for demonstration only.</p>
        </details>
      </section>

      <section className="wrap-sm home-partner" aria-labelledby="partner-summary-title" id="development-support">
        <div>
          <div className="label development-support-label">Development Support Partner</div>
          <h2 id="partner-summary-title">Benkyō Technologies</h2>
          <p>Need development support? Anvexa coordinates web, app and software projects with Benkyō Technologies.</p>
        </div>
        <div className="home-partner-actions"><Link to="/contact?plan=development" className="btn btn-ghost">Discuss development support</Link><Link to="/about">Meet Benkyō Technologies <span aria-hidden="true">→</span></Link></div>
      </section>

      <div className="cta-band">
        <div>
          <h3>Not sure where to start?</h3>
          <p style={{ marginTop: '.5rem' }}>Tell us about your business and we'll help you choose the next step.</p>
        </div>
        <Link to="/contact" className="btn btn-c">Discuss your requirements →</Link>
      </div>
    </>
  );
}
