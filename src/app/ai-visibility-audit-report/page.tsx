"use client";

import { useEffect, useState, useRef, Suspense, useCallback } from "react";
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
  Info,
  ChevronDown,
  ChevronUp,
  Building2,
  Users,
  FileText,
  Globe,
  Star,
  Award,
  Target,
  Clock,
  AlertTriangle,
  XCircle,
  ChevronRight,
  Brain,
  Layers,
  MessageSquare,
  BookOpen,
  Network,
  ArrowUpRight,
  Lock,
  CheckSquare,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import ShaderBackground from "@/components/ui/shader-background";
import { StarButton } from "@/components/ui/star-button";
import type {
  AuditResult,
  CategoryDetail,
  Issue,
  QuickWin,
  PlatformScore,
  EntityCheck,
  ContentMetric,
  RoadmapPhase,
  PageScore,
} from "@/app/api/geo-audit/route";

// ---------------------------------------------------------------------------
// Constants & helpers
// ---------------------------------------------------------------------------

const BAND_META: Record<
  string,
  { label: string; color: string; gradient: string; bg: string; description: string }
> = {
  excellent: {
    label: "Excellent",
    color: "#16a34a",
    gradient: "from-emerald-500 to-green-600",
    bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
    description:
      "Your website is well-optimized for AI search visibility. You have strong structured data, E-E-A-T signals, and AI citability — placing you among the top tier of AI-visible businesses.",
  },
  good: {
    label: "Good",
    color: "#0891b2",
    gradient: "from-cyan-500 to-teal-600",
    bg: "bg-cyan-50 border-cyan-200 text-cyan-800",
    description:
      "Your website has a solid foundation but lacks several AI optimization signals that reduce visibility in ChatGPT, Google AI Overviews, Gemini, Claude, and Perplexity.",
  },
  fair: {
    label: "Fair",
    color: "#d97706",
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 border-amber-200 text-amber-800",
    description:
      "Your website has basic online presence but significant gaps in structured data, E-E-A-T signals, and AI citability are preventing AI systems from reliably recommending your business.",
  },
  poor: {
    label: "Poor",
    color: "#dc2626",
    gradient: "from-red-500 to-rose-600",
    bg: "bg-red-50 border-red-200 text-red-800",
    description:
      "Critical AI optimization gaps detected. Most AI systems cannot reliably identify or cite your business. Immediate action is required to establish basic AI visibility.",
  },
  critical: {
    label: "Critical",
    color: "#991b1b",
    gradient: "from-red-700 to-red-900",
    bg: "bg-red-100 border-red-300 text-red-900",
    description:
      "Your website is essentially invisible to AI systems. No structured data, entity signals, or AI citability mechanisms are in place. Foundational work is urgently needed.",
  },
};

const SEVERITY_CONFIG: Record<
  string,
  { bg: string; border: string; badge: string; icon: React.ReactNode }
> = {
  critical: {
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700 border-red-300",
    icon: <XCircle className="h-5 w-5 text-red-500" />,
  },
  high: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-700 border-orange-300",
    icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
  },
  medium: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700 border-amber-300",
    icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
  },
  low: {
    bg: "bg-slate-50",
    border: "border-slate-200",
    badge: "bg-slate-100 text-slate-600 border-slate-300",
    icon: <Info className="h-5 w-5 text-slate-400" />,
  },
};

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; dotColor: string }
> = {
  excellent: { label: "Excellent", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200 text-emerald-700", dotColor: "bg-emerald-500" },
  good:      { label: "Good",      color: "text-cyan-700",    bg: "bg-cyan-50 border-cyan-200 text-cyan-700",         dotColor: "bg-cyan-500"    },
  partial:   { label: "Partial",   color: "text-amber-700",   bg: "bg-amber-50 border-amber-200 text-amber-700",      dotColor: "bg-amber-500"   },
  weak:      { label: "Weak",      color: "text-orange-700",  bg: "bg-orange-50 border-orange-200 text-orange-700",   dotColor: "bg-orange-500"  },
  missing:   { label: "Missing",   color: "text-red-700",     bg: "bg-red-50 border-red-200 text-red-700",            dotColor: "bg-red-500"     },
};

const DIFF_CONFIG: Record<
  string,
  { label: string; bg: string }
> = {
  easy:   { label: "Easy",   bg: "bg-emerald-100 text-emerald-700" },
  medium: { label: "Medium", bg: "bg-amber-100 text-amber-700"     },
  hard:   { label: "Hard",   bg: "bg-red-100 text-red-700"         },
};

const IMPACT_CONFIG: Record<
  string,
  { label: string; bg: string }
> = {
  high:   { label: "High Impact",   bg: "bg-cyan-100 text-cyan-700"    },
  medium: { label: "Med Impact",    bg: "bg-slate-100 text-slate-600"  },
  low:    { label: "Low Impact",    bg: "bg-slate-50 text-slate-500"   },
};

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  chatgpt:   <Brain className="h-5 w-5" />,
  google_ai: <Globe className="h-5 w-5" />,
  gemini:    <Sparkles className="h-5 w-5" />,
  claude:    <MessageSquare className="h-5 w-5" />,
  perplexity:<Network className="h-5 w-5" />,
};

