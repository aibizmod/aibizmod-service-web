import type { Metadata } from 'next';
import ServicePageLayout, {
  type ServicePageData,
  type ServiceCard,
} from '@/components/ServicePageLayout';
import TechStackCarousel, {
  MICROSOFT_STACK_ROW1,
  MICROSOFT_STACK_ROW2,
} from '@/components/ui/tech-stack-carousel';

export const metadata: Metadata = {
  title: 'Microsoft Stack & Copilot Services | Teams, Power Apps, Power BI | aibizmod',
  description:
    'Microsoft Stack & Copilot services for Teams, Copilot Studio, Power Apps, SharePoint, Power BI, and Azure AI integrations inside your existing M365 environment.',
  keywords: [
    'Microsoft Stack & Copilot',
    'Microsoft 365 Copilot',
    'Power Platform services',
    'Power Apps development',
    'Power BI dashboards',
    'Copilot Studio implementation',
    'Microsoft Teams automation',
    'SharePoint AI workflows',
    'Azure AI integration',
    'Microsoft 365 automation',
  ],
  alternates: {
    canonical: 'https://aibizmod.com/services/microsoft-stack',
  },
  openGraph: {
    title: 'Microsoft Stack & Copilot Services | aibizmod',
    description:
      'Deploy Teams, Copilot Studio, Power Apps, Power BI, and Azure AI inside your existing Microsoft 365 tenant.',
    url: '/services/microsoft-stack',
  },
};

const data: ServicePageData = {
  name: 'Microsoft Stack & Copilot',
  tagline:
    'For teams already living inside Microsoft 365, we turn your existing tenant into an operational advantage. We build Copilot-ready workflows, Power Apps, dashboards, and internal copilots that bring together Teams, SharePoint, Outlook, Power BI, and Azure AI so your teams can move faster without changing systems wholesale.',
  heroBullets: [
    'Built for businesses already invested in Microsoft 365 and Azure',
    'Teams, Copilot Studio, Power Apps, and Power BI connected into one operating layer',
    'Automated reporting, approvals, inspections, and daily project control workflows',
    'Designed for internal operations, field teams, and executive visibility',
  ],
  slug: 'microsoft-stack',
  iconColor: 'text-sky-600',

  overview: {
    headline: {
      main: 'Work Better Inside the Tools You Already Own.',
      highlight: 'Turn Microsoft 365 into a system of action.',
    },
    paragraphs: [
      'Many organisations already have the core Microsoft stack in place: Teams, SharePoint, Outlook, Excel, and Azure. The opportunity is not another platform swap — it is connecting those tools so work flows naturally from communication to action.',
      'We design and deploy Microsoft-native experiences that help project teams capture requests, track site issues, approve change orders, and summarise daily progress without manual admin work. The result is faster decisions, cleaner records, and less spreadsheet overhead.',
    ],
    benefits: [
      'You Already Own the Tenant',
      'Less Manual Reporting Work',
      'Standardised Digital Processes',
      'Executive Dashboards in Power BI',
      'AI Copilot Agents for Internal Teams',
      'Field & Office Operations in One Stack',
    ],
  },

  features: [
    {
      icon: 'bot',
      title: 'Teams & Copilot Workflows',
      desc: 'Create Teams-based request flows, chat copilots, and approval journeys that surface the right information at the right time.',
    },
    {
      icon: 'workflow',
      title: 'Power Apps for Field Operations',
      desc: 'Build lightweight, role-specific apps for snagging, inspections, sign-offs, and routine operational data capture.',
    },
    {
      icon: 'fileText',
      title: 'SharePoint & Document Intelligence',
      desc: 'Organise project records, connect document libraries, and use AI to classify and summarise project information.',
    },
    {
      icon: 'barChart',
      title: 'Power BI Executive Reporting',
      desc: 'Turn live operational data into clear visual reporting packs for project leaders, finance teams, and executives.',
    },
    {
      icon: 'sparkles',
      title: 'Copilot Studio Agents',
      desc: 'Deploy internal AI agents that answer process questions, draft RFIs, summarize meeting notes, and guide teams through standard tasks.',
    },
    {
      icon: 'cloud',
      title: 'Azure AI & Microsoft Graph',
      desc: 'Connect the Microsoft ecosystem with secure Azure logic, data pipelines, and graph-powered insight across your organisation.',
    },
  ],

  process: [
    {
      icon: 'compass',
      title: 'Tenant & Workflow Audit',
      desc: 'We map your current Microsoft stack, review operational pain points, and identify which processes should move into Teams, Apps, or AI.',
    },
    {
      icon: 'target',
      title: 'Rapid Prototype',
      desc: 'We build low-friction proof-of-concept flows for reporting, approvals, or intelligence so stakeholders can validate the approach early.',
    },
    {
      icon: 'code2',
      title: 'Build & Integrate',
      desc: 'We configure Power Apps, Power BI, Copilot Studio, SharePoint logic, and Azure connectors into a working, secure operating layer.',
    },
    {
      icon: 'rocket',
      title: 'Rollout & Adoption',
      desc: 'We support training, handover, and refinement so your teams use the solution as part of daily operations rather than as a side project.',
    },
  ],

  faqs: [
    {
      q: 'Do we need to replace our existing systems?',
      a: 'No. This service is designed to work inside your current Microsoft environment. We connect and improve the tools you already use instead of forcing a platform migration.',
    },
    {
      q: 'What kind of workflows work well in Microsoft Stack & Copilot?',
      a: 'The strongest use cases are daily reporting, approval chains, site inspections, RFI drafting, document triage, and executive dashboards that pull from Teams, SharePoint, Excel, and Power BI.',
    },
    {
      q: 'Can this work for field teams and site operations?',
      a: 'Yes. Power Apps is particularly strong for mobile field use, offline data capture, sign-offs, and site punch lists. Teams and SharePoint then centralise the information for office teams.',
    },
    {
      q: 'Is this more of an AI project or a systems project?',
      a: 'It is both. The value comes from combining Microsoft-native workflows, structured data, and AI support. The goal is to reduce manual overhead while improving decision quality and consistency.',
    },
  ],
};

