# Project context

**Read this first.** Everything needed to make a correct change without re-deriving it.

---

## 1. What this is

A B2B marketing site for **AI Robotics**, which sells autonomous commercial cleaning
robots. The buyer is a facility manager, EVS manager, COO or procurement lead — not a
consumer. The site's single job is to **produce qualified quote requests**.

Domain not yet registered. Site name is "AI Robotics" throughout.

### The fleet — 6 machines

| Model | Kind | Signature fact | Origin |
|---|---|---|---|
| **L3** | Compact scrubber | 700 mm passage; voice control; 96-beam LiDAR | Cenobots |
| **L4** | Edge-cleaning scrubber | Fits a standard doorway; scrubs to <3 cm of wall | Cenobots |
| **L50** | High-capacity scrubber | 55 L tank; 40–60,000 ft² per charge | Cenobots |
| **SP50** | AI spot cleaner | Patrols for scattered mess; 18 L dust bag | Cenobots |
| **S5** | Industrial sweeper | Dry debris; TeamClean fleet mode | Cenobots |
| **V3** | Vacuum sweeper | Sweeps + vacuums hard floors and carpet; H13 HEPA | Cenobots |

The **C5** (Agibot) stays in `lib/robots.ts` with `hidden: true` — not currently sold.

All machines are branded and sold **as AI Robotics**. Manufacturer names belong in these
docs, not in customer-facing copy.

---

## 2. Stack

