import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StickyFooterLayout from '@/components/layout/StickyFooterLayout';
import AnimatedSection from '@/components/common/AnimatedSection';
import SectionHeading from '@/components/common/SectionHeading';
import ShaderBackground from '@/components/ui/shader-background';

export const metadata: Metadata = {
  title: 'How We Audit AI Visibility: Methodology, Metrics & Scoring | aibizmod',
  description:
    'Our documented methodology for auditing AI visibility across ChatGPT, Perplexity, Gemini, Claude, and Google AI Search: the five metrics, the prompt set, the scoring rubric, and the audit process.',
  keywords: [
    'AI visibility audit methodology',
    'GEO audit process',
    'AI search metrics',
    'share of voice AI',
    'citation analysis methodology',
    'how to audit AI visibility',
  ],
  alternates: { canonical: 'https://aibizmod.com/how-we-audit-ai-visibility' },
  openGraph: {
    title: 'How We Audit AI Visibility | aibizmod',
    description:
      'The five metrics, prompt set, and scoring rubric behind every AI visibility audit.',
    url: '/how-we-audit-ai-visibility',
  },
};

const METRICS = [
  {
    name: 'Retrieval (Visibility)',
    definition:
      'Whether the brand appears anywhere in the AI-generated answer for a prompt. The first rung of the visibility ladder — if you are not retrieved, nothing else follows.',
    howMeasured:
      'Scored 0/1 per prompt per engine. Visibility = percentage of prompts where the brand is retrieved.',
  },
  {
    name: 'Citation Share',
    definition:
      'How often the brand\'s own pages or profiles are named as the source of information in an answer, versus competitor pages or third-party sites.',
    howMeasured:
      'For each answer, recorded which domains were cited. Citation share = brand citations ÷ total citations across the prompt set.',
  },
  {
    name: 'Recommendation Rate',
    definition:
      'How often the AI actively suggests the business as the answer to the questioner — the deepest rung of the ladder and the one closest to revenue.',
    howMeasured:
      'Scored 0/1 per prompt: did the answer recommend the brand without prompting? Recommendation rate = positive prompts ÷ total prompts.',
  },
  {
    name: 'Position',
    definition:
      'Where the brand appears relative to competitors when multiple businesses are named — first among three, or sixth among ten.',
    howMeasured:
      'Ordinal position recorded per prompt; aggregated into an average position and a "named first" percentage.',
  },
  {
    name: 'Sentiment',
    definition:
      'Whether the mention frames the brand positively (recommended, praised), neutrally (listed, described), or negatively (warnings, complaints, corrections).',
    howMeasured:
      'Each mention classified positive / neutral / negative. Sentiment mix reported per engine and overall.',
  },
];

const PROCESS = [
  {
    step: '1. Prompt Set Construction',
    detail:
      'We build 20–50 prompts per market: category queries ("best X in London"), comparison queries ("X vs Y"), and problem queries ("how to choose X"). Prompts mirror how real buyers ask, including follow-up phrasing. The set is fixed for comparability across runs.',
  },
  {
    step: '2. Baseline Run',
    detail:
      'Every prompt is run across ChatGPT, Gemini, Claude, and Perplexity (and Google AI Search where available), with both desktop and mobile contexts where relevant. Each answer is captured verbatim for the record.',
  },
  {
    step: '3. Scoring',
    detail:
      'Each answer is scored against the five metrics for the brand and for 3–5 competitors. The result is a visibility scorecard per engine: retrieval, citation share, recommendation rate, position, and sentiment.',
  },
  {
    step: '4. Diagnosis',
    detail:
      'We trace each gap to its cause: citation gap analysis shows which sources the AI used instead of you; site readiness review checks whether your pages are extractable; entity and schema review checks whether the AI knows who you are.',
  },
  {
    step: '5. Roadmap & Re-measurement',
    detail:
      'Fixes are prioritised into a 90-day roadmap — quick wins first, then structural work. The same prompt set is re-run monthly (or at the end of an audit-only engagement) so the scorecard shows movement, not opinion.',
  },
];

const RUBRIC = [
  { level: 'Invisible', score: '0–20', meaning: 'Rarely retrieved; competitors dominate category answers.' },
  { level: 'Present', score: '20–40', meaning: 'Retrieved in some answers, rarely cited, almost never recommended.' },
  { level: 'Visible', score: '40–60', meaning: 'Consistently retrieved and occasionally cited; recommendation gaps remain.' },
  { level: 'Cited', score: '60–80', meaning: 'Regularly cited as a source; recommended in a minority of relevant prompts.' },
  { level: 'Recommended', score: '80–100', meaning: 'A default recommendation for the category in most engines.' },
];

