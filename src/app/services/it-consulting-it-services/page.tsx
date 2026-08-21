import type { Metadata } from 'next';
import ServicePageLayout, {
	type ServicePageData,
	type ServiceCard,
} from '@/components/ServicePageLayout';
import TechStackCarousel, {
	IT_CONSULTING_ROW1,
	IT_CONSULTING_ROW2,
} from '@/components/ui/tech-stack-carousel';

export const metadata: Metadata = {
	title: 'IT Consulting Services | Digital Transformation | aibizmod',
	description:
		'IT consulting, digital transformation, cloud advisory, cybersecurity assessments, and managed IT services — with IT project management software recommendations for growing teams.',
	keywords: [
		'it consulting services',
		'digital transformation consulting',
		'managed it services',
		'it project management software',
		'fractional cto services',
		'IT consulting',
		'IT services',
		'IT service provider',
		'technology consulting',
		'technology advisory',
		'fractional CTO',
		'IT project management',
		'cloud cost audit',
		'IT consulting company',
	],
	alternates: {
		canonical: 'https://aibizmod.com/services/it-consulting-it-services',
	},
	openGraph: {
		title: 'IT Consulting Services | aibizmod',
		description:
			'IT consulting, digital transformation, cloud advisory, cybersecurity assessments, and managed IT services for growing teams.',
		url: '/services/it-consulting-it-services',
	},
};

const data: ServicePageData = {
	name: 'IT Consulting & IT Services',
	tagline:
		'For technology leaders, founders, and operations managers across the UK, USA, and internationally who need an objective view of their systems, we conduct architecture reviews, vendor comparisons, cloud cost audits, and security assessments. You receive practical documentation and a prioritised roadmap — not a slide deck — so the right decisions get made before money is spent.',
	heroBullets: [
		'For technology leaders, founders, and operations managers who need an objective view of their systems',
		'Architecture reviews, vendor comparisons, cloud cost audits, and security assessments',
		'Practical documentation and a prioritised roadmap — not a slide deck',
		'Serving clients in the UK, USA, and internationally',
	],
	slug: 'it-consulting-it-services',
	iconColor: 'text-cyan-600',

	overview: {
		headline: {
			main: 'Objective Guidance.',
			highlight: 'Actionable Roadmaps.',
		},
		paragraphs: [
			"Most technology decisions get made without a clear picture of what is already running. Companies pay for overlapping SaaS subscriptions, oversized servers, and untested recovery procedures.",
			'We conduct thorough architecture reviews, cloud cost audits, vendor evaluations, and security assessments — delivering prioritized, practical roadmaps your engineering team can immediately execute.',
		],
		benefits: [
			'Cloud Cost Reduction Recommendations',
			'Systems Vulnerability Security Checklists',
			'Detailed Software Vendor Comparisons',
			'12-Month Prioritized Release Roadmaps',
			'Documented Database Architecture Reviews',
			'Objective, Vendor-Neutral Assessments',
		],
	},

	features: [
		{
			icon: 'layers',
			title: 'Architecture Review Doc',
			desc: 'We map your current databases and servers, highlighting bottleneck points, single-point failures, and data sync issues.',
		},
		{
			icon: 'compass',
			title: 'Vendor Comparison Matrix',
			desc: 'We evaluate candidate software providers against your requirements, providing a weighted matrix detailing features and pricing.',
		},
		{
			icon: 'barChart',
			title: 'Cloud Cost Audit Report',
			desc: 'We review billing logs on AWS, GCP, or Azure, identify unutilized server resources, and list concrete cost-saving changes.',
		},
		{
			icon: 'shield',
			title: 'Security Assessment',
			desc: 'We check user permission tiers, password access rules, data encryption layers, and compile a prioritized risk checklist.',
		},
		{
			icon: 'target',
			title: 'Technology Roadmap',
			desc: 'We build a 12-month timeline detailing recommended software upgrades, required development hours, and estimated hardware budgets.',
		},
		{
			icon: 'fileText',
			title: 'IT Documentation Package',
			desc: 'We write recovery runbooks, configuration steps, and database schemas to ensure your internal staff can run operations.',
		},
	],

	process: [
		{
			icon: 'search',
			title: 'Discovery Workshops',
			desc: 'We review your system dashboards, inspect database access rules, and interview developers to establish the system context.',
		},
		{
			icon: 'barChart',
			title: 'Log Auditing',
			desc: 'We analyze server CPU metrics, billing statements, and vendor contracts to compile raw performance data.',
		},
		{
			icon: 'layers',
			title: 'Report Writing',
			desc: 'We write technical audits, compile comparison sheets, design architecture layouts, and outline security checklists.',
		},
		{
			icon: 'rocket',
			title: 'Review Delivery',
			desc: 'We present the documentation package, review the specific recommendations, and hand over all files.',
		},
	],

	techStack: [],

	faqs: [
		{
			q: 'What documents do we receive after an IT consulting audit?',
			a: 'You receive a PDF systems architecture review diagram, a cloud cost ledger detailing server waste, a weighted vendor comparison spreadsheet, and a security compliance checklist outlining access control issues.',
		},
		{
			q: 'Do you receive commission fees from software vendors you recommend?',
			a: 'No. We do not act as resellers or affiliate partners for any software, hardware, or cloud hosting vendors. Our comparisons are completely objective and based strictly on technical features and pricing.',
		},
		{
			q: 'How long does a systems architecture review engagement take?',
			a: 'A standard systems architecture review and security assessment takes 2–4 weeks from discovery workshops to the final documentation handover. We coordinate with your technical lead to inspect configs without interrupting live servers.',
		},
		{
			q: 'Do you offer hands-on coding to implement the roadmap recommendations?',
			a: 'Yes. Once the roadmap is delivered, you can choose to have your own developers implement the recommendations, hire third-party contractors, or engage our engineering team under a separate custom development contract.',
		},
	],
};

