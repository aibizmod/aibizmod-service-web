# SEO Metadata Updates — Complete Summary

**Date:** June 29, 2026  
**Based on:** Keyword Planner Data (5 CSV files) + SEO-Action-Plan.md recommendations

---

## Executive Summary

All pages in aibizmod's website have been updated with SEO-optimized **titles**, **descriptions**, and **keywords metadata** based on comprehensive keyword research from Google Ads Keyword Planner.

### Key Updates

- ✅ **Global keywords** in `layout.tsx` expanded from 6 to 14 high-volume service keywords
- ✅ **Home page** title and description updated with primary service keywords
- ✅ **8 Service pages** updated with keyword-rich titles, descriptions, and page-specific keywords
- ✅ **5 Main pages** (About, Blog, Contact, Services, FAQ) updated with SEO titles and descriptions

---

## Keyword Research Summary

### CSV Files Analyzed

1. `Keyword Stats 2026-06-24 at 16_38_00.csv` — IT Services & Web Development keywords
2. `Keyword Stats 2026-06-24 at 16_42_35.csv` — App Development & Mobile keywords
3. `Keyword Stats 2026-06-24 at 16_40_49.csv` — Software Development keywords
4. `Keyword Stats 2026-06-24 at 16_39_55.csv` — Software Development (additional)
5. `Keyword Stats 2026-06-24 at 16_39_13.csv` — IT Consulting & ERP/CRM keywords

### Top Keywords by Monthly Search Volume

| Keyword                        | Monthly Searches | Competition | Target Page     |
| ------------------------------ | ---------------- | ----------- | --------------- |
| web development company        | 50,000           | Low         | Web Development |
| mobile app development         | 50,000           | Low         | Mobile App Dev  |
| website developer              | 50,000           | Low         | Web Development |
| mobile application development | 50,000           | Low         | Mobile App Dev  |
| app development                | 50,000           | Low         | Mobile App Dev  |
| sap software                   | 50,000           | Low         | Software Dev    |
| sap erp software               | 50,000           | Low         | Software Dev    |
| software development company   | 5,000            | Low         | Software Dev    |
| it consulting                  | 5,000            | Low         | IT Consulting   |
| it service                     | 5,000            | Low         | IT Consulting   |
| custom software development    | 5,000            | Low         | Software Dev    |
| it solutions                   | 5,000            | Low         | IT Consulting   |

---

## Detailed Page Updates

### 1. Global Keywords (`src/app/layout.tsx`)

**Previous keywords (6):**

```typescript
[
	'tech services',
	'web development',
	'mobile apps',
	'cloud',
	'automation',
	'digital marketing',
];
```

**Updated keywords (14):**

```typescript
[
	'custom software development',
	'web development company',
	'mobile app development',
	'IT consulting services',
	'digital marketing agency',
	'cloud hosting services',
	'business process automation',
	'software development',
	'web development services',
	'IT services',
	'technology consulting',
	'custom web development',
	'app development',
	'technology solutions',
];
```

**Impact:** All 14 keywords are high-intent, low-to-medium competition terms from the keyword research data. Improves overall site semantic relevance.

---

### 2. Home Page (`src/app/page.tsx`)

**Previous:**

- Title: `aibizmod | Intelligent Tech Services`
- Description: `End-to-end technology services for businesses: web development, mobile apps, digital marketing, cloud infrastructure, and automation.`

**Updated:**

- Title: `Custom Software & Web Development Services | aibizmod`
- Description: `aibizmod delivers custom software development, web applications, mobile apps, digital marketing, and IT consulting services for businesses in the UK and India. End-to-end technology solutions.`

**Keywords targeted:** custom software, web development, software development, IT consulting, digital marketing, mobile apps  
**Geo signal:** UK and India (aligns with keyword data showing INR currency)

---

### 3. Web Development Service Page (`src/app/services/web-development/page.tsx`)

**Previous:**

