import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Generative AI Solutions & Integration Services | aibizmod',
	description:
		'Generative AI integration and custom solutions. LLM APIs, prompt engineering, and AI-powered systems built into your products.',
	keywords: [
		'generative AI',
		'LLM integration',
		'OpenAI API',
		'ChatGPT integration',
		'prompt engineering',
		'AI content generation',
		'large language models',
		'AI systems',
		'generative models',
	],
	alternates: {
		canonical: 'https://aibizmod.com/services/ai-automation/generative-ai',
	},
	openGraph: {
		title: 'Generative AI Solutions | LLM Integration | aibizmod',
		description:
			'Generative AI integration and custom solutions powered by large language models and prompt engineering.',
		url: '/services/ai-automation/generative-ai',
	},
};

const data: SubservicePageData = {
	name: 'Generative AI',
	parentName: 'AI Automation',
	parentSlug: 'ai-automation',
	slug: 'generative-ai',
	tagline:
		'Integrate large language models into your product or internal operations to handle content generation, document processing, and decision support at the scale your team cannot match manually.',
	heroImage:
		'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Businesses produce large volumes of documents, queries, and communications that require language understanding but do not need human creativity. Support tickets need summarising, reports need drafting, product descriptions need generating from data sheets, and customer emails need appropriate replies. Doing this at scale requires either significant headcount or a different approach.',
		challengePoints: [
			'Manual content production that takes hours per piece across multiple staff members',
			'Inconsistent output quality when different team members handle similar tasks',
			'Documents that need reading, extracting, and classifying before the real work can begin',
			'No way to make internal knowledge searchable or accessible to teams at query time',
		],
		solution:
			'We identify which language tasks in your business are repetitive and rule-bound, then build generative AI pipelines that handle them reliably, with appropriate guardrails, source attribution, and human review checkpoints where the stakes require it.',
		solutionPoints: [
			'RAG systems that answer questions from your actual internal documents',
			'LLM pipelines for document classification, summarisation, and extraction',
			'Custom GPT assistants configured for your specific use case',
			'API integration into your existing applications and workflows',
		],
	},

	capabilities: [
		{
			icon: 'bot',
			title: 'Custom GPT Development',
			description:
				'Design and build custom GPT assistants or Claude-based agents configured specifically for your use case, with system prompts, context, and behavioural guardrails.',
			image: '/services/ai-automation/generative-ai-custom-gpt-development.jpg',
			imageAlt: 'AI Automation Custom GPT Development capability illustration.',
		},
		{
			icon: 'database',
			title: 'RAG System Development',
			description:
				'Build Retrieval-Augmented Generation systems that search your indexed documents and return answers grounded in your actual content rather than general training data.',
			image: '/services/ai-automation/generative-ai-rag-system-development.jpg',
			imageAlt: 'AI Automation RAG System Development capability illustration.',
		},
		{
			icon: 'code2',
			title: 'LLM Application Integration',
			description:
				'Embed LLM capabilities into your existing web applications, internal tools, or workflows via API, with proper authentication and rate limit handling.',
			image: '/services/ai-automation/generative-ai-llm-application-integration.jpg',
			imageAlt: 'AI Automation LLM Application Integration capability illustration.',
		},
		{
			icon: 'pencil',
			title: 'Prompt Engineering',
			description:
				'Design robust, reliable prompt systems that produce consistent outputs across different input variations, reducing hallucination and improving answer quality.',
			image: '/services/ai-automation/generative-ai-prompt-engineering.jpg',
			imageAlt: 'AI Automation Prompt Engineering capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Enterprise AI Deployment',
			description:
				'Deploy AI solutions within your existing cloud infrastructure with access controls, audit logging, and data handling that meets your compliance requirements.',
			image: '/services/ai-automation/generative-ai-enterprise-ai-deployment.jpg',
			imageAlt: 'AI Automation Enterprise AI Deployment capability illustration.',
		},
		{
			icon: 'workflow',
			title: 'AI Output Pipelines',
			description:
				'Chain AI-generated outputs into downstream processes automatically, from draft content into review queues to classified documents into correct filing destinations.',
			image: '/services/ai-automation/generative-ai-ai-output-pipelines.jpg',
			imageAlt: 'AI Automation AI Output Pipelines capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Legal',
			title: 'Contract Summarisation and Clause Extraction',
			description:
				'LLM pipelines process incoming contracts, extract key clause types, flag non-standard terms, and produce structured summaries for review by the legal team.',
		},
		{
			industry: 'Healthcare',
			title: 'Clinical Note Structuring',
			description:
				'Unstructured clinical notes are processed by an AI pipeline that identifies diagnoses, medications, and follow-up actions, converting free text into structured records.',
		},
		{
			industry: 'E-commerce',
			title: 'Product Description Generation from Data Sheets',
			description:
				'Product specifications from suppliers are fed into an LLM pipeline that generates SEO-optimised product descriptions at scale, removing manual copywriting.',
		},
		{
			industry: 'Finance',
			title: 'Earnings Report Analysis',
			description:
				'Quarterly earnings documents are indexed and queried by an internal AI assistant that answers analyst questions by citing specific passages from the source material.',
		},
		{
			industry: 'Property',
			title: 'Tenancy Document Processing',
			description:
				'Incoming tenancy applications are processed by an AI that extracts key applicant data, checks completeness, and populates the property management system.',
		},
		{
			industry: 'Customer Support',
			title: 'Support Ticket Triage and Response Drafting',
			description:
				'Incoming support tickets are classified by topic and urgency. The AI drafts a response based on similar resolved tickets and knowledge base articles for agent review.',
		},
	],

	technologies: [
		'OpenAI GPT-4o',
		'Anthropic Claude API',
		'LangChain',
		'LlamaIndex',
		'Pinecone',
		'Chroma',
		'Weaviate',
		'Python',
		'FastAPI',
		'Next.js',
		'Vercel AI SDK',
	],

	benefits: [
		{
			title: 'Content at Volume',
			description:
				'Language tasks that previously required hours of staff time run as automated pipelines, producing consistent output at any scale without additional headcount.',
		},
		{
			title: 'Knowledge Made Searchable',
			description:
				'RAG systems turn static document archives into queryable knowledge bases, so staff get precise answers in seconds rather than searching manually.',
		},
		{
			title: 'Consistent Quality Standards',
			description:
				'Prompted LLMs apply the same logic and output format every time, reducing the quality variation that comes from different staff handling similar tasks.',
		},
		{
			title: 'Source-Grounded Answers',
			description:
				'RAG architecture grounds responses in your actual documents rather than general training data, reducing hallucinations and supporting answer citations.',
		},
		{
			title: 'Faster Document Throughput',
			description:
				'Document processing pipelines handle intake, classification, extraction, and routing without manual handling, clearing backlogs and reducing turnaround time.',
		},
		{
			title: 'Embedded in Existing Tools',
			description:
				'AI capabilities are integrated into your current applications rather than replacing them, so staff work in familiar environments with AI handling the language layer.',
		},
	],

	faqs: [
		{
			q: 'What is the difference between a fine-tuned model and a RAG system?',
			a: "Fine-tuning adjusts the model's weights using your data, changing how it responds at a foundational level. This is expensive and mostly useful for style adaptation or specialised domain language. RAG retrieves relevant documents from an index at query time and provides them as context, without changing the base model. RAG is better for most business use cases where the data changes frequently or needs to stay up to date.",
		},
		{
			q: 'How do you prevent the AI from giving wrong or fabricated answers?',
			a: 'For RAG systems, we use strict source-grounding: the model only answers based on retrieved documents and indicates when no relevant content was found. We configure appropriate confidence thresholds, add human review checkpoints for high-stakes outputs, and test systematically with adversarial inputs to identify failure modes before deployment.',
		},
		{
			q: 'Is our company data kept private when we use these models?',
			a: 'This depends on the deployment model we use. API calls to OpenAI or Anthropic do not use your data to train future models under their business agreements. For highest sensitivity requirements, we can deploy open-source models like Llama within your own cloud infrastructure, ensuring your data never leaves your environment.',
		},
		{
			q: 'Can the AI output feed directly into our existing software?',
			a: 'Yes. We build structured output pipelines where the LLM produces JSON or formatted data rather than free text, which then feeds directly into your application logic, CRM, document management system, or workflow automation.',
		},
	],
};

export default function GenerativeAIPage() {
	return <SubservicePageLayout data={data} />;
}
