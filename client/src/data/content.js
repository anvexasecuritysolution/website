export const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export const STATS = [
  { n: '24/7', c: 'c', t: 'continuous security monitoring' },
  { n: '8', c: 'a', t: 'connected security lifecycle stages' },
  { n: '100%', c: '', t: 'evidence-first security workflow' },
  { n: '24h', c: 'a', t: 'rapid incident-response coordination' },
  { n: '360°', c: 'c', t: 'visibility across your security environment' },
];

export const GAP_CARDS = [
  { kind: 'problem', icon: '⚠️', title: 'What security teams face today', text: 'Point-in-time VAPT reports. Annual compliance checks. Siloed tools with limited visibility. No continuous assurance, no evidence trail.' },
  { kind: 'solution', icon: '🔗', title: 'What Anvexa connects', text: 'A full lifecycle: Asset Discovery → Vulnerability Scan → Risk Prioritization → Remediation → Re-test → Compliance Mapping → Continuous Monitoring → Evidence Vault. Reassessed continuously.' },
  { kind: 'problem', icon: '📋', title: 'Regulatory pressure is real', text: 'CERT-In incident reporting obligations. DPDP personal-data protection enforcement. SEBI/RBI/IRDAI sector rules. ISO 27001, SOC 2, PCI DSS commercial requirements. Compliance is no longer optional.' },
  { kind: 'solution', icon: '🏆', title: 'One thread from scan to proof', text: 'Anvexa is built to be the single thread: from first asset scan to audit-ready evidence vault. VAPT is just the entry point — continuous security is the product.' },
];

export const ENGAGE = [
  { k: 'LAND', color: 'var(--cyan)', title: 'Security Assessment / VAPT', text: 'A one-time assessment. The first engagement that opens the door.' },
  { k: 'FIX', color: '#9B7FFF', title: 'Remediation + Compliance Setup', text: 'Turning findings into closed vulnerabilities and mapped controls.' },
  { k: 'RETAIN', color: 'var(--amber)', title: 'Continuous Security & Compliance', text: 'Always-on monitoring and evidence, billed monthly.', hl: true },
  { k: 'EXPAND', color: '#4ADE80', title: 'Managed MDR + Incident Response', text: 'Full managed detection and response for high-risk teams.' },
];

export const ABOUT_BLOCKS = [
  { icon: '🔍', title: 'Asset Discovery', text: 'Find every digital asset — devices, apps, cloud, users, data — before attackers do.' },
  { icon: '🧱', title: 'VAPT & Risk', text: 'Systematic vulnerability scanning and prioritization by business impact, not CVSS alone.' },
  { icon: '🔧', title: 'Remediation', text: 'Findings become tasks with owners and deadlines, not PDFs that sit in inboxes.' },
  { icon: '📡', title: 'Continuous Monitoring', text: '24/7 detection and alerting. Issues caught early, not discovered after damage is done.' },
  { icon: '📋', title: 'Compliance Mapping', text: 'Controls mapped to CERT-In, DPDP, sector rules, ISO 27001, SOC 2 automatically.' },
  { icon: '🗄️', title: 'Evidence Vault', text: 'Audit-ready proof store for regulators, customers, and board-level reporting.' },
];

export const REGULATIONS = [
  { icon: '🏛️', title: 'CERT-In', text: 'Incident reporting and security/log obligations where applicable' },
  { icon: '🔐', title: 'DPDP 2023', text: 'Personal-data protection obligations with phased enforcement' },
  { icon: '🏦', title: 'Sector Regulations', text: 'SEBI / RBI / IRDAI / PFRDA requirements where applicable' },
  { icon: '🏅', title: 'Commercial Standards', text: 'ISO 27001 / SOC 2 / PCI DSS — increasingly required by enterprise customers' },
  { icon: '📢', title: 'CERT-In: 15 Elemental Cyber Defense Controls for organisations', text: 'Published September 2025 — raising the baseline expectation for every organisation', hl: true },
];

