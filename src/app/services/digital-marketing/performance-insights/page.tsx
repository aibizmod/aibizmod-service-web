import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Analytics & Conversion Optimisation Services | aibizmod',
	description:
		'GA4, GTM, Looker Studio, and conversion rate optimisation services that turn your marketing data into clear decisions — identifying where revenue is being lost.',
	keywords: [
		'analytics services',
		'GA4 setup',
		'Google Analytics',
		'tracking implementation',
		'dashboard creation',
		'Looker Studio',
		'performance analytics',
		'conversion tracking',
		'data analytics',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/digital-marketing/performance-insights',
	},
	openGraph: {
		title: 'Analytics & Performance | GA4 & Dashboards | aibizmod',
		description:
			'Analytics and performance measurement services with GA4 setup and Looker Studio dashboards.',
		url: '/services/digital-marketing/performance-insights',
	},
};

const data: SubservicePageData = {
	name: 'Performance Insights',
	parentName: 'Digital Marketing',
	parentSlug: 'digital-marketing',
	slug: 'performance-insights',
	tagline:
		'Analytics, conversion optimisation, and funnel analysis services that turn your marketing data into clear decisions — identifying exactly where you are losing revenue and what to fix first.',
	heroImage:
		'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Most businesses have analytics installed but do not have analytics that work. Tracking is misconfigured, conversions are not set up, and the data in dashboards does not match the numbers from other systems. Decision-making defaults back to gut instinct because no one trusts the data. Meanwhile, conversion leaks in the funnel go unidentified because no one has a clear picture of where users are dropping off.',
		challengePoints: [
			'Analytics data not matching CRM or sales data because tracking is misconfigured',
			'Conversion events not set up, so there is no reliable data on what marketing activity is driving results',
			'No funnel analysis, so drop-off points between traffic and conversion are unknown',
			'Marketing decisions based on activity metrics like clicks and sessions rather than outcome metrics',
		],
		solution:
			'We audit your analytics implementation, fix tracking gaps, and build the reporting layer that connects marketing activity to business outcomes. Then we use that data to run conversion optimisation — identifying the points in your funnel where improvement has the most impact and testing changes systematically.',
		solutionPoints: [
			'Analytics audit covering GA4 setup, event tracking, and conversion configuration',
			'Google Tag Manager implementation for consistent, maintainable tracking across the funnel',
			'Funnel analysis identifying the highest-impact drop-off points by stage and audience segment',
			'Conversion rate optimisation using heatmap data, session recordings, and A/B testing',
		],
	},

	capabilities: [
		{
			icon: 'settings',
			title: 'Analytics Audit and Implementation',
			description:
				'Audit your GA4 and Tag Manager setup, identify tracking gaps and misconfiguration, and implement the corrections needed for reliable data.',
			image: '/services/digital-marketing/performance-insights-analytics-audit-and-implementation.jpg',
			imageAlt: 'Digital Marketing Analytics Audit and Implementation capability illustration.',
		},
		{
			icon: 'lineChart',
			title: 'Conversion Tracking Setup',
			description:
				'Configure goal and conversion events covering form submissions, purchases, sign-ups, and phone calls so every marketing channel is attributed against real business outcomes.',
			image: '/services/digital-marketing/performance-insights-conversion-tracking-setup.jpg',
			imageAlt: 'Digital Marketing Conversion Tracking Setup capability illustration.',
		},
		{
			icon: 'activity',
			title: 'Funnel Analysis',
			description:
				'Map the stages of your conversion funnel from traffic source through to purchase and identify where users are dropping out, with segmentation by channel, device, and audience.',
			image: '/services/digital-marketing/performance-insights-funnel-analysis.jpg',
			imageAlt: 'Digital Marketing Funnel Analysis capability illustration.',
		},
		{
			icon: 'zap',
			title: 'Conversion Rate Optimisation',
			description:
				'Use heatmap data, session recordings, and A/B testing to identify and validate changes to landing pages, checkout flows, and key conversion points.',
			image: '/services/digital-marketing/performance-insights-conversion-rate-optimisation.jpg',
			imageAlt: 'Digital Marketing Conversion Rate Optimisation capability illustration.',
		},
		{
			icon: 'barChart',
			title: 'Marketing Dashboards',
			description:
				'Build Looker Studio dashboards connecting your paid, organic, email, and social channel performance in a single view, updated automatically from connected data sources.',
			image: '/services/digital-marketing/performance-insights-marketing-dashboards.jpg',
			imageAlt: 'Digital Marketing Marketing Dashboards capability illustration.',
		},
		{
			icon: 'target',
			title: 'Attribution Modelling',
			description:
				'Review how marketing touchpoints are credited for conversions, moving beyond last-click attribution to provide a more accurate picture of which channels are contributing.',
			image: '/services/digital-marketing/performance-insights-attribution-modelling.jpg',
			imageAlt: 'Digital Marketing Attribution Modelling capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'E-commerce',
			title: 'Analytics Audit and Checkout Funnel Fix',
			description:
				'An online retailer had a 70 percent checkout abandonment rate but no data on where users were dropping. A funnel analysis combined with session recordings identified a confusing payment step, which was fixed and A/B tested against the control.',
		},
		{
			industry: 'SaaS',
			title: 'Conversion Tracking for a Free Trial Funnel',
			description:
				'A SaaS company had no reliable data on trial-to-paid conversion by traffic source. We set up proper conversion events in GA4 and Google Ads, revealing that one campaign accounted for 60 percent of trials but 20 percent of paid conversions.',
		},
		{
			industry: 'Professional Services',
			title: 'Lead Form Optimisation',
			description:
				'A professional services firm was generating significant traffic to a contact page with a low submission rate. Heatmap analysis revealed users were abandoning a 12-field form. A reduced three-field version A/B tested at double the conversion rate.',
		},
		{
			industry: 'Hospitality',
			title: 'Multi-Channel Attribution Dashboard',
			description:
				'A hotel group needed to understand which marketing channels were driving direct bookings. We built a Looker Studio dashboard connecting GA4, Google Ads, and Meta Ads data to booking confirmation events.',
		},
		{
			industry: 'Finance',
			title: 'Data Quality Audit for a Financial Services Site',
			description:
				'A financial services company found their GA4 data reporting 40 percent more sessions than their server logs. An audit identified double-counting from a misconfigured tag, correcting the data that budget decisions had been based on.',
		},
		{
			industry: 'Education',
			title: 'Application Funnel Analysis for a University',
			description:
				'A university wanted to improve the proportion of prospective students who completed their online application form. Funnel analysis identified a specific form stage with a 55 percent drop-off rate that had not been visible in aggregate data.',
		},
	],

	technologies: [
		'Google Analytics 4',
		'Google Tag Manager',
		'Looker Studio',
		'Hotjar',
		'Microsoft Clarity',
		'Segment',
		'BigQuery',
		'Optimizely',
		'VWO',
		'Google Search Console',
	],

	benefits: [
		{
			title: 'Data You Can Trust',
			description:
				'Correctly configured analytics produces numbers that match across systems, so decisions are based on accurate data rather than figures that contradict each other in every meeting.',
		},
		{
			title: 'Visible Conversion Leaks',
			description:
				'Funnel analysis makes drop-off points visible and quantifiable, so optimisation effort goes to the stages with the highest impact on revenue rather than arbitrary improvements.',
		},
		{
			title: 'Marketing Spend Justified by Outcomes',
			description:
				'Conversion tracking connected to real business events lets you attribute revenue to specific campaigns and channels, making it defensible to continue, reduce, or reallocate spend.',
		},
		{
			title: 'Faster Improvement Cycles',
			description:
				'A/B testing infrastructure means changes are validated before full deployment, building a record of improvements rather than reverting to debate about what might work.',
		},
		{
			title: 'Cross-Channel View of Performance',
			description:
				'A unified dashboard covering all channels in one place removes the need to log into multiple platforms to understand overall marketing performance.',
		},
		{
			title: 'Attribution That Reflects Reality',
			description:
				'Moving beyond last-click attribution reveals the role that upper-funnel channels play in driving conversions, preventing systematic undervaluation of brand-building activity.',
		},
	],

	faqs: [
		{
			q: 'Why does our GA4 data not match our Shopify or CRM numbers?',
			a: 'This is one of the most common analytics problems we encounter. Typical causes include ad blockers preventing GA4 from firing on some sessions, tag misconfiguration causing duplicate events, or a mismatch in how GA4 and your platform define a completed transaction. We run a systematic audit to identify the specific cause in your setup and document the expected discrepancy after fixes are applied — some level of variance between GA4 and server-side data is normal and expected.',
		},
		{
			q: 'What is the difference between conversion rate optimisation and A/B testing?',
			a: 'CRO is the overall discipline of systematically improving the percentage of users who complete a desired action. A/B testing is one tool within CRO — it compares two versions of a page or element with real traffic to determine which performs better with statistical confidence. CRO also includes heatmap and session recording analysis, user research, and qualitative insight gathering before and after tests.',
		},
		{
			q: 'How long does an analytics audit take?',
			a: 'A standard GA4 and Tag Manager audit for a business website takes one to two weeks. This covers event tracking completeness, conversion configuration, data layer implementation, cross-domain tracking if relevant, and a documented findings report with prioritised fixes.',
		},
		{
			q: 'Do we need to rebuild our analytics from scratch or can existing data be preserved?',
			a: 'Usually both are possible. For GA4, we prefer to fix the existing property rather than start fresh, so historical data is preserved. Where the existing implementation is too broken to repair efficiently, we set up a parallel clean property and document the transition date so historical and new data are clearly separated.',
		},
	],
	answerSummary:
		'UK and India marketing teams whose analytics data does not match their other systems get audits that fix tracking gaps, funnel analysis that reveals drop-off points, conversion rate optimisation, and unified dashboards connecting performance across every channel.',
};

export default function PerformanceInsightsPage() {
	return <SubservicePageLayout data={data} />;
}
