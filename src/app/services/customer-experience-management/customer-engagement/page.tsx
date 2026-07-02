import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Customer Engagement & Loyalty Programs | Omnichannel | aibizmod',
	description:
		'Customer engagement and loyalty program services. Omnichannel communication flows, WhatsApp integration, and strategies that build lasting customer relationships.',
	keywords: [
		'customer engagement',
		'loyalty programs',
		'customer retention',
		'omnichannel communication',
		'WhatsApp integration',
		'customer loyalty',
		'engagement strategies',
		'customer relationships',
		'retention programs',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/customer-experience-management/customer-engagement',
	},
	openGraph: {
		title: 'Customer Engagement | Loyalty Programs | aibizmod',
		description:
			'Loyalty programmes and omnichannel communication strategies that build lasting customer relationships.',
		url: '/services/customer-experience-management/customer-engagement',
	},
};

const data: SubservicePageData = {
	name: 'Customer Engagement',
	parentName: 'Customer Experience Management',
	parentSlug: 'customer-experience-management',
	slug: 'customer-engagement',
	tagline:
		'Loyalty programmes, omnichannel communication flows, and WhatsApp integration strategies that build lasting customer relationships across every touchpoint — without fragmenting the experience across disconnected channels.',
	heroImage:
		'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Customers interact with businesses across email, SMS, WhatsApp, social media, and in-app notifications. Most organisations handle each channel separately, with different tools, different teams, and no shared customer context. The result is customers receiving duplicate messages, irrelevant offers, and communications that do not acknowledge previous interactions. Loyalty programmes are launched without the data infrastructure to make them work.',
		challengePoints: [
			'Engagement channels operating in silos with no unified customer view across touchpoints',
			'Loyalty programmes with high registration rates and low actual engagement',
			'Promotional communications sent to the full list regardless of customer status or history',
			'No mechanism to identify and act on customers who are becoming disengaged',
		],
		solution:
			'We design engagement systems around the customer lifecycle — mapping the stages from acquisition through to advocacy, then building the communication flows, loyalty mechanics, and channel integrations that move customers through each stage with relevant, timely interactions.',
		solutionPoints: [
			'Customer lifecycle mapping so each engagement trigger is tied to a specific stage and goal',
			'Omnichannel communication flows that maintain context across email, SMS, and messaging apps',
			'WhatsApp Business API integration for transactional and promotional messaging',
			'Loyalty programme design with earn/redeem mechanics and retention campaign integration',
		],
	},

	capabilities: [
		{
			icon: 'users',
			title: 'Loyalty Programme Design',
			description:
				'Design earn-and-redeem loyalty systems with point structures, tier levels, and redemption mechanics configured to your customer purchase patterns and margins.',
			image: '/services/customer-experience-management/customer-engagement-loyalty-programme-design.jpg',
			imageAlt: 'Customer Experience Management Loyalty Programme Design capability illustration.',
		},
		{
			icon: 'messageSquare',
			title: 'WhatsApp Business API Integration',
			description:
				'Connect WhatsApp Business API for transactional notifications, order updates, and opt-in marketing campaigns with delivery tracking and opt-out management.',
			image: '/services/customer-experience-management/customer-engagement-whatsapp-business-api-integration.jpg',
			imageAlt: 'Customer Experience Management WhatsApp Business API Integration capability illustration.',
		},
		{
			icon: 'layers',
			title: 'Omnichannel Communication Setup',
			description:
				'Unify email, SMS, push notifications, and messaging apps into coordinated lifecycle flows where each channel reinforces rather than duplicates the others.',
			image: '/services/customer-experience-management/customer-engagement-omnichannel-communication-setup.jpg',
			imageAlt: 'Customer Experience Management Omnichannel Communication Setup capability illustration.',
		},
		{
			icon: 'bell',
			title: 'Re-Engagement Campaigns',
			description:
				'Build automated campaigns that identify lapsing customers from engagement signals and trigger personalised win-back sequences through the most effective channel.',
			image: '/services/customer-experience-management/customer-engagement-reengagement-campaigns.jpg',
			imageAlt: 'Customer Experience Management Re-engagement Campaigns capability illustration.',
		},
		{
			icon: 'users',
			title: 'Referral Programme Setup',
			description:
				'Design and implement referral mechanics with unique tracking links, reward triggers, and attribution reporting to turn existing customers into an acquisition channel.',
			image: '/services/customer-experience-management/customer-engagement-referral-programme-setup.jpg',
			imageAlt: 'Customer Experience Management Referral Programme Setup capability illustration.',
		},
		{
			icon: 'lineChart',
			title: 'Engagement Analytics',
			description:
				'Set up dashboards tracking open rates, click rates, redemption rates, and customer lifetime value by segment so engagement strategy decisions are evidence-based.',
			image: '/services/customer-experience-management/customer-engagement-engagement-analytics.jpg',
			imageAlt: 'Customer Experience Management Engagement Analytics capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Retail',
			title: 'Loyalty Programme for a Fashion Brand',
			description:
				'A fashion retailer launched a points-based loyalty programme integrated with their e-commerce platform, with automated tier upgrade emails and personalised reactivation offers.',
		},
		{
			industry: 'Hospitality',
			title: 'WhatsApp Booking Confirmations and Upsells',
			description:
				'A hotel group connected WhatsApp Business API to send booking confirmations, pre-arrival upsell messages, and post-stay review requests automatically.',
		},
		{
			industry: 'Fitness',
			title: 'Re-Engagement Campaign for a Gym Chain',
			description:
				'A gym operator set up automated re-engagement flows for members who had not visited in 30 days, with personalised incentive offers sent through their preferred channel.',
		},
		{
			industry: 'Food and Beverage',
			title: 'Stamp Card Loyalty App',
			description:
				'A cafe chain replaced paper stamp cards with a digital loyalty programme integrated into their ordering app, tracking visits and sending automated reward notifications.',
		},
		{
			industry: 'E-commerce',
			title: 'Post-Purchase Engagement Sequence',
			description:
				'An online retailer built a post-purchase sequence covering delivery updates, product usage tips, a review request, and a repurchase offer timed to expected reorder cycle.',
		},
		{
			industry: 'Subscription',
			title: 'Referral Programme for SaaS Product',
			description:
				'A SaaS company launched a referral programme with unique tracking links, automated reward emails on successful conversion, and a dashboard showing referral performance by user.',
		},
	],

	technologies: [
		'WhatsApp Business API',
		'Klaviyo',
		'Mailchimp',
		'LoyaltyLion',
		'Yotpo',
		'Intercom',
		'Segment',
		'Twilio',
		'HubSpot',
		'Zapier',
	],

	benefits: [
		{
			title: 'Customers Engaged at the Right Moment',
			description:
				'Lifecycle-based triggers send communications when they are most relevant — not on a broadcast schedule — increasing response rates and reducing unsubscribes.',
		},
		{
			title: 'Loyalty That Drives Repeat Revenue',
			description:
				'A well-structured loyalty programme increases purchase frequency and average order value, with measurable impact on customer lifetime value.',
		},
		{
			title: 'Channel Coordination',
			description:
				'When email, SMS, and WhatsApp are coordinated around the same customer record, each channel reinforces the others rather than causing confusion from competing messages.',
		},
		{
			title: 'Earlier Detection of Disengagement',
			description:
				'Behavioural signals like reduced open rates or purchase frequency are monitored automatically, so re-engagement campaigns can be triggered while customers are still recoverable.',
		},
		{
			title: 'Referral as a Scalable Acquisition Channel',
			description:
				'Referred customers have higher conversion rates and better retention than most paid channels. A structured referral programme turns customer satisfaction into measurable acquisition.',
		},
		{
			title: 'Measurable Engagement ROI',
			description:
				'Every engagement initiative is tracked with conversion metrics, redemption rates, and revenue attribution so you can evaluate which programmes are worth continuing.',
		},
	],

	faqs: [
		{
			q: 'What makes a loyalty programme work beyond the launch phase?',
			a: 'Loyalty programmes that maintain engagement over time have earn mechanics that feel achievable, redemption options that are actually desirable, and regular communications that remind customers of their balance and status. Programmes that launch well but fade usually fail because the earn rate is too slow, the rewards feel out of reach, or the brand stops communicating about them after the initial campaign.',
		},
		{
			q: 'Is WhatsApp suitable for marketing messages or just transactional notifications?',
			a: "WhatsApp Business API supports both. Transactional messages like order confirmations and delivery updates are straightforward to send. Marketing messages require opt-in from the customer and must follow WhatsApp's message template guidelines. When set up correctly, WhatsApp typically achieves significantly higher open rates than email for the same message type.",
		},
		{
			q: 'How do you maintain a consistent experience across multiple channels?',
			a: 'We use a single customer data platform or CRM as the source of truth, with each channel pulling from the same customer record. Automation rules prevent the same customer from receiving the same message through multiple channels simultaneously, and contact preferences are honoured across all of them.',
		},
		{
			q: 'How do you measure customer engagement ROI?',
			a: 'We track the metrics that connect engagement activity to revenue outcomes — redemption rate for loyalty rewards, conversion rate on re-engagement campaigns, referral conversion rates, and change in purchase frequency for engaged versus non-engaged segments. These are reported in dashboards built as part of the engagement system setup.',
		},
	],
	answerSummary:
		'UK and India businesses sending customers fragmented, irrelevant communications across disconnected channels get lifecycle-based loyalty programmes and omnichannel flows with WhatsApp integration that coordinate messages around a single customer record.',
};

export default function CustomerEngagementPage() {
	return <SubservicePageLayout data={data} />;
}
