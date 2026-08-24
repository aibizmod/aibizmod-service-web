# Content Originality Action Plan

## Goal

Reduce AI-detection, plagiarism, and duplicate-content risk across the aibizmod website without changing the visual design first. This plan is based on:

- `Duplichecker-Plagiarism-Report.pdf` in the project root.
- The Quillbot/AI-detector summary shared by the client, which flagged large homepage/service copy blocks as likely AI-generated.
- A source audit of the active Next.js pages and public components.

Important note: AI detectors are not proof of plagiarism. Treat the report as a quality and originality signal, then rewrite with real company context, specific examples, and verified claims.

## Executive Summary

The main issue is not one single copied paragraph. The larger risk is that many sections use broad, polished agency language that appears across tech-service websites: "modern technology solutions", "streamline workflows", "business outcomes", "scale", "transparent communication", "end-to-end", and similar phrases.

Highest-risk areas:

1. Homepage hero, services, why-us, process, testimonials, and FAQ.
2. Service listing and service cards.
3. Service detail pages, because each page follows the same structure and repeats similar claims.
4. Testimonials and about-page stats, because they read as fabricated unless backed by real client evidence.
5. FAQ copy, especially one placeholder sentence copied from a UI-kit style component.

## Current Public Page Inventory

| Page / Section | File | Risk Level | Main Issue |
|---|---|---:|---|
| Homepage hero | `src/components/sections/HeroSection.tsx` | High | Generic tagline and description are heavily AI-detector friendly. |
| Homepage services intro | `src/components/sections/ServicesGrid.tsx` | High | Generic "innovative solutions" language flagged in report. |
| Homepage service stack cards | `src/components/ui/glass-cards.tsx` | High | Short service summaries are generic and repeated by services page. |
| Why choose us | `src/components/sections/WhyChooseUs.tsx` | High | Broad claims with unverifiable stats and generic agency phrasing. |
| Global presence | `src/components/sections/GlobalPresence.tsx` | Medium | "clients and partners around the world" needs proof or softer wording. |
| How we work | `src/components/sections/HowWeWork.tsx` | Medium | Process copy sounds templated and uses vague phrases. |
| Testimonials | `src/components/sections/Testimonials.tsx` | Critical | Quotes/names may be perceived as fabricated unless verified. |
| Homepage FAQ | `src/components/sections/FAQSection.tsx` | Critical | Contains off-brand placeholder copy: "Ship beautiful frontends..." |
| Services index | `src/app/services/page.tsx`, `src/data/services.ts` | High | Service descriptions are generic and overlap with homepage cards. |
| Service detail layout | `src/components/ServicePageLayout.tsx` | Medium | Shared template repeats the same section language across all services. |
| Service detail pages | `src/app/services/*/page.tsx` | High | Long AI-like paragraphs, repeated structure, generic FAQs. |
| FAQ page | `src/app/faq/page.tsx` | High | Fifteen answers use similar sentence patterns and repeat homepage FAQ. |
| About page | `src/components/about/AboutPageContent.tsx` | High | Timeline, values, and stats need verification and more natural voice. |
| Contact page | `src/components/contact/ContactPageContent.tsx` | Low | Mostly functional copy; only minor simplification needed. |
| Metadata | `src/app/**/page.tsx`, `src/app/layout.tsx` | Medium | Many metadata descriptions reuse the same service keywords. |

## Report-Matched Problem Phrases

These phrases or patterns appeared in the detector summary and should be rewritten first:

- "Empowering businesses with modern technology solutions..."
- "All the innovative solutions you need to grow your business..."
- "simplify workflows, improve efficiency, and strengthen your decisions"
- "Custom web platforms, SaaS products, and internal tools engineered..."
- "Native and cross-platform mobile experiences..."
- "Search, content, analytics, and conversion systems..."
- "Reliable hosting, deployment pipelines..."
- "Smart automations that connect tools..."
- "Connected CRM, support, and communication systems..."
- "Practical technical guidance..."
- "We don't just ship code..."
- "Our engineers, designers, and strategists work as a unified squad..."
- "We follow proven agile frameworks..."
- "We work on a typical matrix of time, effort, and money..."
- "Don't take our word for it..."
- "Ship beautiful frontends without the overhead..."

## Rewrite Strategy

### Voice Rules

Use a more human, specific company voice:

