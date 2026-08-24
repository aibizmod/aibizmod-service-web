# GEO Measurement Baseline

**Date:** 2026-07-01  
**Source:** GEO_ACTION_PLAN.md — Measurement Plan section  
**Purpose:** Establish a repeatable process for tracking aibizmod.com visibility in AI-powered search engines.

---

## 30-Prompt Benchmark Set

### Brand Intent (5 prompts)

| # | Prompt | Target URL |
|---|---|---|
| 1 | "aibizmod" | aibizmod.com |
| 2 | "aibizmod services" | /services |
| 3 | "aibizmod AI automation" | /services/ai-automation |
| 4 | "aibizmod contact" | /contact |
| 5 | "aibizmod reviews" | /about |

### Category/Service Intent (8 prompts)

| # | Prompt | Target URL |
|---|---|---|
| 6 | "AI automation services UK" | /services/ai-automation |
| 7 | "custom software development company UK" | /services/software-development |
| 8 | "web development agency UK" | /services/web-development |
| 9 | "mobile app development UK" | /services/mobile-app-development |
| 10 | "cloud hosting services UK" | /services/hosting-infrastructure |
| 11 | "digital marketing agency UK" | /services/digital-marketing |
| 12 | "IT consulting services UK" | /services/it-consulting-it-services |
| 13 | "CRM implementation services UK" | /services/customer-experience-management |

### Comparison Intent (5 prompts)

| # | Prompt | Target URL |
|---|---|---|
| 14 | "custom software vs SaaS which is better" | /comparisons/custom-software-vs-saas |
| 15 | "native vs cross-platform app development" | /comparisons/native-vs-cross-platform-apps |
| 16 | "Zapier vs custom automation" | /comparisons/automation-platform-vs-custom-workflow |
| 17 | "website redesign vs incremental improvements" | /comparisons/redesign-vs-improve-existing-website |
| 18 | "build vs buy automation software" | /comparisons/automation-platform-vs-custom-workflow |

### Problem/Question Intent (7 prompts)

| # | Prompt | Target URL |
|---|---|---|
| 19 | "how to automate business processes" | /services/ai-automation/process-automation |
| 20 | "what is generative engine optimization" | /blog/what-is-generative-engine-optimization-geo |
| 21 | "how much does custom software cost UK" | /services/software-development |
| 22 | "best project management tools for developers" | /blog/best-project-management-tools-software-development-teams-2026 |
| 23 | "cloud project management software vs on-premise" | /blog/cloud-based-project-management-software-build-vs-buy |
| 24 | "how to choose a web development agency" | /services/web-development |
| 25 | "automation ROI calculator" | /automation-roi-calculator |

### Local/Service-Area Intent (5 prompts)

| # | Prompt | Target URL |
|---|---|---|
| 26 | "software development company London" | /services/software-development |
| 27 | "AI automation services India" | /services/ai-automation |
| 28 | "IT consulting company UK" | /services/it-consulting-it-services |
| 29 | "mobile app developer UK" | /services/mobile-app-development |
| 30 | "web developer London" | /services/web-development |

---

## Scorecard Template

Use this template for each monthly measurement. Test each prompt in:
- ChatGPT (GPT-4 / GPT-4o)
- Perplexity
- Google AI Overviews
- Gemini
- Claude

| Field | Value |
|---|---|
| **Prompt #** | |
| **Prompt text** | |
| **Engine** | |
| **Test date** | |
| **Brand mentioned?** | Yes / No |
| **URL cited?** | Yes / No |
| **Cited URL** | |
| **Position in results** | 1 / 2 / 3 / Not cited |
| **Competitors mentioned** | |
| **Answer accurate?** | Yes / Partial / No |
| **Observation notes** | |

---

## Analytics Setup

### AI Referrer Channel Grouping

Create a channel grouping in GA4 for known AI referral sources:

| Source | Domain | Filter |
|---|---|---|
| ChatGPT | chatgpt.com | `session_source = "chatgpt.com"` |
| Perplexity | perplexity.ai | `session_source = "perplexity.ai"` |
| Claude | claude.ai | `session_source = "claude.ai"` |
| Gemini | gemini.google.com | `session_source = "gemini.google.com"` |
| Copilot | copilot.microsoft.com | `session_source = "copilot.microsoft.com"` |
| Meta AI | meta.ai | `session_source = "meta.ai"` |

### Annotation Schedule

Annotate in GA4 whenever GEO-related changes are deployed:

| Date | Change Tag | Description |
|---|---|---|
| 2026-07-01 | GEO-v1 | FAQ server render, sitemap/lmms.txt expansion, answer summaries, comparison pages, topic hubs, ROI calculator |

---

## Monthly Process

1. **Day 1-3:** Run all 30 prompts in each target engine using a logged-out session with a consistent location (UK-based VPN or browser location).
2. **Day 3-5:** Record observations in the scorecard template for each prompt-engine combination (30 × 5 = 150 observations).
3. **Day 5-7:** Compile results into a summary report:
   - Total citations found (30-prompt baseline)
   - Citation rate by intent category (brand, category, comparison, problem, local)
   - Most-cited URLs
   - Top cited competitors
   - Changes from previous month
4. **Day 7:** Update the GA4 annotation with the measurement tag.

---

## 90-Day Targets

| Metric | Target |
|---|---|
| Canonical pages in sitemap | 100% (101/101 — met) |
| Service pages with visible FAQs + schema | 100% (met) |
| Service pages with answer summaries | 100% (61/61 — met) |
| Verifiable case studies published | 0/3 (not started) |
| Named expert/author profiles | 1/3 (partial) |
| Pages cited in 30-query benchmark | ≥20% by day 90 |
| Month-over-month non-brand impression growth | Positive |
| Month-over-month AI referral session growth | Positive |

---

## Files Referenced

| File | Purpose |
|---|---|
| `GEO-Implementation-Status-Report.md` | Full change log of all GEO work completed |
| `GEO_ACTION_PLAN.md` | Original GEO strategy document |
| `GEO-Implementation-Tasks.md` | Task breakdown with priorities |
