import type { Metadata } from 'next';
import SubservicePageLayout, {
  type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
  title: 'Outlook & Word RFI Copilot Agent | Spec Compliance Drafting | aibizmod',
  description:
    'Outlook and Word Copilot agent that drafts RFI responses and spec compliance reviews in 90 seconds by cross-referencing submittals against your project specification library.',
  keywords: [
    'Outlook RFI Copilot',
    'Word spec compliance',
    'RFI response automation',
    'submittal drafting',
    'Microsoft 365 Copilot',
    'Azure OpenAI RFI',
    'project engineering automation',
    'spec clause citation',
    'Outlook add-in construction',
    'document intelligence RFI',
  ],
  alternates: {
    canonical: 'https://aibizmod.com/services/microsoft-stack/outlook-rfi-copilot',
  },
  openGraph: {
    title: 'Outlook & Word RFI Copilot | aibizmod',
    description:
      'Draft RFI responses and spec compliance reviews directly inside Outlook and Word in 90 seconds.',
    url: '/services/microsoft-stack/outlook-rfi-copilot',
  },
};

const data: SubservicePageData = {
  name: 'Outlook & Word RFI Copilot',
  parentName: 'Microsoft Stack & Copilot',
  parentSlug: 'microsoft-stack',
  slug: 'outlook-rfi-copilot',
  tagline:
    'Project engineers spend 40% of their day in Outlook. When a subcontractor emails an RFI or submittal, the agent cross-references the attached PDF against the project specification library stored in SharePoint and auto-drafts the formal technical response with exact clause citations.',
  heroImage:
    'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1000&q=80&auto=format&fit=crop',

  solves: {
    challenge:
      'Project engineers spend hours manually searching through specification documents to find the correct clauses for each RFI response. A single RFI can take 30 to 60 minutes of cross-referencing, drafting, and formatting before it is ready to send.',
    challengePoints: [
      'Engineers reading through hundreds of pages of spec documents per RFI',
      'Inconsistent response formats across different team members',
      'Missed clause citations leading to weak or incomplete responses',
      'Days of turnaround time on RFIs that clients track as project delays',
    ],
    solution:
      'We deploy a Copilot Studio agent inside Outlook and Word that reads the incoming RFI email and attachment, searches the SharePoint specification library, identifies relevant clauses, and drafts a complete technical response with exact citations — in 90 seconds.',
    solutionPoints: [
      'Azure AI Document Intelligence reads and parses PDF submittals',
      'Azure AI Search performs hybrid vector and semantic search across specs',
      'Auto-drafted responses include exact clause numbers and cross-references',
      'Word add-in formats the response to your project template standards',
    ],
  },

  capabilities: [
    {
      icon: 'mail',
      title: 'Inbox RFI Detection',
      description:
        'The agent monitors a designated Outlook folder or shared mailbox, detects incoming RFI and submittal emails, and extracts the attached documents for processing.',
      image: '/services/microsoft-stack/outlook-rfi-copilot-inbox-detection.webp',
      imageAlt: 'Microsoft Stack Outlook RFI Copilot inbox detection capability illustration.',
    },
    {
      icon: 'search',
      title: 'Spec Library Search',
      description:
        'Azure AI Search indexes your SharePoint specification library with hybrid vector and semantic re-ranking to find the most relevant clauses for each RFI topic.',
      image: '/services/microsoft-stack/outlook-rfi-copilot-spec-search.webp',
      imageAlt: 'Microsoft Stack Outlook RFI Copilot spec library search capability illustration.',
    },
    {
      icon: 'fileText',
      title: 'Auto-Drafted Responses',
      description:
        'Azure OpenAI generates a structured technical response that references specific clause numbers, quotes relevant text, and follows your standard response format.',
      image: '/services/microsoft-stack/outlook-rfi-copilot-auto-draft.webp',
      imageAlt: 'Microsoft Stack Outlook RFI Copilot auto-drafted response capability illustration.',
    },
    {
      icon: 'sparkles',
      title: 'Word Template Formatting',
      description:
        'The drafted response is formatted into your project Word template with headers, clause references, and signature blocks — ready for engineer review and send.',
      image: '/services/microsoft-stack/outlook-rfi-copilot-word-formatting.webp',
      imageAlt: 'Microsoft Stack Outlook RFI Copilot Word template formatting capability illustration.',
    },
    {
      icon: 'users',
      title: 'Multi-Engineer Routing',
      description:
        'RFIs are automatically routed to the responsible engineer based on discipline or specification section, with Teams notifications for review and approval.',
      image: '/services/microsoft-stack/outlook-rfi-copilot-routing.webp',
      imageAlt: 'Microsoft Stack Outlook RFI Copilot multi-engineer routing capability illustration.',
    },
    {
      icon: 'shield',
      title: 'Citation Verification',
      description:
        'Every drafted response includes clickable links back to the source specification clause, so engineers can verify accuracy before sending to the client.',
      image: '/services/microsoft-stack/outlook-rfi-copilot-citation-verify.webp',
      imageAlt: 'Microsoft Stack Outlook RFI Copilot citation verification capability illustration.',
    },
  ],

  useCases: [
    {
      industry: 'Construction',
      title: 'Subcontractor RFI Response Drafting',
      description:
        'A mechanical subcontractor emails an RFI about ductwork routing. The agent finds the relevant HVAC spec sections, extracts the clause requirements, and drafts a response citing sections 15.3.2 and 15.4.1.',
    },
    {
      industry: 'Construction',
      title: 'Material Submittal Compliance Review',
      description:
        'A supplier submits a product data sheet. The agent compares it against the specification requirements and drafts a compliance matrix highlighting conformance and exceptions.',
    },
    {
      industry: 'Infrastructure',
      title: 'Design Clarification Requests',
      description:
        'Contractors submit design clarification requests via email. The agent cross-references the design intent documentation and drafts responses with exact drawing references.',
    },
    {
      industry: 'Energy',
      title: 'Equipment Spec Compliance Checks',
      description:
        'When procuring major equipment, the agent compares vendor datasheets against project specifications and flags deviations before the procurement team issues the purchase order.',
    },
    {
      industry: 'Property',
      title: 'Tenant Fit-Out Specification Queries',
      description:
        'Tenants submit queries about fit-out specifications. The agent searches the lease agreement and fit-out guide to draft responses with the relevant clauses.',
    },
    {
      industry: 'Legal',
      title: 'Contract Clause Reference lookups',
      description:
        'Legal teams receive queries about contract terms. The agent searches the contract library and drafts responses with exact clause citations and cross-references.',
    },
  ],

  technologies: [
    'Microsoft 365 Copilot Studio',
    'Azure OpenAI Service',
    'Azure AI Document Intelligence',
    'Azure AI Search',
    'Microsoft Graph API',
    'SharePoint Online',
    'Microsoft Word',
    'Microsoft Outlook',
    'Dataverse for Teams',
    'Microsoft Entra ID',
  ],

  benefits: [
    {
      title: '90-Second RFI Turnaround',
      description:
        'What used to take 30 to 60 minutes of manual research and drafting now takes 90 seconds from email receipt to draft response.',
    },
    {
      title: 'Accurate Clause Citations',
      description:
        'Every response references specific specification clause numbers with direct links, eliminating the risk of misquoting or omitting requirements.',
    },
    {
      title: 'Consistent Response Quality',
      description:
        'All responses follow the same format, tone, and structure regardless of which engineer is drafting — critical for client-facing documents.',
    },
    {
      title: 'Zero Context Switching',
      description:
        'Engineers stay inside Outlook and Word — no switching to a separate RFI management tool. The agent works where they already work.',
    },
    {
      title: 'Reduced Response Backlog',
      description:
        'Teams clear their RFI queue faster, reducing the project delay risk that clients track and improving the overall response rate metric.',
    },
    {
      title: 'Instant Add-in Deployment',
      description:
        'Deployed across the organisation via Microsoft 365 Admin Center. No separate software installation — the add-in appears in Outlook and Word automatically.',
    },
  ],

  faqs: [
    {
      q: 'How does the agent access our specification library?',
      a: 'We index your SharePoint document libraries using Azure AI Search with hybrid vector and semantic re-ranking. The agent searches this index at query time to find the most relevant clauses.',
    },
    {
      q: 'Can the agent handle RFIs that reference multiple specification sections?',
      a: 'Yes. The agent identifies all relevant sections across different specification divisions and compiles them into a single structured response with citations from each relevant clause.',
    },
    {
      q: 'Do engineers need to review every response before sending?',
      a: 'We recommend a review step, especially during the initial rollout. The agent drafts the response; the engineer verifies the citations and adjusts any technical details before sending.',
    },
    {
      q: 'What file formats can the agent read from incoming RFIs?',
      a: 'Azure AI Document Intelligence supports PDF, Word, Excel, and image formats. The agent can extract text and data from almost any attachment format used in construction correspondence.',
    },
  ],
};

export default function OutlookRfiCopilotPage() {
  return <SubservicePageLayout data={data} />;
}
