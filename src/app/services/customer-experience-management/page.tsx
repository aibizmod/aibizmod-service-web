import type { Metadata } from 'next';
import ServicePageLayout, {
	type ServicePageData,
	type ServiceCard,
} from '@/components/ServicePageLayout';
import IntegrationHero, {
	CX_ROW1,
	CX_ROW2,
} from '@/components/ui/integration-hero';

export const metadata: Metadata = {
	title: 'Customer Experience Management Services | CRM & CX | aibizmod',
	description:
		'CRM implementation, helpdesk systems, customer engagement, loyalty programmes, and CX automation services that reduce churn and raise customer satisfaction scores.',
	keywords: [
		'customer experience management',
		'crm implementation services',
		'customer engagement platform',
		'helpdesk software implementation',
		'CRM implementation',
		'CRM services',
		'HubSpot implementation',
		'Salesforce implementation',
		'customer service software',
		'CX management',
		'customer relationship management',
		'omnichannel communication',
		'customer support systems',
	],
	alternates: {
		canonical: 'https://aibizmod.com/services/customer-experience-management',
	},
	openGraph: {
		title: 'Customer Experience Management | aibizmod',
		description:
			'CRM implementation, helpdesk systems, customer engagement, loyalty programmes, and CX automation services that reduce churn and raise customer satisfaction scores.',
		url: '/services/customer-experience-management',
	},
};

const data: ServicePageData = {
	name: 'Customer Experience Management',
	tagline:
		'For customer-facing teams and service businesses across the UK, USA, and international markets that need better visibility into client history, we clean CRM databases, configure ticket routing, and connect HubSpot, Zoho, Salesforce, Intercom, and WhatsApp Business. The result is faster agent response, accurate customer records, and measurable improvements in support consistency.',
	heroBullets: [
		'For customer-facing teams that need better visibility into client history and faster support response',
		'CRM database cleanup, ticket routing, and setup of HubSpot, Zoho, Salesforce, Intercom, and WhatsApp Business',
		'Accurate customer records, faster agent response, and consistent support operations',
		'Serving clients in the UK, USA, and internationally',
	],
	slug: 'customer-experience-management',
	iconColor: 'text-pink-600',

	overview: {
		paragraphs: [
			"When a support agent can't see a customer's order history, previous tickets, or billing status in one place, the conversation starts badly. Usually the data exists somewhere. It's just split across tools that don't talk to each other, or sitting in a CRM that hasn't been cleaned since it was set up. The work here is practical: deduplicating contact records, configuring ticket routing so queries reach the right team, connecting WhatsApp or email channels into a shared inbox, and making sure the information agents actually need shows up in the right place at the right time.",
		],
		benefits: [
			'Deduplicated and Structured CRM Contacts',
			'Automated Ticket Routing Rules',
			'Unified Customer Support Histories',
			'Post-Support CSAT Survey Logs',
			'WhatsApp Business Text Configurations',
			'Shared Agent Inboxes in Intercom',
		],
	},

	features: [
		{
			icon: 'database',
			title: 'CRM Data Cleanup',
			desc: 'We run deduplication scripts, map database columns, delete invalid entries, and organize contact history logs.',
		},
		{
			icon: 'workflow',
			title: 'Ticket Routing Logic',
			desc: 'We set up rules that automatically route customer queries to the right support queue based on text analysis or ticket tags.',
		},
		{
			icon: 'eye',
			title: 'History Visibility Setup',
			desc: 'We pull customer invoice values and shipment events directly into your HubSpot or Zoho ticket views.',
		},
		{
			icon: 'messageSquare',
			title: 'Feedback Collection',
			desc: 'We configure CSAT and NPS survey forms that trigger automatically after a ticket is marked resolved, recording scores to the customer profile.',
		},
		{
			icon: 'bell',
			title: 'WhatsApp Business Setup',
			desc: 'We configure WhatsApp API access, set up message templates, and link the channel to HubSpot or Intercom inboxes.',
		},
		{
			icon: 'settings',
			title: 'HubSpot & Salesforce Config',
			desc: 'We customize pipeline stages, build custom properties, and set up team permission profiles.',
		},
	],

	process: [
		{
			icon: 'compass',
			title: 'Database Audit',
			desc: 'We review duplicate contacts, evaluate helpdesk layouts, and map communication channels to find bottlenecks.',
		},
		{
			icon: 'target',
			title: 'Integration Mapping',
			desc: 'We draft CRM properties, ticketing rules, and WhatsApp templates in a specification sheet before setup.',
		},
		{
			icon: 'code2',
			title: 'Systems Configuration',
			desc: 'We run data cleanup scripts, set up routing workflows, connect Intercom or WhatsApp, and build custom layouts.',
		},
		{
			icon: 'rocket',
			title: 'Handover & Go-Live',
			desc: 'We test routing rules with sample tickets, verify survey triggers, and deliver setup guides to your team.',
		},
	],

	faqs: [
		{
			q: 'What systems do you configure for customer experience management?',
			a: 'We configure and clean database systems like HubSpot, Zoho, and Salesforce. We also set up communication inboxes and ticket routing tools in Intercom, Zendesk, and WhatsApp Business API.',
		},
		{
			q: 'Why is CRM data cleanup a part of customer experience?',
			a: 'If your customer profiles are duplicate or disorganized, support agents cannot see accurate invoice histories, purchase dates, or previous logs. Cleaning the database ensures agents have the correct context immediately.',
		},
		{
			q: 'Do you write customer service response scripts?',
			a: 'No. We handle the technical setup—configuring ticket routing queues, API webhooks, databases, and survey triggers. We do not write customer service manuals or provide staffing.',
		},
		{
			q: 'How do automated surveys log customer scores?',
			a: 'We set up GTM triggers or helpdesk actions that send an email or chat link after a ticket closes. When the customer submits a score, the API writes the CSAT or NPS value directly to their CRM profile for reporting.',
		},
	],
	answerSummary:
		'Customer experience management services for UK and India-based businesses. We implement and customise CRM systems, helpdesk platforms, CX automation, and loyalty programmes that reduce churn and improve customer satisfaction scores.',
};

