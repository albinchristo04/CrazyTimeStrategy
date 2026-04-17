# CrazyTimeStrategy.top — Phased Build Plan

> Generated: 2026-04-17 | Framework: Astro 5 + React islands + Tailwind 4 + Vercel | Based on: CrazyTimeStrategy_FullPlan_v2.md

---

## Phase 0 — Documentation Discovery (COMPLETE)

### Verified APIs & Commands

| Item | Command / Pattern | Source |
|---|---|---|
| Scaffold | `npm create astro@latest` | docs.astro.build/en/install-and-setup |
| React | `npx astro add react` → `@astrojs/react` | docs.astro.build/en/guides/integrations-guide/react |
| Tailwind | `npx astro add tailwind` → `@import "tailwindcss"` in global.css | docs.astro.build/en/guides/styling |
| Vercel adapter | `npx astro add vercel` → `@astrojs/vercel` | docs.astro.build/en/guides/server-side-rendering |
| API routes | `export const GET = (async ({request}) => {...}) satisfies APIRoute` | docs.astro.build/en/core-concepts/endpoints |
| Env vars | `import.meta.env.TRACKSINO_TOKEN` (server-side only) | docs.astro.build/en/guides/environment-variables |
| Content collections | `defineCollection` + `glob()` + `z.object()` in `src/content/config.ts` | docs.astro.build/en/guides/content-collections |
| React islands | `<Component client:load />` in `.astro` files | docs.astro.build/en/guides/framework-components |

### astro.config.mjs final shape (verified)
```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [react(), tailwind()],
});
```

### Anti-patterns to avoid
- Do NOT use `@astrojs/vercel/static` — must be `/serverless` for API routes
- Do NOT prefix `TRACKSINO_TOKEN` with `PUBLIC_` — it must stay server-only
- Do NOT use `client:only` for Predictor unless SSR rendering causes issues
- Tailwind 4: no `tailwind.config.mjs` file needed — use `@import "tailwindcss"` in CSS

---

## Phase 1 — Scaffold & Configuration

### Goal
Working Astro project with React, Tailwind, and Vercel adapter configured. `.env` structure established.

### Tasks

#### 1.1 — Create Astro project
```bash
cd C:/Users/albin/OneDrive/Documents/GitHub/CrazyTimeStrategy
npm create astro@latest . -- --template minimal --no-install --typescript strict
npm install
npx astro add react --yes
npx astro add tailwind --yes
npx astro add vercel --yes
```

#### 1.2 — Update `astro.config.mjs`
```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [react(), tailwind()],
});
```

#### 1.3 — Update `tsconfig.json`
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

#### 1.4 — Create `.env` (never committed)
```
TRACKSINO_TOKEN=your_bearer_token_here
```

#### 1.5 — Create `.env.example` (committed)
```
TRACKSINO_TOKEN=
```

#### 1.6 — Update `.gitignore`
Ensure `.env` is listed.

#### 1.7 — Update `src/styles/global.css`
```css
@import "tailwindcss";

:root {
  --color-brand: #f59e0b;
  --color-dark: #0f172a;
}
```

### Verification
- [ ] `npm run dev` starts with no errors
- [ ] `http://localhost:4321` loads a blank page
- [ ] `npx astro check` reports no type errors

---

## Phase 2 — Core Types, Constants & Prediction Algorithm

### Goal
Pure TypeScript library (`lib/`) with all business logic. No UI. Fully testable in isolation.

### Files to create

#### `src/lib/types.ts`
```ts
export type Segment =
  | '1' | '2' | '5' | '10'
  | 'CoinFlip' | 'CashHunt' | 'Pachinko' | 'CrazyTime';

export interface SegmentStats {
  segment: Segment;
  count: number;
  frequency: number;       // actual %
  expected: number;        // theoretical %
  lastSeen: number;        // rounds ago
  avgGap: number;          // theoretical average gap
  score: number;           // prediction score 0-100
}

export interface PredictorResult {
  updatedAt: string;
  rows: RawRow[];
  count: number;
}

export interface RawRow {
  result: string;
  // TracksIno may include other fields — keep flexible
  [key: string]: unknown;
}
```

