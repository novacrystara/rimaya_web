@AGENTS.md

# Rimaya — Project Guide

> Lead-generation website for **Rimaya** (UK): **Payroll · Recruitment · Consulting**.
> This file is the single source of truth for how this project is built and why.

---

## 1. What this project is

**This website is a lead-generation engine, not a brochure.** Every decision — layout,
copy, component — is judged against one question: *does this help convert a stranger
into a lead?*

There are **two audiences and two conversions**:

| Audience | Need | Conversion |
| --- | --- | --- |
| **Businesses** | Payroll / Recruitment / Consulting | **"Get a Quote"** |
| **Candidates** | A job | **"Apply + upload CV"** |

The candidate funnel feeds the business funnel: every CV uploaded grows the talent
database, which strengthens the recruitment pitch to employers. It is a business
asset, not a side feature.

**Service hierarchy (reflect this everywhere):** Payroll is the **flagship** and gets
headline weight and visual priority. Recruitment second, Consulting third.

---

## 2. Commands

```bash
npm run dev      # dev server → http://localhost:3000
npm run build    # production build (also runs TypeScript checks)
npm start        # serve the production build
```

There is **no linter or test suite configured**. Verify work with `npm run build`
(it type-checks) plus a visual check in the browser.

---

## 3. Stack

- **Next.js 16** (App Router, Turbopack) — ⚠️ see `AGENTS.md`: this version has
  breaking changes; check `node_modules/next/dist/docs/` before using unfamiliar APIs.
- **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** — CSS-based config via `@theme` in `app/globals.css`.
  **There is no `tailwind.config.js`.**
- **Framer Motion** — purposeful animation only
- **React Hook Form + Zod** — form state + validation
- **Resend** — email delivery (optional; see §7)
- **lucide-react** — icons

---

## 4. Design system (locked)

Defined in [`app/globals.css`](app/globals.css) under `@theme`.

### Colours
| Token | Hex | Use |
| --- | --- | --- |
| `brand` | `#005597` | Deep blue — headings, nav, footer, dark bands, structure |
| `action` | `#006dc1` | Bright blue — **buttons/clickable things ONLY** |
| `action-hover` | `#00559a` | Button hover |
| `canvas` | `#ffffff` | Main background |
| `surface` | `#f8fafc` | Alternating sections |
| `surface-blue` | `#f0f6ff` | Soft blue bands |
| `ink` | `#0f172a` | Body text |
| `muted` | `#475569` | Captions |
| `hairline` | `#e2e8f0` | 1px borders |

**Hard rules:**
1. **`action` blue is reserved for things you click.** Never decorative. One bright
   button on a white/navy screen is magnetic; bright blue everywhere kills its meaning.
   **But `action` is a light-surface colour.** On a navy band it sits a shade off
   the background and reads as disabled — there, **white is the primary button**
   (`variant="onDark"`) and the secondary is `outlineOnDark`. Putting an `action`
   button next to a white one on navy inverts the hierarchy you meant.
2. **Sharp 90° corners everywhere** — enforced globally via `* { border-radius: 0 }`.
   Never add `rounded-*` classes.
3. **60/30/10** — ~60% white/surface, ~30% deep blue + neutrals, ~10% action blue.
4. Contrast is verified: white on `#006dc1` = 5.31:1 (AA), on `#005597` = 7.65:1 (AAA).
   **Blue text on white must use `#005597`**, never `#006dc1` at small sizes.

### Backgrounds (Azure-inspired)
White base + soft light-blue gradient washes; **never two identical backgrounds
touching**. Helper classes in `globals.css`:
- `.bg-hero-wash` — hero gradient (pair with the `background_texture.png` image layer)
- `.bg-soft-blue` — soft blue band
- `.bg-azure-wash` / `.bg-azure-mint` — Azure-style pastel washes (lavender ·
  cyan · mint blooms on white). Used on the homepage: `WhatIsRimaya` and
  `WhyRimaya`. ⚠️ **Backgrounds only, and keep every bloom under ~0.2 alpha.**
  These are light, not brand colours — saturate them or put the hues on text,
  borders, or icons and they start competing with `action` blue.
