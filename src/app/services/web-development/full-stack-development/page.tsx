import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Full Stack Web Development Services | aibizmod',
	description:
		'End-to-end web application development: frontend, backend, database, and deployment — one team, one codebase, one clean handover.',
	keywords: [
		'full stack development',
		'full stack developer',
		'web application development',
		'full stack web development',
		'MERN stack development',
		'MEAN stack development',
		'React Node.js development',
		'full stack web services',
		'web development services',
		'end-to-end development',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/web-development/full-stack-development',
	},
	openGraph: {
		title: 'Full Stack Development | React, Node.js & Database | aibizmod',
		description:
			'End-to-end web application development covering frontend, backend, database, and deployment — one team, one codebase, one handover.',
		url: '/services/web-development/full-stack-development',
	},
};

const data: SubservicePageData = {
	name: 'Full Stack Development',
	parentName: 'Web Development',
	parentSlug: 'web-development',
	slug: 'full-stack-development',
	tagline:
		'Web applications built across the full stack — React frontend, Node or Next.js backend, PostgreSQL database, and deployment on your infrastructure. One coherent codebase with consistent patterns across every layer.',
	heroImage:
		'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Splitting a web application across separate frontend and backend teams sounds organised until both teams are waiting on each other, the API contract keeps changing, and the deployment process is owned by neither. The coordination overhead often costs more time than having a single team own the whole stack.',
		challengePoints: [
			'Frontend and backend built by separate teams with mismatched API contracts',
			'Deployment process nobody fully owns or understands end-to-end',
			'Inconsistent patterns between layers that make the codebase harder to maintain',
			'No single source of truth for how all the pieces fit together',
		],
		solution:
			"We build across the full stack with consistent patterns from the database up to the UI, so there's no translation layer between teams and no ambiguity about how data flows through the application. The deployment setup, the documentation, and the handover all cover everything in one package.",
		solutionPoints: [
			'Shared TypeScript types used across frontend and backend',
			'API contract defined before UI development begins',
			'Staging and production deployment configured as part of the build',
			'Single repository or clear monorepo structure with documented conventions',
		],
	},

	capabilities: [
		{
			icon: 'code2',
			title: 'React & Next.js Applications',
			description:
				'Full applications built with Next.js covering both the frontend pages and the backend API routes in a single deployable codebase.',
			image: '/services/web-development/full-stack-development-react-nextjs-applications.jpg',
			imageAlt: 'Web Development React & Next.js Applications capability illustration.',
		},
		{
			icon: 'database',
			title: 'Database Design and Integration',
			description:
				'Schema design, migrations, and ORM setup so the data layer is consistent with the application logic from day one.',
			image: '/services/web-development/full-stack-development-database-design-and-integration.jpg',
			imageAlt: 'Web Development Database Design and Integration capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Authentication and Authorisation',
			description:
				'Login, session management, role-based permissions, and OAuth integration built into the application from the start.',
			image: '/services/web-development/full-stack-development-authentication-and-authorisation.jpg',
			imageAlt: 'Web Development Authentication and Authorisation capability illustration.',
		},
		{
			icon: 'layers',
			title: 'SaaS Product Development',
			description:
				'Multi-tenant applications with separate workspaces, subscription management, and plan-based feature access.',
			image: '/services/web-development/full-stack-development-saas-product-development.jpg',
			imageAlt: 'Web Development SaaS Product Development capability illustration.',
		},
		{
			icon: 'workflow',
			title: 'API and Webhook Integration',
			description:
				'Connections to third-party tools — payment processors, CRMs, communication platforms — wired in with proper error handling.',
			image: '/services/web-development/full-stack-development-api-and-webhook-integration.jpg',
			imageAlt: 'Web Development API and Webhook Integration capability illustration.',
		},
		{
			icon: 'rocket',
			title: 'Deployment and CI/CD',
			description:
				'Automated deployment pipelines with staging and production environments, so releases are consistent and rollbacks are straightforward.',
			image: '/services/web-development/full-stack-development-deployment-and-cicd.jpg',
			imageAlt: 'Web Development Deployment and CI/CD capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'SaaS',
			title: 'Customer Dashboard with Billing',
			description:
				'A multi-tenant SaaS dashboard where each customer sees their own data, manages their subscription, and invites team members — built with Stripe for billing.',
		},
		{
			industry: 'Marketplace',
			title: 'Two-Sided Marketplace Platform',
			description:
				'A platform connecting buyers and sellers with listings, offer management, messaging, and payout processing across two separate user roles.',
		},
		{
			industry: 'Operations',
			title: 'Internal Operations Tool',
			description:
				'A web application replacing a patchwork of spreadsheets for a logistics company — job tracking, status updates, and team assignment in one place.',
		},
		{
			industry: 'Professional Services',
			title: 'Client Portal with Document Sharing',
			description:
				'A secure portal where a professional services firm shares documents, sends invoices, and communicates with clients without email attachments.',
		},
		{
			industry: 'Healthcare',
			title: 'Clinic Booking and Records System',
			description:
				'A web app for a clinic covering online appointment booking, patient records, and staff scheduling — with role-based access for reception, clinicians, and admin.',
		},
		{
			industry: 'Education',
			title: 'Learning Management Platform',
			description:
				'A course delivery platform with video content, progress tracking, assessments, and a certificate generation system built for a training provider.',
		},
	],

	technologies: [
		'Next.js',
		'React',
		'TypeScript',
		'PostgreSQL',
		'Prisma',
		'Tailwind CSS',
		'Node.js',
		'Stripe',
		'Vercel',
		'GitHub Actions',
		'Docker',
		'Playwright',
	],

	benefits: [
		{
			title: 'One Team Owns the Whole Stack',
			description:
				'No handoffs between frontend and backend teams. The same people who built the API built the UI that consumes it, so inconsistencies get caught early.',
		},
		{
			title: 'Consistent Patterns Throughout',
			description:
				'Shared TypeScript types and conventions across the codebase mean the same patterns repeat predictably, making the code easier to read and extend.',
		},
		{
			title: 'Deployment Included',
			description:
				'Staging and production deployment are configured as part of the project, not left as an exercise for the client to figure out after handover.',
		},
		{
			title: 'Single Handover Package',
			description:
				'One repository, one set of docs, one deployment configuration. No separate handover processes for frontend and backend.',
		},
		{
			title: 'Faster Iteration',
			description:
				'Changes that span both the UI and the API get built and tested together, rather than waiting for a backend team to expose a new endpoint before frontend work can start.',
		},
		{
			title: 'Codebase You Own',
			description:
				'No proprietary framework lock-in. The stack uses widely adopted open-source tools that any competent developer can pick up.',
		},
	],

	faqs: [
		{
			q: 'Should we use a separate frontend and backend or a full-stack framework?',
			a: 'It depends on the project. For most web applications Next.js handles both well and keeps things simple. For products that need a separate mobile app consuming the same API, or where the backend is significantly more complex than the frontend, a separate API server makes more sense. We discuss this during scoping.',
		},
		{
			q: 'How do you handle database changes after the application is live?',
			a: 'We set up database migration tooling from the start so schema changes are applied in a controlled, reversible way. Migrations are versioned in the repository alongside the application code.',
		},
		{
			q: 'What does the handover package include?',
			a: 'The repository, a README covering the architecture and development setup, documented environment variables, the deployment configuration, and a walkthrough of how the main application flows work. We run through this together rather than just sending a zip file.',
		},
		{
			q: 'Do you offer ongoing support after the project is delivered?',
			a: 'Yes. We offer a support period after launch to handle any issues that appear in production, and ongoing retainer arrangements for teams that want regular development support beyond the initial build.',
		},
	],
};

export default function FullStackDevelopmentPage() {
	return <SubservicePageLayout data={data} />;
}