#### `src/lib/constants.ts`
```ts
import type { Segment } from './types';

export const SEGMENTS: Segment[] = [
  '1', '2', '5', '10',
  'CoinFlip', 'CashHunt', 'Pachinko', 'CrazyTime'
];

// Theoretical wheel probabilities (source: Evolution Gaming published RTP tables)
export const BASE_RATES: Record<Segment, number> = {
  '1':         0.4444,
  '2':         0.2222,
  '5':         0.1111,
  '10':        0.0741,
  'CoinFlip':  0.0370,
  'CashHunt':  0.0370,
  'Pachinko':  0.0370,
  'CrazyTime': 0.0185,
};

export const SEGMENT_LABELS: Record<Segment, string> = {
  '1': '1',
  '2': '2',
  '5': '5',
  '10': '10',
  'CoinFlip': 'Coin Flip',
  'CashHunt': 'Cash Hunt',
  'Pachinko': 'Pachinko',
  'CrazyTime': 'Crazy Time',
};

export const SEGMENT_COLORS: Record<Segment, string> = {
  '1':         '#3b82f6',
  '2':         '#22c55e',
  '5':         '#f59e0b',
  '10':        '#ef4444',
  'CoinFlip':  '#8b5cf6',
  'CashHunt':  '#ec4899',
  'Pachinko':  '#14b8a6',
  'CrazyTime': '#f97316',
};
```

#### `src/lib/prediction.ts`
Four-signal algorithm (pure functions):

```ts
import { SEGMENTS, BASE_RATES } from './constants';
import type { Segment, SegmentStats, RawRow } from './types';

// Signal 1: base rate (theoretical probability)
// Signal 2: gap boost — overdue segments score higher
// Signal 3: cold correction — segments below expected frequency get boost
// Signal 4: recent dampening — segments hot in last 50 rounds score lower

export function computeStats(results: string[]): SegmentStats[] {
  const total = results.length;
  if (total === 0) return [];

  const recent = results.slice(-50);

  return SEGMENTS.map((seg) => {
    const count = results.filter(r => r === seg).length;
    const frequency = total > 0 ? count / total : 0;
    const expected = BASE_RATES[seg];
    const avgGap = expected > 0 ? 1 / expected : 999;

    // Last seen (rounds since last hit, searching from most recent)
    const lastSeen = (() => {
      for (let i = results.length - 1; i >= 0; i--) {
        if (results[i] === seg) return results.length - 1 - i;
      }
      return total; // never seen
    })();

    // Signal 1 — base rate weight (40%)
    const s1 = expected * 40;

    // Signal 2 — gap boost (30%)
    const overdueFactor = lastSeen / avgGap; // >1 means overdue
    const s2 = Math.min(overdueFactor, 3) * 10; // cap at 3x

    // Signal 3 — cold correction (20%)
    const coldFactor = total > 0 ? expected / (frequency || 0.001) : 1;
    const s3 = Math.min(coldFactor, 3) * 6.67; // cap at 3x

    // Signal 4 — recent dampening (10%, negative)
    const recentCount = recent.filter(r => r === seg).length;
    const recentFreq = recentCount / recent.length;
    const hotFactor = recentFreq / (expected || 0.001);
    const s4 = Math.min(hotFactor, 2) * 5; // penalise if >1x recent expected

    const rawScore = s1 + s2 + s3 - s4;
    const score = Math.max(0, Math.min(100, rawScore));

    return { segment: seg, count, frequency, expected, lastSeen, avgGap, score };
  }).sort((a, b) => b.score - a.score);
}

export function extractResults(rows: RawRow[]): string[] {
  return rows.map(r => String(r.result)).filter(Boolean);
}
```

### Verification
- [ ] `src/lib/types.ts` — no TS errors
- [ ] `src/lib/constants.ts` — BASE_RATES sum ≈ 1.0
- [ ] `src/lib/prediction.ts` — `computeStats(['1','2','1','CrazyTime'])` returns 8 items sorted by score
- [ ] Run `npx astro check` — no errors

---

## Phase 3 — API Proxy Route

### Goal
`/api/results` server-side endpoint that holds the Bearer token, calls TracksIno, and returns `{ updated_at, rows[], count }`.

