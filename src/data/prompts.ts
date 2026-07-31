export interface PromptCategory {
  slug: string;
  title: string;
  description: string;
}

export interface AiPrompt {
  id: string;
  category: string;
  title: string;
  prompt: string;
  tags: string[];
}

export const promptCategories: PromptCategory[] = [
  {
    slug: 'visibility',
    title: 'Brand Visibility',
    description:
      'Category, recommendation, and "best of" queries that reveal whether answer engines retrieve and recommend your brand at all.',
  },
  {
    slug: 'competitors',
    title: 'Competitor Comparison',
    description:
      'Direct comparison queries that show which businesses AI systems position against each other — and who wins the recommendation.',
  },
  {
    slug: 'sources',
    title: 'Source & Citation Probes',
    description:
      'Follow-up questions that force the AI to reveal which pages and sites it based its answer on, so you can see your citation footprint.',
  },
  {
    slug: 'buyer-journey',
    title: 'Buyer Decision Prompts',
    description:
      'The problem-framed questions real buyers ask before they contact a supplier — where trust is built before the sales conversation starts.',
  },
  {
    slug: 'sentiment',
    title: 'Trust & Sentiment',
    description:
      'Reputation probes that expose whether AI answers frame your brand positively, neutrally, or with warnings and caveats.',
  },
  {
    slug: 'readiness',
    title: 'Content Readiness',
    description:
      'Extraction probes that test whether the AI can actually find, understand, and quote your website — the technical GEO health check.',
  },
];

