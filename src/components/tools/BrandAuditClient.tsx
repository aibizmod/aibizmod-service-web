"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  Download,
  FileText,
  Globe,
  Layers3,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShaderBackground from "@/components/ui/shader-background";
import StickyFooterLayout from "@/components/layout/StickyFooterLayout";
import { StrandOrb } from "@/components/strand-orb";
import { cn } from "@/lib/utils";

type Impact = "high" | "medium" | "low";
type Rating = "excellent" | "good" | "partial" | "weak" | "missing";

interface AuditCheck {
  key: string;
  name: string;
  rating: Rating;
  score: number;
  maxScore: number;
  impact: Impact;
  note: string;
}

interface PlatformReadiness {
  platform: string;
  score: number;
  verdict: string;
  topFix: string;
}

interface BrandAuditResponse {
  success: boolean;
  domain: string;
  brandName: string;
  tagline: string;
  score: number;
  band: string;
  summary: string;
  inputs: {
    businessType: string;
    industry: string;
    niche: string;
    location: string;
  };
  analyzed: {
    homepage: boolean;
    pagesChecked: number;
    internalLinks: number;
    llmsTxt: boolean;
    robotsTxt: boolean;
  };
  detectedSignals: {
    schemaTypes: string[];
    socialProfiles: string[];
    serviceThemes: string[];
    canonical: string | null;
  };
  checks: AuditCheck[];
  platformReadiness: PlatformReadiness[];
  generatedQueries: string[];
  actionPlan: string[];
  reportMarkdown: string;
  error?: string;
}

const SCAN_STEPS = [
  "Reading website identity signals",
  "Checking schema and crawl guidance",
  "Mapping services and proof points",
  "Scoring AI platform readiness",
  "Preparing brand audit report",
];

const EXAMPLE_AUDITS = [
  { url: "aibizmod.com", brand: "aibizmod", industry: "AI automation", niche: "AI visibility audit, business automation" },
  { url: "linear.app", brand: "Linear", industry: "Project management software", niche: "issue tracking, product planning" },
  { url: "stripe.com", brand: "Stripe", industry: "Fintech", niche: "payments infrastructure, billing" },
];

const PLATFORM_OPTIONS = ["ChatGPT", "Perplexity", "Gemini", "Claude"];

const businessTypes = [
  "Service Business",
  "SaaS / Software",
  "Local Business",
  "Ecommerce",
  "Agency / Consultancy",
  "Enterprise",
];

function scoreTone(score: number) {
  if (score >= 80) return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (score >= 60) return "text-cyan-700 bg-cyan-50 border-cyan-200";
  if (score >= 40) return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-red-700 bg-red-50 border-red-200";
}

function ratingIcon(rating: Rating) {
  if (rating === "excellent" || rating === "good") return CheckCircle2;
  if (rating === "partial") return AlertCircle;
  return AlertCircle;
}

