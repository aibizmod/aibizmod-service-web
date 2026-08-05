"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState, useRef, Suspense, useCallback } from "react";
import { gql } from "@apollo/client";
import { cn } from "@/lib/utils";
import { client } from "@/lib/apollo-client";
import {
  ArrowRight,
  Loader2,
  Shield,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Zap,
  BarChart3,
  TrendingUp,
  Sparkles,
  Printer,
  Info,
  ChevronDown,
  ChevronUp,
  FileText,
  Globe,
  Target,
  Clock,
  AlertTriangle,
  XCircle,
  Brain,
  Layers,
  MessageSquare,
  BookOpen,
  Network,
  ArrowUpRight,
  Search,
  Activity,
  LogOut,
  Link2,
  Copy,
  Check,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { TextShimmer } from "@/components/ui/text-shimmer";
// ---------------------------------------------------------------------------
// Audit Page Strands Background Component
// ---------------------------------------------------------------------------
const PAGE_STRANDS = 7;
const PAGE_SAMPLES = 33;
const PAGE_VB_W = 1440;
const PAGE_VB_H = 900;

const PAGE_STRAND_GRADIENTS = [
  { start: "#06B6D4", mid: "#22D3EE", end: "#3B82F6" },
  { start: "#0891B2", mid: "#06B6D4", end: "#22D3EE" },
  { start: "#22D3EE", mid: "#0891B2", end: "#3B82F6" },
  { start: "#06B6D4", mid: "#0891B2", end: "#06B6D4" },
  { start: "#3B82F6", mid: "#22D3EE", end: "#0891B2" },
  { start: "#0891B2", mid: "#3B82F6", end: "#06B6D4" },
  { start: "#22D3EE", mid: "#06B6D4", end: "#3B82F6" },
];

interface SearchTarget {
  cx: number;
  cy: number;
  left: number;
  right: number;
  pillW: number;
}

const FALLBACK_TARGET: SearchTarget = {
  cx: 720,
  cy: 580,
  left: 396,
  right: 1044,
  pillW: 648,
};

interface AuditPageStrandsProps {
  searchTarget?: SearchTarget | null;
  isTyping?: boolean;
  ripples?: React.MutableRefObject<{ t0: number; life: number }[]>;
  className?: string;
}

function AuditPageStrandsBackground({ searchTarget, isTyping, ripples, className }: AuditPageStrandsProps) {
  const phaseRef = useRef<number[]>(Array.from({ length: PAGE_STRANDS }, (_, i) => i * 0.8));
  const phase2Ref = useRef<number[]>(Array.from({ length: PAGE_STRANDS }, (_, i) => i * 0.5 + 1.2));
  const disturbRef = useRef(0);
  const pathRefs = useRef<(SVGPathElement | null)[]>(Array(PAGE_STRANDS).fill(null));
  const dotLeftRef = useRef<SVGCircleElement | null>(null);
  const dotRightRef = useRef<SVGCircleElement | null>(null);
  const frameRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  const searchTargetRef = useRef<SearchTarget>(searchTarget ?? FALLBACK_TARGET);
  useEffect(() => {
    searchTargetRef.current = searchTarget ?? FALLBACK_TARGET;
  }, [searchTarget]);

  useEffect(() => {
    const animate = (time: number) => {
      const dt = lastTimeRef.current === null ? 0 : Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      const target = isTyping ? 1 : 0;
      const tau = isTyping ? 0.11 : 0.65;
      disturbRef.current += (target - disturbRef.current) * (1 - Math.exp(-dt / tau));

      const disturb = disturbRef.current;
      const speed = 0.85 + 0.9 * disturb;

      for (let i = 0; i < PAGE_STRANDS; i++) {
        phaseRef.current[i] += speed * dt;
        phase2Ref.current[i] += speed * dt * 1.3;
      }

      const st = searchTargetRef.current;
      const { cx, cy } = st;

      const maxFunnelHalf = Math.min(st.pillW / 2, 340);
      const sLeft = Math.max(cx - maxFunnelHalf, 340);
      const sRight = Math.min(cx + maxFunnelHalf, 1100);

      for (let i = 0; i < PAGE_STRANDS; i++) {
        const baseRow = (PAGE_VB_H / (PAGE_STRANDS + 1)) * (i + 1);
        const sign = i % 2 === 0 ? 1 : -1;
        const points: [number, number][] = [];

        for (let s = 0; s < PAGE_SAMPLES; s++) {
          const x = (s / (PAGE_SAMPLES - 1)) * PAGE_VB_W;
          let y = baseRow;

          if (x <= sLeft) {
            const t = smoothstepStrand(0, sLeft, x);
            y = baseRow + (cy - baseRow) * t;
            const swayFade = 1 - t;
            y += Math.sin(phaseRef.current[i] * 1.5 - x * 0.008 + i * 0.7) * (14 + 9.5 * disturb) * swayFade;

            if (ripples?.current) {
              for (const rip of ripples.current) {
                const age = performance.now() / 1000 - rip.t0;
                if (age < 0 || age > rip.life) continue;
                const norm = age / rip.life;
                const fade = Math.sin(norm * Math.PI);
                const front = age * 950;
                const dist = (sLeft - x) - front;
                const bump = Math.exp(-(dist * dist) / (2 * 145 * 145));
                y += sign * bump * fade * 11.5 * swayFade;
              }
            }
          } else if (x >= sRight) {
            const t = smoothstepStrand(sRight, PAGE_VB_W, x);
            y = cy + (baseRow - cy) * t;
            y += Math.sin(phaseRef.current[i] * 1.5 + x * 0.008 + i * 0.7) * (14 + 9.5 * disturb) * t;

            if (ripples?.current) {
              for (const rip of ripples.current) {
                const age = performance.now() / 1000 - rip.t0;
                if (age < 0 || age > rip.life) continue;
                const norm = age / rip.life;
                const fade = Math.sin(norm * Math.PI);
                const front = age * 950;
                const dist = (x - sRight) - front;
                const bump = Math.exp(-(dist * dist) / (2 * 145 * 145));
                y += sign * bump * fade * 11.5 * (1 - t);
              }
            }
          } else {
            const u = (x - sLeft) / (sRight - sLeft);
            const env = Math.sin(u * Math.PI);
            const breathe = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(phaseRef.current[i] * 1.3));
            const braidAmp = PAGE_VB_H * 0.064 * (breathe + disturb * 0.5) * env;
            const harmonic = Math.sin(phase2Ref.current[i] + u * 8 * Math.PI) * env * (0.22 + 0.35 * disturb);
            let yBraid = Math.sin(phaseRef.current[i] + u * 4 * Math.PI) + harmonic;
            if (yBraid < 0) yBraid *= 0.73;
            y = cy + yBraid * braidAmp;
          }

          points.push([x, y]);
        }

        const d = catmullRomToBezier(points);
        if (pathRefs.current[i]) {
          pathRefs.current[i]!.setAttribute("d", d);
        }
      }

      if (dotLeftRef.current) {
        dotLeftRef.current.setAttribute("cx", sLeft.toFixed(1));
        dotLeftRef.current.setAttribute("cy", st.cy.toFixed(1));
      }
      if (dotRightRef.current) {
        dotRightRef.current.setAttribute("cx", sRight.toFixed(1));
        dotRightRef.current.setAttribute("cy", st.cy.toFixed(1));
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isTyping, ripples]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <svg
        viewBox={`0 0 ${PAGE_VB_W} ${PAGE_VB_H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-65"
      >
        <defs>
          <filter id="page-strand-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="page-dot-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {PAGE_STRAND_GRADIENTS.map((grad, i) => (
            <linearGradient key={i} id={`page-strand-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={grad.start} stopOpacity="0" />
              <stop offset="15%" stopColor={grad.start} stopOpacity="0.85" />
              <stop offset="50%" stopColor={grad.mid} stopOpacity="1" />
              <stop offset="85%" stopColor={grad.end} stopOpacity="0.85" />
              <stop offset="100%" stopColor={grad.end} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        <g filter="url(#page-strand-glow)">
          {Array.from({ length: PAGE_STRANDS }, (_, i) => (
            <path
              key={i}
              ref={(el) => { pathRefs.current[i] = el; }}
              stroke={`url(#page-strand-${i})`}
              strokeWidth={isTyping ? "1.35" : "1.15"}
              strokeLinecap="round"
              fill="none"
              d=""
            />
          ))}
        </g>

        <circle
          ref={dotLeftRef}
          cx={searchTarget?.left ?? FALLBACK_TARGET.left}
          cy={searchTarget?.cy ?? FALLBACK_TARGET.cy}
          r="3.5"
          fill="#67e8f9"
          filter="url(#page-dot-glow)"
        />
        <circle
          ref={dotRightRef}
          cx={searchTarget?.right ?? FALLBACK_TARGET.right}
          cy={searchTarget?.cy ?? FALLBACK_TARGET.cy}
          r="3.5"
          fill="#67e8f9"
          filter="url(#page-dot-glow)"
        />
      </svg>
    </div>
  );
}
import { StarButton } from "@/components/ui/star-button";
import { useAibizmodAuth } from "@/components/providers/AibizmodAuthProvider";
import { SignInModal } from "@/components/aibizmod/SignInModal";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CategoryDetail = Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Issue = Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type QuickWin = Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PlatformScore = Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EntityCheck = Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ContentMetric = Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AuditResult = Record<string, any>;

type RoadmapPhase = {
  month: string;
  title: string;
  priority: string;
  expectedScoreImprovement: number;
  tasks: string[];
};

type PageScore = {
  url: string;
  visibilityScore: number;
  criticalIssues: number;
  priority: string;
  status: string;
};

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

// Scroll reveal wrapper
function ScrollReveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

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
          {(detail.subChecks ?? []).map((sc: any) => (
            <SubCheckRow key={sc.key} check={sc} />
          ))}
        </div>
      )}
    </div>
  );
}

