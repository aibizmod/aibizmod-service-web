import type { Metadata } from 'next';
import KeywordResearchContent from '@/components/keywords/KeywordResearchContent';

export const metadata: Metadata = {
  title: 'Keyword Research Tool — Find Long-Tail Keywords for Free | aibizmod',
  description:
    'Free keyword research tool. Enter a seed keyword to expand it into long-tail variants via Google autocomplete, grouped by intent. No signup, no API key, export to CSV.',
  keywords: [
    'keyword research tool',
    'free keyword finder',
    'long-tail keywords',
    'SEO keyword tool',
    'Google autocomplete keywords',
    'find keywords free',
    'keyword clustering',
    'long-tail keyword research',
  ],
  alternates: { canonical: 'https://aibizmod.com/keywords' },
  openGraph: {
    title: 'Keyword Research Tool | aibizmod',
    description:
      'Expand a seed keyword into dozens of long-tail variants via Google autocomplete, grouped by intent — free, no signup, no API key.',
    url: '/keywords',
  },
};

export default function KeywordsPage() {
  return <KeywordResearchContent />;
}