### File: `src/pages/api/results.ts`
```ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const token = import.meta.env.TRACKSINO_TOKEN;

  if (!token) {
    return new Response(JSON.stringify({ error: 'Token not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const upstream = await fetch(
      'https://api.tracksino.com/crazytime_history?limit=100',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!upstream.ok) {
      return new Response(
        JSON.stringify({ error: `Upstream error: ${upstream.status}` }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await upstream.json();

    return new Response(
      JSON.stringify({
        updated_at: new Date().toISOString(),
        rows: data.data ?? data.rows ?? [],
        count: data.count ?? data.total ?? 0,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Fetch failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
```

### Verification
- [ ] `GET http://localhost:4321/api/results` returns JSON (may need real token)
- [ ] Without token: returns `{ error: 'Token not configured' }` with status 500
- [ ] `TRACKSINO_TOKEN` does NOT appear in browser network tab (it's server-only)
- [ ] `npx astro check` — no errors

---

## Phase 4 — React Components (Tool Islands)

### Goal
All interactive React components. Each is a self-contained island. No Astro imports inside `.tsx` files.

### File list & responsibility

#### `src/components/ResultBadge.tsx`
Displays a single Crazy Time segment result as a colored badge pill.
- Props: `{ segment: string; small?: boolean }`
- Uses `SEGMENT_COLORS` and `SEGMENT_LABELS` from constants
- Pure display, no state

#### `src/components/PredictionGrid.tsx`
Shows ranked prediction scores as a grid of cards.
- Props: `{ stats: SegmentStats[] }`
- Each card: segment name, score bar (0–100), actual% vs expected%, "HOT"/"COLD"/"OVERDUE" tag

#### `src/components/FrequencyChart.tsx`
Horizontal bar chart comparing actual vs expected frequency per segment.
- Props: `{ stats: SegmentStats[] }`
- No external chart library — use CSS width % bars with Tailwind
- Two bars per row: actual (solid) vs expected (dashed outline)

#### `src/components/GapTable.tsx`
Table showing: Segment | Last Hit (rounds ago) | Avg Gap | Status (Overdue/OK)
- Props: `{ stats: SegmentStats[] }`
- Status: "OVERDUE" if lastSeen > avgGap * 1.5, else "OK"

#### `src/components/ManualInput.tsx`
Allows user to manually type/tap results.
- Props: `{ onAdd: (results: string[]) => void }`
- Quick-tap buttons for each segment (grid of 8 buttons)
- Text input for comma-separated entry (e.g. "1,2,CrazyTime,5")
- "Clear" and "Submit" actions

#### `src/components/Predictor.tsx`
Main state container (the React island mounted with `client:load`).
- State: `results: string[]`, `stats: SegmentStats[]`, `loading: boolean`, `error: string | null`, `lastUpdated: string | null`
- Fetches `/api/results` on "Refresh" button click (no auto-polling)
- Merges manual entries (append mode) with fetched data
- Renders: refresh button + last updated timestamp, then PredictionGrid, FrequencyChart, GapTable, ManualInput
- Disclaimer text below all panels
- Stake CTA after prediction grid

#### `src/components/HomepagePredictor.tsx`
Lightweight teaser — fetches `/api/results` on load, shows last 5 results as `ResultBadge` pills + top prediction badge. Links to `/crazy-time-predictor`.
- Uses `client:load`
- Max height: compact (no full charts)

#### `src/components/BankrollCalculator.tsx`
Tool 1 + Tool 2 combined (or separate files — keep as one file for simplicity).
- State: `{ bankroll: number; risk: 'low' | 'medium' | 'high' }`
- Output: recommended bet size (1% / 2% / 5% of bankroll)
- Also shows strategy label: Conservative / Balanced / Aggressive

### Verification
- [ ] Each component renders without TS errors
- [ ] `Predictor.tsx` — clicking Refresh shows loading state then results
- [ ] `ManualInput.tsx` — typing "1,2,CrazyTime" and submitting adds 3 entries
- [ ] `HomepagePredictor.tsx` — renders ≤5 badges on homepage
- [ ] `BankrollCalculator.tsx` — input $1000 + medium risk → $20 bet size

---

## Phase 5 — Astro Layout & Shared Components

### Goal
Base layout, Nav, and reusable StakeCTA block used on every page.

#### `src/layouts/BaseLayout.astro`
```astro
---
interface Props {
  title: string;
  description?: string;
}
const { title, description = 'Crazy Time strategy guides, tools, and RTP data.' } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} | CrazyTimeStrategy.top</title>
  <meta name="description" content={description} />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>
<body class="bg-slate-900 text-slate-100 font-sans">
  <Nav />
  <main>
    <slot />
  </main>
  <footer class="border-t border-slate-700 py-8 text-center text-sm text-slate-400">
    <p>CrazyTimeStrategy.top — Educational content only. Play responsibly.</p>
    <p class="mt-1">We may earn commission from casino referrals. <a href="/affiliate-disclosure" class="underline">Disclosure</a></p>
  </footer>
</body>
</html>
```

#### `src/components/Nav.astro`
```astro
---
const links = [
  { href: '/crazy-time-strategy', label: 'Strategy' },
  { href: '/crazy-time-rtp', label: 'RTP & Odds' },
  { href: '/crazy-time-predictor', label: '🔴 Live Predictor' },
  { href: '/bankroll-calculator', label: 'Tools' },
  { href: '/blog', label: 'Blog' },
];
---
<nav class="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
  <a href="/" class="font-bold text-amber-400 text-lg">CrazyTimeStrategy.top</a>
  <ul class="flex gap-6 text-sm">
    {links.map(l => <li><a href={l.href} class="hover:text-amber-400 transition">{l.label}</a></li>)}
  </ul>
</nav>
```

#### `src/components/StakeCTA.astro`
```astro
---
interface Props {
  variant?: 'inline' | 'card' | 'sticky';
  text?: string;
}
const {
  variant = 'inline',
  text = 'Play Crazy Time on Stake'
} = Astro.props;

const href = 'https://stake.ac/?c=4GH1nePX';
---
{variant === 'card' && (
  <div class="bg-slate-800 border border-amber-500 rounded-xl p-6 my-8 text-center">
    <h3 class="text-xl font-bold mb-2">Where to Play Crazy Time</h3>
    <p class="text-slate-300 mb-4">Stake offers live Crazy Time 24/7 with crypto payments and worldwide access.</p>
    <a href={href} target="_blank" rel="noopener sponsored"
       class="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-8 rounded-lg transition">
      {text} →
    </a>
  </div>
)}

{variant === 'inline' && (
  <a href={href} target="_blank" rel="noopener sponsored"
     class="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-2 px-6 rounded-lg transition my-4">
    {text} →
  </a>
)}

{variant === 'sticky' && (
  <div class="fixed bottom-0 left-0 right-0 bg-amber-500 text-slate-900 py-3 px-4 flex items-center justify-between z-50 md:hidden">
    <span class="font-semibold text-sm">Ready to play?</span>
    <a href={href} target="_blank" rel="noopener sponsored"
       class="bg-slate-900 text-amber-400 font-bold py-1 px-4 rounded text-sm">
      Open Stake →
    </a>
  </div>
)}
```

### Verification
- [ ] BaseLayout wraps all pages correctly (nav + footer visible)
- [ ] StakeCTA `variant="card"` shows Stake card with affiliate link
- [ ] StakeCTA `variant="sticky"` shows mobile bottom bar
- [ ] All hrefs contain `stake.ac/?c=4GH1nePX`

---

## Phase 6 — Core Astro Pages

### Goal
All 10 priority money pages + tool pages live as `.astro` files.

### Page list (create all in `src/pages/`)

| File | Route | Notes |
|---|---|---|
| `index.astro` | `/` | Homepage — see layout in plan §6 |
| `crazy-time-strategy.astro` | `/crazy-time-strategy` | Hub page Silo 1 |
| `best-crazy-time-strategy.astro` | `/best-crazy-time-strategy` | Hub page with casino table |
| `crazy-time-tips.astro` | `/crazy-time-tips` | |
| `crazy-time-guide.astro` | `/crazy-time-guide` | Hub page Silo 4 |
| `crazy-time-bonus-hunt.astro` | `/crazy-time-bonus-hunt` | |
| `crazy-time-bankroll-strategy.astro` | `/crazy-time-bankroll-strategy` | |
| `crazy-time-how-to-win.astro` | `/crazy-time-how-to-win` | |
| `crazy-time-rtp.astro` | `/crazy-time-rtp` | Hub page Silo 3 |
| `crazy-time-odds.astro` | `/crazy-time-odds` | |
| `crazy-time-probability.astro` | `/crazy-time-probability` | |
| `crazy-time-is-it-rigged.astro` | `/crazy-time-is-it-rigged` | |
| `crazy-time-rules.astro` | `/crazy-time-rules` | |
| `crazy-time-how-it-works.astro` | `/crazy-time-how-it-works` | |
| `where-to-play-crazy-time.astro` | `/where-to-play-crazy-time` | Stake referral landing page |
| `crazy-time-predictor.astro` | `/crazy-time-predictor` | Tool page — Predictor island |
| `bankroll-calculator.astro` | `/bankroll-calculator` | Tool page |
| `bet-size-calculator.astro` | `/bet-size-calculator` | Tool page |
| `session-planner.astro` | `/session-planner` | Tool page |
| `risk-level-calculator.astro` | `/risk-level-calculator` | Tool page |
| `coin-flip-strategy.astro` | `/coin-flip-strategy` | |
| `cash-hunt-strategy.astro` | `/cash-hunt-strategy` | |
| `pachinko-strategy.astro` | `/pachinko-strategy` | |
| `top-slot-strategy.astro` | `/top-slot-strategy` | |
| `crazy-time-bonus-rounds.astro` | `/crazy-time-bonus-rounds` | Hub page Silo 2 |
| `affiliate-disclosure.astro` | `/affiliate-disclosure` | Required legal page |

### Homepage (`index.astro`) section order
1. **Hero** — H1 + subheadline + two CTAs (Strategy Guide / Calculator)
2. **Popular Guides** — 4 card grid
3. **Featured Casino: Stake** — `<StakeCTA variant="card" />`
4. **Live Predictor Teaser** — `<HomepagePredictor client:load />`
5. **Latest Articles** — static list of 6 blog titles linking to `/blog/[slug]`
6. **Tools Preview** — 5 teaser cards

### `crazy-time-predictor.astro` structure
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { Predictor } from '../components/Predictor';
import StakeCTA from '../components/StakeCTA.astro';
---
<BaseLayout title="Crazy Time Predictor — Live RNG Pattern Tracker">
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1>Crazy Time RNG Pattern Tracker</h1>
    <p>Live result analysis updated on demand. Not a guarantee — RNG outcomes are independent.</p>
    <Predictor client:load />
    <StakeCTA variant="card" text="Play on Stake now — Live Crazy Time tables open" />
    <StakeCTA variant="sticky" />
    <div class="mt-8 p-4 bg-slate-800 rounded-lg text-sm text-slate-400">
      <strong>Disclaimer:</strong> This tool analyses historical pattern data for educational purposes.
      Live casino RNG outcomes are statistically independent — no result is guaranteed. Play responsibly.
    </div>
  </div>
</BaseLayout>
```

### Internal linking rules (enforced in every page)
Every page must link to these 4 hubs:
- `/crazy-time-strategy` — anchor: "Crazy Time strategy guide"
- `/crazy-time-rtp` — anchor: "RTP breakdown"
- `/crazy-time-bankroll-strategy` — anchor: "bankroll management"
- `/where-to-play-crazy-time` — anchor: "where to play Crazy Time"

Silo 3 + Silo 6 pages also link to `/crazy-time-predictor` — anchor: "live Crazy Time tracker"

### Verification
- [ ] All 26 pages resolve with 200 status
- [ ] `/where-to-play-crazy-time` has prominent Stake CTA above the fold
- [ ] `/crazy-time-predictor` loads Predictor island and shows Stake CTA
- [ ] Every page has 4 internal hub links
- [ ] `npx astro check` — no errors

---

## Phase 7 — Content Collections & Blog Dynamic Route

### Goal
MDX content collection configured. 10 sample articles created. Dynamic `[...slug]` route renders them with SEO template structure.

### `src/content/config.ts`
```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    slug: z.string().optional(),
    silo: z.enum(['strategy', 'bonuses', 'rtp', 'beginner', 'buying-intent', 'predictor']),
    keyword: z.string(),
  }),
});

