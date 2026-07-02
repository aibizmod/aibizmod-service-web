"use client";

import {
  Target, Lightbulb, Users,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/common/AnimatedSection";
import ShaderBackground from "@/components/ui/shader-background";
// import {
//   CardTransformed,
//   CardsContainer,
//   ContainerScroll,
// } from "@/components/ui/animated-cards-stack";
import { LogoCloud } from "@/components/ui/logo-cloud-3";


// ─── Data ─────────────────────────────────────────────────────────────────────

interface Value { image: string; name: string; alt: string; desc: string; }

const values: Value[] = [
  { image: "/about/values/client-first.jpg",      name: "Client First",      alt: "Team collaborating in a client-first web development planning session to align business goals.",      desc: "We ask what the client actually needs before we ask what we can build. The outcome matters more than the solution we already knew." },
  { image: "/about/values/say-it-straight.jpg",   name: "Say It Straight",   alt: "Professional group in an honest project review discussing digital strategy timelines and estimates.",   desc: "We tell you what we actually think. Honest estimates, honest timelines, and honest feedback when something is not going to plan." },
  { image: "/about/values/build-to-last.jpg",     name: "Build to Last",     alt: "Close-up of keyboard and monitor with code showing built-to-last software engineering practices.",     desc: "We would rather spend an extra day getting it right than a month fixing it later. Good work holds up. Rushed work does not." },
  { image: "/about/values/stay-curious.jpg",      name: "Stay Curious",      alt: "Software developer researching new technologies at a clean desk workspace to stay innovative.",      desc: "We have changed our minds about things and we will again. Staying curious is the only way to stay useful to the people we work with." },
  { image: "/about/values/work-together.jpg",     name: "Work Together",     alt: "Collaborative brainstorm session where engineers and designers discuss software solution architectures.",     desc: "We are not here to nod and execute. We push back when something does not add up and bring our own thinking to every conversation." },
  { image: "/about/values/results-not-hours.jpg", name: "Results Not Hours", alt: "Analytics dashboard on screen displaying key performance indicators and successful project outcome metrics.", desc: "We care whether it worked, not whether it kept us busy. Every project starts with a clear picture of what success looks like." },
];

const logos = [
  { src: "/clients/spacelean.png", alt: "SpaceLean company branding logo representing strategic partnership" },
  { src: "/clients/pmspace.png", alt: "PMSpace brand logo representing corporate collaboration" },
  { src: "/clients/spaceapp.png", alt: "SpaceApp tech company logo showing client integration" },
  { src: "/clients/spacesign.png", alt: "SpaceSign enterprise client logo showing platform integration" },
  { src: "/clients/spacehr.png", alt: "SpaceHR organization logo showing human resource management client" },
  { src: "/clients/texastech.svg", alt: "Texas Tech Services enterprise logo representing technology sector partner" },
];

// ─── Main export ──────────────────────────────────────────────────────────────

export default function AboutPageContent() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white px-6 pb-20 pt-32 md:pt-36">
        <ShaderBackground className="absolute inset-0 z-0 h-full w-full opacity-80" />

        <div
          className="pointer-events-none absolute left-1/2 top-28 z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md">
                <Users size={14} aria-hidden="true" />
                About Us
              </span>
              <h1
                className="mt-7 font-display font-thin text-[#0F172A] text-balance"
                style={{ fontSize: "clamp(38px, 6vw, 72px)", lineHeight: 1.02 }}
              >
                We are{" "}
                <span className="font-normal" style={{ color: "#0891B2" }}>aibizmod</span>
              </h1>
              <p
                className="mx-auto mt-6 max-w-2xl rounded-2xl border border-white/70 bg-white/45 px-6 py-4 text-base leading-8 text-slate-600 shadow-[0_18px_55px_rgba(59,130,246,0.12)] backdrop-blur-md md:text-lg"
              >
                We&apos;re a team of builders and technologists. We help businesses
                get more from technology, without the complexity that usually comes with it.
              </p>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ── Who We Are ───────────────────────────────────────────────────── */}
      <section
        className="relative py-24 px-6 bg-white border-t border-border overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.055) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      >
        <div className="absolute top-1/4 -right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-200/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] rounded-full bg-blue-200/10 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — label + heading + brief */}
          <AnimatedSection direction="left" className="lg:sticky lg:top-28">
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "black" }}>
              Who We Are
            </span>
            <h2
              className="mt-6 font-display font-thin text-primary text-balance"
              style={{ fontSize: "clamp(28px, 3.8vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#0E7490" }}
            >
              A Small Team That Takes the Work Seriously
            </h2>
            <p className="mt-5 text-muted-foreground leading-[1.8]" style={{ fontSize: 16 }}>
              We are not a large agency with layers of account managers. We are a team
              of engineers, designers, and strategists who work directly with the
              people we are helping.
            </p>
          </AnimatedSection>

          {/* Right — body paragraphs */}
          <AnimatedSection direction="right" delay={0.1} className="space-y-6 text-muted-foreground leading-[1.8] text-base">
            <p>
              Most of what we do is unglamorous. We plan carefully, build things that
              hold up, and stay involved long after launch. We think that is what good
              technology work actually looks like.
            </p>
            <p>
              We are honest about what we can do and what we cannot. If something is
              not the right fit, we will say so. If a simpler approach works better,
              we will recommend it.
            </p>
            <p>
              The businesses we work with best are the ones who want a real working
              relationship, not just a vendor to hand off a spec to.
            </p>
          </AnimatedSection>

        </div>
      </section>

      <section className="py-20 px-6 bg-canvas border-t border-border">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection className="text-center mb-12">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md"
            >
              Our Clients
            </span>
            <h2
              className="mt-7 font-display font-bold"
              style={{ fontSize: "clamp(24px, 3vw, 34px)", lineHeight: 1.15, color: "#0E7490" }}
            >
              Trusted by Teams That Build the Future
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto leading-relaxed" style={{ fontSize: 16 }}>
              We are proud to work with innovative companies that push the boundaries of technology.
            </p>
          </AnimatedSection>

          <div className="rounded-2xl border border-border/60 bg-white/60 p-8 shadow-sm backdrop-blur-sm">
            <LogoCloud logos={logos} />
          </div>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-6 border-t border-border relative"
        style={{
          backgroundColor: "#f0f9ff",
          backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mx-auto max-w-3xl">

            {/* Narrative */}
            <AnimatedSection delay={0.1}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "black", border: "none" }}>Our Story</span>
              <h2
                className="mt-6 font-display font-bold text-ink"
                style={{ fontSize: "clamp(24px, 3vw, 34px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#0E7490" }}
              >
                How We Got Here
              </h2>
              <div className="mt-8 space-y-6 text-muted-foreground leading-[1.8]" style={{ fontSize: 15 }}>
                <p>
                  aibizmod was started in 2019 by James and Sarah, two engineers who spent years
                  in enterprise and wanted to build something different. They wanted a firm where
                  good technical work and real business goals actually go together. We focus on being clear about
                  what to build, when to build it, and how to scale it without adding unnecessary complexity.
                </p>
                <p>
                  As the team grew, we added people who know digital marketing, cloud infrastructure,
                  and automation well. We don&apos;t do bloated retainers or unnecessary complexity.
                  We work with a limited number of clients at a time, with senior people doing the
                  actual work.
                </p>
                <p>
                  Today we work with companies at every stage, from early startups to established
                  businesses. The commitment has stayed the same: honest work, built to last,
                  in your interest.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "black", border: "none" }}>Our Purpose</span>
            <h2
              className="mt-6 font-display font-bold text-ink"
              style={{ fontSize: "clamp(26px, 3.5vw, 38px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#0E7490" }}
            >
              Mission &amp; Vision
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission — dark card */}
            <AnimatedSection delay={0.05}>
              <div className="h-full bg-ink rounded-card p-8 md:p-10">
                <div
                  className="w-12 h-12 rounded-btn flex items-center justify-center mb-6"
                  style={{ background: "rgba(6,182,212,0.20)", border: "1px solid rgba(6,182,212,0.30)" }}
                >
                  <Target size={22} className="text-white" aria-hidden="true" />
                </div>
                <h3
                  className="font-display font-bold text-white mb-4"
                  style={{ fontSize: 22 }}
                >
                  Our Mission
                </h3>
                <p className="leading-relaxed" style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(255,255,255,0.60)" }}>
                  To make good technology accessible to businesses of every
                  size. Not just the ones with large budgets or in-house
                  engineering teams.
                </p>
              </div>
            </AnimatedSection>

            {/* Vision — gold-hairline card */}
            <AnimatedSection delay={0.12}>
              <div className="h-full card-royal p-8 md:p-10">
                <div className="icon-box mb-6">
                  <Lightbulb size={22} aria-hidden="true" />
                </div>
                <h3
                  className="font-display font-bold text-ink mb-4"
                  style={{ fontSize: 22 }}
                >
                  Our Vision
                </h3>
                <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 17, lineHeight: 1.65 }}>
                  To be the kind of technology partner a business stays with.
                  Not because they&apos;re locked in, but because the work keeps
                  getting better.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-canvas border-t border-border">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "black", border: "none" }}>What We Stand For</span>
            <h2
              className="mt-6 font-display font-bold"
              style={{ fontSize: "clamp(26px, 3.5vw, 38px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#0E7490" }}
            >
              Core Values
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto leading-relaxed" style={{ fontSize: 16 }}>
              These are not aspirational wall art. They are the principles that
              guide how we make decisions every day.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ image, name, alt, desc }, i) => (
              <AnimatedSection key={name} delay={i * 0.07}>
                <motion.div
                  className="group bg-white flex flex-col h-full overflow-hidden"
                  style={{
                    borderRadius: 16,
                    boxShadow:
                      "inset 0 -3em 3em rgba(8,145,178,0.04), 0 0 0 1px rgba(8,145,178,0.18), 0.3em 0.3em 1em rgba(15,23,42,0.08)",
                  }}
                  whileHover={{ borderRadius: 6 }}
                  transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
                >
                  <div className="relative w-full h-44 overflow-hidden shrink-0">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
                  </div>
                  <div className="px-6 py-5 flex flex-col gap-3">
                    <h3
                      className="font-display font-semibold text-[#0F172A]"
                      style={{ fontSize: 18, lineHeight: 1.2 }}
                    >
                      {name}
                    </h3>
                    <p className="text-sm leading-[1.75] text-slate-500">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
