"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/common/AnimatedSection";
import ShaderBackground from "@/components/ui/shader-background";
import ThreeDMarquee from "@/components/ui/3d-marquee";
import { StarButton } from "@/components/ui/star-button";
import { services } from "@/data/services";
import StickyFooterLayout from "@/components/layout/StickyFooterLayout";
import { ArticleCard } from "@/components/ui/blog-post-card";
import NeuralBackground from "@/components/ui/flow-field-background";
import { FlowButton } from "@/components/ui/flow-button";

const serviceImages: Record<string, string> = {
  "web-development":
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
  "software-development":
    "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=900&q=80",
  "mobile-app-development":
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
  "digital-marketing":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  "hosting-infrastructure":
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
  "ai-automation":
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  "customer-experience-management":
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  "it-consulting-it-services":
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
};

const serviceCoverAlts: Record<string, string> = {
  "web-development": "Web development team building responsive web applications using Next.js framework.",
  "software-development": "Software development engineers coding backend database architectures and custom APIs.",
  "mobile-app-development": "Mobile app developer testing cross-platform user interfaces on a smartphone.",
  "digital-marketing": "Search engine optimization specialist analyzing website search marketing traffic data.",
  "hosting-infrastructure": "Data center server racks representing secure cloud hosting infrastructure services.",
  "ai-automation": "Microchip hardware components representing business process workflow automation setup.",
  "customer-experience-management": "Team collaborating around client communications to improve customer experience management.",
  "it-consulting-it-services": "IT consulting specialist whiteboard mapping technology solutions and IT systems strategy.",
};

const marqueeImages = services
  .map((service) => serviceImages[service.id])
  .filter(Boolean)
  .concat([
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
  ]);