export const aiPrompts: AiPrompt[] = [
  // ─── Brand Visibility ──────────────────────────────────────────────────────
  {
    id: 'vis-1',
    category: 'visibility',
    title: 'Direct category recommendation',
    prompt:
      "I'm looking for a {service} provider in {location} for {use case}. Which companies would you recommend and why? List 5 with a sentence each.",
    tags: ['retrieval', 'recommendation'],
  },
  {
    id: 'vis-2',
    category: 'visibility',
    title: 'Best-of listicle probe',
    prompt:
      'What are the best {service} providers in {location}? Create a ranked list and explain the top 3 choices.',
    tags: ['retrieval', 'position'],
  },
  {
    id: 'vis-3',
    category: 'visibility',
    title: 'Named mention check',
    prompt:
      'Have you heard of {brand}? What do you know about them and what do they do in the {industry} space?',
    tags: ['retrieval', 'entity'],
  },
  {
    id: 'vis-4',
    category: 'visibility',
    title: 'Bare retrieval check',
    prompt:
      'What should a business in {industry} know about choosing a {service} partner? Mention any providers you are aware of.',
    tags: ['retrieval'],
  },
  {
    id: 'vis-5',
    category: 'visibility',
    title: 'Ecosystem map',
    prompt:
      'Map out the key players in the {industry} {service} market. Group them by size, focus, and pricing model.',
    tags: ['retrieval', 'category'],
  },
  {
    id: 'vis-6',
    category: 'visibility',
    title: 'Local vs remote framing',
    prompt:
      'Should I choose a local {service} agency in {location} or work with a remote team? Which local options exist?',
    tags: ['retrieval', 'local'],
  },
  {
    id: 'vis-7',
    category: 'visibility',
    title: 'Emerging category probe',
    prompt:
      'What is GEO and which agencies offer generative engine optimization services? Give examples of providers.',
    tags: ['retrieval', 'category'],
  },
  {
    id: 'vis-8',
    category: 'visibility',
    title: 'Bilingual / regional variation',
    prompt:
      'Quienes son las mejores agencias de {service} para empresas en {location}? Recomienda 5 opciones.',
    tags: ['retrieval', 'regional'],
  },
  {
    id: 'vis-9',
    category: 'visibility',
    title: 'Fresh angle check',
    prompt:
      "I need a {service} provider that works with businesses like mine ({industry}, {size}). Who would you put on a shortlist and what's your reasoning?",
    tags: ['retrieval', 'recommendation'],
  },

  // ─── Competitor Comparison ─────────────────────────────────────────────────
  {
    id: 'cmp-1',
    category: 'competitors',
    title: 'Head-to-head comparison',
    prompt:
      'Compare {brand} vs {competitor} as {service} providers. Which is better for a {industry} business and why?',
    tags: ['comparison', 'position'],
  },
  {
    id: 'cmp-2',
    category: 'competitors',
    title: 'Three-way comparison',
    prompt:
      'Compare {brand}, {competitor1}, and {competitor2} for {service}. Rank them and explain your ranking criteria.',
    tags: ['comparison', 'position'],
  },
  {
    id: 'cmp-3',
    category: 'competitors',
    title: 'Alternative framing',
    prompt:
      'I currently use {competitor} for {service}. What are the best alternatives, including {brand} if relevant?',
    tags: ['comparison', 'alternative'],
  },
  {
    id: 'cmp-4',
    category: 'competitors',
    title: 'Pricing perception',
    prompt:
      'Which {service} providers in {location} are considered premium vs budget? Where do {brand} and {competitor} fall?',
    tags: ['comparison', 'pricing'],
  },
  {
    id: 'cmp-5',
    category: 'competitors',
    title: 'Differentiation question',
    prompt:
      "What makes {competitor} different from other {service} providers? What is their key selling point?",
    tags: ['comparison', 'competitor-strength'],
  },
  {
    id: 'cmp-6',
    category: 'competitors',
    title: 'Swap recommendation',
    prompt:
      "A colleague recommended switching from {competitor} to {brand} for {service}. Is that a sensible move? What are the trade-offs?",
    tags: ['comparison', 'recommendation'],
  },
  {
    id: 'cmp-7',
    category: 'competitors',
    title: 'Industry shortlist check',
    prompt:
      'Shortlist 5 {service} providers for a {industry} company with a budget of £{budget}. Explain why each made the list.',
    tags: ['comparison', 'shortlist'],
  },
  {
    id: 'cmp-8',
    category: 'competitors',
    title: 'Feature-by-feature ask',
    prompt:
      'Compare the capabilities of {brand} and {competitor} for {service} across pricing, expertise, process, and support. Use a table.',
    tags: ['comparison', 'structured'],
  },
  {
    id: 'cmp-9',
    category: 'competitors',
    title: 'Which is more credible',
    prompt:
      'Between {brand} and {competitor}, which has stronger client results and credibility in {industry}? Cite your sources.',
    tags: ['comparison', 'trust'],
  },

  // ─── Source & Citation Probes ──────────────────────────────────────────────
  {
    id: 'src-1',
    category: 'sources',
    title: 'Source disclosure',
    prompt:
      'For your previous answer about {service} providers, which websites and sources did you base it on? List them all.',
    tags: ['citations'],
  },
  {
    id: 'src-2',
    category: 'sources',
    title: 'Domain-level source check',
    prompt:
      'Did you reference any content from {brand} in your last answer? If not, why did you exclude it?',
    tags: ['citations', 'gap'],
  },
  {
    id: 'src-3',
    category: 'sources',
    title: 'Trustworthiness ranking',
    prompt:
      'Rank the sources you trust most for information about {service} providers in {location}, from most to least reliable.',
    tags: ['citations', 'authority'],
  },
  {
    id: 'src-4',
    category: 'sources',
    title: 'Citation attribution test',
    prompt:
      'Where did you learn that {brand} offers {specific service or claim}? Show the exact source text if possible.',
    tags: ['citations', 'verification'],
  },
  {
    id: 'src-5',
    category: 'sources',
    title: 'Uncited knowledge probe',
    prompt:
      'If you could not use any third-party review sites, which {service} providers would you recommend in {location} and why?',
    tags: ['citations', 'entity'],
  },
  {
    id: 'src-6',
    category: 'sources',
    title: 'Source freshness',
    prompt:
      'How recent is the information you used to recommend {service} providers in {location}? Is any of it outdated?',
    tags: ['citations', 'freshness'],
  },
  {
    id: 'src-7',
    category: 'sources',
    title: 'Category source map',
    prompt:
      "Which third-party sites do you most rely on when answering questions about {industry} vendors? What makes them authoritative?",
    tags: ['citations', 'pr'],
  },
  {
    id: 'src-8',
    category: 'sources',
    title: 'Page-level extraction test',
    prompt:
      'Read {brand}\'s service page for {service}. Summarise what they offer, who it is for, and how their process works.',
    tags: ['citations', 'extraction'],
  },
  {
    id: 'src-9',
    category: 'sources',
    title: 'Inconsistency hunt',
    prompt:
      "In your earlier answers you mentioned {competitor} but not {brand} for {service}. Explain what would make you include {brand}.",
    tags: ['citations', 'gap'],
  },

  // ─── Buyer Decision Prompts ────────────────────────────────────────────────
  {
    id: 'buy-1',
    category: 'buyer-journey',
    title: 'Problem framing',
    prompt:
      "My {industry} business is struggling with {problem}. What's the best way to solve it — do it in-house, hire a {service} provider, or buy software?",
    tags: ['buyer', 'build-vs-buy'],
  },
  {
    id: 'buy-2',
    category: 'buyer-journey',
    title: 'Budget planning',
    prompt:
      'How much should a {industry} business budget for {service} per year? Break it down for a team of {size}.',
    tags: ['buyer', 'pricing'],
  },
  {
    id: 'buy-3',
    category: 'buyer-journey',
    title: 'Red flags check',
    prompt:
      'What are red flags when evaluating {service} providers? What questions should I ask before signing?',
    tags: ['buyer', 'trust'],
  },
  {
    id: 'buy-4',
    category: 'buyer-journey',
    title: 'Timeline expectations',
    prompt:
      'How long does a typical {service} engagement take for a {industry} business, and what does the timeline look like?',
    tags: ['buyer', 'process'],
  },
  {
    id: 'buy-5',
    category: 'buyer-journey',
    title: 'Outcome expectations',
    prompt:
      "What results should a {industry} business realistically expect from {service} in the first 6 months? What's achievable vs hype?",
    tags: ['buyer', 'outcomes'],
  },
  {
    id: 'buy-6',
    category: 'buyer-journey',
    title: 'In-house vs agency',
    prompt:
      'Should my {industry} business hire an in-house {service} specialist or work with an agency? Compare costs and outcomes for my stage ({stage}).',
    tags: ['buyer', 'build-vs-buy'],
  },
  {
    id: 'buy-7',
    category: 'buyer-journey',
    title: 'Vendor due diligence',
    prompt:
      "Help me evaluate {brand} as a {service} provider. What do their clients say, and what should I verify before a call?",
    tags: ['buyer', 'due-diligence'],
  },
  {
    id: 'buy-8',
    category: 'buyer-journey',
    title: 'First steps guidance',
    prompt:
      "I've never worked with a {service} provider before. Walk me through the process step by step, from discovery call to launch.",
    tags: ['buyer', 'process'],
  },
  {
    id: 'buy-9',
    category: 'buyer-journey',
    title: 'Compliance and risk',
    prompt:
      'What compliance and data risks should I consider when outsourcing {service}? Which providers handle this well in {location}?',
    tags: ['buyer', 'risk'],
  },

  // ─── Trust & Sentiment ─────────────────────────────────────────────────────
  {
    id: 'sen-1',
    category: 'sentiment',
    title: 'Reputation framing',
    prompt:
      'What is the general reputation of {brand} among {industry} businesses? Summarise what people say about them.',
    tags: ['sentiment'],
  },
  {
    id: 'sen-2',
    category: 'sentiment',
    title: 'Warnings probe',
    prompt:
      'Are there any complaints, lawsuits, or negative reviews about {brand}? Should I be concerned about working with them?',
    tags: ['sentiment', 'risk'],
  },
  {
    id: 'sen-3',
    category: 'sentiment',
    title: 'Recommendation with caveats',
    prompt:
      'Would you recommend {brand} for {service}? Answer yes or no, then list any caveats or conditions.',
    tags: ['sentiment', 'recommendation'],
  },
  {
    id: 'sen-4',
    category: 'sentiment',
    title: 'Founder and team perception',
    prompt:
      'What do you know about the team and leadership behind {brand}? What is their track record in {industry}?',
    tags: ['sentiment', 'entity'],
  },
  {
    id: 'sen-5',
    category: 'sentiment',
    title: 'Review synthesis',
    prompt:
      'Synthesise what reviewers say about {brand}: what are their most common praises and criticisms? Cite the review platforms used.',
    tags: ['sentiment', 'citations'],
  },
  {
    id: 'sen-6',
    category: 'sentiment',
    title: 'Pricing perception probe',
    prompt:
      'Is {brand} considered expensive, mid-market, or budget for {service}? Compare their pricing perception with {competitor}.',
    tags: ['sentiment', 'pricing'],
  },
  {
    id: 'sen-7',
    category: 'sentiment',
    title: 'Newsroom mention check',
    prompt:
      'Has {brand} been mentioned in the news or industry media recently? Summarise recent coverage.',
    tags: ['sentiment', 'pr'],
  },
  {
    id: 'sen-8',
    category: 'sentiment',
    title: 'Trust signals audit',
    prompt:
      'What trust signals does {brand} have — certifications, case studies, client logos, awards? Assess their credibility.',
    tags: ['sentiment', 'trust'],
  },
  {
    id: 'sen-9',
    category: 'sentiment',
    title: 'Dark pattern probe',
    prompt:
      'Do {brand} or {competitor} have any aggressive sales tactics or contract traps I should watch out for?',
    tags: ['sentiment', 'risk'],
  },

  // ─── Content Readiness ─────────────────────────────────────────────────────
  {
    id: 'rea-1',
    category: 'readiness',
    title: 'Homepage extraction',
    prompt:
      'Visit {brand}.com. In one paragraph, describe what the company does, who it serves, and its main services.',
    tags: ['extraction', 'entity'],
  },
  {
    id: 'rea-2',
    category: 'readiness',
    title: 'Service page understanding',
    prompt:
      'Read the {service} page on {brand}.com. Explain their process, deliverables, and pricing if visible.',
    tags: ['extraction'],
  },
  {
    id: 'rea-3',
    category: 'readiness',
    title: 'FAQ retrievability',
    prompt:
      'Search {brand}.com for answers to: {question}. Copy the exact text the page provides.',
    tags: ['extraction', 'faq'],
  },
  {
    id: 'rea-4',
    category: 'readiness',
    title: 'Schema comprehension',
    prompt:
      'What structured data does {brand}.com use on their {service} page? List the schema types and what they describe.',
    tags: ['extraction', 'schema'],
  },
  {
    id: 'rea-5',
    category: 'readiness',
    title: 'Comparison coverage test',
    prompt:
      "Does {brand}.com have any pages comparing their {service} with alternatives? What do those pages cover?",
    tags: ['extraction', 'comparison'],
  },
  {
    id: 'rea-6',
    category: 'readiness',
    title: 'Quotability test',
    prompt:
      'Quote three specific, fact-based sentences from {brand}.com that an AI could safely cite about their {service}.',
    tags: ['extraction', 'citation-readiness'],
  },
  {
    id: 'rea-7',
    category: 'readiness',
    title: 'Internal link discovery',
    prompt:
      "Which of {brand}'s pages are most linked from other pages on their site? Which topics appear orphaned?",
    tags: ['extraction', 'internal-linking'],
  },
  {
    id: 'rea-8',
    category: 'readiness',
    title: 'Entity consistency',
    prompt:
      'How consistently does {brand} describe itself across their homepage, service pages, and about page? Note any contradictions.',
    tags: ['extraction', 'entity'],
  },
  {
    id: 'rea-9',
    category: 'readiness',
    title: 'Freshness check',
    prompt:
      'When was {brand}.com\'s {service} page last meaningfully updated? Is any information visibly outdated?',
    tags: ['extraction', 'freshness'],
  },
];
