"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronRight, Copy, Search, Sparkles, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyFooterLayout from "@/components/layout/StickyFooterLayout";
import AnimatedSection from "@/components/common/AnimatedSection";
import ShaderBackground from "@/components/ui/shader-background";
import { promptCategories, aiPrompts } from "@/data/prompts";

export default function PromptLibraryContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = aiPrompts.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      p.title.toLowerCase().includes(normalizedQuery) ||
      p.prompt.toLowerCase().includes(normalizedQuery) ||
      p.tags.some((t) => t.toLowerCase().includes(normalizedQuery))
    );
  });

  const allCount = normalizedQuery
    ? filtered.length
    : activeCategory === "all"
      ? aiPrompts.length
      : aiPrompts.filter((p) => p.category === activeCategory).length;

  async function copyPrompt(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Clipboard unavailable — ignore
    }
  }

  const activeCat = promptCategories.find((c) => c.slug === activeCategory);

  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink">
          {/* Hero */}
          <section className="relative isolate overflow-hidden px-4 sm:px-6 pb-14 pt-32 md:pb-16 md:pt-36">
            <ShaderBackground className="absolute inset-0 z-0 h-full w-full opacity-80" />
            <div
              className="pointer-events-none absolute left-1/2 top-24 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <nav
                className="mb-8 inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-[13px] text-slate-500 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="transition-colors hover:text-[#0F172A]">Home</Link>
                <ChevronRight size={13} className="shrink-0 text-cyan-300" aria-hidden="true" />
                <span className="font-medium text-[#0F172A]" aria-current="page">AI Visibility Prompts</span>
              </nav>

              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md">
                <Sparkles size={14} aria-hidden="true" />
                Free Prompt Library
              </span>

              <h1
                className="mt-7 font-display font-thin text-[#0F172A] text-balance"
                style={{ fontSize: "clamp(32px, 4.8vw, 52px)", lineHeight: 1.04 }}
              >
                AI Visibility Audit Prompts
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-slate-500">
                {aiPrompts.length} ready-to-run prompts for auditing how ChatGPT, Perplexity, Gemini,
                and Claude see your brand — and where competitors win. Replace the {"{tokens}"} with
                your details, run them across engines, and record the answers monthly.
              </p>
            </div>
          </section>

          {/* Category filters */}
          <section className="px-4 sm:px-6 pb-4">
            <div className="mx-auto max-w-6xl">
              {/* Search bar */}
              <div className="mx-auto mb-6 max-w-2xl">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col gap-2.5 sm:flex-row"
                  role="search"
                >
                  <div className="relative flex-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-stone-400">
                      <Search className="h-4 w-4" />
                    </div>
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search prompts by keyword, category, or intent…"
                      aria-label="Search prompts"
                      className="h-12 w-full rounded-2xl border border-cyan-400/80 bg-white shadow-sm pl-10 pr-10 text-[14px] font-medium text-slate-900 outline-none placeholder:text-stone-400 ring-2 ring-cyan-100 transition focus:border-cyan-500"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        aria-label="Clear search"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition hover:text-slate-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#0f172a] px-6 text-sm font-semibold text-white transition hover:bg-cyan-700"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </button>
                </form>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    activeCategory === "all"
                      ? "border-cyan-600 bg-cyan-600 text-white"
                      : "border-cyan-100 bg-white text-slate-600 hover:border-cyan-300"
                  }`}
                >
                  All ({normalizedQuery ? allCount : aiPrompts.length})
                </button>
                {promptCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      activeCategory === cat.slug
                        ? "border-cyan-600 bg-cyan-600 text-white"
                        : "border-cyan-100 bg-white text-slate-600 hover:border-cyan-300"
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>

              {normalizedQuery && (
                <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
                  {filtered.length === 0
                    ? `No prompts match “${query.trim()}” in this category. Try a different keyword.`
                    : `${filtered.length} ${filtered.length === 1 ? "prompt" : "prompts"} match “${query.trim()}”.`}
                </p>
              )}

              {!normalizedQuery && activeCat && (
                <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
                  {activeCat.description}
                </p>
              )}
            </div>
          </section>

          {/* Prompt grid */}
          <section className="px-4 sm:px-6 py-12 pb-24">
            <div className="mx-auto max-w-6xl">
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-cyan-200 bg-white/60 p-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-50">
                    <Search className="h-6 w-6 text-cyan-500" />
                  </div>
                  <h2 className="mt-4 font-display font-semibold text-[#0F172A] text-lg">
                    No prompts found
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                    We couldn&apos;t find any prompts matching your search. Try a broader keyword,
                    or clear the search to browse all categories.
                  </p>
                  <button
                    onClick={() => setQuery("")}
                    className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-[#0f172a] px-6 text-sm font-semibold text-white transition hover:bg-cyan-700"
                  >
                    <X className="h-4 w-4" />
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2">
                  {filtered.map((p, i) => (
                  <AnimatedSection key={p.id} delay={(i % 2) * 0.05}>
                    <div className="group flex h-full flex-col rounded-2xl border border-cyan-100/80 bg-white/70 p-6 shadow-[0_8px_24px_rgba(59,130,246,0.06)] transition hover:border-cyan-200 hover:shadow-[0_12px_36px_rgba(8,145,178,0.10)]">
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="font-display font-semibold text-[#0F172A] text-[15px] leading-snug">
                          {p.title}
                        </h2>
                        <button
                          onClick={() => copyPrompt(p.id, p.prompt)}
                          aria-label={`Copy prompt: ${p.title}`}
                          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
                            copiedId === p.id
                              ? "border-emerald-300 bg-emerald-50 text-emerald-600"
                              : "border-cyan-100 bg-white text-cyan-600 hover:border-cyan-300 hover:bg-cyan-50"
                          }`}
                        >
                          {copiedId === p.id ? <Check size={15} /> : <Copy size={15} />}
                        </button>
                      </div>

                      <p className="mt-3 flex-1 rounded-xl bg-[#F8FEFF] border border-cyan-100/60 p-4 text-[13.5px] leading-relaxed text-slate-600">
                        {p.prompt}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-cyan-50 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-700 border border-cyan-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
                </div>
              )}
            </div>
          </section>

          {/* Methodology callout */}
          <section className="px-4 sm:px-6 pb-24">
            <div className="mx-auto max-w-4xl">
              <AnimatedSection>
                <div className="rounded-[24px] border border-cyan-100 bg-[#F8FEFF] p-8 md:p-10">
                  <h2
                    className="font-display font-thin text-[#0F172A] text-balance"
                    style={{ fontSize: "clamp(26px, 3.5vw, 36px)", lineHeight: 1.1 }}
                  >
                    Run Prompts Weekly, Score Monthly
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-slate-500">
                    A prompt library only helps if you record the results consistently. Score each
                    prompt 0 or 1 for retrieval, citation, and recommendation, and repeat on a fixed
                    cadence. The five metrics guide and the AI visibility benchmarks article explain
                    how to turn raw answers into a comparable scorecard.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/blog/ai-visibility-benchmarks-service-businesses"
                      className="inline-flex h-11 items-center rounded-full bg-[#0f172a] px-6 text-sm font-semibold text-white transition hover:bg-cyan-700"
                    >
                      Read the Benchmarks Guide
                    </Link>
                    <Link
                      href="/services/ai-automation/ai-visibility-audit"
                      className="inline-flex h-11 items-center rounded-full border border-cyan-200 bg-white px-6 text-sm font-semibold text-[#0F172A] transition hover:border-cyan-300 hover:bg-cyan-50"
                    >
                      Have Us Run the Audit
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