const serviceCards: ServiceCard[] = [
  {
    title: 'Teams Daily Site Log Copilot',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop',
    bullets: ['Voice-to-Report', 'Daily Site Logs', 'SharePoint Filing'],
    href: '/services/microsoft-stack/teams-site-log-copilot',
    tag: '01 · copilot',
    subtitle: 'Turn voice notes into audit-ready reports.',
    description: 'A Copilot agent in Teams that converts voice memos into structured daily site reports filed directly in SharePoint.',
    color: '#6264A7',
    iconKey: 'bot',
  },
  {
    title: 'Outlook & Word RFI Copilot',
    image:
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80&auto=format&fit=crop',
    bullets: ['RFI Drafting', 'Spec Compliance', 'Outlook Add-in'],
    href: '/services/microsoft-stack/outlook-rfi-copilot',
    tag: '02 · copilot',
    subtitle: 'Draft RFI responses in 90 seconds.',
    description: 'An Outlook and Word agent that cross-references submittals against project specs and auto-drafts formal technical responses.',
    color: '#0078D4',
    iconKey: 'mail',
  },
  {
    title: 'Spec & Drawing Compliance App',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop',
    bullets: ['Delta Comparison', 'Compliance Matrix', 'Power Apps'],
    href: '/services/microsoft-stack/spec-compliance-power-app',
    tag: '03 · power app',
    subtitle: 'Colour-coded deltas before you sign.',
    description: 'A standalone Power App that compares spec revisions and generates a compliance matrix in minutes.',
    color: '#742774',
    iconKey: 'fileText',
  },
  {
    title: 'Project Controls Power BI Template',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
    bullets: ['EVM Dashboard', 'Delay Forecasting', '30-Min Setup'],
    href: '/services/microsoft-stack/project-controls-power-bi',
    tag: '04 · power bi',
    subtitle: 'Executive risk radar in 30 minutes.',
    description: 'A pre-built Power BI template that turns schedule exports and cost ledgers into an executive-grade EVM dashboard.',
    color: '#F2C811',
    iconKey: 'barChart',
  },
  {
    title: 'Field Punch-List & Safety App',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop',
    bullets: ['Offline-First', 'AI Photo Tagging', 'Power Apps'],
    href: '/services/microsoft-stack/field-punchlist-safety-power-app',
    tag: '05 · power app',
    subtitle: 'Replace expensive field software.',
    description: 'An offline-first Power App that lets field teams capture punch-list items with AI-assisted photo tagging.',
    color: '#0066FF',
    iconKey: 'smartphone',
  },
];

export default function MicrosoftStackPage() {
  return (
    <ServicePageLayout
      data={data}
      techStackFooter={
        <TechStackCarousel row1={MICROSOFT_STACK_ROW1} row2={MICROSOFT_STACK_ROW2} />
      }
      serviceCards={serviceCards}
    />
  );
}
