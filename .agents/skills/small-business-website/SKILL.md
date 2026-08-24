---
name: small-business-website
description: Build a complete static marketing website for a small business from scratch. Use this skill whenever someone wants to create a website, homepage, or landing page for their small business, local shop, cafe, restaurant, salon, gym, clinic, or any brick-and-mortar or service business. Covers the full workflow from discovery interview through deployment. Invoke this skill even if the user just says "build me a website", "I need a site for my business", "make a homepage for my shop", or mentions wanting an online presence for a local business. Also use it when resuming work on an existing small business website project.
---

# Small Business Website Builder

Build a polished, mobile-first static marketing website for any small business. This skill orchestrates a multi-phase workflow using brainstorming, planning, UI/UX design, and iterative review to produce a production-ready site deployed on Vercel.

**Tech stack:** Static HTML + CSS + JS. No build step, no framework — just Tailwind CSS via CDN, Google Fonts, and vanilla JS. Simple enough for a non-technical business owner to understand and maintain.

### Sub-agents & parallel execution

This skill is designed to be fast. Use sub-agents aggressively to keep the main conversation context clean and to run independent work in parallel.

**Guiding principles:**
- **Delegate heavy research and implementation to sub-agents** — the main conversation should stay focused on user decisions and high-level progress, not bogged down with long code blocks or research output.
- **Use `/superpowers:dispatching-parallel-agents` whenever 2+ tasks are independent** — don't do things sequentially when they can run at the same time.
- **Each sub-agent gets a clear, self-contained brief** — include all context it needs (palette, fonts, business info, section specs) so it can work autonomously without needing follow-up.
- **Summarize agent results back to the user concisely** — the user doesn't need to see raw agent output, just the decisions and outcomes.

---

## Phase 1: Discovery Interview

Before writing any code, gather everything needed. Don't proceed until you have at least the business name, type, address, hours, primary CTA, and a sense of the vibe.

### Ask about:

**The business:** Name, type (cafe, salon, etc.), address, phone, hours (note irregular days), online ordering/booking link, social media, Google listing.

**The audience & vibe:** Who are the customers? What 3 words describe the feeling the site should give? Any existing brand colors or logo? Competitors or sites they admire?

**Content:** Photos available? (business interior, products, team) Top 3-4 featured products or services? Google reviews worth highlighting? The single most important action for visitors (order, book, visit, call)?

**Technical:** Own a domain? Where are photos stored?

---

## Phase 2: Competitive Research

Before designing anything, research what's already working in the same business category.

### Process

1. Search for the top 10 most popular or high-traffic websites in the same business category (e.g., "best cafe websites", "top salon websites", "restaurant website examples"). Include both local competitors and well-known brands in the space.
2. **Dispatch parallel sub-agents** via `/superpowers:dispatching-parallel-agents` to visit and analyze the sites simultaneously — split the 10 sites across 3-4 agents (2-3 sites each). Each agent should evaluate:
   - **What they do well:** layout patterns, hero design, CTAs, mobile experience, photography style, copy tone, trust signals, booking/ordering UX
   - **What they do poorly:** slow loading, cluttered layouts, buried contact info, weak mobile experience, generic stock photos, missing hours/location
3. Collect agent results and synthesize into a brief report for the user — a table of the 10 sites with pros/cons columns works well.
4. Extract actionable patterns to carry forward into the design phase:
   - Which section layouts appear on most successful sites?
   - What CTAs drive the most engagement in this category?
   - What trust signals matter most? (reviews, certifications, "years in business", etc.)
   - What photography styles work best?
   - What do the bad sites have in common that we should avoid?

### Feed into design

The research findings should directly inform:
- **Phase 3 (Brainstorm):** Design directions should incorporate patterns from the best sites and consciously avoid the common weaknesses
- **Phase 4 (Plan):** Section order and content priorities should reflect what top competitors do
- **Phase 5 (Build):** Specific UI patterns, CTA placement, and mobile interactions should borrow from proven designs

Present the summary to the user before moving to brainstorming — they may spot competitors they want to emulate or differentiate from.

---

## Phase 3: Brainstorm & Design Direction

Invoke **`/superpowers:brainstorming`** to explore 2-3 design directions. For each, propose:

- A mood name (e.g., "Warm Editorial", "Clean Modern", "Bold Playful")
- A 6-color palette with hex codes and semantic names
- A display + body font pairing from Google Fonts
- A one-sentence vibe description

Then invoke **`/ui-ux-pro-max`** to validate and refine the chosen direction — search its palette library, font pairings, and style references.

Present options to the user and get their pick before moving on.