// Lifecycle: tone drives colour (c = cyan, a = amber)
export const STEPS = [
  { n: '01', tone: 'c', title: 'Asset Discovery', tag: 'LAND phase', text: 'Map every digital asset in your environment — devices, applications, cloud workloads, user accounts, and data stores. You cannot protect what you cannot see.' },
  { n: '02', tone: 'c', title: 'VAPT / Vulnerability Scan', tag: 'LAND phase', text: 'Systematic vulnerability assessment and penetration testing across your mapped assets. Black-box, grey-box, and white-box engagements scoped to your risk profile.' },
  { n: '03', tone: 'a', title: 'Risk Prioritization', tag: 'FIX phase', text: 'Not every vulnerability is equal. We prioritize by business impact and exploitability — so your team fixes what matters most, not just what scores highest on a CVSS table.' },
  { n: '04', tone: 'a', title: 'Remediation Workflow', tag: 'FIX phase', text: 'Findings are converted into tracked tasks with assigned owners and deadlines. Progress is visible. Nothing falls into a shared drive and gets forgotten.' },
  { n: '05', tone: 'c', title: 'Re-test & Verify', tag: 'FIX phase', text: 'Fixes are retested to confirm they work. Patch verification is not optional — a "fixed" vulnerability that was only patched on the surface is still a vulnerability.' },
  { n: '06', tone: 'c', title: 'Compliance Mapping', tag: 'RETAIN phase', text: 'Security controls are mapped to applicable frameworks: CERT-In, DPDP, SEBI/RBI/IRDAI sector rules, ISO 27001, SOC 2, and PCI DSS where relevant.' },
  { n: '07', tone: 'a', title: 'Continuous Monitoring & Alerts', tag: 'RETAIN / EXPAND phase', text: '24/7 threat detection, log analysis, SIEM integration, and real-time alerting. Issues are caught when they emerge — not discovered during a post-breach forensic review.' },
  { n: '08', tone: 'a', title: 'Evidence Vault / Audit Ready', tag: 'EXPAND phase', text: "Every scan, fix, retest, and monitoring event is stored as structured evidence. When auditors, regulators, or enterprise customers ask for proof — it's already there." },
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
  { n: 'Phase 1', time: '0 – 3 months', items: ['Interview 30–50 organisations across one vertical', 'Choose one vertical to focus on', 'Validate the pain and willingness to pay', 'Build assessment + remediation MVP'] },
  { n: 'Phase 2', time: '3 – 6 months', items: ['Get 5–10 paid customers', 'Automate finding → task → evidence workflow', 'Integrate existing tools / SIEM', 'Build on proven tools rather than a SIEM from scratch'] },
  { n: 'Phase 3', time: '6 – 12 months', items: ['Launch recurring managed security package', 'Continuous compliance mappings', 'Continuous evidence collection', '24/7 monitoring operations'] },
  { n: 'Phase 4', time: '12 – 24 months', items: ['Vertical packs (BFSI, healthcare, logistics)', 'DPDP / data discovery modules', 'Sector-specific controls', 'AI-assisted triage', 'Channel partnerships'] },
];

export const TIERS = [
  { badge: 'land', name: 'LAND', title: 'Security Assessment', type: 'One-time · Acquisition', price: 'Custom', unit: '/ project', cta: 'Get a Quote', ctaClass: 'btn-ghost',
    features: ['Full asset discovery', 'VAPT — black / grey / white box', 'Risk-prioritized findings report', 'CVSS + business impact scoring', 'Remediation roadmap', 'Executive summary included'] },
  { badge: 'fix', name: 'FIX', title: 'Remediation & Compliance', type: 'Project-based · Revenue', price: 'Custom', unit: '/ project', cta: 'Get a Quote', ctaClass: 'btn-ghost',
    features: ['Tracked remediation workflow', 'Assigned owners + deadlines', 'Patch verification & retest', 'CERT-In / DPDP / ISO control mapping', 'Sector regulation alignment', 'Initial evidence vault setup'] },
  { badge: 'retain', name: 'RETAIN', title: 'Continuous Security', type: 'Monthly recurring · Core product', price: '₹ On request', unit: '/ mo', cta: 'Start Protecting', ctaClass: 'btn-a', featured: true,
    features: ['24/7 continuous monitoring', 'Real-time alerts and triage', 'Monthly compliance evidence', 'Ongoing control mapping', 'Quarterly reassessment', 'Audit-ready evidence vault', 'Dedicated security contact'] },
  { badge: 'expand', name: 'EXPAND', title: 'Managed MDR', type: 'Premium recurring · Add-on', price: '₹ On request', unit: '/ mo', cta: 'Talk to Us', ctaClass: 'btn-ghost',
    features: ['Everything in Continuous Security', 'Full managed detection & response', 'Incident response support', 'Threat hunting', 'AI-assisted triage (Phase 4)', 'Sector-specific vertical packs', 'Channel partner access'] },
];

export const INDUSTRIES = ['Fintech / BFSI', 'Healthcare / Pharma', 'E-commerce / Retail', 'Manufacturing / Logistics', 'IT / SaaS', 'Other'];
export const SERVICES = [
  'VAPT & Security Assessment (LAND)',
  'Remediation & Compliance Setup (FIX)',
  'Continuous Security & Monitoring (RETAIN)',
  'Managed MDR + Incident Response (EXPAND)',
  'Not sure — need a consultation',
];

export const CONTACT = {
  email: 'hello@anvexa.in',
  phone: '+91 98765 43210',
};
