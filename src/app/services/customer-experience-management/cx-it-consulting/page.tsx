import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'CX IT Consulting | Customer Experience Technology Strategy | aibizmod',
	description:
		'Customer experience IT consulting and technology advisory. Platform selection, implementation guidance, and digital transformation roadmaps.',
	keywords: [
		'CX consulting',
		'customer experience',
		'technology advisory',
		'platform selection',
		'digital transformation',
		'customer technology',
		'CX technology',
		'customer platforms',
		'strategic consulting',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/customer-experience-management/cx-it-consulting',
	},
	openGraph: {
		title: 'CX IT Consulting | Customer Technology Strategy | aibizmod',
		description:
			'Technology advisory and implementation guidance for customer experience infrastructure and digital transformation.',
		url: '/services/customer-experience-management/cx-it-consulting',
	},
};

const data: SubservicePageData = {
	name: 'CX IT Consulting',
	parentName: 'Customer Experience Management',
	parentSlug: 'customer-experience-management',
	slug: 'cx-it-consulting',
	tagline:
		'Technology advisory and implementation guidance for businesses planning or improving their customer experience infrastructure — from platform selection and integration architecture to digital transformation roadmaps.',
	heroImage:
		'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Businesses building or overhauling their CX technology stack face a complex set of decisions. Dozens of platforms claim to solve the same problem. Integrations between tools require planning before purchase, not after. Legacy systems create constraints that narrow the options. Without independent technical guidance, organisations end up with over-engineered stacks, poorly integrated tools, and implementation projects that cost significantly more than anticipated.',
		challengePoints: [
			'Vendor selection driven by marketing claims rather than technical and operational fit',
			'Purchased platforms that cannot integrate with existing systems as promised',
			'CX technology projects that expand in scope and cost without clear governance',
			'No documented technology roadmap, so CX investments are reactive rather than planned',
		],
		solution:
			'We provide independent advisory on CX platform selection, integration architecture, and implementation planning. We are not tied to any vendor, so recommendations are based on your actual requirements, existing systems, team capabilities, and budget — not on partnership incentives.',
		solutionPoints: [
			'Vendor-neutral platform assessment with scored evaluation against your specific requirements',
			'Integration architecture design before any platform purchase to identify compatibility issues',
			'Implementation roadmap with phased delivery, resource estimates, and dependency mapping',
			'Oversight during vendor implementation to protect against scope creep and missed requirements',
		],
	},

	capabilities: [
		{
			icon: 'compass',
			title: 'CX Technology Roadmapping',
			description:
				'Define a structured 12 to 24 month plan for CX technology investments, sequenced by business priority, integration complexity, and dependencies.',
			image: '/services/customer-experience-management/cx-it-consulting-cx-technology-roadmapping.jpg',
			imageAlt: 'Customer Experience Management CX Technology Roadmapping capability illustration.',
		},
		{
			icon: 'search',
			title: 'Platform Selection Advisory',
			description:
				'Evaluate CRM, helpdesk, engagement, and analytics platforms against your requirements through structured assessments, demos, and technical due diligence — independent of vendor relationships.',
			image: '/services/customer-experience-management/cx-it-consulting-platform-selection-advisory.jpg',
			imageAlt: 'Customer Experience Management Platform Selection Advisory capability illustration.',
		},
		{
			icon: 'workflow',
			title: 'Integration Architecture Design',
			description:
				'Design the data flows and integration patterns between your CRM, helpdesk, marketing, and analytics tools before implementation begins, avoiding common post-purchase surprises.',
			image: '/services/customer-experience-management/cx-it-consulting-integration-architecture-design.jpg',
			imageAlt: 'Customer Experience Management Integration Architecture Design capability illustration.',
		},
		{
			icon: 'settings',
			title: 'Digital Transformation Planning',
			description:
				'Translate business objectives into a structured technology change programme with defined phases, stakeholder requirements, success metrics, and risk assessments.',
			image: '/services/customer-experience-management/cx-it-consulting-digital-transformation-planning.jpg',
			imageAlt: 'Customer Experience Management Digital Transformation Planning capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Implementation Oversight',
			description:
				'Provide technical governance during third-party or in-house CX platform implementations to ensure delivery stays aligned with the original requirements and architecture.',
			image: '/services/customer-experience-management/cx-it-consulting-implementation-oversight.jpg',
			imageAlt: 'Customer Experience Management Implementation Oversight capability illustration.',
		},
		{
			icon: 'users',
			title: 'IT Planning for CX Teams',
			description:
				'Work with CX and IT leadership to align technology investment decisions with operational capacity, security requirements, and long-term platform strategy.',
			image: '/services/customer-experience-management/cx-it-consulting-it-planning-for-cx-teams.jpg',
			imageAlt: 'Customer Experience Management IT Planning for CX Teams capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Retail',
			title: 'CRM and Helpdesk Platform Selection',
			description:
				'A multi-channel retailer evaluated six platforms across CRM and helpdesk categories. Our structured assessment narrowed the shortlist to two, with a detailed integration architecture for the chosen stack.',
		},
		{
			industry: 'Financial Services',
			title: 'CX Technology Roadmap',
			description:
				'A financial services firm had invested in multiple CX tools that were not integrated. We produced a two-year technology roadmap consolidating their stack and sequencing integrations by operational priority.',
		},
		{
			industry: 'Healthcare',
			title: 'Digital Transformation Planning for a Hospital Group',
			description:
				'A hospital group needed to modernise patient communication and records access. We provided an independent assessment of available platforms against NHS interoperability requirements and data governance constraints.',
		},
		{
			industry: 'Professional Services',
			title: 'Implementation Oversight for Salesforce Deployment',
			description:
				'A professional services firm brought us in to oversee a Salesforce implementation being run by a third-party consultancy, identifying three significant gaps in the requirements specification before go-live.',
		},
		{
			industry: 'SaaS',
			title: 'Integration Architecture for a Growing Tech Company',
			description:
				'A scaling SaaS company was evaluating a full CX stack replacement. We designed the integration architecture across CRM, helpdesk, and analytics tools before any platform was purchased.',
		},
		{
			industry: 'Logistics',
			title: 'IT Planning for Customer Operations Team',
			description:
				"A logistics operator's customer operations team was running on a combination of spreadsheets and a legacy system. We produced a structured IT plan covering platform options, migration sequence, and resource requirements.",
		},
	],

	technologies: [
		'Salesforce',
		'HubSpot',
		'Zendesk',
		'Freshdesk',
		'AWS',
		'Azure',
		'Segment',
		'Miro',
		'Jira',
		'Confluence',
		'Zapier',
		'Make',
	],

	benefits: [
		{
			title: 'Independent Advice',
			description:
				'We are not tied to any platform vendor, so our recommendations reflect your needs rather than referral relationships. Vendor-neutral advice produces better procurement decisions.',
		},
		{
			title: 'Fewer Post-Purchase Surprises',
			description:
				'Integration architecture designed before platform purchase surfaces compatibility issues, licensing constraints, and missing connectors that would otherwise become expensive problems after contracts are signed.',
		},
		{
			title: 'Structured Investment Decisions',
			description:
				'A documented technology roadmap turns reactive CX technology spending into a planned programme with a clear rationale for sequencing and budget allocation.',
		},
		{
			title: 'Implementation Risk Reduced',
			description:
				'Independent oversight during implementation projects catches scope gaps, missed requirements, and vendor delivery issues before they reach go-live and become expensive to fix.',
		},
		{
			title: 'Alignment Between IT and CX Teams',
			description:
				'Technology decisions that affect both IT infrastructure and customer-facing operations require both perspectives. Our advisory bridges that gap, producing plans both teams can support.',
		},
		{
			title: 'Faster Platform Selection',
			description:
				'A structured evaluation with a clear scorecard and requirement set compresses platform selection from months of internal debate into a focused assessment process.',
		},
	],

	faqs: [
		{
			q: "How is your advisory different from using the platform vendor's own consultants?",
			a: 'Vendor consultants are expert in their platform and genuinely useful for configuration and implementation. They are not the right resource for platform selection because they are not independent — they will recommend their own product. We assess multiple options against your requirements and are only invested in the outcome being right for you.',
		},
		{
			q: 'What does an integration architecture assessment involve?',
			a: 'We map your planned technology stack and document the data flows between systems — what customer data needs to move where, how often, and triggered by what events. We identify integration patterns (native connector, iPaaS middleware, or custom API), flag where connectors do not exist or are limited in scope, and produce a diagram and written specification the implementation team can work from.',
		},
		{
			q: 'Do you also handle the implementation, or just the advisory?',
			a: 'We can do both. Advisory engagements focus on platform selection, architecture design, and roadmapping. Implementation engagements involve hands-on configuration, integration build, and delivery. Many clients use us for advisory first to make the right decisions, then for implementation. We can also provide independent oversight of an implementation being run by another party.',
		},
		{
			q: 'How long does a CX technology roadmap take to produce?',
			a: "A roadmap covering a mid-size business's CX technology stack typically takes three to four weeks. This includes stakeholder interviews with CX, IT, and operations leads, an audit of the current technology landscape, requirements gathering, and the written roadmap document with sequenced phases and rationale.",
		},
	],
	answerSummary:
		'UK and India organisations planning or overhauling their CX technology stack get independent, vendor-neutral advisory on platform selection, integration architecture, implementation roadmaps, and oversight to avoid costly post-purchase surprises.',
};

export default function CXITConsultingPage() {
	return <SubservicePageLayout data={data} />;
}
