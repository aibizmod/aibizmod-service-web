"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, Loader2 } from "lucide-react";

// ─── Keyword page strands background (adapted from AI visibility audit) ──────

const STRANDS = 7;
const SAMPLES = 33;
const VB_W = 1440;
const VB_H = 900;

const STRAND_GRADIENTS = [
  { start: "#06B6D4", mid: "#22D3EE", end: "#3B82F6" },
  { start: "#0891B2", mid: "#06B6D4", end: "#22D3EE" },
  { start: "#22D3EE", mid: "#0891B2", end: "#3B82F6" },
  { start: "#06B6D4", mid: "#0891B2", end: "#06B6D4" },
  { start: "#3B82F6", mid: "#22D3EE", end: "#0891B2" },
  { start: "#0891B2", mid: "#3B82F6", end: "#06B6D4" },
  { start: "#22D3EE", mid: "#06B6D4", end: "#3B82F6" },
];

interface KeywordSearchTarget {
  cx: number;
  cy: number;
  left: number;
  right: number;
  pillW: number;
}

const FALLBACK_TARGET: KeywordSearchTarget = {
  cx: 720,
  cy: 580,
  left: 396,
  right: 1044,
  pillW: 648,
};

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

export function KeywordStrandsBackground({
  searchTarget,
  isTyping,
  ripples,
  className,
}: {
  searchTarget?: KeywordSearchTarget | null;
  isTyping?: boolean;
  ripples?: React.MutableRefObject<{ t0: number; life: number }[]>;
  className?: string;
}) {
  const phaseRef = useRef<number[]>(Array.from({ length: STRANDS }, (_, i) => i * 0.8));
  const phase2Ref = useRef<number[]>(Array.from({ length: STRANDS }, (_, i) => i * 0.5 + 1.2));
  const disturbRef = useRef(0);
  const pathRefs = useRef<(SVGPathElement | null)[]>(Array(STRANDS).fill(null));
  const dotLeftRef = useRef<SVGCircleElement | null>(null);
  const dotRightRef = useRef<SVGCircleElement | null>(null);
  const frameRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  const searchTargetRef = useRef<KeywordSearchTarget>(searchTarget ?? FALLBACK_TARGET);
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

      for (let i = 0; i < STRANDS; i++) {
        phaseRef.current[i] += speed * dt;
        phase2Ref.current[i] += speed * dt * 1.3;
      }

      const st = searchTargetRef.current;
      const { cx, cy } = st;

      const maxFunnelHalf = Math.min(st.pillW / 2, 340);
      const sLeft = Math.max(cx - maxFunnelHalf, 340);
      const sRight = Math.min(cx + maxFunnelHalf, 1100);

      for (let i = 0; i < STRANDS; i++) {
        const baseRow = (VB_H / (STRANDS + 1)) * (i + 1);
        const sign = i % 2 === 0 ? 1 : -1;
        const points: [number, number][] = [];

        for (let s = 0; s < SAMPLES; s++) {
          const x = (s / (SAMPLES - 1)) * VB_W;
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
            const t = smoothstepStrand(sRight, VB_W, x);
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
            const braidAmp = VB_H * 0.064 * (breathe + disturb * 0.5) * env;
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
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-65"
      >
        <defs>
          <filter id="keyword-strand-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="keyword-dot-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {STRAND_GRADIENTS.map((grad, i) => (
            <linearGradient key={i} id={`keyword-strand-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={grad.start} stopOpacity="0" />
              <stop offset="15%" stopColor={grad.start} stopOpacity="0.85" />
              <stop offset="50%" stopColor={grad.mid} stopOpacity="1" />
              <stop offset="85%" stopColor={grad.end} stopOpacity="0.85" />
              <stop offset="100%" stopColor={grad.end} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        <g filter="url(#keyword-strand-glow)">
          {Array.from({ length: STRANDS }, (_, i) => (
            <path
              key={i}
              ref={(el) => { pathRefs.current[i] = el; }}
              stroke={`url(#keyword-strand-${i})`}
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
          filter="url(#keyword-dot-glow)"
        />
        <circle
          ref={dotRightRef}
          cx={searchTarget?.right ?? FALLBACK_TARGET.right}
          cy={searchTarget?.cy ?? FALLBACK_TARGET.cy}
          r="3.5"
          fill="#67e8f9"
          filter="url(#keyword-dot-glow)"
        />
      </svg>
    </div>
  );
}

// ─── Keyword research loading screen ─────────────────────────────────────────

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

export function KeywordLoadingSkeleton({ seed }: { seed: string }) {
  const [scanPhase, setScanPhase] = useState(0);
  const phases = [
    "Connecting to Google Suggest...",
    "Expanding seed keyword variants...",
    "Fetching long-tail suggestions...",
    "Clustering keywords by search intent...",
    "Building your keyword report...",
  ];

  const phaseRef = useRef<number[]>(Array.from({ length: LOADING_STRANDS }, (_, i) => i * 0.8));
  const phase2Ref = useRef<number[]>(Array.from({ length: LOADING_STRANDS }, (_, i) => i * 0.5 + 1.2));
  const ripplesRef = useRef<{ t0: number; life: number }[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>(Array(LOADING_STRANDS).fill(null));
  const frameRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

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
    }, 2200);
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
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${LOADING_VB_W} ${LOADING_VB_H}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        style={{ zIndex: 0 }}
      >
        <defs>
          <filter id="keyword-loading-strand-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {LOADING_STRAND_GRADIENTS.map((grad, i) => (
            <linearGradient key={i} id={`keyword-loading-strand-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={grad.start} stopOpacity="0" />
              <stop offset="15%" stopColor={grad.start} stopOpacity="0.9" />
              <stop offset="50%" stopColor={grad.mid} stopOpacity="1" />
              <stop offset="85%" stopColor={grad.end} stopOpacity="0.9" />
              <stop offset="100%" stopColor={grad.end} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        <g filter="url(#keyword-loading-strand-glow)">
          {Array.from({ length: LOADING_STRANDS }, (_, i) => (
            <path
              key={i}
              ref={(el) => { pathRefs.current[i] = el; }}
              stroke={`url(#keyword-loading-strand-${i})`}
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
              d=""
            />
          ))}
        </g>
      </svg>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12)_0%,transparent_70%)]" />

      <div className="relative z-10 w-full max-w-xl rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.18)]">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 px-4 py-1.5 text-xs font-mono text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            Researching Keywords for <span className="font-bold text-white">“{seed}”</span>
          </div>
        </div>

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

        <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 transition-all duration-1000 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
            style={{ width: `${Math.round(((scanPhase + 1) / phases.length) * 100)}%` }}
          />
        </div>

        <p className="mt-4 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
          Expanding via Google Suggest · Clustering by Intent
        </p>
      </div>
    </div>
  );
}
