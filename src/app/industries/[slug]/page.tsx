import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowLeft, ExternalLink } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StickyFooterLayout from '@/components/layout/StickyFooterLayout';
import AnimatedSection from '@/components/common/AnimatedSection';
import SectionHeading from '@/components/common/SectionHeading';
import ShaderBackground from '@/components/ui/shader-background';
import { industries, getIndustry } from '@/data/industries';

interface IndustryPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: IndustryPageProps): Metadata {
  const ind = getIndustry(params.slug);
  if (!ind) return { title: 'Industry not found' };
  return {
    title: `${ind.name} — Technology Solutions | aibizmod`,
    description: ind.description,
    alternates: { canonical: `https://aibizmod.com/industries/${ind.slug}` },
    openGraph: {
      title: `${ind.name} — Technology Solutions | aibizmod`,
      description: ind.description,
      url: `/industries/${ind.slug}`,
    },
  };
}

export default function IndustryDetailPage({ params }: IndustryPageProps) {
  const ind = getIndustry(params.slug);
  if (!ind) notFound();

  const faqSchema = ind.faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: ind.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      }
    : null;

  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink">
          {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

          {/* Hero */}
          <section className="relative isolate overflow-hidden px-4 sm:px-6 pb-16 pt-32 md:pb-20 md:pt-36">
            <ShaderBackground className="absolute inset-0 z-0 h-full w-full opacity-80" />
            <div className="pointer-events-none absolute left-1/2 top-24 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-4xl">
              <nav className="mb-8 inline-flex flex-wrap items-center gap-1.5 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-[13px] text-slate-500 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md" aria-label="Breadcrumb">
                <Link href="/" className="transition-colors hover:text-[#0F172A]">Home</Link>
                <ChevronRight size={13} className="shrink-0 text-cyan-300" aria-hidden="true" />
                <Link href="/industries" className="transition-colors hover:text-[#0F172A]">Industries</Link>
                <ChevronRight size={13} className="shrink-0 text-cyan-300" aria-hidden="true" />
                <span className="font-medium text-[#0F172A]" aria-current="page">{ind.name}</span>
              </nav>

              <span className="text-5xl">{ind.icon}</span>
              <h1 className="mt-4 font-display font-thin text-[#0F172A] text-balance" style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', lineHeight: 1.08 }}>
                {ind.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-slate-500 max-w-3xl">
                {ind.tagline}
              </p>
            </div>
          </section>

          {/* Overview */}
          <section className="px-4 sm:px-6 py-16 bg-[#F8FEFF] border-y border-cyan-100">
            <div className="max-w-3xl mx-auto">
              <AnimatedSection>
                <p className="text-base leading-relaxed text-slate-600">{ind.description}</p>
              </AnimatedSection>
            </div>
          </section>

          {/* Challenges */}
          <section className="px-4 sm:px-6 py-16 bg-white">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <SectionHeading eyebrow="What we solve" heading="Challenges we address" centered />
              </AnimatedSection>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {ind.challenges.map((challenge, i) => (
                  <AnimatedSection key={i} delay={i * 0.06}>
                    <div className="rounded-xl border border-cyan-100 bg-white/70 p-5 shadow-[0_8px_24px_rgba(59,130,246,0.06)]">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-xs font-bold text-cyan-700">
                          {i + 1}
                        </span>
                        <p className="text-sm text-slate-600 leading-relaxed">{challenge}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="px-4 sm:px-6 py-16 bg-[#F8FEFF] border-y border-cyan-100">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <SectionHeading eyebrow="How we help" heading="Services for this industry" centered />
              </AnimatedSection>
              <div className="mt-10 grid gap-5 sm:grid-cols-3">
                {ind.services.map((svc, i) => (
                  <AnimatedSection key={svc.href} delay={i * 0.06}>
                    <Link href={svc.href} className="group block rounded-2xl border border-cyan-100 bg-white p-6 shadow-[0_8px_24px_rgba(59,130,246,0.06)] transition-all hover:border-cyan-200 hover:shadow-[0_12px_32px_rgba(59,130,246,0.12)]">
                      <h3 className="font-display font-bold text-[#0F172A] text-sm group-hover:text-cyan-700 transition-colors">{svc.name}</h3>
                      <p className="mt-2 text-xs text-slate-500 leading-relaxed">{svc.description}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-700">
                        Learn more <ExternalLink size={12} />
                      </span>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Use cases */}
          <section className="px-4 sm:px-6 py-16 bg-white">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <SectionHeading eyebrow="In practice" heading="Use cases" centered />
              </AnimatedSection>
              <div className="mt-10 space-y-5">
                {ind.useCases.map((uc, i) => (
                  <AnimatedSection key={i} delay={i * 0.06}>
                    <div className="rounded-xl border border-cyan-100 bg-[#F8FEFF] p-6">
                      <h3 className="font-display font-bold text-[#0F172A] text-sm">{uc.title}</h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{uc.description}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          {ind.faqs.length > 0 && (
            <section className="px-4 sm:px-6 py-16 bg-[#F8FEFF] border-y border-cyan-100">
              <div className="max-w-3xl mx-auto">
                <AnimatedSection>
                  <SectionHeading eyebrow="Common questions" heading="Frequently Asked Questions" centered />
                </AnimatedSection>
                <div className="mt-10 space-y-4">
                  {ind.faqs.map((faq, i) => (
                    <AnimatedSection key={i} delay={i * 0.06}>
                      <details className="group rounded-xl border border-cyan-100 bg-white p-5 open:shadow-[0_8px_24px_rgba(59,130,246,0.06)] transition-all">
                        <summary className="cursor-pointer text-sm font-semibold text-[#0F172A] leading-relaxed list-none flex items-center justify-between gap-4">
                          {faq.q}
                          <span className="shrink-0 text-cyan-400 group-open:rotate-180 transition-transform duration-200">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </span>
                        </summary>
                        <p className="mt-4 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                      </details>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Back + CTA */}
          <section className="px-4 sm:px-6 py-16 bg-white">
            <div className="max-w-3xl mx-auto text-center">
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-[0_12px_32px_rgba(15,23,42,0.08)] transition hover:border-cyan-200 hover:bg-cyan-50"
              >
                <ArrowLeft size={16} />
                All Industries
              </Link>
            </div>
          </section>
        </main>
      </StickyFooterLayout>
    </>
  );
}
