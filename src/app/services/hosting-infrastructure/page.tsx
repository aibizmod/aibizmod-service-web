import type { Metadata } from 'next';
import ServicePageLayout, {
	type ServicePageData,
	type ServiceCard,
} from '@/components/ServicePageLayout';
import IntegrationHero, {
	HOSTING_ROW1,
	HOSTING_ROW2,
} from '@/components/ui/integration-hero';

export const metadata: Metadata = {
	title: 'Cloud Hosting & Infrastructure Services | aibizmod',
	description:
		'Cloud hosting, DevOps, managed infrastructure, and database services — reliable, observable, and built to scale. AWS, Azure, and GCP deployment specialists.',
	keywords: [
		'cloud hosting services',
		'managed cloud hosting',
		'cloud migration services',
		'devops services',
		'aws managed services',
		'cloud infrastructure',
		'AWS hosting',
		'cloud services',
		'infrastructure as a service',
		'cloud deployment',
		'cloud management',
		'scalable hosting',
		'cloud infrastructure services',
		'managed cloud services',
	],
	alternates: {
		canonical: 'https://aibizmod.com/services/hosting-infrastructure',
	},
	openGraph: {
		title: 'Cloud Hosting & Infrastructure | aibizmod',
		description:
			'Cloud hosting, DevOps, managed infrastructure, and database services — reliable, observable, and built to scale. AWS, Azure, and GCP deployment specialists.',
		url: '/services/hosting-infrastructure',
	},
};

const data: ServicePageData = {
	name: 'Hosting & Infrastructure',
	tagline:
		'For development teams and businesses across the UK, USA, and internationally that need reliable, scalable infrastructure, we set up cloud hosting on AWS, GCP, or Azure, configure isolated staging and production environments, establish automated backups, and build deployment pipelines with rollback capability. The result is stable releases and systems your team can maintain and trust.',
	heroBullets: [
		'For development teams that need reliable, scalable infrastructure on major cloud platforms',
		'Cloud hosting on AWS, GCP, or Azure — isolated environments, automated backups, and deployment pipelines',
		'Stable releases, rollback capability, and infrastructure your team can maintain and trust',
		'Serving clients in the UK, USA, and internationally',
	],
	slug: 'hosting-infrastructure',
	iconColor: 'text-orange-500',

	overview: {
		paragraphs: [
			"Bad deployments are almost always a process problem, not a code problem. Someone pushed directly to production, there was no staging environment to catch the issue first, and now the rollback is manual and stressful. Getting the infrastructure right means putting those safeguards in before they're needed: separate environments for testing and live, automated backups that actually get tested, deployment pipelines that can roll back in under a minute, and monitoring that alerts the right people before users notice something is wrong. The setup is documented in plain language so your team understands what's running and what it costs.",
		],
		benefits: [
			'Separated Staging and Production Systems',
			'Automated Deployment with Rollback Triggers',
			'Configured Daily Database Backups',
			'Active CPU and HTTP Alert Monitors',
			'Plain Business Language Billing Estimates',
			'Complete Infrastructure Codebase Access',
		],
	},

	features: [
		{
			icon: 'layers',
			title: 'Infrastructure Diagram',
			desc: 'We provide a diagram detailing your virtual networks, server resources, database storage, and external traffic routing.',
		},
		{
			icon: 'activity',
			title: 'Monitoring Setup',
			desc: 'We set up alert logs on CPU usage, disk space limits, and HTTP response errors, routing warnings directly to email or messaging channels.',
		},
		{
			icon: 'database',
			title: 'Backup Policy',
			desc: 'We schedule automated daily database snapshots, set retention limits, and document step-by-step restoration instructions.',
		},
		{
			icon: 'workflow',
			title: 'Deployment Workflow',
			desc: 'We write git-triggered build scripts that run automatic integration checks and push releases to cloud servers without downtime.',
		},
		{
			icon: 'shield',
			title: 'Security Checklist',
			desc: 'We lock down SSH server access, enforce SSL encryption certificates, and configure IAM role credentials following the least-privilege principle.',
		},
		{
			icon: 'cloud',
			title: 'Environment Isolation',
			desc: 'We provision distinct development, staging, and production environments with isolated databases to prevent test data leaks.',
		},
	],

	process: [
		{
			icon: 'search',
			title: 'Hosting Assessment',
			desc: 'We review your codebase, estimate traffic requirements, and outline server costs across AWS, Google Cloud, or digital VPS providers.',
		},
		{
			icon: 'layers',
			title: 'IaC & Scripting',
			desc: 'We codify the server setups using Terraform or deployment scripts, allowing environments to be recreated automatically.',
		},
		{
			icon: 'shield',
			title: 'Staging Setup & QA',
			desc: 'We set up staging, verify database restoration scripts, test rollback actions, and execute load simulations.',
		},
		{
			icon: 'rocket',
			title: 'Production Migration',
			desc: 'We migrate production data, configure DNS records, verify SSL certificate layers, and set monitoring systems to live.',
		},
	],

	faqs: [
		{
			q: 'How do you explain the difference between AWS, Google Cloud, and basic hosting?',
			a: 'Basic hosting shares server hardware with other websites, which can cause slowdowns. Cloud providers like AWS and Google Cloud isolate your resources on virtual servers, allowing us to configure isolated environments, set up dedicated database backups, and expand CPU capacity during peak loads.',
		},
		{
			q: 'What happens if a new code deployment crashes our live application?',
			a: 'We build deployment pipelines with a rollback strategy. If the live app encounters errors after a release, our script immediately redirects traffic back to the previously built version. This recovery process takes less than 30 seconds.',
		},
		{
			q: 'How do we verify that our database backups actually work?',
			a: 'We establish a restore drill as part of our backup policy. Every month, our scripts restore a recent database snapshot to an isolated staging database and verify that schemas and record counts match the live production state.',
		},
		{
			q: 'Do you retain control over our cloud hosting credentials?',
			a: 'No. We configure all servers and databases directly within your own billing accounts on AWS, Vercel, or Google Cloud. You retain administrative master credentials, and we access the resources through restricted IAM team permissions that you can revoke at any time.',
		},
	],
	answerSummary:
		'Cloud hosting and infrastructure services for UK and India-based businesses. We provide AWS, Azure, and GCP architecture, CI/CD pipelines, containerisation, and managed infrastructure that scales with your business and reduces operational overhead.',
};

