# Raj Avinsys website: content verification report

Sources: the live site at https://www.rajgrouponline.com/ (homepage, about, projects, services, switchyard, turnkey, panels, certifications, careers, blog, clientele, contact), read on 2026-11-23 using Firecrawl. Nothing has been checked against original documents yet. Items marked "Needs document" must be confirmed before the site goes live.

## 1. Facts published on the site

| Fact | Value used | Status |
|---|---|---|
| Legal name | Raj Avinsys Pvt Ltd | Site states "Pvt Ltd" and "Pvt. Ltd."; confirm against the registration certificate |
| Former name | Raj Electricals | Site says "formally Raj Electricals". Published as "formerly" (wording fix) |
| Founded | 2004, Surat | Consistent across site |
| Head office | Raj Cluster, Plot No. 2, 2nd Floor, Mali ni Wadi, Near Sarin Technologies Press, A K Road, Surat 395008 | From the contact page |
| Phone | 0261-2551273 | From the contact page. Confirm |
| Email | info@rajgrouponline.com | From the contact page |
| Working hours | Mon–Sat, 9:00 AM–6:00 PM | Consistent across site |
| Branches | Vapi, Ankleshwar | Named on site. Branch addresses and phones not published (see section 2) |
| Client retention | 73%, from maintenance services | Company-stated. Needs the calculation method |
| Portfolio entries | 106 | Counted from the company's project list |
| Group | "Raj Group of Companies"; Raj Avinsys described as part of it | Relationship to be confirmed by a legal document |
| Vision, mission, values | As published | Company-stated |
| Timeline | 2004–2024 milestones | Company-stated. Dates to be reconfirmed (see section 3) |
| Copyright | © 2026 | Site footer |

## 2. Excluded from the public site

| Item | Reason |
|---|---|
| Homepage phone numbers for Vapi (+91 98765 43211) and Ankleshwar (+91 98765 43212), and "Call Us Now" (+91 98765 43210) | Sequential or placeholder-style numbers; the contact page gives only the Surat line. Confirm before publishing |
| Ahmedabad branch (2023 in the journey) | Not listed as a current office elsewhere on the site. Confirm |
| "1972" stat on homepage | Contradicts 2004 founding; looks like a leftover value |
| "20+ years" and "Two decades" as separate claims | Kept only as derived from 2004 |
| Group turnover "₹100+ Crore" | Conflicts with the 2019 entry ("25+ CR") and the 2025 entry ("Targeting 100+ CR"). Needs audited figures |
| "1000+ clients" / "1000+ corporate client associations" | Two different meanings on the site, no source. Not published |
| Leadership names | The site lists titles only. Leadership page not built |
| Client logos (about 150 on the clientele page) | Use of names and logos needs written permission |
| Client names on project pages | Withheld by default (`PUBLISH_CLIENT_NAMES = false` in `src/data/projects.ts`) |
| "Schneider Authorized Partner" (panels page) | OEM authorization claimed without proof. Not published |
| "Category A certified" and "MSME Registered" (footer) | Not published. Need the certificate |
| "Sri Lanka" and "UAE" international presence | Sri Lanka is supported by one project entry (ITC Hotels, Colombo). UAE has no project evidence. Only Sri Lanka appears in the portfolio |
| Turnkey page equipment list: DG installation, UPS installation, earthing and lightning protection, cable management, LT/HT panels up to 33 kV, "IEC and IS standards", GOD and transformer supply | Capability claims without project evidence in the portfolio. Need confirmation before they are listed as services |
| Blog "ongoing projects" (Insecticides India, Laxmi Organic, Zentiva, Narmada Sugar 15 MW, TATA AGRATAS Giga Factory) | Five entries are not in the published project list. Needs verifying and adding to `rawProjects` in `src/data/projectRecords.ts` |
| Blog posts (January 2024) | Generic copy with no article content |
| Careers page | Culture copy and event photos only; no openings. Not built |
| Services index and certifications URLs on the live site | Return "404 Page not found" on the live site (`#/services`, `#/certifications`). Fix on the live site |
| Certificate images (ISO, GETCO, RVPL, electrical contractor letter) | Images were not reviewed. Certificate numbers and validity not published |
| Engineering pages (power system studies, electrical safety audits, AMC) | Not on the live site. Not built, to avoid thin pages |
| Industries pages and location pages | Not built as separate pages. Sector summary is on the homepage; location is on the contact page |
| Privacy policy and terms pages | No content supplied. Footer links removed. Required before launch |

## 3. Claims published but still needing a document

- **Certifications:** Electrical Contractor Approval (Government of Gujarat), GETCO approval, ISO certification, RVPL registration. Need copies and dates before publishing as "verified" (the page currently lists them as "listed on the company website").
- **Historical dates:** The timeline is company-stated. Verify 2007 (D.N. Syndicate acquisition), 2011 (bio-fuel REC), 2014 (first switchyard), 2018 (first 66 kV) and 2020 (first international project).
- **Project voltages:** GACL–NALCO is described as 220 kV in its description but tagged 66 kV on the site. Shown as "Not stated". Confirm.
- **Sandwich busway ratings:** Taken from the site's descriptions (250 A to 6300 A). Confirm the ratings against job records.
- **220 kV scope:** The only 220 kV entry is a subcontract erection for L&T-ECC. The site describes switchyards "up to 220 kV" in general terms. Confirm the company's own 220 kV EPC experience.
- **Service specifications:** Voltage levels 11–220 kV are the company's stated capability, not verified project scope.
- **Execution sequences:** The step lists on service pages are the usual pattern, labelled that way. The company should confirm them.

