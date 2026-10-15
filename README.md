# Anvexa Security Solutions

Cybersecurity marketing website, blog and contact capture. The public site is https://anvexasecuritysolution.vercel.app. React/Vite powers the frontend. Express/MongoDB supports the optional admin dashboard; Vercel functions support standalone hosting.

## Local setup

Use Node.js 20.20+ (or a supported newer LTS) and MongoDB for the Express option.

```sh
npm run install:all
```

Copy `server/.env.example` to `server/.env`. Set `MONGO_URI`, a random `JWT_SECRET`, and your own `ADMIN_EMAIL` / `ADMIN_PASSWORD` (12+ characters). Example credentials are placeholders; replace them. Optionally copy `client/.env.example` to `client/.env`.

```sh
npm run seed
npm run dev
```

The frontend runs at http://localhost:5173 and the API at http://localhost:5000. Admin login is `/admin/login`.

## Choose the deployment that fits your current setup

Existing deployment modes remain supported. For the current public Vercel site, use the Vercel configuration below; the Express server is only needed if you want MongoDB and the admin dashboard.

The contact form requires a phone number. It accepts 10-digit local numbers, an optional leading 0 or 91 for Indian numbers, and international numbers with an explicit `+` country code (8–15 digits). Spaces, hyphens and balanced parentheses are allowed. It rejects malformed, repeated-digit and incomplete numbers, saves the phone with the enquiry, and shows a call link in the MongoDB admin dashboard. All new submissions require a valid phone; historical leads without one remain readable and their status can still be updated. In Google Sheets the new Phone column is appended after Status, preserving existing column positions; redeploy the updated Apps Script to enforce the requirement there too.

The browser and backend share the same contact validation: required first name, email and phone; valid Unicode names; correctly formed email addresses; field length limits; and allowed industry/service selections. Errors appear beside fields, update while correcting them, and the first invalid field receives focus on submit. These are format checks, not verification that a phone or email belongs to the visitor.

### Vercel: frontend and API together

Set the project Root Directory to `client`. Configure server-only environment variables `GITHUB_TOKEN` and `GITHUB_REPO=owner/private-repository`. The token needs Contents read/write access to that private repository. Keep `VITE_API_URL` empty. Redeploy the project.

`POST /api/leads` validates submissions and stores them in GitHub. `GET /api/posts` and `/api/posts/:slug` serve the shared articles. The MongoDB admin dashboard requires the separate Express backend and is unavailable in Vercel-only mode.

Vercel submission limits are persistent, shared across instances and guarded by GitHub SHA conflicts: eight requests per rolling hour per IP. Rate reservations live under `data/_rate-limits` with keyed hashes rather than raw IP addresses. A failed storage request fails closed and returns a retry message. This uses the existing GitHub token and needs no additional service. On other hosts, forwarded IP headers must come from a trusted proxy.

### Express / MongoDB

```sh
npm run build
```

Set `NODE_ENV=production` and run `npm start`. Express serves `client/dist`, the API and the admin dashboard. For split hosting, set `VITE_API_URL` to the API origin at build time and set `CLIENT_ORIGIN` on the server to a comma-separated allow-list of frontend origins.

An enquiry is confirmed after MongoDB saves it. Optional GitHub backups run separately. Pending backups are stored on the lead itself, survive restarts, use a lease to avoid simultaneous workers, and retry with backoff. GitHub requests have deadlines; GitHub problems never delay successful contact submissions. The background worker checks pending backups every 30 seconds.

### Static hosting: email and/or Google Sheets

Set either or both at frontend build time:

- `VITE_WEB3FORMS_KEY`: enquiries are delivered through Web3Forms. The provider must explicitly acknowledge success.
- `VITE_SHEETS_URL`: your Google Apps Script web-app `/exec` URL. See the upgrade steps below.

These public frontend values select direct provider submissions instead of `/api/leads`. If both providers are configured, at least one must confirm success. One confirmed destination is enough; the other may have failed. If none confirms, the form keeps the enquiry and displays an error.

The blog still works on static hosting: it uses bundled articles if the API is unavailable or the host returns its SPA HTML. An explicit JSON API 404/401/403 is respected, so an unpublished article is not restored from the bundle.

## Google Sheets: upgrade before redeploying the frontend

1. Open your existing Sheet, then Extensions > Apps Script.
2. Replace the script with `google-apps-script/Code.gs`. Preserve your existing `NOTIFY_EMAIL` setting if used.
3. Use Deploy > Manage deployments > Edit > New version, keeping the existing deployment URL. Execute as Me; allow Anyone.
4. Verify the `/exec` URL displays `Anvexa leads endpoint is running (v2)`.
5. Then redeploy the frontend. Keep its existing `VITE_SHEETS_URL` value.

The script accepts the earlier form payload as well, so updating it first keeps the old frontend working. The updated frontend checks the receipt capability before sending, then polls a random-token delivery receipt and confirms success only after the row is saved. This replaces unverified `no-cors` success without adding a backend. JSONP is used only to read status; it never exposes names, emails or enquiry content. See Google's [Content Service documentation](https://developers.google.com/apps-script/guides/content).

