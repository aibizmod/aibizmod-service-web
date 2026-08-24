# Pre-Launch Action Plan — aibizmod.com
**Purpose:** Everything required before the website goes live — code fixes, email infrastructure, SEO, GEO, and marketing setup.

---

## Phase 1 — Code-Level Bug Fixes (Day 1)

### P0 — Broken Links & 404s (Fix Immediately)

- [ ] **Create `/privacy` page** — `src/app/privacy/page.tsx`
  - GDPR-compliant privacy policy covering UK & India visitors
  - Required for GA4, Meta Pixel, and newsletter form legality
- [ ] **Create `/terms` page** — `src/app/terms/page.tsx`
  - Terms of service covering services, liability, payment terms
- [ ] **Create `/careers` page** — `src/app/careers/page.tsx`
  - Either create a basic careers page or remove the link from Footer
- [ ] **Fix WhatsApp `href`** — `src/components/sections/HeroSection.tsx:52` and `src/components/layout/Footer.tsx:62`
  - Change `href="https://wa.me/"` → `href="https://wa.me/442079460958"`
- [ ] **Fix social media links** — `HeroSection.tsx` and `Footer.tsx`
  - Replace generic `linkedin.com`, `instagram.com`, etc. with actual company profile URLs
  - Remove platforms where no profile exists (broken links hurt trust)
- [ ] **Fix `aibizmode` typo** — `src/app/services/web-development/page.tsx:11` and `src/app/services/software-development/page.tsx:14`
  - Change `"Web Development | aibizmode"` → `"Web Development | aibizmod"`
  - Change `"Custom Software Development | aibizmode"` → `"Custom Software Development | aibizmod"`

### P1 — Trust & Reliability

- [ ] **Fix fake newsletter form** — `src/components/layout/Footer.tsx:230-248`
  - Current form uses `setTimeout` to fake success — no email is collected
  - Connect to real service (Mailchimp, Resend, ConvertKit) or remove the form
- [ ] **Replace CDN font with local font** — `src/app/layout.tsx:101-105`
  - General Sans loaded from `api.fontshare.com` (render-blocking third-party resource)
  - Download woff2 files and use `next/font/local` — the code comment already says to do this
  - This directly impacts LCP (Largest Contentful Paint) — a Google ranking factor

---

## Phase 2 — Email Infrastructure & Scraping (Day 1-2)

### Email Setup

- [ ] **Set up domain email** — configure `hello@aibizmod.com`
  - Currently used in `SocialMediaPageContent.tsx` but likely not live yet
  - Set up via Google Workspace, Microsoft 365, or Zoho Mail
- [ ] **Test contact form end-to-end** — `src/components/contact/ContactPageContent.tsx`
  - Submit form and verify email delivery to `hello@aibizmod.com`
  - Set up auto-responder acknowledging receipt
- [ ] **Update Footer email** — `src/components/layout/Footer.tsx`
  - Currently shows `aibizmod@outlook.com` — change to `hello@aibizmod.com` once live

### Email Lead Scraping (for Outreach)

- [ ] **Define ideal client profile**: UK/India businesses needing tech services (web dev, automation, AI, IT consulting)
- [ ] **Set up scraping targets**:
  - LinkedIn Sales Navigator — filter by role (CTO, Head of Engineering, CEO), industry (tech, SaaS, e-commerce), region (UK, India)
  - Clutch.co — extract companies looking for web development / software development services
  - GoodFirms — same as Clutch, list active buyers
  - Google Maps — extract local businesses with poor/absent websites as web dev leads
  - BuiltWith — find companies using outdated tech stacks
- [ ] **Recommended scraping tools**:
  - **Apify** — LinkedIn Scraper, Google Maps Scraper, Clutch Scraper (20+ ready-made scrapers)
  - **PhantomBuster** — LinkedIn outreach + profile extraction
  - **Octoparse** — no-code scraper for any directory
  - **Evaboot** — LinkedIn Sales Navigator list extraction
- [ ] **Cleaned fields per lead**: Company Name, Website, Contact Name, Title, Email (guess or find), Phone, LinkedIn URL, Industry, Location
- [ ] **Verify emails** — use NeverBounce, ZeroBounce, or Hunter.io for deliverability checks

### Email Marketing Setup

