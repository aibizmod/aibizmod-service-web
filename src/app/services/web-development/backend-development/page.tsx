import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Backend Development Services | APIs, Databases, Authentication | aibizmod',
	description:
		'Professional backend development for web and mobile products. APIs, databases, authentication systems, and server-side logic — documented, tested, and yours to own.',
	keywords: [
		'backend development',
		'backend development services',
		'API development',
		'database design',
		'web API development',
		'RESTful API',
		'authentication systems',
		'server-side development',
		'backend engineering',
		'microservices development',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/web-development/backend-development',
	},
	openGraph: {
		title: 'Backend Development | APIs & Databases | aibizmod',
		description:
			'APIs, databases, authentication, and server-side logic built to support your web or mobile product — documented, tested, and yours to own.',
		url: '/services/web-development/backend-development',
	},
};

const data: SubservicePageData = {
	name: 'Backend Development',
	parentName: 'Web Development',
	parentSlug: 'web-development',
	slug: 'backend-development',
	tagline:
		'APIs, databases, authentication systems, and payment integrations built to support web and mobile products. Every endpoint is documented, every integration is tested, and the codebase is yours to run and extend.',
	heroImage:
		'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			"Frontend work gets the attention, but backend problems are what actually break products. An API that doesn't handle errors gracefully, a database schema designed around one use case that can't accommodate the next one, authentication that wasn't built with roles in mind from the start — these are the issues that cause rewrites six months after launch.",
		challengePoints: [
			'API endpoints with no error handling or inconsistent response formats',
			"Database schema that doesn't scale as the product grows",
			"Authentication that doesn't support multiple roles or organisations",
			'No documentation for how the backend works or how to extend it',
		],
		solution:
			'We design the database schema and API structure before writing a line of code, discuss trade-offs upfront, and build with extension in mind. Every endpoint is documented, every integration is tested with real credentials, and the codebase is handed over with enough context for any developer to pick it up.',
		solutionPoints: [
			'Database design reviewed before implementation begins',
			'REST or GraphQL APIs with consistent error handling and versioning',
			'Role-based authentication with JWT or session management',
			'Full API documentation in Postman or OpenAPI format',
		],
	},

	capabilities: [
		{
			icon: 'server',
			title: 'API Development',
			description:
				'REST and GraphQL APIs with consistent endpoint design, proper error codes, rate limiting, and versioning so breaking changes don',
			image: '/services/web-development/backend-development-api-development.jpg',
			imageAlt: 'Web Development API Development capability illustration.',
		},
		{
			icon: 'database',
			title: 'Database Development',
			description:
				'Schema design for relational databases like PostgreSQL or MySQL, including indexes, foreign keys, and migration paths for schema changes.',
			image: '/services/web-development/backend-development-database-development.png',
			imageAlt: 'Web Development Database Development capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Authentication Systems',
			description:
				'User registration, login, session management, JWT tokens, OAuth integrations, and role-based access control built to scale across user types.',
			image: '/services/web-development/backend-development-authentication-systems.jpg',
			imageAlt: 'Web Development Authentication Systems capability illustration.',
		},
		{
			icon: 'workflow',
			title: 'Payment Gateway Integration',
			description:
				'Stripe, PayPal, or Braintree integration for one-time payments, subscriptions, invoicing, and webhook handling for payment events.',
			image: '/services/web-development/backend-development-payment-gateway-integration.jpg',
			imageAlt: 'Web Development Payment Gateway Integration capability illustration.',
		},
		{
			icon: 'cloud',
			title: 'Third-Party Integrations',
			description:
				'Connections to CRMs, ERPs, logistics platforms, email providers, and communication tools via REST APIs and webhook handlers.',
			image: '/services/web-development/backend-development-thirdparty-integrations.jpg',
			imageAlt: 'Web Development Third-Party Integrations capability illustration.',
		},
		{
			icon: 'activity',
			title: 'Server-Side Rendering',
			description:
				'Next.js server-side logic, API routes, and middleware for applications that need data fetched at request time rather than in the browser.',
			image: '/services/web-development/backend-development-serverside-rendering.jpg',
			imageAlt: 'Web Development Server-Side Rendering capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'SaaS',
			title: 'Multi-Tenant API for a Subscription Platform',
			description:
				'An API supporting multiple customer organisations, each with their own users and data, with JWT authentication and plan-based feature flags.',
		},
		{
			industry: 'E-commerce',
			title: 'Order Management Backend',
			description:
				'A backend handling product inventory, order creation, payment processing, and fulfilment status updates with webhook notifications.',
		},
		{
			industry: 'Healthcare',
			title: 'Appointment Booking API',
			description:
				'A scheduling API with availability logic, double-booking prevention, time zone handling, and SMS confirmation on appointment creation.',
		},
		{
			industry: 'Finance',
			title: 'Transaction Reconciliation Service',
			description:
				'A background service that pulls transactions from a payment processor, matches them against internal records, and flags discrepancies.',
		},
		{
			industry: 'Logistics',
			title: 'Shipment Tracking API',
			description:
				'An internal API that aggregates status updates from multiple carrier APIs and serves a unified response to the frontend tracking page.',
		},
		{
			industry: 'Marketplace',
			title: 'Seller Portal Backend',
			description:
				'A backend supporting a marketplace with separate seller and buyer roles, product listings, offer management, and payout calculations.',
		},
	],

	technologies: [
		'Node.js',
		'TypeScript',
		'PostgreSQL',
		'Redis',
		'Prisma',
		'Express',
		'Next.js API Routes',
		'Stripe',
		'JWT',
		'Docker',
		'Postman',
		'GitHub Actions',
	],

	benefits: [
		{
			title: 'Schema Designed Before Build',
			description:
				'The database structure is agreed on before implementation starts, avoiding the expensive rework that comes from schema changes after data is already in production.',
		},
		{
			title: 'Documented APIs',
			description:
				'Every endpoint is documented in Postman or OpenAPI format so your team or future developers know exactly how to interact with the backend without guessing.',
		},
		{
			title: 'Tested Integrations',
			description:
				'Third-party integrations like payment gateways and CRMs are tested with real credentials and edge cases before the code reaches production.',
		},
		{
			title: 'Role-Based Access Built In',
			description:
				'Authentication and permissions are built to support multiple user types from the start rather than bolted on after the fact.',
		},
		{
			title: 'Codebase You Own',
			description:
				'You receive the full repository with no runtime fees or vendor lock-in. The code runs on your infrastructure.',
		},
		{
			title: 'Error Handling That Makes Sense',
			description:
				'APIs return consistent error codes and messages so the frontend can handle failures gracefully without parsing unpredictable responses.',
		},
	],

	faqs: [
		{
			q: 'What database should we use for our project?',
			a: 'For most web applications PostgreSQL is a solid default. It handles relational data, JSON fields, and scales well. If your data is genuinely document-oriented or you need flexible schemas, MongoDB is worth considering. We discuss the trade-offs during scoping so the choice is based on your actual data structure and query patterns.',
		},
		{
			q: 'Do you build both the frontend and backend, or just one?',
			a: 'We can do either. Many projects start with just the backend API and connect it to an existing or separately built frontend. Others are full-stack builds. We scope each project based on what you actually need.',
		},
		{
			q: 'How do you handle environment secrets and credentials?',
			a: 'We use environment variables managed through your deployment platform and never commit secrets to the repository. We provide a documented list of required environment variables for each deployment environment.',
		},
		{
			q: 'What happens if we need to change the database schema after launch?',
			a: 'We set up database migration tooling as part of every backend project so schema changes can be applied and rolled back in a controlled way without manual SQL on the production server.',
		},
	],
	answerSummary:
		'UK and India product teams whose web applications have error-prone APIs, unscalable database schemas, or authentication that does not support roles get backend development with schema-first design, documented endpoints, and tested integrations that support growth without requiring rewrites.',
};

export default function BackendDevelopmentPage() {
	return <SubservicePageLayout data={data} />;
}
