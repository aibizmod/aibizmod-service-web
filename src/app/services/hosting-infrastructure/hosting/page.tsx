import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Managed Web Hosting & Server Management | aibizmod',
	description:
		'Shared, VPS, dedicated, and managed hosting with configuration, uptime monitoring, and support — keeping your websites and applications reliably available.',
	keywords: [
		'cloud hosting',
		'web hosting',
		'managed hosting',
		'cloud services',
		'AWS hosting',
		'scalable hosting',
		'application hosting',
		'VPS hosting',
		'dedicated hosting',
	],
	alternates: {
		canonical: 'https://aibizmod.com/services/hosting-infrastructure/hosting',
	},
	openGraph: {
		title: 'Cloud Hosting | Managed Web Hosting | aibizmod',
		description:
			'Scalable cloud hosting on AWS, GCP, and Azure with automated backups and deployment pipelines.',
		url: '/services/hosting-infrastructure/hosting',
	},
};

const data: SubservicePageData = {
	name: 'Hosting',
	parentName: 'Hosting & Infrastructure',
	parentSlug: 'hosting-infrastructure',
	slug: 'hosting',
	tagline:
		'Shared, VPS, dedicated, and managed hosting services with the configuration, monitoring, and support that keep your websites and applications reliably available — without leaving setup and maintenance to chance.',
	heroImage:
		'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Hosting decisions are often made based on cost alone, without considering the reliability, performance, or support requirements of the applications being hosted. Cheap shared hosting creates performance and security problems as traffic grows. Unmanaged VPS or dedicated servers are provisioned but never properly configured, secured, or monitored. Businesses end up with hosting that technically works until it fails, at which point there is no clear owner of the problem.',
		challengePoints: [
			'Shared hosting causing slow page loads and unpredictable availability as the site grows',
			'Unmanaged VPS or dedicated servers with no monitoring, no security hardening, and no backup',
			'No clear support path when a hosting problem occurs outside business hours',
			'Hosting environment not matched to the application stack, causing configuration friction',
		],
		solution:
			"We assess your application's requirements and recommend the hosting tier and provider that fits — then handle the setup, security configuration, monitoring, and backup so the environment runs reliably without requiring your team to become hosting specialists.",
		solutionPoints: [
			'Hosting tier recommendation based on traffic patterns, technical requirements, and budget',
			'Server setup and configuration including web server, SSL, and stack-appropriate optimisation',
			'Automated backup configuration with tested restore procedures',
			'Uptime monitoring with alerting so hosting issues are caught before they affect users',
		],
	},

	capabilities: [
		{
			icon: 'server',
			title: 'VPS Setup and Configuration',
			description:
				'Configure Linux VPS instances with web server, firewall rules, SSL certificates, stack dependencies, and hardening settings for reliable, secure application hosting.',
			image: '/services/hosting-infrastructure/hosting-vps-setup-and-configuration.jpg',
			imageAlt: 'Hosting & Infrastructure VPS Setup and Configuration capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Managed Hosting Setup',
			description:
				'Configure managed hosting platforms like Vercel, Netlify, Render, or Heroku for application deployments with environment variables, domain configuration, and build pipelines.',
			image: '/services/hosting-infrastructure/hosting-managed-hosting-setup.jpg',
			imageAlt: 'Hosting & Infrastructure Managed Hosting Setup capability illustration.',
		},
		{
			icon: 'database',
			title: 'Dedicated Server Configuration',
			description:
				'Set up and configure dedicated server environments for applications requiring guaranteed resources, including RAID configuration, web server setup, and security hardening.',
			image: '/services/hosting-infrastructure/hosting-dedicated-server-configuration.jpg',
			imageAlt: 'Hosting & Infrastructure Dedicated Server Configuration capability illustration.',
		},
		{
			icon: 'activity',
			title: 'Uptime Monitoring',
			description:
				'Configure uptime monitoring with alerting covering HTTP response checks, SSL certificate expiry, and performance thresholds, with notifications to appropriate contacts.',
			image: '/services/hosting-infrastructure/hosting-uptime-monitoring.jpg',
			imageAlt: 'Hosting & Infrastructure Uptime Monitoring capability illustration.',
		},
		{
			icon: 'refreshCw',
			title: 'Backup Configuration',
			description:
				'Set up automated backup schedules for files and databases with offsite storage and documented restore procedures tested against real recovery scenarios.',
			image: '/services/hosting-infrastructure/hosting-backup-configuration.jpg',
			imageAlt: 'Hosting & Infrastructure Backup Configuration capability illustration.',
		},
		{
			icon: 'settings',
			title: 'SSL Certificate Management',
			description:
				'Provision, configure, and manage SSL certificates across all domains, with automated renewal and monitoring for expiry to prevent unexpected certificate failures.',
			image: '/services/hosting-infrastructure/hosting-ssl-certificate-management.jpg',
			imageAlt: 'Hosting & Infrastructure SSL Certificate Management capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Professional Services',
			title: 'VPS Migration for a Growing Agency',
			description:
				'A marketing agency outgrew shared hosting but lacked the technical capability to manage a VPS. We configured a DigitalOcean droplet with Nginx, SSL, PHP, and automated backups, then handed over documentation for ongoing management.',
		},
		{
			industry: 'E-commerce',
			title: 'WooCommerce Hosting Optimisation',
			description:
				'A WooCommerce store was experiencing slow load times on shared hosting. We migrated to a configured VPS with a PHP-FPM and Nginx stack, reducing average page load time by 65 percent.',
		},
		{
			industry: 'SaaS',
			title: 'Multi-Environment Hosting Setup on Render',
			description:
				'A SaaS product needed separate staging and production environments with matching configuration. We set up both environments on Render with environment-specific variables and deployment triggers from the CI pipeline.',
		},
		{
			industry: 'Media',
			title: 'Dedicated Server for a High-Traffic Publication',
			description:
				'A media publication outgrew VPS resources due to high simultaneous reader traffic. We provisioned a dedicated server with Nginx and configured caching layers to handle traffic spikes without performance degradation.',
		},
		{
			industry: 'Healthcare',
			title: 'Hosting with GDPR-Compliant Data Residency',
			description:
				'A healthcare organisation required hosting with UK data residency for patient data. We configured a UK-based VPS with encrypted storage and documented data processing agreements.',
		},
		{
			industry: 'Non-profit',
			title: 'Cost-Effective Managed Hosting Migration',
			description:
				'A non-profit organisation was overpaying for hosting that exceeded their requirements. We moved their WordPress site to a correctly sized Cloudways managed hosting environment, reducing monthly costs by 60 percent.',
		},
	],

	technologies: [
		'Nginx',
		'Apache',
		'Vercel',
		'Netlify',
		'Render',
		'DigitalOcean',
		'Hetzner',
		'Cloudways',
		"Let's Encrypt",
		'AWS EC2',
		'Cloudflare',
	],

	benefits: [
		{
			title: 'Hosting Matched to Your Actual Requirements',
			description:
				'A correctly sized hosting environment performs better and costs less than one chosen by guesswork or lowest price, without the overhead of over-provisioning.',
		},
		{
			title: 'Properly Configured from the Start',
			description:
				'A server that is set up with security hardening, appropriate web server configuration, and monitored backups is significantly more reliable than one provisioned and left in its default state.',
		},
		{
			title: 'SSL and Security Maintained',
			description:
				'Automated SSL renewal and security monitoring mean your site does not go down due to an expired certificate or a known vulnerability in an unpatched component.',
		},
		{
			title: 'Backups That Actually Work',
			description:
				'Automated backups with tested restore procedures mean data loss from server failure is recoverable. Backups that have never been tested are not a real safety net.',
		},
		{
			title: 'Problems Caught Before Users Notice',
			description:
				'Uptime monitoring with alert thresholds means hosting issues are identified and investigated before they become customer-facing outages.',
		},
		{
			title: 'Clear Support Path',
			description:
				'When a hosting problem occurs, you have a team to contact rather than having to diagnose an unfamiliar server yourself or wait for generic provider support.',
		},
	],

	faqs: [
		{
			q: 'What is the difference between shared hosting, VPS, and dedicated hosting?',
			a: 'Shared hosting puts multiple sites on the same server sharing all resources, making it unpredictable under load and inappropriate for anything beyond simple low-traffic sites. VPS gives you a virtualised portion of a physical server with guaranteed resources, suitable for most business applications. Dedicated hosting gives you an entire physical server, appropriate for high-traffic applications or those with strict security requirements. Managed hosting platforms like Vercel or Render abstract all of this away at the cost of flexibility and, sometimes, higher pricing at scale.',
		},
		{
			q: 'Should we use a managed platform like Vercel or run our own server?',
			a: 'Managed platforms are generally the right choice for web applications and sites built on modern frameworks, because they handle SSL, CDN, scaling, and deployment infrastructure. A VPS or dedicated server is more appropriate when you need custom server configuration, are running non-web workloads, or have workloads where managed platform pricing becomes expensive at scale.',
		},
		{
			q: 'How do you handle SSL certificate management?',
			a: "For server-based hosting we use Let's Encrypt certificates with automated renewal via Certbot, monitored to alert before expiry. For managed platforms, SSL is handled by the platform. For custom certificate requirements such as extended validation or wildcard certificates across many subdomains, we assess the best approach based on your specific needs.",
		},
		{
			q: 'What backup frequency do you recommend?',
			a: 'For databases containing active business data, daily automated backups with 30-day retention are a standard starting point. For file storage, daily or weekly depending on how frequently content changes. The most important thing is that backups are regularly tested — a backup that has never been successfully restored is not a meaningful safeguard.',
		},
	],
	answerSummary:
		'UK and India businesses choosing hosting based on cost alone and ending up with slow, unsecured, or unmonitored environments get correctly sized VPS, dedicated, or managed hosting with proper configuration, SSL, backups, and uptime monitoring for reliable application delivery.',
};

export default function HostingPage() {
	return <SubservicePageLayout data={data} />;
}
