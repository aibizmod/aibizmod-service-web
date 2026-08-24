# Competitor Gap Analysis: AI Visibility Space

**Date**: 2026-07-31
**Scope**: aibizmod vs. 5 AI-visibility competitors (LLMClicks, AIclicks, Peec, Profound, Otterly)
**Method**: Public site capture + docs + review-site mining (G2, SoftwareSuggest, Comparateur-IA, Crozdesk)

---

## 1. Competitor Profiles

### LLMClicks.ai — AI Visibility Tracker & Audit
- **Positioning**: First AI visibility tracker built for SEO agencies. "Track, audit, and improve how ChatGPT, Perplexity, Gemini, and Claude represent your brand."
- **Pricing**: Starter $49/mo (500 queries, 20 audits), Pro $99/mo (2,000 queries, 50 audits, 1 seat), Agency $199/mo (6,000 queries, 100 audits, white-label). 14-day free trial + lifetime deal. Overages $20/1,000 queries.
- **Features**: 120-point AI visibility audit, citation trust/accuracy analysis, content attribution, competitor gap analysis, query fan-out (10–20 variations), AI Query Mapper (GSC integration), industry benchmarks, per-model scores (ChatGPT/Perplexity/Gemini/Copilot/Claude), sentiment + hallucination detection, drop alerts, on-page optimiser, LLM traffic tracker (AI referrals → conversions → ROI).
- **Free tools**: AI Visibility Checker, AI Readiness Analyzer, AI Domain Profiler.
- **Proof/marketing**: G2 5.0 (AEO category), SoftwareSuggest 5.0, Product Hunt badge, webinars ("How to Check If Your Brand Is Invisible in AI Search"), blog, docs, active socials (LinkedIn/X/FB/IG/YT).
- **Weaknesses (from reviews)**: Gemini/Copilot coverage thin; free domain profiler shallow.

### AIclicks (app.aiclicks.io) — GEO/AEO Analytics Platform
- **Positioning**: Metrics-first AI search analytics. Docs-driven, developer-friendly.
- **Metrics**: Visibility, Share of Voice, Position, Citations (frequency).
- **Features**: Prompts (create/discover/fanouts), query fan-out, Sources (map domains AI relies on), Competitors (add/track), Recommendations (create content / get mentioned / engage), Sentiment analysis, Content agent.
- **Integrations**: CMS integrations, Google Analytics; API docs + MCP docs; help center; support email.
- **Weaknesses**: App-focused (login required), heavy docs posture, less marketing surface.

### Peec AI — AI Search Analytics for Marketing Teams
- **Positioning**: Prompt + source analytics with PR angle (G2, LinkedIn, Reddit, NYT recommendations).
- **Features**: Tagged prompts, country-level tracking, brand benchmarking, per-model tracking, source tracking with PR recommendations, strategy recommendations.
- **Proof**: 3,000+ brands/agencies, demo + free trial, agency directory, careers page.

### Profound (tryprofound.com) — Marketing Agents + Answer Engine Insights
- **Positioning**: Agents + insights across Perplexity, ChatGPT, Claude, Gemini, Grok, Copilot, Meta AI, DeepSeek, Google AI Overviews.
- **Features**: Prompt Volumes, Shopping, Agent Analytics, agents (create/aim/operate), AEO Report (free), Profound Index (industry benchmark), research hub, agent templates, integrations, Marketing Engineer jobs/university.
- **Proof**: Webinars, blog, team solution pages (AEO/content/PR & brand), agency/partner program, help center + dev docs, pricing + demo.

### Otterly.ai — AI Search Monitoring Tool
- **Positioning**: "Prompt Research, AI Search Analytics, AI Search Optimization." G2 4.8/5, Gartner "Cool Vendor."
- **Features**: Prompt Research, AI Search Analytics, AI Search Optimization; MCP server, API, marketplace.
- **Proof**: Case studies, agency + tech partner programs, ambassadors, free GEO tools + "Optimize for AI Search" guide, pricing + free trial, blog, help center.

---

## 2. Our Current Inventory (aibizmod)

**Have**:
- Full-service agency: 8 service families, ~55 subservice pages (incl. Search Marketing with AI-first copy, AI Visibility Audit service page)
- Free tools: AI Visibility Audit Report (interactive generator), Automation ROI Calculator, AI Readiness Score — `/tools` hub, no signup
- `/ai-visibility-audit-report` interactive report builder
- Blog: 18 posts (6 dedicated AI-SEO/AEO/GEO articles with FAQ schema)
- Topic hub: GEO for service businesses + comparison table (SEO vs AEO vs GEO) + 6 supporting assets
- `/comparisons` (4 comparison pages), `/faq`, `/clients`, `/llms.txt`, serverless GEO audit API (`/api/geo-audit`)
- GSC verified (`googlebb38c1ac4aaad0c2.html`)

**Lack**:
- Live visibility score / benchmark dashboard — ✅ DONE (0b8e246): hosted `/audit/[reportId]` pages + `/admin/audits`
- Public benchmark data / "index" (Profound Index, LLMClicks industry benchmarks)
- Case studies / client proof beyond a clients list
- Pricing transparency (competitors all show pricing; we show none)
- Prompt library or query fan-out demo (interactive)
- Agency/partner/white-label program page
- G2 listing (AEO category — competition is thin), Product Hunt launches
- Newsletter / lead magnet funnel
- Docs/methodology hub (LLMClicks docs, AIclicks docs, Otterly help center)
- No comparison pages vs these tools (huge missed keyword surface: "llmclicks alternative", "otterly alternative", "ai visibility tracking")

