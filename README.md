# Anvexa Security Solutions — MERN

React (Vite) front end + Express/Node API + MongoDB (Mongoose).
Your original single-file design (colours, fonts, layout) is preserved.

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

**Copy tweaks (review these)** — "Revenue Model" → "How We Engage" and the internal revenue line removed; "Do not build a SIEM from scratch" reworded, since both read as internal notes on a public site.

## Before you launch

- **Stats** (84%, 40%, 45%, 46%, 12%) have no source on the page — add citations; unsourced statistics hurt credibility with security buyers.
- **Blog bodies** in `seed.js` are short placeholder drafts (each ends with "Replace this draft…"). Write the real articles, and verify regulatory claims (CERT-In, DPDP timelines) with counsel.
- Confirm the phone number/email in `client/src/data/content.js`, and add real Privacy Policy / Terms pages (footer text currently isn't linked).
- Contact form only stores leads. To get notified, add an email step (e.g. Nodemailer/Resend) inside `routes/leads.js` after `Lead.create`.
- Use a strong `JWT_SECRET` and `ADMIN_PASSWORD`; never commit `.env`.

## Deploy

**Single server:** `npm run build` then `NODE_ENV=production npm start` — Express serves `client/dist` and the API from one origin.

**Split:** host `client/dist` on Netlify/Vercel/S3, the API on Render/Railway/EC2; set `VITE_API_URL` at build time and `CLIENT_ORIGIN` on the API. For SPA hosting, add a rewrite of all paths to `/index.html`.
