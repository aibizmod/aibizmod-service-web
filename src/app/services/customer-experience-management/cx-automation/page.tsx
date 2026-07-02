import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Customer Experience Automation & AI Chatbots | aibizmod',
	description:
		'Workflow automation, AI chatbots, and voice agents that handle repetitive customer interactions at scale — freeing your team for complex, high-value conversations.',
	keywords: [
		'CX automation',
		'customer automation',
		'AI chatbots',
		'chatbot development',
		'workflow automation',
		'voice agents',
		'customer workflows',
		'automated support',
		'conversational AI',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/customer-experience-management/cx-automation',
	},
	openGraph: {
		title: 'CX Automation | AI Chatbots | aibizmod',
		description:
			'Workflow automation and AI chatbots that handle customer interactions at scale.',
		url: '/services/customer-experience-management/cx-automation',
	},
};

const data: SubservicePageData = {
	name: 'CX Automation',
	parentName: 'Customer Experience Management',
	parentSlug: 'customer-experience-management',
	slug: 'cx-automation',
	tagline:
		'Workflow automation, AI chatbots, and voice agents that handle repetitive customer interactions at scale — freeing your team for the conversations that actually require a person.',
	heroImage:
		'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Support and customer operations teams spend a large portion of their time on queries that follow predictable patterns — order status, FAQs, appointment rescheduling, account updates. These interactions are repetitive, low-complexity, and do not require a person to resolve. But without the right automation in place, every one of them lands in a human queue, delaying responses for customers who have more complex issues.',
		challengePoints: [
			'Support queues overwhelmed by high volumes of simple, repetitive queries',
			'Customer-facing workflows like appointment booking requiring back-and-forth that could be self-service',
			'No first-line triage to classify and route inbound contacts before they reach an agent',
			'Agent time consumed by status lookup and data entry that automation could handle',
		],
		solution:
			'We identify which customer interactions in your operation follow consistent enough patterns to automate reliably, then build the chatbots, voice agents, or workflow automations that handle them — with clean handoff to a human agent when the interaction goes outside the automated scope.',
		solutionPoints: [
			'AI chatbot deployment handling FAQ, status enquiries, and self-service actions',
			'Voice agent setup for inbound call triage, routing, and automated status responses',
			'Workflow automation connecting form submissions, tickets, and CRM updates without manual steps',
			'Escalation handling so automated flows route ly to a human agent with full context',
		],
	},

	capabilities: [
		{
			icon: 'bot',
			title: 'AI Chatbot Development',
			description:
				'Build and deploy chatbots for your website, app, or messaging platforms that handle FAQ, status queries, and self-service actions with natural language understanding.',
			image: '/services/customer-experience-management/cx-automation-ai-chatbot-development.jpg',
			imageAlt: 'Customer Experience Management AI Chatbot Development capability illustration.',
		},
		{
			icon: 'messageSquare',
			title: 'Voice Agent Setup',
			description:
				'Configure voice AI agents for inbound call handling, triage, and routing — reducing call queue volume for questions that do not require a human agent.',
			image: '/services/customer-experience-management/cx-automation-voice-agent-setup.jpg',
			imageAlt: 'Customer Experience Management Voice Agent Setup capability illustration.',
		},
		{
			icon: 'workflow',
			title: 'CX Workflow Automation',
			description:
				'Automate the operational steps in customer interactions — ticket creation, status updates, escalation notifications, and CRM record updates — using tools like Zapier or Make.',
			image: '/services/customer-experience-management/cx-automation-cx-workflow-automation.jpg',
			imageAlt: 'Customer Experience Management CX Workflow Automation capability illustration.',
		},
		{
			icon: 'messageSquare',
			title: 'Conversational Flow Design',
			description:
				'Map and build the conversation flows that guide customers through self-service journeys from initial query to resolved outcome, with fallback handling at each step.',
			image: '/services/customer-experience-management/cx-automation-conversational-flow-design.jpg',
			imageAlt: 'Customer Experience Management Conversational Flow Design capability illustration.',
		},
		{
			icon: 'zap',
			title: 'Omnichannel Automation',
			description:
				'Deploy the same automation logic across web chat, WhatsApp, email, and voice so customers get consistent self-service options regardless of how they contact you.',
			image: '/services/customer-experience-management/cx-automation-omnichannel-automation.jpg',
			imageAlt: 'Customer Experience Management Omnichannel Automation capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Human Handoff Configuration',
			description:
				'Design the escalation triggers and context-passing logic that route customers from an automated flow to a human agent with the full conversation history and relevant account data.',
			image: '/services/customer-experience-management/cx-automation-human-handoff-configuration.jpg',
			imageAlt: 'Customer Experience Management Human Handoff Configuration capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'E-commerce',
			title: 'Order Status Chatbot',
			description:
				'An online retailer deployed a chatbot handling order status, returns, and delivery queries, deflecting 40 percent of inbound support contacts that previously required agent involvement.',
		},
		{
			industry: 'Healthcare',
			title: 'Appointment Booking Voice Agent',
			description:
				'A clinic set up a voice agent that handled new appointment bookings, rescheduling, and cancellations over the phone, freeing reception staff for in-clinic patient interactions.',
		},
		{
			industry: 'Telecoms',
			title: 'Account Management Chatbot',
			description:
				'A telecom provider deployed a web chatbot for account top-ups, usage queries, and plan changes, reducing call centre volume for low-complexity interactions.',
		},
		{
			industry: 'Financial Services',
			title: 'FAQ and Triage Automation',
			description:
				'A lending company automated FAQ responses and lead triage via a web chatbot, routing qualified enquiries to the right product team with pre-filled application context.',
		},
		{
			industry: 'Hospitality',
			title: 'Guest Services Automation Via WhatsApp',
			description:
				'A hotel chain deployed a WhatsApp chatbot handling check-in instructions, room service ordering, and maintenance requests, reducing front desk call volume during peak hours.',
		},
		{
			industry: 'Professional Services',
			title: 'Client Onboarding Workflow',
			description:
				'A consulting firm automated their client onboarding flow from signed contract to first meeting, with document collection, system access provisioning, and calendar scheduling handled without manual steps.',
		},
	],

	technologies: [
		'Zapier',
		'Make',
		'n8n',
		'Intercom',
		'Drift',
		'Dialogflow',
		'OpenAI API',
		'Voiceflow',
		'Twilio',
		'WhatsApp Business API',
		'HubSpot',
	],

	benefits: [
		{
			title: 'High-Volume Simple Queries Handled Without Agents',
			description:
				'Automating FAQ, status, and self-service interactions means your support team handles the interactions that actually require judgement rather than spending their shift on lookups.',
		},
		{
			title: 'Faster Response for Common Queries',
			description:
				'An automated first response is immediate. Customers with standard queries get an answer in seconds rather than waiting in a queue for a human agent to become available.',
		},
		{
			title: 'Consistent Customer Experience at Scale',
			description:
				'Automated interactions deliver the same response quality regardless of time of day, queue length, or individual agent knowledge, removing variability from high-volume touchpoints.',
		},
		{
			title: 'Reduced Agent Handling Time',
			description:
				'When automation handles the data lookup and context gathering before escalating to a human agent, the agent spends less time per ticket and can handle higher volumes.',
		},
		{
			title: 'Available Outside Business Hours',
			description:
				'Chatbots and voice agents operate continuously, so customers can self-serve or leave structured requests at any time without waiting for office hours.',
		},
		{
			title: 'Clean Escalation to Human Agents',
			description:
				'Well-designed handoff logic means customers do not have to repeat themselves when moving from automated to human support, because the agent receives the conversation context.',
		},
	],

	faqs: [
		{
			q: 'How do we decide which interactions are suitable for automation?',
			a: 'We look at two factors: frequency and predictability. High-frequency interactions are the candidates with the most volume impact. Predictability determines whether automation can handle them reliably. Order status, opening hours, FAQ, and appointment booking are typically strong candidates. Queries involving sensitive account issues, complaints, or significant financial decisions are better kept with human agents. We map this during scoping before any automation is built.',
		},
		{
			q: "What happens when a chatbot cannot answer a customer's query?",
			a: 'We build explicit fallback logic into every automated flow. When the chatbot cannot resolve a query — because the intent is unclear, the question is outside scope, or the customer requests a human — the flow escalates gracefully to a live agent with the conversation history attached. The customer does not have to repeat themselves.',
		},
		{
			q: 'Can automation be deployed on WhatsApp as well as our website?',
			a: 'Yes. We build automation flows that work across web chat, WhatsApp Business, and email. The same core logic runs on each channel, adapted for the interaction model of each platform. WhatsApp requires message template approval for certain message types, which we handle as part of the setup.',
		},
		{
			q: 'How do you measure whether the automation is working?',
			a: 'The primary metrics are deflection rate (queries resolved without human intervention), containment rate (percentage of automated sessions that did not escalate), and customer satisfaction scores for automated versus human interactions. We set up dashboards covering these from day one so you can monitor performance and identify which flows need improvement.',
		},
	],
	answerSummary:
		'UK and India support teams overwhelmed by high volumes of repetitive customer queries get AI chatbots, voice agents, and workflow automations that handle standard interactions at scale with clean escalation to human agents when needed.',
};

export default function CXAutomationPage() {
	return <SubservicePageLayout data={data} />;
}
