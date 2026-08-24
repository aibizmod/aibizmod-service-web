# GEO Implementation Tasks — Phase 1-3

Based on `GEO_ACTION_PLAN.md` cross-referenced against current codebase state.  
All changes target answer-engine visibility (ChatGPT, Perplexity, Gemini, Google AI Overviews).

---

## P0 — Do First (Critical — Phase 1 gaps)

### Task 1: Make FAQ answers server-rendered on all service/sub-service pages

**Purpose:** FAQ answers are currently hidden behind `useState` + `AnimatePresence` in both `ServicePageLayout.tsx` and `SubservicePageLayout.tsx`. Answer engines may not execute JS — content must be in initial HTML.

**Files affected:**
- `src/components/ServicePageLayout.tsx` (lines 1, 154-208)
- `src/components/SubservicePageLayout.tsx` (lines 1, 346-400)

**Solution:**
1. Replace `FAQItem` in both files with native `<details>`/`<summary>` HTML (same pattern as `src/app/faq/FAQAccordion.tsx`)
2. Remove `useState` import from both files
3. Remove `AnimatePresence` from both files
4. Style open/close with CSS `group-open:` selectors — no Framer Motion needed

**Reference:** `src/app/faq/FAQAccordion.tsx` — proven working pattern.

---

### Task 2: Add sub-service pages to sitemap

**Purpose:** `sitemap.ts` only lists top-level service URLs (8 entries). The 57+ sub-service pages are missing, relying solely on internal linking for discovery.

**File:** `src/app/sitemap.ts`

**Solution:** Add known sub-service slugs per parent to generate full sub-page URLs:

```ts
const subServiceSlugs: Record<string, string[]> = {
  'ai-automation': ['process-automation', 'conversational-ai', 'generative-ai', 'ai-powered-apps', 'ai-intelligence', 'ai-vision'],
  'web-development': ['frontend-development', 'full-stack-development', 'e-commerce-development', 'cms-development', 'web-optimization'],
  'software-development': ['business-applications', 'enterprise-software', 'industry-specific-software', 'product-development', 'software-modernization', 'tech-advisory-services'],
  'mobile-app-development': [],
  'digital-marketing': ['search-marketing', 'paid-advertising', 'brand-content', 'performance-insights', 'social-media-marketing', 'email-lifecycle-marketing'],
  'hosting-infrastructure': ['cloud-solutions', 'hosting', 'devops', 'security'],
  'customer-experience-management': ['crm-services', 'cx-automation', 'customer-support-systems'],
  'it-consulting-it-services': ['strategy-transformation', 'managed-it-operations', 'cloud-infrastructure', 'security-compliance', 'devops-automation'],
};
```

---

### Task 3: Add sub-service URLs to llms.txt

**Purpose:** Same coverage gap as sitemap — `llms.txt/route.ts` only lists top-level services.

**File:** `src/app/llms.txt/route.ts`

**Solution:** Apply the same sub-service slug map from Task 2 to generate sub-service URLs in `buildContent()`.

---

### Task 4: Fix entity graph logo URL

**Purpose:** Schema `logo` field points to `/favicon.ico` (16×16 or 32×32). Too small for rich results. Needs proper brand logo.

**File:** `src/app/layout.tsx` (line 27-28)

**Solution:** Change to a proper logo image:
```ts
url: 'https://aibizmod.com/icon-512x512.png',
contentUrl: 'https://aibizmod.com/icon-512x512.png',
```

**Note:** Verify the target file exists in `public/`. If not, use the largest available icon (e.g., `android-chrome-192x192.png` or create a new logo file).

---

## P1 — Do Next (High — Phase 2 quick wins)

### Task 5: Add answer summary block below H1 on all service pages

**Purpose:** Every service page needs a 40-70 word answer summary directly below the H1 that covers: who it's for, what's delivered, business outcome, region served. Answer engines will use this as their citation target.

**Files:**
- `src/components/ServicePageLayout.tsx`
- `src/components/SubservicePageLayout.tsx`
- All 8 parent + 57 sub-service page data files

**Solution:**
1. Add `answerSummary?: string` field to `ServicePageData` and `SubservicePageData`
2. Render immediately after H1 (after line 333 in ServicePageLayout, after line 531 in SubservicePageLayout)
3. Write unique summaries for each page

---

### Task 6: Create named Person author + update blog schema

**Purpose:** Blog posts use `"aibizmod Editorial Team"` with `@type: Organization` as author. Answer engines prefer named individuals with credentials (E-E-A-T signal).

**Files:**
- `src/data/blog.ts`
- `src/app/blog/[slug]/page.tsx`

**Solution:**
1. Replace `blogAuthor` with one or more named `Person` entries (e.g., founder name)
2. Update blog post schema from `@type: Organization` to `@type: Person`
3. Optionally create `/authors/[slug]/` routes with full bios and article lists

