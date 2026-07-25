"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import { Hero as AIVisibilityHero } from "@/components/hero";

type HeroVariant = "original" | "ai-visibility";

const TABS: { id: HeroVariant; label: string; description: string }[] = [
  {
    id: "original",
    label: "Hero v1",
    description: "Gemini Strands",
  },
  {
    id: "ai-visibility",
    label: "Hero v2",
    description: "AI Visibility",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroSwitcher() {
  const [active, setActive] = useState<HeroVariant>("original");

  return (
    <div className="relative">
      {/* ── Hero panels ─────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait" initial={false}>
        {active === "original" ? (
          <motion.div
            key="original"
            id="hero-panel-original"
            role="tabpanel"
            aria-labelledby="hero-tab-original"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <HeroSection />
          </motion.div>
        ) : (
          <motion.div
            key="ai-visibility"
            id="hero-panel-ai-visibility"
            role="tabpanel"
            aria-labelledby="hero-tab-ai-visibility"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <AIVisibilityHero />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating switcher tab pill ───────────────────────────────────── */}
      <div
        className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2"
        role="tablist"
        aria-label="Switch hero variant"
      >
        <div
          className="flex items-center gap-1 rounded-full p-1 shadow-[0_8px_32px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)] backdrop-blur-xl"
          style={{ backgroundColor: "rgba(15,23,42,0.90)" }}
        >
          {/* Demo badge */}
          <span
            className="mr-1 ml-2 text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "#67e8f9" }}
          >
            Demo
          </span>

          <div className="mx-1 h-4 w-px" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />

          {TABS.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                id={`hero-tab-${tab.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`hero-panel-${tab.id}`}
                onClick={() => setActive(tab.id)}
                className="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
                style={{ color: isActive ? "#0f172a" : "rgba(255,255,255,0.55)" }}
              >
                {/* Active background pill */}
                {isActive && (
                  <motion.span
                    layoutId="hero-tab-bg"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: "#ffffff" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-2">
                  {/* Indicator dot */}
                  <span
                    className="h-1.5 w-1.5 rounded-full transition-colors duration-200"
                    style={{ backgroundColor: isActive ? "#0891b2" : "rgba(255,255,255,0.25)" }}
                  />
                  <span>{tab.label}</span>
                  <span
                    className="hidden text-[11px] sm:inline"
                    style={{
                      color: isActive ? "#0e7490" : "rgba(255,255,255,0.35)",
                    }}
                  >
                    · {tab.description}
                  </span>
                </span>
              </button>
            );
          })}

          {/* Keyboard hint */}
          <div className="mx-1 h-4 w-px" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />
          <span
            className="mr-2 hidden text-[10px] lg:block"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Switch to preview
          </span>
        </div>
      </div>
    </div>
  );
}
