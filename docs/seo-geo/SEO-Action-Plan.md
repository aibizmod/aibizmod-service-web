# SEO Improvement Action Plan — aibizmod.com
**Analysed:** Keyword Stats CSV (Jun 2025 – May 2026) + Website Codebase  
**Date:** June 2026  

---

## Executive Summary

Three critical problems are blocking organic growth:

1. **The keyword research CSV is 90% irrelevant.** Of ~180 keywords, the overwhelming majority target construction management software (Procore, construction scheduling, bidding software) — a niche completely unrelated to aibizmod's services. Only ~10 keywords overlap.
2. **Core technical SEO infrastructure is missing.** No `sitemap.xml`, no `robots.txt`, no `LocalBusiness`/`Service` structured data on any page.
3. **On-page metadata is not targeting any real search intent.** Page titles are generic, H1s carry no keywords, and service page descriptions are too short to compete.

---

## Priority 1 — Fix Broken Site Elements (Do This Week)

These are live bugs that actively harm trust and crawlability.

### 1.1 Fix broken WhatsApp link
**File:** `src/components/sections/HeroSection.tsx:52` and `src/components/layout/Footer.tsx:64`  
Both contain `href="https://wa.me/"` with no phone number. The link goes nowhere.

**Fix:** Replace with `href="https://wa.me/442079460958"` to match the phone number already shown in the footer.

### 1.2 Fix broken social media links
**Files:** `src/components/sections/HeroSection.tsx:26-62` and `src/components/layout/Footer.tsx:39-70`  
All social links point to `https://linkedin.com`, `https://instagram.com`, etc. — the platform homepages, not aibizmod's profiles. These are dead ends for users and provide zero link equity signal.

**Fix:** Replace each `href` with the actual company profile URL for every platform. If a profile doesn't exist yet, remove that icon entirely — dead links hurt more than no link.

### 1.3 Fix the newsletter subscription form
**File:** `src/components/layout/Footer.tsx:76-84`  
The form uses `setTimeout` to fake a success state. No email is actually collected. This breaks user trust when subscribers never receive anything.

**Fix:** Connect to a real email service (Mailchimp, Resend, ConvertKit, or a Next.js API route). Until then, remove the form entirely.

---

## Priority 2 — Add Missing Technical SEO Files (This Week)

### 2.1 Create `sitemap.xml`
Next.js App Router supports this natively. Create `src/app/sitemap.ts`:

```ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://aibizmod.com'
  const servicePages = [
    'web-development', 'software-development', 'mobile-app-development',
    'digital-marketing', 'hosting-infrastructure', 'automation',
    'customer-exp-management', 'it-consulting-it-services',
  ]
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...servicePages.map(slug => ({
      url: `${base}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ]
}
```

### 2.2 Create `robots.txt`
Create `src/app/robots.ts`:

```ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://aibizmod.com/sitemap.xml',
  }
}
```

### 2.3 Add structured data to the homepage
**File:** `src/app/page.tsx`  
The blog posts have `BlogPosting` schema but the homepage has nothing. Add `Organization` + `WebSite` + `Service` schema as a `<script type="application/ld+json">` block inside the page component.

Minimum required schema:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "aibizmod",
  "url": "https://aibizmod.com",
  "telephone": "+442079460958",
  "email": "aibizmod@outlook.com",
  "description": "End-to-end technology services — custom software, web development, mobile apps, digital marketing, cloud infrastructure, and IT consulting.",
  "sameAs": ["<linkedin-url>", "<instagram-url>"],
  "areaServed": ["GB", "IN"]
}
```

Add `Service` schema to each service page inside `ServicePageLayout`.

---

## Priority 3 — Keyword Strategy Overhaul (Week 1–2)

### 3.1 Discard 90% of the current keyword CSV

The CSV is from a research session focused on **construction management software** (Procore, construction scheduling, bidding, contractor software). This has zero relevance to aibizmod's services. Do not use these keywords to guide any content decisions for this website.

**Keywords from the CSV that ARE relevant (keep these):**

| Keyword | Monthly Searches (IN) | Competition | YoY Change | Target Page |
|---|---|---|---|---|
| cloud based project management software | 5,000 | Low | +9,900% | Blog / Software Dev page |
| it project management software | 500 | Low | 0% | IT Consulting page |
| engineering project management software | 500 | Low | 0% | Software Dev page |
| software management tools | 500 | Low | 0% | Services overview |
| bid management software | 500 | Low | +900% | Software Dev / Blog |
| it project management tools | 50 | Low | 0% | IT Consulting page |

### 3.2 Run new keyword research for actual services

The entire keyword library needs to be rebuilt around aibizmod's real services. Priority research areas:

