import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Technology Advisory Services | Software Strategy | aibizmod',
	description:
		'Digital transformation consulting, IT planning, and technology roadmapping that connects software investment to measurable business outcomes.',
	keywords: [
		'IT consulting',
		'technology consulting',
		'IT strategy',
		'technology assessment',
		'digital transformation',
		'technology planning',
		'system architecture',
		'IT advisory services',
		'technology roadmap',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/software-development/tech-advisory-services',
	},
	openGraph: {
		title: 'IT Consulting | Technology Strategy | aibizmod',
		description:
			'Strategic IT consulting services for technology planning, architecture review, and digital transformation initiatives.',
		url: '/services/software-development/tech-advisory-services',
	},
};

const data: SubservicePageData = {
	name: 'Technology Advisory Services',
	parentName: 'Software Development',
	parentSlug: 'software-development',
	slug: 'tech-advisory-services',
	tagline:
		'Digital transformation consulting, technology roadmapping, IT planning, and solution architecture services that connect software investment to business outcomes — giving your organisation a clear plan before committing development budget.',
	heroImage:
		'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Software development investments frequently underperform because the planning before build was insufficient. Requirements were unclear, the architecture was not designed before the first sprint, or the decision to build custom rather than buy an existing product was not properly evaluated. Organisations often reach us after an expensive failed project or partway through a build that has lost direction. Good consulting before development prevents most of these outcomes.',
		challengePoints: [
			'Development project started without clear requirements, producing rework when the scope is clarified mid-build',
			'Build versus buy decision made without analysis, committing to custom development where a product would have been faster and cheaper',
			'Architecture undocumented, so each developer makes local decisions that accumulate into structural problems',
			'Technology investment made without a strategic rationale, producing tools that do not connect to business outcomes',
		],
		solution:
			'We provide the consulting layer before and during software development that most projects skip — requirements definition, build versus buy analysis, architecture design, and technology roadmapping. These are the decisions that determine whether a development investment succeeds or fails, and they are best made before the first line of code is written.',
		solutionPoints: [
			'Requirements definition producing a specification that development can build against without ambiguity',
			'Build versus buy analysis with vendor evaluation before committing to custom development',
			'Solution architecture design producing a documented architecture before build begins',
			'Technology roadmap connecting software investment to business objectives over a planning horizon',
		],
	},

	capabilities: [
		{
			icon: 'compass',
			title: 'Digital Transformation Consulting',
			description:
				'Independent assessment and advisory for digital transformation initiatives — defining the scope, approach, and success criteria for technology-driven business change.',
			image: '/services/software-development/tech-advisory-services-digital-transformation-consulting.jpg',
			imageAlt: 'Software Development Digital Transformation Consulting capability illustration.',
		},
		{
			icon: 'layers',
			title: 'Technology Roadmapping',
			description:
				'Produce multi-year technology investment roadmaps sequenced by business priority, integration dependencies, and implementation capacity.',
			image: '/services/software-development/tech-advisory-services-technology-roadmapping.jpg',
			imageAlt: 'Software Development Technology Roadmapping capability illustration.',
		},
		{
			icon: 'search',
			title: 'Build vs Buy Analysis',
			description:
				'Evaluate whether a custom build or an existing product is the right choice for a specific requirement, with structured assessment against your requirements, budget, and timeline.',
			image: '/services/software-development/tech-advisory-services-build-vs-buy-analysis.jpg',
			imageAlt: 'Software Development Build vs Buy Analysis capability illustration.',
		},
		{
			icon: 'code2',
			title: 'Solution Architecture',
			description:
				'Design the technical architecture for a planned software investment before development begins, covering component structure, data model, API design, and integration patterns.',
			image: '/services/software-development/tech-advisory-services-solution-architecture.jpg',
			imageAlt: 'Software Development Solution Architecture capability illustration.',
		},
		{
			icon: 'users',
			title: 'Requirements Definition',
			description:
				'Run structured workshops to produce clear, complete requirements that development can build against — reducing the rework that comes from ambiguous or incomplete specifications.',
			image: '/services/software-development/tech-advisory-services-requirements-definition.jpg',
			imageAlt: 'Software Development Requirements Definition capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Technical Due Diligence',
			description:
				'Conduct technical due diligence on existing software assets for acquisition, investment, or partnership decisions — covering architecture quality, technical debt, and development team capability.',
			image: '/services/software-development/tech-advisory-services-technical-due-diligence.jpg',
			imageAlt: 'Software Development Technical Due Diligence capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Professional Services',
			title: 'Technology Roadmap Before a Build Decision',
			description:
				'A professional services firm was about to commission custom software development. We produced a technology roadmap that identified two existing products covering 80 percent of the requirement at a fraction of the cost.',
		},
		{
			industry: 'Finance',
			title: 'Technical Due Diligence for an Acquisition',
			description:
				"An investor acquiring a fintech company commissioned technical due diligence on the target's software platform. Our assessment identified significant technical debt that adjusted the acquisition valuation.",
		},
		{
			industry: 'Healthcare',
			title: 'Requirements Definition for a Clinical System',
			description:
				'A healthcare organisation had a development budget approved but requirements defined only at a high level. We ran structured requirements workshops with clinical and administrative users, producing a specification that the development team could build against.',
		},
		{
			industry: 'SaaS',
			title: 'Architecture Review Before a Scaling Investment',
			description:
				'A SaaS company was planning a significant infrastructure investment. We reviewed their current architecture and produced a target architecture recommendation that changed the direction of the investment before any development spend was committed.',
		},
		{
			industry: 'Retail',
			title: 'Build vs Buy Analysis for a Loyalty Platform',
			description:
				'A retailer was deciding whether to build a custom loyalty platform or purchase an existing solution. Our structured analysis identified that a configurable existing platform met all but one requirement and recommended purchase with a specific customisation plan.',
		},
		{
			industry: 'Manufacturing',
			title: 'Solution Architecture for a Digital Factory Initiative',
			description:
				'A manufacturer planning a digital factory initiative needed architecture design for their IoT data platform before vendor selection and development began.',
		},
	],

	technologies: [
		'Miro',
		'Confluence',
		'Jira',
		'AWS Well-Architected',
		'OpenAPI',
		'draw.io',
		'PostgreSQL',
		'Next.js',
		'TypeScript',
		'Terraform',
	],

	benefits: [
		{
			title: 'Development Budget Directed at the Right Problem',
			description:
				'Requirements definition and build versus buy analysis before development begins ensures budget is committed to the right solution rather than discovered to be misallocated after significant spend.',
		},
		{
			title: 'Architecture Decisions Made at the Right Time',
			description:
				'Architecture designed before build produces a system with intentional structure rather than accumulated local decisions that become increasingly difficult to reverse.',
		},
		{
			title: 'Technical Risk Identified Before Commitment',
			description:
				'Technical due diligence and architecture review before acquisition, investment, or development commitment surfaces risks that are cheap to act on before commitment and expensive to address after.',
		},
		{
			title: 'Requirements Complete Before Development Starts',
			description:
				'Clear, complete requirements reduce the rework caused by misunderstandings discovered mid-build — the most expensive kind of requirements clarification.',
		},
		{
			title: 'Build vs Buy Decided on Evidence',
			description:
				'A structured analysis often reveals that an existing product covers the requirement better and faster than custom development, saving development budget for use cases where custom genuinely adds value.',
		},
		{
			title: 'Technology Investment Aligned to Business Goals',
			description:
				'A technology roadmap that connects software investment to business objectives produces a defensible rationale for each investment decision rather than a list of projects with no strategic coherence.',
		},
	],

	faqs: [
		{
			q: 'Do you provide consulting separately from development, or only as part of a build project?',
			a: 'Both. Many clients engage us for consulting independently — a technology roadmap, a requirements definition, a build versus buy analysis, or an architecture review — without a subsequent development engagement. We also provide consulting as the first phase of development projects. The two are separate service offerings that can be combined or used independently.',
		},
		{
			q: 'What does a build versus buy analysis involve?',
			a: 'We document the requirements for the function in question, evaluate available products against those requirements using a structured scorecard, assess the integration effort for each option, and produce a recommendation with documented rationale. We include total cost of ownership analysis covering licence costs, implementation, integration, and maintenance over a three to five year period. The analysis typically takes two to three weeks.',
		},
		{
			q: 'How do you run requirements workshops for technical systems?',
			a: 'We use structured facilitation to work through each user role, the tasks they need to perform, the data they work with, and the edge cases that are known to occur. We produce process maps and data flow diagrams during the workshops and circulate a written requirements document for review and sign-off. We distinguish between confirmed requirements, open questions, and explicitly out-of-scope items to prevent scope creep.',
		},
		{
			q: 'Can you review a project that is already in progress?',
			a: 'Yes. We conduct in-flight project reviews when a development project has lost direction, exceeded its budget, or raised concerns about quality. The review covers requirements completeness, architecture quality, development progress against plan, and team capability. We produce findings and recommendations that the client can act on with their existing team or with our involvement.',
		},
	],
};

export default function ITConsultingServicesPage() {
	return <SubservicePageLayout data={data} />;
}
