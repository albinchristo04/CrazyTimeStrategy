# CrazyTimeStrategy.top — Full Site Plan 2026 (v2)

> **What changed in v2:** Tech stack updated from Next.js to Astro. RNG Predictor added as Tool 5 with its own page, API proxy layer, and content cluster. All internal linking rules, homepage layout, tool section, deployment schedule, and 90-day plan updated accordingly.

---

## 1. Brand Overview

| Field | Detail |
|---|---|
| **Domain** | CrazyTimeStrategy.top |
| **Positioning** | Best educational resource for Crazy Time strategies, bankroll management, RTP understanding, bonus guides, and player tools — including the only live RNG pattern tracker |
| **Primary Revenue** | Casino affiliate commissions (Stake CPA) + Display ads |
| **Secondary Revenue** | Telegram community, potential lead gen |

---

## 2. Revenue Model

### Primary
- **Stake Affiliate Program** — Primary and anchor affiliate partner. All casino CTAs, comparison tables, and "Where to Play" sections point to Stake using the referral link below. Stake is crypto-friendly, globally accessible, and well-known in the live casino space — strong fit for a worldwide audience.
  - **Affiliate Link:** `https://stake.ac/?c=4GH1nePX`
  - **Placement:** Every article's Section 4 (Recommended Casino), homepage comparison table, all tool pages post-result CTA, sidebar widget.
  - **Link Strategy:** Use natural anchor text — "Play on Stake", "Try Crazy Time at Stake", "Open a Stake account". Never raw URLs in body text.
- **Display Ads** — Google AdSense or Ezoic once traffic hits qualifying threshold (~10k sessions/month).

### Secondary
- **Additional Affiliate Deals** (Month 2+) — Add 1–2 more casino partners once traffic is established, to A/B test and diversify revenue. Keep Stake as the hero placement.
- **Telegram Community** — Paid tips channel, strategy alerts, or sponsored posts.
- **Email List** (future) — Nurture → affiliate conversions via strategy email sequences.

---

## 3. Site Structure

### Core Money Pages
```
/crazy-time-strategy
/best-crazy-time-strategy
/crazy-time-tips
/crazy-time-guide
/crazy-time-bonus-hunt
/crazy-time-bankroll-strategy
/crazy-time-how-to-win
/where-to-play-crazy-time        ← Stake affiliate landing page
```
> ⚠️ No demo embed or live game player on site. The `/where-to-play-crazy-time` page is a dedicated Stake referral landing page: game overview, Stake feature highlights, and a clear sign-up CTA with the affiliate link.

### Educational Pages
```
/crazy-time-rtp
/crazy-time-odds
/crazy-time-probability
/crazy-time-is-it-rigged
/crazy-time-rules
/crazy-time-how-it-works
```

### Bonus Feature Pages
```
/coin-flip-strategy
/cash-hunt-strategy
/pachinko-strategy
/top-slot-strategy
/crazy-time-bonus-rounds
```

### Tool Pages
```
/bankroll-calculator
/bet-size-calculator
/session-planner
/risk-level-calculator
/crazy-time-predictor            ← NEW: RNG Predictor Tool (live data)
```

### Blog
```
/blog/          ← 150 articles deployed across 3 months
```

---

## 4. Content Silo Structure

### Silo 1 — Strategy (30 articles)
Target keywords: `crazy time strategy`, `best crazy time strategy`, `low risk crazy time strategy`, `aggressive crazy time strategy`, `flat betting crazy time`

**Key articles:**
- Best Crazy Time Strategy for Beginners in 2026
- Crazy Time Strategy That Minimizes Risk
- Crazy Time High Risk vs Low Risk Strategy Explained
- Smart Bankroll Strategy for Crazy Time Players
- How to Build a Winning Crazy Time Session Plan
- Best Flat Betting Strategy for Crazy Time
- Crazy Time Balanced Betting Strategy
- Crazy Time Realistic Strategy Expectations
- Best Stop Loss Strategy for Crazy Time
- Best Take Profit Strategy for Crazy Time
- *(+20 longtails from Core Strategy Cluster)*

