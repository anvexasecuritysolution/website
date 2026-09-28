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
  { name: 'CERT-In', text: 'Incident reporting and log obligations' },
  { name: 'DPDP Act 2023', text: 'Personal-data protection' },
  { name: 'ISO 27001', text: 'Information security management' },
  { name: 'SOC 2', text: 'Trust services criteria' },
  { name: 'PCI DSS', text: 'Payment card security' },
  { name: 'SEBI / RBI / IRDAI', text: 'Sector-specific mandates' },
];

export const GAP_CARDS = [
  { kind: 'problem', icon: 'alert', title: 'What most organisations have today', text: 'Point-in-time VAPT reports. Annual compliance checks. Siloed tools with limited visibility. No continuous assurance and no evidence trail.' },
  { kind: 'solution', icon: 'link', title: 'What Anvexa connects', text: 'A full lifecycle: Asset Discovery → Vulnerability Scan → Risk Prioritization → Remediation → Re-test → Compliance Mapping → Continuous Monitoring → Evidence Vault. Reassessed continuously.' },
  { kind: 'problem', icon: 'clipboard', title: 'Regulatory obligations are growing', text: 'CERT-In incident reporting. DPDP personal-data protection. SEBI, RBI and IRDAI sector rules. ISO 27001, SOC 2 and PCI DSS requirements from customers and partners.' },
  { kind: 'solution', icon: 'award', title: 'One thread from scan to proof', text: 'Anvexa is the single thread from first asset scan to audit-ready evidence. VAPT is the starting point — continuous security is the service.' },
];

export const ENGAGE = [
  { k: 'ASSESS', title: 'Security Assessment / VAPT', text: 'A scoped assessment that establishes your baseline and shows where the exposure is.' },
  { k: 'REMEDIATE', title: 'Remediation + Compliance Setup', text: 'Findings turned into closed vulnerabilities and mapped controls.' },
  { k: 'MONITOR', title: 'Continuous Security & Compliance', text: 'Always-on monitoring, alerting and evidence, delivered monthly.' },
  { k: 'RESPOND', title: 'Managed MDR + Incident Response', text: 'Managed detection and response for higher-risk environments.' },
];

export const ABOUT_BLOCKS = [
  { icon: 'search', title: 'Asset Discovery', text: 'Find every digital asset — devices, apps, cloud, users, data — before attackers do.' },
  { icon: 'shield', title: 'VAPT & Risk', text: 'Systematic vulnerability scanning and prioritization by business impact, not CVSS alone.' },
  { icon: 'wrench', title: 'Remediation', text: 'Findings become tasks with owners and deadlines, not PDFs that sit in inboxes.' },
  { icon: 'radar', title: 'Continuous Monitoring', text: '24/7 detection and alerting. Issues caught early, not discovered after damage is done.' },
  { icon: 'filecheck', title: 'Compliance Mapping', text: 'Controls mapped to CERT-In, DPDP, sector rules, ISO 27001, SOC 2 automatically.' },
  { icon: 'vault', title: 'Evidence Vault', text: 'Audit-ready proof store for regulators, customers, and board-level reporting.' },
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
  { n: '01', tone: 'c', title: 'Asset Discovery', tag: 'Assess', text: 'Map every digital asset in your environment — devices, applications, cloud workloads, user accounts, and data stores. You cannot protect what you cannot see.' },
  { n: '02', tone: 'c', title: 'VAPT / Vulnerability Scan', tag: 'Assess', text: 'Systematic vulnerability assessment and penetration testing across your mapped assets. Black-box, grey-box, and white-box engagements scoped to your risk profile.' },
  { n: '03', tone: 'a', title: 'Risk Prioritization', tag: 'Remediate', text: 'Not every vulnerability is equal. We prioritize by business impact and exploitability — so your team fixes what matters most, not just what scores highest on a CVSS table.' },
  { n: '04', tone: 'a', title: 'Remediation Workflow', tag: 'Remediate', text: 'Findings are converted into tracked tasks with assigned owners and deadlines. Progress is visible. Nothing falls into a shared drive and gets forgotten.' },
  { n: '05', tone: 'c', title: 'Re-test & Verify', tag: 'Remediate', text: 'Fixes are retested to confirm they work. Patch verification is not optional — a "fixed" vulnerability that was only patched on the surface is still a vulnerability.' },
  { n: '06', tone: 'c', title: 'Compliance Mapping', tag: 'Comply', text: 'Security controls are mapped to applicable frameworks: CERT-In, DPDP, SEBI/RBI/IRDAI sector rules, ISO 27001, SOC 2, and PCI DSS where relevant.' },
  { n: '07', tone: 'a', title: 'Continuous Monitoring & Alerts', tag: 'Monitor', text: '24/7 threat detection, log analysis, SIEM integration, and real-time alerting. Issues are caught when they emerge — not discovered during a post-breach forensic review.' },
  { n: '08', tone: 'a', title: 'Evidence Vault / Audit Ready', tag: 'Assure', text: "Every scan, fix, retest, and monitoring event is stored as structured evidence. When auditors, regulators, or enterprise customers ask for proof — it's already there." },
];

