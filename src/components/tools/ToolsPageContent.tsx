"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  Search,
  Calculator,
  Clock,
  ArrowRight,
  BarChart3,
  Zap,
  Lock,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShaderBackground from "@/components/ui/shader-background";
import StickyFooterLayout from "@/components/layout/StickyFooterLayout";
import AnimatedSection from "@/components/common/AnimatedSection";

const tools = [
  {
    title: "AI Visibility Audit Report",
    description:
      "Check how your business appears across AI engines like ChatGPT, Claude, Gemini, and Perplexity. Get a detailed score, citability index, and actionable recommendations to improve your AI discoverability.",
    icon: Search,
    href: "/ai-visibility-audit-report",
    badge: "Free",
    badgeColor: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    available: true,
  },
  {
    title: "Automation ROI Calculator",
    description:
      "Estimate the time and cost savings from automating your business workflows. Input your team size, manual processes, and hours spent — get a projected ROI in seconds.",
    icon: Calculator,
    href: null,
    badge: "Coming Soon",
    badgeColor: "bg-amber-500/10 text-amber-700 border-amber-200",
    available: false,
  },
  {
    title: "AI Readiness Score",
    description:
      "Evaluate how prepared your business is to adopt AI tools and automation. Answer a few questions about your data, processes, and tech stack — receive a readiness score with a tailored adoption roadmap.",
    icon: Zap,
    href: null,
    badge: "Coming Soon",
    badgeColor: "bg-amber-500/10 text-amber-700 border-amber-200",
    available: false,
  },
];

export default function ToolsPageContent() {
  const prefersReduced = useReducedMotion();

  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink">
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section className="relative isolate overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-36">
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
                <span className="font-medium text-[#0F172A]" aria-current="page">
                  Tools
                </span>
              </nav>

              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md">
                  <Sparkles size={14} aria-hidden="true" />
                  Free Online Tools
                </span>

                <h1
                  className="mt-7 font-display font-thin text-[#0F172A] text-balance"
                  style={{
                    fontSize: "clamp(34px, 5.2vw, 56px)",
                    lineHeight: 1.02,
                  }}
                >
                  AI & Business Tools
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-slate-500">
                  Free tools to audit your AI visibility, measure automation ROI, and optimize your
                  digital presence. No signup required — just pick a tool and start.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ── Tools Grid ────────────────────────────────────────────────── */}
          <section className="px-6 pb-24">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool, i) => (
                  <AnimatedSection key={tool.title} delay={i * 0.1}>
                    <ToolCard tool={tool} />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        </main>
      </StickyFooterLayout>
    </>
  );
}

function ToolCard({
  tool,
}: {
  tool: (typeof tools)[number];
}) {
  const Icon = tool.icon;
  const isAvailable = tool.available;

  const cardContent = (
    <div
      className={`group relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 ${
        isAvailable
          ? "border-[#E0F2FE] bg-white hover:border-[#BAE6FD] hover:shadow-[0_8px_30px_rgba(8,145,178,0.08)] cursor-pointer"
          : "border-slate-100 bg-slate-50/50 cursor-default"
      }`}
    >
      {/* Badge */}
      <span
        className={`absolute right-5 top-5 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${tool.badgeColor}`}
      >
        {isAvailable ? (
          <BarChart3 size={11} aria-hidden="true" />
        ) : (
          <Clock size={11} aria-hidden="true" />
        )}
        {tool.badge}
      </span>

      {/* Icon */}
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${
          isAvailable
            ? "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100"
            : "bg-slate-100 text-slate-400"
        } transition-colors`}
      >
        <Icon size={22} strokeWidth={1.8} />
      </div>

      {/* Title */}
      <h2
        className={`text-xl font-semibold ${
          isAvailable ? "text-[#0F172A] group-hover:text-cyan-700" : "text-slate-500"
        } transition-colors`}
      >
        {tool.title}
      </h2>

      {/* Description */}
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-500">
        {tool.description}
      </p>

      {/* CTA */}
      <div className="mt-6">
        {isAvailable ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 group-hover:gap-2.5 transition-all">
            Launch Tool
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400">
            <Lock size={13} />
            Coming Soon
          </span>
        )}
      </div>
    </div>
  );

  if (isAvailable && tool.href) {
    return <Link href={tool.href} className="block">{cardContent}</Link>;
  }

  return cardContent;
}
