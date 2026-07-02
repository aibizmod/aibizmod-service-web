import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Mobile App Backend Services | APIs & Cloud Infrastructure | aibizmod',
	description:
		'Backend infrastructure and API development for mobile applications. Scalable cloud services, databases, and authentication systems for iOS and Android apps.',
	keywords: [
		'mobile app backend',
		'mobile API development',
		'app backend services',
		'mobile cloud services',
		'app server development',
		'mobile database',
		'app authentication',
		'mobile infrastructure',
		'scalable app backend',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/mobile-app-development/backend-services',
	},
	openGraph: {
		title: 'Mobile Backend Services | APIs & Infrastructure | aibizmod',
		description:
			'Backend infrastructure and API development for mobile applications including cloud services, databases, and authentication systems.',
		url: '/services/mobile-app-development/backend-services',
	},
};

const data: SubservicePageData = {
	name: 'Backend Services',
	parentName: 'Mobile App Development',
	parentSlug: 'mobile-app-development',
	slug: 'backend-services',
	tagline:
		'API development, push notification infrastructure, authentication systems, and payment integration for mobile applications — the backend layer that makes apps reliable, secure, and capable of scaling without architectural rebuilds.',
	heroImage:
		'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Mobile apps are only as reliable and capable as their backend infrastructure. APIs without proper authentication expose data to anyone who can inspect network traffic. Push notification delivery rates below 50 percent undermine retention strategies. Payment integrations built on deprecated SDKs break in the middle of checkout flows. Backend systems designed for a hundred users fail under a thousand. These problems are preventable with correct architecture at the build stage.',
		challengePoints: [
			'API security gaps exposing user data to anyone who can intercept or inspect network requests',
			'Push notification infrastructure with low delivery rates undermining re-engagement efforts',
			'Payment integration using outdated SDKs that break with operating system updates',
			'Backend architecture that cannot scale beyond initial user volumes without significant rework',
		],
		solution:
			'We build the backend infrastructure mobile apps need — REST or GraphQL APIs, authentication systems, push notification services, and payment processing — designed for the security, reliability, and scale requirements of production mobile applications.',
		solutionPoints: [
			'Secure REST or GraphQL API with authentication, rate limiting, and versioning',
			'Push notification infrastructure covering APNs and FCM delivery with tracking',
			'Authentication system using industry-standard protocols (JWT, OAuth 2.0, or passwordless)',
			'Payment processing integration with Stripe or in-app purchase for App Store and Play Store billing',
		],
	},

	capabilities: [
		{
			icon: 'server',
			title: 'Mobile API Development',
			description:
				'Build RESTful or GraphQL APIs for mobile clients with proper authentication, input validation, error handling, versioning, and documentation for each endpoint.',
			image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=600&auto=format&fit=crop&q=60',
			imageAlt: 'Developer workspace showing double monitor setups with running code and development IDEs.',
		},
		{
			icon: 'bell',
			title: 'Push Notification Infrastructure',
			description:
				'Set up APNs (iOS) and FCM (Android) push delivery, segmented notification campaigns, delivery tracking, and opt-in management in the app.',
			image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&auto=format&fit=crop&q=60',
			imageAlt: 'Visual mockup representation of direct message bubbles and notifications layout.',
		},
		{
			icon: 'shield',
			title: 'Authentication and Identity',
			description:
				'Implement secure authentication using JWT tokens, OAuth 2.0, social login providers, or passwordless authentication — with refresh token rotation and session management.',
			image: '/services/mobile-app-development/backend-services-auth.png',
			imageAlt: 'Passwordless authentication flow diagram illustrating PINs, Security Key (Yubikey), and Biometrics leading to access granted.',
		},
		{
			icon: 'package',
			title: 'Payment Integration',
			description:
				'Integrate Stripe for card payments, subscriptions, and marketplace payouts, or configure Apple and Google in-app purchase for digital goods and subscription billing.',
			image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&auto=format&fit=crop&q=60',
			imageAlt: 'Stack of physical and digital credit cards representing payment gateways and Stripe.',
		},
		{
			icon: 'database',
			title: 'Data Architecture for Mobile',
			description:
				'Design the database schema, caching layer, and data access patterns for mobile workloads, including pagination, optimistic updates, and conflict resolution for offline sync.',
			image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60',
			imageAlt: 'Glow lines circuit board styling representing technical database caching and systems architecture.',
		},
		{
			icon: 'activity',
			title: 'Backend Monitoring and Scaling',
			description:
				'Configure API monitoring, error tracking, and autoscaling so the backend handles usage spikes and failures are detected and alerted before they affect users.',
			image: 'https://serverpilot.io/static/images/blog/metrics-announcement/metrics-dashboard-servers-general.png',
			imageAlt: 'Server metrics dashboard showing system resource utilization, memory usage, and performance graphs.',
		},
	],

	useCases: [
		{
			industry: 'E-commerce',
			title: 'Mobile Commerce API',
			description:
				'A retailer needed a mobile-optimised API for their shopping app, separate from their web API, with response shapes tuned for mobile bandwidth and a caching layer for product catalogue data.',
		},
		{
			industry: 'SaaS',
			title: 'Authentication System for a Mobile-First Product',
			description:
				'A SaaS product needed passwordless authentication for their mobile app, with magic link delivery via email and session management that balanced security with mobile UX.',
		},
		{
			industry: 'Marketplace',
			title: 'Payment and Payout Integration',
			description:
				'A two-sided marketplace app needed payment processing for customers and scheduled payouts for service providers, implemented using Stripe Connect.',
		},
		{
			industry: 'Media',
			title: 'Push Notification Campaign Infrastructure',
			description:
				'A media app had push notification delivery below 40 percent. We rebuilt their notification infrastructure using FCM and APNs directly with proper device token management, bringing delivery above 90 percent.',
		},
		{
			industry: 'Healthcare',
			title: 'FHIR-Compliant Mobile API',
			description:
				'A healthcare application needed a mobile API layer that handled authentication against an existing NHS identity provider and exposed patient data in FHIR-compatible format.',
		},
		{
			industry: 'Fitness',
			title: 'Backend for a Subscription Fitness App',
			description:
				'A fitness app needed Apple and Google in-app purchase integration for monthly subscriptions, with server-side receipt validation and premium content gating based on subscription status.',
		},
	],

	technologies: [
		'Node.js',
		'Python',
		'FastAPI',
		'Express',
		'PostgreSQL',
		'Redis',
		'Firebase',
		'AWS Lambda',
		'APNs',
		'FCM',
		'Stripe',
		'JWT',
		'OAuth 2.0',
	],

	benefits: [
		{
			title: 'API Security from the Start',
			description:
				'Authentication, rate limiting, and input validation built into the API before it goes to production protects user data and prevents the most common categories of API attack.',
		},
		{
			title: 'Push Notifications That Actually Deliver',
			description:
				'Properly implemented APNs and FCM integration with device token management and delivery tracking produces significantly higher notification delivery rates than basic implementations.',
		},
		{
			title: 'Payment Flows That Do Not Break',
			description:
				'Payment integrations built on current SDKs with proper error handling and server-side validation are reliable across operating system updates and edge cases in the checkout flow.',
		},
		{
			title: 'Backend That Scales with the App',
			description:
				'An API designed for mobile workload patterns — with pagination, caching, and autoscaling configured — handles user growth without requiring architectural rework at scale.',
		},
		{
			title: 'Authentication That Balances Security and UX',
			description:
				'Authentication systems designed for mobile — with biometric options, refresh token rotation, and session persistence — provide security without the friction that drives users to stay logged out.',
		},
		{
			title: 'Data Layer Designed for Mobile Patterns',
			description:
				'Mobile apps have different data access patterns than web applications — shorter, more frequent requests, offline scenarios, optimistic UI updates. Backend designed for these patterns produces a faster, more responsive user experience.',
		},
	],

	faqs: [
		{
			q: 'Should we build our own backend or use a backend-as-a-service platform like Firebase?',
			a: 'Firebase and similar BaaS platforms are a good fit for apps with standard data models and real-time sync requirements where the development cost savings outweigh the vendor dependency and limited customisation. A custom backend is the right choice when you have complex business logic, need deep integration with existing systems, have specific compliance requirements, or will eventually need to move away from per-operation pricing at scale. We assess both options during scoping based on your specific requirements.',
		},
		{
			q: 'How do you implement push notifications that achieve high delivery rates?',
			a: 'The primary causes of low delivery rates are stale device tokens, incorrect APNs certificate or key configuration, sending to unregistered tokens without removing them, and not handling background delivery state correctly on iOS. We implement proper token lifecycle management, configure delivery receipts to detect and remove invalid tokens, and test delivery across app states — foreground, background, and terminated — before launch.',
		},
		{
			q: 'What is the right approach for in-app subscriptions versus payment through our own billing system?',
			a: 'Apps distributed through the App Store and Google Play that sell digital content or subscriptions are required by Apple and Google to use their in-app purchase system, with Apple taking 15 to 30 percent of revenue. For physical goods, services delivered outside the app, or B2B SaaS products, in-app purchase is not required and direct payment via Stripe is more economical. The rules have nuances, and we review your specific product type during scoping to confirm the right approach.',
		},
		{
			q: 'How do you handle API versioning for a mobile app with users on older versions?',
			a: 'Mobile apps cannot force users to update immediately the way web apps can. We implement API versioning from the start so older app versions continue to work after API changes. We maintain old API versions until the percentage of users on affected app versions drops below a threshold, then deprecate with advance notice in app update release notes.',
		},
	],
	answerSummary:
		'UK and India mobile apps whose performance and reliability depend on backend infrastructure get APIs, authentication systems, push notification infrastructure, and payment integrations designed for mobile workload patterns with security and scalability built in.',
};

export default function BackendServicesPage() {
	return <SubservicePageLayout data={data} />;
}