**Hub page:** `/crazy-time-strategy`

---

### Silo 2 — Bonuses (30 articles)
Target keywords: `coin flip strategy`, `pachinko guide`, `cash hunt guide`, `top slot explained`

**Key articles:**
- Best Coin Flip Strategy in Crazy Time
- Coin Flip Bonus Explained in Crazy Time
- Best Cash Hunt Strategy in Crazy Time
- Best Pachinko Strategy in Crazy Time
- Best Top Slot Strategy in Crazy Time
- Which Crazy Time Bonus Is Best?
- Crazy Time Bonus Multipliers Explained
- Highest Paying Bonus in Crazy Time
- How Rare Is the Crazy Time Bonus?
- Smart Bonus Allocation Strategy
- *(+20 from Bonus Round Cluster)*

**Hub page:** `/crazy-time-bonus-rounds`

---

### Silo 3 — Math & RTP (25 articles)
Target keywords: `crazy time rtp`, `crazy time odds`, `expected value`, `variance explained`

**Key articles:**
- Crazy Time RTP Explained Clearly
- Crazy Time Odds Explained for Players
- Crazy Time Probability Basics You Should Know
- Is Crazy Time Random? The Truth Explained
- Crazy Time Expected Value Explained
- How Often Do Bonus Rounds Hit in Crazy Time?
- Crazy Time Variance Explained
- Crazy Time House Edge Explained
- Can Statistics Help in Crazy Time?
- Crazy Time Long-Term Results Explained
- *(+15 from RTP/Odds/Math Cluster)*

**Hub page:** `/crazy-time-rtp`

---

### Silo 4 — Beginner Content (25 articles)
Target keywords: `how to play crazy time`, `crazy time for beginners`, `common mistakes`

**Key articles:**
- What Is Crazy Time and How Does It Work?
- How to Play Crazy Time Step by Step
- Crazy Time Rules Explained for Beginners
- Crazy Time Beginner Guide for First Session
- How to Start Playing Crazy Time Safely
- Crazy Time Common Beginner Mistakes
- How Much Money Do You Need for Crazy Time?
- How to Play Crazy Time on Stake — Step by Step
- Crazy Time Tips Every New Player Should Know
- First 10 Things to Know About Crazy Time
- *(+15 from Beginner Cluster)*

**Hub page:** `/crazy-time-guide`

---

### Silo 5 — Buying Intent (40 articles)
Target keywords: `best casino for crazy time`, `crazy time real money`, `crazy time mobile casino`, `best welcome bonus crazy time`

**Key articles:**
- Best Casino to Play Crazy Time in 2026
- Best Crazy Time Casino Bonuses Right Now
- Trusted Casinos With Crazy Time Games
- Best Mobile Casinos for Crazy Time
- Fast Withdrawal Casinos for Crazy Time
- Crazy Time Casinos for India Players
- Crazy Time Casinos for Brazil Players
- Crazy Time Casinos for UK Players
- Crazy Time Casinos With Crypto Payments
- How to Choose a Crazy Time Casino
- *(+30 from Buying Intent/Affiliate Cluster)*

**Hub page:** `/best-crazy-time-strategy` (with casino table embedded)

---

### Silo 6 — RNG Predictor & Stats (NEW — 10 articles)
Target keywords: `crazy time predictor`, `crazy time results history`, `crazy time statistics`, `crazy time pattern tracker`, `crazy time results today`

This is a new silo built around the live predictor tool. These articles rank on informational + data-hungry queries and funnel users to `/crazy-time-predictor` — which has strong dwell time, a natural Stake CTA post-result, and feeds SEO through tool-page links.

**Key articles:**
- Crazy Time Results Today — Live Stats and Pattern Tracker
- How to Read Crazy Time Statistics (And What They Mean)
- Crazy Time Result Frequencies — What Hits Most Often?
- Is Crazy Time Rigged? A Real Data Analysis
- Crazy Time Cold Numbers Explained — What Patterns Actually Mean
- How Our Crazy Time Predictor Works (Methodology Explained)
- Crazy Time Bonus Round Frequency — Real Data Breakdown
- Crazy Time Multiplier Patterns — What the History Shows
- How to Use a Crazy Time Tracker to Improve Your Session
- Crazy Time Statistics vs Strategy — What Actually Matters