| | |
|---|---|
| Framework | **Next.js 16.3.1**, App Router, Turbopack |
| React | 19.2.8 |
| Styling | **Tailwind CSS v4** — CSS-first config, no `tailwind.config.js` |
| Language | TypeScript 5 (strict) |
| Animation | **motion v13** — import from `motion/react` (framer-motion's successor) |
| Images | `next/image` + `sharp` 0.35.3 available for asset generation |
| Node | v24 |

### Next 16 specifics that differ from older training data

- Route params are **async**: `async function Page({ params }: PageProps<"/robots/[slug]">)`
  then `const { slug } = await params`. Same for `searchParams`.
- `PageProps<"/route">` and `LayoutProps<"/">` are **globally available generated types** —
  don't hand-write prop interfaces for pages.
- Tailwind v4 config lives in `app/globals.css` under `@theme { … }`.
- Icons use file conventions: `app/icon.png`, `app/apple-icon.png` — Next emits the
  `<link>` tags automatically. Don't add them to `metadata` manually.
- `<html>` needs `data-scroll-behavior="smooth"` when CSS sets `scroll-behavior: smooth`,
  or Next logs a warning.

> **Per `AGENTS.md`: read `node_modules/next/dist/docs/` before writing framework code.**
> This version has breaking changes vs. most training data.

---

## 3. Design system

Full token definitions: **`app/globals.css`** (`@theme` block). Summary:

### Palette — Industrial Graphite + Safety Amber

| Token | Value | Role |
|---|---|---|
| `base` | `#12141A` | page ground |
| `surface` | `#1C1F26` | cards, raised panels |
| `raise` | `#232733` | card image wells |
| `line` | `#2C313C` | borders, dividers |
| `amber` | `#FF9A1F` | **the accent** — CTAs, key data, eyebrows |
| `amber-hot` | `#FFB84D` | hover |
| `amber-deep` | `#C46F00` | amber on light backgrounds (contrast) |
| `paper` / `paper-dim` | `#FAFAF8` / `#F1F0EC` | light sections |
| `ink` / `ink-soft` | `#0A0B0E` / `#4C515B` | text on light |
| `fog` / `cloud` / `snow` | `#9AA1AC` / `#E4E6EA` / `#F4F5F7` | text on dark |
| `danger` | `#E5484D` | **errors only** |

**Rules:** amber is for action and data, never decoration. Red is reserved for genuine
error states so amber never reads as a warning. Amber fails contrast on white at body
sizes — on light sections use `amber-deep`, or amber only for fills and large display type.

### Typography

| Role | Face | Notes |
|---|---|---|
| Display | **Archivo** | `.display` class: `font-stretch: 125%`, uppercase, weight 800 — reads like equipment badging |
| Body | **IBM Plex Sans** | |
| Data | **IBM Plex Mono** | `.stencil` class for eyebrows/labels; all specs and numbers |

Numbers are always mono + `tabular-nums` — specs should read like instrument readouts.

### Signature motifs

- **Hazard striping** (`.hazard`, `.hazard-thin`) — diagonal amber/black bands from
  warehouse floor marking. Used at section seams and under the footer.
- **Stencil eyebrows** — mono uppercase label preceded by a small amber square.
- **Scanner stage** — the homepage robot spotlight (see §5).

### Motion

`.reveal` + `components/reveal.tsx` (IntersectionObserver adds `.in-view`).
`prefers-reduced-motion` is honoured globally in `globals.css` and via `useReducedMotion()`
in the spotlight. **Every animation must survive being switched off.**

---

## 4. Content architecture

Robot content is **fully data-driven**. Adding or editing a machine means editing data,
not pages.

```
lib/robots.ts         → Robot[] : specs, features, copy, spec groups, cross-sell
lib/robot-images.ts   → which photo renders where, per robot slug
        ↓
app/robots/[slug]/page.tsx   → one template renders all 5 product pages
app/robots/page.tsx          → lineup + comparison table
app/page.tsx                 → homepage (hero, spotlight, lineup, proof, testimonials)
```

### `lib/robots.ts` — the `Robot` shape

- `heroStats` — 4 figures for the instrument-panel band under the hero.
- `features[]` — each has `eyebrow`, `title`, `body`, optional `bullets`, optional
  `imageKey`. **Features *with* an `imageKey` render in the light "paper" sections with
  alternating image/text; features *without* render as dark statement columns.** That
  split is automatic — it's how you control a page's rhythm.
- `specGroups[]` — the full spec table; `metric` required, `imperial` optional
  (unit toggle falls back to `metric` when there's no imperial variant).
- `compare[]` — sibling slugs for the cross-sell block.

### `lib/robot-images.ts` — the `RobotImages` shape

| Field | Purpose |
|---|---|
| `hero` | wide banner behind the product hero |
| `heroClass` | crop bias override (e.g. L50 needs `object-[65%_30%]`) |
| `heroForeground` | transparent cutout composited on the hero — for robots with no wide banner (C5, S5) |
| `heroForegroundClass` | position/size override for that cutout |
| `product` | transparent cutout for lineup cards |
| `features{}` | keyed to `feature.imageKey` in `robots.ts` |
| `scenes[]` | in-situ gallery replacing the plain environment chips (only L50 has these) |

Everything is optional. Missing photos degrade gracefully — cards show a
"Photography in progress" placeholder, environment chips fall back to text.

**Portrait feature images are detected automatically** from intrinsic dimensions
(`isPortrait()` in the `[slug]` page) and rendered centred at a capped height, so tall
cutouts don't tower over the column. No config needed.

### The comparison table

`app/robots/page.tsx` holds `compareRows` — a hand-maintained array keyed by robot slug.
**Adding a robot to `lib/robots.ts` does not update this table.** You must add the new
slug to every row, or its column renders blank.

---

## 5. Page inventory

| Route | Notes |
|---|---|
| `/` | Hero (headline above the machine, copy below — see [D-007](decisions.md#d-007)), animated L3 spotlight, ROI proof band, lineup, verticals, testimonials, quote CTA |
| `/robots` | Lineup grid + 5-column comparison table |
| `/robots/[slug]` | Static-generated for all 6 machines from one template |
| `/contact` | Quote form. Accepts `?robot=<slug>` to pre-select a machine |
| `not-found` | 404 |

### The homepage spotlight — `components/robot-spotlight.tsx`

A deliberate answer to Cenobots' generic particle carousel. Everything animated is
something the robot **actually does**: a LiDAR-style sweep beam crosses the stage, spec
callouts ping in like radar contacts anchored to real parts of the machine, the robot's
own amber beacon breathes, and a fixed point-cloud flickers. Positions are hard-coded
(not random) so server and client markup match — **don't introduce `Math.random()` here.**

Currently shows the L3 only, labelled `01 / 05`. It's props-driven, so cycling through
the fleet is a straightforward extension.

### The quote form — `app/contact/`

`actions.ts` is a server action: honeypot field, server-side validation, appends to
`data/leads.jsonl` (gitignored). **Leads currently go nowhere but that file** — wiring a
real destination (email/CRM) is an open task.

Required fields: name, email, phone. Optional: company, address, interested robot,
facility size, message.

---

## 5b. Languages

The site is bilingual: English at `/en`, Thai at `/th`. Every page lives
under `app/[lang]/`; nothing is served from the bare root.

| Piece | Where |
|---|---|
| Locale list, default, unit system, `localePath()` | `lib/i18n/config.ts` |
| Dictionary loading (Thai layered over English) | `lib/i18n/dictionary.ts` |
| Robot data translation overlay | `lib/i18n/localize-robots.ts` |
| Customer reference overlay | `lib/i18n/localize-references.ts` |
| Locale redirect / language negotiation | `proxy.ts` |
| Translator hand-off + workflow | `docs/translation/` |

**Middleware is called Proxy in Next 16.** `proxy.ts` at the repo root reads
a `locale` cookie set by the switcher, falls back to `Accept-Language`, then
to English, and redirects any unprefixed path.

**Thai copy is metric; English is imperial.** Not just prose — headline stats
are swapped and the spec-table unit toggle is hidden on Thai. See
`docs/translation/README.md`.

**Thai needs its own font.** Saira and IBM Plex carry no Thai glyphs, so
Noto Sans Thai is loaded and sits behind them in every stack. `globals.css`
also relaxes the display treatment for Thai — no uppercase, looser leading —
because Thai has no letter case and its tone marks clip at tight line-height.

## 6. Environment gotchas

These have each cost time at least once.

1. **The dev server port moves between sessions.** The user keeps their own `next dev`
   running (3001 one day, 3000 the next). Next refuses a second instance for the same
   directory. **Find the live port from the "Another next dev server is already running"
   error before smoke-testing — never assume, never start a competing server.**

2. **Python is not installed** (Windows Store stub only). The `ui-ux-pro-max` skill's
   `scripts/*.py` cannot run — read its CSVs in `data/` directly instead.

3. **`public/robots/C5/` is capitalized.** A dev-server file lock blocked renaming it.
   Import paths must match that case exactly or Linux deploys (Vercel) will 404 the
   images. Every other robot folder is lowercase.

4. **sharp applies `.extend()` *after* `.resize()`**, regardless of chain order. To pad
   then resize, do it in two passes via `.toBuffer()`. Chaining them in one pipeline
   silently produces wrong dimensions.

5. **Git reports `LF will be replaced by CRLF`** on every file. Cosmetic; a
   `.gitattributes` with `* text=auto eol=lf` would silence it. Not yet added.

---

## 7. Brand assets

`public/brand/` holds four originals from the client (AI Robotics wordmark, 2026-08-26),
all on a generous transparent canvas — the wordmark's ink is 71% of its canvas height,
the symbol's 52%. Left exactly as delivered:

| File | What |
|---|---|
| `AI-ROBOTICS.png` | 8750×1789 horizontal lockup, **pure white** — the only one that works on the graphite ground |
| `AI-ROBOTICS-01.png` | 8750×1789 horizontal lockup, amber mark + navy wordmark — light backgrounds |
| `AI-ROBOTICS-02.png` | 5000² stacked lockup, amber + navy — light backgrounds |
| `AI-ROBOTICS_Symbol.png` | 5000² the A mark alone, no wordmark |

Derivatives, regenerated by `node scripts/build-brand-assets.mjs`:

- `wordmark-white.png` (1400×234) — trimmed to the ink so `h-7` means seven units of logo. **Used in the header and footer.**
- `app/icon.png` (512²) — the symbol on opaque white; navy vanishes on a dark browser tab
- `app/apple-icon.png` (180²) — same, opaque because iOS composites alpha unpredictably

The two light-background lockups are unused: the site has no logo on a light section yet.

---

## 8. Open questions

| Question | Blocks |
|---|---|
| Target territory / market? | Default units (metric vs imperial), currency, phone format |
| Where should leads go — inbox, CRM, database? | Contact form is writing to a local file |
| Permission to use the named customer testimonials? | They are the manufacturer's customers, not AI Robotics's |
| C5 physical dimensions, speed, passage width? | Those spec rows show `—`; Agibot doesn't publish them |
| Domain registration | Deployment, metadata `metadataBase`, sitemap |

### Known wart

`public/robots/l50/l50-console.jpg` shows **CenoBots branding on the robot's touchscreen
UI**. The machine's shell is AI Robotics-branded but the software isn't. Flagged to the
user; awaiting a replacement photo.
