"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Search,
  Copy,
  Check,
  Download,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  MessageSquare,
  Video,
  FileText,
  TrendingUp,
  ShieldAlert,
  Bot,
  Zap,
  Globe,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShaderBackground from "@/components/ui/shader-background";
import StickyFooterLayout from "@/components/layout/StickyFooterLayout";
import { StrandOrb } from "@/components/strand-orb";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Type Definitions
// ---------------------------------------------------------------------------
interface CitationSource {
  id: string;
  type: "reddit" | "youtube" | "listicle" | "forum";
  title: string;
  url: string;
  sourceName: string;
  authorityScore: number;
  citationWeight: "high" | "medium" | "low";
  citedByModels: ("ChatGPT" | "Perplexity" | "Gemini" | "Claude")[];
  competitorsMentioned: string[];
  snippet: string;
  timestampOrSubreddit?: string;
  opportunityType: "hijack_comment" | "video_timestamp" | "publisher_outreach";
  suggestedAction: string;
  draftedResponse: string;
}

interface CitationHijackerResponse {
  success: boolean;
  query: string;
  domain: string;
  opportunityScore: number;
  summary: {
    totalSources: number;
    redditThreadsCount: number;
    youtubeVideosCount: number;
    listiclesCount: number;
    competitorMentionsCount: number;
    topCompetitors: string[];
  };
  sources: CitationSource[];
  generatedAt: string;
  error?: string;
}

const EXAMPLE_PRESETS = [
  {
    label: "HVAC & Plumbing Software (jobber.com)",
    query: "Top field service management software for HVAC and plumbing contractors",
    domain: "jobber.com",
  },
  {
    label: "Agile PM (pmspace.ai)",
    query: "Best AI project management tools for agile startups",
    domain: "pmspace.ai",
  },
  {
    label: "Logistics Automation",
    query: "Top workflow automation software for logistics",
    domain: "aibizmod.com",
  },
  {
    label: "AI Customer Support",
    query: "Top customer support AI agents 2026",
    domain: "aibizmod.com",
  },
  {
    label: "Property Management (appfolio.com)",
    query: "Best property management software for residential landlords",
    domain: "appfolio.com",
  },
];

const SCAN_STEPS = [
  "Probing ChatGPT Search & Perplexity citation graph",
  "Extracting active Reddit threads & community discussions",
  "Scanning YouTube video transcripts & chapter timestamps",
  "Mapping competitor mentions & authority gaps",
  "Generating 1-click authentic insertion responses",
];