---

## 3. Gap Prioritization

### Tier 1 — Quick wins, high leverage (1–3 days each)
| # | Item | Why | Effort |
|---|------|-----|--------|
| 1 | 5 competitor comparison pages (`/comparisons/...`) — singular "alternative" format | Capture "llmclicks alternative", "otterly alternative", "peec alternative", "profound alternative", "aiclicks alternative" — these tools are new, low-competition keywords; we're a services firm so "build vs buy" framing fits our position | Medium |
| 2 | Add free "AI Readiness Checker"-style interactive tool or upgrade AI Visibility Audit Report with a live score + benchmark snapshot | Competitors all gate scores behind login; our no-signup tools are a differentiator — promote harder | Medium |
| 3 | Publish industry benchmark post ("How often do service businesses appear in AI answers") using our own audit data (aggregated, anonymized) | Only Profound has public benchmarks; first-mover content that AI engines will cite | Low-Med |
| 4 | Add pricing/engagement packages section to AI Visibility Audit + AI SEO service pages | Every competitor shows pricing; removes eval friction | Low |
| 5 | Case study pages (3): AI visibility audit for a client, GEO content program, llms.txt/AI-citation fix | Competitors have case studies; we have clients we can profile | Medium |
| 6 | Claim G2 AEO category listing + Product Hunt launch for the free report tool | LLMClicks has 2 reviews; Otterly 4.8 — category is wide open | Low (external) |

### Tier 2 — Build moat (content + architecture)
| # | Item | Why |
|---|------|-----|
| 7 | Methodology/docs hub ("How we audit AI visibility" — mirrors AIclicks docs) | Builds trust, feeds llms.txt, gives AI engines citable process content |
| 8 | Agency/partner program page (we're the agency; invite other agencies for white-label audits) | Direct counter to Otterly/Profound partner programs; our white-label = actual service |
| 9 | Prompt library page (50+ AI visibility prompts, tagged) | Peec/Profound/AIclicks all have prompt surfaces; we can publish as free content |
| 10 | Newsletter capture on free tools (lead magnet: "AI Visibility Snapshot" report) | Every competitor has newsletter; free tools are our top-of-funnel |

### Tier 3 — Later
| # | Item | Why |
|---|------|-----|
| 11 | Live dashboard product (hosted score for clients, admin-tracked) | Real product build; aligns with admin infrastructure already present — ✅ DONE (0b8e246) |
| 12 | Shopping/agent analytics-style content (GEO for commerce) | Profound differentiator; content only, no product |
| 13 | Webinar/video series ("Is your brand invisible in AI search?") | LLMClicks/Otterly run these; earns links |

---

## 4. Recommended Execution Order (next sessions)

1. **Comparison pages** (Tier 1 #1) — highest keyword surface, uses existing `/comparisons` architecture — ✅ DONE (commit 69e28b9): 5 pages (`llmclicks-alternative`, `otterly-alternative`, `peec-alternative`, `profound-alternative`, `aiclicks-alternative`), honest build-vs-buy framing with real pricing data
2. **Benchmark content post** (Tier 1 #3) — citable, AI-engine bait — ✅ DONE: `/blog/ai-visibility-benchmarks-service-businesses` (five metrics, 5-step build guide, no fabricated stats; cites Gartner 25% forecast)
3. **Case studies** (Tier 1 #5) — ✅ ALREADY EXISTS at `/clients` (SpaceLean + others with SEO/GEO impact data) — no new page needed
4. **Pricing sections** (Tier 1 #4) — ✅ DONE: engagement packages on AI Visibility Audit (£1,450/£3,900/£950mo) + Search Marketing (£1,850/£3,400/£5,900mo) via new `pricing` field in SubservicePageLayout
5. **Prompt library** (Tier 2 #9) — ✅ DONE: `/ai-visibility-prompts` — 54 prompts, 6 categories, copy-to-clipboard, tags
6. **Methodology hub** (Tier 2 #7) — ✅ DONE: `/how-we-audit-ai-visibility` — 5 metrics, 5-step process, scoring rubric, FAQ; linked from llms.txt, tools page, topic hub, service pages
7. **Live dashboard product** (Tier 3 #11) — ✅ DONE (commit 0b8e246): hosted `/audit/[reportId]` pages (localStorage cache + server-side lookup via `aibizmodAuditReports`), hosted-link banner on the report tool, new `/admin/audits` global panel (filter by domain/band/user type, pagination, per-report links), "View hosted report" in per-user audit tabs

**Still open (next sessions)**:
- G2 AEO category listing + Product Hunt launch (external, user action)
- Newsletter capture on free tools (Tier 2 #10)
- Shopping/agent analytics content (Tier 3 #12)
- Webinar/video series (Tier 3 #13)

---

## 5. Open Questions for User
- Do we have permission/profileable client wins for case studies?
- Is there real audit data (our own site audits) that can seed the benchmark post without fabricating numbers?
- Do we want pricing visible on the site (current model = no pricing)?
- Which competitor to write the first comparison page for (recommend: LLMClicks — most searched, strongest positioned)?
