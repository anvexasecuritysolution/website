# Anvexa Security Solutions — MERN

React (Vite) front end + Express/Node API + MongoDB (Mongoose).
Your original design language (palette, Syne + DM Sans, layout) is preserved.

## Quick start

```bash
# 1. Prerequisites: Node 18+ and a MongoDB instance (local or Atlas)
npm run install:all

# 2. Configure the API
cp server/.env.example server/.env      # then edit MONGO_URI, JWT_SECRET, ADMIN_PASSWORD

# 3. Seed blog posts + admin user
npm run seed

# 4. Run API (:5000) and web (:5173) together
npm run dev
```

Open http://localhost:5173 · Admin: http://localhost:5173/admin/login

## Saving leads as JSON in GitHub

Every contact/demo request is saved in MongoDB **and** appended to a JSON file in a GitHub repo
(default `data/leads.json`, one commit per lead). Example entry:

```json
{ "id": "...", "submittedAt": "2026-09-29T10:15:00.000Z", "firstName": "Asha", "lastName": "Rao",
  "email": "asha@example.com", "company": "Acme", "industry": "IT / SaaS",
  "service": "Security Assessment (VAPT & Risk)", "message": "...", "status": "new" }
```

Setup:
1. Create a **private** GitHub repo (the file holds names and emails), e.g. `anvexa-leads`.
2. GitHub > Settings > Developer settings > Fine-grained tokens > select only that repo > *Contents: Read and write*.
3. In `server/.env` set `GITHUB_TOKEN`, `GITHUB_REPO=your-username/anvexa-leads`, and optionally `GITHUB_BRANCH` / `GITHUB_LEADS_PATH`.
4. Restart the API. Leave `GITHUB_TOKEN` blank to switch this off.

If GitHub is unreachable the request is still saved in MongoDB and the error is logged.
The JSON file is a snapshot at submit time; later status changes in the admin page are not written back.

## No-server setup (recommended for Vercel/Netlify static hosting)

The contact form can run with no backend at all. Set one or both in Vercel > Settings > Environment Variables, then redeploy:

- `VITE_WEB3FORMS_KEY`: get a free key at web3forms.com (enter your email, the key arrives by mail). Each enquiry is emailed to you. Free plan: 250/month, no stored history.
- `VITE_SHEETS_URL`: each enquiry becomes a row in your own Google Sheet. Open a Sheet > Extensions > Apps Script, paste `google-apps-script/Code.gs`, set `NOTIFY_EMAIL` if you want an email alert, then Deploy > New deployment > Web app (Execute as: Me, Access: Anyone) and copy the `/exec` URL.

If neither is set, the form uses the `/api` backend instead. The blog works without a backend (articles are bundled in `client/src/data/posts.js`).
Note: `VITE_` values are public in the built site. That is normal for both services.

## Deploying on Vercel (no separate server)

`client/api/` contains Vercel serverless functions, so the site works on Vercel alone:

- `POST /api/leads` validates the form and saves it to `data/leads.json` in your private GitHub repo.
- `GET /api/posts` and `GET /api/posts/:slug` serve the blog articles (`client/api/_lib/posts.js`).

Steps:
1. In Vercel, set the project **Root Directory** to `client`.
2. Add Environment Variables: `GITHUB_TOKEN`, `GITHUB_REPO` (and optionally `GITHUB_BRANCH`, `GITHUB_LEADS_PATH`).
3. Redeploy. Leave `VITE_API_URL` empty.

The MongoDB admin panel (`/admin`) needs the Express server and is not part of the Vercel-only setup.

## Structure

```
anvexa/
├── client/                     React + Vite
│   └── src/
│       ├── api/client.js       fetch wrapper (typed errors, bearer token)
│       ├── components/         Layout, Navbar, Footer, Seo, Reveal, PipelineRing, RequireAuth
│       ├── context/            AuthContext (admin JWT in sessionStorage)
│       ├── data/content.js     all static copy (edit text here, not in JSX)
│       ├── pages/              Home, About, Services, HowItWorks, Pricing, Blog, BlogPost, Contact, NotFound
│       │   └── admin/          Login, Leads
│       └── styles/global.css   your original CSS + additions
└── server/                     Express API
    └── src/
        ├── config/             env validation, Mongo connection
        ├── models/             Lead, Post, User
        ├── routes/             posts, leads, auth
        ├── middleware/         auth (JWT), error handling (zod → 422)
        └── seed/seed.js        6 blog posts + admin user
```