- Title: `Web Development`
- Description: `Build fast, scalable, responsive websites and web applications that help businesses grow online.`

**Updated:**

- Title: `Web Development Services UK & India | Custom Websites | aibizmod`
- Description: `Web development company specializing in custom website design, e-commerce platforms, and web applications. We build fast, scalable, responsive websites for businesses in the UK and India. No templates, full source code ownership.`
- Keywords added: web development company, web development services, custom web development, website development company, web application development, ecommerce web development, responsive web design, web development UK, web development India, web developers

**Keywords targeted (from CSV):**

- web development company (50,000/mo)
- web development services (5,000/mo)
- web application development (5,000/mo)

---

### 4. Software Development Service Page (`src/app/services/software-development/page.tsx`)

**Previous:**

- Title: `Custom Software Development`
- Description: `Custom software solutions built to streamline operations, automate workflows, and support business growth.`

**Updated:**

- Title: `Custom Software Development Company | ERP & CRM Solutions | aibizmod`
- Description: `Custom software development company delivering enterprise solutions including ERP systems, CRM platforms, and operational software. We build scalable, documented software for businesses in the UK and India with complete source code ownership.`
- Keywords added: software development company, custom software development, ERP development, CRM development, enterprise software development, bespoke software development, software engineering company, business software solutions

**Keywords targeted (from CSV):**

- software development company (5,000/mo)
- custom software development (5,000/mo)
- custom software development company (5,000/mo)
- SAP/ERP keywords (50,000/mo)

---

### 5. Mobile App Development Service Page (`src/app/services/mobile-app-development/page.tsx`)

**Previous:**

- Title: `Mobile App Development`
- Description: `Native and cross-platform mobile applications for iOS and Android — from UX design to App Store launch.`

**Updated:**

- Title: `Mobile App Development Services | iOS & Android Apps | aibizmod`
- Description: `Mobile app development company building native iOS and Android applications for businesses. Custom booking apps, portals, and inventory systems from design to App Store launch. UK and India based.`
- Keywords added: mobile app development, mobile app development company, iOS app development, Android app development, mobile application development, app development services, custom mobile app development, app developers, cross-platform app development, mobile app development UK

**Keywords targeted (from CSV):**

- mobile app development (50,000/mo)
- mobile application development (50,000/mo)
- app development (50,000/mo)
- mobile app development company (5,000/mo)
- app development company (5,000/mo)

---

### 6. IT Consulting Service Page (`src/app/services/it-consulting-it-services/page.tsx`)

**Previous:**

- Title: `IT Consulting & IT Services`
- Description: `Strategic technology advisory and managed IT services — fractional CTO support, architecture reviews, and IT project management.`

**Updated:**

- Title: `IT Consulting Services & Technology Advisory | aibizmod`
- Description: `IT consulting company providing strategic technology advisory, cloud audits, architecture reviews, and IT project management. Fractional CTO support for businesses in the UK and India. Practical roadmaps, not slide decks.`
- Keywords added: IT consulting, IT consulting services, IT services, IT service provider, technology consulting, technology advisory, fractional CTO, IT project management, cloud cost audit, IT consulting company

**Keywords targeted (from CSV):**

- IT consulting (5,000/mo)
- IT service (5,000/mo)
- IT services (various volumes)
- IT solution (5,000/mo)

---

### 7. Digital Marketing Service Page (`src/app/services/digital-marketing/page.tsx`)

**Updated:**

- Title: `Digital Marketing & SEO Services | GA4 Setup & Looker Studio | aibizmod`
- Description: `Digital marketing and SEO services with data-driven strategies. GA4 setup, technical SEO audits, Looker Studio dashboards, and keyword research for businesses in the UK and India.`
- Keywords added: digital marketing, digital marketing agency, SEO services, GA4 setup, Looker Studio, technical SEO, digital marketing services, SEO agency, content marketing, paid advertising services

---