export default function BrandAuditClient() {
  const prefersReduced = useReducedMotion();
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [brandName, setBrandName] = useState("");
  const [businessType, setBusinessType] = useState("Service Business");
  const [industry, setIndustry] = useState("Enterprise Software");
  const [niche, setNiche] = useState("");
  const [location, setLocation] = useState("");
  const [platforms, setPlatforms] = useState<string[]>(["ChatGPT", "Perplexity"]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [result, setResult] = useState<BrandAuditResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "queries" | "report">("overview");

  const resultsRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const progressFrameRef = useRef<number>(0);
  const isCompleteRef = useRef(false);

  useEffect(() => {
    return () => cancelAnimationFrame(progressFrameRef.current);
  }, []);

  const togglePlatform = (platform: string) => {
    setPlatforms((current) =>
      current.includes(platform)
        ? current.filter((item) => item !== platform)
        : [...current, platform]
    );
  };

  const runAudit = async (example?: (typeof EXAMPLE_AUDITS)[number]) => {
    const rawUrl = (example?.url || websiteUrl).trim();
    if (!rawUrl) {
      setError("Enter a website URL to audit.");
      return;
    }
    if (platforms.length === 0) {
      setError("Select at least one AI platform.");
      return;
    }

    const payload = {
      url: rawUrl,
      brandName: example?.brand || brandName,
      businessType,
      industry: example?.industry || industry,
      niche: example?.niche || niche,
      location,
      platforms,
    };

    if (example) {
      setWebsiteUrl(example.url);
      setBrandName(example.brand);
      setIndustry(example.industry);
      setNiche(example.niche);
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setProgress(0);
    setCurrentStepIndex(0);
    setActiveTab("overview");
    isCompleteRef.current = false;

    const TOTAL_SCAN_MS = 5200;
    startTimeRef.current = performance.now();

    const animateProgress = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      let currentProgress = Math.min(0.92, elapsed / TOTAL_SCAN_MS);

      if (isCompleteRef.current) currentProgress = 1;
      setProgress(currentProgress);
      setCurrentStepIndex(Math.min(SCAN_STEPS.length - 1, Math.floor(currentProgress * SCAN_STEPS.length)));

      if (currentProgress < 1 && (!isCompleteRef.current || currentProgress < 0.99)) {
        progressFrameRef.current = requestAnimationFrame(animateProgress);
      }
    };
    progressFrameRef.current = requestAnimationFrame(animateProgress);

    try {
      const response = await fetch("/api/brand-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: BrandAuditResponse = await response.json();

      if (!response.ok || !data.success) {
        cancelAnimationFrame(progressFrameRef.current);
        setError(data.error || "Unable to complete the brand audit.");
        setLoading(false);
        return;
      }

      isCompleteRef.current = true;
      setProgress(1);
      setCurrentStepIndex(SCAN_STEPS.length - 1);

      setTimeout(() => {
        setResult(data);
        setLoading(false);
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
      }, 600);
    } catch {
      cancelAnimationFrame(progressFrameRef.current);
      setError("Network error while running the audit. Please try again.");
      setLoading(false);
    }
  };

  const copyText = async (text: string) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const downloadReport = () => {
    if (!result) return;
    const blob = new Blob([result.reportMarkdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${result.domain}-brand-audit.md`;
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
        <main className="relative min-h-screen overflow-hidden bg-white text-slate-900 selection:bg-cyan-100 selection:text-cyan-900">
          <ShaderBackground className="absolute inset-0 z-0 h-full w-full opacity-55 pointer-events-none" />

          <section className="relative isolate px-6 pb-14 pt-32 md:pb-18 md:pt-36">
            <div className="relative z-10 mx-auto max-w-5xl text-center">
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
                  Brand Audit
                </span>
              </nav>

              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/80 bg-cyan-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-800 shadow-sm backdrop-blur-md">
                <Sparkles size={14} className="text-cyan-600" aria-hidden="true" />
                AI visibility and brand entity audit
              </span>

              <h1
                className="mt-6 font-display font-thin text-[#0F172A] text-balance"
                style={{ fontSize: "clamp(34px, 5.2vw, 56px)", lineHeight: 1.05 }}
              >
                Brand Audit{" "}
                <span className="font-normal bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  for AI Search
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-slate-600 sm:text-[17px]">
                Analyze how clearly your website explains your brand to ChatGPT, Perplexity, Gemini, Claude, and AI answer engines.
              </p>
            </div>
          </section>

          <section className="relative z-10 px-6 pb-20">
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
              <aside className="rounded-lg border border-slate-200 bg-white/80 p-5 shadow-[0_12px_38px_rgba(15,23,42,0.05)] backdrop-blur-md">
                {[
                  { icon: Globe, title: "Website Analysis", text: "Domain, brand, category" },
                  { icon: Building2, title: "Business Services", text: "Niche and service signals" },
                  { icon: Bot, title: "AI Testing", text: "Platforms and prompts" },
                  { icon: BarChart3, title: "Results", text: "Scores and action plan" },
                ].map((step, index) => {
                  const Icon = step.icon;
                  const active = result ? index === 3 : loading ? index <= currentStepIndex : index === 0;
                  return (
                    <div
                      key={step.title}
                      className={cn(
                        "flex items-start gap-3 rounded-lg border p-3 transition-colors",
                        active ? "border-cyan-200 bg-cyan-50/70" : "border-transparent bg-transparent"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                          active ? "border-cyan-500 bg-white text-cyan-700" : "border-slate-200 text-slate-400"
                        )}
                      >
                        {loading && index === currentStepIndex ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className={cn("text-sm font-semibold", active ? "text-cyan-900" : "text-slate-600")}>
                          {step.title}
                        </div>
                        <div className="mt-0.5 text-xs text-slate-500">{step.text}</div>
                      </div>
                    </div>
                  );
                })}
              </aside>

              <div className="rounded-lg border border-slate-200 bg-white/90 p-5 shadow-[0_12px_38px_rgba(15,23,42,0.05)] backdrop-blur-md md:p-7">
                <div className="flex flex-col gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">Website & Platform Analysis</h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Enter your website and select the AI platforms to test for brand visibility.
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Free audit
                  </span>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-900">Website URL *</span>
                    <input
                      type="text"
                      value={websiteUrl}
                      onChange={(event) => {
                        setWebsiteUrl(event.target.value);
                        if (error) setError(null);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !loading) runAudit();
                      }}
                      placeholder="https://example.com"
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50/80 px-3.5 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-900">Brand Name</span>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(event) => setBrandName(event.target.value)}
                      placeholder="Your brand or company name"
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50/80 px-3.5 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-900">Business Type</span>
                    <select
                      value={businessType}
                      onChange={(event) => setBusinessType(event.target.value)}
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50/80 px-3.5 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    >
                      {businessTypes.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-900">Industry Category *</span>
                    <input
                      type="text"
                      value={industry}
                      onChange={(event) => setIndustry(event.target.value)}
                      placeholder="Enterprise Software"
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50/80 px-3.5 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-900">Search Location</span>
                    <input
                      type="text"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      placeholder="New York, Global, India"
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50/80 px-3.5 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    />
                    <span className="mt-1.5 block text-xs text-slate-500">Leave empty for global search.</span>
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-900">Industry Niche *</span>
                    <input
                      type="text"
                      value={niche}
                      onChange={(event) => setNiche(event.target.value)}
                      placeholder="project management, CRM, accounting"
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50/80 px-3.5 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    />
                    <span className="mt-1.5 block text-xs text-slate-500">Be specific about your specialty.</span>
                  </label>
                </div>

                <div className="mt-5 rounded-lg border border-cyan-200 bg-cyan-50/70 p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-cyan-950">AI platforms for brand visibility testing</p>
                      <p className="mt-1 text-xs text-cyan-800">
                        Selected platforms shape the readiness scores and generated test prompts.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {PLATFORM_OPTIONS.map((platform) => (
                        <button
                          key={platform}
                          type="button"
                          onClick={() => togglePlatform(platform)}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition",
                            platforms.includes(platform)
                              ? "border-cyan-500 bg-white text-cyan-800 shadow-sm"
                              : "border-cyan-100 bg-cyan-50 text-cyan-600 hover:border-cyan-300"
                          )}
                        >
                          {platforms.includes(platform) && <Check className="h-3.5 w-3.5" />}
                          {platform}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-medium text-slate-400">Try example:</span>
                  {EXAMPLE_AUDITS.map((example) => (
                    <button
                      key={example.url}
                      type="button"
                      onClick={() => runAudit(example)}
                      disabled={loading}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800"
                    >
                      <span>{example.url}</span>
                      <ArrowUpRight className="h-3 w-3 text-cyan-600" />
                    </button>
                  ))}
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 flex items-center gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => runAudit()}
                    disabled={loading}
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(8,145,178,0.25)] transition sm:w-auto",
                      loading
                        ? "cursor-not-allowed bg-slate-300 text-slate-500"
                        : "bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:brightness-105 active:scale-[0.98]"
                    )}
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4" />
                        Analyze Website
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="mx-auto mt-12 flex max-w-lg flex-col items-center text-center"
                >
                  <div className="mb-2 text-lg font-display font-medium tracking-tight text-slate-950 sm:text-xl">
                    Auditing{" "}
                    <em className="font-serif font-normal italic text-cyan-700">
                      {brandName || websiteUrl || "your brand"}
                    </em>
                  </div>
                  <div className="relative my-2 flex h-[300px] w-[300px] items-center justify-center">
                    <StrandOrb
                      size={300}
                      progress={progress}
                      strands={5}
                      reducedMotion={Boolean(prefersReduced)}
                    />
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                      <div className="flex items-baseline font-display text-5xl font-medium tracking-tight text-slate-950">
                        {percentage}
                        <span className="ml-1 text-2xl font-medium text-slate-500">%</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                        <Sparkles className="h-3 w-3 text-cyan-600" aria-hidden="true" />
                        <span>Analyzing</span>
                      </div>
                    </div>
                  </div>
                  <div className="my-3 flex h-6 w-full items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStepIndex}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-center gap-2 text-sm font-medium text-slate-600"
                      >
                        <span className="h-2 w-2 rounded-full bg-cyan-600" />
                        <span>{SCAN_STEPS[currentStepIndex]}</span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="mt-1 h-1.5 w-56 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-300"
                      style={{ width: `${(progress * 100).toFixed(1)}%` }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {result && (
              <div ref={resultsRef} className="mx-auto mt-12 max-w-6xl">
                <div className="rounded-lg border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
                  <div className="flex flex-col gap-5 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between md:p-7">
                    <div className="flex items-start gap-4">
                      <div className={cn("flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border text-2xl font-black", scoreTone(result.score))}>
                        {result.score}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-2xl font-bold text-slate-950">{result.brandName}</h2>
                          <span className={cn("rounded-full border px-2.5 py-1 text-xs font-semibold capitalize", scoreTone(result.score))}>
                            {result.band}
                          </span>
                        </div>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">{result.summary}</p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">{result.domain}</span>
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">{result.analyzed.pagesChecked} pages checked</span>
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">{result.analyzed.internalLinks} internal links</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => copyText(result.reportMarkdown)}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied" : "Copy Report"}
                      </button>
                      <button
                        type="button"
                        onClick={downloadReport}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                    </div>
                  </div>

                  <div className="border-b border-slate-100 px-5 pt-4 md:px-7">
                    <div className="flex flex-wrap gap-2">
                      {[
                        { key: "overview", label: "Overview", icon: Target },
                        { key: "queries", label: "AI Queries", icon: Bot },
                        { key: "report", label: "Report", icon: FileText },
                      ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key as typeof activeTab)}
                            className={cn(
                              "inline-flex items-center gap-2 rounded-t-lg border border-b-0 px-4 py-2 text-sm font-semibold transition",
                              activeTab === tab.key
                                ? "border-slate-200 bg-white text-cyan-700"
                                : "border-transparent text-slate-500 hover:text-slate-900"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-5 md:p-7">
                    {activeTab === "overview" && (
                      <div className="space-y-7">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                          {result.checks.map((check) => {
                            const Icon = ratingIcon(check.rating);
                            return (
                              <div key={check.key} className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
                                <div className="flex items-center justify-between gap-3">
                                  <Icon
                                    className={cn(
                                      "h-5 w-5",
                                      check.rating === "excellent" || check.rating === "good" ? "text-emerald-600" : "text-amber-600"
                                    )}
                                  />
                                  <span className="font-mono text-sm font-bold text-slate-900">
                                    {check.score}/{check.maxScore}
                                  </span>
                                </div>
                                <h3 className="mt-3 text-sm font-bold text-slate-950">{check.name}</h3>
                                <p className="mt-2 text-xs leading-relaxed text-slate-600">{check.note}</p>
                              </div>
                            );
                          })}
                        </div>

                        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                          <div className="rounded-lg border border-slate-200 p-5">
                            <h3 className="flex items-center gap-2 text-base font-bold text-slate-950">
                              <Layers3 className="h-5 w-5 text-cyan-600" />
                              AI Platform Readiness
                            </h3>
                            <div className="mt-4 space-y-4">
                              {result.platformReadiness.map((platform) => (
                                <div key={platform.platform}>
                                  <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                                    <span className="font-semibold text-slate-900">{platform.platform}</span>
                                    <span className="font-mono font-bold text-slate-900">{platform.score}/100</span>
                                  </div>
                                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                                      style={{ width: `${platform.score}%` }}
                                    />
                                  </div>
                                  <p className="mt-1.5 text-xs text-slate-600">
                                    {platform.verdict}. {platform.topFix}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-lg border border-slate-200 p-5">
                            <h3 className="flex items-center gap-2 text-base font-bold text-slate-950">
                              <ShieldCheck className="h-5 w-5 text-emerald-600" />
                              Detected Signals
                            </h3>
                            <div className="mt-4 space-y-4 text-sm">
                              <SignalList title="Schema" items={result.detectedSignals.schemaTypes} empty="No structured data types found" />
                              <SignalList title="Themes" items={result.detectedSignals.serviceThemes} empty="No service themes detected" />
                              <SignalList title="Profiles" items={result.detectedSignals.socialProfiles.map((profile) => new URL(profile).hostname.replace(/^www\./, ""))} empty="No social profiles found" />
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-5">
                          <h3 className="flex items-center gap-2 text-base font-bold text-amber-950">
                            <Zap className="h-5 w-5 text-amber-600" />
                            Priority Action Plan
                          </h3>
                          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
                            {result.actionPlan.map((action, index) => (
                              <li key={action} className="flex gap-3">
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-900">
                                  {index + 1}
                                </span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )}

                    {activeTab === "queries" && (
                      <div className="rounded-lg border border-slate-800 bg-slate-950">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                              <div className="h-3 w-3 rounded-full bg-red-500/80" />
                              <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                              <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                            </div>
                            <span className="pl-2 font-mono text-xs font-medium text-slate-300">
                              brand-audit-prompts.txt
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyText(result.generatedQueries.join("\n"))}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
                          >
                            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                            {copied ? "Copied" : "Copy Queries"}
                          </button>
                        </div>
                        <div className="p-5">
                          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-200">
                            {result.generatedQueries.map((query, index) => `${index + 1}. ${query}`).join("\n")}
                          </pre>
                        </div>
                      </div>
                    )}

                    {activeTab === "report" && (
                      <div className="rounded-lg border border-slate-800 bg-slate-950">
                        <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-5 py-3.5">
                          <span className="font-mono text-xs font-medium text-slate-300">brand-audit-report.md</span>
                          <button
                            type="button"
                            onClick={() => copyText(result.reportMarkdown)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
                          >
                            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                            {copied ? "Copied" : "Copy"}
                          </button>
                        </div>
                        <div className="max-h-[620px] overflow-y-auto p-5">
                          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-200">
                            {result.reportMarkdown}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-10 rounded-lg border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 p-6 shadow-[0_12px_45px_rgba(6,182,212,0.10)] md:p-8">
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-white px-3 py-1 text-xs font-semibold text-cyan-800">
                        <Sparkles className="h-3.5 w-3.5" />
                        Next AI visibility step
                      </span>
                      <h3 className="mt-3 text-2xl font-bold text-slate-950">Turn the audit into a full AI visibility report</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                        Use the deeper report workflow to benchmark prompts, citations, competitor mentions, and implementation fixes across AI answer engines.
                      </p>
                    </div>
                    <Link
                      href="/ai-visibility-audit-report"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(8,145,178,0.22)] transition hover:brightness-105"
                    >
                      Run Full Audit
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      </StickyFooterLayout>
    </>
  );
}

function SignalList({
  title,
  items,
  empty,
}: {
  title: string;
  items: string[];
  empty: string;
}) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{title}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.length > 0 ? (
          items.slice(0, 8).map((item) => (
            <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
              {item}
            </span>
          ))
        ) : (
          <span className="text-xs text-slate-500">{empty}</span>
        )}
      </div>
    </div>
  );
}
