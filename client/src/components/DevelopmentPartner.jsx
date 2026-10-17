import { TitleCase, Emphasis } from './CopyStyle.jsx';
import Reveal from './Reveal.jsx';
import { Link } from 'react-router-dom';

const services = [
  'Websites, web apps & mobile apps',
  'Custom software, SaaS & AI automation',
  'UI/UX, QA, API integration & maintenance',
];

export default function DevelopmentPartner() {
  return (
    <section className="wrap partner-section" aria-labelledby="development-partner-title">
      <Reveal className="ab partner-card">
        <div className="label development-support-label">Our Development Support Partner</div>
        <h2 id="development-partner-title"><TitleCase>Benkyō Technologies</TitleCase></h2>
        <p className="partner-description"><Emphasis>Our India-based development partner supports software projects, with enquiries and coordination handled by Anvexa.</Emphasis></p>
        <div className="partner-profile-grid">
          <div>
            <h3><TitleCase>Services</TitleCase></h3>
            <ul className="partner-service-list">{services.map((service) => <li key={service}>{service}</li>)}</ul>
          </div>
          <div>
            <h3><TitleCase>Leadership</TitleCase></h3>
            <dl className="partner-leaders">
              <Reveal delay={0}><dt>Founder & CEO</dt><dd>Divesh Chaudhary</dd></Reveal>
              <Reveal delay={80}><dt>Co-founder & CTO</dt><dd>Ashu Kumar</dd></Reveal>
              <Reveal delay={160}><dt>Co-founder & CPO</dt><dd>Tanishka Chaudhary</dd></Reveal>
            </dl>
          </div>
        </div>
        <div className="partner-footer">
          <Link to="/contact?plan=development" className="btn btn-c">Discuss Development Support</Link>
        </div>
      </Reveal>
    </section>
  );
}
