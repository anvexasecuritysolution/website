# SEO implementation and launch checks

The project includes prerendered public pages, unique metadata, canonical links,
an absolute sitemap, social metadata and Organization/WebSite/WebPage JSON-LD.
Four assessment detail pages cover web applications, APIs, servers and networks.
Home and Services link to these pages. Blog pages identify the publisher and link
to relevant official reading; no individual author or review date is invented.

## Domain and Search Console

- The current default origin is https://anvexasecuritysolution.vercel.app.
- When a custom domain is approved, connect it in Vercel and set `VITE_SITE_URL`
  to that HTTPS origin before rebuilding. Redirect the old host to the preferred
  host through the hosting platform. Do not redirect unrelated preview hosts.
- Verify the final domain in Google Search Console, preferably using its DNS
  verification instructions. Submit `/sitemap.xml` and inspect Home, Services,
  each assessment page, Contact and representative articles.
- Confirm the public address and social accounts are approved before publishing.

## Production checks after deployment

- Direct requests to all sitemap URLs must return their own page with HTTP 200.
- `/faqs`, `/team` and `/services/:slug` have explicit Vercel rewrites.
- A nonexistent page or article must return HTTP 404, rather than a 200 fallback.
- Check canonical host consistency, redirects, social image access and robots.txt.
- Validate structured data with Schema.org Validator and Google's applicable
  testing tools. Organization markup is not a guarantee of a rich result.
- Measure mobile performance with PageSpeed Insights and inspect Search Console
  field data when available. Record LCP, INP and CLS; do not infer scores from
  bundle sizes. Evaluate route splitting and further image compression against
  measured bottlenecks while preserving prerendered content and animations.
- Confirm consent settings and enquiry submissions still work. Do not send real
  leads as a test without approval.

## Editorial maintenance

- Maintain titles and descriptions in `client/shared/seo.js`; these take priority
  over page-level SEO props for registered pages.
- Maintain assessment guidance in `client/shared/service-pages.js`.
- Add genuine author/reviewer attribution only after it is approved. Add review
  dates only after substantive review, and do not alter publication dates to
  make older articles appear new.
- Keep regulatory summaries and sources current; technical assessments do not
  imply certification, accreditation or guaranteed legal compliance.

No production indexing, Search Console verification, domain connection or mobile
performance score is claimed by the local build checks.
