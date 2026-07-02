import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Email Marketing & Marketing Automation Services | aibizmod',
	description:
		'Email campaigns, marketing automation, lead nurturing, and customer retention flows built in Klaviyo, HubSpot, and ActiveCampaign — that move prospects to purchase.',
	keywords: [
		'email marketing',
		'marketing automation',
		'email campaigns',
		'lifecycle marketing',
		'lead nurturing',
		'customer retention',
		'email automation',
		'email segmentation',
		'nurture sequences',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/digital-marketing/email-lifecycle-marketing',
	},
	openGraph: {
		title: 'Email & Lifecycle Marketing | Marketing Automation | aibizmod',
		description:
			'Email campaigns and marketing automation that move prospects through the buying process and keep customers coming back.',
		url: '/services/digital-marketing/email-lifecycle-marketing',
	},
};

const data: SubservicePageData = {
	name: 'Email & Lifecycle Marketing',
	parentName: 'Digital Marketing',
	parentSlug: 'digital-marketing',
	slug: 'email-lifecycle-marketing',
	tagline:
		'Email campaigns, marketing automation, lead nurturing, and customer retention flows that move prospects through the buying process and keep customers coming back — built around your actual customer lifecycle, not a generic template.',
	heroImage:
		'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Most businesses collect email subscribers and leads but do not have a structured system for what happens next. New leads receive one follow-up and then go silent. Existing customers receive only broadcast promotional emails regardless of where they are in their lifecycle. The email list grows but the revenue from it does not grow proportionally because there is no automation connecting the list to a defined customer journey.',
		challengePoints: [
			'New leads receiving no structured follow-up sequence after initial contact',
			'Broadcast email campaigns sent to the entire list regardless of customer status or history',
			'No post-purchase sequence to support retention and repeat purchases',
			'Email platform underutilised with automations not configured despite the platform supporting them',
		],
		solution:
			'We map your customer lifecycle, identify the trigger points where automated communication adds value, and build the sequences that move people through each stage. Every automation has a clear objective, a defined audience segment, and tracked performance metrics.',
		solutionPoints: [
			'Lifecycle stage mapping from first-touch to long-term customer with automation triggers at each transition',
			'Lead nurturing sequences for new subscribers and enquiries at different stages of consideration',
			'Post-purchase flows covering onboarding, engagement, retention, and reactivation',
			"Segmented campaign strategy so every send is relevant to the recipient's current stage",
		],
	},

	capabilities: [
		{
			icon: 'mail',
			title: 'Email Platform Setup and Migration',
			description:
				'Set up or migrate Klaviyo, Mailchimp, HubSpot Email, or ActiveCampaign with list structure, segmentation, and integration with your CRM and e-commerce platform.',
			image: '/services/digital-marketing/email-lifecycle-marketing-email-platform-setup-and-migration.jpg',
			imageAlt: 'Digital Marketing Email Platform Setup and Migration capability illustration.',
		},
		{
			icon: 'workflow',
			title: 'Marketing Automation Build',
			description:
				'Build trigger-based automation flows for welcome sequences, lead nurturing, onboarding, re-engagement, and post-purchase communications across your customer lifecycle.',
			image: '/services/digital-marketing/email-lifecycle-marketing-marketing-automation-build.jpg',
			imageAlt: 'Digital Marketing Marketing Automation Build capability illustration.',
		},
		{
			icon: 'users',
			title: 'Lead Nurturing Sequences',
			description:
				'Develop multi-stage email sequences that educate prospects and build purchase confidence from initial enquiry through to conversion, timed to the length of your typical buying process.',
			image: '/services/digital-marketing/email-lifecycle-marketing-lead-nurturing-sequences.jpg',
			imageAlt: 'Digital Marketing Lead Nurturing Sequences capability illustration.',
		},
		{
			icon: 'users',
			title: 'Retention and Loyalty Campaigns',
			description:
				'Plan and execute campaigns targeting existing customers at key lifecycle points — post-purchase, reorder windows, loyalty milestones, and risk-of-lapse triggers.',
			image: '/services/digital-marketing/email-lifecycle-marketing-retention-and-loyalty-campaigns.jpg',
			imageAlt: 'Digital Marketing Retention and Loyalty Campaigns capability illustration.',
		},
		{
			icon: 'pencil',
			title: 'Email Campaign Creation',
			description:
				'Copywriting, design, and build of individual campaign emails with audience segmentation, subject line testing, and send-time optimisation.',
			image: '/services/digital-marketing/email-lifecycle-marketing-email-campaign-creation.jpg',
			imageAlt: 'Digital Marketing Email Campaign Creation capability illustration.',
		},
		{
			icon: 'lineChart',
			title: 'Email Performance Reporting',
			description:
				'Reporting covering open rate, click rate, conversion rate, revenue attribution, list growth, and unsubscribe trends with actionable recommendations from each report.',
			image: '/services/digital-marketing/email-lifecycle-marketing-email-performance-reporting.jpg',
			imageAlt: 'Digital Marketing Email Performance Reporting capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'E-commerce',
			title: 'Post-Purchase Retention Sequence for an Online Retailer',
			description:
				'An online retailer built a six-email post-purchase sequence covering delivery confirmation, product tips, a review request, a repurchase offer at the expected reorder window, and a loyalty programme invitation.',
		},
		{
			industry: 'SaaS',
			title: 'Trial Onboarding Automation',
			description:
				'A SaaS company built a 14-day trial onboarding sequence triggered by sign-up, with emails tied to feature adoption milestones and a sales handoff trigger for high-engagement users.',
		},
		{
			industry: 'Professional Services',
			title: 'Lead Nurturing for a Long Buying Cycle',
			description:
				'A consulting firm built a 90-day nurturing sequence for inbound leads, delivering relevant content at intervals matched to their typical sales cycle and triggering a CRM task when engagement crossed a threshold.',
		},
		{
			industry: 'Education',
			title: 'Course Launch Email Sequence',
			description:
				'An online education provider built a launch sequence for a new course covering early access, social proof, FAQ, and urgency closes, driving 60 percent of course enrolments from the email channel.',
		},
		{
			industry: 'Retail',
			title: 'Win-Back Campaign for Lapsed Customers',
			description:
				'A retailer segmented customers who had not purchased in 180 days and ran a four-email win-back campaign with a tiered incentive, recovering 8 percent of the lapsed segment.',
		},
		{
			industry: 'Hospitality',
			title: 'Pre-Arrival and Post-Stay Email Programme',
			description:
				'A hotel group built automated sequences triggered by booking confirmation and checkout, covering pre-arrival upsells, check-in instructions, and a post-stay review request.',
		},
	],

	technologies: [
		'Klaviyo',
		'Mailchimp',
		'HubSpot',
		'ActiveCampaign',
		'SendGrid',
		'Segment',
		'Zapier',
		'Shopify',
		'WooCommerce',
	],

	benefits: [
		{
			title: 'Revenue from the List You Already Have',
			description:
				'Structured automation converts more of your existing subscribers and leads than broadcast campaigns alone, without requiring more acquisition spend.',
		},
		{
			title: 'Relevant Communication at Every Stage',
			description:
				'Segmented, lifecycle-triggered emails are more relevant to recipients than batch-and-blast campaigns, producing higher engagement rates and lower unsubscribe rates.',
		},
		{
			title: 'Lead Nurturing Without Manual Follow-Up',
			description:
				'Automated sequences keep leads warm through a long buying cycle without relying on sales reps to manually follow up at the right intervals.',
		},
		{
			title: 'Post-Purchase Revenue Without Additional Acquisition Cost',
			description:
				'Retention and reorder automations drive repeat purchases from existing customers at a fraction of the cost of acquiring new ones.',
		},
		{
			title: 'Scalable as Your List Grows',
			description:
				'Automation infrastructure handles increased send volume, more complex segmentation, and additional lifecycle stages as your audience grows — without proportional manual effort.',
		},
		{
			title: 'Measurable Revenue Attribution',
			description:
				'Email platforms like Klaviyo provide direct revenue attribution per automation and campaign, making it straightforward to evaluate the return on email programme investment.',
		},
	],

	faqs: [
		{
			q: 'Which email platform do you recommend?',
			a: 'For e-commerce, Klaviyo is the strongest choice due to deep Shopify and WooCommerce integration and revenue attribution. For B2B businesses, HubSpot or ActiveCampaign offer better CRM integration and sales handoff workflows. Mailchimp is a cost-effective option for simpler needs. We recommend based on your existing tech stack and the complexity of automation you need.',
		},
		{
			q: 'How many emails should a lead nurturing sequence have?',
			a: 'That depends on how long your typical buying process takes. B2B services with a three to six month sales cycle benefit from a 90-day sequence with 8 to 12 emails. E-commerce businesses converting in days need much shorter, higher-urgency sequences. We design sequence length based on your actual conversion data, not arbitrary best practice numbers.',
		},
		{
			q: 'Can you migrate our existing email lists without deliverability issues?',
			a: 'Yes, with care. Migrating a cold or aged list to a new platform requires a warm-up process to establish sender reputation. We handle domain authentication (DKIM, SPF, DMARC), list cleaning to remove invalid addresses, and a staged sending plan to build deliverability before sending to the full list.',
		},
		{
			q: 'How do you measure the success of lifecycle automations?',
			a: 'We track open rate, click rate, and conversion rate per automation step, plus the primary business metric each automation is designed to move — trial-to-paid conversion for an onboarding sequence, repeat purchase rate for a retention flow, recovery rate for a win-back campaign. We include these in monthly reports alongside recommendations for improving underperforming steps.',
		},
	],
	answerSummary:
		'UK and India businesses collecting subscribers but sending only broadcast campaigns get lifecycle-stage-mapped automation flows including lead nurturing, post-purchase sequences, retention campaigns, and segmented strategies that generate revenue from the list they already have.',
};

export default function EmailLifecycleMarketingPage() {
	return <SubservicePageLayout data={data} />;
}