const PLATFORM_COLORS: Record<string, string> = {
  chatgpt:   "from-emerald-500 to-teal-600",
  google_ai: "from-blue-500 to-indigo-600",
  gemini:    "from-violet-500 to-purple-600",
  claude:    "from-orange-500 to-amber-600",
  perplexity:"from-cyan-500 to-blue-600",
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

function scoreToBarColor(score: number): string {
  if (score >= 80) return "from-emerald-500 to-green-500";
  if (score >= 65) return "from-cyan-500 to-teal-500";
  if (score >= 45) return "from-amber-500 to-orange-500";
  if (score >= 25) return "from-red-400 to-red-500";
  return "from-red-600 to-red-700";
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

// Score Ring (preserved from original)
function ScoreRing({ score, size = 176 }: { score: number; size?: number }) {
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const [animated, setAnimated] = useState(false);
  const offset = circumference - (Math.min(animated ? score : 0, 100) / 100) * circumference;
  const color = score >= 80 ? "#16a34a" : score >= 65 ? "#0891b2" : score >= 45 ? "#d97706" : score >= 25 ? "#dc2626" : "#991b1b";

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, [score]);

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
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e2e8f0" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth={stroke} fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          filter={`url(#glow-${score})`}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "Satoshi, sans-serif" }}>{score}</span>
        <span className="text-xs text-slate-400 font-medium">/100</span>
      </div>
    </div>
  );
}

// Animated horizontal progress bar
function ProgressBar({ score, maxScore, color }: { score: number; maxScore: number; color?: string }) {
  const [width, setWidth] = useState(0);
  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const gradClass = color || scoreToBarColor(pct);

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 150);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div className="relative h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
      <div
        className={cn("h-full rounded-full bg-gradient-to-r", gradClass)}
        style={{ width: `${width}%`, transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }}
      />
    </div>
  );
}

// Section header
function SectionHeader({
  icon, title, subtitle, iconGradient = "from-cyan-500 to-teal-500",
}: {
  icon: React.ReactNode; title: string; subtitle?: string; iconGradient?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-7">
      <div className={cn("p-2.5 rounded-xl bg-gradient-to-br shadow-sm flex-shrink-0", iconGradient)}>
        <span className="text-white">{icon}</span>
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "Satoshi, sans-serif" }}>{title}</h2>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

// Stat tile
function StatTile({
  icon, label, value, color = "text-slate-900", note,
}: {
  icon: React.ReactNode; label: string; value: string | number; color?: string; note?: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex-shrink-0">{icon}</div>
      <div>
        <div className={cn("text-2xl font-bold", color)} style={{ fontFamily: "Satoshi, sans-serif" }}>{value}</div>
        <div className="text-xs text-slate-500">{label}</div>
        {note && <div className="text-[10px] text-slate-400 mt-0.5">{note}</div>}
      </div>
    </div>
  );
}

// Tooltip wrapper
function Tooltip({ content, children }: { content: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex">
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="cursor-help"
      >
        {children}
      </span>
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-56 rounded-xl bg-slate-900 px-3 py-2 text-xs text-white shadow-xl">
          {content}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900" />
        </span>
      )}
    </span>
  );
}

// Status pill
function StatusPill({ status, size = "sm" }: { status: string; size?: "xs" | "sm" }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.missing;
  return (
    <span className={cn(
      "inline-flex items-center gap-1 rounded-full border font-medium",
      size === "xs" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-xs",
      cfg.bg
    )}>
      <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", cfg.dotColor)} />
      {cfg.label}
    </span>
  );
}

