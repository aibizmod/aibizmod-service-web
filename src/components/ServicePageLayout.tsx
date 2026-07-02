"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight, CheckCircle, ArrowRight,
  Code2, Database, Server, Network, Cloud, TestTube,
  Smartphone, Monitor, Layers, Eye, Bell, Search,
  Target, FileText, Mail, Megaphone, LineChart,
  Workflow, Container, Shield, Activity, RefreshCw,
  Compass, Bot, Cpu, MessageSquare, Headphones,
  Package, Settings, Wrench, Zap, Users, Lightbulb,
  Globe, Award, Clock, Rocket, Pencil, BarChart, GitBranch,
  Sparkles, type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import SectionHeading from "@/components/common/SectionHeading";
import ShaderBackground from "@/components/ui/shader-background";
import { StarButton } from "@/components/ui/star-button";
import StickyFooterLayout from "@/components/layout/StickyFooterLayout";
import ServiceCardsSection, { type ServiceCard } from "@/components/ServiceCardsSection";
import FeatureCarousel, { type CarouselFeature } from "@/components/ui/feature-carousel";

// ─── Icon registry ────────────────────────────────────────────────────────────

export type IconKey =
  | "code2" | "database" | "server" | "network" | "cloud" | "testTube"
  | "smartphone" | "monitor" | "layers" | "eye" | "bell" | "search"
  | "target" | "fileText" | "mail" | "megaphone" | "lineChart"
  | "workflow" | "container" | "shield" | "activity" | "refreshCw"
  | "compass" | "bot" | "cpu" | "messageSquare" | "headphones"
  | "package" | "settings" | "wrench" | "zap" | "users" | "lightbulb"
  | "globe" | "award" | "clock" | "rocket" | "pencil" | "barChart" | "gitBranch";

export const iconMap: Record<IconKey, LucideIcon> = {
  code2: Code2, database: Database, server: Server, network: Network,
  cloud: Cloud, testTube: TestTube, smartphone: Smartphone, monitor: Monitor,
  layers: Layers, eye: Eye, bell: Bell, search: Search, target: Target,
  fileText: FileText, mail: Mail, megaphone: Megaphone, lineChart: LineChart,
  workflow: Workflow, container: Container, shield: Shield, activity: Activity,
  refreshCw: RefreshCw, compass: Compass, bot: Bot, cpu: Cpu,
  messageSquare: MessageSquare, headphones: Headphones, package: Package,
  settings: Settings, wrench: Wrench, zap: Zap, users: Users,
  lightbulb: Lightbulb, globe: Globe, award: Award, clock: Clock,
  rocket: Rocket, pencil: Pencil, barChart: BarChart, gitBranch: GitBranch,
};

const serviceImages: Record<string, string> = {
  "web-development":
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80",
  "software-development":
    "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=1000&q=80",
  "mobile-app-development":
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
  "digital-marketing":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  "hosting-infrastructure":
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
  "ai-automation":
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
  "customer-experience-management":
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80",
  "it-consulting-it-services":
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80",
};

// ─── Data types ───────────────────────────────────────────────────────────────

export interface FeatureCard { icon: IconKey; title: string; desc: string; }
export interface ProcessStep  { icon: IconKey; title: string; desc: string; }
export interface FAQ           { q: string; a: string; }

export interface ServicePageData {
  name: string;
  tagline: string;
  heroBullets: string[];
  slug: string;
  iconColor: string; // kept for backwards compat; layout uses text-royal throughout
  overview: { paragraphs: string[]; benefits: string[]; };
  features: FeatureCard[];   // exactly 6
  process: ProcessStep[];    // exactly 4
  techStack?: string[];
  faqs: FAQ[];               // 4–5
  answerSummary?: string;    // 40–70 word GEO answer block below H1
}

export type { ServiceCard };

// ─── Structured data ─────────────────────────────────────────────────────────

function buildServiceSchema(data: ServicePageData) {
  const pageUrl = `https://aibizmod.com/services/${data.slug}`;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Service',
      '@id': `${pageUrl}/#service`,
      name: data.name,
      description: data.tagline,
      url: pageUrl,
      provider: { '@id': 'https://aibizmod.com/#organization' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://aibizmod.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: 'https://aibizmod.com/services',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: data.name,
          item: pageUrl,
        },
      ],
    },
  ];

  if (data.faqs && data.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}/#faq`,
      mainEntity: data.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

