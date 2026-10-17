export const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export const FRAMEWORKS = [
  { name: 'CERT-In', text: 'Incident reporting within six hours and 180-day log retention. We assess your logging, monitoring and incident response against these directions.',
    who: 'Most companies with IT systems in India, such as software firms, cloud and hosting providers, SaaS startups and online shops.' },
  { name: 'DPDP Act 2023', text: 'Consent, purpose limitation, security safeguards and breach notification. We map technical controls and evidence to each duty.',
    who: 'Anyone who holds customer or staff data: e-commerce, edtech and health apps, fintechs, clinics, schools, and any app with user sign-up.' },
  { name: 'ISO 27001', text: 'The international standard for an information security management system (ISMS), built on risk assessment and Annex A controls. We map findings and remediation to those controls.',
    who: 'IT and SaaS startups, BPO and outsourcing firms, consultancies, and anyone selling to large or overseas customers.' },
  { name: 'SOC 2', text: 'An independent attestation of your security, availability, confidentiality, processing integrity and privacy controls. We collect timestamped evidence to support Type II audits.',
    who: 'SaaS and cloud startups, software firms with US or global clients, and data, AI, HR and payments tech companies.' },
  { name: 'PCI DSS', text: 'The requirements for anyone who stores, processes or transmits card data. We map scans, remediation and evidence to them.',
    who: 'E-commerce sites, payment apps and gateways, fintech startups, travel and ticketing platforms, and retailers and restaurants that take cards.' },
  { name: 'SEBI / RBI / IRDAI', text: 'Sector cybersecurity frameworks covering governance, audits, incident reporting and third-party risk. We align controls and evidence to the mandates that apply to you.',
    who: 'Banks and NBFCs, payment companies, lending and wealth startups, brokers, investment advisers and insurers.' },
];
export const FRAMEWORKS_NOTE = 'Whether a rule applies to you depends on your size, sector and licence. We check this with you before we start.';

export const GAP_CARDS = [
  { kind: 'problem', icon: 'alert', title: 'Traditional Approach',
    steps: ['VAPT Report', 'Spreadsheet', 'Email', 'Manual Fix', 'Audit Scramble', 'Repeat'] },
  { kind: 'solution', icon: 'link', title: 'The Anvexa Approach',
    steps: ['Finding', 'Risk Ranking', 'Named Owner', 'Agreed Deadline', 'Guided Fix', 'Verified Re-Test', 'Recorded Evidence', 'Scheduled Review'] },
];

export const ENGAGE = [
  { k: 'ASSESS · ONE-TIME', title: 'Security Assessment', text: 'Vulnerability assessment and penetration testing (VAPT) for agreed web applications, APIs, servers or network assets.' },
  { k: 'REVIEW · RECURRING', title: 'Recurring Security Reviews', text: 'Plan reassessment after important releases or infrastructure changes, with remediation follow-up and reporting defined in your proposal.' },
  { k: 'SPECIALIST SUPPORT · BY AGREEMENT', title: 'Response & Advisory Enquiries', text: 'Discuss monitoring, managed detection and response (MDR) or incident support. Availability, coverage hours and escalation terms require written confirmation.' },
];

export const ABOUT_BLOCKS = [
  { n: '01', icon: 'search', title: 'Discover', text: 'We build and maintain an inventory of applications, endpoints, cloud resources, identities and internet-facing assets, so your attack surface is always mapped.' },
  { n: '02', icon: 'shield', title: 'Assess', text: 'Vulnerability assessment, VAPT and configuration reviews, prioritised by business risk and exploitability.' },
  { n: '03', icon: 'wrench', title: 'Fix', text: 'Findings become remediation tasks with owners, deadlines and escalation paths.' },
  { n: '04', icon: 'filecheck', title: 'Comply', text: "We map regulatory requirements and controls to technical evidence, so you don't have to keep separate checklists." },
  { n: '05', icon: 'radar', title: 'Monitor', text: 'We watch logs, identity, endpoints and critical systems for meaningful changes and threats.' },
  { n: '06', icon: 'vault', title: 'Prove', text: 'Timestamped evidence, security posture reports and audit-ready packs build up throughout the year.' },
];

export const REGULATIONS = [
  { icon: 'landmark', title: 'CERT-In', text: 'Incident reporting and log-retention obligations, where they apply' },
  { icon: 'lock', title: 'DPDP 2023', text: 'Personal data protection duties, with phased enforcement' },
  { icon: 'building', title: 'Sector Regulations', text: 'SEBI / RBI / IRDAI / PFRDA requirements, where they apply' },
  { icon: 'badge', title: 'Commercial Standards', text: 'ISO 27001 / SOC 2 / PCI DSS, increasingly required by enterprise customers' },
  { icon: 'megaphone', title: 'CERT-In Baseline Controls', text: 'A minimum set of cyber defence practices to measure your posture against' },
];