- Prefer concrete nouns over abstract nouns.
- Use shorter sentences mixed with occasional longer ones.
- Replace generic claims with actual working details.
- Avoid inflated words unless backed by proof: "world-class", "best", "unmatched", "enterprise-grade", "revolutionary".
- Avoid repeated stock phrases: "streamline workflows", "drive growth", "end-to-end", "scalable solutions", "seamless digital experiences".
- Use aibizmod's real process, real locations, real service constraints, and real examples.
- If a claim cannot be verified, soften it or remove it.

### Evidence Rules

Before rewriting final copy, collect:

- Real client industries served.
- Real project examples, even if anonymized.
- Real support hours and SLA terms.
- Real certifications, if "ISO Certified Process" is displayed.
- Real team size and countries served.
- Real testimonials, or remove quotes and use "example outcomes" instead.

## Priority 1: Homepage Rewrite

### 1. Hero Section

File: `src/components/sections/HeroSection.tsx`

Current risk:

- The tagline "Bridging Innovation And Connectivity" is clean visually but broad.
- The description is generic and was directly flagged.

Action:

- Keep the tagline if the brand wants it.
- Rewrite the description into a more specific promise.
- Mention actual services in a natural sentence, not a keyword list.

Acceptance criteria:

- Description does not use "empowering", "modern technology solutions", "streamline workflows", or "seamless digital experiences".
- Copy sounds like a real company explaining what happens after contact.

Example direction:

> We help teams turn rough product ideas, internal bottlenecks, and outdated systems into usable websites, apps, automations, and cloud setups.

### 2. What We Do Section

Files:

- `src/components/sections/ServicesGrid.tsx`
- `src/components/ui/glass-cards.tsx`

Current risk:

- Intro paragraph is highly generic.
- Service card descriptions overlap with services index copy.

Action:

- Rewrite intro as a practical service overview.
- Give each service a different angle:
  - Web: legacy rebuilds, SaaS MVPs, dashboards.
  - Mobile: booking, field teams, customer portals.
  - Marketing: technical SEO, tracking, landing pages.
  - Cloud: deployment, monitoring, backups.
  - Automation: handoffs, reporting, lead routing.
  - CX: CRM, support flows, customer history.
  - Consulting: architecture review, vendor decisions.

Acceptance criteria:

- Each card can stand alone without sounding like a template.
- No two cards start with the same sentence structure.

### 3. Why Choose Us

File: `src/components/sections/WhyChooseUs.tsx`

Current risk:

- "50+ Projects", "10+ Industries", "24/7 Support", and "ISO Certified Process" may trigger trust issues if unsupported.
- Descriptions sound like generic agency positioning.

Action:

- Verify stats.
- Replace "ISO Certified Process" unless there is a real certificate.
- Rewrite cards around working behaviors instead of claims.

Acceptance criteria:

- Every number can be defended.
- Each card answers "what does the client actually experience?"

### 4. Global Presence

File: `src/components/sections/GlobalPresence.tsx`

Current risk:

- "clients and partners around the world" and "every major market" are broad.

Action:

- If the locations are representative, label them as "sample delivery hubs" or "markets we support".
- If actual, add a sentence explaining what the locations represent.

Acceptance criteria:

- No unsupported global dominance claim.

### 5. How We Work

File: `src/components/sections/HowWeWork.tsx`

Current risk:

- "typical matrix of time, effort, and money" is awkward and AI-like.
- Process labels are generic.

Action:

- Rewrite the process as plain project steps.
- Add specific outputs for each phase: scope note, prototype, sprint build, QA checklist, launch plan.

Acceptance criteria:

- Reader understands what they receive at each step.

### 6. Testimonials

File: `src/components/sections/Testimonials.tsx`

Current risk: Critical.

- Names and companies look fictional unless real.
- AI/plagiarism tools frequently flag polished fake-sounding testimonials.

Action options:

1. Replace with verified testimonials and permission.
2. Convert to anonymized case snapshots.
3. Remove the section until real testimonials are available.

Acceptance criteria:

- No invented quotes.
- If anonymized, label clearly: "Anonymous client, logistics SaaS".

### 7. Homepage FAQ

File: `src/components/sections/FAQSection.tsx`

Current risk: Critical.

- The sentence "Ship beautiful frontends without the overhead..." appears unrelated to aibizmod and likely comes from a component demo.

