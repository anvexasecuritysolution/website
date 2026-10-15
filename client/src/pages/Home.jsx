import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import PipelineRing from '../components/PipelineRing.jsx';
import Dashboard from '../components/Dashboard.jsx';
import { FRAMEWORKS, ENGAGE, GAP_CARDS } from '../data/content.js';

const enquiries = [
  { plan: 'land', label: 'Discuss an assessment', outcomes: ['Executive and technical findings', 'Risks ranked by business impact', 'A prioritised remediation roadmap'] },
  { plan: 'retain', label: 'Discuss ongoing security', outcomes: ['Named owners and tracked deadlines', 'Visibility of outstanding risks', 'Evidence organised for audit reviews'] },
  { plan: 'expand', label: 'Discuss response support', outcomes: ['Incident triage and escalation', 'Containment and recovery guidance', 'Leadership and security advisory'] },
];

const engagement = [
  { title: 'Agree the scope', text: 'We learn about your applications, infrastructure and business priorities, then agree what will be tested and the rules of engagement.' },
  { title: 'Understand the risks', text: 'Testing findings are reviewed and ranked so your team can focus on the weaknesses that matter most to your operations.' },
  { title: 'Follow through on fixes', text: 'We work with your team to assign actions, track progress and retest remediated findings before they are closed.' },
  { title: 'Keep the evidence ready', text: 'Reports and verification records support audits and customer reviews. Ongoing engagements add monitoring and regular reassessment.' },
];

export default function Home() {
  return (
    <>
      <Seo description="Anvexa is an Indian cybersecurity company covering asset discovery, VAPT, remediation, compliance, monitoring, incident response and audit evidence in one continuous lifecycle." />
      <section className="hero">
        <div className="hero-text">
          <div className="hero-badge">Cybersecurity for Indian businesses</div>
          <h1>A security report is where the work starts, not where it ends.</h1>
          <p>Find vulnerabilities, verify the fixes and stay prepared for your next audit. We bring VAPT, ongoing monitoring and compliance support together.</p>
          <div className="hero-acts">
            <Link to="/contact" className="btn btn-c">Talk to our team →</Link>
            <Link to="/services" className="btn btn-ghost">Explore services</Link>
          </div>
        </div>
        <div className="pipeline-visual"><div className="pipeline-ring"><PipelineRing /></div></div>
      </section>

      <section className="wrap why-now" aria-labelledby="why-now-title">
        <div className="label">Why Now</div>
        <h2 className="two-line" id="why-now-title"><span>The Problem Isn't a Lack of Security Tools.</span> <span>It's the Gap Between Having Them and Continuously Operating Them.</span></h2>
        <p className="home-section-intro">Organisations are investing more, but many still operate with fragmented visibility, reactive remediation and limited in-house expertise. The operational layer is where we focus.</p>
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

      <section className="wrap home-services" aria-labelledby="home-services-title">
        <div className="label">How we can help</div>
        <h2 id="home-services-title">Start with the support you need.</h2>
        <p className="home-section-intro">Choose a focused assessment, ongoing security operations or specialist response support. We agree the scope around your environment, existing tools and business priorities.</p>
        <div className="engage-grid">
          {ENGAGE.map((service, i) => (
            <Reveal as="div" key={service.k} className="engage-cell" delay={i * 80}>
              <div className="k">{service.k}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul className="home-service-outcomes">{enquiries[i].outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
              <Link to={`/contact?plan=${enquiries[i].plan}`} className="home-service-link">{enquiries[i].label} <span aria-hidden="true">→</span></Link>
            </Reveal>
          ))}
        </div>
        <div className="home-section-links">
          <Link to="/services">See all services <span aria-hidden="true">→</span></Link>
          <Link to="/how-it-works">How an engagement works <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="wrap home-process" aria-labelledby="home-process-title">
        <div className="label">What happens next</div>
        <h2 id="home-process-title">A clear path from the first call to verified fixes.</h2>
        <p className="home-section-intro">You know what we are testing, which actions need attention and what evidence you will receive. Your team stays involved at each stage.</p>
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

      <section className="wrap-sm home-frameworks" aria-labelledby="home-frameworks-title">
        <h2 id="home-frameworks-title">Support for the frameworks you answer to.</h2>
        <p className="home-section-intro">Security testing and compliance evidence should work together. We connect relevant findings, remediation and verification records to your applicable controls, helping you prepare for audits and customer security reviews.</p>
        <ul className="home-framework-list" aria-label="Supported frameworks">
          {FRAMEWORKS.map((framework) => <li key={framework.name}>{framework.name}</li>)}
        </ul>
        <p className="note">Requirements vary with your sector, licence and the data you handle. <Link to="/about">Rules and frameworks explained <span aria-hidden="true">→</span></Link></p>
      </section>

      <section className="wrap" aria-labelledby="home-dashboard-title">
        <div className="label">What you see</div>
        <h2 id="home-dashboard-title">Your priorities and progress, in one view.</h2>
        <p className="home-section-intro">See which issues need an owner, what is being remediated and where evidence needs attention. Technical teams get actionable priorities, while business leaders get a clear view of progress.</p>
        <Dashboard />
        <p className="note">Illustrative example. Sample figures are for demonstration only.</p>
      </section>

      <section className="wrap-sm home-partner" aria-labelledby="partner-summary-title">
        <div>
          <div className="label development-support-label">Development Support Partner</div>
          <h2 id="partner-summary-title">Benkyō Technologies</h2>
          <p>Need a website, app or custom software? Our team coordinates development support with Benkyō Technologies.</p>
          <p>Support covers web and mobile development, SaaS products, AI automation, quality assurance and API integrations. Share your requirements with Anvexa and we will coordinate the next steps.</p>
        </div>
        <Link to="/about" className="btn btn-ghost">Meet our development partner</Link>
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
