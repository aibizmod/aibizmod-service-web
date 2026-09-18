# aibizmod Competitor Monitoring & Market Surveillance Protocol (2026)

**Document Version:** 1.0.0 (Phase 4 Deliverable)  
**Target Brand:** aibizmod (`https://aibizmod.com`)  
**Scope:** SaaS AI Visibility Trackers, AEO Platforms, and Enterprise AI Agencies  
**Classification:** Internal Operational Protocol & Market Intelligence Standard  

---

## 1. Objectives & Surveillance Cadence

To maintain aibizmod's winning position as the **"Done-For-You Engineering & Production Architecture"** alternative in an increasingly crowded SaaS visibility category, we enforce a structured market surveillance process.

### Operational Cadence
* **Monthly Pulse Check:** Automated review of competitor public pricing pages, changelogs, and social announcements.
* **Quarterly Deep Audit (End of Q1, Q2, Q3, Q4):** Full feature gap matrix re-verification, G2 sentiment analysis, and `src/data/comparisons.ts` code synchronization.
* **Ad-Hoc Event Triggers:** Emergency reviews triggered by competitor funding rounds, acquisitions, or dramatic pricing shifts.

---

## 2. Competitor Tiering & Surveillance Matrix

### Tier 1: Core SaaS Competitors (Direct Comparison Pages Live on Site)
These 5 platforms have dedicated landing pages under `/comparisons/*`. Every price or packaging change must be mirrored in our comparison tables within 7 business days.

| Competitor | URL | Monitored Vectors | Current 2026 Baseline |
|---|---|---|---|
| **LLMClicks.ai** | `llmclicks.ai/pricing` | Subscription tiers ($49–$199/mo), Lifetime Deal (LTD) campaigns ($159–$499), 120-point audit claims | High LTD pressure; thin Gemini/Copilot data |
| **Otterly.ai** | `otterly.ai` | Lite ($29), Standard ($189), Premium ($489), Claude/Gemini add-ons ($9–$439), MCP tools | Low entry barrier ($29) with steep upgrade cliff |
| **Peec AI** | `peec.ai` | Starter (~$89), Pro ($199), Agency tiers ($245–$795), Looker Studio integrations | Pure analytics; no code or content implementation |
| **Profound** | `tryprofound.com` | Starter ($99), Growth ($399), Enterprise ($2K–$5K+), Profound Index releases | Deep prompt panel (1.5B+); heavy enterprise sales gate |
| **AIclicks** | `aiclicks.io` | App portal pricing, developer API rates, MCP integrations, agency partner directory | Developer-focused; dual SaaS and agency model |

---

### Tier 2: Rising Entrants & Category Thickening Watchlist
Monitored for search volume inflection. If monthly search volume for `[competitor] alternative` exceeds 500 searches/month, create a dedicated `/comparisons/[competitor]-alternative` landing page.

| Emerging Entrant | Estimated Pricing | Core Angle / Feature | Threat Level |
|---|---|---|:---:|
| **Rankability** | ~$99/mo | Workflow agents for agencies (Serena copywriter/researcher) | Medium |
| **AthenaHQ** | ~$295/mo | YC-backed, ex-DeepMind team, competitive monitoring | Medium |
| **ZipTie** | ~$59–$69/mo | AI Overviews & Perplexity screenshot tracking | Low |
| **OpenLens** | Free tier + Paid | Built for agencies, 7 engines, free competitive compare | Medium |
| **LLMrefs** | ~$79/mo | Low-cost tracking for solo founders and early startups | Low |
| **HubSpot AEO Grader** | Free | Free instant brand grader across 3 AI engines | High (Top-of-Funnel pressure) |

---

## 3. Monitored Data Vectors & Audit Checklist

During every quarterly surveillance audit, the lead technical analyst inspects the following four vectors:

### Vector 1: Pricing & Unit Economics
- [ ] Has the entry monthly price changed?
- [ ] Have prompt limits or query limits been decreased or moved behind higher tiers?
- [ ] Are key AI engines (Claude, Gemini, Grok) now treated as paid add-ons rather than base features?
- [ ] Are lifetime deals (LTDs) or aggressive annual discounting being offered (indicating valuation or churn pressure)?

### Vector 2: Feature & Implementation Scope
- [ ] Has the competitor launched code-level auto-fixes or remains dashboard-only?
- [ ] Have they introduced MCP (Model Context Protocol) servers or developer APIs?
- [ ] Have they launched CMS integrations (WordPress, Webflow, Shopify)?

### Vector 3: Market Sentiment & Customer Friction
- [ ] Review G2, Trustpilot, Product Hunt, and Reddit (`r/SEO`, `r/ArtificialIntelligence`) for negative sentiment.
- [ ] Common recurring complaints to document:
  - *Data freshness lag (weekly vs. daily updates)*
  - *High per-query overage fees*
  - *Lack of actionable technical guidance ("dashboard told us we are missing, but not how to fix it")*

### Vector 4: Regulatory & Compliance Alignment
- [ ] Do they offer SOC 2 Type II, HIPAA BAA, or private cloud VPC options?
- [ ] Do they support EU AI Act Article 50 C2PA provenance or deepfake disclosures?

---

## 4. Codebase Update Workflow (When Changes Occur)

When a competitor shifts pricing or features:

```
Competitor changes pricing / features
             │
             ▼
1. Verify change via live screenshot & pricing page archive
             │
             ▼
2. Update src/data/comparisons.ts (table rows, cost model, & FAQs)
             │
             ▼
3. Update docs/competitors/COMPETITOR_INTELLIGENCE_2026.md
             │
             ▼
4. Run npx tsc --noEmit (ensure type safety)
             │
             ▼
5. Deploy updated comparison page to production within 7 business days
```

---

## 5. Ongoing Positioning Mandate

Regardless of competitor feature velocity, aibizmod maintains one unyielding positioning differentiator:

> **"Trackers tell you where you are missing; aibizmod engineers the production systems that get you cited."**

Competitors are constrained by the SaaS business model: they sell subscriptions to dashboards and cannot refactor a client's Next.js templates, repair SQL database schemas, or deploy private Kubernetes clusters. aibizmod embraces full-stack engineering delivery, making software tools our top-of-funnel lead generators rather than our primary monetization engine.
