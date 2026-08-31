import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Compass,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  Zap,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StickyFooterLayout from '@/components/layout/StickyFooterLayout';
import AnimatedSection from '@/components/common/AnimatedSection';
import ShaderBackground from '@/components/ui/shader-background';
import { TextShimmer } from '@/components/ui/text-shimmer';
import { StarButton } from '@/components/ui/star-button';
import InversionCircleScrollAnimation from '@/components/ui/inversion-circle-scroll-animation';
import { industries, getIndustry } from '@/data/industries';
import { getIndustryMaskConfig } from '@/data/industry-masks';

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
    title: `${ind.name} — Enterprise Technology & Custom Systems | aibizmod`,
    description: ind.description,
    alternates: { canonical: `https://aibizmod.com/industries/${ind.slug}` },
    openGraph: {
      title: `${ind.name} — Enterprise Technology & Custom Systems | aibizmod`,
      description: ind.description,
      url: `/industries/${ind.slug}`,
    },
  };
}

export default function IndustryDetailPage({ params }: IndustryPageProps) {
  const ind = getIndustry(params.slug);
  if (!ind) notFound();

  const domainConfig = getIndustryMaskConfig(ind.slug, ind.name);

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

  // Icon mapping for dynamic challenges
  const challengeIcons = [Compass, Zap, ShieldCheck, TrendingUp, Cpu, Layers];

  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink selection:bg-cyan-600 selection:text-white">
          {faqSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
          )}

          {/* ── 1. HERO SECTION (2-Column with Cinematic Image Card) ───────── */}
          <section className="relative isolate overflow-hidden bg-white px-6 pb-20 pt-32 md:pb-28 md:pt-36">
            <ShaderBackground className="absolute inset-0 z-0 h-full w-full opacity-80" />

            {/* Ambient Cyan Glow */}
            <div
              className="pointer-events-none absolute left-1/2 top-28 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/35 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-7xl">
              {/* Breadcrumb */}
              <nav
                className="mb-8 inline-flex flex-wrap items-center gap-1.5 rounded-full border border-cyan-100 bg-white/65 px-4 py-1.5 text-xs font-semibold text-slate-500 shadow-[0_12px_35px_rgba(59,130,246,0.08)] backdrop-blur-md"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="transition-colors hover:text-[#0F172A]">
                  Home
                </Link>
                <ChevronRight size={13} className="shrink-0 text-cyan-400" aria-hidden="true" />
                <Link href="/industries" className="transition-colors hover:text-[#0F172A]">
                  Industries
                </Link>
                <ChevronRight size={13} className="shrink-0 text-cyan-400" aria-hidden="true" />
                <span className="font-bold text-[#0F172A]" aria-current="page">
                  {ind.name}
                </span>
              </nav>

              <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                {/* Left Column: Heading, Subtitle & CTAs */}
                <AnimatedSection>
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md mb-6">
                    <Sparkles size={14} className="text-cyan-600" />
                    {domainConfig.eyebrow}
                  </span>

                  <h1
                    className="font-display font-light text-[#0F172A] text-balance tracking-tight"
                    style={{ fontSize: 'clamp(36px, 5.2vw, 64px)', lineHeight: 1.04 }}
                  >
                    Enterprise Solutions for{' '}
                    <TextShimmer
                      as="span"
                      duration={2.2}
                      className="font-normal [--base-color:#0891b2] [--base-gradient-color:#ffffff]"
                    >
                      {ind.name}
                    </TextShimmer>
                  </h1>

                  <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                    {ind.tagline}
                  </p>

                  {/* Service Shortcut Pills */}
                  <div className="mt-7 flex flex-wrap gap-2.5 max-w-xl">
                    {ind.services.map((s) => (
                      <Link
                        key={s.name}
                        href={s.href}
                        className="inline-flex items-center gap-1.5 rounded-full border border-cyan-100 bg-white/80 px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-md transition hover:border-cyan-300 hover:bg-cyan-50/60 hover:text-cyan-800"
                      >
                        <span>{s.name}</span>
                        <ArrowRight size={12} className="text-cyan-600" />
                      </Link>
                    ))}
                  </div>

                  {/* Primary Action Buttons */}
                  <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Link href="/contact" aria-label="Schedule an architecture review">
                      <StarButton
                        as="span"
                        lightColor="#38bdf8"
                        backgroundColor="#0f172a"
                        className="h-12 px-8 font-semibold shadow-[0_0_16px_rgba(56,189,248,0.28)] transition duration-300 hover:-translate-y-0.5"
                      >
                        Talk to {ind.name} Lead
                        <ArrowRight size={15} aria-hidden="true" />
                      </StarButton>
                    </Link>
                    <Link
                      href="#challenges"
                      className="inline-flex h-12 items-center justify-center rounded-full border border-cyan-200/80 bg-white/80 px-7 text-xs font-semibold text-[#0F172A] shadow-sm backdrop-blur-md transition hover:bg-white hover:border-cyan-300"
                    >
                      View Capabilities & Scope
                    </Link>
                  </div>
                </AnimatedSection>

                {/* Right Column: Hero Cinematic Image Card */}
                <AnimatedSection direction="right" className="flex justify-center">
                  <div className="relative w-full max-w-lg">
                    {/* Ambient Glow */}
                    <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-400/25 via-sky-300/20 to-transparent rounded-[36px] blur-xl -z-10 pointer-events-none" />

                    <div className="group relative w-full aspect-[4/3] rounded-[32px] border border-cyan-100 bg-white p-2 shadow-[0_20px_50px_rgba(8,145,178,0.12)] overflow-hidden">
                      <div className="relative h-full w-full overflow-hidden rounded-[24px]">
                        <img
                          src={ind.heroImage}
                          alt={ind.name}
                          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        />
                        {/* Soft light vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-black/10" />

                        {/* Top Glass Sector Badge */}
                        <div className="absolute top-3.5 left-3.5">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-cyan-900 backdrop-blur-md shadow-sm">
                            <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                            {ind.slug.replace('-', ' ')}
                          </span>
                        </div>

                        {/* Bottom Frosted Glass Strip */}
                        <div className="absolute bottom-3.5 left-3.5 right-3.5 rounded-2xl border border-white/60 bg-white/90 p-3 backdrop-blur-md shadow-sm flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-bold text-cyan-700 uppercase tracking-wider">
                              Enterprise Architecture
                            </p>
                            <p className="text-xs sm:text-sm font-bold text-slate-900">{ind.name}</p>
                          </div>
                          <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-mono font-bold text-cyan-800 border border-cyan-200/80">
                            0{ind.challenges.length} Focus Areas
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* ── 2. SECTOR BLUEPRINT & CHALLENGES (About Page "Who We Are" Grid Pattern) ── */}
          <section
            id="challenges"
            className="relative py-24 px-6 bg-slate-50/60 border-t border-slate-200/80 overflow-hidden"
            style={{
              backgroundImage:
                'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
            }}
          >
            {/* Ambient Radial Blur */}
            <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-200/30 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-blue-200/20 blur-[140px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto">
              {/* Grand Central Narrative Card */}
              <AnimatedSection delay={0.1} className="max-w-4xl mx-auto">
                <div className="relative overflow-hidden rounded-[36px] border border-cyan-100/90 bg-white/90 backdrop-blur-xl p-8 sm:p-12 md:p-14 shadow-[0_24px_70px_-15px_rgba(8,145,178,0.14)] text-center">
                  <div className="flex justify-center mb-6">
                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-800 backdrop-blur-sm shadow-sm">
                      <Sparkles size={13} aria-hidden="true" className="text-cyan-600" />
                      Sector Blueprint
                    </span>
                  </div>

                  <h2
                    className="font-display font-light text-slate-900 text-balance tracking-tight"
                    style={{ fontSize: 'clamp(32px, 4.4vw, 50px)', lineHeight: 1.1 }}
                  >
                    Architected for Resilience. <br />
                    <span className="font-normal text-cyan-700">Built for {ind.name}.</span>
                  </h2>

                  <div className="mt-8 space-y-4 max-w-2xl mx-auto">
                    <p className="text-slate-900 text-lg sm:text-xl md:text-[21px] font-normal leading-[1.65]">
                      {ind.description}
                    </p>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                      We eliminate fragmented technical debt by deploying purpose-engineered cloud architectures, verified compliance workflows, and real-time operational telemetry.
                    </p>
                  </div>

                  {/* Trust Highlights */}
                  <div className="mt-9 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3 sm:gap-4 relative z-10">
                    {[
                      'Direct engagement with principal architects',
                      'Domain-specific compliance & security hardening',
                      'Production-grade SLAs & long-term maintenance',
                    ].map((point, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium bg-slate-50/90 px-3.5 py-1.5 rounded-full border border-slate-200/70"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Decorative Wave Graphics */}
                  <svg
                    viewBox="0 0 400 100"
                    className="absolute bottom-0 right-0 w-80 h-24 pointer-events-none z-0 opacity-20"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,70 Q100,20 200,65 T400,40"
                      stroke="#0891B2"
                      strokeWidth="2"
                      strokeOpacity="0.7"
                    />
                    <path
                      d="M0,50 Q90,80 190,30 T400,70"
                      stroke="#06B6D4"
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                    />
                  </svg>
                </div>
              </AnimatedSection>

              {/* 4-Card Challenges Grid (Styled exactly like About page Feature Cards) */}
              <div className="mt-12">
                <AnimatedSection className="text-center mb-8">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
                    Targeted Bottlenecks
                  </span>
                  <h3
                    className="mt-2 font-display font-bold text-slate-900"
                    style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', lineHeight: 1.15 }}
                  >
                    Operational Challenges We Solve
                  </h3>
                </AnimatedSection>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ind.challenges.slice(0, 4).map((challenge, i) => {
                    const IconComp = challengeIcons[i % challengeIcons.length];
                    return (
                      <AnimatedSection key={i} delay={0.15 + i * 0.05}>
                        <div className="group relative overflow-hidden bg-white rounded-[28px] p-6 md:p-7 border border-cyan-100/90 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_18px_40px_-10px_rgba(8,145,178,0.16)] hover:border-cyan-300 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 flex flex-col justify-between h-full min-h-[280px]">
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-5">
                              <div className="w-11 h-11 rounded-2xl bg-cyan-50/90 border border-cyan-200/80 flex items-center justify-center text-cyan-700 shadow-sm group-hover:scale-105 transition-transform duration-300">
                                <IconComp className="w-5 h-5" />
                              </div>
                              <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-700 uppercase bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100/80">
                                0{i + 1}
                              </span>
                            </div>
                            <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-sans">
                              Focus Area 0{i + 1}
                            </h4>
                            <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                              {challenge}
                            </p>
                          </div>

                          <div className="relative z-10 mt-5 pt-3.5 border-t border-slate-100 text-[10px] font-mono tracking-wider text-cyan-800 uppercase font-semibold">
                            Engineered Resolution
                          </div>

                          {/* Decorative Wave Graphics */}
                          <svg
                            viewBox="0 0 300 80"
                            className="absolute bottom-0 left-0 w-full h-14 pointer-events-none z-0 opacity-20 group-hover:opacity-50 transition-opacity duration-500"
                            fill="none"
                            preserveAspectRatio="none"
                          >
                            <path
                              d="M0,65 Q75,25 150,58 T300,38"
                              stroke="#0891B2"
                              strokeWidth="2.5"
                              strokeOpacity="0.75"
                            />
                            <path
                              d="M0,48 Q70,75 145,30 T300,65"
                              stroke="#06B6D4"
                              strokeWidth="1.5"
                              strokeOpacity="0.4"
                            />
                          </svg>
                        </div>
                      </AnimatedSection>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* ── 3. INVERSION SCROLL CENTERPIECE (Featuring Core Values Card from /about) ── */}
          <InversionCircleScrollAnimation
            eyebrow={domainConfig.eyebrow}
            heroTitle={domainConfig.title}
            heroSubtitle={domainConfig.subtitle}
            contentLabel="Transformation Blueprint"
            contentHeading={domainConfig.outroTitle}
            contentDescription={domainConfig.outroSubtitle}
            industrySlug={ind.slug}
            cardNum="001"
            cardTag={`${ind.name.toUpperCase()} ARCHITECTURE`}
            cardLabel="BLUEPRINT"
            cardDesc={ind.description}
            features={[
              `High-concurrency microservices for ${ind.name}`,
              'Continuous compliance & security telemetry',
              'Sub-second query latency & enterprise SLAs',
            ]}
            ctaText={`Consult ${ind.name} Lead`}
            ctaHref="/contact"
          />

          {/* ── 4. ARCHITECTURAL CAPABILITIES (About Page Mission/Vision Style) ── */}
          <section className="py-24 px-6 border-t border-border bg-white">
            <div className="max-w-7xl mx-auto">
              <AnimatedSection className="text-center mb-14">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">
                  Architectural Capabilities
                </span>
                <h2
                  className="mt-3 font-display font-bold text-ink"
                  style={{
                    fontSize: 'clamp(26px, 3.5vw, 40px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: '#0E7490',
                  }}
                >
                  Tailored Services for {ind.name}
                </h2>
                <p className="mt-3 text-slate-500 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                  Enterprise-grade platforms and modern tech capabilities engineered specifically for the demands of {ind.name}.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                {ind.services.map((svc, i) => (
                  <AnimatedSection key={svc.href} delay={i * 0.08}>
                    <Link
                      href={svc.href}
                      className="group relative overflow-hidden bg-white border border-[#E0F2FE] rounded-[32px] p-8 pb-16 shadow-[0_4px_24px_rgba(15,23,42,0.04)] h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(8,145,178,0.12)] hover:border-cyan-300"
                    >
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="w-11 h-11 rounded-2xl border border-cyan-100 flex items-center justify-center text-cyan-600 bg-cyan-50/70 mb-6 shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <CheckCircle2 size={20} aria-hidden="true" />
                        </div>

                        <div className="mt-1">
                          <h3 className="text-[22px] font-extrabold tracking-tight text-[#0F172A] leading-snug group-hover:text-cyan-700 transition-colors font-sans">
                            {svc.name}
                          </h3>
                          <div className="mt-1 text-[10px] font-bold tracking-wider text-cyan-600 uppercase font-sans">
                            Enterprise Capability
                          </div>
                        </div>

                        <p className="mt-4 text-slate-500 text-[14px] leading-relaxed font-sans flex-grow">
                          {svc.description}
                        </p>

                        <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-cyan-700 group-hover:translate-x-1 transition-transform">
                          <span>Explore Capability</span>
                          <ExternalLink size={13} />
                        </div>
                      </div>

                      {/* Glowing Wave Graphics */}
                      <svg
                        viewBox="0 0 350 120"
                        className="absolute bottom-0 left-0 w-full h-14 pointer-events-none z-0 opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0,90 Q90,30 180,80 T350,50"
                          stroke="#0891B2"
                          strokeWidth="2.5"
                          strokeOpacity="0.75"
                        />
                        <path
                          d="M0,70 Q80,100 170,40 T350,90"
                          stroke="#06B6D4"
                          strokeWidth="1.5"
                          strokeOpacity="0.35"
                        />
                      </svg>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* ── 5. PRODUCTION USE CASES (Modern Dark & Light Case Studies) ─── */}
          <section className="py-24 px-6 bg-[#F8FEFF] border-y border-cyan-100">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection className="text-center mb-14">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">
                  Engineered in Production
                </span>
                <h2
                  className="mt-3 font-display font-bold text-ink"
                  style={{
                    fontSize: 'clamp(26px, 3.5vw, 40px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: '#0E7490',
                  }}
                >
                  Key Implementations &amp; Case Studies
                </h2>
                <p className="mt-3 text-slate-500 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                  Real-world architectures deployed for enterprise performance, data privacy, and scale.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ind.useCases.map((uc, i) => (
                  <AnimatedSection key={i} delay={i * 0.08}>
                    <div className="relative overflow-hidden rounded-[28px] border border-cyan-100 bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-cyan-200 hover:-translate-y-1">
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-mono font-bold tracking-wider text-cyan-800 border border-cyan-100">
                          Case 0{i + 1}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">Verified System</span>
                      </div>

                      <h3 className="font-display font-bold text-[#0F172A] text-lg sm:text-xl leading-snug">
                        {uc.title}
                      </h3>

                      <p className="mt-3.5 text-sm text-slate-600 leading-relaxed font-light">
                        {uc.description}
                      </p>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="font-medium text-cyan-700">Delivered Architecture</span>
                        <span className="font-mono">99.99% Availability</span>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* ── 6. TECHNICAL FAQS ──────────────────────────────────────────── */}
          {ind.faqs.length > 0 && (
            <section className="py-24 px-6 bg-white border-b border-cyan-100">
              <div className="max-w-3xl mx-auto">
                <AnimatedSection className="text-center mb-12">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">
                    Technical Clarity
                  </span>
                  <h2
                    className="mt-3 font-display font-bold text-ink"
                    style={{
                      fontSize: 'clamp(26px, 3.5vw, 38px)',
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                      color: '#0E7490',
                    }}
                  >
                    Frequently Asked Questions
                  </h2>
                </AnimatedSection>

                <div className="space-y-4">
                  {ind.faqs.map((faq, i) => (
                    <AnimatedSection key={i} delay={i * 0.05}>
                      <details className="group rounded-[22px] border border-cyan-100 bg-slate-50/50 p-6 open:bg-white open:shadow-md transition-all">
                        <summary className="cursor-pointer text-sm font-bold text-[#0F172A] leading-relaxed list-none flex items-center justify-between gap-4">
                          {faq.q}
                          <span className="shrink-0 text-cyan-600 group-open:rotate-180 transition-transform duration-200">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M4 6l4 4 4-4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </summary>
                        <p className="mt-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 font-light">
                          {faq.a}
                        </p>
                      </details>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── 7. BOTTOM CTA SECTION ──────────────────────────────────────── */}
          <section className="relative overflow-hidden py-24 px-6 bg-canvas">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <AnimatedSection>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 shadow-sm backdrop-blur-md mb-6">
                  <Sparkles size={13} className="text-cyan-600" />
                  Engineering Partnership
                </div>

                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight">
                  Ready to modernize your {ind.name.toLowerCase()} technology stack?
                </h2>

                <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
                  Let&apos;s discuss architecture blueprints, system integration, and deployment timelines tailored to your team.
                </p>

                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <Link href="/contact" aria-label="Start project with aibizmod">
                    <StarButton
                      as="span"
                      lightColor="#38bdf8"
                      backgroundColor="#0f172a"
                      className="h-12 px-9 font-semibold shadow-[0_0_16px_rgba(56,189,248,0.28)]"
                    >
                      Start a Project
                      <ArrowRight size={15} aria-hidden="true" />
                    </StarButton>
                  </Link>

                  <Link
                    href="/industries"
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-cyan-200/80 bg-white px-7 text-xs font-semibold text-[#0F172A] shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50"
                  >
                    <ArrowLeft size={14} />
                    All Industries
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
