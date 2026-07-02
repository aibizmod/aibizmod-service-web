import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Cpu, Scale, type LucideIcon } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StickyFooterLayout from '@/components/layout/StickyFooterLayout';
import AnimatedSection from '@/components/common/AnimatedSection';
import SectionHeading from '@/components/common/SectionHeading';
import { topicHubs } from '@/data/topics';

export const metadata: Metadata = {
  title: 'Topic Hubs | aibizmod',
  description: 'Explore in-depth topic hubs covering generative engine optimisation, business automation, and web and software buying decisions.',
  alternates: { canonical: 'https://aibizmod.com/topics' },
  openGraph: {
    title: 'Topic Hubs | aibizmod',
    description: 'Curated resources and guides organised by topic to help you make better technology decisions.',
    url: '/topics',
  },
};

const icons: Record<string, LucideIcon> = {
  'geo-for-service-businesses': BookOpen,
  'business-automation': Cpu,
  'web-software-buying-decisions': Scale,
};

export default function TopicsPage() {
  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink">
          <section className="relative isolate overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-36">
            <div className="pointer-events-none absolute left-1/2 top-24 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-7xl">
              <AnimatedSection className="text-center">
                <SectionHeading eyebrow="Topic Hubs" heading="Explore by Topic" centered />
                <p className="mt-6 text-lg leading-relaxed text-slate-500 max-w-2xl mx-auto">
                  Curated collections of guides, comparisons, and services organised around the technology decisions that matter most to your business.
                </p>
              </AnimatedSection>

              <div className="mt-16 grid gap-8 md:grid-cols-3">
                {topicHubs.map((hub, i) => {
                  const Icon = icons[hub.slug] || BookOpen;
                  return (
                    <AnimatedSection key={hub.slug} delay={i * 0.08}>
                      <Link href={`/topics/${hub.slug}`} className="group block h-full">
                        <div className="flex h-full flex-col rounded-[24px] border border-cyan-100/80 bg-white/75 p-6 shadow-[0_18px_55px_rgba(59,130,246,0.09)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_24px_70px_rgba(8,145,178,0.14)]">
                          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-100 bg-cyan-50 text-cyan-700 shadow-[0_12px_28px_rgba(8,145,178,0.10)]">
                            <Icon size={19} aria-hidden="true" />
                          </div>
                          <h2 className="font-display font-semibold text-[#0F172A] text-lg leading-snug mb-3">
                            {hub.title}
                          </h2>
                          <p className="text-sm text-slate-500 leading-relaxed flex-1">
                            {hub.excerpt}
                          </p>
                          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-cyan-700">
                            {hub.supportingAssets.length} resources
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </Link>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      </StickyFooterLayout>
    </>
  );
}
