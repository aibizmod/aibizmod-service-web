"use client";

/* eslint-disable @next/next/no-img-element */

import React, { useState, useRef } from "react";
import AnimatedSection from "@/components/common/AnimatedSection";
import { ArrowUpRight, ChevronDown, Sparkles, Layers, Cpu, Network, Shield, Workflow, Bell, Code2, Database, Server, Cloud, Smartphone, Monitor, Eye, Search, Target, FileText, Mail, Megaphone, LineChart, Activity, RefreshCw, Compass, Bot, Headphones, Package, Settings, Wrench, Zap, Users, UserCheck, Lightbulb, Globe, Award, Clock, Rocket, Pencil, BarChart, GitBranch, HardDrive, TrendingUp, CheckCircle2, type LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type IconKey } from "@/components/ServicePageLayout";

const iconMapLocal: Record<string, LucideIcon> = {
  cpu: Cpu,
  network: Network,
  shield: Shield,
  workflow: Workflow,
  bell: Bell,
  code2: Code2,
  database: Database,
  server: Server,
  cloud: Cloud,
  smartphone: Smartphone,
  monitor: Monitor,
  layers: Layers,
  eye: Eye,
  search: Search,
  target: Target,
  fileText: FileText,
  mail: Mail,
  megaphone: Megaphone,
  lineChart: LineChart,
  activity: Activity,
  refreshCw: RefreshCw,
  compass: Compass,
  bot: Bot,
  headphones: Headphones,
  package: Package,
  settings: Settings,
  wrench: Wrench,
  zap: Zap,
  users: Users,
  userCheck: UserCheck,
  lightbulb: Lightbulb,
  globe: Globe,
  award: Award,
  clock: Clock,
  rocket: Rocket,
  pencil: Pencil,
  barChart: BarChart,
  gitBranch: GitBranch,
  hardDrive: HardDrive,
  sparkles: Sparkles,
  trendingUp: TrendingUp,
  checkCircle2: CheckCircle2,
};

export interface CapabilityItem {
  icon?: IconKey | string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  tags?: string[];
}

const capabilityImages: string[] = [
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&auto=format&fit=crop&q=80",
];

function getCapabilityAltText(index: number, title: string): string {
  switch (index) {
    case 0:
      return `Collaborative team of developers working on ${title} implementation projects in a modern tech workspace.`;
    case 1:
      return `Project managers reviewing business analytics and strategy details for ${title} services.`;
    case 2:
      return `Close-up view of microchips and circuitry representing technical execution of ${title}.`;
    case 3:
      return `Team brainstorming session at a whiteboard planning ${title} user experience and architecture.`;
    case 4:
      return `Desktop monitor displaying search engine optimization analytics and marketing metrics for ${title}.`;
    case 5:
      return `Secure cloud hosting server racks and database systems powering ${title} services.`;
    case 6:
      return `Business specialists collaborating around a table to optimize ${title} workflows.`;
    case 7:
      return `Software developers writing clean code on multiple monitors to support ${title}.`;
    case 8:
      return `Web developer testing mobile interfaces and programming code for ${title}.`;
    case 9:
      return `Professional planner analyzing business metrics and calendars to scale ${title} deliverables.`;
    case 10:
      return `Engineering workspace with computers showing tech tools and analytics for ${title}.`;
    case 11:
      return `Computer displaying real-time analytics graphs and performance metrics for ${title}.`;
    default:
      return title;
  }
}

