"use client";

/* eslint-disable @next/next/no-img-element */

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import SectionHeading from "@/components/common/SectionHeading";
import ShaderBackground from "@/components/ui/shader-background";
import { StarButton } from "@/components/ui/star-button";
import StickyFooterLayout from "@/components/layout/StickyFooterLayout";
import { type IconKey } from "@/components/ServicePageLayout";
import ProblemSolutionCard from "@/components/ui/ProblemSolutionCard";
import CapabilitiesRollingSection from "@/components/ui/capabilities-rolling-section";
// import { UseCaseCard3D } from "@/components/ui/use-case-card-3d"; // ← card-grid style (kept for reference)
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";
import { MorphingCardStack } from "@/components/ui/morphing-card-stack";
import { BarChart3, ShieldCheck, Zap, Heart, Globe } from "lucide-react";

const BENEFIT_ICONS = [
  <Sparkles key="1" className="h-5 w-5" />,
  <BarChart3 key="2" className="h-5 w-5" />,
  <Zap key="3" className="h-5 w-5" />,
  <ShieldCheck key="4" className="h-5 w-5" />,
  <Heart key="5" className="h-5 w-5" />,
  <Globe key="6" className="h-5 w-5" />,
];

// ─── Industry → Unsplash image mapping ───────────────────────────────────────
// Supports strings or arrays of strings to allow alternatives when keys repeat.
// All photos: landscape, w=900×h=560 (≈16:10) to match the FocusRail card ratio.
const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=900&h=560&q=85&fit=crop&auto=format`;

const INDUSTRY_IMAGE_MAP: Record<string, string | string[]> = {
  // Retail — boutique interiors & product shelves
  retail: [
    U('1441986300917-64674bd600d8'), // Elegant boutique interior
    U('1555529669-e69e7aa0ba9a'), // Product shelves
  ],
  // Local Businesses — shops and storefronts
  'local businesses': [
    U('1441986300917-64674bd600d8'), // Elegant boutique interior
    U('1555529669-e69e7aa0ba9a'), // Product shelves
  ],
  // Finance — stock charts & financial analytics desks
  finance: [
    U('1611974789855-9c2a0a7236a3'), // Stock trading screens
    U('1590283603385-17ffb3a7f29f'), // Financial data papers
    U('1559526324-4b87b5e36e44'), // Financial planning charts
  ],
  // Financial Services — consulting & analytical reviews
  'financial services': [
    U('1554224155-6726b3ff858f'), // Financial docs review
    U('1454165804606-c3d57bc86b40'), // Strategic analysis
  ],
  // Sales — team presentations and analytics reviews
  sales: [
    U('1519389950473-47ba0277781c'), // Team meeting presentation
    U('1554224155-6726b3ff858f'), // Sales review
  ],
  // Healthcare — clinical settings & medical teams
  healthcare: [
    U('1579684385127-1ef15d508118'), // Surgical team
    U('1576091160550-2173dba999ef'), // Doctor with tablet
  ],
  // Healthcare Tech — digital medicine & diagnostics
  'healthcare tech': [
    U('1576091160550-2173dba999ef'), // Doctor using digital tablet
    U('1579684385127-1ef15d508118'), // Surgical team
  ],
  // Fitness — gym spaces
  fitness: [
    U('1571019614242-c5c5dee9f50b'), // Barbell lift
    U('1517838277536-f5f99be501cd'), // Fitness group training
  ],
  // E-commerce — packages, checkouts, and shipping boxes
  'e commerce': [
    U('1563013544-824ae1b704d3'), // Parcel unboxing
    U('1556742049-0cfed4f6a45d'), // Mobile payments card terminal
  ],
  // Manufacturing — assembly & fabrication lines
  manufacturing: [
    U('1581091226825-a6a2a5aee158'), // Industrial robot arm
    U('1581092160607-ee22621dd758'), // Factory floor engineers
  ],
  // Logistics — container ships & freight warehouses
  logistics: [
    U('1578575437130-527eed3abbec'), // Cargo vessel
    U('1586528116311-ad8dd3c8310d'), // Inventory warehouse
  ],
  // SaaS — user portals & analytical platforms
  saas: [
    U('1551288049-bebda4e38f71'), // Analytics software screen
    U('1507238691740-187a5b1d37b8'), // Web developer desk
  ],
  // Professional Services — business strategy & management
  'professional services': [
    U('1460925895917-afdab827c52f'), // Consultant showing dashboard
    U('1454165804606-c3d57bc86b40'), // Business analytics charts
  ],
  // Subscription — media streams & digital hubs
  subscription: [
    U('1522869635100-9f4c5e86aa37'), // Streaming on TV screen
    U('1507238691740-187a5b1d37b8'), // Web developer desk
  ],
  // Content — podcasts & creative design desks
  content: [
    U('1478737270239-2f02b77fc618'), // Podcast desk microphones
    U('1499750310107-5fef28a66643'), // Workspace notebook
  ],
  // Customer Support — smiling support workers
  'customer support': [
    U('1516321318423-f06f85e504b3'), // Headset service desk
    U('1522071820081-009f0129c71c'), // Team collaborating
  ],
  // Legal — scales & courtroom designs
  legal: [
    U('1589829545856-d10d557cf95f'), // Scales of justice desk
    U('1505664194779-8beaceb93744'), // Courtroom chambers
  ],
  // Legal Tech — digitised document signings
  'legal tech': [
    U('1450101499163-c8848c66ca85'), // Tablet stylus contract signing
    U('1522071820081-009f0129c71c'), // Team collaborating
  ],
  // HR — interviews & document gathering
  hr: [
    U('1573497019940-1c28c88b4f3e'), // Sunlit job interview room
    U('1522071820081-009f0129c71c'), // Team onboarding desk
  ],
  // Internal Operations — project workflows
  'internal operations': [
    U('1504307651254-35680f356dfd'), // Whiteboard timeline
    U('1517245386807-bb43f82c33c4'), // Active team meeting
  ],
  // Operations — operations desks
  operations: [
    U('1542744173-8e7e53415bb0'), // Busy operations floor
    U('1517245386807-bb43f82c33c4'), // Active team meeting
  ],
  // Hospitality — pool scenes & lobbies
  hospitality: [
    U('1566073771259-6a8506099945'), // Hotel infinity pool
    U('1520250497591-112f2f40a3f4'), // Boutique hotel suite
  ],
  // Food & Beverage — fine dining & counters
  'food and beverage': [
    U('1414235077428-338989a2e8c0'), // Restaurant dining tables
    U('1517248135467-4c7edcad34c4'), // Café/bistro counter
  ],
  // EdTech — learning spaces & online portals
  edtech: [
    U('1524178232363-1fb2b075b655'), // Laptops in study room
    U('1516321318423-f06f85e504b3'), // E-learning dashboard
  ],
  // Property — architecture & deals
  property: [
    U('1486406146926-c627a92ad1ab'), // Glass home golden hour
    U('1560518883-ce09059eeffa'), // Commercial building exterior
  ],
};

const FALLBACK_IMAGES = [
  U('1522202176988-66273c2fd55f'), // People collaborating
  U('1498050108023-c5249f4df085'), // Code workspace
  U('1531403009284-440f080d1e12'), // Active product design board
];

function normalizeKey(str: string): string {
  return str.toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

const FOCUS_RAIL_ALT_MAP: Record<string, string> = {
  '1441986300917-64674bd600d8': "Modern retail boutique shop interior displaying clothing products and customer service area.",
  '1555529669-e69e7aa0ba9a': "Organized product display shelves inside a retail store highlighting merchandise.",
  '1611974789855-9c2a0a7236a3': "Stock market trading computer screens showing financial charts and stock value trends.",
  '1590283603385-17ffb3a7f29f': "Financial analyst desk showing papers with business growth charts and analytics data.",
  '1559526324-4b87b5e36e44': "Business planning documents with graphs detailing investment returns and financial metrics.",
  '1554224155-6726b3ff858f': "Auditor reviewing corporate financial accounting documents on a tablet.",
  '1454165804606-c3d57bc86b40': "Financial services advisor analyzing business metrics and key growth indicators.",
  '1519389950473-47ba0277781c': "Collaborative sales team presenting revenue growth data on a laptop screen.",
  '1579684385127-1ef15d508118': "Professional surgical medical team performing a procedure in a hospital operating room.",
  '1576091160550-2173dba999ef': "Healthcare practitioner viewing patient medical records on a digital tablet in a clinic.",
  '1571019614242-c5c5dee9f50b': "Athlete lifting a barbell close-up demonstrating physical fitness training.",
  '1517838277536-f5f99be501cd': "Group of people training in a fitness studio with instructor guidance.",
  '1563013544-824ae1b704d3': "Customer opening a delivered cardboard shipping box containing retail ecommerce purchases.",
  '1556742049-0cfed4f6a45d': "Point of sale transaction using a mobile phone to tap a credit card terminal.",
  '1581091226825-a6a2a5aee158': "Automated industrial robotic arm assembling precision parts on a factory production line.",
  '1581092160607-ee22621dd758': "Industrial engineers monitoring automated machinery performance on a factory floor.",
  '1578575437130-527eed3abbec': "Large container cargo ship transporting global freight on ocean shipping routes.",
  '1586528116311-ad8dd3c8310d': "Logistics warehouse interior storing palletized goods for supply chain distribution.",
  '1551288049-bebda4e38f71': "SaaS dashboard display showing user growth charts and cloud application metrics.",
  '1507238691740-187a5b1d37b8': "Web software developer workspace with a computer screen showing code editor.",
  '1460925895917-afdab827c52f': "Business consultant demonstrating digital marketing dashboards and performance analytics.",
  '1522869635100-9f4c5e86aa37': "Modern television display streaming high-definition digital media content.",
  '1478737270239-2f02b77fc618': "Professional audio podcast recording setup with dynamic microphones in a studio.",
  '1499750310107-5fef28a66643': "Creative workspace desk with notebook and laptop for content strategy planning.",
  '1516321318423-f06f85e504b3': "Customer support representative with headset answering enquiries in a contact center.",
  '1522071820081-009f0129c71c': "Client support team collaborating at a table to resolve customer tickets.",
  '1589829545856-d10d557cf95f': "Golden scales of justice on a law office desk next to legal books.",
  '1505664194779-8beaceb93744': "Classic wooden courtroom bench and judge chambers representing legal proceedings.",
  '1450101499163-c8848c66ca85': "Signee using a stylus to sign a digital legal contract on a tablet.",
  '1573497019940-1c28c88b4f3e': "Sunny office conference room setup for human resources recruitment interviews.",
  '1504307651254-35680f356dfd': "Whiteboard displaying project timeline milestones and operational sprint plans.",
  '1517245386807-bb43f82c33c4': "Agile team collaborating on operations management in a modern workspace.",
  '1542744173-8e7e53415bb0': "Operations center with analysts monitoring workflow platforms and metrics.",
  '1566073771259-6a8506099945': "Luxury resort infinity swimming pool overlooking a tropical landscape.",
  '1520250497591-112f2f40a3f4': "Elegantly styled bedroom suite in a modern boutique hotel.",
  '1414235077428-338989a2e8c0': "Restaurant dining tables with set tables and ambient lighting.",
  '1517248135467-4c7edcad34c4': "Busy coffee shop counter with espresso machines and barista workspace.",
  '1524178232363-1fb2b075b655': "Students using laptops and reference books in a collaborative university library.",
  '1486406146926-c627a92ad1ab': "Modern architectural home with floor-to-ceiling glass windows at sunset.",
  '1560518883-ce09059eeffa': "Exterior view of a contemporary glass and steel commercial office building.",
  '1522202176988-66273c2fd55f': "Creative business team collaborating on project specifications in an office.",
  '1498050108023-c5249f4df085': "Software programmer desk showing code lines on a laptop screen.",
  '1531403009284-440f080d1e12': "Designer workspace showing interface layout designs and digital wireframes.",
};

function useCaseToRailItem(uc: SubserviceUseCase, i: number): FocusRailItem {
  const key = normalizeKey(uc.industry ?? '');
  const mapVal = INDUSTRY_IMAGE_MAP[key] ?? FALLBACK_IMAGES;
  
  let imageSrc = '';
  if (Array.isArray(mapVal)) {
    // Select image based on index to prevent repetition if the same industry appears multiple times
    imageSrc = mapVal[i % mapVal.length];
  } else {
    imageSrc = mapVal;
  }

  const imgId = imageSrc.split('photo-')[1]?.split('?')[0] || '';
  const imageAlt = FOCUS_RAIL_ALT_MAP[imgId] || uc.title;

  return { id: i, title: uc.title, description: uc.description, imageSrc, imageAlt, meta: uc.industry };
}

// ─── Data types ───────────────────────────────────────────────────────────────

export interface SubserviceCapability {
  icon: IconKey;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export interface SubserviceUseCase {
  industry: string;
  title: string;
  description: string;
}

export interface SubserviceBenefit {
  title: string;
  description: string;
}

export interface SubserviceFAQ {
  q: string;
  a: string;
}

export interface SubserviceWhatsIncluded {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface SubservicePageData {
  name: string;
  parentName: string;
  parentSlug: string;
  slug: string;
  tagline: string;
  heroBullets?: string[];
  heroImage: string;

  solves: {
    challenge: string;
    challengePoints: string[];
    solution: string;
    solutionPoints: string[];
  };

  capabilities: SubserviceCapability[];
  whatsIncluded?: SubserviceWhatsIncluded[];
  useCases: SubserviceUseCase[];
  technologies: string[];
  benefits: SubserviceBenefit[];
  faqs: SubserviceFAQ[];
  answerSummary?: string;    // 40–70 word GEO answer block below H1
}

// ─── Structured data ─────────────────────────────────────────────────────────

function buildSchema(data: SubservicePageData) {
  const pageUrl = `https://aibizmod.com/services/${data.parentSlug}/${data.slug}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Service",
      "@id": `${pageUrl}/#service`,
      name: data.name,
      description: data.tagline,
      url: pageUrl,
      provider: { "@id": "https://aibizmod.com/#organization" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://aibizmod.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://aibizmod.com/services" },
        {
          "@type": "ListItem",
          position: 3,
          name: data.parentName,
          item: `https://aibizmod.com/services/${data.parentSlug}`,
        },
        { "@type": "ListItem", position: 4, name: data.name, item: pageUrl },
      ],
    },
  ];

  if (data.faqs && data.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}/#faq`,
      mainEntity: data.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

