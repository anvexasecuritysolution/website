export const SECURITY_DOMAINS = [
  { icon: 'shield', title: 'Web application security', text: 'Assess sign-in, user permissions, uploads and business workflows in websites, SaaS products, portals and ERPs.', outcome: 'Prioritised findings your development team can act on.' },
  { icon: 'link', title: 'API security', text: 'Review authentication, access to records, data exposure and misuse of agreed API endpoints and integrations.', outcome: 'Evidence of API weaknesses and practical remediation guidance.' },
  { icon: 'building', title: 'Server security', text: 'Assess exposed services, patch levels, access settings and configuration on agreed internet-facing or internal servers.', outcome: 'A clear list of hardening and patching priorities.' },
  { icon: 'radar', title: 'Network security', text: 'Assess agreed network assets, exposed ports, remote access and segmentation boundaries within an authorised scope.', outcome: 'Visibility of exposure and actions to reduce unnecessary access.' },
];

export const TARGET_BUSINESSES = [
  { title: 'IT MSMEs & startups', text: 'Customer-facing products, client delivery environments and security reviews before a release or enterprise sale.' },
  { title: 'E-commerce businesses', text: 'Customer accounts, orders, checkout integrations and the systems handling personal data.' },
  { title: 'Education platforms', text: 'Student portals, learning systems, admissions workflows and staff access to records.' },
  { title: 'Healthcare businesses', text: 'Appointment portals, patient-facing applications and access boundaries around sensitive records.' },
  { title: 'SaaS & service providers', text: 'Multi-tenant applications, partner APIs and customer security questionnaires.' },
  { title: 'ERP-driven businesses', text: 'HR, finance, inventory and operational systems with different staff roles and permissions.' },
];

export const BUYER_QUESTIONS = [
  { question: 'How are our information and findings handled?', answer: 'Before sharing access, agree confidentiality terms, authorised recipients, the secure handover method and how long reports and evidence will be retained. Use test accounts and synthetic data where practical, and arrange credential revocation at handover. Confirm any NDA or data-processing requirements during scoping.' },
  { question: 'What is VAPT, and how is it different from a scan?', answer: 'Vulnerability Assessment and Penetration Testing (VAPT) identifies weaknesses and checks their practical impact within an agreed scope. An automated scan is one input; manual review is important for user permissions and business workflows. The proposal should state the testing depth and methods included.' },
  { question: 'Can you assess a small application or a limited set of servers?', answer: 'Start with the assets that matter most: an application, selected APIs, servers or an agreed network range. We clarify asset ownership, user roles, integrations and exclusions before preparing a scope.' },
  { question: 'Who makes the fixes: Anvexa or our team?', answer: 'Your developers, hosting provider or IT team implement changes unless implementation support is separately agreed. Anvexa explains the findings and recommended fixes. If you need additional development help, discuss its scope and responsibilities before work begins.' },
  { question: 'Will testing interrupt our website or business?', answer: 'Testing can affect systems. We agree the environment, testing window, contacts, exclusions and stop conditions before starting. Staging or test data may be appropriate; production testing needs explicit authorisation and coordinated safeguards. Availability cannot be guaranteed.' },
  { question: 'How much does it cost, and how long does it take?', answer: 'The quote depends on application complexity, user roles, API endpoints, hosts, access arrangements and testing depth. After scoping, the written proposal sets the fee, schedule, deliverables and retest window. Fix implementation time depends on your team and the issues found.' },
  { question: 'Do you need source code, passwords or personal data?', answer: 'Access depends on whether testing is external, authenticated or includes code review. Agree the minimum access needed and a secure way to share it. Test accounts and synthetic data are preferable where practical. Keep passwords, keys, patient records and confidential findings out of the enquiry form.' },
  { question: 'Does a VAPT report make us DPDP compliant or certified?', answer: 'Testing supports security readiness and evidence, but compliance includes legal, organisational and operational duties too. If a customer or regulator requires a CERT-In-empanelled auditor, a particular assessor or report format, flag that during scoping so eligibility and requirements can be confirmed before commissioning.' },
  { question: 'What happens after our developers fix the findings?', answer: 'Submit agreed fixes for retesting within the proposal’s retest window. Verification records distinguish resolved findings, issues that remain and testing limitations. Further assessments can be planned after major changes or on an agreed recurring schedule.' },
];