export const collections = { blog };
```

### Sample MDX article frontmatter (`src/content/blog/best-crazy-time-strategy-2026.mdx`)
```mdx
---
title: "Best Crazy Time Strategy in 2026 (Low Risk + Smart Bankroll)"
description: "The best Crazy Time strategy for 2026 explained clearly — low risk approach, bankroll rules, and where to play."
pubDate: 2026-04-17
silo: strategy
keyword: best crazy time strategy
---

[article body using the universal template from plan §7]
```

### Create 10 sample articles (one per silo + predictor):
1. `best-crazy-time-strategy-2026.mdx` — Silo 1
2. `crazy-time-rtp-explained.mdx` — Silo 3
3. `how-to-play-crazy-time-beginners.mdx` — Silo 4
4. `coin-flip-strategy-crazy-time.mdx` — Silo 2
5. `best-casino-crazy-time-2026.mdx` — Silo 5
6. `crazy-time-results-today.mdx` — Silo 6
7. `crazy-time-odds-explained.mdx` — Silo 3
8. `crazy-time-bankroll-strategy.mdx` — Silo 1
9. `how-to-play-crazy-time-stake.mdx` — Silo 4
10. `crazy-time-predictor-how-it-works.mdx` — Silo 6

### `src/pages/blog/[...slug].astro` (dynamic route)
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import StakeCTA from '../../components/StakeCTA.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---
<BaseLayout title={post.data.title} description={post.data.description}>
  <article class="max-w-3xl mx-auto px-4 py-10">
    <h1>{post.data.title}</h1>
    <Content />
    <StakeCTA variant="card" />
    <StakeCTA variant="sticky" />
  </article>
</BaseLayout>
```