The script validates types, lengths, emails and selections, neutralizes spreadsheet formulas, and limits submissions to eight per email per rolling hour and 100 globally per rolling hour. Apps Script does not expose a reliable visitor IP. Limits and one-hour success receipts persist in Script Properties; expired entries are removed during submission maintenance. Failed receipts use a short-lived cache so invalid requests cannot fill durable storage. Retrying the same receipt does not duplicate a row. Optional email notification failure does not invalidate a saved row.

## GitHub storage and compatibility

Existing storage remains the default:

```dotenv
GITHUB_STORAGE_MODE=array
GITHUB_LEADS_PATH=data/leads.json
```

For new installations or after reviewing any tools that read the existing array, use the scalable format:

```dotenv
GITHUB_STORAGE_MODE=records
GITHUB_RECORDS_PATH=data/leads
```

Record mode stores each enquiry separately, e.g. `data/leads/2026/10/08/<id>.json`. Each submission then reads/writes only its own record. It leaves the existing `data/leads.json` untouched; it does not migrate or delete historical records. The MongoDB dashboard works the same in either mode. Array mode is intentionally retained for existing consumers; it still rewrites the full list and is intended for low volumes.

Both formats retry write conflicts, recognize already-saved IDs, and enforce request deadlines. Large legacy arrays are read through GitHub's raw API rather than mistaking an omitted inline payload for an empty array. See [GitHub's Contents API limits](https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28).

Commit messages use lead IDs rather than emails. Keep the repository private: enquiry content, historical versions and old commit messages remain in Git history. Deleting a current file does not erase historical data. Establish a retention procedure for every configured destination. GitHub backups represent the submitted enquiry; later MongoDB status changes are not synchronized.

Optional server variables: `GITHUB_BRANCH` (default `main`), `GITHUB_RATE_PATH` (default `data/_rate-limits`) and `GITHUB_API_URL` for an alternate GitHub API.

## Blog, seeding and content

All deployment paths share `client/shared/posts.js`. Edit the articles there. Frontend and Vercel import it; the MongoDB seed uses it. Static page copy is in `client/src/data/content.js`; legal page copy is in `client/src/data/legal.js`.

Default `npm run seed` only inserts missing posts and creates a missing admin. It preserves existing articles, unpublished status, additional posts and existing passwords. Explicit maintenance options are available:

```sh
npm run seed -- --update-posts
npm run seed -- --prune-posts
npm run seed -- --reset-admin-password
```

`--update-posts` replaces matching article fields with the shared content. `--prune-posts` deletes articles outside the shared list. `--reset-admin-password` resets the selected admin to `ADMIN_PASSWORD`. Review these flags before using them on an existing database.

Privacy and Terms pages already exist and are linked. Blog bodies are full short articles rather than placeholder drafts. Review business details and regulatory wording before publication.

## Cookie choices

Visitors see Accept all, Reject optional and Settings on their first visit. Essential storage remembers consent in a first-party `anvexa_consent` cookie for up to 180 days (`SameSite=Lax`, `Path=/`, and `Secure` on HTTPS). The settings panel uses a native modal dialog with keyboard focus handling and separate Preferences and Analytics switches, both off by default. Cookie settings is always available in the footer.

Preferences controls saving the light/dark theme in local storage. Rejecting or withdrawing it removes that saved preference. The theme switch still works during the current page session. Initial HTML checks consent before restoring a stored theme, so optional storage is not enabled during startup. Blocked browser storage does not stop the site working. The separate Analytics category controls GA4 and is off by default. Consent version 2 asks previous visitors again rather than assuming their theme preference also permits analytics. No advertising trackers are enabled.

## Search and social sharing

The canonical origin defaults to `https://anvexasecuritysolution.vercel.app`. Override it with `VITE_SITE_URL` when you adopt a custom domain. Each build generates `sitemap.xml` and `robots.txt`, including public pages and bundled articles. Admin pages use noindex metadata and headers, and API routes are excluded from crawling. Rebuild after changing the public domain or shared articles. MongoDB-only articles outside the shared list must be added there to appear in the generated sitemap.

Pages have canonical links, titles, descriptions and Open Graph/Twitter metadata. A 1200 × 630 PNG social preview is included, with its editable SVG source. Production builds prerender page-specific and article-specific metadata into the initial HTML for crawlers that do not execute JavaScript. See Search optimization and publishing below.

## Validation

```sh
npm run lint
npm test
npm run build
# all three together:
npm run check
```

Tests use Node's built-in runner and mocked storage/providers; no live MongoDB connection or real enquiries are needed. They cover normalized validation, successful and failed deliveries, Sheets receipts, distributed limits, concurrent GitHub writes, large files, admin login/access, safe seeding, backup retries, content fallback, and generated SEO assets. Security headers are checked against the built frontend, so build once before running the production HTML test. The development launcher's transitive `shell-quote` is constrained to its compatible patched release.

Live verification after deployment: check navigation/blog, submit one deliberate test enquiry, verify it in the configured destination, and test admin login/status changes if Express is used. External delivery credentials and deployed Apps Script cannot be proven by local mocks.

## Structure

