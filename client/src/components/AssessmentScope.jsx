import { TitleCase, Emphasis } from './CopyStyle.jsx';
import Icon from './Icon.jsx';

const components = [
  { title: 'Web application', detail: 'User journeys & roles', icon: 'shield' },
  { title: 'API', detail: 'Access & data exposure', icon: 'link' },
  { title: 'Servers', detail: 'Services & configuration', icon: 'building' },
  { title: 'Network', detail: 'Exposure & access boundaries', icon: 'radar' },
];

export default function AssessmentScope() {
  return (
    <div className="assessment-scope" role="group" aria-labelledby="assessment-scope-title">
      <svg className="assessment-scope-boundary" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none"><rect x=".5" y=".5" width="99" height="99" rx="3" vectorEffect="non-scaling-stroke" /></svg>
      <h3 id="assessment-scope-title"><TitleCase>What We’ll Test Together</TitleCase></h3>
      <ol className="assessment-scope-nodes">
        {components.map((component, index) => (
          <li key={component.title} style={{ '--scope-delay': `${index * 3 - 12}s` }}>
            <span className="assessment-scope-icon" aria-hidden="true"><Icon name={component.icon} size={22} /></span>
            <h4><TitleCase>{component.title}</TitleCase></h4>
            <p><Emphasis>{component.detail}</Emphasis></p>
          </li>
        ))}
      </ol>
      <p className="assessment-scope-flow"><Emphasis>Agree scope <span aria-hidden="true">→</span> Assess <span aria-hidden="true">→</span> Support remediation <span aria-hidden="true">→</span> Retest <span aria-hidden="true">→</span> Report</Emphasis></p>
    </div>
  );
}
