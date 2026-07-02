import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Cloud Solutions & Cloud Migration Services | aibizmod',
	description:
		'Cloud migration, cloud architecture, and multi-cloud management on AWS, Azure, and GCP — designed to reduce infrastructure cost and improve reliability.',
	keywords: [
		'cloud solutions',
		'cloud migration',
		'AWS solutions',
		'Azure solutions',
		'cloud architecture',
		'enterprise cloud',
		'multi-cloud strategy',
		'cloud infrastructure',
		'cloud migration services',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/hosting-infrastructure/cloud-solutions',
	},
	openGraph: {
		title: 'Cloud Solutions | Cloud Migration | aibizmod',
		description:
			'Enterprise cloud solutions and migration services on AWS, Azure, and GCP.',
		url: '/services/hosting-infrastructure/cloud-solutions',
	},
};

const data: SubservicePageData = {
	name: 'Cloud Solutions',
	parentName: 'Hosting & Infrastructure',
	parentSlug: 'hosting-infrastructure',
	slug: 'cloud-solutions',
	tagline:
		'Cloud services, cloud migration, and cloud architecture designed to reduce infrastructure cost, improve reliability, and give your team the scalability they need without the overhead of managing physical hardware.',
	heroImage:
		'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'On-premise infrastructure or legacy hosting arrangements create fixed costs regardless of actual usage, require specialist maintenance, and cannot scale quickly when demand changes. Businesses running critical workloads on ageing infrastructure face increasing reliability risk and are locked out of the services that modern cloud platforms provide — managed databases, serverless functions, container orchestration, and global content delivery.',
		challengePoints: [
			'Fixed infrastructure costs with no ability to scale capacity up or down with demand',
			'On-premise hardware approaching end of life with increasing maintenance burden',
			'Manual deployment and configuration processes that slow down development cycles',
			'Disaster recovery plans that exist on paper but are not regularly tested or automated',
		],
		solution:
			'We design and implement cloud architectures on AWS, Azure, or GCP that match your workload requirements, migrate existing applications without disruption, and configure the infrastructure-as-code and monitoring that makes ongoing management efficient rather than manual.',
		solutionPoints: [
			'Cloud architecture design matched to your workload patterns, reliability requirements, and budget',
			'Migration planning and execution with minimal disruption to running services',
			'Infrastructure-as-code configuration using Terraform or AWS CloudFormation for reproducible environments',
			'Cost optimisation review covering right-sizing, reserved capacity, and unused resource cleanup',
		],
	},

	capabilities: [
		{
			icon: 'cloud',
			title: 'Cloud Architecture Design',
			description:
				'Design multi-tier cloud architectures on AWS, Azure, or GCP that balance performance, availability, security, and cost for your specific workload.',
			image: '/services/hosting-infrastructure/cloud-solutions-cloud-architecture-design.jpg',
			imageAlt: 'Hosting & Infrastructure Cloud Architecture Design capability illustration.',
		},
		{
			icon: 'server',
			title: 'Cloud Migration',
			description:
				'Plan and execute the migration of existing applications, databases, and infrastructure from on-premise or legacy hosting to cloud with minimal service disruption.',
			image: '/services/hosting-infrastructure/cloud-solutions-cloud-migration.jpg',
			imageAlt: 'Hosting & Infrastructure Cloud Migration capability illustration.',
		},
		{
			icon: 'layers',
			title: 'Serverless Architecture',
			description:
				'Design and deploy serverless applications using AWS Lambda, Azure Functions, or GCP Cloud Run for workloads that benefit from event-driven, auto-scaling compute.',
			image: '/services/hosting-infrastructure/cloud-solutions-serverless-architecture.jpg',
			imageAlt: 'Hosting & Infrastructure Serverless Architecture capability illustration.',
		},
		{
			icon: 'settings',
			title: 'Infrastructure as Code',
			description:
				'Implement Terraform or AWS CloudFormation to define and manage cloud infrastructure in version-controlled code, enabling reproducible environments and automated provisioning.',
			image: '/services/hosting-infrastructure/cloud-solutions-infrastructure-as-code.jpg',
			imageAlt: 'Hosting & Infrastructure Infrastructure as Code capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Cloud Security Configuration',
			description:
				'Configure IAM policies, security groups, VPC architecture, encryption, and audit logging to ensure cloud environments meet your security and compliance requirements.',
			image: '/services/hosting-infrastructure/cloud-solutions-cloud-security-configuration.jpg',
			imageAlt: 'Hosting & Infrastructure Cloud Security Configuration capability illustration.',
		},
		{
			icon: 'lineChart',
			title: 'Cost Optimisation',
			description:
				'Audit existing cloud spend, identify over-provisioned resources and unused services, and implement right-sizing and reserved instance strategies to reduce monthly costs.',
			image: '/services/hosting-infrastructure/cloud-solutions-cost-optimisation.jpg',
			imageAlt: 'Hosting & Infrastructure Cost Optimisation capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'SaaS',
			title: 'Migration from VPS to AWS for a Growing Product',
			description:
				'A SaaS company outgrew their fixed VPS hosting as user numbers grew. We migrated their application to AWS ECS with auto-scaling, reducing infrastructure cost and improving availability.',
		},
		{
			industry: 'Retail',
			title: 'E-Commerce Infrastructure Scaling',
			description:
				'An online retailer needed infrastructure that could handle peak load during sale events without paying for peak capacity year-round. A cloud architecture with auto-scaling groups and a CDN resolved both problems.',
		},
		{
			industry: 'Finance',
			title: 'Secure Cloud Architecture for a Financial Platform',
			description:
				'A financial services company needed a cloud environment meeting their compliance requirements. We designed a VPC architecture with private subnets, encryption in transit and at rest, and audit logging across all services.',
		},
		{
			industry: 'Healthcare',
			title: 'Disaster Recovery Setup on AWS',
			description:
				"A healthcare provider's on-premise infrastructure had no tested disaster recovery plan. We implemented an AWS-based DR environment with regular failover testing and documented recovery procedures.",
		},
		{
			industry: 'Manufacturing',
			title: 'IoT Data Pipeline on Azure',
			description:
				'A manufacturer needed cloud infrastructure to receive, process, and store sensor data from factory equipment. We built an Azure-based IoT pipeline using Event Hubs, Stream Analytics, and Blob Storage.',
		},
		{
			industry: 'Professional Services',
			title: 'Cloud Cost Audit for an Established AWS Customer',
			description:
				"A professional services firm's AWS costs had grown without anyone reviewing utilisation. A cost audit identified 30 percent of spend going to unused or over-provisioned resources.",
		},
	],

	technologies: [
		'AWS',
		'Microsoft Azure',
		'Google Cloud Platform',
		'Terraform',
		'AWS CloudFormation',
		'Docker',
		'Kubernetes',
		'AWS Lambda',
		'Cloudflare',
		'Datadog',
	],

	benefits: [
		{
			title: 'Capacity That Scales with Demand',
			description:
				'Cloud resources scale up during peak load and down during quiet periods, removing the choice between over-provisioning for peaks or under-provisioning for normal load.',
		},
		{
			title: 'Reduced Infrastructure Management Overhead',
			description:
				'Managed cloud services — databases, queues, container orchestration — shift maintenance responsibility to the provider, freeing your team from patching, backups, and hardware management.',
		},
		{
			title: 'Reproducible Environments',
			description:
				'Infrastructure-as-code means development, staging, and production environments can be created consistently and reverted to a known state, removing environment drift as a source of bugs.',
		},
		{
			title: 'Built-in Redundancy',
			description:
				'Multi-availability zone deployments provide redundancy that is prohibitively expensive to replicate with on-premise hardware, at a fraction of the cost of equivalent physical infrastructure.',
		},
		{
			title: 'Controlled Costs',
			description:
				'Cloud environments sized correctly for actual usage and monitored for waste produce predictable costs. Regular optimisation reviews prevent the gradual cost creep that affects unmanaged cloud accounts.',
		},
		{
			title: 'Global Distribution',
			description:
				'Content delivery networks and multi-region deployments give globally distributed users fast access to your application without managing international infrastructure directly.',
		},
	],

	faqs: [
		{
			q: 'How do you decide between AWS, Azure, and GCP?',
			a: 'The choice depends on your existing technology stack, team familiarity, and workload characteristics. AWS has the broadest service catalogue and is generally the strongest choice for new projects. Azure is the natural fit if you have existing Microsoft infrastructure — Active Directory, SQL Server, Office 365. GCP is worth considering for data-intensive workloads and machine learning use cases. Most businesses do not need to evaluate all three — one is usually a clear fit given their context.',
		},
		{
			q: 'How much disruption does a cloud migration typically cause?',
			a: 'A well-planned migration should cause minimal disruption. We use a lift-and-shift approach for the initial migration, running the cloud environment in parallel with the existing one and switching over during a low-traffic window. Applications that require architectural changes for cloud are refactored as a separate phase after the initial migration is stable.',
		},
		{
			q: 'How do you manage cloud costs after migration?',
			a: 'We configure billing alerts, implement tagging policies for cost attribution, and schedule a cost review at 30 and 90 days post-migration. We also review reserved instance purchasing once the usage pattern is stable, which typically reduces compute costs by 30 to 40 percent compared to on-demand pricing.',
		},
		{
			q: 'What security standards do you configure by default?',
			a: 'By default we configure IAM with least-privilege policies, multi-factor authentication for console access, encryption at rest and in transit for all storage and database services, VPC with private subnets for application workloads, CloudTrail or equivalent audit logging, and automated security scanning for common misconfigurations. Additional controls are added based on compliance requirements.',
		},
		{
			q: 'Do you host cloud project management software?',
			a: 'Yes. We host and operate cloud project management software on AWS, Azure, and GCP for SaaS product teams and internal IT departments. The hosting layer covers the application runtime, database, file storage, identity provider, observability, backup, and disaster recovery — designed to keep the application reliably available as users grow. This hosting is delivered alongside our custom software development work for clients who want a single team to build and run the platform.',
		},
	],
	answerSummary:
		'UK and India organisations on fixed on-premise or legacy hosting that cannot scale with demand get cloud architecture design, migration planning, and infrastructure-as-code on AWS, Azure, or GCP that reduces costs, improves reliability, and removes manual management overhead.',
};

export default function CloudSolutionsPage() {
	return <SubservicePageLayout data={data} />;
}
