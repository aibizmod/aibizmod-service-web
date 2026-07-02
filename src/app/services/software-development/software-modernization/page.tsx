import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Legacy Software Modernisation & System Migration | aibizmod',
	description:
		'Legacy system migration, code re-engineering, and system upgrades that replace ageing software without disrupting the operations that depend on it.',
	keywords: [
		'software modernization',
		'legacy system modernization',
		'code migration',
		'legacy code update',
		'system upgrade',
		'cloud migration',
		'technical debt reduction',
		'codebase refactoring',
		'system transformation',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/software-development/software-modernization',
	},
	openGraph: {
		title: 'Software Modernization | Legacy System Upgrades | aibizmod',
		description:
			'Modernize legacy systems and update outdated codebases with contemporary architecture and cloud migration.',
		url: '/services/software-development/software-modernization',
	},
};

const data: SubservicePageData = {
	name: 'Software Modernisation',
	parentName: 'Software Development',
	parentSlug: 'software-development',
	slug: 'software-modernization',
	tagline:
		'Legacy system migration, re-engineering, and system upgrades that replace ageing software without disrupting the operations that depend on it — delivered incrementally to manage risk and give the business early visibility of the new system.',
	heroImage:
		'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Legacy systems accumulate technical debt until they become a significant operational constraint. They cannot be extended without risk. The developers who understand them have left. They run on unsupported infrastructure. Integration with modern tools is difficult or impossible. The business knows the system needs replacing but fears the disruption of migration — often because a previous attempt failed or because the system holds years of data the new system needs to accommodate.',
		challengePoints: [
			'Legacy system on unsupported infrastructure or technology with no available expertise to extend',
			'System too fragile to change without risk of breaking adjacent functionality',
			'Previous modernisation attempt failed due to scope underestimation or big-bang approach',
			'Critical data locked in the legacy system with no clean export path',
		],
		solution:
			'We approach legacy modernisation as a managed transition rather than a replacement project. We assess what the legacy system does, model the target system, migrate data with validated integrity, and run old and new systems in parallel through a transition period — cutting over only when the new system is fully validated.',
		solutionPoints: [
			'Legacy system audit documenting actual functionality before any replacement design begins',
			'Target architecture design that preserves what the legacy system does correctly while addressing its constraints',
			'Incremental migration approach with parallel running and validated data migration',
			'Cut-over plan with defined rollback conditions and validated before the migration date',
		],
	},

	capabilities: [
		{
			icon: 'refreshCw',
			title: 'Legacy Migration',
			description:
				'Migrate applications from legacy technology stacks to modern architecture, preserving business logic while eliminating the constraints of outdated infrastructure.',
			image: '/services/software-development/software-modernization-legacy-migration.jpg',
			imageAlt: 'Software Development Legacy Migration capability illustration.',
		},
		{
			icon: 'code2',
			title: 'Application Re-Engineering',
			description:
				'Rebuild legacy applications from the ground up in modern technology with improved architecture, maintainability, and integration capability — while preserving validated business logic.',
			image: '/services/software-development/software-modernization-application-reengineering.jpg',
			imageAlt: 'Software Development Application Re-engineering capability illustration.',
		},
		{
			icon: 'layers',
			title: 'System Upgrades',
			description:
				'Upgrade major version dependencies, frameworks, and infrastructure components with testing and staged rollout to manage risk across the upgrade.',
			image: '/services/software-development/software-modernization-system-upgrades.jpg',
			imageAlt: 'Software Development System Upgrades capability illustration.',
		},
		{
			icon: 'database',
			title: 'Data Migration',
			description:
				'Extract, transform, and load legacy data into a new system with full validation, reconciliation, and documented data quality checks before cut-over.',
			image: '/services/software-development/software-modernization-data-migration.jpg',
			imageAlt: 'Software Development Data Migration capability illustration.',
		},
		{
			icon: 'workflow',
			title: 'Integration Modernisation',
			description:
				'Replace point-to-point integrations between legacy systems with a modern integration layer that is maintainable, monitored, and does not require specific system knowledge to operate.',
			image: '/services/software-development/software-modernization-integration-modernisation.jpg',
			imageAlt: 'Software Development Integration Modernisation capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Technical Debt Assessment',
			description:
				'Audit a legacy codebase to document the extent and nature of technical debt, identify the highest-risk components, and produce a prioritised modernisation plan.',
			image: '/services/software-development/software-modernization-technical-debt-assessment.jpg',
			imageAlt: 'Software Development Technical Debt Assessment capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Finance',
			title: 'Core System Migration for a Financial Services Company',
			description:
				'A financial services company migrated from a 15-year-old ASP.NET application to a modern Next.js and PostgreSQL stack, with parallel running for six months and a phased data migration validated at each stage.',
		},
		{
			industry: 'Healthcare',
			title: 'Legacy Patient Records System Replacement',
			description:
				'A healthcare provider replaced an end-of-life patient records system with a modern application, migrating 8 years of patient records with full clinical data integrity validation.',
		},
		{
			industry: 'Manufacturing',
			title: 'ERP Legacy Migration',
			description:
				'A manufacturer replaced a custom-built legacy ERP system that no vendor supported with a modern web application, re-implementing the specific job costing logic that differentiated them from standard ERP products.',
		},
		{
			industry: 'Education',
			title: 'Student Information System Upgrade',
			description:
				'An education provider upgraded their SIS from a deprecated platform to a modern system, with a full data migration and a three-month parallel running period to validate equivalence before decommissioning the old system.',
		},
		{
			industry: 'Logistics',
			title: 'Monolith to Service Migration',
			description:
				"A logistics company's monolithic application had become too large and fragile to extend. We extracted the highest-change components into separate services over 12 months without disrupting the running application.",
		},
		{
			industry: 'Professional Services',
			title: 'Framework Version Upgrade',
			description:
				"A professional services firm's web application was running a major framework version several years out of support. We executed a version upgrade in stages with automated tests validating each stage before proceeding.",
		},
	],

	technologies: [
		'Next.js',
		'TypeScript',
		'Node.js',
		'Python',
		'PostgreSQL',
		'AWS',
		'Docker',
		'Terraform',
		'GitHub Actions',
		'Playwright',
		'Jest',
	],

	benefits: [
		{
			title: 'Legacy Constraints Removed',
			description:
				'Modernisation removes the ceiling on what the system can do — eliminating the integration limitations, performance constraints, and extension risks that make legacy systems increasingly expensive to operate.',
		},
		{
			title: 'Risk Managed Through Incremental Delivery',
			description:
				'An incremental modernisation approach with parallel running produces a validated new system before the old one is decommissioned, eliminating the all-or-nothing risk of a big-bang replacement.',
		},
		{
			title: 'Business Logic Preserved',
			description:
				'The domain knowledge embedded in a legacy system — years of edge cases, regulatory adaptations, and operational exceptions — is documented and preserved in the new system rather than lost in a replacement.',
		},
		{
			title: 'Data Migrated with Validated Integrity',
			description:
				'Data migration executed with reconciliation checks at each stage confirms that the new system contains what the old system contained, removing the data loss risk from migration.',
		},
		{
			title: 'Modern Technology That Can Be Extended',
			description:
				'A rebuilt system on current technology can be extended, integrated, and maintained by any competent development team — removing the single-person knowledge dependency of many legacy systems.',
		},
		{
			title: 'Clear Decommission Path',
			description:
				'A structured parallel running period with defined validation criteria means the business knows exactly when the old system can be switched off, rather than running both indefinitely.',
		},
	],

	faqs: [
		{
			q: 'How do you avoid a modernisation project becoming a multi-year failure?',
			a: 'Most legacy modernisation failures have a common cause: attempting to replace everything at once with a big-bang cut-over. We decompose modernisation into incremental phases — replacing or rebuilding one component at a time, validating it, and cutting over that component before touching the next. The legacy system continues operating throughout. Each phase has a clear scope, defined validation criteria, and a rollback path.',
		},
		{
			q: 'How do you handle data migration from a legacy system with poor data quality?',
			a: 'Data quality issues in legacy systems are very common — duplicate records, incomplete fields, inconsistent formats, and data that has never been validated. We conduct a data audit before migration design begins to understand the extent and nature of quality issues. We then build the migration pipeline with data cleansing rules, document the choices made in resolving quality issues, and validate the migrated data against the source before cut-over.',
		},
		{
			q: 'Can you modernise a system without documentation?',
			a: "Yes, and most legacy systems have little or no documentation. We start by running the legacy system and mapping what it actually does through code review, database schema analysis, and structured conversations with the people who use it. This produces a functional specification of the legacy system's behaviour that the new system is built to match. It takes longer than having documentation but is achievable.",
		},
		{
			q: 'How long does a typical software modernisation project take?',
			a: "A focused migration of a single application or module takes three to nine months. Comprehensive platform modernisation covering multiple interconnected systems takes one to three years when delivered incrementally. The timeline depends on the scope of the legacy system, the data volume being migrated, the complexity of dependencies between components, and how quickly the business can validate that the new system matches the old one's behaviour.",
		},
	],
	answerSummary:
		'UK and India organisations running legacy systems that cannot be extended, have no available expertise, or run on unsupported infrastructure get incremental migration, data validation, and parallel running that replaces ageing software without disrupting operations.',
};

export default function SoftwareModernizationPage() {
	return <SubservicePageLayout data={data} />;
}