const FAQS = [
  {
    q: 'Why do you use 20–50 prompts instead of tracking thousands?',
    a: 'Comparability beats breadth. A fixed, human-curated prompt set can be re-run identically every month, which is what makes trends meaningful. High-volume tools trade this away — thousands of auto-generated queries cannot be replayed consistently, and their scores are not comparable to our rubric.',
  },
  {
    q: 'How is an AI visibility score calculated?',
    a: 'The score is the weighted composite of the five metrics: retrieval, citation share, recommendation rate, position, and sentiment. Weights are agreed during scoping — a business targeting recommendations weights recommendation rate highest; a content site might weight citation share.',
  },
  {
    q: 'Which engines do you test?',
    a: 'ChatGPT, Google Gemini, Anthropic Claude, and Perplexity by default, plus Google AI Search / AI Overviews where available. We add engines (Copilot, Grok, Meta AI) when a client\'s market uses them.',
  },
  {
    q: 'Do you use third-party monitoring tools?',
    a: 'Sometimes, but the benchmark itself never depends on them. We run the prompt set directly against the engines and record answers verbatim, so the scorecard stands on its own regardless of which software vendors exist or change their pricing.',
  },
  {
    q: 'Can we run the benchmark ourselves after the audit?',
    a: 'Yes — the prompt set and scoring template are handed over with every engagement. Our AI visibility prompts library is the free starting point, and the benchmarks guide explains how to score and trend the results.',
  },
];