// Platform card (row layout)
function PlatformCard({ platform }: { platform: PlatformScore }) {
  const gradClass = PLATFORM_COLORS[platform.id] || "from-slate-500 to-slate-600";
  const compat = platform.status;
  const compatColor =
    compat === "compatible" ? "text-emerald-600 bg-emerald-50 border-emerald-200" :
      compat === "partial" ? "text-amber-600 bg-amber-50 border-amber-200" :
        compat === "limited" ? "text-orange-600 bg-orange-50 border-orange-200" :
          "text-red-600 bg-red-50 border-red-200";

  return (
    <div className="group flex flex-col lg:flex-row lg:items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-3 lg:w-64 shrink-0">
        <div className={cn("p-2.5 rounded-xl bg-gradient-to-br text-white shadow-sm shrink-0", gradClass)}>
          {PLATFORM_ICONS[platform.id]}
        </div>
        <div>
          <div className="font-bold text-slate-900 text-sm" style={{ fontFamily: "Satoshi, sans-serif" }}>{platform.name}</div>
          <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full border inline-flex mt-0.5", compatColor)}>
            {compat === "compatible" ? "Compatible" : compat === "partial" ? "Partial" : compat === "limited" ? "Limited" : "Not Compatible"}
          </span>
        </div>
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <p className="text-xs text-slate-600 leading-relaxed">{platform.explanation}</p>
        <div className="flex items-start gap-2 rounded-lg bg-slate-50 border border-slate-100 p-2.5">
          <ArrowUpRight className="h-3.5 w-3.5 text-cyan-500 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-600 leading-relaxed">{platform.topRecommendation}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 lg:w-36 shrink-0 lg:justify-end">
        <div className="text-right">
          <div className="text-2xl font-bold text-slate-900" style={{ fontFamily: "Satoshi, sans-serif" }}>{platform.score}</div>
          <div className="text-[10px] text-slate-400">/100</div>
        </div>
        <div className="w-16 hidden lg:block">
          <ProgressBar score={platform.score} maxScore={100} />
        </div>
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
// ---------------------------------------------------------------------------
// Hero Strands Loading Animation for AI Visibility Search
// ---------------------------------------------------------------------------
const LOADING_STRANDS = 7;
const LOADING_SAMPLES = 33;
const LOADING_VB_W = 1440;
const LOADING_VB_H = 900;

const LOADING_STRAND_GRADIENTS = [
  { start: "#06B6D4", mid: "#22D3EE", end: "#3B82F6" },
  { start: "#0891B2", mid: "#06B6D4", end: "#22D3EE" },
  { start: "#22D3EE", mid: "#0891B2", end: "#3B82F6" },
  { start: "#06B6D4", mid: "#0891B2", end: "#06B6D4" },
  { start: "#3B82F6", mid: "#22D3EE", end: "#0891B2" },
  { start: "#0891B2", mid: "#3B82F6", end: "#06B6D4" },
  { start: "#22D3EE", mid: "#06B6D4", end: "#3B82F6" },
];

function smoothstepStrand(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function catmullRomToBezier(points: [number, number][]): string {
  if (points.length < 2) return "";
  const n = points.length;
  let d = `M ${points[0][0].toFixed(2)},${points[0][1].toFixed(2)}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(n - 1, i + 2)];
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
  }
  return d;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function LoadingSkeleton({ domain }: { domain: string }) {
  const [scanPhase, setScanPhase] = useState(0);
  const phases = [
    "Resolving domain & establishing connection...",
    "Scanning structured data & schema markup...",
    "Analyzing content quality & E-E-A-T signals...",
    "Checking AI platform citability...",
    "Building your visibility report...",
  ];

  const phaseRef = useRef<number[]>(Array.from({ length: LOADING_STRANDS }, (_, i) => i * 0.8));
  const phase2Ref = useRef<number[]>(Array.from({ length: LOADING_STRANDS }, (_, i) => i * 0.5 + 1.2));
  const ripplesRef = useRef<{ t0: number; life: number }[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>(Array(LOADING_STRANDS).fill(null));
  const frameRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  // Trigger strand ripple pulse whenever scan phase advances
  const triggerRipple = useCallback(() => {
    const now = performance.now() / 1000;
    ripplesRef.current.push({ t0: now, life: 1.4 });
    if (ripplesRef.current.length > 8) ripplesRef.current.shift();
  }, []);

  useEffect(() => {
    triggerRipple();
    const t = setInterval(() => {
      setScanPhase((p) => {
        const next = p < phases.length - 1 ? p + 1 : p;
        triggerRipple();
        return next;
      });
    }, 2800);
    return () => clearInterval(t);
  }, [phases.length, triggerRipple]);

  useEffect(() => {
    const animate = (time: number) => {
      const dt = lastTimeRef.current === null ? 0 : Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      const speed = 1.1;

      for (let i = 0; i < LOADING_STRANDS; i++) {
        phaseRef.current[i] += speed * dt;
        phase2Ref.current[i] += speed * dt * 1.3;
      }

      const sLeft = 396;
      const sRight = 1044;
      const cy = 450;

      for (let i = 0; i < LOADING_STRANDS; i++) {
        const baseRow = (LOADING_VB_H / (LOADING_STRANDS + 1)) * (i + 1);
        const sign = i % 2 === 0 ? 1 : -1;
        const points: [number, number][] = [];

        for (let s = 0; s < LOADING_SAMPLES; s++) {
          const x = (s / (LOADING_SAMPLES - 1)) * LOADING_VB_W;
          let y = baseRow;

          if (x <= sLeft) {
            const t = smoothstepStrand(0, sLeft, x);
            y = baseRow + (cy - baseRow) * t;
            const swayFade = 1 - t;
            y += Math.sin(phaseRef.current[i] * 1.5 - x * 0.008 + i * 0.7) * 16 * swayFade;

            for (const rip of ripplesRef.current) {
              const age = performance.now() / 1000 - rip.t0;
              if (age < 0 || age > rip.life) continue;
              const norm = age / rip.life;
              const fade = Math.sin(norm * Math.PI);
              const front = age * 950;
              const dist = (sLeft - x) - front;
              const bump = Math.exp(-(dist * dist) / (2 * 145 * 145));
              y += sign * bump * fade * 12.0 * swayFade;
            }
          } else if (x >= sRight) {
            const t = smoothstepStrand(sRight, LOADING_VB_W, x);
            y = cy + (baseRow - cy) * t;
            y += Math.sin(phaseRef.current[i] * 1.5 + x * 0.008 + i * 0.7) * 16 * t;

            for (const rip of ripplesRef.current) {
              const age = performance.now() / 1000 - rip.t0;
              if (age < 0 || age > rip.life) continue;
              const norm = age / rip.life;
              const fade = Math.sin(norm * Math.PI);
              const front = age * 950;
              const dist = (x - sRight) - front;
              const bump = Math.exp(-(dist * dist) / (2 * 145 * 145));
              y += sign * bump * fade * 12.0 * (1 - t);
            }
          } else {
            const u = (x - sLeft) / (sRight - sLeft);
            const env = Math.sin(u * Math.PI);
            const breathe = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(phaseRef.current[i] * 1.3));
            const braidAmp = LOADING_VB_H * 0.064 * (breathe + 0.35) * env;
            const harmonic = Math.sin(phase2Ref.current[i] + u * 8 * Math.PI) * env * 0.32;
            let yBraid = Math.sin(phaseRef.current[i] + u * 4 * Math.PI) + harmonic;
            if (yBraid < 0) yBraid *= 0.73;
            y = cy + yBraid * braidAmp;
          }

          points.push([x, y]);
        }

        const d = catmullRomToBezier(points);
        if (pathRefs.current[i]) {
          pathRefs.current[i]!.setAttribute("d", d);
        }
      }

      const now = performance.now() / 1000;
      ripplesRef.current = ripplesRef.current.filter((r) => now - r.t0 < r.life);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div className="relative isolate min-h-[640px] w-full overflow-hidden rounded-3xl bg-slate-950 py-12 px-6 flex items-center justify-center border border-cyan-900/30 shadow-2xl">
      {/* Background Hero Strands SVG */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${LOADING_VB_W} ${LOADING_VB_H}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        style={{ zIndex: 0 }}
      >
        <defs>
          <filter id="loading-strand-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {LOADING_STRAND_GRADIENTS.map((grad, i) => (
            <linearGradient key={i} id={`loading-strand-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={grad.start} stopOpacity="0" />
              <stop offset="15%" stopColor={grad.start} stopOpacity="0.9" />
              <stop offset="50%" stopColor={grad.mid} stopOpacity="1" />
              <stop offset="85%" stopColor={grad.end} stopOpacity="0.9" />
              <stop offset="100%" stopColor={grad.end} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        <g filter="url(#loading-strand-glow)">
          {Array.from({ length: LOADING_STRANDS }, (_, i) => (
            <path
              key={i}
              ref={(el) => { pathRefs.current[i] = el; }}
              stroke={`url(#loading-strand-${i})`}
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
              d=""
            />
          ))}
        </g>
      </svg>

      {/* Radial Glow wash behind center loading card */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12)_0%,transparent_70%)]" />

      {/* Center Glass Loading Card */}
      <div className="relative z-10 w-full max-w-xl rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.18)]">
        {/* Domain indicator pill */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 px-4 py-1.5 text-xs font-mono text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            Auditing AI Visibility for <span className="font-bold text-white">{domain}</span>
          </div>
        </div>

        {/* Phase indicators */}
        <div className="space-y-3 mb-8">
          {phases.map((phase, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-500",
                i < scanPhase
                  ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                  : i === scanPhase
                  ? "bg-cyan-950/60 border-cyan-400/50 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                  : "bg-slate-900/40 border-slate-800/80 text-slate-500"
              )}
            >
              <div className="flex-shrink-0">
                {i < scanPhase ? (
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                ) : i === scanPhase ? (
                  <Loader2 className="h-4 w-4 text-cyan-400 animate-spin" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-slate-700" />
                )}
              </div>
              <span className="text-xs font-medium tracking-wide">{phase}</span>
            </div>
          ))}
        </div>

        {/* Gradient Progress bar */}
        <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 transition-all duration-1000 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
            style={{ width: `${Math.round(((scanPhase + 1) / phases.length) * 100)}%` }}
          />
        </div>

        {/* Subtitle note */}
        <p className="mt-4 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
          Analyzing ChatGPT, Gemini, Claude & Perplexity Citations
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main report
// ---------------------------------------------------------------------------
const SAVE_AUDIT_REPORT = gql`
  mutation CreateAibizmodAuditReport($input: CreateAibizmodAuditReportInput!) {
    createAibizmodAuditReport(input: $input) {
      reportId
      userId
      sessionId
      isLogined
      domainAudited
      score
      band
      generatedAt
    }
  }
`;

function AuditReport({ result, domain }: { result: AuditResult; domain: string }) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const { isAuthenticated, user, logout } = useAibizmodAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const savedRef = useRef(false);
  const [hostedReportId, setHostedReportId] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  // Save audit report once after it is generated
  useEffect(() => {
    if (savedRef.current || !result) return;

    const sessionId =
      typeof window !== "undefined"
        ? localStorage.getItem("aibizmod_session_id")
        : null;

    client
      .mutate({
        mutation: SAVE_AUDIT_REPORT,
        variables: {
          input: {
            userId: user?.userId || undefined,
            sessionId: sessionId || undefined,
            isLogined: isAuthenticated,
            domainAudited: domain,
            score: typeof result.score === "number" ? result.score : undefined,
            band: result.band || undefined,
            resultJson: JSON.stringify(result),
          },
        },
      })
      .then((res: any) => {
        savedRef.current = true;
        const reportId = res?.data?.createAibizmodAuditReport?.reportId as string | undefined;
        if (!reportId) return;

        setHostedReportId(reportId);
        try {
          const key = "aibizmod_audit_reports";
          const existing = JSON.parse(localStorage.getItem(key) || "{}") as Record<
            string,
            { domain: string; result: AuditResult; savedAt: number }
          >;
          existing[reportId] = { domain, result, savedAt: Date.now() };
          const ids = Object.keys(existing).sort(
            (a, b) => existing[b].savedAt - existing[a].savedAt,
          );
          for (const staleId of ids.slice(10)) delete existing[staleId];
          localStorage.setItem(key, JSON.stringify(existing));
        } catch (err) {
          console.error("[Aibizmod] Failed to cache audit report locally:", err);
        }
      })
      .catch((err) => {
        console.error("[Aibizmod] Failed to save audit report:", err);
      });
  }, [result, domain, isAuthenticated, user?.userId]);

  const copyHostedLink = async () => {
    if (!hostedReportId) return;
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/audit/${hostedReportId}`);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error("[Aibizmod] Clipboard unavailable:", err);
    }
  };
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
  const citabilityCategory = result.categoryDetails?.find((c: any) => c.key === "citability");
  const criticalCount = result.criticalIssues?.filter((i: any) => i.severity === "critical").length ?? 0;
  const estimatedVisibility = result.score >= 70 ? "High" : result.score >= 45 ? "Moderate" : result.score >= 25 ? "Low" : "Minimal";
  const visColor = result.score >= 70 ? "text-emerald-600" : result.score >= 45 ? "text-amber-600" : "text-red-600";

  return (
    <ScrollReveal>
    <div className="space-y-6" ref={reportRef}>

      {/* ── Domain header ─────────────────────────────────────────────────── */}
      <div className="group relative bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {favicon && <img src={favicon} alt={`${displayDomain} favicon`} width={44} height={44} className="w-11 h-11 rounded-xl border border-slate-200 shadow-sm" />}
            <div>
              <h1 className="text-xl font-bold text-slate-900" style={{ fontFamily: "Satoshi, sans-serif" }}>{displayDomain}</h1>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">
                  <Shield className="h-3 w-3" />AI Visibility Report
                </span>
                <span className="text-slate-400">·</span>
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

      {/* ── Hosted report link ────────────────────────────────────────────── */}
      {hostedReportId && (
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 rounded-xl border border-cyan-200 bg-cyan-50/60 px-4 py-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Link2 className="h-4 w-4 text-cyan-600 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-slate-700">
              <span className="font-semibold text-cyan-800">Hosted report ready.</span>{" "}
              Share this link with anyone — it stays live on aibizmod.com. No login required.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <code className="hidden xl:block text-xs text-slate-500 bg-white border border-cyan-200 rounded-md px-2 py-1 max-w-[240px] truncate">
              {window.location.origin}/audit/{hostedReportId}
            </code>
            <button
              onClick={copyHostedLink}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-700 bg-white border border-cyan-200 rounded-lg px-3 py-1.5 hover:bg-cyan-100/60 transition"
            >
              {linkCopied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              {linkCopied ? "Copied" : "Copy link"}
            </button>
            <a
              href={`/audit/${hostedReportId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg px-3 py-1.5 hover:opacity-90 transition"
            >
              Open report <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      )}

      {/* ── SECTION 1: Executive Summary ───────────────────────────────────── */}
      <div className="rounded-2xl bg-gradient-to-br from-cyan-50/40 via-white to-emerald-50/30 border border-cyan-100/60 p-6 sm:p-8 shadow-sm">
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
                    {result.band === "excellent" && <Sparkles className="h-4 w-4" />}
                    {result.band === "good" && <CheckCircle className="h-4 w-4" />}
                    {result.band === "fair" && <BarChart3 className="h-4 w-4" />}
                    {result.band === "poor" && <AlertTriangle className="h-4 w-4" />}
                    {result.band === "critical" && <XCircle className="h-4 w-4" />}
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
              value={result.categoryDetails?.length ?? 0}
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
              value={(result.criticalIssues?.length ?? 0) + (result.quickWins?.length ?? 0)}
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
      <div className="rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm ring-1 ring-slate-100">
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
          {(result.categoryDetails ?? []).map((detail: any, i: number) => (
            <CategoryCard key={detail.key} detail={detail} index={i} />
          ))}
        </div>
      </div>

      {!isAuthenticated && (
        <div className="flex items-center justify-center py-8">
          <button
            onClick={() => setShowSignInModal(true)}
            data-aibizmod-track="View Full Report CTA"
            className="group inline-flex items-center gap-3 h-14 px-10 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white text-base font-bold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 hover:scale-[1.02]"
          >
            <Sparkles className="h-5 w-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            Unlock Full Report <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {isAuthenticated && (
        <div className="flex items-center justify-center py-6">
          <div className="inline-flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900">
                {user?.firstName ? `Hi, ${user.firstName}` : "Welcome back"}
              </span>
              <span className="text-xs text-slate-500">{user?.email}</span>
            </div>
            <button
              onClick={logout}
              data-aibizmod-track="Logout"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-red-600 transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </div>
      )}

      <SignInModal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} />

      {/* ── SECTION 3: AI Platform Compatibility ───────────────────────────── */}
      <div className={cn("bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm", isAuthenticated ? "" : "blur-sm select-none")}>
        <SectionHeader
          icon={<Globe className="h-5 w-5" />}
          title="AI Platform Compatibility"
          subtitle="How visible your business is to each major AI platform"
          iconGradient="from-violet-500 to-purple-600"
        />
        <div className="space-y-3">
          {(result.aiPlatforms ?? []).map((p: any) => <PlatformCard key={p.id} platform={p} />)}
        </div>
      </div>

      {/* ── SECTION 4: AI Citability Deep Dive ────────────────────────────── */}
      {citabilityCategory && (
        <div className={cn("bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm", isAuthenticated ? "" : "blur-sm select-none")}>
          <SectionHeader
            icon={<BookOpen className="h-5 w-5" />}
            title="AI Citability Deep Dive"
            subtitle="Why your site received its AI citability score — each signal affects how confidently AI systems can reference your business"
            iconGradient="from-teal-500 to-cyan-600"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(citabilityCategory.subChecks ?? []).map((sc: any) => (
              <CitabilityCheckCard key={sc.key} check={sc} />
            ))}
          </div>
        </div>
      )}

      {/* ── SECTION 5: Entity Recognition ─────────────────────────────────── */}
      <div className={cn("bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm", isAuthenticated ? "" : "blur-sm select-none")}>
        <SectionHeader
          icon={<Network className="h-5 w-5" />}
          title="Entity Recognition & Knowledge Graph"
          subtitle="AI systems verify businesses through entity signals — gaps here prevent AI from confidently citing your brand"
          iconGradient="from-rose-500 to-pink-600"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {(result.entities ?? []).map((e: any) => <EntityRow key={e.entity} entity={e} />)}
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
      <div className={cn("bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm", isAuthenticated ? "" : "blur-sm select-none")}>
        <SectionHeader
          icon={<FileText className="h-5 w-5" />}
          title="Content Quality Analysis"
          subtitle="Content metrics that determine how easily AI systems can extract and cite your information"
          iconGradient="from-amber-500 to-orange-500"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(result.contentMetrics ?? []).map((m: any) => <ContentMetricTile key={m.key} metric={m} />)}
        </div>
      </div>

      {/* ── SECTION 7: Critical Issues ─────────────────────────────────────── */}
      {result.criticalIssues?.length > 0 && (
        <div className={cn("bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm", isAuthenticated ? "" : "blur-sm select-none")}>
          <SectionHeader
            icon={<AlertTriangle className="h-5 w-5" />}
            title="Critical Issues"
            subtitle={`${result.criticalIssues.length} issues identified — click any issue to see the recommended fix and expected score improvement`}
            iconGradient="from-red-500 to-rose-600"
          />
          <div className="space-y-3">
            {(result.criticalIssues ?? []).map((issue: any) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      )}

      {/* ── SECTION 8: Quick Wins ─────────────────────────────────────────── */}
      {result.quickWins?.length > 0 && (
        <div className={cn("bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm", isAuthenticated ? "" : "blur-sm select-none")}>
          <SectionHeader
            icon={<Zap className="h-5 w-5" />}
            title="Quick Wins"
            subtitle="Highest-impact, lowest-effort improvements — sorted by expected score gain"
            iconGradient="from-yellow-500 to-amber-500"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {(result.quickWins ?? []).map((win: any, i: number) => (
              <QuickWinCard key={win.id} win={win} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── SECTION 9: Priority Roadmap ───────────────────────────────────── */}
      <div className={cn("bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm", isAuthenticated ? "" : "blur-sm select-none")}>
        <SectionHeader
          icon={<Target className="h-5 w-5" />}
          title="6-Month Priority Roadmap"
          subtitle="A phased implementation plan to systematically improve your AI visibility score"
          iconGradient="from-slate-700 to-slate-900"
        />
        <div className="space-y-3">
          {(result.roadmap ?? []).map((phase: any, i: number) => (
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
              +{result.roadmap?.reduce((acc: number, p: any) => acc + p.expectedScoreImprovement, 0) ?? 0} points
            </span>{" "}
            — moving {result.band === "critical" || result.band === "poor" ? "from critical/poor toward fair-to-good" : "further into the good-to-excellent range"} within 6 months.
          </p>
        </div>
      </div>

      {/* ── SECTION 10: Key Pages Analyzed ────────────────────────────────── */}
      <div className={cn("bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm", isAuthenticated ? "" : "blur-sm select-none")}>
        <SectionHeader
          icon={<Globe className="h-5 w-5" />}
          title="Key Pages Analyzed"
          subtitle="Visibility score and issue summary by analyzed page — click column headers to sort"
          iconGradient="from-emerald-500 to-teal-600"
        />
        <PagesTable pages={result.pagesAnalyzed ?? []} />
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
    </ScrollReveal>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------
function AuditReportContent() {
  const [domain, setDomain] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const urlParam = searchParams.get("url") || searchParams.get("domain");
      const storedDomain = window.sessionStorage.getItem("pending-audit-domain");
      return (urlParam || storedDomain)?.trim() || "";
    } catch {
      return "";
    }
  });

  const [result, setResult] = useState<AuditResult | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const urlParam = searchParams.get("url") || searchParams.get("domain");
      const storedDomain = window.sessionStorage.getItem("pending-audit-domain");
      const initialDomain = (urlParam || storedDomain)?.trim();
      if (initialDomain) {
        const cached = window.sessionStorage.getItem("audit-cache-" + initialDomain);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && !parsed.error) return parsed;
        }
      }
    } catch {
      // Storage error ignored
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const resultsSectionRef = useRef<HTMLElement>(null);
  const summaryCardRef = useRef<HTMLDivElement>(null);

  const [searchTarget, setSearchTarget] = useState<SearchTarget | null>(null);
  const [resultsSearchTarget, setResultsSearchTarget] = useState<SearchTarget | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const ripples = useRef<{ t0: number; life: number }[]>([]);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Measure search form position to pin strand funnel edges
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
    const pillW = right - left;

    // Safety guard: ensure cy points to search bar (approx ~580 in 1440x900 coordinate system)
    if (cy < 480) {
      cy = 580;
    }

    setSearchTarget({ cx, cy, left, right, pillW });
  }, []);

  // Measure top audit summary card position when results are shown
  const measureResultsCard = useCallback(() => {
    if (!summaryCardRef.current || !resultsSectionRef.current) return;
    const sectionRect = resultsSectionRef.current.getBoundingClientRect();
    const cardRect = summaryCardRef.current.getBoundingClientRect();

    if (sectionRect.width === 0 || sectionRect.height === 0) return;

    const sx = 1440 / sectionRect.width;
    const rawH = Math.max(sectionRect.height, resultsSectionRef.current.scrollHeight, 900);
    const sy = 900 / rawH;

    const left = (cardRect.left - sectionRect.left) * sx;
    const right = (cardRect.right - sectionRect.left) * sx;
    const top = (cardRect.top - sectionRect.top) * sy;
    const bottom = (cardRect.bottom - sectionRect.top) * sy;
    const cx = (left + right) / 2;
    const cy = (top + bottom) / 2;
    const pillW = right - left;

    setResultsSearchTarget({ cx, cy, left, right, pillW });
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
    setDomain(e.target.value);
    setIsTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 800);

    const now = performance.now() / 1000;
    if (ripples.current.length >= 8) ripples.current.shift();
    ripples.current.push({ t0: now, life: 1.4 });
  };

  const runAudit = useCallback(async (url: string) => {
    const cleaned = url.trim();
    if (!cleaned) return;

    setError(null);

    // Check pre-fetched audit result cached by /scanning
    try {
      const cached = sessionStorage.getItem("audit-cache-" + cleaned);
      if (cached) {
        const cachedData = JSON.parse(cached);
        if (cachedData && !cachedData.error) {
          setResult(cachedData);
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Storage error ignored
    }

    setIsLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/geo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cleaned }),
      });
      const data = (await res.json()) as AuditResult & { error?: string };
      if (!res.ok) {
        const msg = data.error || "Audit failed";
        if (msg.includes("DNS resolution failed") || msg.includes("hostname not resolvable")) {
          throw new Error(`"${cleaned}" could not be found. Please check the spelling and try again.`);
        }
        throw new Error(msg);
      }
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlParam = searchParams.get("url") || searchParams.get("domain");
    const storedDomain = window.sessionStorage.getItem("pending-audit-domain");
    const initialDomain = (urlParam || storedDomain)?.trim();

    if (initialDomain && !result) {
      setDomain(initialDomain);
      window.sessionStorage.removeItem("pending-audit-domain");
      void runAudit(initialDomain);
    }
  }, [runAudit, result]);

  const handleSubmit = async (nextDomain: string) => {
    const cleanedDomain = nextDomain.trim();
    if (!cleanedDomain || isLoading) return;

    try {
      if (formRef.current) {
        const r = formRef.current.getBoundingClientRect();
        sessionStorage.setItem(
          "strand-handoff",
          JSON.stringify({
            cx: r.left + r.width / 2,
            cy: r.top + r.height / 2,
            w: r.width,
            t: Date.now(),
          })
        );
      }
    } catch {
      // Storage error ignored
    }

    try {
      sessionStorage.setItem("pending-audit-domain", cleanedDomain);
    } catch {
      // Ignore storage error
    }

    window.location.href = `/scanning?url=${encodeURIComponent(cleanedDomain)}`;
  };

  const displayDomain = domain ? formatDomain(domain) : "";
  const showResults = result && !isLoading;

  return (
    <>
      <Navbar />

      <main className="bg-white text-ink">
        {!showResults && (
          <section
            ref={sectionRef}
            className="relative isolate overflow-hidden px-6 bg-white min-h-screen flex items-center justify-center pt-20"
          >
            {/* Radial vignette overlay matching Home Hero */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                background:
                  "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(255,255,255,0.96) 100%)",
              }}
            />

            {/* Waving Strands SVG Background */}
            <AuditPageStrandsBackground
              searchTarget={searchTarget}
              isTyping={isTyping}
              ripples={ripples}
              className="absolute inset-0 z-0"
            />

            {/* Grid Pattern */}
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
                Find Out Why AI Ignores Your Site — Free
              </div>

              <h1
                className="mt-6 font-display font-bold text-balance text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.08]"
              >
                See Exactly How AI Search Engines See{" "}
                <TextShimmer
                  as="span"
                  duration={2.2}
                  className="italic font-serif [--base-color:theme(colors.cyan.600)] [--base-gradient-color:#ffffff]"
                >
                  Your Business.
                </TextShimmer>
              </h1>

              <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                ChatGPT, Gemini, Claude, Perplexity — AI platforms cite businesses they can verify. Enter your domain and discover exactly what signals you&apos;re missing, ranked by impact.
              </p>

              <div className="mt-8 mx-auto w-full max-w-2xl">
                <form
                  ref={formRef}
                  id="hero-audit-form"
                  onSubmit={(e) => { e.preventDefault(); handleSubmit(domain); }}
                  className="flex flex-col gap-2.5 sm:flex-row"
                >
                  <div className="relative flex-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-stone-400">
                      <Search className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={domain}
                      onChange={handleInputChange}
                      placeholder="Enter your website URL"
                      autoFocus
                      className="h-12 w-full rounded-2xl border border-cyan-400/80 bg-white shadow-sm pl-10 pr-4 text-[14px] font-medium text-slate-900 outline-none placeholder:text-stone-400 ring-2 ring-cyan-100"
                      aria-label="Domain to audit"
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
                      const form = document.querySelector("#hero-audit-form") as HTMLFormElement;
                      form?.requestSubmit();
                    }}
                  >
                    Run Audit
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
                    Takes ~30 seconds
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white/80 px-3 py-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                    Free
                  </span>
                </div>
              </div>



              {error && (
                <div className="mt-8 mx-auto max-w-lg">
                  {(/^(Unable to reach|Could not connect|Timeout|Connection refused|ENOTFOUND|ECONNREFUSED|ETIMEDOUT)/i).test(error) ? (
                    <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/50 p-8 text-center shadow-lg">
                      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                        <span className="text-3xl">🔌</span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-amber-900">Domain Unreachable</h3>
                      <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-amber-200/60 px-3 py-1 text-xs font-medium text-amber-800">
                        <AlertCircle className="h-3 w-3" />Connection timeout
                      </div>
                      <p className="mb-6 text-sm leading-relaxed text-amber-700">
                        We couldn&apos;t reach <span className="font-semibold">{displayDomain || domain}</span>. The server may be down, blocking our request, or the domain doesn&apos;t exist.
                      </p>
                      <button
                        onClick={() => { setError(null); void handleSubmit(domain); }}
                        className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100 hover:text-amber-800"
                      >
                        <Loader2 className="h-3.5 w-3.5" />Retry Audit
                      </button>
                    </div>
                  ) : (
                    <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-red-100/50 p-8 text-center shadow-lg">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                        <AlertCircle className="h-7 w-7 text-red-500" />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-red-800">Audit Failed</h3>
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {showResults && (() => {
          const band = BAND_META[result.band] || BAND_META.poor;
          const criticalCount = Array.isArray(result.criticalIssues) ? result.criticalIssues.filter((i: Issue) => i.severity === "critical" || i.severity === "high").length : 0;
          const quickWinCount = Array.isArray(result.quickWins) ? result.quickWins.length : 0;
          const platformCount = Array.isArray(result.aiPlatforms) ? result.aiPlatforms.length : 5;
          const faviconUrl = getFaviconUrl(displayDomain || domain);

          return (
            <>
              {/* ── Immersive Report Hero Section ───────────────────────────── */}
              <section ref={resultsSectionRef} className="relative isolate overflow-hidden bg-white px-6 pt-28 pb-20">
                {/* Radial vignette overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-[1]"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(255,255,255,0.96) 100%)",
                  }}
                />

                {/* Waving Strands SVG Background */}
                <AuditPageStrandsBackground searchTarget={resultsSearchTarget} className="absolute inset-0 z-0" />

                {/* Grid Pattern */}
                <div
                  className="pointer-events-none absolute inset-0 z-0 opacity-60"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                  }}
                  aria-hidden="true"
                />

                {/* Band-color-aware floating glow */}
                <div
                  className="pointer-events-none absolute left-1/2 top-36 z-0 h-96 w-96 -translate-x-1/2 rounded-full blur-[100px]"
                  style={{ backgroundColor: band.color, opacity: 0.08 }}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute left-1/2 top-44 z-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-200/20 blur-3xl"
                  aria-hidden="true"
                />

                {/* Hero Content */}
                <div ref={summaryCardRef} className="relative z-10 mx-auto max-w-3xl flex flex-col items-center text-center">

                  {/* 1. Eyebrow Pill */}
                  <div
                    className="inline-flex items-center gap-2 rounded-full border bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md"
                    style={{
                      borderColor: band.color + "33",
                      color: band.color,
                      animation: "fadeUp 600ms ease-out both",
                    }}
                  >
                    <CheckCircle size={14} aria-hidden="true" />
                    Audit Complete
                  </div>

                  {/* 2. Domain Headline with Favicon */}
                  <div
                    className="mt-6 flex items-center justify-center gap-3"
                    style={{ animation: "fadeUp 600ms ease-out 100ms both" }}
                  >
                    {faviconUrl && (
                      <img
                        src={faviconUrl}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-lg shadow-sm border border-slate-100"
                      />
                    )}
                    <h1 className="font-display font-bold text-[#0f172a] text-3xl sm:text-4xl md:text-5xl tracking-tight">
                      <TextShimmer
                        as="span"
                        duration={2.8}
                        className="[--base-color:#0f172a] [--base-gradient-color:#ffffff]"
                      >
                        {displayDomain || domain}
                      </TextShimmer>
                    </h1>
                  </div>

                  <p
                    className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-slate-400"
                    style={{ animation: "fadeUp 600ms ease-out 180ms both" }}
                  >
                    AI Visibility Score
                  </p>

                  {/* 3. Score Ring — Visual Centerpiece */}
                  <div
                    className="mt-8 relative"
                    style={{ animation: "fadeUp 700ms ease-out 250ms both" }}
                  >
                    {/* Score ring glow halo */}
                    <div
                      className="absolute inset-0 -m-4 rounded-full blur-2xl"
                      style={{ backgroundColor: band.color, opacity: 0.1 }}
                      aria-hidden="true"
                    />
                    <ScoreRing score={result.score} size={200} />
                  </div>

                  {/* 4. Band Pill */}
                  <div
                    className="mt-6"
                    style={{ animation: "fadeUp 600ms ease-out 450ms both" }}
                  >
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-bold capitalize",
                        band.bg
                      )}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: band.color }}
                      />
                      {band.label}
                    </span>
                  </div>

                  {/* 5. Band Description */}
                  <p
                    className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-500"
                    style={{ animation: "fadeUp 600ms ease-out 520ms both" }}
                  >
                    {band.description}
                  </p>

                  {/* 6. Quick Stats Row */}
                  <div
                    className="mt-10 grid w-full max-w-lg grid-cols-3 gap-3"
                    style={{ animation: "fadeUp 600ms ease-out 620ms both" }}
                  >
                    <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white/80 px-3 py-4 shadow-sm backdrop-blur-sm">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      </div>
                      <span className="mt-2 text-2xl font-bold text-slate-900">{criticalCount}</span>
                      <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Issues</span>
                    </div>

                    <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white/80 px-3 py-4 shadow-sm backdrop-blur-sm">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                        <Zap className="h-4 w-4 text-emerald-500" />
                      </div>
                      <span className="mt-2 text-2xl font-bold text-slate-900">{quickWinCount}</span>
                      <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Quick Wins</span>
                    </div>

                    <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white/80 px-3 py-4 shadow-sm backdrop-blur-sm">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50">
                        <Brain className="h-4 w-4 text-cyan-500" />
                      </div>
                      <span className="mt-2 text-2xl font-bold text-slate-900">{platformCount}</span>
                      <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Platforms</span>
                    </div>
                  </div>

                  {/* 7. Actions Row */}
                  <div
                    className="mt-8 flex items-center gap-4"
                    style={{ animation: "fadeUp 600ms ease-out 720ms both" }}
                  >
                    <button
                      onClick={() => {
                        const reportSection = document.querySelector("[data-report-body]");
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
                      onClick={() => {
                        // Clear cached audit data so mount effect doesn't re-read it
                        try {
                          const d = domain.trim();
                          if (d) sessionStorage.removeItem("audit-cache-" + d);
                          sessionStorage.removeItem("pending-audit-domain");
                        } catch { /* ignore */ }

                        // Strip ?url= from address bar so mount effect doesn't re-trigger
                        window.history.replaceState({}, "", window.location.pathname);

                        setResult(null);
                        setDomain("");
                        setError(null);
                        setSearchTarget(FALLBACK_TARGET);
                        setResultsSearchTarget(null);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500 transition-all hover:border-slate-300 hover:text-slate-700 hover:shadow-sm"
                    >
                      <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                      New Audit
                    </button>
                  </div>
                </div>
              </section>

              {/* ── Smooth divider transition ──────────────────────────────── */}
              <div className="relative h-16 bg-gradient-to-b from-white to-slate-50/80" aria-hidden="true">
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              </div>

              {/* ── Main Detailed Report Body (Clean Canvas) ─────────────── */}
              <section data-report-body className="relative isolate px-6 pb-20 pt-8 bg-slate-50/40">
                <div className="mx-auto max-w-7xl">
                  <div className="rounded-[32px] border border-slate-200/80 bg-white p-5 shadow-[0_30px_90px_rgba(15,23,42,0.06)] sm:p-8" style={{ animation: "fadeUp 650ms ease-out both" }}>
                    <AuditReport result={result} domain={domain} />
                  </div>
                </div>
              </section>
            </>
          );
        })()}
      </main>

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
        @keyframes aiFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes aiPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.3); }
          50% { box-shadow: 0 0 0 10px rgba(6, 182, 212, 0); }
        }
      `}</style>
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
