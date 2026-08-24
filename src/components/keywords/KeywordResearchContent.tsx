"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Search,
  Download,
  Loader2,
  Layers,
  Hash,
  Sparkles,
  BarChart3,
  Target,
  BookOpen,
  ArrowRight,
  Printer,
  TrendingUp,
  Info,
  FileText,
  Copy,
  Check,
  CheckCircle,
  Activity,
  SearchCheck,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyFooterLayout from "@/components/layout/StickyFooterLayout";
import { StarButton } from "@/components/ui/star-button";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { ReportGate } from "@/components/aibizmod/ReportGate";
import type { KeywordResult } from "@/app/api/keywords/route";
import {
  detectIntent,
  longTailShare,
  exportCSV,
  INTENT_LABELS,
  SectionHeader,
  StatTile,
  ProgressBar,
  ClusterCard,
} from "./report-parts";
import {
  KeywordStrandsBackground,
  KeywordLoadingSkeleton,
} from "./keyword-strands";

// ─── Report view ─────────────────────────────────────────────────────────────

function KeywordReport({ result }: { result: KeywordResult }) {
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const total = result.allKeywords.length;
  const largest = result.clusters[0]?.keywords.length ?? 0;
  const avg =
    total > 0
      ? Math.round((total / Math.max(result.clusters.length, 1)) * 10) / 10
      : 0;
  const longTail = longTailShare(result.allKeywords);

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(result.allKeywords.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  };

  const exportPDF = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const node = document.getElementById("keyword-report");
      if (!node) return;
      const canvas = await html2canvas(node, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const pdf = new jsPDF("p", "mm", "a4");
      const w = pdf.internal.pageSize.getWidth();
      const h = (canvas.height * w) / canvas.width;
      let left = h;
      let pos = 0;
      const page = pdf.internal.pageSize.getHeight();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, pos, w, h);
      left -= page;
      while (left > 0) {
        pos -= page;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, pos, w, h);
        left -= page;
      }
      pdf.save(
        `keyword-research-${result.seed
          .replace(/[^a-z0-9]+/gi, "-")
          .toLowerCase()}.pdf`
      );
    } catch (e) {
      console.error(e);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6" id="keyword-report">
      {/* Report header */}
      <div className="group relative bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-sm flex-shrink-0">
              <Search className="h-6 w-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1
                className="text-xl font-bold text-slate-900 truncate"
                style={{ fontFamily: "Satoshi, sans-serif" }}
              >
                {result.seed}
              </h1>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">
                  <Sparkles className="h-3 w-3" />
                  Keyword Research Report
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-xs text-slate-400">
                  Generated{" "}
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="sm:ml-auto flex items-center gap-3">
            <button
              onClick={exportPDF}
              disabled={exporting}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-cyan-600 transition disabled:opacity-50"
            >
              {exporting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Printer className="h-3.5 w-3.5" />
              )}
              {exporting ? "Exporting..." : "Export PDF"}
            </button>
            <span className="text-slate-200">|</span>
            <button
              onClick={() => exportCSV(result)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-cyan-600 transition"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
            <span className="text-slate-200">|</span>
            <button
              onClick={copyAll}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-cyan-600 transition"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied" : "Copy all"}
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: Executive Summary */}
      <div className="rounded-2xl bg-gradient-to-br from-cyan-50/40 via-white to-emerald-50/30 border border-cyan-100/60 p-6 sm:p-8 shadow-sm">
        <SectionHeader
          icon={<BarChart3 className="h-5 w-5" />}
          title="Executive Summary"
          subtitle={`Keyword landscape for "${result.seed}" — expanded via Google Suggest and grouped by semantic intent`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Coverage */}
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="relative" style={{ width: 176, height: 176 }}>
                  <svg
                    width={176}
                    height={176}
                    className="transform -rotate-90 drop-shadow-lg"
                  >
                    <circle
                      cx={88}
                      cy={88}
                      r={78}
                      stroke="#e2e8f0"
                      strokeWidth={10}
                      fill="none"
                    />
                    <circle
                      cx={88}
                      cy={88}
                      r={78}
                      stroke="#0891b2"
                      strokeWidth={10}
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 78}
                      strokeDashoffset={
                        2 *
                        Math.PI *
                        78 *
                        (1 - Math.min(total, 200) / 200)
                      }
                      filter="url(#kwglow)"
                      style={{
                        transition:
                          "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    />
                    <defs>
                      <filter id="kwglow">
                        <feGaussianBlur
                          stdDeviation="3"
                          result="coloredBlur"
                        />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      className="text-4xl font-bold text-slate-900 tracking-tight"
                      style={{ fontFamily: "Satoshi, sans-serif" }}
                    >
                      {total}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Keywords
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center sm:text-left flex-1">
                <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold border bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-sm">
                    <Sparkles className="h-4 w-4" />
                    {result.clusters.length} Keyword Clusters
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed max-w-md mb-5">
                  Google Suggest expansion surfaced <strong>{total}</strong>{" "}
                  unique queries for your seed term, organized into{" "}
                  <strong>{result.clusters.length}</strong> semantic clusters.{" "}
                  {longTail}% of the keywords are long-tail (3+ words), which
                  typically converts better and faces less competition.
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-700">
                        Long-Tail Coverage
                      </span>
                      <Info className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                    <span className="text-sm font-bold text-slate-900">
                      {longTail}%
                    </span>
                  </div>
                  <ProgressBar pct={longTail} gradient="from-cyan-500 to-teal-500" />
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    {longTail >= 60
                      ? "Excellent long-tail depth — most keywords capture specific buyer intent."
                      : "Moderate long-tail coverage — enrich clusters with modifiers (best, for, vs, near me) to expand."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatTile
              icon={<Hash className="h-4 w-4 text-cyan-600" />}
              label="Total Keywords"
              value={total}
              color="text-slate-900"
            />
            <StatTile
              icon={<Layers className="h-4 w-4 text-violet-600" />}
              label="Clusters"
              value={result.clusters.length}
              color="text-slate-900"
            />
            <StatTile
              icon={<Target className="h-4 w-4 text-emerald-600" />}
              label="Largest Cluster"
              value={largest}
              color="text-slate-900"
              note="Keywords in top cluster"
            />
            <StatTile
              icon={<TrendingUp className="h-4 w-4 text-amber-500" />}
              label="Avg Cluster Size"
              value={avg}
              color="text-slate-900"
              note="Keywords per cluster"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Intent Breakdown */}
      <div className="rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm ring-1 ring-slate-100">
        <SectionHeader
          icon={<Target className="h-5 w-5" />}
          title="Search Intent Breakdown"
          subtitle="How the discovered keywords distribute across buying-stage intents"
          iconGradient="from-violet-500 to-purple-600"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              "informational",
              "commercial",
              "transactional",
              "navigational",
            ] as const
          ).map((intent) => {
            const count = result.clusters
              .filter((c) => detectIntent(c.keywords) === intent)
              .reduce((acc, c) => acc + c.keywords.length, 0);
            const cfg = INTENT_LABELS[intent];
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div
                key={intent}
                className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium",
                      cfg.bg
                    )}
                  >
                    {cfg.label}
                  </span>
                  <span
                    className="text-sm font-bold text-slate-900"
                    style={{ fontFamily: "Satoshi, sans-serif" }}
                  >
                    {pct}%
                  </span>
                </div>
                <ProgressBar pct={pct} gradient="from-violet-500 to-purple-600" />
                <p className="text-[11px] text-slate-500 mt-2">
                  {count} keywords
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: Keyword Clusters */}
      <div className="rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm ring-1 ring-slate-100">
        <SectionHeader
          icon={<Layers className="h-5 w-5" />}
          title="Keyword Clusters"
          subtitle="Grouped by semantic similarity — each cluster maps to a target page on your site"
          iconGradient="from-cyan-500 to-teal-500"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {result.clusters.map((group, i) => (
            <ClusterCard
              key={`${group.label}-${i}`}
              group={group}
              index={i}
              total={total}
            />
          ))}
        </div>
      </div>

      {/* SECTION 4: How to Use */}
      <div className="rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm ring-1 ring-slate-100">
        <SectionHeader
          icon={<BookOpen className="h-5 w-5" />}
          title="How to Use This Report"
          subtitle="Turn keyword clusters into a page plan that drives organic traffic"
          iconGradient="from-amber-500 to-orange-500"
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 flex gap-3">
            <div className="p-2 rounded-lg bg-white border border-slate-100 flex-shrink-0 h-fit">
              <Target className="h-4 w-4 text-cyan-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 mb-1">
                1 · Map clusters to pages
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Assign each cluster to a service page, blog post, or comparison
                page. One cluster = one focused page with a clear primary
                keyword.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 flex gap-3">
            <div className="p-2 rounded-lg bg-white border border-slate-100 flex-shrink-0 h-fit">
              <TrendingUp className="h-4 w-4 text-violet-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 mb-1">
                2 · Prioritize by intent
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Commercial and transactional clusters drive conversions.
                Informational clusters attract and educate — pair them with
                strong CTAs.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 flex gap-3">
            <div className="p-2 rounded-lg bg-white border border-slate-100 flex-shrink-0 h-fit">
              <FileText className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 mb-1">
                3 · Bake keywords into content
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Use cluster terms naturally in titles, H2/H3 headings, meta
                descriptions, and body copy — never keyword-stuff.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 flex gap-3">
            <div className="p-2 rounded-lg bg-white border border-slate-100 flex-shrink-0 h-fit">
              <BarChart3 className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 mb-1">
                4 · Track and iterate
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Export the CSV as your working list, monitor rankings in Search
                Console, and re-run this tool monthly to find new long-tail
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-10 text-center shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium mb-4">
            <Sparkles className="h-3 w-3" />
            Expert SEO Implementation
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            Need help turning keywords into rankings?
          </h2>
          <p className="text-slate-300 text-sm max-w-lg mx-auto mb-6">
            Our SEO and content specialists build keyword-driven page strategies
            that win organic traffic — and stay visible in AI search.
          </p>
          <a href={`/contact?keyword=${encodeURIComponent(result.seed)}`}>
            <button className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-white text-slate-900 text-sm font-bold shadow-lg hover:bg-cyan-50 hover:shadow-xl transition-all hover:-translate-y-0.5">
              Get Expert Help <ArrowRight className="h-4 w-4" />
            </button>
          </a>
        </div>
      </div>

      {/* Footer attribution */}
      <div className="text-center pb-8">
        <p className="text-xs text-slate-400">
          Powered by{" "}
          <a
            href="/services/digital-marketing/search-marketing"
            className="text-cyan-600 hover:text-cyan-700 font-medium transition"
          >
            AIBizMod Keyword Research Engine
          </a>
          {" · "}
          <span>Keyword Research for {result.seed}</span>
        </p>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