## 4. Route inventory: live site vs this build

| Live route (hash) | Status on live site | This build |
|---|---|---|
| #/ | 200 | / |
| #/about | 200 | /about |
| #/services | **404** | /services (works) |
| #/services/turnkey-electrification | 200 | Not built as a separate service. Covered by HT/LT electrification in /services/turnkey-electrification |
| #/services/switchyard-works | 200 | /services/switchyard-works |
| #/services/sandwich-busways | 200 | /services/sandwich-busways |
| #/services/retrofitting | 200 | /services/retrofitting-utility (renamed) |
| #/services/liaising-compliance | 200 | /services/liaising-compliance |
| #/services/panel-manufacturing | 200 | /services/electrical-panels (renamed; page content reviewed) |
| #/projects | 200 | /projects (filterable) and /projects/:slug |
| #/certifications | **404** | /certifications (works) |
| #/certificates | 200 | Merged into /certifications |
| (no live industries page) | n/a | /industries, built from the portfolio's sector tags. Counts and scope lines come from project records only |
| #/clientele | 200 | Not built (permission) |
| #/careers | 200 | Not built (no openings) |
| #/blog | 200 | Not built (no article content) |
| #/contact | 200 | /contact and /rfq |

## 5. Responsiveness

### Our build (Playwright, Chromium emulation)
- 209 tests passed: 11 device profiles × 19 routes (static pages, all six service pages, the projects listing with a filter, three project detail pages, the RFQ form, a 404) plus a navigation breakpoint check per profile.
- Profiles: 320px floor, iPhone SE, Pixel 7, Galaxy S9+ (360px), iPhone 14 Pro Max (430px), iPad Mini (768px), iPad Pro 11 landscape, 1280px, 1440px, 1920px, 2560px.
- Breakpoint check: desktop navigation shows at ≥1024px, the Menu button below.
- Screenshots reviewed at 320px, 430px, 768px and 1440px (`scratchpad/screens`).

### Live site (read-only check, same profiles)
- Ran `LIVE_AUDIT=1 npx playwright test e2e/live-audit.spec.ts`: 58 of 60 passed.
- Failures: horizontal overflow on `#/about` (27px) and `#/blog` at 375px.
- Live routes `#/services` and `#/certifications` return 404 (section 4).

### Not yet tested
- Real devices and WebKit (only Chromium installed). iOS Safari and Samsung Internet are not covered.
- Landscape phone orientation (only iPad landscape).
- Live-site audit covers 4 of 11 profiles.

## 6. Test results

- `npm run typecheck`: passes.
- `npm test` (Vitest): 59 tests pass across 8 files (dataset integrity, project filters, file rules, RFQ schema, RFQ service, header menu, RFQ page, industries summaries). Re-run on 23 Nov 2026.
- Live-site comparison (`LIVE_AUDIT=1`, read-only, 23 Nov 2026): 58 of 60 pass. The two failures are horizontal overflow on the live `#/about` (27px) and `#/blog` (3px) at 375px.
- Self-hosted fonts: `site`, `a11y`, `keyboard` and `responsive` specs on Chromium pass 256 of 256.
- Chromium, after adding /industries: `site`, `a11y` and `keyboard` specs 35 of 35 pass; `a11y` and `responsive` specs 236 of 236 pass (the a11y and responsive route lists include /industries).
- `npm run test:e2e` (Playwright, dev server with mock RFQ): 14 tests pass (navigation, 404, project filter and detail, RFQ validation, attachment rejection, valid enquiry on the mock).
- Responsive matrix: 209 tests pass (section 5).
- `npm run build`: passes, with route-level code splitting (RFQ page chunk is the largest, at about 133 kB before gzip).

## 7. Backend integration contract (RFQ)

A reference implementation now lives in `server/` (Hono, Node). It enforces everything listed below. It is not deployed. Run it with `npm run server` and see the README.
- Enquiry records and attachments are written to `RFQ_STORAGE_DIR`, outside the web root, under random file names.
- Attachments are refused unless `RFQ_ALLOW_UNSCANNED_ATTACHMENTS=true` is set. Malware scanning is not implemented, so this flag must stay off in production until a scanner (for example ClamAV) is wired in.
- File contents are checked against their signatures (PDF, XLS, XLSX), not only their extensions.
- Each enquiry is written as `enquiry.json` in its reference folder. The log line records only the reference and attachment count.
- Rate limit: 5 submissions per minute per client address (in-memory; use a shared store if the API runs on several instances).
- Retention and access: not yet defined. A deletion job, admin access and encryption at rest still need to be built and approved.

