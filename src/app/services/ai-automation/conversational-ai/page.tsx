import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Conversational AI & Chatbot Development | aibizmod',
	description:
		'Conversational AI and chatbot development. Voice and text interfaces that understand natural language and provide intelligent responses.',
	keywords: [
		'conversational AI',
		'chatbot development',
		'AI chatbots',
		'conversational interfaces',
		'NLP',
		'natural language processing',
		'voice assistants',
		'intelligent chatbots',
		'dialogue systems',
	],
	alternates: {
		canonical: 'https://aibizmod.com/services/ai-automation/conversational-ai',
	},
	openGraph: {
		title: 'Conversational AI & Chatbots | NLP | aibizmod',
		description:
			'Conversational AI and chatbot development that understand natural language and provide intelligent responses.',
		url: '/services/ai-automation/conversational-ai',
	},
};

const data: SubservicePageData = {
	name: 'Conversational AI',
	parentName: 'AI Automation',
	parentSlug: 'ai-automation',
	slug: 'conversational-ai',
	tagline:
		'Deploy AI assistants that handle customer inquiries, answer support tickets, and respond to internal queries by drawing from your actual knowledge base and live system data.',
	heroImage:
		'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Support reps waste hours replying to the same basic questions. Customers ask about shipping updates, pricing, and returns at all hours, and appointment availability at all hours, and every simple ticket eats up time that could go to complex cases. Hiring more staff to keep up with tickets gets expensive fast.',
		challengePoints: [
			'Staff copy-pasting answers to simple, repetitive questions',
			'Customers waiting until Monday morning for basic answers',
			'Info buried in docs, wikis, or individual team heads with no central access',
			'Basic chatbots breaking when questions go off-script the predetermined path',
		],
		solution:
			'We build AI bots trained on your actual documentation, guides, and products, product information, and processes. They answer questions accurately and check live database records, and hand off complex requests to your team with full context with full conversation context passed along.',
		solutionPoints: [
			'AI bots trained on your actual docs and product guides',
			'Integrations to look up order status, accounts, and bookings',
			'Support where customers are, from web chat to WhatsApp, and Teams',
			"Smooth handoffs to human agents so customers don't repeat themselves at handoff",
		],
	},

	capabilities: [
		{
			icon: 'messageSquare',
			title: 'AI Chatbot Development',
			description:
				'Purpose-built AI chatbots for websites and apps that answer real questions using your content rather than generic scripted decision trees.',
			image: '/services/ai-automation/conversational-ai-ai-chatbot-development.jpg',
			imageAlt: 'AI Automation AI Chatbot Development capability illustration.',
		},
		{
			icon: 'headphones',
			title: 'Voice Agent Integration',
			description:
				'Phone-based AI agents with speech-to-text input that handle inbound calls, qualify inquiries, and route to the right team member.',
			image: '/services/ai-automation/conversational-ai-voice-agent-integration.jpg',
			imageAlt: 'AI Automation Voice Agent Integration capability illustration.',
		},
		{
			icon: 'lightbulb',
			title: 'Knowledge Base Assistants',
			description:
				'AI assistants that index your internal documentation, wikis, and uploaded files to answer staff questions instantly and accurately.',
			image: '/services/ai-automation/conversational-ai-knowledge-base-assistants.jpg',
			imageAlt: 'AI Automation Knowledge Base Assistants capability illustration.',
		},
		{
			icon: 'globe',
			title: 'Multi-Channel Deployment',
			description:
				'Deploy the same underlying AI assistant across web chat, WhatsApp Business, Slack, Microsoft Teams, and email simultaneously.',
			image: '/services/ai-automation/conversational-ai-multichannel-deployment.jpg',
			imageAlt: 'AI Automation Multi-channel Deployment capability illustration.',
		},
		{
			icon: 'users',
			title: 'Human Handoff Routing',
			description:
				'Define rules for when the AI should escalate to a human agent, with full conversation history passed along so nothing needs to be repeated.',
			image: '/services/ai-automation/conversational-ai-human-handoff-routing.jpg',
			imageAlt: 'AI Automation Human Handoff Routing capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Guardrails and Content Controls',
			description:
				'Configure the AI to stay within defined topics, decline off-topic requests, and respond consistently in your brand voice.',
			image: '/services/ai-automation/conversational-ai-guardrails-and-content-controls.jpg',
			imageAlt: 'AI Automation Guardrails and Content Controls capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'E-commerce',
			title: 'Order Tracking and Returns Handling',
			description:
				'Customers ask about shipment status, return eligibility, and refund timelines. The AI connects to your order management system to answer in real time without staff involvement.',
		},
		{
			industry: 'Professional Services',
			title: 'Initial Client Inquiry Qualification',
			description:
				'Incoming leads chat with an AI that asks structured qualifying questions, identifies service fit, and books a discovery call directly into the team calendar.',
		},
		{
			industry: 'Internal Operations',
			title: 'IT Helpdesk First Response',
			description:
				'Staff submit IT support requests via Slack or Teams. The AI resolves common issues from a knowledge base and creates tickets for anything requiring a human technician.',
		},
		{
			industry: 'Property',
			title: 'Lettings FAQ and Viewing Bookings',
			description:
				'Website visitors ask about property availability, rental terms, and maintenance processes. The AI answers from a knowledge base and books viewing slots in the agency calendar.',
		},
		{
			industry: 'Healthcare',
			title: 'Appointment Booking and Pre-Visit Information',
			description:
				'Patients book appointments, receive pre-appointment instructions, and ask general service questions via an AI assistant integrated with the scheduling system.',
		},
		{
			industry: 'Legal',
			title: 'Initial Matter Intake',
			description:
				'Prospective clients describe their situation via chat. The AI collects structured information, identifies the relevant practice area, and routes to the appropriate solicitor.',
		},
	],

	technologies: [
		'OpenAI GPT-4o',
		'Anthropic Claude API',
		'LangChain',
		'LlamaIndex',
		'Pinecone',
		'Twilio',
		'WhatsApp Business API',
		'Voiceflow',
		'Python',
		'FastAPI',
		'Next.js',
	],

	benefits: [
		{
			title: 'Coverage Outside Business Hours',
			description:
				'AI assistants respond to customer inquiries at any hour, reducing the queue that accumulates overnight and on weekends.',
		},
		{
			title: 'Consistent Answers Across Every Channel',
			description:
				'The same knowledge base powers responses across web, WhatsApp, Slack, and email so customers get accurate answers regardless of where they contact you.',
		},
		{
			title: 'Reduced Ticket Volume for Human Agents',
			description:
				'Automating responses to common, repetitive questions frees support staff to focus on complex cases that require judgment and relationships.',
		},
		{
			title: 'Accurate, Source-Grounded Responses',
			description:
				'Answers are drawn from your actual documentation rather than general training data, which reduces hallucinations and keeps responses relevant to your business.',
		},
		{
			title: 'Structured Escalation',
			description:
				'When a query exceeds the AI scope, the conversation context is passed to a human agent so nothing is repeated and the handoff is seamless.',
		},
		{
			title: 'Measurable Performance',
			description:
				'Every conversation is logged with resolution status, escalation rate, and confidence scores so you can identify where the AI needs improvement over time.',
		},
	],

	faqs: [
		{
			q: 'How is this different from a basic chatbot or FAQ widget?',
			a: 'A basic chatbot follows a rigid decision tree and fails as soon as a user phrases something outside the script. AI assistants understand natural language, draw from a living knowledge base, and handle variations in how a question is asked. They also connect to live data sources for dynamic answers rather than returning static content.',
		},
		{
			q: 'Can the AI access our live system data such as order status or appointment availability?',
			a: 'Yes. We build API connectors between the AI assistant and your order management, CRM, or booking systems. The AI calls these APIs at query time to return real-time data specific to the customer asking.',
		},
		{
			q: 'How do you handle questions the AI cannot answer?',
			a: 'We configure structured escalation rules. When the AI confidence falls below a threshold, or when a user explicitly requests a human, the conversation is routed to your support team with full context so the agent can pick up without the customer needing to repeat themselves.',
		},
		{
			q: 'Will the AI understand our industry-specific terminology?',
			a: 'Yes. We configure the prompt system and knowledge base with your specific terminology, product names, and internal language. For highly specialized domains, we also use retrieval-augmented generation from your technical documentation so answers reflect your actual processes.',
		},
	],
	answerSummary:
		'UK and India businesses wanting to automate customer and internal inquiries get AI assistants trained on their documentation and live system data that handle questions across web chat, WhatsApp, and voice with smooth handoff to human agents when needed.',
};

export default function ConversationalAIPage() {
	return <SubservicePageLayout data={data} />;
}