Action:

- Replace immediately with brand-specific FAQ intro.
- Rewrite FAQ answers to match the full FAQ page but avoid copy-paste duplication.

Acceptance criteria:

- No UI-kit placeholder language remains.

## Priority 2: Services Index Rewrite

Files:

- `src/app/services/page.tsx`
- `src/data/services.ts`

Current risk:

- Service page hero uses generic "connected growth" and "practical business outcomes".
- Service descriptions repeat homepage card meanings.

Action:

- Make the hero more concrete.
- Rewrite `src/data/services.ts` descriptions as short, specific summaries.
- Keep capability bullets, but vary phrasing and remove generic keywords.

Acceptance criteria:

- Each service description uses a concrete use case.
- Services index copy does not duplicate homepage card copy.

Suggested structure per service:

- One sentence: problem the service solves.
- One sentence: what aibizmod builds or changes.
- One phrase: likely output.

## Priority 3: Service Detail Pages Rewrite

Files:

- `src/app/services/web-development/page.tsx`
- `src/app/services/mobile-app-development/page.tsx`
- `src/app/services/digital-marketing/page.tsx`
- `src/app/services/hosting-infrastructure/page.tsx`
- `src/app/services/automation/page.tsx`
- `src/app/services/customer-exp-management/page.tsx`
- `src/app/services/it-consulting-it-services/page.tsx`
- Shared layout: `src/components/ServicePageLayout.tsx`

Current risk:

- Long paragraphs are polished, symmetrical, and AI-like.
- Every page follows the same rhythm: broad promise, process, features, tech stack, FAQ.
- FAQs repeat common agency answers.

Action:

- Keep the layout.
- Rewrite data inside each service page.
- Add service-specific examples and constraints.
- Replace generic "we do X for scale" with concrete project scenarios.

Page-by-page rewrite direction:

### Web Development

Add:

- Example builds: booking platform, internal dashboard, SaaS admin panel, CRM-connected portal.
- Specific deliverables: repo setup, staging environment, QA checklist, analytics events.

Remove or reduce:

- "enterprise-grade", "millions of users", "uncompromising focus".

### Mobile App Development

Add:

- Real app types: customer self-service, field operations, booking, technician checklists.
- App Store readiness details: privacy labels, screenshots, crash reporting.

Remove or reduce:

- "apps your users love" and generic App Store performance claims.

### Digital Marketing

Add:

- Specific audit items: Search Console, GA4 events, page speed, landing page conversion paths.
- Campaign handoff details: tracking plan, keyword map, reporting cadence.

Remove or reduce:

- "data-driven campaigns", "qualified leads", "convert into revenue" unless tied to measurable context.

### Hosting and Infrastructure

Add:

- Backups, uptime alerts, deployment rollback, environment separation.
- Cloud choices explained in plain language.

Remove or reduce:

- Generic "secure, scalable, cost-efficient" without details.

### Automation

Add:

- Concrete workflows: invoice routing, lead assignment, weekly reports, CRM updates, customer notifications.
- Before/after manual step examples.

Remove or reduce:

- "AI-powered workflow orchestration" unless real AI tools are used.

### Customer Experience Management

Add:

- CRM cleanup, support inbox routing, customer history, feedback loops.
- Specific systems if true: HubSpot, Zoho, Salesforce, Intercom, WhatsApp.

Remove or reduce:

- "turn every interaction into loyalty".

### IT Consulting and IT Services

Add:

- Architecture review, vendor comparison, cloud bill review, security checklist, documentation.
- What a client receives after a consulting sprint.

Remove or reduce:

- "trusted technology partner" unless backed by examples.

Acceptance criteria:

- Each detail page contains at least 3 concrete project examples or deliverables.
- FAQs vary by service and do not reuse the same answer shape.
- No service page depends on broad agency language to explain value.

## Priority 4: FAQ Page Consolidation

Files:

- `src/app/faq/page.tsx`
- `src/components/sections/FAQSection.tsx`

Current risk:

- Standalone FAQ answers are clear but generic.
- Homepage FAQ overlaps with standalone FAQ.

Action:

- Treat homepage FAQ as a short preview with 4 to 5 concise answers.
- Treat `/faq` as the detailed page with 15 answers.
- Make the standalone answers more specific by adding practical details.

Acceptance criteria:

