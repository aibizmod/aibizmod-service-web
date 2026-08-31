"use client";

/**
 * InversionCircleScrollAnimation (Dual-Mode Glowing Waves with Mouse Hover Interaction)
 *
 * Theme-aware scroll-driven animation:
 *   - Interactive Mouse Physics: Wave strands displace and ripple reactively as the cursor hovers and moves across the screen.
 *   - Light Mode: Seamless flowing cyan & slate wave strands across the white surface.
 *   - Dark Mode: Inverted electric neon cyan waves glowing against midnight obsidian (#09101D).
 *   - Phase 1: Obsidian circle rises with glowing neon cyan ring (Power4 InOut easing).
 *   - Phase 2: Circle expands to fill the screen with zero clipping/square artifacts.
 *   - Transformation Blueprint section features the signature aibizmod Core Values card with floating vector art.
 */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { industryArtworks } from "@/data/industry-artworks";

const BALL_SIZE = 380; // px — fixed diameter during Phase 1 travel

export interface InversionCircleScrollAnimationProps {
  eyebrow?: string;
  heroTitle?: string | React.ReactNode;
  heroSubtitle?: string | React.ReactNode;
  contentLabel?: string;
  contentHeading?: string | React.ReactNode;
  contentDescription?: string | React.ReactNode;
  industrySlug?: string;
  artwork?: React.ReactNode;
  cardNum?: string;
  cardTag?: string;
  cardLabel?: string;
  cardDesc?: string;
  features?: string[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export default function InversionCircleScrollAnimation({
  eyebrow = "Enterprise Transformation",
  heroTitle = "Design that moves.",
  heroSubtitle = "Transforming complex industry operations into autonomous, scalable digital engines.",
  contentLabel = "Transformation Blueprint",
  contentHeading = (
    <>
      Engineered with intention.<br />
      <span className="text-cyan-600">Built for enterprise scale.</span>
    </>
  ),
  contentDescription = "From discovery to high-throughput scale — we engineer the digital infrastructure that drives measurable growth and operational reliability.",
  industrySlug = "retail-ecommerce",
  artwork,
  cardNum = "001",
  cardTag = "SYSTEM ARCHITECTURE",
  cardLabel = "BLUEPRINT",
  cardDesc = "Enterprise-grade digital infrastructure engineered for continuous scalability, security, and sub-second SLAs.",
  features = [
    "Sub-100ms API response latency",
    "Continuous compliance & security hardening",
    "High-concurrency cloud telemetry pipelines",
  ],
  ctaText = "Schedule Architecture Consultation",
  ctaHref = "/contact",
  className = "",
}: InversionCircleScrollAnimationProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const lightCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const darkCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeArtwork = artwork || industryArtworks[industrySlug] || industryArtworks["retail-ecommerce"];

  const [state, setState] = useState({
    ballSize: BALL_SIZE,
    yOff: 400,
    clipX: 400,
    clipY: 800,
    clipR: BALL_SIZE / 2,
    contentActive: false,
    ringOpacity: 1,
  });

  // Synchronized Dual-Mode Reactive Glowing Waves Animation (with Mouse Physics)
  useEffect(() => {
    const lightCanvas = lightCanvasRef.current;
    const darkCanvas = darkCanvasRef.current;

    let animId: number;
    let time = 0;

    // Mouse physics config
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouseInfluence = prefersReducedMotion ? 15 : 75;
    const influenceRadius = prefersReducedMotion ? 180 : 340;
    const smoothing = prefersReducedMotion ? 0.04 : 0.08;

    const recenterMouse = () => {
      const w = window.innerWidth || 1200;
      const h = window.innerHeight || 800;
      const center = { x: w / 2, y: h / 2 };
      mouseRef.current = center;
      targetMouseRef.current = center;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) {
        targetMouseRef.current = { x: e.clientX, y: e.clientY };
        return;
      }
      const rect = heroRef.current.getBoundingClientRect();
      targetMouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      recenterMouse();
    };

    // Synchronized wave parameters
    const waveDefs = [
      { offset: 0, amplitude: 55, frequency: 0.0032, speed: 0.002 },
      { offset: Math.PI / 2, amplitude: 75, frequency: 0.0026, speed: 0.0025 },
      { offset: Math.PI, amplitude: 48, frequency: 0.0038, speed: 0.0018 },
      { offset: Math.PI * 1.5, amplitude: 65, frequency: 0.0024, speed: 0.0022 },
      { offset: Math.PI * 2, amplitude: 40, frequency: 0.0042, speed: 0.0028 },
    ];

    // Color palettes for Light vs Dark
    const lightPalette = [
      { color: "rgba(8, 145, 178, 0.45)", opacity: 0.55, width: 2.2, blur: 14, blurColor: "rgba(8, 145, 178, 0.3)" },
      { color: "rgba(2, 132, 199, 0.35)", opacity: 0.45, width: 2.0, blur: 12, blurColor: "rgba(2, 132, 199, 0.25)" },
      { color: "rgba(15, 23, 42, 0.22)", opacity: 0.35, width: 1.8, blur: 8, blurColor: "rgba(15, 23, 42, 0.15)" },
      { color: "rgba(6, 182, 212, 0.40)", opacity: 0.50, width: 2.0, blur: 12, blurColor: "rgba(6, 182, 212, 0.25)" },
      { color: "rgba(14, 116, 144, 0.28)", opacity: 0.40, width: 1.6, blur: 8, blurColor: "rgba(14, 116, 144, 0.2)" },
    ];

    const darkPalette = [
      { color: "rgba(34, 211, 238, 0.95)", opacity: 0.85, width: 2.5, blur: 32, blurColor: "#22D3EE" },
      { color: "rgba(103, 232, 249, 0.85)", opacity: 0.75, width: 2.2, blur: 28, blurColor: "#67E8F9" },
      { color: "rgba(14, 165, 233, 0.75)", opacity: 0.65, width: 2.0, blur: 24, blurColor: "#0EA5E9" },
      { color: "rgba(6, 182, 212, 0.80)", opacity: 0.70, width: 2.2, blur: 26, blurColor: "#06B6D4" },
      { color: "rgba(56, 189, 248, 0.65)", opacity: 0.55, width: 1.8, blur: 20, blurColor: "#38BDF8" },
    ];

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (lightCanvas) {
        lightCanvas.width = w;
        lightCanvas.height = h;
      }
      if (darkCanvas) {
        darkCanvas.width = w;
        darkCanvas.height = h;
      }
      recenterMouse();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      time += 1;

      // Smooth mouse lerping
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      // Render Light Waves (White Background)
      if (lightCanvas) {
        const ctxL = lightCanvas.getContext("2d");
        if (ctxL) {
          ctxL.clearRect(0, 0, lightCanvas.width, lightCanvas.height);
          waveDefs.forEach((w, idx) => {
            const style = lightPalette[idx % lightPalette.length];
            ctxL.save();
            ctxL.beginPath();

            for (let x = 0; x <= lightCanvas.width; x += 4) {
              const dx = x - mouseRef.current.x;
              const dy = lightCanvas.height / 2 - mouseRef.current.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const influence = Math.max(0, 1 - distance / influenceRadius);
              const mouseEffect = influence * mouseInfluence * Math.sin(time * 0.0015 + x * 0.01 + w.offset);

              const y =
                lightCanvas.height / 2 +
                Math.sin(x * w.frequency + time * w.speed + w.offset) * w.amplitude +
                Math.sin(x * w.frequency * 0.45 + time * (w.speed * 1.2)) * (w.amplitude * 0.4) +
                mouseEffect;

              if (x === 0) {
                ctxL.moveTo(x, y);
              } else {
                ctxL.lineTo(x, y);
              }
            }

            ctxL.lineWidth = style.width;
            ctxL.strokeStyle = style.color;
            ctxL.globalAlpha = style.opacity;
            ctxL.shadowBlur = style.blur;
            ctxL.shadowColor = style.blurColor;
            ctxL.stroke();
            ctxL.restore();
          });
        }
      }

      // Render Inverted Dark Neon Waves (Obsidian Background)
      if (darkCanvas) {
        const ctxD = darkCanvas.getContext("2d");
        if (ctxD) {
          ctxD.clearRect(0, 0, darkCanvas.width, darkCanvas.height);
          waveDefs.forEach((w, idx) => {
            const style = darkPalette[idx % darkPalette.length];
            ctxD.save();
            ctxD.beginPath();

            for (let x = 0; x <= darkCanvas.width; x += 4) {
              const dx = x - mouseRef.current.x;
              const dy = darkCanvas.height / 2 - mouseRef.current.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const influence = Math.max(0, 1 - distance / influenceRadius);
              const mouseEffect = influence * mouseInfluence * Math.sin(time * 0.0015 + x * 0.01 + w.offset);

              const y =
                darkCanvas.height / 2 +
                Math.sin(x * w.frequency + time * w.speed + w.offset) * w.amplitude +
                Math.sin(x * w.frequency * 0.45 + time * (w.speed * 1.2)) * (w.amplitude * 0.4) +
                mouseEffect;

              if (x === 0) {
                ctxD.moveTo(x, y);
              } else {
                ctxD.lineTo(x, y);
              }
            }

            ctxD.lineWidth = style.width;
            ctxD.strokeStyle = style.color;
            ctxD.globalAlpha = style.opacity;
            ctxD.shadowBlur = style.blur;
            ctxD.shadowColor = style.blurColor;
            ctxD.stroke();
            ctxD.restore();
          });
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Scroll Geometry Tracking
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (!trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const viewH = window.innerHeight || 800;
      const viewW = window.innerWidth || 1200;

      // Track scroll progress through the 260vh track
      const trackH = trackRef.current.offsetHeight;
      const scrollDist = trackH - viewH;
      const currentScroll = Math.max(0, -rect.top);
      const progress = scrollDist > 0 ? Math.min(1, Math.max(0, currentScroll / scrollDist)) : 0;

      // Phase 1 (0 -> 0.5) & Phase 2 (0.5 -> 1.0)
      const p1 = Math.min(1, Math.max(0, progress * 2));
      const p2 = Math.min(1, Math.max(0, (progress - 0.5) * 2));

      // Easing functions
      const p1e = p1 < 0.5 ? 8 * Math.pow(p1, 4) : 1 - Math.pow(-2 * p1 + 2, 4) / 2;
      const p2e = Math.pow(p2, 2.0);

      // Geometry calculations
      const yOff = (1 - p1e) * (viewH / 2 + BALL_SIZE / 2);
      const coverSize = Math.max(viewW, viewH) * 2.8;
      const ballSize = BALL_SIZE + p2e * (coverSize - BALL_SIZE);
      const clipX = viewW / 2;
      const clipY = viewH / 2 + yOff;
      const clipR = ballSize / 2;

      // Ring border fades out as the circle expands to fill the entire screen
      const ringOpacity = Math.max(0, 1 - Math.pow(p2, 1.8));

      // Check content section entrance
      let isContentOn = false;
      if (contentRef.current) {
        const cRect = contentRef.current.getBoundingClientRect();
        if (cRect.top < viewH * 0.75) {
          isContentOn = true;
        }
      }

      setState({
        ballSize,
        yOff,
        clipX,
        clipY,
        clipR,
        contentActive: isContentOn,
        ringOpacity,
      });
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <>
      <Styles />
      <div className={`icsa-outer-wrap ${className}`}>
        {/* 260vh Scroll Track */}
        <div ref={trackRef} className="icsa-track">
          {/* Pinned Sticky Hero Section */}
          <section ref={heroRef} className="icsa-hero">
            
            {/* ── 1. LIGHT SURFACE (White Background with Cyan Wave Lines) ── */}
            <div className="icsa-layer icsa-dark">
              {/* Waves canvas on white background */}
              <canvas
                ref={lightCanvasRef}
                className="absolute inset-0 h-full w-full pointer-events-none z-0 opacity-90"
                aria-hidden="true"
              />

              {/* Ambient light glow */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl pointer-events-none" />

              {/* Light layer content */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
                {eyebrow && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/90 bg-cyan-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800 backdrop-blur-md mb-5 shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                    {eyebrow}
                  </div>
                )}
                <h2 className="icsa-title text-[#0F172A]">{heroTitle}</h2>
                <p className="icsa-subtitle text-slate-600">{heroSubtitle}</p>
              </div>
            </div>

            {/* ── 2. INVERTED DARK LAYER (Midnight Obsidian with Neon Waves) ── */}
            <div
              className="icsa-layer icsa-light"
              style={{
                clipPath: `circle(${state.clipR}px at ${state.clipX}px ${state.clipY}px)`,
                WebkitClipPath: `circle(${state.clipR}px at ${state.clipX}px ${state.clipY}px)`,
              }}
            >
              {/* Inverted electric neon cyan waves */}
              <canvas
                ref={darkCanvasRef}
                className="absolute inset-0 h-full w-full pointer-events-none z-0 opacity-90"
                aria-hidden="true"
              />

              {/* Midnight ambient lights */}
              <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-cyan-500/20 blur-[130px] pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-blue-600/20 blur-[130px] pointer-events-none" />

              {/* Dark layer content */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
                {eyebrow && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300 backdrop-blur-md mb-5 shadow-[0_0_16px_rgba(34,211,238,0.25)]">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
                    {eyebrow}
                  </div>
                )}
                <h2 className="icsa-title text-white">{heroTitle}</h2>
                <p className="icsa-subtitle text-slate-300">{heroSubtitle}</p>
              </div>
            </div>

            {/* ── 3. CRISP GLOWING CYAN CIRCULAR RING (Zero Square Artifacts) ── */}
            <div
              className="icsa-ring"
              style={{
                width: `${state.ballSize}px`,
                height: `${state.ballSize}px`,
                transform: `translate(-50%, calc(-50% + ${state.yOff}px))`,
                opacity: state.ringOpacity,
              }}
            />

          </section>
        </div>

        {/* Reveal Content Section (Transformation Blueprint with About Page Core Values Card) */}
        <section ref={contentRef} className={`icsa-cs${state.contentActive ? " on" : ""}`}>
          <div className="icsa-inner-container max-w-7xl mx-auto w-full px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Narrative, Pillars & CTA */}
              <div className="flex flex-col items-start text-left">
                <span className="icsa-label inline-flex items-center gap-1.5 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                  {contentLabel}
                </span>

                <h2 className="icsa-reveal-heading font-display font-bold text-[#0F172A] tracking-tight">
                  {contentHeading}
                </h2>

                <p className="icsa-reveal-desc mt-4 text-slate-600 font-light leading-relaxed">
                  {contentDescription}
                </p>

                {/* Feature / Trust Pillars */}
                {features && features.length > 0 && (
                  <div className="mt-7 space-y-2.5 w-full">
                    {features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 rounded-xl border border-cyan-100 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-sm"
                      >
                        <CheckCircle2 className="h-4 w-4 text-cyan-600 shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-slate-700">{feat}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <div className="icsa-btn-wrap mt-8">
                  <Link
                    href={ctaHref}
                    className="group relative inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-700 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_18px_rgba(8,145,178,0.28)] transition-all duration-300 hover:from-cyan-500 hover:to-cyan-600 hover:shadow-[0_8px_26px_rgba(8,145,178,0.42)] hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>{ctaText}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Custom Core Values Style Card with Floating Vector Artwork */}
              <div className="relative w-full flex justify-center">
                <article className="card relative h-[420px] w-full max-w-md overflow-hidden rounded-[32px] border border-[#0F172A]/10 bg-white p-6 flex flex-col justify-end shadow-[0_12px_36px_rgba(8,145,178,0.12)]">
                  {/* Radial Glow & Grain Overlay */}
                  <div className="absolute inset-0 z-0 glow pointer-events-none" />
                  <div className="grain absolute inset-0 pointer-events-none" />

                  {/* Top Left Number & Top Right Tag */}
                  <div className="absolute top-6 left-6 font-mono text-sm font-bold text-[#0F172A]/40">
                    {cardNum}
                  </div>
                  <div className="absolute top-6 right-6 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: "var(--fc)" }} />
                    <span className="font-mono text-[10px] font-bold tracking-widest text-[#0F172A]/50">
                      {cardLabel}
                    </span>
                  </div>

                  {/* Floating Vector Artwork */}
                  <div className="art absolute inset-x-0 top-0 bottom-28 z-10 flex items-center justify-center pointer-events-none">
                    <div className="float relative w-60 h-60">
                      {activeArtwork}
                    </div>
                  </div>

                  {/* Bottom Glass Content Card */}
                  <div className="relative z-20 rounded-2xl border border-[#0F172A]/10 bg-white/90 backdrop-blur-md p-4 shadow-[0_4px_24px_rgba(15,23,42,0.06)]">
                    <span className="tag-chip mb-2 inline-block rounded-full px-3 py-1 text-[11px] font-bold tracking-wide">
                      {cardTag}
                    </span>
                    <p className="text-[13.5px] leading-relaxed text-slate-700 font-sans font-medium">
                      {cardDesc}
                    </p>
                  </div>
                </article>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function Styles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          .icsa-outer-wrap {
            width: 100%;
            font-family: var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif;
            background: #ffffff;
            position: relative;
          }

          .icsa-outer-wrap *, .icsa-outer-wrap *::before, .icsa-outer-wrap *::after {
            box-sizing: border-box;
          }

          /* 260vh scroll track */
          .icsa-track {
            height: 260vh;
            position: relative;
            background: #ffffff;
          }

          /* Pinned hero */
          .icsa-hero {
            position: sticky;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: default;
          }

          /* Typography and canvas layers */
          .icsa-layer {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            width: 100%;
            height: 100%;
          }

          .icsa-dark {
            background: #ffffff;
            z-index: 2;
          }

          .icsa-light {
            background: #09101D;
            z-index: 3;
            will-change: clip-path;
          }

          /* Glowing neon cyan circular ring with flawless curvature */
          .icsa-ring {
            position: absolute;
            top: 50%;
            left: 50%;
            border-radius: 9999px;
            border: 2px solid rgba(34, 211, 238, 0.7);
            will-change: transform, width, height, opacity;
            pointer-events: none;
            z-index: 4;
            box-shadow: 0 0 50px rgba(34, 211, 238, 0.4),
                        0 0 100px rgba(8, 145, 178, 0.25),
                        inset 0 0 30px rgba(34, 211, 238, 0.2);
            transition: opacity 0.2s ease-out;
          }

          /* Harmonized Title Font Scale */
          .icsa-title {
            font-family: var(--font-general-sans), var(--font-inter), 'Inter', sans-serif;
            font-size: clamp(28px, 4vw, 46px);
            font-weight: 800;
            letter-spacing: -0.025em;
            line-height: 1.1;
            margin: 0;
            max-width: 820px;
          }

          /* Harmonized Subtitle Font Scale */
          .icsa-subtitle {
            font-size: clamp(15px, 1.4vw, 17px);
            font-weight: 400;
            line-height: 1.65;
            margin-top: 1rem;
            max-width: 600px;
            letter-spacing: normal;
          }

          /* Content section with smooth aibizmod theme transition */
          .icsa-cs {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 6rem 1.5rem;
            background: #09101D;
            color: #FFFFFF;
            position: relative;
            z-index: 10;
            transition: background 1.5s cubic-bezier(.25,0,.1,1),
                        color 1.5s cubic-bezier(.25,0,.1,1);
          }

          .icsa-cs.on {
            background: #F8FEFF;
            color: #0F172A;
            border-top: 1px solid #E0F2FE;
            border-bottom: 1px solid #E0F2FE;
          }

          .icsa-inner-container > * {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
          }

          .icsa-cs.on .icsa-inner-container > * {
            opacity: 1;
            transform: translateY(0);
          }

          .icsa-label {
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: #0891B2;
          }

          .icsa-reveal-heading {
            font-family: var(--font-general-sans), var(--font-inter), 'Inter', sans-serif;
            font-size: clamp(24px, 3.2vw, 38px);
            font-weight: 800;
            letter-spacing: -0.02em;
            line-height: 1.15;
            margin: 0;
          }

          .icsa-cs.on .icsa-reveal-heading {
            color: #0E7490;
          }

          .icsa-reveal-desc {
            font-size: clamp(14px, 1.2vw, 16px);
            line-height: 1.7;
            color: #64748B;
            max-width: 580px;
            margin: 0;
          }

          /* ── About Page Core Values Card Styles ────────────────────────── */
          .card {
            --fc: #0891B2;
            --fc-light: #CFFAFE;
            --fc-dark: #ECFEFF;
            transition: transform .5s cubic-bezier(.2,.8,.2,1), box-shadow .5s cubic-bezier(.2,.8,.2,1);
          }

          .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px -12px rgba(8,145,178,.22), 0 8px 16px -8px rgba(15,23,42,.08);
          }

          .card .art {
            transition: transform .6s cubic-bezier(.2,.8,.2,1);
          }

          .card:hover .art {
            transform: scale(1.14) translateY(-10px);
          }

          .card .art .float {
            animation: floaty 6s ease-in-out infinite;
            transform-origin: center;
          }

          .card .art .float-slow {
            animation: floaty 9s ease-in-out infinite;
          }

          @keyframes floaty {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-6px) rotate(-1.5deg); }
          }

          .card:hover .art .float {
            animation-play-state: paused;
          }

          .glow {
            background: radial-gradient(circle at 50% 28%, var(--fc-light) 0%, transparent 68%);
            opacity: .65;
          }

          .tag-chip {
            background: var(--fc-dark);
            color: var(--fc);
          }

          .grain::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background-image: radial-gradient(rgba(15,23,42,.05) 1px, transparent 1px);
            background-size: 3px 3px;
            opacity: .4;
            mix-blend-mode: multiply;
          }

          @media (prefers-reduced-motion: reduce) {
            .card, .card .art, .card .art .float, .card .art .float-slow {
              transition: none !important;
              animation: none !important;
            }
          }
        `,
      }}
    />
  );
}