- `.bg-brand-band` — **dark navy band** (footer, CTA sections). Self-contained: grid
  texture + glow + gradient + solid navy fallback in ONE background stack.
  ⚠️ **Do not add `.bg-grid` alongside it** — a second `background-image` rule
  overrides the gradient and the band renders white.

### Typography
**Geist** (headings, `--font-heading`) + **Inter** (body, `--font-sans`), via `next/font`.
⚠️ Headings intentionally have **no fixed colour** so they inherit context — dark on
light sections, white on navy bands. Don't add `color` to the global `h1–h5` rule.

### Motion
`components/ui/Reveal.tsx` — fade + 16px rise, once, on scroll-in (150–300ms range,
ease-out). Rules:
- Hover states use colour/shadow only — **never** scale transforms (layout shift).
- ⚠️ **`Reveal` must never branch its DOM on `useReducedMotion()`** — that causes an
  SSR/CSR hydration mismatch. Reduced motion is handled purely in CSS via the
  `[data-reveal] { opacity: 1 !important }` override in `globals.css`.

---

## 5. Architecture

```
app/
  layout.tsx              Root: fonts, metadata, Header/Footer/BackToTop
  page.tsx                Home — the conversion spine (+ Organization schema)
  payroll/                Flagship service page (deepest)
  recruitment/            Service pitch → leads into jobs
  consulting/             Service page  ⚠️ placeholder content
  jobs/                   Job board (filterable, landscape rows)
    [slug]/               Job detail + apply form (+ JobPosting schema, SSG)
  submit-cv/              Speculative CV → talent pool. The ONE destination for
                          every "Submit / Send your CV" CTA (they all used to
                          point at /jobs, which answered a different question).
  about/ contact/         Trust + lead capture
  api/apply/route.ts      Application + CV upload → email
  api/contact/route.ts    Enquiry → email
  sitemap.ts robots.ts not-found.tsx

components/
  layout/    Header (logo left · centred nav · CTA right), Footer, BackToTop
  home/      Hero, TrustStrip, ServicePillars, WhyRimaya, CandidateBand,
             Testimonials (+ TrustpilotWidget)
  sections/  PageHero, FeatureCards, CTASection   ← reusable across pages
  jobs/      JobCard, JobsExplorer (client filters), ApplicationForm (client)
  contact/   ContactForm (client, reads ?intent=)
  ui/        Button, Container, Logo, Reveal, SectionHeading, SocialIcons

lib/
  site.ts    Company details, nav, services   ⚠️ contains TODO placeholders
  jobs.ts    Typed job data (drives board + teaser + detail pages)
  email.ts   Email delivery + HTML escaping
  utils.ts   cn() class helper
```

### The homepage conversion spine (order is deliberate)
1. **Header** — CTA always one click away
2. **Hero** — the fork in the road; both audiences self-select (payroll-led)
3. **Trust strip** — proof within 5 seconds
4. **Service pillars** — route to need (Payroll visually prioritised)
5. **Why Rimaya** — handle the "why you?" objection
6. **Candidate band** — feed the CV database (live jobs)
7. **Testimonials** — peer proof once warm
8. **Final CTA** — catch everyone who didn't click
9. **Footer** — utility + real UK address as trust signal

**Every service page follows the same rhythm:** intro → what's included → why Rimaya → CTA.
**No page ends without a CTA.**

---

## 6. Content management

- **Jobs** → edit [`lib/jobs.ts`](lib/jobs.ts). One typed array drives the board, the
  homepage teaser, and each detail page (which are statically generated). Add/remove
  objects only. Upgrade path: swap for a CMS/DB behind the same types.
