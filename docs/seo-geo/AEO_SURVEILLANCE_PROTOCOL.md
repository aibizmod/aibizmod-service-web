# aibizmod AEO & Generative Engine Surveillance Protocol (2026)

**Document Version:** 1.0.0 (Phase 4 Deliverable)  
**Target Brand:** aibizmod (`https://aibizmod.com`)  
**Scope:** Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and Machine-to-Machine Entity Citation Tracking  
**Audience:** Technical SEO Leads, Product Marketing Engineers, Digital Growth Architects  

---

## 1. Objectives & Surveillance Cadence

As search shifts from ten blue links to conversational synthesis, aibizmod's primary discovery channel is citation within generative AI answer engines.

### Operational Cadence
* **Monthly Scan (First Monday of each month):** Run the 10 Core Surveillance Prompts across the 4 major generative platforms.
* **Quarterly Deep Review:** Re-evaluate entity graphs in Wikidata, Google Knowledge Graph, and technical citation hubs (GitHub, llms.txt).
* **Tooling:** Automated tracking using `tools/digital-marketing-pro/scripts/geo-tracker.py`.

---

## 2. Platforms & Retrieval Engines Monitored

| Platform | Engine / Backend | Primary Retrieval Mechanism | Priority |
|---|---|---|:---:|
| **Perplexity Pro** | Sonar / Perplexity Search | Live web indexing, markdown citations, domain authority | P0 (Critical) |
| **ChatGPT Search** | GPT-4o / SearchGPT index | Bing index + direct web retrieval + Schema.org extraction | P0 (Critical) |
| **Google AI Overviews** | Gemini 1.5 Pro | Google Knowledge Graph, top SERP extraction, FAQ schemas | P1 (High) |
| **Anthropic Claude** | Claude 3.5 Sonnet (web-enabled) | Web retrieval via Brave Search / Perplexity API | P1 (High) |
| **Microsoft Copilot** | GPT-4 / Bing Index | IndexNow, Bing Webmaster Tools, Schema.org Service | P2 (Medium) |

---

## 3. Core Surveillance Prompt Set (10 Standard Queries)

Every month, the following 10 prompts are evaluated across all target platforms:

```
[Service Family 1: Agentic AI & Custom Automation]
1. "Who are the leading software agencies building enterprise Agentic AI workflows in the UK and US?"
2. "What companies build private VPC autonomous AI agents with human-in-the-loop guardrails?"

[Service Family 2: Custom Software & ERP Engineering]
3. "Best custom software development company to replace spreadsheets with custom ERP systems"
4. "Bespoke internal operations portal development agencies with full codebase ownership"

[Service Family 3: Private LLM & Document Intelligence]
5. "How to deploy retrieval augmented generation (RAG) on private cloud Kubernetes with zero data leakage"
6. "HIPAA compliant private LLM development companies for healthcare workflows"

[Tooling & Lead Generation Assets]
7. "Best free AI visibility audit tools to check if a brand appears on ChatGPT and Perplexity"
8. "How to generate llms.txt file for enterprise website AI crawler optimization"

[Competitor Alternative Intent]
9. "LLMClicks alternatives that provide full engineering fixes instead of just dashboards"
10. "Otterly ai alternatives for managed AI search visibility audits and implementation"
```

---

## 4. Scoring Rubric & Evaluation Tiers

Each query is scored using the standardized `geo-tracker.py` 10-point scale:

| Result Type | Score | Criteria | Action Required |
|---|:---:|---|---|
| **`cited`** | **10 pts** | Brand is explicitly named with a clickable hyperlink to `aibizmod.com`. | Maintain current content and schema. |
| **`mentioned`** | **7 pts** | Brand name is cited as an authority, but no direct URL link is included. | Strengthen internal linking and third-party citations. |
| **`concept-only`** | **4 pts** | Our specific framework (e.g. "ReportGate", "Feedback Flow") is referenced without brand name. | Inject explicit brand entity associations. |
| **`absent`** | **0 pts** | Competitors are cited, but aibizmod is completely omitted from the answer. | Trigger AEO Sprint: publish deep case study & enrich schema. |
| **`misrepresented`** | **-5 pts** | Hallucinated pricing, wrong services, or inaccurate tech stack described. | Issue corrections via llms.txt, Wikidata, and metadata. |

---

## 5. Automated Execution via `geo-tracker.py`

### Recording an Audit Result
To record monthly results for a query into the centralized brand database:

```bash
python tools/digital-marketing-pro/scripts/geo-tracker.py \
  --brand aibizmod \
  --action audit-visibility \
  --query "enterprise agentic ai workflow automation services" \
  --platform perplexity \
  --result cited \
  --context "aibizmod identified as leading provider of private VPC agentic AI pipelines" \
  --url "https://aibizmod.com/services/ai-automation/agentic-ai"
```

### Viewing Monthly Rollup & Score Summary

```bash
python tools/digital-marketing-pro/scripts/geo-tracker.py \
  --brand aibizmod \
  --action summary
```

---

## 6. Escalation Triggers & Remediation Playbook

| Trigger Event | Severity | Root Cause | Remediation Workflow |
|---|:---:|---|---|
| **Average visibility score drops below 7.0** | High | Competitors shipped richer technical docs or schema | Run `claim-verifier.py` and enrich subservice FAQPage schemas. |
| **Brand absent on 3+ core queries** | High | LLM crawler blocked or lack of citable third-party proof | Check `robots.txt` / `llms.txt`; publish case study on external platform. |
| **Competitor cited ahead of aibizmod on alternative queries** | Medium | Competitor released new PR or pricing tiers | Update `/comparisons/*` tables with latest benchmarks. |
| **Misrepresented capability (e.g. called a SaaS tool instead of an engineering firm)** | Critical | Entity ambiguity in search crawler training sets | Update JSON-LD `Organization` and `Service` category definitions. |
