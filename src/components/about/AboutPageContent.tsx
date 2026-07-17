"use client";

import {
  Target, Lightbulb, Users,
} from "lucide-react";
import AnimatedSection from "@/components/common/AnimatedSection";
import ShaderBackground from "@/components/ui/shader-background";
// import {
//   CardTransformed,
//   CardsContainer,
//   ContainerScroll,
// } from "@/components/ui/animated-cards-stack";
import MarqueeLogoScroller from "@/components/ui/marquee-logo-scroller";
import { TextShimmer } from "@/components/ui/text-shimmer";


// ─── Data ─────────────────────────────────────────────────────────────────────

interface Value {
  num: string;
  tag: string;
  label: string;
  name: string;
  className: string;
  desc: string;
}

const values: Value[] = [
  {
    num: "001",
    tag: "CLIENT FIRST",
    label: "LISTEN",
    name: "Client First",
    className: "card",
    desc: "We ask what the client actually needs before we ask what we can build. The outcome matters more than the solution we already knew."
  },
  {
    num: "002",
    tag: "SAY IT STRAIGHT",
    label: "HONEST",
    name: "Say It Straight",
    className: "card purple",
    desc: "We tell you what we actually think. Honest estimates, honest timelines, and honest feedback when something is not going to plan."
  },
  {
    num: "003",
    tag: "BUILD TO LAST",
    label: "CRAFT",
    name: "Build to Last",
    className: "card blue",
    desc: "We would rather spend an extra day getting it right than a month fixing it later. Good work holds up. Rushed work does not."
  },
  {
    num: "004",
    tag: "STAY CURIOUS",
    label: "LEARN",
    name: "Stay Curious",
    className: "card green",
    desc: "We have changed our minds about things and we will again. Staying curious is the only way to stay useful to the people we work with."
  },
  {
    num: "005",
    tag: "WORK TOGETHER",
    label: "PUSH",
    name: "Work Together",
    className: "card red",
    desc: "We are not here to nod and execute. We push back when something does not add up and bring our own thinking to every conversation."
  },
  {
    num: "006",
    tag: "RESULTS NOT HOURS",
    label: "IMPACT",
    name: "Results Not Hours",
    className: "card gold",
    desc: "We care whether it worked, not whether it kept us busy. Every project starts with a clear picture of what success looks like."
  }
];

