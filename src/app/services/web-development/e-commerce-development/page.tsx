import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'E-Commerce Website Development | Custom Stores | aibizmod',
	description:
		'Custom e-commerce stores, multi-vendor marketplaces, and subscription platforms built to your product catalogue — not a Shopify theme.',
	keywords: [
		'e-commerce development',
		'online store development',
		'ecommerce platform',
		'marketplace development',
		'shopping cart development',
		'custom online store',
		'subscription platform',
		'payment gateway integration',
		'ecommerce solutions',
		'web store development',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/web-development/e-commerce-development',
	},
	openGraph: {
		title: 'E-Commerce Development | Custom Online Stores | aibizmod',
		description:
			'Custom online stores, marketplaces, and subscription platforms built around your product catalogue and fulfilment process — not a theme.',
		url: '/services/web-development/e-commerce-development',
	},
};

const data: SubservicePageData = {
	name: 'E-Commerce Development',
	parentName: 'Web Development',
	parentSlug: 'web-development',
	slug: 'e-commerce-development',
	tagline:
		'Online stores, marketplaces, and subscription platforms built around your actual product catalogue, pricing rules, and fulfilment process. Cart, checkout, and payment integration without the constraints of a theme.',
	heroImage:
		'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			"Platform-based stores are fast to launch but hit their limits quickly. Custom pricing rules that don't fit the standard discount system, fulfilment workflows that require integration with an internal warehouse tool, or a checkout experience that needs to match the brand — all of these become workarounds that accumulate technical debt over time.",
		challengePoints: [
			"Pricing and discount logic that doesn't fit the platform's built-in options",
			"Checkout flow that doesn't match the brand or user journey",
			'No direct connection between orders and internal inventory or fulfilment systems',
			'Platform fees and transaction costs that grow with revenue',
		],
		solution:
			'We build the store against your actual requirements: the product structure, the pricing logic, the fulfilment process, and the customer journey. Payment processing goes through Stripe so you own the relationship, and the order data connects directly to whatever system manages fulfilment.',
		solutionPoints: [
			'Custom product schema matching your catalogue structure',
			'Checkout flow designed around your customer journey',
			'Stripe integration for payments with webhook handling for order events',
			'Order data connected to internal inventory or CRM systems',
		],
	},

	capabilities: [
		{
			icon: 'layers',
			title: 'Online Store Development',
			description:
				'Product pages, category listings, search, filters, cart, and checkout built to your spec with your brand — not a modified theme.',
			image: '/services/web-development/e-commerce-development-online-store-development.jpg',
			imageAlt: 'Web Development Online Store Development capability illustration.',
		},
		{
			icon: 'workflow',
			title: 'Marketplace Development',
			description:
				'Two-sided marketplaces with seller accounts, product listings, offer management, escrow, and payout processing.',
			image: '/services/web-development/e-commerce-development-marketplace-development.jpg',
			imageAlt: 'Web Development Marketplace Development capability illustration.',
		},
		{
			icon: 'refreshCw',
			title: 'Subscription Platforms',
			description:
				'Recurring billing, plan management, trial periods, upgrade and downgrade flows, and dunning for failed payments.',
			image: '/services/web-development/e-commerce-development-subscription-platforms.jpg',
			imageAlt: 'Web Development Subscription Platforms capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Payment Integration',
			description:
				'Stripe, PayPal, or Braintree for one-time and recurring payments, with proper webhook handling for payment events and order fulfilment triggers.',
			image: '/services/web-development/e-commerce-development-payment-integration.jpg',
			imageAlt: 'Web Development Payment Integration capability illustration.',
		},
		{
			icon: 'database',
			title: 'Inventory Management',
			description:
				'Stock tracking, low-stock alerts, variant management, and connections to internal warehouse or ERP systems.',
			image: '/services/web-development/e-commerce-development-inventory-management.jpg',
			imageAlt: 'Web Development Inventory Management capability illustration.',
		},
		{
			icon: 'barChart',
			title: 'Order Management',
			description:
				'Order creation, status tracking, fulfilment updates, returns handling, and customer notification triggers.',
			image: '/services/web-development/e-commerce-development-order-management.jpg',
			imageAlt: 'Web Development Order Management capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Retail',
			title: 'Custom Product Configurator Store',
			description:
				'A store where customers configure a product with multiple options, see a live price calculation, and complete checkout — without a platform that fights the custom logic.',
		},
		{
			industry: 'B2B',
			title: 'Trade Portal with Account Pricing',
			description:
				'A wholesale portal where different customer accounts see different pricing tiers, with order minimums, net payment terms, and bulk discount rules.',
		},
		{
			industry: 'Food & Beverage',
			title: 'Subscription Box Platform',
			description:
				'A subscription platform for a food brand with weekly or monthly billing, skip and pause options, and delivery address management.',
		},
		{
			industry: 'Marketplace',
			title: 'Artisan Marketplace',
			description:
				'A marketplace connecting independent sellers with buyers, with seller onboarding, product listings, and Stripe Connect for split payments.',
		},
		{
			industry: 'Software',
			title: 'SaaS Billing with Usage Metering',
			description:
				'A billing system for a SaaS product with tiered plans, usage-based charges, invoice generation, and Stripe Billing for recurring revenue.',
		},
		{
			industry: 'Logistics',
			title: 'Equipment Hire Platform',
			description:
				'A hire platform with product availability by date, deposit and balance payment stages, and integration with an internal scheduling system.',
		},
	],

	technologies: [
		'Next.js',
		'React',
		'TypeScript',
		'Stripe',
		'PostgreSQL',
		'Prisma',
		'Tailwind CSS',
		'Vercel',
		'SendGrid',
		'Stripe Connect',
		'Webhooks',
	],

	benefits: [
		{
			title: 'No Platform Constraints',
			description:
				"Custom code means the cart, checkout, and product logic work exactly the way your business needs rather than being shaped around a platform's assumptions.",
		},
		{
			title: 'You Own the Customer Relationship',
			description:
				'Payment goes through your Stripe account. Customer data lives in your database. No platform sitting between you and your customer.',
		},
		{
			title: 'Direct System Integration',
			description:
				'Orders connect directly to your inventory, ERP, or fulfilment system rather than requiring a manual export and import cycle.',
		},
		{
			title: 'No Per-Transaction Fees',
			description:
				"Custom builds don't carry the additional platform transaction fees that platform stores typically add on top of Stripe's own processing rate.",
		},
		{
			title: 'Scales with You',
			description:
				"The codebase is yours and built to be extended. Adding a new product type, a new payment method, or a new fulfilment flow doesn't require a platform upgrade.",
		},
		{
			title: 'Tested Checkout Flow',
			description:
				'The checkout is tested with real payment credentials, real edge cases, and real error scenarios before going live.',
		},
	],

	faqs: [
		{
			q: 'Should we use Shopify or build a custom store?',
			a: "Shopify is the right choice if your product catalogue and pricing are straightforward and you want a fast launch with minimal custom development. Custom makes sense when your pricing rules, product configuration, or fulfilment integration can't be handled cleanly within Shopify's model, or when platform transaction fees become a meaningful cost at your revenue level.",
		},
		{
			q: 'How do you handle subscription billing?',
			a: 'We use Stripe Billing for subscriptions. It handles recurring charges, dunning for failed payments, prorated upgrades, and invoice generation. Your application logic manages what the customer gets access to based on their subscription state.',
		},
		{
			q: 'Can the store connect to our existing inventory system?',
			a: "Yes. If your inventory system has an API, we build a sync layer that keeps stock levels consistent between the store and the inventory system. If it doesn't have an API, we discuss what integration is feasible based on what data it can export.",
		},
		{
			q: 'What happens to orders after checkout?',
			a: 'That depends on your fulfilment process. We build whatever happens next: an email to the warehouse, a record created in an ERP, a webhook to a logistics API, or a status visible in an internal dashboard. The order event from Stripe triggers whatever the business needs.',
		},
	],
	answerSummary:
		'UK and India retailers whose off-the-shelf store platforms cannot handle their custom pricing, fulfilment workflows, or checkout requirements get custom e-commerce builds with direct Stripe integration and order data connected to their internal systems without platform fees.',
};

export default function EcommerceDevelopmentPage() {
	return <SubservicePageLayout data={data} />;
}