interface StrandTarget {
  cx: number;
  cy: number;
  left: number;
  right: number;
  pillW: number;
}

const FALLBACK_TARGET: StrandTarget = {
  cx: 720,
  cy: 580,
  left: 396,
  right: 1044,
  pillW: 648,
};

export default function KeywordResearchContent() {
  const [seed, setSeed] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<KeywordResult | null>(null);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchTarget, setSearchTarget] = useState<StrandTarget | null>(null);
  const [resultsSearchTarget, setResultsSearchTarget] = useState<StrandTarget | null>(null);
  const ripples = useRef<{ t0: number; life: number }[]>([]);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const heroSummaryRef = useRef<HTMLDivElement>(null);
  const resultsSectionRef = useRef<HTMLElement>(null);

  const measureForm = useCallback(() => {
    if (!formRef.current || !sectionRef.current) {
      setSearchTarget(FALLBACK_TARGET);
      return;
    }
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const formRect = formRef.current.getBoundingClientRect();

    if (sectionRect.width === 0 || sectionRect.height === 0) {
      setSearchTarget(FALLBACK_TARGET);
      return;
    }

    const sx = 1440 / sectionRect.width;
    const rawH = Math.max(sectionRect.height, sectionRef.current.scrollHeight, 900);
    const sy = 900 / rawH;

    const left = (formRect.left - sectionRect.left) * sx;
    const right = (formRect.right - sectionRect.left) * sx;
    const top = (formRect.top - sectionRect.top) * sy;
    const bottom = (formRect.bottom - sectionRect.top) * sy;
    const cx = (left + right) / 2;
    let cy = (top + bottom) / 2;
    if (cy < 480) cy = 580;

    setSearchTarget({ cx, cy, left, right, pillW: right - left });
  }, []);

  const measureResultsCard = useCallback(() => {
    if (!heroSummaryRef.current || !resultsSectionRef.current) return;
    const sectionRect = resultsSectionRef.current.getBoundingClientRect();
    const cardRect = heroSummaryRef.current.getBoundingClientRect();

    if (sectionRect.width === 0 || sectionRect.height === 0) return;

    const sx = 1440 / sectionRect.width;
    const rawH = Math.max(sectionRect.height, resultsSectionRef.current.scrollHeight, 900);
    const sy = 900 / rawH;

    const left = (cardRect.left - sectionRect.left) * sx;
    const right = (cardRect.right - sectionRect.left) * sx;
    const top = (cardRect.top - sectionRect.top) * sy;
    const bottom = (cardRect.bottom - sectionRect.top) * sy;
    const cx = (left + right) / 2;
    let cy = (top + bottom) / 2;
    if (cy < 480) cy = 580;

    setResultsSearchTarget({ cx, cy, left, right, pillW: right - left });
  }, []);

  useEffect(() => {
    measureForm();
    const id1 = requestAnimationFrame(measureForm);
    const id2 = setTimeout(measureForm, 80);
    const id3 = setTimeout(measureForm, 300);
    window.addEventListener("resize", measureForm);
    window.addEventListener("scroll", measureForm, { passive: true });

    const ro = new ResizeObserver(measureForm);
    if (sectionRef.current) ro.observe(sectionRef.current);

    return () => {
      cancelAnimationFrame(id1);
      clearTimeout(id2);
      clearTimeout(id3);
      window.removeEventListener("resize", measureForm);
      window.removeEventListener("scroll", measureForm);
      ro.disconnect();
    };
  }, [measureForm]);

  useEffect(() => {
    if (!resultsSectionRef.current) return;
    measureResultsCard();
    const id1 = requestAnimationFrame(measureResultsCard);
    const id2 = setTimeout(measureResultsCard, 100);
    window.addEventListener("resize", measureResultsCard);
    window.addEventListener("scroll", measureResultsCard, { passive: true });

    const ro = new ResizeObserver(measureResultsCard);
    if (resultsSectionRef.current) ro.observe(resultsSectionRef.current);

    return () => {
      cancelAnimationFrame(id1);
      clearTimeout(id2);
      window.removeEventListener("resize", measureResultsCard);
      window.removeEventListener("scroll", measureResultsCard);
      ro.disconnect();
    };
  }, [measureResultsCard]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeed(e.target.value);
    setIsTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 800);

    const now = performance.now() / 1000;
    if (ripples.current.length >= 8) ripples.current.shift();
    ripples.current.push({ t0: now, life: 1.4 });
  };

  async function handleSearch() {
    const cleaned = seed.trim();
    if (!cleaned || loading) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seed: cleaned }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  const resetSearch = () => {
    setResult(null);
    setSeed("");
    setError("");
    setSearchTarget(FALLBACK_TARGET);
    setResultsSearchTarget(null);
  };

  const total = result?.allKeywords.length ?? 0;
  const longTail = result ? longTailShare(result.allKeywords) : 0;
  const largestCluster = result?.clusters[0]?.keywords.length ?? 0;

  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink">
          {/* ── Hero (search) ──────────────────────────────────────────────── */}
          {!loading && !result && (
            <section
              ref={sectionRef}
              className="relative isolate overflow-hidden px-6 bg-white min-h-screen flex items-center justify-center pt-20"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(255,255,255,0.96) 100%)",
                }}
              />

              <KeywordStrandsBackground
                searchTarget={searchTarget}
                isTyping={isTyping}
                ripples={ripples}
                className="absolute inset-0 z-0"
              />

              <div
                className="pointer-events-none absolute inset-0 z-0 opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)",
                  backgroundSize: "72px 72px",
                }}
                aria-hidden="true"
              />

              <div className="relative z-10 mx-auto max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md">
                  <Sparkles size={14} aria-hidden="true" />
                  Find High-Value Keywords — Free
                </div>

                <h1 className="mt-6 font-display font-bold text-balance text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.08]">
                  Discover Long-Tail Keywords that{" "}
                  <TextShimmer
                    as="span"
                    duration={2.2}
                    className="italic font-serif [--base-color:theme(colors.cyan.600)] [--base-gradient-color:#ffffff]"
                  >
                    Convert.
                  </TextShimmer>
                </h1>

                <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                  Expand a single seed keyword into dozens of long-tail variants via Google
                  Suggest, automatically grouped by search intent. Free, no signup, no API key.
                </p>

                <div className="mt-8 mx-auto w-full max-w-2xl">
                  <form
                    ref={formRef}
                    id="hero-keyword-form"
                    onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
                    className="flex flex-col gap-2.5 sm:flex-row"
                  >
                    <div className="relative flex-1">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-stone-400">
                        <Search className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={seed}
                        onChange={handleInputChange}
                        placeholder="Enter a seed keyword"
                        autoFocus
                        className="h-12 w-full rounded-2xl border border-cyan-400/80 bg-white shadow-sm pl-10 pr-4 text-[14px] font-medium text-slate-900 outline-none placeholder:text-stone-400 ring-2 ring-cyan-100"
                        aria-label="Seed keyword"
                      />
                    </div>
                    <StarButton
                      as="span"
                      lightColor="#00f0ff"
                      backgroundColor="#0f172a"
                      borderWidth={2.2}
                      glow={true}
                      sparkGradient="conic-gradient(from 0deg, transparent 0deg, transparent 40deg, rgba(0, 240, 255, 0.7) 100deg, var(--light-color) 180deg, #ffffff 200deg, #00f0ff 220deg, rgba(0, 240, 255, 0.7) 280deg, transparent 330deg)"
                      className="h-12 w-full font-sans text-[11px] font-semibold uppercase tracking-[0.2em] sm:w-auto"
                      onClick={() => {
                        const form = document.querySelector("#hero-keyword-form") as HTMLFormElement;
                        form?.requestSubmit();
                      }}
                    >
                      Find Keywords
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/star-button:translate-x-1" />
                    </StarButton>
                  </form>

                  <div className="mt-3 flex flex-wrap justify-center gap-2 text-[11px] text-stone-600 sm:gap-3 sm:text-[12px]">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white/80 px-3 py-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      No signup required
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white/80 px-3 py-1.5">
                      <Activity className="h-3.5 w-3.5 text-cyan-500" />
                      Live Google Suggest
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white/80 px-3 py-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                      Intent clustering
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-red-100/50 p-8 text-center shadow-lg">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                      <AlertCircle className="h-7 w-7 text-red-500" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-red-800">Research Failed</h3>
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ── Loading screen ─────────────────────────────────────────────── */}
          {loading && (
            <section className="relative isolate overflow-hidden bg-white px-6 min-h-screen flex items-center justify-center pt-20">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(255,255,255,0.96) 100%)",
                }}
              />
              <KeywordStrandsBackground className="absolute inset-0 z-0" />
              <div className="relative z-10 w-full max-w-3xl mx-auto">
                <KeywordLoadingSkeleton seed={seed.trim() || "…"} />
              </div>
            </section>
          )}

          {/* ── Results ────────────────────────────────────────────────────── */}
          {result && (
            <>
              {/* Immersive results hero */}
              <section ref={resultsSectionRef} className="relative isolate overflow-hidden bg-white px-6 pt-28 pb-20">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-[1]"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(255,255,255,0.96) 100%)",
                  }}
                />

                <KeywordStrandsBackground
                  searchTarget={resultsSearchTarget}
                  className="absolute inset-0 z-0"
                />

                <div
                  className="pointer-events-none absolute inset-0 z-0 opacity-60"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                  }}
                  aria-hidden="true"
                />

                <div
                  className="pointer-events-none absolute left-1/2 top-36 z-0 h-96 w-96 -translate-x-1/2 rounded-full blur-[100px]"
                  style={{ backgroundColor: "#0891b2", opacity: 0.08 }}
                  aria-hidden="true"
                />

                <div ref={heroSummaryRef} className="relative z-10 mx-auto max-w-3xl flex flex-col items-center text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md" style={{ borderColor: "#0891b233", animation: "fadeUp 600ms ease-out both" }}>
                    <CheckCircle size={14} aria-hidden="true" />
                    Research Complete
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-3" style={{ animation: "fadeUp 600ms ease-out 100ms both" }}>
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-sm">
                      <SearchCheck className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="font-display font-bold text-[#0f172a] text-3xl sm:text-4xl md:text-5xl tracking-tight">
                      <TextShimmer as="span" duration={2.8} className="[--base-color:#0f172a] [--base-gradient-color:#ffffff]">
                        {result.seed}
                      </TextShimmer>
                    </h1>
                  </div>

                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-slate-400" style={{ animation: "fadeUp 600ms ease-out 180ms both" }}>
                    Keyword Research Report
                  </p>

                  {/* Score ring */}
                  <div className="mt-8 relative" style={{ animation: "fadeUp 700ms ease-out 250ms both" }}>
                    <div className="absolute inset-0 -m-4 rounded-full blur-2xl" style={{ backgroundColor: "#0891b2", opacity: 0.1 }} aria-hidden="true" />
                    <div className="relative" style={{ width: 200, height: 200 }}>
                      <svg width={200} height={200} className="transform -rotate-90 drop-shadow-lg">
                        <defs>
                          <filter id="kw-score-glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                              <feMergeNode in="coloredBlur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        <circle cx={100} cy={100} r={90} stroke="#e2e8f0" strokeWidth={10} fill="none" />
                        <circle
                          cx={100} cy={100} r={90}
                          stroke="#0891b2" strokeWidth={10} fill="none"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 90}
                          strokeDashoffset={2 * Math.PI * 90 * (1 - Math.min(total, 200) / 200)}
                          filter="url(#kw-score-glow)"
                          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "Satoshi, sans-serif" }}>{total}</span>
                        <span className="text-xs text-slate-400 font-medium">Keywords</span>
                      </div>
                    </div>
                  </div>

                  {/* Key metric pills */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2" style={{ animation: "fadeUp 600ms ease-out 400ms both" }}>
                    <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold capitalize bg-cyan-50 border-cyan-200 text-cyan-800">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#0891b2" }} />
                      {result.clusters.length} Clusters
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold capitalize bg-emerald-50 border-emerald-200 text-emerald-800">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {longTail}% Long-Tail
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold capitalize bg-violet-50 border-violet-200 text-violet-800">
                      <Layers className="h-3.5 w-3.5" />
                      {largestCluster} in Top Cluster
                    </span>
                  </div>

                  {/* Quick stats row */}
                  <div className="mt-10 grid w-full max-w-lg grid-cols-3 gap-3" style={{ animation: "fadeUp 600ms ease-out 620ms both" }}>
                    <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white/80 px-3 py-4 shadow-sm backdrop-blur-sm">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50">
                        <Hash className="h-4 w-4 text-cyan-500" />
                      </div>
                      <span className="mt-2 text-2xl font-bold text-slate-900">{total}</span>
                      <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Keywords</span>
                    </div>
                    <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white/80 px-3 py-4 shadow-sm backdrop-blur-sm">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50">
                        <Layers className="h-4 w-4 text-violet-500" />
                      </div>
                      <span className="mt-2 text-2xl font-bold text-slate-900">{result.clusters.length}</span>
                      <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Clusters</span>
                    </div>
                    <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white/80 px-3 py-4 shadow-sm backdrop-blur-sm">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                      </div>
                      <span className="mt-2 text-2xl font-bold text-slate-900">{longTail}%</span>
                      <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Long-Tail</span>
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="mt-8 flex items-center gap-4" style={{ animation: "fadeUp 600ms ease-out 720ms both" }}>
                    <button
                      onClick={() => {
                        const reportSection = document.querySelector("[data-keyword-report-body]");
                        if (reportSection) {
                          reportSection.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-slate-900/10 transition-all hover:shadow-xl hover:shadow-slate-900/15 hover:-translate-y-0.5"
                    >
                      View Full Report
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={resetSearch}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500 transition-all hover:border-slate-300 hover:text-slate-700 hover:shadow-sm"
                    >
                      <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                      New Research
                    </button>
                  </div>
                </div>
              </section>

              {/* Smooth divider */}
              <div className="relative h-16 bg-gradient-to-b from-white to-slate-50/80" aria-hidden="true">
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              </div>

              {/* Report body */}
              <section data-keyword-report-body className="relative isolate px-6 pb-20 pt-8 bg-slate-50/40">
                <div className="mx-auto max-w-6xl">
                  <ReportGate
                    tool="Keyword Research"
                    heading="Unlock your full keyword report"
                    description="Sign in to see the complete keyword clusters, metrics, and recommendations."
                  >
                    <div className="rounded-[32px] border border-slate-200/80 bg-white p-5 shadow-[0_30px_90px_rgba(15,23,42,0.06)] sm:p-8" style={{ animation: "fadeUp 650ms ease-out both" }}>
                      <KeywordReport result={result} />
                    </div>
                  </ReportGate>
                </div>
              </section>
            </>
          )}
        </main>
      </StickyFooterLayout>

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
