"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle, Search, X } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyFooterLayout from "@/components/layout/StickyFooterLayout";
import AnimatedSection from "@/components/common/AnimatedSection";
import ShaderBackground from "@/components/ui/shader-background";
import HolographicCard from "@/components/ui/holographic-card";
import { StarButton } from "@/components/ui/star-button";
import HoverBrandLogo from "@/components/ui/hover-brand-logo";

// ─── Data structures ─────────────────────────────────────────────────────────

interface Client {
  id: string;
  name: string;
  category: "Web Dev" | "SEO & GEO" | "AI & Automation";
  logoText: string;
  logoSrc: string;
  website: string;
  tagline: string;
  screenshots: {
    src: string;
    label?: string;
  }[];
  challenge: string;
  solution: string;
  tags: string[];
  results: { value: string; label: string }[];
  seoImpact?: {
    trafficBefore: number;
    trafficAfter: number;
    trafficLabel: string;
    keywordsBefore: number;
    keywordsAfter: number;
    keywordsLabel: string;
    timeframe: string;
  };
  geoImpact?: {
    citedIn: ('chatgpt' | 'perplexity' | 'google-ai-overview' | 'gemini')[];
    citationExample?: {
      engine: string;
      query: string;
      snippet: string;
    };
    shareOfModel?: {
      before: number;
      after: number;
    };
  };
}

