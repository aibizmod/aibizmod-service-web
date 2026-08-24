"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Database,
  Workflow,
  Cpu,
  ShieldCheck,
  Users,
  Target,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyFooterLayout from "@/components/layout/StickyFooterLayout";
import AnimatedSection from "@/components/common/AnimatedSection";
import ShaderBackground from "@/components/ui/shader-background";
import { ReportGate } from "@/components/aibizmod/ReportGate";

// ─── Assessment model ────────────────────────────────────────────────────────

interface Question {
  id: string;
  text: string;
}

interface Category {
  slug: string;
  title: string;
  icon: React.ElementType;
  description: string;
  questions: Question[];
}

const CATEGORIES: Category[] = [
  {
    slug: "data",
    title: "Data Foundations",
    icon: Database,
    description:
      "Whether your business data is centralised, structured, and accessible enough for AI tools to consume.",
    questions: [
      {
        id: "data-crm",
        text: "Do you keep your principal business data (customers, orders, leads) in one central system rather than spreadsheets and inboxes?",
      },
      {
        id: "data-clean",
        text: "Is the data you rely on reasonably clean, consistent, and up to date?",
      },
      {
        id: "data-export",
        text: "Can your key software export or share data (CSV, API, integrations) without manual copy-paste?",
      },
    ],
  },
  {
    slug: "process",
    title: "Process Documentation",
    icon: Workflow,
    description:
      "Whether your workflows are defined well enough that automation can take them over reliably.",
    questions: [
      {
        id: "proc-doc",
        text: "Are your recurring processes (onboarding, invoicing, reporting) documented step by step?",
      },
      {
        id: "proc-repetitive",
        text: "Do your team members repeatedly perform the same manual, time-consuming tasks each week?",
      },
      {
        id: "proc-consistent",
        text: "Would you say these processes run consistently, or do they depend heavily on individual judgement?",
      },
    ],
  },
  {
    slug: "tech",
    title: "Technology Stack",
    icon: Cpu,
    description:
      "Whether the systems you already use can connect to modern AI and automation tooling.",
    questions: [
      {
        id: "tech-cloud",
        text: "Are your core tools cloud-based and accessible from anywhere, rather than tied to a single machine?",
      },
      {
        id: "tech-api",
        text: "Do your key platforms support integrations or APIs (or accept connectors like Zapier/Make)?",
      },
      {
        id: "tech-owner",
        text: "Is there a clear owner (internal or partner) responsible for your tools and their maintenance?",
      },
    ],
  },
  {
    slug: "security",
    title: "Security & Compliance",
    icon: ShieldCheck,
    description:
      "Whether you can adopt AI without exposing sensitive data or falling foul of compliance.",
    questions: [
      {
        id: "sec-policy",
        text: "Do you have documented policies for data handling, access control, and GDPR compliance?",
      },
      {
        id: "sec-permissions",
        text: "Can you restrict who can see and edit each piece of business data?",
      },
      {
        id: "sec-thirdparty",
        text: "Have you considered which data must never be shared with third-party AI services?",
      },
    ],
  },
  {
    slug: "people",
    title: "Team & Change Readiness",
    icon: Users,
    description:
      "Whether your people are prepared to adopt new workflows that automation introduces.",
    questions: [
      {
        id: "people-buyin",
        text: "Is there active buy-in from leadership for investing in AI and automation?",
      },
      {
        id: "people-train",
        text: "Are your team members open to learning new tools and changing how they work?",
      },
      {
        id: "people-champion",
        text: "Does someone in the business champion and coordinate improvement initiatives?",
      },
    ],
  },
  {
    slug: "strategy",
    title: "Automation Strategy",
    icon: Target,
    description:
      "Whether you know where automation should be applied first and how it will be measured.",
    questions: [
      {
        id: "strat-usecase",
        text: "Have you identified specific tasks or departments that automation should target first?",
      },
      {
        id: "strat-metrics",
        text: "Could you measure the success (hours saved, cost, errors) of an automation project today?",
      },
      {
        id: "strat-budget",
        text: "Is there a budget — even modest — allocated to automation tooling or external support?",
      },
    ],
  },
];

