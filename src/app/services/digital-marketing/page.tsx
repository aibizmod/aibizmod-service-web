import type { Metadata } from 'next';
import ServicePageLayout, {
	type ServicePageData,
	type ServiceCard,
} from '@/components/ServicePageLayout';
import TechStackCarousel, {
	DIGITAL_MARKETING_ROW1,
	DIGITAL_MARKETING_ROW2,
} from '@/components/ui/tech-stack-carousel';

export const metadata: Metadata = {
	title: 'Digital Marketing Services | SEO, GEO & Paid Ads | aibizmod',
	description:
		'SEO, GEO, paid advertising, social media, email marketing, and analytics services that generate measurable leads and grow your online presence in UK and India.',
	keywords: [
		'digital marketing services',
		'seo services uk',
		'geo optimization',
		'generative engine optimization',
		'ai seo services',
		'digital marketing',
		'digital marketing agency',
		'SEO services',
		'GA4 setup',
		'Looker Studio',
		'technical SEO',
		'ppc management',
		'google ads agency',
	],
	alternates: { canonical: 'https://aibizmod.com/services/digital-marketing' },
	openGraph: {
		title: 'Digital Marketing Services | aibizmod',
		description:
			'SEO, GEO, paid advertising, social media, email marketing, and analytics services that generate measurable leads and grow your online presence in UK and India.',
		url: '/services/digital-marketing',
	},
};

const data: ServicePageData = {
	name: 'Digital Marketing',
	tagline:
		'For businesses in the UK, USA, and internationally that need accurate measurement before spending on campaigns, we set up tracking plans, perform technical search audits, build Looker Studio dashboards, and map keywords for paid and organic campaigns. You receive clear attribution data so every marketing decision is based on what is actually working.',
	heroBullets: [
		'For businesses that need accurate measurement before spending on campaigns',
		'Tracking plans, technical search audits, Looker Studio dashboards, and keyword maps for paid and organic campaigns',
		'Clear attribution data so every marketing decision is based on what is actually working',
		'Serving clients in the UK, USA, and internationally',
	],
	slug: 'digital-marketing',
	iconColor: 'text-emerald-600',

	overview: {
		paragraphs: [
			"A lot of digital marketing spend goes in before anyone has checked whether the tracking actually works. Tags fire on the wrong pages, form submissions don't register as conversions, and the reporting dashboard shows sessions instead of the leads that matter. Before campaigns scale, those foundations need to be solid. The work here covers auditing what's already set up, configuring GA4 and Google Tag Manager correctly, fixing Search Console errors that stop pages from being indexed, and building Looker Studio dashboards that show what's actually happening rather than what looks good in a weekly report.",
		],
		benefits: [
			'Accurate Google Analytics Attribution',
			'Fixed Search Console Crawl Indexing Errors',
			'Custom Conversion Tracking Configuration',
			'Competitor Search Term Comparisons',
			'Unified Dashboards in Looker Studio',
			'Structured Paid Campaign Frameworks',
		],
	},

	features: [
		{
			icon: 'target',
			title: 'Tracking Plan',
			desc: 'We map out Google Tag Manager custom variables, tags, triggers, and datalayers to track specific clicks, form submissions, and purchases.',
		},
		{
			icon: 'search',
			title: 'Audit Report',
			desc: 'We run a technical review of Google Search Console and crawling tools to identify broken page links, metadata gaps, and indexing issues.',
		},
		{
			icon: 'lineChart',
			title: 'Reporting Dashboard',
			desc: 'We build custom Looker Studio dashboards connecting GA4, Google Search Console, and paid ad platforms into a single view.',
		},
		{
			icon: 'layers',
			title: 'Campaign Structure',
			desc: 'We compile search campaign ad groups, write targeted text ads, set up keyword matches, and configure bid limits.',
		},
		{
			icon: 'globe',
			title: 'SEO Recommendations',
			desc: 'We write specific recommendations for page headings, URL routing, site loading speed optimizations, and JSON-LD structured schemas.',
		},
		{
			icon: 'mail',
			title: 'Conversion Tracking',
			desc: 'We configure conversion parameters in Google Ads, Meta Pixel, and Google Analytics 4 to track outbound responses.',
		},
	],

	process: [
		{
			icon: 'search',
			title: 'Analytics & SEO Audit',
			desc: 'We review your existing GA4 tags, Search Console errors, and current search visibility to document technical issues.',
		},
		{
			icon: 'target',
			title: 'Tracking & Campaign Mapping',
			desc: 'We design a spreadsheet detailing your keyword map, Looker Studio layout, and GTM tracking plan.',
		},
		{
			icon: 'code2',
			title: 'Implementation',
			desc: 'We set up tracking tags, build dashboards in Looker Studio, fix Search Console sitemap issues, and structure paid ad groups.',
		},
		{
			icon: 'lineChart',
			title: 'Review & Verification',
			desc: 'We run test conversions to verify that GA4 and Google Ads capture transaction events correctly.',
		},
	],

	techStack: [],

	faqs: [
		{
			q: 'What deliverables do we receive from a digital marketing setup?',
			a: 'You receive ownership of custom Looker Studio dashboards, configured Google Tag Manager and GA4 accounts, a documented tracking plan spreadsheet, a Search Console audit report PDF, and your live search campaign structure files.',
		},
		{
			q: 'Do you buy ad space directly on our behalf?',
			a: 'No. We configure and manage the campaigns directly within your own Google Ads or Meta developer accounts. You register your payment details with the platforms directly, so you pay only for direct click cost with no markups from us.',
		},
		{
			q: 'Why is Google Search Console auditing important?',
			a: "Search Console is the direct link between Google's crawling engine and your website. Auditing identifies errors like slow loading pages, broken redirection paths, missing canonical links, and formatting bugs that block Google from index listing.",
		},
		{
			q: 'How do you verify that conversion tracking is functioning correctly?',
			a: 'We use Tag Assistant and browser development consoles to run real-time transaction simulations on your staging website. We verify that specific tag headers fire and that the correct transaction values are received in GA4 and ad dashboards.',
		},
	],
	answerSummary:
		'Digital marketing services for UK and India-based businesses. We deliver SEO, generative engine optimisation, paid advertising, email marketing, and analytics that generate measurable leads and grow your online presence.',
};