- Homepage FAQ and `/faq` do not reuse exact answer text.
- Each `/faq` answer includes one concrete detail, such as timeline, deliverable, contact method, or support behavior.

## Priority 5: About Page Trust Cleanup

File: `src/components/about/AboutPageContent.tsx`

Current risk:

- Timeline names and stats read like placeholder company history.
- Claims like "50+ engagements", "12 specialists", "3 countries" need verification.
- Values copy is polished but generic.

Action:

- Verify all facts with the business owner.
- Replace invented founder names and story details if not real.
- Rewrite values using specific behaviors.

Acceptance criteria:

- No fictional founder names, team numbers, or client history.
- Every stat is backed by a source or softened.

## Priority 6: Contact Page Light Rewrite

File: `src/components/contact/ContactPageContent.tsx`

Current risk:

- Low. Mostly functional.

Action:

- Keep form labels.
- Slightly humanize helper text.
- Ensure confirmation message does not overpromise reply time unless true.

Acceptance criteria:

- No unsupported "within 24 business hours" if not guaranteed.

## Priority 7: Metadata and SEO

Files:

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/services/page.tsx`
- `src/app/services/*/page.tsx`
- `src/app/about/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/faq/page.tsx`
- `src/app/blog/page.tsx`

Current risk:

- Metadata repeats broad phrases: "end-to-end technology services", "modern businesses", "cloud infrastructure", "automation".

Action:

- Write unique meta descriptions for each page.
- Keep under 155 characters.
- Use page-specific nouns.

Acceptance criteria:

- No two meta descriptions share more than one clause.
- Service meta descriptions mention one concrete output.

## Duplicate Content Rules

Apply these rules during rewrites:

1. Homepage service cards and services index cards must not share the same descriptions.
2. Services index descriptions and service detail hero taglines must not share the same sentence.
3. Homepage FAQ and `/faq` must not reuse the same answer copy.
4. Metadata descriptions must be unique per page.
5. Testimonials must be verified or removed.
6. Repeated CTAs are allowed, but body copy around them should vary.

## Suggested Implementation Order

### Phase 1: Immediate Cleanup

Files:

- `src/components/sections/FAQSection.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/ServicesGrid.tsx`
- `src/components/ui/glass-cards.tsx`
- `src/components/sections/Testimonials.tsx`

Tasks:

- Remove placeholder FAQ sentence.
- Rewrite homepage hero paragraph.
- Rewrite What We Do intro.
- Rewrite service card descriptions.
- Replace or remove unverified testimonials.

### Phase 2: Service Copy Rewrite

Files:

- `src/data/services.ts`
- `src/app/services/page.tsx`
- `src/app/services/*/page.tsx`

Tasks:

- Rewrite service summaries.
- Rewrite all service detail overview paragraphs.
- Make FAQs service-specific.

### Phase 3: Trust and Proof

Files:

- `src/components/about/AboutPageContent.tsx`
- `src/components/sections/WhyChooseUs.tsx`
- `src/components/sections/GlobalPresence.tsx`

Tasks:

- Verify stats.
- Replace unsupported claims.
- Add real proof points.

### Phase 4: SEO and QA

Files:

- All `metadata` exports.
- `src/app/layout.tsx`.

Tasks:

- Rewrite metadata.
- Run plagiarism and AI checks again.
- Run `npm run lint`.
- Run `npm run build` with no `next dev` process running.

## Review Checklist

Before publishing:

- [ ] No UI-kit placeholder text remains.
- [ ] No fake testimonials remain.
- [ ] All stats are verified.
- [ ] Homepage and services page do not repeat service descriptions.
- [ ] Each service page has concrete examples.
- [ ] FAQ page answers are not duplicated from homepage FAQ.
- [ ] Metadata is unique per page.
- [ ] Quillbot or similar AI score is lower, but final decision is based on human quality.
- [ ] Duplichecker plagiarism report is rerun after rewrites.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Notes for the Writer

Use this simple rewrite pattern:

1. Name the real client situation.
2. Name the work aibizmod performs.
3. Name the output the client receives.
4. Avoid grand claims unless backed by proof.

Example:

Instead of:

> We provide modern technology solutions that streamline workflows and drive growth.

Use:

> If your sales team is copying leads between forms, spreadsheets, and a CRM, we can map the handoff, connect the tools, and leave you with a workflow your team can actually maintain.

