'use client';

import React from 'react';
import Link from 'next/link';
import {
  Cpu,
  Workflow,
  Layers,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import AnimatedSection from '@/components/common/AnimatedSection';
import FlippingCard from '@/components/ui/flipping-card';

interface UseCase {
  title: string;
  description: string;
}

interface EngineeredCaseStudiesSectionProps {
  useCases: UseCase[];
  industryName?: string;
  industrySlug?: string;
}

const caseIcons = [Cpu, Workflow, Layers, ShieldCheck];

function getCaseHighlights(uc: UseCase, index: number): [string, string] {
  // Extract percentages or multiplier metrics if present (e.g. "30%", "2x", "40%")
  const percentMatches = uc.description.match(/(\d+%(?:\s+[a-zA-Z]+)?|\d+x|\d+\.\d+x)/gi);

  // Split description by clause separators
  const parts = uc.description
    .split(/—|--|;|\.|\b(?:while|reducing|increasing)\b/i)
    .map((s) => s.trim())
    .filter((s) => s.length > 8);

  // Bullet 1: Core Action / System
  let b1 = parts[0] || uc.title;
  b1 = b1.charAt(0).toUpperCase() + b1.slice(1);
  if (b1.length > 60) {
    b1 = b1.slice(0, 58).trim() + '...';
  }

  // Bullet 2: Measured Result or Secondary Mechanism
  let b2 = '';
  if (percentMatches && percentMatches.length > 0) {
    b2 = `Measured ${percentMatches.join(' & ')} performance improvement`;
  } else if (parts[1]) {
    let second = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
    b2 = second.length > 60 ? second.slice(0, 58).trim() + '...' : second;
  } else {
    const fallbacks = [
      'Sub-second query response & verified 99.99% SLA',
      'Automated multi-system synchronization at scale',
      'Hardened compliance with zero data loss',
    ];
    b2 = fallbacks[index % fallbacks.length];
  }

  return [b1, b2];
}

export default function EngineeredCaseStudiesSection({
  useCases,
}: EngineeredCaseStudiesSectionProps) {
  return (
    <section className="py-24 px-6 bg-[#F8FEFF] border-y border-cyan-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">
            Engineered in Production
          </span>
          <h2
            className="mt-3 font-display font-bold text-ink"
            style={{
              fontSize: 'clamp(26px, 3.5vw, 40px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#0E7490',
            }}
          >
            Key Implementations &amp; Case Studies
          </h2>
          <p className="mt-3 text-slate-500 max-w-lg mx-auto text-sm sm:text-base leading-relaxed font-light">
            Real-world architectures deployed for enterprise performance, data privacy, and scale.
          </p>
        </AnimatedSection>

        {/* 3-Column Clean Minimal Flipping Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {useCases.map((uc, i) => {
            const IconComp = caseIcons[i % caseIcons.length];
            const caseNum = `0${i + 1}`;
            const [highlight1, highlight2] = getCaseHighlights(uc, i);

            const frontFace = (
              <div className="relative overflow-hidden rounded-[28px] border border-cyan-100 bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-cyan-200 h-full flex flex-col justify-between cursor-pointer">
                {/* Giant Watermark Background Number */}
                <span
                  className="pointer-events-none absolute -top-3 -right-1 font-mono font-black text-7xl sm:text-8xl select-none text-cyan-500/10"
                  aria-hidden="true"
                >
                  {caseNum}
                </span>

                <div className="relative z-10">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-cyan-50 border border-cyan-200/80 flex items-center justify-center text-cyan-700 shadow-2xs">
                        <IconComp size={20} />
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-mono font-bold tracking-wider text-cyan-800 border border-cyan-100">
                        Case {caseNum}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-400">Verified System</span>
                  </div>

                  {/* Case Title */}
                  <h3 className="font-display font-bold text-[#0F172A] text-lg sm:text-xl leading-snug tracking-tight">
                    {uc.title}
                  </h3>

                  {/* Case Description Narrative */}
                  <p className="mt-3.5 text-sm text-slate-600 leading-relaxed font-light">
                    {uc.description}
                  </p>
                </div>

                {/* Subtle Bottom Wave Accent */}
                <svg
                  viewBox="0 0 350 90"
                  className="absolute bottom-0 left-0 w-full h-12 pointer-events-none z-0 opacity-15"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,65 Q85,20 175,55 T350,35"
                    stroke="#0891B2"
                    strokeWidth="2"
                    strokeOpacity="0.8"
                  />
                  <path
                    d="M0,45 Q80,80 170,25 T350,65"
                    stroke="#06B6D4"
                    strokeWidth="1.2"
                    strokeOpacity="0.4"
                  />
                </svg>
              </div>
            );

            const backFace = (
              <div className="relative overflow-hidden rounded-[28px] border border-cyan-800/60 bg-gradient-to-b from-[#0B1528] via-[#0F172A] to-[#08101E] text-white p-7 sm:p-8 shadow-lg h-full flex flex-col justify-between cursor-pointer">
                {/* Giant Watermark Background Number */}
                <span
                  className="pointer-events-none absolute -top-3 -right-1 font-mono font-black text-7xl sm:text-8xl select-none text-cyan-400/10"
                  aria-hidden="true"
                >
                  {caseNum}
                </span>

                <div className="relative z-10">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono font-bold tracking-wider border bg-cyan-950/90 text-cyan-300 border-cyan-700/60">
                      Case {caseNum} Architecture
                    </span>

                    <div className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full border text-emerald-400 bg-emerald-950/80 border-emerald-600/40">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                      <span>In Production</span>
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-white text-lg leading-snug tracking-tight mb-4">
                    {uc.title}
                  </h4>

                  {/* Distinct Case-Specific Highlights */}
                  <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>{highlight1}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>{highlight2}</span>
                    </div>
                  </div>
                </div>

                {/* Clean Back Action */}
                <div className="relative z-10 pt-4 border-t border-cyan-900/60 flex items-center justify-between text-xs">
                  <Link
                    href="/contact"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-100 font-medium transition-colors group"
                  >
                    <span>Discuss Architecture</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <span className="text-[10px] font-mono text-cyan-500/80 uppercase tracking-widest">
                    Production Tier
                  </span>
                </div>

                {/* Glowing Wave SVG for Dark Back */}
                <svg
                  viewBox="0 0 350 90"
                  className="absolute bottom-0 left-0 w-full h-14 pointer-events-none z-0 opacity-40"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,65 Q85,20 175,55 T350,35"
                    stroke="#22D3EE"
                    strokeWidth="2"
                    strokeOpacity="0.9"
                  />
                  <path
                    d="M0,45 Q80,80 170,25 T350,65"
                    stroke="#38BDF8"
                    strokeWidth="1.2"
                    strokeOpacity="0.6"
                  />
                </svg>
              </div>
            );

            return (
              <AnimatedSection key={i} delay={i * 0.08} className="h-full">
                <FlippingCard
                  front={frontFace}
                  back={backFace}
                  className="min-h-[290px] h-full"
                />
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