const valueArtworks: Record<string, React.ReactNode> = {
  "Client First": (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <ellipse cx="120" cy="210" rx="70" ry="10" fill="#0F172A" opacity=".08"/>
      <rect x="78" y="120" width="84" height="78" rx="20" fill="#0F172A"/>
      <circle cx="120" cy="92" r="42" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.6"/>
      <path d="M78 86c0-26 19-44 42-44s42 18 42 44c0 6-2 12-4 16-3-10-12-18-22-20 2 4 2 8 1 11-4-9-13-14-23-14-14 0-26 9-30 22-3-3-6-9-6-15z" fill="#0F172A"/>
      <path d="M70 96c-10 4-16 14-14 26 2 10 12 16 22 14 6-1 10-6 11-12 1-4-1-8-4-10 3-2 5-6 4-10-2-6-10-10-19-8z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.6"/>
      <path d="M70 104c-4 2-7 6-6 11" stroke="#0F172A" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M104 96c3 3 8 3 11 0M132 96c3 3 8 3 11 0" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M112 112c4 4 14 4 18 0" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <g stroke="var(--fc)" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M52 92c-6 6-6 16 0 22" opacity=".9"/>
        <path d="M42 86c-10 9-10 25 0 34" opacity=".6"/>
        <path d="M32 80c-14 13-14 33 0 46" opacity=".35"/>
      </g>
      <g className="float-slow">
        <path d="M168 36c0-9 8-16 17-16s17 7 17 16c0 6-4 11-9 14l2 6-7-4c-1 0-2 0-3 0-9 0-17-7-17-16z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.6"/>
        <text x="185" y="42" textAnchor="middle" fontFamily="var(--font-fraunces), Fraunces, serif" fontWeight="700" fontSize="18" fill="var(--fc)">?</text>
        <circle cx="160" cy="58" r="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.2"/>
        <circle cx="152" cy="66" r="2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.2"/>
      </g>
      <rect x="96" y="150" width="48" height="34" rx="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.4"/>
      <path d="M102 160h36M102 168h28M102 176h32" stroke="var(--fc)" strokeWidth="1.6" strokeLinecap="round" opacity=".8"/>
    </svg>
  ),
  "Say It Straight": (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <ellipse cx="120" cy="212" rx="68" ry="9" fill="#0F172A" opacity=".08"/>
      <rect x="80" y="124" width="80" height="74" rx="20" fill="#0F172A"/>
      <circle cx="120" cy="94" r="40" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.6"/>
      <path d="M82 88c0-24 17-40 38-40s38 16 38 40c0 4-1 8-2 12-2-8-10-14-18-16 1 3 1 6 0 8-3-7-11-11-20-11-12 0-22 7-26 18-2-3-5-7-5-12z" fill="#0F172A"/>
      <circle cx="106" cy="94" r="3.5" fill="#0F172A"/>
      <circle cx="134" cy="94" r="3.5" fill="#0F172A"/>
      <ellipse cx="120" cy="110" rx="7" ry="5" fill="#0F172A"/>
      <g className="float-slow">
        <path d="M150 96l40-18v44l-40-18z" fill="var(--fc)" stroke="#0F172A" strokeWidth="1.6" strokeLinejoin="round"/>
        <rect x="142" y="100" width="14" height="20" rx="3" fill="#0F172A"/>
        <path d="M150 96l40-18" stroke="#0F172A" strokeWidth="1.4" fill="none"/>
        <g stroke="var(--fc)" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <path d="M196 86c6 4 6 16 0 20" opacity=".9"/>
          <path d="M204 78c10 7 10 27 0 36" opacity=".6"/>
          <path d="M212 70c14 11 14 39 0 52" opacity=".35"/>
        </g>
      </g>
      <g stroke="var(--fc)" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".5">
        <path d="M44 120h28m0 0l-5-5m5 5l-5 5"/>
      </g>
      <g fill="var(--fc)" opacity=".6">
        <path d="M56 70l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>
        <circle cx="200" cy="150" r="3"/>
      </g>
    </svg>
  ),
  "Build to Last": (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08"/>
      <rect x="64" y="196" width="112" height="14" rx="3" fill="#0F172A"/>
      <g stroke="#0F172A" strokeWidth="1.4" strokeLinejoin="round">
        <rect x="76" y="160" width="88" height="18" rx="2" fill="var(--fc)"/>
        <rect x="76" y="142" width="88" height="18" rx="2" fill="#FFFFFF"/>
        <rect x="76" y="124" width="88" height="18" rx="2" fill="var(--fc)"/>
        <rect x="76" y="106" width="88" height="18" rx="2" fill="#FFFFFF"/>
        <path d="M120 160v18M120 142v18M120 124v18M108 106v18M132 106v18" stroke="#0F172A" strokeWidth="1" opacity=".4"/>
      </g>
      <g className="float-slow">
        <path d="M150 70l24-24 14 14-24 24z" fill="#0F172A"/>
        <path d="M150 70l-6 18 18-6z" fill="var(--fc-light)" stroke="#0F172A" strokeWidth="1.4"/>
        <rect x="170" y="48" width="20" height="6" rx="2" transform="rotate(45 180 51)" fill="#0F172A"/>
      </g>
      <g className="float-slow">
        <circle cx="60" cy="120" r="18" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.6"/>
        <path d="M52 120l6 6 10-12" stroke="var(--fc)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
      <g fill="var(--fc)" opacity=".5">
        <path d="M190 100l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z"/>
        <circle cx="48" cy="70" r="2.5"/>
      </g>
    </svg>
  ),
  "Stay Curious": (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <ellipse cx="120" cy="214" rx="70" ry="9" fill="#0F172A" opacity=".08"/>
      <rect x="82" y="128" width="76" height="70" rx="20" fill="#0F172A"/>
      <circle cx="120" cy="98" r="38" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.6"/>
      <path d="M84 92c0-22 16-36 36-36s36 14 36 36c0 2 0 4-1 6-2-6-8-10-14-11 0 2 0 4-1 5-3-5-9-8-16-8-10 0-18 6-21 15-2-2-4-5-4-9z" fill="#0F172A"/>
      <circle cx="107" cy="98" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.6"/>
      <circle cx="133" cy="98" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.6"/>
      <circle cx="108" cy="98" r="2" fill="#0F172A"/>
      <circle cx="134" cy="98" r="2" fill="#0F172A"/>
      <path d="M101 88c3-2 7-2 10 0" stroke="#0F172A" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
      <circle cx="120" cy="112" r="3.5" fill="#0F172A"/>
      <g className="float-slow">
        <circle cx="176" cy="72" r="26" fill="var(--fc-dark)" stroke="#0F172A" strokeWidth="2.4"/>
        <circle cx="176" cy="72" r="20" fill="none" stroke="var(--fc)" strokeWidth="1.4" opacity=".5"/>
        <line x1="194" y1="90" x2="214" y2="110" stroke="#0F172A" strokeWidth="5" strokeLinecap="round"/>
        <line x1="194" y1="90" x2="214" y2="110" stroke="var(--fc)" strokeWidth="2" strokeLinecap="round"/>
        <text x="176" y="80" textAnchor="middle" fontFamily="var(--font-fraunces), Fraunces, serif" fontWeight="700" fontSize="22" fill="var(--fc)">?</text>
      </g>
      <g className="float-slow">
        <path d="M52 96c0-5 4-9 9-9s9 4 9 9c0 4-2 6-5 8v4h-8v-4c-3-2-5-4-5-8z" fill="var(--fc-light)" stroke="#0F172A" strokeWidth="1.4"/>
        <path d="M57 112h8M58 118h6" stroke="#0F172A" strokeWidth="1.4" strokeLinecap="round"/>
      </g>
      <g fill="var(--fc)" opacity=".5">
        <path d="M200 150l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z"/>
        <circle cx="44" cy="140" r="2.5"/>
      </g>
    </svg>
  ),
  "Work Together": (
    <svg viewBox="0 0 260 240" className="w-full h-full">
      <ellipse cx="130" cy="214" rx="84" ry="9" fill="#0F172A" opacity=".08"/>
      <g className="float-slow" transform="translate(70 120)">
        <g>
          <circle r="34" fill="var(--fc)" stroke="#0F172A" strokeWidth="1.6"/>
          <circle r="12" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.4"/>
          <g fill="var(--fc)" stroke="#0F172A" strokeWidth="1.4">
            <rect x="-5" y="-44" width="10" height="12" rx="2"/>
            <rect x="-5" y="32" width="10" height="12" rx="2"/>
            <rect x="-44" y="-5" width="12" height="10" rx="2"/>
            <rect x="32" y="-5" width="12" height="10" rx="2"/>
            <rect x="-34" y="-30" width="10" height="10" rx="2" transform="rotate(45)"/>
            <rect x="24" y="-30" width="10" height="10" rx="2" transform="rotate(45)"/>
            <rect x="-34" y="20" width="10" height="10" rx="2" transform="rotate(45)"/>
            <rect x="24" y="20" width="10" height="10" rx="2" transform="rotate(45)"/>
          </g>
        </g>
      </g>
      <g className="float-slow" transform="translate(190 120)">
        <g>
          <circle r="28" fill="#0F172A" stroke="#0F172A" strokeWidth="1.6"/>
          <circle r="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.4"/>
          <g fill="#0F172A" stroke="#0F172A" strokeWidth="1.4">
            <rect x="-4" y="-38" width="8" height="11" rx="2"/>
            <rect x="-4" y="27" width="8" height="11" rx="2"/>
            <rect x="-38" y="-4" width="11" height="8" rx="2"/>
            <rect x="27" y="-4" width="11" height="8" rx="2"/>
            <rect x="-30" y="-26" width="9" height="9" rx="2" transform="rotate(45)"/>
            <rect x="21" y="-26" width="9" height="9" rx="2" transform="rotate(45)"/>
            <rect x="-30" y="17" width="9" height="9" rx="2" transform="rotate(45)"/>
            <rect x="21" y="17" width="9" height="9" rx="2" transform="rotate(45)"/>
          </g>
        </g>
      </g>
      <g>
        <path d="M30 180c0-10 8-18 18-18h40v10c0 4 3 6 6 6H64c-4 0-7 3-7 7v6H44c-8 0-14-5-14-11z" fill="var(--fc)" stroke="#0F172A" strokeWidth="1.4"/>
        <circle cx="96" cy="166" r="7" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.2"/>
      </g>
      <g>
        <path d="M230 180c0-10-8-18-18-18h-40v10c0 4-3 6-6 6h30c4 0 7 3 7 7v6h13c8 0 14-5 14-11z" fill="#0F172A" stroke="#0F172A" strokeWidth="1.4"/>
        <circle cx="164" cy="166" r="7" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.2"/>
      </g>
      <g className="float-slow">
        <path d="M130 150l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" fill="var(--fc-light)" stroke="#0F172A" strokeWidth="1.2"/>
      </g>
      <g fill="var(--fc)" opacity=".5">
        <circle cx="40" cy="60" r="2.5"/>
        <circle cx="220" cy="58" r="2.5"/>
        <circle cx="130" cy="40" r="2"/>
      </g>
    </svg>
  ),
  "Results Not Hours": (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <ellipse cx="120" cy="214" rx="68" ry="8" fill="#0F172A" opacity=".08"/>
      <rect x="96" y="186" width="48" height="14" rx="3" fill="#0F172A"/>
      <rect x="104" y="172" width="32" height="16" rx="2" fill="#0F172A"/>
      <rect x="112" y="140" width="16" height="34" fill="var(--fc)"/>
      <path d="M86 100h68v20c0 18-15 32-34 32s-34-14-34-32z" fill="var(--fc)" stroke="#0F172A" strokeWidth="1.6"/>
      <path d="M86 106c-14 0-22 8-22 20s8 18 18 18" fill="none" stroke="#0F172A" strokeWidth="2.4"/>
      <path d="M154 106c14 0 22 8 22 20s-8 18-18 18" fill="none" stroke="#0F172A" strokeWidth="2.4"/>
      <g className="float-slow">
        <path d="M104 116l8 8 16-18" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
      <g className="float-slow">
        <path d="M120 52l4 10 10 2-7 7 2 10-9-5-9 5 2-10-7-7 10-2z" fill="var(--fc-light)" stroke="#0F172A" strokeWidth="1.4"/>
      </g>
      <g opacity=".7">
        <circle cx="50" cy="120" r="18" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.6"/>
        <path d="M50 112v8l6 4" stroke="#0F172A" stroke-width="1.6" stroke-linecap="round" fill="none"/>
        <line x1="34" y1="104" x2="66" y2="136" stroke="var(--fc)" strokeWidth="2.4" strokeLinecap="round"/>
      </g>
      <g fill="var(--fc)" opacity=".6">
        <path d="M190 80l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z"/>
        <circle cx="196" cy="140" r="2.5"/>
      </g>
    </svg>
  ),
};

