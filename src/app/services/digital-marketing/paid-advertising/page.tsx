import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Google Ads, Meta Ads & PPC Management | aibizmod',
	description:
		'Google Ads, Meta Ads, and LinkedIn Ads management focused on qualified lead generation and measurable return on ad spend — not impressions and clicks.',
	keywords: [
		'paid advertising',
		'Google Ads',
		'PPC advertising',
		'paid search',
		'social media advertising',
		'Facebook ads',
		'LinkedIn advertising',
		'display advertising',
		'retargeting campaigns',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/digital-marketing/paid-advertising',
	},
	openGraph: {
		title: 'Paid Advertising | Google & Social Ads | aibizmod',
		description:
			'Paid advertising campaign management for Google Ads and social media platforms that drive qualified conversions.',
		url: '/services/digital-marketing/paid-advertising',
	},
};

const data: SubservicePageData = {
	name: 'Paid Advertising',
	parentName: 'Digital Marketing',
	parentSlug: 'digital-marketing',
	slug: 'paid-advertising',
	tagline:
		'Google Ads, Meta Ads, and LinkedIn campaign management focused on qualified lead generation and measurable return on ad spend — structured for accountability, not just activity.',
	heroImage:
		'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Many businesses run paid advertising campaigns that produce clicks but not customers. Ad spend goes to broad audiences, landing pages are not matched to the ad message, and conversion tracking is not set up correctly so there is no reliable data on what is actually working. Budget is either wasted on traffic that does not convert or scaled up before the conversion funnel is validated.',
		challengePoints: [
			'High click volume with low conversion rates because landing pages are not matched to the ad',
			'Conversion tracking not properly configured, so reported ROAS figures are unreliable',
			'Campaigns targeting audiences that are too broad to convert at acceptable cost',
			'Budget scaled before the funnel is validated, amplifying a leaky system rather than a working one',
		],
		solution:
			'We build and manage paid campaigns structured around your conversion goals, with tracking configured correctly before launch, audiences built from your customer data, and landing pages aligned to each ad set. Budgets are scaled only after the funnel is validated with a smaller test spend.',
		solutionPoints: [
			'Conversion tracking configuration verified in Google Tag Manager before any campaign goes live',
			'Audience strategy built on customer data, intent signals, and competitor targeting',
			'Landing page brief or implementation to ensure each ad set leads to a matched, conversion-optimised page',
			'Test-and-scale approach: validate cost per acquisition at low budget before scaling',
		],
	},

	capabilities: [
		{
			icon: 'search',
			title: 'Google Search Ads',
			description:
				'Keyword strategy, match type management, negative keyword lists, and ad copy testing for search campaigns targeting users with active purchase intent.',
			image: '/services/digital-marketing/paid-advertising-google-search-ads.jpg',
			imageAlt: 'Digital Marketing Google Search Ads capability illustration.',
		},
		{
			icon: 'monitor',
			title: 'Meta Ads (Facebook and Instagram)',
			description:
				'Audience build, creative strategy, campaign structure, and funnel-stage matching across awareness, consideration, and conversion objectives on Meta',
			image: '/services/digital-marketing/paid-advertising-meta-ads-facebook-and-instagram.jpg',
			imageAlt: 'Digital Marketing Meta Ads (Facebook and Instagram) capability illustration.',
		},
		{
			icon: 'users',
			title: 'LinkedIn Ads',
			description:
				'B2B campaign management using LinkedIn',
			image: '/services/digital-marketing/paid-advertising-linkedin-ads.jpg',
			imageAlt: 'Digital Marketing LinkedIn Ads capability illustration.',
		},
		{
			icon: 'lineChart',
			title: 'PPC Campaign Management',
			description:
				'Ongoing bid management, budget allocation, Quality Score optimisation, and A/B testing to improve cost per click and cost per acquisition across live campaigns.',
			image: '/services/digital-marketing/paid-advertising-ppc-campaign-management.jpg',
			imageAlt: 'Digital Marketing PPC Campaign Management capability illustration.',
		},
		{
			icon: 'settings',
			title: 'Conversion Tracking Setup',
			description:
				'Google Tag Manager configuration, Google Ads conversion action setup, Meta Pixel and CAPI integration, and event verification to ensure accurate attribution data.',
			image: '/services/digital-marketing/paid-advertising-conversion-tracking-setup.jpg',
			imageAlt: 'Digital Marketing Conversion Tracking Setup capability illustration.',
		},
		{
			icon: 'zap',
			title: 'Retargeting Campaigns',
			description:
				'Audience segmentation and retargeting campaign builds that re-engage visitors who did not convert, with messaging matched to their stage in the buying process.',
			image: '/services/digital-marketing/paid-advertising-retargeting-campaigns.jpg',
			imageAlt: 'Digital Marketing Retargeting Campaigns capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'SaaS',
			title: 'Google Search Campaign for Trial Sign-Ups',
			description:
				'A SaaS company restructured their Google Search campaigns around high-intent keywords, improved landing page relevance, and reduced cost per trial sign-up by 35 percent over 90 days.',
		},
		{
			industry: 'Professional Services',
			title: 'LinkedIn Lead Generation for a Consulting Firm',
			description:
				'A B2B consulting firm used LinkedIn Ads to target finance directors at mid-market companies, generating qualified discovery call bookings at a predictable cost per lead.',
		},
		{
			industry: 'E-commerce',
			title: 'Meta Ads Funnel for a Fashion Brand',
			description:
				'A fashion retailer built a three-stage Meta funnel covering video awareness, product carousel consideration, and dynamic product retargeting, improving blended ROAS from 1.4 to 3.8.',
		},
		{
			industry: 'Healthcare',
			title: 'Google Ads for a Private Clinic',
			description:
				'A private dental clinic ran Google Search campaigns targeting high-intent treatment queries with dedicated landing pages per treatment area, generating new patient enquiries at a cost below their target.',
		},
		{
			industry: 'Property',
			title: 'Retargeting for a Property Developer',
			description:
				'A property developer used retargeting campaigns to re-engage visitors who had viewed specific development pages but not registered interest, improving enquiry volume from the same traffic.',
		},
		{
			industry: 'Education',
			title: 'Paid Acquisition for an Online Course Provider',
			description:
				'An online course provider validated a new course launch with a test spend on Google Search and Meta before committing full budget, confirming cost per enrolment was within acceptable margin.',
		},
	],

	technologies: [
		'Google Ads',
		'Meta Ads Manager',
		'LinkedIn Campaign Manager',
		'Google Analytics 4',
		'Google Tag Manager',
		'Looker Studio',
		'Hotjar',
		'Unbounce',
	],

	benefits: [
		{
			title: 'Spend Goes to Qualified Traffic',
			description:
				'Audience and keyword targeting focused on commercial intent reduces wasted impressions on users who are not in the market, improving conversion rates and reducing cost per acquisition.',
		},
		{
			title: 'Accurate Attribution Before Scaling',
			description:
				'Properly configured conversion tracking means budget decisions are based on real data rather than platform-reported numbers that may overstate return.',
		},
		{
			title: 'Landing Pages That Match the Ad',
			description:
				'Campaigns built with matched landing pages convert at significantly higher rates than campaigns sending all traffic to a homepage or generic service page.',
		},
		{
			title: 'Budget Validated Before Scaling',
			description:
				'A test-and-scale approach confirms the funnel works at low spend before committing larger budgets, avoiding the common mistake of scaling spend on a leaky system.',
		},
		{
			title: 'Transparent Performance Reporting',
			description:
				'Monthly reports covering spend, clicks, cost per conversion, and ROAS by campaign and ad set so you can see exactly where budget is performing and where it is not.',
		},
		{
			title: 'Retargeting Captures Missed Opportunities',
			description:
				'Most visitors do not convert on first visit. Retargeting campaigns re-engage warm audiences at a lower cost per conversion than prospecting campaigns targeting new users.',
		},
	],

	faqs: [
		{
			q: 'What is a realistic cost per lead from Google or Meta ads?',
			a: 'This varies significantly by industry, competition, and conversion funnel quality. B2B professional services on LinkedIn might cost £80 to £200 per qualified lead. E-commerce acquisition on Meta might cost £10 to £40 per purchase. We give an estimated range during scoping based on benchmark data for your industry, then refine it based on actual campaign data from your first 30 days of spend.',
		},
		{
			q: 'How do you handle landing pages if we do not have one for each campaign?',
			a: 'We include a landing page assessment in every campaign setup. If your existing pages are not matched to the ad content or are not conversion-optimised, we either provide briefs for your development team to build from or implement dedicated pages as part of the engagement.',
		},
		{
			q: 'How much budget do you recommend starting with?',
			a: 'For Google Search campaigns, a minimum of £1,500 to £2,000 per month is needed to generate sufficient data to optimise. Meta Ads can start effectively from £1,000 per month on a focused objective. LinkedIn requires higher budgets due to higher cost-per-click — typically £3,000 per month minimum for B2B lead generation. These are starting points for testing, not recommended scale budgets.',
		},
		{
			q: 'Do you charge a percentage of ad spend or a fixed management fee?',
			a: 'We charge a fixed monthly management fee rather than a percentage of ad spend. This removes the incentive to increase your spend beyond what is justified by performance.',
		},
	],
	answerSummary:
		'UK and India businesses spending on ads that produce clicks but not conversions get campaign management with properly configured tracking, matched landing pages, audience targeting built on customer data, and a test-and-scale approach that validates the funnel before scaling budget.',
};

export default function PaidAdvertisingPage() {
	return <SubservicePageLayout data={data} />;
}
