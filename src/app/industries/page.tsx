import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StickyFooterLayout from '@/components/layout/StickyFooterLayout';
import ShaderBackground from '@/components/ui/shader-background';
import AnimatedSection from '@/components/common/AnimatedSection';
import { industries } from '@/data/industries';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industries We Serve | aibizmod',
  description: 'Technology solutions tailored for retail, finance, healthcare, SaaS, manufacturing, and 10+ industries. See how aibizmod builds custom software, AI automation, and digital platforms for your sector.',
  alternates: { canonical: 'https://aibizmod.com/industries' },
};

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink">
          {/* Hero */}
          <section className="relative isolate overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-36">
            <ShaderBackground className="absolute inset-0 z-0 h-full w-full opacity-80" />
            <div className="pointer-events-none absolute left-1/2 top-24 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <AnimatedSection>
                <nav className="mb-8 inline-flex flex-wrap items-center gap-1.5 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-[13px] text-slate-500 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md" aria-label="Breadcrumb">
                  <Link href="/" className="transition-colors hover:text-[#0F172A]">Home</Link>
                  <ChevronRight size={13} className="shrink-0 text-cyan-300" aria-hidden="true" />
                  <span className="font-medium text-[#0F172A]" aria-current="page">Industries</span>
                </nav>
                <h1 className="font-display font-thin text-[#0F172A] text-balance" style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.05 }}>
                  Technology solutions for{' '}
                  <span className="font-normal" style={{ color: '#0891B2' }}>every industry</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-slate-500 max-w-2xl mx-auto">
                  We build custom software, AI automation, and digital platforms tailored to the specific challenges of your sector. Select your industry to see how we can help.
                </p>
              </AnimatedSection>
            </div>
          </section>

          {/* Industry grid */}
          <section className="px-6 py-16 bg-[#F8FEFF] border-y border-cyan-100">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {industries.map((industry, i) => (
                  <AnimatedSection key={industry.slug} delay={i * 0.04}>
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="group block rounded-2xl border border-cyan-100 bg-white/70 overflow-hidden shadow-[0_8px_24px_rgba(59,130,246,0.06)] backdrop-blur-sm transition-all hover:border-cyan-200 hover:bg-white hover:shadow-[0_12px_32px_rgba(59,130,246,0.12)]"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={industry.heroImage}
                          alt={industry.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute bottom-3 left-4 text-3xl drop-shadow-lg">{industry.icon}</span>
                      </div>
                      <div className="p-6">
                        <h2 className="font-display font-bold text-[#0F172A] text-base leading-snug group-hover:text-cyan-700 transition-colors">
                          {industry.name}
                        </h2>
                        <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2">
                          {industry.tagline}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {industry.services.slice(0, 3).map((svc) => (
                            <span key={svc.name} className="inline-flex items-center rounded-full bg-cyan-50 px-2.5 py-0.5 text-[11px] font-medium text-cyan-700 border border-cyan-100">
                              {svc.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-6 py-20 bg-white">
            <div className="max-w-2xl mx-auto text-center">
              <AnimatedSection>
                <h2 className="font-display font-bold text-[#0F172A]" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', lineHeight: 1.1 }}>
                  Don&apos;t see your industry?
                </h2>
                <p className="mt-4 text-slate-500 leading-relaxed">
                  We work across sectors. Tell us about your business and we&apos;ll show you how technology can solve your specific challenges.
                </p>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(15,23,42,0.15)] transition hover:bg-[#1e293b]"
                  >
                    Get in Touch
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </section>
        </main>
      </StickyFooterLayout>
    </>
  );
}