// ─── FAQ item ─────────────────────────────────────────────────────────────────

function FAQItem({ faq }: { faq: SubserviceFAQ }) {
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

// ─── Layout ───────────────────────────────────────────────────────────────────

// Helper to render tagline with styled cyan bullets if it's formatted as a bullet list
function renderTagline(tagline: string) {
  let lines: string[] = [];
  if (tagline.includes("•")) {
    lines = tagline.split("\n");
  } else {
    // Split on periods followed by spaces, ignoring trailing period
    const rawLines = tagline.split(/\. (?=[A-Z0-9])/);
    lines = rawLines.map((line, idx) => {
      let trimmed = line.trim();
      if (idx === rawLines.length - 1 && trimmed.endsWith(".")) {
        trimmed = trimmed.slice(0, -1);
      }
      return "• " + trimmed;
    });
  }

  return (
    <div className="space-y-3">
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
      {lines.map((line, idx) => {
        const isBullet = line.trim().startsWith("•");
        const content = isBullet ? line.replace(/^[•\s]+/, "").trim() : line;
        
        if (isBullet) {
          return (
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
              <span className="text-slate-600 leading-7">{content}</span>
            </div>
          );
        } else {
          return (
            <p key={idx} className="mt-5 first:mt-0 font-semibold text-slate-800 tracking-wide text-xs uppercase tracking-[0.1em] text-cyan-700/90 pl-[2px]">
              {content}
            </p>
          );
        }
      })}
    </div>
  );
}

export default function SubservicePageLayout({ data }: { data: SubservicePageData }) {
  const prefersReduced = useReducedMotion();

  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(data)) }}
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
                {/* 4-level breadcrumb */}
                <nav
                  className="mb-8 inline-flex flex-wrap items-center gap-1.5 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-[13px] text-slate-500 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md"
                  aria-label="Breadcrumb"
                >
                  <Link href="/" className="transition-colors hover:text-[#0F172A]">Home</Link>
                  <ChevronRight size={13} className="shrink-0 text-cyan-300" aria-hidden="true" />
                  <Link href="/services" className="transition-colors hover:text-[#0F172A]">Services</Link>
                  <ChevronRight size={13} className="shrink-0 text-cyan-300" aria-hidden="true" />
                  <Link
                    href={`/services/${data.parentSlug}`}
                    className="transition-colors hover:text-[#0F172A]"
                  >
                    {data.parentName}
                  </Link>
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
                    {data.parentName}
                  </span>

                  <h1
                    className="mt-7 font-display font-thin text-[#0F172A] text-balance"
                    style={{ fontSize: "clamp(34px, 5.2vw, 56px)", lineHeight: 1.02 }}
                  >
                    {data.name}
                  </h1>

                  {/* Answer summary (GEO block) */}
                  {data.answerSummary && (
                    <p className="mt-6 text-base md:text-lg leading-relaxed text-slate-600 max-w-3xl">
                      {data.answerSummary}
                    </p>
                  )}

                  <div
                    className="mt-6 max-w-xl rounded-2xl border border-white/70 bg-white/45 px-6 py-4 text-slate-600 shadow-[0_18px_55px_rgba(59,130,246,0.12)] backdrop-blur-md text-base leading-8 md:text-lg whitespace-pre-line"
                  >
                    {renderTagline(data.tagline)}
                  </div>

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
                      href={`/services/${data.parentSlug}`}
                      className="inline-flex h-12 items-center justify-center rounded-full border border-cyan-100 bg-white/55 px-6 text-sm font-semibold text-[#0F172A] shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur-md transition hover:border-cyan-200 hover:bg-white"
                    >
                      Back to {data.parentName}
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Hero image */}
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
              >
                <div
                  className="relative min-h-[400px] overflow-hidden rounded-[32px] border border-cyan-100 bg-cyan-50 shadow-[0_26px_80px_rgba(8,145,178,0.16)]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.08), rgba(15,23,42,0.34)), url(${data.heroImage})`,
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
                      Strategy, implementation, launch, and support with one connected technical team.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── 2. What This Service Solves ─────────────────────────────────── */}
          <section
            className="relative overflow-hidden px-6 py-24 bg-[#F8FEFF]"
            style={{ borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(210,247,255,0.55),transparent_35%)]"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-7xl">
              <AnimatedSection className="text-center mb-14">
                <SectionHeading eyebrow="The Problem" heading="What This Service Solves" centered />
              </AnimatedSection>

              <ProblemSolutionCard
                slug={data.slug}
                parentSlug={data.parentSlug}
                challenge={data.solves.challenge}
                challengePoints={data.solves.challengePoints}
                solution={data.solves.solution}
                solutionPoints={data.solves.solutionPoints}
              />
            </div>
          </section>

          {/* ── 3. Key Capabilities (Rolling List) ──────────────────────────── */}
          <CapabilitiesRollingSection
            capabilities={data.capabilities}
          />

          {/* ── 3b. What's Included (Cards Grid) ────────────────────────────── */}
          {data.whatsIncluded && data.whatsIncluded.length > 0 && (
            <section className="px-6 py-24 bg-white border-b border-[#E0F2FE]">
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
                    Everything You Need, Nothing You Don&apos;t
                  </h2>
                </AnimatedSection>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.whatsIncluded.map((f, i) => (
                    <AnimatedSection key={f.title} delay={i * 0.05}>
                      <div className="group flex h-full flex-col rounded-[24px] border border-cyan-100/80 bg-white/75 p-3.5 shadow-[0_12px_36px_-6px_rgba(10,22,40,0.06),0_4px_16px_-4px_rgba(8,145,178,0.03)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-300/60 hover:shadow-[0_0_28px_6px_rgba(6,182,212,0.18),0_32px_64px_-10px_rgba(10,22,40,0.14)]">
                        <div className="relative w-full h-48 overflow-hidden rounded-[18px] flex-shrink-0 mb-4">
                          <img
                            src={f.image}
                            alt={f.imageAlt}
                            className="object-cover w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.14]"
                          />
                        </div>
                        <h3
                          className="font-display font-semibold text-[#0F172A] mb-2 px-1 transition-colors duration-500 group-hover:text-cyan-700"
                          style={{ fontSize: 17, lineHeight: 1.3 }}
                        >
                          {f.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed flex-1 px-1">
                          {f.description}
                        </p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── 4. Common Use Cases ─────────────────────────────────────────── */}
          <section
            className="relative overflow-hidden bg-[#F3FBFF]"
            style={{ borderTop: "1px solid rgba(8,145,178,0.10)", borderBottom: "1px solid rgba(8,145,178,0.10)" }}
          >
            {/* ── Unique background: concentric ripple rings + diamond accents ── */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">

              {/* Aurora sweep — diagonal colour wash */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(186,230,252,0.55)_0%,rgba(248,254,255,0.2)_45%,rgba(224,242,254,0.6)_100%)] will-change-transform transform-gpu" />

              {/* Soft blob — top left */}
              <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-cyan-100/50 blur-[96px] will-change-transform transform-gpu" />
              {/* Soft blob — bottom right */}
              <div className="absolute -bottom-24 -right-20 h-[400px] w-[400px] rounded-full bg-sky-100/60 blur-[80px] will-change-transform transform-gpu" />
              {/* Soft blob — centre */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[320px] w-[600px] rounded-full bg-cyan-50/70 blur-[72px] will-change-transform transform-gpu" />

              {/* Scattered diamond accents */}
              {[
                { top: "8%",  left: "6%",  size: 10, opacity: 0.18 },
                { top: "18%", left: "88%", size: 8,  opacity: 0.14 },
                { top: "72%", left: "4%",  size: 12, opacity: 0.12 },
                { top: "80%", left: "82%", size: 9,  opacity: 0.16 },
                { top: "42%", left: "2%",  size: 7,  opacity: 0.10 },
                { top: "55%", left: "94%", size: 11, opacity: 0.13 },
                { top: "28%", left: "48%", size: 6,  opacity: 0.08 },
                { top: "64%", left: "56%", size: 8,  opacity: 0.09 },
              ].map(({ top, left, size, opacity }, i) => (
                <div
                  key={i}
                  className="absolute bg-cyan-400 rotate-45"
                  style={{ top, left, width: size, height: size, opacity, borderRadius: 2 }}
                />
              ))}

              {/* Thin diagonal rule lines */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: "repeating-linear-gradient(135deg, rgba(8,145,178,1) 0px, rgba(8,145,178,1) 1px, transparent 1px, transparent 60px)",
                }}
              />
            </div>

            {/* Section content */}
            <div className="relative z-10 pt-20 pb-4">
              <div className="px-6">
                <AnimatedSection className="text-center mb-10">
                  <SectionHeading eyebrow="Use Cases" heading="How Businesses Use This" centered />
                  <p className="mt-4 text-[15px] leading-relaxed text-slate-500 max-w-xl mx-auto">
                    Real-world applications across industries — drag or click the cards to explore.
                  </p>
                </AnimatedSection>
              </div>

              <FocusRail
                items={data.useCases.map(useCaseToRailItem)}
                loop={true}
                autoPlay={false}
                noBg={true}
              />
            </div>
          </section>

          {/* ── 5. Benefits ─────────────────────────────────────────────────── */}
          <section
            className="relative overflow-hidden px-6 py-24 bg-[#F8FEFF]"
            style={{
              borderTop: "1px solid rgba(0,0,0,0.06)",
              backgroundImage:
                "linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(210,247,255,0.56),transparent_34%)]"
              aria-hidden="true"
            />
            <div className="relative max-w-7xl mx-auto">
              <AnimatedSection className="text-center mb-14">
                <SectionHeading eyebrow="Why It Matters" heading="Business Outcomes You Can Expect" centered />
              </AnimatedSection>

              <div className="mt-12 w-full">
                <MorphingCardStack
                  cards={data.benefits.map((benefit, i) => ({
                    id: String(i),
                    title: benefit.title,
                    description: benefit.description,
                    icon: BENEFIT_ICONS[i % BENEFIT_ICONS.length],
                  }))}
                  defaultLayout="stack"
                />
              </div>
            </div>
          </section>

          {/* ── 7. FAQ ──────────────────────────────────────────────────────── */}
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
