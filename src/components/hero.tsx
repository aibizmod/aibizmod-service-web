"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Search,
} from "lucide-react";
import { TextShimmer } from "@/components/ui/text-shimmer";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface SearchTarget {
  cx: number;
  cy: number;
  left: number;
  right: number;
  pillW: number;
}

interface Ripple {
  t0: number;
  life: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const STRANDS = 7;
const SAMPLES = 33;
const VB_W = 1440;
const VB_H = 900;
const BASE_SPEED = 0.85;

const DISTURB_SPEED_BOOST = 0.9;
const TAU_ATTACK = 0.11;
const TAU_RELEASE = 0.65;
const MAX_RIPPLES = 8;
const RIPPLE_LIFE = 1.4;
const RIPPLE_SPEED = 950;
const RIPPLE_SIGMA = 145;
const RIPPLE_AMP = 11.5;

const STRAND_GRADIENTS = [
  { start: "#06B6D4", mid: "#22D3EE", end: "#3B82F6" }, // Cyan 500 -> Cyan 400 (Navbar logo) -> Royal Blue 500
  { start: "#0891B2", mid: "#06B6D4", end: "#22D3EE" }, // Cyan 600 ("Your Brand" text) -> Cyan 500 -> Cyan 400
  { start: "#22D3EE", mid: "#0891B2", end: "#3B82F6" }, // Cyan 400 -> Cyan 600 -> Royal Blue 500
  { start: "#06B6D4", mid: "#0891B2", end: "#06B6D4" }, // Cyan 500 -> Cyan 600 ("Your Brand" text) -> Cyan 500
  { start: "#3B82F6", mid: "#22D3EE", end: "#0891B2" }, // Royal Blue 500 -> Cyan 400 -> Cyan 600
  { start: "#0891B2", mid: "#3B82F6", end: "#06B6D4" }, // Cyan 600 -> Royal Blue 500 -> Cyan 500
  { start: "#22D3EE", mid: "#06B6D4", end: "#3B82F6" }, // Cyan 400 -> Cyan 500 -> Royal Blue 500
];

const FALLBACK_TARGET: SearchTarget = {
  cx:    720,
  cy:    460,
  left:  396,
  right: 1044,
  pillW: 648,
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function catmullRomToCubicBezier(points: [number, number][]): string {
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

// ─────────────────────────────────────────────────────────────────────────────
// Animated Cyan Strands SVG
// ─────────────────────────────────────────────────────────────────────────────

interface StrandsSVGProps {
  searchTarget: SearchTarget | null;
  isTyping: boolean;
  onRippleRequest: (id: number) => void;
  ripples: React.MutableRefObject<Ripple[]>;
  reducedMotion: boolean;
}

function StrandsSVG({ searchTarget, isTyping, ripples, reducedMotion }: StrandsSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const phaseRef = useRef<number[]>(Array.from({ length: STRANDS }, (_, i) => i * 0.8));
  const phase2Ref = useRef<number[]>(Array.from({ length: STRANDS }, (_, i) => i * 0.5 + 1.2));
  const disturbRef = useRef(0);
  const opacityRef = useRef(0.85);
  const opacityTargetRef = useRef(0.85);
  const frameRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>(Array(STRANDS).fill(null));
  const opacityGroupRef = useRef<SVGGElement | null>(null);

  const isTypingRef = useRef(isTyping);
  const searchTargetRef = useRef<SearchTarget>(searchTarget ?? FALLBACK_TARGET);

  useEffect(() => { isTypingRef.current = isTyping; }, [isTyping]);
  useEffect(() => {
    searchTargetRef.current = searchTarget ?? FALLBACK_TARGET;
  }, [searchTarget]);

  const computeStrandPoints = useCallback(
    (
      i: number,
      phase: number,
      phase2: number,
      disturb: number,
      target: SearchTarget
    ): [number, number][] => {
      const baseRow = (VB_H / (STRANDS + 1)) * (i + 1);
      const { cy, left: sLeft, right: sRight } = target;
      const sign = i % 2 === 0 ? 1 : -1;

      const points: [number, number][] = [];
      for (let s = 0; s < SAMPLES; s++) {
        const x = (s / (SAMPLES - 1)) * VB_W;
        let y = baseRow;

        if (x <= sLeft) {
          const t = smoothstep(0, sLeft, x);
          y = baseRow + (cy - baseRow) * t;
          const swayFade = 1 - t;
          y += Math.sin(phase * 1.5 - x * 0.008 + i * 0.7) * (14 + 9.5 * disturb) * swayFade;

          // Ripples
          for (const rip of ripples.current) {
            const age = performance.now() / 1000 - rip.t0;
            if (age < 0 || age > rip.life) continue;
            const norm = age / rip.life;
            const fade = Math.sin(norm * Math.PI);
            const front = age * RIPPLE_SPEED;
            const dist = (sLeft - x) - front;
            const bump = Math.exp(-(dist * dist) / (2 * RIPPLE_SIGMA * RIPPLE_SIGMA));
            y += sign * bump * fade * RIPPLE_AMP * swayFade;
          }

        } else if (x >= sRight) {
          const t = smoothstep(sRight, VB_W, x);
          y = cy + (baseRow - cy) * t;
          y += Math.sin(phase * 1.5 + x * 0.008 + i * 0.7) * (14 + 9.5 * disturb) * t;

          // Ripples
          for (const rip of ripples.current) {
            const age = performance.now() / 1000 - rip.t0;
            if (age < 0 || age > rip.life) continue;
            const norm = age / rip.life;
            const fade = Math.sin(norm * Math.PI);
            const front = age * RIPPLE_SPEED;
            const dist = (x - sRight) - front;
            const bump = Math.exp(-(dist * dist) / (2 * RIPPLE_SIGMA * RIPPLE_SIGMA));
            y += sign * bump * fade * RIPPLE_AMP * (1 - t);
          }

        } else {
          const u = (x - sLeft) / (sRight - sLeft);
          const env = Math.sin(u * Math.PI);

          const breathe = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(phase * 1.3));
          const braidAmp = VB_H * 0.064 * (breathe + disturb * 0.50) * env;

          const harmonic = Math.sin(phase2 + u * 8 * Math.PI) * env * (0.22 + 0.35 * disturb);
          let yBraid   = Math.sin(phase  + u * 4 * Math.PI) + harmonic;
          if (yBraid < 0) {
            yBraid *= 0.73;
          }
          y = cy + yBraid * braidAmp;
        }

        points.push([x, y]);
      }
      return points;
    },
    [ripples]
  );

  useEffect(() => {
    if (reducedMotion) return;

    const animate = (time: number) => {
      const dt = lastTimeRef.current === null ? 0 : Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      const target = isTypingRef.current ? 1 : 0;
      const tau = isTypingRef.current ? TAU_ATTACK : TAU_RELEASE;
      disturbRef.current += (target - disturbRef.current) * (1 - Math.exp(-dt / tau));

      const disturb = disturbRef.current;
      const speed = BASE_SPEED + DISTURB_SPEED_BOOST * disturb;

      for (let i = 0; i < STRANDS; i++) {
        phaseRef.current[i] += speed * dt;
        phase2Ref.current[i] += speed * dt * 1.3;
      }

      opacityTargetRef.current = isTypingRef.current ? 1.0 : 0.85;
      opacityRef.current += (opacityTargetRef.current - opacityRef.current) * (1 - Math.exp(-dt / 0.9));

      if (opacityGroupRef.current) {
        opacityGroupRef.current.setAttribute("opacity", opacityRef.current.toFixed(3));
      }

      const st = searchTargetRef.current;
      for (let i = 0; i < STRANDS; i++) {
        const pts = computeStrandPoints(
          i,
          phaseRef.current[i],
          phase2Ref.current[i],
          disturb,
          st
        );
        const d = catmullRomToCubicBezier(pts);
        if (pathRefs.current[i]) {
          pathRefs.current[i]!.setAttribute("d", d);
        }
      }

      if (dotLeftRef.current) {
        dotLeftRef.current.setAttribute("cx", st.left.toFixed(1));
        dotLeftRef.current.setAttribute("cy", st.cy.toFixed(1));
      }
      if (dotRightRef.current) {
        dotRightRef.current.setAttribute("cx", st.right.toFixed(1));
        dotRightRef.current.setAttribute("cy", st.cy.toFixed(1));
      }

      const now = performance.now() / 1000;
      ripples.current = ripples.current.filter((r) => now - r.t0 < r.life);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [reducedMotion, computeStrandPoints, ripples]);

  const dotLeftRef  = useRef<SVGCircleElement | null>(null);
  const dotRightRef = useRef<SVGCircleElement | null>(null);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: 0 }}
    >
      <defs>
        <filter id="strand-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="dot-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {STRAND_GRADIENTS.map((grad, i) => (
          <linearGradient key={i} id={`strand-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={grad.start} stopOpacity="0" />
            <stop offset="15%"  stopColor={grad.start} stopOpacity="1" />
            <stop offset="50%"  stopColor={grad.mid}   stopOpacity="1" />
            <stop offset="85%"  stopColor={grad.end}   stopOpacity="1" />
            <stop offset="100%" stopColor={grad.end}   stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>

      <g ref={opacityGroupRef} opacity="0.85" filter="url(#strand-glow)">
        {Array.from({ length: STRANDS }, (_, i) => (
          <path
            key={i}
            ref={(el) => { pathRefs.current[i] = el; }}
            stroke={`url(#strand-${i})`}
            strokeWidth={isTyping ? 1.35 : 1.15}
            strokeLinecap="round"
            fill="none"
            d=""
          />
        ))}
      </g>

      <circle
        ref={dotLeftRef}
        cx={searchTarget?.left  ?? FALLBACK_TARGET.left}
        cy={searchTarget?.cy    ?? FALLBACK_TARGET.cy}
        r="3.5"
        fill="#67e8f9"
        filter="url(#dot-glow)"
        opacity="0.85"
      />
      <circle
        ref={dotRightRef}
        cx={searchTarget?.right ?? FALLBACK_TARGET.right}
        cy={searchTarget?.cy    ?? FALLBACK_TARGET.cy}
        r="3.5"
        fill="#67e8f9"
        filter="url(#dot-glow)"
        opacity="0.85"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Entrance animation wrapper
// ─────────────────────────────────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: delay / 1000, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

const SERVICES = [
  "AI & Automation",
  "Digital Marketing",
  "Web Development",
  "Custom Software",
  "Mobile Apps",
  "Hosting & Infrastructure",
  "Customer Experience",
  "IT Consulting",
];

// ─────────────────────────────────────────────────────────────────────────────
// Main Hero Export
// ─────────────────────────────────────────────────────────────────────────────
export function Hero() {
  const router = useRouter();
  const [domain, setDomain] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");

  useEffect(() => {
    if (isFocused) return;
    const domains = ["stripe.com", "airbnb.com", "apple.com", "vercel.com", "figma.com"];
    let currentIdx = 0;
    let initialTypeComplete = false;
    let currentStr = "";
    let isDeleting = false;
    let speed = 100;
    let timerId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!initialTypeComplete) {
        const fullTarget = "Enter your website — e.g. " + domains[0];
        currentStr = fullTarget.substring(0, currentStr.length + 1);
        setPlaceholderText(currentStr);
        speed = 50;

        if (currentStr === fullTarget) {
          initialTypeComplete = true;
          isDeleting = true;
          currentStr = domains[0];
          speed = 2500;
        }
      } else {
        const fullWord = domains[currentIdx];
        if (isDeleting) {
          currentStr = fullWord.substring(0, currentStr.length - 1);
          speed = 40;
        } else {
          currentStr = fullWord.substring(0, currentStr.length + 1);
          speed = 95;
        }

        setPlaceholderText("Enter your website — e.g. " + currentStr);

        if (!isDeleting && currentStr === fullWord) {
          isDeleting = true;
          speed = 2000;
        } else if (isDeleting && currentStr === "") {
          isDeleting = false;
          currentIdx = (currentIdx + 1) % domains.length;
          speed = 400;
        }
      }

      timerId = setTimeout(tick, speed);
    };

    timerId = setTimeout(tick, 1000);
    return () => clearTimeout(timerId);
  }, [isFocused]);

  const [searchTarget, setSearchTarget] = useState<SearchTarget | null>(null);
  const ripples = useRef<Ripple[]>([]);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [serviceIndex, setServiceIndex] = useState(0);
  const rotatingService = SERVICES[serviceIndex];

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Rotate service label every 3 s (matches Hero v1)
  useEffect(() => {
    const id = setInterval(() => {
      setServiceIndex((prev) => (prev + 1) % SERVICES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Measure search form in viewBox coords
  const measureForm = useCallback(() => {
    if (!formRef.current || !sectionRef.current) return;
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const formRect    = formRef.current.getBoundingClientRect();

    if (sectionRect.width === 0 || sectionRect.height === 0) return;

    const sx = VB_W / sectionRect.width;
    const rawH = Math.max(sectionRect.height, sectionRef.current.scrollHeight);
    const sy = VB_H / rawH;

    const left  = (formRect.left   - sectionRect.left) * sx;
    const right = (formRect.right  - sectionRect.left) * sx;
    const top   = (formRect.top    - sectionRect.top)  * sy;
    const bottom = (formRect.bottom - sectionRect.top) * sy;
    const cx    = (left + right) / 2;
    const cy    = (top + bottom) / 2;
    const pillW = right - left;

    setSearchTarget({ cx, cy, left, right, pillW });
  }, []);

  useEffect(() => {
    measureForm();
  }, [measureForm]);

  useEffect(() => {
    measureForm();
    window.addEventListener("resize", measureForm);
    window.addEventListener("scroll", measureForm, { passive: true });

    const ro = new ResizeObserver(measureForm);
    if (sectionRef.current) ro.observe(sectionRef.current);

    return () => {
      window.removeEventListener("resize", measureForm);
      window.removeEventListener("scroll", measureForm);
      ro.disconnect();
    };
  }, [measureForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
    if (!reducedMotion) {
      setIsTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 800);

      // Spawn ripple
      const now = performance.now() / 1000;
      if (ripples.current.length >= MAX_RIPPLES) ripples.current.shift();
      ripples.current.push({ t0: now, life: RIPPLE_LIFE });
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const scanEnergyRef = useRef(0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const targetDomain = domain.trim();
    if (!targetDomain || isSubmitting) return;

    setIsSubmitting(true);

    // 1. Measure search form rect & store in sessionStorage for scanning page entrance
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
      // Storage failure degrades to plain centered entrance
    }

    try {
      sessionStorage.setItem("pending-audit-domain", targetDomain);
    } catch {
      // Storage failure ignored
    }

    // 2. Dispatch ripple bursts at 0, 120, 260, 420ms
    const dispatchRipple = () => {
      const now = performance.now() / 1000;
      if (ripples.current.length >= MAX_RIPPLES) ripples.current.shift();
      ripples.current.push({ t0: now, life: RIPPLE_LIFE });
    };

    dispatchRipple(); // 0ms
    setTimeout(dispatchRipple, 120);
    setTimeout(dispatchRipple, 260);
    setTimeout(dispatchRipple, 420);

    // 3. Scan energy ramp (0 -> 1100ms) with easeOutCubic
    const startTime = performance.now();
    const rampEnergy = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const p = Math.min(1, elapsed / 1100);
      const eased = 1 - Math.pow(1 - p, 3);
      scanEnergyRef.current = eased;

      if (p < 1) {
        requestAnimationFrame(rampEnergy);
      }
    };
    requestAnimationFrame(rampEnergy);

    // 4. Navigate at 1050ms while dissolve finishes
    setTimeout(() => {
      router.push(`/scanning?url=${encodeURIComponent(targetDomain)}`);
    }, 1050);
  };

  const rippleRequestId = useRef(0);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-white"
      style={{ minHeight: "100svh" }}
    >
      {/* Radial vignette overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(255,255,255,0.96) 100%)",
        }}
      />

      {/* Animated strands SVG (carries visual continuity) */}
      <StrandsSVG
        searchTarget={searchTarget}
        isTyping={isTyping}
        onRippleRequest={(id) => { rippleRequestId.current = id; }}
        ripples={ripples}
        reducedMotion={reducedMotion}
      />

      {/* Content dissolve */}
      <div
        className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pb-20 text-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          paddingTop: "calc(68px)",
          opacity: isSubmitting ? 0 : 1,
          transform: isSubmitting ? "translateY(-10px)" : "translateY(0px)",
          filter: isSubmitting ? "blur(6px)" : "blur(0px)",
        }}
      >
        <div className="w-full max-w-6xl">

          {/* 1. Main Heading (Rotating Service Ticker in 2 Lines) */}
          <FadeUp delay={0} className="mt-2">
            <h1
              className="flex flex-col items-center justify-center font-display font-medium text-[#0f172a]"
              style={{
                fontSize: "clamp(1.6rem, 3.6vw, 3rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
              }}
            >
              <span>A Team Behind Visibility, Product, And Growth In</span>
              <span className="relative inline-block h-[3.8rem] w-full overflow-hidden text-center mt-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingService}
                    initial={{ y: 33, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -33, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute left-0 right-0 top-0 font-bold text-center"
                    style={{
                      background: "linear-gradient(to right, #0891b2, #3b82f6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {rotatingService}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </FadeUp>

          {/* 2. Secondary Heading (Wider Spacing) */}
          <FadeUp delay={120} className="mt-14">
            <h2
              className="font-display font-medium text-[#475569] whitespace-nowrap"
              style={{
                fontSize: "clamp(1.25rem, 2.8vw, 2.2rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
            >
              See How AI Sees{" "}
              <TextShimmer
                as="span"
                duration={2.2}
                className="italic font-serif [--base-color:theme(colors.cyan.600)] [--base-gradient-color:#ffffff]"
              >
                Your Brand.
              </TextShimmer>
            </h2>
          </FadeUp>

          {/* 3. Eyebrow */}
          <FadeUp delay={200} className="mt-6">
            <p
              className="font-sans text-xs font-medium uppercase"
              style={{
                letterSpacing: "0.22em",
                color: "#78716c",
              }}
            >
              AI VISIBILITY AUDIT FOR DIGITAL MARKETING
            </p>
          </FadeUp>

          {/* 4. Search bar + CTA */}
          <FadeUp delay={270} className="mt-8">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              role="search"
              aria-label="AI Visibility Audit search"
              className="relative mx-auto w-full max-w-xl"
            >
              <label htmlFor="hero-domain-input" className="sr-only">
                Enter your website domain
              </label>

              <div
                className="flex items-center rounded-full bg-white transition-all duration-300 ease-out focus-within:ring-2 focus-within:ring-offset-2 p-1.5"
                style={{
                  border: isFocused
                    ? "1.5px solid #0891b2"
                    : "1.5px solid #22d3ee",
                  boxShadow: isFocused
                    ? "0 0 0 4px rgba(6,182,212,0.18), 0 0 32px 4px rgba(34,211,238,0.28), 0 16px 45px -12px rgba(8,145,178,0.35)"
                    : "0 4px 18px -2px rgba(0,0,0,0.06), 0 0 0 1px rgba(8,145,178,0.08)",
                  transform: isFocused ? "scale(1.015)" : "scale(1)",
                  // @ts-expect-error CSS custom property
                  "--tw-ring-color": "#0891b2",
                  "--tw-ring-offset-color": "#fff",
                }}
              >
                <Search
                  aria-hidden="true"
                  className="ml-3 sm:ml-4 h-5 w-5 shrink-0 transition-transform duration-300"
                  style={{
                    color: isFocused ? "#0891b2" : "rgba(8,145,178,0.6)",
                    transform: isFocused ? "scale(1.1) rotate(6deg)" : "scale(1)",
                  }}
                />

                <input
                  id="hero-domain-input"
                  type="text"
                  value={domain}
                  onChange={handleChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={isFocused ? "Enter your website — e.g. stripe.com" : placeholderText}
                  aria-label="Enter your website domain"
                  className="h-11 sm:h-14 min-w-0 w-0 flex-1 bg-transparent px-2.5 sm:px-4 text-sm sm:text-base focus:outline-none"
                  style={{ color: "#0f172a" }}
                />

                <button
                  type="submit"
                  id="hero-audit-submit"
                  aria-label="Check AI Visibility"
                  disabled={!domain.trim()}
                  className="group flex h-10 w-10 sm:h-11 sm:w-auto shrink-0 items-center justify-center gap-2 rounded-full bg-[#0891b2] text-sm font-semibold text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 mr-0.5 sm:mr-1.5"
                  style={{
                    backgroundColor: "#0891b2",
                    // @ts-expect-error CSS custom property
                    "--tw-ring-color": "#0891b2",
                  }}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled)
                      e.currentTarget.style.backgroundColor = "#0e7490";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#0891b2";
                  }}
                >
                  <span className="hidden sm:inline">Check AI Visibility</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </button>
              </div>
            </form>
          </FadeUp>

          {/* 5. Subhead (placed directly below the search box) */}
          <FadeUp delay={340} className="mt-5">
            <p
              className="mx-auto max-w-xl font-sans text-base leading-relaxed"
              style={{ color: "#78716c" }}
            >
              Audit how ChatGPT, Perplexity, Gemini, and Claude describe, cite, and rank your
              business — then close the gap before your competitors do.
            </p>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
