import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Cloud Infrastructure & Migration Consulting | aibizmod',
	description:
		'Cloud advisory, migration planning, and architecture consulting for AWS, Azure, and GCP — aligned to your technical requirements and business budget.',
	keywords: [
		'cloud infrastructure',
		'cloud consulting',
		'AWS consulting',
		'Azure consulting',
		'cloud migration',
		'cloud strategy',
		'infrastructure consulting',
		'cloud architecture',
		'multi-cloud strategy',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/it-consulting-it-services/cloud-infrastructure',
	},
	openGraph: {
		title: 'Cloud Infrastructure | Cloud Migration & Strategy | aibizmod',
		description:
			'Cloud services advisory and migration planning to help organisations design and optimise cloud infrastructure.',
		url: '/services/it-consulting-it-services/cloud-infrastructure',
	},
};

const data: SubservicePageData = {
	name: 'Cloud & Infrastructure',
	parentName: 'IT Consulting & IT Services',
	parentSlug: 'it-consulting-it-services',
	slug: 'cloud-infrastructure',
	tagline:
		'Cloud services advisory, migration planning, and architecture consulting that helps organisations design, adopt, and optimise cloud infrastructure aligned to their technical requirements, operational model, and cost targets.',
	heroImage:
		'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Cloud adoption without a coherent strategy produces fragmented environments, uncontrolled costs, and a security posture that is harder to manage than the on-premise infrastructure it replaced. Organisations migrate to cloud reactively — moving workloads without redesigning them — or adopt cloud services inconsistently across teams, creating a multi-account sprawl that no one can audit or govern effectively.',
		challengePoints: [
			'Cloud costs growing without a corresponding understanding of what is driving them',
			'Multiple cloud accounts or providers adopted by different teams with no central governance',
			'Applications migrated to cloud without redesign, carrying the same performance and reliability limitations',
			'Security configuration inconsistent across cloud environments with no unified policy',
		],
		solution:
			'We provide cloud architecture and migration consulting that starts from your business requirements and designs the cloud environment to serve them. This includes cloud strategy, migration planning, architecture design, governance frameworks, and cost optimisation — independent of vendor incentives.',
		solutionPoints: [
			'Cloud strategy aligned to your workload requirements, compliance constraints, and cost targets',
			'Migration plan that sequences workloads by dependency and risk rather than technical convenience',
			'Architecture design covering multi-account structure, network topology, and security baseline',
			'Governance framework covering tagging policies, cost attribution, and access control standards',
		],
	},

	capabilities: [
		{
			icon: 'cloud',
			title: 'Cloud Strategy and Adoption Planning',
			description:
				'Define your organisation',
			image: '/services/it-consulting-it-services/cloud-infrastructure-cloud-strategy-and-adoption-planning.jpg',
			imageAlt: 'IT Consulting & IT Services Cloud Strategy and Adoption Planning capability illustration.',
		},
		{
			icon: 'server',
			title: 'Cloud Architecture Design',
			description:
				'Design cloud architectures on AWS, Azure, or GCP that address your availability, security, performance, and cost requirements with documented design decisions.',
			image: '/services/it-consulting-it-services/cloud-infrastructure-cloud-architecture-design.jpg',
			imageAlt: 'IT Consulting & IT Services Cloud Architecture Design capability illustration.',
		},
		{
			icon: 'layers',
			title: 'Cloud Migration Planning',
			description:
				'Assess the workloads in scope for migration, identify dependencies and risks, design the migration approach, and produce a sequenced migration plan with defined success criteria.',
			image: '/services/it-consulting-it-services/cloud-infrastructure-cloud-migration-planning.jpg',
			imageAlt: 'IT Consulting & IT Services Cloud Migration Planning capability illustration.',
		},
		{
			icon: 'settings',
			title: 'Cloud Governance Framework',
			description:
				'Design the account structure, tagging policies, access control standards, and cost management practices that enable cloud to be operated at scale with visibility and control.',
			image: '/services/it-consulting-it-services/cloud-infrastructure-cloud-governance-framework.jpg',
			imageAlt: 'IT Consulting & IT Services Cloud Governance Framework capability illustration.',
		},
		{
			icon: 'lineChart',
			title: 'Cloud Cost Optimisation',
			description:
				'Audit current cloud spend, identify waste and over-provisioning, implement cost allocation tagging, and recommend reserved capacity and architectural improvements to reduce costs.',
			image: '/services/it-consulting-it-services/cloud-infrastructure-cloud-cost-optimisation.jpg',
			imageAlt: 'IT Consulting & IT Services Cloud Cost Optimisation capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Cloud Security Review',
			description:
				'Assess cloud environments against security best practices and compliance requirements, producing findings and remediation guidance for identified configuration gaps.',
			image: '/services/it-consulting-it-services/cloud-infrastructure-cloud-security-review.jpg',
			imageAlt: 'IT Consulting & IT Services Cloud Security Review capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Finance',
			title: 'Cloud Migration Strategy for a Financial Services Company',
			description:
				'A financial services company needed to migrate from on-premise to AWS while meeting regulatory data residency and audit requirements. We produced a migration strategy with workload sequencing and compliance control mapping.',
		},
		{
			industry: 'Retail',
			title: 'Multi-Cloud Governance Framework',
			description:
				'A retailer had AWS and Azure environments managed by different teams with no unified governance. We designed a governance framework covering tagging standards, cost attribution, and access control policies applied across both environments.',
		},
		{
			industry: 'Healthcare',
			title: 'Cloud Architecture for a Patient Data Platform',
			description:
				'A healthcare provider needed cloud infrastructure for a new patient data platform meeting NHS data security requirements. We designed a secure AWS architecture with private networking, encryption, and audit logging.',
		},
		{
			industry: 'SaaS',
			title: 'Cloud Cost Audit for a Growing Product',
			description:
				"A SaaS company's AWS costs had grown 80 percent over 18 months. A cost audit identified three specific areas of waste — idle EC2 instances, oversized RDS instances, and unattached EBS volumes — reducing monthly spend by 28 percent.",
		},
		{
			industry: 'Manufacturing',
			title: 'AWS Well-Architected Review',
			description:
				"A manufacturer's cloud environment had never been formally reviewed. An AWS Well-Architected Framework assessment identified gaps across reliability, security, and cost optimisation pillars.",
		},
		{
			industry: 'Professional Services',
			title: 'Cloud Provider Selection',
			description:
				'A professional services firm was choosing between AWS and Azure for their primary cloud platform. We conducted a structured evaluation against their workload requirements, existing Microsoft investments, and team capability.',
		},
	],

	technologies: [
		'AWS',
		'Microsoft Azure',
		'Google Cloud Platform',
		'Terraform',
		'AWS CloudFormation',
		'AWS Well-Architected',
		'AWS Organizations',
		'Azure Policy',
		'Cloudflare',
		'Datadog',
	],

	benefits: [
		{
			title: 'Cloud That Serves the Business',
			description:
				'A cloud strategy built on your actual requirements rather than vendor defaults produces infrastructure that is appropriately sized, secure, and aligned to how the organisation needs to operate.',
		},
		{
			title: 'Migration with Defined Outcomes',
			description:
				'A sequenced migration plan with success criteria for each workload reduces the risk of a migration that produces an unstable cloud environment rather than a reliable improvement.',
		},
		{
			title: 'Cost Visibility and Control',
			description:
				'Governance frameworks with tagging and cost attribution make cloud spend visible and attributable, enabling cost management decisions based on actual usage data.',
		},
		{
			title: 'Consistent Security Across Environments',
			description:
				'A unified security baseline applied across all cloud accounts and environments is more manageable and auditable than security configuration that varies by team or project.',
		},
		{
			title: 'Vendor-Independent Recommendations',
			description:
				'Cloud recommendations not driven by vendor partnership produce designs that are right for your workload rather than skewed toward services that carry referral incentives.',
		},
		{
			title: 'Architecture Designed for Future Scale',
			description:
				'A well-designed cloud architecture accommodates growth without requiring significant rearchitecture, because scaling patterns and capacity constraints are considered upfront.',
		},
	],

	faqs: [
		{
			q: 'What is a cloud migration strategy and why do we need one before migrating?',
			a: 'A cloud migration strategy defines which workloads to migrate, in what order, using what approach, and to what target architecture. Without it, workloads get migrated reactively — typically by lifting applications to cloud VMs without redesign — producing a cloud environment that has higher costs, lower reliability, and harder security management than an environment designed for cloud from the start. A strategy also identifies workloads that are better left on-premise or replaced rather than migrated.',
		},
		{
			q: 'How do you approach cloud cost optimisation without affecting performance or reliability?',
			a: 'We start with a cost analysis that separates waste (idle resources, unused services, unattached storage) from over-provisioning (resources provisioned larger than actual usage requires). Waste can typically be eliminated without any performance impact. Over-provisioning requires testing to confirm the reduced size handles actual load. We recommend changes in order of cost impact and implementation risk, so the easiest wins come first.',
		},
		{
			q: 'What is a Well-Architected review?',
			a: 'AWS, Azure, and GCP each publish architectural best practices frameworks. A Well-Architected review assesses your cloud environment against these frameworks across pillars including security, reliability, performance, cost optimisation, and operational excellence. It produces a prioritised findings report. It is a structured way to identify gaps in cloud environments that were built incrementally rather than to a designed architecture.',
		},
		{
			q: 'Do you provide implementation services or just advisory?',
			a: 'Both. Cloud architecture consulting typically starts with an advisory phase to design the right architecture before implementation begins. We also handle implementation — building infrastructure-as-code, configuring security controls, executing migrations, and setting up governance tooling. Many clients engage us for both so the architecture intent is carried through to the implemented reality.',
		},
	],
	answerSummary:
		'UK and India organisations adopting cloud reactively and ending up with fragmented environments and uncontrolled costs get cloud strategy, migration planning, architecture design, governance frameworks, and cost optimisation independent of vendor incentives.',
};

export default function CloudInfrastructurePage() {
	return <SubservicePageLayout data={data} />;
}
