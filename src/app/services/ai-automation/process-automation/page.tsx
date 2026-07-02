import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Business Process Automation Services | Workflow Automation | aibizmod',
	description:
		'Custom process automation and workflow automation services. Eliminate manual work with automation pipelines for invoice routing, CRM sync, reporting, and approval workflows.',
	keywords: [
		'process automation',
		'workflow automation',
		'business automation',
		'RPA automation',
		'workflow management',
		'invoice automation',
		'CRM automation',
		'report automation',
		'workflow optimization',
	],
	alternates: {
		canonical: 'https://aibizmod.com/services/ai-automation/process-automation',
	},
	openGraph: {
		title: 'Business Process Automation | Workflow Automation | aibizmod',
		description:
			'Custom process automation that eliminates manual work and accelerates operations.',
		url: '/services/ai-automation/process-automation',
	},
};

const data: SubservicePageData = {
	name: 'Process Automation',
	parentName: 'AI Automation',
	parentSlug: 'ai-automation',
	slug: 'process-automation',
	tagline:
		'Replace manual data entry, spreadsheet copying, and approval chains with automated workflows that connect your existing tools and run in the background without staff intervention.',
	heroImage:
		'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Operations teams often waste hours each week on tasks a computer could handle. Data gets copied between tabs by hand, approvals wait in inboxes waiting for someone to check them, and reports get pulled by hand every Monday morning. Every handoff introduces delays and easy mistakes that compound over time.',
		challengePoints: [
			'Copying data between systems multiple times a day',
			'Delayed approvals because requests sit in inboxes',
			'Building reports by hand from spreadsheets',
			'No logs to trace when manual steps fail',
		],
		solution:
			'We map out your steps, identify where the friction and errors are, then build automations that connect your tools directly. Workflows are documented with runbooks and built with error handling so your team can monitor them and know exactly what to do if something stops.',
		solutionPoints: [
			'Workflows that connect CRMs, databases, and SaaS platforms',
			'Routing approvals via Slack buttons or email forms',
			'Sending reports straight directly to inboxes',
			'Built-in error alerts with Slack or email notification alerts',
		],
	},

	capabilities: [
		{
			icon: 'workflow',
			title: 'Workflow Automation',
			description:
				'Design and build multi-step automated pipelines triggered by events across your tools, from form submissions and database writes to scheduled time intervals.',
			image: '/services/ai-automation/process-automation-workflow-automation.jpg',
			imageAlt: 'AI Automation Workflow Automation capability illustration.',
		},
		{
			icon: 'network',
			title: 'API and Webhook Integration',
			description:
				'Connect SaaS tools, internal databases, and external services using REST APIs and webhooks, removing the need for manual exports and imports between systems.',
			image: '/services/ai-automation/process-automation-api-and-webhook-integration.jpg',
			imageAlt: 'AI Automation API and Webhook Integration capability illustration.',
		},
		{
			icon: 'fileText',
			title: 'Document and Invoice Processing',
			description:
				'Parse incoming emails and attachments to extract fields, route documents, and write records into your accounting or ERP system without manual handling.',
			image: '/services/ai-automation/process-automation-document-and-invoice-processing.jpg',
			imageAlt: 'AI Automation Document and Invoice Processing capability illustration.',
		},
		{
			icon: 'barChart',
			title: 'Scheduled Reporting',
			description:
				'Query databases on a schedule, format results, and deliver reports by email or Slack to the right people automatically on whatever cadence the business needs.',
			image: '/services/ai-automation/process-automation-scheduled-reporting.jpg',
			imageAlt: 'AI Automation Scheduled Reporting capability illustration.',
		},
		{
			icon: 'users',
			title: 'Approval Workflow Routing',
			description:
				'Route approval requests to the right person based on configurable rules, with Slack button or email form responses that update records directly without manual data entry.',
			image: '/services/ai-automation/process-automation-approval-workflow-routing.jpg',
			imageAlt: 'AI Automation Approval Workflow Routing capability illustration.',
		},
		{
			icon: 'refreshCw',
			title: 'Error Handling and Retry Logic',
			description:
				'Every automation includes fallback handling, retry attempts, and notification alerts so your team knows immediately when something needs attention.',
			image: '/services/ai-automation/process-automation-error-handling-and-retry-logic.jpg',
			imageAlt: 'AI Automation Error Handling and Retry Logic capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Finance',
			title: 'Invoice Routing from Email to Accounting',
			description:
				'Parse incoming supplier invoices, extract vendor details and amounts, and write the data into Xero or QuickBooks before routing for approval via the relevant manager.',
		},
		{
			industry: 'Sales',
			title: 'CRM Lead Assignment from Forms',
			description:
				'New form submissions trigger an automatic lookup of the assigned sales rep, create a contact record in HubSpot, and fire a Slack notification to the relevant team.',
		},
		{
			industry: 'Operations',
			title: 'Inventory Sync Across Platforms',
			description:
				'Keep stock levels synchronized between Shopify, your warehouse management system, and internal spreadsheets without anyone manually exporting and importing files.',
		},
		{
			industry: 'HR',
			title: 'Employee Onboarding Document Collection',
			description:
				'Trigger a sequence of document request emails on a hire start date, collect returned forms, and update HR records once all required items are received.',
		},
		{
			industry: 'Logistics',
			title: 'Shipment Status Notifications',
			description:
				'Poll carrier APIs on a schedule, detect status changes, and fire email or SMS alerts to customers whenever their shipment moves between stages.',
		},
		{
			industry: 'Finance',
			title: 'Monthly Reconciliation Reports',
			description:
				'Pull transaction records from your payment processor and bank feed, compare against internal records, and deliver a reconciliation summary on the first of each month.',
		},
	],

	technologies: [
		'n8n',
		'Make (Integromat)',
		'Zapier',
		'Python',
		'Node.js',
		'PostgreSQL',
		'REST APIs',
		'Webhooks',
		'Slack API',
		'SMTP',
		'Puppeteer',
		'Playwright',
	],

	benefits: [
		{
			title: 'Fewer Manual Errors',
			description:
				'Removing human data entry from repetitive tasks eliminates transcription mistakes and duplicate records that accumulate over time and require correction.',
		},
		{
			title: 'Staff Time Redirected',
			description:
				'Hours spent on copy-paste tasks get redirected to higher-value work once the underlying processes run without staff attention.',
		},
		{
			title: 'Consistent Process Execution',
			description:
				'Automated workflows apply the same logic every time, regardless of who is working, what day it is, or how busy the team is.',
		},
		{
			title: '24/7 Operation',
			description:
				'Automations run outside business hours, so time-sensitive processes like order confirmations and alert routing happen immediately without waiting for someone to log in.',
		},
		{
			title: 'Full Audit Trail',
			description:
				'Every workflow execution is logged, so you can trace exactly what happened, when, and with what input data if something goes wrong.',
		},
		{
			title: 'Documented and Maintainable',
			description:
				'Every automation comes with a runbook so your internal team can understand, update, and extend the logic without needing to call us back.',
		},
	],

	faqs: [
		{
			q: 'How long does it take to automate a typical business workflow?',
			a: 'Simple automations connecting two or three tools typically take one to two weeks from scoping to handover. Multi-step workflows involving data transformation, conditional routing, and error handling usually take three to five weeks depending on the number of integration points and API complexity.',
		},
		{
			q: 'What happens when one of our connected tools updates their API?',
			a: 'We build automations with version-pinned API connections where possible and document all integration dependencies. If a connected tool changes and breaks the automation, your runbook will include the steps to identify and update the affected connector. We also offer a support retainer to handle breaking changes on your behalf.',
		},
		{
			q: 'Do we need technical staff to maintain the automations after handover?',
			a: 'No. We deliver documented runbooks written for non-technical staff that explain what each automation does, what triggers it, and how to restart it if it stops. Platforms like n8n have visual interfaces your operations team can navigate without writing code.',
		},
		{
			q: 'Can you automate processes that involve legacy software without an API?',
			a: 'Yes. For legacy software that has no API, we build browser automation scripts using tools like Playwright or Puppeteer that navigate the UI, fill in fields, and submit forms exactly as a human operator would.',
		},
	],
	answerSummary:
		'UK and India businesses that need to eliminate manual data entry, spreadsheet copying, and approval-chain delays get workflow automations connecting CRMs, databases, and SaaS tools so their teams focus on higher-value work and operations run without manual intervention.',
};

export default function ProcessAutomationPage() {
	return <SubservicePageLayout data={data} />;
}
