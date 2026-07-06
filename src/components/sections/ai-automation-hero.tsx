"use client";

import React from "react";
import {
  ContainerScroll,
  ContainerSticky,
  ContainerAnimated,
} from "@/components/blocks/animated-video-on-scroll";
import CapabilityShowcase from "@/components/sections/CapabilityShowcase";

export default function AIAutomationHero() {
  return (
    <div 
      id="ai-section" 
      className="relative w-full overflow-hidden text-slate-900 border-t border-b border-slate-200/50"
      style={{
        background: "linear-gradient(180deg, #F8FEFF 0%, #F5FAFB 100%)",
      }}
    >
      {/* Background Radial Gradient & Glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(60% 60% at 50% 25%, rgba(8, 145, 178, 0.09) 0%, rgba(8, 145, 178, 0.02) 60%, transparent 100%)",
        }}
      />

      <ContainerScroll>
        <ContainerSticky className="z-10 pt-6 md:pt-8 lg:pt-10 pb-0">
          <div className="max-w-7xl mx-auto px-6 w-full md:h-full h-auto flex flex-col items-center relative">
            
            {/* Top Spacer to absorb vertical space on tall viewports */}
            <div className="hidden md:block md:flex-grow" />

            {/* Header Text Area */}
            <ContainerAnimated className="text-center flex flex-col items-center pt-2">
              {/* <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#0891B2] mb-3">
                AI & Automation
              </span> */}
              {/* <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-thin tracking-tighter text-[#0F172A] max-w-3xl leading-[1.1] mb-3">
                Intelligent Systems for the Work That Matters
              </h1> */}
              {/* <p className="text-stone-600 font-sans text-sm sm:text-base max-w-[50ch] leading-relaxed mb-4">
                A focused suite of AI and automation services — designed for businesses that want practical, production-ready intelligent systems.
              </p> */}
              {/* <HeroButton 
                onClick={handleScrollToShowcase}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold"
              >
                See our AI services
              </HeroButton> */}
            </ContainerAnimated>

            {/* Gap Spacer between button and video */}
            <div className="h-6 md:h-8 flex-shrink-0" />

            {/* Video Mockup Area
            <div className="w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto flex justify-center items-center relative flex-shrink-0">
              <ContainerInset className="w-full aspect-video overflow-hidden rounded-2xl border border-slate-200/80 shadow-2xl shadow-slate-900/10">
                <HeroVideo 
                  src="/videos/ai-hero.mp4#t=3" 
                  startTime={3}
                  scrollControlled={true}
                  className="w-full h-full object-cover"
                />
              </ContainerInset>
            </div>
            */}

            {/* Bottom Spacer to anchor the gap on tall viewports */}
            <div className="hidden md:block h-8 md:h-12 lg:h-16 flex-shrink-0" />

          </div>
        </ContainerSticky>
      </ContainerScroll>

      {/* 2. Capabilities & Showcases (Replaced with the new interactive 3D showcase component) */}
      <CapabilityShowcase />
    </div>
  );
}
