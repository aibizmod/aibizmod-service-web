# Competitor Keywords Action Plan - aibizmod

Generated: 2026-07-31  
Source directory: `competitors-keywords/`  
Primary skills used: `competitors`, `ai-seo`, `content-strategy`, `programmatic-seo`, `seo`

## Executive Summary

The competitor keyword exports contain a large AI-search and SEO opportunity, but the raw list should not be copied directly into page metadata.

Key findings:

- 5 CSV files were reviewed from `competitors-keywords/`.
- 1,749 total keyword rows were exported.
- 1,401 unique keywords remain after deduplication.
- 306 keywords repeat across files.
- Only 11 keywords are marked `In account? = Y`.
- 0 keywords are marked `In plan? = Y`.
- Most currently included account keywords are broad AI-tool terms like `tools ai`, `best ai tools`, `ai platform`, and `ai company`.

The strongest buyer-intent gap is not generic AI tools. It is the cluster around:

- `seo services`
- `search engine optimization services`
- `seo optimisation services`
- `ai seo services`
- `ai seo tools`
- `ai optimization`
- `ai ranking`
- `geo seo`
- `geo agency`
- `ai monitoring tools`

The site already has relevant landing pages:

- `src/app/services/digital-marketing/search-marketing/page.tsx`
- `src/app/services/ai-automation/ai-visibility-audit/page.tsx`
- `src/app/services/digital-marketing/page.tsx`
- `src/app/topics` and the GEO blog/topic content

The action is to map these keywords into existing pages first, then create a small number of high-quality AI SEO and competitor/comparison pages. Do not generate hundreds of thin pages from the export.

## Data Summary

| Metric | Result |
|---|---:|
| CSV files | 5 |
| Total rows | 1,749 |
| Unique keywords | 1,401 |
| Duplicate keyword groups | 306 |
| Keywords already in account | 11 |
| Keywords already in plan | 0 |
| Low competition keywords | 876 |
| Medium competition keywords | 422 |
| High competition keywords | 48 |
| Unknown competition keywords | 55 |

Volume distribution:

| Avg. monthly searches | Unique keyword count |
|---:|---:|
| 500,000 | 6 |
| 50,000 | 53 |
| 5,000 | 158 |
| 500 | 347 |
| 50 | 836 |

## Cluster Read

| Cluster | Unique keyword count | Approx. aggregate volume | Action |
|---|---:|---:|---|
| Generic AI tools | 203 | 1,027,600 | Mostly reject for service pages. Use only for one curated awareness article if needed. |
| Brand / competitor terms | 100 | 1,156,550 | Use selectively for comparison content, not homepage/service metadata. |
| AI search / search engine | 31 | 680,150 | Use for AI visibility and educational content. |
| SEO tools / software | 79 | 170,000 | Use for comparison and "tools vs services" content. |
| SEO services / agency | 26 | 124,150 | Highest direct commercial fit. Add to search marketing page. |
| AI marketing | 128 | 76,150 | Use for digital marketing and automation content. |
| AI SEO / AEO / GEO | 77 | 69,550 | Highest strategic gap. Add to AI visibility and SEO/GEO content. |

## Add These Keywords First

These are the highest-priority terms to add to the active keyword plan because they combine relevance, commercial intent, and low competition.

