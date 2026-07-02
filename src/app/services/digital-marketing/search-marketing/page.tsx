import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'SEO & GEO Services | Search Marketing | aibizmod',
	description:
		'SEO, GEO (Generative Engine Optimisation), local SEO, and technical SEO services that improve rankings in both traditional and AI-powered search engines.',
	keywords: [
		'search marketing',
		'SEO services',
		'search engine optimization',
		'PPC advertising',
		'keyword research',
		'SEO optimization',
		'search ads',
		'Google Ads',
		'search traffic',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/digital-marketing/search-marketing',
	},
	openGraph: {
		title: 'Search Marketing & SEO | Organic & Paid | aibizmod',
		description:
			'SEO and search marketing services that drive qualified traffic through organic search and paid search campaigns.',
		url: '/services/digital-marketing/search-marketing',
	},
};

const data: SubservicePageData = {
	name: 'SEO & GEO Services',
	parentName: 'Digital Marketing',
	parentSlug: 'digital-marketing',
	slug: 'search-marketing',
	tagline:
		'SEO, GEO, local SEO, and technical SEO services that improve search visibility, drive qualified organic traffic, and build sustainable rankings across traditional search engines and AI-powered discovery platforms.',
	heroImage:
		'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Organic search traffic should be one of the most cost-effective acquisition channels, but most businesses are not extracting the available value. Pages that could rank are buried by technical issues — slow load times, missing structured data, crawl errors, or thin content. Keyword strategies are based on volume data rather than commercial intent. Local SEO is neglected despite driving the majority of high-intent searches for service businesses.',
		challengePoints: [
			'Core pages not ranking despite being directly relevant to high-intent search queries',
			'Technical crawl issues blocking indexation of important content',
			'No content strategy tied to keyword research, so published content does not target rankable opportunities',
			'Local SEO neglected, with Google Business Profile incomplete and citations inconsistent',
		],
		solution:
			'We audit your current search visibility, identify the technical and content gaps causing ranking underperformance, and execute a structured programme covering technical fixes, content strategy, and local SEO. Every change is tracked against baseline rankings and traffic so progress is measurable.',
		solutionPoints: [
			'Full technical SEO audit with prioritised fix list covering crawl, indexation, and Core Web Vitals',
			'Keyword research tied to commercial intent, mapped to pages or content gaps',
			'Content brief and delivery for target queries with the best ranking potential',
			'Google Business Profile optimisation and local citation consistency for location-based visibility',
		],
	},

	capabilities: [
		{
			icon: 'search',
			title: 'Technical SEO Audit',
			description:
				'Systematic crawl analysis identifying indexation errors, redirect chains, page speed issues, structured data gaps, and crawl budget problems with a prioritised remediation plan.',
			image: '/services/digital-marketing/search-marketing-technical-seo-audit.jpg',
			imageAlt: 'Digital Marketing Technical SEO Audit capability illustration.',
		},
		{
			icon: 'fileText',
			title: 'Content Strategy and SEO Writing',
			description:
				'Keyword research mapped to commercial intent, with content briefs and written pages targeting queries your current site is not capturing.',
			image: '/services/digital-marketing/search-marketing-content-strategy-and-seo-writing.jpg',
			imageAlt: 'Digital Marketing Content Strategy and SEO Writing capability illustration.',
		},
		{
			icon: 'globe',
			title: 'Local SEO',
			description:
				'Google Business Profile optimisation, citation building, review strategy, and localised content for businesses that need visibility in specific geographic markets.',
			image: '/services/digital-marketing/search-marketing-local-seo.jpg',
			imageAlt: 'Digital Marketing Local SEO capability illustration.',
		},
		{
			icon: 'code2',
			title: 'Structured Data Implementation',
			description:
				'Schema.org markup for products, services, FAQs, reviews, and breadcrumbs to improve rich result eligibility and AI-powered search understanding.',
			image: '/services/digital-marketing/search-marketing-structured-data-implementation.jpg',
			imageAlt: 'Digital Marketing Structured Data Implementation capability illustration.',
		},
		{
			icon: 'activity',
			title: 'Generative Engine Optimisation',
			description:
				'Optimise content structure, entity coverage, and authority signals for discovery and citation in AI-generated answer surfaces like ChatGPT, Gemini, and Perplexity.',
			image: '/services/digital-marketing/search-marketing-generative-engine-optimisation.jpg',
			imageAlt: 'Digital Marketing Generative Engine Optimisation capability illustration.',
		},
		{
			icon: 'lineChart',
			title: 'Rank Tracking and Reporting',
			description:
				'Keyword rank tracking with monthly reporting covering visibility changes, traffic attribution, and progress against the target keyword set.',
			image: '/services/digital-marketing/search-marketing-rank-tracking-and-reporting.jpg',
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
				'As AI-generated answers become a significant share of search traffic, optimising for entity coverage and factual accuracy ensures your brand and content are cited rather than ignored.',
		},
		{
			title: 'Measurable Progress Against Baseline',
			description:
				'Every engagement starts with a tracked keyword baseline. Monthly reporting shows exactly which queries improved, which declined, and what drove the changes.',
		},
	],

	faqs: [
		{
			q: 'How long does SEO take to show results?',
			a: 'Technical fixes that remove indexation errors often show impact within four to eight weeks as search engines recrawl affected pages. Content changes to existing pages take two to four months to reflect in rankings. New content targeting competitive terms takes three to six months, depending on domain authority and the competitive landscape for the target queries. We set realistic timelines during scoping based on your specific situation.',
		},
		{
			q: 'What is GEO and how is it different from standard SEO?',
			a: "Generative Engine Optimisation (GEO) focuses on being cited and referenced by AI-powered answer surfaces like ChatGPT, Perplexity, and Google's AI Overviews. Standard SEO optimises for traditional blue-link rankings. The two overlap significantly — high-quality, authoritative content benefits both — but GEO additionally requires strong entity coverage, clear factual claims, and structured content that AI systems can extract and cite accurately.",
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
	answerSummary:
		'UK and India businesses whose pages are not ranking despite being relevant to high-intent queries get technical SEO audits, commercial-intent keyword strategies, content briefs, local SEO, and generative engine optimisation for AI-powered search visibility.',
};

export default function SearchMarketingPage() {
	return <SubservicePageLayout data={data} />;
}
