"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Search,
  Loader2,
  Shield,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  ExternalLink,
  Zap,
  BarChart3,
  TrendingUp,
  Sparkles,
  Printer,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import ShaderBackground from "@/components/ui/shader-background";
import { StarButton } from "@/components/ui/star-button";

interface AuditResult {
  score: number;
  band: string;
  citability?: number;
  scoreBreakDown?: Record<string, number>;
  recommendations: string[];
  checkedAt?: string;
}

const BAND_META: Record<string, { label: string; color: string; gradient: string; icon: string; description: string }> = {
  excellent: {
    label: "Excellent",
    color: "#16a34a",
    gradient: "from-emerald-500 to-green-600",
    icon: "🏆",
    description: "Your domain is well-optimized for AI search visibility.",
  },
  good: {
    label: "Good",
    color: "#0891b2",
    gradient: "from-cyan-500 to-teal-600",
    icon: "👍",
    description: "Solid foundation with room for improvement in a few areas.",
  },
  foundation: {
    label: "Foundation",
    color: "#ca8a04",
    gradient: "from-amber-500 to-yellow-600",
    icon: "🔧",
    description: "Basic setup exists but several key areas need attention.",
  },
  critical: {
    label: "Critical",
    color: "#dc2626",
    gradient: "from-red-500 to-rose-600",
    icon: "⚠️",
    description: "Significant gaps found. Immediate action recommended.",
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  robots: "Robots.txt",
  llms: "LLMS.txt",
  schema: "JSON-LD Schema",
  meta: "Meta Tags",
  content: "Content Quality",
  brand: "Brand & Entity",
  signals: "Trust Signals",
  ai_discovery: "AI Discovery",
  brand_entity: "Brand Entity",
  negative_penalty: "Penalties",
};

const CATEGORY_COLORS: Record<string, string> = {
  robots: "#6366f1", llms: "#8b5cf6", schema: "#06b6d4", meta: "#0ea5e9",
  content: "#22c55e", brand: "#f59e0b", signals: "#ef4444", ai_discovery: "#ec4899",
  brand_entity: "#f97316", negative_penalty: "#dc2626",
};

function CategoryBreakdownChart({ breakdown }: { breakdown: Record<string, number> }) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxScores: Record<string, number> = {
    robots: 18, llms: 18, schema: 16, meta: 14,
    content: 12, brand: 10, signals: 6, ai_discovery: 6,
    brand_entity: 20, negative_penalty: 20,
  };

  const entries = Object.entries(breakdown);
  const maxPct = Math.max(...entries.map(([key, value]) => {
    const max = maxScores[key] || 20;
    return Math.round((value / max) * 100);
  }));

  const hoveredValue = hoveredKey ? breakdown[hoveredKey] : null;
  const hoveredMax = hoveredKey ? (maxScores[hoveredKey] || 20) : null;
  const hoveredPct = hoveredKey && hoveredMax ? Math.round((hoveredValue! / hoveredMax) * 100) : null;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false); setHoveredKey(null); }}
      className="group relative rounded-2xl bg-white/50 border border-stone-200/60 p-6 backdrop-blur-sm transition-all duration-500 hover:bg-white/80 hover:border-stone-200 hover:shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">Score</span>
        </div>
        <div className="relative h-7 flex items-center">
          <span
            className={cn(
              "text-lg font-semibold tabular-nums transition-all duration-300 ease-out",
              isHovering && hoveredPct !== null ? "opacity-100 text-slate-900" : "opacity-50 text-slate-400",
            )}
          >
            {hoveredPct !== null ? hoveredPct : ""}
            <span
              className={cn(
                "text-xs font-normal text-slate-400 ml-0.5 transition-opacity duration-300",
                hoveredPct !== null ? "opacity-100" : "opacity-0",
              )}
            >
              %
            </span>
          </span>
        </div>
      </div>

      {/* Chart bars */}
      <div className="flex items-end gap-2 h-32">
        {entries.map(([key, value]) => {
          const max = maxScores[key] || 20;
          const pct = Math.round((value / max) * 100);
          const heightPx = (pct / Math.max(maxPct, 1)) * 128;
          const isHovered = hoveredKey === key;
          const isAnyHovered = hoveredKey !== null;
          const isNeighbor = hoveredKey !== null && (
            entries.findIndex(([k]) => k === hoveredKey) === entries.findIndex(([k]) => k === key) - 1 ||
            entries.findIndex(([k]) => k === hoveredKey) === entries.findIndex(([k]) => k === key) + 1
          );
          const accent = CATEGORY_COLORS[key] || "#6366f1";

          return (
            <div
              key={key}
              className="relative flex-1 flex flex-col items-center justify-end h-full cursor-pointer"
              onMouseEnter={() => setHoveredKey(key)}
            >
              {/* Bar */}
              <div
                className={cn(
                  "w-full rounded-full transition-all duration-300 ease-out origin-bottom",
                  isHovered
                    ? "shadow-lg"
                    : isNeighbor
                      ? "opacity-60"
                      : isAnyHovered
                        ? "opacity-30"
                        : "opacity-80 group-hover:opacity-90",
                )}
                style={{
                  height: `${heightPx}px`,
                  backgroundColor: accent,
                  transform: isHovered ? "scaleX(1.15) scaleY(1.02)" : isNeighbor ? "scaleX(1.05)" : "scaleX(1)",
                }}
              />

              {/* Label */}
              <span
                className={cn(
                  "text-[9px] font-medium mt-2 transition-all duration-300 leading-none text-center",
                  isHovered ? "text-slate-900" : "text-slate-400/60",
                )}
              >
                {CATEGORY_LABELS[key]?.split(" ")[0] || key.slice(0, 4)}
              </span>

              {/* Tooltip */}
              <div
                className={cn(
                  "absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap shadow-lg z-10",
                  isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none",
                )}
                style={{ backgroundColor: accent, color: "#fff" }}
              >
                {value}/{max}
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
                  style={{ borderTopColor: accent }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}

function ScoreRing({ score, size = 176 }: { score: number; size?: number }) {
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(score, 100) / 100) * circumference;

  const color =
    score >= 86 ? "#16a34a" : score >= 68 ? "#0891b2" : score >= 36 ? "#ca8a04" : "#dc2626";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90 drop-shadow-lg">
        <defs>
          <filter id={`glow-${score}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e7e5e4" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth={stroke} fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          filter={`url(#glow-${score})`}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold text-slate-900 tracking-tight">{score}</span>
        <span className="text-xs text-slate-400 font-medium">/ 100</span>
      </div>
    </div>
  );
}

function formatDomain(url: string) {
  try {
    return new URL(url.startsWith("http") ? url : `https://${url}`).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function getFaviconUrl(domain: string) {
  try {
    const hostname = new URL(domain.startsWith("http") ? domain : `https://${domain}`).hostname;
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    return null;
  }
}

function AuditReportContent() {
  const searchParams = useSearchParams();
  const domainParam = searchParams.get("domain");

  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAllRecs, setShowAllRecs] = useState(false);
  const [exporting, setExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const exportPDF = async () => {
    if (!reportRef.current) return;
    setExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`ai-visibility-report-${displayDomain}.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    if (domainParam) {
      setDomain(domainParam);
      runAudit(domainParam);
    }
  }, [domainParam]);

  const runAudit = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/geo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = (await res.json()) as AuditResult & { error?: string };
      if (!res.ok) throw new Error(data.error || "Audit failed");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!domain.trim() || isLoading) return;
    window.history.replaceState(null, "", `/ai-visibility-audit-report?domain=${encodeURIComponent(domain.trim())}`);
    await runAudit(domain.trim());
  };

  const band = result ? BAND_META[result.band] || BAND_META.foundation : null;
  const displayDomain = domain ? formatDomain(domain) : "";
  const favicon = domain ? getFaviconUrl(domain) : null;

  return (
    <>
      <Navbar />
      <header className="sticky top-16 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <form id="audit-form" onSubmit={handleSubmit} className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Enter your domain (e.g., aibizmod.com)"
                disabled={isLoading}
                className="w-80 h-9 pl-9 pr-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400"
              />
            </div>
            {isLoading || !domain.trim() ? (
              <span className="inline-flex h-9 items-center justify-center gap-2 rounded-3xl bg-slate-900/50 px-4 text-xs font-semibold text-white/50 cursor-not-allowed">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Audit"}
              </span>
            ) : (
              <StarButton
                as="span"
                lightColor="#38bdf8"
                backgroundColor="#0f172a"
                className="h-9 px-4 text-xs font-semibold shadow-[0_0_12px_rgba(56,189,248,0.25)] cursor-pointer"
                onClick={() => {
                  const form = document.querySelector("#audit-form") as HTMLFormElement;
                  form?.requestSubmit();
                }}
              >
                Audit
              </StarButton>
            )}
          </form>
        </div>
      </header>

      <ShaderBackground className="absolute inset-0 -z-10 h-full w-full" />
      <main className="min-h-screen bg-white">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 pb-10">

          {isLoading && (
            <div className="space-y-8 py-4">
              {/* Domain header skeleton */}
              <div className="bg-stone-100 rounded-2xl border border-stone-200/80 p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-200 animate-pulse" />
                  <div className="flex-1">
                    <div className="h-5 w-48 bg-slate-200 rounded-lg animate-pulse" />
                    <div className="h-3 w-36 bg-slate-100 rounded-md mt-2 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Score row skeleton */}
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 bg-stone-100 rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-center gap-8">
                    <div className="w-44 h-44 rounded-full bg-slate-100 animate-pulse shrink-0" />
                    <div className="flex-1 w-full space-y-3">
                      <div className="h-6 w-32 bg-slate-200 rounded-lg animate-pulse" />
                      <div className="h-4 w-64 bg-slate-100 rounded-md animate-pulse" />
                      <div className="h-4 w-48 bg-slate-100 rounded-md animate-pulse" />
                      <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="h-3 w-24 bg-slate-200 rounded mb-2 animate-pulse" />
                        <div className="h-2 w-full bg-slate-200 rounded-full animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-stone-100 rounded-2xl border border-stone-200/80 p-6 shadow-sm">
                  <div className="space-y-5">
                    <div className="h-3 w-28 bg-slate-200 rounded animate-pulse" />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 animate-pulse" />
                      <div className="space-y-1.5">
                        <div className="h-6 w-12 bg-slate-200 rounded animate-pulse" />
                        <div className="h-3 w-24 bg-slate-100 rounded animate-pulse" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 animate-pulse" />
                      <div className="space-y-1.5">
                        <div className="h-6 w-12 bg-slate-200 rounded animate-pulse" />
                        <div className="h-3 w-24 bg-slate-100 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category breakdown skeleton */}
              <div className="bg-stone-100 rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 animate-pulse" />
                  <div className="space-y-1.5">
                    <div className="h-5 w-40 bg-slate-200 rounded animate-pulse" />
                    <div className="h-3 w-56 bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-slate-200 animate-pulse" />
                          <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                        </div>
                        <div className="h-4 w-10 bg-slate-200 rounded animate-pulse" />
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations skeleton */}
              <div className="bg-stone-100 rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 animate-pulse" />
                  <div className="space-y-1.5">
                    <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
                    <div className="h-3 w-48 bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/40 p-4">
                      <div className="w-7 h-7 rounded-full bg-slate-200 animate-pulse shrink-0" />
                      <div className="flex-1">
                        <div className="h-4 w-full bg-slate-200 rounded animate-pulse mb-1.5" />
                        <div className="h-4 w-3/4 bg-slate-100 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scanning indicator */}
              <div className="flex items-center justify-center gap-3 text-sm text-slate-400 pt-2 pb-8">
                <div className="relative">
                  <Loader2 className="h-4 w-4 animate-spin text-cyan-500" />
                </div>
                <span>Scanning <span className="font-medium text-slate-500">{displayDomain}</span>...</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              </div>
            </div>
          )}

          {error && (
            <>
              {(/^(Unable to reach|Could not connect|Timeout|Connection refused|ENOTFOUND|ECONNREFUSED|ETIMEDOUT)/i).test(error) ? (
                <div className="max-w-lg mx-auto mt-16">
                  <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/50 p-8 text-center shadow-lg">
                    <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-5">
                      <span className="text-3xl">🔌</span>
                    </div>
                    <h3 className="text-xl font-bold text-amber-900 mb-2">Domain Unreachable</h3>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/60 text-amber-800 text-xs font-medium mb-4">
                      <AlertCircle className="h-3 w-3" />
                      Connection timeout
                    </div>
                    <p className="text-sm text-amber-700 mb-6 leading-relaxed">
                      We couldn&apos;t reach <span className="font-semibold">{displayDomain || domain}</span>. 
                      The server may be down, blocking our request, or the domain doesn&apos;t exist.
                    </p>
                    <div className="bg-white/60 rounded-xl p-4 text-left text-xs text-amber-700 space-y-2 border border-amber-100">
                      <p className="font-semibold text-amber-900 mb-1">Troubleshooting tips:</p>
                      <ul className="space-y-1.5">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">•</span>
                          <span>Make sure the domain is spelled correctly</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">•</span>
                          <span>Check that the site is publicly accessible</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">•</span>
                          <span>Ensure no firewall or WAF is blocking the audit</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">•</span>
                          <span>Try again in a few minutes</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => { setError(null); setDomain(domain); }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-800 transition bg-amber-50 px-4 py-2 rounded-lg border border-amber-200 hover:bg-amber-100"
                    >
                      <Loader2 className="h-3.5 w-3.5" />
                      Retry Audit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="max-w-lg mx-auto mt-16 rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-red-100/50 p-8 text-center shadow-lg">
                  <div className="mx-auto w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <AlertCircle className="h-7 w-7 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-red-800 mb-2">Audit Failed</h3>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </>
          )}

          {result && !isLoading && band && (
            <div className="space-y-8" ref={reportRef}>
              {/* Domain Header */}
              <div className="group relative bg-stone-100 rounded-2xl border border-stone-200/80 p-5 shadow-sm hover:shadow-md transition-all">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center gap-4">
                    {favicon && (
                      <img src={favicon} alt="" className="w-11 h-11 rounded-xl border border-slate-200 shadow-sm" />
                    )}
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{displayDomain}</h2>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">
                          <Shield className="h-3 w-3" />
                          AI Visibility Report
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-400">
                          {new Date(result.checkedAt ?? Date.now()).toLocaleDateString("en-US", {
                            year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="sm:ml-auto flex items-center gap-2">
                    <button
                      onClick={exportPDF}
                      disabled={exporting}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-cyan-600 transition disabled:opacity-50"
                    >
                      {exporting ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Printer className="h-3 w-3" />
                      )}
                      {exporting ? "Exporting..." : "Export PDF"}
                    </button>
                    <span className="text-slate-200">|</span>
                    <a href={`https://${displayDomain}`} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-cyan-600 transition">
                      Visit site <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Score + Stats Grid */}
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Score Card */}
                <div className="lg:col-span-2 relative overflow-hidden bg-stone-100 rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-sm">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-500/5 via-transparent to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="relative flex flex-col sm:flex-row items-center gap-8">
                    <ScoreRing score={result.score} />
                    <div className="text-center sm:text-left">
                      <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                        <span className="text-2xl">{band.icon}</span>
                        <span
                          className={`text-xl font-bold bg-gradient-to-r ${band.gradient} bg-clip-text text-transparent`}
                        >
                          {band.label}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed max-w-md">{band.description}</p>
                      {result.citability != null && (
                        <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Citability Score</span>
                            <span className="text-sm font-bold text-slate-800">{result.citability}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{
                                width: `${result.citability}%`,
                                background: "linear-gradient(90deg, #0891b2, #06b6d4, #22d3ee)",
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats Panel */}
                <div className="bg-stone-100 rounded-2xl border border-stone-200/80 p-6 shadow-sm">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">Overview</h3>
                  <div className="space-y-5">
                    {[
                      { label: "Categories Analyzed", value: result.scoreBreakDown ? Object.keys(result.scoreBreakDown).length : 0, icon: BarChart3, color: "text-cyan-600" },
                      { label: "Recommendations", value: result.recommendations?.length || 0, icon: Zap, color: "text-amber-600" },
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                          <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                          <div className="text-xs text-slate-400">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                    <div className="pt-2">
                      <div className="text-xs text-slate-400 mb-2">Score Band</div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold bg-gradient-to-r ${band.gradient} text-white shadow-sm`}
                      >
                        {band.icon} {band.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Breakdown - Mini Chart Style */}
              <div className="bg-stone-100 rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-sm">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Category Breakdown</h3>
                    <p className="text-xs text-slate-400">Performance across evaluated categories</p>
                  </div>
                </div>

                {result.scoreBreakDown && Object.keys(result.scoreBreakDown).length > 0 ? (
                  <CategoryBreakdownChart breakdown={result.scoreBreakDown} />
                ) : (
                  <div className="py-16 text-center text-slate-400 text-sm">No breakdown data available</div>
                )}
              </div>

              {/* Recommendations */}
              <div className="bg-stone-100 rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-sm">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Recommendations</h3>
                    <p className="text-xs text-slate-400">
                      {result.recommendations?.length || 0} actionable items to improve your AI visibility
                    </p>
                  </div>
                  {result.recommendations && result.recommendations.length > 0 && (
                    <div className="ml-auto hidden sm:flex items-center gap-2 text-xs text-slate-400">
                      <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                      <span>Priority ranked</span>
                    </div>
                  )}
                </div>

                {result.recommendations && result.recommendations.length > 0 ? (
                  <div className="space-y-3">
                    {(showAllRecs ? result.recommendations : result.recommendations.slice(0, 5)).map((rec, i) => {
                      const priority = i < 2 ? "High" : i < 5 ? "Medium" : "Low";
                      const priorityColor =
                        priority === "High" ? "text-red-600 bg-red-50 border-red-200" :
                        priority === "Medium" ? "text-amber-600 bg-amber-50 border-amber-200" :
                        "text-slate-500 bg-slate-50 border-slate-200";

                      return (
                        <div
                          key={i}
                          className="group flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/40 p-4 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all"
                        >
                          <div className="mt-0.5 shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-sm">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-sm text-slate-700 leading-relaxed">{rec}</span>
                          </div>
                          <span className={`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full border ${priorityColor}`}>
                            {priority}
                          </span>
                        </div>
                      );
                    })}
                    {result.recommendations.length > 5 && (
                      <button
                        onClick={() => setShowAllRecs(!showAllRecs)}
                        className="w-full py-3.5 text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition rounded-xl border-2 border-dashed border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/50"
                      >
                        {showAllRecs
                          ? "Show fewer recommendations"
                          : `Show all ${result.recommendations.length} recommendations →`
                        }
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="py-16 text-center text-slate-400 text-sm">No recommendations available</div>
                )}
              </div>

              {/* CTA */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-10 text-center shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium mb-4">
                    <Sparkles className="h-3 w-3" />
                    Expert Implementation Available
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    Want help implementing these fixes?
                  </h3>
                  <p className="text-slate-300 text-sm max-w-lg mx-auto mb-6">
                    Our team specializes in GEO optimization and can help you implement every recommendation.
                  </p>
                  <a href={`/contact?audit=${encodeURIComponent(domain)}&score=${result.score}`}>
                    <button className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-white text-slate-900 text-sm font-bold shadow-lg hover:bg-cyan-50 hover:shadow-xl transition-all hover:-translate-y-0.5">
                      Get Expert Help <ArrowRight className="h-4 w-4" />
                    </button>
                  </a>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pb-8">
                <p className="text-xs text-slate-400">
                  Powered by{" "}
                  <a href="https://github.com/Auriti-Labs/geo-optimizer-skill"
                    target="_blank" rel="noopener noreferrer"
                    className="text-cyan-600 hover:text-cyan-700 font-medium transition"
                  >
                    GEO Optimizer
                  </a>
                  {" · "}
                  <span>AI Visibility Audit for {displayDomain}</span>
                </p>
              </div>
            </div>
          )}

          {!domainParam && !result && !isLoading && !error && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">AI Visibility Audit</h2>
              <p className="text-slate-500 text-sm max-w-md">
                Enter a domain above to analyze its AI search visibility and get actionable recommendations.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default function AuditReportPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Loader2 className="h-10 w-10 animate-spin text-cyan-600" />
      </div>
    }>
      <AuditReportContent />
    </Suspense>
  );
}