### Palette structure

Every palette needs exactly 6 roles:

| Role | Purpose | Example |
|------|---------|---------|
| **Background** | Base page color | `linen: '#FAF6F1'` |
| **Text** | Primary text, high contrast | `walnut: '#4A3728'` |
| **Accent** | CTAs, headings, highlights | `terracotta: '#C8875C'` |
| **Secondary** | Borders, cards, subtle bg | `sand: '#E5D5C3'` |
| **Highlight** | Badges, stars, callouts | `honey: '#DBAD56'` |
| **Muted** | Alternating section bg | `oat: '#F2EBE2'` |

Define these in a Tailwind CDN config block in the HTML `<head>`.

---

## Phase 4: Plan the Build

Invoke **`/superpowers:writing-plans`** to create an implementation plan following this standard section order:

1. **Head** — meta/OG tags, Tailwind config, Google Fonts, favicon
2. **Navbar** — logo, desktop links, mobile hamburger, CTA button
3. **Hero** — full-bleed image, headline, subtitle, trust badges (hours, rating), dual CTAs
4. **About** — business story, interior/team photo, hours display
5. **Featured Items** — 3-4 top products/services in cards
6. **Menu/Services Preview** — categorized list (can be desktop-only if heavy)
7. **Reviews** — live Google reviews or static testimonials
8. **Visit/Contact** — address, hours, phone, social, amenity pills
9. **Footer** — logo, address, phone, links, copyright
10. **Mobile sticky CTA** — fixed bottom bar after scrolling past hero

**File structure:**
```
project-name/
├── index.html          # Single-page site
├── css/styles.css      # Custom CSS beyond Tailwind
├── js/main.js          # Nav toggle, scroll effects, reviews API
└── assets/
    ├── logo.jpg
    └── images/         # Hero bg, interior, products
```

The plan should include git setup and Vercel deployment as final steps.

---

## Phase 5: Build

Implement using sub-agents to keep the main context clean. Use **`/frontend-design`** for distinctive, production-grade aesthetics.

### Parallel build strategy

Use **`/superpowers:dispatching-parallel-agents`** to build independent sections simultaneously. Recommended groupings:

| Agent | Sections | Dependencies |
|-------|----------|-------------|
| **Agent 1** | Head + Navbar + Hero | None — builds the shell and first impression |
| **Agent 2** | About + Featured Items | Needs palette + fonts + business copy |
| **Agent 3** | Reviews + Visit/Contact + Footer | Needs palette + business info |
| **Agent 4** | CSS (styles.css) + JS (main.js) | Needs section structure decided |

Give each agent the full brief: palette hex codes, font names, business info, section specs from the plan, and a pointer to `references/technical-patterns.md` for mobile patterns. Agents should write to their assigned files/sections only.

After agents return, **assemble and integrate** in the main context — resolve any conflicts, ensure consistent class naming, and verify the HTML flows correctly as a single page.

### Self-check after every code change

Every time new code is written — whether by you or a sub-agent — run a self-check before moving on. This is not optional. Dispatch a **verification sub-agent** (or do it inline for small changes) that:

1. **Reads the full HTML output** and checks for structural issues: unclosed tags, broken links, missing assets, inconsistent class names
2. **Evaluates mobile aesthetics** — mentally walk through the page on a 375px screen: Does the layout flow? Are fonts readable? Is spacing consistent? Do images crop well? Is the CTA visible above the fold?
3. **Evaluates desktop aesthetics** — same walkthrough at 1440px: Does it use the space well? Are grids aligned? Do hover states exist? Is the typography hierarchy clear?
4. **Checks against the palette** — are all colors from the defined 6-color palette? No hardcoded grays or off-brand colors sneaking in?
5. **Validates the mobile menu** — is it outside `<nav>`? Does it use inline styles for background? Are close handlers wired up?
6. **Flags anything that looks generic or AI-generated** — the site should feel handcrafted, not templated. If a section looks like every other AI-built site, rewrite it with more personality.

If the self-check finds issues, **fix them immediately** before presenting the result to the user. The user should never see first-draft code — only code that's already passed internal review.

Use **`/superpowers:verification-before-completion`** at major milestones (after initial build, after each review cycle batch, before deployment) for a more thorough final check.

For detailed implementation patterns, mobile menu architecture, and CSS recipes, read `references/technical-patterns.md` in this skill's directory. Key highlights:

### Mobile-first patterns