// Sub-check row
function SubCheckRow({ check }: { check: { key: string; label: string; status: "pass" | "partial" | "fail"; impact: string; note: string } }) {
  return (
    <div className={cn(
      "flex items-start gap-3 p-3 rounded-lg transition-colors",
      check.status === "pass" ? "bg-emerald-50/50 hover:bg-emerald-50" :
        check.status === "partial" ? "bg-amber-50/50 hover:bg-amber-50" :
          "bg-red-50/50 hover:bg-red-50"
    )}>
      <div className="mt-0.5 flex-shrink-0">
        {check.status === "pass" ? <CheckCircle className="h-4 w-4 text-emerald-500" /> :
          check.status === "partial" ? <AlertCircle className="h-4 w-4 text-amber-500" /> :
            <XCircle className="h-4 w-4 text-red-400" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-slate-800">{check.label}</span>
          <span className={cn(
            "text-[10px] font-medium px-1.5 py-0.5 rounded-full",
            check.impact === "high" ? "bg-red-100 text-red-700" :
              check.impact === "medium" ? "bg-amber-100 text-amber-700" :
                "bg-slate-100 text-slate-500"
          )}>
            {check.impact === "high" ? "High Impact" : check.impact === "medium" ? "Med Impact" : "Low Impact"}
          </span>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{check.note}</p>
      </div>
    </div>
  );
}

// Category card with expandable sub-checks
function CategoryCard({ detail, index }: { detail: CategoryDetail; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const pct = detail.rawScore;
  const cfg = STATUS_CONFIG[detail.status] || STATUS_CONFIG.missing;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 w-5">{index + 1}</span>
            <h3 className="text-sm font-bold text-slate-900" style={{ fontFamily: "Satoshi, sans-serif" }}>{detail.label}</h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[11px] text-slate-400 font-medium">{detail.weight}% weight</span>
            <StatusPill status={detail.status} size="xs" />
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1">
            <ProgressBar score={detail.weightedScore} maxScore={detail.maxWeightedScore} />
          </div>
          <span className="text-sm font-bold text-slate-900 flex-shrink-0 w-12 text-right" style={{ fontFamily: "Satoshi, sans-serif" }}>
            {detail.weightedScore}/{detail.maxWeightedScore}
          </span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed mb-3">{detail.whyLost}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3 w-3 text-cyan-500" />
            <span className="text-[11px] text-slate-500">+{detail.expectedGain} pts potential gain</span>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-600 hover:text-cyan-700 transition"
          >
            {expanded ? "Hide" : "Details"}
            {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/50 p-4 space-y-1.5">
          {detail.subChecks.map(sc => (
            <SubCheckRow key={sc.key} check={sc} />
          ))}
        </div>
      )}
    </div>
  );
}

// Platform card
function PlatformCard({ platform }: { platform: PlatformScore }) {
  const gradClass = PLATFORM_COLORS[platform.id] || "from-slate-500 to-slate-600";
  const compat = platform.status;
  const compatColor =
    compat === "compatible" ? "text-emerald-600 bg-emerald-50 border-emerald-200" :
      compat === "partial" ? "text-amber-600 bg-amber-50 border-amber-200" :
        compat === "limited" ? "text-orange-600 bg-orange-50 border-orange-200" :
          "text-red-600 bg-red-50 border-red-200";

  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("p-2 rounded-xl bg-gradient-to-br text-white flex-shrink-0", gradClass)}>
          {PLATFORM_ICONS[platform.id]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-slate-900 text-sm" style={{ fontFamily: "Satoshi, sans-serif" }}>{platform.name}</div>
          <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full border inline-flex mt-0.5", compatColor)}>
            {compat === "compatible" ? "Compatible" : compat === "partial" ? "Partial" : compat === "limited" ? "Limited" : "Not Compatible"}
          </span>
        </div>
        <span className="text-2xl font-bold text-slate-900 flex-shrink-0" style={{ fontFamily: "Satoshi, sans-serif" }}>{platform.score}</span>
      </div>
      <div className="mb-3">
        <ProgressBar score={platform.score} maxScore={100} />
      </div>
      <p className="text-xs text-slate-600 leading-relaxed mb-3">{platform.explanation}</p>
      <div className="flex items-start gap-2 rounded-lg bg-slate-50 border border-slate-100 p-2.5">
        <ArrowUpRight className="h-3.5 w-3.5 text-cyan-500 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-600 leading-relaxed">{platform.topRecommendation}</p>
      </div>
    </div>
  );
}

