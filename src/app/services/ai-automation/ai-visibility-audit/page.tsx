import type { Metadata } from "next";
import SubservicePageLayout, {
  type SubservicePageData,
} from "@/components/SubservicePageLayout";

export const metadata: Metadata = {
  title: "AI Visibility Audit, AI Ranking & GEO Roadmap | aibizmod",
  description:
    "Benchmark your visibility across ChatGPT, Gemini, Claude, Perplexity, and Google AI Search. Find citation gaps, AI ranking issues, and competitor opportunities.",
  keywords: [
    "AI visibility audit",
    "AI ranking",
    "AI optimization",
    "AI optimisation",
    "AI monitoring tools",
    "AI search visibility",
    "generative engine optimization",
    "GEO services",
    "ChatGPT optimization",
    "Perplexity visibility",
    "Google AI search optimization",
    "Gemini search visibility",
    "AI search strategy",
    "citation gap analysis",
    "entity recognition audit",
    "LLM search optimization",
  ],
  alternates: {
    canonical: "https://aibizmod.com/services/ai-automation/ai-visibility-audit",
  },
  openGraph: {
    title: "AI Visibility Audit, AI Ranking & GEO Roadmap | aibizmod",
    description:
      "Benchmark AI search visibility, citation gaps, and competitor opportunities across ChatGPT, Gemini, Claude, Perplexity, and Google AI Search.",
    url: "/services/ai-automation/ai-visibility-audit",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Visibility Audit, AI Ranking & GEO Roadmap | aibizmod",
    description:
      "Benchmark AI search visibility, citation gaps, and competitor opportunities across ChatGPT, Gemini, Claude, Perplexity, and Google AI Search.",
  },
};

