import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Visibility Audit | Check Your GEO & AI Search Readiness | aibizmod",
  description:
    "Run a free AI visibility audit to see how ChatGPT, Google AI Overviews, Gemini, Claude, and Perplexity see your website. Get a scored report covering structured data, E-E-A-T, citability, and the fixes ranked by impact.",
  alternates: { canonical: "https://aibizmod.com/ai-visibility-audit-report" },
  openGraph: {
    title: "Free AI Visibility Audit | AI Search Readiness Report | aibizmod",
    description:
      "See exactly how AI search engines see your business. Free scored audit covering ChatGPT, Google AI Overviews, Gemini, Claude, and Perplexity.",
    url: "/ai-visibility-audit-report",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an AI visibility audit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI visibility audit measures how easily AI search engines and answer engines — ChatGPT, Google AI Overviews, Gemini, Claude, and Perplexity — can discover, understand, verify, and cite your website. It scores your structured data, entity signals, E-E-A-T indicators, and overall citability, then lists the issues ranked by impact on your AI rankings.",
      },
    },
    {
      "@type": "Question",
      name: "How is the audit score calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The audit checks your site across several weighted categories including schema markup and structured data, content quality and E-E-A-T signals, entity recognition, AI platform citability, and technical crawlability. Each category contributes a weighted score, and failing sub-checks reduce your overall 0-100 visibility score.",
      },
    },
    {
      "@type": "Question",
      name: "Is the audit really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Enter any domain and you get a full scored report covering the major AI platforms, key issues found, recommended fixes, and a prioritised roadmap. No signup required for the free report.",
      },
    },
    {
      "@type": "Question",
      name: "Which AI platforms does the audit cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The audit evaluates readiness for ChatGPT, Google AI Overviews, Gemini, Claude, and Perplexity, giving each a platform-specific score based on how its retrieval and citation behaviour works.",
      },
    },
  ],
};

export default function AIVisibilityAuditReportLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}

      <section className="bg-white text-ink">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="space-y-14">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">
                Free AI Visibility Audit
              </span>
              <h2 className="mt-4 font-display font-bold text-balance text-3xl md:text-4xl text-[#0F172A] leading-[1.1]">
                What the AI Visibility Audit Checks
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-500">
                ChatGPT, Gemini, Claude, and Perplexity only recommend businesses they can
                understand, verify, and cite. The free audit tests every signal that decides
                whether an AI system names your company in an answer — or ignores it.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6">
                <h3 className="font-display text-lg font-semibold text-[#0F172A]">
                  Structured Data &amp; Schema Markup
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  AI systems build knowledge graphs from structured data. The audit checks
                  whether your Organization, WebSite, Product, Service, and Article schema
                  are present, valid, and correctly connected — so AI can attribute facts to
                  your business.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6">
                <h3 className="font-display text-lg font-semibold text-[#0F172A]">
                  E-E-A-T &amp; Content Quality
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Experience, expertise, authoritativeness, and trust are the same quality
                  gates AI uses to decide whether a source is worth citing. The audit
                  evaluates authorship signals, factual depth, freshness, and supporting
                  evidence on your pages.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6">
                <h3 className="font-display text-lg font-semibold text-[#0F172A]">
                  Entity Recognition &amp; Citability
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  A citability score measures how confidently AI platforms can extract,
                  verify, and reference information from your site — from company name and
                  logo to the services you actually provide. Low citability means AI answers
                  describe a competitor instead.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6">
                <h3 className="font-display text-lg font-semibold text-[#0F172A]">
                  Platform Readiness
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Each AI platform retrieves information differently. The report scores your
                  readiness for ChatGPT, Google AI Overviews, Gemini, Claude, and Perplexity
                  separately, so you know which platforms already reference you and which are
                  ignoring your content.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0F172A]">
                What You Get After Running the Audit
              </h2>
              <ul className="mt-5 space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                  A 0–100 AI visibility score with an excellent / good / fair / poor / critical band
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                  A breakdown of every category you score well in — and every one that is costing you rankings
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                  Your key issues ranked by severity, each with a concrete recommended fix
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                  Quick wins you can implement today, plus a 90-day prioritised roadmap
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0F172A]">
                Why AI Visibility Matters
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                More people are getting answers from AI before they open a search engine.
                When a potential customer asks ChatGPT or Google AI Overviews which agency,
                product, or service provider to choose, the businesses that get named win
                the conversation — and everyone else is invisible. An AI visibility audit is
                the first step to being the answer, not the alternative nobody mentions.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 p-6 md:p-8">
              <h2 className="font-display text-xl font-semibold text-[#0F172A]">
                Frequently Asked Questions
              </h2>
              <div className="mt-5 space-y-6 text-sm text-slate-600">
                <div>
                  <h3 className="font-semibold text-[#0F172A]">What is an AI visibility audit?</h3>
                  <p className="mt-1.5 leading-relaxed">
                    It measures how easily AI search and answer engines — ChatGPT, Google AI
                    Overviews, Gemini, Claude, and Perplexity — can discover, understand,
                    verify, and cite your website, and scores the issues holding you back.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0F172A]">Is the audit really free?</h3>
                  <p className="mt-1.5 leading-relaxed">
                    Yes. Enter any domain and you get a full scored report with platform
                    readiness, key issues, recommended fixes, and a roadmap — no signup
                    required.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0F172A]">Which platforms does it cover?</h3>
                  <p className="mt-1.5 leading-relaxed">
                    The audit scores your readiness for ChatGPT, Google AI Overviews, Gemini,
                    Claude, and Perplexity, reflecting how each platform retrieves and cites
                    information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
    </>
  );
}