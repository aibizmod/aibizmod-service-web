"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Brain,
  Globe,
  Sparkles,
  MessageSquare,
  Network,
  Shield,
  Loader2,
  Copy,
  Check,
  ExternalLink,
  AlertTriangle,
  XCircle,
  ArrowRight,
  CalendarDays,
  Zap,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ReportGate } from "@/components/aibizmod/ReportGate";
import type { AuditResult } from "@/app/api/geo-audit/route";

interface HostedReportData {
  reportId: string;
  domain: string;
  score?: number;
  band?: string;
  generatedAt?: string;
  result: AuditResult | null;
}

const BAND_META: Record<
  string,
  { label: string; gradient: string; description: string }
> = {
  excellent: {
    label: "Excellent",
    gradient: "from-emerald-500 to-green-600",
    description:
      "Your website is well-optimized for AI search visibility. You have strong structured data, E-E-A-T signals, and AI citability — placing you among the top tier of AI-visible businesses.",
  },
  good: {
    label: "Good",
    gradient: "from-cyan-500 to-teal-600",
    description:
      "Your website has a solid foundation but lacks several AI optimization signals that reduce visibility in ChatGPT, Google AI Overviews, Gemini, Claude, and Perplexity.",
  },
  fair: {
    label: "Fair",
    gradient: "from-amber-500 to-orange-500",
    description:
      "Your website has basic online presence but significant gaps in structured data, E-E-A-T signals, and AI citability are preventing AI systems from reliably recommending your business.",
  },
  poor: {
    label: "Poor",
    gradient: "from-red-500 to-rose-600",
    description:
      "Critical AI optimization gaps detected. Most AI systems cannot reliably identify or cite your business. Immediate action is required to establish basic AI visibility.",
  },
  critical: {
    label: "Critical",
    gradient: "from-red-700 to-red-900",
    description:
      "Your website is essentially invisible to AI systems. No structured data, entity signals, or AI citability mechanisms are in place. Foundational work is urgently needed.",
  },
};

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  chatgpt: <Brain className="h-4 w-4" />,
  google_ai: <Globe className="h-4 w-4" />,
  gemini: <Sparkles className="h-4 w-4" />,
  claude: <MessageSquare className="h-4 w-4" />,
  perplexity: <Network className="h-4 w-4" />,
};

const STATUS_COLORS: Record<string, string> = {
  excellent: "from-emerald-500 to-green-500",
  good: "from-cyan-500 to-teal-500",
  partial: "from-amber-500 to-orange-500",
  weak: "from-red-400 to-red-500",
  missing: "from-red-600 to-red-700",
};

const SEVERITY_BADGE: Record<string, string> = {
  critical: "bg-red-100 text-red-700 border-red-300",
  high: "bg-orange-100 text-orange-700 border-orange-300",
  medium: "bg-amber-100 text-amber-700 border-amber-300",
  low: "bg-slate-100 text-slate-600 border-slate-300",
};

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

function ScoreRing({ score }: { score: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, score));
  const color =
    clamped >= 80
      ? "#10b981"
      : clamped >= 65
        ? "#0891b2"
        : clamped >= 45
          ? "#f59e0b"
          : clamped >= 25
            ? "#f87171"
            : "#dc2626";
  return (
    <div className="relative h-36 w-36 flex-shrink-0">
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
        <circle cx="64" cy="64" r={r} fill="none" stroke="#e2e8f0" strokeWidth="12" />
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (clamped / 100) * c}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold text-slate-900" style={{ fontFamily: "Satoshi, sans-serif" }}>
          {clamped}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">/ 100</span>
      </div>
    </div>
  );
}

