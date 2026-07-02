import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StickyFooterLayout from '@/components/layout/StickyFooterLayout';
import AnimatedSection from '@/components/common/AnimatedSection';
import SectionHeading from '@/components/common/SectionHeading';
import ShaderBackground from '@/components/ui/shader-background';
import { comparisons, getComparison } from '@/data/comparisons';

interface ComparisonDetailPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: ComparisonDetailPageProps): Metadata {
  const c = getComparison(params.slug);
  if (!c) return { title: 'Comparison not found' };
  return {
    title: c.title,
    description: c.excerpt,
    alternates: { canonical: `https://aibizmod.com/comparisons/${c.slug}` },
    openGraph: {
      title: `${c.title} | aibizmod`,
      description: c.excerpt,
      url: `/comparisons/${c.slug}`,
    },
  };
}

export default function ComparisonDetailPage({ params }: ComparisonDetailPageProps) {
  const c = getComparison(params.slug);
  if (!c) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    description: c.excerpt,
    datePublished: c.date,
    author: {
      '@type': 'Organization',
      name: 'aibizmod',
      url: 'https://aibizmod.com',
    },
  };

  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

          {/* Hero */}
          <section className="relative isolate overflow-hidden px-6 pb-16 pt-32 md:pb-20 md:pt-36">
            <ShaderBackground className="absolute inset-0 z-0 h-full w-full opacity-80" />
            <div className="pointer-events-none absolute left-1/2 top-24 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-4xl">
              <nav className="mb-8 inline-flex flex-wrap items-center gap-1.5 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-[13px] text-slate-500 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md" aria-label="Breadcrumb">
                <Link href="/" className="transition-colors hover:text-[#0F172A]">Home</Link>
                <ChevronRight size={13} className="shrink-0 text-cyan-300" aria-hidden="true" />
                <Link href="/comparisons" className="transition-colors hover:text-[#0F172A]">Comparisons</Link>
                <ChevronRight size={13} className="shrink-0 text-cyan-300" aria-hidden="true" />
                <span className="font-medium text-[#0F172A]" aria-current="page">{c.title}</span>
              </nav>

              <h1 className="font-display font-thin text-[#0F172A] text-balance mt-6" style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', lineHeight: 1.08 }}>
                {c.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-500 max-w-3xl">
                {c.summary}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-sm text-slate-400">{c.date}</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 border border-cyan-100">
                  {c.optionA}
                </span>
                <span className="text-xs text-slate-400 font-medium">vs</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 border border-cyan-100">
                  {c.optionB}
                </span>
              </div>
            </div>
          </section>

          {/* Comparison table */}
          <section className="px-6 py-16 bg-[#F8FEFF] border-y border-cyan-100">
            <div className="max-w-5xl mx-auto">
              <AnimatedSection>
                <SectionHeading eyebrow="Side-by-side comparison" heading="Feature Comparison" centered />
              </AnimatedSection>

              <div className="mt-10 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cyan-200">
                      <th className="text-left py-3 px-4 font-semibold text-[#0F172A]">Feature</th>
                      <th className="text-left py-3 px-4 font-semibold text-cyan-700">{c.optionA}</th>
                      <th className="text-left py-3 px-4 font-semibold text-cyan-700">{c.optionB}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.table.map((row, i) => (
                      <tr key={i} className="border-b border-cyan-100/60 hover:bg-cyan-50/40 transition-colors">
                        <td className="py-3 px-4 font-medium text-[#0F172A]">{row.feature}</td>
                        <td className="py-3 px-4 text-slate-600">{row.optionA}</td>
                        <td className="py-3 px-4 text-slate-600">{row.optionB}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Decision rules */}
          <section className="px-6 py-16 bg-white">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <SectionHeading eyebrow="How to decide" heading="Decision Rules" centered />
                <p className="mt-4 text-slate-500 text-center max-w-2xl mx-auto">
                  Match your situation to the scenarios below to find the right approach.
                </p>
              </AnimatedSection>

              <div className="mt-10 space-y-4">
                {c.decisionRules.map((rule, i) => (
                  <AnimatedSection key={i} delay={i * 0.06}>
                    <div className="rounded-xl border border-cyan-100 bg-white/70 p-5 shadow-[0_8px_24px_rgba(59,130,246,0.06)]">
                      <p className="text-sm font-semibold text-[#0F172A] mb-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold mr-2">
                          {i + 1}
                        </span>
                        {rule.scenario}
                      </p>
                      <p className="text-sm text-slate-500 ml-8">
                        <span className="font-medium text-cyan-700">Recommendation: </span>
                        {rule.recommendation}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Limitations */}
          <section className="px-6 py-16 bg-[#F8FEFF] border-y border-cyan-100">
            <div className="max-w-3xl mx-auto">
              <AnimatedSection>
                <SectionHeading eyebrow="What to watch for" heading="Limitations" centered />
              </AnimatedSection>

              <ul className="mt-8 space-y-4">
                {c.limitations.map((lim, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400 shrink-0" />
                    {lim}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Sources and related services */}
          <section className="px-6 py-16 bg-white">
            <div className="max-w-4xl mx-auto grid gap-12 md:grid-cols-2">
              <AnimatedSection>
                <SectionHeading eyebrow="References" heading="Sources" />
                <ul className="mt-6 space-y-3">
                  {c.sources.map((src, i) => (
                    <li key={i}>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-cyan-700 hover:text-cyan-800 transition-colors"
                      >
                        <ExternalLink size={14} />
                        {src.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <SectionHeading eyebrow="Related" heading="Related Services" />
                <ul className="mt-6 space-y-3">
                  {c.relatedServices.map((svc, i) => (
                    <li key={i}>
                      <Link
                        href={svc.href}
                        className="inline-flex items-center gap-2 text-sm text-cyan-700 hover:text-cyan-800 transition-colors"
                      >
                        <ArrowLeft size={14} className="rotate-180" />
                        {svc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.15} className="mt-12 text-center">
              <Link
                href="/comparisons"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-[0_12px_32px_rgba(15,23,42,0.08)] transition hover:border-cyan-200 hover:bg-cyan-50"
              >
                <ArrowLeft size={16} />
                All Comparisons
              </Link>
            </AnimatedSection>
          </section>
        </main>
      </StickyFooterLayout>
    </>
  );
}
