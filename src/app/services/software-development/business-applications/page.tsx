import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Business Application Development | Project Management Software | aibizmod',
	description:
		'Custom workflow tools, internal applications, billing systems, and project management software built for your exact process — not adapted from a generic off-the-shelf product.',
	keywords: [
		'business application development',
		'business software development',
		'workflow application',
		'internal business systems',
		'operations software',
		'custom business solutions',
		'enterprise applications',
		'productivity software',
		'business process software',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/software-development/business-applications',
	},
	openGraph: {
		title: 'Business Applications | Custom Software | aibizmod',
		description:
			'Custom business applications built to streamline operations and workflows without adapting your processes to off-the-shelf constraints.',
		url: '/services/software-development/business-applications',
	},
};

const data: SubservicePageData = {
	name: 'Business Application Development',
	parentName: 'Software Development',
	parentSlug: 'software-development',
	slug: 'business-applications',
	tagline:
		'Workflow automation tools, internal tooling, billing systems, and project management software built for specific business processes that generic off-the-shelf products do not cover well enough to eliminate the manual work alongside them.',
	heroImage:
		'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Businesses accumulate manual processes around the edges of their software stack. A billing system that generates invoices but requires a spreadsheet to track what has been billed. A project management tool that tracks tasks but not the specific metrics the business cares about. An internal process that has outgrown the email thread it was managed in. These are processes that custom business applications can automate, but they are specific enough that no off-the-shelf product covers them precisely.',
		challengePoints: [
			'Manual workflows that have outgrown the spreadsheet or email thread managing them',
			'Billing or financial processes requiring a system that matches specific calculation and reporting logic',
			'Internal tooling needed by operations teams that does not exist as a product and cannot be approximated well enough by available tools',
			'Multiple systems that need to be connected in ways their native integrations cannot support',
		],
		solution:
			'We build focused business applications for specific operational processes — workflow tools, billing engines, internal dashboards, project tracking systems — designed exactly for the process that needs automating, not adapted from something designed for a different use case.',
		solutionPoints: [
			'Scoped application design focused on the specific process to automate without adding scope creep',
			'Integration with the systems the process connects to — CRM, accounting, ERP, external APIs',
			'User interface appropriate for the role using the tool, including internal tools optimised for power users',
			'Deployment on your existing infrastructure or cloud account so you own and control the system',
		],
	},

	capabilities: [
		{
			icon: 'workflow',
			title: 'Workflow Automation Tools',
			description:
				'Build applications that automate multi-step operational workflows — approvals, status tracking, notifications, and data collection — replacing manual coordination between systems.',
			image: '/services/software-development/business-applications-workflow-automation-tools.jpg',
			imageAlt: 'Software Development Workflow Automation Tools capability illustration.',
		},
		{
			icon: 'layers',
			title: 'Internal Tooling',
			description:
				'Develop internal dashboards, admin interfaces, and operational tools optimised for the specific needs of operations, finance, or technical teams.',
			image: '/services/software-development/business-applications-internal-tooling.jpg',
			imageAlt: 'Software Development Internal Tooling capability illustration.',
		},
		{
			icon: 'package',
			title: 'Billing and Invoicing Systems',
			description:
				'Build billing engines and invoicing systems with calculation logic, payment tracking, and reporting matched to your specific pricing model and business rules.',
			image: '/services/software-development/business-applications-billing-and-invoicing-systems.jpg',
			imageAlt: 'Software Development Billing and Invoicing Systems capability illustration.',
		},
		{
			icon: 'clock',
			title: 'Project and Task Management Systems',
			description:
				'Develop project tracking tools with the specific fields, statuses, and reporting your team needs — without the overhead of a general-purpose platform that covers use cases you will never use.',
			image: '/services/software-development/business-applications-project-and-task-management-systems.jpg',
			imageAlt: 'Software Development Project and Task Management Systems capability illustration.',
		},
		{
			icon: 'database',
			title: 'Data Processing Applications',
			description:
				'Build applications that ingest, validate, transform, and process data from external sources or internal systems, replacing manual import and manipulation work.',
			image: '/services/software-development/business-applications-data-processing-applications.jpg',
			imageAlt: 'Software Development Data Processing Applications capability illustration.',
		},
		{
			icon: 'settings',
			title: 'Integration Applications',
			description:
				'Build connector applications that bridge systems whose native integrations are insufficient, automating data flow and reducing the manual reconciliation work between systems.',
			image: '/services/software-development/business-applications-integration-applications.jpg',
			imageAlt: 'Software Development Integration Applications capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Professional Services',
			title: 'Time Billing System for a Consultancy',
			description:
				'A consultancy needed a billing system that tracked time against client matters, applied different rate cards per client, and generated invoices with a specific format that no standard billing tool could match.',
		},
		{
			industry: 'E-commerce',
			title: 'Returns Processing Tool',
			description:
				'An online retailer had a returns process managed across email, spreadsheets, and a manual Shopify admin workflow. A focused returns processing application automated the assessment, approval, and refund initiation steps.',
		},
		{
			industry: 'Healthcare',
			title: 'Clinical Trial Data Management Tool',
			description:
				'A healthcare research organisation needed an internal tool for managing clinical trial participant data collection and protocol tracking that was too specific for general-purpose project management software.',
		},
		{
			industry: 'Finance',
			title: 'Commission Calculation Engine',
			description:
				'A financial services business calculated sales commissions in a spreadsheet with complex multi-tier rules that were prone to error. A custom calculation engine replaced the spreadsheet with an audited, automated system.',
		},
		{
			industry: 'Logistics',
			title: 'Quotation and Pricing Tool',
			description:
				"A freight operator's pricing team used spreadsheets to generate quotations. A custom pricing tool with the rate logic built in reduced quotation time from 30 minutes to under 5 minutes per quote.",
		},
		{
			industry: 'Media',
			title: 'Rights Management Application',
			description:
				'A media company needed an internal tool to track content rights, territory restrictions, and licence expiry dates — data spread across contracts that required a proper queryable system.',
		},
	],

	technologies: [
		'Next.js',
		'TypeScript',
		'Node.js',
		'PostgreSQL',
		'Prisma',
		'Tailwind CSS',
		'AWS',
		'Vercel',
		'Zapier',
		'Make',
		'REST APIs',
	],

	benefits: [
		{
			title: 'Manual Work Eliminated',
			description:
				'A business application built for a specific process removes the manual steps that consume staff time without adding value — lookups, copy-paste between systems, email-based approvals.',
		},
		{
			title: 'Process Logic Codified',
			description:
				'Business rules, calculation logic, and workflow steps encoded in software are applied consistently every time, removing the variation and errors that come from manual execution.',
		},
		{
			title: 'Audit Trail by Default',
			description:
				'Every action in a properly built business application is logged with user, timestamp, and state change — providing an audit trail that spreadsheets and email threads cannot.',
		},
		{
			title: 'Integration That Works the Way the Process Needs',
			description:
				'A custom integration between your business application and adjacent systems can handle the exact data mapping and timing the process requires, rather than fitting within the constraints of a pre-built connector.',
		},
		{
			title: 'Designed for the People Using It',
			description:
				'Internal tools built for specific roles can be optimised for the exact tasks those roles perform, with a UI that reflects their workflow rather than the general-purpose design of a product sold to many different users.',
		},
		{
			title: 'Owned by the Business',
			description:
				'A custom application deployed on your own infrastructure or cloud account is not subject to price increases, feature removal, or vendor shutdown. You own the code and control the roadmap.',
		},
	],

	faqs: [
		{
			q: 'How do you scope a business application to avoid it becoming a large, complex project?',
			a: 'We start every business application engagement with a scoping workshop that maps the current manual process in detail, identifies the core problem that software needs to solve, and explicitly excludes the adjacent features that would be nice to have but are not needed for the core workflow. A focused application that does one thing well is more valuable to deliver quickly than a broad one that takes a year to launch.',
		},
		{
			q: 'Can you integrate the application with our existing systems?',
			a: 'Yes. Most business applications are useful specifically because they connect to existing systems and automate data flows between them. We assess the available integration methods for each system during scoping — most modern business software exposes a REST API, and older systems often have database access or file export options we can work with.',
		},
		{
			q: 'How long does a business application typically take to build?',
			a: 'A focused application covering a single operational workflow — a billing system, a returns processor, a commission calculator — typically takes six to twelve weeks. More complex applications with multiple modules and integrations take three to six months. The key determinant is how clearly defined the requirements are at the start and how quickly stakeholders can confirm decisions during development.',
		},
		{
			q: 'Do you build cloud based project management software?',
			a: 'Yes. Cloud based project management software is one of the most common business applications we develop. We build cloud project management software with task tracking, resource allocation, time logging, and reporting — designed around your team\'s actual workflow rather than adapted from an off-the-shelf product. The resulting system is hosted on your cloud account, owned outright, and free of per-seat licensing fees.',
		},
		{
			q: 'Do you build admin interfaces as part of the application?',
			a: 'Yes. Most business applications need an admin layer for configuration management, user administration, audit log review, and data correction. We build these as part of the application rather than requiring direct database access for administration tasks.',
		},
	],
};

export default function BusinessApplicationsPage() {
	return <SubservicePageLayout data={data} />;
}