- [ ] **Choose email platform**:
  - **Brevo (Sendinblue)** — good for UK/India, transactional + marketing emails, affordable
  - **Mailchimp** — standard choice, free tier up to 500 contacts
  - **Resend** — developer-friendly, good for transactional emails from the domain
- [ ] **Set up email sequences**:
  - Sequence A — "Custom Software / Web Dev" outreach (warm intro → case study → call booking)
  - Sequence B — "AI Automation" outreach (problem awareness → solution → demo)
  - Sequence C — "IT Consulting" outreach (audit offer → credentials → call)
- [ ] **Set up email warm-up** — use Instantly, Mailreach, or Warmbox to build sender reputation before sending cold campaigns
- [ ] **Configure SPF, DKIM, DMARC** records for `aibizmod.com` to ensure email deliverability

---

## Phase 3 — SEO Setup (Day 1-3)

### Technical SEO

- [ ] **Verify sitemap is live** — `https://aibizmod.com/sitemap.xml`
  - sitemap.ts exists but hasn't been tested in production
- [ ] **Verify robots.txt is live** — `https://aibizmod.com/robots.txt`
  - robots.ts exists but hasn't been tested
- [ ] **Submit to Google Search Console**
  - Add property → verify domain ownership (DNS TXT record)
  - Submit sitemap
  - Request manual indexing of homepage + all service pages
- [ ] **Submit to Bing Webmaster Tools**
- [ ] **Check canonical tags** — every page should have a self-referencing canonical URL
- [ ] **Check all pages return 200** — no 404s, no 500s, no accidental redirect chains

### On-Page SEO

- [ ] **Fix `aibizmode` typos** (listed in Phase 1)
- [ ] **Update homepage metadata** — `src/app/page.tsx`
  - Replace generic title with keyword-aligned version
  - Update meta description to include primary services + geos
- [ ] **Update all 8 service page metadata titles + descriptions** — see `Keyword-SEO-Action-Plan.md` Section 2 for exact text
- [ ] **Update root layout keywords** — `src/app/layout.tsx`
  - Replace generic `['tech services', 'web development', ...]` with actual service keywords
- [ ] **Fix locale mismatch** — `src/app/layout.tsx`
  - Current `locale: 'en_GB'` — decide if UK-primary or both UK+India
- [ ] **Update H1s (`data.name`)** on service pages to match title keywords

### Structured Data

- [ ] **Add `Organization` JSON-LD to homepage** — `src/app/page.tsx`
  - Name, URL, logo, phone, email, sameAs, areaServed
- [ ] **Add `Service` JSON-LD to all 8 service pages** — inject via `ServicePageLayout.tsx`
- [ ] **Add `FAQPage` JSON-LD to service pages** — FAQ data already exists in each page's data object
- [ ] **Add `BreadcrumbList` JSON-LD** to all inner pages
- [ ] **Validate all schema** — run `https://validator.schema.org/` on every URL

---

## Phase 4 — Generative Engine Optimisation (GEO) (Day 3-5)

### Answer-Ready Content

- [ ] **Add answer block to every service page** — 40-70 word summary below H1
  - Who it's for, what's delivered, business outcome, region served
  - No marketing superlatives — plain language that AI can quote
- [ ] **Make FAQ answers visible in initial HTML** — `ServicePageLayout.tsx`
  - Current accordion hides answers until user clicks
  - Refactor so Q&A pairs exist in server-rendered HTML (use `<details>`/`<summary>` or SSR the content)
- [ ] **Publish an `llms.txt` file** — `public/llms.txt`
  - Company summary, key service URLs, about, contact
  - Experimental — maintain alongside sitemap
- [ ] **Create named author profile** — replace generic "aibizmod Editorial Team" with a real person
  - Name, role, experience, LinkedIn, verified external profile
  - Update blog post schema to use `Person` author

### Proof & Authority

- [ ] **Audit every trust claim** on the homepage and service pages:
  - "50+ Projects Completed" — can you name them? If not, remove or qualify
  - "ISO Process-Led Delivery" — do you have ISO certification? If not, remove
  - Named testimonials (Sarah M., James K., Priya R.) — are these real people? If real, get permission. If not, replace with actual client quotes.
  - Percentage improvements — what is the measurement methodology?
