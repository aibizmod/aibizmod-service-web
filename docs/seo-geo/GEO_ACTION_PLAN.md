# Generative Engine Optimisation Action Plan

## Executive summary

The site has a useful content foundation: 15 routes have page metadata, eight service pages contain detailed deliverables and FAQs, four original articles are published, and blog posts include `BlogPosting` structured data. The main GEO constraint is not a lack of keywords. It is that the business is difficult for an answer engine to verify as a distinct, trustworthy entity.

The highest-impact work is to make every important page discoverable in initial HTML, connect the brand and its people through structured data, replace unsupported claims with verifiable evidence, and publish answer-first pages backed by real experience. An `llms.txt` file can be added as an experimental convenience, but it should not displace sitemap, indexing, evidence, or authority work.

## Current-state audit

### What is working

- Unique metadata exists on the main pages and all service routes.
- Service pages describe concrete tools, deliverables, processes, and buyer questions.
- Blog posts have descriptive URLs, author/date fields, images, and `BlogPosting` JSON-LD.
- Navigation provides crawlable links to core pages and service breadcrumbs are visible.
- A dedicated FAQ page and a GEO article already provide a base for answer-oriented content.

### Critical gaps

1. **Discovery controls are missing.** The repository has no `robots.ts`, `sitemap.ts`, canonical declarations, or deployed discovery policy that can be verified from the code.
2. **The entity graph is weak.** There is no site-wide `Organization`/`WebSite` graph, real team or author profile, logo/entity identifier, or valid `sameAs` network. LinkedIn links currently point to the LinkedIn homepage.
3. **Service answers are not present in initial HTML.** `ServicePageLayout` only mounts an FAQ answer when a visitor opens it. This makes high-value answer content less dependable for crawlers and non-JavaScript extraction.
4. **Proof is not auditable.** Claims such as “50+ Projects Completed,” “ISO Process-Led Delivery,” named testimonials, project outcomes, and percentage improvements lack linked evidence or methodology. An answer engine is more likely to cite corroborated claims than anonymous assertions.
5. **Schema coverage is narrow.** Blog posts have `BlogPosting`, but service, FAQ, breadcrumb, organization, and person/entity relationships are not expressed. Article authorship points to a generic editorial organization rather than a demonstrably qualified person.
6. **Content is descriptive but not yet citation-worthy.** The pages explain services, but there are few original case studies, benchmarks, templates, calculations, definitions, or primary-source references that other sites and answer engines can quote.
7. **Measurement is absent.** There is no visible GEO prompt benchmark, AI referral dashboard, citation tracker, or process for recording which pages appear in generated answers.

## Priority roadmap

### Phase 1: Technical  and trust foundation (days 1-14)

| Priority | Action | Owner | Acceptance criteria |
|---|---|---|---|
| P0 | Add `src/app/robots.ts` and `src/app/sitemap.ts` | Developer | Every canonical public route appears once in the XML sitemap; sitemap is declared in robots; staging/private routes are excluded. |
| P0 | Add self-referencing canonicals to all indexable pages | Developer | All 15 page types output one absolute canonical URL with a consistent host and trailing-slash policy. |
| P0 | Make service FAQ answers available in server-rendered HTML | Developer | Answers appear in “View Source” without interaction; accordion behavior remains accessible. Native `details`/`summary` is a good implementation option. |
| P0 | Build one site-wide JSON-LD graph | Developer + founder | Stable `@id` values connect `Organization`, `WebSite`, logo, contact details, service area, and verified social profiles. Only factual properties are included. |
| P0 | Add `Service` and `BreadcrumbList` schema to service pages | Developer | Rich Results/schema validation reports no errors; visible copy matches structured data exactly. |
| P0 | Add `FAQPage` schema to the central FAQ page | Developer | All marked-up questions and answers are visible on the page. Treat this as machine-readable context, not a promise of a Google rich result. |
| P0 | Fix identity links and business details | Founder | LinkedIn and other profiles resolve to owned profiles; name, email, phone, location/service area, and logo are consistent across site and profiles. |
| P0 | Audit CDN/WAF bot access | Developer | Homepage, robots, sitemap, articles, and service pages return `200` to normal search crawlers; security rules do not challenge text assets or verified search bots. Training crawler access remains a separate business decision. |
| P1 | Add an `llms.txt` summary | Developer | File lists the canonical company summary and key service, case-study, about, and contact URLs. Mark internally as experimental and maintain it with the sitemap. |

### Phase 2: Evidence and answer-ready content (days 15-45)