const serviceCards: ServiceCard[] = [
	{
		title: 'Search Marketing',
		image:
			'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&q=80&auto=format&fit=crop',
		bullets: ['SEO', 'GEO', 'Local SEO', 'Technical SEO'],
		href: '/services/digital-marketing/search-marketing',
	},
	{
		title: 'Paid Advertising',
		image:
			'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80&auto=format&fit=crop',
		bullets: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'PPC Management'],
		href: '/services/digital-marketing/paid-advertising',
	},
	{
		title: 'Social Media Marketing',
		image:
			'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'Social Media Management',
			'Content Creation',
			'Influencer Marketing',
		],
		href: '/services/digital-marketing/social-media-marketing',
	},
	{
		title: 'Brand Content',
		image:
			'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'Content Marketing',
			'Blog Writing',
			'Copywriting',
			'Case Studies',
		],
		href: '/services/digital-marketing/brand-content',
	},
	{
		title: 'Email & Lifecycle Marketing',
		image:
			'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'Email Campaigns',
			'Marketing Automation',
			'Lead Nurturing',
			'Customer Retention',
		],
		href: '/services/digital-marketing/email-lifecycle-marketing',
	},
	{
		title: 'Performance Insights',
		image:
			'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=800&q=80&auto=format&fit=crop',
		bullets: ['Analytics', 'Conversion Optimization', 'Funnel Analysis'],
		href: '/services/digital-marketing/performance-insights',
	},
];

export default function DigitalMarketingPage() {
	return (
		<ServicePageLayout
			data={data}
			techStackFooter={
				<TechStackCarousel
					row1={DIGITAL_MARKETING_ROW1}
					row2={DIGITAL_MARKETING_ROW2}
				/>
			}
			serviceCards={serviceCards}
		/>
	);
}