- **Navbar:** Transparent over hero → solid on scroll (JS adds `.scrolled` class at ~80px)
- **Mobile menu:** Slide-in panel from right. **MUST be a sibling of `<nav>`, NOT nested inside it** — see `references/technical-patterns.md` for why
- **Featured cards:** Horizontal scroll on mobile (`overflow-x-auto` + `scroll-snap`), CSS grid on desktop
- **Hours display:** Compact card format on mobile, large editorial numbers on desktop — use `md:hidden` / `hidden md:block` to swap
- **Sticky CTA bar:** Fixed bottom, appears via `IntersectionObserver` when hero scrolls away

### Content optimization

Research the business's Google reviews and descriptions. Use authentic customer language in copy — words like "fluffy", "hidden gem", "cozy", "worth the trip" are more persuasive than generic marketing speak.

### After initial build

Create backup files before any improvement cycles:
```bash
cp index.html index.html.bak
cp css/styles.css css/styles.css.bak
```

Commit current state to git.

---

## Phase 6: UI/UX Review Cycles

This is where the site goes from good to great. Run iterative self-improvement cycles focused on aesthetics, usability, and information hierarchy — for **both mobile and desktop**.

### Process

1. Invoke **`/ui-ux-pro-max`** to audit the design against its UX guidelines, spacing rules, and accessibility standards
2. Run 5 improvement cycles per batch, alternating focus between mobile and desktop
3. **Dispatch parallel review agents** for each cycle — one agent focused on mobile, one on desktop. Each agent reads the current HTML/CSS, identifies issues from its perspective, and proposes fixes. Merge the best suggestions from both.
4. After each batch, use the **code-reviewer** agent (`/superpowers:requesting-code-review`) to validate changes against the plan
5. Present a summary of changes to the user for approval
6. Repeat until the user is satisfied

### Using sub-agents for review cycles

Each improvement cycle should be delegated to a sub-agent with a clear brief:
- Current file contents (index.html, styles.css)
- The palette and font config
- Whether this cycle focuses on mobile or desktop
- The checklist below for what to evaluate

This keeps the main conversation lean — the user sees summaries of changes, not the full analysis. The sub-agent does the heavy lifting, proposes edits, and returns a concise diff summary.

### What to check each cycle

**Mobile (priority — most small business traffic is mobile):**
- Can you scroll past every section without getting stuck?
- Is all text readable without zooming?
- Do images fit without awkward cropping?
- Does the hamburger menu work from ANY scroll position?
- Is the menu background always solid/opaque?
- Are tap targets large enough (44×44px minimum)?
- Does the sticky CTA bar appear correctly and not overlap content?
- Are hours, address, and phone easy to find?

**Desktop:**
- Does the layout use full width effectively?
- Are hover states present and consistent?
- Does the navbar transition smoothly?
- Is typography hierarchy clear?
- Do cards and grids align properly?

**Content:**
- Does copy use authentic, specific language?
- Are business hours correct and prominent?
- Is the primary CTA above the fold?
- Does the meta description include local search terms?

---

## Phase 7: Deploy

### Initial deployment
```bash
git init
git add index.html css/ js/ assets/
git commit -m "Initial site build for [Business Name]"
gh repo create project-name --public --source=. --push
```

Connect the GitHub repo to Vercel — it auto-deploys from `main` on every push.

### Ongoing workflow

For solo projects, work directly on `main` — simplest workflow, every push goes live. For major redesigns, use a feature branch and merge when ready.

### Post-deploy checklist
- [ ] Update `og:image` to absolute URL with live domain
- [ ] Update `og:url` to live domain
- [ ] Connect custom domain in Vercel settings
- [ ] Test on actual phone (not just browser dev tools)
- [ ] Verify Google Reviews API loads correctly in production

---

## Pitfalls to Avoid

These are real issues that can waste hours. Read `references/technical-patterns.md` for full details and solutions.

1. **WebKit backdrop-filter bug** — Mobile menu inside a nav with `backdrop-filter` gets transparent backgrounds on iOS. Fix: move menu outside nav.
2. **`touch-action: pan-x` scroll trap** — Blocks vertical scrolling, trapping users in horizontal scroll sections. Fix: don't use it.
3. **Tailwind CDN custom colors failing on mobile** — Custom Tailwind classes sometimes don't render. Fix: use inline `style=""` with hardcoded hex for critical elements.
4. **Image cropping in cards** — `object-cover` can cut off important parts. Fix: adjust per-image with `object-top`, `object-center`, or `scale-110`.
5. **Mobile menu only works at page top** — Scroll-dependent nav styles can break the menu at other positions. Fix: keep menu as nav sibling, not child.
6. **Hours display cramped on mobile** — Large editorial numbers don't fit small screens. Fix: separate mobile/desktop layouts with responsive classes.
