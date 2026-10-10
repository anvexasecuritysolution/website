import Reveal from './Reveal.jsx';
import { Link } from 'react-router-dom';

const services = [
  'Website & Web Application Development',
  'Android & iOS App Development',
  'Custom Software & SaaS Development',
  'AI Solutions & Business Automation',
  'Manual & Automation Testing (QA)',
  'UI/UX Design & Product Development',
  'API Integration, Maintenance & Support',
];

export default function DevelopmentPartner() {
  return (
    <section className="wrap partner-section" aria-labelledby="development-partner-title">
      <Reveal className="ab partner-card">
        <div className="label">Our development support partner</div>
        <h2 id="development-partner-title">Benkyō Technologies</h2>
        <p className="partner-tagline">Build Smarter. Grow Faster. Go Digital.</p>
        <p className="partner-description">Benkyō Technologies is our partner for development-related support. This India-based IT company focuses on software development, digital transformation and AI-powered solutions, helping startups and businesses build scalable digital products and streamline operations.</p>
        <div className="partner-profile-grid">
          <div>
            <h3>Services</h3>
            <ul className="partner-service-list">{services.map((service) => <li key={service}>{service}</li>)}</ul>
          </div>
          <div>
            <h3>Leadership</h3>
            <dl className="partner-leaders">
              <Reveal delay={0}><dt>Founder & CEO</dt><dd>Divesh Chaudhary</dd></Reveal>
              <Reveal delay={80}><dt>Co-founder & CTO</dt><dd>Ashu Kumar</dd></Reveal>
              <Reveal delay={160}><dt>Co-founder & CPO</dt><dd>Tanishka Chaudhary</dd></Reveal>
            </dl>
            <h3 className="partner-focus-heading">Product focus</h3>
            <p className="partner-focus">Their products include Kiroku, a smart attendance and leave management solution. They are also exploring AI-powered hospital management solutions.</p>
          </div>
        </div>
        <div className="partner-footer">
          <p>Benkyō aims to deliver reliable, user-friendly and business-focused technology solutions tailored to clients’ needs. Contact our team to arrange development support.</p>
          <Link to="/contact?plan=development" className="btn btn-c">Discuss development support</Link>
        </div>
      </Reveal>
    </section>
  );
}
