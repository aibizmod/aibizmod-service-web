import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'DevOps & CI/CD Pipeline Services | aibizmod',
	description:
		'CI/CD pipeline setup, Docker, Kubernetes, and infrastructure automation that gives your team a reliable, repeatable path from code commit to production.',
	keywords: [
		'DevOps services',
		'CI/CD',
		'continuous integration',
		'continuous deployment',
		'Docker',
		'Kubernetes',
		'deployment automation',
		'infrastructure automation',
		'pipeline management',
	],
	alternates: {
		canonical: 'https://aibizmod.com/services/hosting-infrastructure/devops',
	},
	openGraph: {
		title: 'DevOps Services | CI/CD Pipelines | aibizmod',
		description:
			'DevOps services for CI/CD pipeline setup and infrastructure automation.',
		url: '/services/hosting-infrastructure/devops',
	},
};

const data: SubservicePageData = {
	name: 'DevOps',
	parentName: 'Hosting & Infrastructure',
	parentSlug: 'hosting-infrastructure',
	slug: 'devops',
	tagline:
		'CI/CD pipeline setup, infrastructure automation, and containerisation services that reduce deployment risk, shorten release cycles, and give development teams a reliable, repeatable path from code to production.',
	heroImage:
		'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Development teams without a proper CI/CD pipeline deploy manually, infrequently, and with high anxiety. Releases are risky, rollbacks are painful, and the time between a feature being ready and it being live is measured in weeks rather than hours. Infrastructure is configured manually on individual servers, creating snowflake environments that cannot be reproduced and are difficult to debug when something goes wrong in production.',
		challengePoints: [
			'Manual deployments that are error-prone and require developer availability for every release',
			'No automated testing in the deployment pipeline, so bugs reach production that could have been caught',
			'Infrastructure configured manually with no version control or reproducibility',
			'Long release cycles because deployment risk discourages frequent shipping',
		],
		solution:
			'We implement CI/CD pipelines that automate build, test, and deployment stages, configure infrastructure-as-code so environments are reproducible, and containerise applications to eliminate environment-specific inconsistencies. The result is a deployment process that is faster, safer, and requires less manual coordination.',
		solutionPoints: [
			'CI/CD pipeline with automated build, test, lint, and deployment stages',
			'Container configuration using Docker and Kubernetes for environment consistency',
			'Infrastructure-as-code for all environment configuration, versioned and peer-reviewed',
			'Rollback mechanisms and deployment controls so releases can be safely reverted',
		],
	},

	capabilities: [
		{
			icon: 'gitBranch',
			title: 'CI/CD Pipeline Implementation',
			description:
				'Build automated pipelines using GitHub Actions, GitLab CI, or CircleCI that run tests, build artefacts, and deploy to staging and production on each merge.',
			image: '/services/hosting-infrastructure/devops-cicd-pipeline-implementation.jpg',
			imageAlt: 'Hosting & Infrastructure CI/CD Pipeline Implementation capability illustration.',
		},
		{
			icon: 'container',
			title: 'Containerisation',
			description:
				'Dockerise your application and its dependencies so it runs consistently across development, staging, and production environments, eliminating environment drift.',
			image: '/services/hosting-infrastructure/devops-containerisation.jpg',
			imageAlt: 'Hosting & Infrastructure Containerisation capability illustration.',
		},
		{
			icon: 'server',
			title: 'Kubernetes Orchestration',
			description:
				'Configure Kubernetes clusters for container orchestration, including deployments, services, health checks, autoscaling, and rolling update strategies.',
			image: '/services/hosting-infrastructure/devops-kubernetes-orchestration.jpg',
			imageAlt: 'Hosting & Infrastructure Kubernetes Orchestration capability illustration.',
		},
		{
			icon: 'code2',
			title: 'Infrastructure as Code',
			description:
				'Implement Terraform, Pulumi, or AWS CDK to define all infrastructure in version-controlled code, making environments reproducible and changes auditable.',
			image: '/services/hosting-infrastructure/devops-infrastructure-as-code.jpg',
			imageAlt: 'Hosting & Infrastructure Infrastructure as Code capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Secrets and Configuration Management',
			description:
				'Configure secure secrets management using AWS Secrets Manager, HashiCorp Vault, or GitHub Secrets so sensitive configuration is never stored in code repositories.',
			image: '/services/hosting-infrastructure/devops-secrets-and-configuration-management.jpg',
			imageAlt: 'Hosting & Infrastructure Secrets and Configuration Management capability illustration.',
		},
		{
			icon: 'activity',
			title: 'Deployment Strategy Design',
			description:
				'Implement blue-green, canary, or rolling deployment strategies that allow updates to be released gradually with automatic rollback if health checks fail.',
			image: '/services/hosting-infrastructure/devops-deployment-strategy-design.jpg',
			imageAlt: 'Hosting & Infrastructure Deployment Strategy Design capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'SaaS',
			title: 'CI/CD Pipeline for a Development Team',
			description:
				'A SaaS startup was deploying manually via SSH. We built a GitHub Actions pipeline that runs tests, builds a Docker image, pushes to ECR, and deploys to ECS on every merge to main.',
		},
		{
			industry: 'E-commerce',
			title: 'Kubernetes Migration for an Online Platform',
			description:
				'An e-commerce platform was running on manually managed EC2 instances. We containerised the application and migrated to EKS, with horizontal pod autoscaling for traffic spikes.',
		},
		{
			industry: 'Finance',
			title: 'Infrastructure as Code for a Regulated Environment',
			description:
				'A financial services company needed all infrastructure changes to be reviewed and documented. Terraform with a pull request workflow gave them version-controlled infrastructure changes with full audit history.',
		},
		{
			industry: 'Healthcare',
			title: 'Secrets Management Implementation',
			description:
				'A healthcare application was storing database credentials in environment files on servers. We migrated all secrets to AWS Secrets Manager with rotation policies and removed them from the codebase.',
		},
		{
			industry: 'Media',
			title: 'Blue-Green Deployment Setup',
			description:
				'A media platform needed zero-downtime deployments for their high-traffic site. We implemented a blue-green deployment strategy on AWS with load balancer switching and automated rollback on health check failure.',
		},
		{
			industry: 'Logistics',
			title: 'Multi-Environment Pipeline Setup',
			description:
				'A logistics software company needed consistent environments for development, staging, and production. Docker Compose for local development and Kubernetes for staging and production gave the team identical runtime behaviour across all environments.',
		},
	],

	technologies: [
		'GitHub Actions',
		'GitLab CI',
		'CircleCI',
		'Docker',
		'Kubernetes',
		'Terraform',
		'AWS ECS',
		'AWS EKS',
		'Helm',
		'ArgoCD',
		'Datadog',
		'PagerDuty',
	],

	benefits: [
		{
			title: 'Deployments Go from Hours to Minutes',
			description:
				'Automated CI/CD pipelines remove the manual coordination overhead from releases, allowing teams to deploy frequently and confidently.',
		},
		{
			title: 'Bugs Caught Before Production',
			description:
				'Automated tests running on every commit catch regressions before code reaches production, reducing the frequency and cost of production incidents.',
		},
		{
			title: 'Environment Consistency',
			description:
				'Containerisation and infrastructure-as-code eliminate the category of bugs caused by differences between developer laptops, staging, and production environments.',
		},
		{
			title: 'Auditable Infrastructure Changes',
			description:
				'Version-controlled infrastructure means every environment change goes through a pull request review and leaves a complete history of who changed what and when.',
		},
		{
			title: 'Safe Rollbacks',
			description:
				'Proper deployment strategies with health checks and automated rollback mean a bad deployment can be reversed in minutes rather than requiring emergency hotfixes under pressure.',
		},
		{
			title: 'Reduced Deployment Risk',
			description:
				'Frequent, small, automated deployments are significantly lower risk than infrequent, large, manual ones. The longer code sits undeployed, the larger and riskier each release becomes.',
		},
	],

	faqs: [
		{
			q: 'Which CI/CD platform do you recommend?',
			a: 'GitHub Actions is the most common choice for teams already using GitHub, and the free tier covers most small to mid-size team needs. GitLab CI is the natural choice for GitLab users and offers a comprehensive feature set. CircleCI offers more fine-grained control over pipeline resources. The choice is usually determined by your existing version control platform rather than being a standalone decision.',
		},
		{
			q: 'Do we need Kubernetes or is Docker Compose sufficient?',
			a: 'For most applications with fewer than a handful of services, Docker Compose on a managed hosting platform or a single server is sufficient and significantly simpler to operate. Kubernetes is justified when you need horizontal autoscaling, multi-service orchestration, rolling deployments, or are running at a scale where the operational benefits outweigh the complexity. We recommend the simplest approach that meets your actual requirements.',
		},
		{
			q: 'How disruptive is it to introduce CI/CD to an existing project?',
			a: 'Less disruptive than most teams expect. We introduce CI/CD incrementally, starting with the build and basic test steps before adding deployment stages. The pipeline can run alongside existing deployment processes until the team is confident in it. The main dependency is having a reasonable test suite — we often recommend adding basic automated tests as part of the same engagement.',
		},
		{
			q: 'Can you set up DevOps for a team that has no existing infrastructure-as-code?',
			a: 'Yes. Many of our DevOps engagements start from scratch with teams running on manually provisioned servers. We document the existing infrastructure, implement infrastructure-as-code for all components, and migrate environments into the new setup incrementally to avoid disruption.',
		},
	],
	answerSummary:
		'UK and India development teams deploying manually with high risk and infrequent releases get CI/CD pipelines, containerisation, infrastructure-as-code, and deployment strategies that automate build-test-deploy cycles and make releases faster, safer, and reproducible.',
};

export default function DevOpsPage() {
	return <SubservicePageLayout data={data} />;
}
