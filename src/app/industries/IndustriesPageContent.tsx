"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, Building2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyFooterLayout from "@/components/layout/StickyFooterLayout";
import AnimatedSection from "@/components/common/AnimatedSection";
import ScrollMorphHero, { MorphHeroItem } from "@/components/ui/scroll-morph-hero";
import IndustrySnappyExplorer from "@/components/industries/IndustrySnappyExplorer";
import { StarButton } from "@/components/ui/star-button";
import { industries } from "@/data/industries";

export default function IndustriesPageContent() {
  // Convert industries into 3D Morph Hero items (20 total for the circular showcase)
  const heroItems: MorphHeroItem[] = useMemo(() => {
    return industries.slice(0, 20).map((ind) => ({
      src: ind.heroImage,
      title: ind.name,
      category: ind.slug.replace("-", " "),
      description: ind.tagline,
      href: `/industries/${ind.slug}`,
      slug: ind.slug,
    }));
  }, []);

  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink min-h-screen">
          {/* ── Top Header & Breadcrumb Bar ───────────────────────────────── */}
          <div className="pt-28 pb-4 px-6 bg-gradient-to-b from-[#F0FDFF] to-[#F0FDFF]/60 border-b border-cyan-100/60">
            <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <nav
                className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-cyan-100 bg-white/70 px-4 py-1.5 text-[13px] text-slate-500 shadow-sm backdrop-blur-md"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="transition-colors hover:text-[#0F172A]">
                  Home
                </Link>
                <ChevronRight size={13} className="shrink-0 text-cyan-400" aria-hidden="true" />
                <span className="font-semibold text-[#0F172A]" aria-current="page">
                  Industries
                </span>
              </nav>

              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
                <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                20+ Enterprise Industry Architectures
              </div>
            </div>
          </div>

          {/* ── 3D Scroll Morph Hero Showcase ─────────────────────────────── */}
          <section className="relative isolate overflow-hidden">
            <ScrollMorphHero items={heroItems} />
          </section>

          {/* ── Full 3-Column Card Grid Directory ─────────────────────────── */}
          <IndustrySnappyExplorer />

          {/* ── Credibility & Architecture Standards ───────────────────────── */}
          <section className="px-6 py-12 bg-slate-50/60 border-y border-cyan-100/80">
            <div className="max-w-6xl mx-auto grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-cyan-100/80 bg-white p-4 shadow-sm text-center">
                <p className="font-display text-2xl font-bold text-[#0F172A]">20+</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Specialized Verticals</p>
              </div>
              <div className="rounded-2xl border border-cyan-100/80 bg-white p-4 shadow-sm text-center">
                <p className="font-display text-2xl font-bold text-[#0F172A]">Zero</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Generic Templates</p>
              </div>
              <div className="rounded-2xl border border-cyan-100/80 bg-white p-4 shadow-sm text-center">
                <p className="font-display text-2xl font-bold text-[#0F172A]">Enterprise</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Grade Compliance</p>
              </div>
              <div className="rounded-2xl border border-cyan-100/80 bg-white p-4 shadow-sm text-center">
                <p className="font-display text-2xl font-bold text-[#0F172A]">Production</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Ready AI Workflows</p>
              </div>
            </div>
          </section>

          {/* ── Custom Industry Consult CTA ─────────────────────────────── */}
          <section className="relative overflow-hidden bg-white px-6 py-20">
            <div className="mx-auto max-w-4xl rounded-[32px] border border-cyan-100 bg-[#ECFEFF]/70 p-8 text-center shadow-[0_22px_70px_rgba(8,145,178,0.12)] backdrop-blur-md md:p-12">
              <AnimatedSection>
                <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-200/80 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800 shadow-sm mb-4">
                  <Building2 size={14} className="text-cyan-600" />
                  Custom Architecture
                </div>

                <h2
                  className="font-display font-thin text-[#0F172A]"
                  style={{
                    fontSize: "clamp(28px, 4vw, 44px)",
                    lineHeight: 1.1,
                  }}
                >
                  Don&apos;t See Your Exact Sector?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
                  We build cross-sector software architectures and custom AI pipelines. Tell us about your operational constraints, tech stack, and goals — we will engineer the exact solution.
                </p>
                <div className="mt-8 flex justify-center">
                  <Link href="/contact" aria-label="Schedule a consultation">
                    <StarButton
                      as="span"
                      lightColor="#38bdf8"
                      backgroundColor="#0f172a"
                      className="h-12 font-semibold shadow-[0_0_12px_rgba(56,189,248,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(6,182,212,0.55),0_0_4px_rgba(56,189,248,0.7)]"
                    >
                      Consult an Industry Architect
                      <ArrowRight size={16} aria-hidden="true" />
                    </StarButton>
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
