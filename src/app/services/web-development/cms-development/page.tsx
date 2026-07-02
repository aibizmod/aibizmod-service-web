import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'CMS Web Development | WordPress & Headless CMS | aibizmod',
	description:
		'WordPress, headless CMS, and custom content management platforms built around how your editorial team actually manages content — not how the tool expects them to.',
	keywords: [
		'CMS development',
		'content management system',
		'WordPress development',
		'headless CMS',
		'Strapi development',
		'custom CMS',
		'website content management',
		'blog management system',
		'CMS integration',
		'content platform development',
	],
	alternates: {
		canonical: 'https://aibizmod.com/services/web-development/cms-development',
	},
	openGraph: {
		title: 'CMS Development | WordPress & Headless CMS | aibizmod',
		description:
			'Content management platforms built around how your team actually works — from WordPress and headless CMS to fully custom builds.',
		url: '/services/web-development/cms-development',
	},
};

const data: SubservicePageData = {
	name: 'CMS Development',
	parentName: 'Web Development',
	parentSlug: 'web-development',
	slug: 'cms-development',
	tagline:
		'Content management platforms built around how your team actually works — from WordPress and headless CMS to fully custom builds that put editorial control back in the hands of your team without a developer in the loop.',
	heroImage:
		'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Teams that manage websites through developers are slowed down by every small content change. Blog posts need a ticket. Landing page copy takes a sprint to update. The content backlog grows while the development team is pulled away from higher-priority build work. Meanwhile, off-the-shelf CMS platforms often force rigid workflows and slow down the frontend because of the overhead they introduce.',
		challengePoints: [
			'Content updates require developer involvement for changes that should be self-service',
			'Page load speeds affected by heavy plugin stacks and unoptimised CMS rendering',
			'No multi-author or approval workflows, so content goes live without review',
			'Legacy WordPress installs with outdated plugins that are a maintenance and security liability',
		],
		solution:
			"We design the CMS setup around your team's actual workflow — who publishes, who approves, what types of content you manage, and how often it changes. Whether that means a structured headless CMS feeding a Next.js frontend or a tightly configured WordPress build, the result is a platform your team can use without developer help for day-to-day publishing.",
		solutionPoints: [
			'Role-based access so editors, authors, and admins each see only what they need',
			'Structured content models that match your content types rather than forcing generic pages',
			'Frontend performance maintained whether using headless API delivery or server-side rendering',
			'Full documentation and walkthrough so your team is confident managing it from day one',
		],
	},

	capabilities: [
		{
			icon: 'globe',
			title: 'WordPress Development',
			description:
				'Custom WordPress builds including theme development, plugin configuration, performance hardening, and security setup — without the bloat of page builders.',
			image: '/services/web-development/cms-development-wordpress-development.jpg',
			imageAlt: 'Web Development WordPress Development capability illustration.',
		},
		{
			icon: 'layers',
			title: 'Headless CMS Integration',
			description:
				'Connect a structured CMS like Sanity, Contentful, or Strapi to a Next.js frontend for fast, decoupled content delivery with full editorial control.',
			image: '/services/web-development/cms-development-headless-cms-integration.jpg',
			imageAlt: 'Web Development Headless CMS Integration capability illustration.',
		},
		{
			icon: 'code2',
			title: 'Custom CMS Builds',
			description:
				'When existing platforms do not fit your content model, we build a lightweight custom CMS tailored exactly to your data structure and publishing workflow.',
			image: '/services/web-development/cms-development-custom-cms-builds.jpg',
			imageAlt: 'Web Development Custom CMS Builds capability illustration.',
		},
		{
			icon: 'database',
			title: 'Content Migration',
			description:
				'Move existing content from legacy CMS platforms, flat files, or spreadsheets into your new system with field mapping, validation, and redirects handled.',
			image: '/services/web-development/cms-development-content-migration.jpg',
			imageAlt: 'Web Development Content Migration capability illustration.',
		},
		{
			icon: 'users',
			title: 'Multi-Author Workflows',
			description:
				'Configure draft, review, and publish stages with role-based permissions so content goes through the right approval steps before it goes live.',
			image: '/services/web-development/cms-development-multiauthor-workflows.jpg',
			imageAlt: 'Web Development Multi-author Workflows capability illustration.',
		},
		{
			icon: 'settings',
			title: 'Ongoing CMS Maintenance',
			description:
				'Core updates, plugin audits, backup configuration, and security hardening to keep your CMS installation stable and protected over time.',
			image: '/services/web-development/cms-development-ongoing-cms-maintenance.jpg',
			imageAlt: 'Web Development Ongoing CMS Maintenance capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Media',
			title: 'Editorial Platform for a News Publication',
			description:
				'A regional news site needed a fast, structured CMS that supported multiple journalists publishing simultaneously, with editorial approval before content went live.',
		},
		{
			industry: 'Marketing',
			title: 'Headless CMS for a Marketing Website',
			description:
				'A B2B company replaced a slow, plugin-heavy WordPress site with a Sanity-backed Next.js frontend, reducing page load times and giving their marketing team full content control.',
		},
		{
			industry: 'E-commerce',
			title: 'Product Content Management',
			description:
				'A retailer needed a structured content layer to manage thousands of product descriptions, images, and category copy independently of their e-commerce platform.',
		},
		{
			industry: 'Professional Services',
			title: 'Knowledge Base and Documentation Site',
			description:
				'A consulting firm needed a searchable internal knowledge base where multiple contributors could publish articles and guides with version history and rollback.',
		},
		{
			industry: 'Franchise',
			title: 'Multi-Site Content Network',
			description:
				'A franchise operator managing 12 regional websites needed a single CMS where national content was shared and each location could manage its own local pages.',
		},
		{
			industry: 'Healthcare',
			title: 'Regulated Content Publishing',
			description:
				'A healthcare provider needed a CMS with strict approval workflows so clinical content was reviewed by a compliance team before any page could be published.',
		},
	],

	technologies: [
		'WordPress',
		'Sanity',
		'Contentful',
		'Strapi',
		'Ghost',
		'Next.js',
		'TypeScript',
		'Tailwind CSS',
		'PostgreSQL',
		'Vercel',
		'Cloudflare',
	],

	benefits: [
		{
			title: 'Editorial Independence',
			description:
				'Your team publishes, updates, and manages content without raising a development ticket. That removes the CMS from your developer backlog entirely.',
		},
		{
			title: 'Structured Content Model',
			description:
				'Content is modelled around your actual types — articles, case studies, team members, service pages — rather than forced into a generic page structure.',
		},
		{
			title: 'Frontend Performance Preserved',
			description:
				'A headless setup or a properly configured WordPress build keeps page load fast, regardless of how much content you are managing behind the scenes.',
		},
		{
			title: 'Version History and Rollback',
			description:
				'Every content change is logged. If a page goes live with an error, you can roll back to the previous version in seconds without developer involvement.',
		},
		{
			title: 'Multi-Site Ready',
			description:
				'The same CMS installation can serve multiple domains or regions, with shared global content and locally controlled pages per site.',
		},
		{
			title: 'Secure and Maintained',
			description:
				'Regular core and plugin updates, backup configuration, and a hardened security setup mean the CMS stays stable and does not become a liability over time.',
		},
	],

	faqs: [
		{
			q: 'Should we use WordPress or a headless CMS like Sanity or Contentful?',
			a: 'That depends on how your frontend is built and how technically confident your content team is. WordPress is the right choice when you need a self-contained, low-cost setup and your team is already familiar with it. A headless CMS is a better fit when your frontend is built with a modern framework like Next.js, you need structured content types, or performance is a priority. We walk through both options during scoping and recommend based on your specific situation.',
		},
		{
			q: 'Can you migrate our existing content from another CMS?',
			a: 'Yes. We handle content migration as part of CMS projects, including field mapping, media transfer, URL redirects, and validation checks to make sure nothing is lost or broken in the process. The complexity and time required depend on how much content there is and how structured it is in the source system.',
		},
		{
			q: 'Will we need a developer to manage the CMS after launch?',
			a: 'No. One of the goals of every CMS build we deliver is that your team can manage day-to-day content entirely without developer help. We provide a full walkthrough and documentation at handover. For structural changes — adding new content types, building new page templates — developer involvement is needed, but those are periodic tasks, not ongoing ones.',
		},
		{
			q: 'How do you handle CMS security?',
			a: 'For WordPress builds we apply a standard hardening checklist: limiting login attempts, disabling file editing from the admin panel, using a security plugin, enforcing strong passwords, and setting up automated backups. We also audit installed plugins and remove any that are unused, outdated, or have known vulnerabilities.',
		},
	],
	answerSummary:
		'UK and India editorial and marketing teams stuck with slow, plugin-heavy CMS platforms that require developer help for every content change get structured WordPress or headless CMS builds with role-based workflows and clean frontend performance that put publishing control back in their hands.',
};

export default function CMSDevelopmentPage() {
	return <SubservicePageLayout data={data} />;
}
