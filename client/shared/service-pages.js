export const SERVICE_PAGES = [
  {
    "slug": "web-application-security",
    "title": "Web Application Security Assessment",
    "description": "Web application VAPT for websites, SaaS products, portals and ERPs. Assess permissions, sign-in and business workflows with fix guidance and agreed retesting.",
    "intro": "A web application can work as intended for customers while still exposing records or privileged actions to the wrong user. We assess agreed application workflows, validate weaknesses and give your developers evidence they can use to fix them.",
    "coverage": [
      "Sign-in, password reset and session handling across the agreed user roles.",
      "Access to records, administrative actions and separation between customer accounts.",
      "Uploads, input handling and relevant configuration weaknesses.",
      "Business workflows such as approvals, orders or account changes, within agreed safeguards."
    ],
    "access": "Tell us the application URL, user roles, important workflows and integrations. Authenticated testing may require dedicated accounts for each role. Agree whether work runs in staging or production, and confirm permissions for third-party components.",
    "limits": "The proposal identifies the workflows, roles and testing depth covered. Source-code review, infrastructure testing and third-party platforms are included only when explicitly scoped.",
    "reference": "OWASP Top 10:2025",
    "url": "https://top10.owasp.org/2025/"
  },
  {
    "slug": "api-security",
    "title": "API Security Assessment",
    "description": "API security testing for agreed endpoints and backend integrations. Review authentication, authorisation and data exposure with actionable findings and retests.",
    "intro": "APIs carry data between your application, users and other services. We check whether agreed endpoints enforce the right access and validation rules, including attempts to reach another account’s records or invoke restricted actions.",
    "coverage": [
      "Authentication, token handling and access to agreed API operations.",
      "Object-level and function-level authorisation across test accounts.",
      "Excessive data exposure, input validation and relevant error handling.",
      "Resource limits and business-flow abuse checks, only within safe, agreed limits."
    ],
    "access": "Share the API inventory or specification, environments, authentication method and roles. Provide dedicated test credentials and representative requests where needed. Identify integrations and endpoints that must be excluded.",
    "limits": "The scope defines endpoints, roles and permitted request volumes. Load testing, denial-of-service activity and third-party API testing are excluded unless specifically authorised and planned.",
    "reference": "OWASP API Security Top 10:2023",
    "url": "https://api-security.owasp.org/editions/2023/en/0x03-introduction/"
  },
  {
    "slug": "server-security",
    "title": "Server Security Assessment",
    "description": "Server vulnerability and configuration assessments for agreed hosts. Review exposed services, patch levels and access settings with practical hardening priorities.",
    "intro": "Exposed services and weak server settings can put applications and business records at risk. We assess the agreed hosts and access model to identify patching, configuration and hardening priorities for your IT team.",
    "coverage": [
      "Reachable services and unnecessary exposure on agreed hosts.",
      "Relevant patch levels and known vulnerabilities, with validation appropriate to the scope.",
      "Remote administration, access settings and configuration checks where access is provided.",
      "Practical hardening recommendations with evidence and testing limitations."
    ],
    "access": "Provide the authorised host list, operating systems, environment details and maintenance constraints. Confirm external-only or credentialed access, the testing window and a contact who can respond if a system behaves unexpectedly.",
    "limits": "Coverage depends on access and host availability. Patching, configuration changes, cloud architecture reviews and application testing are separate work unless included in the proposal."
  },
  {
    "slug": "network-security",
    "title": "Network Security Assessment",
    "description": "Network security assessments for authorised IP ranges and assets. Review exposed ports, remote access and agreed segmentation boundaries with fix priorities.",
    "intro": "A network assessment helps your team understand which services can be reached and whether access boundaries match your business needs. We work within authorised IP ranges and agreed testing locations to document exposure and practical improvements.",
    "coverage": [
      "Host and service discovery within authorised ranges.",
      "Exposed ports, remote-access services and relevant configuration weaknesses.",
      "Segmentation checks between agreed network locations where access is available.",
      "Prioritised recommendations to reduce unnecessary access and exposure."
    ],
    "access": "Confirm IP ranges, asset ownership, network locations, remote-access arrangements and exclusions. Internal testing may need an agreed access point or VPN. Coordinate provider permissions and contacts before work starts.",
    "limits": "The proposal defines network segments, testing vantage points and permitted techniques. Wireless assessments, social engineering and disruptive testing are excluded unless separately authorised."
  }
];

const COVERAGE_LABELS = {
  'web-application-security': ['Sign-In and Sessions', 'Permissions and Data Access', 'Uploads and Input Handling', 'Business Workflows'],
  'api-security': ['Authentication', 'Record and Function Access', 'Data and Input Handling', 'Resource and Workflow Limits'],
  'server-security': ['Service Exposure', 'Patches and Vulnerabilities', 'Administration and Settings', 'Hardening Priorities'],
  'network-security': ['Authorised Asset Discovery', 'Ports and Remote Access', 'Segmentation Boundaries', 'Exposure Reduction'],
};
for (const service of SERVICE_PAGES) service.coverageLabels = COVERAGE_LABELS[service.slug];
