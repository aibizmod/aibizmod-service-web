import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Customer Intelligence & Analytics Services | Data Insights | aibizmod',
	description:
		'Customer analytics and retention tracking systems. Surface actionable insights about customer behavior, risk, value, and satisfaction drivers.',
	keywords: [
		'customer intelligence',
		'customer analytics',
		'customer insights',
		'data analytics',
		'retention analytics',
		'behavioral analytics',
		'customer segmentation',
		'churn prediction',
		'customer lifetime value',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/customer-experience-management/customer-intelligence',
	},
	openGraph: {
		title: 'Customer Intelligence | Analytics & Insights | aibizmod',
		description:
			'Customer analytics that surface actionable insights about satisfaction, churn, and customer value.',
		url: '/services/customer-experience-management/customer-intelligence',
	},
};

const data: SubservicePageData = {
	name: 'Customer Intelligence',
	parentName: 'Customer Experience Management',
	parentSlug: 'customer-experience-management',
	slug: 'customer-intelligence',
	tagline:
		'Customer analytics and retention tracking systems that surface actionable insight from your data — who is at risk of leaving, who is your most valuable segment, and what is actually driving satisfaction or dissatisfaction.',
	heroImage:
		'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Most businesses collect customer data but cannot easily analyse it. Transactional data is in one system, support data is in another, and behavioural data from the website or app is in a third. There is no combined view. Leadership makes decisions about customer strategy based on incomplete reports and intuition rather than a clear picture of what the data actually shows.',
		challengePoints: [
			'Customer data fragmented across CRM, support, billing, and analytics tools with no unified view',
			'No way to identify which customers are at risk of churning until they have already left',
			'Retention and loyalty decisions made without data on what is actually driving or reducing them',
			'Marketing and CX teams using different definitions of customer segments, leading to conflicting decisions',
		],
		solution:
			'We consolidate your customer data sources, build the segmentation models that matter for your business, and deliver the dashboards and alerts that make the insight actionable. The output is a clear, shared understanding of who your customers are, how they are behaving, and what requires action.',
		solutionPoints: [
			'Unified customer data model pulling from CRM, support, and behavioural sources',
			'Cohort analysis and RFM segmentation to identify high-value and at-risk customers',
			'Churn risk scoring based on your actual engagement and purchase patterns',
			'Dashboards configured for marketing, CX, and leadership with the metrics each team needs',
		],
	},

	capabilities: [
		{
			icon: 'users',
			title: 'Customer Segmentation',
			description:
				'Build RFM (Recency, Frequency, Monetary) and behavioural segments that reflect how your customers actually differ in value and lifecycle stage.',
			image: '/services/customer-experience-management/customer-intelligence-customer-segmentation.jpg',
			imageAlt: 'Customer Experience Management Customer Segmentation capability illustration.',
		},
		{
			icon: 'activity',
			title: 'Churn Risk Modelling',
			description:
				'Identify customers showing early signs of disengagement using behavioural signals, so retention campaigns can be triggered before accounts are lost.',
			image: '/services/customer-experience-management/customer-intelligence-churn-risk-modelling.jpg',
			imageAlt: 'Customer Experience Management Churn Risk Modelling capability illustration.',
		},
		{
			icon: 'barChart',
			title: 'Cohort Analysis',
			description:
				'Track how customer groups acquired in different periods perform over time, revealing which acquisition channels and campaigns produce the highest long-term value.',
			image: '/services/customer-experience-management/customer-intelligence-cohort-analysis.jpg',
			imageAlt: 'Customer Experience Management Cohort Analysis capability illustration.',
		},
		{
			icon: 'database',
			title: 'Data Consolidation',
			description:
				'Combine customer records from CRM, helpdesk, e-commerce, and analytics tools into a single dataset that can be queried and reported on consistently.',
			image: '/services/customer-experience-management/customer-intelligence-data-consolidation.jpg',
			imageAlt: 'Customer Experience Management Data Consolidation capability illustration.',
		},
		{
			icon: 'lineChart',
			title: 'Customer Lifetime Value Reporting',
			description:
				'Build CLV models that project long-term revenue per customer segment, informing decisions about acquisition spend, retention investment, and product prioritisation.',
			image: '/services/customer-experience-management/customer-intelligence-customer-lifetime-value-reporting.jpg',
			imageAlt: 'Customer Experience Management Customer Lifetime Value Reporting capability illustration.',
		},
		{
			icon: 'bell',
			title: 'Retention Tracking Dashboards',
			description:
				'Dashboards monitoring customer retention, churn rate, NPS trend, and satisfaction scores in one place, updated automatically from your data sources.',
			image: '/services/customer-experience-management/customer-intelligence-retention-tracking-dashboards.jpg',
			imageAlt: 'Customer Experience Management Retention Tracking Dashboards capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Subscription',
			title: 'Churn Prediction for SaaS Platform',
			description:
				'A SaaS company built a churn risk model using login frequency, feature adoption, and support ticket data, enabling their customer success team to intervene with at-risk accounts 30 days before likely cancellation.',
		},
		{
			industry: 'Retail',
			title: 'RFM Segmentation for E-Commerce Brand',
			description:
				'An online retailer segmented their customer base into six RFM tiers, directing loyalty offers to high-frequency buyers and win-back campaigns to lapsed purchasers with historical high spend.',
		},
		{
			industry: 'Hospitality',
			title: 'Guest Satisfaction Analytics',
			description:
				'A hotel group consolidated post-stay survey data, review scores, and booking patterns into a single dashboard, identifying the service touchpoints most correlated with repeat bookings.',
		},
		{
			industry: 'Finance',
			title: 'Customer Lifetime Value Model for a Lender',
			description:
				'A consumer finance company built CLV models by acquisition channel, showing that one channel was acquiring customers with 40 percent lower lifetime value despite similar short-term conversion rates.',
		},
		{
			industry: 'Healthcare',
			title: 'Patient Retention Tracking',
			description:
				'A private dental group set up a retention tracking dashboard that flagged patients overdue for their next appointment, supporting automated recall campaigns.',
		},
		{
			industry: 'Telecoms',
			title: 'Cohort Performance Analysis',
			description:
				'A telecom operator tracked 12-month retention rates by acquisition cohort, identifying a correlation between a specific onboarding flow and significantly higher 90-day churn.',
		},
	],

	technologies: [
		'Google Analytics 4',
		'Mixpanel',
		'Amplitude',
		'Segment',
		'Tableau',
		'Looker',
		'Power BI',
		'BigQuery',
		'PostgreSQL',
		'Python',
		'dbt',
	],

	benefits: [
		{
			title: 'Early Warning on Churn',
			description:
				'Behavioural signals surface accounts showing disengagement weeks before they cancel or lapse, giving the team a realistic window to intervene.',
		},
		{
			title: 'Resource Directed at High-Value Customers',
			description:
				'Segmentation makes it clear which customers generate disproportionate value, so retention investment and service quality can be concentrated where it has the most impact.',
		},
		{
			title: 'Shared Definition of Segments',
			description:
				'When marketing and CX work from the same segmentation model and data source, decisions are consistent rather than based on different interpretations of the same underlying data.',
		},
		{
			title: 'Acquisition Quality Assessment',
			description:
				'Cohort analysis reveals which channels and campaigns are acquiring customers who actually stay and spend, rather than just those with the lowest initial cost per acquisition.',
		},
		{
			title: 'Evidence-Based Retention Decisions',
			description:
				'Knowing which satisfaction drivers are most correlated with retention lets you prioritise operational and product improvements where they will have the greatest effect on customer behaviour.',
		},
		{
			title: 'Single Source of Truth',
			description:
				'A unified customer dataset removes the argument about whose numbers are right and gives the entire organisation a consistent baseline for customer performance discussions.',
		},
	],

	faqs: [
		{
			q: 'What data do you need to build a churn risk model?',
			a: 'The most useful inputs are engagement signals specific to your product or service — login frequency for a SaaS product, purchase recency for a retailer, visit frequency for a hospitality business. You also need historical outcome data: which customers did and did not churn over a comparable past period. We assess what you have available during scoping and confirm whether a predictive model is feasible or whether a rules-based scoring approach is more appropriate given the data.',
		},
		{
			q: 'Do you build dashboards we can run ourselves, or does this require ongoing analyst involvement?',
			a: 'We build dashboards in tools your team can maintain independently — Looker Studio, Tableau, or Power BI. After the build and a handover session, you own the dashboards and can update filters, date ranges, and views without needing us. Where the underlying data model needs structural changes, that requires developer involvement, but day-to-day use is self-service.',
		},
		{
			q: 'How do you consolidate data from multiple systems?',
			a: 'We typically use a data warehouse like BigQuery or a customer data platform like Segment, with connectors to your CRM, support tool, e-commerce platform, and analytics tools. Records are joined on a common customer identifier — usually email address or an internal ID. We handle deduplication and data quality checks as part of the build.',
		},
		{
			q: 'Can you define segments based on our specific business logic?',
			a: 'Yes. Standard frameworks like RFM are a useful starting point, but the most actionable segments are ones defined by your actual business model. For a subscription business that means different things than for a transactional retailer. We work with your team to define the segments that map to decisions you actually want to make, not generic categories.',
		},
	],
	answerSummary:
		'UK and India leadership teams making customer strategy decisions without a clear view of their data get consolidated analytics, churn risk models, RFM segmentation, and dashboards that reveal who is at risk, who is most valuable, and what drives satisfaction.',
};

export default function CustomerIntelligencePage() {
	return <SubservicePageLayout data={data} />;
}
