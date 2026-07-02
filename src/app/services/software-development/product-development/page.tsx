import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'SaaS Product Development & MVP Build | aibizmod',
	description:
		'MVP development and SaaS product builds for founders bringing a software product to market — from validated concept to production-ready, scalable application.',
	keywords: [
		'product development',
		'SaaS development',
		'MVP development',
		'startup software',
		'product engineering',
		'scalable products',
		'web product development',
		'software product development',
		'digital product development',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/software-development/product-development',
	},
	openGraph: {
		title: 'Product Development | SaaS & MVP | aibizmod',
		description:
			'End-to-end product development from concept to launch. SaaS platforms, startup MVPs, and scalable products built for growth.',
		url: '/services/software-development/product-development',
	},
};

const data: SubservicePageData = {
	name: 'Product Development',
	parentName: 'Software Development',
	parentSlug: 'software-development',
	slug: 'product-development',
	tagline:
		'MVP development, SaaS product builds, and ongoing product maintenance for founders and businesses bringing a software product to market — from validated concept to production-ready application built to scale.',
	heroImage:
		'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Product ideas fail in development for predictable reasons: building too much before getting user feedback, building for the ideal end-state rather than the minimum needed to validate the hypothesis, and underestimating the infrastructure work required to make a product production-ready rather than prototype-ready. Founders and product teams need a development partner who can set realistic scope, build quickly, and scale the product as it grows without requiring a full rebuild.',
		challengePoints: [
			'MVP scope defined too broadly, delaying launch until more can be built rather than validating the core value',
			'Prototype-quality code that works but cannot handle production traffic or scale',
			'No authentication, billing, or operational infrastructure because the prototype assumed those would be added later',
			'Development partner who builds to spec without product input, producing technically correct but commercially wrong solutions',
		],
		solution:
			'We build MVPs and SaaS products that are genuinely production-ready at launch — with authentication, billing, monitoring, and the deployment infrastructure a live product needs. Scope is discussed and challenged during discovery so the first version tests the right hypothesis without unnecessary delay.',
		solutionPoints: [
			'Scoped MVP with clear hypothesis definition so the first version validates what matters most',
			'Production-ready from launch with authentication, billing, monitoring, and deployment pipeline',
			"Architecture designed for the product's likely growth path, avoiding the most common rebuild triggers",
			'Ongoing development relationship for iteration after launch based on user data',
		],
	},

	capabilities: [
		{
			icon: 'zap',
			title: 'MVP Development',
			description:
				'Build the minimum version of your product needed to validate the core hypothesis with real users, scoped to launch quickly without compromising production readiness.',
			image: '/services/software-development/product-development-mvp-development.jpg',
			imageAlt: 'Software Development MVP Development capability illustration.',
		},
		{
			icon: 'globe',
			title: 'SaaS Product Development',
			description:
				'Build subscription software products with multi-tenant architecture, user management, billing integration, and the operational infrastructure required for a commercial SaaS product.',
			image: '/services/software-development/product-development-saas-product-development.jpg',
			imageAlt: 'Software Development SaaS Product Development capability illustration.',
		},
		{
			icon: 'layers',
			title: 'Technical Architecture for Scale',
			description:
				'Design product architecture that handles current requirements and the growth trajectory your product is planning for, avoiding the costly rearchitecture that comes from early decisions made without scale in mind.',
			image: '/services/software-development/product-development-technical-architecture-for-scale.jpg',
			imageAlt: 'Software Development Technical Architecture for Scale capability illustration.',
		},
		{
			icon: 'users',
			title: 'User Authentication and Access Management',
			description:
				'Implement authentication, authorisation, team/organisation management, and role-based access — the infrastructure every SaaS product needs that is rarely just a week',
			image: '/services/software-development/product-development-user-authentication-and-access-management.jpg',
			imageAlt: 'Software Development User Authentication and Access Management capability illustration.',
		},
		{
			icon: 'package',
			title: 'Billing and Subscription Integration',
			description:
				'Integrate Stripe for subscription billing, trial management, plan upgrades, and revenue reporting — with webhook handling and the billing management UI your customers need.',
			image: '/services/software-development/product-development-billing-and-subscription-integration.jpg',
			imageAlt: 'Software Development Billing and Subscription Integration capability illustration.',
		},
		{
			icon: 'activity',
			title: 'Post-Launch Product Iteration',
			description:
				'Ongoing development cycles based on user feedback and analytics data — building the features that usage data shows users need, not the ones assumed during initial design.',
			image: '/services/software-development/product-development-postlaunch-product-iteration.jpg',
			imageAlt: 'Software Development Post-launch Product Iteration capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'SaaS',
			title: 'B2B SaaS MVP for a Workforce Management Product',
			description:
				'A founder with a validated problem hypothesis needed an MVP built in eight weeks. We scoped the core workflow, built it with production-quality authentication and billing, and launched to the first paying customers on schedule.',
		},
		{
			industry: 'Marketplace',
			title: 'Two-Sided Marketplace MVP',
			description:
				'A marketplace product needed both a supply-side (providers) and demand-side (customers) experience. We built the MVP with separate onboarding flows, payment escrow, and the matching logic specific to their market.',
		},
		{
			industry: 'FinTech',
			title: 'Financial Data SaaS Product',
			description:
				'A fintech startup built a data analytics product for financial advisers with multi-tenant architecture, Stripe billing, and a dashboard that processed and visualised adviser portfolio data.',
		},
		{
			industry: 'PropTech',
			title: 'Property Management SaaS',
			description:
				'A property technology company launched a SaaS product for landlords covering tenancy management, maintenance requests, and financial reporting — built as a multi-tenant SaaS with a self-service sign-up flow.',
		},
		{
			industry: 'Healthcare',
			title: 'Clinical Pathway Management Tool',
			description:
				'A healthcare entrepreneur built a clinical pathway management product for NHS trusts, with NHS login integration and a 14-week MVP timeline that enabled paid pilots with two trusts.',
		},
		{
			industry: 'EdTech',
			title: 'Online Course Platform MVP',
			description:
				'An education company built an MVP learning platform with course creation tools, student progress tracking, certificate generation, and Stripe-based course purchases.',
		},
	],

	technologies: [
		'Next.js',
		'TypeScript',
		'PostgreSQL',
		'Prisma',
		'Stripe',
		'Auth.js',
		'Tailwind CSS',
		'Vercel',
		'AWS',
		'Resend',
		'Sentry',
		'Datadog',
	],

	benefits: [
		{
			title: 'Production-Ready from Day One',
			description:
				'An MVP that is production-ready at launch — with proper authentication, monitoring, and billing — can onboard paying customers immediately rather than requiring further infrastructure work before commercial use.',
		},
		{
			title: 'Scope Validated Before Build',
			description:
				'Working through the hypothesis the MVP needs to test before building it reduces the risk of spending the build budget on features that are not needed to validate the core value.',
		},
		{
			title: 'Architecture That Does Not Need Rebuilding at Scale',
			description:
				'Product architecture designed for the likely growth path avoids the costly partial rebuild that is common at the point where a product reaches meaningful scale.',
		},
		{
			title: 'Billing Infrastructure Included',
			description:
				'Subscription billing, trial management, and upgrade flows require more implementation effort than most founders expect. Including them from the start means the product can collect revenue immediately after launch.',
		},
		{
			title: 'Data to Iterate From',
			description:
				'Analytics instrumented at launch produces the retention and usage data needed to make evidence-based decisions about what to build next, rather than relying on assumption about what users need.',
		},
		{
			title: 'Development Partnership Beyond Launch',
			description:
				'An ongoing relationship with the development team that built the product enables faster iteration, because context about why decisions were made does not need to be re-established with each new feature.',
		},
	],

	faqs: [
		{
			q: 'How do you define what should and should not be in an MVP?',
			a: 'We work through the core hypothesis — what user behaviour change does this product need to demonstrate to be considered successful? We then scope backward from that hypothesis to the minimum feature set needed to enable it. Features that are clearly needed for commercial success (authentication, billing) are included. Features that expand the use case or improve existing functionality go on the backlog for post-launch iteration.',
		},
		{
			q: 'How long does an MVP typically take to build?',
			a: 'A genuinely production-ready MVP covering a focused use case takes eight to sixteen weeks. Marketplaces, multi-tenant SaaS products, and products requiring regulatory compliance take longer — typically sixteen to twenty-four weeks. These timelines assume clear requirements and available stakeholders for decision-making; unclear requirements or slow feedback extend timelines significantly.',
		},
		{
			q: 'Can you take over development of a product that was started by another team?',
			a: 'Yes, though we start with a technical review of the existing codebase to understand its quality, architecture, and the extent of any technical debt. We share the findings with you before agreeing to take over development, so you understand what you are inheriting and what additional work may be needed before efficient iteration is possible.',
		},
		{
			q: 'Do you provide product management support alongside development?',
			a: 'We provide product input — challenge scope, suggest interaction patterns, flag technical implications of product decisions — but we do not operate as the product manager. The product decisions about what to build and in what priority order are yours. We work best when the client can give us a clear brief and fast feedback, and we contribute the technical perspective to product decisions rather than making them.',
		},
	],
	answerSummary:
		'UK and India founders and product teams bringing a software product to market get MVP and SaaS builds that are genuinely production-ready at launch with authentication, billing, monitoring, and architecture designed for the growth path without requiring a rebuild.',
};

export default function ProductDevelopmentPage() {
	return <SubservicePageLayout data={data} />;
}
