"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";
import { ArticleCard } from "@/components/ui/blog-post-card";
import NeuralBackground from "@/components/ui/flow-field-background";
import { industries } from "@/data/industries";
import { SECTORS } from "@/data/industry-artworks";

export default function IndustryGridDirectory() {
  const [selectedSector, setSelectedSector] = useState("all");
  const [hoveredCardRect, setHoveredCardRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  // Filtered industries
  const filteredIndustries = useMemo(() => {
    if (selectedSector === "all") return industries;
    const sector = SECTORS.find((s) => s.id === selectedSector);
    if (!sector || !sector.slugs) return industries;
    return industries.filter((ind) => sector.slugs?.includes(ind.slug));
  }, [selectedSector]);

  const handleCardMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const cardEl = e.currentTarget;
    const canvasContainerEl = document.getElementById("industry-directory");
    if (!cardEl || !canvasContainerEl) return;

    const cardRect = cardEl.getBoundingClientRect();
    const containerRect = canvasContainerEl.getBoundingClientRect();

    setHoveredCardRect({
      x: cardRect.left - containerRect.left,
      y: cardRect.top - containerRect.top,
      width: cardRect.width,
      height: cardRect.height,
    });
  };

  const handleCardMouseLeave = () => {
    setHoveredCardRect(null);
  };

  return (
    <>
      <section id="industry-directory" className="relative isolate overflow-hidden px-6 py-20 bg-white border-t border-cyan-100/70">
        {/* Interactive Flow Canvas Background */}
        <NeuralBackground
          className="absolute inset-0 -z-10 opacity-70"
          color="#22d3ee"
          trailOpacity={0.14}
          particleCount={800}
          speed={1.3}
          theme="light"
          hoveredCardRect={hoveredCardRect}
        />

        {/* Grid Pattern Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-100/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800 shadow-sm backdrop-blur-md mb-3">
                <Sparkles size={13} className="text-cyan-600" />
                Industry Architecture Blueprints
              </div>
              <h2
                className="font-display font-thin text-primary leading-[1.1] text-balance"
                style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
              >
                Explore Solutions <span className="font-normal text-foreground">by Industry</span>
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-xl">
                Inspect tailored architectures, solved operational bottlenecks, and production-ready AI pipelines for your sector.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-4 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
              Showing {filteredIndustries.length} of {industries.length} Industries
            </div>
          </div>

          {/* Sector Category Filter Tabs */}
          <div className="mb-10 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {SECTORS.map((sector) => {
              const isActive = selectedSector === sector.id;
              const count =
                sector.id === "all"
                  ? industries.length
                  : industries.filter((ind) => sector.slugs?.includes(ind.slug)).length;

              return (
                <button
                  key={sector.id}
                  onClick={() => setSelectedSector(sector.id)}
                  className={`group inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#0F172A] text-white shadow-md shadow-slate-900/15"
                      : "border border-cyan-100/90 bg-white/90 text-slate-600 hover:border-cyan-300 hover:bg-cyan-50/60 hover:text-[#0F172A]"
                  }`}
                >
                  <span>{sector.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-cyan-100 group-hover:text-cyan-800"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── COMPLETE 3-COLUMN CARD GRID ──────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
            {filteredIndustries.map((ind) => {
              // High-Definition Cinematic Symbolic Cover
              const coverNode = (
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-slate-950">
                  <img
                    src={ind.heroImage}
                    alt={ind.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 opacity-85"
                    loading="lazy"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/25 to-transparent" />
                  
                  {/* Top glassmorphic sector badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-900/75 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-md shadow-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      {ind.slug.replace("-", " ")}
                    </span>
                  </div>

                  {/* Bottom headline inside the image */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-white/95 drop-shadow">
                      Architecture Blueprint
                    </span>
                    <span className="text-[10px] font-mono text-cyan-300 drop-shadow font-semibold">
                      0{ind.challenges.length} Solved Areas
                    </span>
                  </div>
                </div>
              );

              return (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  onMouseEnter={handleCardMouseEnter}
                  onMouseLeave={handleCardMouseLeave}
                  className="group flex w-full max-w-sm h-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.01] [&_.relative.h-56]:overflow-hidden [&_.relative.h-56]:rounded-2xl"
                  style={{ perspective: "1000px" }}
                >
                  <ArticleCard
                    coverNode={coverNode}
                    headline={ind.name}
                    excerpt={ind.tagline}
                    clampLines={3}
                    className="h-full border border-cyan-100/80 [&_h2]:text-navy shadow-[0_12px_36px_-6px_rgba(10,22,40,0.08),0_4px_16px_-4px_rgba(8,145,178,0.04)] hover:shadow-[0_36px_72px_-12px_rgba(10,22,40,0.28),0_12px_32px_-8px_rgba(8,145,178,0.18)] hover:border-cyan-200/90 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  >
                    <div className="space-y-4">
                      {/* Capabilities Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {ind.services.slice(0, 3).map((svc) => (
                          <span
                            key={svc.name}
                            className="inline-flex items-center rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700 border border-slate-200/80 group-hover:border-cyan-200 group-hover:bg-cyan-50/50 group-hover:text-cyan-800 transition-colors"
                          >
                            {svc.name}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <FlowButton as="span" text="Explore Sector" className="px-5 py-2 text-xs" />
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 group-hover:text-cyan-700 transition-colors">
                          {ind.challenges.length} Solved Areas
                          <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </ArticleCard>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