**Hub page:** `/crazy-time-predictor`

---

## 5. 150-Keyword Deployment Plan

### Month 1 — 50 Pages (Highest Intent First)

**Priority core pages (publish first):**

| # | Keyword / Page Title | Page Type |
|---|---|---|
| 1 | Crazy Time Strategy | /crazy-time-strategy |
| 2 | Best Crazy Time Strategy | /best-crazy-time-strategy |
| 3 | Crazy Time Tips | /crazy-time-tips |
| 4 | Crazy Time Guide | /crazy-time-guide |
| 5 | Crazy Time Bonus Hunt | /crazy-time-bonus-hunt |
| 6 | Crazy Time Bankroll Strategy | /crazy-time-bankroll-strategy |
| 7 | Crazy Time How to Win | /crazy-time-how-to-win |
| 8 | Crazy Time RTP | /crazy-time-rtp |
| 9 | Crazy Time Odds | /crazy-time-odds |
| 10 | Crazy Time Predictor | /crazy-time-predictor ← NEW (replaces /crazy-time-demo) |

**+40 longtail blog articles** from Silo 1 (Strategy) and Silo 4 (Beginner) clusters.

---

### Month 2 — 50 Pages (Feature-Specific + Stake-Focused Pages)

- All 4 bonus feature pages (Coin Flip, Cash Hunt, Pachinko, Top Slot)
- Tool pages: Bankroll Calculator, Risk Calculator, Session Planner, RTP Calculator
- All Math & RTP Silo articles (Silo 3 — 25 articles)
- Stake-specific content pages:
  - How to Play Crazy Time on Stake
  - Is Stake Safe for Crazy Time?
  - Stake Crazy Time Review
  - How to Register on Stake and Play Crazy Time
  - Stake Bonus and Promotions for Crazy Time Players
- Remaining Bonus Round Cluster articles
- **5 articles from Silo 6 (RNG Predictor cluster)**

> 🌍 **Worldwide targeting:** No geo-locked country pages in Month 2. Content is written in universal English. Stake is accessible in most countries worldwide, making it a clean fit for a worldwide audience. Country-specific pages may be added in Month 4+ once GSC data reveals which geos are sending traffic.

---

### Month 3 — 50 Pages (Comparison + Seasonal + Updated 2026)

- Remaining Buying Intent / Affiliate articles (Silo 5)
- Freshness/Trends Cluster (15 articles):
  - Best Crazy Time Strategy Updated for 2026
  - Crazy Time Trends This Month
  - Crazy Time Most Asked Questions Answered
  - Crazy Time Biggest Wins Explained
  - Crazy Time Complete Guide for 2026
- Comparison articles ("X vs Y" format)
- **Remaining 5 articles from Silo 6 (RNG Predictor cluster)**
- Remaining longtail variants from all silos

---

## 6. Homepage Layout

### Hero Section
**H1:** Crazy Time Strategy Guides, Tips & Tools  
**Subheadline:** Learn smarter bankroll management, bonus strategies, RTP insights, and casino recommendations.  
**Primary CTA:** → Read Strategy Guide (`/crazy-time-strategy`)  
**Secondary CTA:** → Use Calculator (`/bankroll-calculator`)

---

### Section 1 — Popular Guides (4 Cards)
| Card | Link |
|---|---|
| Best Strategy | /best-crazy-time-strategy |
| RTP Guide | /crazy-time-rtp |
| Bankroll Guide | /crazy-time-bankroll-strategy |
| Bonus Hunt Guide | /crazy-time-bonus-hunt |

---

### Section 2 — Featured Casino: Stake
Single featured casino card (Stake) rather than a multi-casino table at launch. Card includes: Stake logo, key highlights (crypto-friendly, worldwide access, live Crazy Time available), and a prominent CTA button → `https://stake.ac/?c=4GH1nePX`. Expand to comparison table in Month 2 if additional affiliate partners are added.

