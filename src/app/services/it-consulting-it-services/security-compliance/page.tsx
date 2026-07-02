import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Cybersecurity Consulting & Compliance Services | aibizmod',
	description:
		'Cybersecurity assessments, penetration testing, and compliance consulting that identify security gaps and help you meet your regulatory obligations.',
	keywords: [
		'IT security',
		'cybersecurity',
		'security assessment',
		'compliance consulting',
		'security consulting',
		'data security',
		'security audit',
		'compliance services',
		'risk management',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/it-consulting-it-services/security-compliance',
	},
	openGraph: {
		title: 'IT Security & Compliance | Security Assessment | aibizmod',
		description:
			'Cybersecurity assessments and compliance support services to identify risks and close security gaps.',
		url: '/services/it-consulting-it-services/security-compliance',
	},
};

const data: SubservicePageData = {
	name: 'Cybersecurity Consulting & Compliance',
	parentName: 'IT Consulting & IT Services',
	parentSlug: 'it-consulting-it-services',
	slug: 'security-compliance',
	tagline:
		'Cybersecurity assessments, security reviews, and compliance support services that identify risks, close gaps, and help organisations meet their regulatory and contractual security obligations.',
	heroImage:
		'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Security and compliance requirements are growing across every industry, but most organisations do not have a clear picture of where they currently stand. Policies exist on paper but have not been tested against actual systems. Compliance assessments are approached reactively when a contract or audit forces the issue. The gap between documented policies and operational practice is the most common source of compliance findings and security incidents.',
		challengePoints: [
			'No current picture of security posture — systems have not been assessed against the threats they face',
			'Compliance obligations understood at a high level but not mapped to specific technical controls',
			'Security policies documented but not verified against how systems actually operate',
			'Approaching an audit or due diligence with gaps that need to be found and closed in advance',
		],
		solution:
			'We conduct structured security assessments against your current environment and the compliance frameworks relevant to your industry, produce a findings report prioritised by risk, and support remediation of the identified gaps. Work is scoped against what you actually need to address for your regulatory context, not a generic list.',
		solutionPoints: [
			'Security assessment covering your specific risk profile and regulatory environment',
			'Compliance gap analysis against relevant frameworks such as ISO 27001, Cyber Essentials, or GDPR',
			'Prioritised findings report with remediation guidance and effort estimates',
			'Remediation support to close identified gaps before they are found in an audit',
		],
	},

	capabilities: [
		{
			icon: 'shield',
			title: 'Cybersecurity Assessments',
			description:
				'Structured security assessments covering access controls, network security, endpoint security, data protection, and incident response capability against a defined risk framework.',
			image: '/services/it-consulting-it-services/security-compliance-cybersecurity-assessments.jpg',
			imageAlt: 'IT Consulting & IT Services Cybersecurity Assessments capability illustration.',
		},
		{
			icon: 'search',
			title: 'Compliance Gap Analysis',
			description:
				'Assess your current controls against a specific compliance framework — ISO 27001, Cyber Essentials, SOC 2, GDPR, or PCI DSS — and produce a prioritised gap list.',
			image: '/services/it-consulting-it-services/security-compliance-compliance-gap-analysis.jpg',
			imageAlt: 'IT Consulting & IT Services Compliance Gap Analysis capability illustration.',
		},
		{
			icon: 'fileText',
			title: 'Security Policy Development',
			description:
				'Develop information security policies and procedures that reflect actual operational practice and meet the documentation requirements of relevant compliance frameworks.',
			image: '/services/it-consulting-it-services/security-compliance-security-policy-development.jpg',
			imageAlt: 'IT Consulting & IT Services Security Policy Development capability illustration.',
		},
		{
			icon: 'users',
			title: 'Security Awareness Training',
			description:
				'Deliver security awareness sessions covering phishing, social engineering, password management, and data handling appropriate to your staff',
			image: '/services/it-consulting-it-services/security-compliance-security-awareness-training.jpg',
			imageAlt: 'IT Consulting & IT Services Security Awareness Training capability illustration.',
		},
		{
			icon: 'activity',
			title: 'Incident Response Planning',
			description:
				'Design and document incident response procedures, define escalation paths, and run tabletop exercises so the team knows how to respond before an incident occurs.',
			image: '/services/it-consulting-it-services/security-compliance-incident-response-planning.jpg',
			imageAlt: 'IT Consulting & IT Services Incident Response Planning capability illustration.',
		},
		{
			icon: 'eye',
			title: 'Third-Party Risk Assessment',
			description:
				'Assess the security posture of key suppliers and technology partners whose access to your systems or data creates risk that requires management.',
			image: '/services/it-consulting-it-services/security-compliance-thirdparty-risk-assessment.jpg',
			imageAlt: 'IT Consulting & IT Services Third-party Risk Assessment capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Finance',
			title: 'Pre-Audit Security Assessment',
			description:
				'A fintech company was preparing for a regulatory audit. Our pre-audit assessment identified 11 control gaps, all addressed before the formal audit, which passed without material findings.',
		},
		{
			industry: 'Healthcare',
			title: 'GDPR Compliance Review for a Healthcare Provider',
			description:
				'A private healthcare group needed a GDPR gap analysis covering how patient data was stored, accessed, and shared. We produced a findings report with prioritised remediation actions and supporting policy updates.',
		},
		{
			industry: 'SaaS',
			title: 'SOC 2 Readiness Assessment',
			description:
				'A SaaS company pursuing SOC 2 certification needed to understand where they stood against the Trust Services Criteria. Our readiness assessment gave them a clear list of controls to implement before engaging an auditor.',
		},
		{
			industry: 'Retail',
			title: 'Cyber Essentials Certification Support',
			description:
				'A retail company needed Cyber Essentials certification to qualify for a public sector contract. We assessed their environment, identified the gaps against the scheme requirements, and supported remediation to achieve certification.',
		},
		{
			industry: 'Education',
			title: 'Security Policy Development',
			description:
				'A higher education institution needed updated information security policies to meet their accreditation requirements. We produced a policy framework aligned to ISO 27001 and reviewed against their actual operating environment.',
		},
		{
			industry: 'Professional Services',
			title: 'Supplier Security Assessment',
			description:
				'A professional services firm needed to assess whether a critical technology supplier met their security requirements before renewing their contract. We conducted a structured assessment and produced a report for the procurement decision.',
		},
	],

	technologies: [
		'ISO 27001',
		'Cyber Essentials',
		'SOC 2',
		'GDPR',
		'PCI DSS',
		'NIST Framework',
		'Microsoft Secure Score',
		'CrowdStrike',
		'Qualys',
		'Okta',
	],

	benefits: [
		{
			title: 'Known Gaps Before an Audit Finds Them',
			description:
				'A proactive assessment identifies the same gaps an auditor would find, at a time when you can close them without the consequences of a formal audit finding.',
		},
		{
			title: 'Compliance Obligations Mapped to Controls',
			description:
				'A gap analysis translates abstract compliance requirements into specific technical and procedural controls your team can implement, removing the ambiguity from what compliance actually requires.',
		},
		{
			title: 'Risk-Prioritised Remediation',
			description:
				'Not all security gaps are equally important. A risk-prioritised findings report focuses effort on the gaps that matter most for your specific threat environment and compliance obligations.',
		},
		{
			title: 'Policies That Reflect Reality',
			description:
				'Security policies that document how things actually work rather than how they should work in theory are more useful for staff and more credible to auditors.',
		},
		{
			title: 'Incident Response Capability',
			description:
				'Teams that have planned and practised their incident response respond faster, make fewer mistakes, and limit the damage from a security incident compared to teams improvising under pressure.',
		},
		{
			title: 'Supplier Risk Visibility',
			description:
				'Assessing the security posture of suppliers with significant access to your data or systems gives you visibility of third-party risk that is invisible without a structured assessment process.',
		},
	],

	faqs: [
		{
			q: 'What is the difference between a security assessment and a penetration test?',
			a: 'A security assessment reviews policies, configurations, processes, and controls against a framework — it identifies gaps in how you are set up. A penetration test actively attempts to exploit vulnerabilities to determine whether they are actually exploitable — it tests what an attacker could achieve. Both are valuable but serve different purposes. Most organisations need a security assessment first to identify and close obvious gaps, then a penetration test to validate that the remaining controls hold against active exploitation.',
		},
		{
			q: 'Which compliance framework is most relevant for us?',
			a: 'That depends on your industry, the type of data you process, and your customer requirements. GDPR applies to any organisation processing personal data of EU or UK residents. Cyber Essentials is required for UK government contracts and is a useful baseline for any business. ISO 27001 is the most internationally recognised standard and is often required by enterprise customers. PCI DSS applies if you store, process, or transmit payment card data. We assess which frameworks are relevant during the initial scoping conversation.',
		},
		{
			q: 'How long does a compliance gap analysis take?',
			a: 'A gap analysis against a single framework like Cyber Essentials typically takes one to two weeks for a small to mid-size organisation. ISO 27001 gap analysis takes three to four weeks because the scope is broader. The time depends on how much documentation already exists and how accessible your technical team is for interviews.',
		},
		{
			q: 'Do you help with implementation after identifying gaps?',
			a: 'Yes. Identifying gaps without supporting their remediation produces a report that sits on a shelf. We provide implementation support — configuring technical controls, drafting or updating policies, and working with your team to close the identified gaps within the agreed timeframe.',
		},
	],
	answerSummary:
		'UK and India organisations facing growing security and compliance requirements without a clear picture of their current posture get structured assessments, compliance gap analysis, policy development, and remediation support to close risks before audits find them.',
};

export default function SecurityCompliancePage() {
	return <SubservicePageLayout data={data} />;
}
