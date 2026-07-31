import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'SEO Services & AI Search Optimization | aibizmod',
	description:
		'SEO, GEO, AEO, and AI SEO services for businesses that need stronger visibility across Google, AI Overviews, ChatGPT, Gemini, and Perplexity.',
	keywords: [
		'SEO services',
		'search engine optimization services',
		'seo optimisation services',
		'search engine optimization agency',
		'seo optimization agency',
		'ai seo services',
		'ai seo agency',
		'geo seo',
		'seo aeo',
		'technical SEO services',
		'local SEO services',
		'keyword research',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/digital-marketing/search-marketing',
	},
	openGraph: {
		title: 'SEO Services & AI Search Optimization | aibizmod',
		description:
			'SEO, GEO, AEO, and AI SEO services that improve visibility across traditional search and AI-powered answer engines.',
		url: '/services/digital-marketing/search-marketing',
	},
};

const data: SubservicePageData = {
	name: 'SEO Services & AI Search Optimization',
	parentName: 'Digital Marketing',
	parentSlug: 'digital-marketing',
	slug: 'search-marketing',
	tagline:
		'SEO services for businesses that need to be found in Google and understood by AI answer engines. We combine technical SEO, content strategy, local search, AI SEO, AEO, and GEO so your pages can rank, earn citations, and turn search demand into qualified leads.',
	heroImage:
		'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Organic search traffic should be one of the most cost-effective acquisition channels, but most businesses are not extracting the available value. Pages that could rank are buried by technical issues, slow load times, missing structured data, crawl errors, or thin content. Keyword strategies are often based on volume data instead of commercial intent. AI search adds another layer: if your service pages are vague, answer engines may cite clearer competitors instead.',
		challengePoints: [
			'Core pages not ranking despite being directly relevant to high-intent search queries',
			'Technical crawl issues blocking indexation of important content',
			'No content strategy tied to keyword research, so published content does not target rankable opportunities',
			'AI SEO, AEO, and GEO terms not mapped to clear service pages or useful answer blocks',
			'Local SEO neglected, with Google Business Profile incomplete and citations inconsistent',
		],
		solution:
			'We audit your current search visibility, identify the technical and content gaps causing ranking underperformance, and execute a structured programme covering technical fixes, content strategy, local SEO, and AI search readiness. Every change is mapped to a target query, target page, and measurement baseline so progress is visible.',
		solutionPoints: [
			'Full technical SEO audit with prioritised fix list covering crawl, indexation, and Core Web Vitals',
			'Keyword research tied to commercial intent, mapped to service pages, topic hubs, FAQs, and content gaps',
			'AI SEO, AEO, and GEO optimisation using clear definitions, comparison sections, FAQs, entity coverage, and structured data',
			'Content briefs and delivery for target queries with the best ranking and citation potential',
			'Google Business Profile optimisation and local citation consistency for location-based visibility',
		],
	},

	capabilities: [
		{
			icon: 'search',
			title: 'Technical SEO Audit',
			description:
				'Systematic crawl analysis identifying indexation errors, redirect chains, page speed issues, structured data gaps, and crawl budget problems with a prioritised remediation plan.',
			image: '/services/digital-marketing/search-marketing-technical-seo-audit.webp',
			imageAlt: 'Digital Marketing Technical SEO Audit capability illustration.',
		},
		{
			icon: 'fileText',
			title: 'Content Strategy and SEO Writing',
			description:
				'Keyword research mapped to commercial intent, with content briefs and written pages targeting queries your current site is not capturing.',
			image: '/services/digital-marketing/search-marketing-content-strategy-and-seo-writing.webp',
			imageAlt: 'Digital Marketing Content Strategy and SEO Writing capability illustration.',
		},
		{
			icon: 'globe',
			title: 'Local SEO',
			description:
				'Google Business Profile optimisation, citation building, review strategy, and localised content for businesses that need visibility in specific geographic markets.',
			image: '/services/digital-marketing/search-marketing-local-seo.webp',
			imageAlt: 'Digital Marketing Local SEO capability illustration.',
		},
		{
			icon: 'code2',
			title: 'Structured Data Implementation',
			description:
				'Schema.org markup for products, services, FAQs, reviews, and breadcrumbs to improve rich result eligibility and AI-powered search understanding.',
			image: '/services/digital-marketing/search-marketing-structured-data-implementation.webp',
			imageAlt: 'Digital Marketing Structured Data Implementation capability illustration.',
		},
		{
			icon: 'activity',
			title: 'AI SEO, AEO, and GEO Services',
			description:
				'Optimise content structure, entity coverage, FAQs, comparison blocks, and authority signals for discovery and citation in AI-generated answer surfaces like ChatGPT, Gemini, Perplexity, and Google AI Overviews.',
			image: '/services/digital-marketing/search-marketing-generative-engine-optimisation.webp',
			imageAlt: 'Digital Marketing Generative Engine Optimisation capability illustration.',
		},
		{
			icon: 'lineChart',
			title: 'Rank Tracking and Reporting',
			description:
				'Keyword rank tracking with monthly reporting covering traditional rankings, Search Console movement, AI-search prompt visibility, traffic attribution, and progress against the target keyword set.',
			image: '/services/digital-marketing/search-marketing-rank-tracking-and-reporting.webp',
			imageAlt: 'Digital Marketing Rank Tracking and Reporting capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Professional Services',
			title: 'Technical SEO Fix for a Law Firm Website',
			description:
				"A law firm's website had hundreds of duplicate pages being indexed due to a CMS configuration issue. Fixing the crawl errors and implementing canonical tags recovered organic traffic to target pages within eight weeks.",
		},
		{
			industry: 'E-commerce',
			title: 'Category Page SEO for an Online Retailer',
			description:
				'An online retailer had strong product pages but weak category pages that should have been ranking for high-volume commercial terms. Content improvements and structured data additions moved three key categories to page one.',
		},
		{
			industry: 'Hospitality',
			title: 'Local SEO for a Restaurant Group',
			description:
				'A restaurant group with five locations had inconsistent NAP data across directories and an incomplete Google Business Profile. Fixing citations and optimising each location profile increased local pack appearances by 60 percent.',
		},
		{
			industry: 'SaaS',
			title: 'GEO Optimisation for AI Discovery',
			description:
				'A SaaS company wanted their product to appear in AI-generated comparisons. We restructured their feature and comparison pages and improved entity coverage to increase citation frequency in AI answer surfaces.',
		},
		{
			industry: 'Healthcare',
			title: 'Medical Content SEO Programme',
			description:
				'A private healthcare provider ran a six-month content programme targeting informational queries around their treatment areas, driving a 40 percent increase in organic new patient enquiries.',
		},
		{
			industry: 'Retail',
			title: 'Page Speed and Core Web Vitals Improvement',
			description:
				"A retailer's mobile page speed scores were causing ranking suppression. Asset optimisation and script deferral improved Largest Contentful Paint from 8.2 seconds to 2.4 seconds.",
		},
	],

	technologies: [
		'Google Search Console',
		'Ahrefs',
		'SEMrush',
		'Screaming Frog',
		'Google Analytics 4',
		'Google Business Profile',
		'Moz',
		'Schema.org',
		'Lighthouse',
		'Next.js',
	],

	benefits: [
		{
			title: 'Organic Traffic That Does Not Require Per-Click Spend',
			description:
				'Well-ranked pages continue to drive qualified traffic without an ongoing media spend, improving the overall efficiency of your marketing budget over time.',
		},
		{
			title: 'Ranked for Queries with Commercial Intent',
			description:
				'Keyword research focused on commercial and transactional intent means the traffic you gain is from users looking for what you provide, not just high-volume informational queries.',
		},
		{
			title: 'Technical Foundations That Support Long-Term Rankings',
			description:
				'Fixing crawl, indexation, and speed issues removes the technical ceiling on ranking performance, allowing content quality to determine visibility rather than infrastructure problems.',
		},
		{
			title: 'Local Visibility Where It Matters',
			description:
				'For businesses serving specific locations, Google local pack appearances drive high-intent traffic that converts at a higher rate than standard organic results.',
		},
		{
			title: 'AI Search Visibility',
			description:
				'As AI-generated answers become a larger part of discovery, AI SEO and GEO improvements make your service pages easier to extract, cite, compare, and recommend.',
		},
		{
			title: 'Measurable Progress Against Baseline',
			description:
				'Every engagement starts with a tracked keyword baseline. Monthly reporting shows exactly which queries improved, which declined, and what drove the changes.',
		},
	],

	pricing: {
		intro:
			'Engagements combine technical SEO, content, and AI search visibility work with clear scopes and monthly reporting. Every plan starts with a keyword and AI visibility baseline.',
		tiers: [
			{
				name: 'Search Foundation',
				price: '£1,850',
				period: 'per month',
				description:
					'A technical and on-page programme for businesses with an existing site: crawl fixes, keyword baseline, on-page optimisation, and monthly reporting.',
				features: [
					'Technical SEO audit and crawl fixes',
					'Keyword baseline and monthly rank reporting',
					'On-page optimisation for priority pages',
					'Core Web Vitals improvement plan',
					'Monthly reporting call',
				],
			},
			{
				name: 'Search + AI Visibility',
				price: '£3,400',
				period: 'per month',
				description:
					'The full programme: technical SEO, content development, and AI search visibility work — schema, entity clarity, citations, and prompt monitoring — for businesses where AI answers already drive enquiries.',
				features: [
					'Everything in Search Foundation',
					'Monthly content production and publishing',
					'AI visibility prompt set and monthly scorecard',
					'Schema and entity optimisation',
					'Citation and authority signal building',
					'Quarterly AI visibility re-benchmark',
				],
				featured: true,
			},
			{
				name: 'Growth Programme',
				price: 'from £5,900',
				period: 'per month',
				description:
					'For competitive markets: content velocity, link building, comparison page programmes, and dedicated SEO and GEO specialists on your account.',
				features: [
					'Everything in Search + AI Visibility',
					'Competitor gap analysis and content programme',
					'Digital PR and authority building',
					'Comparison and category page programme',
					'Dedicated SEO lead and account team',
				],
			},
		],
		note:
			'Indicative pricing for UK small and medium businesses. Scopes are confirmed after a free consultation and baseline audit — larger or multi-location programmes are scoped individually.',
	},

	faqs: [
		{
			q: 'How long does SEO take to show results?',
			a: 'Technical fixes that remove indexation errors often show impact within four to eight weeks as search engines recrawl affected pages. Content changes to existing pages take two to four months to reflect in rankings. New content targeting competitive terms takes three to six months, depending on domain authority and the competitive landscape for the target queries. We set realistic timelines during scoping based on your specific situation.',
		},
		{
			q: 'What is GEO and how is it different from standard SEO?',
			a: "Generative Engine Optimisation (GEO) focuses on being cited and referenced by AI-powered answer surfaces like ChatGPT, Perplexity, Gemini, and Google's AI Overviews. Standard SEO optimises for traditional blue-link rankings. The two overlap significantly because high-quality, authoritative content benefits both, but GEO additionally requires strong entity coverage, clear factual claims, and structured content that AI systems can extract and cite accurately.",
		},
		{
			q: 'What are AI SEO services?',
			a: 'AI SEO services improve how your business appears in AI-powered search and answer engines. The work includes traditional SEO foundations, structured data, clear service definitions, FAQ content, comparison-ready sections, citation gap analysis, and prompt-based monitoring across platforms such as ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews.',
		},
		{
			q: 'Is AEO the same as GEO?',
			a: 'AEO usually means answer engine optimisation, while GEO means generative engine optimisation. In practice, both focus on making your content easy for AI systems to understand, extract, and cite. We treat AEO, GEO, and AI SEO as related work streams built on top of strong technical SEO and useful human-readable content.',
		},
		{
			q: 'Do you offer SEO services for small businesses?',
			a: 'Yes. For small businesses, we prioritise the pages and fixes most likely to produce qualified enquiries: service-page optimisation, local SEO, Search Console setup, technical crawl fixes, FAQ schema, content briefs, and monthly reporting against a focused keyword set.',
		},
		{
			q: 'Do you guarantee specific ranking positions?',
			a: 'No. No ethical SEO provider can guarantee specific positions because rankings are determined by search engine algorithms that factor in hundreds of variables, including competitor activity we cannot control. We commit to transparent reporting of what changed, what actions we took, and the measured impact on rankings and traffic.',
		},
		{
			q: 'Can you work with our existing website CMS?',
			a: 'Yes. Technical SEO work is largely independent of the CMS. We provide the fixes as specifications for your development team or implement them directly, depending on access. For structured data, meta tags, and content, we work within your CMS workflow.',
		},
	],

	relatedResources: [
		{
			title: 'AI SEO Services: What Businesses Need Before AI Search Takes More Clicks',
			description:
				'What AI SEO services include, how they differ from traditional SEO, and how to improve visibility across ChatGPT, Perplexity, Gemini, and Google AI Search.',
			href: '/blog/ai-seo-services',
		},
		{
			title: 'AI SEO Tools vs AI SEO Services: Which Do You Need?',
			description:
				'A decision framework for buying AI monitoring software, hiring expert-led services, or combining both.',
			href: '/blog/ai-seo-tools-vs-ai-seo-services',
		},
		{
			title: 'How To Improve AI Ranking Across AI Answer Engines',
			description:
				'The AI visibility ladder — retrieved, cited, mentioned, recommended — and what improves each rung.',
			href: '/blog/how-to-improve-ai-ranking',
		},
		{
			title: 'Google AI Search Optimization: What Helps, What Does Not',
			description:
				'What Google actually says about AI Overviews and AI Mode, what does not help, and what to measure.',
			href: '/blog/google-ai-search-optimization',
		},
		{
			title: 'AI Visibility Audit Prompts',
			description:
				'54 free prompts for auditing how ChatGPT, Perplexity, Gemini, and Claude see your brand across retrieval, citation, and recommendation.',
			href: '/ai-visibility-prompts',
		},
		{
			title: 'How We Audit AI Visibility: Methodology, Metrics & Scoring',
			description:
				'The documented five-metric methodology, prompt sets, and scoring rubric behind every AI visibility audit.',
			href: '/how-we-audit-ai-visibility',
		},
	],
};

export default function SearchMarketingPage() {
	return <SubservicePageLayout data={data} />;
}
