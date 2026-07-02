import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Digital Transformation Consulting & IT Strategy | aibizmod',
	description:
		'Digital transformation consulting and technology roadmapping services that connect IT investment to business strategy — practical documentation, not slide decks.',
	keywords: [
		'digital transformation',
		'IT strategy',
		'technology roadmap',
		'digital strategy',
		'transformation consulting',
		'technology planning',
		'business transformation',
		'strategic consulting',
		'organizational transformation',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/it-consulting-it-services/strategy-transformation',
	},
	openGraph: {
		title: 'IT Strategy & Transformation | Digital Transformation | aibizmod',
		description:
			'Digital transformation consulting and technology roadmapping that connect technology to business strategy.',
		url: '/services/it-consulting-it-services/strategy-transformation',
	},
};

const data: SubservicePageData = {
	name: 'Digital Transformation Consulting',
	parentName: 'IT Consulting & IT Services',
	parentSlug: 'it-consulting-it-services',
	slug: 'strategy-transformation',
	tagline:
		'Digital transformation consulting and technology roadmapping services that connect technology investment to business strategy — giving leaders a clear, sequenced plan for modernising how the organisation operates.',
	heroImage:
		'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Many businesses know they need to modernise their technology but cannot get past the question of where to start. Technology decisions are made reactively in response to immediate problems rather than as part of a coordinated plan. Different departments pursue their own systems without considering how they connect. Investment is approved without clear success criteria, and two years later the business is not materially different despite significant spend.',
		challengePoints: [
			'Technology investments approved without a unifying strategy or prioritisation framework',
			'Department-level decisions creating a fragmented stack with no integration plan',
			'Digital transformation programmes that start with energy but lose direction and momentum',
			'No mechanism to evaluate whether previous technology investments have delivered their intended outcomes',
		],
		solution:
			'We work with leadership teams to define the technology strategy that serves their business objectives, produce a sequenced roadmap of investments, and create the governance structures that keep transformation on track. Recommendations are grounded in what is achievable given your budget, team, and existing systems — not what would be ideal in an unconstrained scenario.',
		solutionPoints: [
			'Current state assessment covering technology, processes, and organisational capability',
			'Defined technology strategy aligned to business objectives with prioritised investment areas',
			'Sequenced roadmap with phased delivery, dependency mapping, and resource estimates',
			'Governance structures and success metrics so progress can be measured and course-corrected',
		],
	},

	capabilities: [
		{
			icon: 'compass',
			title: 'Digital Transformation Consulting',
			description:
				'Independent assessment of the business case, readiness, and approach for digital transformation initiatives, with structured recommendations for leadership decision-making.',
			image: '/services/it-consulting-it-services/strategy-transformation-digital-transformation-consulting.jpg',
			imageAlt: 'IT Consulting & IT Services Digital Transformation Consulting capability illustration.',
		},
		{
			icon: 'layers',
			title: 'Technology Roadmapping',
			description:
				'Produce a multi-year technology investment roadmap sequenced by business priority, integration dependencies, and implementation capacity.',
			image: '/services/it-consulting-it-services/strategy-transformation-technology-roadmapping.jpg',
			imageAlt: 'IT Consulting & IT Services Technology Roadmapping capability illustration.',
		},
		{
			icon: 'target',
			title: 'IT Strategy Development',
			description:
				'Define the technology strategy that supports your business objectives across the planning horizon, covering infrastructure, applications, data, and operating model.',
			image: '/services/it-consulting-it-services/strategy-transformation-it-strategy-development.jpg',
			imageAlt: 'IT Consulting & IT Services IT Strategy Development capability illustration.',
		},
		{
			icon: 'users',
			title: 'Stakeholder Alignment',
			description:
				'Facilitate structured workshops that bring leadership, IT, and operations perspectives together to agree on priorities and build shared ownership of the transformation plan.',
			image: '/services/it-consulting-it-services/strategy-transformation-stakeholder-alignment.jpg',
			imageAlt: 'IT Consulting & IT Services Stakeholder Alignment capability illustration.',
		},
		{
			icon: 'lineChart',
			title: 'Investment Prioritisation',
			description:
				'Apply structured frameworks to rank technology investments by business impact, implementation risk, cost, and strategic alignment, producing a defensible prioritisation rationale.',
			image: '/services/it-consulting-it-services/strategy-transformation-investment-prioritisation.jpg',
			imageAlt: 'IT Consulting & IT Services Investment Prioritisation capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Transformation Programme Governance',
			description:
				'Design the governance structures, reporting cadences, and decision-making processes that keep a transformation programme on track over a multi-year horizon.',
			image: '/services/it-consulting-it-services/strategy-transformation-transformation-programme-governance.jpg',
			imageAlt: 'IT Consulting & IT Services Transformation Programme Governance capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Professional Services',
			title: 'Technology Roadmap for a Growing Consultancy',
			description:
				'A 200-person consultancy needed a five-year technology roadmap covering CRM, document management, and client portal investment. We produced a phased plan sequenced by business priority and integration readiness.',
		},
		{
			industry: 'Retail',
			title: 'Digital Transformation Strategy for an Omnichannel Retailer',
			description:
				'A retailer operating across physical and online channels needed a technology strategy for integrating their inventory, CRM, and e-commerce systems. We assessed the current state and produced a two-year roadmap with phased integrations.',
		},
		{
			industry: 'Manufacturing',
			title: 'Industry 4.0 Readiness Assessment',
			description:
				'A manufacturer wanted to understand the operational and technology investments needed to implement IoT and predictive maintenance. We assessed readiness gaps and produced a sequenced plan for the transition.',
		},
		{
			industry: 'Finance',
			title: 'Post-Acquisition Technology Integration Plan',
			description:
				'A financial services group needed to integrate the technology stack of an acquired business into their own. We assessed both estates and produced an integration plan that minimised disruption to customer-facing systems.',
		},
		{
			industry: 'Healthcare',
			title: 'Digital Patient Experience Strategy',
			description:
				'A healthcare group wanted to improve digital patient interactions. We assessed the patient journey across digital touchpoints and produced a technology investment plan covering patient portal, appointment booking, and communication systems.',
		},
		{
			industry: 'Logistics',
			title: 'IT Planning for a Growing Freight Operator',
			description:
				'A freight operator growing through acquisition needed an IT plan to consolidate systems across entities. We documented the technology landscape and produced a consolidation roadmap with realistic timelines.',
		},
	],

	technologies: [
		'Miro',
		'Confluence',
		'Jira',
		'Microsoft 365',
		'SharePoint',
		'Power BI',
		'Salesforce',
		'ServiceNow',
		'Azure',
		'AWS',
	],

	benefits: [
		{
			title: 'Technology Aligned to Business Goals',
			description:
				'A technology strategy built on business objectives ensures that investment is directed at what actually matters rather than what is technically interesting or what a vendor is selling.',
		},
		{
			title: 'Sequenced Investment That Builds on Itself',
			description:
				'A roadmap that accounts for dependencies means early investments create the foundation for later ones, rather than producing a fragmented set of disconnected tools.',
		},
		{
			title: 'Leadership Alignment Before Commitment',
			description:
				'Structured strategy development creates shared understanding and buy-in at leadership level before major technology investments are approved, reducing the risk of direction changes mid-programme.',
		},
		{
			title: 'Realistic Plans That Get Delivered',
			description:
				'Recommendations constrained by your actual budget, team capacity, and existing systems are more likely to be delivered than unconstrained ideal-state designs that hit operational reality.',
		},
		{
			title: 'Measurable Progress',
			description:
				'Defined success metrics and a governance structure make it possible to assess whether transformation is delivering the intended outcomes and course-correct if it is not.',
		},
		{
			title: 'Independent Perspective',
			description:
				'An independent assessment is not influenced by vendor relationships, internal politics, or sunk cost in previous decisions, producing recommendations based on what is right rather than what is comfortable.',
		},
	],

	faqs: [
		{
			q: 'What is the difference between a technology strategy and a technology roadmap?',
			a: 'A technology strategy defines the principles, objectives, and investment priorities that guide technology decisions over the planning horizon — the why and what. A technology roadmap translates that strategy into a sequenced plan of specific initiatives, timelines, and dependencies — the when and how. Both are needed. A strategy without a roadmap produces good intentions with no delivery path. A roadmap without a strategy produces a to-do list with no coherent direction.',
		},
		{
			q: 'How do you approach a digital transformation engagement?',
			a: 'We start with a current state assessment covering your existing technology, processes, and organisational capability. We then work with stakeholders to define the desired future state and the objectives it needs to achieve. From that gap, we produce a prioritised roadmap. Throughout, we test recommendations against the practical constraints of your budget, team, and existing systems rather than designing for an unconstrained scenario.',
		},
		{
			q: 'How long does a technology roadmap take to produce?',
			a: 'A roadmap for a mid-size organisation typically takes four to six weeks. This includes stakeholder interviews across IT, operations, and leadership, a technology audit, prioritisation workshops, and the written roadmap document with rationale. Simpler scopes can be done in two to three weeks. More complex multi-entity or regulatory environments take longer.',
		},
		{
			q: 'Do you help with implementation, or just advisory?',
			a: 'We provide both. Many clients use us first for strategy and roadmap development, then for implementation of specific initiatives on the roadmap. Delivering both allows us to hold the strategic intent through implementation rather than handing over a document and leaving. Clients also sometimes engage us for implementation oversight when they are using other implementation partners.',
		},
	],
	answerSummary:
		'UK and India leadership teams making reactive technology investments without a coherent plan get digital transformation consulting and multi-year technology roadmaps that sequence investments by business priority, integration readiness, and implementation capacity.',
};

export default function StrategyTransformationPage() {
	return <SubservicePageLayout data={data} />;
}