| Priority | Keyword | Volume | Trend | Competition | Target |
|---|---|---:|---|---|---|
| P0 | seo services | 50,000 | +900% YoY | Low | Search Marketing service page |
| P0 | search engine optimization services | 50,000 | +900% YoY | Low | Search Marketing service page |
| P0 | seo optimisation services | 5,000 | +9,900% YoY | Low | Search Marketing service page |
| P0 | ai seo services | 5,000 | +900% YoY | Low | Search Marketing + AI Visibility pages |
| P0 | search engine optimization agency | 5,000 | Stable | Low | Search Marketing service page |
| P0 | seo optimization agency | 5,000 | Stable | Low | Search Marketing service page |
| P0 | ai optimization | 5,000 | +900% 3-month | Low | AI Visibility service page |
| P0 | ai optimisation | 5,000 | +900% 3-month | Low | AI Visibility service page |
| P0 | ai ranking | 5,000 | +900% YoY | Low | AI Visibility service page |
| P0 | geo seo | 5,000 | Stable | Low | SEO/GEO service page and topic hub |
| P1 | ai seo tools | 5,000 | +900% YoY | Low | Comparison/tool article |
| P1 | ai seo tool | 5,000 | +900% YoY | Low | Comparison/tool article |
| P1 | google ai search | 5,000 | Stable | Low | Educational AI search article |
| P1 | ai search engine | 5,000 | Stable | Low | Educational AI search article |
| P1 | perplexity ai search engine | 5,000 | +900% YoY | Low | Educational AI search article |
| P1 | ai marketing tools | 5,000 | Stable | Low | AI marketing tools article |
| P1 | ai tools for marketing | 5,000 | Stable | Low | AI marketing tools article |
| P1 | geo agency | 500 | +900% YoY | Low | GEO agency section / FAQ |
| P1 | seo aeo | 500 | +900% YoY | Low | GEO/AEO explainer section |
| P1 | ai seo agency | 500 | Stable | Low | Search Marketing service page FAQ |
| P1 | ai monitoring tools | 500 | +900% YoY | Low | AI visibility monitoring article |
| P1 | best ai tools for seo | 500 | +900% YoY | Low | AI SEO tools article |
| P1 | best ai seo tools | 500 | Stable | Low | AI SEO tools article |
| P1 | ai driven digital marketing | 500 | +900% YoY | Low | Digital Marketing service page |
| P2 | ai marketing automation | 500 | Stable | Low | Digital Marketing or AI Automation content |

## Do Not Add These As Core Keywords

These terms have volume, but they are too broad, navigational, or poorly aligned with aibizmod's lead-generation intent.

| Keyword pattern | Why not core |
|---|---|
| `ai tool`, `tools ai`, `artificial intelligence tool` | Too broad and likely tool-directory intent. Poor fit for service pages. |
| `free ai`, `free ai tools`, `ai tools free` | Free-tool seeker intent. Low service conversion. |
| `best ai`, `best artificial intelligence` | Extremely broad and not a realistic ranking target for a services site. |
| `google's ai`, `perplexity ai`, `chatgpt ai tool` | Mostly brand/navigational. Use only in educational or comparison content. |
| `semrush login`, `semrush trial`, `semrush price` | Navigational competitor intent. Avoid unless writing a fair comparison article. |
| `ranked ai` | Ambiguous. Could be a brand or phrase mismatch. Validate before targeting. |
| `seo agent` | Could mean "SEO agency" or AI agent. Use only as a secondary term after checking SERP intent. |

## Page Mapping

### 1. Search Marketing Service Page

File: `src/app/services/digital-marketing/search-marketing/page.tsx`

Current page target:

- SEO & GEO services
- search marketing
- technical SEO
- local SEO
- structured data

Recommended primary keyword:

- `seo services`

Recommended secondary keywords to add:

- `search engine optimization services`
- `seo optimisation services`
- `search engine optimization agency`
- `seo optimization agency`
- `ai seo services`
- `ai seo agency`
- `geo seo`
- `seo aeo`
- `technical seo services`
- `local seo services`

Recommended copy updates:

- Add one opening paragraph that explicitly says the page covers traditional SEO, AI SEO, AEO, and GEO for service businesses.
- Add a dedicated subsection titled `AI SEO, AEO, and GEO Services`.
- Add a short FAQ: `What are AI SEO services?`
- Add a short FAQ: `Is GEO different from SEO?`
- Add a short FAQ: `Do you offer SEO services for small businesses?`
- Update metadata keywords so `ai seo services`, `seo optimisation services`, and `search engine optimization services` are represented.

Suggested metadata direction:

- Title: `SEO Services & AI Search Optimization | aibizmod`
- Description: `SEO, GEO, AEO, and AI SEO services for businesses that need stronger visibility across Google, AI Overviews, ChatGPT, Gemini, and Perplexity.`

### 2. AI Visibility Audit Service Page

File: `src/app/services/ai-automation/ai-visibility-audit/page.tsx`

Current page target:

- AI visibility audit
- generative engine optimization
- GEO services
- AI search strategy
- LLM search optimization

Recommended primary keyword:

- `ai visibility audit`

Recommended secondary keywords to add:

- `ai optimization`
- `ai optimisation`
- `ai ranking`
- `ai monitoring tools`
- `ai search visibility`
- `ai search strategy`
- `AI ranking audit`
- `citation gap analysis`
- `ChatGPT optimization`
- `Perplexity visibility`
- `Google AI search optimization`

Recommended copy updates:

