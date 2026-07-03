import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Website Performance Optimisation | Core Web Vitals | aibizmod',
	description:
		'Core Web Vitals improvements, page speed optimisation, security hardening, and accessibility fixes that raise PageSpeed scores and reduce bounce rates.',
	keywords: [
		'web optimization',
		'website optimization',
		'performance optimization',
		'Core Web Vitals',
		'website speed optimization',
		'SEO optimization',
		'web security',
		'accessibility services',
		'website audit',
		'performance improvement',
	],
	alternates: {
		canonical: 'https://aibizmod.com/services/web-development/web-optimization',
	},
	openGraph: {
		title: 'Web Optimization & Performance | Core Web Vitals | aibizmod',
		description:
			'Systematic performance audits, Core Web Vitals improvements, security hardening, and accessibility fixes that make your website faster, safer, and more findable.',
		url: '/services/web-development/web-optimization',
	},
};

const data: SubservicePageData = {
	name: 'Web Optimization',
	parentName: 'Web Development',
	parentSlug: 'web-development',
	slug: 'web-optimization',
	tagline:
		'Systematic performance audits, Core Web Vitals improvements, security hardening, and accessibility fixes that make your website faster, safer, and more findable — with measurable results at each stage.',
	heroImage:
		'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'A slow website loses visitors before they convert. Pages that fail Core Web Vitals assessments are penalised in Google search rankings. Security gaps leave the site exposed to compromise. Accessibility failures exclude users and create legal exposure. These are all measurable, fixable problems — but they tend to accumulate quietly until they start affecting revenue or search visibility.',
		challengePoints: [
			'Page load times above three seconds driving measurable bounce rate increases',
			'Core Web Vitals failures reducing organic search rankings across key landing pages',
			'Outdated dependencies and missing security headers leaving the site vulnerable',
			'Accessibility failures that exclude users and risk compliance issues under WCAG guidelines',
		],
		solution:
			"We run a systematic audit of your site's performance, security posture, and accessibility compliance, produce a prioritised list of issues, and fix them. Every change is benchmarked before and after so you can see exactly what improved. Work is done in your development environment and released through your existing deployment process, not around it.",
		solutionPoints: [
			'Lighthouse and Core Web Vitals audit with scored baseline before any work begins',
			'Image compression, lazy loading, and script deferral to reduce page weight',
			'Security header configuration, SSL setup, and dependency vulnerability review',
			'WCAG 2.1 accessibility audit with fixes to markup, colour contrast, and keyboard navigation',
		],
	},

	capabilities: [
		{
			icon: 'activity',
			title: 'Performance Audit',
			description:
				'Full Lighthouse and WebPageTest baseline covering load time, Time to First Byte, Largest Contentful Paint, and Total Blocking Time, with a prioritised fix list.',
			image: '/services/web-development/web-optimization-performance-audit.jpg',
			imageAlt: 'Web Development Performance Audit capability illustration.',
		},
		{
			icon: 'zap',
			title: 'Image and Asset Optimisation',
			description:
				'Convert images to modern formats, apply compression, configure lazy loading, and set correct cache headers to reduce page weight and improve render times.',
			image: '/services/web-development/web-optimization-image-and-asset-optimisation.jpg',
			imageAlt: 'Web Development Image and Asset Optimisation capability illustration.',
		},
		{
			icon: 'code2',
			title: 'Script and CSS Optimisation',
			description:
				'Identify and defer or remove render-blocking scripts, split code bundles, and inline critical CSS to improve First Contentful Paint and Interaction to Next Paint.',
			image: '/services/web-development/web-optimization-script-and-css-optimisation.jpg',
			imageAlt: 'Web Development Script and CSS Optimisation capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Security Hardening',
			description:
				'Configure security headers, review SSL certificates, audit third-party scripts, and flag outdated dependencies with known vulnerabilities.',
			image: '/services/web-development/web-optimization-security-hardening.jpg',
			imageAlt: 'Web Development Security Hardening capability illustration.',
		},
		{
			icon: 'eye',
			title: 'Accessibility Audit and Fixes',
			description:
				'WCAG 2.1 AA audit covering semantic markup, ARIA attributes, colour contrast ratios, keyboard navigation, and focus management, with documented fixes.',
			image: '/services/web-development/web-optimization-accessibility-audit-and-fixes.jpg',
			imageAlt: 'Web Development Accessibility Audit and Fixes capability illustration.',
		},
		{
			icon: 'lineChart',
			title: 'Ongoing Monitoring Setup',
			description:
				'Configure automated performance monitoring and alerting so regressions are caught before they affect rankings or user experience.',
			image: '/services/web-development/web-optimization-ongoing-monitoring-setup.jpg',
			imageAlt: 'Web Development Ongoing Monitoring Setup capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'E-commerce',
			title: 'Checkout Page Speed Fix',
			description:
				'An online retailer was losing customers at checkout due to a slow payment page. Asset optimisation and script deferral reduced load time by 60 percent, improving conversion rate.',
		},
		{
			industry: 'SaaS',
			title: 'Core Web Vitals Improvement for SEO',
			description:
				"A software company's marketing site had poor Largest Contentful Paint scores. Image optimisation and server response improvements moved all key pages into the green threshold.",
		},
		{
			industry: 'Professional Services',
			title: 'Security Header Audit',
			description:
				"A law firm's website had missing Content Security Policy and X-Frame-Options headers. We configured the full security header set and removed outdated third-party scripts.",
		},
		{
			industry: 'Healthcare',
			title: 'WCAG Accessibility Compliance',
			description:
				'A healthcare provider needed their patient information pages to meet WCAG 2.1 AA. We fixed colour contrast, added missing ARIA labels, and ensured full keyboard navigability.',
		},
		{
			industry: 'Media',
			title: 'Page Weight Reduction for Mobile Users',
			description:
				'A content publisher serving users on slow mobile connections reduced average page weight by 40 percent through image format conversion and lazy loading configuration.',
		},
		{
			industry: 'Hospitality',
			title: 'Performance Monitoring Setup',
			description:
				'A hotel group needed ongoing visibility of site performance across their 8 property pages. We set up automated Lighthouse CI and alerting for any score regression.',
		},
	],

	technologies: [
		'Lighthouse',
		'WebPageTest',
		'Core Web Vitals',
		'Next.js Image Optimisation',
		'Cloudflare',
		'Vercel',
		'Nginx',
		'HTTP/2',
		'Brotli Compression',
		'axe Accessibility',
		'HTTPS/TLS',
	],

	benefits: [
		{
			title: 'Faster Load Times',
			description:
				'Optimised assets, deferred scripts, and proper caching reduce page weight and improve time to interactive across all device types.',
		},
		{
			title: 'Better Search Rankings',
			description:
				'Core Web Vitals are a Google ranking signal. Fixing failures in Largest Contentful Paint and Interaction to Next Paint improves organic search position for affected pages.',
		},
		{
			title: 'Reduced Security Exposure',
			description:
				'A correct security header configuration, up-to-date dependencies, and removal of unnecessary third-party scripts close the most common web security gaps.',
		},
		{
			title: 'Accessible to All Users',
			description:
				'WCAG-compliant markup means your site works for users with visual, motor, and cognitive differences, as well as for screen reader and keyboard-only users.',
		},
		{
			title: 'Measurable Before and After',
			description:
				'Every fix is benchmarked before work begins and retested after each change, so you have documented evidence of improvement rather than just claims.',
		},
		{
			title: 'Monitoring Prevents Regression',
			description:
				'Automated performance monitoring catches new issues introduced by content changes or deployments before they affect user experience or search rankings.',
		},
	],

	faqs: [
		{
			q: 'How do you prioritise what to fix first?',
			a: 'We start with the items that have the biggest measurable impact on load time, Core Web Vitals scores, or security risk. For most sites, image optimisation and removing render-blocking scripts deliver the largest performance gains with the least risk. Security fixes like missing headers are quick to apply and high priority regardless of impact on speed. We share the full prioritised list before starting so you can adjust the scope.',
		},
		{
			q: 'Can you optimise a site you did not build?',
			a: 'Yes. We work with existing sites built on any stack — WordPress, Webflow, Next.js, custom builds. We start with a read-only audit before touching any code, so you understand what we are proposing before we make changes.',
		},
		{
			q: 'Will the optimisations break our existing design or functionality?',
			a: 'Optimisations are applied incrementally and tested against the existing design before being released. We do not make structural changes to layouts or remove functionality. Accessibility fixes modify markup to meet standards but do not change visual appearance.',
		},
		{
			q: 'How long does an optimisation project typically take?',
			a: 'A performance audit and the top-priority fixes typically take one to two weeks for a standard marketing site. A full WCAG audit with remediation can take two to four weeks depending on the number of pages and the severity of issues found. We give a time estimate after the initial audit, not before, so it is based on actual findings.',
		},
	],
};

export default function WebOptimizationPage() {
	return <SubservicePageLayout data={data} />;
}