- **Company details** → edit [`lib/site.ts`](lib/site.ts).
- **Testimonials** → `components/home/Testimonials.tsx`. The section shows a curated,
  single-lane marquee of placeholder quotes **and always renders a "Write a review
  on Trustpilot" button** (points at `site.trustpilot.writeReviewUrl`). To show
  *live* Trustpilot reviews that update themselves as customers post them, set both
  `trustpilot.businessUnitId` and `trustpilot.templateId` in `lib/site.ts` (from a
  Trustpilot Business account → TrustBox); the section then swaps the curated cards
  for the official `TrustpilotWidget`. ⚠️ **Trustpilot reviews cannot be scraped**
  (their pages 403 all bots) and must never be hand-copied into the array as if real
  — the widget is the only legitimate way to display them.

---

## 7. Forms & email

Both routes validate **server-side**, use a **honeypot** (`company` field) for spam,
and return clear errors.

- `POST /api/apply` — multipart. CV: PDF/DOC/DOCX, **max 5MB**, type+size checked on
  the server. Emails the recruiter **with the CV attached**. Serves both the job
  apply form and `/submit-cv` (`ApplicationForm` has a `speculative` prop —
  same payload, different labels).
- `POST /api/contact` — JSON enquiry. Carries optional qualifying fields
  (`organisation`, `phone`, `headcount`) so an enquiry arrives priceable.
  ⚠️ The **honeypot owns the field name `company`** — the real company field is
  `organisation`. Don't rename either without changing both sides.

**Without `RESEND_API_KEY`, submissions are logged to the server console** so the flow
works in development. With a key, they email `RIMAYA_INBOX`. Copy `.env.example` →
`.env.local`. A lead that goes nowhere is lost business — never break delivery.

---

## 8. Images

Original PNGs in `Images/` (source of truth, not served). Served copies in
`public/images/` are **WebP** — the PNGs were 1.3–2MB each of photographic art,
which is the wrong format for the job; converting cut 10.55MB to 0.51MB (−95%)
with no visible loss. **Always use `next/image`.**

| File | Placed in |
| --- | --- |
| `logo.webp` | `components/ui/Logo.tsx` — the single square emblem (mark + wordmark + its own navy tile) |
| `hero_image_back.webp` | Homepage hero (LCP) + ServicePillars backdrop |
| `payroll.webp` | Payroll page (branded Rimaya dashboard) |
| `recruitment.webp` | Recruitment page ("Our approach") |
| `about_team.webp` | About page ("Our story") + WhyRimaya photo tile |
| `which_one.webp` | QuoteBand (London skyline) |
| `background_texture.webp` | PageHero wash layer |
| `*_icon.webp` | ServicePillars card icons (referenced by string path) |

**Prefer a static import** (`import hero from "@/public/images/x.webp"`) over a
string `src`. It gives a build-time blur placeholder (`placeholder="blur"`),
intrinsic dimensions, and a content-hashed immutable URL. String paths are fine
where the src is data-driven, as with the pillar icons.

To re-add art: drop the original in `Images/`, convert to WebP into
`public/images/` (sharp is already available: `.webp({ quality: 80, effort: 6 })`
for photos, `90` for flat art with alpha), then import it.

⚠️ The logo is **one square emblem on a transparent background**, and its artwork
is **deep blue** — great on white, near-invisible on navy. On dark bands it needs
a white plaque behind it (see the footer). Resize with `<Logo size={60} />`.
Opening `logo.webp` in a viewer makes it *look* like it has its own navy tile —
that's the viewer compositing the alpha; the corners are measurably `alpha 0`.

