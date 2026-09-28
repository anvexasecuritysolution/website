import { env } from '../config/env.js';
import { connectDB } from '../config/db.js';
import mongoose from 'mongoose';
import { Post } from '../models/Post.js';
import { User } from '../models/User.js';

const posts = [
  {
    slug: 'certin-15-elemental-controls',
    title: "CERT-In Cyber Defense Controls: What They Mean for Security Teams",
    excerpt: "CERT-In published a cyber defense baseline in September 2025. Here's a plain-language breakdown of the controls and how to assess your current coverage.",
    tag: 'Compliance', emoji: '📋', readMinutes: 6, publishedAt: '2025-09-15',
    body: [
      'CERT-In has published a baseline set of cyber defense controls designed to establish a practical cyber defense baseline. For a small team, the value of a baseline is simple: it turns "be more secure" into a checklist you can measure against.',
      'The practical way to use any baseline is to score each control as implemented, partially implemented, or missing, and to attach evidence to every "implemented" claim. A control with no evidence is an assumption, not a control.',
      'Start with the controls that reduce the most risk for the least effort — typically access control, patching and backups — then work through the rest as a tracked remediation plan with owners and dates.',
      'Replace this draft with your final article before launch.',
    ],
  },
  {
    slug: 'dpdp-2023-enforcement-checklist',
    title: 'DPDP 2023 Enforcement Is Coming: A Practical Checklist for Indian Businesses',
    excerpt: "India's Digital Personal Data Protection Act introduces obligations with phased enforcement. Here is how organisations can prepare for implementation.",
    tag: 'DPDP', emoji: '🔐', readMinutes: 8, publishedAt: '2025-08-12',
    body: [
      'The Digital Personal Data Protection Act, 2023 places obligations on organisations that process personal data of individuals in India, with enforcement being phased in.',
      'A sensible first step for any organisation is a data inventory: what personal data you hold, where it lives, who can access it, and why you collect it. Every later obligation builds on that map.',
      'From there, review consent notices, retention practices, vendor contracts, and your breach-response process. Confirm current deadlines and rules with qualified legal counsel.',
      'Replace this draft with your final article before launch.',
    ],
  },
  {
    slug: 'why-your-vapt-report-didnt-make-you-secure',
    title: "Why Your VAPT Report Didn't Make You More Secure",
    excerpt: 'Many organisations treat VAPT as a compliance activity. The report arrives, sits in a shared drive, and the vulnerabilities remain. Here’s how to break the pattern.',
    tag: 'VAPT', emoji: '🕵️', readMinutes: 7, publishedAt: '2025-07-10',
    body: [
      'A VAPT report is a snapshot. Its value depends entirely on what happens next: who owns each finding, by when it will be fixed, and how the fix is verified.',
      'Turn every finding into a tracked task with an owner and a deadline, prioritised by business impact and exploitability rather than raw severity score alone.',
      'Then retest. A vulnerability is only closed when it has been verified as closed — and that verification is itself evidence for auditors and customers.',
      'Replace this draft with your final article before launch.',
    ],
  },
  {
    slug: 'logs-exist-nobody-is-watching',
    title: "Logs Exist. Nobody's Watching. That's the Gap.",
    excerpt: 'Many organisations do not continuously monitor their security environment. What does real continuous monitoring look like for a small team?',
    tag: 'Monitoring', emoji: '📡', readMinutes: 5, publishedAt: '2025-06-09',
    body: [
      'Most systems already produce logs. The gap is that nobody is reviewing them in time to matter.',
      'Small teams do not need to build a SIEM from scratch. Centralise the logs that matter most — identity, email, cloud and endpoints — and alert on a short list of high-signal events.',
      'Add a clear escalation path: who is paged, who decides, and who reports to regulators when required.',
      'Replace this draft with your final article before launch.',
    ],
  },
  {
    slug: 'rbi-sebi-cybersecurity-fintech',
    title: 'RBI & SEBI Cybersecurity Mandates: Key Considerations for Regulated Organisations',
    excerpt: 'Financial sector companies face overlapping obligations from RBI, SEBI, and IRDAI. We break down the intersection and what a compliant security posture looks like.',
    tag: 'Sector', emoji: '🏦', readMinutes: 6, publishedAt: '2025-05-08',
    body: [
      'Regulated financial entities often face overlapping requirements from more than one regulator, each with its own reporting formats and timelines.',
      'The efficient approach is to map controls once and reuse the same evidence across frameworks, instead of preparing separate proof for every audit.',
      'Always confirm which circulars apply to your licence category with your compliance team or counsel.',
      'Replace this draft with your final article before launch.',
    ],
  },
  {
    slug: 'owasp-top-10-indian-dev-teams',
    title: 'OWASP Top 10 Still Catches Indian Dev Teams Off Guard — Here’s Why',
    excerpt: "The most impactful application vulnerabilities are not new. They're familiar risks that slip through during rapid development sprints.",
    tag: 'AppSec', emoji: '🧱', readMinutes: 9, publishedAt: '2025-04-07',
    body: [
      'The OWASP Top 10 hasn’t changed dramatically in spirit: broken access control, injection and misconfiguration keep appearing because sprints reward speed over review.',
      'Build cheap guardrails into the pipeline: dependency scanning, secret scanning, and a short security checklist in every pull-request template.',
      'Complement automated checks with periodic manual testing of your most sensitive flows — login, payments and data export.',
      'Replace this draft with your final article before launch.',
    ],
  },
];

await connectDB();

for (const p of posts) {
  await Post.updateOne({ slug: p.slug }, { $set: p }, { upsert: true });
}
console.log(`Seeded ${posts.length} posts`);

const email = (process.env.ADMIN_EMAIL || 'admin@anvexa.in').toLowerCase();
const password = process.env.ADMIN_PASSWORD;
if (!password || password.length < 12) {
  console.warn('Skipped admin user: set ADMIN_PASSWORD (12+ chars) in server/.env');
} else {
  const passwordHash = await User.hash(password);
  await User.updateOne({ email }, { $set: { email, passwordHash } }, { upsert: true });
  console.log(`Admin user ready: ${email}`);
}

await mongoose.disconnect();
void env;
