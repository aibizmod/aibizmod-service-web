"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight, Sparkles, ChevronDown } from "lucide-react";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

export interface MorphHeroItem {
  src: string;
  title: string;
  category?: string;
  description?: string;
  href: string;
  slug?: string;
}

interface FlipCardProps {
  item: MorphHeroItem;
  index: number;
  total: number;
  phase: AnimationPhase;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
  cardW: number;
  cardH: number;
  onSelect?: (item: MorphHeroItem) => void;
}

// --- FlipCard Component ---
function FlipCard({ item, target, cardW, cardH, onSelect }: FlipCardProps) {
  const cardContent = (
    <motion.div
      className="relative h-full w-full"
      style={{ transformStyle: "preserve-3d" }}
      transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ rotateY: 180, scale: 1.06 }}
    >
      {/* Front Face */}
      <div
        className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl shadow-xl border border-cyan-100/90 bg-slate-900 transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_12px_36px_rgba(8,145,178,0.35)]"
        style={{ backfaceVisibility: "hidden" }}
      >
        <img
          src={item.src}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/30 to-transparent" />
        <div className="absolute bottom-2.5 inset-x-2 text-center">
          {item.category && (
            <span className="block text-[8px] font-bold uppercase tracking-wider text-cyan-300 drop-shadow-sm truncate">
              {item.category}
            </span>
          )}
          <p className="text-[11px] font-bold text-white leading-tight drop-shadow-md mt-0.5 line-clamp-2">
            {item.title}
          </p>
        </div>
      </div>

      {/* Back Face */}
      <div
        className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl shadow-2xl bg-[#0F172A] flex flex-col items-center justify-between p-3 border-2 border-cyan-400 text-center"
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
      >
        <div className="w-full">
          <span className="block text-[8px] font-bold text-cyan-400 uppercase tracking-widest truncate">
            {item.category || "Sector"}
          </span>
          <p className="text-[12px] font-bold text-white leading-tight mt-0.5 line-clamp-2">
            {item.title}
          </p>
        </div>
        <p className="text-[9px] text-slate-300 line-clamp-3 leading-snug px-0.5">
          {item.description || "Custom architecture, automated AI workflows, and resilient platforms."}
        </p>
        <div className="w-full flex items-center justify-center gap-1 rounded-full bg-cyan-500 px-2.5 py-1 text-[9px] font-bold text-white shadow hover:bg-cyan-400 transition-colors">
          <span>Explore</span>
          <ArrowUpRight size={10} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: "spring", stiffness: 45, damping: 18 }}
      style={{
        position: "absolute",
        width: cardW,
        height: cardH,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="cursor-pointer group select-none"
      onClick={() => onSelect?.(item)}
    >
      {item.href ? (
        <Link href={item.href} className="block w-full h-full" tabIndex={-1}>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </motion.div>
  );
}

// --- 20 Complete Vertical Items ---
const TOTAL_IMAGES = 20;
const MAX_SCROLL = 3000;
const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

const DEFAULT_HERO_ITEMS: MorphHeroItem[] = [
  { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80&auto=format&fit=crop", title: "Retail & E-commerce", category: "Retail E-comm...", description: "Inventory automation, AI personalization, and headless checkout.", href: "/industries/retail-ecommerce", slug: "retail-ecommerce" },
  { src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&q=80&auto=format&fit=crop", title: "Finance & Banking", category: "Finance", description: "Compliance automation, risk scoring models, and banking dashboards.", href: "/industries/finance", slug: "finance" },
  { src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80&auto=format&fit=crop", title: "Healthcare & Med", category: "Healthcare", description: "HIPAA-compliant platforms, EHR integration, and clinical AI.", href: "/industries/healthcare", slug: "healthcare" },
  { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80&auto=format&fit=crop", title: "Manufacturing & Logistics", category: "Manufacturing &...", description: "Predictive maintenance, IoT telemetry, and supply chain automation.", href: "/industries/manufacturing-logistics", slug: "manufacturing-logistics" },
  { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80&auto=format&fit=crop", title: "SaaS & Subscription", category: "SaaS & Subscrip...", description: "Product analytics, churn mitigation, and metered billing platforms.", href: "/industries/saas-subscription", slug: "saas-subscription" },
  { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80&auto=format&fit=crop", title: "Professional Services", category: "Professional Serv...", description: "CRM automation, real-time margins, and client portals.", href: "/industries/professional-services", slug: "professional-services" },
  { src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&q=80&auto=format&fit=crop", title: "Legal & Compliance", category: "Legal & Complia...", description: "Contract analysis, document review, and case management.", href: "/industries/legal", slug: "legal" },
  { src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&q=80&auto=format&fit=crop", title: "Education & EdTech", category: "Education", description: "Adaptive LMS, student engagement, and automated grading.", href: "/industries/education", slug: "education" },
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80&auto=format&fit=crop", title: "Real Estate & Prop", category: "Real Estate & Pro...", description: "Valuation models, tenant screening, and listing portals.", href: "/industries/real-estate", slug: "real-estate" },
  { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80&auto=format&fit=crop", title: "Hospitality & Leisure", category: "Hospitality & Foo...", description: "Booking engines, guest messaging, and RevPAR models.", href: "/industries/hospitality", slug: "hospitality" },
  { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80&auto=format&fit=crop", title: "Sales & CRM", category: "Sales & CRM", description: "Lead scoring, data enrichment, and revenue forecasting.", href: "/industries/sales-crm", slug: "sales-crm" },
  { src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80&auto=format&fit=crop", title: "HR & Recruitment", category: "HR & Recruitment", description: "ATS platforms, resume parsing, and employee self-service apps.", href: "/industries/hr-recruitment", slug: "hr-recruitment" },
  { src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&q=80&auto=format&fit=crop", title: "Fitness & Wellness", category: "Fitness & Wellness", description: "Member retention models, workout scheduling, and branded apps.", href: "/industries/fitness", slug: "fitness" },
  { src: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500&q=80&auto=format&fit=crop", title: "Content & Media", category: "Content & Media", description: "CMS architectures, content syndication, and paywall systems.", href: "/industries/content-media", slug: "content-media" },
  { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80&auto=format&fit=crop", title: "Customer Support", category: "Customer Support", description: "AI support agents, ticket routing, and CSAT dashboards.", href: "/industries/customer-support", slug: "customer-support" },
  { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80&auto=format&fit=crop", title: "Telecom & IoT", category: "Telecom", description: "Edge telemetry, device provisioning, and network observability.", href: "/contact", slug: "telecom" },
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80&auto=format&fit=crop", title: "Cybersecurity", category: "Security", description: "Threat detection pipelines, SOC 2 compliance, and zero trust.", href: "/contact", slug: "cybersecurity" },
  { src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80&auto=format&fit=crop", title: "GovTech & Public", category: "Public", description: "Secure citizen portals, public registries, and audit compliance.", href: "/contact", slug: "govtech" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80&auto=format&fit=crop", title: "Energy & Utilities", category: "Energy", description: "Smart grid analytics, metered consumption, and asset management.", href: "/contact", slug: "energy" },
  { src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500&q=80&auto=format&fit=crop", title: "Biotech & Pharma", category: "BioTech", description: "Lab data automation, clinical trial analytics, and compliance.", href: "/contact", slug: "biotech" },
];

export interface ScrollMorphHeroProps {
  items?: MorphHeroItem[];
  title?: string;
  subtitle?: string;
  className?: string;
  onSelectIndustry?: (item: MorphHeroItem) => void;
}

export default function ScrollMorphHero({
  items = DEFAULT_HERO_ITEMS,
  subtitle = "We engineer custom software architectures, AI workflow automations, and resilient digital platforms tailored to your industry.",
  className = "",
  onSelectIndustry,
}: ScrollMorphHeroProps) {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewRef = useRef(false);

  const displayItems = useMemo(() => {
    const src = items && items.length > 0 ? items : DEFAULT_HERO_ITEMS;
    if (src.length >= TOTAL_IMAGES) return src.slice(0, TOTAL_IMAGES);
    const repeated: MorphHeroItem[] = [];
    while (repeated.length < TOTAL_IMAGES && src.length > 0) {
      repeated.push(...src);
    }
    return repeated.slice(0, TOTAL_IMAGES);
  }, [items]);

  // Proportional card dimensions
  const isMobile = containerSize.width > 0 && containerSize.width < 768;
  const cardW = isMobile ? 80 : 108;
  const cardH = isMobile ? 114 : 152;

  // --- Resize Observer ---
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        setContainerSize({ width: e.contentRect.width, height: e.contentRect.height });
      }
    });
    obs.observe(el);
    setContainerSize({ width: el.offsetWidth, height: el.offsetHeight });
    return () => obs.disconnect();
  }, []);

  // --- Virtual scroll state ---
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  // --- Lenis integration: smooth scrolling control ---
  const lenisStoppedRef = useRef(false);

  const getLenis = useCallback(() => {
    return (window as unknown as { lenis?: { stop: () => void; start: () => void; scrollTo: (target: HTMLElement | string, options?: Record<string, unknown>) => void } }).lenis;
  }, []);

  const stopLenis = useCallback(() => {
    if (!lenisStoppedRef.current) {
      getLenis()?.stop();
      lenisStoppedRef.current = true;
    }
  }, [getLenis]);

  const startLenis = useCallback(() => {
    if (lenisStoppedRef.current) {
      getLenis()?.start();
      lenisStoppedRef.current = false;
    }
  }, [getLenis]);

  // Helper to check if hero is in primary centered/top position
  const isHeroCentered = useCallback(() => {
    if (!containerRef.current) return false;
    const rect = containerRef.current.getBoundingClientRect();
    return rect.top >= -60 && rect.top <= 180;
  }, []);

  // Smooth scroll to next directory section
  const scrollToDirectory = useCallback(() => {
    startLenis();
    const target = document.getElementById("industry-directory");
    if (target) {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(target, { offset: -20 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [getLenis, startLenis]);

  // Track section visibility
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting && isHeroCentered() && scrollRef.current < MAX_SCROLL) {
          stopLenis();
        } else {
          startLenis();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      startLenis();
    };
  }, [stopLenis, startLenis, isHeroCentered]);

  // Wheel listener: Seamless scroll transition
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isInViewRef.current) {
        startLenis();
        return;
      }

      if (!isHeroCentered()) {
        startLenis();
        return;
      }

      const current = scrollRef.current;
      const delta = e.deltaY;
      const atTop = current <= 0 && delta < 0;
      const atBottom = current >= MAX_SCROLL && delta > 0;

      // At bottom boundary scrolling down: seamlessly transition to directory section!
      if (atBottom) {
        startLenis();
        scrollToDirectory();
        return;
      }

      if (atTop) {
        startLenis();
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      stopLenis();

      const newScroll = Math.min(Math.max(current + delta, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [virtualScroll, stopLenis, startLenis, isHeroCentered, scrollToDirectory]);

  // Pointer drag to rotate
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a")) return;
      isDragging.current = true;
      dragStartX.current = e.clientX;
      dragStartScroll.current = scrollRef.current;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = dragStartX.current - e.clientX;
      const next = Math.min(Math.max(dragStartScroll.current + dx * 3.5, 0), MAX_SCROLL);
      scrollRef.current = next;
      virtualScroll.set(next);
    };
    const onUp = (e: PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      try { el.releasePointerCapture(e.pointerId); } catch {}
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [virtualScroll]);

  // Morph: 0 (Circle) -> 1 (Arc)
  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 45, damping: 20 });

  // Rotation in Arc mode
  const scrollRotate = useTransform(virtualScroll, [600, MAX_SCROLL], [0, 360]);
  const smoothRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  // Mouse Parallax for subtle 3D depth
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseX.set(nx * 90);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX]);

  // Intro sequence: Scatter -> Line -> Circle
  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase("line"), 400);
    const t2 = setTimeout(() => setIntroPhase("circle"), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Scatter positions
  const scatterPos = useMemo(() =>
    Array.from({ length: TOTAL_IMAGES }).map(() => ({
      x: (Math.random() - 0.5) * 1600,
      y: (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    })),
  []);

  // Subscribed values
  const [morphVal, setMorphVal] = useState(0);
  const [rotateVal, setRotateVal] = useState(0);
  const [parallaxVal, setParallaxVal] = useState(0);

  useEffect(() => {
    const u1 = smoothMorph.on("change", setMorphVal);
    const u2 = smoothRotate.on("change", setRotateVal);
    const u3 = smoothMouseX.on("change", setParallaxVal);
    return () => { u1(); u2(); u3(); };
  }, [smoothMorph, smoothRotate, smoothMouseX]);

  const contentOpacity = useTransform(smoothMorph, [0.75, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.75, 1], [20, 0]);

  // Expanded circle radius
  const circleRadius = useMemo(() => {
    const containerW = containerSize.width || 1200;
    const containerH = containerSize.height || 850;
    if (isMobile) {
      return Math.min(containerW * 0.40, 260);
    }
    return Math.min(containerW * 0.36, containerH * 0.46, 410);
  }, [containerSize, isMobile]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[820px] sm:h-[880px] lg:h-[940px] overflow-hidden bg-gradient-to-b from-[#F0FDFF] via-white to-white select-none cursor-grab active:cursor-grabbing ${className}`}
    >
      {/* Background radial glow & subtle grid */}
      <div className="pointer-events-none absolute left-1/2 top-24 z-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "linear-gradient(rgba(15,23,42,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,0.04) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />

      <div className="flex h-full w-full flex-col items-center justify-center relative z-10" style={{ perspective: "1200px" }}>
        {/* Intro text in the middle of the circle */}
        <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2 px-6 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={introPhase === "circle" && morphVal < 0.45 ? { opacity: 1 - morphVal * 2.2, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 shadow-sm backdrop-blur-md mb-3.5"
          >
            <Sparkles size={13} className="text-cyan-600" />
            20+ Enterprise Sectors
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={
              introPhase === "circle" && morphVal < 0.45
                ? { opacity: 1 - morphVal * 2.2, y: 0, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 1 }}
            className="font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-4xl md:text-5xl leading-[1.12] text-balance"
          >
            Engineering Systems for <span className="shimmer-blue font-serif italic font-normal">Modern Industry</span>
          </motion.h1>
        </div>

        {/* Arc Heading Content */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute top-[4%] sm:top-[6%] z-20 flex flex-col items-center text-center px-4 max-w-3xl pointer-events-none"
        >
          <h2
            className="font-display font-thin text-[#0F172A] text-balance"
            style={{ fontSize: "clamp(28px, 4.2vw, 50px)", lineHeight: 1.05 }}
          >
            Technology Solutions for <span className="shimmer-blue font-serif italic font-normal">Every Sector</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">{subtitle}</p>
        </motion.div>

        {/* 20 Cards Ring / Arc */}
        <div className="relative flex items-center justify-center w-full h-full">
          {displayItems.map((item, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPos[i] || { x: 0, y: 0, rotation: 0, scale: 0.6, opacity: 0 };
            } else if (introPhase === "line") {
              const spacing = isMobile ? 88 : 118;
              const totalW = TOTAL_IMAGES * spacing;
              target = { x: i * spacing - totalW / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              // 1. Circle coordinates
              const angle = (i / TOTAL_IMAGES) * 360;
              const rad = (angle * Math.PI) / 180;
              const cx = Math.cos(rad) * circleRadius;
              const cy = Math.sin(rad) * circleRadius;

              // 2. Arc coordinates
              const containerW = containerSize.width || 1200;
              const containerH = containerSize.height || 850;
              const arcR = Math.min(containerW, containerH * 1.6) * (isMobile ? 1.4 : 1.22);
              const arcApex = containerH * (isMobile ? 0.36 : 0.28);
              const arcCY = arcApex + arcR;
              const spread = isMobile ? 125 : 155;
              const startA = -90 - spread / 2;
              const step = spread / (TOTAL_IMAGES - 1);

              const progress = Math.min(Math.max(rotateVal / 360, 0), 1);
              const sweep = spread * 1.1;
              const arcAngle = startA + i * step - progress * sweep;
              const arcRad = (arcAngle * Math.PI) / 180;

              const ax = Math.cos(arcRad) * arcR + parallaxVal;
              const ay = Math.sin(arcRad) * arcR + arcCY;
              const arcScale = isMobile ? 1.15 : 1.45;

              target = {
                x: lerp(cx, ax, morphVal),
                y: lerp(cy, ay, morphVal),
                rotation: lerp(angle + 90, arcAngle + 90, morphVal),
                scale: lerp(1, arcScale, morphVal),
                opacity: 1,
              };
            }

            return (
              <FlipCard
                key={i}
                item={item}
                index={i}
                total={TOTAL_IMAGES}
                phase={introPhase}
                target={target}
                cardW={cardW}
                cardH={cardH}
                onSelect={onSelectIndustry}
              />
            );
          })}
        </div>

        {/* Seamless Transition Pill to Next Section */}
        {morphVal > 0.5 && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={scrollToDirectory}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-2 rounded-full border border-cyan-200/80 bg-white/90 px-5 py-2 text-xs font-semibold text-[#0F172A] shadow-md backdrop-blur-md transition hover:bg-cyan-50 hover:border-cyan-400 hover:scale-105 active:scale-95"
          >
            <span>Explore Industry Blueprints</span>
            <ChevronDown size={14} className="animate-bounce text-cyan-600" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