// Ring nodes on the home hero — order matches STEPS
export const RING_NODES = [
  { label: 'Asset Discovery', tone: 'c' },
  { label: 'VAPT Scan', tone: 'c' },
  { label: 'Risk', tone: 'a' },
  { label: 'Remediate', tone: 'a' },
  { label: 'Re-test', tone: 'c' },
  { label: 'Compliance', tone: 'c' },
  { label: 'Monitor', tone: 'a' },
  { label: 'Evidence', tone: 'a' },
];

export const FLOW = [
  ['Requirement'], ['Control'], ['Evidence', true], ['Monitoring'], ['Alert', true], ['Remediation'], ['Verification'], ['Audit Ready', true],
];

export const PHASES = [
  { n: 'Stage 1', time: 'Discover', items: ['Scoping call and environment walkthrough', 'Asset inventory and attack-surface mapping', 'Agreed scope and rules of engagement', 'Defined success criteria'] },
  { n: 'Stage 2', time: 'Assess', items: ['Vulnerability scanning and penetration testing', 'Risk ranking by business impact', 'Executive and technical reporting', 'Prioritised remediation roadmap'] },
  { n: 'Stage 3', time: 'Remediate', items: ['Findings converted to tracked tasks', 'Owners and deadlines assigned', 'Patch verification and re-test', 'Controls mapped to applicable frameworks'] },
  { n: 'Stage 4', time: 'Assure', items: ['Continuous monitoring and alerting', 'Monthly compliance evidence', 'Quarterly reassessment', 'Audit-ready evidence vault'] },
];

export const TIERS = [
  { badge: 'land', name: 'ASSESS', title: 'Security Assessment', type: 'One-time engagement', price: 'Custom', unit: '/ project', cta: 'Get a Quote', ctaClass: 'btn-ghost',
    features: ['Full asset discovery', 'VAPT — black / grey / white box', 'Risk-prioritized findings report', 'CVSS + business impact scoring', 'Remediation roadmap', 'Executive summary included'] },
  { badge: 'fix', name: 'REMEDIATE', title: 'Remediation & Compliance', type: 'Project-based', price: 'Custom', unit: '/ project', cta: 'Get a Quote', ctaClass: 'btn-ghost',
    features: ['Tracked remediation workflow', 'Assigned owners + deadlines', 'Patch verification & retest', 'CERT-In / DPDP / ISO control mapping', 'Sector regulation alignment', 'Initial evidence vault setup'] },
  { badge: 'retain', name: 'MONITOR', title: 'Continuous Security', type: 'Monthly subscription', price: 'On request', unit: '/ mo', cta: 'Start Protecting', ctaClass: 'btn-a', featured: true,
    features: ['24/7 continuous monitoring', 'Real-time alerts and triage', 'Monthly compliance evidence', 'Ongoing control mapping', 'Quarterly reassessment', 'Audit-ready evidence vault', 'Dedicated security contact'] },
  { badge: 'expand', name: 'RESPOND', title: 'Managed MDR', type: 'Add-on service', price: 'On request', unit: '/ mo', cta: 'Talk to Us', ctaClass: 'btn-ghost',
    features: ['Everything in Continuous Security', 'Full managed detection & response', 'Incident response support', 'Threat hunting', 'AI-assisted triage', 'Sector-specific control packs'] },
];

export const INDUSTRIES = ['Fintech / BFSI', 'Healthcare / Pharma', 'E-commerce / Retail', 'Manufacturing / Logistics', 'IT / SaaS', 'Other'];
export const SERVICES = [
  'VAPT & Security Assessment',
  'Remediation & Compliance Setup',
  'Continuous Security & Monitoring',
  'Managed MDR + Incident Response',
  'Not sure — need a consultation',
];

export const CONTACT = {
  email: 'anvexasecuritysolution@gmail.com',
  phone: '+91 78359 47340',
};
