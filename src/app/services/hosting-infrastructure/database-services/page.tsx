import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Database Services & Management | SQL, NoSQL | aibizmod',
	description:
		'Professional database design, deployment, and management services. SQL databases, NoSQL solutions, and data optimization.',
	keywords: [
		'database services',
		'database management',
		'database design',
		'PostgreSQL',
		'MySQL services',
		'MongoDB',
		'database optimization',
		'data migration',
		'database administration',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/hosting-infrastructure/database-services',
	},
	openGraph: {
		title: 'Database Services | SQL & NoSQL | aibizmod',
		description:
			'Professional database design, deployment, and management for SQL and NoSQL databases.',
		url: '/services/hosting-infrastructure/database-services',
	},
};

const data: SubservicePageData = {
	name: 'Database Services',
	parentName: 'Hosting & Infrastructure',
	parentSlug: 'hosting-infrastructure',
	slug: 'database-services',
	tagline:
		'Database hosting, optimisation, and administration services that keep your data fast, reliable, and correctly maintained — from initial setup and migration to ongoing query performance management.',
	heroImage:
		'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Databases are the bottleneck in most application performance problems. Slow queries, missing indexes, and poorly configured connection pooling degrade application response times at scale. Database backups are configured once and then not validated. Schema migrations are run in production without testing, causing downtime. These are all preventable problems with the right setup and ongoing administration.',
		challengePoints: [
			'Application performance degrading as data volume grows due to missing indexes and inefficient queries',
			'Database backups configured but never tested, providing false confidence in recovery capability',
			'No connection pooling, causing connection exhaustion under load',
			'Schema migrations run directly in production without staging validation',
		],
		solution:
			'We assess your current database setup, identify performance bottlenecks and configuration gaps, and implement the changes needed to make your database layer reliable and performant. We also configure monitoring, backup validation, and the migration processes that keep schema changes safe.',
		solutionPoints: [
			'Query analysis and indexing strategy to address the most significant performance bottlenecks',
			"Connection pooling configuration appropriate to your application's concurrency pattern",
			'Backup validation with documented restore procedures tested against a real recovery',
			'Staging environment and migration process to test schema changes before they reach production',
		],
	},

	capabilities: [
		{
			icon: 'database',
			title: 'Database Hosting Setup',
			description:
				'Configure managed database instances on AWS RDS, Google Cloud SQL, or DigitalOcean Managed Databases, or self-hosted PostgreSQL and MySQL on your own infrastructure.',
			image: '/services/hosting-infrastructure/database-services-database-hosting-setup.jpg',
			imageAlt: 'Hosting & Infrastructure Database Hosting Setup capability illustration.',
		},
		{
			icon: 'zap',
			title: 'Query Performance Optimisation',
			description:
				'Analyse slow query logs, identify missing or inefficient indexes, and rewrite problematic queries to reduce query execution time and database load.',
			image: '/services/hosting-infrastructure/database-services-query-performance-optimisation.jpg',
			imageAlt: 'Hosting & Infrastructure Query Performance Optimisation capability illustration.',
		},
		{
			icon: 'settings',
			title: 'Database Administration',
			description:
				'Ongoing database administration covering backup management, user and permission management, version upgrades, and routine maintenance tasks.',
			image: '/services/hosting-infrastructure/database-services-database-administration.jpg',
			imageAlt: 'Hosting & Infrastructure Database Administration capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Database Security Configuration',
			description:
				'Configure database access controls, network exposure restrictions, encryption at rest and in transit, and audit logging for sensitive data stores.',
			image: '/services/hosting-infrastructure/database-services-database-security-configuration.jpg',
			imageAlt: 'Hosting & Infrastructure Database Security Configuration capability illustration.',
		},
		{
			icon: 'refreshCw',
			title: 'Database Migration',
			description:
				'Migrate databases between platforms or versions with minimal downtime, including data validation, cutover planning, and rollback procedures.',
			image: '/services/hosting-infrastructure/database-services-database-migration.jpg',
			imageAlt: 'Hosting & Infrastructure Database Migration capability illustration.',
		},
		{
			icon: 'layers',
			title: 'Replication and High Availability',
			description:
				'Configure read replicas, failover instances, or multi-region replication for applications that need higher availability or read scalability beyond a single database instance.',
			image: '/services/hosting-infrastructure/database-services-replication-and-high-availability.jpg',
			imageAlt: 'Hosting & Infrastructure Replication and High Availability capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'SaaS',
			title: 'Query Optimisation for a Slow Application',
			description:
				"A SaaS application's response times degraded as the customer database grew. Slow query log analysis identified five queries lacking appropriate indexes, adding them reduced average API response time from 800ms to 120ms.",
		},
		{
			industry: 'E-commerce',
			title: 'Database Migration from MySQL to PostgreSQL',
			description:
				'An e-commerce platform migrated from MySQL to PostgreSQL to support new feature requirements, with full data validation and a same-day cutover executed during a low-traffic window.',
		},
		{
			industry: 'Finance',
			title: 'High Availability Database Setup',
			description:
				'A financial services application required database failover capability within 30 seconds. We configured AWS RDS Multi-AZ with automated failover and documented the failover test procedure.',
		},
		{
			industry: 'Healthcare',
			title: 'Database Security Audit',
			description:
				'A healthcare organisation needed to verify their patient database met security requirements. We audited user permissions, network exposure, encryption configuration, and backup procedures against their compliance requirements.',
		},
		{
			industry: 'Logistics',
			title: 'Connection Pooling Configuration',
			description:
				'A logistics application was hitting PostgreSQL connection limits under peak load. PgBouncer connection pooling was added between the application and database, resolving connection exhaustion without hardware changes.',
		},
		{
			industry: 'Media',
			title: 'Read Replica for a Content Platform',
			description:
				"A content platform's reporting queries were competing with application traffic on the primary database. We configured a read replica, directing all analytics queries to it and reducing primary database load by 40 percent.",
		},
	],

	technologies: [
		'PostgreSQL',
		'MySQL',
		'AWS RDS',
		'Google Cloud SQL',
		'DigitalOcean Managed Databases',
		'PgBouncer',
		'Redis',
		'MongoDB',
		'Elasticsearch',
		'pganalyze',
	],

	benefits: [
		{
			title: 'Faster Application Response Times',
			description:
				'Query optimisation and correct indexing strategy address the database layer as the most common source of application performance problems at scale.',
		},
		{
			title: 'Validated Recovery Capability',
			description:
				'Tested backup and restore procedures confirm that your data can actually be recovered within a defined timeframe rather than leaving recovery as an untested assumption.',
		},
		{
			title: 'Stable Under Load',
			description:
				"Connection pooling and resource configuration that is tuned for your application's concurrency pattern prevents the connection exhaustion and lock contention that causes instability under high traffic.",
		},
		{
			title: 'Safe Schema Changes',
			description:
				'A staging environment and migration process that tests schema changes before production removes the risk of a migration causing downtime or data integrity issues.',
		},
		{
			title: 'Reduced Operational Risk',
			description:
				'Proper access controls, encrypted connections, and network restriction reduce the risk of unauthorised data access or exposure from a misconfigured database endpoint.',
		},
		{
			title: 'High Availability for Critical Applications',
			description:
				'Replication and automatic failover configuration provides continuity for applications where database downtime has immediate business impact.',
		},
	],

	faqs: [
		{
			q: 'Should we use a managed database service or self-host our database?',
			a: 'Managed services like AWS RDS, Google Cloud SQL, or DigitalOcean Managed Databases handle backups, patching, minor version upgrades, and multi-AZ failover automatically. For most businesses this is the right choice because the operational overhead of managing these aspects yourself outweighs the cost premium. Self-hosted databases are appropriate when you need specific configurations that managed services do not support, or when data sovereignty requirements prohibit using a managed cloud provider.',
		},
		{
			q: 'How do you identify and fix slow queries?',
			a: 'We start by enabling slow query logging at your database layer with an appropriate threshold — typically queries taking more than 100ms. We then analyse the log to identify the queries with the highest total execution time (frequency multiplied by duration), review the query execution plans using EXPLAIN or EXPLAIN ANALYZE, and add or modify indexes to reduce full table scans. We measure query times before and after each change to confirm improvement.',
		},
		{
			q: 'What is connection pooling and do we need it?',
			a: 'Connection pooling maintains a pool of open database connections that application instances share, rather than each application instance opening its own connection. This becomes necessary when you have many concurrent users because databases have limits on simultaneous connections. If your application uses a framework that opens a connection per request and you are seeing connection errors under load, connection pooling is likely the fix.',
		},
		{
			q: 'How do you handle database migrations without downtime?',
			a: 'For most schema changes — adding a column, adding an index — zero-downtime migrations are possible with the right approach. Adding a nullable column and backfilling it is safe while the application is running. Dropping a column requires a deployment that stops reading it first. Renaming a column requires an expand-contract migration across two deployments. We assess each migration individually and design the approach before executing it.',
		},
	],
};

export default function DatabaseServicesPage() {
	return <SubservicePageLayout data={data} />;
}