const SCORE_PER = 1;
const MAX_SCORE = CATEGORIES.length * 3 * SCORE_PER; // 18

type BandKey = "ready" | "strong" | "developing" | "early";

interface Band {
  key: BandKey;
  label: string;
  color: string;
  gradient: string;
  bg: string;
  description: string;
  roadmap: string[];
}

function bandFor(score: number): Band {
  const pct = (score / MAX_SCORE) * 100;
  if (pct >= 75)
    return {
      key: "ready",
      label: "AI-Ready",
      color: "#16a34a",
      gradient: "from-emerald-500 to-green-600",
      bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
      description:
        "Your data, processes, and systems are well positioned to adopt AI automation. You can move straight to scoping high-impact workflows with a partner.",
      roadmap: [
        "Pick 2–3 high-value workflows to automate first (lead handling, reporting, invoicing).",
        "Run a paid pilot with an automation partner on one workflow, measuring hours saved.",
        "Expand automation into adjacent processes and connect systems via APIs.",
        "Set up ongoing monitoring so gains are tracked and documented month over month.",
      ],
    };
  if (pct >= 50)
    return {
      key: "strong",
      label: "Strong Foundation",
      color: "#0891b2",
      gradient: "from-cyan-500 to-teal-600",
      bg: "bg-cyan-50 border-cyan-200 text-cyan-800",
      description:
        "You have a solid foundation, but gaps in documentation, data hygiene, or security need attention before AI can run reliably.",
      roadmap: [
        "Document your top processes step by step and identify repetitive manual work.",
        "Clean up and centralise business data into one system.",
        "Run a single low-risk automation pilot on a well-documented workflow.",
        "Assess tool integrations (APIs / connectors) as you expand to more processes.",
      ],
    };
  if (pct >= 25)
    return {
      key: "developing",
      label: "Developing",
      color: "#d97706",
      gradient: "from-amber-500 to-orange-500",
      bg: "bg-amber-50 border-amber-200 text-amber-800",
      description:
        "Automation is possible, but foundational work — data centralisation, documented processes, and security policies — must come first.",
      roadmap: [
        "Start by mapping one function: who does what, with which tools, and where the bottlenecks are.",
        "Centralise customer and operational data into a single database or CRM.",
        "Document 2–3 repeat processes so they become consistent and automatable.",
        "Address security and access policies before introducing any third-party tool.",
      ],
    };
  return {
    key: "early",
    label: "Early Stage",
    color: "#dc2626",
    gradient: "from-red-500 to-rose-600",
    bg: "bg-red-50 border-red-200 text-red-800",
    description:
      "Your business is at the start of its automation journey. The priority is to build the data and process foundations that AI relies on.",
    roadmap: [
      "Choose one manual, repetitive task and time how long it takes for one month.",
      "Introduce a single simple tool (shared CRM or project tracker) to replace spreadsheets.",
      "Document the processes behind that task as a starting point.",
      "Talk to an automation consultant to build a low-risk first project plan.",
    ],
  };
}

// ─── UI primitives ───────────────────────────────────────────────────────────

function ScoreRing({ score }: { score: number }) {
  const size = 200;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const band = bandFor(score);
  const offset =
    circumference - (score / MAX_SCORE) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <filter id="ar-glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e2e8f0" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={band.color} strokeWidth={stroke} fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          filter="url(#ar-glow)"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "Satoshi, sans-serif" }}>
          {score}
        </span>
        <span className="text-xs text-slate-400 font-medium">/ {MAX_SCORE}</span>
      </div>
    </div>
  );
}

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
      <div
        className={cn("h-full rounded-full bg-gradient-to-r", color)}
        style={{ width: `${pct}%`, transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }}
      />
    </div>
  );
}

// ─── Main tool ───────────────────────────────────────────────────────────────

