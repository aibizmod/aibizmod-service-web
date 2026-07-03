import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'AI Intelligence & Predictive Analytics Services | aibizmod',
	description:
		'Extract meaningful insights from operational data using predictive models and recommendation systems. AI that surfaces patterns dashboards cannot show.',
	keywords: [
		'AI intelligence',
		'predictive analytics',
		'machine learning',
		'data analytics',
		'AI recommendations',
		'predictive models',
		'business intelligence',
		'data science',
		'AI solutions',
	],
	alternates: {
		canonical: 'https://aibizmod.com/services/ai-automation/ai-intelligence',
	},
	openGraph: {
		title: 'AI Intelligence & Analytics | Predictive Models | aibizmod',
		description:
			'AI intelligence and predictive analytics that extract meaningful insights from operational data.',
		url: '/services/ai-automation/ai-intelligence',
	},
};

const data: SubservicePageData = {
	name: 'AI Intelligence',
	parentName: 'AI Automation',
	parentSlug: 'ai-automation',
	slug: 'ai-intelligence',
	tagline:
		'Extract meaningful insight from your operational data using predictive models and recommendation systems that surface patterns your dashboards cannot show.',
	heroImage:
		'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			"Most businesses have more historical data than they can interpret. Operations generate logs, transaction records, customer behaviour data, and support history, but the insights stay buried because the tools used to view them only show what already happened. Teams make decisions based on last month's numbers rather than what is likely to happen next.",
		challengePoints: [
			'Reactive decisions made after problems appear rather than before',
			'Customer churn identified only after accounts have already left',
			"Inventory orders based on last year's demand rather than predicted demand",
			'No signal for which leads are most likely to convert',
		],
		solution:
			'We identify the specific prediction or recommendation problem your business has, collect and clean the relevant data, then build and deploy a model that delivers actionable output, whether that is a forecast, a risk score, a customer cluster, or a ranked recommendation list.',
		solutionPoints: [
			'Custom predictive models trained on your historical data',
			'Output delivered as API endpoints or dashboard integrations',
			'Anomaly detection to flag unusual patterns before they become problems',
			'Recommendation engines that personalise actions per customer or user',
		],
	},

	capabilities: [
		{
			icon: 'lineChart',
			title: 'Predictive Analytics',
			description:
				'Build models that forecast demand, revenue, customer churn, or operational metrics using patterns in your historical records.',
			image: '/services/ai-automation/ai-intelligence-predictive-analytics.jpg',
			imageAlt: 'AI Automation Predictive Analytics capability illustration.',
		},
		{
			icon: 'target',
			title: 'Recommendation Systems',
			description:
				'Serve personalised product recommendations, content suggestions, or next-best actions based on individual user behaviour and history.',
			image: '/services/ai-automation/ai-intelligence-recommendation-systems.jpg',
			imageAlt: 'AI Automation Recommendation Systems capability illustration.',
		},
		{
			icon: 'eye',
			title: 'Anomaly Detection',
			description:
				'Flag unusual patterns in financial transactions, system performance, or operational data before they escalate into larger problems.',
			image: '/services/ai-automation/ai-intelligence-anomaly-detection.jpg',
			imageAlt: 'AI Automation Anomaly Detection capability illustration.',
		},
		{
			icon: 'users',
			title: 'Customer Segmentation',
			description:
				'Cluster customers by purchasing behaviour, engagement level, or lifetime value to inform targeted retention and acquisition strategies.',
			image: '/services/ai-automation/ai-intelligence-customer-segmentation.jpg',
			imageAlt: 'AI Automation Customer Segmentation capability illustration.',
		},
		{
			icon: 'barChart',
			title: 'Demand Forecasting',
			description:
				'Model future demand for inventory, staffing, or capacity planning using seasonal patterns, trend lines, and external signals.',
			image: '/services/ai-automation/ai-intelligence-demand-forecasting.jpg',
			imageAlt: 'AI Automation Demand Forecasting capability illustration.',
		},
		{
			icon: 'bell',
			title: 'Automated Insight Delivery',
			description:
				'Schedule model outputs as digests or alerts, delivered automatically to the right stakeholders on whatever cadence is useful.',
			image: '/services/ai-automation/ai-intelligence-automated-insight-delivery.jpg',
			imageAlt: 'AI Automation Automated Insight Delivery capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Retail',
			title: 'Churn Prediction for Subscription Businesses',
			description:
				'A model trained on engagement and payment behaviour identifies customers at risk of cancelling 30 days in advance, giving retention teams time to intervene.',
		},
		{
			industry: 'E-commerce',
			title: 'Product Recommendation Engine',
			description:
				'A recommendation system uses purchase history and browsing patterns to surface relevant products in real time, increasing average order value per session.',
		},
		{
			industry: 'Finance',
			title: 'Transaction Anomaly Detection',
			description:
				'A model trained on historical transaction patterns flags unusual activity outside the expected range, alerting finance teams before losses accumulate.',
		},
		{
			industry: 'Manufacturing',
			title: 'Predictive Maintenance Scheduling',
			description:
				'Equipment sensor data feeds a model that predicts component failure windows, allowing maintenance to be scheduled before costly unplanned downtime occurs.',
		},
		{
			industry: 'Logistics',
			title: 'Delivery Time Forecasting',
			description:
				'Historical dispatch and delivery data trains a model that predicts accurate delivery windows at order placement, improving customer experience.',
		},
		{
			industry: 'SaaS',
			title: 'Product Usage Health Scoring',
			description:
				'User activity signals are combined into a health score that identifies accounts at risk of downgrade or churn, prioritising customer success outreach.',
		},
	],

	technologies: [
		'Python',
		'scikit-learn',
		'TensorFlow',
		'PyTorch',
		'XGBoost',
		'pandas',
		'Jupyter',
		'PostgreSQL',
		'AWS SageMaker',
		'FastAPI',
		'Plotly',
	],

	benefits: [
		{
			title: 'Anticipate Problems Before They Occur',
			description:
				'Predictive models shift decision-making from reactive to proactive, identifying issues in time to act rather than after the fact.',
		},
		{
			title: 'Reduce Guesswork in Planning',
			description:
				"Forecasting models replace intuition and last year's numbers with statistical predictions grounded in your actual historical patterns.",
		},
		{
			title: 'Personalisation at Scale',
			description:
				'Recommendation systems deliver relevant suggestions to individual customers without manual segmentation or editorial curation.',
		},
		{
			title: 'Earlier Revenue Protection',
			description:
				'Churn models identify at-risk customers weeks before they leave, giving retention teams a realistic window to act.',
		},
		{
			title: 'Continuous Improvement',
			description:
				'Models are designed to be retrained as new data arrives, so predictive accuracy improves over time rather than degrading.',
		},
		{
			title: 'Actionable Outputs',
			description:
				'We deliver results as API endpoints, scored lists, or automated digests, so model output feeds directly into existing workflows.',
		},
	],

	faqs: [
		{
			q: 'What data do you need to build a predictive model?',
			a: 'The most useful input is structured historical data with clear labels or outcomes, such as customer transaction records with churn flags, or demand history with dates and quantities. You typically need at least 12 months of history and enough positive examples of the outcome you want to predict. We run a data assessment before starting to confirm whether the available data is sufficient.',
		},
		{
			q: 'How accurate are the predictions typically?',
			a: 'Accuracy depends heavily on data quality, the volume of historical data, and how stable the patterns are over time. For churn prediction with clean data, models typically achieve 75 to 90 percent accuracy. We provide confidence intervals and benchmarks during the scoping phase so you have realistic expectations before build begins.',
		},
		{
			q: 'Do you deliver the model as code we can run ourselves, or as a hosted service?',
			a: 'We can deliver either. If you have a data engineering team, we provide the trained model code, training scripts, and inference API. If you want a managed solution, we deploy the model to a cloud endpoint and handle retraining on a schedule.',
		},
		{
			q: 'How often do models need to be retrained?',
			a: 'It depends on how quickly the underlying patterns change. Demand forecasting models in stable businesses may only need quarterly retraining. Churn models in rapidly evolving markets may need monthly updates. We build retraining pipelines so the process can run on a schedule with minimal manual intervention.',
		},
	],
};

export default function AIIntelligencePage() {
	return <SubservicePageLayout data={data} />;
}
