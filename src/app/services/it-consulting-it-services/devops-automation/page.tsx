import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'DevOps Consulting & CI/CD Automation | aibizmod',
	description:
		'CI/CD pipeline setup, infrastructure automation, and containerisation consulting that reduces release risk, shortens cycles, and modernises how software ships.',
	keywords: [
		'DevOps',
		'CI/CD pipeline',
		'continuous integration',
		'continuous deployment',
		'infrastructure automation',
		'DevOps consulting',
		'DevOps services',
		'automation services',
		'deployment automation',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/it-consulting-it-services/devops-automation',
	},
	openGraph: {
		title: 'DevOps & Automation | CI/CD Pipelines | aibizmod',
		description:
			'CI/CD and infrastructure automation consulting that modernise how software is built, tested, and deployed.',
		url: '/services/it-consulting-it-services/devops-automation',
	},
};

const data: SubservicePageData = {
	name: 'DevOps & Automation',
	parentName: 'IT Consulting & IT Services',
	parentSlug: 'it-consulting-it-services',
	slug: 'devops-automation',
	tagline:
		'CI/CD, infrastructure automation, and containerisation consulting services that modernise how software is built, tested, and deployed — reducing release risk, deployment anxiety, and the manual coordination cost between development and operations.',
	heroImage:
		'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Development and operations teams working without common processes spend more time coordinating deployments than building features. Developers wait for operations to provision environments. Operations wait for developers to document their setup. Releases are infrequent, high-stakes events rather than routine processes. And when something goes wrong, there is no shared tooling or language to diagnose and resolve it efficiently.',
		challengePoints: [
			'Manual deployment processes that are slow, error-prone, and require specialist coordination',
			'Development and staging environments that differ from production, causing environment-specific bugs',
			'No automated testing in the release pipeline, so quality control depends entirely on human review',
			'Operations team managing infrastructure manually without version control or reproducibility',
		],
		solution:
			'We design and implement the processes, tooling, and infrastructure that enable development and operations teams to work from a shared foundation — automated pipelines, containerised environments, infrastructure-as-code, and monitoring that gives both teams visibility into the same production reality.',
		solutionPoints: [
			"CI/CD pipeline design and implementation suited to your team's workflow and deployment targets",
			'Container and orchestration strategy matched to your application architecture and scale',
			'Infrastructure-as-code implementation covering all environment configuration',
			'DevOps practice adoption including on-call processes, post-mortem culture, and SLO definition',
		],
	},

	capabilities: [
		{
			icon: 'gitBranch',
			title: 'CI/CD Pipeline Design',
			description:
				'Design and implement automated build, test, and deployment pipelines using GitHub Actions, GitLab CI, or other CI tools appropriate to your stack.',
			image: '/services/it-consulting-it-services/devops-automation-cicd-pipeline-design.jpg',
			imageAlt: 'IT Consulting & IT Services CI/CD Pipeline Design capability illustration.',
		},
		{
			icon: 'container',
			title: 'Containerisation Strategy',
			description:
				'Define the containerisation approach for your application, including Docker configuration, registry management, and deployment targets from simple VPS to Kubernetes.',
			image: '/services/it-consulting-it-services/devops-automation-containerisation-strategy.jpg',
			imageAlt: 'IT Consulting & IT Services Containerisation Strategy capability illustration.',
		},
		{
			icon: 'code2',
			title: 'Infrastructure Automation',
			description:
				'Implement Terraform or equivalent infrastructure-as-code for all environment configuration, enabling reproducible provisioning and peer-reviewed infrastructure changes.',
			image: '/services/it-consulting-it-services/devops-automation-infrastructure-automation.jpg',
			imageAlt: 'IT Consulting & IT Services Infrastructure Automation capability illustration.',
		},
		{
			icon: 'server',
			title: 'Kubernetes Implementation',
			description:
				'Design and implement Kubernetes clusters with deployment manifests, autoscaling configuration, health checks, and operational runbooks for the team managing them.',
			image: '/services/it-consulting-it-services/devops-automation-kubernetes-implementation.jpg',
			imageAlt: 'IT Consulting & IT Services Kubernetes Implementation capability illustration.',
		},
		{
			icon: 'activity',
			title: 'Observability Implementation',
			description:
				'Implement logging, metrics, tracing, and alerting infrastructure so development and operations teams have shared visibility into production system behaviour.',
			image: '/services/it-consulting-it-services/devops-automation-observability-implementation.jpg',
			imageAlt: 'IT Consulting & IT Services Observability Implementation capability illustration.',
		},
		{
			icon: 'users',
			title: 'DevOps Practice Consulting',
			description:
				'Guide adoption of DevOps practices including on-call process design, incident management, post-mortem frameworks, and SLO definition for key services.',
			image: '/services/it-consulting-it-services/devops-automation-devops-practice-consulting.jpg',
			imageAlt: 'IT Consulting & IT Services DevOps Practice Consulting capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'SaaS',
			title: 'CI/CD Implementation for a Development Team',
			description:
				'A 15-person SaaS development team was deploying manually twice a month. We implemented a GitHub Actions pipeline with automated tests and deployments, moving to multiple deployments per day within six weeks.',
		},
		{
			industry: 'Finance',
			title: 'Infrastructure as Code Migration',
			description:
				'A financial services technology team was managing cloud infrastructure manually across three environments. We migrated all infrastructure to Terraform with a pull request review workflow, enabling consistent environment management.',
		},
		{
			industry: 'Healthcare',
			title: 'Container Strategy for a Healthcare Application',
			description:
				'A healthcare software company was deploying inconsistently across environments due to missing dependencies. We containerised the application stack and documented the deployment process, eliminating environment-specific failures.',
		},
		{
			industry: 'E-commerce',
			title: 'Kubernetes Migration for a Growing Platform',
			description:
				'An e-commerce platform needed to scale its infrastructure more dynamically. We migrated from manually managed EC2 instances to EKS with horizontal pod autoscaling configured for their traffic pattern.',
		},
		{
			industry: 'Media',
			title: 'Observability Platform for a Content Service',
			description:
				"A media company's engineering team had no visibility into production beyond uptime checks. We implemented Datadog with infrastructure metrics, application traces, log aggregation, and alerting.",
		},
		{
			industry: 'Professional Services',
			title: 'DevOps Practice Advisory',
			description:
				'A software consultancy wanted to formalise their on-call and incident response process. We designed their on-call rota, incident severity framework, and post-mortem process, and trained the engineering team.',
		},
	],

	technologies: [
		'GitHub Actions',
		'GitLab CI',
		'Docker',
		'Kubernetes',
		'Terraform',
		'Helm',
		'ArgoCD',
		'Datadog',
		'Prometheus',
		'Grafana',
		'AWS EKS',
		'PagerDuty',
	],

	benefits: [
		{
			title: 'Faster, Safer Releases',
			description:
				'Automated pipelines that build and test code before deployment reduce the risk of each release, enabling teams to deploy more frequently with less anxiety.',
		},
		{
			title: 'Environment Consistency',
			description:
				'Containerised applications and infrastructure-as-code eliminate the environment drift that causes bugs to appear in staging or production that did not occur in development.',
		},
		{
			title: 'Operations Work Reduced by Automation',
			description:
				'Automating repetitive operational tasks — provisioning, patching, scaling — frees engineers from manual work and reduces the human error surface.',
		},
		{
			title: 'Shared Visibility Across Dev and Ops',
			description:
				'Common observability tooling gives development and operations teams the same view of production, improving collaboration during incidents and making performance regressions detectable immediately after deployment.',
		},
		{
			title: 'Auditable Infrastructure Changes',
			description:
				'Version-controlled infrastructure-as-code means every environment change is reviewed, approved, and logged — providing an audit trail and the ability to revert any change.',
		},
		{
			title: 'Incident Response That Improves Over Time',
			description:
				"A structured post-mortem process converts each incident into documented learning, improving the team's ability to prevent and respond to future incidents.",
		},
	],

	faqs: [
		{
			q: 'How is DevOps & Automation different from the DevOps service under Hosting & Infrastructure?',
			a: "The Hosting & Infrastructure DevOps service focuses primarily on the implementation of specific infrastructure tools — CI/CD pipelines, containers, Kubernetes. The IT Consulting DevOps & Automation service covers the consulting layer alongside implementation — advising on which tools to adopt, how to structure the team's processes, how to define SLOs, and how to build the on-call and incident response culture that makes DevOps practices sustainable.",
		},
		{
			q: 'How long does it take to implement a CI/CD pipeline from scratch?',
			a: 'A basic CI/CD pipeline with build, test, and deployment stages for a single service typically takes one to two weeks to implement. Adding multiple deployment environments, approval gates, and additional services takes longer. The most common delay is the automated test suite — if you have minimal test coverage, we often recommend building foundational tests as part of the same engagement.',
		},
		{
			q: 'Do we need Kubernetes?',
			a: 'Most teams do not need Kubernetes, especially in early stages. The operational complexity of running Kubernetes is significant — it requires expertise to configure and maintain, and the benefits are most relevant when you are managing multiple services that need independent scaling and deployment. We help teams make this assessment honestly, often recommending simpler container deployment options like ECS, Render, or Docker Compose on a managed host.',
		},
		{
			q: 'What does a DevOps practice assessment involve?',
			a: 'We assess your current deployment process, on-call setup, incident response procedures, and observability against a DevOps maturity framework. We produce a findings report identifying the highest-impact improvements and a recommended implementation sequence, prioritised by the problems causing the most friction for your team today.',
		},
	],
};

export default function DevOpsAutomationPage() {
	return <SubservicePageLayout data={data} />;
}