// Citability check card
function CitabilityCheckCard({ check }: { check: { key: string; label: string; status: "pass" | "partial" | "fail"; impact: string; note: string } }) {
  const isPassed = check.status === "pass";
  const isPartial = check.status === "partial";
  return (
    <div className={cn(
      "rounded-xl border p-4 transition-all hover:shadow-sm",
      isPassed ? "bg-emerald-50 border-emerald-200" :
        isPartial ? "bg-amber-50 border-amber-200" :
          "bg-white border-slate-200"
    )}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {isPassed ? <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" /> :
            isPartial ? <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" /> :
              <XCircle className="h-4 w-4 text-red-400 flex-shrink-0" />}
          <span className="text-xs font-bold text-slate-900">{check.label}</span>
        </div>
        <span className={cn(
          "text-[10px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0",
          check.impact === "high" ? "bg-red-100 text-red-700" :
            check.impact === "medium" ? "bg-amber-100 text-amber-700" :
              "bg-slate-100 text-slate-500"
        )}>
          {check.impact === "high" ? "High" : check.impact === "medium" ? "Med" : "Low"}
        </span>
      </div>
      <p className="text-[11px] text-slate-600 leading-relaxed">{check.note}</p>
    </div>
  );
}

// Issue card
function IssueCard({ issue }: { issue: Issue }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = SEVERITY_CONFIG[issue.severity] || SEVERITY_CONFIG.medium;
  return (
    <div className={cn("rounded-2xl border p-5 transition-all hover:shadow-sm", cfg.bg, cfg.border)}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{cfg.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <h3 className="text-sm font-bold text-slate-900" style={{ fontFamily: "Satoshi, sans-serif" }}>{issue.title}</h3>
            <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize", cfg.badge)}>
              {issue.severity}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">{issue.category}</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed mb-2">{issue.description}</p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[11px] font-medium text-slate-600 hover:text-slate-900 transition inline-flex items-center gap-1"
          >
            {expanded ? "Show less" : "See details & fix"}
            {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          {expanded && (
            <div className="mt-3 space-y-2.5 pt-3 border-t border-black/5">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Why It Matters</span>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">{issue.whyItMatters}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Recommended Fix</span>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">{issue.recommendedFix}</p>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/70 border border-current/10 px-2.5 py-1">
                <TrendingUp className="h-3 w-3 text-emerald-600" />
                <span className="text-[11px] font-semibold text-emerald-700">
                  +{issue.expectedScoreIncrease} pts expected gain
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Quick win card
function QuickWinCard({ win, index }: { win: QuickWin; index: number }) {
  const diffCfg = DIFF_CONFIG[win.difficulty] || DIFF_CONFIG.medium;
  const impactCfg = IMPACT_CONFIG[win.expectedImpact] || IMPACT_CONFIG.medium;
  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-sm">
          <span className="text-xs font-bold text-white">{index + 1}</span>
        </div>
        <p className="text-sm font-semibold text-slate-900 leading-snug" style={{ fontFamily: "Satoshi, sans-serif" }}>
          {win.action}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", diffCfg.bg)}>{diffCfg.label}</span>
        <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", impactCfg.bg)}>{impactCfg.label}</span>
        <span className="text-[10px] text-slate-400 flex items-center gap-1">
          <Clock className="h-3 w-3" />{win.estimatedTime}
        </span>
        <span className="ml-auto text-[11px] font-semibold text-emerald-700 flex items-center gap-0.5">
          <TrendingUp className="h-3 w-3" />+{win.scoreGain} pts
        </span>
      </div>
    </div>
  );
}

// Entity row
function EntityRow({ entity }: { entity: EntityCheck }) {
  const isDetected = entity.detected;
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm transition-all">
      <div className="flex-shrink-0 mt-0.5">
        {isDetected
          ? <CheckCircle className="h-4 w-4 text-emerald-500" />
          : <XCircle className="h-4 w-4 text-red-400" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-sm font-bold text-slate-900">{entity.entity}</span>
          <span className="text-[10px] text-slate-400">{entity.type}</span>
          {isDetected && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {entity.confidence}% confidence
            </span>
          )}
          {!isDetected && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
              Not detected
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">{entity.recommendation}</p>
      </div>
    </div>
  );
}

// Content metric tile
function ContentMetricTile({ metric }: { metric: ContentMetric }) {
  const cfg = STATUS_CONFIG[metric.status] || STATUS_CONFIG.missing;
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 hover:border-slate-200 hover:shadow-sm transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-slate-800">{metric.label}</span>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-slate-900">{metric.score}/10</span>
          <StatusPill status={metric.status} size="xs" />
        </div>
      </div>
      <div className="mb-2.5">
        <ProgressBar score={metric.score} maxScore={10} />
      </div>
      <p className="text-[11px] text-slate-500 leading-relaxed">{metric.explanation}</p>
    </div>
  );
}

// Roadmap phase card
function RoadmapPhaseCard({ phase, index }: { phase: RoadmapPhase; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const priorityColor =
    phase.priority === "critical" ? "bg-red-100 text-red-700 border-red-200" :
      phase.priority === "high" ? "bg-orange-100 text-orange-700 border-orange-200" :
        "bg-amber-100 text-amber-700 border-amber-200";

  return (
    <div className={cn(
      "rounded-2xl border transition-all",
      expanded ? "border-cyan-200 bg-white shadow-md" : "border-slate-200 bg-white shadow-sm hover:shadow-md"
    )}>
      <button
        className="w-full flex items-center gap-4 p-5 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-white">{index + 1}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{phase.month}</span>
            <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full border capitalize", priorityColor)}>
              {phase.priority}
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-900" style={{ fontFamily: "Satoshi, sans-serif" }}>{phase.title}</h3>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] text-slate-400">Expected gain</div>
            <div className="text-sm font-bold text-emerald-600">+{phase.expectedScoreImprovement} pts</div>
          </div>
          {expanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4">
          <div className="space-y-2">
            {phase.tasks.map((task, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-5 h-5 rounded-full border-2 border-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[9px] font-bold text-slate-400">{i + 1}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{task}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Pages table
type SortKey = "url" | "visibilityScore" | "criticalIssues" | "priority" | "status";
function PagesTable({ pages }: { pages: PageScore[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("visibilityScore");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sorted = [...pages].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    const dir = sortDir === "asc" ? 1 : -1;
    return av < bv ? -dir : av > bv ? dir : 0;
  });

  function toggleSort(k: SortKey) {
    if (sortKey === k) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(k); setSortDir("desc"); }
  }

  const prioColor: Record<string, string> = {
    critical: "bg-red-100 text-red-700",
    high: "bg-orange-100 text-orange-700",
    medium: "bg-amber-100 text-amber-700",
    low: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {(["url", "visibilityScore", "criticalIssues", "priority", "status"] as SortKey[]).map(k => (
                <th
                  key={k}
                  className="px-4 py-3 text-left cursor-pointer hover:bg-slate-100 transition-colors select-none"
                  onClick={() => toggleSort(k)}
                >
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide inline-flex items-center gap-1">
                    {k === "url" ? "Page URL" : k === "visibilityScore" ? "Score" : k === "criticalIssues" ? "Critical Issues" : k === "priority" ? "Priority" : "Status"}
                    {sortKey === k && (sortDir === "asc" ? " ↑" : " ↓")}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((page, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                <td className="px-4 py-3">
                  <span className="text-xs font-medium text-slate-700 font-mono">{page.url}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <ProgressBar score={page.visibilityScore} maxScore={100} />
                    <span className="text-xs font-bold text-slate-900 w-8 flex-shrink-0">{page.visibilityScore}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={cn(
                    "text-xs font-bold px-2 py-0.5 rounded-full",
                    page.criticalIssues > 0 ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                  )}>
                    {page.criticalIssues}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full capitalize", prioColor[page.priority])}>
                    {page.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusPill status={page.status === "analyzed" ? "good" : page.status === "partial" ? "partial" : "missing"} size="xs" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------
function LoadingSkeleton({ domain }: { domain: string }) {
  return (
    <div className="space-y-6 py-4">
      {/* Executive summary skeleton */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col sm:flex-row items-center gap-8">
            <div className="w-44 h-44 rounded-full bg-slate-100 animate-pulse flex-shrink-0" />
            <div className="flex-1 w-full space-y-3">
              <div className="h-6 w-32 bg-slate-200 rounded-xl animate-pulse" />
              <div className="h-4 w-64 bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-48 bg-slate-100 rounded animate-pulse" />
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="h-3 w-24 bg-slate-200 rounded mb-2 animate-pulse" />
                <div className="h-2 w-full bg-slate-200 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 rounded-xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
      {/* Category skeleton */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="h-5 w-40 bg-slate-200 rounded animate-pulse mb-5" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-32 rounded-xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 text-sm text-slate-400 py-6">
        <Loader2 className="h-4 w-4 animate-spin text-cyan-500" />
        <span>Analyzing <span className="font-medium text-slate-600">{domain}</span> across 60+ AI visibility signals...</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main report
// ---------------------------------------------------------------------------
function AuditReport({ result, domain }: { result: AuditResult; domain: string }) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const band = BAND_META[result.band] || BAND_META.poor;
  const displayDomain = formatDomain(domain);
  const favicon = getFaviconUrl(domain);

  const exportPDF = async () => {
    if (!reportRef.current) return;
    setExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const pdf = new jsPDF("p", "mm", "a4");
      const w = pdf.internal.pageSize.getWidth();
      const h = (canvas.height * w) / canvas.width;
      let left = h, pos = 0;
      const page = pdf.internal.pageSize.getHeight();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, pos, w, h);
      left -= page;
      while (left > 0) { pos -= page; pdf.addPage(); pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, pos, w, h); left -= page; }
      pdf.save(`ai-visibility-report-${displayDomain}.pdf`);
    } catch (e) { console.error(e); }
    finally { setExporting(false); }
  };

  // Citability checks from API result
  const citabilityCategory = result.categoryDetails.find(c => c.key === "citability");
  const criticalCount = result.criticalIssues.filter(i => i.severity === "critical").length;
  const estimatedVisibility = result.score >= 70 ? "High" : result.score >= 45 ? "Moderate" : result.score >= 25 ? "Low" : "Minimal";
  const visColor = result.score >= 70 ? "text-emerald-600" : result.score >= 45 ? "text-amber-600" : "text-red-600";

  return (
    <div className="space-y-6" ref={reportRef}>

      {/* ── Domain header ─────────────────────────────────────────────────── */}
      <div className="group relative bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-4">
            {favicon && <img src={favicon} alt="" className="w-11 h-11 rounded-xl border border-slate-200 shadow-sm" />}
            <div>
              <h1 className="text-xl font-bold text-slate-900" style={{ fontFamily: "Satoshi, sans-serif" }}>{displayDomain}</h1>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">
                  <Shield className="h-3 w-3" />AI Visibility Report
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-slate-400">
                  {new Date(result.checkedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
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
              {exporting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Printer className="h-3.5 w-3.5" />}
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

      {/* ── SECTION 1: Executive Summary ───────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <SectionHeader
          icon={<BarChart3 className="h-5 w-5" />}
          title="Executive Summary"
          subtitle="Overall AI search visibility assessment"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Score + band */}
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <ScoreRing score={result.score} />
              </div>
              <div className="text-center sm:text-left flex-1">
                <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold border bg-gradient-to-r text-white shadow-sm",
                    band.gradient
                  )}>
                    {result.band === "excellent" && "🏆"}
                    {result.band === "good" && "👍"}
                    {result.band === "fair" && "📊"}
                    {result.band === "poor" && "⚠️"}
                    {result.band === "critical" && "🚨"}
                    {" "}{band.label} AI Visibility
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed max-w-md mb-5">{band.description}</p>

                {/* Citability score */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-700">AI Citability Score</span>
                      <Tooltip content="Measures how confidently AI systems can understand, verify, and cite information from your website. A higher score means more AI platforms will reference your business.">
                        <Info className="h-3.5 w-3.5 text-slate-400" />
                      </Tooltip>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{result.citability}%</span>
                  </div>
                  <ProgressBar score={result.citability} maxScore={100} />
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    {result.citability >= 70
                      ? "Strong citability — AI systems can reliably extract and cite your content."
                      : result.citability >= 45
                        ? "Moderate citability — some AI extraction possible but key signals are missing."
                        : "Weak citability — AI systems struggle to extract and verify information from your site."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatTile
              icon={<Layers className="h-4 w-4 text-cyan-600" />}
              label="Categories Analyzed"
              value={result.categoryDetails.length}
              color="text-slate-900"
            />
            <StatTile
              icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
              label="Critical Issues"
              value={criticalCount}
              color={criticalCount > 0 ? "text-red-600" : "text-emerald-600"}
            />
            <StatTile
              icon={<Sparkles className="h-4 w-4 text-amber-500" />}
              label="Recommendations"
              value={result.criticalIssues.length + result.quickWins.length}
              color="text-slate-900"
            />
            <StatTile
              icon={<Globe className="h-4 w-4 text-emerald-600" />}
              label="AI Visibility"
              value={estimatedVisibility}
              color={visColor}
              note="Estimated level"
            />
          </div>
        </div>
      </div>

      {/* ── SECTION 2: Category Breakdown ──────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <SectionHeader
          icon={<BarChart3 className="h-5 w-5" />}
          title="Weighted Category Breakdown"
          subtitle="Enterprise scoring across 6 AI visibility categories — click any category to see detailed sub-checks"
          iconGradient="from-blue-500 to-indigo-600"
        />

        {/* Overall bar */}
        <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700">Overall AI Visibility Score</span>
            <span className="text-sm font-bold text-slate-900">{result.score}/100</span>
          </div>
          <ProgressBar score={result.score} maxScore={100} />
          <div className="flex justify-between mt-2 text-[10px] text-slate-400">
            <span>Critical (0–24)</span>
            <span>Poor (25–44)</span>
            <span>Fair (45–64)</span>
            <span>Good (65–79)</span>
            <span>Excellent (80+)</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {result.categoryDetails.map((detail, i) => (
            <CategoryCard key={detail.key} detail={detail} index={i} />
          ))}
        </div>
      </div>

      {/* ── SECTION 3: AI Platform Compatibility ───────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <SectionHeader
          icon={<Globe className="h-5 w-5" />}
          title="AI Platform Compatibility"
          subtitle="How visible your business is to each major AI platform"
          iconGradient="from-violet-500 to-purple-600"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {result.aiPlatforms.map(p => <PlatformCard key={p.id} platform={p} />)}
        </div>
      </div>

      {/* ── SECTION 4: AI Citability Deep Dive ────────────────────────────── */}
      {citabilityCategory && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          <SectionHeader
            icon={<BookOpen className="h-5 w-5" />}
            title="AI Citability Deep Dive"
            subtitle="Why your site received its AI citability score — each signal affects how confidently AI systems can reference your business"
            iconGradient="from-teal-500 to-cyan-600"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {citabilityCategory.subChecks.map(sc => (
              <CitabilityCheckCard key={sc.key} check={sc} />
            ))}
          </div>
        </div>
      )}

      {/* ── SECTION 5: Entity Recognition ─────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <SectionHeader
          icon={<Network className="h-5 w-5" />}
          title="Entity Recognition & Knowledge Graph"
          subtitle="AI systems verify businesses through entity signals — gaps here prevent AI from confidently citing your brand"
          iconGradient="from-rose-500 to-pink-600"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {result.entities.map(e => <EntityRow key={e.entity} entity={e} />)}
        </div>
        <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-200">
          <div className="flex items-start gap-2.5">
            <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800 leading-relaxed">
              <strong>About Brand Authority scoring:</strong> Entity signals are detected from on-page structured data and content. 
              Backlink authority and Knowledge Graph presence require external verification tools (Ahrefs, Moz, Google Search Console) 
              for complete analysis. Scores reflect on-site signals only.
            </p>
          </div>
        </div>
      </div>

      {/* ── SECTION 6: Content Quality Analysis ───────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <SectionHeader
          icon={<FileText className="h-5 w-5" />}
          title="Content Quality Analysis"
          subtitle="Content metrics that determine how easily AI systems can extract and cite your information"
          iconGradient="from-amber-500 to-orange-500"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {result.contentMetrics.map(m => <ContentMetricTile key={m.key} metric={m} />)}
        </div>
      </div>

      {/* ── SECTION 7: Critical Issues ─────────────────────────────────────── */}
      {result.criticalIssues.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          <SectionHeader
            icon={<AlertTriangle className="h-5 w-5" />}
            title="Critical Issues"
            subtitle={`${result.criticalIssues.length} issues identified — click any issue to see the recommended fix and expected score improvement`}
            iconGradient="from-red-500 to-rose-600"
          />
          <div className="space-y-3">
            {result.criticalIssues.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      )}

      {/* ── SECTION 8: Quick Wins ─────────────────────────────────────────── */}
      {result.quickWins.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          <SectionHeader
            icon={<Zap className="h-5 w-5" />}
            title="Quick Wins"
            subtitle="Highest-impact, lowest-effort improvements — sorted by expected score gain"
            iconGradient="from-yellow-500 to-amber-500"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {result.quickWins.map((win, i) => (
              <QuickWinCard key={win.id} win={win} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── SECTION 9: Priority Roadmap ───────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <SectionHeader
          icon={<Target className="h-5 w-5" />}
          title="6-Month Priority Roadmap"
          subtitle="A phased implementation plan to systematically improve your AI visibility score"
          iconGradient="from-slate-700 to-slate-900"
        />
        <div className="space-y-3">
          {result.roadmap.map((phase, i) => (
            <RoadmapPhaseCard key={phase.month} phase={phase} index={i} />
          ))}
        </div>
        <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="flex items-center gap-2 mb-1.5">
            <TrendingUp className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-bold text-white/90">Projected Score Improvement</span>
          </div>
          <p className="text-xs text-white/60 leading-relaxed">
            Implementing all 6 phases could increase your AI Visibility Score by{" "}
            <span className="text-white font-bold">
              +{result.roadmap.reduce((acc, p) => acc + p.expectedScoreImprovement, 0)} points
            </span>{" "}
            — moving {result.band === "critical" || result.band === "poor" ? "from critical/poor toward fair-to-good" : "further into the good-to-excellent range"} within 6 months.
          </p>
        </div>
      </div>

      {/* ── SECTION 10: Key Pages Analyzed ────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <SectionHeader
          icon={<Globe className="h-5 w-5" />}
          title="Key Pages Analyzed"
          subtitle="Visibility score and issue summary by analyzed page — click column headers to sort"
          iconGradient="from-emerald-500 to-teal-600"
        />
        <PagesTable pages={result.pagesAnalyzed} />
        <p className="text-[11px] text-slate-400 mt-3 text-center">
          Full multi-page analysis covers your homepage only. 
          <a href="/contact" className="text-cyan-600 hover:text-cyan-700 font-medium ml-1">
            Contact us for a full site audit →
          </a>
        </p>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-10 text-center shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium mb-4">
            <Sparkles className="h-3 w-3" />
            Expert AI Visibility Implementation
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ fontFamily: "Satoshi, sans-serif" }}>
            Ready to fix these issues?
          </h2>
          <p className="text-slate-300 text-sm max-w-lg mx-auto mb-6">
            Our GEO specialists can implement every recommendation in this report — 
            from structured data to E-E-A-T optimization — in a structured 6-month engagement.
          </p>
          <a href={`/contact?audit=${encodeURIComponent(domain)}&score=${result.score}&band=${result.band}`}>
            <button className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-white text-slate-900 text-sm font-bold shadow-lg hover:bg-cyan-50 hover:shadow-xl transition-all hover:-translate-y-0.5">
              Get Expert Implementation <ArrowRight className="h-4 w-4" />
            </button>
          </a>
        </div>
      </div>

      {/* Footer attribution */}
      <div className="text-center pb-8">
        <p className="text-xs text-slate-400">
          Powered by{" "}
          <a href="https://aibizmod.com/services/ai-automation/ai-visibility-audit" className="text-cyan-600 hover:text-cyan-700 font-medium transition">
            AIBizMod GEO Audit Engine
          </a>
          {" · "}
          <span>AI Visibility Audit for {displayDomain}</span>
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------
function AuditReportContent() {
  const searchParams = useSearchParams();
  const domainParam = searchParams.get("domain");

  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAudit = useCallback(async (url: string) => {
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
  }, []);

  useEffect(() => {
    if (domainParam) {
      setDomain(domainParam);
      runAudit(domainParam);
    }
  }, [domainParam, runAudit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!domain.trim() || isLoading) return;
    window.history.replaceState(null, "", `/ai-visibility-audit-report?domain=${encodeURIComponent(domain.trim())}`);
    await runAudit(domain.trim());
  };

  const displayDomain = domain ? formatDomain(domain) : "";

  return (
    <>
      <Navbar />

      {/* Sticky audit bar */}
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
                onChange={e => setDomain(e.target.value)}
                placeholder="Enter your domain (e.g., aibizmod.com)"
                disabled={isLoading}
                className="w-72 sm:w-80 h-9 pl-9 pr-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 disabled:opacity-60"
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
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 pb-10">

          {isLoading && <LoadingSkeleton domain={displayDomain || domain} />}

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
                      <AlertCircle className="h-3 w-3" />Connection timeout
                    </div>
                    <p className="text-sm text-amber-700 mb-6 leading-relaxed">
                      We couldn&apos;t reach <span className="font-semibold">{displayDomain || domain}</span>. The server may be down, blocking our request, or the domain doesn&apos;t exist.
                    </p>
                    <button
                      onClick={() => { setError(null); setDomain(domain); }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-800 transition bg-amber-50 px-4 py-2 rounded-lg border border-amber-200 hover:bg-amber-100"
                    >
                      <Loader2 className="h-3.5 w-3.5" />Retry Audit
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

          {result && !isLoading && (
            <AuditReport result={result} domain={domain} />
          )}

          {!domainParam && !result && !isLoading && !error && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "Satoshi, sans-serif" }}>
                AI Visibility Audit
              </h2>
              <p className="text-slate-500 text-sm max-w-md mb-8">
                Enter a domain above to generate a comprehensive AI Visibility Report — analyzing 60+ signals across structured data, E-E-A-T, citability, and more.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl text-left">
                {[
                  { icon: <BarChart3 className="h-4 w-4 text-cyan-600" />, text: "Weighted scoring across 6 categories" },
                  { icon: <Globe className="h-4 w-4 text-violet-600" />, text: "AI platform compatibility scores" },
                  { icon: <Network className="h-4 w-4 text-rose-600" />, text: "Entity recognition analysis" },
                  { icon: <Zap className="h-4 w-4 text-amber-600" />, text: "Quick wins & priority roadmap" },
                  { icon: <FileText className="h-4 w-4 text-teal-600" />, text: "Content quality deep dive" },
                  { icon: <Shield className="h-4 w-4 text-slate-600" />, text: "Critical issue detection" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                    {item.icon}
                    <span className="text-xs text-slate-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

// ---------------------------------------------------------------------------
// Page export
// ---------------------------------------------------------------------------
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