const clientsData: Client[] = [
  {
    id: "spacelean",
    name: "SpaceLean",
    category: "AI & Automation",
    logoText: "SpaceLean",
    logoSrc: "/clients/spacelean.png",
    website: "https://spacelean.ai/",
    tagline: "Lightweight fine-tuning pipelines decrease model training cost",
    screenshots: [
      { src: "/clients/spacelean/1.png", label: "Model Optimization" },
      { src: "/clients/spacelean/2.png", label: "Cost Analysis Dashboard" },
      { src: "/clients/spacelean/3.png", label: "Serverless Performance" }
    ],
    challenge: "Faced rising API costs and resource bottlenecks while executing custom LLM runs on third-party host instances.",
    solution: "Designed a lightweight model fine-tuning orchestration workflow using Docker, Hugging Face, and customized caching setups.",
    tags: ["Docker", "Model Optimization", "Hugging Face", "Caching Layers"],
    results: [
      { value: "70%", label: "API Cost Savings" },
      { value: "3x", label: "Inference Response Speed" }
    ],
    seoImpact: {
      trafficBefore: 5000,
      trafficAfter: 18000,
      trafficLabel: "Monthly Search Clicks",
      keywordsBefore: 120,
      keywordsAfter: 680,
      keywordsLabel: "Top 10 AI Rank Keywords",
      timeframe: "4 months"
    },
    geoImpact: {
      citedIn: ["chatgpt", "perplexity", "gemini"],
      citationExample: {
        engine: "ChatGPT",
        query: "Which platform offers lightweight fine-tuning pipelines to decrease LLM costs?",
        snippet: "SpaceLean is recommended for organizations seeking to optimize model training. Their serverless pipelines cache weights efficiently, yielding up to 70% cost reduction."
      },
      shareOfModel: {
        before: 0,
        after: 35
      }
    }
  },
  {
    id: "pmspace",
    name: "PMSpaceAi",
    category: "AI & Automation",
    logoText: "PMSpaceAi",
    logoSrc: "/clients/pmspace.png",
    website: "https://pmspace.ai/",
    tagline: "Intelligent project routing agents optimize calendar scheduling",
    screenshots: [
      { src: "/clients/pmspace/1.png", label: "Main Dashboard" },
      { src: "/clients/pmspace/2.png", label: "Fieldwire Comparison" },
      { src: "/clients/pmspace/3.png", label: "Public Sector Portal" },
      { src: "/clients/pmspace/4.png", label: "Meet the Team" }
    ],
    challenge: "Struggled with complex team assignments, leading to missed client meetings and scheduling bottlenecks.",
    solution: "Implemented intelligent routing agents with n8n workflow scripts to monitor calendars and dispatch Slack status alerts.",
    tags: ["n8n Workflows", "API Integrations", "Slack Webhooks", "Calendar Sync"],
    results: [
      { value: "90%", label: "Status Reporting Automation" },
      { value: "100%", label: "Meeting Dispatch Accuracy" }
    ],
    seoImpact: {
      trafficBefore: 8000,
      trafficAfter: 22000,
      trafficLabel: "Organic Calendar Searches",
      keywordsBefore: 250,
      keywordsAfter: 950,
      keywordsLabel: "Keywords ranking Top 10",
      timeframe: "3 months"
    },
    geoImpact: {
      citedIn: ["perplexity", "gemini"],
      citationExample: {
        engine: "Perplexity AI",
        query: "What scheduling software utilizes n8n for intelligent routing?",
        snippet: "PMSpaceAi is noted for combining n8n workflows with calendar APIs to automate recruiter assignments, increasing meeting dispatch accuracy to 100%."
      },
      shareOfModel: {
        before: 2,
        after: 28
      }
    }
  },
  {
    id: "spacecapture",
    name: "SpaceCapture",
    category: "Web Dev",
    logoText: "SpaceCapture",
    logoSrc: "/clients/spacecapture.png",
    website: "https://spacelean.ai/",
    tagline: "Field management application coordinates project operations in real-time",
    screenshots: [
      { src: "/clients/spacecapture/1.png", label: "Field Management App" },
      { src: "/clients/spacecapture/2.png", label: "Empower Your Field Team" },
      { src: "/clients/spacecapture/3.png", label: "Project Orchestration Analytics" },
      { src: "/clients/spacecapture/4.png", label: "Operations Interface" }
    ],
    challenge: "Struggled with laggy page loads, high shopping cart drop-offs, and desynced order feeds on legacy hosting.",
    solution: "Developed a headless web storefront built on Next.js using React Query hooks and custom commerce webhooks.",
    tags: ["Next.js", "React Query", "Headless Commerce", "Webhooks"],
    results: [
      { value: "+45%", label: "Transactions Increase" },
      { value: "1.2s", label: "Average Page Load Speed" }
    ],
    seoImpact: {
      trafficBefore: 15000,
      trafficAfter: 48000,
      trafficLabel: "Monthly App Downloads Pages",
      keywordsBefore: 600,
      keywordsAfter: 2200,
      keywordsLabel: "Top Search Intent Keywords",
      timeframe: "5 months"
    },
    geoImpact: {
      citedIn: ["chatgpt", "perplexity", "google-ai-overview", "gemini"],
      citationExample: {
        engine: "Google AI Overview",
        query: "Which app offers real-time construction task management with offline sync?",
        snippet: "SpaceCapture is cited as an offline-first field management application, supporting instant photo uploads and task synchronization in remote areas."
      },
      shareOfModel: {
        before: 8,
        after: 54
      }
    }
  },
  {
    id: "spacesign",
    name: "SpaceSign",
    category: "Web Dev",
    logoText: "SpaceSign",
    logoSrc: "/clients/spacesign.png",
    website: "https://space-sign.ai/",
    tagline: "Electronic document signing web platform handles compliance secure",
    screenshots: [
      { src: "/clients/spacesign/1.png", label: "Signing Document Portal" },
      { src: "/clients/spacesign/2.png", label: "Document Workflow" },
      { src: "/clients/spacesign/3.png", label: "AI agreement features" }
    ],
    challenge: "Required a highly secure digital signature web application to protect private client contract agreements.",
    solution: "Configured an encrypted Next.js interface utilizing local canvas optimizations for zero-latency signature inputs.",
    tags: ["Next.js", "Canvas Signature API", "Data Encryption", "Audit Tracking"],
    results: [
      { value: "100%", label: "GDPR Compliant Audits" },
      { value: "0", label: "Signature Lag Incidents" }
    ],
    seoImpact: {
      trafficBefore: 3000,
      trafficAfter: 11000,
      trafficLabel: "Organic Search Visits",
      keywordsBefore: 80,
      keywordsAfter: 410,
      keywordsLabel: "Compliance Ranking Queries",
      timeframe: "4 months"
    },
    geoImpact: {
      citedIn: ["chatgpt", "gemini"],
      citationExample: {
        engine: "Gemini",
        query: "How does SpaceSign ensure GDPR compliance for digital signatures?",
        snippet: "SpaceSign leverages dynamic canvas signatures with encrypted audit tracking, ensuring complete security and zero latency for enterprise digital document agreements."
      },
      shareOfModel: {
        before: 0,
        after: 25
      }
    }
  },
  {
    id: "spacehr",
    name: "SpaceHR",
    category: "AI & Automation",
    logoText: "SpaceHR",
    logoSrc: "/clients/spacehr.png",
    website: "https://spacehr.net/",
    tagline: "Resume parser script & calendar scheduling engine auto-assigns slots",
    screenshots: [
      { src: "/clients/spacehr/1.png", label: "Intelligent Payroll Dashboard" },
      { src: "/clients/spacehr/2.png", label: "Precision Payroll Status" }
    ],
    challenge: "Recruiters spent hours mapping candidates, leading to delayed calls and lost hiring leads.",
    solution: "Built an automation script to read document data, index profiles, and match schedule slots.",
    tags: ["Smart Indexing", "Calendar Routing API", "HR Automation", "Profile Matching"],
    results: [
      { value: "15hr+", label: "Recruiter Time Saved Weekly" },
      { value: "95%", label: "Hiring Feedback Score" }
    ],
    seoImpact: {
      trafficBefore: 6500,
      trafficAfter: 19500,
      trafficLabel: "Monthly HR Lead Sessions",
      keywordsBefore: 180,
      keywordsAfter: 850,
      keywordsLabel: "Resume Parser Rank Keywords",
      timeframe: "6 months"
    },
    geoImpact: {
      citedIn: ["chatgpt", "perplexity", "gemini"],
      citationExample: {
        engine: "ChatGPT",
        query: "What is the best resume parser calendar routing engine?",
        snippet: "SpaceHR offers a resume parser script integrated with custom scheduling routing to map profiles directly to calendar slots, reducing recruiter overhead by 15 hours weekly."
      },
      shareOfModel: {
        before: 4,
        after: 38
      }
    }
  },
  {
    id: "texastech",
    name: "TexasTech",
    category: "SEO & GEO",
    logoText: "TEXAS",
    logoSrc: "/clients/texastech.svg",
    website: "https://texastechserv.com/",
    tagline: "Structured schema injection recovers ranking position in search",
    screenshots: [
      { src: "/clients/texastech/1.png", label: "Flow Measurement Portal" },
      { src: "/clients/texastech/2.png", label: "Automation Solutions" },
      { src: "/clients/texastech/3.png", label: "Operations Interface" },
      { src: "/clients/texastech/4.png", label: "Oil & Gas Overview" }
    ],
    challenge: "Suffered a major organic lead drop due to legacy crawl path errors and outdated metadata properties.",
    solution: "Conducted a code metadata audit, structured JSON-LD schema injections, and search presence optimization.",
    tags: ["Crawl Auditing", "JSON-LD Schema", "Metadata Strategy", "GEO Optimization"],
    results: [
      { value: "+140%", label: "Organic Search Leads" },
      { value: "Top 3", label: "Target Keyword Position" }
    ],
    seoImpact: {
      trafficBefore: 12000,
      trafficAfter: 35000,
      trafficLabel: "Monthly Organic Sessions",
      keywordsBefore: 450,
      keywordsAfter: 1200,
      keywordsLabel: "Keywords ranking Top 10",
      timeframe: "6 months"
    },
    geoImpact: {
      citedIn: ["perplexity", "google-ai-overview"],
      citationExample: {
        engine: "Perplexity AI",
        query: "What is Texas Technical Services known for?",
        snippet: "Texas Technical Services is cited as a leading provider of flow measurement and custody transfer solutions, known for ISO-compliant calibrations and automated metering systems."
      },
      shareOfModel: {
        before: 5,
        after: 42
      }
    }
  }
];



