export const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export const FRAMEWORKS = [
  { name: 'CERT-In', text: "India's national cyber agency requires reporting incidents within six hours and retaining system logs for 180 days. We map your logging, monitoring and response processes to these directions." },
  { name: 'DPDP Act 2023', text: "India's data protection law sets duties for consent, purpose limitation, security safeguards and breach notification. We map technical safeguards and evidence to these obligations so accountability is demonstrable." },
  { name: 'ISO 27001', text: 'The international standard for an information security management system, built on risk assessment and Annex A controls. We link findings and fixes to controls and keep certification evidence ready.' },
  { name: 'SOC 2', text: 'An independent attestation of security, availability, confidentiality, processing integrity and privacy controls, often demanded by enterprise customers. We collect continuous, timestamped evidence to support Type II audits.' },
  { name: 'PCI DSS', text: 'The global standard for organisations that store, process or transmit payment card data, covering secure networks, access control, testing and monitoring. We map scans, fixes and evidence to its requirements.' },
  { name: 'SEBI / RBI / IRDAI', text: 'Sector regulators impose cybersecurity frameworks on financial firms covering governance, audits, incident reporting and third-party risk. We align controls and evidence to whichever mandates apply to your regulated business.' },
];

export const GAP_CARDS = [
  { kind: 'problem', icon: 'alert', title: 'Traditional approach', text: 'VAPT report → spreadsheet → email → manual remediation → audit scramble → repeat.' },
  { kind: 'solution', icon: 'link', title: 'The Anvexa approach', text: 'Finding → named owner → firm deadline → guided fix → automatic re-test → audit-ready evidence → continuous monitoring.' },
];

export const ENGAGE = [
  { k: 'ASSESS · ONE-TIME', title: 'Security Assessment', text: 'Asset discovery, VAPT / vulnerability assessment, risk report and a compliance gap assessment.' },
  { k: 'OPERATE · MONTHLY', title: 'Continuous Security', text: 'Continuous monitoring, remediation tracking, compliance evidence, monthly reporting and quarterly reassessment.' },
  { k: 'RESPOND · PREMIUM', title: 'Managed MDR & Advisory', text: '24×7 MDR options, incident response, threat hunting and vCISO / advisory.' },
];

export const ABOUT_BLOCKS = [
  { n: '01', icon: 'search', title: 'Discover', text: 'Build an evolving inventory of applications, endpoints, cloud resources, identities and internet-facing assets.' },
  { n: '02', icon: 'shield', title: 'Assess', text: 'Vulnerability assessment, VAPT and configuration checks with business-risk prioritisation.' },
  { n: '03', icon: 'wrench', title: 'Fix', text: 'Turn findings into assigned remediation tasks with owners, deadlines and escalation.' },
  { n: '04', icon: 'filecheck', title: 'Comply', text: 'Map relevant requirements and controls to technical evidence instead of maintaining disconnected checklists.' },
  { n: '05', icon: 'radar', title: 'Monitor', text: 'Continuously watch logs, identity, endpoints and critical systems for meaningful changes and threats.' },
  { n: '06', icon: 'vault', title: 'Prove', text: 'Maintain timestamped evidence, security posture reports and audit-ready packs throughout the year.' },
];

export const REGULATIONS = [
  { icon: 'landmark', title: 'CERT-In', text: 'Incident reporting and security/log obligations where applicable' },
  { icon: 'lock', title: 'DPDP 2023', text: 'Personal-data protection obligations with phased enforcement' },
  { icon: 'building', title: 'Sector Regulations', text: 'SEBI / RBI / IRDAI / PFRDA requirements where applicable' },
  { icon: 'badge', title: 'Commercial Standards', text: 'ISO 27001 / SOC 2 / PCI DSS — increasingly required by enterprise customers' },
  { icon: 'megaphone', title: 'CERT-In Baseline Controls', text: 'A minimum set of cyber defense practices to measure your posture against' },
];

// Lifecycle: tone drives colour (c = cyan, a = amber)
export const STEPS = [
  { n: '01', tone: 'c', title: 'Asset Discovery', tag: 'Discover', text: 'Know what exists before trying to protect it.' },
  { n: '02', tone: 'c', title: 'VAPT & Risk', tag: 'Assess', text: 'Find weaknesses and prioritise what matters to the business.' },
  { n: '03', tone: 'a', title: 'Remediation', tag: 'Fix', text: 'Assign, track and escalate every meaningful finding.' },
  { n: '04', tone: 'a', title: 'Retest', tag: 'Verify', text: "Don't mark a vulnerability closed until the evidence says it is." },
  { n: '05', tone: 'c', title: 'Control Mapping', tag: 'Comply', text: 'Connect requirements to controls, owners and evidence.' },
  { n: '06', tone: 'c', title: 'Continuous Watch', tag: 'Monitor', text: 'Detect risky changes, suspicious activity and control drift.' },
  { n: '07', tone: 'a', title: 'Incident Response', tag: 'Respond', text: 'Triage, escalate, contain and document when something happens.' },
  { n: '08', tone: 'a', title: 'Evidence & Audit', tag: 'Prove', text: 'Keep proof ready throughout the year — not just before an audit.' },
];

