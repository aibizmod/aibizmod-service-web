# Post-Launch Tasks — aibizmod.com
**Purpose:** Everything that needs to be done immediately after the website goes live.  
**Work through these in order — each section unblocks the next.**

---

## 1. Search Engine Setup

- [ ] Submit sitemap to Google Search Console — `https://aibizmod.com/sitemap.xml`
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify domain ownership in Google Search Console
- [ ] Request indexing for homepage, all service pages, and blog posts manually
- [ ] Confirm `robots.ts` is returning correct directives (no pages accidentally blocked)
- [ ] Check all pages are crawlable using Google's URL Inspection tool
- [ ] Verify canonical tags are present and correct on all pages

---

## 2. Analytics & Tracking

- [ ] Install Google Analytics 4 (GA4) — add `gtag` or GTM snippet to `layout.tsx`
- [ ] Set up Google Tag Manager (GTM) container
- [ ] Configure conversion events in GA4:
  - Contact form submission
  - "Get Started" button click
  - WhatsApp link click
  - Email link click
  - Newsletter signup
- [ ] Connect GA4 as a data source in Google Search Console
- [ ] Set up a Looker Studio dashboard linking GA4 + Search Console
- [ ] Install Meta Pixel (if running Facebook/Instagram ads)
- [ ] Test all tracking events fire correctly using Tag Assistant

---

## 3. Performance Checks

- [ ] Run Google PageSpeed Insights on homepage, each service page, and blog
- [ ] Target scores: 90+ Performance, 90+ Accessibility, 100 Best Practices, 90+ SEO
- [ ] Fix any Largest Contentful Paint (LCP) issues flagged
- [ ] Switch General Sans font from `api.fontshare.com` CDN to `next/font/local` (render blocking)
- [ ] Verify all images have descriptive `alt` attributes
- [ ] Check mobile layout on real devices (iOS Safari, Android Chrome)
- [ ] Test site load speed from UK and India using GTmetrix or WebPageTest
- [ ] Confirm no broken links using a crawler (Screaming Frog free tier or Ahrefs Webmaster)

---

## 4. Fix Live Bugs Identified Pre-Launch

- [ ] Fix WhatsApp `href` — change `https://wa.me/` to `https://wa.me/442079460958` in:
  - `src/components/sections/HeroSection.tsx`
  - `src/components/layout/Footer.tsx`
- [ ] Update all social links from generic platform homepages to actual company profile URLs in:
  - `src/components/sections/HeroSection.tsx`
  - `src/components/layout/Footer.tsx`
- [ ] Replace fake newsletter form (setTimeout mock) with a real email service or remove it
- [ ] Either create `/careers` page or remove the footer link to avoid 404
- [ ] Create `/privacy` page (linked in footer and newsletter disclaimer)
- [ ] Create `/terms` page (linked in footer)

---

## 5. Structured Data & Rich Snippets

- [ ] Add `Organization` JSON-LD schema to homepage (`src/app/page.tsx`)
- [ ] Add `Service` JSON-LD schema to each service page via `ServicePageLayout`
- [ ] Add `FAQPage` JSON-LD schema to each service page (FAQ data already exists)
- [ ] Add `LocalBusiness` schema with phone, email, and address
- [ ] Validate all schema using Google's Rich Results Test tool
- [ ] Check for schema errors in Google Search Console after indexing

---

## 6. Business Listings & Directory Submissions

- [ ] Create / claim Google Business Profile listing
- [ ] Submit to Bing Places for Business
- [ ] List on Clutch.co (technology services directory — high domain authority)
- [ ] List on GoodFirms
- [ ] List on DesignRush
- [ ] Submit to Crunchbase
- [ ] List on Bark.com (UK SME services marketplace)
- [ ] Submit to Yell.com (UK local business directory)
- [ ] Submit to Justdial (India market)
- [ ] Submit to Sulekha (India market)
- [ ] Ensure NAP (Name, Address, Phone) is identical across all listings

---

## 7. Social Media Activation

- [ ] Publish launch announcement post on LinkedIn
- [ ] Publish launch announcement on Instagram, Facebook, and X
- [ ] Pin launch post on all active platforms
- [ ] Update all social profile bios with website URL `https://aibizmod.com`
- [ ] Update LinkedIn company page: description, services, banner image, website URL
- [ ] Share the first blog post across all active channels
- [ ] Set up a posting schedule (minimum 2x per week on LinkedIn)

---

## 8. Content — Immediate Publishing

- [ ] Publish the 10 high-priority blog posts from `Blog-Creation-Tasks.md`
- [ ] Ensure each blog post has:
  - Keyword-aligned title and meta description
  - Internal link to at least one relevant service page
  - OG image set (`post.image` in blog data)
  - Read time and author set correctly
- [ ] Update homepage FAQ section with the most common client questions
- [ ] Add at least one real client testimonial to the Testimonials section

---

## 9. Email & Communication Setup

- [ ] Set up `hello@aibizmod.com` email address (currently used in SocialMediaPageContent)
- [ ] Confirm contact form on `/contact` page routes to the correct inbox
- [ ] Set up email auto-responder for contact form submissions
- [ ] Test contact form end-to-end (fill in and verify delivery)
- [ ] Update Footer email from `aibizmod@outlook.com` to `hello@aibizmod.com` if domain email is live

---

## 10. Security & Legal

- [ ] Enable HTTPS and verify SSL certificate is valid
- [ ] Set up automatic SSL renewal
- [ ] Add security headers: `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`
- [ ] Publish Privacy Policy at `/privacy` (required for GDPR compliance — UK & India)
- [ ] Publish Terms of Service at `/terms`
- [ ] Add cookie consent banner if using GA4 / Meta Pixel (required under UK GDPR)
- [ ] Configure rate limiting on contact form API route to prevent spam

---

## 11. Monitoring & Alerts

- [ ] Set up uptime monitoring (UptimeRobot free tier — alerts if site goes down)
- [ ] Set up Google Search Console email alerts for coverage errors
- [ ] Create a monthly SEO review calendar (check rankings, impressions, clicks)
- [ ] Set up Ahrefs Webmaster Tools (free) for backlink and keyword monitoring
- [ ] Schedule a 30-day post-launch review to assess traffic, leads, and issues

---

## Quick Reference — Priority Order

| Priority | Task | Effort |
|---|---|---|
| P0 | Fix broken WhatsApp link | 5 min |
| P0 | Fix social links to real profiles | 30 min |
| P0 | Verify site is indexed in Google Search Console | 10 min |
| P0 | Submit sitemap to GSC | 5 min |
| P1 | Install GA4 + set up conversions | 2–3 hrs |
| P1 | Fix fake newsletter form | 2–4 hrs |
| P1 | Create Privacy Policy + Terms pages | 2–4 hrs |
| P1 | Add Organization + FAQPage schema | 2 hrs |
| P1 | Publish first 3 blog posts | 1–2 days |
| P2 | Switch fonts to next/font/local | 2 hrs |
| P2 | Submit to Clutch, GoodFirms, Google Business Profile | 3 hrs |
| P2 | Social media launch announcement | 1 hr |
| P2 | Set up uptime monitoring | 15 min |
| P3 | Run PageSpeed Insights and fix issues | 4–8 hrs |
| P3 | Publish remaining 7 priority blog posts | 3–5 days |
