import type { Metadata } from 'next';
import IndustriesPageContent from './IndustriesPageContent';

export const metadata: Metadata = {
  title: 'Industries We Serve — Technology Solutions & Custom Systems | aibizmod',
  description: 'Tailored technology architectures for retail, finance, healthcare, SaaS, manufacturing, and 15+ industry verticals. Custom software, AI automation, and digital platforms engineered for enterprise growth.',
  alternates: { canonical: 'https://aibizmod.com/industries' },
  openGraph: {
    title: 'Industries We Serve — Technology Solutions & Custom Systems | aibizmod',
    description: 'Tailored technology architectures for retail, finance, healthcare, SaaS, manufacturing, and 15+ industry verticals. Custom software, AI automation, and digital platforms engineered for enterprise growth.',
    url: 'https://aibizmod.com/industries',
    type: 'website',
  },
};

export default function IndustriesPage() {
  return <IndustriesPageContent />;
}