- Add a section called `AI Ranking and Monitoring`.
- Explain that "AI ranking" is shorthand for visibility, citation, and recommendation share across AI answer engines.
- Add monitoring language tied to prompts, citations, recommendation rate, and competitor visibility.
- Add a FAQ: `How do you measure AI ranking?`
- Add a FAQ: `Which AI search platforms do you monitor?`

Suggested metadata direction:

- Title: `AI Visibility Audit, AI Ranking & GEO Roadmap | aibizmod`
- Description: `Benchmark your visibility across ChatGPT, Gemini, Claude, Perplexity, and Google AI Search. Find citation gaps, AI ranking issues, and competitor opportunities.`

### 3. Digital Marketing Parent Page

File: `src/app/services/digital-marketing/page.tsx`

Recommended secondary keywords:

- `ai driven digital marketing`
- `ai marketing tools`
- `ai tools for marketing`
- `seo services`
- `GEO services`

Recommended copy updates:

- Keep the page broad.
- Add a short mention that search visibility now includes traditional search, AI Overviews, and answer-engine citation surfaces.
- Link strongly to the Search Marketing service page and the AI Visibility Audit page.

### 4. GEO Topic Hub

Files:

- `src/app/topics/page.tsx`
- `src/app/topics/[slug]/page.tsx`
- `src/data/topics.ts`
- `src/data/blog.ts`

Recommended action:

- Expand the GEO topic hub into the canonical internal hub for `geo seo`, `seo aeo`, `generative engine optimization`, and `AI search visibility`.
- Add internal links from GEO articles to the Search Marketing and AI Visibility Audit service pages.
- Add a comparison-style section: `SEO vs AEO vs GEO`.

## New Content To Create

Create these in order. Keep them useful and evidence-led rather than keyword-stuffed.

| Order | Page / Article | Primary keyword | Secondary keywords | Intent | Skill pattern |
|---:|---|---|---|---|---|
| 1 | `AI SEO Services: What Businesses Need Before AI Search Takes More Clicks` | ai seo services | ai seo agency, geo seo, seo aeo | Commercial investigation | content-strategy + ai-seo |
| 2 | `AI SEO Tools vs AI SEO Services: Which Do You Need?` | ai seo tools | best ai seo tools, best ai tools for seo, ai seo tool | Consideration | competitors + content-strategy |
| 3 | `How To Improve AI Ranking Across ChatGPT, Perplexity, Gemini, and Google AI Search` | ai ranking | ai optimization, ai optimisation, ai search visibility | Awareness to consideration | ai-seo |
| 4 | `Google AI Search Optimization: What Helps, What Does Not, and What To Measure` | google ai search | AI Overviews, ai search engine, ai seo services | Awareness | ai-seo |
| 5 | `AI Monitoring Tools for Brand Visibility: What To Track Before Buying Software` | ai monitoring tools | AI visibility tools, citation tracking, prompt tracking | Consideration | competitors |
| 6 | `AI Marketing Tools for Service Businesses: Use Cases, Limits, and When To Hire Help` | ai marketing tools | ai tools for marketing, ai driven digital marketing | Awareness to consideration | content-strategy |

## Competitor And Comparison Page Plan

The exports contain very little direct `alternative`, `vs`, or `comparison` language. Only `seo tools comparison` appears clearly. That means comparison pages should be created carefully from validated competitor research, not automatically from this export.

Recommended comparison formats:

| Priority | Page idea | Why |
|---|---|---|
| P1 | `AI SEO Tools vs AI SEO Services` | Captures tool-intent while positioning aibizmod's service. |
| P1 | `Best AI SEO Tools for Service Businesses` | Captures `best ai seo tools` without pretending aibizmod is a software directory. |
| P2 | `SEO Tools Comparison: Semrush, Ahrefs, AI Visibility Tools, and Service-Led SEO` | Useful if backed by current tool/pricing research. |
| P2 | `Perplexity vs Google AI Overviews for Business Discovery` | Educational competitor-style article, not a product takedown. |
| P3 | `ChatGPT vs Perplexity vs Gemini for Finding Service Providers` | Good AI-search authority piece, but needs real prompt testing. |

Rules from the competitor skill:

- Be honest about what each tool or platform is good for.
- Use paragraph comparisons, not only checkmark tables.
- Add "who this is best for" and "who should not use this" sections.
- Avoid claims that cannot be verified.
- Use comparison pages for useful evaluation, not brand hijacking.

## 30-Day Execution Plan

### Week 1 - Keyword Master Sheet And Metadata Updates