## API

| Method | Path               | Auth | Purpose                               |
|--------|--------------------|------|---------------------------------------|
| GET    | /api/health        | –    | Liveness check                        |
| GET    | /api/posts         | –    | List published posts                  |
| GET    | /api/posts/:slug   | –    | Single post                           |
| POST   | /api/leads         | –    | Contact form (rate-limited, validated)|
| GET    | /api/leads         | JWT  | List leads (`?status=new`)            |
| PATCH  | /api/leads/:id     | JWT  | Update lead status                    |
| POST   | /api/auth/login    | –    | Admin login → JWT                     |

## What changed vs. the original HTML

**Architecture** — Real URLs (`/pricing`, `/blog/:slug`) via React Router instead of show/hide pages, so pages are linkable, shareable and work with the back button. Contact form now saves to MongoDB; blog comes from the API with real article pages; admin dashboard to triage leads.

**Security** — helmet, CORS allow-list, request size limit, zod validation, rate limits (form + login), honeypot spam trap, bcrypt-hashed admin, JWT, env validation at boot.

**UX / accessibility** — skip link, focus rings, `aria-expanded` menu (Esc closes), labelled form fields with inline errors, proper `<main>`/`<nav>`, semantic list for the lifecycle, per-page titles/meta descriptions, 404 page, plan-aware contact links (`/contact?plan=retain` pre-selects the service).

**Bug fixes** — the hero SVG had a duplicated `text-anchor` attribute and overlapping labels (now generated from data and positioned by angle); footer year is dynamic (was hard-coded 2025); the nav "Get Protected" button was hidden on mobile with no replacement (now in the menu).

**Positioning** — SMB/SME/MSME references removed. Internal sales terms (Land/Fix/Retain/Expand) became Assess/Remediate/Monitor/Respond, and the internal go-to-market roadmap became a client-facing four-stage engagement process.

## Design system

- **Type scale (fixed):** H1 48 · H2 34 · H3 25 · card title 21 · body 19 · text 17 · small 15 px (H1–H3 and body shrink slightly under 700px). Defined once as `--fs-*` tokens at the end of `global.css`; every `font-size` in the stylesheet uses a token.
- **Fonts:** Syne for headings/labels, DM Sans for body and UI.
- **Card colours:** seven fixed accents (`--c1`…`--c7`), assigned by position within each group in `components/Layout.jsx`.
- **Dropdowns:** custom `components/Select.jsx` (keyboard accessible) so option lists are always dark.
- **Icons:** `lucide-react` via `components/Icon.jsx` (no emoji).

## Before you launch

- The old statistics bar was removed (figures were unsourced). If you reintroduce numbers, cite them.
- **Blog bodies** in `seed.js` are short placeholder drafts (each ends with "Replace this draft…"). Write the real articles, and verify regulatory claims (CERT-In, DPDP timelines) with counsel.
- Confirm the phone number/email in `client/src/data/content.js`, and add real Privacy Policy / Terms pages (footer text currently isn't linked).
- Contact form only stores leads. To get notified, add an email step (e.g. Nodemailer/Resend) inside `routes/leads.js` after `Lead.create`.
- Use a strong `JWT_SECRET` and `ADMIN_PASSWORD`; never commit `.env`.

## Deploy

**Single server:** `npm run build` then `NODE_ENV=production npm start` — Express serves `client/dist` and the API from one origin.

**Split:** host `client/dist` on Netlify/Vercel/S3, the API on Render/Railway/EC2; set `VITE_API_URL` at build time and `CLIENT_ORIGIN` on the API. For SPA hosting, add a rewrite of all paths to `/index.html`.
