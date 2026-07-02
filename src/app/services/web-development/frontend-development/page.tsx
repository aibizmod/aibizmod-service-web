import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Frontend Web Development | React & Next.js | aibizmod',
	description:
		'React and Next.js frontend development — responsive websites, SPAs, landing pages, and progressive web apps that are fast, accessible, and API-ready.',
	keywords: [
		'frontend development',
		'frontend development company',
		'React development',
		'Next.js development',
		'responsive web design',
		'web application development',
		'SPA development',
		'progressive web apps',
		'UI development services',
		'frontend engineering',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/web-development/frontend-development',
	},
	openGraph: {
		title: 'Frontend Development | React & Next.js | aibizmod',
		description:
			'Responsive websites, landing pages, SPAs, and progressive web apps built with React and Next.js — fast, accessible, and ready to connect to any backend.',
		url: '/services/web-development/frontend-development',
	},
};

const data: SubservicePageData = {
	name: 'Frontend Development',
	parentName: 'Web Development',
	parentSlug: 'web-development',
	slug: 'frontend-development',
	tagline:
		'Responsive websites, landing pages, SPAs, and progressive web apps built to a spec — not a template. Every component is written for your data model and tested across devices before it ships.',
	heroImage:
		'/services/web-development/frontend-development-hero.png',

	solves: {
		challenge:
			"A lot of frontend work ends up looking polished in screenshots but failing in practice. Buttons that don't work on mobile, pages that load slowly because images weren't optimised, layouts that break when real content is longer than the placeholder. The gap between a design mockup and a production-ready frontend is where most of the real work happens.",
		challengePoints: [
			'Layouts that break with real content or on smaller devices',
			'Slow page load caused by unoptimised assets and blocking scripts',
			'Forms that submit without validation or fail silently on errors',
			'No staging environment to review changes before they go live',
		],
		solution:
			'We build frontend code from the ground up using React and Next.js, testing on real devices and real content throughout. Every page goes through a QA checklist before launch, and you get a versioned repository so changes are tracked and reversible.',
		solutionPoints: [
			'Responsive layouts tested on mobile, tablet, and desktop',
			'Optimised images, fonts, and scripts for fast page load',
			'Accessible markup with keyboard navigation and screen reader support',
			'Staging environment so you can review every change before it goes live',
		],
	},

	capabilities: [
		{
			icon: 'code2',
			title: 'React & Next.js Development',
			description:
				'Component-based frontend built with React and Next.js, with server-side rendering or static generation depending on what the page needs.',
			image: '/services/web-development/frontend-development-react-nextjs-development.png',
			imageAlt: 'Web Development React & Next.js Development capability illustration.',
		},
		{
			icon: 'smartphone',
			title: 'Responsive Design Implementation',
			description:
				'Layouts that adapt cleanly across screen sizes, tested on physical devices rather than just browser resize.',
			image: '/services/web-development/frontend-development-responsive-design-implementation.png',
			imageAlt: 'Web Development Responsive Design Implementation capability illustration.',
		},
		{
			icon: 'globe',
			title: 'Landing Pages',
			description:
				'Focused single-page builds for campaigns, product launches, or service areas — fast to load and built to convert.',
			image: '/services/web-development/frontend-development-landing-pages.jpg',
			imageAlt: 'Web Development Landing Pages capability illustration.',
		},
		{
			icon: 'layers',
			title: 'Progressive Web Apps',
			description:
				'Web apps that install on a home screen, work offline, and send push notifications — without a separate native app build.',
			image: '/services/web-development/frontend-development-progressive-web-apps.jpg',
			imageAlt: 'Web Development Progressive Web Apps capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Accessibility Compliance',
			description:
				'Semantic HTML, ARIA attributes, and keyboard navigation built in from the start, not added as an afterthought.',
			image: '/services/web-development/frontend-development-accessibility-compliance.jpg',
			imageAlt: 'Web Development Accessibility Compliance capability illustration.',
		},
		{
			icon: 'activity',
			title: 'Performance Optimisation',
			description:
				'Image compression, lazy loading, code splitting, and Core Web Vitals review to keep pages fast after launch.',
			image: '/services/web-development/frontend-development-performance-optimisation.jpg',
			imageAlt: 'Web Development Performance Optimisation capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'SaaS',
			title: 'Marketing Site for a Software Product',
			description:
				'A performant public-facing site for a SaaS product with feature pages, pricing, and a sign-up flow — built to rank and convert.',
		},
		{
			industry: 'Professional Services',
			title: 'Corporate Website Rebuild',
			description:
				'A full rebuild of an outdated corporate site with a proper CMS connection so the internal team can update content without developer help.',
		},
		{
			industry: 'E-commerce',
			title: 'Campaign Landing Page',
			description:
				'A time-sensitive campaign page that needed to go live in five days, fully responsive and connected to a form submission webhook.',
		},
		{
			industry: 'Healthcare',
			title: 'Patient Information Portal',
			description:
				'A public-facing information site with accessible markup, large-text support, and a contact form routed to the relevant department.',
		},
		{
			industry: 'Logistics',
			title: 'Tracking Status Page',
			description:
				'A real-time shipment status page that polls an internal API and displays the latest state without requiring a full page reload.',
		},
		{
			industry: 'Education',
			title: 'Course Catalogue PWA',
			description:
				'A progressive web app for a training provider that works offline, loads course materials cached from a previous session, and installs on mobile.',
		},
	],

	technologies: [
		'React',
		'Next.js',
		'TypeScript',
		'Tailwind CSS',
		'Framer Motion',
		'Vercel',
		'Figma',
		'Storybook',
		'Playwright',
		'Lighthouse',
	],

	benefits: [
		{
			title: 'Tested on Real Devices',
			description:
				'Every layout is reviewed on physical phones and tablets, not just a browser window resized to mobile width.',
		},
		{
			title: 'Versioned and Reversible',
			description:
				'All code lives in a Git repository with clear branch history so any change can be reviewed, rolled back, or extended.',
		},
		{
			title: 'Fast by Default',
			description:
				'Performance is considered during build, not added after complaints. Images are optimised, scripts are deferred, and Core Web Vitals are reviewed before launch.',
		},
		{
			title: 'Accessible Markup',
			description:
				'Semantic HTML and ARIA roles are built in from the start so the site works for users with screen readers, keyboard navigation, and low vision settings.',
		},
		{
			title: 'Staging Before Production',
			description:
				'Every significant change is deployed to a staging URL first so you can review and approve before anything touches the live site.',
		},
		{
			title: 'Handover Docs Included',
			description:
				'You receive documentation covering the repository structure, deployment process, and how to update content or configuration without a developer.',
		},
	],

	faqs: [
		{
			q: 'Do you work from an existing design or do you also handle design?',
			a: 'Both. If you have Figma files or a brand guide, we build from those. If you need design work done first, we can handle that as part of the same project before moving into build.',
		},
		{
			q: 'How do you handle content management for the pages?',
			a: 'That depends on how often content changes and who will be editing it. For frequently updated content we connect a headless CMS like Sanity or Contentful. For mostly static pages a simpler setup is usually better and cheaper to maintain.',
		},
		{
			q: 'How long does a typical frontend project take?',
			a: 'A focused landing page or marketing site can be completed in one to three weeks. A multi-page corporate site with CMS integration usually takes four to eight weeks. The timeline depends mostly on how quickly feedback and approvals come back rather than the build work itself.',
		},
		{
			q: 'What happens after the site launches?',
			a: 'You receive the repository, deployment configuration, and handover documentation. We offer a post-launch support period to catch anything that needs fixing. Ongoing maintenance retainers are available if you want us to handle updates on a regular basis.',
		},
	],
	answerSummary:
		'UK and India businesses whose websites look right in design mockups but break on real devices, load slowly, or fail accessibility checks get React and Next.js frontends built from the ground up with responsive testing on physical devices, optimised assets, and semantic accessible markup.',
};

export default function FrontendDevelopmentPage() {
	return <SubservicePageLayout data={data} />;
}
