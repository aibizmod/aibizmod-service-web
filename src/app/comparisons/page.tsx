import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StickyFooterLayout from '@/components/layout/StickyFooterLayout';
import AnimatedSection from '@/components/common/AnimatedSection';
import SectionHeading from '@/components/common/SectionHeading';
import { comparisons } from '@/data/comparisons';

export const metadata: Metadata = {
  title: 'Software & Technology Comparisons | aibizmod',
  description: 'Compare custom software vs SaaS, native vs cross-platform apps, automation platforms vs custom workflows, and more — with decision rules and limitations.',
  alternates: { canonical: 'https://aibizmod.com/comparisons' },
  openGraph: {
    title: 'Software & Technology Comparisons | aibizmod',
    description: 'Evidence-led comparisons to help you make better technology decisions for your business.',
    url: '/comparisons',
  },
};

export default function ComparisonsPage() {
  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink">
          <section className="relative isolate overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-36">
            <div className="pointer-events-none absolute left-1/2 top-24 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-7xl">
              <AnimatedSection className="text-center">
                <SectionHeading eyebrow="Comparisons" heading="Technology Decisions, Compared" centered />
                <p className="mt-6 text-lg leading-relaxed text-slate-500 max-w-2xl mx-auto">
                  Evidence-led comparisons covering build vs buy, platform choice, and architecture decisions — with clear decision rules and limitations so you can choose with confidence.
                </p>
              </AnimatedSection>

              <div className="mt-16 grid gap-8 md:grid-cols-2">
                {comparisons.map((c, i) => (
                  <AnimatedSection key={c.slug} delay={i * 0.08}>
                    <Link href={`/comparisons/${c.slug}`} className="group block">
                      <div className="h-full rounded-[24px] border border-cyan-100/80 bg-white/75 p-6 shadow-[0_18px_55px_rgba(59,130,246,0.09)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_24px_70px_rgba(8,145,178,0.14)]">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex gap-2">
                            <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 border border-cyan-100">
                              {c.optionA}
                            </span>
                            <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200">
                              vs
                            </span>
                            <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 border border-cyan-100">
                              {c.optionB}
                            </span>
                          </div>
                          <ArrowRight size={18} className="text-cyan-500 transition-transform group-hover:translate-x-1" />
                        </div>
                        <h2 className="font-display font-semibold text-[#0F172A] text-lg leading-snug mb-3">
                          {c.title}
                        </h2>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          {c.excerpt}
                        </p>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        </main>
      </StickyFooterLayout>
    </>
  );
}
