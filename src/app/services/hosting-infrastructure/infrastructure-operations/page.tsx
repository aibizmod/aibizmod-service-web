import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Infrastructure Operations & Monitoring Services | aibizmod',
	description:
		'Infrastructure operations and monitoring services. System health monitoring, incident response, and infrastructure optimization.',
	keywords: [
		'infrastructure operations',
		'monitoring services',
		'infrastructure monitoring',
		'system monitoring',
		'performance monitoring',
		'incident management',
		'infrastructure management',
		'uptime monitoring',
		'managed services',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/hosting-infrastructure/infrastructure-operations',
	},
	openGraph: {
		title: 'Infrastructure Operations | Monitoring & Management | aibizmod',
		description:
			'Infrastructure operations and monitoring services with system health tracking and incident response.',
		url: '/services/hosting-infrastructure/infrastructure-operations',
	},
};

const data: SubservicePageData = {
	name: 'Infrastructure Operations',
	parentName: 'Hosting & Infrastructure',
	parentSlug: 'hosting-infrastructure',
	slug: 'infrastructure-operations',
	tagline:
		'Infrastructure management, monitoring, and performance tuning services that keep your applications reliable, observable, and operating within defined performance targets.',
	heroImage:
		'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Businesses running production infrastructure without proper monitoring only discover problems when customers report them. There is no visibility into whether response times are degrading, disk space is running low, or error rates are rising. Performance issues are investigated after the fact rather than addressed proactively. Infrastructure that worked at low traffic fails unpredictably at higher loads because capacity thresholds were never defined.',
		challengePoints: [
			'Application problems discovered via customer complaints rather than monitoring alerts',
			'No dashboards showing infrastructure health, so the state of production is unknown at any given moment',
			'Performance issues investigated reactively without baseline data to compare against',
			'Infrastructure sized by guesswork rather than load testing or measured capacity thresholds',
		],
		solution:
			'We implement observability infrastructure — metrics, logs, traces, and alerting — so your team has visibility into the state of production at all times. We also conduct performance audits to identify bottlenecks and implement tuning changes that improve throughput and reliability under load.',
		solutionPoints: [
			'Monitoring stack with metrics, logs, and alert configuration covering the full infrastructure layer',
			'Application performance monitoring covering response time, error rate, and throughput',
			'Capacity planning based on measured baseline and projected growth rather than estimates',
			'On-call runbooks documenting response procedures for defined incident types',
		],
	},

	capabilities: [
		{
			icon: 'activity',
			title: 'Infrastructure Monitoring',
			description:
				'Deploy monitoring across servers, containers, databases, and network components with dashboards covering utilisation, latency, error rates, and availability.',
			image: '/services/hosting-infrastructure/infrastructure-operations-infrastructure-monitoring.jpg',
			imageAlt: 'Hosting & Infrastructure Infrastructure Monitoring capability illustration.',
		},
		{
			icon: 'bell',
			title: 'Alerting Configuration',
			description:
				'Configure alert rules with appropriate thresholds and escalation paths so the right people are notified at the right time — not flooded with noise or missing real incidents.',
			image: '/services/hosting-infrastructure/infrastructure-operations-alerting-configuration.jpg',
			imageAlt: 'Hosting & Infrastructure Alerting Configuration capability illustration.',
		},
		{
			icon: 'lineChart',
			title: 'Application Performance Monitoring',
			description:
				'Instrument application code with distributed tracing and APM tools to identify slow queries, high-latency endpoints, and performance bottlenecks in the application layer.',
			image: '/services/hosting-infrastructure/infrastructure-operations-application-performance-monitoring.jpg',
			imageAlt: 'Hosting & Infrastructure Application Performance Monitoring capability illustration.',
		},
		{
			icon: 'server',
			title: 'Infrastructure Performance Tuning',
			description:
				'Audit and tune database query performance, web server configuration, caching layers, and network configuration to improve throughput and reduce response times.',
			image: '/services/hosting-infrastructure/infrastructure-operations-infrastructure-performance-tuning.jpg',
			imageAlt: 'Hosting & Infrastructure Infrastructure Performance Tuning capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Capacity Planning',
			description:
				'Establish performance baselines, model growth scenarios, and define capacity thresholds so scaling decisions are made proactively rather than in response to incidents.',
			image: '/services/hosting-infrastructure/infrastructure-operations-capacity-planning.jpg',
			imageAlt: 'Hosting & Infrastructure Capacity Planning capability illustration.',
		},
		{
			icon: 'fileText',
			title: 'Runbook and Incident Documentation',
			description:
				'Document standard operating procedures and incident response runbooks so infrastructure issues can be diagnosed and resolved by any team member, not just the person who built the system.',
			image: '/services/hosting-infrastructure/infrastructure-operations-runbook-and-incident-documentation.jpg',
			imageAlt: 'Hosting & Infrastructure Runbook and Incident Documentation capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'SaaS',
			title: 'Monitoring Stack Setup for a Production Application',
			description:
				'A SaaS company was running their production application with no monitoring beyond basic uptime checks. We deployed Datadog with infrastructure metrics, APM, log aggregation, and alerting covering all critical services.',
		},
		{
			industry: 'E-commerce',
			title: 'Performance Tuning Before Peak Season',
			description:
				'An online retailer needed their infrastructure performance reviewed before their annual sale event. Load testing identified database query bottlenecks that were fixed before the sale began.',
		},
		{
			industry: 'Financial Services',
			title: 'Alerting Overhaul for a Trading Platform',
			description:
				'A trading platform had hundreds of alerts configured, most of which fired constantly. We rationalised alerting to cover meaningful thresholds with appropriate escalation paths, reducing alert noise by 80 percent.',
		},
		{
			industry: 'Healthcare',
			title: 'Application Response Time Improvement',
			description:
				'A healthcare application had degrading response times as the user base grew. APM tracing identified three slow database queries responsible for the majority of latency, which were optimised with index additions.',
		},
		{
			industry: 'Media',
			title: 'Capacity Planning for a Content Platform',
			description:
				'A content platform with growing traffic needed a capacity plan for the next 12 months. We modelled traffic growth against baseline infrastructure metrics and produced a phased scaling plan.',
		},
		{
			industry: 'Logistics',
			title: 'Incident Runbook Development',
			description:
				'A logistics software company had no documented incident response procedures. We produced runbooks for their ten most common infrastructure incident types, enabling out-of-hours incidents to be handled by any team member.',
		},
	],

	technologies: [
		'Datadog',
		'Prometheus',
		'Grafana',
		'PagerDuty',
		'AWS CloudWatch',
		'Elasticsearch',
		'Jaeger',
		'New Relic',
		'Nginx',
		'PostgreSQL',
	],

	benefits: [
		{
			title: 'Problems Found Before Customers Do',
			description:
				'Properly configured monitoring alerts the team to degrading conditions before they become customer-facing incidents, reducing the frequency and duration of outages.',
		},
		{
			title: 'Faster Incident Resolution',
			description:
				'When dashboards, traces, and logs are already in place, diagnosing the cause of an incident takes minutes rather than hours of exploratory investigation.',
		},
		{
			title: 'Confidence in Release Quality',
			description:
				'Monitoring that shows application behaviour before and after each deployment makes it straightforward to verify that a release did not introduce performance regressions.',
		},
		{
			title: 'Data-Driven Scaling Decisions',
			description:
				'Capacity planning based on measured baselines and growth projections replaces reactive scrambling when performance degrades under load.',
		},
		{
			title: 'Reduced Operational Dependency',
			description:
				'Runbooks and documented procedures mean infrastructure incidents can be handled by any team member with appropriate access, not just the person who originally built the system.',
		},
		{
			title: 'Noise-Free Alerting',
			description:
				'Well-tuned alert thresholds that fire on meaningful conditions rather than transient spikes mean on-call engineers respond to real issues rather than developing alert fatigue.',
		},
	],

	faqs: [
		{
			q: 'What monitoring tool do you recommend?',
			a: 'Datadog is our most commonly recommended choice for production monitoring because it covers infrastructure metrics, APM, log aggregation, and alerting in a single platform. Prometheus and Grafana are a strong open-source alternative for teams that prefer to control their own monitoring stack. AWS CloudWatch is sufficient for AWS-only infrastructure where you want minimal operational overhead. The choice depends on your stack, team size, and how much you want to manage.',
		},
		{
			q: 'How do you determine the right alerting thresholds?',
			a: 'We start by establishing a baseline of normal behaviour for each metric over a representative period — typically two to four weeks of production traffic. Thresholds are then set above the normal range with enough headroom to avoid false positives, but tight enough to catch genuine degradation. We review and adjust thresholds after the first 30 days based on alert history.',
		},
		{
			q: 'What is application performance monitoring and how is it different from infrastructure monitoring?',
			a: 'Infrastructure monitoring covers the health of servers, containers, networks, and databases — CPU, memory, disk, connection counts. APM instruments the application code itself, tracking how long each request takes, which functions are slow, which database queries run most frequently, and where errors originate. Both are needed for a complete view of system health.',
		},
		{
			q: 'Can you help with an existing production environment or only new setups?',
			a: 'We work with both. For existing environments, we conduct an observability audit to identify monitoring gaps and implement monitoring incrementally without disruption to the running system.',
		},
	],
	answerSummary:
		'UK and India teams discovering production problems only when customers report them get observability infrastructure with metrics, logs, traces, alerting, and runbooks so they have continuous visibility into system health and can resolve incidents faster.',
};

export default function InfrastructureOperationsPage() {
	return <SubservicePageLayout data={data} />;
}
