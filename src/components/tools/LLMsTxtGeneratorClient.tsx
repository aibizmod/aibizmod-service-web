"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Globe,
  Copy,
  Check,
  Download,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  Layers,
  Terminal,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Edit3,
  Bot,
  Zap,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShaderBackground from "@/components/ui/shader-background";
import StickyFooterLayout from "@/components/layout/StickyFooterLayout";
import { StrandOrb } from "@/components/strand-orb";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Type Definitions
// ---------------------------------------------------------------------------
interface AuditCheck {
  name: string;
  passed: boolean;
  score: number;
  maxScore: number;
  impact: "high" | "medium" | "low";
  note: string;
}

interface ExistingAuditResult {
  found: boolean;
  score: number;
  band: "missing" | "critical" | "needs-work" | "good" | "excellent";
  content: string | null;
  checks: AuditCheck[];
  issues: string[];
  recommendations: string[];
}

interface LlmsGeneratorResponse {
  success: boolean;
  domain: string;
  siteName: string;
  tagline: string;
  analyzed: {
    homepage: boolean;
    aboutPage: boolean;
    sitemap: boolean;
    sitemapUrlCount: number;
  };
  existingAudit: ExistingAuditResult;
  generatedLlmsTxt: string;
  generatedLlmsFullTxt: string;
  stats: {
    wordCount: number;
    tokenEstimate: number;
    linkCount: number;
    sectionsCount: number;
  };
  error?: string;
}

const EXAMPLE_DOMAINS = [
  "pmspace.ai",
  "stripe.com",
  "linear.app",
  "aibizmod.com",
];

const SCAN_STEPS = [
  "Fetching site signals & metadata",
  "Parsing sitemap & canonical routes",
  "Auditing live /llms.txt compliance",
  "Structuring AI SEO Markdown",
  "Finalizing llms.txt & llms-full.txt",
];