export default function ServicesPageContent() {
  const [hoveredCardRect, setHoveredCardRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const handleCardMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const cardEl = e.currentTarget;
    const canvasContainerEl = document.getElementById("service-list");
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
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink">

          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section className="relative isolate overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-36">
            <ShaderBackground className="absolute inset-0 z-0 h-full w-full opacity-80" />
            <div
              className="pointer-events-none absolute left-1/2 top-24 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <AnimatedSection>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md">
                  <Sparkles size={14} aria-hidden="true" />
                  What We Offer
                </span>
                <h1
                  className="mt-7 max-w-3xl font-display font-thin text-[#0F172A] text-balance"
                  style={{ fontSize: "clamp(40px, 6vw, 76px)", lineHeight: 1.02 }}
                >
                  Services Built for{" "}
                  <span className="gradient-text font-normal">Connected</span>{" "}
                  Growth
                </h1>
                <p className="mt-6 max-w-2xl rounded-2xl border border-white/70 bg-white/45 px-6 py-4 text-base leading-8 text-slate-600 shadow-[0_18px_55px_rgba(59,130,246,0.12)] backdrop-blur-md md:text-lg">
                  Strategy, engineering, infrastructure, AI & automation, and growth
                  systems shaped around practical business outcomes.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/contact" aria-label="Start a project">
                    <StarButton
                      as="span"
                      lightColor="#38bdf8"
                      backgroundColor="#0f172a"
                      className="h-12 font-semibold shadow-[0_0_12px_rgba(56,189,248,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(6,182,212,0.55),0_0_4px_rgba(56,189,248,0.7)]"
                    >
                      Start a Project
                      <ArrowRight size={16} aria-hidden="true" />
                    </StarButton>
                  </Link>
                  <Link
                    href="#service-list"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-cyan-100 bg-white/55 px-6 text-sm font-semibold text-[#0F172A] shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur-md transition hover:border-cyan-200 hover:bg-white"
                  >
                    Explore Services
                  </Link>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right">
                <ThreeDMarquee images={marqueeImages} className="h-[31rem] max-lg:h-[24rem]" />
              </AnimatedSection>
            </div>
          </section>

          {/* ── Service List ─────────────────────────────────────────────── */}
          <section
            id="service-list"
            className="relative isolate overflow-hidden px-6 py-24 bg-white"
          >
            {/* Interactive Flow Field Background */}
            <NeuralBackground
              className="absolute inset-0 -z-10"
              color="#22d3ee" // Cyan-400
              trailOpacity={0.16} // Subtle trails
              particleCount={950} // Elegant and clean density
              speed={1.6} // Rhythmic, smooth movement speed
              theme="light"
              hoveredCardRect={hoveredCardRect}
            />

            {/* Grid & Radial Gradient overlay on top of canvas */}
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_0%,rgba(210,247,255,0.58),transparent_34%)]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(15, 23, 42, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.055) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
              }}
              aria-hidden="true"
            />

            <div className="relative mx-auto max-w-7xl">
              <AnimatedSection className="mx-auto max-w-3xl text-center">
                <span className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
                  Service Stack
                </span>
                <h2
                  className="mt-5 font-display font-thin text-[#0F172A] text-balance"
                  style={{ fontSize: "clamp(34px, 5vw, 58px)", lineHeight: 1.08 }}
                >
                  Choose the Capability Your Business Needs Next
                </h2>
              </AnimatedSection>

              <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
                {services.map((service, index) => {
                  const image = serviceImages[service.id];

                  return (
                    <AnimatedSection key={service.id} delay={index * 0.06} className="w-full flex justify-center">
                      <Link
                        href={service.href}
                        onMouseEnter={handleCardMouseEnter}
                        onMouseLeave={handleCardMouseLeave}
                        className="group flex w-full max-w-sm h-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.01] [&_.relative.h-56]:overflow-hidden [&_.relative.h-56]:rounded-2xl [&_.relative.h-56_img]:transition-transform [&_.relative.h-56_img]:duration-500 [&_.relative.h-56_img]:ease-out group-hover:[&_.relative.h-56_img]:scale-105"
                        style={{ perspective: "1000px" }}
                      >
                        <ArticleCard
                          cover={image}
                          coverAlt={serviceCoverAlts[service.id]}
                          headline={service.name}
                          excerpt={service.description}
                          clampLines={4}
                          className="h-full border border-cyan-100/80 [&_h2]:text-navy shadow-[0_12px_36px_-6px_rgba(10,22,40,0.08),0_4px_16px_-4px_rgba(8,145,178,0.04)] hover:shadow-[0_36px_72px_-12px_rgba(10,22,40,0.28),0_12px_32px_-8px_rgba(8,145,178,0.18)] hover:border-cyan-200/90 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        >
                          <div className="flex justify-start">
                            <FlowButton
                              as="span"
                              text="Explore"
                              className="px-6 py-2 text-xs"
                            />
                          </div>
                        </ArticleCard>
                      </Link>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── CTA ──────────────────────────────────────────────────────── */}
          <section className="relative overflow-hidden bg-white px-6 py-24">
            <div className="mx-auto max-w-4xl rounded-[32px] border border-cyan-100 bg-[#ECFEFF]/70 p-8 text-center shadow-[0_22px_70px_rgba(8,145,178,0.12)] backdrop-blur-md md:p-12">
              <AnimatedSection>
                <h2
                  className="font-display font-thin text-[#0F172A]"
                  style={{ fontSize: "clamp(30px, 4.5vw, 48px)", lineHeight: 1.1 }}
                >
                  Ready to Achieve More?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 md:text-base">
                  We partner with ambitious companies to solve complex challenges, improve operations and deliver real results using tailored digital solutions.
                </p>
                <div className="mt-8 flex justify-center">
                  <Link href="/contact" aria-label="Start a project">
                    <StarButton
                      as="span"
                      lightColor="#38bdf8"
                      backgroundColor="#0f172a"
                      className="h-12 font-semibold shadow-[0_0_12px_rgba(56,189,248,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(6,182,212,0.55),0_0_4px_rgba(56,189,248,0.7)]"
                    >
                      Start a Project
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