---

### Section 3 — Live Predictor Teaser (NEW)
A compact teaser block that shows the **last 5 results** fetched from the live API and a "Top prediction" badge. Links to `/crazy-time-predictor`. Copy: "See live Crazy Time stats and our next-result pattern analysis." This block increases homepage dwell time and gives the predictor page a permanent homepage authority link.

---

### Section 4 — Latest Articles
6–9 dynamic cards showing most recently published blog posts (SEO freshness signal).

---

### Section 5 — Tools Preview
Teaser cards for all 5 tools. Each has a 1-line description + "Try Free" CTA. Predictor card reads: "Live Crazy Time Tracker — See which segments are hot, cold, or overdue."

---

## 7. Universal Article Template

Every article on the site follows this SEO-optimized structure:

```
Title:    [Target Keyword] in 2026 — [Benefit/Hook]
Example:  Best Crazy Time Strategy in 2026 (Low Risk + Smart Bankroll)

[INTRO — 100 words]
Answer the query directly. Hook the reader.

[SECTION 1 — How the game/feature works]
Context for new readers. Keep tight.

[SECTION 2 — Core strategy / main content]
The meat. Numbered steps, tables, or short paragraphs.

[SECTION 3 — Mistakes to avoid]
Negative angle — high engagement, good dwell time.

[SECTION 4 — Where to Play]
Stake feature card with affiliate CTA. 3–4 sentences on why Stake suits Crazy Time players
(crypto support, live dealer quality, worldwide access). CTA button: "Play Crazy Time on Stake →"
Affiliate link: https://stake.ac/?c=4GH1nePX

[FAQ — 5 Questions]
Target "People Also Ask" SERP features.

[CTA — Bottom]
"Play Crazy Time on Stake" → affiliate link, or "Join Our Telegram for Tips"
```

**Additional rule for Silo 6 (Predictor articles):** Each article includes an inline embed or link box pointing to `/crazy-time-predictor` after Section 2 with copy: "Check today's live Crazy Time stats →"

---

## 8. Internal Linking Rules

Every article must link to **all four** hub pages:

| Hub Page | Anchor Text Variation |
|---|---|
| /crazy-time-strategy | "best strategy", "strategy guide", "how to play smart" |
| /crazy-time-rtp | "RTP breakdown", "odds explained", "return to player" |
| /crazy-time-bankroll-strategy | "bankroll guide", "manage your budget", "bet sizing" |
| /best-crazy-time-strategy | "play on Stake", "where to play", "best casino for Crazy Time" |

**NEW rule for predictor:** All Silo 3 (Math/RTP) articles and all Silo 6 (Predictor) articles must also link to `/crazy-time-predictor` with anchor text "live Crazy Time tracker" or "Crazy Time result history".

Additional rule: Each Silo article links back to its **hub page** and to **2 sibling articles** within the same silo.

---

## 9. Tools

### Tool 1 — Bankroll Calculator
- **Input:** Starting bankroll amount
- **Output:** Recommended bet size (1%, 2%, 5% variants)
- **Logic:** Simple percentage-based formula with Low/Medium/High risk presets

### Tool 2 — Risk Level Calculator
- **Input:** Bankroll, session length preference, risk tolerance (slider)
- **Output:** Strategy suggestion — Conservative / Balanced / Aggressive
- **Logic:** Rule-based scoring matrix

### Tool 3 — Session Planner
- **Input:** Budget, target profit, stop-loss limit
- **Output:** Session rules card (when to stop, bet size, bonus focus)
- **Logic:** Preset ratios (e.g., stop-loss = 30% of bankroll)

### Tool 4 — RTP Calculator
- **Input:** Bet amount, bet type (number or bonus), session length
- **Output:** Expected return range, estimated play duration at current bankroll
- **Logic:** Published RTP percentages applied to inputs

### Tool 5 — RNG Predictor (NEW — Live Data)

The flagship differentiator tool. No other Crazy Time site has a live, data-driven result tracker with pattern analysis.

**Page:** `/crazy-time-predictor`

