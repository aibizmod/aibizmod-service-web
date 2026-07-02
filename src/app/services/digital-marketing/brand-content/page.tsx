import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Content Marketing & Brand Content Services | aibizmod',
	description:
		'Blog writing, copywriting, case studies, and content marketing strategy that builds authority, supports SEO rankings, and gives sales teams material that converts.',
	keywords: [
		'content marketing',
		'content strategy',
		'brand marketing',
		'content creation',
		'copywriting services',
		'content management',
		'brand strategy',
		'marketing content',
		'thought leadership',
	],
	alternates: {
		canonical: 'https://aibizmod.com/services/digital-marketing/brand-content',
	},
	openGraph: {
		title: 'Brand & Content Marketing | Content Strategy | aibizmod',
		description:
			'Strategic brand and content marketing services that build authority and drive engagement.',
		url: '/services/digital-marketing/brand-content',
	},
};

const data: SubservicePageData = {
	name: 'Brand Content',
	parentName: 'Digital Marketing',
	parentSlug: 'digital-marketing',
	slug: 'brand-content',
	tagline:
		'Content marketing, blog writing, copywriting, and case studies that build authority, support organic search performance, and give your sales team the material they actually need in sales conversations.',
	heroImage:
		'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Most business content either exists to fill a blog archive or is written for broad keywords that will never rank. Content that serves the buying journey — helping prospects understand their problem, compare options, and build confidence in a specific provider — requires a different approach. Generic blog posts and templated website copy do not do that work. Content also gets produced without considering how it will be used by search engines or how it will be found by the audience it is meant for.',
		challengePoints: [
			'Content published without keyword strategy, so it generates no organic search traffic',
			'Website copy that describes the business rather than addressing buyer concerns and motivations',
			'No case studies or proof content despite a strong client track record',
			'Inconsistent brand voice across marketing and sales materials because there is no documented standard',
		],
		solution:
			'We produce content that serves specific stages of the buying journey — from informational articles that attract search traffic to case studies that close deals. Every piece is briefed against a keyword target or conversion objective, written in a consistent brand voice, and structured for both human readers and search engine understanding.',
		solutionPoints: [
			'Content strategy mapped to buying journey stages with keyword and intent analysis',
			'Blog articles and long-form content targeting rankable informational and commercial queries',
			'Website copywriting structured around buyer motivations and conversion goals',
			'Case studies and proof content that document client outcomes in a credible, detailed format',
		],
	},

	capabilities: [
		{
			icon: 'fileText',
			title: 'Content Strategy',
			description:
				'Keyword research, content gap analysis, and a documented content calendar mapping topics to buying journey stages and business objectives.',
			image: '/services/digital-marketing/brand-content-content-strategy.jpg',
			imageAlt: 'Digital Marketing Content Strategy capability illustration.',
		},
		{
			icon: 'pencil',
			title: 'Blog Writing and Long-Form Content',
			description:
				'Research-backed articles, guides, and long-form pieces written for specific search queries and audience knowledge levels, optimised for both rankings and reader engagement.',
			image: '/services/digital-marketing/brand-content-blog-writing-and-longform-content.jpg',
			imageAlt: 'Digital Marketing Blog Writing and Long-form Content capability illustration.',
		},
		{
			icon: 'globe',
			title: 'Website Copywriting',
			description:
				'Service pages, landing pages, and homepage copy written around buyer intent and conversion goals, in your brand voice and formatted for the web.',
			image: '/services/digital-marketing/brand-content-website-copywriting.jpg',
			imageAlt: 'Digital Marketing Website Copywriting capability illustration.',
		},
		{
			icon: 'users',
			title: 'Case Study Production',
			description:
				'Structured client case studies with problem, approach, and result narrative — sourced from client interviews or existing material — formatted for website publication and sales use.',
			image: '/services/digital-marketing/brand-content-case-study-production.jpg',
			imageAlt: 'Digital Marketing Case Study Production capability illustration.',
		},
		{
			icon: 'fileText',
			title: 'Thought Leadership Content',
			description:
				'Whitepapers, reports, and expert articles authored in your voice that position your business as a knowledgeable perspective on the problems your clients face.',
			image: '/services/digital-marketing/brand-content-thought-leadership-content.jpg',
			imageAlt: 'Digital Marketing Thought Leadership Content capability illustration.',
		},
		{
			icon: 'settings',
			title: 'Brand Voice Documentation',
			description:
				'Develop and document tone of voice guidelines so all content — from marketing to sales collateral to social — reflects a consistent, recognisable brand personality.',
			image: '/services/digital-marketing/brand-content-brand-voice-documentation.jpg',
			imageAlt: 'Digital Marketing Brand Voice Documentation capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Professional Services',
			title: 'Blog Programme for a Law Firm',
			description:
				'A law firm ran a 12-month blog programme targeting informational queries around their practice areas, generating organic traffic to pages that previously had no search visibility.',
		},
		{
			industry: 'SaaS',
			title: 'Website Copy Rewrite for a Tech Product',
			description:
				"A SaaS company's website described their product features rather than the problems they solve. A full copy rewrite restructured service pages around buyer motivations, improving conversion rate on paid traffic.",
		},
		{
			industry: 'Finance',
			title: 'Case Study Library for a Financial Adviser',
			description:
				'A wealth management firm had strong client results but no documented case studies. We produced eight case studies from client interviews, giving the sales team proof content for use in proposals.',
		},
		{
			industry: 'Healthcare',
			title: 'Patient Information Content Programme',
			description:
				'A private hospital ran a content programme targeting condition and treatment queries, establishing organic visibility for high-intent searches that brought new patient enquiries.',
		},
		{
			industry: 'Manufacturing',
			title: 'Thought Leadership Whitepaper',
			description:
				'An engineering firm produced a whitepaper on compliance changes in their sector, positioning them as an authoritative voice with procurement teams at their target accounts.',
		},
		{
			industry: 'Logistics',
			title: 'Brand Voice Guidelines for a Growing Freight Operator',
			description:
				'A logistics company with rapid headcount growth needed a documented brand voice to ensure consistency across sales proposals, marketing content, and customer communications.',
		},
	],

	technologies: [
		'WordPress',
		'Contentful',
		'Ahrefs',
		'SEMrush',
		'Google Analytics 4',
		'Clearscope',
		'HubSpot',
		'Figma',
		'Canva',
	],

	benefits: [
		{
			title: 'Content That Earns Organic Traffic',
			description:
				'Articles written against keyword targets and structured for search ranking generate ongoing traffic without requiring continued spend, compounding in value over time.',
		},
		{
			title: 'Website Copy That Converts',
			description:
				'Copy structured around buyer motivations and objections improves conversion rate on both organic and paid traffic, making every acquisition channel more efficient.',
		},
		{
			title: 'Proof Content That Closes Deals',
			description:
				'Case studies are among the highest-impact sales assets a business can have. Documented client outcomes with specific results give prospects the confidence that the approach has worked for others like them.',
		},
		{
			title: 'Consistent Brand Voice',
			description:
				'Content produced to a documented voice standard reads as coming from one coherent organisation rather than different departments with different styles.',
		},
		{
			title: 'Authority in Your Category',
			description:
				'Consistent, expert content on the problems your clients face builds a perception of authority over time that paid advertising cannot replicate.',
		},
		{
			title: 'Sales and Marketing Alignment',
			description:
				'Content produced with sales use cases in mind — case studies, comparison guides, objection-handling articles — bridges the gap between marketing output and what the sales team actually needs.',
		},
	],

	faqs: [
		{
			q: 'How do you develop a content strategy if we do not know where to start?',
			a: 'We start with keyword research to identify the queries your target audience is searching for at each stage of their buying journey. We then audit your existing content, identify gaps, and build a prioritised content calendar with specific topics, target keywords, and intended outcomes for each piece. This gives you a structured plan to execute against rather than a blank page.',
		},
		{
			q: 'Do you write the content yourselves or work with our subject matter experts?',
			a: 'We do both, depending on the topic complexity and depth required. For general marketing content and SEO articles, we research and write from brief. For technical, regulated, or deeply specialised content — such as legal or clinical topics — we interview your subject matter experts and write from those conversations, with review and approval built into the process.',
		},
		{
			q: 'How do you source content for case studies?',
			a: 'We produce case studies from client interviews, existing materials, or both. We prepare a structured interview guide and conduct a 30-minute call with your client contact, then write the case study from the transcript. Where clients cannot participate in an interview, we work from briefing notes, emails, and data you provide. All case studies go through your approval before publication.',
		},
		{
			q: 'How long before content starts to rank and generate traffic?',
			a: 'Newly published content targeting competitive keywords typically begins to rank within two to four months and continues to improve for six to twelve months as search engines assess engagement signals. Content targeting lower-competition queries can rank within four to eight weeks. A consistent publishing programme builds compounding organic visibility over time rather than delivering immediate results.',
		},
	],
	answerSummary:
		'UK and India businesses publishing content without keyword strategy or conversion objectives get content marketing that targets rankable queries at each buying journey stage, with case studies, website copywriting, and brand voice documentation that serve search and sales.',
};

export default function BrandContentPage() {
	return <SubservicePageLayout data={data} />;
}