const serviceCards: ServiceCard[] = [
	{
		title: 'Cloud Solutions',
		image:
			'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop',
		bullets: ['Cloud Services', 'Cloud Migration', 'Cloud Architecture'],
		href: '/services/hosting-infrastructure/cloud-solutions',
	},
	{
		title: 'DevOps',
		image:
			'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'CI/CD',
			'Infrastructure Automation',
			'Containerization',
			'Kubernetes',
		],
		href: '/services/hosting-infrastructure/devops',
	},
	{
		title: 'Infrastructure Operations',
		image:
			'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop',
		bullets: ['Infrastructure Management', 'Monitoring', 'Performance Tuning'],
		href: '/services/hosting-infrastructure/infrastructure-operations',
	},
	{
		title: 'Hosting',
		image:
			'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'Shared Hosting',
			'VPS Hosting',
			'Dedicated Hosting',
			'Managed Hosting',
		],
		href: '/services/hosting-infrastructure/hosting',
	},
	{
		title: 'Security',
		image:
			'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'SSL',
			'Backup Solutions',
			'Disaster Recovery',
			'Security Audits',
		],
		href: '/services/hosting-infrastructure/security',
	},
	{
		title: 'Database Services',
		image:
			'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'Database Hosting',
			'Database Optimization',
			'Database Administration',
		],
		href: '/services/hosting-infrastructure/database-services',
	},
];

export default function HostingInfrastructurePage() {
	return (
		<ServicePageLayout
			data={data}
			techStackFooter={
				<IntegrationHero iconsRow1={HOSTING_ROW1} iconsRow2={HOSTING_ROW2} />
			}
			serviceCards={serviceCards}
		/>
	);
}
