# Indexability Action Plan

Audit of every URL in the live `sitemap.xml` (https://aibizmod.com/sitemap.xml) for Google indexability — HTTP status, `noindex`/robots blocking, canonical tags, and metadata. Based on the [seo-audit skill](https://agentskills.io) framework. Findings prioritized by severity.

## How the audit was run

- Fetched all 100 `<loc>` URLs from the live sitemap on `aibizmod.com`.
- For each URL checked: HTTP status code, `<meta name="robots">`, `X-Robots-Tag` header, and `<link rel="canonical">`.
- Verified `robots.txt` and root metadata config in the codebase (`src/app/robots.ts`, `src/app/layout.tsx`).
- Note: index *state* (whether Google has actually indexed each URL) can only be confirmed in **Google Search Console → Pages** report — this audit confirms *indexability* (nothing is blocking them).

---

## Verdict

**All 100 sitemap URLs return 200 OK and are indexable** — every sitemap URL returns `200 OK`, none emit `noindex` or a blocking `X-Robots-Tag`, and `robots.txt` allows crawling.

A deeper crawl of **115 URLs** (all sitemap URLs + supporting pages) surfaced signal-quality issues that don't block indexing but should be fixed:

- **6 pages missing a self-referencing canonical** (1 in the sitemap, 5 not)
- **5 pages running the generic default title** (`aibizmod | Intelligent Tech Services`)
- **1 duplicate title across two sitemap pages** (`/services/ai-automation` + `/services/ai-automation/process-automation`)
- **Homepage emits 2 H1 tags**
- **2 auth pages** (`/admin`, `/admin/login`) are publicly crawlable with default titles and no canonical

---

## Critical (0 found)

No critical issues — nothing is blocking Google from crawling or indexing the sitemap.

---

## High Priority (3 found)

### H1. `/automation-roi-calculator` missing canonical + unique title

| | |
|---|---|
| **Category** | Technical SEO — canonicalization |
| **File** | `src/app/automation-roi-calculator/page.tsx` (client component) |
| **Issue** | The page returns 200 but has **no `<link rel="canonical">`** and emits the **generic default title** (`aibizmod \| Intelligent Tech Services`) instead of a page-specific one. Without a self-canonical, Google may pick a different URL variant (trailing slash, query params, http/https) as canonical, splitting signals and ranking the wrong URL. The generic title also wastes SERP real estate. |
| **Impact** | High — signal dilution on a page that is already in the sitemap, plus a missed title/description opportunity in the SERP. |
| **Fix** | Add a segment layout `src/app/automation-roi-calculator/layout.tsx` exporting `metadata` with a unique title, description, and `alternates.canonical`. Next.js merges segment layout metadata over the root layout for the initial server-rendered HTML. |

```tsx
// src/app/automation-roi-calculator/layout.tsx (new)
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automation ROI Calculator | Estimate AI Automation Savings | aibizmod",
  description:
    "Calculate how much time and money your business could save with AI automation. Estimate annual savings from automating manual work with Aibizmod.",
  alternates: { canonical: "https://aibizmod.com/automation-roi-calculator" },
};

export default function AutomationRoiCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

### H2. `/audit/[reportId]` dynamic reports are indexable

| | |
|---|---|
| **Category** | Technical SEO — indexation hygiene |
| **File** | `src/app/audit/[reportId]/page.tsx` |
| **Issue** | User-generated audit reports return 200 with **no `noindex` and no canonical**. These are throwaway, per-visitor reports. If indexed they become thin, low-value results that dilute the site's index quality signal (applied site-wide by the Helpful Content system) and can look spammy. |
| **Impact** | High — thin dynamic pages polluting the index can suppress rankings on the site's good pages. |
| **Fix** | Add a segment layout `src/app/audit/[reportId]/layout.tsx` exporting `robots: { index: false, follow: false }` (same pattern already used by `src/app/not-found.tsx:12`). |

```tsx
// src/app/audit/[reportId]/layout.tsx (new)
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuditReportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

### H3. Notable indexable pages missing from the sitemap

| | |
|---|---|
| **Category** | Technical SEO — sitemap coverage |
| **File** | `src/app/sitemap.ts` (`staticRoutes`, line 21) |
| **Issue** | The following pages are indexable (200, unique titles, no block) but are **not listed in `sitemap.xml`** and rely on internal links alone: `/tools`, `/social-media-platforms`, `/ai-visibility-prompts`, `/ai-visibility-audit-report`, `/how-we-audit-ai-visibility`, `/careers`, `/clients`, `/privacy`, `/terms`. Google can still find them via links, but they won't appear in the submitted sitemap. |
| **Impact** | Medium-High — discoverability is delayed and GSC sitemap coverage report is incomplete. |
| **Fix** | Add these routes to `staticRoutes` in `src/app/sitemap.ts:21`. Use `priority: 0.5-0.7`; keep `/privacy` and `/terms` at low priority (0.3) or omit them if you prefer. |

```ts
// src/app/sitemap.ts — add to staticRoutes
'/tools',
'/social-media-platforms',
'/ai-visibility-prompts',
'/ai-visibility-audit-report',
'/how-we-audit-ai-visibility',
'/careers',
'/clients',
'/privacy',
'/terms',
```

### H4. Duplicate title on two in-sitemap service pages

| | |
|---|---|
| **Category** | On-page SEO — duplicate metadata |
| **Files** | `src/app/services/ai-automation/page.tsx:13`, `src/app/services/ai-automation/process-automation/page.tsx:7` |
| **Issue** | Both `/services/ai-automation` and `/services/ai-automation/process-automation` emit the identical `<title>`: `Business Process Automation Services \| Workflow Automation \| aibizmod \| aibizmod`. Two distinct sitemap URLs with identical titles force Google to pick one in the SERP and dilute click-through for both. |
| **Impact** | High — duplicate on-page metadata across two pages you actually want to rank separately. |
| **Fix** | Give the subservice page a distinct title focused on process/workflow automation, e.g. `Process Automation Services \| Workflow Automation \| aibizmod`. (Note: the trailing `\| aibizmod` repeat comes from the root title template appending the brand to a title that already contains it — see M3.) |

```ts
// src/app/services/ai-automation/process-automation/page.tsx
export const metadata: Metadata = {
	title: 'Process Automation Services | Workflow Automation | aibizmod',
	// ...
};
```

---

## Medium Priority (5 found)

### M1. `X-Robots-Tag` header not set at server level

| | |
|---|---|
| **Category** | Technical SEO — defense in depth |
| **Files** | Server config / `next.config.js` |
| **Issue** | No `X-Robots-Tag` HTTP header configured. Not a current problem (robots.txt + meta allow all), but a server-level `X-Robots-Tag: noindex` on `/audit/*` would complement H2 and survive any future HTML changes. |
| **Impact** | Medium — redundancy; no current failure. |
| **Fix** | Optional: add an `X-Robots-Tag` header for `/audit/:path*` in `next.config.js` headers. |

### M2. Verify sitemap is submitted in Google Search Console

| | |
|---|---|
| **Category** | Technical SEO — submission |
| **Files** | Google Search Console (external) |
| **Issue** | `sitemap.xml` is referenced in `robots.txt`, but it's unknown whether it's been submitted in **GSC → Sitemaps**. If not submitted, indexing discovery relies purely on crawling. |
| **Impact** | Medium — submission accelerates discovery and surfaces coverage errors. |
| **Fix** | Submit `https://aibizmod.com/sitemap.xml` in GSC → Sitemaps. Then use **URL Inspection** on `/automation-roi-calculator` after H1 and click "Request indexing". |

### M3. Homepage emits two H1 tags

| | |
|---|---|
| **Category** | On-page SEO — heading structure |
| **File** | `src/app/page.tsx` (homepage) |
| **Issue** | The homepage contains **2 `<h1>` tags**: `A Team Behind Visibility, Product, And Growth In AI & Automation` and `Tailored AI & Automation Services`. Google tolerates multiple H1s, but a single descriptive H1 is the cleanest signal for the page's primary topic and improves accessibility/screen-reader structure. |
| **Impact** | Medium — weakened topical signal on the site's most important page. |
| **Fix** | Keep the primary H1 (the hero headline) and demote the second H1 to an `<h2>`. |

### M4. Root title template double-appends brand

| | |
|---|---|
| **Category** | On-page SEO — title composition |
| **File** | `src/app/layout.tsx:96-99` |
| **Issue** | Root metadata uses `template: '%s | aibizmod'` while several pages already include `aibizmod` in their own title (e.g. `Business Process Automation Services | Workflow Automation | aibizmod`), producing titles ending in `| aibizmod | aibizmod`. Crawl found this on the two ai-automation pages; the default title fallback (`aibizmod | Intelligent Tech Services`) is also emitted on 5 pages that never set their own `title` (see H1, H2, and the checklist). |
| **Impact** | Medium — awkward, keyword-wasting titles; duplicates the brand. |
| **Fix** | Optionally strip `| aibizmod` from page-level titles that already carry the brand, or review which pages rely on the root default and give each a unique `title` (this also removes the 5 identical default-title pages). |

### M5. `/admin` and `/admin/login` are publicly crawlable

| | |
|---|---|
| **Category** | Technical SEO — indexation hygiene |
| **Files** | `src/app/admin/page.tsx`, `src/app/admin/login/page.tsx` |
| **Issue** | The admin login pages return `200` with **no `noindex`, no canonical, and the generic default title**; `/admin` also has no H1. Login screens are thin, low-value results that should never appear in Google. |
| **Impact** | Medium — thin pages indexed; also a mild information-exposure risk (reveals the admin login route to attackers, though it's unguessable-only in practice). |
| **Fix** | Add `robots: { index: false, follow: false }` to a segment layout for the admin route (same pattern as H2), and consider blocking `/admin*` in `robots.txt`. |

```ts
// src/app/admin/layout.tsx (new)
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

---

## Low Priority (2 found)

### L1. `lastmod` not set in sitemap

| | |
|---|---|
| **Category** | Technical SEO — sitemap quality |
| **File** | `src/app/sitemap.ts` |
| **Issue** | No `lastModified` date on any URL. Google treats `lastmod` as a hint only, but accurate dates help fresh content get recrawled faster. |
| **Impact** | Low — hint only. |
| **Fix** | Add `lastModified` to sitemap entries where a stable date is available (e.g., blog posts). |

### L2. Monitor index coverage after fixes

| | |
|---|---|
| **Category** | Technical SEO — measurement |
| **Files** | Google Search Console (external) |
| **Issue** | Current index state (indexed vs. not indexed) is unverified. |
| **Impact** | Low — required for verification, not a defect. |
| **Fix** | After deploying H1-H3, review GSC → Pages for categories like "Crawled — currently not indexed" and "Duplicate, Google chose different canonical". Compare against the 100 sitemap URLs. |

---

## Summary

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| **Canonicalization** | 0 | 1 | 1 | 0 | 2 |
| **Indexation hygiene** | 0 | 1 | 1 | 0 | 2 |
| **Sitemap coverage** | 0 | 1 | 1 | 1 | 3 |
| **On-page metadata** | 0 | 1 | 2 | 0 | 3 |
| **Measurement** | 0 | 0 | 0 | 1 | 1 |
| **Total** | **0** | **4** | **5** | **2** | **11** |

## Recommended priority order

1. **H1** — Add canonical + unique title to `/automation-roi-calculator` (blocking signal quality)
2. **H2** — `noindex` `/audit/[reportId]` dynamic reports (index hygiene)
3. **H3** — Add missing indexable pages to the sitemap (coverage)
4. **H4** — Differentiate the duplicate title on `/services/ai-automation/process-automation` (on-page)
5. **M3** — Reduce homepage to a single H1 (on-page)
6. **M5** — `noindex` `/admin` + `/admin/login` (index hygiene)
7. **M1** — Optionally set `X-Robots-Tag` header for `/audit/*` and `/admin/*` (defense in depth)
8. **M2** — Submit sitemap in GSC + request indexing on fixed pages
9. **M4** — Review title-template double-branding
10. **L1** — Add `lastmod` to sitemap entries
11. **L2** — Review GSC Pages report after deployment

## Consequences of non-indexing (context)

- **Lost demand:** pages Google won't index never rank, so content investment returns nothing.
- **Site-wide quality drag:** Google applies quality signals site-wide; many thin/duplicate "crawled-not-indexed" pages can suppress rankings on good pages.
- **Wasted crawl budget:** bots that crawl and discard pages waste capacity that could go to important pages.
- **Signal splitting:** missing canonicals let Google choose the wrong URL variant, splitting ranking signals.
- **Index pollution:** if thin dynamic pages (e.g., `/audit/*`) *do* get indexed, they dilute the index and appear spammy — `noindex` is the correct tool to keep them out.

---

## Appendix — Page-by-page checklist (115 crawled URLs)

Crawl run against the live site: every URL fetched once, checking status, `<link rel="canonical">`, `<title>`, H1 count, and JSON-LD blocks. Legend: ✅ present/correct · ❌ missing · ⚠️ present but flawed · N/A not applicable.

### 1. Home, core, and utility pages

| URL | Status | Canonical | Title | H1 | JSON-LD | Verdict |
|---|---|---|---|---|---|---|
| `/` | 200 | ✅ | ✅ 57ch | ⚠️ **2 H1s** | ✅ 2 | Fix M3 (single H1) |
| `/about` | 200 | ✅ | ✅ | ✅ 1 | ✅ 2 | ✅ Indexable |
| `/contact` | 200 | ✅ | ✅ | ✅ 1 | ✅ 2 | ✅ Indexable |
| `/faq` | 200 | ✅ | ✅ | ✅ 1 | ✅ 4 | ✅ Indexable |
| `/careers` | 200 | ✅ | ✅ | ✅ 1 | ✅ 4 | ✅ Indexable |
| `/clients` | 200 | ✅ | ✅ | ✅ 1 | ✅ 2 | ✅ Indexable |
| `/privacy` | 200 | ✅ | ✅ | ✅ 1 | ✅ 4 | ✅ Indexable |
| `/terms` | 200 | ✅ | ✅ | ✅ 1 | ✅ 4 | ✅ Indexable |
| `/how-we-audit-ai-visibility` | 200 | ✅ | ✅ | ✅ 1 | ✅ 4 | ✅ Indexable; missing from sitemap (H3) |
| `/tools` | 200 | ✅ | ✅ | ✅ 1 | ✅ 2 | ✅ Indexable; missing from sitemap (H3) |
| `/ai-visibility-prompts` | 200 | ✅ | ✅ | ✅ 1 | ✅ 2 | ✅ Indexable; missing from sitemap (H3) |
| `/ai-visibility-audit-report` | 200 | ❌ | ⚠️ default 36ch | ✅ 1 | ✅ 2 | Fix H1 pattern (canonical + unique title); add to sitemap (H3) |
| `/social-media-platforms` | 200 | ❌ | ✅ 33ch | ✅ 1 | ✅ 2 | Add canonical; add to sitemap (H3) |

### 2. Dynamic / auth / asset URLs

| URL | Status | Canonical | Title | H1 | JSON-LD | Verdict |
|---|---|---|---|---|---|---|
| `/automation-roi-calculator` | 200 | ❌ | ⚠️ default 36ch | ✅ 1 | ✅ 3 | **H1** — add canonical + unique title |
| `/audit/[reportId]` (e.g. `/audit/sample-report-id`) | 200 | ❌ | ⚠️ default 36ch | ❌ 0 | ✅ 2 | **H2** — `noindex`; thin dynamic pages |
| `/admin` | 200 | ❌ | ⚠️ default 36ch | ❌ 0 | ✅ 2 | **M5** — `noindex` + block in robots |
| `/admin/login` | 200 | ❌ | ⚠️ default 36ch | ✅ 1 | ✅ 2 | **M5** — `noindex` + block in robots |
| `/icon.svg` | 200 | N/A | N/A | N/A | N/A | App icon asset, not a page — ignore |

### 3. Services (hub + 61 subpages) — all ✅ except the pair noted

Every `/services` page returns 200, has a self-canonical, exactly one H1, unique title, and JSON-LD. The only defect is the **duplicate title** on `/services/ai-automation` and `/services/ai-automation/process-automation` (see H4).

| URL | Verdict |
|---|---|
| `/services` | ✅ Indexable |
| `/services/ai-automation` | ⚠️ **H4** — title collides with process-automation |
| `/services/ai-automation/agentic-ai` | ✅ Indexable |
| `/services/ai-automation/ai-intelligence` | ✅ Indexable |
| `/services/ai-automation/ai-ml` | ✅ Indexable |
| `/services/ai-automation/ai-powered-apps` | ✅ Indexable |
| `/services/ai-automation/ai-visibility-audit` | ✅ Indexable |
| `/services/ai-automation/ai-vision` | ✅ Indexable |
| `/services/ai-automation/conversational-ai` | ✅ Indexable |
| `/services/ai-automation/deep-learning` | ✅ Indexable |
| `/services/ai-automation/generative-ai` | ✅ Indexable |
| `/services/ai-automation/llm` | ✅ Indexable |
| `/services/ai-automation/process-automation` | ⚠️ **H4** — title collides with ai-automation |
| `/services/customer-experience-management` | ✅ Indexable |
| `/services/customer-experience-management/crm-services` | ✅ Indexable |
| `/services/customer-experience-management/customer-engagement` | ✅ Indexable |
| `/services/customer-experience-management/customer-intelligence` | ✅ Indexable |
| `/services/customer-experience-management/customer-support-systems` | ✅ Indexable |
| `/services/customer-experience-management/cx-automation` | ✅ Indexable |
| `/services/customer-experience-management/cx-it-consulting` | ✅ Indexable |
| `/services/digital-marketing` | ✅ Indexable |
| `/services/digital-marketing/brand-content` | ✅ Indexable |
| `/services/digital-marketing/email-lifecycle-marketing` | ✅ Indexable |
| `/services/digital-marketing/paid-advertising` | ✅ Indexable |
| `/services/digital-marketing/performance-insights` | ✅ Indexable |
| `/services/digital-marketing/search-marketing` | ✅ Indexable |
| `/services/digital-marketing/social-media-marketing` | ✅ Indexable |
| `/services/hosting-infrastructure` | ✅ Indexable |
| `/services/hosting-infrastructure/cloud-solutions` | ✅ Indexable |
| `/services/hosting-infrastructure/database-services` | ✅ Indexable |
| `/services/hosting-infrastructure/devops` | ✅ Indexable |
| `/services/hosting-infrastructure/hosting` | ✅ Indexable |
| `/services/hosting-infrastructure/infrastructure-operations` | ✅ Indexable |
| `/services/hosting-infrastructure/security` | ✅ Indexable |
| `/services/it-consulting-it-services` | ✅ Indexable |
| `/services/it-consulting-it-services/architecture-design` | ✅ Indexable |
| `/services/it-consulting-it-services/cloud-infrastructure` | ✅ Indexable |
| `/services/it-consulting-it-services/devops-automation` | ✅ Indexable |
| `/services/it-consulting-it-services/managed-it-operations` | ✅ Indexable |
| `/services/it-consulting-it-services/security-compliance` | ✅ Indexable |
| `/services/it-consulting-it-services/strategy-transformation` | ✅ Indexable |
| `/services/mobile-app-development` | ✅ Indexable |
| `/services/mobile-app-development/backend-services` | ✅ Indexable |
| `/services/mobile-app-development/consumer-apps` | ✅ Indexable |
| `/services/mobile-app-development/cross-platform-apps` | ✅ Indexable |
| `/services/mobile-app-development/enterprise-apps` | ✅ Indexable |
| `/services/mobile-app-development/maintenance-optimization` | ✅ Indexable |
| `/services/mobile-app-development/native-apps` | ✅ Indexable |
| `/services/software-development` | ✅ Indexable |
| `/services/software-development/business-applications` | ✅ Indexable |
| `/services/software-development/enterprise-software` | ✅ Indexable |
| `/services/software-development/industry-specific-software` | ✅ Indexable |
| `/services/software-development/product-development` | ✅ Indexable |
| `/services/software-development/software-modernization` | ✅ Indexable |
| `/services/software-development/tech-advisory-services` | ✅ Indexable |
| `/services/web-development` | ✅ Indexable |
| `/services/web-development/backend-development` | ✅ Indexable |
| `/services/web-development/cms-development` | ✅ Indexable |
| `/services/web-development/e-commerce-development` | ✅ Indexable |
| `/services/web-development/frontend-development` | ✅ Indexable |
| `/services/web-development/full-stack-development` | ✅ Indexable |
| `/services/web-development/web-optimization` | ✅ Indexable |

### 4. Blog (index + 20 posts) — all ✅

All return 200, self-canonical, single H1, unique title, JSON-LD (4–6 blocks).

| URL | Verdict |
|---|---|
| `/blog` | ✅ Indexable |
| `/blog/ai-agents-vs-traditional-automation` | ✅ Indexable |
| `/blog/ai-marketing-tools` | ✅ Indexable |
| `/blog/ai-monitoring-tools` | ✅ Indexable |
| `/blog/ai-seo-services` | ✅ Indexable |
| `/blog/ai-seo-tools-vs-ai-seo-services` | ✅ Indexable |
| `/blog/ai-visibility-benchmarks-service-businesses` | ✅ Indexable |
| `/blog/best-project-management-tools-software-development-teams-2026` | ✅ Indexable |
| `/blog/bid-management-software-guide` | ✅ Indexable |
| `/blog/buying-aibizmod-domain-first-week` | ✅ Indexable |
| `/blog/cloud-based-project-management-2026` | ✅ Indexable |
| `/blog/cloud-based-project-management-software-build-vs-buy` | ✅ Indexable |
| `/blog/generative-engine-optimisation-for-service-businesses` | ✅ Indexable |
| `/blog/google-ai-search-optimization` | ✅ Indexable |
| `/blog/how-ai-automation-saves-businesses-time-and-money` | ✅ Indexable |
| `/blog/how-to-improve-ai-ranking` | ✅ Indexable |
| `/blog/it-project-management-software-guide` | ✅ Indexable |
| `/blog/starting-our-seo-marketing-service-journey` | ✅ Indexable |
| `/blog/website-redesign-checklist-2026` | ✅ Indexable |
| `/blog/website-trust-before-seo-or-ads` | ✅ Indexable |
| `/blog/what-is-generative-engine-optimization-geo` | ✅ Indexable |

### 5. Comparisons (index + 9 pages) — all ✅

All return 200, self-canonical, single H1, unique title, JSON-LD (4 blocks).

| URL | Verdict |
|---|---|
| `/comparisons` | ✅ Indexable |
| `/comparisons/aiclicks-alternative` | ✅ Indexable |
| `/comparisons/automation-platform-vs-custom-workflow` | ✅ Indexable |
| `/comparisons/custom-software-vs-saas` | ✅ Indexable |
| `/comparisons/llmclicks-alternative` | ✅ Indexable |
| `/comparisons/native-vs-cross-platform-apps` | ✅ Indexable |
| `/comparisons/otterly-alternative` | ✅ Indexable |
| `/comparisons/peec-alternative` | ✅ Indexable |
| `/comparisons/profound-alternative` | ✅ Indexable |
| `/comparisons/redesign-vs-improve-existing-website` | ✅ Indexable |

### 6. Topics (index + 3 topic pages) — all ✅

| URL | Verdict |
|---|---|
| `/topics` | ✅ Indexable |
| `/topics/business-automation` | ✅ Indexable |
| `/topics/geo-for-service-businesses` | ✅ Indexable |
| `/topics/web-software-buying-decisions` | ✅ Indexable |

**Checklist totals:** 115 URLs checked · **105 fully clean pages** · **9 need action** (2 missing canonical + unique title: `/automation-roi-calculator`, `/ai-visibility-audit-report`; 1 missing canonical only: `/social-media-platforms`; 2 dynamic reports to `noindex`: `/audit/*`, `/admin/*`; 1 duplicate title pair; 1 homepage double-H1) · 1 icon asset (not a page, ignore). No URL blocks indexing; all defects are signal-quality or coverage.

---

## Appendix — Content quality & duplicate-content audit (page by page)

This second pass targets the two causes of **"Crawled — currently not indexed"** and **"Discovered — currently not indexed"** in Google Search Console: **thin / boilerplate-heavy pages** and **duplicate content**. For each of the 113 real pages: word count of visible text (scripts/styles stripped), heading counts, and a **unique-content ratio** (share of 3-word shingles that appear on fewer than 15% of pages — low ratio = content is mostly shared chrome/boilerplate). Then a pairwise Jaccard similarity scan flags near-duplicate pages.

**How to read it:** a low word count (`wc`) means thin content. A low unique-content ratio (`uR`) means the page adds little beyond the shared header/footer/nav — Google can treat that as low-value. High pairwise Jaccard (`jac`) between two pages means substantial shared text.

### Verdict

**No duplicate-content problem site-wide.** Of 3,702 pairwise comparisons above the 0.15 threshold, the vast majority are template/boilerplate sharing that Google already understands (nav, footer, service-page layout). No two blog posts, comparison pages, or service subpages are near-duplicates of each other. The real content-quality risk is concentrated in **4 thin or boilerplate-heavy pages** (all addressed by H1/H2/M5) plus **one client-rendered page** (`/ai-visibility-audit-report`) whose rich source content (3,340 words) is invisible in the initial HTML (see C6a). A **codebase cross-reference** of all 88 `page.tsx` files confirmed the thin pages are genuine and that no content-hidden-in-components pages are at risk.

### C1. Thin pages (under 250 visible words) — 3 found

| URL | Words | H2/H3 | Unique ratio | Risk | Action |
|---|---|---|---|---|---|
| `/admin` | **9** | 0/0 | 83% | Extreme — no content | **M5** noindex |
| `/admin/login` | **21** | 0/0 | 93% | Extreme — no content | **M5** noindex |
| `/ai-visibility-audit-report` | **138** | 0/0 | 41% | High — indexable thin page, and client-rendered (3,340 source words hidden behind a `"use client"` GraphQL fetch — see C6a) | **H1 pattern** — add canonical + unique title, and move core copy to server-rendered static content |

`/icon.svg` (0 words) is an icon asset, not a page — ignore.

### C2. Boilerplate-heavy pages (unique content < 25%) — 2 found

These pages return a normal page size but almost all of it is shared template text, not unique copy.

| URL | Words | Unique ratio | Risk | Action |
|---|---|---|---|---|
| `/audit/sample-report-id` | 285 | **5%** | High — dynamic report shell; almost no unique content | **H2** noindex (already planned) |
| `/careers` | 502 | **14%** | Medium — near the 250-word thin floor and mostly shared text | Add real job/values content or accept; not a ranking blocker today (unique title + canonical present) |

### C3. Low-word-count but healthy pages (watch list)

These are above the thin floor and have solid unique ratio, but are the leanest of the "fine" pages — worth expanding opportunistically.

| URL | Words | Unique ratio |
|---|---|---|
| `/contact` | 641 | 32% |
| `/tools` | 671 | 45% |
| `/clients` | 676 | 46% |
| `/topics/web-software-buying-decisions` | 688 | 45% |
| `/topics/business-automation` | 694 | 46% |
| `/services` | 713 | 48% |
| `/automation-roi-calculator` | 801 | 55% |
| `/about` | 908 | 61% |

### C4. Highest pairwise similarity — explainable, no action needed

The top pairs are all driven by shared site chrome + template text, not duplicate copy. Highest observed:

| Pair | Jaccard | Why similar |
|---|---|---|
| `/audit/sample-report-id` ↔ `/careers` | 0.81 | Both mostly header/footer/nav + a short page body — shared chrome dominates |
| `/contact` ↔ `/audit/sample-report-id` | 0.65 | Shared template |
| `/contact` ↔ `/careers` | 0.61 | Shared template + common CTA blocks |

Notably, the two ai-automation pages flagged in H4 for a duplicate **title** have **different bodies** (1,341 vs 1,339 words, ~71% unique each) — so it is a title collision, not duplicate content.

### C5. Word-count distribution (all healthy service/blog/comparison/topics pages)

- **62 service pages:** 1,297–2,267 words each, ~68–75% unique content — **healthy, no action**.
- **21 blog pages:** 962–1,945 words, ~64–83% unique — **healthy, no action**.
- **10 comparison pages:** 943–1,123 words, ~63–70% unique — **healthy, no action**.
- **4 topics pages:** 688–1,098 words — **healthy, no action** (two on the C3 watch list).

### C6. Codebase cross-reference (authored source words vs rendered words)

This pass analyzes the **source** of every `page.tsx` (88 route files) — counting authored text in the file itself (string literals + JSX text, imports/comments stripped with a quote-aware tokenizer) — and compares it to the rendered word count from the live crawl. It catches two patterns the crawl alone can't: **pages that are thin because content lives in shared components** (fine), and **pages that hide content behind client-side rendering** (a crawl/rendering risk).

**Key finding — page files with under ~300 authored words, but most are fine:**

| Bucket | Page files (source words) | Rendered words | Verdict |
|---|---|---|---|
| **Delegates to section components** | `/social-media-platforms` (37), `/about` (39), `/contact` (39), `/blog` (40), `/` (48), `/services` (50), `/tools` (53), `/clients` (55), `/ai-visibility-prompts` (73), `/topics` (143), `/comparisons` (163) | 641–1,886 | ✅ Fine — content lives in `@/components/sections/*`, `@/components/hero`, data files. Rendered output is rich. **No action.** |
| **Self-authored, healthy** | `/privacy` (612), `/terms` (551), `/faq` (508) | 951–1,069 | ✅ Fine — policy/FAQ text is written inline in the page file and renders rich. **No action.** |
| **Service hubs** | `/services/it-consulting-it-services` (608), `/customer-experience-management` (615), `/software-development` (662), `/hosting-infrastructure` (669), `/mobile-app-development` (673), `/web-development` (712), `/digital-marketing` (735), `/ai-automation` (817) | 1,100–1,341 | ✅ Fine — hub pages aggregate cards; individual subpages carry the content. |
| **Client-rendered (source rich, render thin)** | `/ai-visibility-audit-report` (**2,885** → **138** rendered), `/audit/[reportId]` (**821** → **285**), `/admin` (**533** → **9**), `/admin/login` (132 → 21), `/automation-roi-calculator` (396 → 801) | see column | ⚠️ see C6a below |
| **Thin-ish, real page** | `/careers` (126) | 502 (14% unique) | ⚠️ C2 — enrich opportunistically |

**C6a. Client-side rendering risk — content is invisible to the initial crawl**

Four pages are `"use client"` GraphQL/state-driven. The browser fetches and renders content only after JS + an API round-trip; the HTML Google first fetches is a thin shell:

| Page | Authored source | Rendered (crawl) | Why the gap | Risk |
|---|---|---|---|---|
| `/ai-visibility-audit-report` | 2,885 | **138** | `"use client"` + Apollo GraphQL query; audit content renders only after the report is fetched/submitted | **High** — most of the page's unique content is not in the initial HTML; the page also sits outside the sitemap (H3) and lacks canonical/title (H1). Today it reads as a thin 138-word shell to crawlers. |
| `/audit/[reportId]` | 821 | **285** (5% unique) | `"use client"` + GraphQL per reportId | High — but resolved by **H2** `noindex`, so render-depth doesn't matter. |
| `/admin` | 533 | **9** | `"use client"` dashboard; content is auth-gated + data-driven | High — but resolved by **M5** `noindex` + robots block. |
| `/admin/login` | 132 | 21 | `"use client"` sign-in | High — resolved by **M5** `noindex`. |
| `/automation-roi-calculator` | 396 | 801 | `"use client"` calculator; static copy + interactive widget | Medium — renders acceptably (801 words) but still needs H1 canonical/title. |

**Recommended fix for the one indexable client-rendered page (H1 expanded):** `/ai-visibility-audit-report` should move its core explanatory copy (what an AI-visibility audit covers, methodology, sample report, FAQ) into **server-rendered static content** in the page component, keeping only the interactive audit widget client-side. This is the highest-leverage content change on the site: it converts a 138-word crawlable shell into a rich, indexable page and removes the `noindex`-or-expand dilemma.

```tsx
// src/app/ai-visibility-audit-report/page.tsx (conceptual fix)
// Server component: static <section> copy (500+ words) + headings + JSON-LD
// Then wrap only the interactive widget in a <ClientWidget /> "use client" island
```

### Content-quality priority order

1. **C1 → M5** — noindex `/admin`, `/admin/login` (extreme thin pages, auth-gated)
2. **C1 → H2** — noindex `/audit/[reportId]` (dynamic thin shell)
3. **C1/C6a → H1** — expand + canonicalize `/ai-visibility-audit-report`; add server-rendered copy (only indexable thin page, and client-rendered)
4. **C2** — optionally enrich `/careers`; no action on `/audit/*` beyond noindex
5. **C3** — opportunistic expansion of watch-list pages (non-blocking)