- [ ] **Publish one real case study** before launch:
  - Client (name or anonymised), industry, problem, solution, stack, timeframe, measured result
  - Link from the relevant service page
- [ ] **Set up GEO measurement baseline**:
  - 30 prompts across brand, category, comparison, problem, and local intent
  - Test monthly in ChatGPT, Perplexity, Gemini, Claude
  - Record: brand mention, citation/link, position, competitors mentioned

---

## Phase 5 — Content & Blog (Day 3-7)

### Pre-Launch Publishing

- [ ] **Publish minimum 3 blog posts** targeting high-growth keywords from CSV:
  1. "Cloud-Based Project Management Software: Build vs. Buy in 2026" (targets 5,000/mo, +9,900% YoY)
  2. "Best Project Management Tools for Software Development Teams 2026" (targets +900% YoY)
  3. "What Is Business Process Automation? A Practical Guide" (targets medium-volume long-tail)
- [ ] **Internal linking** — each blog post must link to at least one relevant service page
- [ ] **OG images** — each blog post needs a social share image (`post.image` in blog data)
- [ ] **Author attribution** — set correct author + read time on every post

---

## Phase 6 — Analytics & Tracking (Day 2-3)

- [ ] **Install Google Analytics 4 (GA4)** — add measurement ID to `layout.tsx`
- [ ] **Set up Google Tag Manager (GTM)** — use GTM container for all tracking tags
- [ ] **Configure conversion events**:
  - Contact form submission
  - "Let's Connect" button click (navbar)
  - WhatsApp link click
  - Email link click
- [ ] **Install Meta Pixel** (if Facebook/Instagram ads planned)
- [ ] **Test all events** — use Google Tag Assistant / Meta Pixel Helper
- [ ] **Set up Looker Studio dashboard** — connect GA4 + Search Console for live reporting

---

## Phase 7 — Business Listings (Day 3-4)

- [ ] **Create / claim Google Business Profile** — with correct NAP (Name, Address, Phone)
- [ ] **Submit to Bing Places for Business**
- [ ] **List on Clutch.co** — highest domain authority for tech services directories
- [ ] **List on GoodFirms**
- [ ] **List on DesignRush**
- [ ] **Submit to Crunchbase**
- [ ] **UK-specific**: Yell.com, Bark.com
- [ ] **India-specific**: Justdial, Sulekha
- [ ] **Ensure NAP consistency** — identical across ALL listings

---

## Phase 8 — Launch Day Checklist

- [ ] **Deploy to production**
- [ ] **Verify robots.txt + sitemap.xml** are served correctly
- [ ] **Submit sitemap to Google Search Console** + request indexing
- [ ] **Manual URL Inspection** — homepage + all 8 service pages + blog + about + contact
- [ ] **Run PageSpeed Insights** — target 90+ Performance, 90+ Accessibility, 100 Best Practices
- [ ] **Test on real devices** — iOS Safari, Android Chrome, desktop Chrome/Firefox/Safari
- [ ] **Test contact form** end-to-end
- [ ] **Set up uptime monitoring** — UptimeRobot free tier
- [ ] **Publish launch post** on LinkedIn
- [ ] **Add Google Search Console alerts** for coverage errors

---

## Priority Summary

| Priority | Task Group | Timeline |
|----------|-----------|----------|
| P0 | Fix broken links & 404s | Day 1 |
| P0 | Fix WhatsApp & social links | Day 1 |
| P0 | Submit sitemap + index pages | Day 1 |
| P1 | Fix newsletter form | Day 1-2 |
| P1 | Set up email + scraping | Day 1-2 |
| P1 | Install GA4 + conversions | Day 2 |
| P1 | Fix `aibizmode` typos | Day 1 |
| P1 | Update all metadata titles/descriptions | Day 2 |
| P1 | Add structured data (Org, Service, FAQ) | Day 2-3 |
| P2 | Replace CDN font with local font | Day 2-3 |
| P2 | Publish 3 blog posts | Day 3-7 |
| P2 | Create privacy/terms/careers pages | Day 1-2 |
| P2 | Submit to business directories | Day 3-4 |
| P3 | GEO content (answer blocks, case study) | Day 4-7 |
| P3 | LinkedIn outreach sequences | Day 5-7 |