function getCapabilityTags(title: string, description: string): string[] {
  const lower = (title + " " + description).toLowerCase();
  const tags: string[] = [];

  if (lower.includes("agent") || lower.includes("autonomous") || lower.includes("bot")) tags.push("Autonomous Workflows");
  if (lower.includes("api") || lower.includes("integration") || lower.includes("connect") || lower.includes("stack")) tags.push("System Integration");
  if (lower.includes("learning") || lower.includes("feedback") || lower.includes("loop") || lower.includes("optim")) tags.push("Feedback Loops");
  if (lower.includes("human") || lower.includes("guardrail") || lower.includes("oversight") || lower.includes("security") || lower.includes("auth")) tags.push("Security & Control");
  if (lower.includes("multi-agent") || lower.includes("orchestrat") || lower.includes("collaborat") || lower.includes("routing")) tags.push("Orchestration");
  if (lower.includes("exception") || lower.includes("error") || lower.includes("resilien") || lower.includes("failover")) tags.push("Resilient Failover");
  if (lower.includes("cloud") || lower.includes("infrastructure") || lower.includes("server") || lower.includes("devops") || lower.includes("database")) tags.push("Cloud Infrastructure");
  if (lower.includes("data") || lower.includes("analytics") || lower.includes("insight") || lower.includes("metric") || lower.includes("report")) tags.push("Data Intelligence");
  if (lower.includes("mobile") || lower.includes("ios") || lower.includes("android") || lower.includes("native") || lower.includes("cross-platform")) tags.push("Mobile Architecture");
  if (lower.includes("web") || lower.includes("ui") || lower.includes("frontend") || lower.includes("responsive") || lower.includes("design")) tags.push("Frontend Performance");
  if (lower.includes("crm") || lower.includes("customer") || lower.includes("support") || lower.includes("ticket") || lower.includes("experience")) tags.push("Customer Experience");
  if (lower.includes("marketing") || lower.includes("campaign") || lower.includes("seo") || lower.includes("traffic") || lower.includes("visibility")) tags.push("Growth & Reach");
  if (lower.includes("testing") || lower.includes("qa") || lower.includes("quality") || lower.includes("validation")) tags.push("Automated QA");

  // Fallback defaults if fewer than 2 tags matched
  if (tags.length < 2) {
    const words = title.split(/[\s&,-]+/).filter((w) => w.length > 3);
    if (words.length >= 2) {
      tags.push(`${words[0]} Architecture`, `${words[1]} Engineering`);
    } else {
      tags.push("Enterprise Ready", "Zero Downtime");
    }
  }

  return Array.from(new Set(tags)).slice(0, 3);
}