export default function HowWeAuditPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How We Audit AI Visibility: Methodology, Metrics & Scoring',
    description:
      'The five metrics, prompt set, and scoring rubric behind every aibizmod AI visibility audit.',
    datePublished: '2026-07-31',
    author: { '@type': 'Organization', name: 'aibizmod', url: 'https://aibizmod.com' },
  };

  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

          {/* Hero */}
          <section className="relative isolate overflow-hidden px-4 sm:px-6 pb-16 pt-32 md:pb-20 md:pt-36">
            <ShaderBackground className="absolute inset-0 z-0 h-full w-full opacity-80" />
            <div
              className="pointer-events-none absolute left-1/2 top-24 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative z-10 mx-auto max-w-4xl">
              <nav
                className="mb-8 inline-flex flex-wrap items-center gap-1.5 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-[13px] text-slate-500 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="transition-colors hover:text-[#0F172A]">Home</Link>
                <ChevronRight size={13} className="shrink-0 text-cyan-300" aria-hidden="true" />
                <span className="font-medium text-[#0F172A]" aria-current="page">Audit Methodology</span>
              </nav>

              <h1
                className="font-display font-thin text-[#0F172A] text-balance"
                style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', lineHeight: 1.08 }}
              >
                How We Audit AI Visibility
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-500 max-w-3xl">
                Every AI visibility audit we deliver follows a documented methodology: a fixed prompt
                set, five comparable metrics, and a repeatable scoring rubric. This page is the
                methodology — so you can evaluate how the audit works before you buy it.
              </p>
            </div>
          </section>

          {/* Metrics */}
          <section className="px-4 sm:px-6 py-16 bg-[#F8FEFF] border-y border-cyan-100">
            <div className="mx-auto max-w-5xl">
              <AnimatedSection>
                <SectionHeading eyebrow="The scorecard" heading="Five Metrics, Not One Score" centered />
                <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-slate-500">
                  A single number hides what matters. We measure the visibility ladder from retrieval
                  to recommendation, per engine, per prompt.
                </p>
              </AnimatedSection>

              <div className="mt-12 space-y-5">
                {METRICS.map((m, i) => (
                  <AnimatedSection key={m.name} delay={i * 0.05}>
                    <div className="rounded-2xl border border-cyan-100 bg-white/70 p-6 shadow-[0_8px_24px_rgba(59,130,246,0.06)]">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div className="md:w-1/2">
                          <h2 className="font-display font-semibold text-[#0F172A] text-lg">{m.name}</h2>
                          <p className="mt-2 text-sm leading-relaxed text-slate-500">{m.definition}</p>
                        </div>
                        <div className="md:w-1/2 rounded-xl bg-[#F8FEFF] border border-cyan-100/70 p-4">
                          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-700">How it is measured</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{m.howMeasured}</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="px-4 sm:px-6 py-16 bg-white">
            <div className="mx-auto max-w-4xl">
              <AnimatedSection>
                <SectionHeading eyebrow="The process" heading="Five Steps, Every Engagement" centered />
              </AnimatedSection>

              <div className="mt-12 space-y-4">
                {PROCESS.map((p, i) => (
                  <AnimatedSection key={p.step} delay={i * 0.06}>
                    <div className="flex items-start gap-5 rounded-2xl border border-cyan-100/80 bg-white/70 p-6 shadow-[0_8px_24px_rgba(59,130,246,0.06)]">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-600 text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <h2 className="font-display font-semibold text-[#0F172A]">{p.step.replace(/^\d+\.\s/, '')}</h2>
                        <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.detail}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Rubric */}
          <section className="px-4 sm:px-6 py-16 bg-[#F8FEFF] border-y border-cyan-100">
            <div className="mx-auto max-w-4xl">
              <AnimatedSection>
                <SectionHeading eyebrow="Reading the score" heading="The Visibility Levels" centered />
                <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-slate-500">
                  Scores are always relative to your market: the rubric is calibrated against the
                  competitors in your benchmark, not against a universal average.
                </p>
              </AnimatedSection>

              <div className="mt-10 overflow-x-auto">
                <table className="w-full min-w-[560px] text-sm">
                  <thead>
                    <tr className="border-b border-cyan-200">
                      <th className="text-left py-3 px-4 font-semibold text-[#0F172A]">Level</th>
                      <th className="text-left py-3 px-4 font-semibold text-cyan-700">Score band</th>
                      <th className="text-left py-3 px-4 font-semibold text-cyan-700">What it means</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RUBRIC.map((row) => (
                      <tr key={row.level} className="border-b border-cyan-100/60 hover:bg-cyan-50/40 transition-colors">
                        <td className="py-3 px-4 font-medium text-[#0F172A]">{row.level}</td>
                        <td className="py-3 px-4 font-mono text-cyan-700">{row.score}</td>
                        <td className="py-3 px-4 text-slate-600">{row.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="px-4 sm:px-6 py-16 bg-white">
            <div className="mx-auto max-w-3xl">
              <AnimatedSection>
                <SectionHeading eyebrow="Questions" heading="Methodology FAQ" centered />
              </AnimatedSection>
              <div className="mt-10 space-y-3">
                {FAQS.map((f, i) => (
                  <AnimatedSection key={f.q} delay={i * 0.05}>
                    <details className="group rounded-xl border border-[#E0F2FE] bg-white p-5 transition-all duration-300 hover:border-[#BAE6FD] open:border-[#BAE6FD] open:bg-[#ECFEFF]/60">
                      <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                        <h3 className="text-[15.5px] font-medium leading-snug text-[#0F172A] group-open:text-cyan-700">
                          {f.q}
                        </h3>
                        <span className="shrink-0 text-cyan-400 transition-transform duration-300 group-open:rotate-180">▼</span>
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-slate-500">{f.a}</p>
                    </details>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-4 sm:px-6 pb-24">
            <div className="mx-auto max-w-4xl">
              <AnimatedSection>
                <div className="rounded-[24px] border border-cyan-100 bg-[#F8FEFF] p-8 md:p-10 text-center">
                  <h2
                    className="font-display font-thin text-[#0F172A] text-balance"
                    style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', lineHeight: 1.1 }}
                  >
                    Run the Methodology Yourself — or Have Us Run It
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-500">
                    Start free with the prompt library and the benchmarks guide, or book the full
                    audit where the same methodology is applied with diagnosis, fixes, and a 90-day
                    roadmap.
                  </p>
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <Link
                      href="/ai-visibility-prompts"
                      className="inline-flex h-11 items-center rounded-full border border-cyan-200 bg-white px-6 text-sm font-semibold text-[#0F172A] transition hover:border-cyan-300 hover:bg-cyan-50"
                    >
                      Browse the Prompt Library
                    </Link>
                    <Link
                      href="/services/ai-automation/ai-visibility-audit"
                      className="inline-flex h-11 items-center rounded-full bg-[#0f172a] px-6 text-sm font-semibold text-white transition hover:bg-cyan-700"
                    >
                      Book the Full Audit
                      <ArrowRight size={15} className="ml-2" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        </main>
      </StickyFooterLayout>
    </>
  );
}
