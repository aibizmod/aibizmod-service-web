import type { Metadata } from 'next';
import ServicePageLayout, {
	type ServicePageData,
	type ServiceCard,
} from '@/components/ServicePageLayout';
import TechStackCarousel, {
	SOFTWARE_DEV_ROW1,
	SOFTWARE_DEV_ROW2,
} from '@/components/ui/tech-stack-carousel';

export const metadata: Metadata = {
	title: 'Custom Software Development Services | UK & India | aibizmod',
	description:
		'Bespoke software development for businesses that have outgrown spreadsheets — ERP, CRM, SaaS dashboards, project management systems, and internal tools.',
	keywords: [
		'custom software development company',
		'bespoke software development',
		'saas development company',
		'software development company',
		'custom software development',
		'software development services',
		'ERP development',
		'CRM development',
		'enterprise software development',
		'software engineering company',
		'business software solutions',
	],
	alternates: {
		canonical: 'https://aibizmod.com/services/software-development',
	},
	openGraph: {
		title: 'Custom Software Development | aibizmod',
		description:
			'Bespoke software development for businesses that have outgrown spreadsheets — ERP, CRM, SaaS dashboards, project management systems, and internal tools.',
		url: '/services/software-development',
	},
};

const data: ServicePageData = {
	name: 'Custom Software Development',
	tagline:
		'For businesses across the UK, USA, and internationally whose operations outgrow spreadsheets and off-the-shelf tools, we design and build custom ERP systems, CRM platforms, internal workflows, SaaS dashboards, and operations software. You receive a documented codebase with role-based access, API integrations, and a handover package your internal team can maintain.',
	heroBullets: [
		'For businesses whose operations have outgrown spreadsheets and off-the-shelf tools',
		'Custom ERP systems, CRM platforms, internal workflows, SaaS dashboards, and operations software',
		'Documented codebase with role-based access, API integrations, and a maintainable handover package',
		'Serving clients in the UK, USA, and internationally',
	],
	slug: 'software-development',
	iconColor: 'text-indigo-600',

	overview: {
		paragraphs: [
			"Off-the-shelf software works until the business outgrows it. At that point you're either paying for features you don't use or working around the ones you need. Custom software is slower to start but built around how the business actually runs: the approval steps that matter, the reports that get pulled every Monday, the way stock moves through a warehouse, the fields your team actually fills in. The database is designed for your data, the access controls reflect your team structure, and the documentation covers how to run it without needing to call anyone.",
		],
		benefits: [
			'Direct Database Schema Access',
			'Custom Business Logic Configuration',
			'Automated Reporting Pipelines',
			'Role-Based Permission Controls',
			'No Licensing Cost Per User',
			'Complete Source Code Ownership',
		],
	},

	features: [
		{
			icon: 'compass',
			title: 'Requirements Workshop',
			desc: 'We run a structured discovery session to define user roles, database entities, processing steps, and integration requirements before writing code.',
		},
		{
			icon: 'layers',
			title: 'System Architecture',
			desc: 'We map out a component diagram outlining server components, client views, database connections, and external API gateways.',
		},
		{
			icon: 'database',
			title: 'Database Design',
			desc: 'We design relational and document database schemas, setting up tables, primary keys, relationships, index mappings, and migration paths.',
		},
		{
			icon: 'shield',
			title: 'User Role Management',
			desc: 'We build role-based access control (RBAC) layers defining granular read, write, edit, and deletion permissions for different staff tiers.',
		},
		{
			icon: 'network',
			title: 'API Integrations',
			desc: 'We build custom connectors to securely synchronize data between your operations software and third-party accounting, CRM, or shipping services.',
		},
		{
			icon: 'fileText',
			title: 'Documentation Package',
			desc: 'We compile detailed API schemas, system deployment guides, database dictionaries, and onboarding documentation for your internal teams.',
		},
	],

	process: [
		{
			icon: 'compass',
			title: 'Requirements Mapping',
			desc: 'We run our workshop to outline database structure, user roles, security tiers, and integration endpoints.',
		},
		{
			icon: 'code2',
			title: 'Sprint Development',
			desc: 'We build features in 2-week iterations, providing preview updates on staging environments at the end of each sprint.',
		},
		{
			icon: 'testTube',
			title: 'Integration Testing',
			desc: 'We perform automated test suites checking authentication scopes, data sync logic, and backup systems on staging.',
		},
		{
			icon: 'rocket',
			title: 'Release & Handover',
			desc: 'We deploy the system to production, configure live credentials, hand over repository ownership, and deliver the documentation package.',
		},
	],

	techStack: [],

	faqs: [
		{
			q: 'What deliverables do we receive at the conclusion of the software project?',
			a: 'You receive administrative access to the code repository, hosting server configurations, SQL database schemas, and a documentation package comprising API schemas, database dictionaries, and server runbooks.',
		},
		{
			q: 'Do you charge recurring software licensing fees for custom software?',
			a: 'No. Once the system is built and paid for, you own the intellectual property and source code. There are no ongoing fees or licensing charges from us. You only pay for your direct server and database usage to your cloud host.',
		},
		{
			q: 'How do you handle database migrations for existing company records?',
			a: 'We run a structured data mapping phase where we extract records from your legacy spreadsheets or databases, transform them to match the new schema, run test migrations on staging, and verify integrity before production deployment.',
		},
		{
			q: 'What happens if we need new features added to the software in the future?',
			a: 'Because you own the complete source code and documentation package, your internal developers can modify and extend the software. Alternatively, we offer post-launch support retainers to build additional features as your processes evolve.',
		},
	],
	answerSummary:
		'Bespoke software development for businesses in the UK and India that have outgrown spreadsheets and off-the-shelf tools. We build custom ERP, CRM, SaaS platforms, and project management systems tailored to your exact workflows and operational processes.',
};

const serviceCards: ServiceCard[] = [
	{
		title: 'Enterprise Software',
		image:
			'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
		bullets: ['ERP', 'CRM', 'HRMS', 'Inventory Management'],
		href: '/services/software-development/enterprise-software',
	},
	{
		title: 'Business Applications',
		image:
			'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'Workflow Automation',
			'Internal Tools',
			'Billing Systems',
			'Project Management Systems',
		],
		href: '/services/software-development/business-applications',
	},
	{
		title: 'Industry-Specific Software',
		image:
			'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'Healthcare Solutions',
			'Construction Solutions',
			'Logistics Solutions',
			'Education Solutions',
			'Manufacturing Solutions',
		],
		href: '/services/software-development/industry-specific-software',
	},
	{
		title: 'Software Modernization',
		image:
			'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop',
		bullets: ['Legacy Migration', 'Re-engineering', 'System Upgrades'],
		href: '/services/software-development/software-modernization',
	},
	{
		title: 'Product Development',
		image:
			'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80&auto=format&fit=crop',
		bullets: ['MVPs', 'SaaS Products', 'Maintenance & Support'],
		href: '/services/software-development/product-development',
	},
	{
		title: 'IT Consulting & Services',
		image:
			'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'Digital Transformation Consulting',
			'Technology Roadmaps',
			'IT Planning',
			'Solution Architecture',
		],
		href: '/services/software-development/tech-advisory-services',
	},
];

export default function SoftwareDevelopmentPage() {
	return (
		<ServicePageLayout
			data={data}
			techStackFooter={
				<TechStackCarousel row1={SOFTWARE_DEV_ROW1} row2={SOFTWARE_DEV_ROW2} />
			}
			serviceCards={serviceCards}
		/>
	);
}