export default function CapabilitiesRollingSection({
  capabilities,
  heading = "What This Service Includes",
}: {
  capabilities: CapabilityItem[];
  heading?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(null);
  const [stickyY, setStickyY] = useState<number>(0);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleItemHover = (index: number) => {
    setHoveredIndex(index);
    const itemEl = itemRefs.current[index];
    if (itemEl && listContainerRef.current) {
      const containerRect = listContainerRef.current.getBoundingClientRect();
      const itemRect = itemEl.getBoundingClientRect();
      // Center the floating holographic preview relative to the hovered capability row
      const targetCenterY = itemRect.top - containerRect.top + itemRect.height / 2;
      setStickyY(targetCenterY);
    }
  };

  if (!capabilities || capabilities.length === 0) return null;

  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28 bg-[#F8FEFF] border-y border-cyan-100/60">
      {/* ── Ambient aibizmod Radial Glows & Grid Pattern ── */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(210,247,255,0.7),transparent_42%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-cyan-100/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ── Section Header with aibizmod Branding Badge ── */}
        <AnimatedSection className="mb-14 md:mb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/90 bg-white/90 px-4 py-1.5 shadow-[0_4px_20px_rgba(8,145,178,0.06)] backdrop-blur-md mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
              Core Capabilities & Architecture
            </span>
          </div>

          <h2
            className="font-display font-thin text-[#0F172A] text-balance"
            style={{
              fontSize: "clamp(32px, 4.8vw, 56px)",
              lineHeight: 1.05,
            }}
          >
            {heading}
          </h2>

          <p className="mt-4 text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Engineered capabilities and modular architectures designed to scale your operations with end-to-end reliability.
          </p>
        </AnimatedSection>

        {/* ── Interactive Capabilities List Container ── */}
        <div
          ref={listContainerRef}
          onMouseLeave={() => setHoveredIndex(null)}
          className="group/capabilities relative flex flex-col divide-y divide-cyan-100/80"
        >
          {/* ── Desktop Holographic Intelligence Card (Appears on Hover) ── */}
          <div
            className="pointer-events-none hidden lg:block absolute right-0 xl:right-4 z-30 transition-all duration-300 ease-out"
            style={{
              top: stickyY,
              transform: "translateY(-50%)",
              opacity: hoveredIndex !== null ? 1 : 0,
              visibility: hoveredIndex !== null ? "visible" : "hidden",
            }}
            aria-hidden="true"
          >
            <div
              className={`w-[340px] xl:w-[380px] rounded-[28px] overflow-hidden border border-cyan-300/80 bg-slate-950 shadow-[0_28px_70px_-10px_rgba(8,145,178,0.38),0_0_26px_rgba(6,182,212,0.22)] backdrop-blur-2xl transition-all duration-500 ${
                hoveredIndex !== null
                  ? "scale-100 translate-x-0"
                  : "scale-90 translate-x-4 opacity-0"
              }`}
            >
              {/* Header Bar inside card */}
              <div className="px-4 py-3 border-b border-white/10 bg-slate-900/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[11px] font-mono font-medium tracking-wider text-cyan-300 uppercase">
                    CAPABILITY _{String((hoveredIndex ?? 0) + 1).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[11px] font-sans font-semibold text-white/70">
                  aibiz<span className="text-cyan-400">mod</span>
                </span>
              </div>

              {/* Image Viewport */}
              <div className="relative h-48 xl:h-52 w-full overflow-hidden bg-slate-900">
                {capabilities.map((cap, i) => {
                  const src =
                    cap.image || capabilityImages[i % capabilityImages.length];
                  const alt =
                    cap.imageAlt ||
                    getCapabilityAltText(i % capabilityImages.length, cap.title);
                  const isCurrent = hoveredIndex === i;

                  return (
                    <img
                      key={i}
                      src={src}
                      alt={alt}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isCurrent
                          ? "opacity-100 scale-105"
                          : "opacity-0 scale-100 pointer-events-none"
                      }`}
                      loading="lazy"
                    />
                  );
                })}

                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Bottom title inside image card */}
                {hoveredIndex !== null && (
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-white text-sm font-display font-semibold line-clamp-1">
                      {capabilities[hoveredIndex]?.title}
                    </p>
                    <p className="text-cyan-300/90 text-[11px] font-mono mt-0.5">
                      Production Ready • Fully Managed
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── List of Capability Rows ── */}
          {capabilities.map((cap, index) => {
            const imageSrc =
              cap.image || capabilityImages[index % capabilityImages.length];
            const altText =
              cap.imageAlt ||
              getCapabilityAltText(index % capabilityImages.length, cap.title);
            const tags = cap.tags || getCapabilityTags(cap.title, cap.description);
            const isMobileExpanded = mobileExpandedIndex === index;

            // Resolve custom icon component
            const IconComponent =
              (cap.icon && iconMapLocal[cap.icon]) ||
              iconMapLocal.cpu;

            return (
              <div
                key={cap.title}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onMouseEnter={() => handleItemHover(index)}
                onClick={() =>
                  setMobileExpandedIndex((prev) => (prev === index ? null : index))
                }
                className="project-item group relative py-7 sm:py-9 md:py-11 first:pt-0 last:pb-0 transition-all duration-500 md:group-hover/capabilities:opacity-30 md:hover:!opacity-100 cursor-pointer select-none"
              >
                <div className="flex flex-col">
                  {/* Item Content Row */}
                  <div className="flex items-start gap-3.5 sm:gap-6">
                    {/* aibizmod Illuminated Icon Tile */}
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-sky-500/15 to-blue-500/10 border border-cyan-300/40 flex items-center justify-center text-cyan-600 shadow-sm group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:scale-105 group-hover:text-cyan-700 transition-all duration-300 shrink-0 mt-0.5">
                      <IconComponent className="size-5 sm:size-7 stroke-[2]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Numeric & Category Pill */}
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-[11px] font-bold text-cyan-700 bg-cyan-50/90 border border-cyan-200/80 px-2 py-0.5 rounded-full shadow-xs">
                          _{String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                          Capability
                        </span>
                      </div>

                      {/* Title with Gradient sweep on hover & reveal arrow */}
                      <div className="flex items-center flex-wrap gap-2.5 pt-0.5">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-[#0F172A] leading-tight transition-all duration-500 bg-gradient-to-r from-cyan-600 via-sky-500 to-[#0F172A] from-[50%] to-[50%] bg-[length:200%] bg-right bg-clip-text text-transparent group-hover:bg-left inline-flex items-center">
                          {cap.title}
                        </h3>

                        {/* Arrow indicator that reveals on hover */}
                        <span className="inline-flex text-cyan-600 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out shrink-0">
                          <ArrowUpRight className="size-5 sm:size-6 md:size-7 stroke-[2.5]" />
                        </span>
                      </div>

                      {/* Feature & Tech Tags in aibizmod Pill Badges */}
                      <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-medium">
                        {tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-full text-[11.5px] sm:text-xs font-medium bg-white/80 border border-cyan-200/70 text-cyan-900 shadow-xs group-hover:border-cyan-300 group-hover:bg-cyan-50/90 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Description Text */}
                      <p className="mt-3.5 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                        {cap.description}
                      </p>

                      {/* Mobile Accordion / Tap Preview (Visible on touch/mobile screens) */}
                      <div className="mt-4 lg:hidden">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-700"
                        >
                          <span>{isMobileExpanded ? "Hide Preview" : "View Illustration"}</span>
                          <ChevronDown
                            className={`size-3.5 transition-transform duration-300 ${
                              isMobileExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isMobileExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-3 overflow-hidden rounded-2xl border border-cyan-100/90 shadow-md"
                            >
                              <div className="relative h-48 w-full">
                                <img
                                  src={imageSrc}
                                  alt={altText}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[10px] font-mono backdrop-blur-md bg-slate-950/60 px-2.5 py-1 rounded-full border border-white/20">
                                  <span>CAPABILITY _{String(index + 1).padStart(2, "0")}</span>
                                  <span className="text-cyan-300">aibizmod</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