### `src/pages/blog/index.astro`
Lists all articles sorted by date. 6 per row in card grid. Paginate after 20.

### Verification
- [ ] `getCollection('blog')` returns 10 articles
- [ ] `/blog/best-crazy-time-strategy-2026` renders correctly
- [ ] Each article has Stake CTA card at bottom
- [ ] Silo 6 articles link to `/crazy-time-predictor`
- [ ] `npx astro check` — no errors

---

## Phase 8 — Deployment Configuration

### Goal
Site deploys to Vercel with `TRACKSINO_TOKEN` env var set. All routes work on production.

### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

### Deployment steps
1. Push repo to GitHub (token in `.env` — never committed)
2. Connect repo to Vercel dashboard
3. Set environment variable: `TRACKSINO_TOKEN` = real token
4. Deploy — Vercel auto-detects Astro + uses `output: 'server'` for serverless functions
5. Verify: `https://crazytimestrategy.top/api/results` returns JSON

### `public/robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://crazytimestrategy.top/sitemap.xml
```

### Sitemap — Astro integration
```bash
npx astro add sitemap --yes
```

Add to `astro.config.mjs`:
```js
import sitemap from '@astrojs/sitemap';
// ...
site: 'https://crazytimestrategy.top',
integrations: [react(), tailwind(), sitemap()],
```

### Google Analytics 4
Add GA4 script to `BaseLayout.astro` `<head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Verification
- [ ] `npm run build` completes with no errors
- [ ] `npm run preview` — all routes respond
- [ ] Vercel deployment: all pages return 200
- [ ] `/api/results` works in production with real token
- [ ] `/sitemap.xml` is accessible and submitted to Google Search Console
- [ ] `TRACKSINO_TOKEN` is NOT in any committed file

---

## Execution Order Summary

| Phase | Name | Est. Time | Depends On |
|---|---|---|---|
| 0 | Documentation Discovery | DONE | — |
| 1 | Scaffold & Config | 30 min | — |
| 2 | Types, Constants, Algorithm | 45 min | Phase 1 |
| 3 | API Proxy Route | 20 min | Phase 1 |
| 4 | React Components | 2–3 hrs | Phase 2, 3 |
| 5 | Astro Layout & Nav | 30 min | Phase 1 |
| 6 | Core Astro Pages | 2 hrs | Phase 4, 5 |
| 7 | Content Collections + Blog | 1 hr | Phase 5, 6 |
| 8 | Deployment | 30 min | All phases |

**Total estimate: ~8 hours of focused build time**

---

## Affiliate Link Audit (Every Phase)

Every phase that creates UI must be checked:
- Stake affiliate link: `https://stake.ac/?c=4GH1nePX`
- All anchor tags: `target="_blank" rel="noopener sponsored"`
- UTM on high-intent pages: `?c=4GH1nePX&utm_source=site&utm_medium=article&utm_campaign=[slug]`

---

*Plan version: 1.0 | Generated: 2026-04-17 | Framework: Astro 5 + Vercel*