export default function AICitationHijackerClient() {
  const prefersReduced = useReducedMotion();
  const [queryInput, setQueryInput] = useState("");
  const [domainInput, setDomainInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [result, setResult] = useState<CitationHijackerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Tabs: 'all' | 'reddit' | 'youtube' | 'listicle'
  const [activeTab, setActiveTab] = useState<"all" | "reddit" | "youtube" | "listicle">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopyAll = () => {
    if (!result) return;
    const fullSummary = `# AI Citation Hijacker Report for "${result.query}"\nTarget Brand: ${result.domain}\nOpportunity Score: ${result.opportunityScore}/100\n\n` +
      result.sources.map((s, idx) => `## ${idx + 1}. [${s.sourceName}] ${s.title}\nURL: ${s.url}\nType: ${s.type.toUpperCase()} | Cited By: ${s.citedByModels.join(", ")}\nCompetitors: ${s.competitorsMentioned.join(", ")}\nAction: ${s.suggestedAction}\n\nDraft Response:\n${s.draftedResponse}\n\n---`).join("\n\n");

    navigator.clipboard.writeText(fullSummary);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handleDownload = () => {
    if (!result) return;
    const fullSummary = `# AI Citation Hijacker Report for "${result.query}"\nTarget Brand: ${result.domain}\nOpportunity Score: ${result.opportunityScore}/100\nGenerated: ${result.generatedAt}\n\n` +
      result.sources.map((s, idx) => `## ${idx + 1}. [${s.sourceName}] ${s.title}\nURL: ${s.url}\nType: ${s.type.toUpperCase()} | Cited By: ${s.citedByModels.join(", ")}\nCompetitors: ${s.competitorsMentioned.join(", ")}\nAction: ${s.suggestedAction}\n\nDraft Response:\n${s.draftedResponse}\n\n---`).join("\n\n");

    const blob = new Blob([fullSummary], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ai-citation-hijack-${result.query.toLowerCase().replace(/\s+/g, "-")}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = queryInput.trim();
    if (!query) {
      setError("Please enter a search topic or buyer-intent query.");
      return;
    }

    setError(null);
    setLoading(true);
    setProgress(0);
    setCurrentStepIndex(0);
    setResult(null);

    // Simulation progress animation
    const startTime = Date.now();
    const totalDuration = 4200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(0.95, elapsed / totalDuration);
      setProgress(pct);
      const stepIdx = Math.min(
        SCAN_STEPS.length - 1,
        Math.floor(pct * SCAN_STEPS.length)
      );
      setCurrentStepIndex(stepIdx);
    }, 120);

    try {
      const res = await fetch("/api/citation-hijacker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          domain: domainInput.trim() || "aibizmod.com",
        }),
      });

      const data: CitationHijackerResponse = await res.json();
      clearInterval(interval);
      setProgress(1);

      setTimeout(() => {
        setLoading(false);
        if (data.success) {
          setResult(data);
          setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 150);
        } else {
          setError(data.error || "Failed to analyze AI citation sources.");
        }
      }, 500);
    } catch {
      clearInterval(interval);
      setLoading(false);
      setError("Network error occurred while fetching citation opportunities.");
    }
  };

  const filteredSources = result?.sources.filter((s) => {
    if (activeTab === "all") return true;
    return s.type === activeTab;
  }) || [];

  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="min-h-screen bg-white text-[#0F172A]">
          {/* ── Hero Section ────────────────────────────────────────────── */}
          <section className="relative isolate overflow-hidden px-6 pb-16 pt-32 md:pb-24 md:pt-36">
            <ShaderBackground className="absolute inset-0 z-0 h-full w-full opacity-80" />
            <div
              className="pointer-events-none absolute left-1/2 top-24 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
              {/* Breadcrumb */}
              <nav
                className="mb-8 inline-flex flex-wrap items-center gap-1.5 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-[13px] text-slate-500 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="transition-colors hover:text-[#0F172A]">
                  Home
                </Link>
                <ChevronRight size={13} className="shrink-0 text-cyan-300" aria-hidden="true" />
                <Link href="/tools" className="transition-colors hover:text-[#0F172A]">
                  Tools
                </Link>
                <ChevronRight size={13} className="shrink-0 text-cyan-300" aria-hidden="true" />
                <span className="font-medium text-[#0F172A]" aria-current="page">
                  AI Citation Hijacker
                </span>
              </nav>

              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md">
                  <Sparkles size={14} aria-hidden="true" />
                  Community & Video GEO Engine
                </span>

                <h1
                  className="mt-7 font-display font-medium text-[#0F172A] text-balance"
                  style={{
                    fontSize: "clamp(32px, 5vw, 54px)",
                    lineHeight: 1.06,
                    letterSpacing: "-0.03em",
                  }}
                >
                  AI Citation Hijacker & Source Finder
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-slate-600">
                  Over 45% of ChatGPT and Perplexity citations come from <strong>Reddit, YouTube transcripts, and niche blogs</strong>. Discover the exact third-party sources recommending your competitors, and get 1-click authentic responses to flip the recommendation to your brand.
                </p>
              </motion.div>

              {/* ── Search Form ────────────────────────────────────────── */}
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mx-auto mt-10 max-w-2xl"
              >
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3 rounded-2xl border border-cyan-200/80 bg-white/90 p-3 shadow-[0_12px_45px_rgba(8,145,178,0.12)] backdrop-blur-md transition-all sm:flex-row sm:items-center sm:p-2 sm:rounded-full"
                >
                  <div className="flex flex-1 items-center gap-2 px-3">
                    <Search className="h-5 w-5 text-cyan-600 shrink-0" />
                    <input
                      type="text"
                      value={queryInput}
                      onChange={(e) => setQueryInput(e.target.value)}
                      placeholder="Enter target query (e.g. Best AI CRM for real estate)"
                      className="h-11 w-full bg-transparent text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none sm:text-base"
                      disabled={loading}
                    />
                  </div>

                  <div className="flex items-center gap-2 border-t border-slate-100 pt-2 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0">
                    <Globe className="h-4 w-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={domainInput}
                      onChange={(e) => setDomainInput(e.target.value)}
                      placeholder="Your website (optional)"
                      className="h-10 w-full bg-transparent text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none sm:w-44 sm:text-sm"
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !queryInput.trim()}
                    className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 text-sm font-semibold text-white shadow-md shadow-cyan-600/20 transition-all hover:brightness-105 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-full"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <span>Find Citations</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>

                {error && (
                  <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-rose-600">
                    <ShieldAlert size={14} />
                    <span>{error}</span>
                  </div>
                )}

                {/* Example Pills */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
                  <span className="font-medium text-slate-400">Try searching:</span>
                  {EXAMPLE_PRESETS.map((preset) => (
                    <button
                      key={preset.query}
                      type="button"
                      onClick={() => {
                        setQueryInput(preset.query);
                        setDomainInput(preset.domain);
                      }}
                      className="rounded-full border border-slate-200 bg-white/80 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:border-cyan-400 hover:text-cyan-700"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Scanning State Animation ─────────────────────────────────── */}
          <AnimatePresence>
            {loading && (
              <motion.section
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="px-6 py-12"
              >
                <div className="mx-auto flex max-w-xl flex-col items-center justify-center rounded-3xl border border-cyan-100 bg-gradient-to-b from-white to-cyan-50/40 p-10 text-center shadow-xl backdrop-blur-md">
                  <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
                    <StrandOrb size={96} progress={progress} className="drop-shadow-lg" />
                  </div>

                  <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "Satoshi, sans-serif" }}>
                    Analyzing AI Search Citation Graph
                  </h2>

                  <p className="mt-2 text-sm text-cyan-700 font-medium">
                    {SCAN_STEPS[currentStepIndex]}
                  </p>

                  <div className="mt-6 h-2 w-full max-w-sm overflow-hidden rounded-full bg-cyan-100">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                      style={{ width: `${Math.round(progress * 100)}%` }}
                    />
                  </div>
                  <span className="mt-2 text-xs font-mono text-slate-400">
                    {Math.round(progress * 100)}% complete
                  </span>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* ── Results Dashboard ────────────────────────────────────────── */}
          {result && (
            <section ref={resultsRef} className="px-6 pb-28 pt-4">
              <div className="mx-auto max-w-6xl">
                {/* Header Summary Card */}
                <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                        <CheckCircle2 size={13} />
                        Audit Complete • {result.sources.length} Citation Opportunities Found
                      </div>
                      <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl" style={{ fontFamily: "Satoshi, sans-serif" }}>
                        Citation Map for &quot;{result.query}&quot;
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Target Brand: <span className="font-semibold text-slate-700">{result.domain}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Score Gauge */}
                      <div className="flex items-center gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/50 p-4">
                        <div className="text-right">
                          <div className="text-3xl font-extrabold text-cyan-800" style={{ fontFamily: "Satoshi, sans-serif" }}>
                            {result.opportunityScore}
                            <span className="text-sm font-normal text-slate-400">/100</span>
                          </div>
                          <div className="text-[11px] font-medium text-cyan-700">GEO Opportunity Score</div>
                        </div>
                        <TrendingUp className="h-8 w-8 text-cyan-600" />
                      </div>

                      {/* Export buttons */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={handleCopyAll}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                        >
                          {copiedAll ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                          {copiedAll ? "Copied All" : "Copy Report"}
                        </button>
                        <button
                          onClick={handleDownload}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800"
                        >
                          <Download size={14} />
                          Export .MD
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Summary Metric Strip */}
                  <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <MessageSquare size={14} className="text-orange-500" />
                        Reddit Threads
                      </div>
                      <div className="mt-1 text-2xl font-bold text-slate-900" style={{ fontFamily: "Satoshi, sans-serif" }}>
                        {result.summary.redditThreadsCount}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Active discussions cited by LLMs</div>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Video size={14} className="text-red-500" />
                        YouTube Transcripts
                      </div>
                      <div className="mt-1 text-2xl font-bold text-slate-900" style={{ fontFamily: "Satoshi, sans-serif" }}>
                        {result.summary.youtubeVideosCount}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Video chapters & timestamps</div>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <FileText size={14} className="text-blue-500" />
                        Editorial Listicles
                      </div>
                      <div className="mt-1 text-2xl font-bold text-slate-900" style={{ fontFamily: "Satoshi, sans-serif" }}>
                        {result.summary.listiclesCount}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Authority roundup guides</div>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Bot size={14} className="text-purple-500" />
                        Competitors Cited
                      </div>
                      <div className="mt-1 text-2xl font-bold text-slate-900" style={{ fontFamily: "Satoshi, sans-serif" }}>
                        {result.summary.topCompetitors.length}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                        {result.summary.topCompetitors.slice(0, 2).join(", ")}...
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs Navigation */}
                <div className="mt-8 flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab("all")}
                      className={cn(
                        "rounded-xl px-4 py-2 text-xs font-semibold transition-all",
                        activeTab === "all"
                          ? "bg-cyan-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      )}
                    >
                      All Sources ({result.sources.length})
                    </button>
                    <button
                      onClick={() => setActiveTab("reddit")}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all",
                        activeTab === "reddit"
                          ? "bg-orange-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      )}
                    >
                      <MessageSquare size={13} />
                      Reddit & Forums ({result.summary.redditThreadsCount})
                    </button>
                    <button
                      onClick={() => setActiveTab("youtube")}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all",
                        activeTab === "youtube"
                          ? "bg-red-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      )}
                    >
                      <Video size={13} />
                      YouTube Transcripts ({result.summary.youtubeVideosCount})
                    </button>
                    <button
                      onClick={() => setActiveTab("listicle")}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all",
                        activeTab === "listicle"
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      )}
                    >
                      <FileText size={13} />
                      Niche Listicles ({result.summary.listiclesCount})
                    </button>
                  </div>

                  <span className="text-xs text-slate-400">
                    Showing {filteredSources.length} actionable targets
                  </span>
                </div>

                {/* Sources Feed */}
                <div className="mt-6 space-y-4">
                  {filteredSources.map((source) => {
                    const isReddit = source.type === "reddit";
                    const isYoutube = source.type === "youtube";
                    const isListicle = source.type === "listicle";

                    const badgeColor = isReddit
                      ? "bg-orange-50 text-orange-700 border-orange-200"
                      : isYoutube
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-blue-50 text-blue-700 border-blue-200";

                    return (
                      <div
                        key={source.id}
                        className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-cyan-300 hover:shadow-md"
                      >
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase", badgeColor)}>
                                {isReddit && <MessageSquare size={11} />}
                                {isYoutube && <Video size={11} />}
                                {isListicle && <FileText size={11} />}
                                {source.sourceName}
                              </span>

                              <span className="text-xs text-slate-400 font-medium">
                                {source.timestampOrSubreddit}
                              </span>

                              <div className="ml-auto flex items-center gap-1.5 sm:ml-0">
                                {source.citedByModels.map((model) => (
                                  <span
                                    key={model}
                                    className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600"
                                  >
                                    {model}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <h3 className="mt-2.5 text-base font-bold text-slate-900">
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-cyan-600 transition-colors inline-flex items-center gap-1.5"
                              >
                                {source.title}
                                <ExternalLink size={13} className="text-slate-400" />
                              </a>
                            </h3>

                            {/* Snippet Context */}
                            <p className="mt-2 text-xs leading-relaxed text-slate-600 bg-slate-50/80 border border-slate-100 rounded-xl p-3">
                              <span className="font-semibold text-slate-700">What AI extracts: </span>
                              &ldquo;{source.snippet}&rdquo;
                            </p>

                            {/* Competitor list */}
                            <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                              <span className="text-[11px] font-medium text-slate-400">Competitors cited:</span>
                              {source.competitorsMentioned.map((comp) => (
                                <span
                                  key={comp}
                                  className="rounded-full bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 text-[10px] font-medium"
                                >
                                  {comp}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Authority Badge */}
                          <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
                            <div className="text-right">
                              <div className="text-lg font-bold text-slate-900">{source.authorityScore}</div>
                              <div className="text-[10px] text-slate-400">Authority Score</div>
                            </div>
                          </div>
                        </div>

                        {/* Action Box with 1-Click Copy Response */}
                        <div className="mt-4 rounded-xl border border-cyan-100 bg-gradient-to-r from-cyan-50/50 to-blue-50/50 p-4">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-800">
                              <Zap size={14} className="text-cyan-600" />
                              Recommended Hijack Action:
                            </div>
                            <button
                              onClick={() => handleCopy(source.id, source.draftedResponse)}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-cyan-200 px-3 py-1.5 text-xs font-bold text-cyan-700 shadow-sm transition hover:bg-cyan-600 hover:text-white"
                            >
                              {copiedId === source.id ? (
                                <>
                                  <Check size={13} className="text-emerald-600" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={13} />
                                  <span>1-Click Copy Response</span>
                                </>
                              )}
                            </button>
                          </div>

                          <p className="mt-1 text-xs text-slate-600">
                            {source.suggestedAction}
                          </p>

                          {/* Pre-drafted response preview */}
                          <div className="mt-2.5 rounded-lg bg-white p-3 text-xs text-slate-700 border border-slate-200/80 font-sans leading-relaxed">
                            {source.draftedResponse}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom CTA Banner */}
                <div className="mt-12 rounded-3xl border border-cyan-200 bg-gradient-to-r from-cyan-900 to-slate-900 p-8 text-white shadow-xl">
                  <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-400/30">
                        <Sparkles size={13} />
                        Done-For-You Citation Engineering
                      </span>
                      <h3 className="mt-3 text-xl font-bold sm:text-2xl" style={{ fontFamily: "Satoshi, sans-serif" }}>
                        Want AIBizMod to execute your AI citation takeover?
                      </h3>
                      <p className="mt-1 text-sm text-cyan-100/70 max-w-xl">
                        Our engineering team executes community outreach, verified case study placements, and structured schema implementation to guarantee your brand appears in ChatGPT and Perplexity.
                      </p>
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                    >
                      <span>Book a GEO Strategy Call</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </StickyFooterLayout>
    </>
  );
}