---

### Task 7: Create case studies route + publish first case study

**Purpose:** GEO plan requires three evidence-led case studies. These provide verifiable proof that answer engines can cite. Zero case studies currently exist.

**New files needed:**
- `src/data/caseStudies.ts`
- `src/app/case-studies/page.tsx`
- `src/app/case-studies/[slug]/page.tsx`

**Fields per case study:** slug, title, client (or anonymised), industry, starting condition, constraints, work performed, stack, timeframe, measured result, measurement method, client confirmation, images.

**After creation:** Link from relevant service page(s).

---

### Task 8: Audit trust claims across site

**Purpose:** Remove or qualify unsupported claims (percentages, counts, superlatives) that can't be verified. Answer engines avoid citing unsupported assertions.

**Files to review:**
- `src/app/page.tsx`
- All parent service page data files
- All sub-service page data files
- About page

**Solution:** For each claim found:
- If verifiable → add citation link to case study or external source
- If not verifiable → qualify ("Our team has delivered complex projects — ask us for examples")
- If neither → remove

---

## P2 — Medium (Phase 2 structural)

### Task 9: Expand buyer-decision information on sub-pages

**Purpose:** Add practical criteria: engagement ranges, prerequisites, deliverables, "good fit / not a fit." Helps answer engines provide complete answers.

**Files:**
- `src/components/SubservicePageLayout.tsx`
- All sub-service page data files

**Solution:** Add fields to `SubservicePageData`:
```ts
goodFit?: string[];
notFit?: string[];
engagementRange?: string;
prerequisites?: string[];
deliverables?: string[];
```

Render as new section in the layout.

---

### Task 10: Reorganize FAQ page by buyer journey

**Purpose:** 15 FAQ questions are ungrouped. Organize by buyer journey stage (Discovery → Evaluation → Decision → Post-Launch).

**File:** `src/app/faq/page.tsx`

**Solution:** Group FAQ items into categories and add category headers between groups.

---

### Task 11: Add named bios to About page

**Purpose:** Replace generic mission copy with named leadership, expertise, and process evidence.

**File:** `src/app/about/about-page-content.tsx` (or equivalent client component)

**Solution:** Add named founder/leadership bios with photos, relevant experience, process evidence, and editorial standards disclosure.

---

## P3 — Later (Phase 3 topical authority)

### Task 12: Build first topic cluster (GEO for service businesses)

- Create GEO hub page linking existing GEO articles
- Add AI visibility audit checklist, GEO vs SEO comparison
- Files: New routes under `/topics/geo/`

### Task 13: Create one original citable asset

- ROI calculator, downloadable template, or benchmark data page
- Must include methodology for reproducibility
- Target: other sites can link to it → backlinks → answer engine citations

### Task 14: Set up GEO measurement baseline

- Select 30 prompts across brand/category/comparison/problem/local intent
- Test monthly in answer engines (logged-out, consistent location)
- Record: brand mention, citation/link, cited URL, position, competitors, date
- Configure analytics channel groupings for known AI referrers

### Task 15: Create comparison pages

- `custom-software-vs-saas`
- `native-vs-cross-platform-apps`
- `automation-platform-vs-custom-workflow`
- Each needs: comparison table, decision rules, limitations, sources

---

## Quick Reference

| # | Task | File(s) | Priority | Effort |
|---|---|---|---|---|
| 1 | FAQ server render (native `<details>`) | ServicePageLayout.tsx, SubservicePageLayout.tsx | P0 | 2-3h |
| 2 | Sub-pages in sitemap | sitemap.ts | P0 | 30min |
| 3 | Sub-pages in llms.txt | llms.txt/route.ts | P0 | 15min |
| 4 | Logo fix (favicon→proper logo) | layout.tsx | P0 | 15min |
| 5 | Answer summary block below H1 | Both layouts + data files | P1 | 4-6h |
| 6 | Person author + blog schema | blog.ts, blog/[slug]/page.tsx | P1 | 2-3h |
| 7 | Case studies route + first study | New files | P1 | 4-8h |
| 8 | Trust claim audit | homepage + all service pages | P1 | 2-3h |
| 9 | Buyer-decision info on sub-pages | SubservicePageLayout + data | P2 | 4-6h |
| 10 | FAQ page grouping | faq/page.tsx | P2 | 1-2h |
| 11 | About page bios | about/ | P2 | 2-3h |
| 12 | Topic cluster (GEO hub) | New routes | P3 | 4-6h |
| 13 | Original citable asset | New page | P3 | 4-8h |
| 14 | GEO measurement baseline | Docs + analytics | P3 | 2-3h |
| 15 | Comparison pages | New routes | P3 | 6-8h |
