import type { Metadata } from 'next';
import ServicePageLayout, {
	type ServicePageData,
	type ServiceCard,
} from '@/components/ServicePageLayout';
import TechStackCarousel, {
	WEB_DEV_ROW1,
	WEB_DEV_ROW2,
} from '@/components/ui/tech-stack-carousel';

export const metadata: Metadata = {
	title: 'Web Development Services | UK & India | aibizmod',
	description:
		'Custom web development services — corporate websites, e-commerce, SaaS dashboards, and web applications. Fast, scalable, and built to own, not rent.',
	keywords: [
		'web development services',
		'custom web application development',
		'web app development agency',
		'web development company',
		'custom web development',
		'website development company',
		'web application development',
		'ecommerce web development',
		'responsive web design',
		'web development UK',
		'web development India',
		'web developers',
	],
	alternates: { canonical: 'https://aibizmod.com/services/web-development' },
	openGraph: {
		title: 'Web Development Services | aibizmod',
		description:
			'Custom web development services — corporate websites, e-commerce, SaaS dashboards, and web applications. Fast, scalable, and built to own, not rent.',
		url: '/services/web-development',
	},
};

const data: ServicePageData = {
	name: 'Web Development',
	tagline:
		'For businesses across the UK, USA, and internationally that need a web product built without templates or lock-in, we design and develop corporate websites, e-commerce stores, SaaS dashboards, customer portals, and CRM-connected web applications. You receive a version-controlled codebase, a staging environment, and a structured handover — ready to own and maintain.',
	heroBullets: [
		'For businesses that need a custom web product built without templates or platform lock-in',
		'Corporate websites, e-commerce stores, SaaS dashboards, customer portals, and CRM-connected web apps',
		'Version-controlled codebase, staging environment, and structured handover — ready to own and maintain',
		'Serving clients in the UK, USA, and internationally',
	],
	slug: 'web-development',
	iconColor: 'text-electric-blue',

	overview: {
		paragraphs: [
			"A website that just looks good but can't connect to your CRM, take a booking, or show a client their account history isn't doing much for the business. The work starts with understanding what the site actually needs to do, not just how it should look. From there, everything is built to spec: the database structure, the user flows, the admin tools, the handover docs. You end up with a codebase you own, a staging environment to review changes before they go live, and a clear record of how everything is set up so any developer can pick it up later.",
		],
		benefits: [
			'Version-Controlled Codebase Ownership',
			'Staging Environment for Previewing Updates',
			'Custom Database and API Integrations',
			'No Proprietary Platform Licensing Fees',
			'Direct CRM and Dashboard Synchronization',
			'Clean Google Search Console Index Configuration',
		],
	},

	features: [
		{
			icon: 'code2',
			title: 'Repository Setup',
			desc: 'We set up a private GitHub or GitLab repository with distinct development, staging, and main production branches, establishing a clean history from day one.',
		},
		{
			icon: 'globe',
			title: 'Staging Environment',
			desc: 'We provision a password-protected staging environment mirroring the production setup, allowing your team to verify features and content before they go live.',
		},
		{
			icon: 'layers',
			title: 'QA Checklist',
			desc: 'We run every page through a pre-launch QA list covering responsive layout checks on mobile/desktop, form validation audits, and cross-browser testing.',
		},
		{
			icon: 'database',
			title: 'Analytics Implementation',
			desc: 'We configure Google Analytics 4 (GA4) with custom event tracking for key user actions like form submissions, resource downloads, and outbound clicks.',
		},
		{
			icon: 'shield',
			title: 'SEO Setup',
			desc: 'We build XML sitemaps, customize robots.txt files, set up redirect rules, and integrate JSON-LD structured data to ensure clean search engine crawls.',
		},
		{
			icon: 'rocket',
			title: 'CMS Integration',
			desc: 'We connect headless CMS editors (like Sanity, Strapi, or WordPress via API) so your team can edit page content directly without writing any code.',
		},
	],

	process: [
		{
			icon: 'search',
			title: 'Discovery & Scope',
			desc: 'We list all page routes, database requirements, user authentication paths, and API integrations to build a functional specification document.',
		},
		{
			icon: 'code2',
			title: 'Local Build & Dev',
			desc: 'Our engineers build the site structure locally using React and Next.js, pushing code regularly to the private repository for progress tracking.',
		},
		{
			icon: 'testTube',
			title: 'QA & Staging Review',
			desc: 'We push the builds to staging, run our pre-launch QA checks, and verify all CRM and payment integrations with test transactions.',
		},
		{
			icon: 'rocket',
			title: 'Production Launch',
			desc: 'We configure the production domain, point DNS records, launch the site, and verify active analytics tracking and search indexing.',
		},
	],

	techStack: [],

	faqs: [
		{
			q: 'What do we actually receive at the end of the project?',
			a: 'You receive full admin ownership of the GitHub repository containing the complete source code, host platform configurations (Vercel/AWS), database credentials, Google Analytics properties, and a written handover document outlining how to build, run, and update the application.',
		},
		{
			q: 'How do you handle site updates and changes before going live?',
			a: 'We publish all work-in-progress code to a password-protected staging URL. You can inspect changes on your own devices. Once you approve a release, we run a deployment pipeline to move the staging branch changes into the live production environment.',
		},
		{
			q: 'Can the website connect to our internal CRM database?',
			a: 'Yes. We write custom API integrations using webhook handlers and secure endpoints to transfer website form inquiries and customer profile data directly into CRMs like HubSpot, Zoho, or Salesforce in real time.',
		},
		{
			q: 'Do we have to pay monthly software licensing fees to you?',
			a: 'No. We build custom applications without proprietary software lock-in. You own the code and host it on your own cloud accounts (like Vercel, AWS, or Netlify). You only pay direct utility costs to the cloud hosting provider.',
		},
	],
	answerSummary:
		'Custom web development services for businesses in the UK and India needing websites, SaaS dashboards, e-commerce platforms, and web applications. We build fast, scalable frontends and backends using React, Next.js, and Node.js — owned by you, not rented.',
};

