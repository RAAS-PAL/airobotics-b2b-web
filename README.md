# AI Robotics

Bilingual B2B marketing site for autonomous commercial cleaning robots, sold in
Thailand by **AI ROBOTICS CO., LTD.** (บริษัท เอไอ โรโบติกส์ จำกัด).

**Live:** [airoboticsth.com](https://airoboticsth.com) · **Host:** Vercel, deployed
from `main`

Five machines — L3, L4, L50, SP50, S5 — each with its own page, plus a comparison
table, customer references, an FAQ and a quote form. Quote-only: **no prices appear
anywhere on the site.**

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

There is no local `.env` and none is needed. Without `RESEND_API_KEY` the quote form
writes submissions to `data/leads.jsonl` instead of emailing them, so the form is
fully testable offline — but **a local submission never sends mail**, which is easy
to mistake for a broken integration.

| Command | |
|---|---|
| `npm run dev` | dev server (Turbopack) |
| `npm run build` | production build — also typechecks |
| `npm run lint` | ESLint |
| `node scripts/build-dictionaries.mjs` | regenerate translations · **run after editing any copy** |

Requires Node 20+. Next.js 16.3, React 19, Tailwind v4.

---

## How content is wired

Almost nothing is hardcoded in a page. Four data modules drive the site, and pages
read from them:

| File | Owns |
|---|---|
| `lib/robots.ts` | every machine: specs, features, copy, ordering. **Adding a robot is a data edit here.** |
| `lib/robot-images.ts` | which photo appears where, per machine |
| `lib/references.ts` + `lib/reference-media.ts` | customer quotes and their site footage |
| `lib/contact.ts` | phone, email, LINE, address |

Two conventions worth knowing before editing them:

- **A machine is withheld, not deleted.** `Robot.hidden` keeps an entry with all its
  copy and specs intact while removing it from every listing, route and the sitemap.
  The C5 is currently hidden this way. Consumers read `visibleRobots`, never `robots`.
- **Never invent a specification.** If the manufacturer does not publish a figure it
  stays `—`. Sourcing for every number is in
  [`docs/research/cenobots-research.md`](docs/research/cenobots-research.md).

---

## Bilingual (`/en`, `/th`)

Thailand is the market, so **a first-time visitor lands on `/th`** regardless of
browser language — many Thai buyers run their devices in English, and matching on
`Accept-Language` sent them to the wrong site. The header switcher wins and its
choice persists for a year in a cookie. Routing lives in `proxy.ts` (Next 16 renamed
Middleware to Proxy).

Copy lives in two hand-off files that translators edit directly:

```
docs/translation/website-copy-en.txt   ← source of truth
docs/translation/website-copy-th.txt   ← translator returns this
        ↓  node scripts/build-dictionaries.mjs
lib/i18n/dictionaries/{en,th}.json     ← generated, do not hand-edit
```

That build step is also a **guard**. Thai layers over English, so a key the code asks
for but the dictionary lacks renders as English rather than failing — which silently
shipped an untranslated robot description once. The script now derives every key the
robot, reference and FAQ overlays will request and fails if any is missing. If it
reports absent keys, fix the key name or add the string; do not ignore it.

Thai also switches units to metric and hides the imperial toggle.

---

## Scripts

Asset pipelines, all re-runnable. Sources are never edited in place.

| Script | |
|---|---|
| `scripts/build-dictionaries.mjs` | translations + the key guard above |
| `scripts/build-fleet-cutout.mjs` | trims a robot render for the home-page fleet line |
| `scripts/strip-checkerboard.mjs` | removes a transparency checkerboard flattened into a PNG |
| `scripts/build-brand-assets.mjs` | header wordmark and favicons from the brand artwork |
| `scripts/build-og-image.mjs` | the social share card |

`strip-checkerboard.mjs` exists because renders repeatedly arrive with the editor's
transparency grid baked into the pixels — no alpha channel, two alternating light
greys. Dropped onto the dark site they show as a checkered slab.

---

## Deployment

Push to `main`; Vercel builds and deploys. Four environment variables must be set in
**Vercel → Settings → Environment Variables** — never in the repo:

| Variable | |
|---|---|
| `RESEND_API_KEY` | quote email delivery |
| `QUOTE_TO_EMAIL` | who receives quote requests · **single address** |
| `QUOTE_CC_EMAILS` | comma-separated extras |
| `QUOTE_FROM_EMAIL` | sender, e.g. `AI Robotics <quotes@airoboticsth.com>` |

Env changes need a redeploy. `QUOTE_TO_EMAIL` is not split on commas — put additional
recipients in `QUOTE_CC_EMAILS`.

Quote emails set `reply_to` to the customer, so **Reply goes to them, not to sales**,
and everyone on CC receives the same message.

---

## Gotchas

- **The dev server port moves.** Keep one `next dev` running; find its port from the
  "Another next dev server is already running" notice rather than starting a second.
- **Restart `next dev` after changing fonts or the `@theme` tokens** in
  `app/globals.css`. Turbopack caches the generated font modules and HMR does not
  always invalidate them — the symptom is text rendering at the wrong size while the
  CSS on disk is correct.
- **Next 16 differences from older docs:** Middleware is `proxy.ts`; route params are
  async (`const { lang } = await params`); `images.qualities` must list every quality
  used or it is silently coerced.
- **`server-only`** poisons any module a client component imports. `components/ui.tsx`
  is imported by client components, so it must not pull in the dictionary.

---

## Docs

[`docs/`](docs/README.md) carries the depth this file deliberately skips — the design
system, the reasoning behind choices that look arbitrary, what was tried and
rejected, and the product research every specification traces back to. Start with
[`docs/project-context.md`](docs/project-context.md).

Code and assets are authoritative for facts; docs describe intent. When they
disagree, the file wins — and the doc needs updating.
