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
      <h3 id="assessment-scope-title">Your agreed testing scope</h3>
      <ol className="assessment-scope-nodes">
        {components.map((component, index) => (
          <li key={component.title} style={{ '--scope-delay': `${index * 3 - 12}s` }}>
            <span className="assessment-scope-icon" aria-hidden="true"><Icon name={component.icon} size={22} /></span>
            <h4>{component.title}</h4>
            <p>{component.detail}</p>
          </li>
        ))}
      </ol>
      <p className="assessment-scope-flow">Agree scope <span aria-hidden="true">→</span> Assess <span aria-hidden="true">→</span> Support remediation <span aria-hidden="true">→</span> Retest <span aria-hidden="true">→</span> Report</p>
    </div>
  );
}
