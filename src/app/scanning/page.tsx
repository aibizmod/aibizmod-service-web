"use client";

import React, { useEffect, useState, useRef, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { StrandOrb } from "@/components/strand-orb";
import { Sparkles } from "lucide-react";

const TOTAL_MS = 5400;

const STEPS = [
  "Fetching site signals",
  "Querying ChatGPT",
  "Querying Perplexity",
  "Querying Gemini",
  "Querying Claude",
  "Scoring visibility",
];

function normalizeHost(rawUrl: string | null): string {
  if (!rawUrl || !rawUrl.trim()) return "your site";
  const cleaned = rawUrl
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split("/")[0]
    .split("?")[0];
  return cleaned || "your site";
}

// Subtle ambient strand backdrop component for scanning route
function StrandBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-35"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="bg-strand-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bg-strand-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0891B2" stopOpacity="0" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0,250 C 360,180 720,450 1440,250"
          stroke="url(#bg-strand-1)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 0,650 C 360,450 720,680 1440,550"
          stroke="url(#bg-strand-2)"
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
    </div>
  );
}

function ScanningContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefersReduced = useReducedMotion();

  const [ready, setReady] = useState(false);
  const [handoffOrigin, setHandoffOrigin] = useState<{ x: number; y: number } | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const rawUrl = searchParams.get("url") || searchParams.get("domain") || "";
  const host = useMemo(() => normalizeHost(rawUrl), [rawUrl]);

  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1. Read sessionStorage handoff on mount (guaranteed no SSR hydration mismatch)
  useEffect(() => {
    try {
      const rawHandoff = sessionStorage.getItem("strand-handoff");
      if (rawHandoff) {
        sessionStorage.removeItem("strand-handoff");
        const parsed = JSON.parse(rawHandoff);
        if (parsed && typeof parsed.t === "number" && Date.now() - parsed.t <= 6000) {
          const originX = parsed.cx - window.innerWidth / 2;
          const originY = parsed.cy - window.innerHeight / 2;
          setHandoffOrigin({ x: originX, y: originY });
        }
      }
    } catch {
      // Storage error degrades to centered entrance
    }
    setReady(true);
  }, []);

  // Pre-fetch audit result in background during circular StrandOrb scan
  useEffect(() => {
    if (!rawUrl) return;
    const targetUrl = rawUrl.trim();
    const fetchAudit = async () => {
      try {
        const res = await fetch("/api/geo-audit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: targetUrl }),
        });
        const data = await res.json();
        if (res.ok && data) {
          sessionStorage.setItem("audit-cache-" + targetUrl, JSON.stringify(data));
        }
      } catch {
        // Fallback handled on report page
      }
    };
    void fetchAudit();
  }, [rawUrl]);

  // 2. Drive rAF progress & ticker step changes over TOTAL_MS
  useEffect(() => {
    startTimeRef.current = null;

    const animateProgress = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const currentProgress = Math.min(1, elapsed / TOTAL_MS);
      setProgress(currentProgress);

      // Step calculation
      const stepIdx = Math.min(
        STEPS.length - 1,
        Math.floor(currentProgress * STEPS.length)
      );
      setCurrentStepIndex(stepIdx);

      if (currentProgress < 1) {
        frameRef.current = requestAnimationFrame(animateProgress);
      } else {
        // Auto-navigate to audit report upon scan completion using replace to skip /scanning in history stack
        navTimerRef.current = setTimeout(() => {
          if (rawUrl) {
            sessionStorage.setItem("pending-audit-domain", rawUrl);
            router.replace(`/ai-visibility-audit-report?url=${encodeURIComponent(rawUrl)}`);
          } else {
            router.replace("/ai-visibility-audit-report");
          }
        }, 250);
      }
    };

    frameRef.current = requestAnimationFrame(animateProgress);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
    };
  }, [router, rawUrl]);

  const percentage = Math.floor(progress * 100);

  // Motion variants for Orb entrance
  const orbInitial = useMemo(() => {
    if (prefersReduced) {
      return { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 0 };
    }
    if (handoffOrigin) {
      return {
        x: handoffOrigin.x,
        y: handoffOrigin.y,
        scaleX: 1.6,
        scaleY: 0.06,
        opacity: 0,
      };
    }
    return { x: 0, y: 0, scaleX: 0.94, scaleY: 0.94, opacity: 0 };
  }, [handoffOrigin, prefersReduced]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12 text-[#0f172a] select-none overflow-hidden">
      {/* Accessibility screen-reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        Running AI visibility scan for {host}. Progress {percentage} percent. Current step: {STEPS[currentStepIndex]}.
      </div>

      <StrandBackdrop />

      {/* Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="flex flex-col items-center text-center max-w-xl mx-auto w-full">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-[#0f172a] tracking-tight mb-8"
        >
          Reading how AI describes{" "}
          <em className="italic font-serif text-[#0e7490] font-normal">
            {host}
          </em>
        </motion.h1>

        {/* Fixed 340x340 box for StrandOrb container */}
        <div className="relative flex h-[340px] w-[340px] items-center justify-center my-2">
          {ready && (
            <motion.div
              initial={orbInitial}
              animate={{ x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1 }}
              transition={{
                duration: 1.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex items-center justify-center"
            >
              <StrandOrb
                size={340}
                progress={progress}
                strands={5}
                reducedMotion={Boolean(prefersReduced)}
              />

              {/* Percentage & SCANNING label inside Orb */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              >
                <div className="flex items-baseline font-display font-medium text-5xl text-[#0f172a] tracking-tight">
                  {percentage}
                  <span className="text-2xl font-sans font-medium text-[#78716c] ml-1">
                    %
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#78716c]">
                  <Sparkles className="h-3 w-3 text-[#0891b2]" aria-hidden="true" />
                  <span>SCANNING</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Step Ticker inside clipped h-6 box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="h-6 overflow-hidden my-4 relative flex items-center justify-center w-full"
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-sm font-medium text-[#78716c] flex items-center justify-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#0891b2] animate-pulse" />
              <span>{STEPS[currentStepIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Progress Bar Hairline Track */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85, ease: "easeOut" }}
          className="w-64 h-1 bg-[#e7e5e4] rounded-full overflow-hidden mt-2 relative"
        >
          <div
            className="h-full bg-[#0891b2] rounded-full"
            style={{ width: `${(progress * 100).toFixed(1)}%` }}
          />
        </motion.div>
      </div>
    </main>
  );
}

export default function ScanningPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white">
          <div className="h-1.5 w-1.5 rounded-full bg-[#0891b2] animate-ping" />
        </main>
      }
    >
      <ScanningContent />
    </Suspense>
  );
}