**Web Development (highest-volume, competitive):**
- custom web development services
- web development company [UK / India]
- website development agency
- Next.js development company

**Software Development (medium volume, lower comp):**
- custom software development company
- ERP development services
- CRM development company
- SaaS application development
- bespoke software development UK

**Mobile App Development:**
- mobile app development company
- iOS app development services
- Android app development agency
- cross-platform app development

**IT Consulting (medium volume, low competition):**
- IT consulting company UK
- fractional CTO services
- cloud cost reduction consultant
- IT systems audit
- technology roadmap consulting

**Digital Marketing (high volume, high competition — target long-tail):**
- GA4 setup services
- Google Tag Manager consultant
- technical SEO audit service
- Looker Studio dashboard setup

**Automation:**
- business process automation services
- workflow automation company
- n8n automation services
- Zapier alternative automation

### 3.3 Target market geo-alignment

The keyword CSV uses INR (India), but `layout.tsx` sets `locale: 'en_GB'`. The footer shows a UK phone number (`+44`). Decide and commit to one primary market per page:

- **UK pages**: Add "UK" / "London" to title tags and descriptions
- **India pages**: Consider `/in/` subdirectory or separate location pages for Indian market
- Fix `layout.tsx:44` — `locale: 'en_GB'` should be `en_IN` for India-targeted pages

---

## Priority 4 — On-Page Metadata Rewrite (Week 2–3)

### 4.1 Homepage (`src/app/page.tsx`)

**Current title:** `aibizmod | Intelligent Tech Services`  
**Current H1:** `Technology That Keeps Business Connected`  
**Current description:** Generic, no location, no differentiator

**Recommended title:** `Custom Software, Web & App Development | aibizmod`  
**Recommended description:** `aibizmod builds custom software, websites, mobile apps, and digital marketing systems for businesses in the UK and India. End-to-end delivery — from architecture to launch.`

**H1 fix in `HeroSection.tsx:145`:** Change to include a keyword-aligned phrase. Example: `Custom Technology Built for Your Business` or `Software & Web Development That Connects Your Business`

### 4.2 Service pages — title tag formula

**Current pattern:** `"Digital Marketing"`, `"IT Consulting & IT Services"` — too short, no differentiator.

**Recommended formula:** `[Service] Services | UK & India | aibizmod`

| Page | Recommended Title |
|---|---|
| Web Development | `Web Development Services UK & India \| aibizmod` |
| Software Development | `Custom Software Development Company \| aibizmod` |
| Mobile App Development | `Mobile App Development Services \| iOS & Android \| aibizmod` |
| Digital Marketing | `Digital Marketing & SEO Services \| aibizmod` |
| IT Consulting | `IT Consulting Services & Technology Advisory \| aibizmod` |
| Automation | `Business Process Automation Services \| aibizmod` |
| Hosting & Infrastructure | `Cloud Hosting & Infrastructure Services \| aibizmod` |
| Customer Experience | `Customer Experience Management Services \| aibizmod` |

### 4.3 Description rewrite formula

Each description should follow: `[What you do] + [for whom] + [key differentiator or outcome]`

**Example — IT Consulting current:**  
`"Strategic technology advisory and managed IT services — fractional CTO support, architecture reviews, and IT project management."`

**Recommended:**  
`"IT consulting and technology advisory for UK and Indian businesses. We deliver cloud cost audits, systems architecture reviews, vendor comparisons, and 12-month technology roadmaps — practical documents, not slide decks."`

### 4.4 Keywords metadata in `layout.tsx`

**File:** `src/app/layout.tsx:20`  
**Current:** `['tech services', 'web development', 'mobile apps', 'cloud', 'automation', 'digital marketing']`

Meta `keywords` carry minimal ranking weight in 2026, but update anyway to reflect actual services:
```ts
keywords: [
  'custom software development', 'web development company',
  'mobile app development', 'IT consulting services',
  'digital marketing agency', 'cloud hosting services',
  'business automation', 'ERP development', 'CRM development',
  'aibizmod', 'tech services UK', 'tech services India'
],
```

---

## Priority 5 — Content Strategy (Month 1–3)

### 5.1 Blog content gaps

The blog currently has 4 posts (based on images in `/public/blog/`). The existing titles cover domain launch, SEO journey, GEO, and website trust. None target the core service keywords.

**Immediate blog articles to write (targeting low-competition, high-intent keywords):**

