import type { Metadata } from 'next';
import SubservicePageLayout, {
  type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
  title: 'Project Controls Power BI Template | EVM Dashboard | aibizmod',
  description:
    'Pre-built Power BI template that turns Primavera P6 schedule exports and cost ledgers into executive-grade Earned Value Management and delay forecasting dashboards in 30 minutes.',
  keywords: [
    'Power BI project controls',
    'EVM dashboard',
    'earned value management',
    'delay forecasting dashboard',
    'Power BI template',
    'Primavera P6 Power BI',
    'project controls reporting',
    'executive project dashboard',
    'Power Query EVM',
    'construction project controls',
  ],
  alternates: {
    canonical: 'https://aibizmod.com/services/microsoft-stack/project-controls-power-bi',
  },
  openGraph: {
    title: 'Project Controls Power BI Template | aibizmod',
    description:
      'Drop in your Primavera P6 schedule export and cost ledger. Get an executive-grade EVM and delay forecasting dashboard in 30 minutes.',
    url: '/services/microsoft-stack/project-controls-power-bi',
  },
};

const data: SubservicePageData = {
  name: 'Project Controls Power BI Template',
  parentName: 'Microsoft Stack & Copilot',
  parentSlug: 'microsoft-stack',
  slug: 'project-controls-power-bi',
  tagline:
    'C-suite executives and PMO directors want instant visibility without waiting six months for a custom data warehouse build. A pre-configured Power BI template maps standard schedule CSVs and Excel cost sheets, so time-to-insight is immediate.',
  heroImage:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80&auto=format&fit=crop',

  solves: {
    challenge:
      'Executives and PMO directors wait weeks or months for project dashboards to be built by BI teams. Meanwhile, critical schedule and cost risks go unseen until they become expensive problems.',
    challengePoints: [
      'Six-month lead times for custom BI dashboard builds',
      'Project data locked in P6 exports, Excel sheets, and PDF reports',
      'No early warning for schedule delays or cost overruns',
      'Manual monthly reporting packs assembled by hand in PowerPoint',
    ],
    solution:
      'We provide a pre-built Power BI template that connects directly to standard Primavera P6 schedule exports and Excel cost ledgers. Drop in your files, enter the SharePoint file path, click refresh — and the executive EVM dashboard is live.',
    solutionPoints: [
      'Pre-configured Power BI .pbit template for schedule and cost data',
      'Power Query mappings for standard P6 CSV and Excel cost sheet formats',
      'EVM metrics: CPI, SPI, EAC, ETC, and variance analysis built in',
      'Delay forecasting with Monte Carlo-style trend projections',
    ],
  },

  capabilities: [
    {
      icon: 'barChart',
      title: 'EVM Dashboard',
      description:
        'Pre-built Earned Value Management visuals showing CPI, SPI, CV, SV, EAC, and ETC — the metrics executives need to assess project health at a glance.',
      image: '/services/microsoft-stack/project-controls-power-bi-evm-dashboard.webp',
      imageAlt: 'Microsoft Stack Project Controls Power BI EVM dashboard capability illustration.',
    },
    {
      icon: 'trendingUp',
      title: 'Delay Forecasting',
      description:
        'Trend analysis and projection charts that forecast schedule completion dates based on current performance, highlighting potential delays before they materialise.',
      image: '/services/microsoft-stack/project-controls-power-bi-delay-forecasting.webp',
      imageAlt: 'Microsoft Stack Project Controls Power BI delay forecasting capability illustration.',
    },
    {
      icon: 'fileText',
      title: 'P6 Schedule Import',
      description:
        'Power Query connectors that read standard Primavera P6 CSV exports, mapping activity codes, durations, predecessors, and baseline data into the dashboard model.',
      image: '/services/microsoft-stack/project-controls-power-bi-p6-import.webp',
      imageAlt: 'Microsoft Stack Project Controls Power BI P6 schedule import capability illustration.',
    },
    {
      icon: 'database',
      title: 'Cost Ledger Integration',
      description:
        'Excel cost sheets are mapped through Power Query with defined data types and relationships, connecting cost data to schedule activities for integrated reporting.',
      image: '/services/microsoft-stack/project-controls-power-bi-cost-ledger.webp',
      imageAlt: 'Microsoft Stack Project Controls Power BI cost ledger integration capability illustration.',
    },
    {
      icon: 'monitor',
      title: 'Executive Summary View',
      description:
        'A high-level summary page designed for C-suite consumption — project health RAG status, key risks, milestone forecast dates, and budget position on a single screen.',
      image: '/services/microsoft-stack/project-controls-power-bi-executive-summary.webp',
      imageAlt: 'Microsoft Stack Project Controls Power BI executive summary view capability illustration.',
    },
    {
      icon: 'refreshCw',
      title: 'One-Click Refresh',
      description:
        'Replace the source files, click refresh in Power BI, and the entire dashboard updates. No reconfiguration, no manual data manipulation, no BI team required.',
      image: '/services/microsoft-stack/project-controls-power-bi-one-click-refresh.webp',
      imageAlt: 'Microsoft Stack Project Controls Power BI one-click refresh capability illustration.',
    },
  ],

  useCases: [
    {
      industry: 'Construction',
      title: 'Programme Dashboard for Large Capital Projects',
      description:
        'A £200M infrastructure programme uses the template to track schedule and cost performance across 15 work packages. The PMO director gets a single dashboard refreshed weekly from P6 exports.',
    },
    {
      industry: 'Infrastructure',
      title: 'Highway Construction EVM Reporting',
      description:
        'A highway authority tracks earned value across multiple标段sections. The dashboard aggregates data from separate P6 files into a consolidated programme view.',
    },
    {
      industry: 'Energy',
      title: 'Power Plant Construction Progress Tracking',
      description:
        'Project controls teams track installation progress against the baseline schedule. The delay forecasting chart flags the turbine installation milestone as at risk three months in advance.',
    },
    {
      industry: 'Property',
      title: 'Multi-Tenant Development Cost Tracking',
      description:
        'A developer tracks cost performance across multiple tenant fit-out packages. The cost ledger integration shows which packages are overrunning and by how much.',
    },
    {
      industry: 'Manufacturing',
      title: 'Factory Expansion Programme Controls',
      description:
        'A manufacturing expansion project uses the template to track equipment procurement and installation schedules against the baseline, with earned value metrics updated bi-weekly.',
    },
    {
      industry: 'Legal',
      title: 'Claims Support Documentation',
      description:
        'When a delay dispute arises, the EVM dashboard provides a documented record of schedule performance trends, supporting delay analysis and extension of time claims.',
    },
  ],

  technologies: [
    'Power BI',
    'Power Query',
    'Excel',
    'SharePoint Online',
    'Azure Analysis Services',
    'Primavera P6',
    'DAX',
    'Microsoft Entra ID',
    'Power BI Service',
    'OneDrive for Business',
  ],

  benefits: [
    {
      title: '30-Minute Time-to-Insight',
      description:
        'Drop in your P6 export and cost ledger, enter the SharePoint path, click refresh. A fully configured EVM dashboard is live in 30 minutes — not six months.',
    },
    {
      title: 'Zero IT Involvement',
      description:
        'The template runs entirely within Power BI Desktop. No server setup, no database configuration, no BI team engagement required.',
    },
    {
      title: 'Executive-Ready Visuals',
      description:
        'Charts, KPIs, and summary tables are designed for C-suite consumption — clear, concise, and focused on the metrics that drive decisions.',
    },
    {
      title: 'Automatic Delay Warnings',
      description:
        'Trend-based forecasting highlights schedule risks months before the critical path is affected, giving project teams time to respond.',
    },
    {
      title: 'Repeatable Across Projects',
      description:
        'The same template works for any project that exports P6 schedules and Excel cost data — deploy it across your portfolio with minimal configuration.',
    },
    {
      title: 'Claims-Ready Data',
      description:
        'Historical EVM data and trend charts provide documented evidence for delay claims, extension of time requests, and dispute resolution.',
    },
  ],

  faqs: [
    {
      q: 'Do we need Power BI Pro or Premium?',
      a: 'The template works with Power BI Desktop for development and Power BI Pro for sharing. Power BI Premium Per User is recommended for larger datasets and more frequent refresh schedules.',
    },
    {
      q: 'What format does the P6 export need to be in?',
      a: 'The template accepts standard Primavera P6 CSV exports including activity data, baseline comparisons, and resource assignments. We provide a P6 export configuration guide during setup.',
    },
    {
      q: 'Can we customise the dashboard after deployment?',
      a: 'Yes. The template is a standard Power BI file that your team can modify. We provide documentation on the DAX measures and Power Query mappings so your BI team can extend it.',
    },
    {
      q: 'How often should we refresh the data?',
      a: 'We recommend weekly refresh for most projects, aligned with your progress reporting cycle. High-priority projects may benefit from daily refresh via Power BI Service scheduled refresh.',
    },
  ],
};

export default function ProjectControlsPowerBiPage() {
  return <SubservicePageLayout data={data} />;
}
