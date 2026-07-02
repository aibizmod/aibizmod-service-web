import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Helpdesk & Customer Support System Implementation | aibizmod',
	description:
		'Zendesk, Freshdesk, and Intercom implementation — ticketing, live chat, and knowledge bases that help support teams respond faster and resolve more on first contact.',
	keywords: [
		'customer support systems',
		'helpdesk software',
		'ticketing system',
		'live chat',
		'support platform',
		'service desk',
		'support management',
		'customer service software',
		'support tools',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/customer-experience-management/customer-support-systems',
	},
	openGraph: {
		title: 'Customer Support Systems | Helpdesk & Ticketing | aibizmod',
		description:
			'Helpdesk and ticketing platform implementations that improve support team efficiency and performance.',
		url: '/services/customer-experience-management/customer-support-systems',
	},
};

const data: SubservicePageData = {
	name: 'Customer Support Systems',
	parentName: 'Customer Experience Management',
	parentSlug: 'customer-experience-management',
	slug: 'customer-support-systems',
	tagline:
		'Helpdesk, ticketing, and live chat platform implementations that give support teams the tools to respond faster, resolve more on first contact, and track performance accurately.',
	heroImage:
		'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Support teams managing customer queries through shared email inboxes have no visibility into who owns a query, what the status is, or how long it has been open. Requests get missed, duplicated, or answered inconsistently. There is no record of what was agreed, no way to report on response times, and no mechanism to flag recurring issues back to the product or operations team.',
		challengePoints: [
			'Support queries handled through shared email inboxes with no ownership or status tracking',
			'No first-response time data, so SLA performance is unknown and unmanageable',
			'Agents answering the same questions from scratch without access to a knowledge base',
			'Escalations handled informally with no audit trail of what was communicated and when',
		],
		solution:
			'We implement helpdesk and ticketing platforms configured for your support team structure, including triage rules, SLA settings, escalation paths, and a knowledge base so agents handle queries faster and customers get consistent answers.',
		solutionPoints: [
			'Ticketing system configured with triage rules, queues, and ownership assignment',
			'SLA policies and priority rules so high-urgency requests are always surfaced',
			'Knowledge base setup with articles mapped to common query types',
			'Reporting dashboards covering response time, resolution rate, and CSAT',
		],
	},

	capabilities: [
		{
			icon: 'mail',
			title: 'Helpdesk Implementation',
			description:
				'Set up Zendesk, Freshdesk, or HubSpot Service Hub with the ticket structure, queues, and routing rules that match how your support team operates.',
			image: '/services/customer-experience-management/customer-support-systems-helpdesk-implementation.jpg',
			imageAlt: 'Customer Experience Management Helpdesk Implementation capability illustration.',
		},
		{
			icon: 'messageSquare',
			title: 'Live Chat Configuration',
			description:
				'Deploy and configure live chat on your website or app, with routing logic, business hours, fallback handling, and integration with your ticketing system.',
			image: '/services/customer-experience-management/customer-support-systems-live-chat-configuration.jpg',
			imageAlt: 'Customer Experience Management Live Chat Configuration capability illustration.',
		},
		{
			icon: 'fileText',
			title: 'Knowledge Base Setup',
			description:
				'Build a structured knowledge base with articles covering your most common support queries, formatted for both customer self-service and agent reference.',
			image: '/services/customer-experience-management/customer-support-systems-knowledge-base-setup.jpg',
			imageAlt: 'Customer Experience Management Knowledge Base Setup capability illustration.',
		},
		{
			icon: 'bell',
			title: 'SLA and Escalation Rules',
			description:
				'Configure response time targets, priority levels, and escalation paths so urgent issues are always routed correctly and SLA breaches are flagged before they occur.',
			image: '/services/customer-experience-management/customer-support-systems-sla-and-escalation-rules.jpg',
			imageAlt: 'Customer Experience Management SLA and Escalation Rules capability illustration.',
		},
		{
			icon: 'users',
			title: 'Multi-Channel Support Configuration',
			description:
				'Unify email, live chat, social, and phone contact into a single ticketing queue so agents have a complete picture regardless of how the customer contacted you.',
			image: '/services/customer-experience-management/customer-support-systems-multichannel-support-configuration.jpg',
			imageAlt: 'Customer Experience Management Multi-channel Support Configuration capability illustration.',
		},
		{
			icon: 'lineChart',
			title: 'Support Reporting Setup',
			description:
				'Build dashboards covering ticket volume, first response time, resolution time, agent workload, and customer satisfaction scores for management visibility.',
			image: '/services/customer-experience-management/customer-support-systems-support-reporting-setup.jpg',
			imageAlt: 'Customer Experience Management Support Reporting Setup capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'E-commerce',
			title: 'Zendesk Implementation for Online Retailer',
			description:
				'A growing e-commerce brand replaced a shared Gmail inbox with Zendesk, reducing average first response time from 18 hours to under 3 hours within the first month.',
		},
		{
			industry: 'SaaS',
			title: 'In-App Support Chat for Software Product',
			description:
				'A SaaS company added in-app live chat via Intercom, connected to their existing CRM so support agents saw account and subscription context before the conversation started.',
		},
		{
			industry: 'Healthcare',
			title: 'Patient Enquiry Management System',
			description:
				'A private clinic set up a GDPR-compliant ticketing system for patient enquiries, with strict routing to ensure sensitive queries only reached appropriately qualified staff.',
		},
		{
			industry: 'Logistics',
			title: 'Multi-Channel Support Consolidation',
			description:
				'A logistics company was managing support across email, WhatsApp, and phone with no unified view. A Freshdesk implementation consolidated all channels into a single queue.',
		},
		{
			industry: 'Financial Services',
			title: 'Knowledge Base for Compliance Queries',
			description:
				'A financial services firm built an internal knowledge base covering regulatory and compliance queries, reducing the time agents spent researching answers for standard questions.',
		},
		{
			industry: 'Professional Services',
			title: 'SLA Reporting for a Managed Service Provider',
			description:
				'An MSP needed verifiable SLA reporting for their clients. Helpdesk configuration added automated SLA tracking and monthly report exports for each client account.',
		},
	],

	technologies: [
		'Zendesk',
		'Freshdesk',
		'HubSpot Service Hub',
		'Intercom',
		'Jira Service Management',
		'Zoho Desk',
		'Crisp',
		'WhatsApp Business API',
		'Slack',
	],

	benefits: [
		{
			title: 'Queries Get Resolved Faster',
			description:
				'A structured ticketing system with SLA rules and a knowledge base reduces average resolution time by removing the back-and-forth of unstructured inbox management.',
		},
		{
			title: 'Nothing Falls Through',
			description:
				'Every query becomes a ticket with an owner, a status, and a due date. Items cannot be lost, forgotten, or indefinitely delayed without a visible SLA breach.',
		},
		{
			title: 'Consistent Customer Responses',
			description:
				'Knowledge base articles and response templates ensure customers get accurate, consistent answers regardless of which agent handles their query.',
		},
		{
			title: 'Measurable Support Performance',
			description:
				'Response time, resolution rate, and customer satisfaction data allow you to manage support as a measurable function rather than an opaque operational cost.',
		},
		{
			title: 'Scalable Without Proportional Headcount',
			description:
				'Self-service knowledge bases and chat deflection reduce ticket volume, so support capacity scales more efficiently than a one-agent-per-X-customers model.',
		},
		{
			title: 'Full Audit Trail',
			description:
				'Every communication, escalation, and resolution step is logged in the ticketing system, creating a defensible record for complaints, disputes, or regulatory enquiries.',
		},
	],

	faqs: [
		{
			q: 'Which helpdesk platform do you recommend for a small support team?',
			a: "For teams under 10 agents, Freshdesk's free tier or HubSpot Service Hub's Starter plan offer solid foundations without cost overhead. Zendesk is a strong choice if you anticipate growth and need more sophisticated automation and reporting. Intercom is the right fit if you are primarily running chat-based support on a web app or SaaS product. We recommend based on your channel mix and expected volume.",
		},
		{
			q: 'How do you handle migration from a shared email inbox to a helpdesk?',
			a: 'We configure the helpdesk to pull in emails from your existing support address so there is no disruption during the transition. Existing open queries can be imported as tickets. The changeover is transparent to customers — they continue emailing the same address.',
		},
		{
			q: 'Can the helpdesk integrate with our existing CRM?',
			a: 'Yes. Most major helpdesk platforms have native integrations with Salesforce, HubSpot, and Zoho, so ticket data and customer history are shared between systems. Where native integration is limited, we use Zapier or direct API connections.',
		},
		{
			q: 'How long does it take to build and populate a knowledge base?',
			a: 'A foundational knowledge base covering the top 20 to 30 customer queries typically takes one to two weeks to structure and write. We work with your support team to identify the most common queries and draft the articles, then hand over for review and approval. Ongoing content is managed by your team after handover.',
		},
	],
	answerSummary:
		'UK and India support teams managing queries through shared inboxes without ownership or tracking get helpdesk and ticketing platform implementations with triage rules, SLA settings, knowledge bases, and reporting dashboards for measurable performance.',
};

export default function CustomerSupportSystemsPage() {
	return <SubservicePageLayout data={data} />;
}
