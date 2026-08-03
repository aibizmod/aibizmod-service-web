"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Cpu, Eye, Database, Sparkles, ArrowRight, Check } from "lucide-react";

interface ServiceItem {
  id: string;
  label: string;
  title: string;
  headline: string;
  desc: string;
  tags: string[];
  color: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

const services: ServiceItem[] = [
  {
    id: "visibility",
    label: "AI Visibility",
    title: "AI Visibility Audit",
    headline: "See Where AI Already Sees You",
    desc: "We analyse how your business appears across AI-powered search tools — ChatGPT, Perplexity, Google AI Overview — and identify the gaps that cost you visibility, trust, and leads.",
    tags: ["AI search presence", "Schema audit", "Content gap ID", "Visibility roadmap"],
    color: "#22d3ee",
    icon: Search
  },
  {
    id: "ml",
    label: "AI & ML",
    title: "AI & Machine Learning",
    headline: "Models Built for Your Business",
    desc: "We design, train, and deploy custom machine learning models and intelligent agents that connect to your data, automate decisions, and drive measurable outcomes.",
    tags: ["Custom ML models", "Agent workflows", "Predictive analytics", "Model monitoring"],
    color: "#60a5fa",
    icon: Cpu
  },
  {
    id: "deep",
    label: "Deep Learning",
    title: "Deep Learning",
    headline: "Vision, Speech & Complex Signals",
    desc: "We build deep learning systems for computer vision, speech recognition, anomaly detection, and other pattern-heavy problems that classic ML alone cannot solve.",
    tags: ["Computer vision", "Neural architecture", "Anomaly detection", "Transfer learning"],
    color: "#a78bfa",
    icon: Eye
  },
  {
    id: "llm",
    label: "LLM",
    title: "LLM Integration",
    headline: "Language Power, Connected to Your Stack",
    desc: "We integrate large language models like GPT-4, Claude, and Gemini into your products and operations — with RAG pipelines, fine-tuning, and domain-specific knowledge bases.",
    tags: ["RAG pipelines", "Fine-tuning", "Internal tools", "On-premise deploy"],
    color: "#34d399",
    icon: Database
  },
  {
    id: "gen",
    label: "Gen AI",
    title: "Generative AI",
    headline: "Create, Not Just Automate",
    desc: "We build generative AI pipelines for content, code, media, and product workflows — helping you move faster, personalise at scale, and automate creative output.",
    tags: ["Content generation", "Media synthesis", "Code tooling", "Multimodal builds"],
    color: "#fb923c",
    icon: Sparkles
  }
];

export default function CapabilitiesLovable() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const DURATION = 6000; // 6 seconds per tab
  const STEP = 50; // Progress bar tick duration in ms

