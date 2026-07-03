import type { Metadata } from "next";
import SubservicePageLayout, {
  type SubservicePageData,
} from "@/components/SubservicePageLayout";

export const metadata: Metadata = {
  title: "AI Visibility Audit & Optimization Services | Benchmark & Roadmap | aibizmod",
  description:
    "Is your business visible in the era of ChatGPT, Gemini, and Claude? Our AI Visibility Audit benchmarks your presence, identifies citation gaps, and delivers a 90-day roadmap.",
  keywords: [
    "AI visibility audit",
    "generative engine optimization",
    "GEO services",
    "ChatGPT optimization",
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
    title: "AI Visibility Audit & Optimization | Benchmark & Roadmap | aibizmod",
    description:
      "Is your business visible in the era of ChatGPT, Gemini, and Claude? Our AI Visibility Audit benchmarks your presence, identifies citation gaps, and delivers a 90-day roadmap.",
    url: "/services/ai-automation/ai-visibility-audit",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Visibility Audit & Optimization | Benchmark & Roadmap | aibizmod",
    description:
      "Is your business visible in the era of ChatGPT, Gemini, and Claude? Our AI Visibility Audit benchmarks your presence, identifies citation gaps, and delivers a 90-day roadmap.",
  },
};

const data: SubservicePageData = {
  name: "AI Visibility Audit",
  parentName: "AI & Automation",
  parentSlug: "ai-automation",
  slug: "ai-visibility-audit",
  tagline:
    "• The way people discover businesses is changing. Instead of browsing search results, customers now ask AI assistants like ChatGPT, Gemini, Claude, and Perplexity for recommendations.\n• If your business isn't recognized or referenced by these AI systems, you're missing valuable opportunities.\n• Our AI Visibility Audit measures your current visibility, identifies gaps, benchmarks you against competitors, and delivers a practical roadmap to improve your presence across AI-powered search experiences.",
  heroImage:
    "/services/automation/ai-visibility-audit-hero.png",

  solves: {
    challenge:
      "Many businesses have strong websites but rarely appear in AI-generated answers because AI systems don't clearly recognize or understand their content. Your competitors may have stronger authority signals, structured data, or better content, causing AI assistants to recommend them instead of your business. Most organizations still optimize only for Google SEO and lack a strategy tailored for AI search, entity recognition, and citation optimization, causing them to lose key leads.",
    challengePoints: [
      "Low AI Visibility — Many businesses have strong websites but rarely appear in AI-generated answers because AI systems don't clearly recognize or understand their content.",
      "Competitors Get Recommended — Your competitors may have stronger authority signals, structured data, or better content, causing AI assistants to recommend them instead of your business.",
      "No AI Search Strategy — Most organizations still optimize only for Google SEO and lack a strategy tailored for AI search, entity recognition, and citation optimization.",
    ],
    solution:
      "We evaluate how visible your brand is across leading AI platforms and compare your performance against competitors to establish a clear baseline. By analyzing your website, content, structured data, authority signals, and citations, we uncover the reasons AI systems aren't recommending your business. Finally, we deliver a prioritized 90-day roadmap with clear recommendations, quick wins, and long-term improvements to strengthen your AI visibility.",
    solutionPoints: [
      "Benchmark Your AI Presence — We evaluate how visible your brand is across leading AI platforms and compare your performance against competitors to establish a clear baseline.",
      "Identify Visibility Gaps — We analyze your website, content, structured data, authority signals, and citations to uncover the reasons AI systems aren't recommending your business.",
      "Deliver an Actionable Roadmap — You'll receive a prioritized 90-day roadmap with clear recommendations, quick wins, and long-term improvements to strengthen your AI visibility.",
    ],
  },

  capabilities: [
		{
			icon: 'eye',
			title: 'AI Visibility Benchmark',
			description:
				'Measure your visibility across AI search platforms and understand where your brand stands today.',
			image: '/services/ai-automation/ai-visibility-audit-ai-visibility-benchmark.jpg',
			imageAlt: 'AI & Automation AI Visibility Benchmark capability illustration.',
		},
		{
			icon: 'users',
			title: 'Competitor Analysis',
			description:
				'Compare your AI presence with industry competitors and identify opportunities to outperform them.',
			image: '/services/ai-automation/ai-visibility-audit-competitor-analysis.jpg',
			imageAlt: 'AI & Automation Competitor Analysis capability illustration.',
		},
		{
			icon: 'search',
			title: 'Citation Gap Analysis',
			description:
				'Discover where AI models obtain information and identify missing citations affecting your credibility.',
			image: '/services/ai-automation/ai-visibility-audit-citation-gap-analysis.jpg',
			imageAlt: 'AI & Automation Citation Gap Analysis capability illustration.',
		},
		{
			icon: 'target',
			title: 'Prompt Mapping',
			description:
				'Understand which prompts trigger your brand and discover where you are missing from AI-generated responses.',
			image: '/services/ai-automation/ai-visibility-audit-prompt-mapping.jpg',
			imageAlt: 'AI & Automation Prompt Mapping capability illustration.',
		},
		{
			icon: 'fileText',
			title: 'Site Readiness Review',
			description:
				'Evaluate your website',
			image: '/services/ai-automation/ai-visibility-audit-site-readiness-review.jpg',
			imageAlt: 'AI & Automation Site Readiness Review capability illustration.',
		},
		{
			icon: 'database',
			title: 'Structured Data Assessment',
			description:
				'Review Schema.org implementation and entity markup to improve AI comprehension.',
			image: '/services/ai-automation/ai-visibility-audit-structured-data-assessment.jpg',
			imageAlt: 'AI & Automation Structured Data Assessment capability illustration.',
		},
		{
			icon: 'cpu',
			title: 'Content Intelligence Review',
			description:
				'Analyze whether your content answers user intent in a way AI assistants can understand and recommend.',
			image: '/services/ai-automation/ai-visibility-audit-content-intelligence-review.jpg',
			imageAlt: 'AI & Automation Content Intelligence Review capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Authority Signal Analysis',
			description:
				'Evaluate backlinks, brand mentions, trust indicators, and domain authority influencing AI recommendations.',
			image: '/services/ai-automation/ai-visibility-audit-authority-signal-analysis.jpg',
			imageAlt: 'AI & Automation Authority Signal Analysis capability illustration.',
		},
		{
			icon: 'compass',
			title: 'Opportunity Identification',
			description:
				'Prioritize high-impact improvements that can quickly increase your AI visibility.',
			image: '/services/ai-automation/ai-visibility-audit-opportunity-identification.jpg',
			imageAlt: 'AI & Automation Opportunity Identification capability illustration.',
		},
		{
			icon: 'rocket',
			title: '90-Day Implementation Roadmap',
			description:
				'Receive a step-by-step action plan with priorities, timelines, and measurable goals.',
			image: '/services/ai-automation/ai-visibility-audit-90day-implementation-roadmap.jpg',
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
        "A clear score of your current brand presence and recommendation share across ChatGPT, Gemini, Claude, and Perplexity.",
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
        "A prioritized breakdown of quick wins and high-impact changes to immediately improve your AI discovery share.",
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
        "Ensure your brand is recognized and recommended by AI assistants like ChatGPT, Gemini, Claude, and Perplexity when potential customers search.",
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
      q: "Which AI platforms are included?",
      a: "Our audit covers the most widely used conversational assistants and generative search engines, including OpenAI's ChatGPT, Google's Gemini, Anthropic's Claude, and Perplexity AI. We analyze both desktop and mobile search contexts to ensure a comprehensive overview.",
    },
  ],
};

export default function AIVisibilityAuditPage() {
  return <SubservicePageLayout data={data} />;
}