const data: SubservicePageData = {
  name: "AI Visibility Audit",
  parentName: "AI & Automation",
  parentSlug: "ai-automation",
  slug: "ai-visibility-audit",
  tagline:
    "• Buyers now ask ChatGPT, Gemini, Claude, Perplexity, and Google AI Search for recommendations before they visit supplier websites.\n• AI ranking means more than one position. It covers whether your brand is retrieved, cited, mentioned, recommended, or ignored.\n• Our AI Visibility Audit benchmarks your current AI search visibility, identifies citation gaps, compares competitor presence, and turns the findings into a practical GEO roadmap.",
  heroImage:
    "/services/automation/ai-visibility-audit-hero.webp",

  solves: {
    challenge:
      "Many businesses have strong websites but rarely appear in AI-generated answers because AI systems do not clearly recognize, trust, or extract their content. Competitors may have stronger authority signals, clearer service pages, better structured data, or more third-party citations, causing AI assistants to recommend them instead. Most teams still monitor only Google rankings and have no baseline for AI search visibility, AI ranking, citation share, or recommendation share.",
    challengePoints: [
      "Low AI Visibility - Strong websites can still be absent from AI-generated answers if their content is hard to extract or verify.",
      "Competitors Get Recommended - Competitors with clearer content, stronger authority signals, and better citation footprints may appear where you do not.",
      "No AI Search Baseline - Standard rank tracking does not show prompt visibility, citation share, recommendation rate, or AI answer sentiment.",
      "No AI Monitoring Process - Teams do not know which prompts, platforms, and competitor mentions to review each month.",
    ],
    solution:
      "We evaluate how visible your brand is across leading AI platforms and compare your performance against competitors to establish a clear baseline. By analyzing prompts, search intent, website content, structured data, authority signals, and external citations, we uncover why AI systems are or are not recommending your business. The final roadmap prioritises the fixes most likely to improve retrieval, citation, mention, and recommendation outcomes.",
    solutionPoints: [
      "Benchmark Your AI Presence - We evaluate brand visibility across leading AI platforms and compare results against competitors.",
      "Map Prompt and Citation Gaps - We identify the prompts, topics, and sources where your brand is missing, misrepresented, or outranked.",
      "Improve AI Search Readiness - We prioritise page structure, entity coverage, FAQ content, schema, internal links, and authority signals.",
      "Deliver an Actionable Roadmap - You receive a 90-day plan with quick wins, content updates, monitoring cadence, and measurement checkpoints.",
    ],
  },

  capabilities: [
		{
			icon: 'eye',
			title: 'AI Visibility Benchmark',
			description:
				'Measure your visibility across AI search platforms and understand where your brand stands today.',
			image: '/services/ai-automation/ai-visibility-audit-ai-visibility-benchmark.webp',
			imageAlt: 'AI & Automation AI Visibility Benchmark capability illustration.',
		},
		{
			icon: 'users',
			title: 'Competitor Analysis',
			description:
				'Compare your AI presence with industry competitors and identify opportunities to outperform them.',
			image: '/services/ai-automation/ai-visibility-audit-competitor-analysis.webp',
			imageAlt: 'AI & Automation Competitor Analysis capability illustration.',
		},
		{
			icon: 'search',
			title: 'Citation Gap Analysis',
			description:
				'Discover where AI models obtain information and identify missing citations affecting your credibility.',
			image: '/services/ai-automation/ai-visibility-audit-citation-gap-analysis.webp',
			imageAlt: 'AI & Automation Citation Gap Analysis capability illustration.',
		},
		{
			icon: 'target',
			title: 'Prompt Mapping',
			description:
				'Identify the exact prompts, follow-up questions, and search intents that should trigger your brand, then record where competitors appear instead.',
			image: '/services/ai-automation/ai-visibility-audit-prompt-mapping.webp',
			imageAlt: 'AI & Automation Prompt Mapping capability illustration.',
		},
		{
			icon: 'lineChart',
			title: 'AI Ranking and Monitoring',
			description:
				'Track retrieval, citation, mention, recommendation share, platform coverage, and competitor visibility across a monthly AI search scorecard.',
			image: '/services/ai-automation/ai-visibility-audit-opportunity-identification.webp',
			imageAlt: 'AI ranking and monitoring dashboard for AI search visibility.',
		},
		{
			icon: 'fileText',
			title: 'Site Readiness Review',
			description:
				'Evaluate whether your website is crawlable, readable, semantically structured, and clear enough for search engines, AI answer systems, and browser agents.',
			image: '/services/ai-automation/ai-visibility-audit-site-readiness-review.webp',
			imageAlt: 'AI & Automation Site Readiness Review capability illustration.',
		},
		{
			icon: 'database',
			title: 'Structured Data Assessment',
			description:
				'Review Schema.org implementation and entity markup to improve AI comprehension.',
			image: '/services/ai-automation/ai-visibility-audit-structured-data-assessment.webp',
			imageAlt: 'AI & Automation Structured Data Assessment capability illustration.',
		},
		{
			icon: 'cpu',
			title: 'Content Intelligence Review',
			description:
				'Analyze whether your content answers user intent in a way AI assistants can understand and recommend.',
			image: '/services/ai-automation/ai-visibility-audit-content-intelligence-review.webp',
			imageAlt: 'AI & Automation Content Intelligence Review capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Authority Signal Analysis',
			description:
				'Evaluate backlinks, brand mentions, trust indicators, and domain authority influencing AI recommendations.',
			image: '/services/ai-automation/ai-visibility-audit-authority-signal-analysis.webp',
			imageAlt: 'AI & Automation Authority Signal Analysis capability illustration.',
		},
		{
			icon: 'compass',
			title: 'Opportunity Identification',
			description:
				'Prioritise high-impact improvements that can increase AI search visibility without creating thin AI-only content or chasing unverified ranking tricks.',
			image: '/services/ai-automation/ai-visibility-audit-opportunity-identification.webp',
			imageAlt: 'AI & Automation Opportunity Identification capability illustration.',
		},
		{
			icon: 'rocket',
			title: '90-Day Implementation Roadmap',
			description:
				'Receive a step-by-step action plan with priorities, timelines, and measurable goals.',
			image: '/services/ai-automation/ai-visibility-audit-90day-implementation-roadmap.webp',
			imageAlt: 'AI & Automation 90-Day Implementation Roadmap capability illustration.',
		}
	],

  whatsIncluded: [
    {
      title: "Prompt Map",
      description:
        "A visual database of the exact search queries and conversational prompts that your target audience uses to find services like yours.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&fit=crop",
      imageAlt:
        "A business analyst viewing digital marketing and data visualization graphs on a screen representing conversational prompt maps.",
    },
    {
      title: "Visibility Benchmark",
      description:
        "A clear score of your current brand presence, citation share, mention quality, recommendation share, and competitor visibility across ChatGPT, Gemini, Claude, and Perplexity.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80&fit=crop",
      imageAlt:
        "Dashboard with web analytics, keyword indexing statistics, and traffic growth charts representing AI visibility benchmarking.",
    },
    {
      title: "Citation Gap Analysis",
      description:
        "An audit of where AI models pull their facts and recommendations from, identifying where your brand is missing.",
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80&fit=crop",
      imageAlt:
        "Consultant pointing to data points on a technical citation index and reference checklist.",
    },
    {
      title: "Site Readiness Review",
      description:
        "A technical audit of your website's crawlability, structured data, and layout optimization for AI web agents.",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80&fit=crop",
      imageAlt:
        "Developer team collaborating in front of desktop screen optimizing site readiness schema.",
    },
    {
      title: "Competitor Comparison",
      description:
        "Side-by-side analysis of how AI models rank and discuss your business relative to your top industry competitors.",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=80&fit=crop",
      imageAlt:
        "Analytical dashboards representing competitor intelligence matrices and keyword overlap diagrams.",
    },
    {
      title: "Entity Recognition Audit",
      description:
        "Evaluation of how clearly your brand, products, and key people are mapped as entities in knowledge graphs.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80&fit=crop",
      imageAlt:
        "Printed circuit boards and neural networking structures symbolizing search entity graphs and knowledge bases.",
    },
    {
      title: "Content Quality Review",
      description:
        "Diagnostic report on how effectively your content answers user intent and feeds conversational training models.",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=80&fit=crop",
      imageAlt:
        "Notebook open next to a laptop displaying content guidelines and copy editing spreadsheets.",
    },
    {
      title: "Authority Assessment",
      description:
        "A review of external trust signals, reviews, mentions, and links that establish your brand's authority for AI models.",
      image:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&q=80&fit=crop",
      imageAlt:
        "Business strategist reviewing brand trust indexes, reviews, and domain authority indicators.",
    },
    {
      title: "Opportunity Report",
      description:
        "A prioritized breakdown of quick wins and high-impact changes to improve AI discovery share, AI ranking signals, and answer-engine citation readiness.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80&fit=crop",
      imageAlt:
        "Workspace displaying optimization tasks, timelines, and impact metrics.",
    },
    {
      title: "90-Day Roadmap",
      description:
        "A step-by-step action plan defining immediate fixes, content tweaks, and long-term optimization tasks for your team.",
      image:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&q=80&fit=crop",
      imageAlt:
        "A developer desk layout showing a detailed calendar, project roadmap, and structured plan docs.",
    },
  ],

  useCases: [
    {
      industry: "Local Businesses",
      title: "Appearing in Nearby Search",
      description:
        "Enhance citations and local schema configurations so ChatGPT and Gemini confidently recommend your locations, offices, or nearby services to proximity searchers.",
    },
    {
      industry: "SaaS",
      title: "Software Product Comparisons",
      description:
        "Optimize your entity footprints across tech reviews, forums, and developer content to secure references when users ask AI to compare software specifications and tools.",
    },
    {
      industry: "E commerce",
      title: "Conversational Shopping Discovery",
      description:
        "Optimize schema.org product metadata, merchant feed signals, and merchant citations to show up prominently in visual and conversational shopping queries.",
    },
    {
      industry: "Professional Services",
      title: "Client Recommendation Authority",
      description:
        "Build high-trust brand authority assets, executive biographies, and external citations that prompt conversational AI models to reference your advisory services.",
    },
  ],

  technologies: [
    "ChatGPT",
    "Google Gemini",
    "Anthropic Claude",
    "Perplexity AI",
    "Schema.org Markup",
    "Google Search Console",
    "Google Analytics (GA4)",
    "SEO Crawlers (Screaming Frog)",
    "Ahrefs",
    "SEMrush",
    "Knowledge Graphs",
    "Entity APIs",
  ],

  benefits: [
    {
      title: "Increase AI Search Visibility",
      description:
        "Make your brand easier for AI assistants like ChatGPT, Gemini, Claude, Perplexity, and Google AI Search to retrieve, cite, mention, and recommend.",
    },
    {
      title: "Generate More Qualified Leads",
      description:
        "Connect with high-intent users who receive direct recommendations from AI search, driving higher-converting traffic to your business.",
    },
    {
      title: "Strengthen Brand Authority",
      description:
        "Establish your brand as the definitive industry authority, cementing your digital presence across both standard search and AI engines.",
    },
  ],

  pricing: {
    intro:
      "Fixed-scope engagements with transparent pricing. Every engagement includes the benchmark, the gap analysis, and the implementation roadmap — the difference is how much of the roadmap we execute for you.",
    tiers: [
      {
        name: "AI Visibility Audit",
        price: "£1,450",
        period: "one-off",
        description:
          "A diagnostic engagement: benchmark your brand across ChatGPT, Gemini, Claude, and Perplexity, map citation gaps against competitors, and receive a 90-day roadmap your team can execute.",
        features: [
          "20–30 prompts across category, comparison, and problem queries",
          "Visibility benchmark vs 3 competitors across 4 engines",
          "Citation gap and site readiness review",
          "Structured data and entity recognition assessment",
          "Prioritised 90-day roadmap with quick wins",
          "One executive review session",
        ],
      },
      {
        name: "Audit + Implementation",
        price: "£3,900",
        period: "typical retainer",
        description:
          "The audit plus execution: our team implements the highest-impact fixes — page structure, schema, content, and internal linking — and re-measures the benchmark at the end.",
        features: [
          "Everything in AI Visibility Audit",
          "Implementation of P0 and P1 roadmap fixes",
          "Page-level GEO rewrites and schema markup",
          "Internal linking and authority signal plan",
          "Re-measurement scorecard after 90 days",
          "Monthly status calls and Slack access",
        ],
        featured: true,
      },
      {
        name: "Continuous Programme",
        price: "£950",
        period: "per month",
        description:
          "Ongoing monitoring and optimisation: a monthly AI search scorecard, prompt-set updates, content and citation work each sprint, and quarterly re-benchmarking.",
        features: [
          "Monthly AI visibility scorecard",
          "Monthly prompt set refresh and monitoring",
          "Continuous content, schema, and citation work",
          "Quarterly competitor re-benchmark",
          "Drop alerts on key prompts",
          "Dedicated delivery team",
        ],
      },
    ],
    note:
      "Prices are indicative starting points for UK small and medium businesses. Final scopes and pricing are confirmed after a free consultation call — larger or multi-brand programmes are scoped individually.",
  },

  faqs: [
    {
      q: "What is an AI Visibility Audit?",
      a: "An AI Visibility Audit evaluates how visible and recommended your brand, products, and services are across conversational AI platforms like ChatGPT, Gemini, Claude, and Perplexity. It identifies why your business may be omitted from AI-generated recommendations and provides steps to optimize your footprint.",
    },
    {
      q: "How is this different from SEO?",
      a: "While traditional SEO focuses on driving clicks from Google's standard search results page, AI Search Optimization (or GEO - Generative Engine Optimization) focuses on getting your brand cited, referenced, and recommended inside conversational answers. This requires a strategy centered on clear structured data, entity recognition, brand authority, and answering direct user intent.",
    },
    {
      q: "How do you measure AI ranking?",
      a: "We measure AI ranking as a visibility ladder rather than a single position: whether your brand is retrieved, cited, mentioned, recommended, or excluded for priority prompts. The audit records platform coverage, citation sources, competitor mentions, answer sentiment, and recommendation share across a fixed prompt set.",
    },
    {
      q: "Which AI platforms are included?",
      a: "Our audit covers the most widely used conversational assistants and generative search engines, including OpenAI's ChatGPT, Google's Gemini, Anthropic's Claude, Perplexity AI, and Google AI Search or AI Overviews where available. We analyze both desktop and mobile search contexts to ensure a comprehensive overview.",
    },
    {
      q: "What are AI monitoring tools used for?",
      a: "AI monitoring tools track how often a brand appears in AI-generated answers, which competitors are cited, which source pages are used, and how answer sentiment changes over time. We can use dedicated tools or a manual prompt scorecard depending on budget and the number of prompts that need tracking.",
    },
    {
      q: "What is the difference between AI optimization and GEO?",
      a: "AI optimization is the broader work of making a business easier for AI systems to understand, retrieve, and recommend. GEO, or generative engine optimization, is the search-specific part of that work: improving crawlable content, entity clarity, structured data, citations, and answer-ready page sections.",
    },
  ],

  relatedResources: [
    {
      title: "How To Improve AI Ranking Across ChatGPT, Perplexity, Gemini, and Google AI Search",
      description:
        "The AI visibility ladder — retrieved, cited, mentioned, recommended — and what improves each rung across answer engines.",
      href: "/blog/how-to-improve-ai-ranking",
    },
    {
      title: "AI Monitoring Tools for Brand Visibility: What To Track Before Buying Software",
      description:
        "What to track before buying AI visibility software: prompt sets, baselines, citation sources, and monthly cadence.",
      href: "/blog/ai-monitoring-tools",
    },
    {
      title: "AI SEO Services: What Businesses Need Before AI Search Takes More Clicks",
      description:
        "What AI SEO services include, how they differ from traditional SEO, and how to improve visibility across answer engines.",
      href: "/blog/ai-seo-services",
    },
    {
      title: "Google AI Search Optimization: What Helps, What Does Not",
      description:
        "What Google actually says about AI Overviews and AI Mode, what does not help, and what to measure.",
      href: "/blog/google-ai-search-optimization",
    },
    {
      title: "AI Visibility Audit Prompts",
      description:
        "54 free, ready-to-run prompts for auditing brand visibility, competitor comparisons, citations, and sentiment across answer engines.",
      href: "/ai-visibility-prompts",
    },
    {
      title: "How We Audit AI Visibility: Methodology, Metrics & Scoring",
      description:
        "The documented five-metric methodology, prompt sets, and scoring rubric behind every AI visibility audit.",
      href: "/how-we-audit-ai-visibility",
    },
  ],
};

export default function AIVisibilityAuditPage() {
  return <SubservicePageLayout data={data} />;
}