// ─── FAQ accordion ────────────────────────────────────────────────────────────

function FAQItem({ faq }: { faq: FAQ }) {
  return (
    <details className="group rounded-xl border cursor-pointer transition-all duration-300 overflow-hidden border-[#E0F2FE] bg-white hover:border-[#BAE6FD] hover:bg-[#F0FDFF] open:border-[#BAE6FD] open:bg-[#ECFEFF]/80 open:shadow-[0_2px_16px_rgba(8,145,178,0.06)]">
      <summary className="flex items-center justify-between px-5 py-4 gap-4 select-none list-none [&::-webkit-details-marker]:hidden">
        <h3 className="text-[15.5px] font-medium leading-snug transition-colors duration-200 flex-1 text-[#0F172A] group-open:text-[#0891B2] group-open:font-semibold">
          {faq.q}
        </h3>
        <svg
          width="18" height="18" viewBox="0 0 18 18" fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-400 ease-in-out shrink-0 text-[#94A3B8] group-open:rotate-180 group-open:text-[#0891B2]"
        >
          <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="px-5 pb-5">
        <p className="text-[14px] leading-relaxed text-slate-500 font-normal">
          {faq.a}
        </p>
      </div>
    </details>
  );
}

const getProcessDeliverables = (index: number) => {
  switch (index) {
    case 0:
      return [
        "Requirement scoping & architecture sign-off",
        "Milestone definition & project roadmap",
        "Technology stack alignment"
      ];
    case 1:
      return [
        "Prototype construction & component buildout",
        "API hooks & core database mapping",
        "Staging pipeline configuration"
      ];
    case 2:
      return [
        "Comprehensive QA & system stress-testing",
        "Staging deployment & user feedback cycle",
        "Performance audit & SEO verification"
      ];
    case 3:
      return [
        "Production DNS sync & SSL setup",
        "Live system telemetry & logs activation",
        "Post-launch audit & team handoff"
      ];
    default:
      return [];
  }
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function ServicePageLayout({
  data,
  techStackFooter,
  serviceCards,
}: {
  data: ServicePageData;
  techStackFooter?: ReactNode;
  serviceCards?: ServiceCard[];
}) {
  const prefersReduced = useReducedMotion();
  const heroImage = serviceImages[data.slug] ?? serviceImages["web-development"];

  const processFeatures: CarouselFeature[] = data.process.map((step, i) => {
    const images = [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
    ];

    const processAlts = [
      `Strategic planning session with consultants aligning requirements for ${step.title}.`,
      `Web developer writing programming code to build core platform features for ${step.title}.`,
      `Quality assurance analyst conducting comprehensive system testing and optimization audits for ${step.title}.`,
      `Client handoff presenting live software deployment performance dashboards for ${step.title}.`
    ];

    return {
      id: `step-${i}`,
      label: step.title,
      icon: iconMap[step.icon],
      image: images[i] ?? images[0],
      imageAlt: processAlts[i] ?? step.title,
      description: step.desc,
      isLucide: true,
      deliverables: getProcessDeliverables(i),
    };
  });

  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(data)) }}
          />

        {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-36">
          <ShaderBackground className="absolute inset-0 z-0 h-full w-full opacity-80" />
          <div
            className="pointer-events-none absolute left-1/2 top-24 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
            {/* Breadcrumb */}
            <nav
              className="mb-8 inline-flex flex-wrap items-center gap-1.5 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-[13px] text-slate-500 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="transition-colors hover:text-[#0F172A]">Home</Link>
              <ChevronRight size={13} className="shrink-0 text-cyan-300" aria-hidden="true" />
              <Link href="/services" className="transition-colors hover:text-[#0F172A]">Services</Link>
              <ChevronRight size={13} className="shrink-0 text-cyan-300" aria-hidden="true" />
              <span className="font-medium text-[#0F172A]" aria-current="page">{data.name}</span>
            </nav>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md">
                <Sparkles size={14} aria-hidden="true" />
                Our Services
              </span>

              {/* Answer summary (GEO block) */}
              {data.answerSummary && (
                <p className="mt-6 text-base md:text-lg leading-relaxed text-slate-600 max-w-3xl">
                  {data.answerSummary}
                </p>
              )}

              {/* H1 */}
              <h1
                className="mt-7 font-display font-thin text-[#0F172A] text-balance"
                style={{
                  fontSize: "clamp(34px, 5.2vw, 56px)",
                  lineHeight: 1.02,
                }}
              >
                {data.name}
              </h1>

              {/* Hero bullets */}
              <div
                className="mt-6 max-w-2xl rounded-2xl border border-white/70 bg-white/45 px-6 py-4 shadow-[0_18px_55px_rgba(59,130,246,0.12)] backdrop-blur-md space-y-3"
              >
                <style dangerouslySetInnerHTML={{ __html: `
                  @keyframes breathe-glow {
                    0%, 100% {
                      filter: drop-shadow(0 0 1px rgba(6, 182, 212, 0.4));
                      opacity: 0.65;
                    }
                    50% {
                      filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.95));
                      opacity: 1;
                    }
                  }
                  .animate-breathe-glow {
                    animation: breathe-glow 2.2s ease-in-out infinite;
                  }
                `}} />
                {data.heroBullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <svg
                      className="h-3.5 w-3.5 text-cyan-500 mt-1.5 shrink-0 select-none animate-breathe-glow"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                    <span className="text-slate-600 leading-7 text-base md:text-lg">{bullet}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" aria-label="Get a free consultation">
                  <StarButton
                    as="span"
                    lightColor="#38bdf8"
                    backgroundColor="#0f172a"
                    className="h-12 font-semibold shadow-[0_0_12px_rgba(56,189,248,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(6,182,212,0.55),0_0_4px_rgba(56,189,248,0.7)]"
                  >
                    Get a Free Consultation
                    <ArrowRight size={16} aria-hidden="true" />
                  </StarButton>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-cyan-100 bg-white/55 px-6 text-sm font-semibold text-[#0F172A] shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur-md transition hover:border-cyan-200 hover:bg-white"
                >
                  All Services
                </Link>
              </div>
            </motion.div>
            </div>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
              className="relative"
            >
              <div
                className="relative min-h-[420px] overflow-hidden rounded-[32px] border border-cyan-100 bg-cyan-50 shadow-[0_26px_80px_rgba(8,145,178,0.16)]"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.08), rgba(15,23,42,0.34)), url(${heroImage})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(210,247,255,0.52),transparent_34%)]" />
                <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/55 bg-white/55 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.15)] backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">
                    aibizmod delivery
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Strategy, implementation, launch, and support with one
                    connected technical team.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 2. Overview ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 py-24 bg-white">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(210,247,255,0.6),transparent_32%)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

              {/* Left: description */}
              <AnimatedSection direction="left" className="lg:col-span-3">
                <SectionHeading eyebrow="Overview" heading="What We Deliver" className="mb-6" />
                <div className="mt-6 space-y-4">
                  {data.overview.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-slate-600 leading-relaxed"
                      style={{ fontSize: 17, lineHeight: 1.65 }}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </AnimatedSection>

              {/* Right: key benefits sticky card */}
              <AnimatedSection direction="right" delay={0.15} className="lg:col-span-2">
                <div className="rounded-[28px] border border-cyan-100 bg-white/70 p-8 shadow-[0_18px_55px_rgba(59,130,246,0.10)] backdrop-blur-md lg:sticky lg:top-24">
                  <h3 className="font-display font-semibold text-[#0F172A] mb-5" style={{ fontSize: 18 }}>
                    Key Benefits
                  </h3>
                  <ul className="space-y-4">
                    {data.overview.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <CheckCircle
                          size={16}
                          className="text-cyan-600 mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-slate-600 leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ── 3. What's Included ──────────────────────────────────────────── */}
        {/* <section className="px-6 py-24 bg-[#F8FEFF]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-14">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700">
                What&apos;s Included
              </span>
              <h2
                className="mt-5 font-display font-thin text-[#0F172A] text-balance"
                style={{
                  fontSize: "clamp(30px, 4vw, 52px)",
                  lineHeight: 1.08,
                }}
              >
                Everything you need, nothing you don&apos;t
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.features.map((f, i) => {
                const Icon = iconMap[f.icon];
                return (
                  <AnimatedSection key={f.title} delay={i * 0.07}>
                    <div className="flex h-full flex-col rounded-[24px] border border-cyan-100/80 bg-white/75 p-6 shadow-[0_18px_55px_rgba(59,130,246,0.09)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_24px_70px_rgba(8,145,178,0.14)]">
                      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-100 bg-cyan-50 text-cyan-700 shadow-[0_12px_28px_rgba(8,145,178,0.10)]">
                        <Icon size={19} aria-hidden="true" />
                      </div>
                      <h3
                        className="font-display font-semibold text-[#0F172A] mb-2"
                        style={{ fontSize: 17, lineHeight: 1.3 }}
                      >
                        {f.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed flex-1">
                        {f.desc}
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section> */}

        {/* ── 3b. Animated Service Cards ──────────────────────────────────── */}
        {serviceCards && serviceCards.length > 0 && (
          <ServiceCardsSection cards={serviceCards} />
        )}

        {/* ── 4. Process ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 py-16 md:py-20 bg-[#F4F9FA] border-y border-cyan-100/50">
          {/* Subtle diagonal lines background texture */}
          <div 
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                rgba(8, 145, 178, 0.06) 0px,
                rgba(8, 145, 178, 0.06) 1px,
                transparent 1px,
                transparent 12px
              )`,
            }}
          />
          {/* Radial gradient glow for depth */}
          <div 
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,#F4F9FA_90%)] z-0"
          />

          <div className="relative max-w-7xl mx-auto z-10">
            <AnimatedSection className="text-center mb-8 flex flex-col items-center">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
                How It Works
              </span>
              <h2 
                className="mt-4 font-display font-bold text-balance text-[#0E7490]"
                style={{
                  fontSize: "clamp(26px, 3.5vw, 38px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Our Process
              </h2>
            </AnimatedSection>

            <FeatureCarousel features={processFeatures} />
          </div>
        </section>

        {/* ── 5. Tech Stack ───────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#F8FEFF] border-y border-cyan-100">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-10">
              <SectionHeading eyebrow="Tech Stack & Tools" heading="Technologies We Work With" centered />
            </AnimatedSection>

            {data.techStack && data.techStack.length > 0 ? (
              <AnimatedSection delay={0.1}>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {data.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full px-4 py-2 text-sm font-medium text-[#0F172A] cursor-default shadow-[0_10px_24px_rgba(59,130,246,0.08)] transition-colors"
                      style={{
                        background: "rgba(255,255,255,0.72)",
                        border: "1px solid rgba(103,232,249,0.42)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(6,182,212,0.55)";
                        el.style.background = "#ECFEFF";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(103,232,249,0.42)";
                        el.style.background = "rgba(255,255,255,0.72)";
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </AnimatedSection>
            ) : null}

            {techStackFooter ? (
              <AnimatedSection delay={0.15}>{techStackFooter}</AnimatedSection>
            ) : null}
          </div>
        </section>

        {/* ── 6. FAQ ──────────────────────────────────────────────────────── */}
        <section id="faq" className="py-24 px-6 bg-[#F8FEFF] border-t border-[#E0F2FE]">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="flex flex-col md:flex-row items-start justify-center gap-16">
              {/* Left Column: Text */}
              <div className="w-full md:w-[38%] shrink-0 space-y-5 md:sticky md:top-32">
                <p className="text-cyan-700 text-sm font-semibold uppercase tracking-[0.16em]">Questions Before We Start</p>
                <h2
                  className="font-display font-thin text-[#0F172A] text-balance"
                  style={{
                    fontSize: "clamp(30px, 4vw, 44px)",
                    lineHeight: 1.1,
                  }}
                >
                  A Few Things Clients Usually Ask
                </h2>
                <p className="text-[15px] text-slate-500 leading-relaxed">
                  Find answers to common questions about {data.name} solutions, setup procedures, scoping timelines, and deliverables.
                </p>
              </div>

              {/* Right Column: FAQ Accordion */}
              <div className="flex-1 w-full space-y-3">
                {data.faqs.map((faq, index) => (
                  <FAQItem key={index} faq={faq} />
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

      </main>
      </StickyFooterLayout>
    </>
  );
}