// Ring nodes on the home hero — order matches STEPS
export const RING_NODES = [
  { label: 'Asset Discovery', tone: 'c' },
  { label: 'VAPT & Risk', tone: 'c' },
  { label: 'Remediation', tone: 'a' },
  { label: 'Retest', tone: 'a' },
  { label: 'Control Mapping', tone: 'c' },
  { label: 'Continuous Watch', tone: 'c' },
  { label: 'Incident Response', tone: 'a' },
  { label: 'Evidence & Audit', tone: 'a' },
];

export const FLOW = [
  ['Requirement'], ['Control'], ['Evidence', true], ['Monitoring'], ['Violation', true], ['Remediation'], ['Verification', true],
];

export const PHASES = [
  { n: 'Stage 1', time: 'Discover', items: ['Scoping call and environment walkthrough', 'Asset inventory and attack-surface mapping', 'Agreed scope and rules of engagement', 'Defined success criteria'] },
  { n: 'Stage 2', time: 'Assess', items: ['Vulnerability scanning and penetration testing', 'Risk ranking by business impact', 'Executive and technical reporting', 'Prioritised remediation roadmap'] },
  { n: 'Stage 3', time: 'Remediate', items: ['Findings converted to tracked tasks', 'Owners and deadlines assigned', 'Patch verification and re-test', 'Controls mapped to applicable frameworks'] },
  { n: 'Stage 4', time: 'Assure', items: ['Continuous monitoring and alerting', 'Monthly compliance evidence', 'Quarterly reassessment', 'Audit-ready evidence vault'] },
];

export const TIERS = [
  { badge: 'land', name: 'ASSESS', title: 'Security Assessment', type: 'One-time', price: 'Custom', unit: '/ project', cta: 'Get a Quote', ctaClass: 'btn-ghost',
    features: ['Asset discovery', 'VAPT / vulnerability assessment', 'Risk report', 'Compliance gap assessment'] },
  { badge: 'retain', name: 'OPERATE', title: 'Continuous Security', type: 'Monthly', price: 'On request', unit: '/ mo', cta: 'Start Protecting', ctaClass: 'btn-a', featured: true,
    features: ['Continuous monitoring', 'Remediation tracking', 'Compliance evidence', 'Monthly security reporting', 'Quarterly reassessment'] },
  { badge: 'expand', name: 'RESPOND', title: 'Managed MDR & Advisory', type: 'Premium', price: 'On request', unit: '/ mo', cta: 'Talk to Us', ctaClass: 'btn-ghost',
    features: ['24×7 MDR options', 'Incident response', 'Threat hunting', 'vCISO / advisory'] },
];

export const INDUSTRIES = ['Fintech / BFSI', 'Healthcare / Pharma', 'E-commerce / Retail', 'Manufacturing / Logistics', 'IT / SaaS', 'Other'];
export const SERVICES = [
  'Security Assessment (VAPT & Risk)',
  'Continuous Security Operations',
  'Managed MDR + Incident Response',
  'Not sure — need a consultation',
];

// Social profiles — paste each profile URL into `url` once the pages exist.
// While `url` is empty the icon is shown but does not navigate anywhere.
export const SOCIALS = [
  { name: 'instagram', label: 'Instagram', url: '' },
  { name: 'linkedin', label: 'LinkedIn', url: '' },
  { name: 'x', label: 'X', url: '' },
];

export const CONTACT = {
  email: 'anvexasecuritysolution@gmail.com',
  phone: '+91 78359 47340',
  address: 'A Block, Sector 63, Noida, Uttar Pradesh 201309',
};

export const METRICS = [
  { label: 'Security posture', value: 84, tone: 'c' },
  { label: 'Compliance evidence', value: 91, tone: 'g' },
  { label: 'MFA coverage', value: 97, tone: 'v' },
  { label: 'Critical risks closed', value: 78, tone: 'a' },
];

export const ACTIONS = [
  { issue: 'Admin MFA missing', owner: 'IT', status: 'Due today', tone: 'a' },
  { issue: 'Critical patch', owner: 'Infra', status: 'In progress', tone: 'c' },
  { issue: 'Evidence renewal', owner: 'GRC', status: 'Auto-collected', tone: 'g' },
  { issue: 'New cloud asset', owner: 'Security', status: 'Investigating', tone: 'v' },
];

export const RETENTION = [
  { icon: 'refresh', title: 'Continuous', text: 'New assets, vulnerabilities and control changes are continuously brought into the security loop.' },
  { icon: 'badge', title: 'Provable', text: 'Security work produces evidence, not just recommendations — making audits and customer questionnaires easier.' },
  { icon: 'zap', title: 'Actionable', text: 'Customers receive prioritised actions rather than a flood of low-value alerts.' },
];
