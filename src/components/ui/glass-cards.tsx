"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  ArrowRight,
  Code2,
  Lightbulb,
  Server,
  Smartphone,
  TrendingUp,
  Users,
  Zap,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import { StarButton } from "@/components/ui/star-button";

gsap.registerPlugin(ScrollTrigger);

type WhatWeDoCard = {
  id: number;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

const whatWeDoCards: WhatWeDoCard[] = [
  {
    id: 1,
    title: "AI & Automation",
    description:
      "We build AI agents, automated workflows, and smart integrations that save your team time and reduce manual work.",
    href: "/services/ai-automation",
    icon: Zap,
  },
  {
    id: 2,
    title: "Digital Marketing",
    description:
      "We improve search, content, campaign tracking, and conversion paths so the right people find you and take action.",
    href: "/services/digital-marketing",
    icon: TrendingUp,
  },
  {
    id: 3,
    title: "Web Development",
    description:
      "We build fast, responsive websites and web apps that are easy to use and ready for real customers.",
    href: "/services/web-development",
    icon: Code2,
  },
  {
    id: 4,
    title: "Custom Software Development",
    description:
      "We create software around the way your team works — from internal tools to customer portals and dashboards.",
    href: "/services/software-development",
    icon: Cpu,
  },
  {
    id: 5,
    title: "Mobile App Development",
    description:
      "We design and build iOS and Android apps — native or cross-platform — that help customers get things done anywhere.",
    href: "/services/mobile-app-development",
    icon: Smartphone,
  },
  {
    id: 6,
    title: "Hosting & Infrastructure",
    description:
      "We set up scalable cloud hosting, deployments, monitoring, and backups that stay secure and dependable.",
    href: "/services/hosting-infrastructure",
    icon: Server,
  },
  {
    id: 7,
    title: "Customer Experience",
    description:
      "We improve CRM setup, ticket routing, and support systems so every customer interaction is easier to manage.",
    href: "/services/customer-experience-management",
    icon: Users,
  },
  {
    id: 8,
    title: "IT Consulting & IT Services",
    description:
      "We help you make clearer decisions about architecture, vendors, delivery plans, and long-term technology strategy.",
    href: "/services/it-consulting-it-services",
    icon: Lightbulb,
  },
];

// ─── Shared card face (used in both layouts) ──────────────────────────────────

function CardFace({ card }: { card: WhatWeDoCard }) {
  const Icon = card.icon;
  return (
    <>
      {/* Glass gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(210,247,255,0.18) 52%, rgba(255,255,255,0.75))",
        }}
        aria-hidden="true"
      />
      {/* Top sheen line */}
      <div
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
        aria-hidden="true"
      />
      {/* Background number */}
      <span className="pointer-events-none absolute right-8 top-6 font-display text-6xl font-bold leading-none text-[#0F172A]/15 md:text-7xl">
        {String(card.id).padStart(2, "0")}
      </span>

      <div className="relative z-10">
        {/* Icon box */}
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D2F7FF] bg-[#D2F7FF]/45 text-[#487F89] shadow-[0_12px_36px_rgba(72,127,137,0.16)]">
          <Icon size={24} aria-hidden="true" />
        </div>
        <h3 className="font-display text-2xl font-thin leading-tight text-[#0F172A] md:text-3xl">
          {card.title}
        </h3>
        <p className="mt-4 text-base leading-7 text-stone-600 md:text-lg">
          {card.description}
        </p>
        <StarButton
          as="span"
          lightColor="#38bdf8"
          backgroundColor="#0f172a"
          className="mt-4 h-11 font-semibold shadow-[0_0_12px_rgba(56,189,248,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.55),0_0_4px_rgba(56,189,248,0.7)] transition hover:-translate-y-0.5 duration-300 cursor-pointer"
          onClick={() => { window.location.href = card.href; }}
        >
          Explore <ArrowRight size={14} aria-hidden="true" />
        </StarButton>
      </div>
    </>
  );
}

// ─── Desktop sticky card (GSAP scroll-jacking) ───────────────────────────────

function StickyCard({ card, index, totalCards }: {
  card: WhatWeDoCard;
  index: number;
  totalCards: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    const container = containerRef.current;
    if (!cardElement || !container) return;

    const targetScale = 1 - (totalCards - 1 - index) * 0.04;

    gsap.set(cardElement, {
      scale: 1,
      transformOrigin: "top center",
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const scale = gsap.utils.interpolate(1, targetScale, progress);
        gsap.set(cardElement, {
          scale: Math.max(scale, targetScale),
          transformOrigin: "top center",
        });
      },
    });

    return () => trigger.kill();
  }, [index, totalCards]);

  return (
    <div
      ref={containerRef}
      className="sticky top-0 flex h-screen items-center justify-center"
    >
      <div
        ref={cardRef}
        className="relative h-[320px] w-full max-w-2xl mx-auto overflow-hidden rounded-3xl border border-stone-200/80 bg-white/80 p-6 shadow-[0_26px_90px_rgba(15,23,42,0.14)] backdrop-blur-xl md:p-8"
        style={{
          top: `calc(50% - 160px + ${index * 20}px)`,
          isolation: "isolate",
          transformOrigin: "top center",
        }}
      >
        <CardFace card={card} />
      </div>
    </div>
  );
}

// ─── Mobile / tablet flat grid card ──────────────────────────────────────────

function GridCard({ card }: { card: WhatWeDoCard }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-stone-200/80 bg-white/80 p-6 shadow-[0_8px_32px_rgba(15,23,42,0.09)] backdrop-blur-xl"
      style={{ isolation: "isolate" }}
    >
      <CardFace card={card} />
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function StackedCards() {
  const desktopRef = useRef<HTMLDivElement>(null);

  // Track whether we're on a large screen to conditionally init GSAP fade-in
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsLg(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsLg(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isLg) return;
    const container = desktopRef.current;
    if (!container) return;

    gsap.fromTo(
      container,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    ScrollTrigger.refresh();
  }, [isLg]);

  return (
    <>
      {/* ── Mobile / tablet grid (< 1024px) ─────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
        {whatWeDoCards.map((card) => (
          <GridCard key={card.id} card={card} />
        ))}
      </div>

      {/* ── Desktop GSAP sticky stack (≥ 1024px) ────────────────────────── */}
      <div
        ref={desktopRef}
        className="relative hidden pb-24 lg:block"
        style={{ minHeight: `${whatWeDoCards.length * 100}vh` }}
      >
        <div className="relative">
          {whatWeDoCards.map((card, index) => (
            <StickyCard
              key={card.id}
              card={card}
              index={index}
              totalCards={whatWeDoCards.length}
            />
          ))}
        </div>
      </div>
    </>
  );
}