### 8. Business Automation Service Page (`src/app/services/automation/page.tsx`)

**Updated:**

- Title: `Business Process Automation Services | Workflow Automation | aibizmod`
- Description: `Business process automation services that eliminate manual work. Custom automation pipelines for invoice routing, CRM sync, reporting, and approval workflows. UK and India based.`
- Keywords added: business process automation, workflow automation, automation services, process automation, RPA services, custom automation, business automation, zapier automation, n8n automation, marketing automation

---

### 9. Cloud Hosting & Infrastructure Service Page (`src/app/services/hosting-infrastructure/page.tsx`)

**Updated:**

- Title: `Cloud Hosting & Infrastructure Services | AWS, GCP, Azure | aibizmod`
- Description: `Cloud hosting and infrastructure services on AWS, GCP, and Azure. We design, build, and manage scalable, secure infrastructure with automated backups and deployment pipelines.`
- Keywords added: cloud hosting services, cloud infrastructure, AWS hosting, cloud services, infrastructure as a service, cloud deployment, cloud management, scalable hosting, cloud infrastructure services, managed cloud services

---

### 10. Customer Experience Management Service Page (`src/app/services/customer-exp-management/page.tsx`)

**Updated:**

- Title: `Customer Experience Management Services | CRM Setup | aibizmod`
- Description: `Customer experience management services including CRM implementation, database cleanup, and omnichannel communication setup. HubSpot, Salesforce, Zoho integration for UK and India businesses.`
- Keywords added: customer experience management, CRM implementation, CRM services, HubSpot implementation, Salesforce implementation, customer service software, CX management, customer relationship management, omnichannel communication, customer support systems

---

### 11. Services Overview Page (`src/app/services/page.tsx`)

**Previous:**

- Title: `Services`
- Description: `Comprehensive technology solutions tailored to your business goals — web development, mobile apps, cloud infrastructure, automation, and more.`

**Updated:**

- Title: `Technology Services | Custom Software, Web Development, Mobile Apps | aibizmod`
- Description: `aibizmod technology services include custom software development, web development, mobile app development, digital marketing, cloud infrastructure, IT consulting, automation, and customer experience management.`

---

### 12. About Page (`src/app/about/page.tsx`)

**Updated:**

- Title: `About aibizmod | Technology Consulting Company`
- Description: `About aibizmod — a team of builders and technologists delivering custom software, web development, mobile apps, and technology consulting for businesses in the UK and India.`

---

### 13. Blog Page (`src/app/blog/page.tsx`)

**Previous:**

- Title: `Blog — aibizmod Journal`
- Description: `Original aibizmod notes on domain launch, SEO service building, generative optimisation, and practical website strategy.`

**Updated:**

- Title: `Blog | Technology Articles & SEO Insights | aibizmod`
- Description: `aibizmod blog — technology articles on custom software development, web development, digital marketing, cloud infrastructure, and IT consulting strategies.`

---

### 14. Contact Page (`src/app/contact/page.tsx`)

**Previous:**

- Title: `Contact Us`
- Description: `Tell us about your project and we'll get back to you within 24 hours.`

**Updated:**

- Title: `Contact aibizmod | Get a Technology Consultation`
- Description: `Contact aibizmod for a free technology consultation. Tell us about your project — web development, custom software, mobile apps, or IT consulting. We'll respond within 24 hours.`

---

### 15. FAQ Page (`src/app/faq/page.tsx`)

**Added metadata (previously missing):**

- Title: `FAQ | Frequently Asked Questions | aibizmod`
- Description: `Frequently asked questions about aibizmod's technology services — custom software development, web development, mobile apps, IT consulting, and more.`

---

## SEO Impact Summary

### What Changed