**What it does:**
- Fetches the last 100 Crazy Time results from the TracksIno API via a secure server-side proxy (token never exposed to the browser)
- Displays a frequency analysis panel (actual % vs expected %)
- Shows gap analysis per segment (rounds since last hit vs average gap)
- Scores each segment using a weighted algorithm (base rate + gap boost + cold correction + recent dampening) and ranks them by predicted probability
- Allows manual input — user can type in results they observed live, or quick-tap individual results
- Append mode merges manual entries with live fetched data

**Data source:** `https://api.tracksino.com/crazytime_history` — last 100 results, fetched on user-triggered refresh only (no auto-polling).

**API proxy route:** `/api/results` — Astro server endpoint that holds the Bearer token in `.env`, calls TracksIno, and returns `{ updated_at, rows[], count }` to the browser.

**Prediction algorithm (4 signals):**
1. Base rate — theoretical wheel probability per segment (1=44%, 2=24%, 5=12%, 10=8%, bonuses ~3% each)
2. Gap boost — if a segment is overdue past its average gap, its score increases
3. Cold correction — segments appearing less than expected get a boost
4. Recent dampening — segments very hot in the last 50 rounds get a slight reduction

**Disclaimer block** (shown on the tool page, below the predictor): "This tool analyses historical pattern data for educational purposes. Live casino RNG outcomes are statistically independent — no result is guaranteed. Play responsibly."

**Affiliate CTA placement on tool page:**
- Sticky bottom bar (mobile): "Ready to play? Open Stake →" after any result is loaded
- After the prediction grid: "Play Crazy Time on Stake with these insights → [stake.ac/?c=4GH1nePX]"

**Stack for this tool:** Astro React island (`client:load`) + Astro API route (server-side proxy).

---

## 10. Technical Stack (Updated)

| Layer | Technology | Note |
|---|---|---|
| **Frontend** | **Astro + React islands** | Replaces Next.js. Static-first with selective hydration. React used only for interactive tool components. |
| **API Proxy** | **Astro API Routes** (`/api/results.ts`) | Server-side endpoint hides TracksIno Bearer token. Runs as a serverless function on Vercel. |
| **Environment** | `.env` — `TRACKSINO_TOKEN` | Never shipped to the client |
| **CMS** | Sanity.io or MDX files | MDX recommended for speed — articles as `.mdx` files in `/src/content/` |
| **Hosting** | Vercel | `output: 'server'` for API route support; static pages served from CDN edge |
| **Analytics** | Google Analytics 4 | |
| **SEO** | Google Search Console + Ahrefs/Semrush | |
| **Ads** | Google AdSense → upgrade to Ezoic at scale | |
| **Affiliate Tracking** | Stake affiliate dashboard + UTM parameters on all outbound links (`?c=4GH1nePX&utm_source=site&utm_medium=article&utm_campaign=pageslug`) | |

### Why Astro instead of Next.js

| Concern | Next.js | Astro |
|---|---|---|
| Page load speed | Good | Better — ships zero JS by default |
| Content-heavy site | Fine | Purpose-built for content |
| API routes | Yes | Yes — same capability |
| React components | Yes | Yes — React islands |
| SEO score | Good | Better out of the box |
| Learning curve | Moderate | Low |

---

## 11. Astro Project Structure

```
crazy-time-predictor/
├── src/
│   ├── pages/
│   │   ├── index.astro                   ← homepage
│   │   ├── crazy-time-predictor.astro    ← tool page shell
│   │   ├── bankroll-calculator.astro
│   │   ├── [...slug].astro               ← dynamic article pages from CMS/MDX
│   │   └── api/
│   │       └── results.ts                ← TracksIno proxy (server-side, token hidden)
│   ├── components/
│   │   ├── Predictor.tsx                 ← React island (client:load)
│   │   ├── ResultBadge.tsx
│   │   ├── PredictionGrid.tsx
│   │   ├── FrequencyChart.tsx
│   │   ├── GapTable.tsx
│   │   ├── ManualInput.tsx
│   │   ├── HomepagePredictor.tsx         ← lightweight teaser for homepage
│   │   ├── BankrollCalculator.tsx
│   │   ├── StakeCTA.astro                ← reusable affiliate CTA block
│   │   └── Nav.astro
│   ├── content/
│   │   └── blog/                         ← MDX articles
│   ├── lib/
│   │   ├── prediction.ts                 ← algorithm (pure functions, testable)
│   │   ├── types.ts
│   │   └── constants.ts                  ← POSSIBLE values, BASE_RATES, COLORS
│   └── styles/
│       └── global.css
├── public/
├── .env                                  ← TRACKSINO_TOKEN (never committed)
├── astro.config.mjs                      ← output: 'server', adapter: vercel()
└── tailwind.config.mjs
```

