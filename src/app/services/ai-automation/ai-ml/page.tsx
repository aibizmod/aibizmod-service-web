import type { Metadata } from "next";
import SubservicePageLayout, {
  type SubservicePageData,
} from "@/components/SubservicePageLayout";

export const metadata: Metadata = {
  title: "AI & Machine Learning Solutions | Predictive Analytics | aibizmod",
  description:
    "Custom ML models that identify complex patterns, forecast project timelines, and automate routine data-driven decisions for proactive operations.",
  keywords: [
    "machine learning",
    "AI ML",
    "predictive analytics",
    "data science",
    "AI solutions",
    "predictive modeling",
    "data pipeline",
    "algorithmic decision support",
    "resource optimization",
  ],
  alternates: {
    canonical: "https://aibizmod.com/services/ai-automation/ai-ml",
  },
  openGraph: {
    title: "AI & Machine Learning Solutions | aibizmod",
    description:
      "Custom ML models that identify complex patterns, forecast project timelines, and automate routine data-driven decisions.",
    url: "/services/ai-automation/ai-ml",
  },
};

const data: SubservicePageData = {
  name: "AI & Machine Learning (AI/ML)",
  parentName: "AI & Automation",
  parentSlug: "ai-automation",
  slug: "ai-ml",
  tagline:
    "Unlock the Predictive Power of Your Project Data\n• Data is the foundation of modern infrastructure, but true value lies in actionable intelligence\n• We build custom ML models that identify complex patterns, forecast project timelines, and automate routine data-driven decisions\n• By integrating intelligent algorithms directly into your operations, we enable you to optimize resource allocation, mitigate project risks, and drive sustainable operational efficiency",
  heroImage:
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1000&q=80&auto=format&fit=crop",

  solves: {
    challenge:
      "Modern projects generate massive volumes of data that remain completely unstructured, siloed across separate tools, and unusable for planning. Teams are constantly stuck in a firefighting cycle—waiting for a schedule delay, material shortage, or budget overrun to happen before trying to fix it. Manual data analysis is physically incapable of uncovering the complex, hidden patterns and variables that cause systematic operational delays.",
    challengePoints: [
      "Data overload — modern projects generate massive volumes of data that remain unstructured and siloed across separate tools",
      "Reactive operations — teams wait for delays, shortages, or overruns before reacting rather than anticipating them",
      "Invisible bottlenecks — manual analysis cannot uncover the complex patterns causing systematic operational delays",
    ],
    solution:
      "We engineer robust pipelines that ingest, clean, and standardize your fragmented project metrics into a single source of truth. We deploy custom Machine Learning algorithms that analyze historical performance data to forecast future outcomes. Instead of reacting to problems, our models predict precise timeline risks, material demands, and optimal resource distribution before bottlenecks occur.",
    solutionPoints: [
      "Structured data asset — pipelines that ingest, clean, and standardize fragmented metrics into a single source of truth",
      "Predictive engine — custom ML algorithms that analyze historical data to forecast future outcomes",
      "Proactive strategy — models predict timeline risks, material demands, and resource distribution before bottlenecks occur",
    ],
  },

  capabilities: [
		{
			icon: 'lineChart',
			title: 'Predictive Analytics & Forecasting',
			description:
				'Move beyond baseline metrics to anticipate market shifts, timeline risks, and demand cycles using models trained on your historical patterns.',
			image: '/services/ai-automation/ai-ml-predictive-analytics-forecasting.jpg',
			imageAlt: 'AI & Automation Predictive Analytics & Forecasting capability illustration.',
		},
		{
			icon: 'target',
			title: 'Resource & Asset Optimization',
			description:
				'Automate the allocation of labor, machinery, and capital based on high-probability performance forecasting and real-time demand signals.',
			image: '/services/ai-automation/ai-ml-resource-asset-optimization.jpg',
			imageAlt: 'AI & Automation Resource & Asset Optimization capability illustration.',
		},
		{
			icon: 'database',
			title: 'Data Pipeline Engineering',
			description:
				'Architect scalable cloud infrastructure to collect, govern, and process massive volumes of operational data from fragmented sources.',
			image: '/services/ai-automation/ai-ml-data-pipeline-engineering.jpg',
			imageAlt: 'AI & Automation Data Pipeline Engineering capability illustration.',
		},
		{
			icon: 'barChart',
			title: 'Algorithmic Decision Support',
			description:
				'Build data models that calculate the best path forward, providing instant recommendations to project managers and operations teams.',
			image: '/services/ai-automation/ai-ml-algorithmic-decision-support.jpg',
			imageAlt: 'AI & Automation Algorithmic Decision Support capability illustration.',
		},
		{
			icon: 'refreshCw',
			title: 'Continuous Model Retraining',
			description:
				'Automated pipelines that retrain models as new data arrives, ensuring predictive accuracy improves over time rather than degrading.',
			image: '/services/ai-automation/ai-ml-continuous-model-retraining.jpg',
			imageAlt: 'AI & Automation Continuous Model Retraining capability illustration.',
		},
		{
			icon: 'bell',
			title: 'Automated Insight Alerts',
			description:
				'Schedule model outputs as digests or alerts delivered automatically to stakeholders on whatever cadence is useful.',
			image: '/services/ai-automation/ai-ml-automated-insight-alerts.jpg',
			imageAlt: 'AI & Automation Automated Insight Alerts capability illustration.',
		}
	],

  useCases: [
    {
      industry: "Operations",
      title: "Dynamic Resource & Crew Scheduling",
      description:
        "Automatically routing heavy machinery and specialized crews across multiple active project sites based on real-time task pacing, weather shifts, and historical efficiency rates.",
    },
    {
      industry: "Logistics",
      title: "Supply Chain Disruption Forecasting",
      description:
        "Analyzing historical vendor performance, transit lead times, and global material trends to predict project-critical shortages and automatically trigger early reordering.",
    },
    {
      industry: "Finance",
      title: "Predictive Cost Estimating & Competitive Bidding",
      description:
        "Uncovering hidden cost drivers, material price fluctuations, and labor bottlenecks in historical project data to generate highly accurate, risk-adjusted bids.",
    },
    {
      industry: "Manufacturing",
      title: "Predictive Asset Maintenance",
      description:
        "Monitoring machinery and equipment diagnostics to forecast mechanical failures before they occur, scheduling maintenance during natural downtime.",
    },
    {
      industry: "Construction",
      title: "Project Timeline Risk Forecasting",
      description:
        "Models trained on historical schedule data predict which phases are likely to overrun, allowing preemptive resource reallocation before delays compound.",
    },
    {
      industry: "Retail",
      title: "Demand-Driven Inventory Planning",
      description:
        "ML models forecast product demand at the SKU level using seasonal trends, promotions, and external signals to optimize stock levels across locations.",
    },
  ],

  technologies: [
    "Python",
    "scikit-learn",
    "TensorFlow",
    "PyTorch",
    "XGBoost",
    "pandas",
    "Apache Spark",
    "PostgreSQL",
    "AWS SageMaker",
    "FastAPI",
    "Docker",
    "MLflow",
  ],

  benefits: [
    {
      title: "Proactive Risk & Variance Control",
      description:
        "Neutralize project overruns and timeline friction by identifying schedule threats and supply volatility days before they disrupt operations.",
    },
    {
      title: "Drastic Reductions in Waste",
      description:
        "Optimize capital, raw material storage, and equipment idle times to protect and expand project profit margins.",
    },
    {
      title: "Compounding Data Valuation",
      description:
        "Convert passive, disconnected logs into a centralized predictive asset that makes each successive project faster and cheaper to bid and build.",
    },
    {
      title: "Anticipate Problems Before They Occur",
      description:
        "Predictive models shift decision-making from reactive to proactive, identifying issues in time to act rather than after the fact.",
    },
    {
      title: "Reduced Guesswork in Planning",
      description:
        "Forecasting models replace intuition and historical averages with statistical predictions grounded in your actual operational patterns.",
    },
    {
      title: "Actionable Outputs",
      description:
        "We deliver results as API endpoints, scored lists, or automated digests so model output feeds directly into existing workflows.",
    },
  ],

  faqs: [
    {
      q: "Our historical project data is messy and spread across multiple legacy systems. Can we still build predictive models?",
      a: "Yes. This is exactly what our Data Pipeline Engineering service handles. We don't expect your data to be perfect. Our team builds automated integration pipelines that ingest your fragmented logs, clean up duplicates, fill in gaps, and standardize everything into a structured format ready for machine learning.",
    },
    {
      q: "How accurate are the timeline and budget forecasts when first deployed?",
      a: "When first deployed, the system establishes a baseline based on your historical patterns, which typically yields strong probabilistic forecasts. However, the system is designed to learn. As your teams log real-time data from ongoing projects, the algorithms continuously retrain, significantly increasing their accuracy with every week of operation.",
    },
    {
      q: "Will these algorithms replace our current project management software?",
      a: "Not at all. We build predictive engines to enhance, not replace, your existing tech stack. Our models run quietly in the background and pipe their analytics, alerts, and recommendations directly into the software dashboards your team already logs into every day.",
    },
    {
      q: "What data do you need to build a predictive model?",
      a: "The most useful input is structured historical data with clear labels or outcomes. You typically need at least 12 months of history and enough positive examples of the outcome you want to predict. We run a data assessment before starting to confirm whether the available data is sufficient.",
    },
  ],
};

export default function AIMLPage() {
  return <SubservicePageLayout data={data} />;
}