1. **Create real author and company profiles.** Publish named bios with role, expertise, experience, reviewed topics, and verified external profiles. Change article schema to `Person` authors where a real author takes responsibility; include `dateModified` only when content is materially updated.
2. **Publish three evidence-led case studies.** Each should state client or permitted anonymisation, industry, starting condition, constraints, work performed, stack, timeframe, measured result, measurement method, and client confirmation. Link each study from its relevant service page.
3. **Audit every trust claim.** Supply proof for “50+,” ISO-related language, testimonials, time savings, cost reductions, and project examples. Remove or qualify anything that cannot be demonstrated. Do not use an ISO label unless it accurately describes a certification or clearly explains the non-certification context.
4. **Add an answer block to every service page.** Directly below the H1, include a 40-70 word summary covering who the service is for, what is delivered, the business outcome, and the region served. Avoid marketing superlatives.
5. **Expand buyer-decision information.** Add realistic engagement ranges, timeline factors, prerequisites, deliverables, exclusions, ownership/handover terms, security practices, support model, and “good fit / not a fit” guidance.
6. **Create comparison and selection pages.** Prioritize questions buyers actually ask, such as custom software vs SaaS, native vs cross-platform apps, automation platform vs custom workflow, and rebuild vs improve an existing website. Include a clear comparison table, decision rules, limitations, and sources.
7. **Improve article extractability.** Add a concise answer after the H1, descriptive question-led H2s, definitions, key takeaways, primary-source citations, author/reviewer details, and related service/case-study links. Keep paragraphs independently understandable when quoted out of context.

### Phase 3: Topical authority and corroboration (days 46-90)

Build three focused topic clusters rather than publishing broad agency advice:

| Cluster | Core page | Supporting assets |
|---|---|---|
| GEO for service businesses | Definitive GEO service-business guide | AI visibility audit checklist, citation benchmark, schema guide, GEO vs SEO comparison, one measured experiment |
| Business automation | Automation service page | ROI calculator, workflow qualification checklist, invoice automation case study, build-vs-platform comparison |
| Web/software buying decisions | Web and software service pages | Scope template, cost-driver guide, architecture checklist, performance case study, handover checklist |

For each cluster, publish one original asset that earns citations: anonymised benchmark data, a repeatable test, a calculator with methodology, a downloadable template, or a detailed implementation case study. Cite primary sources for external facts and expose the methodology so readers can challenge or reproduce the result.

Strengthen third-party corroboration at the same time. Complete owned LinkedIn/company profiles, relevant business listings, partner/vendor directories, and genuine client references. Seek expert contributions, podcast appearances, or trade-publication coverage that links the same people, brand, services, and domain. Do not manufacture reviews, mentions, or author identities.

## Page-level recommendations

- **Homepage:** state audience, services, operating region, and differentiator in plain language; link proof points to supporting pages; add Organization/WebSite schema.
- **Service pages:** expose FAQs in initial HTML; add answer summaries, evidence, related case studies, specific decision criteria, Service and Breadcrumb schema.
- **About:** replace broad mission copy with named leadership, expertise, legal/business identity, operating locations, process evidence, and editorial standards.
- **Blog:** add author pages, reviewer/date policy, citations, internal topic hubs, and `Article` schema relationships to the organization and relevant service.
- **FAQ:** group questions by buyer journey, add deep links to detailed answers, and mark up only visible content.
- **Contact/footer:** use consistent business identity and verified profile URLs; explain response time, service area, and what information helps qualify an enquiry.

## Measurement plan

Establish a baseline before changes:

1. Select 30 prompts across brand, category, comparison, problem, and local/service-area intent.
2. Test the same prompts monthly in the relevant answer/search engines using a consistent location and logged-out method where possible.
3. Record brand mention, citation/link, cited URL, position/order, competitors mentioned, answer accuracy, and observation date. Model outputs vary, so use repeated observations rather than one-off screenshots.
4. Configure analytics channel groupings for known AI referrers and annotate all GEO releases.
5. Monitor Search Console/Bing Webmaster Tools for indexed canonical pages, crawl errors, query growth, and branded demand.

### 90-day targets

- 100% of canonical public pages in the sitemap and indexable without a JavaScript interaction.
- 100% of service pages with answer summaries, visible FAQs, Service/Breadcrumb schema, and at least one evidence link.
- Three verifiable case studies and three named expert/author profiles.
- At least one owned page cited for 20% of the 30-query benchmark set by day 90; use the baseline to adjust this target if current visibility is already higher.
- Month-over-month growth in non-brand impressions, branded searches, AI referral sessions, and assisted enquiries, reported separately.

## First implementation sprint

1. Implement sitemap, robots, canonicals, and the shared entity graph.
2. Refactor FAQ accordions so their content is present in initial HTML.
3. Replace placeholder social links and reconcile business identity details.
4. Validate every homepage proof claim and testimonial; remove unsupported items.
5. Create one named author profile and upgrade the GEO article into the first cluster hub.
6. Publish one fully evidenced case study and link it from the matching service page.
7. Run the 30-prompt baseline and create the monthly GEO scorecard.

