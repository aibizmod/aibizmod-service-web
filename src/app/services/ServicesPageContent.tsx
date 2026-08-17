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
import TeamSection from "@/components/about/TeamSection";

const serviceArtworks: Record<string, React.ReactNode> = {
  "ai-automation": (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <ellipse cx="120" cy="212" rx="70" ry="9" fill="#0F172A" opacity=".08" />
      <rect x="76" y="76" width="88" height="88" rx="20" fill="#0F172A" />
      <rect
        x="84"
        y="84"
        width="72"
        height="72"
        rx="14"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.6"
      />
      <circle
        cx="120"
        cy="120"
        r="22"
        fill="var(--fc)"
        stroke="#0F172A"
        strokeWidth="1.6"
      />
      <circle cx="120" cy="120" r="10" fill="#FFFFFF" />
      <g stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round">
        <path d="M120 54v22M120 164v22M54 120h22M164 120h22" />
        <path d="M74 74l14 14M152 152l14 14M74 166l14-14M152 88l14-14" />
      </g>
      <g className="float-slow">
        <path
          d="M176 48c0-8 7-15 15-15s15 6 15 15c0 5-3 10-8 12l2 5-6-3c-1 0-2 0-3 0-8 0-15-6-15-15z"
          fill="var(--fc-light)"
          stroke="#0F172A"
          strokeWidth="1.4"
        />
        <text
          x="191"
          y="53"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontWeight="800"
          fontSize="14"
          fill="var(--fc)"
        >
          AI
        </text>
      </g>
      <g className="float-slow">
        <circle
          cx="48"
          cy="170"
          r="14"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="1.6"
        />
        <path
          d="M42 170h12M48 164v12"
          stroke="var(--fc)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <g fill="var(--fc)" opacity=".6">
        <path d="M50 56l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
        <circle cx="196" cy="176" r="3" />
      </g>
    </svg>
  ),
  "digital-marketing": (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      <rect x="60" y="170" width="120" height="12" rx="3" fill="#0F172A" />
      <rect
        x="74"
        y="130"
        width="18"
        height="40"
        rx="3"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="1.4"
      />
      <rect
        x="100"
        y="104"
        width="18"
        height="66"
        rx="3"
        fill="var(--fc)"
        stroke="#0F172A"
        strokeWidth="1.4"
      />
      <rect x="126" y="82" width="18" height="88" rx="3" fill="#0F172A" />
      <rect
        x="152"
        y="60"
        width="18"
        height="110"
        rx="3"
        fill="var(--fc)"
        stroke="#0F172A"
        strokeWidth="1.4"
      />
      <path
        d="M68 124l36-32 26 20 44-50"
        fill="none"
        stroke="var(--fc)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M162 62h14v14"
        fill="none"
        stroke="var(--fc)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g className="float-slow">
        <circle
          cx="68"
          cy="74"
          r="20"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="1.6"
        />
        <circle
          cx="68"
          cy="74"
          r="12"
          fill="none"
          stroke="var(--fc)"
          strokeWidth="2.5"
        />
        <line
          x1="82"
          y1="88"
          x2="96"
          y2="102"
          stroke="#0F172A"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
      <g fill="var(--fc)" opacity=".5">
        <path d="M196 140l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" />
        <circle cx="48" cy="110" r="2.5" />
      </g>
    </svg>
  ),
  "web-development": (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      <rect
        x="52"
        y="64"
        width="136"
        height="112"
        rx="14"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.6"
      />
      <path d="M52 92h136" stroke="#0F172A" strokeWidth="1.4" />
      <circle cx="68" cy="78" r="3.5" fill="#0F172A" opacity=".3" />
      <circle cx="80" cy="78" r="3.5" fill="#0F172A" opacity=".3" />
      <circle cx="92" cy="78" r="3.5" fill="#0F172A" opacity=".3" />
      <path
        d="M84 122l-14 14 14 14M116 122l14 14-14 14"
        fill="none"
        stroke="var(--fc)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M104 152l8-32"
        fill="none"
        stroke="#0F172A"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <g className="float-slow">
        <rect
          x="156"
          y="108"
          width="44"
          height="68"
          rx="8"
          fill="var(--fc-dark)"
          stroke="#0F172A"
          strokeWidth="1.6"
        />
        <rect
          x="164"
          y="118"
          width="28"
          height="40"
          rx="3"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="1.2"
        />
        <circle cx="178" cy="168" r="2" fill="#0F172A" />
      </g>
      <g fill="var(--fc)" opacity=".5">
        <path d="M44 54l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" />
        <circle cx="204" cy="74" r="2.5" />
      </g>
    </svg>
  ),
  "software-development": (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      <rect
        x="68"
        y="60"
        width="104"
        height="34"
        rx="8"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.6"
      />
      <rect
        x="68"
        y="104"
        width="104"
        height="34"
        rx="8"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="1.6"
      />
      <rect x="68" y="148" width="104" height="34" rx="8" fill="#0F172A" />
      <circle cx="88" cy="77" r="4" fill="var(--fc)" />
      <circle cx="88" cy="121" r="4" fill="#0F172A" />
      <circle cx="88" cy="165" r="4" fill="var(--fc-light)" />
      <path
        d="M104 77h52M104 121h52M104 165h52"
        stroke="#0F172A"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".6"
      />
      <g className="float-slow">
        <rect
          x="162"
          y="90"
          width="36"
          height="36"
          rx="6"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.6"
        />
        <text
          x="180"
          y="113"
          textAnchor="middle"
          fontFamily="monospace"
          fontWeight="700"
          fontSize="14"
          fill="#FFFFFF"
        >
          API
        </text>
        <path
          d="M140 121h22"
          stroke="var(--fc)"
          strokeWidth="2.5"
          strokeDasharray="3 3"
        />
      </g>
      <g fill="var(--fc)" opacity=".5">
        <circle cx="50" cy="80" r="2.5" />
        <path d="M190 160l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" />
      </g>
    </svg>
  ),
  "mobile-app-development": (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <ellipse cx="120" cy="214" rx="60" ry="8" fill="#0F172A" opacity=".08" />
      <rect
        x="80"
        y="44"
        width="80"
        height="152"
        rx="18"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.8"
      />
      <rect
        x="86"
        y="56"
        width="68"
        height="120"
        rx="6"
        fill="var(--fc-dark)"
      />
      <rect x="108" y="49" width="24" height="4" rx="2" fill="#0F172A" />
      <circle cx="120" cy="186" r="4" fill="#0F172A" />
      <rect x="94" y="68" width="22" height="22" rx="5" fill="var(--fc)" />
      <rect x="124" y="68" width="22" height="22" rx="5" fill="#0F172A" />
      <rect x="94" y="98" width="22" height="22" rx="5" fill="#0F172A" />
      <rect x="124" y="98" width="22" height="22" rx="5" fill="var(--fc)" />
      <rect
        x="94"
        y="128"
        width="52"
        height="14"
        rx="4"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.2"
      />
      <g className="float-slow">
        <circle
          cx="166"
          cy="68"
          r="14"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.4"
        />
        <text
          x="166"
          y="73"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontWeight="800"
          fontSize="12"
          fill="#FFFFFF"
        >
          1
        </text>
      </g>
      <g stroke="var(--fc)" strokeWidth="2.2" fill="none" strokeLinecap="round">
        <path d="M56 100c-6 6-6 16 0 22" opacity=".9" />
        <path d="M46 94c-10 10-10 28 0 38" opacity=".5" />
      </g>
    </svg>
  ),
  "hosting-infrastructure": (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      <path
        d="M72 110c-14 0-24 10-24 22 0 4 1 8 3 12h138c3-4 5-8 5-13 0-14-12-24-26-24-3 0-6 1-9 2-6-13-18-21-33-21-16 0-30 9-36 23-5-1-12-1-18-1z"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="1.6"
      />
      <rect
        x="66"
        y="130"
        width="108"
        height="30"
        rx="6"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.6"
      />
      <rect x="66" y="166" width="108" height="30" rx="6" fill="#0F172A" />
      <circle cx="82" cy="145" r="3.5" fill="var(--fc)" />
      <circle cx="94" cy="145" r="3.5" fill="var(--fc)" />
      <circle cx="82" cy="181" r="3.5" fill="var(--fc-light)" />
      <circle cx="94" cy="181" r="3.5" fill="var(--fc-light)" />
      <path
        d="M120 145h40M120 181h40"
        stroke="#0F172A"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".5"
      />
      <g className="float-slow">
        <path
          d="M174 86l14-14 14 14-14 14z"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.4"
        />
      </g>
      <g fill="var(--fc)" opacity=".5">
        <circle cx="48" cy="74" r="2.5" />
        <path d="M198 148l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" />
      </g>
    </svg>
  ),
  "customer-experience-management": (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <ellipse cx="120" cy="214" rx="68" ry="8" fill="#0F172A" opacity=".08" />
      <rect x="76" y="126" width="88" height="70" rx="20" fill="#0F172A" />
      <circle
        cx="120"
        cy="94"
        r="38"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.6"
      />
      <path
        d="M84 88c0-22 16-36 36-36s36 14 36 36c0 2 0 4-1 6-2-6-8-10-14-11 0 2 0 4-1 5-3-5-9-8-16-8-10 0-18 6-21 15-2-2-4-5-4-9z"
        fill="#0F172A"
      />
      <circle cx="106" cy="94" r="3.5" fill="#0F172A" />
      <circle cx="134" cy="94" r="3.5" fill="#0F172A" />
      <path
        d="M110 110c4 4 16 4 20 0"
        stroke="var(--fc)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <g className="float-slow">
        <path
          d="M160 52c0-10 9-18 20-18s20 8 20 18c0 7-4 13-10 16l2 7-8-4c-1 0-3 0-4 0-11 0-20-8-20-19z"
          fill="var(--fc-light)"
          stroke="#0F172A"
          strokeWidth="1.4"
        />
        <path
          d="M172 52l4 4 8-8"
          stroke="var(--fc)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      <g className="float-slow">
        <path
          d="M40 70l4 8 9 1-6 6 2 9-9-4-8 4 2-9-6-6 9-1z"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.2"
        />
      </g>
    </svg>
  ),
  "it-consulting-it-services": (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <ellipse cx="120" cy="214" rx="72" ry="8" fill="#0F172A" opacity=".08" />
      <rect
        x="64"
        y="60"
        width="112"
        height="136"
        rx="12"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.6"
      />
      <path d="M64 92h112" stroke="#0F172A" strokeWidth="1.4" />
      <rect
        x="76"
        y="108"
        width="40"
        height="34"
        rx="4"
        fill="var(--fc-light)"
        stroke="#0F172A"
        strokeWidth="1.2"
      />
      <rect x="124" y="108" width="40" height="14" rx="3" fill="var(--fc)" />
      <rect x="124" y="128" width="40" height="14" rx="3" fill="#0F172A" />
      <path
        d="M76 156h88M76 172h60"
        stroke="#0F172A"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".5"
      />
      <g className="float-slow">
        <circle
          cx="178"
          cy="62"
          r="22"
          fill="var(--fc-light)"
          stroke="#0F172A"
          strokeWidth="1.6"
        />
        <path
          d="M178 48c-7 0-12 5-12 12 0 5 3 9 7 11v3h10v-3c4-2 7-6 7-11 0-7-5-12-12-12z"
          fill="var(--fc)"
          stroke="#0F172A"
          strokeWidth="1.2"
        />
        <path
          d="M173 78h10M174 82h8"
          stroke="#0F172A"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </g>
      <g fill="var(--fc)" opacity=".5">
        <circle cx="44" cy="110" r="2.5" />
        <path d="M198 140l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" />
      </g>
    </svg>
  ),
};

