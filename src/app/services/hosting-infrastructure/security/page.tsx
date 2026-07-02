import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Infrastructure Security & Disaster Recovery | aibizmod',
	description:
		'SSL configuration, backup solutions, disaster recovery planning, and infrastructure security audits that protect your systems and ensure business continuity.',
	keywords: [
		'infrastructure security',
		'cloud security',
		'network security',
		'data security',
		'security hardening',
		'security compliance',
		'encryption services',
		'access control',
		'security assessment',
	],
	alternates: {
		canonical: 'https://aibizmod.com/services/hosting-infrastructure/security',
	},
	openGraph: {
		title: 'Cloud Security | Infrastructure Security | aibizmod',
		description:
			'Cloud and infrastructure security services including data protection and security hardening.',
		url: '/services/hosting-infrastructure/security',
	},
};

const data: SubservicePageData = {
	name: 'Security',
	parentName: 'Hosting & Infrastructure',
	parentSlug: 'hosting-infrastructure',
	slug: 'security',
	tagline:
		'SSL setup, backup solutions, disaster recovery planning, and infrastructure security audits that protect your systems against common attack vectors and ensure your business can recover from unexpected incidents.',
	heroImage:
		'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Security often gets set up once and then forgotten about rather than an ongoing discipline. Default configurations are left in place, security headers are left empty, and backups are never actually tested, and disaster recovery plans only exist on paper and are never dry-run. Most teams only notice these gaps after a breach or ransomware attack, or catastrophic data loss event forces them into a recovery scenario they were not prepared for.',
		challengePoints: [
			'Open default server settings, default logins, and unnecessary services running',
			'Auto-backups running without regular restore tests',
			'No written playbook, leaving the team to guess what to do in a crisis under pressure',
			'Outdated packages and missing security headers exposing server files exposure',
		],
		solution:
			'We conduct infrastructure security audits to identify current vulnerabilities, implement the fixes required to close them, and set up the backup and disaster recovery infrastructure that gives your business a realistic path to recovery from a serious incident.',
		solutionPoints: [
			'Audits checking server hardening and packages, dependency vulnerabilities, and access controls',
			'Encrypted offsite auto-backups with tested restore procedures procedures',
			'Disaster recovery plans with clear step-by-step restoration and tested failover procedures',
			'SSL settings and security headers with uptime monitoring',
		],
	},

	capabilities: [
		{
			icon: 'shield',
			title: 'Infrastructure Security Audit',
			description:
				'Systematic review of server configuration, network exposure, access controls, software versions, and security header configuration with a prioritised remediation report.',
			image: '/services/hosting-infrastructure/security-infrastructure-security-audit.jpg',
			imageAlt: 'Hosting & Infrastructure Infrastructure Security Audit capability illustration.',
		},
		{
			icon: 'wrench',
			title: 'Server Hardening',
			description:
				'Apply security hardening baseline covering firewall rules, SSH key-only access, disabling unnecessary services, OS patch status, and user privilege review.',
			image: '/services/hosting-infrastructure/security-server-hardening.jpg',
			imageAlt: 'Hosting & Infrastructure Server Hardening capability illustration.',
		},
		{
			icon: 'refreshCw',
			title: 'Backup Solutions',
			description:
				'Configure automated backup schedules for databases and file systems with encrypted offsite storage and documented recovery procedures that are tested against real restore scenarios.',
			image: '/services/hosting-infrastructure/security-backup-solutions.jpg',
			imageAlt: 'Hosting & Infrastructure Backup Solutions capability illustration.',
		},
		{
			icon: 'activity',
			title: 'Disaster Recovery Planning',
			description:
				'Define recovery time objectives, document recovery procedures, configure failover infrastructure, and run tabletop or live exercises to validate the plan works in practice.',
			image: '/services/hosting-infrastructure/security-disaster-recovery-planning.jpg',
			imageAlt: 'Hosting & Infrastructure Disaster Recovery Planning capability illustration.',
		},
		{
			icon: 'globe',
			title: 'SSL and Security Headers',
			description:
				'Implement SSL certificates, HSTS, Content Security Policy, X-Frame-Options, and other security headers, with ongoing monitoring for certificate expiry and configuration regression.',
			image: '/services/hosting-infrastructure/security-ssl-and-security-headers.jpg',
			imageAlt: 'Hosting & Infrastructure SSL and Security Headers capability illustration.',
		},
		{
			icon: 'eye',
			title: 'Vulnerability Scanning',
			description:
				'Run automated vulnerability scans against your infrastructure and application surface, with triaged findings and a remediation plan prioritised by risk severity.',
			image: '/services/hosting-infrastructure/security-vulnerability-scanning.jpg',
			imageAlt: 'Hosting & Infrastructure Vulnerability Scanning capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Finance',
			title: 'Pre-Audit Security Remediation',
			description:
				'A financial services firm needed to pass a third-party security audit. Our pre-audit assessment identified 14 findings across server hardening, dependency vulnerabilities, and access controls, all resolved before the formal audit.',
		},
		{
			industry: 'Healthcare',
			title: 'Backup and DR Setup for a Patient Data System',
			description:
				'A private healthcare provider had no tested backup system for their patient records database. We implemented daily encrypted backups to an offsite location and conducted a full restore test to validate recovery within their required time objective.',
		},
		{
			industry: 'E-commerce',
			title: 'Security Header Implementation',
			description:
				"An online retailer's website was missing critical security headers identified in a browser security report. We implemented the full recommended header set via their CDN without requiring application changes.",
		},
		{
			industry: 'Professional Services',
			title: 'Server Hardening After Hosting Migration',
			description:
				'A consultancy that had migrated to a new VPS had the server in its default configuration six months after setup. We applied a hardening baseline, installed fail2ban, and configured the firewall to restrict unnecessary exposure.',
		},
		{
			industry: 'SaaS',
			title: 'Disaster Recovery Plan for a Critical Application',
			description:
				'A SaaS company needed a documented DR plan for investor due diligence. We designed a cross-region AWS failover architecture, documented the recovery procedures, and ran a tabletop exercise with their technical team.',
		},
		{
			industry: 'Non-profit',
			title: 'Ransomware Recovery Planning',
			description:
				'A non-profit organisation wanted to ensure they could recover from a ransomware attack without paying a ransom. We implemented offline backups with air-gap separation and a documented recovery playbook.',
		},
	],

	technologies: [
		'Cloudflare',
		"Let's Encrypt",
		'AWS Backup',
		'Duplicati',
		'Fail2ban',
		'UFW',
		'OpenSSL',
		'Nessus',
		'OWASP ZAP',
		'CrowdSec',
		'HashiCorp Vault',
	],

	benefits: [
		{
			title: 'Known Vulnerabilities Closed',
			description:
				'A systematic security audit identifies the specific gaps in your infrastructure configuration so they can be addressed before they are exploited.',
		},
		{
			title: 'Backups That Can Actually Be Restored',
			description:
				'Tested backup and restore procedures mean data loss from a serious incident is recoverable within a defined timeframe rather than being an untested assumption.',
		},
		{
			title: 'Documented Recovery Path',
			description:
				'A tested disaster recovery plan means your team knows exactly what to do in a serious incident rather than improvising under pressure, reducing recovery time and business impact.',
		},
		{
			title: 'Reduced Attack Surface',
			description:
				'Server hardening closes the common entry points that automated scanners and opportunistic attackers exploit — default credentials, open ports, and outdated software versions.',
		},
		{
			title: 'Browser Security Compliance',
			description:
				'Properly configured security headers prevent common attack vectors including clickjacking, cross-site scripting, and insecure resource loading — and improve browser security assessments.',
		},
		{
			title: 'Investor and Compliance Readiness',
			description:
				'Documented security controls, DR plans, and audit logs are increasingly required in due diligence processes and compliance assessments. Having them in place in advance avoids last-minute remediation.',
		},
	],

	faqs: [
		{
			q: 'What does a security audit cover and how long does it take?',
			a: 'A standard infrastructure security audit covers server configuration hardening status, open port and service exposure, SSL and TLS configuration, security header implementation, software dependency versions and known CVEs, access control review, and backup configuration. It typically takes three to five days to complete and produces a prioritised findings report. We triage findings by severity so you know which to address first.',
		},
		{
			q: 'What is the difference between a backup and a disaster recovery plan?',
			a: 'A backup is a copy of your data stored somewhere separate from your production system. Disaster recovery planning covers the full set of procedures needed to restore operations after a serious incident — it uses backups as one input but also covers which systems need to be restored in what order, what the acceptable recovery time is, and who does what in a recovery scenario. A DR plan without tested backups is not meaningful, and tested backups without a DR plan leave your recovery process undefined.',
		},
		{
			q: 'How often should security audits be repeated?',
			a: 'For most businesses, an annual security audit is a minimum. Audits should also be triggered by significant infrastructure changes — migrating to new hosting, deploying new applications, or adding new team members with system access. Continuous vulnerability scanning is a complement to periodic audits, not a replacement.',
		},
		{
			q: 'Do you provide penetration testing as part of security services?',
			a: 'Our security audit service covers infrastructure configuration review and vulnerability scanning, which addresses the most common gaps. Full penetration testing requires a different engagement with a specialist pen testing team and explicit written authorisation. We can recommend suitable providers for this if it is required for compliance purposes.',
		},
	],
	answerSummary:
		'UK and India organisations with security set up once then forgotten get infrastructure audits, server hardening, tested backup and disaster recovery solutions, and vulnerability scanning that close configuration gaps before they are exploited by attackers.',
};

export default function SecurityPage() {
	return <SubservicePageLayout data={data} />;
}
