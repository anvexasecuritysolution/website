import { TitleCase, titleCase, Emphasis } from '../components/CopyStyle.jsx';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import PipelineRing from '../components/PipelineRing.jsx';
import AssessmentScope from '../components/AssessmentScope.jsx';
import { SERVICE_PAGES } from '../../shared/service-pages.js';
import { SECURITY_DOMAINS } from '../data/positioning.js';
import { ENGAGE } from '../data/content.js';

const enquiries = [
  { plan: 'land', need: 'Before a launch, customer security review or first assessment.', label: 'Discuss an assessment' },
  { plan: 'retain', need: 'When releases and infrastructure changes need regular security checks.', label: 'Discuss ongoing security' },
  { plan: 'expand', need: 'When you need monitoring advice or want to establish incident support arrangements.', label: 'Discuss response requirements' },
];

const engagement = [
  { title: 'Agree the Scope', icon: 'filecheck', text: 'Confirm the systems, access, testing window and written authorisation before work starts.' },
  { title: 'Validate the Risks', icon: 'shield', text: 'Check for weaknesses and explain their impact with evidence and clear priorities.' },
  { title: 'Guide the Fixes', icon: 'wrench', text: 'Walk your developers or IT team through recommended fixes and agreed actions.' },
  { title: 'Verify the Results', icon: 'refresh', text: 'Retest agreed fixes and record resolved findings, remaining risks and limitations.' },
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
          <div className="hero-badge">Cybersecurity for Indian MSMEs & Startups</div>
          <h1><TitleCase>Find Security Gaps. Fix What Matters.</TitleCase></h1>
          <p><Emphasis><strong>Web Application, API, Server and Network Security Assessments</strong> for Indian MSMEs and startups. Find out where your systems are exposed, what to fix first and whether the agreed fixes work.</Emphasis></p>
          <div className="hero-acts">
            <Link to="/contact?plan=land" className="btn btn-c">Discuss an Assessment →</Link>
            <Link to="/services" className="home-hero-secondary">Explore Our Services <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="pipeline-visual"><div className="pipeline-ring"><PipelineRing /></div></div>
      </section>

      <section className="wrap-sm home-identity" aria-labelledby="who-we-are-title">
        <div>
          <div className="label">Meet Anvexa</div>
          <h2 id="who-we-are-title">Who We Are</h2>
        </div>
        <div>
          <p className="home-company-intro"><Emphasis>Based in Noida, <strong>Anvexa Security Solutions</strong> helps <strong>Indian MSMEs and Startups</strong> find security weaknesses across web applications, APIs, servers and networks. We turn <strong>Technical Findings</strong> into <strong>Clear Priorities, Practical Fix Guidance and Agreed Retests</strong>, helping your team address real risks.</Emphasis></p>
          <div className="home-section-links"><Link to="/about" className="company-action-button">More About Anvexa <span aria-hidden="true">→</span></Link><Link to="/team" className="company-action-button">Meet the Team <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="wrap home-applications" aria-labelledby="home-applications-title" id="application-coverage">
        <div className="label">Our Expertise</div>
        <h2 id="home-applications-title"><TitleCase>Proactive Testing. Practical Protection.</TitleCase></h2>
        <p className="home-section-intro"><Emphasis>Tell us what you need tested. We’ll agree the systems, access requirements and testing window before work begins.</Emphasis></p>
        <div className="security-domain-grid home-assessment-grid">
          {SECURITY_DOMAINS.map((domain, i) => (
            <Reveal as="article" className="ab security-domain-card" key={domain.title} delay={(i % 2) * 70}>
              <div className="ab-icon"><Icon name={domain.icon} /></div>
              <h3><TitleCase>{titleCase(domain.title)}</TitleCase></h3><p><Emphasis>{domain.text}</Emphasis></p><Link className="home-service-link" to={`/services/${SERVICE_PAGES[i].slug}`}>Explore {domain.title}</Link>
            </Reveal>
          ))}
        </div>
        <figure className="scope-figure"><AssessmentScope /><figcaption>Illustrative scope diagram. Your proposal defines the components and access included.</figcaption></figure>
        <div className="application-coverage-examples" aria-labelledby="application-examples-title">
        <h3 id="application-examples-title"><TitleCase>Where This Applies in Your Business.</TitleCase></h3>
        <p className="home-section-intro"><Emphasis>Examples include customer-facing products, systems handling personal data and internal business tools.</Emphasis></p>
        <div className="home-application-grid">
          {applications.map((application, i) => (
            <Reveal as="article" className="ab home-application-card" key={application.title} delay={(i % 3) * 70}>
              <div className="ab-icon"><Icon name={application.icon} /></div>
              <h3><TitleCase>{titleCase(application.title)}</TitleCase></h3>
              <p><Emphasis>{application.examples}.</Emphasis></p>
            </Reveal>
          ))}
        </div>
        </div>
        <p className="note"><Emphasis>Testing is limited to systems you own or are authorised to have assessed.</Emphasis></p>
        <Link to="/contact?plan=land" className="home-service-link">Discuss an Assessment <span aria-hidden="true">→</span></Link>
      </section>

      <section className="wrap home-process" aria-labelledby="home-process-title" id="security-process">
        <div className="label">Our Approach</div>
        <h2 id="home-process-title"><TitleCase>Identify. Assess. Fix. Verify.</TitleCase></h2>
        <p className="home-section-intro"><Emphasis>Four steps from your first discussion to the final retest. Your team implements fixes unless agreed otherwise.</Emphasis></p>
        <ol className="home-process-grid">
          {engagement.map((stage, i) => (
            <li key={stage.title}>
              <Reveal className="ab" delay={i * 70}>
                <div className="home-stage-header" aria-hidden="true">
                  <div className="ab-icon"><Icon name={stage.icon} /></div>
                  <span className="home-stage-number">0{i + 1}</span>
                </div>
                <h3><TitleCase>{titleCase(stage.title)}</TitleCase></h3>
                <p><Emphasis>{stage.text}</Emphasis></p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Link to="/how-it-works" className="home-service-link">Explore the delivery process <span aria-hidden="true">→</span></Link>
      </section>

      <section className="wrap home-services" aria-labelledby="home-services-title" id="choose-support">
        <div className="label">Our Services</div>
        <h2 id="home-services-title"><TitleCase>Choose the Support You Need.</TitleCase></h2>
        <p className="home-section-intro"><Emphasis>Begin with a <strong>focused assessment</strong>. Plan recurring checks as your product and infrastructure change, with any <strong>monitoring or response coverage confirmed separately</strong>.</Emphasis></p>
        <div className="engage-grid">
          {ENGAGE.map((service, i) => (
            <Reveal as="div" key={service.k} className="engage-cell" delay={i * 80}>
              <div className="k">{service.k}</div>
              <h3><TitleCase>{titleCase(service.title)}</TitleCase></h3>
              <p className="home-service-need"><Emphasis>{enquiries[i].need}</Emphasis></p>
              <Link to={`/contact?plan=${enquiries[i].plan}`} className="home-service-link">{enquiries[i].plan === 'land' ? 'Discuss an Assessment' : enquiries[i].label} <span aria-hidden="true">→</span></Link>
            </Reveal>
          ))}
        </div>
        <div className="home-section-links">
          <Link to="/services">See all services <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="wrap why-now" aria-labelledby="why-now-title">
        <div className="label">Why Choose Us?</div>
        <h2 id="why-now-title">Why Anvexa?</h2>
        <p className="home-section-intro"><Emphasis>Finding a weakness is only the start. We help your team <strong>understand the risk, plan the fix and verify the result</strong>.</Emphasis></p>
        <ul className="home-reasons">
          <li><strong>Clear Commitments</strong><p>The scope, access, deliverables and retest terms are agreed before testing starts.</p></li>
          <li><strong>Practical Fix Guidance</strong><p>Your developers or IT team get evidence and recommendations they can act on.</p></li>
          <li><strong>Verified Results</strong><p>Agreed fixes are retested, with remaining issues and testing limitations recorded.</p></li>
        </ul>
        <Link to="/how-it-works#delivery-comparison-title" className="home-service-link">See How We Follow Through <span aria-hidden="true">→</span></Link>
      </section>

      <div className="wrap-sm" id="compliance-support"><p><Emphasis>Preparing for an audit or customer security review? We support technical readiness and evidence mapping. This is <strong>not formal certification, attestation or an accredited audit</strong>. <Link to="/about#frameworks" className="home-service-link">Explore Frameworks &amp; Technical Readiness <span aria-hidden="true">→</span></Link></Emphasis></p></div>

      <section className="wrap" aria-labelledby="home-dashboard-title">
        <div className="label">Your assessment deliverables</div>
        <h2 id="home-dashboard-title"><TitleCase>Useful to Your Developers. Clear to Your Decision-Makers.</TitleCase></h2>
        <div className="engage-grid">
          <Reveal className="engage-cell"><h3><TitleCase>Management Summary</TitleCase></h3><p><Emphasis>Scope, <strong>business impact</strong>, priorities and remaining risks in language your leadership team can use.</Emphasis></p></Reveal>
          <Reveal className="engage-cell" delay={70}><h3><TitleCase>Technical Findings</TitleCase></h3><p><Emphasis>What we found, where we found it, <strong>why it matters</strong> and <strong>how your team can fix it</strong>. We include evidence and explain what we could not test.</Emphasis></p></Reveal>
          <Reveal className="engage-cell" delay={140}><h3><TitleCase>Verification Record</TitleCase></h3><p><Emphasis>Results for agreed retests, with <strong>resolved and unresolved findings</strong> distinguished. Retest terms are confirmed in the proposal.</Emphasis></p></Reveal>
        </div>
        <p className="home-section-intro"><Emphasis><a href="/sample-security-report.html" target="_blank" rel="noopener noreferrer" className="home-service-link">View an Illustrative Report Format →</a></Emphasis></p>
        <p className="note">This is a sample format, not a completed client assessment.</p>
      </section>

      <section className="wrap-sm home-partner" aria-labelledby="partner-summary-title" id="development-support">
        <div>
          <div className="label development-support-label">Development Support Partner</div>
          <h2 id="partner-summary-title"><TitleCase>Benkyō Technologies</TitleCase></h2>
          <p><Emphasis>Need development support? <strong>Anvexa coordinates</strong> web, app and software projects with Benkyō Technologies.</Emphasis></p>
        </div>
        <div className="home-partner-actions"><Link to="/contact?plan=development" className="btn btn-ghost">Discuss development support</Link><Link to="/about">Meet Benkyō Technologies <span aria-hidden="true">→</span></Link></div>
      </section>

      <div className="cta-band">
        <div>
          <h3><TitleCase>Planning a Security Assessment?</TitleCase></h3>
          <p style={{ marginTop: '.5rem' }}><Emphasis>Tell us what you run and what concerns you. We’ll discuss what needs testing and send you a proposal with the scope and fees.</Emphasis></p>
        </div>
        <Link to="/contact?plan=land" className="btn btn-c">Discuss an Assessment →</Link>
      </div>
    </>
  );
}