export default function HostedAuditReportPage() {
  const params = useParams<{ reportId: string }>();
  const reportId = Array.isArray(params?.reportId) ? params.reportId[0] : params?.reportId ?? "";

  const [report, setReport] = useState<HostedReportData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "notfound" | "error">("loading");
  const [error, setError] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);

  const loadFromCache = useCallback((): HostedReportData | null => {
    try {
      const key = "aibizmod_audit_reports";
      const cached = JSON.parse(localStorage.getItem(key) || "{}") as Record<
        string,
        { domain: string; result: AuditResult; savedAt: number }
      >;
      const entry = cached[reportId];
      if (!entry?.domain || !entry?.result) return null;
      return {
        reportId,
        domain: entry.domain,
        score: entry.result.score,
        band: entry.result.band,
        generatedAt: entry.result.checkedAt,
        result: entry.result,
      };
    } catch {
      return null;
    }
  }, [reportId]);

  useEffect(() => {
    if (!reportId) return;

    const cached = loadFromCache();
    if (cached) {
      setReport(cached);
      setStatus("ready");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/audit-report/${encodeURIComponent(reportId)}`, { cache: "no-store" });
        if (!res.ok) {
          if (res.status === 404) {
            if (!cancelled) setStatus("notfound");
          } else {
            const body = (await res.json().catch(() => null)) as { error?: string } | null;
            if (!cancelled) {
              setError(body?.error || "Unable to load this report right now.");
              setStatus("error");
            }
          }
          return;
        }
        const data = (await res.json()) as HostedReportData;
        if (!cancelled) {
          setReport(data);
          setStatus("ready");
        }
      } catch {
        if (!cancelled) {
          setError("Network error while loading this report.");
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reportId, loadFromCache]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const result = report?.result;
  const band = BAND_META[report?.band ?? result?.band ?? ""] || BAND_META.poor;
  const displayDomain = result ? formatDomain(report!.domain) : "";
  const favicon = result ? getFaviconUrl(report!.domain) : null;
  const score = typeof report?.score === "number" ? report.score : typeof result?.score === "number" ? result.score : 0;
  const criticalIssues = result?.criticalIssues ?? [];
  const quickWins = result?.quickWins ?? [];
  const categories = result?.categoryDetails ?? [];
  const platforms = result?.aiPlatforms ?? [];
  const roadmap = result?.roadmap ?? [];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/ai-visibility-audit-report"
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-cyan-600 transition"
          >
            <ArrowRight className="h-3 w-3 rotate-180" /> AI Visibility Audit
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-xs text-slate-400">{reportId}</span>
        </div>

        {status === "loading" && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Loader2 className="h-8 w-8 text-cyan-500 animate-spin mb-4" />
            <p className="text-sm text-slate-500">Loading hosted report…</p>
          </div>
        )}

        {status === "notfound" && (
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-10 text-center">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: "Satoshi, sans-serif" }}>
              Report not found
            </h1>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
              We could not find this hosted audit report. It may have been removed, or the link is
              incomplete.
            </p>
            <Link
              href="/ai-visibility-audit-report"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl px-5 py-2.5 hover:opacity-90 transition"
            >
              Run a free audit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-10 text-center">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: "Satoshi, sans-serif" }}>
              Unable to load report
            </h1>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl px-5 py-2.5 hover:opacity-90 transition"
            >
              Try again <Loader2 className="h-4 w-4" />
            </button>
          </div>
        )}

        {status === "ready" && result && (
          <div className="space-y-6">
            {/* Domain header */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {favicon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={favicon} alt={`${displayDomain} favicon`} width={44} height={44} className="w-11 h-11 rounded-xl border border-slate-200 shadow-sm" />
                  )}                  <div className="min-w-0">
                    <h1 className="text-xl font-bold text-slate-900 truncate" style={{ fontFamily: "Satoshi, sans-serif" }}>
                      {displayDomain}
                    </h1>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">
                        <Shield className="h-3 w-3" />AI Visibility Report
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                        <CalendarDays className="h-3 w-3" />
                        {report.generatedAt || result.checkedAt
                          ? new Date(report.generatedAt || result.checkedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Recently generated"}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={copyLink}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg px-3 py-1.5 hover:bg-cyan-100/60 transition flex-shrink-0"
                >
                  {linkCopied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  {linkCopied ? "Link copied" : "Copy report link"}
                </button>
              </div>
            </div>

            {/* Executive summary */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-6" style={{ fontFamily: "Satoshi, sans-serif" }}>
                Executive Summary
              </h2>
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <ScoreRing score={score} />
                <div className="text-center sm:text-left flex-1">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold border bg-gradient-to-r text-white shadow-sm",
                    band.gradient,
                  )}>
                    {band.label} AI Visibility
                  </span>
                  <p className="text-sm text-slate-600 leading-relaxed mt-3 mb-4">{band.description}</p>
                  {typeof result.citability === "number" && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-slate-700">AI Citability Score</span>
                        <span className="text-sm font-bold text-slate-900">{result.citability}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={cn("h-full rounded-full bg-gradient-to-r", STATUS_COLORS[result.citability >= 70 ? "excellent" : result.citability >= 45 ? "partial" : "weak"])}
                          style={{ width: `${Math.min(100, result.citability)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Platform readiness */}
            {platforms.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-5" style={{ fontFamily: "Satoshi, sans-serif" }}>
                  AI Platform Readiness
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {platforms.map((p) => (
                    <div key={p.id} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                          {PLATFORM_ICONS[p.id]}
                          {p.name}
                        </span>
                      </div>
                      <div className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "Satoshi, sans-serif" }}>
                        {p.score}
                        <span className="text-xs font-semibold text-slate-400">/100</span>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={cn("h-full rounded-full bg-gradient-to-r", STATUS_COLORS[p.status === "compatible" ? "excellent" : p.status === "partial" ? "partial" : p.status === "limited" ? "weak" : "missing"])}
                          style={{ width: `${Math.min(100, p.score)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ReportGate
              tool="Hosted Audit Report"
              heading="Unlock this full audit report"
              description="Sign in to see the category breakdown, key issues, quick wins, and recommended roadmap."
              className="space-y-6"
            >
            {/* Category breakdown */}
            {categories.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-5" style={{ fontFamily: "Satoshi, sans-serif" }}>
                  Category Breakdown
                </h2>
                <div className="space-y-4">
                  {categories.map((c) => (
                    <div key={c.key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-semibold text-slate-700">{c.label}</span>
                        <span className="text-xs font-bold text-slate-500">
                          {c.weightedScore}/{c.maxWeightedScore}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-700", STATUS_COLORS[c.status])}
                          style={{ width: `${Math.min(100, (c.weightedScore / Math.max(1, c.maxWeightedScore)) * 100)}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{c.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Critical issues */}
            {criticalIssues.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-5" style={{ fontFamily: "Satoshi, sans-serif" }}>
                  Key Issues Found
                </h2>
                <div className="space-y-3">
                  {criticalIssues.slice(0, 5).map((issue) => (
                    <div key={issue.id} className="rounded-xl border border-slate-200 p-4">
                      <div className="flex items-start gap-3">
                        <span className={cn(
                          "inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border mt-0.5 flex-shrink-0",
                          SEVERITY_BADGE[issue.severity],
                        )}>
                          {issue.severity === "critical" && <XCircle className="h-3 w-3" />}
                          {issue.severity === "high" && <AlertTriangle className="h-3 w-3" />}
                          {issue.severity}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900">{issue.title}</p>
                          <p className="text-xs text-slate-500 mt-1">{issue.description}</p>
                          <p className="text-xs text-cyan-700 mt-2 font-medium">
                            Fix: {issue.recommendedFix}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick wins + roadmap */}
            {(quickWins.length > 0 || roadmap.length > 0) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {quickWins.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: "Satoshi, sans-serif" }}>
                      <Zap className="h-4 w-4 text-amber-500" /> Quick Wins
                    </h2>
                    <ul className="space-y-3">
                      {quickWins.slice(0, 4).map((w) => (
                        <li key={w.id} className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-slate-800">{w.action}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {w.estimatedTime} · +{w.scoreGain} score · {w.difficulty}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {roadmap.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4" style={{ fontFamily: "Satoshi, sans-serif" }}>
                      Recommended Roadmap
                    </h2>
                    <ul className="space-y-3">
                      {roadmap.slice(0, 4).map((phase) => (
                        <li key={phase.month} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-cyan-700 uppercase tracking-wide">{phase.month}</span>
                            <span className="text-[11px] font-semibold text-emerald-600">+{phase.expectedScoreImprovement} pts</span>
                          </div>
                          <p className="text-sm font-semibold text-slate-800">{phase.title}</p>
                          <p className="text-[11px] text-slate-500 mt-1">{phase.tasks?.slice(0, 2).join(" · ")}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            </ReportGate>

            {/* CTA */}
            <div className="rounded-2xl bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-600 p-8 text-center shadow-lg">
              <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Satoshi, sans-serif" }}>
                Want a full action plan?
              </h2>
              <p className="text-sm text-cyan-100 mb-5 max-w-md mx-auto">
                This summary covers the essentials. Our team can fix every issue found — typically
                lifting AI visibility by 40–60 points within 90 days.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/ai-visibility-audit-report"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 bg-white rounded-xl px-5 py-2.5 hover:bg-cyan-50 transition"
                >
                  Run your own free audit <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services/ai-automation/ai-visibility-audit"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/40 rounded-xl px-5 py-2.5 hover:bg-white/10 transition"
                >
                  Book a paid audit <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
