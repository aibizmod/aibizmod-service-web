import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Industry-Specific Software Development | Engineering & Healthcare | aibizmod',
	description:
		'Custom software for engineering, healthcare, logistics, construction, education, and manufacturing — built for the workflows, regulations, and data of your sector.',
	keywords: [
		'industry-specific software',
		'vertical software',
		'healthcare software development',
		'manufacturing software',
		'financial software development',
		'logistics software',
		'specialized software solutions',
		'domain-specific applications',
		'niche software development',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/software-development/industry-specific-software',
	},
	openGraph: {
		title: 'Industry-Specific Software | Vertical Solutions | aibizmod',
		description:
			'Custom software solutions built for specific industries with deep domain expertise built into every system.',
		url: '/services/software-development/industry-specific-software',
	},
};

const data: SubservicePageData = {
	name: 'Industry-Specific Software',
	parentName: 'Software Development',
	parentSlug: 'software-development',
	slug: 'industry-specific-software',
	tagline:
		'Custom software for healthcare, construction, logistics, education, and manufacturing — built for the regulatory requirements, operational workflows, and data structures that define how each sector actually operates.',
	heroImage:
		'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Industry-specific software requirements are not well served by generic business applications. Healthcare systems need to handle regulated data with audit trails. Construction software needs to track costs, variations, and retention across projects. Logistics platforms need to handle complex routing, carrier integration, and proof of delivery workflows. These requirements are specific enough that general-purpose software creates more manual workaround work than it eliminates.',
		challengePoints: [
			'Generic software that does not handle industry-specific compliance or data requirements',
			'Industry vertical SaaS platforms that cover 80 percent of the requirement but not the specific 20 percent critical to operations',
			'Manual workarounds that have accumulated around the edges of systems that do not fit the workflow',
			'Integration requirements with industry-specific external systems that generic platforms do not support',
		],
		solution:
			'We build software for specific industries with the domain knowledge required to get the data model, workflow logic, and compliance considerations right — rather than applying a generic development approach to a sector whose requirements we have not understood.',
		solutionPoints: [
			'Domain-specific requirements gathering that goes beyond surface workflow to understand regulatory constraints',
			'Data model and process design reviewed against sector-specific compliance requirements',
			'Integration with industry-standard external systems and data formats',
			'User interface design tested with the actual roles that will use the system',
		],
	},

	capabilities: [
		{
			icon: 'users',
			title: 'Healthcare Software',
			description:
				'Build clinical, administrative, and patient-facing healthcare software with HL7/FHIR integration, NHS system connectivity, patient data governance, and DSPT compliance awareness.',
			image: '/services/software-development/industry-specific-software-healthcare-software.jpg',
			imageAlt: 'Software Development Healthcare Software capability illustration.',
		},
		{
			icon: 'settings',
			title: 'Construction Management Software',
			description:
				'Develop project management, cost control, and document management systems for construction businesses with contract value tracking, variation management, and subcontractor workflows.',
			image: '/services/software-development/industry-specific-software-construction-management-software.jpg',
			imageAlt: 'Software Development Construction Management Software capability illustration.',
		},
		{
			icon: 'package',
			title: 'Logistics and Supply Chain Software',
			description:
				'Build order management, route planning, carrier integration, and warehouse management systems for logistics operators with the specific workflow and reporting they need.',
			image: '/services/software-development/industry-specific-software-logistics-and-supply-chain-software.jpg',
			imageAlt: 'Software Development Logistics and Supply Chain Software capability illustration.',
		},
		{
			icon: 'fileText',
			title: 'Education and Training Software',
			description:
				'Develop learning management systems, student information systems, and course administration tools for education providers with OFSTED, accreditation, or awarding body data requirements.',
			image: '/services/software-development/industry-specific-software-education-and-training-software.jpg',
			imageAlt: 'Software Development Education and Training Software capability illustration.',
		},
		{
			icon: 'settings',
			title: 'Manufacturing Software',
			description:
				'Build production management, quality management, and shop floor data collection systems for manufacturers with production tracking, BOM management, and quality reporting.',
			image: '/services/software-development/industry-specific-software-manufacturing-software.jpg',
			imageAlt: 'Software Development Manufacturing Software capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Compliance and Audit Systems',
			description:
				'Develop compliance management and audit systems for regulated industries covering evidence collection, non-conformance tracking, corrective action workflows, and audit preparation.',
			image: '/services/software-development/industry-specific-software-compliance-and-audit-systems.jpg',
			imageAlt: 'Software Development Compliance and Audit Systems capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Healthcare',
			title: 'Community Care Management System',
			description:
				'A community healthcare organisation built a case management system for community nurses covering referral intake, care plan management, visit scheduling, and outcome recording — with integration to SystmOne.',
		},
		{
			industry: 'Construction',
			title: 'Subcontractor Management Portal',
			description:
				'A main contractor built a subcontractor portal for issuing works orders, tracking progress, managing compliance document submission, and processing payment applications.',
		},
		{
			industry: 'Logistics',
			title: 'Last-Mile Delivery Management Platform',
			description:
				'A last-mile logistics operator built a delivery management platform covering route optimisation, driver app integration, proof of delivery capture, and customer tracking portal.',
		},
		{
			industry: 'Education',
			title: 'Apprenticeship Management System',
			description:
				'A training provider built a system to manage apprenticeship learner records, evidence portfolios, review scheduling, and EPA preparation — replacing a combination of paper files and spreadsheets.',
		},
		{
			industry: 'Manufacturing',
			title: 'Quality Management System',
			description:
				'A manufacturer built a QMS covering non-conformance recording, root cause analysis, corrective action tracking, supplier audit management, and ISO 9001 document control.',
		},
		{
			industry: 'Financial Services',
			title: 'Regulatory Reporting System',
			description:
				'A financial services firm built an internal system for aggregating data from multiple source systems and generating the specific report formats required by their regulatory obligations.',
		},
	],

	technologies: [
		'Next.js',
		'TypeScript',
		'Python',
		'PostgreSQL',
		'HL7 FHIR',
		'AWS',
		'Docker',
		'Kubernetes',
		'Tailwind CSS',
		'Node.js',
		'Prisma',
	],

	benefits: [
		{
			title: 'Domain Knowledge Built into the Software',
			description:
				"Software built with an understanding of your industry's specific requirements is designed correctly from the start rather than requiring expensive modifications to fit a generic foundation.",
		},
		{
			title: 'Regulatory Requirements Handled by Design',
			description:
				'Compliance requirements — audit trails, data governance, document control, reporting formats — are built into the system architecture rather than added as afterthoughts.',
		},
		{
			title: 'Integration with Industry Systems',
			description:
				'Industry-specific external systems, data standards, and API formats are handled by a team that has built the integrations before, reducing integration risk and timeline.',
		},
		{
			title: 'Workflow That Reflects How the Work Happens',
			description:
				'Industry-specific workflow logic — care planning in healthcare, variation management in construction, route optimisation in logistics — is modelled correctly because the domain was understood before development began.',
		},
		{
			title: 'Replaces More Manual Work',
			description:
				'Software designed for a specific industry replaces more of the manual work that exists in that industry compared to a generic platform that approximates the requirements without fully addressing them.',
		},
		{
			title: 'User Adoption That Comes from Fit',
			description:
				"Systems that match how people in a specific role actually work achieve higher adoption than generic platforms that require users to adapt their workflow to the software's model.",
		},
	],

	faqs: [
		{
			q: 'How do you develop domain knowledge for industries you may not have worked in before?',
			a: 'We start every industry-specific project with a structured discovery phase that goes deeper than typical requirements gathering — including process observation alongside the people doing the work, review of relevant regulatory guidance, and a requirements review with a domain expert from your organisation or an external specialist where needed. We ask questions that reveal the constraints the software must operate within, not just the features it needs to provide.',
		},
		{
			q: 'How do you handle NHS or healthcare system integrations?',
			a: 'NHS system integrations vary significantly by system and trust. We have experience with HL7 v2 and FHIR R4 integration patterns, SystmOne and EMIS data exports, and NHS-specific authentication through NHS Login and NHS Identity. We assess the available integration methods for your specific system early in the project, since available interfaces vary by organisation and system version.',
		},
		{
			q: 'Do you understand the compliance requirements for the industry, or do we need to provide them?',
			a: 'We bring working knowledge of common compliance requirements in the sectors we have experience in — healthcare data governance, construction contract law, financial regulatory reporting. We do not rely on our knowledge alone for compliance-critical requirements — we review documented guidance with you and involve your compliance team or legal counsel where the requirement has significant regulatory consequence.',
		},
		{
			q: 'Do you build engineering project management software?',
			a: 'Yes. Engineering project management software is a recurring requirement we build for engineering consultancies, EPC contractors, and engineering-led manufacturers. We model the project structures, document control, deliverable tracking, and approval workflows that engineering project lifecycles require — rather than adapting a generic project tool that does not understand engineering phases, revisions, or compliance documentation.',
		},
		{
			q: 'How long does an industry-specific software project typically take?',
			a: 'It depends heavily on scope. A focused operational tool for one workflow in one industry takes three to six months. A multi-module system covering the full operational breadth of a business takes eight to eighteen months with phased delivery. Industry-specific projects tend to run slightly longer than equivalent general-purpose software because discovery takes longer when domain requirements need to be properly understood before design begins.',
		},
	],
	answerSummary:
		'UK and India healthcare, construction, logistics, education, and manufacturing businesses whose generic software cannot handle sector-specific compliance and workflow requirements get custom applications built with domain knowledge and industry-standard system integrations.',
};

export default function IndustrySpecificSoftwarePage() {
	return <SubservicePageLayout data={data} />;
}