const serviceCards: ServiceCard[] = [
	{
		title: 'CRM Services',
		image:
			'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop',
		bullets: ['CRM Implementation', 'Customization', 'Integration'],
		href: '/services/customer-experience-management/crm-services',
	},
	{
		title: 'Customer Support Systems',
		image:
			'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'Helpdesk Systems',
			'Ticketing Systems',
			'Live Chat',
			'Knowledge Bases',
		],
		href: '/services/customer-experience-management/customer-support-systems',
	},
	{
		title: 'Customer Engagement',
		image:
			'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'Loyalty Programs',
			'Omnichannel Support',
			'WhatsApp Integration',
		],
		href: '/services/customer-experience-management/customer-engagement',
	},
	{
		title: 'Customer Intelligence',
		image:
			'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
		bullets: ['Customer Analytics', 'Retention Tracking'],
		href: '/services/customer-experience-management/customer-intelligence',
	},
	{
		title: 'Automation',
		image:
			'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80&auto=format&fit=crop',
		bullets: ['Workflow Automation', 'AI Chatbots', 'Voice Agents'],
		href: '/services/customer-experience-management/cx-automation',
	},
	{
		title: 'IT Consulting',
		image:
			'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80&auto=format&fit=crop',
		bullets: ['Digital Transformation', 'Technology Roadmaps', 'IT Planning'],
		href: '/services/customer-experience-management/cx-it-consulting',
	},
];

export default function CustomerExpManagementPage() {
	return (
		<ServicePageLayout
			data={data}
			techStackFooter={
				<IntegrationHero iconsRow1={CX_ROW1} iconsRow2={CX_ROW2} />
			}
			serviceCards={serviceCards}
		/>
	);
}
