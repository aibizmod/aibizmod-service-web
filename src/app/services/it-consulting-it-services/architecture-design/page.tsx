import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'IT Architecture & System Design Consulting | Technology Architecture | aibizmod',
	description:
		'Solution architecture and system design consulting services. Define how systems should be built before development begins — reducing rework, integration risk, and technical debt.',
	keywords: [
		'IT architecture',
		'system design',
		'enterprise architecture',
		'solution architecture',
		'technical architecture',
		'architecture consulting',
		'system architecture design',
		'infrastructure architecture',
		'technology planning',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/it-consulting-it-services/architecture-design',
	},
	openGraph: {
		title: 'IT Architecture & Design | System Design | aibizmod',
		description:
			'Solution architecture and system design services that define how systems should be built before build begins.',
		url: '/services/it-consulting-it-services/architecture-design',
	},
};

const data: SubservicePageData = {
	name: 'Architecture & Design',
	parentName: 'IT Consulting & IT Services',
	parentSlug: 'it-consulting-it-services',
	slug: 'architecture-design',
	tagline:
		'Solution architecture, system design, and technology evaluation services that define how systems should be built before build begins — reducing rework, integration risk, and technical debt accumulated from rushed or undocumented decisions.',
	heroImage:
		'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Build decisions made without proper architecture produce systems that work in the short term but become progressively harder to maintain, extend, and integrate. APIs built without a contract, databases designed without a schema review, microservices introduced before the team is ready to operate them. The debt from these decisions accumulates silently until it stops a future initiative in its tracks or requires expensive rearchitecture.',
		challengePoints: [
			'Systems built without upfront architecture that become increasingly expensive to extend',
			'Integration problems discovered after both systems were built rather than designed for from the start',
			'Technology choices made without evaluation criteria, leading to regret when the limitations emerge',
			'No architecture documentation, so knowledge of why decisions were made lives only with the person who made them',
		],
		solution:
			'We provide architecture review and design services at the point in a project where decisions can still be made at low cost — before build begins or at the start of a significant new capability. We produce architecture designs and decision records that development teams can implement against and future architects can understand.',
		solutionPoints: [
			'Solution architecture documents covering system components, data flows, and integration patterns',
			'Technology evaluation with documented decision rationale against defined selection criteria',
			'API contract design and data model review before implementation',
			'Architecture decision records that document the reasoning behind significant technical choices',
		],
	},

	capabilities: [
		{
			icon: 'layers',
			title: 'Solution Architecture Design',
			description:
				'Define the component structure, integration patterns, data flows, and technology choices for a new system or significant new capability before development begins.',
			image: '/services/it-consulting-it-services/architecture-design-solution-architecture-design.jpg',
			imageAlt: 'IT Consulting & IT Services Solution Architecture Design capability illustration.',
		},
		{
			icon: 'database',
			title: 'Data Architecture',
			description:
				'Design data models, database schemas, and data flow patterns for applications requiring careful attention to data structure, integrity, and query performance.',
			image: '/services/it-consulting-it-services/architecture-design-data-architecture.jpg',
			imageAlt: 'IT Consulting & IT Services Data Architecture capability illustration.',
		},
		{
			icon: 'code2',
			title: 'API Design and Contract Review',
			description:
				'Design RESTful or GraphQL API contracts, review proposed API structures for consistency and correctness, and document endpoint specifications for development teams.',
			image: '/services/it-consulting-it-services/architecture-design-api-design-and-contract-review.jpg',
			imageAlt: 'IT Consulting & IT Services API Design and Contract Review capability illustration.',
		},
		{
			icon: 'search',
			title: 'Technology Evaluation',
			description:
				'Evaluate technology options against documented requirements using structured assessment criteria, producing a recommendation with clear rationale.',
			image: '/services/it-consulting-it-services/architecture-design-technology-evaluation.jpg',
			imageAlt: 'IT Consulting & IT Services Technology Evaluation capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Architecture Review',
			description:
				'Review the architecture of an existing or proposed system for security risks, scalability constraints, maintainability concerns, and alignment with requirements.',
			image: '/services/it-consulting-it-services/architecture-design-architecture-review.jpg',
			imageAlt: 'IT Consulting & IT Services Architecture Review capability illustration.',
		},
		{
			icon: 'fileText',
			title: 'Architecture Documentation',
			description:
				'Produce or update architecture documentation covering system diagrams, component descriptions, data flow maps, and architecture decision records.',
			image: '/services/it-consulting-it-services/architecture-design-architecture-documentation.jpg',
			imageAlt: 'IT Consulting & IT Services Architecture Documentation capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'SaaS',
			title: 'Architecture Design for a New Platform',
			description:
				'A SaaS company was building a new product from scratch and wanted an architecture review before development began. We produced a solution architecture document covering the component structure, data model, and API design.',
		},
		{
			industry: 'Finance',
			title: 'API Design for a Banking Integration',
			description:
				'A financial services company needed to design an API layer for integration between their core banking system and third-party products. We designed the API contract and data model before any implementation work began.',
		},
		{
			industry: 'Healthcare',
			title: 'Technology Evaluation for a Patient Data Platform',
			description:
				'A healthcare provider evaluated database technologies for a new patient data platform. We assessed four options against their requirements and produced a recommendation with documented rationale and trade-offs.',
		},
		{
			industry: 'E-commerce',
			title: 'Architecture Review for a Scaling Platform',
			description:
				'An e-commerce platform was approaching the limits of its original architecture. We reviewed the current system and produced a target architecture document for the next iteration, with a migration path from current to target state.',
		},
		{
			industry: 'Logistics',
			title: 'Data Architecture for an Integration Project',
			description:
				'A logistics company was integrating data from four operational systems into a reporting platform. We designed the data model and ETL architecture before the integration development began.',
		},
		{
			industry: 'Manufacturing',
			title: 'Microservices Readiness Assessment',
			description:
				'A manufacturer considering breaking a monolithic application into microservices asked for an assessment of whether their team and operations were ready for the complexity this would introduce.',
		},
	],

	technologies: [
		'AWS Well-Architected Framework',
		'OpenAPI',
		'GraphQL',
		'PostgreSQL',
		'Redis',
		'Kafka',
		'Docker',
		'Kubernetes',
		'Terraform',
		'Miro',
		'Lucidchart',
	],

	benefits: [
		{
			title: 'Decisions Made at the Right Time',
			description:
				'Architecture decisions made before build are cheap to change. The same decisions made after three months of development are expensive. Good architecture work front-loads the hard thinking to the point where it costs least.',
		},
		{
			title: 'Integration Problems Found Before They Are Built',
			description:
				'Designing integration patterns before both systems are built prevents the category of problem where two independently correct implementations cannot talk to each other.',
		},
		{
			title: 'Technology Choices with Documented Rationale',
			description:
				'A structured technology evaluation produces a defensible decision and a record of what was considered, preventing repeated reopening of the same decision when the team changes.',
		},
		{
			title: 'Systems Future Teams Can Understand',
			description:
				'Architecture documentation means the reasoning behind significant decisions survives staff turnover, reducing the risk of new team members unknowingly undermining constraints that were put in place for good reasons.',
		},
		{
			title: 'Reduced Technical Debt from Day One',
			description:
				'Building to a reviewed architecture reduces the debt accumulated from undocumented shortcuts and local decisions that accumulate into systemic problems over time.',
		},
		{
			title: 'Independent Review Before Commitment',
			description:
				'An external architecture review provides a check that internal teams are too close to the problem to conduct themselves, catching issues before they are locked in by development effort.',
		},
	],

	faqs: [
		{
			q: 'When in a project should architecture work happen?',
			a: 'The ideal point is before significant build work begins — at the point where you have defined requirements but have not yet started implementation. For significant new capabilities being added to existing systems, architecture review should happen at the start of the feature design phase. The further into development an architecture issue is discovered, the more expensive it is to address.',
		},
		{
			q: 'What is an architecture decision record (ADR)?',
			a: 'An architecture decision record is a short document that captures a significant architectural decision — what was decided, why it was chosen over the alternatives, and what the trade-offs accepted were. ADRs are stored with the codebase and give future developers the context to understand why things are the way they are, rather than having to guess from the implementation alone.',
		},
		{
			q: 'Do you review architecture for existing systems as well as new ones?',
			a: 'Yes. Architecture reviews of existing systems — also called technical reviews or architecture assessments — are valuable when you are planning significant extensions, experiencing performance or reliability problems, or preparing for a due diligence process. They produce a current-state assessment with identified risks and a target architecture recommendation.',
		},
		{
			q: 'How detailed does solution architecture documentation need to be?',
			a: 'It needs to be detailed enough that a development team can implement to it without making significant undocumented decisions themselves, but not so detailed that it becomes a maintenance burden as the implementation evolves. We aim for component-level diagrams, data model definitions, API contract specifications, and narrative descriptions of key design decisions — typically a 15 to 30 page document depending on system complexity.',
		},
	],
	answerSummary:
		'UK and India teams making build decisions without proper architecture and accumulating technical debt get solution architecture design, API contract development, technology evaluation, and architecture reviews that front-load decisions to the point where changes cost least.',
};

export default function ArchitectureDesignPage() {
	return <SubservicePageLayout data={data} />;
}