| Article Title | Target Keyword | Monthly Searches |
|---|---|---|
| "How to Choose Custom Software vs Off-the-Shelf for Your Business" | custom software development | Medium |
| "What is a Fractional CTO and Does Your Business Need One?" | fractional CTO services | Low–Medium |
| "Cloud Cost Audit: How We Reduced AWS Spend by 28% for a B2B SaaS" | cloud cost reduction | Low |
| "ERP vs CRM: What Your Business Actually Needs" | ERP vs CRM | Medium |
| "IT Project Management Software: A Buyer's Guide for SMBs" | it project management software | 500/mo — LOW COMP from CSV |
| "Cloud-Based Project Management: What Changed and What to Use in 2026" | cloud based project management software | 5,000/mo — 9,900% YoY from CSV |
| "Bid Management Software for Professional Services Firms" | bid management software | 500/mo — 900% YoY from CSV |
| "Google Analytics 4 Setup Checklist for Small Businesses" | GA4 setup | Low |
| "What Is Business Process Automation? A Practical Guide" | business process automation | Medium |

The last 3 articles directly capitalise on the HIGH-GROWTH, LOW-COMPETITION keywords found in the CSV.

### 5.2 Service pages — add FAQ schema

Each service page has a `faqs` array in its data object. These need `FAQPage` JSON-LD schema injected via `ServicePageLayout`. This can win FAQ rich snippets in search results.

Add to `src/components/ServicePageLayout.tsx`:
```ts
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": data.faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": { "@type": "Answer", "text": faq.a }
  }))
}
```

### 5.3 Internal linking

Currently, service pages and blog posts exist in silos. Add:
- Blog posts → link to relevant service page at the end of each article
- Homepage services grid → `aria-label` on each card with keyword-rich text
- Footer services list is good — ensure anchor text matches page H1 keywords exactly

---

## Priority 6 — Performance (Month 1)

### 6.1 Fix CDN font loading

**File:** `src/app/layout.tsx:47–51`  
General Sans is loaded from `api.fontshare.com` CDN. This is a third-party render-blocking request on every page.

The comment in the code even says *"Swap to next/font/local + woff2 for production."* — do this now. Download the font files, host locally, and use `next/font/local`. This will improve Largest Contentful Paint (LCP), which is a Core Web Vital Google uses for ranking.

### 6.2 Add `alt` text to all images

Blog post images use `post.imageAlt` correctly. Verify that every `<Image>` component across the site has a descriptive, keyword-relevant `alt` attribute. Decorative images should use `alt=""`.

---

## Quick-Win Checklist

| # | Action | File | Effort | Impact |
|---|---|---|---|---|
| 1 | Fix WhatsApp `href` | HeroSection.tsx + Footer.tsx | 5 min | High — broken CTA |
| 2 | Fix social links to company profiles | HeroSection.tsx + Footer.tsx | 30 min | High — trust + links |
| 3 | Create `sitemap.ts` | src/app/sitemap.ts | 20 min | High — crawlability |
| 4 | Create `robots.ts` | src/app/robots.ts | 5 min | Medium |
| 5 | Add Organization schema to homepage | src/app/page.tsx | 45 min | High — rich results |
| 6 | Add FAQPage schema to ServicePageLayout | src/components/ServicePageLayout.tsx | 1 hr | High — rich snippets |
| 7 | Rewrite homepage title + description | src/app/page.tsx | 15 min | High |
| 8 | Rewrite all 8 service page titles | Each service page.tsx | 1 hr | High |
| 9 | Fix layout.tsx locale | src/app/layout.tsx | 5 min | Low–Medium |
| 10 | Switch fonts from CDN to next/font/local | src/app/layout.tsx | 2 hrs | Medium — Core Web Vitals |
| 11 | Fix/remove fake newsletter form | src/components/layout/Footer.tsx | 2–4 hrs | Medium — trust |
| 12 | Write 3 blog posts targeting CSV keywords | Blog data file | 1–2 days | High — organic traffic |
| 13 | Run new keyword research for all services | — | 2–3 hrs | Critical |
| 14 | Submit sitemap to Google Search Console | search.google.com/search-console | 10 min | High |

---

## What NOT to Do

- **Do not use the construction/Procore keywords** from the CSV to build landing pages or content. There is no product-keyword match. This would attract zero-intent traffic and confuse Google about what the site is about.
- **Do not target keywords with 50,000/mo searches** (project management software, PMO software, program management software from the CSV) — these are dominated by Asana, Monday.com, Jira, and Microsoft Project. The domain is too new to compete.
- **Do not add a `/careers` page link in the footer** until that page exists. The footer currently links `/careers` which returns a 404.

---

## 30-Day Target State

After completing Priorities 1–4:
- Google can discover and crawl all 13+ pages via sitemap
- Every service page has a keyword-aligned title and description
- FAQ rich snippets eligible on all 8 service pages
- Organization schema live on homepage
- WhatsApp and social links functional
- 3 new blog posts live targeting the high-growth CSV keywords
- New keyword research plan ready for full implementation