**Favicons** (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`) are generated
from the logo emblem (`Images/Logo_final.png`). `favicon.ico` is a real
16/32/48/256 multi-size ICO — browsers downscale a lone 256px entry badly.
`icon.png` and `favicon.ico` keep the emblem's transparency; `apple-icon` sits on
a **white** tile because
iOS composites transparency onto black.

---

## 9. SEO & accessibility (already wired — keep it)

- Per-page `metadata` via the Next metadata API (never manual `<head>` tags).
- Structured data: **Organization** (home), **JobPosting** (job detail).
- `sitemap.ts` + `robots.ts` — driven by `lib/site.ts` `url`.
- Semantic HTML, labelled form fields, visible focus rings, 44px touch targets,
  alt text on meaningful images (decorative images use `alt="" aria-hidden`).
- Mobile is the **primary** case — most leads arrive on mobile.

---

## 10. ⚠️ Placeholders — replace before launch

Search for `TODO` and `NOTE`.

| What | Where | Priority |
| --- | --- | --- |
| **Consulting content** (what the service actually covers) | `app/consulting/page.tsx` | 🔴 Blocking |
| Contact details (phone, email, address, company/VAT no., socials) | `lib/site.ts` | 🔴 |
| Final domain (breaks SEO/sitemap if wrong) | `lib/site.ts` → `url` | 🔴 |
| Recruitment stats (500+, 1,000+ etc.) | `app/recruitment/page.tsx` | 🟠 |
| Testimonials — curated placeholders shown until the live Trustpilot TrustBox is switched on (set `trustpilot.businessUnitId` + `templateId`); otherwise replace them with real, approved reviews | `components/home/Testimonials.tsx`, `lib/site.ts` | 🟠 |
| Job listings | `lib/jobs.ts` | 🟠 |
| Payroll scope — confirm full B2B bureau vs narrower | `app/payroll/page.tsx` | 🟠 |

**Open decisions:** hero CTA balance (business primary — flip if candidates are the
bigger volume play); job-board backend (email-only vs email + submissions dashboard).

---

## 11. Gotchas learned the hard way

1. **`lucide-react` removed brand icons** (`Linkedin`, `Instagram`, etc.) — use the
   inline SVGs in `components/ui/SocialIcons.tsx`. Verify an icon exists before use:
   `node -e "console.log('Star' in require('lucide-react'))"`.
2. **`.bg-brand-band` + `.bg-grid` together = white band.** See §4.
3. **Global heading colour breaks dark bands.** See §4.
4. **`Reveal` + `useReducedMotion` DOM branch = hydration error.** See §4.
5. **`create-next-app` rejects non-allowlisted dirs** — `Images/` had to be moved out
   during scaffold (relevant only if re-scaffolding).
6. **Windows:** the `ui-ux-pro-max` skill's Python scripts need
   `PYTHONUTF8=1 PYTHONIOENCODING=utf-8`, and `python` (not `python3`).
   ⚠️ Also: piping a file through PowerShell (`Get-Content | Set-Content`) mangles
   em-dashes unless you pass `-Encoding utf8`. Prefer the editing tools.
7. **`next/image`'s `priority` prop is deprecated in Next 16** — it's `preload` now.
   Don't reintroduce `priority`; it's in a lot of training data and older answers.
   Use `preload` only for genuinely above-the-fold art (the LCP hero, the PageHero
   wash). For anything else the docs prefer `loading="eager"` / `fetchPriority`,
   which is what the Logo uses — it's small and above the fold, but preloading it
   on every page would compete with the LCP image.
8. **`experimental.inlineCss` was measured and rejected** — see the note in
   `next.config.ts`. It emits the CSS twice (once inline, once in the RSC payload),
   which grew each page's HTML by ~204KB to save one request for a stylesheet
   that's only ~12.5KB gzipped. Measure before re-enabling.
9. **The Header is `fixed` + a spacer, not `sticky`.** The bar shrinks on scroll
   (80px → 68px); a sticky header stays in flow, so shrinking it would shorten
   the document and jump the page. The spacer (`h-16 lg:h-20`) must equal the
   *unscrolled* heights (mobile 64, desktop 80). Verify by measuring an element's
   document position before and after scrolling — drift should be 0px.
   ⚠️ **A pre-paint inline script that sets an attribute on `<html>` is a
   hydration mismatch**, even though it runs before React. There used to be a
   dismissible utility strip whose state was seeded this way (`data-strip="off"`);
   React compared the server's HTML to the mutated DOM and reported the diff on
   every load. It was removed. If you ever reintroduce pre-paint DOM state, the
   element you mutate needs `suppressHydrationWarning` — see #12.
10. **The logo is one square emblem, not a two-part lockup.** It used to be an
   R-mark plus a separate wordmark whose boxes had to be sized from their *ink*
   (they carried very different internal padding). That's gone: `logo.webp` is a
   single 1:1 image with the mark and the wordmark together — just
   `<Logo size={n} />`. ⚠️ Two traps. Its background is **transparent** and the art
   is deep blue, so it still needs the white plaque on the navy footer — opening
   the file in a viewer makes it look like it carries its own navy tile, but the
   corners measure `alpha 0`. And the wordmark inside it is small relative to the
   canvas, so it stops being legible below ~40px; the R-mark is what carries
   recognition at header size.
11. **JSX ate a space** in `` `{a} of {b} live roles` `` → rendered "9live". Where an
   expression butts against text across a line wrap, use a template literal or an
   explicit `{" "}` — and check the rendered DOM, not the source.
12. **`<body>` carries `suppressHydrationWarning`, deliberately.** Browser
   extensions (Grammarly's `data-gr-ext-installed`, password managers) inject
   attributes into `<body>` before React hydrates, which React reports as a
   mismatch on the developer's machine only — visitors without the extension
   never hit it. The prop is scoped to `<body>`'s **own attributes**, not its
   children, so a real mismatch inside the tree still surfaces. Don't spread it
   onto other elements to silence warnings — that hides genuine bugs.

### Verifying visually
Screenshots via Playwright driving system Edge/Chrome (`channel: "msedge"`, no browser
download). **Use `reducedMotion: "reduce"`** in the context — otherwise `whileInView`
content below the fold is captured at `opacity: 0` and pages look empty.

---

## 12. Deployment

**Target: Vercel.** Push to `master` and import the repo — the defaults are correct,
so there is no `vercel.json` to maintain.

⚠️ **Don't add a `.vercelignore` to skip uploading `Images/`.** It was tried and it
broke the deploy. A pattern without a leading slash (`Images/`) matches a directory
of that name *at any depth*, and Vercel's matcher folds case — so it also matched
`public/images/` and deleted the served art, failing every static image import at
build. The tell: only the files with static imports fail, since string `src` paths
resolve at runtime. Saving ~10MB of upload isn't worth that. If it's ever genuinely
needed, anchor it to the root (`/Images/`) and verify on a preview deploy.

**Set these environment variables in the Vercel dashboard** (Project → Settings →
Environment Variables), matching `.env.example`:

| Variable | Consequence if missing |
| --- | --- |
| `RESEND_API_KEY` | ⚠️ **Forms silently stop emailing.** Submissions fall back to a server-console log — fine in dev, invisible in production. A lead that goes nowhere is lost business (§7). |
| `RIMAYA_INBOX` | Enquiries and applications have nowhere to land. |
| `RIMAYA_FROM` | Must be a **verified** Resend sender for the real domain, or delivery fails. |

⚠️ **`lib/site.ts` → `url` drives `sitemap.ts`, `robots.ts`, and `metadataBase`.**
A wrong domain there ships wrong canonical URLs and a wrong sitemap — see §10.

**After the first deploy, verify rather than assume:** submit the contact form and a
job application with a real CV and confirm both arrive in `RIMAYA_INBOX`. The build
passing tells you nothing about whether email is wired up.

### Performance decisions already made — don't undo them
- Served art is **WebP** (§8); `next/image` re-encodes to **AVIF**, then WebP, per the
  browser's `Accept` header (`next.config.ts`).
- The optimiser's `minimumCacheTTL` is **1 year**. Safe because static imports are
  content-hashed, so replacing a file changes its URL.
- `poweredByHeader` is off.
- See §11.7 (`priority` → `preload`) and §11.8 (`inlineCss` rejected, with numbers).

---

## 13. Planning docs

Full reasoning lives in [`docs/`](docs/):
- `rimaya-build-brief.md` — original client brief
- `rimaya-storytelling-architecture.md` — story, journey map, page-by-page structure
- `rimaya-design-system.md` — visual spec
- `rimaya-homepage-summary.md` — one-page stakeholder overview

⚠️ **The build brief §9 specifies a "Navy & Emerald on Bone" palette. That is
superseded** — the client changed direction to `#005597` + `#006dc1` + white (§4).