export default function AiReadinessContent() {
  const [step, setStep] = useState(0); // 0..17 question index; step 18 = results
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const totalQuestions = CATEGORIES.length * 3;
  const currentQuestionIndex = Math.min(step, totalQuestions - 1);
  const categoryIndex = Math.floor(currentQuestionIndex / 3);
  const category = CATEGORIES[categoryIndex];
  const questionInCategory = currentQuestionIndex % 3;
  const question = category.questions[questionInCategory];

  const score = Object.values(answers).reduce((a, b) => a + b, 0);
  const isDone = step >= totalQuestions;
  const band = bandFor(score);
  const answered = Object.keys(answers).length;

  const answer = (value: number) => {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    setTimeout(() => setStep((s) => s + 1), 120);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  const currentAnswer = answers[question?.id];

  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink">
          {/* Hero */}
          <section className="relative isolate overflow-hidden px-4 sm:px-6 pb-14 pt-32 md:pb-16 md:pt-36">
            <ShaderBackground className="absolute inset-0 z-0 h-full w-full opacity-80" />
            <div
              className="pointer-events-none absolute left-1/2 top-24 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <nav
                className="mb-8 inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-[13px] text-slate-500 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="transition-colors hover:text-[#0F172A]">Home</Link>
                <ChevronDown size={13} className="shrink-0 -rotate-90 text-cyan-300" aria-hidden="true" />
                <Link href="/tools" className="transition-colors hover:text-[#0F172A]">Tools</Link>
                <ChevronDown size={13} className="shrink-0 -rotate-90 text-cyan-300" aria-hidden="true" />
                <span className="font-medium text-[#0F172A]" aria-current="page">AI Readiness Score</span>
              </nav>

              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md">
                <Sparkles size={14} aria-hidden="true" />
                Free Readiness Assessment
              </span>

              <h1
                className="mt-7 font-display font-thin text-[#0F172A] text-balance"
                style={{ fontSize: "clamp(32px, 4.8vw, 52px)", lineHeight: 1.04 }}
              >
                AI Readiness Score
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-slate-500">
                Answer 18 questions about your data, processes, and technology stack. Get a
                readiness score — then sign in to unlock your tailored adoption roadmap.
              </p>
            </div>
          </section>

          {/* Tool */}
          <section className="px-4 sm:px-6 py-12 pb-24">
            <div className="mx-auto max-w-3xl">
              {!isDone ? (
                <AnimatedSection>
                  <div className="rounded-[28px] border border-cyan-100 bg-white/70 p-6 sm:p-10 shadow-[0_18px_55px_rgba(59,130,246,0.10)] backdrop-blur-md">
                    {/* Progress */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">
                        {category.title}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {answered || 0}/{totalQuestions} answered
                      </span>
                    </div>
                    <Bar
                      pct={(answered / totalQuestions) * 100}
                      color="from-cyan-500 to-teal-500"
                    />

                    {/* Category chip */}
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-100">
                        <category.icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{category.description}</p>
                        <p className="text-xs text-slate-400">
                          Question {currentQuestionIndex + 1} of {totalQuestions}
                        </p>
                      </div>
                    </div>

                    {/* Question */}
                    <h2
                      className="mt-6 text-xl sm:text-2xl font-display font-bold text-slate-900 leading-snug"
                      style={{ fontFamily: "Satoshi, sans-serif" }}
                    >
                      {question.text}
                    </h2>

                    {/* Options */}
                    <div className="mt-8 flex flex-col gap-3">
                      {[
                        { value: 1, label: "Yes", sub: "Mostly true for your business" },
                        { value: 0.5, label: "Partly", sub: "True in some areas only" },
                        { value: 0, label: "No", sub: "Not yet in place" },
                      ].map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => answer(opt.value)}
                          className={cn(
                            "group flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all",
                            currentAnswer === opt.value
                              ? "border-cyan-500 bg-cyan-50 shadow-sm"
                              : "border-slate-200 bg-white hover:border-cyan-300 hover:bg-cyan-50/40"
                          )}
                        >
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{opt.label}</p>
                            <p className="text-xs text-slate-400">{opt.sub}</p>
                          </div>
                          <div
                            className={cn(
                              "flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
                              currentAnswer === opt.value
                                ? "border-cyan-600 bg-cyan-600"
                                : "border-slate-300 bg-white group-hover:border-cyan-400"
                            )}
                          >
                            {currentAnswer === opt.value && (
                              <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Hint */}
                    <div className="mt-6 flex items-start gap-2 rounded-xl bg-slate-50 border border-slate-100 p-4">
                      <Info className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Answer honestly — there are no wrong answers. The assessment scores how
                        ready your business is to adopt AI, not how advanced you currently are.
                      </p>
                    </div>

                    {/* Nav */}
                    <div className="mt-6 flex items-center justify-between">
                      <button
                        onClick={() => setStep((s) => Math.max(0, s - 1))}
                        disabled={step === 0}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition hover:text-slate-700 disabled:opacity-40"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </button>

                      <span className="text-xs text-slate-400">
                        Score so far: {score}/18
                      </span>
                    </div>
                  </div>
                </AnimatedSection>
              ) : (
                <AnimatedSection>
                  <div className="rounded-[28px] border border-cyan-100 bg-gradient-to-br from-cyan-50/30 via-white to-emerald-50/20 p-6 sm:p-10 shadow-[0_18px_55px_rgba(59,130,246,0.10)]">
                    {/* Result header */}
                    <div className="text-center">
                      <span className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]",
                        band.bg
                      )}>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Assessment Complete
                      </span>

                      <div className="mt-8 flex justify-center">
                        <ScoreRing score={score} />
                      </div>

                      <span className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-bold capitalize mt-6",
                        band.bg
                      )}>
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: band.color }} />
                        {band.label}
                      </span>

                      <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-500">
                        {band.description}
                      </p>
                    </div>

                    <ReportGate
                      tool="AI Readiness"
                      heading="Unlock your adoption roadmap"
                      description="Sign in to see your category breakdown and tailored AI adoption roadmap."
                      ctaLabel="Unlock My Roadmap"
                    >
                    {/* Category breakdown */}
                    <div className="mt-8 space-y-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Category Breakdown
                      </p>
                      {CATEGORIES.map((cat) => {
                        const catScore = cat.questions.reduce(
                          (acc, q) => acc + (answers[q.id] ?? 0),
                          0
                        );
                        const catMax = cat.questions.length * SCORE_PER;
                        const Icon = cat.icon;
                        return (
                          <div key={cat.slug} className="rounded-xl border border-slate-100 bg-white p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                                <Icon size={15} />
                              </div>
                              <span className="text-sm font-semibold text-slate-800 flex-1">
                                {cat.title}
                              </span>
                              <span className="text-sm font-bold text-slate-900">
                                {catScore}/{catMax}
                              </span>
                            </div>
                            <Bar
                              pct={(catScore / catMax) * 100}
                              color={
                                catScore / catMax >= 0.75
                                  ? "from-emerald-500 to-green-500"
                                  : catScore / catMax >= 0.5
                                  ? "from-cyan-500 to-teal-500"
                                  : "from-amber-500 to-orange-500"
                              }
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Roadmap */}
                    <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 mb-4">
                        Your Adoption Roadmap
                      </p>
                      <ol className="space-y-3">
                        {band.roadmap.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-bold text-white flex-shrink-0 mt-0.5" style={{ backgroundImage: `linear-gradient(135deg, ${band.color}, ${band.color}cc)` }}>
                              {i + 1}
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">{item}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                    </ReportGate>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <Link
                        href="/contact"
                        className="inline-flex h-12 items-center gap-2 rounded-full bg-[#0f172a] px-7 text-sm font-semibold text-white transition hover:bg-cyan-700"
                      >
                        Get a Free Automation Consultation
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={restart}
                        className="inline-flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Retake Assessment
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>
          </section>

          {/* How it works */}
          <section className="px-4 sm:px-6 pb-24">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl border border-cyan-100 bg-slate-50/50 p-6 sm:p-8">
                <h2 className="text-lg font-display font-bold text-slate-900" style={{ fontFamily: "Satoshi, sans-serif" }}>
                  About this assessment
                </h2>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Six categories — data, processes, technology, security, people, and strategy —
                  each with three questions. The score reflects how easily automation could be
                  introduced into your business. It&apos;s a general gauge, not a technical audit: a
                  full discovery workshop with our automation team maps your specific workflows and
                  integration points.
                </p>
              </div>
            </div>
          </section>
        </main>
      </StickyFooterLayout>
    </>
  );
}