import type { Metadata } from 'next';
import SubservicePageLayout, {
  type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
  title: 'Offline Site Punch-List & Safety Power App | AI Photo Tagging | aibizmod',
  description:
    'Offline-first Power App for field punch-list and safety inspections with AI-assisted photo tagging. Replace dedicated field software with an app running inside your existing Teams licence.',
  keywords: [
    'Power App field inspection',
    'offline punch list app',
    'safety inspection Power Apps',
    'AI photo tagging construction',
    'site snagging app',
    'Dataverse for Teams',
    'Power Automate adaptive cards',
    'Azure AI Vision inspection',
    'construction field app',
    'offline-first Power App',
  ],
  alternates: {
    canonical: 'https://aibizmod.com/services/microsoft-stack/field-punchlist-safety-power-app',
  },
  openGraph: {
    title: 'Field Punch-List & Safety Power App | aibizmod',
    description:
      'Replace dedicated $10/user/month punch-list apps with an AI-assisted field app running inside your existing Teams licence.',
    url: '/services/microsoft-stack/field-punchlist-safety-power-app',
  },
};

const data: SubservicePageData = {
  name: 'Field Punch-List & Safety Power App',
  parentName: 'Microsoft Stack & Copilot',
  parentSlug: 'microsoft-stack',
  slug: 'field-punchlist-safety-power-app',
  tagline:
    'Contractors resent paying third-party SaaS fees for simple field snagging. Engineers take photos in basements without cellular connectivity; Azure AI Vision tags the defect type, and Power Automate routes adaptive cards to subcontractors upon reconnection.',
  heroImage:
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=80&auto=format&fit=crop',

  solves: {
    challenge:
      'Field teams pay $10 or more per user per month for dedicated punch-list and safety apps. These tools sit outside the Microsoft ecosystem, create data silos, and duplicate functionality that could run inside Teams.',
    challengePoints: [
      'Per-user SaaS fees for simple field inspection and snagging tools',
      'Data trapped in third-party platforms, not connected to project SharePoint',
      'No offline capability in areas with poor cellular connectivity',
      'Manual photo tagging and defect classification in the field',
    ],
    solution:
      'We build an offline-first Canvas Power App that runs inside Dataverse for Teams. Field teams capture photos, record defects, and complete safety checklists — even without connectivity. Azure AI Vision auto-tags defect types, and Power Automate routes adaptive cards to subcontractors when the device reconnects.',
    solutionPoints: [
      'Offline-first Canvas App running inside Dataverse for Teams',
      'Azure AI Vision auto-tags defect type from photos (exposed rebar, paint spalling, etc.)',
      'Power Automate routes adaptive cards to subcontractors on reconnection',
      'Zero additional licensing — runs on standard M365 E3/E5 seats',
    ],
  },

  capabilities: [
    {
      icon: 'smartphone',
      title: 'Offline-First Data Capture',
      description:
        'The Canvas App stores data locally on the device when connectivity is unavailable. Photos, notes, and checklist responses are queued and synced automatically when the connection returns.',
      image: '/services/microsoft-stack/field-punchlist-safety-power-app-offline-capture.webp',
      imageAlt: 'Microsoft Stack Field Punch-List Safety Power App offline-first data capture capability illustration.',
    },
    {
      icon: 'eye',
      title: 'AI Photo Defect Tagging',
      description:
        'Azure AI Vision analyses site photos and automatically tags the defect type — exposed rebar, paint spalling, cracked tiles, misaligned fixtures — reducing manual classification.',
      image: '/services/microsoft-stack/field-punchlist-safety-power-app-ai-photo-tagging.webp',
      imageAlt: 'Microsoft Stack Field Punch-List Safety Power App AI photo defect tagging capability illustration.',
    },
    {
      icon: 'bell',
      title: 'Adaptive Card Routing',
      description:
        'Power Automate sends adaptive cards to the responsible subcontractor via Teams when the device reconnects, with the photo, defect description, location, and priority attached.',
      image: '/services/microsoft-stack/field-punchlist-safety-power-app-adaptive-cards.webp',
      imageAlt: 'Microsoft Stack Field Punch-List Safety Power App adaptive card routing capability illustration.',
    },
    {
      icon: 'checkCircle',
      title: 'Safety Checklist Templates',
      description:
        'Pre-configured safety inspection checklists for different site areas — scaffolding, electrical, confined spaces — with mandatory photo evidence and sign-off requirements.',
      image: '/services/microsoft-stack/field-punchlist-safety-power-app-safety-checklists.webp',
      imageAlt: 'Microsoft Stack Field Punch-List Safety Power App safety checklist templates capability illustration.',
    },
    {
      icon: 'barChart',
      title: 'Progress Dashboard',
      description:
        'A Power BI dashboard shows open items by area, priority, subcontractor, and age — giving project managers real-time visibility into snagging and safety closure rates.',
      image: '/services/microsoft-stack/field-punchlist-safety-power-app-progress-dashboard.webp',
      imageAlt: 'Microsoft Stack Field Punch-List Safety Power App progress dashboard capability illustration.',
    },
    {
      icon: 'cloud',
      title: 'SharePoint Integration',
      description:
        'All captured data — photos, defect records, safety checklists — flows into SharePoint document libraries and lists, creating a unified project record without data silos.',
      image: '/services/microsoft-stack/field-punchlist-safety-power-app-sharepoint-integration.webp',
      imageAlt: 'Microsoft Stack Field Punch-List Safety Power App SharePoint integration capability illustration.',
    },
  ],

  useCases: [
    {
      industry: 'Construction',
      title: 'Pre-Handover Snagging Inspections',
      description:
        'Inspectors walk through units before handover, photographing defects. AI tags each issue by type, and adaptive cards route them to the responsible subcontractor for rectification.',
    },
    {
      industry: 'Construction',
      title: 'Scaffolding Safety Inspections',
      description:
        'Safety officers inspect scaffolding using a pre-configured checklist. Photos of any issues are auto-tagged and routed to the scaffolding contractor with priority assigned.',
    },
    {
      industry: 'Infrastructure',
      title: 'Tunnel Inspection Reporting',
      description:
        'Inspectors in underground tunnels with no cellular connectivity capture photos and observations offline. Data syncs automatically when they reach the surface.',
    },
    {
      industry: 'Energy',
      title: 'Wind Turbine Base Inspections',
      description:
        'Technicians inspect turbine foundations in remote locations. Offline capture ensures no data loss, and AI tagging identifies common defect patterns across the wind farm.',
    },
    {
      industry: 'Property',
      title: 'Common Area Maintenance Walks',
      description:
        'Facilities teams conduct weekly common area inspections. The app guides them through a checklist and auto-generates work orders for maintenance items found.',
    },
    {
      industry: 'Manufacturing',
      title: 'Factory Floor Safety Audits',
      description:
        'Safety officers audit production areas using standardised checklists. Defect photos are tagged by type, and corrective action requests are routed to maintenance teams.',
    },
  ],

  technologies: [
    'Power Apps Canvas',
    'Dataverse for Teams',
    'Azure AI Vision',
    'Power Automate',
    'SharePoint Online',
    'Microsoft Teams',
    'Power BI',
    'Microsoft Entra ID',
    'Microsoft Graph API',
    'OneDrive for Business',
  ],

  benefits: [
    {
      title: 'Zero Per-User Licensing Fees',
      description:
        'Runs on standard M365 E3/E5 licences with Dataverse for Teams included. No additional per-user SaaS fees — eliminating the $10+/user/month cost of dedicated field apps.',
    },
    {
      title: 'Works Without Connectivity',
      description:
        'Offline-first design means field teams can capture data in basements, tunnels, and remote sites without cellular connectivity. Data syncs automatically on reconnection.',
    },
    {
      title: 'AI-Assisted Defect Classification',
      description:
        'Azure AI Vision auto-tags defect types from photos, reducing the time inspectors spend manually categorising issues and improving consistency across the team.',
    },
    {
      title: 'Instant Subcontractor Notification',
      description:
        'Adaptive cards route directly to the responsible subcontractor via Teams, with photos, location, and priority — no email chains or phone calls required.',
    },
    {
      title: 'Unified Project Record',
      description:
        'All data flows to SharePoint, creating a single source of truth for punch-list items, safety inspections, and closure records — no data silos.',
    },
    {
      title: 'Deployed in Days, Not Months',
      description:
        'Built on Dataverse for Teams with no external infrastructure required. Typical deployment from scoping to field use is two to three weeks.',
    },
  ],

  faqs: [
    {
      q: 'How much data can the app store offline?',
      a: 'Dataverse for Teams provides 10GB of storage per team. A typical punch-list inspection with 50 photos uses approximately 100-200MB, so a single team can store hundreds of inspections offline before syncing.',
    },
    {
      q: 'What happens if the AI misidentifies a defect?',
      a: 'The AI provides a suggested tag that the inspector can accept or override. All classifications are logged, so you can track accuracy and improve the model over time.',
    },
    {
      q: 'Can we customise the safety checklists?',
      a: 'Yes. Checklists are configurable in Power Apps. We provide standard templates during deployment, and your team can modify them as requirements change without developer involvement.',
    },
    {
      q: 'Does this replace our existing punch-list software?',
      a: 'Yes. The app is designed as a direct replacement for third-party punch-list and safety inspection tools, with the added benefit of running inside your existing Microsoft ecosystem.',
    },
  ],
};

export default function FieldPunchlistSafetyPowerAppPage() {
  return <SubservicePageLayout data={data} />;
}
