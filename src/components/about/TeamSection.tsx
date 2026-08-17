"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Users, Sparkles, HeartHandshake, ShieldCheck } from "lucide-react";
import AibizmodLogo from "@/components/ui/AibizmodLogo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TeamCardData {
  id: string;
  title: string;
  roleBadge: string;
  imageSrc: string;
  description: string;
  isFounder?: boolean;
  tagline: string;
  objectPosition?: string;
  filterClass?: string;
  hoverFilterClass?: string;
}

const teamCards: TeamCardData[] = [
  {
    id: "founders",
    title: "Founding Leadership",
    roleBadge: "Founders & Direction",
    imageSrc: "/about/team/founders.jpg",
    description:
      "Guiding aibizmod with a focus on client trust, engineering rigor, and building technology that delivers tangible impact.",
    isFounder: true,
    tagline: "Vision & Execution",
    objectPosition: "object-[center_28%]",
    filterClass: "brightness-[1.02] contrast-[1.04] saturate-[1.04]",
    hoverFilterClass: "group-hover:brightness-[1.06] group-hover:contrast-[1.08] group-hover:saturate-[1.08]",
  },
  {
    id: "team-table",
    title: "Engineering & Product Team",
    roleBadge: "Builders & Strategists",
    imageSrc: "/about/team/team-retreat-table.jpg",
    description:
      "A collective of developers, designers, and problem solvers working shoulder-to-shoulder on complex software solutions.",
    tagline: "Collaborative Planning",
    objectPosition: "object-[center_48%]",
    filterClass: "brightness-[1.02] contrast-[1.04] saturate-[1.04]",
    hoverFilterClass: "group-hover:brightness-[1.06] group-hover:contrast-[1.08] group-hover:saturate-[1.08]",
  },
  {
    id: "team-lounge",
    title: "Life at aibizmod",
    roleBadge: "Culture & Retreats",
    imageSrc: "/about/team/team-retreat-lounge.jpg",
    description:
      "Fostering a supportive, tight-knit work environment where curiosity, honesty, and shared success come first.",
    tagline: "Team Cohesion",
    objectPosition: "object-[center_42%]",
    filterClass: "brightness-[1.02] contrast-[1.04] saturate-[1.04]",
    hoverFilterClass: "group-hover:brightness-[1.05] group-hover:contrast-[1.08] group-hover:saturate-[1.08]",
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger Trending Smooth Scroll Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header smooth stagger reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 35, rotateX: 4 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Cards container reveal
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll(".team-card-item");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            stagger: 0.18,
            ease: "power4.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Subtly parallax card images on scroll
        const cardImages = cardsContainerRef.current.querySelectorAll(".team-card-img");
        cardImages.forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -3 },
            {
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: img.closest(".team-card-item"),
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-6 py-24 bg-white border-t border-cyan-100/60"
    >
      {/* Grid & Radial Gradient background matching the /services page design system */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(210,247,255,0.65),transparent_45%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />

      {/* Subtle ambient blur glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-20 z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-200/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header matching /services page typography and badges */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.08)] backdrop-blur-md">
            <Users className="w-3.5 h-3.5 text-cyan-600" aria-hidden="true" />
            Our Team
          </span>
          <h2
            className="mt-6 font-display font-thin text-[#0F172A] text-balance"
            style={{
              fontSize: "clamp(34px, 5vw, 56px)",
              lineHeight: 1.08,
            }}
          >
            The People Behind <AibizmodLogo textColor="text-[#0F172A]" />
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600 text-base md:text-lg leading-relaxed font-normal">
            We are a close-knit group of engineers, strategists, and creators. We value open dialogue, hands-on craft, and technology built to last.
          </p>
        </div>

        {/* Cards Grid — Styled to harmonize with the /services card system */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Founders Card - Spans 7 columns on desktop */}
          {teamCards
            .filter((card) => card.isFounder)
            .map((card) => (
              <div
                key={card.id}
                className="team-card-item lg:col-span-7 flex"
              >
                <div
                  className="group relative w-full min-h-[440px] rounded-3xl overflow-hidden border border-cyan-100/90 bg-white p-7 md:p-9 flex flex-col justify-end shadow-[0_12px_36px_-6px_rgba(10,22,40,0.08),0_4px_16px_-4px_rgba(8,145,178,0.04)] hover:shadow-[0_32px_64px_-12px_rgba(10,22,40,0.22),0_12px_28px_-8px_rgba(8,145,178,0.18)] hover:border-cyan-200/90 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
                >
                  {/* Image Background with Filter */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                      src={card.imageSrc}
                      alt={card.title}
                      fill
                      className={`team-card-img object-cover ${card.objectPosition || 'object-center'} filter ${card.filterClass || 'brightness-[1.02] contrast-[1.04]'} transition-all duration-700 ease-out group-hover:scale-105 ${card.hoverFilterClass || 'group-hover:brightness-[1.06] group-hover:contrast-[1.08]'}`}
                      style={{ imageRendering: "-webkit-optimize-contrast" }}
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      priority
                    />
                    {/* Seamless bottom gradient overlay for readable text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent group-hover:opacity-85 transition-opacity duration-500" />
                  </div>

                  {/* Top Badge */}
                  <div className="relative z-10 mb-auto flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/95 text-slate-800 border border-cyan-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.08)] backdrop-blur-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                      {card.roleBadge}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 mt-20">
                    <div className="text-xs font-mono tracking-widest text-cyan-300 font-semibold uppercase mb-2 drop-shadow-sm">
                      {card.tagline}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-slate-200 text-sm md:text-base leading-relaxed max-w-xl font-light">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          {/* Secondary Team Cards - Spans 5 columns on desktop */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {teamCards
              .filter((card) => !card.isFounder)
              .map((card, idx) => (
                <div
                  key={card.id}
                  className="team-card-item flex-1 flex"
                >
                  <div
                    className="group relative w-full min-h-[220px] rounded-3xl overflow-hidden border border-cyan-100/90 bg-white p-6 flex flex-col justify-end shadow-[0_12px_36px_-6px_rgba(10,22,40,0.08),0_4px_16px_-4px_rgba(8,145,178,0.04)] hover:shadow-[0_24px_48px_-8px_rgba(10,22,40,0.18),0_8px_20px_-6px_rgba(8,145,178,0.14)] hover:border-cyan-200/90 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1"
                  >
                    {/* Image Background with Filter */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <Image
                        src={card.imageSrc}
                        alt={card.title}
                        fill
                        className={`team-card-img object-cover ${card.objectPosition || 'object-center'} filter ${card.filterClass || 'brightness-[1.02] contrast-[1.04]'} transition-all duration-700 ease-out group-hover:scale-105 ${card.hoverFilterClass || 'group-hover:brightness-[1.06] group-hover:contrast-[1.08]'}`}
                        style={{ imageRendering: "-webkit-optimize-contrast" }}
                        sizes="(max-width: 1024px) 100vw, 42vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/45 to-transparent group-hover:opacity-85 transition-opacity duration-500" />
                    </div>

                    {/* Top Badge */}
                    <div className="relative z-10 mb-auto flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-white/95 text-slate-800 border border-cyan-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.08)] backdrop-blur-md">
                        {idx === 0 ? (
                          <Sparkles className="w-3 h-3 text-cyan-600" />
                        ) : (
                          <HeartHandshake className="w-3 h-3 text-cyan-600" />
                        )}
                        {card.roleBadge}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="relative z-10 mt-10">
                      <h3 className="text-xl font-semibold text-white tracking-tight">
                        {card.title}
                      </h3>
                      <p className="mt-1.5 text-slate-200 text-xs md:text-sm leading-relaxed line-clamp-2 font-light">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