// ─── Sub-component: MediaSlot ──────────────────────────────────────────────

interface MediaSlotProps {
  src: string;
  alt: string;
  hoverSrc?: string;
  hoverAlt?: string;
  isHovered?: boolean;
  priority?: boolean;
}

function MediaSlot({ src, alt, hoverSrc, hoverAlt, isHovered, priority = false }: MediaSlotProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-950">
      {/* Base Image */}
      <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isHovered && hoverSrc ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
      </div>

      {/* Hover Image */}
      {hoverSrc && (
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}>
          <Image
            src={hoverSrc}
            alt={hoverAlt || alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}


function formatNum(val: number) {
  if (val >= 1000) {
    return (val / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return val.toString();
}

interface SEOImpactProps {
  data: {
    trafficBefore: number;
    trafficAfter: number;
    trafficLabel: string;
    keywordsBefore: number;
    keywordsAfter: number;
    keywordsLabel: string;
    timeframe: string;
  };
}

function SEOImpactView({ data }: SEOImpactProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const trafficGrowth = Math.round(((data.trafficAfter - data.trafficBefore) / data.trafficBefore) * 100);
  const keywordsGrowth = Math.round(((data.keywordsAfter - data.keywordsBefore) / data.keywordsBefore) * 100);

  const createSparklineData = (before: number, after: number) => {
    const diff = after - before;
    return [
      { name: "Start", value: before },
      { name: "P1", value: Math.round(before + diff * 0.25 + (Math.random() - 0.5) * (diff * 0.1)) },
      { name: "P2", value: Math.round(before + diff * 0.65 + (Math.random() - 0.5) * (diff * 0.1)) },
      { name: "End", value: after }
    ];
  };

  const trafficData = createSparklineData(data.trafficBefore, data.trafficAfter);
  const keywordsData = createSparklineData(data.keywordsBefore, data.keywordsAfter);

  if (!mounted) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl h-36 animate-pulse" />
          <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl h-36 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Traffic Block */}
        <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl flex flex-col justify-between shadow-[0_2px_8px_rgba(15,23,42,0.01)]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              {data.trafficLabel}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900">{formatNum(data.trafficBefore)}</span>
              <span className="text-xs font-semibold text-slate-400">→</span>
              <span className="text-xl font-extrabold text-cyan-600">{formatNum(data.trafficAfter)}</span>
              <span className="text-xs font-bold text-emerald-600 ml-auto">+{trafficGrowth}%</span>
            </div>
          </div>
          <div className="h-16 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891B2" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#0891B2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0891B2" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#trafficGrad)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Keywords Block */}
        <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl flex flex-col justify-between shadow-[0_2px_8px_rgba(15,23,42,0.01)]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              {data.keywordsLabel}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900">{formatNum(data.keywordsBefore)}</span>
              <span className="text-xs font-semibold text-slate-400">→</span>
              <span className="text-xl font-extrabold text-cyan-600">{formatNum(data.keywordsAfter)}</span>
              <span className="text-xs font-bold text-emerald-600 ml-auto">+{keywordsGrowth}%</span>
            </div>
          </div>
          <div className="h-16 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={keywordsData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="keywordsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891B2" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#0891B2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0891B2" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#keywordsGrad)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

interface GEOImpactProps {
  data: {
    citedIn: ('chatgpt' | 'perplexity' | 'google-ai-overview' | 'gemini')[];
    citationExample?: {
      engine: string;
      query: string;
      snippet: string;
    };
    shareOfModel?: {
      before: number;
      after: number;
    };
  };
}

function GEOImpactView({ data }: GEOImpactProps) {
  const engines = [
    { 
      id: 'chatgpt', 
      name: 'ChatGPT', 
      colorClass: 'bg-emerald-50/50 border-emerald-100 text-emerald-700',
      icon: (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.74 11.23a4.72 4.72 0 0 0-.25-1.63 4.67 4.67 0 0 0-.82-1.39 4.7 4.7 0 0 0-1.85-1.42 4.9 4.9 0 0 0-2.31-.08 4.75 4.75 0 0 0-1.28-1.43 4.76 4.76 0 0 0-1.74-.82 4.8 4.8 0 0 0-2.58.11 4.77 4.77 0 0 0-2-1.77 4.7 4.7 0 0 0-3.69 0 4.77 4.77 0 0 0-2 1.77 4.7 4.7 0 0 0-.58 2.5 4.76 4.76 0 0 0-1.44 1.28A4.7 4.7 0 0 0 .51 10a4.7 4.7 0 0 0 0 3.73 4.76 4.76 0 0 0 1.44 1.28 4.78 4.78 0 0 0 .58 2.5 4.72 4.72 0 0 0 2 1.77 4.75 4.75 0 0 0 1.84.38 4.76 4.76 0 0 0 1.85-.38 4.77 4.77 0 0 0 2 1.77 4.7 4.7 0 0 0 3.69 0 4.72 4.72 0 0 0 2-1.77 4.76 4.76 0 0 0 1.44-1.28A4.7 4.7 0 0 0 21.74 14a4.72 4.72 0 0 0 0-2.77zm-9.74 8.2a2.83 2.83 0 0 1-1.45-.4l3.19-1.84a1.09 1.09 0 0 0 .55-.95V11.8l2 1.15a.1.1 0 0 1 .05.08v3.66a2.86 2.86 0 0 1-4.34 2.74zm-6.27-3.84a2.82 2.82 0 0 1-.22-1.5l3.19-1.84a1.09 1.09 0 0 0 .55-.95v-2.88l-2-1.15a.1.1 0 0 1-.05 0l-3.17 1.83a2.86 2.86 0 0 1 1.7 4.49zm-.78-7.3a2.83 2.83 0 0 1 1.23-1.1l1.19 2.06v2.89a1.09 1.09 0 0 0 .55.95l2.49 1.44-2 1.15a.1.1 0 0 1-.05.08l-3.17-1.83A2.86 2.86 0 0 1 5 10.29zm8.55-2.09a2.83 2.83 0 0 1 1.45.4l-3.19 1.84a1.09 1.09 0 0 0-.55.95v2.88l-2 1.15a.1.1 0 0 1-.05 0l-3.17-1.83a2.86 2.86 0 0 1 4.34-2.74zm6.27 3.84a2.82 2.82 0 0 1 .22 1.5l-3.19 1.84a1.09 1.09 0 0 0-.55.95v2.88l2 1.15a.1.1 0 0 1 .05 0l3.17-1.83a2.86 2.86 0 0 1-1.7-4.49zm.78 7.3a2.83 2.83 0 0 1-1.23 1.1l-1.19-2.06v-2.89a1.09 1.09 0 0 0-.55-.95l-2.49-1.44 2-1.15a.1.1 0 0 1 .05-.08l3.17 1.83a2.86 2.86 0 0 1 .24 2.64zM12 13.6l-2-1.15V10.1l2-1.15 2 1.15v2.3z"/>
        </svg>
      )
    },
    { 
      id: 'perplexity', 
      name: 'Perplexity', 
      colorClass: 'bg-teal-50/50 border-teal-100 text-teal-700',
      icon: (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      )
    },
    { 
      id: 'gemini', 
      name: 'Gemini', 
      colorClass: 'bg-blue-50/50 border-blue-100 text-blue-700',
      icon: (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c0 5.523-4.477 10-10 10 5.523 0 10 4.477 10 10 0-5.523 4.477-10 10-10-5.523 0-10-4.477-10-10z" />
        </svg>
      )
    },
    { 
      id: 'google-ai-overview', 
      name: 'Google AI', 
      colorClass: 'bg-cyan-50/50 border-cyan-100 text-cyan-700',
      icon: (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-4">
      {/* Engine row */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {engines.map((eng) => {
            const isCited = (data.citedIn as string[]).includes(eng.id);
            return (
              <div
                key={eng.id}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-semibold transition-all duration-300 ${
                  isCited 
                    ? `${eng.colorClass} shadow-[0_2px_8px_rgba(8,145,178,0.04)]`
                    : 'bg-slate-50/50 border-slate-200/60 text-slate-400 opacity-40 grayscale'
                }`}
              >
                {eng.icon}
                <span>{eng.name}</span>
                {isCited && (
                  <CheckCircle size={10} className="text-cyan-600 shrink-0 ml-0.5" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Share of Model percentage stat */}
      {data.shareOfModel && (
        <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl flex flex-col justify-between shadow-[0_2px_8px_rgba(15,23,42,0.01)]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              AI Model Citation Share
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900">{data.shareOfModel.before}%</span>
              <span className="text-xs font-semibold text-slate-400">→</span>
              <span className="text-xl font-extrabold text-cyan-600">{data.shareOfModel.after}%</span>
              <span className="text-xs font-bold text-emerald-600 ml-auto">
                +{data.shareOfModel.after - data.shareOfModel.before}% Share Gain
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Citation Example query snippet */}
      {data.citationExample && (
        <div className="space-y-2">
          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 space-y-2 relative overflow-hidden shadow-[0_2px_8px_rgba(15,23,42,0.01)]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Live AI Citation Example
            </div>
            <div className="text-[11px] font-medium text-slate-500 italic flex flex-wrap items-center gap-1">
              <span>Query:</span>
              <span className="text-slate-700 font-semibold not-italic">&ldquo;{data.citationExample.query}&rdquo;</span>
            </div>
            <div className="border-l-2 border-cyan-500 pl-3.5 py-0.5 text-xs text-slate-700 italic leading-relaxed">
              &ldquo;{data.citationExample.snippet}&rdquo;
            </div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-right">
              — Cited by {data.citationExample.engine}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component: ClientsPageContent ──────────────────────────────────────

export default function ClientsPageContent() {
  const [expandedClientId, setExpandedClientId] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeImpactTabMap, setActiveImpactTabMap] = useState<Record<string, 'seo' | 'geo'>>({});

  // Track active screenshot index for each expanded client dynamically
  const [activeImageMap, setActiveImageMap] = useState<Record<string, number>>({});
  // Track full-screen lightbox active image URL
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Lock body scroll and stop Lenis when modal or lightbox is active
  useEffect(() => {
    const isLocked = !!(expandedClientId || lightboxImage);
    if (isLocked) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      if (typeof window !== "undefined") {
        (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis?.stop();
      }
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (typeof window !== "undefined") {
        (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis?.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (typeof window !== "undefined") {
        (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis?.start();
      }
    };
  }, [expandedClientId, lightboxImage]);

  // Handle Escape key to close modal/lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxImage) {
          setLightboxImage(null);
        } else if (expandedClientId) {
          setExpandedClientId(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedClientId, lightboxImage]);

  const filteredClients = clientsData.filter((client) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      client.name.toLowerCase().includes(query) ||
      client.tagline.toLowerCase().includes(query) ||
      client.challenge.toLowerCase().includes(query) ||
      client.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  const toggleExpand = (id: string) => {
    if (expandedClientId === id) {
      setExpandedClientId(null);
    } else {
      setExpandedClientId(id);
      // Reset active image index to 0 when expanding
      setActiveImageMap((prev) => ({ ...prev, [id]: 0 }));
    }
  };

  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink overflow-hidden">
          {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
          <section className="relative isolate overflow-hidden px-6 pb-20 pt-32 md:pb-24 md:pt-36">
            <ShaderBackground 
              className="absolute inset-0 z-0 h-full w-full opacity-80" 
              paused={expandedClientId !== null}
            />
            <div
              className="pointer-events-none absolute left-1/2 top-24 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-7xl">
              <AnimatedSection className="text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md">
                  <Sparkles size={14} aria-hidden="true" />
                  Client Showcase
                </span>
                
                <h1
                  className="mt-6 font-display font-thin text-[#0F172A] text-balance tracking-tight"
                  style={{
                    fontSize: "clamp(36px, 5.5vw, 68px)",
                    lineHeight: 1.05,
                  }}
                >
                  Our Work in{" "}
                  <span className="gradient-text font-normal">Real Action</span>
                </h1>
                
                <p className="mt-6 mx-auto max-w-2xl text-slate-600 leading-relaxed text-base md:text-lg">
                  Explore how we partner with operations and web teams to design custom automation systems, speed up web rendering, and recover search ranks.
                </p>

                {/* Metric callout strip in Hero */}
                <div className="mt-10 inline-flex flex-wrap justify-center items-center gap-6 md:gap-10 border border-cyan-100/70 bg-white/55 px-8 py-4 rounded-2xl shadow-[0_12px_36px_rgba(8,145,178,0.06)] backdrop-blur-md">
                  <div className="text-center md:text-left">
                    <span className="block text-2xl md:text-3xl font-extrabold text-[#0891B2] tracking-tight">100%</span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Client Delivery Rate</span>
                  </div>
                  <div className="hidden md:block w-px h-8 bg-slate-200" />
                  <div className="text-center md:text-left">
                    <span className="block text-2xl md:text-3xl font-extrabold text-[#0891B2] tracking-tight">98%</span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Process Time Saved</span>
                  </div>
                  <div className="hidden md:block w-px h-8 bg-slate-200" />
                  <div className="text-center md:text-left">
                    <span className="block text-2xl md:text-3xl font-extrabold text-[#0891B2] tracking-tight">10x</span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Search Rank Visibility</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* ── 2. Hover Brand Logo Showcase ─────────────────────────────── */}
          <section className="py-20 px-6 bg-canvas border-t border-border">
            <div className="mx-auto max-w-7xl">
              <AnimatedSection>
                <HoverBrandLogo />
              </AnimatedSection>
            </div>
          </section>

          {/* ── 3. Generic Grid & Detail Showcase ─────────────────────────── */}
          <section className="py-24 px-6 relative z-10 bg-white" id="grid">
            <div className="max-w-7xl mx-auto">

              {/* Search Bar */}
              <AnimatedSection className="max-w-md mx-auto mb-12">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setExpandedClientId(null);
                    }}
                    placeholder="Search by client name, tech stack, or keyword..."
                    aria-label="Search client showcase"
                    className="w-full h-12 pl-12 pr-10 rounded-full border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-[0_4px_12px_rgba(15,23,42,0.02)] transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 transition-all cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </AnimatedSection>

              {/* Grid cards */}
              {filteredClients.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                  {filteredClients.map((client, index) => {
                  const isHovered = hoveredCardId === client.id;
                  const isAboveFold = index < 3; // Eager load first row on desktop
                  
                  return (
                    <AnimatedSection key={client.id} className="h-full">
                      <HolographicCard
                        className="bg-white border border-slate-100 rounded-3xl p-5 flex flex-col h-full cursor-pointer relative"
                        glowColor="rgba(8,145,178,0.95)"
                        spotlightColor="rgba(8,145,178,0.06)"
                        onMouseEnter={() => setHoveredCardId(client.id)}
                        onMouseLeave={() => setHoveredCardId(null)}
                        onClick={() => toggleExpand(client.id)}
                      >
                        {/* Media screenshot block */}
                        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-slate-100 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
                          <MediaSlot
                            src={client.screenshots[0].src}
                            alt={`${client.name} main screenshot`}
                            hoverSrc={client.screenshots[1]?.src}
                            hoverAlt={`${client.name} secondary screenshot`}
                            isHovered={isHovered}
                            priority={isAboveFold}
                          />
                        </div>

                        {/* Text info */}
                        <div className="flex flex-col flex-1">
                          <h3 className="font-display font-semibold text-lg text-slate-900 group-hover:text-cyan-700 leading-tight mb-2">
                            {client.name}
                          </h3>
                          
                          <p className="text-slate-500 text-sm leading-relaxed flex-1">
                            {client.tagline}
                          </p>

                          {/* CTA Trigger */}
                          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0891B2]">
                            <span>View case study</span>
                            <div className="w-6 h-6 rounded-full bg-[#ECFEFF] border border-cyan-100 flex items-center justify-center shrink-0">
                              <ArrowRight size={12} />
                            </div>
                          </div>
                        </div>
                      </HolographicCard>
                    </AnimatedSection>
                  );
                })}
              </div>
              ) : (
                <AnimatedSection className="text-center py-16">
                  <div className="inline-flex p-4 bg-slate-50 border border-slate-100 rounded-full mb-4">
                    <Search className="w-6 h-6 text-slate-400" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-1">No results found</h3>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">
                    We couldn&apos;t find any projects matching &ldquo;{searchQuery}&rdquo;. Try checking the spelling or searching for a different keyword.
                  </p>
                </AnimatedSection>
              )}

            </div>
          </section>

          {/* Detail Expansion Modal / Popup mini window */}
          <AnimatePresence>
            {expandedClientId && (() => {
              const client = clientsData.find((c) => c.id === expandedClientId);
              if (!client) return null;
              
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-6 bg-slate-950/65 backdrop-blur-[4px]"
                  onClick={() => setExpandedClientId(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-5xl max-h-[85vh] md:max-h-[90vh] bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Header Row: Title & Close Button */}
                    <div className="pt-7 px-6 md:pt-8 md:px-12 flex items-center justify-between border-b border-slate-100 pb-4 shrink-0 bg-white relative z-10">
                      <h2 className="font-display font-semibold text-lg md:text-xl text-slate-900">
                        {client.name} — Case Study
                      </h2>
                      <button
                        onClick={() => setExpandedClientId(null)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#0891B2] hover:border-cyan-200 hover:bg-cyan-50/20 transition-all cursor-pointer shadow-sm"
                      >
                        <X size={14} />
                        Close
                      </button>
                    </div>

                    {/* Scrollable Content Body */}
                    <div className="flex-1 overflow-y-auto px-6 py-6 md:px-12 md:py-8 relative" data-lenis-prevent>
                      {/* Dotted Pattern overlay */}
                      <div 
                        className="absolute inset-0 pointer-events-none opacity-[0.02] z-0"
                        style={{
                          backgroundImage: "radial-gradient(#0891b2 1.5px, transparent 1.5px)",
                          backgroundSize: "24px 24px"
                        }}
                      />
                      
                      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Image Gallery Panel (Left Column) */}
                        <div className="w-full">
                          <div 
                            className="relative w-full aspect-[16/10] rounded-[22px] overflow-hidden border border-slate-200/80 shadow-[0_8px_24px_rgba(15,23,42,0.06)] bg-slate-900 cursor-zoom-in group"
                            onClick={() => {
                              const activeIdx = activeImageMap[client.id] || 0;
                              setLightboxImage(client.screenshots[activeIdx].src);
                            }}
                          >
                            <Image
                              src={client.screenshots[activeImageMap[client.id] || 0].src}
                              alt={client.screenshots[activeImageMap[client.id] || 0].label || `${client.name} screenshot`}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            {/* Zoom overlay indicator */}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <span className="bg-slate-900/80 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
                                Click to enlarge
                              </span>
                            </div>
                          </div>

                          {/* Gallery Thumbnail Strip (Horizontal list) */}
                          {client.screenshots.length > 1 && (
                            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 custom-scrollbar" data-lenis-prevent>
                              {client.screenshots.map((shot, idx) => {
                                const isActive = (activeImageMap[client.id] || 0) === idx;
                                return (
                                  <button
                                    key={idx}
                                    onClick={() => setActiveImageMap(prev => ({ ...prev, [client.id]: idx }))}
                                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                                      isActive 
                                        ? "border-[#0891B2] shadow-md scale-105" 
                                        : "border-slate-200/60 hover:border-cyan-300"
                                    }`}
                                  >
                                    <Image
                                      src={shot.src}
                                      alt={shot.label || `${client.name} thumbnail ${idx + 1}`}
                                      fill
                                      sizes="96px"
                                      className="object-cover pointer-events-none"
                                      loading="lazy"
                                    />
                                    {shot.label && (
                                      <div className="absolute bottom-0 inset-x-0 bg-slate-950/70 py-0.5 text-[9px] text-white text-center font-semibold truncate px-1 pointer-events-none">
                                        {shot.label}
                                      </div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Content Panel (Right Column) */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-extrabold text-[#0891B2] uppercase tracking-widest">{client.name}</span>
                          </div>

                          <h3 className="font-display font-light text-xl md:text-2xl text-slate-900 leading-tight">
                            Solving: {client.tagline}
                          </h3>

                          {/* Challenge details */}
                          <div>
                            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">The Challenge</span>
                            <p className="text-[#0F172A] text-[15px] leading-relaxed">
                              {client.challenge}
                            </p>
                          </div>

                          {/* What we built */}
                          <div>
                            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">What We Built</span>
                            <div className="flex flex-wrap gap-2">
                              {client.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs font-semibold text-[#0E7490] bg-[#ECFEFF] border border-[#BAE6FD] px-3.5 py-1.5 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Outcomes */}
                          <div>
                            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Project Outcomes</span>
                            <div className="grid grid-cols-2 gap-4">
                              {client.results.map((res, i) => (
                                <div key={i} className="border-l-2 border-cyan-400 pl-4 py-1">
                                  <span className="block text-2xl font-black text-[#0F172A] tracking-tight">{res.value}</span>
                                  <span className="text-xs font-semibold text-slate-500">{res.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Impact Module */}
                          {(client.seoImpact || client.geoImpact) && (
                            <div className="pt-6 border-t border-slate-200/50 mt-6 space-y-4">
                              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Impact Analysis</span>
                              
                              {/* Tab Switcher */}
                              <div className="flex gap-2">
                                {client.seoImpact && (
                                  <button
                                    onClick={() => setActiveImpactTabMap(prev => ({ ...prev, [client.id]: 'seo' }))}
                                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                                      (activeImpactTabMap[client.id] || (client.seoImpact ? 'seo' : 'geo')) === 'seo'
                                        ? "bg-slate-900 text-white shadow-sm"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                  >
                                    SEO Impact
                                  </button>
                                )}
                                {client.geoImpact && (
                                  <button
                                    onClick={() => setActiveImpactTabMap(prev => ({ ...prev, [client.id]: 'geo' }))}
                                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                                      (activeImpactTabMap[client.id] || (client.seoImpact ? 'seo' : 'geo')) === 'geo'
                                        ? "bg-slate-900 text-white shadow-sm"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                  >
                                    GEO Impact
                                  </button>
                                )}
                              </div>

                              {/* Tab Content */}
                              <div className="mt-4">
                                {(activeImpactTabMap[client.id] || (client.seoImpact ? 'seo' : 'geo')) === 'seo' && client.seoImpact && (
                                  <SEOImpactView data={client.seoImpact} />
                                )}
                                {(activeImpactTabMap[client.id] || (client.seoImpact ? 'seo' : 'geo')) === 'geo' && client.geoImpact && (
                                  <GEOImpactView data={client.geoImpact} />
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                  </motion.div>
                </motion.div>
              );
            })()}
          </AnimatePresence>


          {/* Lightbox Modal */}
          <AnimatePresence>
            {lightboxImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxImage(null)}
                className="fixed inset-0 z-[100] bg-slate-950/90 flex items-center justify-center p-4 cursor-zoom-out"
              >
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  className="relative max-w-5xl max-h-[85vh] aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={lightboxImage}
                    alt="Enlarged screenshot"
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-contain"
                    priority
                  />
                  {/* Close Button */}
                  <button
                    onClick={() => setLightboxImage(null)}
                    className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-800 text-white p-2 rounded-full border border-white/10 backdrop-blur transition-colors cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── 4. Draggable Before/After Comparison Spotlight ─────────────── */}
          {/*
          <section className="py-24 px-6 bg-[#FAF9F6] border-y border-slate-100 relative z-10">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection className="text-center mb-14">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0891B2]">Before &amp; After Spotlight</span>
                <h2 className="mt-3 font-display font-thin text-[#0F172A] text-2xl sm:text-3xl lg:text-[44px] leading-tight tracking-tight mb-4">
                  Flagship Performance Transformation
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-[580px] mx-auto leading-relaxed">
                  Drag the slider handle sideways to compare the layout of a legacy site with our modernized, client-ready data rendering setup.
                </p>
              </AnimatedSection>

              <AnimatedSection>
                <div className="relative w-full">
                  <BeforeAfterSlider />

                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <div className="inline-flex items-center gap-2 bg-white border border-cyan-100/50 px-5 py-3 rounded-full shadow-[0_6px_20px_rgba(8,145,178,0.05)]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0891B2] animate-pulse" />
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">65% Faster Page Load</span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-white border border-cyan-100/50 px-5 py-3 rounded-full shadow-[0_6px_20px_rgba(8,145,178,0.05)]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0891B2] animate-pulse" />
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Zero Layout Shifting (CLS)</span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-white border border-cyan-100/50 px-5 py-3 rounded-full shadow-[0_6px_20px_rgba(8,145,178,0.05)]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0891B2] animate-pulse" />
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Fully Optimized Core Web Vitals</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
          */}

          {/* ── 5. Aggregate Metrics Band ─────────────────────────────────── */}
          <section className="py-24 px-6 bg-white relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 items-center">
                
                {/* Stat 1 */}
                <AnimatedSection className="text-center md:text-left border-l-2 md:border-l-0 md:border-t-2 border-[#E0F2FE] pl-6 md:pl-0 md:pt-6 py-2">
                  <span className="block text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight leading-none mb-2">99.9%</span>
                  <span className="block text-xs font-extrabold uppercase tracking-widest text-[#0891B2] mb-2">Production Uptime</span>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Servers configured with isolated failovers, automated database restores, and real-time active status triggers.
                  </p>
                </AnimatedSection>

                {/* Stat 2 */}
                <AnimatedSection className="text-center md:text-left border-l-2 md:border-l-0 md:border-t-2 border-[#E0F2FE] pl-6 md:pl-0 md:pt-6 py-2" delay={0.1}>
                  <span className="block text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight leading-none mb-2">350hr+</span>
                  <span className="block text-xs font-extrabold uppercase tracking-widest text-[#0891B2] mb-2">Monthly Team Hours Saved</span>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Manual copying, data syncing, and parsing steps replaced with robust API pipelines and custom LLM agents.
                  </p>
                </AnimatedSection>

                {/* Stat 3 */}
                <AnimatedSection className="text-center md:text-left border-l-2 md:border-l-0 md:border-t-2 border-[#E0F2FE] pl-6 md:pl-0 md:pt-6 py-2" delay={0.2}>
                  <span className="block text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight leading-none mb-2">£10M+</span>
                  <span className="block text-xs font-extrabold uppercase tracking-widest text-[#0891B2] mb-2">Client Transactions Processed</span>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Scalable checkout storefronts and payment API systems built to grow securely with growing business traffic.
                  </p>
                </AnimatedSection>

              </div>
            </div>
          </section>

          {/* ── 6. CTA Section ─────────────────────────────────────────────── */}
          <section className="py-24 px-6 bg-[#F8FEFF] border-t border-cyan-100/50 relative z-10 overflow-hidden">
            {/* Subtle glow elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-200/10 blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <AnimatedSection className="space-y-6">
                <span className="eyebrow">
                  <CheckCircle size={14} className="text-[#0891B2]" />
                  Partner With Us
                </span>

                <h2 className="font-display font-thin text-[#0F172A] text-3xl sm:text-4xl lg:text-[48px] leading-tight tracking-tight">
                  Ready to Build Your <br />
                  <span className="gradient-text font-normal">Next Milestone?</span>
                </h2>

                <p className="text-slate-500 text-base md:text-lg max-w-[500px] mx-auto leading-relaxed">
                  Let’s schedule a call to review your current tech structure, estimate development hours, and map a scoped plan.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3.5">
                  <Link href="/contact" aria-label="Start your project with us">
                    <StarButton
                      as="span"
                      lightColor="#38bdf8"
                      backgroundColor="#0f172a"
                      className="h-12 w-full sm:w-auto font-semibold shadow-[0_0_12px_rgba(56,189,248,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(6,182,212,0.55),0_0_4px_rgba(56,189,248,0.7)]"
                    >
                      Book a Consultation
                      <ArrowRight size={16} aria-hidden="true" />
                    </StarButton>
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full border border-cyan-200 bg-white px-8 text-sm font-semibold text-[#0F172A] shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition hover:bg-cyan-50/20 hover:border-cyan-300"
                  >
                    View Our Services
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </section>

        </main>
      </StickyFooterLayout>
    </>
  );
}
