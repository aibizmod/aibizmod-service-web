import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ChevronRight, BookOpen, Cpu, Scale, type LucideIcon } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StickyFooterLayout from '@/components/layout/StickyFooterLayout';
import AnimatedSection from '@/components/common/AnimatedSection';
import SectionHeading from '@/components/common/SectionHeading';
import ShaderBackground from '@/components/ui/shader-background';
import { topicHubs, getTopicHub } from '@/data/topics';

interface TopicDetailPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return topicHubs.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: TopicDetailPageProps): Metadata {
  const hub = getTopicHub(params.slug);
  if (!hub) return { title: 'Topic not found' };
  return {
    title: hub.title,
    description: hub.excerpt,
    alternates: { canonical: `https://aibizmod.com/topics/${hub.slug}` },
    openGraph: {
      title: `${hub.title} | aibizmod`,
      description: hub.excerpt,
      url: `/topics/${hub.slug}`,
    },
  };
}

const icons: Record<string, LucideIcon> = {
  'geo-for-service-businesses': BookOpen,
  'business-automation': Cpu,
  'web-software-buying-decisions': Scale,
};

const typeColors: Record<string, string> = {
  guide: 'bg-purple-50 text-purple-700 border-purple-200',
  service: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  comparison: 'bg-amber-50 text-amber-700 border-amber-200',
  checklist: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  blog: 'bg-blue-50 text-blue-700 border-blue-200',
  template: 'bg-rose-50 text-rose-700 border-rose-200',
};

export default function TopicDetailPage({ params }: TopicDetailPageProps) {
  const hub = getTopicHub(params.slug);
  if (!hub) notFound();

  const Icon = icons[hub.slug] || BookOpen;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    headline: hub.title,
    description: hub.excerpt,
    url: `https://aibizmod.com/topics/${hub.slug}`,
  };

  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

          <section className="relative isolate overflow-hidden px-6 pb-16 pt-32 md:pb-20 md:pt-36">
            <ShaderBackground className="absolute inset-0 z-0 h-full w-full opacity-80" />
            <div className="pointer-events-none absolute left-1/2 top-24 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-4xl">
              <nav className="mb-8 inline-flex flex-wrap items-center gap-1.5 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-[13px] text-slate-500 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md" aria-label="Breadcrumb">
                <Link href="/" className="transition-colors hover:text-[#0F172A]">Home</Link>
                <ChevronRight size={13} className="shrink-0 text-cyan-300" aria-hidden="true" />
                <Link href="/topics" className="transition-colors hover:text-[#0F172A]">Topics</Link>
                <ChevronRight size={13} className="shrink-0 text-cyan-300" aria-hidden="true" />
                <span className="font-medium text-[#0F172A]" aria-current="page">{hub.title}</span>
              </nav>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-100 bg-cyan-50 text-cyan-700">
                  <Icon size={18} />
                </div>
                <span className="text-sm font-medium text-cyan-700">Topic Hub</span>
              </div>

              <h1 className="font-display font-thin text-[#0F172A] text-balance" style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', lineHeight: 1.08 }}>
                {hub.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-500 max-w-3xl">
                {hub.summary}
              </p>
            </div>
          </section>

          {/* Core page */}
          <section className="px-6 py-12 bg-[#F8FEFF] border-y border-cyan-100">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <SectionHeading eyebrow="Start here" heading="Core Resource" centered />
                <p className="mt-4 text-slate-500 text-center max-w-2xl mx-auto text-sm">
                  This is the primary page for this topic — start here to understand the fundamentals.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.08} className="mt-8">
                <Link
                  href={hub.corePage.href}
                  className="group block rounded-2xl border-2 border-cyan-200 bg-white p-6 shadow-[0_12px_32px_rgba(8,145,178,0.08)] transition hover:border-cyan-400 hover:shadow-[0_16px_48px_rgba(8,145,178,0.14)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border ${typeColors[hub.corePage.type]}`}>
                          {hub.corePage.type}
                        </span>
                      </div>
                      <h2 className="font-display font-semibold text-[#0F172A] text-lg leading-snug group-hover:text-cyan-700 transition-colors">
                        {hub.corePage.title}
                      </h2>
                      <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                        {hub.corePage.description}
                      </p>
                    </div>
                    <ArrowLeft size={20} className="mt-1 shrink-0 text-cyan-500 rotate-180 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </AnimatedSection>
            </div>
          </section>

          {/* Supporting assets */}
          <section className="px-6 py-16 bg-white">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <SectionHeading eyebrow="Dive deeper" heading={`${hub.supportingAssets.length} Supporting Resources`} centered />
              </AnimatedSection>

              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {hub.supportingAssets.map((asset, i) => (
                  <AnimatedSection key={i} delay={i * 0.05}>
                    <Link href={asset.href} className="group block h-full">
                      <div className="h-full rounded-xl border border-cyan-100/80 bg-white/70 p-5 shadow-[0_8px_24px_rgba(59,130,246,0.06)] transition hover:border-cyan-200 hover:shadow-[0_12px_36px_rgba(8,145,178,0.10)]">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold border mb-3 ${typeColors[asset.type]}`}>
                          {asset.type}
                        </span>
                        <h3 className="font-display font-semibold text-[#0F172A] text-sm leading-snug group-hover:text-cyan-700 transition-colors">
                          {asset.title}
                        </h3>
                        <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                          {asset.description}
                        </p>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            <AnimatedSection delay={0.12} className="mt-12 text-center">
              <Link
                href="/topics"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-[0_12px_32px_rgba(15,23,42,0.08)] transition hover:border-cyan-200 hover:bg-cyan-50"
              >
                <ArrowLeft size={16} />
                All Topics
              </Link>
            </AnimatedSection>
          </section>
        </main>
      </StickyFooterLayout>
    </>
  );
}
