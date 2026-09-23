import type { Metadata } from 'next';
import SubservicePageLayout, {
  type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
  title: 'Spec & Drawing Compliance Power App | Delta Comparison | aibizmod',
  description:
    'Standalone Power App that compares specification and drawing revisions, generating colour-coded delta reports and compliance matrices before signing change orders.',
  keywords: [
    'Power App compliance',
    'spec comparison tool',
    'drawing delta checker',
    'compliance matrix Power Apps',
    'specification revision comparison',
    'change order verification',
    'Azure AI Search compliance',
    'construction spec validator',
    'QA QC Power App',
    'drawing review automation',
  ],
  alternates: {
    canonical: 'https://aibizmod.com/services/microsoft-stack/spec-compliance-power-app',
  },
  openGraph: {
    title: 'Spec & Drawing Compliance Power App | aibizmod',
    description:
      'Drag Rev C, Rev D, and your tender spec into Power Apps. Get a colour-coded delta and compliance matrix before signing the change order.',
    url: '/services/microsoft-stack/spec-compliance-power-app',
  },
};

const data: SubservicePageData = {
  name: 'Spec & Drawing Compliance Power App',
  parentName: 'Microsoft Stack & Copilot',
  parentSlug: 'microsoft-stack',
  slug: 'spec-compliance-power-app',
  tagline:
    'Functions as an isolated "drop-and-run" utility for estimators and QA/QC consultants. Users simply drag and drop PDFs into a browser UI authenticated via Microsoft Entra ID. It requires no continuous data access or database schema mapping.',
  heroImage:
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1000&q=80&auto=format&fit=crop',

  solves: {
    challenge:
      'Estimators and QA/QC consultants manually compare specification revisions page by page, searching for changes between versions. This process takes hours, misses subtle wording changes, and creates risk when signing change orders without full visibility.',
    challengePoints: [
      'Manual page-by-page comparison of 200+ page spec documents',
      'Subtle wording changes missed during visual review',
      'No structured record of what changed between revisions',
      'Change orders signed without full compliance visibility',
    ],
    solution:
      'We build a standalone Power App that lets users drag and drop two spec revisions or drawing sets. Azure AI Search and OpenAI compare the documents, highlight changes with colour-coded deltas, and generate a compliance matrix showing which requirements are affected.',
    solutionPoints: [
      'Drag-and-drop PDF upload with Microsoft Entra ID authentication',
      'AI-powered document comparison with clause-level change detection',
      'Colour-coded delta report showing additions, deletions, and modifications',
      'Compliance matrix linking changes to relevant specification sections',
    ],
  },

  capabilities: [
    {
      icon: 'search',
      title: 'Document Upload and Parsing',
      description:
        'Users drag and drop two PDF revisions into the Power App. Azure AI Document Intelligence extracts text, tables, and clause structures from both documents.',
      image: '/services/microsoft-stack/spec-compliance-power-app-upload.webp',
      imageAlt: 'Microsoft Stack Spec Compliance Power App document upload capability illustration.',
    },
    {
      icon: 'layers',
      title: 'Clause-Level Comparison',
      description:
        'The AI compares documents at the clause level, identifying additions, deletions, and modifications with precise location references in both revisions.',
      image: '/services/microsoft-stack/spec-compliance-power-app-clause-comparison.webp',
      imageAlt: 'Microsoft Stack Spec Compliance Power App clause-level comparison capability illustration.',
    },
    {
      icon: 'fileText',
      title: 'Colour-Coded Delta Report',
      description:
        'Changes are presented in a colour-coded format: green for additions, red for deletions, yellow for modifications — making it easy to spot every difference at a glance.',
      image: '/services/microsoft-stack/spec-compliance-power-app-delta-report.webp',
      imageAlt: 'Microsoft Stack Spec Compliance Power App colour-coded delta report capability illustration.',
    },
    {
      icon: 'barChart',
      title: 'Compliance Matrix Generation',
      description:
        'The app generates a structured matrix mapping each change to the affected specification section, compliance status, and action required — ready for review meetings.',
      image: '/services/microsoft-stack/spec-compliance-power-app-matrix.webp',
      imageAlt: 'Microsoft Stack Spec Compliance Power App compliance matrix generation capability illustration.',
    },
    {
      icon: 'shield',
      title: 'Entra ID Authentication',
      description:
        'The app is secured with Microsoft Entra ID, ensuring only authorised team members can upload and compare sensitive project documents.',
      image: '/services/microsoft-stack/spec-compliance-power-app-entra-id.webp',
      imageAlt: 'Microsoft Stack Spec Compliance Power App Entra ID authentication capability illustration.',
    },
    {
      icon: 'rocket',
      title: 'Packaged Deployment',
      description:
        'Deployed as a packaged Power Apps solution file (.zip) in under an afternoon. No database schema mapping or continuous data access required.',
      image: '/services/microsoft-stack/spec-compliance-power-app-deployment.webp',
      imageAlt: 'Microsoft Stack Spec Compliance Power App packaged deployment capability illustration.',
    },
  ],

  useCases: [
    {
      industry: 'Construction',
      title: 'Change Order Verification Before Signing',
      description:
        'Before signing a change order, the project manager compares Rev C against Rev D to see exactly what changed. The delta report highlights every modification for informed decision-making.',
    },
    {
      industry: 'Construction',
      title: 'Tender Spec Compliance Check',
      description:
        'Estimators compare the tender specification against their baseline to identify new requirements or scope changes that affect pricing and scheduling.',
    },
    {
      industry: 'Infrastructure',
      title: 'Drawing Revision Comparison',
      description:
        'Design teams compare structural drawing revisions to identify reinforcement changes, dimension modifications, and detail updates across sets of drawings.',
    },
    {
      industry: 'Energy',
      title: 'Equipment Specification Updates',
      description:
        'Procurement teams compare vendor specification updates against the project requirements to verify that revised products still meet compliance standards.',
    },
    {
      industry: 'Property',
      title: 'Lease Agreement Comparison',
      description:
        'Legal teams compare draft lease terms against the previous version to identify clause modifications, new obligations, and changed financial terms.',
    },
    {
      industry: 'Manufacturing',
      title: 'Quality Standard Revision Tracking',
      description:
        'Quality teams compare updated ISO standard documents against the previous version to identify new compliance requirements and update internal procedures.',
    },
  ],

  technologies: [
    'Power Apps',
    'Azure AI Document Intelligence',
    'Azure AI Search',
    'Azure OpenAI',
    'OneDrive for Business',
    'Microsoft Entra ID',
    'Dataverse',
    'Power Automate',
    'SharePoint Online',
    'Microsoft Graph API',
  ],

  benefits: [
    {
      title: 'Hours Reduced to Minutes',
      description:
        'A comparison that takes a human several hours of page-by-page review is completed in minutes with AI-powered clause-level detection.',
    },
    {
      title: 'No Changes Missed',
      description:
        'The AI catches subtle wording changes, number modifications, and clause additions that are easy to miss during visual review of long documents.',
    },
    {
      title: 'Structured Change Record',
      description:
        'The delta report and compliance matrix create a documented record of every change identified — useful for audit trails and dispute resolution.',
    },
    {
      title: 'Zero Infrastructure Required',
      description:
        'Deployed as a packaged Power Apps solution. No server, no database schema, no continuous data access — just a .zip file installed in an afternoon.',
    },
    {
      title: 'Secure by Default',
      description:
        'Microsoft Entra ID authentication ensures only authorised personnel can upload and compare sensitive project documents.',
    },
    {
      title: 'Works on Any Device',
      description:
        'The Power App runs in any modern browser and on tablet devices, so estimators and QC consultants can compare documents from the office or the site.',
    },
  ],

  faqs: [
    {
      q: 'How large can the documents be?',
      a: 'Azure AI Document Intelligence handles documents up to 500 pages. For larger specification packages, we split them by division and compare sections in parallel.',
    },
    {
      q: 'Does the app store our documents permanently?',
      a: 'Documents are processed in memory and stored temporarily in your OneDrive for Business during comparison. They are automatically deleted after processing unless you choose to retain them.',
    },
    {
      q: 'Can it compare non-PDF documents?',
      a: 'Currently the app is optimised for PDF documents, which is the standard format for specifications and drawings. Word documents can be converted to PDF during upload.',
    },
    {
      q: 'How is this different from a simple diff tool?',
      a: 'Standard diff tools compare raw text character by character. Our AI understands document structure, clause hierarchy, and semantic meaning — it identifies when a requirement has been modified rather than just highlighting text differences.',
    },
  ],
};

export default function SpecCompliancePowerAppPage() {
  return <SubservicePageLayout data={data} />;
}