// Lifecycle: tone drives colour (c = cyan, a = amber)
export const STEPS = [
  { n: '01', tone: 'c', title: 'Asset Discovery', tag: 'Discover', text: 'Identify authorised applications, endpoints, servers and network assets. Establish an inventory with ownership, exposure and agreed testing boundaries.' },
  { n: '02', tone: 'c', title: 'VAPT & Risk Assessment', tag: 'Assess', text: 'Combine vulnerability checks with validation of agreed attack paths, permissions and configurations. Report evidence, business impact and fix priorities.' },
  { n: '03', tone: 'a', title: 'Remediation Guidance', tag: 'Fix', text: 'Explain recommended fixes to your developers or IT team. Track owners, target dates and interim safeguards; implementation support is agreed separately.' },
  { n: '04', tone: 'a', title: 'Retesting & Verification', tag: 'Verify', text: 'Recheck agreed fixes within the retest window. Record which findings are resolved, which remain open and any limits to verification.' },
  { n: '05', tone: 'c', title: 'Compliance Control Mapping', tag: 'Align', text: 'Link relevant technical findings and evidence to applicable framework controls. Identify gaps for your compliance team or auditor to review.' },
  { n: '06', tone: 'c', title: 'Monitoring Support', tag: 'By agreement', text: 'Discuss the log sources and security signals you need reviewed. Coverage hours, alert handling and escalation must be confirmed before the service starts.' },
  { n: '07', tone: 'a', title: 'Incident Response Support', tag: 'By agreement', text: 'Agree support for triage, containment and recovery, including contacts and responsibilities. Response availability and timings require written confirmation.' },
  { n: '08', tone: 'a', title: 'Evidence & Audit Preparation', tag: 'Document', text: 'Organise assessment reports, remediation actions and retest records for audits and customer reviews. Independent certification or attestation is outside this service.' },
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
  { n: 'Stage 2', time: 'Assess', items: ['VAPT with relevant OWASP web and API risk references', 'Risk ranking by business impact', 'Executive and technical reporting', 'Prioritised remediation roadmap'] },
  { n: 'Stage 3', time: 'Remediate', items: ['Findings converted to tracked tasks', 'Owners and deadlines assigned', 'Patch verification and retesting', 'Controls mapped to applicable frameworks'] },
  { n: 'Stage 4', time: 'Handover & ongoing assurance', items: ['Reports and verification records handed over', 'Outstanding risks and next steps documented', 'Monitoring and reporting where contracted', 'Reassessment schedule for ongoing engagements'] },
];

export const TIERS = [
  { badge: 'land', name: 'ASSESS', title: 'Security Assessment', type: 'Defined scope', price: 'Custom quote', unit: '/ project', cta: 'Scope an Assessment', ctaClass: 'btn-ghost',
    features: ['Agreed application or infrastructure scope', 'Evidence-based technical findings', 'Management summary and fix priorities', 'Retest terms specified in the proposal'] },
  { badge: 'retain', name: 'REVIEW', title: 'Recurring Security Reviews', type: 'Agreed schedule', price: 'Custom quote', unit: '/ engagement', cta: 'Plan Recurring Reviews', ctaClass: 'btn-a', featured: true,
    features: ['Reassessment of agreed assets', 'Review after significant changes', 'Remediation and retest follow-up', 'Reporting and cadence agreed in writing'] },
  { badge: 'expand', name: 'DISCUSS', title: 'Response & Advisory', type: 'Availability confirmed first', price: 'By agreement', unit: '', cta: 'Discuss Requirements', ctaClass: 'btn-ghost',
    features: ['Coverage and hours confirmed before purchase', 'Defined escalation responsibilities', 'Scope-specific advisory requirements', 'Separate agreement for monitoring or response'] },
];

export { INDUSTRIES, SERVICES } from '../../shared/leads.js';

// Social profiles — paste each profile URL into `url` once the pages exist.
// While `url` is empty the icon is shown but does not navigate anywhere.
export const SOCIALS = [
  { name: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/anvexasecuritysolution/' },
  { name: 'linkedin', label: 'LinkedIn', url: '' },
  { name: 'x', label: 'X', url: 'https://x.com/anvexasecurity' },
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
  { icon: 'refresh', title: 'Continuous', text: 'New assets, vulnerabilities and control changes are pulled into the security loop as they appear, not at the next annual test.' },
  { icon: 'badge', title: 'Provable', text: 'Our work produces evidence as well as recommendations, which makes audits and customer security questionnaires easier.' },
  { icon: 'zap', title: 'Actionable', text: 'You get prioritised actions, not a flood of low-value alerts.' },
];