const logos = [
  {
    src: "/clients/spacelean.webp",
    alt: "SpaceLean",
    website: "https://spacelean.ai/",
    gradient: { from: "#0E7490", via: "#22D3EE", to: "#ECFEFF" },
  },
  {
    src: "/clients/pmspace.png",
    alt: "PMSpace",
    website: "https://pmspace.ai/",
    gradient: { from: "#0284C7", via: "#38BDF8", to: "#F0F9FF" },
  },
  {
    src: "/clients/spaceapp.png",
    alt: "SpaceApp",
    website: "https://spacelean.ai/",
    gradient: { from: "#0F172A", via: "#475569", to: "#F8FAFC" },
  },
  {
    src: "/clients/spacesign.png",
    alt: "SpaceSign",
    website: "https://space-sign.ai/",
    gradient: { from: "#0891B2", via: "#22D3EE", to: "#ECFEFF" },
  },
  {
    src: "/clients/spacehr.png",
    alt: "SpaceHR",
    website: "https://spacehr.net/",
    gradient: { from: "#06B6D4", via: "#67E8F9", to: "#CFFAFE" },
  },
  {
    src: "/clients/texastech.svg",
    alt: "Texas Tech",
    website: "https://texastechserv.com/",
    gradient: { from: "#2563EB", via: "#3B82F6", to: "#DBEAFE" },
  },
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
                <TextShimmer
                  as="span"
                  duration={2.2}
                  className="font-normal [--base-color:#0891b2] [--base-gradient-color:#ffffff]"
                >
                  aibizmod
                </TextShimmer>
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
              A small team that takes the work seriously
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
          <AnimatedSection>
            <MarqueeLogoScroller
              title="Trusted by Businesses Worldwide"
              description="Founders, developers, and business leaders across the globe choose us for their digital asset operations."
              logos={logos}
              speed="normal"
            />
          </AnimatedSection>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission — white card with cyan glow wave */}
            <AnimatedSection delay={0.05}>
              <div className="relative overflow-hidden bg-white border border-[#E0F2FE] rounded-[32px] p-8 pb-20 md:p-10 md:pb-24 shadow-[0_4px_24px_rgba(15,23,42,0.04)] h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_36px_rgba(8,145,178,0.08)]">
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Box */}
                  <div className="w-11 h-11 rounded-full border border-cyan-100 flex items-center justify-center text-cyan-600 bg-cyan-50/55 mb-6 shrink-0">
                    <Target size={20} aria-hidden="true" />
                  </div>
                  
                  {/* Heading Group */}
                  <div className="mt-2">
                    <div className="text-[30px] font-extrabold tracking-tight text-[#0F172A] leading-none mb-1.5 font-sans">
                      Our Mission
                    </div>
                    <div className="text-[10px] font-bold tracking-wider text-cyan-600 uppercase font-sans">
                      ACCESSIBLE TECHNOLOGY
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="mt-5 text-slate-500 text-[14.5px] leading-relaxed font-sans max-w-sm flex-grow">
                    To make good technology accessible to businesses of every size. Not just the ones with large budgets or in-house engineering teams.
                  </p>
                </div>

                {/* Glowing Wave Graphics */}
                <svg viewBox="0 0 350 120" className="absolute bottom-0 left-0 w-full h-16 pointer-events-none z-0" fill="none" preserveAspectRatio="none">
                  <path d="M0,90 Q90,30 180,80 T350,50" stroke="#0891B2" strokeWidth="2.5" strokeOpacity="0.75" />
                  <path d="M0,70 Q80,100 170,40 T350,90" stroke="#06B6D4" strokeWidth="1.5" strokeOpacity="0.35" />
                  <path d="M0,80 Q100,50 200,90 T350,60" stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.2" />
                </svg>
              </div>
            </AnimatedSection>

            {/* Vision — dark navy card with neon glow wave */}
            <AnimatedSection delay={0.12}>
              <div className="relative overflow-hidden bg-[#0F172A] border border-white/5 rounded-[32px] p-8 pb-20 md:p-10 md:pb-24 shadow-[0_12px_40px_rgba(15,23,42,0.15)] h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(8,145,178,0.18)]">
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Box */}
                  <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-[#22D3EE] bg-white/5 mb-6 shrink-0">
                    <Lightbulb size={20} aria-hidden="true" />
                  </div>
                  
                  {/* Heading Group */}
                  <div className="mt-2">
                    <div className="text-[30px] font-extrabold tracking-tight text-white leading-none mb-1.5 font-sans">
                      Our Vision
                    </div>
                    <div className="text-[10px] font-bold tracking-wider text-[#22D3EE] uppercase font-sans">
                      BUILT ON TRUST
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="mt-5 text-slate-300 text-[14.5px] leading-relaxed font-sans max-w-sm flex-grow">
                    To be the kind of technology partner a business stays with. Not because they&apos;re locked in, but because the work keeps getting better.
                  </p>
                </div>

                {/* Glowing Wave Graphics */}
                <svg viewBox="0 0 350 120" className="absolute bottom-0 left-0 w-full h-16 pointer-events-none z-0" fill="none" preserveAspectRatio="none">
                  <path d="M0,90 Q90,30 180,80 T350,50" stroke="#22D3EE" strokeWidth="2.5" strokeOpacity="0.85" />
                  <path d="M0,70 Q80,100 170,40 T350,90" stroke="#06B6D4" strokeWidth="1.5" strokeOpacity="0.4" />
                  <path d="M0,80 Q100,50 200,90 T350,60" stroke="#0891B2" strokeWidth="1" strokeOpacity="0.25" />
                </svg>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-canvas border-t border-border">
        {/* Style block for visual card animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Card color variants */
          .card { --fc: #0891B2; --fc-light: #CFFAFE; --fc-dark: #ECFEFF; }
          .card.purple { --fc: #0D9488; --fc-light: #CCFBF1; --fc-dark: #F0FDFA; }
          .card.blue { --fc: #0284C7; --fc-light: #E0F2FE; --fc-dark: #F0F9FF; }
          .card.green { --fc: #059669; --fc-light: #D1FAE5; --fc-dark: #F0FDF4; }
          .card.red { --fc: #4F46E5; --fc-light: #E0E7FF; --fc-dark: #EEF2FF; }
          .card.gold { --fc: #2563EB; --fc-light: #DBEAFE; --fc-dark: #EFF6FF; }

          .card {
            transition: transform .5s cubic-bezier(.2,.8,.2,1), box-shadow .5s cubic-bezier(.2,.8,.2,1);
            box-shadow: 0 1px 2px rgba(15,23,42,.04), 0 8px 24px -12px rgba(15,23,42,.12);
          }
          .card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px -12px rgba(15,23,42,.18), 0 8px 16px -8px rgba(15,23,42,.08);
          }
          .card .art { transition: transform .6s cubic-bezier(.2,.8,.2,1); }
          .card:hover .art { transform: scale(1.18) translateY(-14px); }
          .card .art .float { animation: floaty 6s ease-in-out infinite; transform-origin: center; }
          .card .art .float-slow { animation: floaty 9s ease-in-out infinite; }
          @keyframes floaty {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-6px) rotate(-1.5deg); }
          }
          .card:hover .art .float { animation-play-state: paused; }

          .glow {
            background: radial-gradient(circle at 50% 28%, var(--fc-light) 0%, transparent 68%);
            opacity: .55;
          }
          .tag-chip {
            background: var(--fc-dark);
            color: var(--fc);
          }

          /* Subtle paper grain matching dark slate ink text color */
          .grain::before {
            content: ""; position: absolute; inset: 0; pointer-events: none;
            background-image: radial-gradient(rgba(15,23,42,.05) 1px, transparent 1px);
            background-size: 3px 3px; opacity: .4; mix-blend-mode: multiply;
          }

          @media (prefers-reduced-motion: reduce) {
            .card, .card .art, .card .art .float, .card .art .float-slow {
              transition: none !important; animation: none !important;
            }
          }
        ` }} />

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {values.map(({ num, tag, label, name, className, desc }, i) => (
              <AnimatedSection key={name} delay={i * 0.07}>
                <article className={`${className} relative h-[400px] w-full overflow-hidden rounded-3xl border border-[#0F172A]/10 bg-white p-6 flex flex-col justify-end`}>
                  <div className="absolute inset-0 z-0 glow"></div>
                  <div className="grain absolute inset-0"></div>

                  <div className="absolute top-6 left-6 font-mono text-sm font-bold text-[#0F172A]/40">{num}</div>
                  <div className="absolute top-6 right-6 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--fc)" }}></span>
                    <span className="font-mono text-[10px] tracking-widest text-[#0F172A]/45">{label}</span>
                  </div>

                  {/* Cartoon Art */}
                  <div className="art absolute inset-x-0 top-0 bottom-32 z-10 flex items-center justify-center pointer-events-none">
                    <div className="float relative w-56 h-56">
                      {valueArtworks[name]}
                    </div>
                  </div>

                  <div className="relative z-20 rounded-2xl border border-[#0F172A]/10 bg-white/85 backdrop-blur-sm p-4 shadow-[0_4px_24px_rgba(15,23,42,0.04)]">
                    <span className="tag-chip mb-2 inline-block rounded-full px-3 py-1 text-[11px] font-bold tracking-wide">
                      {tag}
                    </span>
                    <p className="text-[14.5px] leading-snug text-[#0F172A] font-sans">
                      {desc}
                    </p>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