```text
client/
  src/          React pages, components, API client, styles
  shared/       Blog articles, lead validation, site metadata
  api/          Vercel handlers and shared GitHub storage
  build/        Generated sitemap/robots/social metadata
  public/       Logos, fonts, favicon and social preview
server/src/
  config/       Environment and MongoDB setup
  models/       Lead, Post, User
  routes/       Contact, articles, admin login
  middleware/   Admin authorization and errors
  services/     Durable GitHub backup worker
  seed/         Non-destructive bootstrap and explicit maintenance
 google-apps-script/  Standalone Sheets integration
 tests/               Regression tests
```

## Google Analytics 4

The public website uses measurement ID `G-B2XQDE7L8D`. `VITE_GA_MEASUREMENT_ID` can override it; an empty value disables analytics. Tracking runs in production builds and uses the visitor's actual website origin, including custom domains. The Vite development server does not track visits. Production previews can send visits after consent; build with an empty measurement ID when testing without collection. `VITE_SITE_URL` controls canonical URLs and the sitemap, rather than restricting Analytics to one host.

Google's script loads only after Analytics consent. Accept all enables Preferences and Analytics, Reject optional disables both, and Settings saves them independently. Previous consent is requested again because Analytics is a new purpose. Withdrawal sets GA's opt-out flag and deletes first-party `_ga` cookies without reloading the page. Only known public routes produce manual page views; admin routes and unknown URLs are excluded. Page locations omit queries and fragments, and contact form fields are never sent by this integration. Ads and Google Signals are disabled in the tag.

Before publishing, open Google Analytics → Admin → Data streams → your web stream and turn **Enhanced measurement off**. This integration sends its own SPA page views: automatic history tracking would duplicate them, and automatic form/search/outbound events are unnecessary here. Also leave Google Signals, user-provided data collection, and advertising features disabled in the property. These account settings cannot be changed by the website code. See [Google's page-view guidance](https://developers.google.com/analytics/devguides/collection/ga4/views).

Redeploy the site, visit the public domain, allow Analytics, and check Reports → Realtime. Reports count consenting visitors; users who reject analytics or block Google will not appear. This project does not embed Analytics reports or require an Analytics API secret.


## Search optimization and publishing

Production builds prerender all nine public pages and every bundled blog article into complete HTML, including their real headings, text, links, unique page titles, descriptions, canonical URLs, social previews and Organization/WebSite/WebPage or BlogPosting JSON-LD. The same React app takes over for interactive navigation, forms, themes and consent; this does not change contact delivery. No ratings, prices, certifications or social profiles are invented for structured data.

Vercel rewrites serve each generated page at its existing URL. Trailing slashes redirect to the canonical URL, and unmatched routes use the generated `404.html` rather than the homepage. Admin pages are noindex; robots.txt allows crawlers to read that instruction. Express serves the same pages with per-response CSP nonces and preserves contact query parameters on redirects. MongoDB articles added after a build still load through the client API; add them to the shared published content and rebuild to include their full static HTML and sitemap entries. Static snapshots describe the published content at build time, so content and publication-status changes need a rebuild.

To make the improvements live, redeploy the updated project to Vercel. Then verify this site's URL-prefix property in [Google Search Console](https://search.google.com/search-console), submit `https://anvexasecuritysolution.vercel.app/sitemap.xml`, and use URL Inspection on the homepage, services page and an article. Search Console verification and submission require access to your Google account; the repository cannot perform them. See [Google's sitemap instructions](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Search engines control indexing and ranking; these changes do not promise a ranking position.


## Development support enquiries

Benkyō Technologies is listed as Anvexa's development support partner on Home and About. Their direct website, email and phone are not displayed. The partner CTA links to `/contact?plan=development`, preselecting Development Support in Anvexa's existing form. Visitors can also choose that service manually. All enquiries use the existing Anvexa delivery providers and admin lead records; the website does not send them directly to Benkyō. Express, Vercel and the Apps Script validator accept the new service option. If Google Sheets capture is configured, redeploy the updated Apps Script web app before publishing this frontend so the old deployed validator does not reject development enquiries.

## Homepage content

The homepage contains an introduction, three service choices with deliverables, a four-stage engagement overview, a compact framework summary, an illustrative dashboard, the development partner introduction and a final contact prompt. Detailed service, company and engagement information remains on Services, About and How It Works. The homepage's service enquiry links preselect the matching service in the existing contact form. Edit the layout and homepage copy in `client/src/pages/Home.jsx`; shared service descriptions are in `client/src/data/content.js`. The original theme, lifecycle animation and card reveals remain in use.

## Public page content

Public page content has distinct roles: Home summarises the available support; About explains the working approach, frameworks and development partner; Services describes technical activities; How It Works describes delivery and handover; Pricing explains engagement options and quote factors; Contact gathers security and development requirements. Ongoing monitoring and response depend on the agreed scope. Dashboard figures are explicitly marked as a sample.

## Database migrations

This repository does not currently include migration files or a migration command. MongoDB models are in `server/src/models`. The seed command initializes missing content and an admin account; it is not a database migration. Switching GitHub storage modes does not move historical records automatically.