### API Proxy Data Flow

```
User clicks "Refresh"
  → Browser fetches /api/results (same-origin, no token visible)
     → Astro API route reads TRACKSINO_TOKEN from .env
     → Calls TracksIno API with Authorization header
     → Returns { updated_at, rows[], count } as JSON
  → Predictor.tsx extracts rows[].result
  → Passes results[] down to child components
  → All panels re-render with fresh data
```

---

## 12. 90-Day Ranking Plan (Updated)

### Days 1–7 — Foundation
- [ ] Domain live, hosting configured on Vercel
- [ ] Astro site scaffolded with Tailwind + React integration
- [ ] `/api/results.ts` proxy live — verify TracksIno data returns in browser
- [ ] Predictor React island connected to `/api/results` and working
- [ ] Publish 20 pages (10 core money pages + 10 blog articles)
- [ ] `/crazy-time-predictor` page live with full tool
- [ ] Google Analytics + Search Console connected
- [ ] Sitemap submitted to Google

### Days 8–30 — Month 1 Push
- [ ] Reach 50 published pages
- [ ] All Month 1 keywords deployed
- [ ] All 5 tool pages live and functional
- [ ] Homepage casino comparison card live (affiliate links active)
- [ ] **Homepage predictor teaser block live** — shows last 5 results
- [ ] Basic backlinks: 5–10 from niche-relevant directories, forums, Reddit
- [ ] Internal linking audit pass — verify all Silo 3 and Silo 6 articles link to `/crazy-time-predictor`

### Days 31–60 — Indexing & Early Rankings
- [ ] 100 pages total published
- [ ] Month 2 keywords deployed (feature + country pages)
- [ ] 5 predictor-cluster articles published (Silo 6 Month 2 batch)
- [ ] Start monitoring GSC for impressions/clicks on `/crazy-time-predictor`
- [ ] Begin outreach for 10–20 quality backlinks
- [ ] A/B test casino CTAs on top-traffic pages
- [ ] Check if predictor page is driving Stake CTA clicks — adjust CTA copy if not

### Days 61–90 — Scale & Monetize
- [ ] 150 pages total published
- [ ] Month 3 content live (including final 5 Silo 6 predictor articles)
- [ ] First affiliate commissions expected
- [ ] Apply for AdSense / Ezoic if traffic qualifies
- [ ] Launch Telegram community
- [ ] Review top 20 pages by impressions → optimize title tags + intros
- [ ] Review `/crazy-time-predictor` engagement — consider adding a results table with timestamps for longer dwell time

---

## 13. Monetization Projections

### At 20,000 Monthly Visitors
| Stream | Estimate |
|---|---|
| Affiliate commissions | $1,000 – $5,000/mo |
| Display ads | $300 – $1,000/mo |
| Telegram community | $500+/mo |
| **Total** | **~$1,800 – $6,500/mo** |

### At 100,000 Monthly Visitors
| Stream | Estimate |
|---|---|
| Affiliate commissions | $5,000 – $15,000/mo |
| Display ads | $1,500 – $4,000/mo |
| Telegram + other | $500 – $1,000/mo |
| **Total** | **~$7,000 – $20,000/mo** |

> **Key driver:** Affiliate conversion rate. The predictor tool is the highest dwell-time page on the site — users interact with it repeatedly per session. Stake CTA placement immediately after the prediction result is the highest-converting placement on the entire site. Geo-targeted casino pages (India, Brazil, UK) will perform differently — track CPA vs RevShare per geo and optimize accordingly.

