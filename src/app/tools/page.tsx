import type { Metadata } from 'next';
import ToolsPageContent from '@/components/tools/ToolsPageContent';

export const metadata: Metadata = {
  title: 'Free AI & Business Tools | aibizmod',
  description:
    'Free online tools to audit your AI visibility, measure automation ROI, and optimize your digital presence. No signup required.',
  keywords: [
    'free AI tools',
    'AI visibility checker',
    'automation ROI calculator',
    'business tools online',
    'AI audit tool',
    'digital presence checker',
  ],
  alternates: { canonical: 'https://aibizmod.com/tools' },
  openGraph: {
    title: 'Free AI & Business Tools | aibizmod',
    description:
      'Free online tools to audit your AI visibility, measure automation ROI, and optimize your digital presence.',
    url: '/tools',
  },
};

export default function ToolsPage() {
  return <ToolsPageContent />;
}