const serviceCards: ServiceCard[] = [
	{
		title: 'Frontend Development',
		image:
			'/services/web-development/frontend-development-hero.png',
		bullets: [
			'Responsive Websites',
			'Landing Pages',
			'PWAs',
			'UI Development',
			'SPAs',
		],
		href: '/services/web-development/frontend-development',
	},
	{
		title: 'Backend Development',
		image:
			'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'API Development',
			'Database Development',
			'Authentication Systems',
			'Payment Gateway Integration',
			'Server-side Development',
		],
		href: '/services/web-development/backend-development',
	},
	{
		title: 'Full Stack Development',
		image:
			'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'End-to-End Web Applications',
			'SaaS Products',
			'Enterprise Applications',
		],
		href: '/services/web-development/full-stack-development',
	},
	{
		title: 'E-Commerce Development',
		image:
			'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'Online Stores',
			'Marketplaces',
			'Shopping Cart Integration',
			'Subscription Platforms',
			'Payment Integration',
		],
		href: '/services/web-development/e-commerce-development',
	},
	{
		title: 'CMS Development',
		image:
			'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80&auto=format&fit=crop',
		bullets: ['WordPress', 'Headless CMS', 'Custom CMS', 'Website Maintenance'],
		href: '/services/web-development/cms-development',
	},
	{
		title: 'Web Optimization',
		image:
			'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'Speed Optimization',
			'SEO-Friendly Development',
			'Security Hardening',
			'Accessibility Compliance',
		],
		href: '/services/web-development/web-optimization',
	},
];

export default function WebDevelopmentPage() {
	return (
		<ServicePageLayout
			data={data}
			techStackFooter={
				<TechStackCarousel row1={WEB_DEV_ROW1} row2={WEB_DEV_ROW2} />
			}
			serviceCards={serviceCards}
		/>
	);
}