---

## 14. Resolved Decisions & Remaining Questions

### ✅ Fully Resolved
| Decision | Answer |
|---|---|
| **Affiliate Partner** | Stake — `https://stake.ac/?c=4GH1nePX` |
| **Commission Type** | CPA — priority is sign-up conversions, not session volume |
| **Geo Targeting** | Worldwide. Country pages added in Month 3+ based on GSC data |
| **Demo/Live Embeds** | Not used. Educational/strategy content + predictor tool only |
| **Content Production** | Claude (AI) — see Section 16 for prompt system |
| **Additional Affiliates** | Start Stake-only. Expand later based on traffic data |
| **Frontend Framework** | Astro + React islands (replaces Next.js) |
| **API Security** | TracksIno token stored in `.env`, proxied through Astro API route — never exposed to browser |
| **Predictor Data Trigger** | User-triggered refresh only. No auto-polling. |

### ❓ Still To Confirm (Low Priority — Decide Before Month 2)
1. **Responsible Gambling Compliance** — Add an RG disclaimer footer and affiliate disclosure banner sitewide before launch. Predictor page needs its own disclaimer block (drafted in Section 9).
2. **Stake Geo Restrictions** — Check Stake's blocked country list. If GSC shows traffic from a blocked geo, add a secondary affiliate for that market in Month 3.
3. **Telegram** — Launch with site or after first traffic milestone?
4. **TracksIno API rate limits** — Confirm no rate limiting issues with the Bearer token for user-triggered refresh patterns at scale. If needed, add a server-side cache (60-second TTL) to the `/api/results` route.

---

## 15. CPA Strategy — What Changes Because of CPA

On CPA, **you earn per new depositing player**, not per session played. This completely changes content priorities:

### CPA Content Priorities (Highest to Lowest)
| Priority | Content Type | Reason |
|---|---|---|
| 🔴 #1 | "Where to Play" / "Best Casino" pages | Direct sign-up intent |
| 🔴 #1 | Stake-specific pages (review, how to register) | Branded search = highest CVR |
| 🟠 #2 | Beginner guides | New players = new accounts |
| 🟠 #2 | Strategy pages with strong "get started" CTA | High traffic + conversion hook |
| 🟠 #2 | **RNG Predictor tool page** | High dwell time + post-result CTA = strong conversion hook |
| 🟡 #3 | RTP / Math pages | Informational — lower direct CVR |
| 🟢 #4 | Longtail blog articles | Volume play — indirect conversions |

### CPA CTA Rules (Apply to Every Page)
- Every article must have **at least 2 Stake CTAs**: one inline (after Section 2) and one at the bottom.
- CTA copy must be **action + benefit**: "Play Crazy Time on Stake — Instant Sign Up" not just "Visit Stake".
- Link format: `https://stake.ac/?c=4GH1nePX` — keep it clean, no extra parameters needed.
- On high-intent pages (`/where-to-play-crazy-time`, `/best-crazy-time-strategy`), add a **sticky CTA bar** at the bottom of the viewport on mobile.
- **On `/crazy-time-predictor`:** Stake CTA appears after the prediction grid loads. Copy: "Play on Stake now — Live Crazy Time tables open." This is the highest-intent moment on the tool — the user has just seen the prediction and is primed to act.

### CPA Page to Publish First (Before Anything Else)
Before writing 50 articles, publish `/where-to-play-crazy-time` and `/stake-crazy-time-review`. These are the pages all other articles will link to. Getting these indexed early means every subsequent article that links to them passes authority immediately.

---

## 16. Claude Content Production System

All 150 articles are produced using Claude with the prompt template below. Each article takes 1–2 prompts. Target output: 800–1,200 words per article.

### Master Prompt Template