- **Endpoint:** `VITE_RFQ_ENDPOINT`, HTTPS, POST, `multipart/form-data`.
- **Fields:** `fullName`, `companyName`, `workEmail`, `phone`, `designation`, `projectCategory`, `projectLocation`, `industry`, `voltageRequirement`, `scopeDescription`, `expectedTimeline`, `preferredContact`. Attachments under the repeated field `attachments`.
- **Success response:** 2xx with JSON `{ "reference": "<string>" }`.
- **Failure:** any non-2xx, or a 2xx without `reference`, is shown to the user as an error.
- **Without an endpoint:** the form is disabled and shows the email and phone line. Production never shows a fake success. The mock (`VITE_RFQ_MOCK`) is ignored in production builds.
- **Server requirements:** re-validate types and sizes (PDF/XLS/XLSX only, max 5 files, 10 MB each, 25 MB total); scan attachments for malware; store files outside the web root; apply rate limiting and abuse prevention; restrict access to tender documents; don't log uploaded content; set a retention policy.
- **Secrets:** no credentials go in any `VITE_` variable.

## 8. Remaining work before production

1. Confirm section 2 items and section 3 documents. Replace the Surat phone and email if the company has different public numbers.
2. Decide whether client names may be published, and get written permission per client before setting `PUBLISH_CLIENT_NAMES` for a given project.
3. Add privacy policy and terms pages. Drafts are in `docs/legal-drafts/` and must be reviewed by counsel before they are routed. Footer links are not present yet.
4. Deploy the RFQ API (`server/`) behind HTTPS, set `VITE_RFQ_ENDPOINT` and `RFQ_ALLOWED_ORIGINS`, and decide on retention and access. Keep attachments disabled until a malware scanner is in place.
5. **Prerendering / SEO:** implemented. `npm run build` writes 119 route pages plus `404.html`, each with rendered content, title, description, canonical, Open Graph, robots and JSON-LD. The client still renders with `createRoot` (not hydration), so the first paint is replaced once the JavaScript loads.
6. **Fonts:** self-hosted with `@fontsource` (Barlow Condensed 600/700, Inter 400/500/600/700, IBM Plex Mono 400/500/600, Latin subsets). The browser loads seven faces from the site's own origin. Inter 500 and IBM Plex Mono 500 are bundled but did not load on the home page checked. Lab scores were not re-measured after this change.
7. **Photography:** the site has no photographs. Hero uses a generic single-line diagram. Company photos should be supplied with usage rights. The live site's images were not downloaded.
8. **Accessibility:** automated axe scans (WCAG 2.2 AA) pass on every route, and keyboard-only Playwright tests cover the skip link, menus and the RFQ form. A manual screen-reader pass with NVDA or VoiceOver is still required.
9. **Performance:** Lighthouse (mobile, production build) scores 99–100 for performance, accessibility, best practices and SEO on the homepage, a service page, a project page, the RFQ page and About. These are lab results. Field data (CrUX) is needed for real-user Core Web Vitals.
10. **Competitor benchmark (Phase 2):** done at homepage level. See `docs/competitive/Raj-Avinsys-Competitive-Benchmark.pdf` (source HTML alongside). Nine competitor sites were reviewed, plus directory and search results for the rest. Its section 8 lists the company questions that block the benchmark's claims. Procurement pages, tender portals and product catalogues were not crawled.
11. **Security headers and CSP:** set in `vercel.json` (CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy). Verify on the deployed host.
12. **Sitemap domain:** the sitemap and canonical URLs use `https://www.rajgrouponline.com` by default. Set `SITE_URL` if the site launches on a different domain.

## 9. Gap audit against the 21-phase brief (23 Nov 2026)

Built and checked: header with phone, email, quotation CTA and Contact Engineering Team link; sticky header with Escape and click-outside handling; service, project, certification, RFQ and 404 pages; /industries (new); prerendered routes (120 plus 404); sitemap and robots; route-level metadata and JSON-LD; WCAG 2.2 AA axe scans on all listed routes.

Not built, with the reason:

| Brief item | Status | Reason |
|---|---|---|
| /engineering/* (power studies, safety audits, AMC) | Not built | No evidence the company offers these. The benchmark lists them as "not offered". Building them would publish unsupported services |
| /locations/:slug | Not built | Would create city-name-only pages. Branch facts are on /contact and in the footer |
| /clients, /careers, /resources | Not built | Client logos need written permission. No careers openings. No article content |
| Leadership page | Not built | No names or titles supplied |
| Company photography, logos, certificate scans | Not in repo | Needs company-supplied assets with usage rights. Not taken from the live site |
| Self-hosted fonts | Not done | Fonts are referenced but not loaded (system fallbacks). Needs the font files approved and a font package added |
| Privacy policy and terms | Not published | Drafts in docs/legal-drafts need counsel review |
| Core Web Vitals (field data) | Not measured | Lab Lighthouse scores only (section 8, item 9). CrUX data needs live traffic |
| Industries: electrical-requirement explanation per sector | Not written | Needs company-supplied engineering content. The page shows only portfolio evidence |