export default function LLMsTxtGeneratorClient() {
  const prefersReduced = useReducedMotion();
  const [domainInput, setDomainInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [result, setResult] = useState<LlmsGeneratorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Tab state: "generated" | "audit" | "full"
  const [activeTab, setActiveTab] = useState<"generated" | "audit" | "full">("generated");

  // Editor state
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState("");
  const [copied, setCopied] = useState(false);

  // Framework deploy guide tab
  const [deployFramework, setDeployFramework] = useState<"nextjs" | "static" | "cloudflare">("nextjs");

  const resultsRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const progressFrameRef = useRef<number>(0);
  const isCompleteRef = useRef(false);

  // Sync editable content when result changes or tab switches
  useEffect(() => {
    if (!result) return;
    if (activeTab === "generated") {
      setEditableContent(result.generatedLlmsTxt);
    } else if (activeTab === "audit" && result.existingAudit.content) {
      setEditableContent(result.existingAudit.content);
    } else if (activeTab === "full") {
      setEditableContent(result.generatedLlmsFullTxt);
    }
  }, [result, activeTab]);

  const handleGenerate = async (targetDomain?: string) => {
    const raw = (targetDomain || domainInput).trim();
    if (!raw) {
      setError("Please enter a domain name (e.g. yoursite.com)");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setProgress(0);
    setCurrentStepIndex(0);
    setIsEditing(false);
    isCompleteRef.current = false;

    // Start animated progress driving the Circle Orb loader
    const TOTAL_SCAN_MS = 4600;
    startTimeRef.current = performance.now();

    const animateProgress = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      let currentProgress = Math.min(0.92, elapsed / TOTAL_SCAN_MS);

      if (isCompleteRef.current) {
        currentProgress = 1;
      }

      setProgress(currentProgress);

      const stepIdx = Math.min(
        SCAN_STEPS.length - 1,
        Math.floor(currentProgress * SCAN_STEPS.length)
      );
      setCurrentStepIndex(stepIdx);

      if (currentProgress < 1 && (!isCompleteRef.current || currentProgress < 0.99)) {
        progressFrameRef.current = requestAnimationFrame(animateProgress);
      }
    };
    progressFrameRef.current = requestAnimationFrame(animateProgress);

    try {
      const res = await fetch("/api/llms-txt-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: raw }),
      });

      const data: LlmsGeneratorResponse = await res.json();

      if (!res.ok || !data.success) {
        cancelAnimationFrame(progressFrameRef.current);
        setError(data.error || "Failed to analyze domain. Please ensure the domain is valid and online.");
        setLoading(false);
        return;
      }

      // Smoothly advance to 100% and show results
      isCompleteRef.current = true;
      setProgress(1);
      setCurrentStepIndex(SCAN_STEPS.length - 1);

      setTimeout(() => {
        setResult(data);
        setEditableContent(data.generatedLlmsTxt);
        setActiveTab("generated");
        setLoading(false);

        // Scroll to results
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }, 650);
    } catch {
      cancelAnimationFrame(progressFrameRef.current);
      setError("Network error occurred while fetching domain details. Please try again.");
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!editableContent) return;
    navigator.clipboard.writeText(editableContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const percentage = Math.floor(progress * 100);

  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-slate-900 min-h-screen relative overflow-hidden selection:bg-cyan-100 selection:text-cyan-900">
          {/* ── Background Glow & Shader ──────────────────────────────── */}
          <ShaderBackground className="absolute inset-0 z-0 h-full w-full opacity-60 pointer-events-none" />
          <div
            className="pointer-events-none absolute left-1/2 top-24 z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-10 top-[480px] z-0 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl"
            aria-hidden="true"
          />

          {/* ── Hero Section ────────────────────────────────────────────── */}
          <section className="relative isolate px-6 pt-32 pb-14 md:pt-36 md:pb-20">
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              {/* Breadcrumb */}
              <nav
                className="mb-8 inline-flex flex-wrap items-center gap-1.5 rounded-full border border-cyan-100 bg-white/70 px-4 py-2 text-[13px] text-slate-600 shadow-[0_10px_30px_rgba(6,182,212,0.08)] backdrop-blur-md"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="transition-colors hover:text-[#0F172A]">
                  Home
                </Link>
                <ChevronRight size={13} className="shrink-0 text-cyan-400" aria-hidden="true" />
                <Link href="/tools" className="transition-colors hover:text-[#0F172A]">
                  Tools
                </Link>
                <ChevronRight size={13} className="shrink-0 text-cyan-400" aria-hidden="true" />
                <span className="font-semibold text-cyan-700" aria-current="page">
                  llms.txt Generator
                </span>
              </nav>

              {/* Tag Pill */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/80 bg-cyan-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-800 shadow-sm backdrop-blur-md">
                  <Sparkles size={14} className="text-cyan-600 animate-pulse" aria-hidden="true" />
                  AI SEO &amp; Agent Discovery Standard
                </span>
              </div>

              {/* Title */}
              <h1
                className="mt-6 font-display font-thin text-[#0F172A] text-balance leading-tight"
                style={{
                  fontSize: "clamp(34px, 5.2vw, 56px)",
                  lineHeight: 1.05,
                }}
              >
                llms.txt Generator{" "}
                <span className="font-normal bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  &amp; Auditor
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-[16px] sm:text-[17px] leading-relaxed text-slate-600">
                Generate a perfectly formatted <code className="px-1.5 py-0.5 rounded bg-slate-100 text-cyan-800 border border-slate-200 text-sm font-mono font-medium">llms.txt</code> file that tells ChatGPT, Perplexity, Claude, and AI crawlers exactly how to understand and accurately cite your website.
              </p>

              {/* ── Main Input Box ──────────────────────────────────────── */}
              <div className="mt-9 mx-auto max-w-2xl">
                <div className="relative rounded-2xl border border-slate-200/90 bg-white/90 p-2.5 shadow-[0_16px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 focus-within:border-cyan-500 focus-within:shadow-[0_0_35px_rgba(6,182,212,0.18)]">
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <div className="relative flex-1 w-full">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                        <Globe className="h-5 w-5 text-cyan-600" />
                      </div>
                      <input
                        type="text"
                        value={domainInput}
                        onChange={(e) => {
                          setDomainInput(e.target.value);
                          if (error) setError(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !loading) {
                            handleGenerate();
                          }
                        }}
                        placeholder="yourdomain.com (e.g. pmspace.ai)"
                        disabled={loading}
                        className="w-full rounded-xl bg-slate-50/80 py-3.5 pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-400 border border-slate-200/80 focus:outline-none focus:bg-white focus:border-cyan-500 font-mono tracking-wide transition-all"
                      />
                    </div>
                    <button
                      onClick={() => handleGenerate()}
                      disabled={loading}
                      className={cn(
                        "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 shadow-[0_4px_20px_rgba(6,182,212,0.25)]",
                        loading
                          ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:brightness-105 hover:shadow-[0_6px_25px_rgba(6,182,212,0.35)] active:scale-[0.98]"
                      )}
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin text-white" />
                          <span>Scanning...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 fill-current text-white" />
                          <span>Generate &amp; Audit</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Quick Try Examples */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 px-2 pb-1 text-xs text-slate-500">
                    <span className="text-slate-400 font-medium">Try example:</span>
                    {EXAMPLE_DOMAINS.map((domain) => (
                      <button
                        key={domain}
                        type="button"
                        onClick={() => {
                          setDomainInput(domain);
                          handleGenerate(domain);
                        }}
                        disabled={loading}
                        className="inline-flex items-center gap-1 rounded-md bg-slate-100/90 px-2.5 py-1 text-slate-700 border border-slate-200 hover:border-cyan-400 hover:text-cyan-800 hover:bg-cyan-50/60 transition-all font-medium"
                      >
                        <span>{domain}</span>
                        <ArrowUpRight className="h-3 w-3 opacity-60 text-cyan-600" />
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50/90 px-4 py-3 text-sm text-red-800 text-left shadow-sm"
                  >
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </div>

              {/* ── Signature Circular StrandOrb Loader (Matching Audit Flow) ── */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-12 flex flex-col items-center justify-center text-center max-w-lg mx-auto"
                  >
                    {/* Headline */}
                    <div className="text-lg sm:text-xl font-display font-medium text-[#0f172a] tracking-tight mb-2">
                      Scanning &amp; structuring{" "}
                      <em className="italic font-serif text-[#0891b2] font-normal">
                        {domainInput || "website"}
                      </em>
                    </div>

                    {/* Circular StrandOrb 300x300 container */}
                    <div className="relative flex h-[300px] w-[300px] items-center justify-center my-2">
                      <StrandOrb
                        size={300}
                        progress={progress}
                        strands={5}
                        reducedMotion={Boolean(prefersReduced)}
                      />

                      {/* Percentage & SCANNING label inside Orb center */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <div className="flex items-baseline font-display font-medium text-5xl text-[#0f172a] tracking-tight">
                          {percentage}
                          <span className="text-2xl font-sans font-medium text-[#78716c] ml-1">
                            %
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#78716c]">
                          <Sparkles className="h-3 w-3 text-[#0891b2]" aria-hidden="true" />
                          <span>ANALYZING</span>
                        </div>
                      </div>
                    </div>

                    {/* Step Ticker inside clipped box */}
                    <div className="h-6 overflow-hidden my-3 relative flex items-center justify-center w-full">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStepIndex}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="text-sm font-medium text-[#78716c] flex items-center justify-center gap-2"
                        >
                          <span className="h-2 w-2 rounded-full bg-[#0891b2] animate-ping" />
                          <span>{SCAN_STEPS[currentStepIndex]}</span>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Progress Hairline Track */}
                    <div className="w-56 h-1.5 bg-[#e7e5e4] rounded-full overflow-hidden mt-1 relative shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full transition-all duration-300"
                        style={{ width: `${(progress * 100).toFixed(1)}%` }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* ── 3 Educational Cards (Before Scan / Features) ───────────── */}
          {!result && !loading && (
            <section className="px-6 pb-20 max-w-5xl mx-auto relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-sm hover:border-cyan-300 shadow-[0_4px_25px_rgba(0,0,0,0.03)] transition-all">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200 mb-4">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A]">What is llms.txt?</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    A plain-text Markdown file at <code className="text-cyan-800 bg-slate-100 px-1 py-0.5 rounded text-xs border border-slate-200">/llms.txt</code> that provides AI bots with a curated roadmap of your key offerings and canonical links.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-sm hover:border-emerald-300 shadow-[0_4px_25px_rgba(0,0,0,0.03)] transition-all">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A]">Why does it matter?</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Platforms like ChatGPT Search, Perplexity, and Claude parse <code className="text-emerald-800 bg-slate-100 px-1 py-0.5 rounded text-xs border border-slate-200">llms.txt</code> to cite your brand instead of hallucinating outdated information.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-sm hover:border-blue-300 shadow-[0_4px_25px_rgba(0,0,0,0.03)] transition-all">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 border border-blue-200 mb-4">
                    <Zap className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A]">What AIBizMod does</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    We crawl your homepage, about page, and XML sitemaps — then generate a categorized, spec-compliant file ready to deploy in under 60 seconds.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* ── Results Container ────────────────────────────────────────── */}
          {result && (
            <section ref={resultsRef} className="px-6 pb-24 max-w-6xl mx-auto relative z-10">
              {/* Analyzed Pages Summary Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/90 px-6 py-4 shadow-[0_4px_25px_rgba(0,0,0,0.03)] backdrop-blur-md">
                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  <span className="text-slate-500 font-semibold">Pages Analyzed:</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-emerald-800 font-medium">
                    <Check className="h-3.5 w-3.5 text-emerald-600" /> Homepage
                  </span>
                  {result.analyzed.aboutPage && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-emerald-800 font-medium">
                      <Check className="h-3.5 w-3.5 text-emerald-600" /> About Page
                    </span>
                  )}
                  {result.analyzed.sitemap && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 border border-cyan-200 px-3 py-1 text-cyan-800 font-medium">
                      <Layers className="h-3.5 w-3.5 text-cyan-600" /> {result.analyzed.sitemapUrlCount} Sitemap URLs Discovered
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>Tokens: <strong className="text-slate-800 font-semibold">~{result.stats.tokenEstimate}</strong></span>
                  <span>•</span>
                  <span>Links: <strong className="text-slate-800 font-semibold">{result.stats.linkCount}</strong></span>
                  <span>•</span>
                  <span>Sections: <strong className="text-slate-800 font-semibold">{result.stats.sectionsCount}</strong></span>
                </div>
              </div>

              {/* Tabs Switcher */}
              <div className="mt-8 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("generated")}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all shadow-sm",
                    activeTab === "generated"
                      ? "bg-cyan-50 text-cyan-900 border border-cyan-300 shadow-[0_2px_12px_rgba(6,182,212,0.15)]"
                      : "bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300"
                  )}
                >
                  <Sparkles className="h-4 w-4 text-cyan-600" />
                  <span>AI-Generated llms.txt</span>
                  <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2 py-0.5 text-xs text-emerald-800 font-mono font-semibold">
                    100/100 · Optimal
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("audit")}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all shadow-sm",
                    activeTab === "audit"
                      ? "bg-cyan-50 text-cyan-900 border border-cyan-300 shadow-[0_2px_12px_rgba(6,182,212,0.15)]"
                      : "bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300"
                  )}
                >
                  <ShieldCheck className="h-4 w-4 text-amber-600" />
                  <span>Existing Site Audit</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-mono font-semibold border",
                      result.existingAudit.found
                        ? result.existingAudit.score >= 80
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : "bg-amber-100 text-amber-800 border-amber-300"
                        : "bg-red-100 text-red-800 border-red-300"
                    )}
                  >
                    {result.existingAudit.found
                      ? `${result.existingAudit.score}/100 · ${result.existingAudit.band.toUpperCase()}`
                      : "0/100 · Missing"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("full")}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all shadow-sm",
                    activeTab === "full"
                      ? "bg-cyan-50 text-cyan-900 border border-cyan-300 shadow-[0_2px_12px_rgba(6,182,212,0.15)]"
                      : "bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300"
                  )}
                >
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span>Extended llms-full.txt</span>
                  <span className="rounded-full bg-blue-100 border border-blue-300 px-2 py-0.5 text-xs text-blue-800 font-mono font-semibold">
                    Deep Index
                  </span>
                </button>
              </div>

              {/* ── Tab 2: Existing Audit Details ───────────────────────── */}
              {activeTab === "audit" && (
                <div className="mt-6 mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <span>Compliance Audit for</span>
                        <code className="text-cyan-800 font-mono bg-slate-100 px-2 py-0.5 rounded text-sm border border-slate-200">
                          https://{result.domain}/llms.txt
                        </code>
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Audited against the official Answer.AI / llmstxt.org specification for AI crawlability.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-black font-mono text-slate-900">
                          {result.existingAudit.score}
                          <span className="text-xs text-slate-400 font-normal"> / 100</span>
                        </div>
                        <div
                          className={cn(
                            "text-xs font-semibold uppercase tracking-wider",
                            result.existingAudit.found
                              ? result.existingAudit.score >= 80
                                ? "text-emerald-700"
                                : "text-amber-700"
                              : "text-red-700"
                          )}
                        >
                          {result.existingAudit.found ? result.existingAudit.band : "File Not Deployed"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.existingAudit.checks.map((check) => (
                      <div
                        key={check.name}
                        className={cn(
                          "rounded-xl border p-4 flex items-start gap-3 transition-colors",
                          check.passed
                            ? "border-emerald-200 bg-emerald-50/50"
                            : "border-slate-200 bg-slate-50/70"
                        )}
                      >
                        {check.passed ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-900">{check.name}</span>
                            <span className="text-xs font-mono text-slate-500">
                              ({check.score}/{check.maxScore} pts)
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{check.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  {result.existingAudit.recommendations.length > 0 && (
                    <div className="mt-6 rounded-xl border border-cyan-200 bg-cyan-50/60 p-4">
                      <h4 className="text-sm font-bold text-cyan-900 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-cyan-600" /> Actionable Fixes to Reach 100/100 Score
                      </h4>
                      <ul className="mt-2.5 space-y-1.5 text-xs text-slate-700">
                        {result.existingAudit.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-cyan-700 font-bold">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* ── Main Code Box & Editor ──────────────────────────────── */}
              <div className="mt-6 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-[0_20px_60px_rgba(15,23,42,0.15)] overflow-hidden">
                {/* Code Box Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/95 px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500/80" />
                      <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                      <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-300 pl-2">
                      {activeTab === "full" ? "llms-full.txt" : "llms.txt"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(!isEditing)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border transition-all",
                        isEditing
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                          : "bg-slate-800 text-slate-300 border-slate-700 hover:text-white"
                      )}
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>{isEditing ? "Done Editing" : "Edit Text"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 border border-slate-700 hover:bg-slate-700 hover:text-white transition-all active:scale-95"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-slate-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDownload(
                          activeTab === "full" ? "llms-full.txt" : "llms.txt",
                          editableContent
                        )
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-400 px-3.5 py-1.5 text-xs font-semibold text-slate-950 hover:brightness-110 transition-all active:scale-95 shadow-[0_2px_10px_rgba(6,182,212,0.3)]"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                {/* Editor / Text Area */}
                <div className="relative p-5">
                  {isEditing ? (
                    <textarea
                      value={editableContent}
                      onChange={(e) => setEditableContent(e.target.value)}
                      rows={22}
                      className="w-full bg-transparent font-mono text-sm text-slate-200 focus:outline-none resize-y leading-relaxed"
                    />
                  ) : (
                    <pre className="font-mono text-xs sm:text-sm text-slate-200 whitespace-pre-wrap overflow-x-auto leading-relaxed max-h-[580px] overflow-y-auto pr-2 select-text">
                      <code>{editableContent}</code>
                    </pre>
                  )}
                </div>
              </div>

              {/* ── Dynamic Deployment Guide ────────────────────────────── */}
              <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">How to Deploy your llms.txt</h3>
                    <p className="text-xs text-slate-500">
                      Choose your framework below for step-by-step instructions to make it live at{" "}
                      <code className="text-cyan-800 font-mono font-medium">https://{result.domain}/llms.txt</code>
                    </p>
                  </div>
                </div>

                {/* Framework Selector Tabs */}
                <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-100 pb-3">
                  {[
                    { key: "nextjs", label: "Next.js (App Router)" },
                    { key: "static", label: "WordPress / Webflow / Static" },
                    { key: "cloudflare", label: "Cloudflare / Vercel Edge" },
                  ].map((fw) => (
                    <button
                      key={fw.key}
                      onClick={() => setDeployFramework(fw.key as typeof deployFramework)}
                      className={cn(
                        "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors",
                        deployFramework === fw.key
                          ? "bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-xs"
                          : "text-slate-500 hover:text-slate-900"
                      )}
                    >
                      {fw.label}
                    </button>
                  ))}
                </div>

                {/* Guide Contents */}
                <div className="mt-5 text-sm text-slate-700 space-y-4">
                  {deployFramework === "nextjs" && (
                    <div>
                      <p className="text-xs text-slate-500 mb-3">
                        Create a route handler in your App Router directory to serve the file dynamically:
                      </p>
                      <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                        <div className="text-slate-500">{"// src/app/llms.txt/route.ts"}</div>
                        <pre className="mt-2 text-cyan-300">
{`export function GET(): Response {
  const content = \`${editableContent.replace(/`/g, "\\`")}\`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}`}
                        </pre>
                      </div>
                    </div>
                  )}

                  {deployFramework === "static" && (
                    <ol className="list-decimal list-inside space-y-2.5 text-xs text-slate-600 leading-relaxed">
                      <li>Download your generated <code className="text-cyan-800 font-mono bg-slate-100 px-1 py-0.5 rounded">llms.txt</code> file using the button above.</li>
                      <li>Upload it directly to your website’s root public directory (e.g. <code className="text-cyan-800 font-mono bg-slate-100 px-1 py-0.5 rounded">/public_html/llms.txt</code> or <code className="text-cyan-800 font-mono bg-slate-100 px-1 py-0.5 rounded">/public/llms.txt</code>).</li>
                      <li>Verify it is publicly accessible in your browser at <a href={`https://${result.domain}/llms.txt`} target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:underline font-mono font-medium">https://{result.domain}/llms.txt</a>.</li>
                      <li>Re-run this audit tool in 7 days to confirm AI crawlers are indexing your file!</li>
                    </ol>
                  )}

                  {deployFramework === "cloudflare" && (
                    <div>
                      <p className="text-xs text-slate-500 mb-3">
                        Serve via a Cloudflare Worker or Edge Function:
                      </p>
                      <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                        <pre className="text-cyan-300">
{`addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname === '/llms.txt') {
    event.respondWith(new Response(\`${editableContent.replace(/`/g, "\\`")}\`, {
      headers: { 'content-type': 'text/plain;charset=UTF-8' }
    }));
  }
});`}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── CTA Banner for AIBizMod Services ─────────────────────── */}
              <div className="mt-12 rounded-3xl border border-cyan-200/80 bg-gradient-to-br from-cyan-50/80 via-white to-emerald-50/50 p-8 md:p-10 relative overflow-hidden shadow-[0_12px_45px_rgba(6,182,212,0.10)]">
                <div className="absolute right-0 top-0 w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="max-w-xl">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100 border border-cyan-200 px-3 py-1 text-xs font-semibold text-cyan-800 mb-3">
                      <Sparkles className="h-3.5 w-3.5 text-cyan-600" /> Full GEO &amp; AI Visibility Audit
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Want to audit your brand across ChatGPT, Claude &amp; Perplexity?
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      Deploying <code className="text-cyan-800 font-semibold font-mono">llms.txt</code> is step one. Run our comprehensive AI Visibility Audit to discover how often AI models recommend your products over competitors.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Link
                      href="/ai-visibility-audit-report"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 px-6 py-3 text-sm font-bold text-white hover:brightness-105 transition-all shadow-[0_4px_20px_rgba(6,182,212,0.25)]"
                    >
                      <span>Run AI Visibility Audit</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-xs"
                    >
                      <span>Talk to AI Team</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── Comprehensive AI SEO Knowledge & FAQ Section ───────────── */}
          <section className="px-6 py-20 border-t border-slate-100 bg-slate-50/60 relative">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-14">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700">
                  Documentation &amp; Standards
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                  Everything You Need to Know About llms.txt &amp; AI SEO
                </h2>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                    <Bot className="h-5 w-5 text-cyan-600" />
                    How do AI Crawlers (Perplexity, ChatGPT, Claude) use llms.txt?
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Modern AI search engines use autonomous scraping agents that have strict token budgets. Instead of crawling hundreds of complex JavaScript-heavy HTML pages, AI crawlers look for <code className="text-cyan-800 font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">/llms.txt</code> to immediately understand the brand&apos;s core mission, pricing structure, and key documentation in clean Markdown.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                    <Layers className="h-5 w-5 text-emerald-600" />
                    What is the difference between llms.txt and llms-full.txt?
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    <strong className="text-slate-900">llms.txt</strong> is a concise, curated table of contents with brief 1-sentence summaries for each link. <strong className="text-slate-900">llms-full.txt</strong> contains the complete in-depth documentation and raw text context for AI agents that need deep technical immersion (such as coding assistants like Cursor or Claude).
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                    Does having an llms.txt improve Google Search or AI Citations?
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Yes. Generative Engine Optimization (GEO) data shows that websites providing standard <code className="text-cyan-800 font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">llms.txt</code> files experience higher citation accuracy, fewer AI hallucinations about their pricing/features, and faster indexation by AI-first search engines.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </StickyFooterLayout>
    </>
  );
}