```
You are an expert gambling strategy writer for CrazyTimeStrategy.top.

Write a complete SEO article with the following specs:

TARGET KEYWORD: [insert keyword]
PAGE SLUG: /[insert slug]
WORD COUNT: 900–1100 words
TONE: Helpful, direct, educational. Not hype. Not warnings-heavy.

STRUCTURE:
1. Title (H1): Include keyword + year 2026 + benefit/hook
2. Intro (100 words): Answer the query directly in first 2 sentences.
3. Section 1 (H2): How [game/feature] works — brief context
4. Section 2 (H2): Core strategy / main content — use short paragraphs, 
   avoid bullet overload
5. Section 3 (H2): Common mistakes to avoid
6. Section 4 (H2): Where to Play — Write 3–4 sentences recommending Stake. 
   End with this exact CTA: 
   [Play Crazy Time on Stake →](https://stake.ac/?c=4GH1nePX)
7. FAQ: 5 questions and answers targeting People Also Ask
8. Closing CTA line: "Ready to play? [Open your Stake account here](https://stake.ac/?c=4GH1nePX)"

INTERNAL LINKS (include naturally in body text):
- Link to /crazy-time-strategy with anchor "Crazy Time strategy guide"
- Link to /crazy-time-rtp with anchor "RTP breakdown"
- Link to /crazy-time-bankroll-strategy with anchor "bankroll management"
- Link to /where-to-play-crazy-time with anchor "where to play Crazy Time"
- [For Silo 3 and Silo 6 articles only] Link to /crazy-time-predictor 
  with anchor "live Crazy Time tracker"

Do not write disclaimers, do not add responsible gambling warnings in the body.
Do not use the word "straightforward". Do not use em-dashes (—) in body text.
Write in simple, clear English suitable for a worldwide audience.
```

### Batch Production Schedule

| Week | Articles | Silos |
|---|---|---|
| Week 1 | 10 core money pages | All silos (1 hub each) + `/crazy-time-predictor` |
| Week 2 | 15 articles | Silo 1 (Strategy) |
| Week 3 | 15 articles | Silo 4 (Beginner) |
| Week 4 | 10 articles | Silo 2 (Bonus) + Silo 3 (RTP) |
| Week 5 | 5 articles | Silo 6 (Predictor cluster — Month 2 batch) |
| Week 5–6 | 45 articles | Month 2 remaining |
| Week 7–8 | 45 articles | Month 3 content |
| Week 9 | 5 articles | Silo 6 (Predictor cluster — Month 3 batch) |

### Quality Check Per Article (30-second scan)
- [ ] Keyword in H1, first paragraph, and one H2
- [ ] Stake affiliate link appears at least twice
- [ ] 4 internal links present (5 for Silo 3 + Silo 6 — includes predictor link)
- [ ] FAQ section has 5 questions
- [ ] No filler phrases ("In conclusion", "It's worth noting", etc.)

---

## 17. Build Order — What to Code First

This is the recommended sequence for the developer starting the Astro build.

| Step | Task | Why |
|---|---|---|
| 1 | Scaffold Astro + Tailwind + React integration | Foundation |
| 2 | Build `/api/results.ts` — test it returns TracksIno data in browser | Unblocks the tool |
| 3 | Port `lib/prediction.ts` algorithm — pure functions, no UI | Testable in isolation |
| 4 | Build `Predictor.tsx` state container wired to `/api/results` | Core tool |
| 5 | Build child components: ResultBadge → PredictionGrid → FrequencyChart → GapTable → ManualInput | Tool complete |
| 6 | Build `crazy-time-predictor.astro` page shell with disclaimer + Stake CTA | Tool page live |
| 7 | Build homepage shell + `HomepagePredictor.tsx` teaser | Homepage live |
| 8 | Build `StakeCTA.astro` reusable affiliate component | Used everywhere |
| 9 | Set up MDX content collection + `[...slug].astro` dynamic route | Unblocks content |
| 10 | Publish first 10 core money pages | SEO start |
| 11 | Deploy to Vercel with `TRACKSINO_TOKEN` env variable set | Live |

---

*Plan version: v2 — April 2026 | Domain: CrazyTimeStrategy.top | Framework: Astro | Affiliate: Stake CPA (`stake.ac/?c=4GH1nePX`) | Content: Claude AI*
