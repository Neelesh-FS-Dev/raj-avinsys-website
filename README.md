# Raj Avinsys website

Corporate and RFQ website for Raj Avinsys Pvt Ltd, built with React, TypeScript, Vite, Tailwind CSS 4 and React Router.

See [docs/CONTENT_VERIFICATION_REPORT.md](docs/CONTENT_VERIFICATION_REPORT.md) for what is published, what is excluded, and what must be confirmed before launch.

## Requirements

- Node.js 22 or newer (developed on Node 26)
- npm

## Setup

```bash
npm install
npx playwright install chromium   # only for end-to-end tests
cp .env.example .env.local        # optional, see Environment
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server on http://localhost:5173 |
| `npm run typecheck` | TypeScript, strict mode, no emit |
| `npm test` | Unit and component tests (Vitest) |
| `npx playwright test` | End-to-end and responsive tests (starts the dev server) |
| `npm run build` | Typecheck, production build, `sitemap.xml` and `robots.txt` in `dist/` |
| `npm run preview` | Serve the production build on port 4173 |
| `npm run server` | Reference RFQ API on port 8787 (`PORT` to change) |

Live-site comparison (read-only, off by default): `LIVE_AUDIT=1 npx playwright test e2e/live-audit.spec.ts`

Visual QA screenshots: `SCREENSHOT_DIR=/path/to/dir npx playwright test e2e/responsive-screenshots.spec.ts`

## Environment

Only public values belong in `.env.local`. Every `VITE_` variable is embedded in the browser bundle.

| Variable | Purpose |
|---|---|
| `VITE_RFQ_ENDPOINT` | HTTPS endpoint for RFQ submissions. Without it, the RFQ form is disabled. |
| `VITE_RFQ_MOCK` | `true` simulates submissions in development only. Ignored in production builds. |
| `SITE_URL` (build time) | Public origin for the sitemap. Defaults to `https://www.rajgrouponline.com`. |

Server variables (read by `server/index.ts`, never shipped to the browser):

| Variable | Purpose |
|---|---|
| `RFQ_STORAGE_DIR` | Where enquiries and attachments are written. Keep it outside any public folder. Default `./rfq-storage`. |
| `RFQ_ALLOWED_ORIGINS` | Comma-separated origins allowed to call the API from a browser. |
| `RFQ_ALLOW_UNSCANNED_ATTACHMENTS` | `true` accepts attachments without malware scanning. Leave unset in production. |
| `PORT` | HTTP port. Default `8787`. |

## Structure

```
src/
  data/           companyConfig, services, projects (records + mapping), navigation, certifications, history
  features/       home, about, services, projects, certifications, contact, rfq, system (404)
  components/     layout (header, footer, layout) and ui primitives
  hooks/          useDocumentMeta (route title, description, canonical, Open Graph)
  app/            router (lazy route chunks) and App
  styles/         globals.css with Tailwind 4 design tokens
e2e/              Playwright specs: site flows, responsive matrix, screenshots, live audit
server/           reference RFQ API (validation, signature checks, storage, rate limit)
docs/             content verification report, competitive benchmark, legal drafts
```

Company facts live in `src/data/`. Do not add company facts in components. Client names stay hidden until `PUBLISH_CLIENT_NAMES` is set to `true` in `src/data/projects.ts`.

## Deployment

- **Vercel:** `vercel.json` is included (build command, output directory `dist`, security headers, asset caching). Connect the repository and set `SITE_URL` if the domain is not `https://www.rajgrouponline.com`.
- **Netlify:** `public/_redirects` provides the single-page fallback. Netlify ignores `vercel.json`.
- Every public route is prerendered to its own `index.html`, so unknown paths fall back to `404.html`.
- Run `npm run build` and publish `dist/`.
- Serve `sitemap.xml` and `robots.txt` from the site root (the build writes them).
- Prerendering is not implemented. Public pages are client-rendered. See section 8 of the verification report before launch.
- Add security headers (CSP, HSTS, X-Content-Type-Options) at the host.
