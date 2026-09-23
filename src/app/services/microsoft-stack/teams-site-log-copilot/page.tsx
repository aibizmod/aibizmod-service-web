import type { Metadata } from 'next';
import SubservicePageLayout, {
  type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
  title: 'Microsoft Teams Daily Site Log Copilot | Voice-to-Report | aibizmod',
  description:
    'Teams-based Copilot agent that turns 60-second voice notes into structured, audit-ready daily site reports filed directly in SharePoint.',
  keywords: [
    'Microsoft Teams Copilot',
    'daily site report automation',
    'voice to report',
    'Teams site log',
    'Copilot Studio agent',
    'construction daily report',
    'site diary automation',
    'SharePoint reporting',
    'Power Automate site log',
    'field reporting Copilot',
  ],
  alternates: {
    canonical: 'https://aibizmod.com/services/microsoft-stack/teams-site-log-copilot',
  },
  openGraph: {
    title: 'Teams Daily Site Log Copilot | aibizmod',
    description:
      'Turn a 60-second voice note in Teams into a structured, audit-ready Daily Site Report filed directly in SharePoint.',
    url: '/services/microsoft-stack/teams-site-log-copilot',
  },
};

const data: SubservicePageData = {
  name: 'Teams Daily Site Log Copilot',
  parentName: 'Microsoft Stack & Copilot',
  parentSlug: 'microsoft-stack',
  slug: 'teams-site-log-copilot',
  tagline:
    'Turn a 60-second voice note in Teams into a structured, audit-ready Daily Site Report filed directly in SharePoint. Superintendents and foremen send a voice memo into a dedicated Teams channel; the Copilot agent extracts trade headcounts, weather impacts, work accomplished, and delays, then compiles and logs the branded PDF report automatically.',
  heroImage:
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=80&auto=format&fit=crop',

  solves: {
    challenge:
      'Site supervisors spend 30 to 45 minutes every evening typing up daily reports from handwritten notes, photos, and memory. Reports arrive late, miss key details, and create compliance gaps when projects face audits or disputes.',
    challengePoints: [
      'Supervisors writing reports from memory at the end of a long day',
      'Incomplete or inconsistent data across different sites and teams',
      'Reports filed days late, making real-time project visibility impossible',
      'No standardised format for audit trails or dispute resolution',
    ],
    solution:
      'We deploy a Copilot Studio agent directly inside a dedicated Teams channel. Supervisors send a voice memo or bullet points; the agent transcribes, structures, and files a branded daily report into SharePoint — all within minutes of the site visit ending.',
    solutionPoints: [
      'Voice transcription via Azure Speech Services with construction vocabulary',
      'Automatic extraction of headcounts, weather, work areas, and delays',
      'Branded PDF report filed to the correct SharePoint document library',
      'Zero learning curve — works inside the Teams app supervisors already use',
    ],
  },

  capabilities: [
    {
      icon: 'bot',
      title: 'Voice-to-Report Transcription',
      description:
        'Supervisors speak naturally into the Teams channel. Azure Speech Services transcribes the audio with construction-specific vocabulary and the agent structures it into report sections.',
      image: '/services/microsoft-stack/teams-site-log-copilot-voice-to-report.webp',
      imageAlt: 'Microsoft Stack Teams Site Log Copilot voice transcription capability illustration.',
    },
    {
      icon: 'fileText',
      title: 'Structured Report Generation',
      description:
        'The agent extracts trade headcounts, weather conditions, work completed, delays, and safety observations, then compiles them into a branded daily report template.',
      image: '/services/microsoft-stack/teams-site-log-copilot-structured-report.webp',
      imageAlt: 'Microsoft Stack Teams Site Log Copilot structured report generation capability illustration.',
    },
    {
      icon: 'cloud',
      title: 'SharePoint Auto-Filing',
      description:
        'Reports are automatically saved to the correct SharePoint document library with metadata tags for project, date, and site — no manual filing required.',
      image: '/services/microsoft-stack/teams-site-log-copilot-sharepoint-filing.webp',
      imageAlt: 'Microsoft Stack Teams Site Log Copilot SharePoint auto-filing capability illustration.',
    },
    {
      icon: 'workflow',
      title: 'Power Automate Approval Flow',
      description:
        'Optionally route completed reports to project managers for review and sign-off before final filing, with Teams notifications keeping the workflow moving.',
      image: '/services/microsoft-stack/teams-site-log-copilot-approval-flow.webp',
      imageAlt: 'Microsoft Stack Teams Site Log Copilot Power Automate approval flow capability illustration.',
    },
    {
      icon: 'barChart',
      title: 'Multi-Site Rollup',
      description:
        'Aggregate daily data across multiple sites into a consolidated view. Project directors see a single dashboard instead of checking individual team channels.',
      image: '/services/microsoft-stack/teams-site-log-copilot-multi-site-rollup.webp',
      imageAlt: 'Microsoft Stack Teams Site Log Copilot multi-site rollup capability illustration.',
    },
    {
      icon: 'shield',
      title: 'Audit-Ready Format',
      description:
        'Every report follows a consistent structure with timestamps, author attribution, and version history — ready for audits, disputes, or client reviews.',
      image: '/services/microsoft-stack/teams-site-log-copilot-audit-ready.webp',
      imageAlt: 'Microsoft Stack Teams Site Log Copilot audit-ready format capability illustration.',
    },
  ],

  useCases: [
    {
      industry: 'Construction',
      title: 'Daily Site Diary for General Contractors',
      description:
        'Site superintendents send a 60-second voice note summarising the day. The agent compiles headcounts by trade, weather, work areas, and delays into a formatted report filed in SharePoint.',
    },
    {
      industry: 'Construction',
      title: 'Multi-Project Reporting for PMOs',
      description:
        'Project managers oversee 10+ sites. Each site uses the same Teams channel pattern, and a Power BI dashboard aggregates daily data for executive visibility.',
    },
    {
      industry: 'Infrastructure',
      title: 'Highway and Rail Progress Logs',
      description:
        'Field engineers on linear infrastructure record progress by chainage or mile marker. The agent maps voice descriptions to structured location-based log entries.',
    },
    {
      industry: 'Energy',
      title: 'Wind Farm Construction Tracking',
      description:
        'Remote sites with limited connectivity send voice notes when back in range. The agent processes them into daily reports without requiring real-time internet.',
    },
    {
      industry: 'Facilities',
      title: 'Building Maintenance Daily Rounds',
      description:
        'Maintenance supervisors record rounds as voice notes. The agent creates structured maintenance logs with equipment status, issues found, and actions taken.',
    },
    {
      industry: 'Property',
      title: 'Fit-Out Progress Reporting',
      description:
        'Fit-out contractors on commercial projects send daily updates from tenant spaces. Reports auto-file to the landlord-facing SharePoint library for client review.',
    },
  ],

  technologies: [
    'Microsoft Teams',
    'Copilot Studio',
    'Azure Speech Services',
    'Power Automate',
    'SharePoint Online',
    'Microsoft Graph API',
    'Azure OpenAI Service',
    'Dataverse for Teams',
    'Power BI',
    'Microsoft Entra ID',
  ],

  benefits: [
    {
      title: 'Zero Learning Curve',
      description:
        'Supervisors use the Teams app they already have on their phone. No new software to install, no additional logins, no training sessions required.',
    },
    {
      title: 'Reports in Minutes, Not Hours',
      description:
        'A 60-second voice note replaces 30 to 45 minutes of typing. Reports are filed before the supervisor leaves the site.',
    },
    {
      title: 'Consistent Quality Across Sites',
      description:
        'Every report follows the same template with the same data fields, eliminating variation between different supervisors and project teams.',
    },
    {
      title: 'Instant Project Visibility',
      description:
        'Project managers see daily reports as soon as they are filed — no waiting for end-of-week summaries or chasing missing submissions.',
    },
    {
      title: 'Full Audit Trail',
      description:
        'Timestamps, author attribution, and version history in SharePoint create a defensible record for audits, disputes, and client reviews.',
    },
    {
      title: 'Sub-30-Day Deployment',
      description:
        'Installed directly via Teams App package or AppSource. No enterprise ERP integration required — pilot to contract conversion in under 30 days.',
    },
  ],

  faqs: [
    {
      q: 'How does the agent understand construction terminology?',
      a: 'Azure Speech Services is configured with a custom vocabulary for construction terms, trade names, and location references. We pre-train the model on your project-specific terminology during setup.',
    },
    {
      q: 'Does this require an enterprise Teams licence?',
      a: 'The solution works with Microsoft 365 Business or Enterprise licences that include Teams. No additional Copilot licence is required for basic voice transcription and report generation.',
    },
    {
      q: 'Can supervisors add photos to the report?',
      a: 'Yes. Supervisors can attach photos to the Teams message. The agent incorporates them into the report with captions based on the voice description.',
    },
    {
      q: 'What happens if a supervisor sends an incomplete voice note?',
      a: 'The agent flags missing fields (e.g., headcount, weather) and sends a follow-up message in Teams requesting the omitted information before finalising the report.',
    },
  ],
};

export default function TeamsSiteLogCopilotPage() {
  return <SubservicePageLayout data={data} />;
}
