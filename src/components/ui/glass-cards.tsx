"use client";

import React, { useEffect, useRef } from "react";
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
    title: "Websites & Web Apps",
    description:
      "We build fast, responsive websites and web apps that are easy to use and ready for real customers.",
    href: "/services/web-development",
    icon: Code2,
  },
  {
    id: 2,
    title: "Custom Business Software",
    description:
      "We create software around the way your team works, from internal tools to customer portals and dashboards.",
    href: "/services/software-development",
    icon: Cpu,
  },
  {
    id: 3,
    title: "Mobile Apps",
    description:
      "We design and build mobile apps that help customers, staff, and partners get things done from anywhere.",
    href: "/services/mobile-app-development",
    icon: Smartphone,
  },
  {
    id: 4,
    title: "Search & Digital Growth",
    description:
      "We improve search, content, tracking, and conversion paths so the right people can find you and take action.",
    href: "/services/digital-marketing",
    icon: TrendingUp,
  },
  {
    id: 5,
    title: "Cloud & Hosting",
    description:
      "We set up hosting, deployments, monitoring, and cloud systems that stay secure and dependable day to day.",
    href: "/services/hosting-infrastructure",
    icon: Server,
  },
  {
    id: 6,
    title: "Workflow Automation",
    description:
      "We connect your tools and automate repeated work, so important tasks move without constant follow-up.",
    href: "/services/ai-automation",
    icon: Zap,
  },
  {
    id: 7,
    title: "Customer Systems",
    description:
      "We improve CRM, support, and communication systems so every customer interaction is easier to manage.",
    href: "/services/customer-experience-management",
    icon: Users,
  },
  {
    id: 8,
    title: "Tech Planning",
    description:
      "We help you make clearer decisions about architecture, vendors, delivery plans, and long-term technology.",
    href: "/services/it-consulting-it-services",
    icon: Lightbulb,
  },
];

function Card({ card, index, totalCards }: {
  card: WhatWeDoCard;
  index: number;
  totalCards: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const Icon = card.icon;

  useEffect(() => {
    const cardElement = cardRef.current;
    const container = containerRef.current;
    if (!cardElement || !container) return;

    const targetScale = 1 - (totalCards - index) * 0.05;

    gsap.set(cardElement, {
      scale: 1,
      transformOrigin: "center top",
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const scale = gsap.utils.interpolate(1, targetScale, self.progress);
        gsap.set(cardElement, {
          scale: Math.max(scale, targetScale),
          transformOrigin: "center top",
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
        className="relative h-[320px] w-full overflow-hidden rounded-3xl border border-stone-200/80 bg-white/80 p-6 shadow-[0_26px_90px_rgba(15,23,42,0.14)] backdrop-blur-xl md:p-8"
        style={{
          top: `calc(-5vh + ${index * 25}px)`,
          isolation: "isolate",
          transformOrigin: "top",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(210,247,255,0.18) 52%, rgba(255,255,255,0.75))",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
          aria-hidden="true"
        />
        <span className="pointer-events-none absolute right-8 top-6 font-display text-6xl font-bold leading-none text-[#0F172A]/15 md:text-7xl">
          {String(card.id).padStart(2, "0")}
        </span>

        <div className="relative z-10 max-w-2xl">
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
      </div>
    </div>
  );
}

export function StackedCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.fromTo(
      container,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    ScrollTrigger.refresh();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[520vh] pb-24"
    >
      <div className="relative">
        {whatWeDoCards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            index={index}
            totalCards={whatWeDoCards.length}
          />
        ))}
      </div>
    </div>
  );
}