  useEffect(() => {
    if (isHovered) {
      if (progressInterval.current) clearInterval(progressInterval.current);
      return;
    }

    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActive((current) => (current + 1) % services.length);
          return 0;
        }
        return prev + (100 * STEP) / DURATION;
      });
    }, STEP);

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [active, isHovered]);

  const selectService = (index: number) => {
    setActive(index);
    setProgress(0);
  };

  const currentService = services[active];

  return (
    <section className="w-full relative py-16 md:py-24 overflow-hidden bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-500">
            Our Capabilities
          </span>
          <h2 className="font-display text-slate-900 dark:text-white text-3xl sm:text-4xl lg:text-[44px] font-bold leading-tight tracking-tight mt-3 mb-4">
            Tailored AI &amp; Automation Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-[600px] mx-auto">
            From visibility audits to custom LLM integrations and machine learning pipelines, we build systems designed for real business outcomes.
          </p>
          <button className="mt-6 px-6 py-3 text-sm font-semibold rounded-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            See our AI services
          </button>
        </div>

        {/* Tab Controls Bar */}
        <div className="flex gap-2 justify-center flex-wrap mb-8">
          {services.map((service, index) => {
            const isActive = index === active;
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => selectService(index)}
                className={`relative flex items-center gap-2 px-5 py-3 rounded-full border border-slate-200 dark:border-slate-800 text-sm font-semibold cursor-pointer overflow-hidden transition-all duration-300 ${
                  isActive 
                    ? "text-white shadow-md animate-pulse" 
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
                style={{
                  backgroundColor: isActive ? service.color : undefined,
                }}
              >
                {/* Active state slide progress indicator */}
                {isActive && (
                  <span
                    className="absolute left-0 top-0 bottom-0 z-0 bg-black/10 origin-left transition-transform duration-75"
                    style={{
                      width: "100%",
                      transform: `scaleX(${progress / 100})`,
                    }}
                  />
                )}
                
                <Icon className={`w-4 h-4 relative z-10 ${isActive ? "text-white" : "text-slate-500"}`} />
                <span className="relative z-10 font-sans">{service.label}</span>
              </button>
            );
          })}
        </div>

        {/* Visual Stage Card */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative bg-slate-900 dark:bg-slate-950 border border-slate-800 rounded-[32px] p-6 sm:p-8 md:p-12 overflow-hidden min-h-[480px] flex flex-col justify-center"
        >
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle, #22d3ee 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Color ambient back-glow */}
          <div 
            className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] opacity-40 transition-all duration-700"
            style={{ backgroundColor: currentService.color }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center relative z-10">
            {/* Content Pane */}
            <div className="flex flex-col items-start text-left">
              {/* Badge Title */}
              <div
                className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border mb-4 font-sans"
                style={{
                  color: currentService.color,
                  backgroundColor: `${currentService.color}15`,
                  borderColor: `${currentService.color}35`,
                }}
              >
                {currentService.title}
              </div>

              {/* Headline */}
              <h3 className="font-display font-bold text-white text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4">
                {currentService.headline}
              </h3>

              {/* Description */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-[52ch] mb-6 font-sans">
                {currentService.desc}
              </p>

              {/* Pill Tags Row */}
              <div className="flex flex-wrap gap-2 mb-6 font-sans">
                {currentService.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
                  >
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color: currentService.color }} />
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Link */}
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold group transition-all duration-300"
                style={{ color: currentService.color }}
              >
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Visual Pane Placeholder (Ready for Scroll/Mouse/3D interaction in Lovable) */}
            <div className="flex items-center justify-center h-[260px] lg:h-[320px] relative">
              <div 
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-dashed flex items-center justify-center relative transition-all duration-700"
                style={{ borderColor: `${currentService.color}40`, boxShadow: `0 0 40px ${currentService.color}15` }}
              >
                {/* Rotating ring effect */}
                <div 
                  className="absolute inset-2 rounded-full border border-solid animate-spin opacity-45"
                  style={{ 
                    borderTopColor: currentService.color, 
                    borderRightColor: "transparent",
                    borderBottomColor: "transparent",
                    borderLeftColor: "transparent",
                    animationDuration: "8s"
                  }}
                />
                
                {/* Orbiting element */}
                <div 
                  className="absolute w-4 h-4 rounded-full -top-2 left-1/2 -ml-2"
                  style={{ backgroundColor: currentService.color }}
                />

                {/* Big Center Icon */}
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center shadow-inner transition-all duration-500"
                  style={{ backgroundColor: `${currentService.color}10` }}
                >
                  {React.createElement(currentService.icon, {
                    className: "w-10 h-10 transition-colors duration-500",
                    style: { color: currentService.color }
                  })}
                </div>

                {/* Technical grid coordinates */}
                <div className="absolute -bottom-8 left-0 right-0 text-center font-mono text-[10px] text-slate-500 dark:text-slate-400">
                  SYSTEM_STATUS: ACTIVE // VAL: {progress.toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Indicator Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {services.map((service, index) => {
            const isActive = index === active;
            return (
              <button
                key={service.id}
                onClick={() => selectService(index)}
                className={`h-2 rounded-full transition-all duration-300 ${isActive ? "w-8" : "w-2 bg-slate-300 dark:bg-slate-700"}`}
                style={{
                  backgroundColor: isActive ? service.color : undefined,
                }}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