const serviceCards: ServiceCard[] = [
	{
		title: 'Strategy & Transformation',
		image:
			'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'Digital Transformation Consulting',
			'Technology Roadmaps',
			'IT Planning',
		],
		href: '/services/it-consulting-it-services/strategy-transformation',
		color: '#4f46e5',
		iconKey: 'compass',
	},
	{
		title: 'Architecture & Design',
		image:
			'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'Solution Architecture',
			'System Design',
			'Technology Evaluation',
		],
		href: '/services/it-consulting-it-services/architecture-design',
		color: '#0891b2',
		iconKey: 'layers',
	},
	{
		title: 'Security & Compliance',
		image:
			'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'Cybersecurity Assessments',
			'Security Reviews',
			'Compliance Support',
		],
		href: '/services/it-consulting-it-services/security-compliance',
		color: '#e11d48',
		iconKey: 'shield',
	},
	{
		title: 'Managed IT Operations',
		image:
			'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'Helpdesk Support',
			'Infrastructure Planning',
			'Cost Optimization',
			'Ongoing IT Management',
		],
		href: '/services/it-consulting-it-services/managed-it-operations',
		color: '#d97706',
		iconKey: 'settings',
	},
	{
		title: 'DevOps & Automation',
		image:
			'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80&auto=format&fit=crop',
		bullets: ['CI/CD', 'Infrastructure Automation', 'Containerization'],
		href: '/services/it-consulting-it-services/devops-automation',
		color: '#7c3aed',
		iconKey: 'workflow',
	},
	{
		title: 'Cloud & Infrastructure',
		image:
			'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop',
		bullets: ['Cloud Services', 'Cloud Migration', 'Cloud Architecture'],
		href: '/services/it-consulting-it-services/cloud-infrastructure',
		color: '#0284c7',
		iconKey: 'cloud',
	},
];

export default function ITConsultingPage() {
	return (
		<ServicePageLayout
			data={data}
			techStackFooter={
				<TechStackCarousel
					row1={IT_CONSULTING_ROW1}
					row2={IT_CONSULTING_ROW2}
				/>
			}
			serviceCards={serviceCards}
		/>
	);
}
