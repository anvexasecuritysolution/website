import { env } from '../config/env.js';
import { connectDB } from '../config/db.js';
import mongoose from 'mongoose';
import { Post } from '../models/Post.js';
import { User } from '../models/User.js';

const posts = [
  {
    slug: "certin-baseline-cyber-defense-controls",
    title: "CERT-In's Baseline Cyber Defence Controls: What Each One Means in Practice",
    excerpt: "What a baseline control set is for, and a simple way to score how much of it you already have in place.",
    tag: "Compliance", emoji: "📋", readMinutes: 6, publishedAt: "2025-09-15",
    body: [
      "CERT-In has published a baseline set of cyber defence controls for organisations. Its main value is that it turns a vague goal like \"be more secure\" into a list you can measure yourself against.",
      "A simple way to use it is to score every control as implemented, partially implemented or missing. Be strict about \"implemented\". If you can't produce a screenshot, a configuration export or a log that proves it, it is partial at best. A control with no evidence is an assumption, not a control.",
      "The gaps tend to cluster in the same places. Identity and access management is a common one: shared admin accounts, no MFA on email, and leavers whose access was never revoked. Patch management is another, and so are backups that have never been test-restored.",
      "Don't try to close everything at once. Start with the controls that reduce the most risk for the least effort, which for most teams means MFA, patching and backups. Then turn the rest into a remediation plan where every item has an owner and a due date.",
      "Repeat the scoring after three months. The second pass shows whether the fixes are holding or old gaps are creeping back, and it gives you something concrete to show a customer or auditor who asks how you manage security.",
    ],
  },
  {
    slug: "dpdp-2023-enforcement-checklist",
    title: "DPDP Act 2023: A Practical Checklist for Indian Businesses",
    excerpt: "Enforcement is being phased in. Here is what most organisations can start on now, before the rules reach their sector.",
    tag: "DPDP", emoji: "🔐", readMinutes: 8, publishedAt: "2025-08-12",
    body: [
      "The Digital Personal Data Protection Act, 2023 applies to any organisation that processes the personal data of people in India. Enforcement is being phased in, which makes it easy to postpone. That is a mistake, because most of the preparation takes months.",
      "Start with a data inventory. Record what personal data you hold, where it is stored, who can access it and why you collected it. A spreadsheet is enough. Nearly every other obligation depends on this map.",
      "Next, review consent. Check your sign-up forms, cookie banners and privacy notices. Do they state the purpose clearly? Can a customer withdraw consent as easily as they gave it? If not, that is your first fix.",
      "Then look at retention and third parties. Many companies keep data indefinitely because nobody set a deletion rule. Your processors, such as payment gateways, CRMs and cloud hosts, often hold your customers' data too, so check what your contracts say about security safeguards and breach notification.",
      "Finally, document your breach-response process: who detects, who decides, who notifies the Board and affected individuals, and how quickly. Run it once as a tabletop exercise and the weak points show up fast.",
      "Deadlines and rules are still being clarified, so confirm the current position with qualified legal counsel before relying on any date mentioned here.",
    ],
  },
  {
    slug: "why-your-vapt-report-didnt-make-you-secure",
    title: "Why Your VAPT Report Didn't Make You More Secure",
    excerpt: "The report arrives, gets filed, and the vulnerabilities are still open six months later. Here is how to break the pattern.",
    tag: "VAPT", emoji: "🕵️", readMinutes: 7, publishedAt: "2025-07-10",
    body: [
      "Many organisations commission a VAPT because a customer, regulator or auditor asked for one. The report arrives, someone skims the executive summary, and it goes into a shared drive. Six months later, most of the findings are still open.",
      "The report isn't the problem. It is a snapshot, and its value depends on what happens next: who owns each finding, when it will be remediated, and how the fix will be verified.",
      "So convert every finding into a tracked ticket the day the report lands, with one owner and one deadline. When you prioritise, don't rely on the CVSS score alone. Weigh business impact and exploitability too. A medium-rated flaw in your login flow can matter more than a high-rated one on a server nobody uses.",
      "Some fixes will take weeks, and that's normal. Where they do, record a compensating control, such as restricting access or adding a detection rule, and a date for the permanent fix.",
      "Finally, retest. A vulnerability is only closed when someone has tried to exploit it again and failed. That retest result is also the strongest evidence you can give an auditor or customer, because it shows the issue was found and then genuinely remediated.",
    ],
  },
  {
    slug: "logs-exist-nobody-is-watching",
    title: "Logs Exist. Nobody's Watching. That's the Gap.",
    excerpt: "Most organisations collect logs and never review them. What continuous monitoring looks like for a lean team.",
    tag: "Monitoring", emoji: "📡", readMinutes: 5, publishedAt: "2025-06-09",
    body: [
      "Nearly every system you run already produces logs: servers, firewalls, cloud accounts, email and identity providers. The problem is that in most organisations nobody reviews them until after an incident, by which time the useful entries may have been overwritten.",
      "A lean team doesn't need to build a full SIEM to fix this. Begin by centralising the sources that tell you the most: identity and sign-in logs, email, cloud admin activity and endpoints. Keep them long enough to be useful. CERT-In expects logs to be retained for 180 days.",
      "Then decide what you actually want to be alerted on. A short list beats a long one: sign-ins from unusual countries, new admin accounts, MFA being disabled, or a large data download at 3 a.m. Five or six alerts that people trust are worth more than two hundred that everyone ignores.",
      "The last part is the one teams skip: an escalation path. Who is alerted, who decides what to do, and who reports to the regulator if required? CERT-In asks for certain incidents to be reported within six hours, so that chain needs to be written down before you need it.",
      "If you can't staff round-the-clock cover, an MDR provider can do the watching. Just make sure they understand your environment well enough to separate real threats from normal noise.",
    ],
  },
  {
    slug: "rbi-sebi-cybersecurity-fintech",
    title: "RBI & SEBI Cybersecurity Mandates: What Fintech Companies Must Know",
    excerpt: "Financial firms often face overlapping obligations from RBI, SEBI and IRDAI. How to handle them without doing the work twice.",
    tag: "Sector", emoji: "🏦", readMinutes: 6, publishedAt: "2025-05-08",
    body: [
      "If you run a fintech, a broking business or an insurance intermediary, you may answer to more than one regulator. RBI, SEBI and IRDAI each issue their own cybersecurity requirements, with their own reporting formats and timelines. They overlap heavily, but they are not identical.",
      "The most common mistake we see is preparing separate evidence for each audit. A team builds one pack for RBI, another for SEBI and a third for a customer's vendor review, even though most of the content is the same.",
      "A better approach is to map your controls once, covering access management, encryption, patching, logging, backups and vendor checks, and note which requirement each control satisfies. When an auditor asks, you reuse the same evidence and present it against their framework.",
      "Third-party risk deserves special attention. Regulators expect you to know how your cloud providers, payment partners and outsourced developers handle security, and to have that written into your contracts.",
      "Which circulars apply depends on your licence category, so confirm this with your compliance team or counsel before building anything around it.",
    ],
  },
  {
    slug: "owasp-top-10-indian-dev-teams",
    title: "OWASP Top 10 Still Catches Indian Dev Teams Off Guard. Here's Why",
    excerpt: "The most damaging application vulnerabilities aren't new. They slip through because sprints reward speed over review.",
    tag: "AppSec", emoji: "🧱", readMinutes: 9, publishedAt: "2025-04-07",
    body: [
      "The OWASP Top 10 has barely changed in spirit over the years. Broken access control, injection and security misconfiguration keep appearing at the top. They are old, well-understood problems, yet we still find them in most of the applications we test.",
      "The cause is rarely a lack of skill. It is how the work is planned. Sprints are judged on features shipped, and a security review is one more thing that can push the release date. So it gets skipped, and the same classes of bug go live again.",
      "Broken access control is the classic example. A user changes an ID in the URL and sees someone else's invoice. It is easy to fix but easy to miss, because each developer tests that their own feature works, not that it fails for the wrong person.",
      "You can catch a lot with cheap guardrails in the pipeline. Run dependency scanning so you know when a library has a known vulnerability. Add secret scanning so API keys don't end up in Git. Put a short security checklist in your pull-request template, with three or four questions the author must answer.",
      "Automated checks won't find everything, though. Once or twice a year, have someone test your most sensitive flows by hand: login and password reset, payments, and anything that exports data. That is where an attacker would go first.",
    ],
  },
];

await connectDB();

await Post.deleteMany({ slug: { $nin: posts.map((p) => p.slug) } }); // drop retired posts
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