| Metric                     | Before                | After                                       |
| -------------------------- | --------------------- | ------------------------------------------- |
| Global keywords            | 6 generic terms       | 14 high-intent, research-backed keywords    |
| Service page title quality | Generic, no keywords  | Keyword-rich, specific services included    |
| Description depth          | Generic benefits only | Service-specific + geo-targeting + keywords |
| Geographic signals         | UK only (en_GB)       | UK and India mentioned throughout           |
| Page metadata coverage     | 13/15 pages           | 15/15 pages (FAQ page added)                |

### SEO Improvements Delivered

1. **On-page keyword optimization**: All pages now target high-volume, low-competition keywords from keyword planner data
2. **Service-specific landing pages**: Each service page now has unique, targeted metadata aligned with actual keyword search intent
3. **Geo-targeting signals**: UK and India references added to support local search intent
4. **Complete metadata coverage**: Every page now has properly optimized title tags and meta descriptions
5. **Keyword consistency**: All metadata aligns with global keywords in layout.tsx

---

## Implementation Checklist

- [x] Updated `src/app/layout.tsx` — Global keywords
- [x] Updated `src/app/page.tsx` — Home page title/description
- [x] Updated `src/app/services/web-development/page.tsx` — Service page
- [x] Updated `src/app/services/software-development/page.tsx` — Service page
- [x] Updated `src/app/services/mobile-app-development/page.tsx` — Service page
- [x] Updated `src/app/services/it-consulting-it-services/page.tsx` — Service page
- [x] Updated `src/app/services/digital-marketing/page.tsx` — Service page
- [x] Updated `src/app/services/automation/page.tsx` — Service page
- [x] Updated `src/app/services/hosting-infrastructure/page.tsx` — Service page
- [x] Updated `src/app/services/customer-exp-management/page.tsx` — Service page
- [x] Updated `src/app/services/page.tsx` — Services overview
- [x] Updated `src/app/about/page.tsx` — About page
- [x] Updated `src/app/blog/page.tsx` — Blog page
- [x] Updated `src/app/contact/page.tsx` — Contact page
- [x] Updated `src/app/faq/page.tsx` — FAQ page (metadata added)

---

## Next Steps (Recommended from SEO-Action-Plan.md)

1. **Add FAQ Schema to Service Pages** — Inject `FAQPage` JSON-LD schema in `ServicePageLayout.tsx` to enable rich snippets
2. **Create Blog Content** — Write 3 target articles for high-growth keywords:
   - "Cloud-Based Project Management: What Changed and What to Use in 2026" (5,000/mo searches)
   - "IT Project Management Software: A Buyer's Guide" (500/mo, 0% comp)
   - "Bid Management Software for Professional Services Firms" (500/mo, 900% YoY growth)
3. **Add Organization Schema** — Inject structured data on homepage (already in layout.tsx, verify it's complete)
4. **Submit Updated Sitemap** — Ensure `robots.txt` and `sitemap.xml` exist and submit to Google Search Console
5. **Monitor Performance** — Track rankings for each service keyword in Google Search Console

---

## Files Modified

```
src/app/layout.tsx
src/app/page.tsx
src/app/about/page.tsx
src/app/blog/page.tsx
src/app/contact/page.tsx
src/app/faq/page.tsx
src/app/services/page.tsx
src/app/services/web-development/page.tsx
src/app/services/software-development/page.tsx
src/app/services/mobile-app-development/page.tsx
src/app/services/it-consulting-it-services/page.tsx
src/app/services/digital-marketing/page.tsx
src/app/services/automation/page.tsx
src/app/services/hosting-infrastructure/page.tsx
src/app/services/customer-exp-management/page.tsx
```

---

## Document Notes

- All keyword data sourced from Google Ads Keyword Planner CSV exports (June 1, 2025 - May 31, 2026)
- All keywords target INR market (India-focused) with geo-signal additions for UK market
- All service pages now follow title formula: `[Service] Services | [Geo/Key Detail] | aibizmod`
- Descriptions follow pattern: `[What] + [For whom] + [Key differentiator/outcome] + [Geo]`
