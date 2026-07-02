import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Social Media Marketing & Management Services | aibizmod',
	description:
		'Social media management, content creation, and influencer marketing across LinkedIn, Instagram, Facebook, and X — strategy and execution handled end to end.',
	keywords: [
		'social media marketing',
		'social media management',
		'social strategy',
		'social media services',
		'Instagram marketing',
		'LinkedIn marketing',
		'Facebook marketing',
		'influencer marketing',
		'community management',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/digital-marketing/social-media-marketing',
	},
	openGraph: {
		title: 'Social Media Marketing | Strategy & Management | aibizmod',
		description:
			'Social media management, content creation, and strategies that build a credible presence on platforms your audience uses.',
		url: '/services/digital-marketing/social-media-marketing',
	},
};

const data: SubservicePageData = {
	name: 'Social Media Marketing',
	parentName: 'Digital Marketing',
	parentSlug: 'digital-marketing',
	slug: 'social-media-marketing',
	tagline:
		'Social media management, content creation, and influencer marketing strategies that build a credible, consistent presence on the platforms your audience actually uses — tied to business objectives rather than follower count.',
	heroImage:
		'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Most business social media accounts are inconsistent — posting activity drops when the team is busy, content is reactive rather than strategic, and the connection between social activity and business outcomes is unclear. Engagement metrics are tracked but there is no line from social content to qualified pipeline or revenue. The channel absorbs time without producing a measurable return.',
		challengePoints: [
			'Inconsistent posting frequency eroding audience trust and algorithmic reach',
			'Content strategy absent, so posts are reactive rather than tied to a campaign or objective',
			'No measurement framework connecting social activity to actual business outcomes',
			'Brand voice inconsistent across platforms and between team members posting content',
		],
		solution:
			'We build a content calendar tied to your marketing objectives, produce the creative assets needed to execute it, and manage the publishing and community response across your active platforms. Performance is reported against metrics that connect social activity to traffic, leads, or revenue rather than vanity metrics.',
		solutionPoints: [
			'Content calendar built around your marketing calendar, product launches, and seasonal moments',
			'Creative production including copywriting, graphics, and short-form video',
			'Community management covering comment responses and inbound messages',
			'Monthly reporting on reach, engagement, referral traffic, and lead attribution',
		],
	},

	capabilities: [
		{
			icon: 'pencil',
			title: 'Social Media Strategy',
			description:
				'Define the platform mix, posting frequency, content pillars, and tone of voice that fits your audience and business goals, with a documented strategy document as the foundation.',
			image: '/services/digital-marketing/social-media-marketing-social-media-strategy.jpg',
			imageAlt: 'Digital Marketing Social Media Strategy capability illustration.',
		},
		{
			icon: 'layers',
			title: 'Content Creation',
			description:
				'Copywriting, graphic design, and short-form video production for your social channels, maintained at a consistent quality and brand voice across every post.',
			image: '/services/digital-marketing/social-media-marketing-content-creation.jpg',
			imageAlt: 'Digital Marketing Content Creation capability illustration.',
		},
		{
			icon: 'clock',
			title: 'Content Calendar Management',
			description:
				'Plan and schedule content across platforms with a rolling monthly calendar aligned to your marketing campaigns, product releases, and promotional periods.',
			image: '/services/digital-marketing/social-media-marketing-content-calendar-management.jpg',
			imageAlt: 'Digital Marketing Content Calendar Management capability illustration.',
		},
		{
			icon: 'messageSquare',
			title: 'Community Management',
			description:
				'Monitor and respond to comments, messages, and mentions across platforms to maintain an active, responsive presence that builds audience trust.',
			image: '/services/digital-marketing/social-media-marketing-community-management.jpg',
			imageAlt: 'Digital Marketing Community Management capability illustration.',
		},
		{
			icon: 'users',
			title: 'Influencer Marketing',
			description:
				'Identify, brief, and manage influencer partnerships matched to your audience, with deliverable agreements, content review, and performance tracking.',
			image: '/services/digital-marketing/social-media-marketing-influencer-marketing.jpg',
			imageAlt: 'Digital Marketing Influencer Marketing capability illustration.',
		},
		{
			icon: 'lineChart',
			title: 'Social Analytics and Reporting',
			description:
				'Monthly performance reports covering organic reach, engagement rate, referral traffic from social, and lead attribution where trackable — linked to business outcomes.',
			image: '/services/digital-marketing/social-media-marketing-social-analytics-and-reporting.jpg',
			imageAlt: 'Digital Marketing Social Analytics and Reporting capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Retail',
			title: 'Instagram Content Programme for a Fashion Brand',
			description:
				'A fashion retailer needed a consistent Instagram presence after internal content production became unreliable. We took over content creation and community management, stabilising posting frequency and improving engagement rate.',
		},
		{
			industry: 'Professional Services',
			title: 'LinkedIn Content Strategy for a Consulting Firm',
			description:
				'A management consulting firm used LinkedIn to build thought leadership content, with articles and posts authored in the voice of their senior consultants and published on a consistent weekly schedule.',
		},
		{
			industry: 'Food and Beverage',
			title: 'Influencer Campaign for a New Product Launch',
			description:
				'A food brand partnered with micro-influencers in the health and wellness space to launch a new product line, generating trial reach at a fraction of the cost of equivalent paid advertising.',
		},
		{
			industry: 'Hospitality',
			title: 'Multi-Platform Social Management for a Hotel Group',
			description:
				'A hotel group needed consistent content across Instagram, Facebook, and TikTok. We built a content system where a single shoot produced assets optimised for each platform.',
		},
		{
			industry: 'SaaS',
			title: 'LinkedIn Thought Leadership for a B2B Product',
			description:
				'A SaaS company used LinkedIn to build an audience of their target buyers through educational content about the problem their product solves, generating inbound enquiries over a 12-month programme.',
		},
		{
			industry: 'Fitness',
			title: 'Community Management for a Fitness Brand',
			description:
				"A fitness brand's social following was large but disengaged. A structured community management programme improved comment response rates and reactivated dormant audience engagement.",
		},
	],

	technologies: [
		'Meta Business Suite',
		'LinkedIn Campaign Manager',
		'Buffer',
		'Hootsuite',
		'Canva',
		'Adobe Premiere',
		'Sprout Social',
		'Later',
		'Capcut',
	],

	benefits: [
		{
			title: 'Consistent Brand Presence',
			description:
				'A managed content calendar means your social channels maintain a consistent posting schedule and visual identity regardless of how busy the internal team is.',
		},
		{
			title: 'Content Tied to Business Goals',
			description:
				'Content pillars and campaign alignment mean social activity is contributing to marketing objectives rather than filling space with unconnected posts.',
		},
		{
			title: 'Engaged Rather Than Passive Audience',
			description:
				'Community management turns a broadcast channel into a two-way interaction, building genuine audience relationships rather than a follower count that does not respond.',
		},
		{
			title: 'Professional Creative Quality',
			description:
				'Consistent graphic design, copywriting, and video production quality distinguishes your content from competitor accounts operating with inconsistent or low-quality production.',
		},
		{
			title: 'Influencer Reach at Lower Cost',
			description:
				'Well-briefed micro-influencer partnerships reach highly relevant audiences at a lower cost per impression than equivalent paid advertising on the same platforms.',
		},
		{
			title: 'Performance Connected to Business Outcomes',
			description:
				"Reporting that tracks referral traffic from social, lead form submissions from social campaigns, and conversion events gives a clearer picture of the channel's business contribution.",
		},
	],

	faqs: [
		{
			q: 'Which social platforms should we be active on?',
			a: 'That depends on where your audience actually spends time and what you are trying to achieve. B2B professional services typically prioritise LinkedIn. Consumer brands with visual products prioritise Instagram and TikTok. Local service businesses benefit from consistent Facebook and Google Business activity. Being mediocre on five platforms is worse than being strong on two. We recommend a platform mix during strategy development based on your audience and objectives.',
		},
		{
			q: 'How often should we be posting?',
			a: 'Consistency matters more than frequency for most business accounts. Three to five posts per week on the primary platform is usually a better foundation than attempting daily posts and dropping to one per week when the team is busy. We set a posting cadence that is sustainable based on your content production resources.',
		},
		{
			q: 'How do you measure social media ROI?',
			a: 'We use a combination of platform metrics (reach, engagement) and downstream attribution (referral traffic from social, leads with social last-touch attribution, revenue from social-sourced contacts in the CRM). We are transparent about what is and is not attributable, since some brand-building value from social is real but not directly trackable to a conversion.',
		},
		{
			q: 'Do you manage influencer relationships directly?',
			a: 'Yes. We handle influencer identification, outreach, negotiation, briefing, content review, and performance reporting. You approve the influencer shortlist and content brief before anything is confirmed. We recommend influencers based on audience quality metrics, not follower count — engagement rate and audience fit matter more than size.',
		},
	],
	answerSummary:
		'UK and India businesses with inconsistent social media presence and no link between activity and outcomes get content calendars, creative production, community management, and reporting that connects social activity to traffic, leads, or revenue.',
};

export default function SocialMediaMarketingPage() {
	return <SubservicePageLayout data={data} />;
}
