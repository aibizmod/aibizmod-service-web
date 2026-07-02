import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'CRM Implementation & Integration Services | aibizmod',
	description:
		'HubSpot, Salesforce, and Zoho CRM implementation, customisation, and integration — giving your sales, support, and marketing teams a single customer view.',
	keywords: [
		'CRM implementation',
		'CRM services',
		'Salesforce implementation',
		'HubSpot setup',
		'Zoho CRM',
		'CRM customization',
		'customer relationship management',
		'CRM integration',
		'sales automation',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/customer-experience-management/crm-services',
	},
	openGraph: {
		title: 'CRM Implementation | Salesforce, HubSpot | aibizmod',
		description:
			'CRM implementation and integration services that align your sales, support, and marketing teams.',
		url: '/services/customer-experience-management/crm-services',
	},
};

const data: SubservicePageData = {
	name: 'CRM Services',
	parentName: 'Customer Experience Management',
	parentSlug: 'customer-experience-management',
	slug: 'crm-services',
	tagline:
		'CRM implementation, customisation, and integration services that give your sales, support, and marketing teams a shared, accurate view of every customer relationship — without the sprawl of disconnected systems.',
	heroImage:
		'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Most businesses have customer data spread across a CRM, a spreadsheet, an email inbox, and a helpdesk. Sales teams build personal contact lists outside the system. Marketing runs campaigns without knowing which contacts are already active customers. Support cannot see recent sales activity. The result is duplicate outreach, missed follow-ups, and deals lost because no one had the full picture.',
		challengePoints: [
			'Customer records fragmented across multiple tools with no single source of truth',
			'Sales pipeline data out of date because reps find the CRM too slow to maintain',
			'No visibility into customer history at the point of a support or sales interaction',
			'CRM workflows that do not match how the team actually works, so they get bypassed',
		],
		solution:
			'We implement and configure CRM platforms around your actual sales process, not a default template. That means custom fields, pipeline stages, and automation rules that match your workflow — integrated with the other tools your team uses so data stays current without manual entry.',
		solutionPoints: [
			'CRM configured to match your pipeline stages, deal types, and contact structure',
			'Integrations with email, calendar, support tools, and marketing platforms for a unified record',
			'Automation rules that update records and trigger tasks without requiring manual intervention',
			'Onboarding and training so adoption is high from week one rather than months in',
		],
	},

	capabilities: [
		{
			icon: 'database',
			title: 'CRM Implementation',
			description:
				'Set up Salesforce, HubSpot, Zoho, or Microsoft Dynamics from scratch, configured for your team size, sales process, and data model rather than out-of-the-box defaults.',
			image: '/services/customer-experience-management/crm-services-crm-implementation.jpg',
			imageAlt: 'Customer Experience Management CRM Implementation capability illustration.',
		},
		{
			icon: 'settings',
			title: 'CRM Customisation',
			description:
				'Add custom objects, fields, pipelines, and views that reflect how your business actually tracks customers, deals, and accounts.',
			image: '/services/customer-experience-management/crm-services-crm-customisation.jpg',
			imageAlt: 'Customer Experience Management CRM Customisation capability illustration.',
		},
		{
			icon: 'workflow',
			title: 'Workflow Automation',
			description:
				'Build automation rules that assign leads, send follow-up reminders, update deal stages, and notify the right person at each step of the pipeline.',
			image: '/services/customer-experience-management/crm-services-workflow-automation.jpg',
			imageAlt: 'Customer Experience Management Workflow Automation capability illustration.',
		},
		{
			icon: 'zap',
			title: 'Integration with External Tools',
			description:
				'Connect your CRM to email platforms, helpdesk systems, accounting software, and marketing tools so customer records are complete without duplicate entry.',
			image: '/services/customer-experience-management/crm-services-integration-with-external-tools.jpg',
			imageAlt: 'Customer Experience Management Integration with External Tools capability illustration.',
		},
		{
			icon: 'users',
			title: 'Data Migration and Cleanup',
			description:
				'Move existing contact and deal data from spreadsheets or legacy CRM systems, with deduplication, field mapping, and validation before import.',
			image: '/services/customer-experience-management/crm-services-data-migration-and-cleanup.jpg',
			imageAlt: 'Customer Experience Management Data Migration and Cleanup capability illustration.',
		},
		{
			icon: 'lineChart',
			title: 'Reporting and Dashboards',
			description:
				'Configure sales pipeline dashboards, activity reports, and revenue forecasts so leadership has accurate visibility without manual data exports.',
			image: '/services/customer-experience-management/crm-services-reporting-and-dashboards.jpg',
			imageAlt: 'Customer Experience Management Reporting and Dashboards capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Professional Services',
			title: 'HubSpot Implementation for a Consulting Firm',
			description:
				'A management consultancy replaced their spreadsheet pipeline with HubSpot CRM, with custom deal stages matching their proposal cycle and automated follow-up reminders.',
		},
		{
			industry: 'SaaS',
			title: 'Salesforce Customisation for Subscription Sales',
			description:
				'A SaaS company needed custom objects to track trial conversions alongside subscription renewals in Salesforce, with automated alerts at renewal risk thresholds.',
		},
		{
			industry: 'Finance',
			title: 'CRM Integration with Accounting Software',
			description:
				'A financial services firm integrated their CRM with Xero so invoice status and payment history were visible on customer records without switching applications.',
		},
		{
			industry: 'Healthcare',
			title: 'Patient Relationship Management Setup',
			description:
				'A private healthcare clinic implemented Zoho CRM to track patient enquiries, consultation bookings, and follow-up communications in a compliant, structured system.',
		},
		{
			industry: 'Logistics',
			title: 'Account Management CRM for a Freight Company',
			description:
				'A freight operator set up a CRM with custom account hierarchies to manage relationships across parent companies and their subsidiary locations.',
		},
		{
			industry: 'E-commerce',
			title: 'Post-Purchase CRM Flows',
			description:
				'An e-commerce brand connected their Shopify store to HubSpot CRM, triggering post-purchase sequences, review requests, and loyalty offers based on purchase data.',
		},
	],

	technologies: [
		'Salesforce',
		'HubSpot',
		'Zoho CRM',
		'Microsoft Dynamics 365',
		'Pipedrive',
		'Zapier',
		'Make',
		'Xero',
		'Shopify',
		'Zendesk',
	],

	benefits: [
		{
			title: 'Single View of the Customer',
			description:
				'Sales, support, and marketing all work from the same customer record, so every interaction is informed by the full history rather than a partial picture.',
		},
		{
			title: 'Pipeline Visibility',
			description:
				'Sales leadership has real-time visibility into deal volume, stage distribution, and forecast accuracy without relying on manual reports from the team.',
		},
		{
			title: 'Fewer Missed Follow-Ups',
			description:
				'Automated task creation and reminder workflows mean opportunities do not fall through the gap between CRM entry and actual follow-through.',
		},
		{
			title: 'Higher Adoption',
			description:
				'A CRM configured to match how people actually work gets used. A generic setup does not. Configuration quality directly drives adoption rates.',
		},
		{
			title: 'Reduced Manual Data Entry',
			description:
				'Integrations with email, calendar, and other tools sync data automatically, reducing the overhead of keeping records current.',
		},
		{
			title: 'Audit Trail for Every Relationship',
			description:
				'Every interaction, note, and status change is logged against the contact or account, creating a full history that survives staff turnover.',
		},
	],

	faqs: [
		{
			q: 'Which CRM platform do you recommend?',
			a: 'That depends on team size, budget, and complexity of your sales process. HubSpot is a strong fit for growing businesses that want a broad platform including marketing and support tools in one place. Salesforce suits larger organisations with complex sales processes or custom requirements. Pipedrive is a good choice for smaller sales teams that want a clean, fast pipeline tool without the overhead of a full platform. We assess your situation before recommending a specific platform.',
		},
		{
			q: 'How long does a CRM implementation take?',
			a: 'A standard HubSpot or Pipedrive implementation for a small to mid-size team typically takes two to four weeks. Salesforce implementations with significant customisation run four to eight weeks. The timeline depends mainly on data migration complexity, the number of integrations required, and how quickly stakeholders can confirm configuration decisions.',
		},
		{
			q: 'Can you migrate data from our existing spreadsheets or old CRM?',
			a: 'Yes. We handle data migration as part of most CRM implementations, including cleaning up duplicate records, mapping fields from the source to the target, and validating the import before going live. The more structured your existing data is, the faster this step goes.',
		},
		{
			q: 'What does the onboarding and training process look like?',
			a: 'We deliver a walkthrough session for each team using the CRM (typically sales, marketing, and support separately) covering the features relevant to their role. We also provide written documentation for common tasks and a recorded session your team can refer back to. Post-launch support is included for the first two weeks to handle questions as the team starts using the system.',
		},
	],
	answerSummary:
		'UK and India sales, support, and marketing teams working from disconnected customer records get CRM implementation and integration that gives them a single view of every relationship with custom pipelines, automated workflows, and clean data migration.',
};

export default function CRMServicesPage() {
	return <SubservicePageLayout data={data} />;
}