1. Create a deduped keyword master sheet from the five CSVs.
2. Add these fields: `Cluster`, `Intent`, `Buyer Stage`, `Priority`, `Target URL`, `Status`, `Notes`.
3. Mark broad/generic terms as `Reject` or `Awareness only`.
4. Add the P0 keywords to the active keyword plan.
5. Update metadata keyword arrays on:
   - `src/app/services/digital-marketing/search-marketing/page.tsx`
   - `src/app/services/ai-automation/ai-visibility-audit/page.tsx`
   - `src/app/services/digital-marketing/page.tsx`

### Week 2 - Service Page Copy Improvements

1. Expand the Search Marketing page with explicit `AI SEO`, `AEO`, and `GEO` language.
2. Expand the AI Visibility Audit page with `AI ranking`, `AI optimization`, and monitoring language.
3. Add 3-5 FAQs to each page based on the P0/P1 keyword terms.
4. Add internal links between:
   - Search Marketing
   - AI Visibility Audit
   - GEO topic hub
   - GEO blog posts
5. Make sure the H1/H2 structure uses natural language and not repeated keyword strings.

### Week 3 - Publish First Two Content Assets

1. Publish `AI SEO Services: What Businesses Need Before AI Search Takes More Clicks`.
2. Publish `AI SEO Tools vs AI SEO Services: Which Do You Need?`.
3. Link both articles from the Search Marketing and AI Visibility Audit pages.
4. Add FAQ schema if the page template supports it.
5. Add both URLs to sitemap coverage.

### Week 4 - Competitor/AI Visibility Content

1. Run prompt checks across ChatGPT, Perplexity, Gemini, Claude, and Google for 20 target prompts.
2. Record which competitors and sources are cited.
3. Publish `How To Improve AI Ranking Across ChatGPT, Perplexity, Gemini, and Google AI Search`.
4. Create a lightweight AI visibility benchmark table that can be updated monthly.
5. Decide whether the comparison pages need separate `/comparisons` routes or should live under `/blog` first.

## 60-Day Expansion Plan

1. Publish the remaining three articles:
   - Google AI Search Optimization
   - AI Monitoring Tools for Brand Visibility
   - AI Marketing Tools for Service Businesses
2. Refresh the GEO topic hub with:
   - SEO vs AEO vs GEO comparison
   - AI search platform definitions
   - FAQs for `geo seo`, `seo aeo`, and `generative engine optimization`
3. Build one reusable comparison page template only if at least three comparison articles are planned.
4. Add breadcrumb and Article/FAQ structured data to the new content.
5. Review Search Console after indexing and adjust titles/descriptions based on impressions and CTR.

## Measurement Plan

Track these every month:

| Metric | Tool/source | Why |
|---|---|---|
| Impressions for P0 keywords | Google Search Console | Confirms Google is testing pages for the target cluster. |
| Clicks and CTR by target page | Google Search Console | Shows whether titles/descriptions are earning clicks. |
| Ranking movement for `seo services`, `ai seo services`, `geo seo` | Rank tracker or manual check | Measures core keyword progress. |
| AI answer citation rate | Manual prompt sheet or AI visibility tool | Measures AI-search progress. |
| Leads from Search Marketing and AI Visibility pages | GA4 / CRM | Confirms the keywords are producing commercial value. |
| Internal link clicks | GA4 | Confirms the hub and service pages are moving visitors deeper. |

## Implementation Notes

- Do not stuff every keyword into metadata. Google can understand related terms; the page must read naturally.
- Google says normal SEO fundamentals still matter for generative AI features, and warns against writing separate content purely for AI systems.
- Use structured data and clear page structure because it helps standard SEO and makes content easier for non-Google AI systems to parse.
- Treat `llms.txt` and similar AI files as optional support, not a replacement for good pages.
- Avoid programmatic page generation until there is enough unique data for each page.

Useful references:

- Google Search Central, generative AI optimization guide: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central, title link best practices: https://developers.google.com/search/docs/appearance/title-link

## Immediate Checklist

- [ ] Add the P0 keyword list to the keyword plan.
- [ ] Update Search Marketing metadata and page copy.
- [ ] Update AI Visibility Audit metadata and page copy.
- [ ] Expand the GEO topic hub around `geo seo`, `seo aeo`, and `AI search visibility`.
- [ ] Create the first two content briefs.
- [ ] Run a 20-prompt AI visibility baseline.
- [ ] Decide whether comparison content starts under `/blog` or `/comparisons`.