const serviceCardVariants: Record<string, string> = {
  "ai-automation": "card",
  "digital-marketing": "card green",
  "web-development": "card blue",
  "software-development": "card indigo",
  "mobile-app-development": "card purple",
  "hosting-infrastructure": "card orange",
  "customer-experience-management": "card pink",
  "it-consulting-it-services": "card gold",
};

const marqueeImages = [
  "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
];

export default function ServicesPageContent() {
  const [hoveredCardRect, setHoveredCardRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

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
      {/* Visual card animations and theme variables */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* Card color variants */
          .card { --fc: #0891B2; --fc-light: #CFFAFE; --fc-dark: #ECFEFF; }
          .card.green { --fc: #059669; --fc-light: #D1FAE5; --fc-dark: #F0FDF4; }
          .card.blue { --fc: #0284C7; --fc-light: #E0F2FE; --fc-dark: #F0F9FF; }
          .card.indigo { --fc: #4F46E5; --fc-light: #E0E7FF; --fc-dark: #EEF2FF; }
          .card.purple { --fc: #7C3AED; --fc-light: #EDE9FE; --fc-dark: #F5F3FF; }
          .card.orange { --fc: #D97706; --fc-light: #FEF3C7; --fc-dark: #FFFBEB; }
          .card.pink { --fc: #E11D48; --fc-light: #FFE4E6; --fc-dark: #FFF1F2; }
          .card.gold { --fc: #2563EB; --fc-light: #DBEAFE; --fc-dark: #EFF6FF; }

          .card .art { transition: transform .6s cubic-bezier(.2,.8,.2,1); }
          .card:hover .art { transform: scale(1.12) translateY(-6px); }
          .card .art .float { animation: floaty 6s ease-in-out infinite; transform-origin: center; }
          .card .art .float-slow { animation: floaty 9s ease-in-out infinite; }
          @keyframes floaty {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-5px) rotate(-1deg); }
          }
          .card:hover .art .float { animation-play-state: paused; }

          .glow {
            background: radial-gradient(circle at 50% 40%, var(--fc-light) 0%, transparent 70%);
            opacity: .65;
          }

          .grain::before {
            content: ""; position: absolute; inset: 0; pointer-events: none;
            background-image: radial-gradient(rgba(15,23,42,.05) 1px, transparent 1px);
            background-size: 3px 3px; opacity: .4; mix-blend-mode: multiply;
          }

          @media (prefers-reduced-motion: reduce) {
            .card .art, .card .art .float, .card .art .float-slow {
              transition: none !important; animation: none !important;
            }
          }
        `,
        }}
      />

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
                  style={{
                    fontSize: "clamp(40px, 6vw, 76px)",
                    lineHeight: 1.02,
                  }}
                >
                  Services Built for{" "}
                  <span className="gradient-text font-normal">Connected</span>{" "}
                  Growth
                </h1>
                <p className="mt-6 max-w-2xl rounded-2xl border border-white/70 bg-white/45 px-6 py-4 text-base leading-8 text-slate-600 shadow-[0_18px_55px_rgba(59,130,246,0.12)] backdrop-blur-md md:text-lg">
                  Strategy, engineering, infrastructure, AI & automation, and
                  growth systems shaped around practical business outcomes.
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
                <ThreeDMarquee
                  images={marqueeImages}
                  className="h-[31rem] max-lg:h-[24rem]"
                />
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
              trailOpacity={0.16}
              particleCount={950}
              speed={1.6}
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
                  style={{
                    fontSize: "clamp(34px, 5vw, 58px)",
                    lineHeight: 1.08,
                  }}
                >
                  Choose the Capability Your Business Needs Next
                </h2>
              </AnimatedSection>

              <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
                {services.map((service, index) => {
                  const variantClass =
                    serviceCardVariants[service.id] || "card";
                  const artwork = serviceArtworks[service.id];

                  const coverNode = (
                    <div
                      className={`${variantClass} relative h-full w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50/40 border border-cyan-100/40 flex items-center justify-center p-3`}
                    >
                      <div className="absolute inset-0 glow" />
                      <div className="grain absolute inset-0" />
                      <div className="art relative w-44 h-44 z-10 flex items-center justify-center pointer-events-none">
                        <div className="float relative w-full h-full">
                          {artwork}
                        </div>
                      </div>
                    </div>
                  );

                  return (
                    <AnimatedSection
                      key={service.id}
                      delay={index * 0.06}
                      className="w-full flex justify-center"
                    >
                      <Link
                        href={service.href}
                        onMouseEnter={handleCardMouseEnter}
                        onMouseLeave={handleCardMouseLeave}
                        className="group flex w-full max-w-sm h-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.01] [&_.relative.h-56]:overflow-hidden [&_.relative.h-56]:rounded-2xl"
                        style={{ perspective: "1000px" }}
                      >
                        <ArticleCard
                          coverNode={coverNode}
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

          {/* ── Team Section ─────────────────────────────────────────────── */}
          <TeamSection />

          {/* ── CTA ──────────────────────────────────────────────────────── */}
          <section className="relative overflow-hidden bg-white px-6 py-24">
            <div className="mx-auto max-w-4xl rounded-[32px] border border-cyan-100 bg-[#ECFEFF]/70 p-8 text-center shadow-[0_22px_70px_rgba(8,145,178,0.12)] backdrop-blur-md md:p-12">
              <AnimatedSection>
                <h2
                  className="font-display font-thin text-[#0F172A]"
                  style={{
                    fontSize: "clamp(30px, 4.5vw, 48px)",
                    lineHeight: 1.1,
                  }}
                >
                  Ready to Achieve More?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 md:text-base">
                  We partner with ambitious companies to solve complex
                  challenges, improve operations and deliver real results using
                  tailored digital solutions.
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


