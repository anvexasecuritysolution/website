import { Link, useParams } from 'react-router-dom';
import { SERVICE_PAGES } from '../../shared/service-pages.js';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { Emphasis } from '../components/CopyStyle.jsx';
import NotFound from './NotFound.jsx';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = SERVICE_PAGES.find((entry) => entry.slug === slug);
  if (!service) return <NotFound />;
  return <>
    <Seo />
    <PageHero label="Assessment Services" title={service.title}>
      <p><Emphasis>{service.intro}</Emphasis></p>
      <div className="hero-acts"><Link to="/contact?plan=land" className="btn btn-c">Discuss an Assessment</Link><Link to="/services" className="btn btn-ghost">All Services</Link></div>
    </PageHero>
    <section className="wrap" aria-labelledby="service-coverage-title">
      <div className="label">Testing Coverage</div><h2 id="service-coverage-title">What We Can Assess.</h2>
      <p>We select relevant checks for your systems. Your proposal confirms what is included and what is excluded.</p>
      <div className="security-domain-grid services-assessment-grid">{service.coverage.map((text, i) => <Reveal className="ab" key={text} delay={i * 70}><h3>{service.coverageLabels[i]}</h3><p><Emphasis>{text}</Emphasis></p></Reveal>)}</div>
    </section>
    <section className="wrap" aria-labelledby="service-preparation-title">
      <h2 id="service-preparation-title">Before Testing Starts.</h2>
      <div className="process-responsibilities-grid"><Reveal className="ab"><h3>Access and Preparation</h3><p>{service.access}</p></Reveal><Reveal className="ab" delay={70}><h3>Scope and Limits</h3><p>{service.limits}</p></Reveal></div>
    </section>
    <section className="wrap" aria-labelledby="service-results-title">
      <h2 id="service-results-title">Findings Your Team Can Use.</h2>
      <p><Emphasis>Your agreed deliverables can include a management summary, technical findings with evidence and recommended fixes, and results from agreed retests. The proposal defines testing depth, retest coverage, time limits and any additional fees. Your team implements changes unless implementation support is separately agreed.</Emphasis></p>
      {service.url && <p className="note">Testing is informed by <a href={service.url} target="_blank" rel="noopener noreferrer">{service.reference}</a>. This is a risk reference, not a certification or a complete testing checklist.</p>}
      <div className="home-section-links"><Link to="/how-it-works">How the Assessment Works</Link><Link to="/pricing">Pricing and Scoping</Link><Link to="/services#services-deliverables">Assessment Deliverables</Link></div>
    </section>
  </>;
}
