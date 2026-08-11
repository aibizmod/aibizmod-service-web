"use client";

import React, { useState } from "react";
import { BrainCircuit, Target, PenTool, Code, ShieldCheck, Megaphone, ArrowRight } from "lucide-react";

interface ProcessItem {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const processItems: ProcessItem[] = [
  {
    number: "01",
    icon: BrainCircuit,
    title: "Discovery",
    description: "Goals, Problems & Ideas",
  },
  {
    number: "02",
    icon: Target,
    title: "Planning",
    description: "Scope, Timeline & Priorities",
  },
  {
    number: "03",
    icon: PenTool,
    title: "Design",
    description: "Screens, Flows & Prototypes",
  },
  {
    number: "04",
    icon: Code,
    title: "Build",
    description: "Frontend, Backend & Integrations",
  },
  {
    number: "05",
    icon: ShieldCheck,
    title: "Review",
    description: "Testing, Fixes & Polish",
  },
  {
    number: "06",
    icon: Megaphone,
    title: "Launch",
    description: "Go-Live & Handover",
  },
];

export default function HowProjectsMoveLovable() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-[#FAF9F6] dark:bg-[#0B0F19] py-8 md:py-12 transition-colors duration-300 overflow-hidden border-t border-slate-200/60 z-20">
      {/* Background mesh glow elements matching Why Work With Us section */}
      <div className="absolute top-1/4 -right-1/4 w-[450px] h-[450px] rounded-full bg-cyan-200/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-1/4 w-[450px] h-[450px] rounded-full bg-blue-200/10 blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 items-center">
        
        {/* Left Column: Heading and Introduction */}
        <div className="flex flex-col items-start text-left lg:sticky lg:top-24">
          <span className="mb-1 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-500">
            How Projects Move
          </span>
          
          <h2 className="mb-2 font-display font-bold text-slate-900 dark:text-white text-3xl sm:text-4xl lg:text-[44px] leading-tight tracking-tight">
            From First Call <br className="hidden md:inline" /> to Launch
          </h2>
          
          <p className="mb-4 text-base sm:text-lg text-slate-650 dark:text-slate-400 leading-relaxed max-w-md">
            We agree on the goal first, break the work into clear stages, and keep you updated until the project is live and handed over.
          </p>

          {/* Self-Contained Glowing Star Button */}
          <button 
            className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-slate-900 dark:bg-slate-950 border border-cyan-500/30 overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_25px_rgba(34,211,238,0.35)] transition-all duration-300 hover:-translate-y-0.5"
          >
            {/* Shimmer overlay */}
            <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(34,211,238,0.15)_45%,transparent_68%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
            
            <span>Get a Quote</span>
            <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right Column: Grid of Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
          
          {/* Timeline connecting lines for desktop */}
          <div className="absolute left-1/2 top-4 bottom-4 w-px bg-slate-100 dark:bg-slate-900/60 hidden sm:block -translate-x-1/2 -z-0" />
          
          {processItems.map((item, index) => {
            const Icon = item.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative w-full rounded-2xl border bg-slate-50 dark:bg-slate-900/30 p-6 md:p-8 transition-all duration-350 cursor-pointer z-10 ${
                  isHovered 
                    ? "border-cyan-500/60 shadow-lg scale-[1.02] bg-white dark:bg-slate-900/80" 
                    : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/20"
                }`}
              >
                {/* Stage number tag */}
                <div className="absolute top-4 right-6 font-mono text-xs font-bold text-slate-400 dark:text-slate-600 transition-colors">
                  {item.number}
                </div>

                {/* Icon Container */}
                <div 
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-350 ${
                    isHovered 
                      ? "bg-cyan-500 border-cyan-400 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]" 
                      : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-cyan-500"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <div className="flex flex-col">
                  <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
