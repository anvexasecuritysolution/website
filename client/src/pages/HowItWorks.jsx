import { Link } from 'react-router-dom';
import { TitleCase, Emphasis } from '../components/CopyStyle.jsx';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import DeliveryComparison from '../components/DeliveryComparison.jsx';
import PageHero, { AsideCard } from '../components/PageHero.jsx';
import { PHASES } from '../data/content.js';

const DELIVERY_FLOW = ['Enquiry', 'Written proposal', 'Authorisation', 'Assessment', 'Remediation', 'Retest', 'Handover'];
const DELIVERY_ICONS = ['mail', 'filecheck', 'lock', 'shield', 'wrench', 'refresh', 'vault'];

export default function HowItWorks() {
  return (
    <>
      <Seo title="How It Works" description="How an Anvexa engagement runs in four stages: discover, assess, support remediation and verify agreed fixes." />
      <PageHero
        label="How we work"
        title="From Security Findings to Verified Fixes."
        aside={<AsideCard title="Your Engagement at a Glance" tiles={[
          { icon: 'search', label: 'Discover' },
          { icon: 'shield', label: 'Assess' },
          { icon: 'wrench', label: 'Remediate' },
          { icon: 'filecheck', label: 'Verify and hand over' },
        ]} />}

      >
        <p><Emphasis>Anvexa helps Indian startups and MSMEs understand their security risks, prioritise fixes and verify remediation. From initial scoping to final handover, you’ll know what is being tested, who is responsible and what happens next.</Emphasis></p>
      </PageHero>
      <section className="wrap" aria-labelledby="testing-safeguards-title">
        <div className="label">Before testing begins</div><h2 id="testing-safeguards-title"><TitleCase>Agree how the work and your information will be handled.</TitleCase></h2>
        <div className="engage-grid">
          <Reveal className="engage-cell"><h3><TitleCase>Authority and scope</TitleCase></h3><p><Emphasis>Confirm which systems you own or have permission to test, including any restrictions from hosting providers or other third parties.</Emphasis></p></Reveal>
          <Reveal className="engage-cell" delay={70}><h3><TitleCase>Operational safeguards</TitleCase></h3><p><Emphasis>Agree when testing can run and when it must stop. Where practical, use staging (a separate test environment) and synthetic data (invented test records). Testing can affect availability, so plan safeguards and backups first.</Emphasis></p></Reveal>
          <Reveal className="engage-cell" delay={140}><h3><TitleCase>Confidentiality and handover</TitleCase></h3><p><Emphasis>Agree who can receive findings, how access and evidence will be shared, how long records are kept and when test access will be removed.</Emphasis></p></Reveal>
        </div>
      </section>

      <section className="process-bottom-bar delivery-journey-bar" aria-labelledby="customer-journey-title">
        <div className="label">Customer Journey</div>
        <h2 id="customer-journey-title">From Your First Enquiry to Handover.</h2>
        <ol className="delivery-journey" aria-label="Customer journey">
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
      </section>

      <section className="wrap" id="delivery-methodology" aria-labelledby="delivery-methodology-title">
        <div className="label">Delivery Methodology</div>
        <h2 id="delivery-methodology-title" style={{ marginBottom: '1rem' }}><TitleCase>What each delivery stage includes.</TitleCase></h2>
        <p className="note process-explainer"><Emphasis>Vulnerability Assessment and Penetration Testing (VAPT) identifies security weaknesses and checks their practical impact within the agreed scope. OWASP guidance helps inform relevant web application and API checks.</Emphasis></p>
        <div className="phases-grid">
          {PHASES.map((p, i) => (
            <Reveal className="phase" key={p.n} delay={i * 70}>
              <div className="phase-num">{p.n}</div>
              <div className="phase-time">{p.time}</div>
              <ul>{p.items.map((it) => <li key={it}><Emphasis>{it}</Emphasis></li>)}</ul>
            </Reveal>
          ))}
        </div>
        <div className="process-coverage-notes">
        <p className="note"><strong>Retest coverage:</strong> Your proposal defines which fixes will be rechecked, the number or extent of retests, the time limits and any additional fees. A retest checks agreed fixes; it is not a new full assessment.</p>
        <p className="note"><strong>Ongoing services:</strong> Scheduled reassessments are periodic security checks. Monitoring reviews agreed security signals, while incident response supports handling an incident. Each needs its own scope; monitoring hours and response availability must be confirmed separately.</p>
        </div>
      </section>
      <section className="wrap" aria-labelledby="responsibilities-title">
        <div className="label">Working Together</div>
        <h2 id="responsibilities-title">Who Does What.</h2>
        <div className="process-responsibilities-grid">
          <Reveal className="ab"><h3>Your Team</h3><ul className="process-responsibility-list"><li>Provides written authorisation and confirms the systems in scope.</li><li>Arranges agreed access, test accounts and a technical contact.</li><li>Implements fixes through your developers or IT team, unless implementation support is separately contracted.</li></ul></Reveal>
          <Reveal className="ab" delay={70}><h3>Anvexa</h3><ul className="process-responsibility-list"><li>Works within the agreed scope, testing window and safeguards.</li><li>Shares findings, supporting evidence and recommended fixes.</li><li>Retests agreed changes within the proposal's retest window and records the results.</li></ul></Reveal>
        </div>
      </section>
      <DeliveryComparison />
      <section className="wrap" id="reporting-example" aria-labelledby="reporting-example-title">
        <div className="label">Reporting Example</div>
        <h2 id="reporting-example-title">An Illustrative View of Findings and Follow-Up.</h2>
        <p className="home-section-intro">The sample below shows how a finding connects the technical evidence to business impact, a recommended fix and the next verification step. Your proposal confirms the reports and format included.</p>
        <article className="ab illustrative-finding" aria-labelledby="sample-finding-title">
          <div className="illustrative-finding-heading"><div><div className="label">Synthetic Example</div><h3 id="sample-finding-title">A User Can Read Another Account's Invoice.</h3></div><span className="step-tag a">Example Severity: High</span></div>
          <p className="note">Invented test accounts and records, not a customer engagement. Severity depends on the exposure and business context.</p>
          <dl className="illustrative-finding-details">
            <div><dt>Evidence</dt><dd>In a test environment, Account A requests <code>/api/invoices/INV-DEMO-B</code>. The API returns an invoice belonging to Account B instead of denying access.</dd></div>
            <div><dt>Business Impact</dt><dd>A signed-in user could read another customer's billing information if the same access-control weakness exists on other invoice records.</dd></div>
            <div><dt>Recommended Fix</dt><dd>Check the user's permission to access each invoice on the server. Apply the check to every invoice endpoint and add tests for cross-account access.</dd></div>
            <div><dt>Retest Status</dt><dd>Not retested in this example. After a fix, check that Account A is denied access to Account B's invoice while authorised access still works.</dd></div>
          </dl>
        </article>
        <p className="note"><Link to="/services#services-deliverables">See What Your Assessment Includes</Link></p>
      </section>
    </>
  );
}
