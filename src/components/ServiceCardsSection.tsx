"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { iconMap, type IconKey } from "./ServicePageLayout";
import SectionHeading from "@/components/common/SectionHeading";
import AnimatedSection from "@/components/common/AnimatedSection";

export interface ServiceCard {
  iconKey?: IconKey;
  title: string;
  bullets: string[];
  image?: string;
  imageAlt?: string;
  href?: string;
  
  // Custom metadata for flip layout:
  tag?: string;
  subtitle?: string;
  description?: string;
  color?: string;
}

function Card({
  card,
  index,
}: {
  card: ServiceCard;
  index: number;
}) {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const router = useRouter();
  const color = card.color || "#0891b2";
  const rawTag = card.tag || `0${index + 1} · Service`;
  const displayTag = rawTag.split(" · ")[0] || rawTag;
  const subtitle = card.subtitle || card.bullets[0] || "Advanced service solution.";
  const description = card.description || "Tailored strategy, implementation, and optimization to drive measurable business results.";

  const Icon = card.iconKey && iconMap[card.iconKey] ? iconMap[card.iconKey] : (iconMap["zap"] || null);

  const handleMouseEnter = () => {
    if (window.matchMedia("(hover: hover)").matches) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(hover: hover)").matches) {
      setIsFlipped(false);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const isHoverSupported = window.matchMedia("(hover: hover)").matches;
    if (!isHoverSupported) {
      if (!isFlipped) {
        e.preventDefault();
        e.stopPropagation();
        setIsFlipped(true);
      }
    }
  };

  const handleBackClick = (e: React.MouseEvent) => {
    const isHoverSupported = window.matchMedia("(hover: hover)").matches;
    if (isHoverSupported) {
      // On desktop: clicking anywhere on the back face navigates to the page
      if (card.href) {
        router.push(card.href);
      }
    } else {
      // On touch devices: check if clicked CTA button, otherwise flip back
      const cta = e.currentTarget.querySelector(".cta-button");
      if (cta && !cta.contains(e.target as Node)) {
        e.preventDefault();
        e.stopPropagation();
        setIsFlipped(false);
      }
    }
  };

  return (
    <div
      className={`flip-card w-full max-w-sm h-[390px] cursor-pointer select-none ${
        isFlipped ? "is-flipped" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{
        transitionDelay: `${index * 40}ms`,
      }}
    >
      <div className="flip-inner relative w-full h-full">
        {/* FRONT FACE */}
        <div 
          className={`flip-face absolute inset-0 rounded-[28px] overflow-hidden border border-slate-200/50 p-6 flex flex-col justify-between hover:border-slate-300/80 transition-all duration-300 ${
            isFlipped ? "pointer-events-none z-0" : "pointer-events-auto z-10"
          }`}
          style={{
            background: `linear-gradient(135deg, #ffffff 40%, ${color}14 100%)`,
          }}
        >
          {/* Subtle gradient wash */}
          <div
            className="absolute inset-0 opacity-50 pointer-events-none z-0"
            style={{
              background: `radial-gradient(120% 80% at 80% 0%, ${color}1e, transparent 55%), radial-gradient(100% 70% at 0% 100%, ${color}14, transparent 50%)`,
            }}
          />

          {/* Background image banner with colors restored and slant clip */}
          {card.image && (
            <div
              className="absolute top-0 left-0 right-0 h-[150px] bg-cover bg-center pointer-events-none opacity-[0.80] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-[0.90] group-hover:scale-[1.05]"
              style={{
                backgroundImage: `url(${card.image})`,
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
                clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
                WebkitClipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
              }}
            />
          )}

          {/* Soft color shade wash overlay on top of the image banner */}
          {card.image && (
            <div
              className="absolute top-0 left-0 right-0 h-[150px] pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-25 group-hover:opacity-15"
              style={{
                background: `linear-gradient(to bottom, ${color}, transparent)`,
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
                clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
                WebkitClipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
              }}
            />
          )}

          {/* Top row */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600 bg-white/75 px-2.5 py-0.5 rounded-md backdrop-blur-[2px] border border-slate-100/60 shadow-sm">
              {displayTag}
            </span>
          </div>

          {/* Center text and background graphics visual block */}
          <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center py-4 my-2 px-2 min-h-[180px] overflow-hidden">
            {/* Glowing waves at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden pointer-events-none z-0">
              <svg viewBox="0 0 350 120" className="w-[700px] h-full" fill="none" preserveAspectRatio="none">
                <path d="M0,90 Q90,30 180,80 T350,50 Q440,30 530,80 T700,50" stroke={color} strokeWidth="2.5" strokeOpacity="0.65" className="animate-wave-1" />
                <path d="M0,70 Q80,100 170,40 T350,90 Q430,100 520,40 T700,90" stroke={color} strokeWidth="1.5" strokeOpacity="0.30" className="animate-wave-2" style={{ filter: "brightness(1.2)" }} />
                <path d="M0,80 Q100,50 200,90 T350,60 Q450,50 550,90 T700,60" stroke={color} strokeWidth="1" strokeOpacity="0.15" className="animate-wave-3" style={{ filter: "brightness(1.4)" }} />
              </svg>
            </div>

            {/* Logo, Title, and bio (subtitle) layered on top */}
            <div className="relative z-20 flex flex-col items-center justify-center gap-3.5 pointer-events-none">
              {/* Centered Logo container */}
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center shadow-sm"
                style={{
                  backgroundColor: `${color}12`,
                  border: `1px solid ${color}22`,
                }}
              >
                {Icon && <Icon size={18} style={{ color: color }} />}
              </div>

              {/* Text contents */}
              <div className="space-y-2">
                <h3 className="text-[17px] font-extrabold tracking-tight text-slate-800 leading-snug">
                  {card.title}
                </h3>
                <p className="text-[13px] font-medium leading-relaxed tracking-tight text-slate-500 max-w-[210px] mx-auto">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom row - simple tag-like footer guide */}
          <div className="relative z-10 w-full pt-3.5 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            Reveal Playbook
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className={`flip-face back-face absolute inset-0 rounded-[28px] overflow-hidden border border-slate-200/50 p-6 flex flex-col justify-between hover:border-slate-300/80 transition-all duration-300 ${
            isFlipped ? "pointer-events-auto z-10" : "pointer-events-none z-0"
          }`}
          onClick={handleBackClick}
          style={{
            background: `linear-gradient(135deg, #ffffff 40%, ${color}14 100%)`,
          }}
        >


          {/* Subtle gradient wash */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none z-0"
            style={{
              background: `radial-gradient(120% 80% at 100% 100%, ${color}1e, transparent 55%), radial-gradient(100% 60% at 0% 0%, ${color}10, transparent 50%)`,
            }}
          />

          <div className="relative z-10 flex-1 flex flex-col justify-between h-full">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${color}18`,
                    border: `1px solid ${color}2a`,
                  }}
                >
                  {Icon && <Icon size={14} style={{ color: color }} />}
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-bold tracking-tight text-slate-800 leading-none truncate">
                    {card.title}
                  </h3>
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-slate-400">
                    {displayTag}
                  </span>
                </div>
              </div>

              <p className="text-[12.5px] leading-relaxed text-slate-500 mb-4 line-clamp-3">
                {description}
              </p>

              {/* Deliverables checklist */}
              <div className="space-y-2">
                {card.bullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="feat flex items-center gap-3 text-[13px] text-slate-700"
                    style={{
                      transitionDelay: `${idx * 75 + 150}ms`,
                    }}
                  >
                    <div
                      className="h-5 w-5 flex-shrink-0 rounded-md flex items-center justify-center"
                      style={{
                        backgroundColor: `${color}12`,
                        border: `1px solid ${color}22`,
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={color}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="font-medium tracking-tight leading-tight">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button: Just says Explore with hover border color change and arrow shift */}
            {card.href && (
              <Link
                href={card.href}
                className="cta-button group/explore mt-4 relative flex items-center justify-between rounded-xl px-4 py-2.5 border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all duration-300"
                style={{
                  borderColor: "rgba(226, 232, 240, 0.8)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.8)";
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Let navigation proceed
                }}
              >
                <span className="text-[13px] font-bold text-slate-800">
                  Explore
                </span>
                <span
                  className="flex items-center justify-center transition-transform duration-300 group-hover/explore:translate-x-1"
                  style={{ color: color }}
                >
                  <ArrowRight size={14} strokeWidth={2.5} />
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServiceCardsSection({ cards }: { cards: ServiceCard[] }) {
  const prefersReduced = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: prefersReduced
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: 60,
          scale: 0.94,
          rotateX: 10,
        },
    visible: prefersReduced
      ? { opacity: 1, transition: { duration: 0.3 } }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          transition: {
            type: "spring" as const,
            stiffness: 25,
            damping: 14,
            mass: 1.2,
          },
        },
  };

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#F8FEFF",
        backgroundImage: "linear-gradient(rgba(8, 145, 178, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(8, 145, 178, 0.04) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        padding: "80px 24px",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        /* Flip card mechanics */
        .flip-card {
          perspective: 1600px;
        }
        .flip-inner {
          transform-style: preserve-3d;
          transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .flip-card.is-flipped .flip-inner {
          transform: rotateY(180deg);
        }
        .flip-face {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          box-shadow: 0 12px 36px -6px rgba(10, 22, 40, 0.06), 0 4px 16px -4px rgba(8, 145, 178, 0.03);
          transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease, border-color 0.45s ease;
        }
        .flip-card:hover .flip-face {
          box-shadow: 0 20px 48px -12px rgba(10, 22, 40, 0.08), 0 0 30px -2px rgba(6, 182, 212, 0.22);
          border-color: rgba(6, 182, 212, 0.25);
        }
        .back-face {
          transform: rotateY(180deg);
        }

        /* Marquee horizontal track */
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 45s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }



        /* Staggered transition on back face checkmarks */
        .feat {
          transform: translateX(-8px);
          opacity: 0;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease;
        }
        .is-flipped .feat {
          transform: translateX(0);
          opacity: 1;
        }
        /* Wave animation flow */
        @keyframes waveMove {
          from { transform: translateX(0); }
          to { transform: translateX(-350px); }
        }
        .animate-wave-1 {
          animation: waveMove 12s linear infinite;
        }
        .animate-wave-2 {
          animation: waveMove 8s linear infinite;
        }
        .animate-wave-3 {
          animation: waveMove 16s linear infinite;
        }
      `}} />

      {/* Mesh background glows */}
      <div className="absolute -top-12 -left-12 w-[350px] h-[350px] rounded-full bg-cyan-200/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-[400px] h-[400px] rounded-full bg-blue-200/18 blur-3xl pointer-events-none" />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto" }}>
        <AnimatedSection direction="up" className="mb-12">
          <SectionHeading
            eyebrow="What We Offer"
            heading="End-to-End Digital Services for Modern Businesses"
            centered
          />
        </AnimatedSection>

        {/* Dynamic marquee scrolling strip */}
        <section className="relative z-10 border-y border-slate-200/50 bg-[#F4F9FA]/40 overflow-hidden w-full mb-12 rounded-lg">
          <div className="marquee-track py-3 font-mono text-[9px] uppercase tracking-[0.25em] text-slate-400">
            <div className="flex items-center gap-10 px-5 shrink-0">
              {cards.map((c, idx) => (
                <React.Fragment key={idx}>
                  <span className="font-semibold text-slate-500">{c.title}</span>
                  <span className="text-[#0891b2]/40 text-[13px]">✦</span>
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center gap-10 px-5 shrink-0" aria-hidden="true">
              {cards.map((c, idx) => (
                <React.Fragment key={`dup-${idx}`}>
                  <span className="font-semibold text-slate-500">{c.title}</span>
                  <span className="text-[#0891b2]/40 text-[13px]">✦</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ perspective: "1200px" }}
        >
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              className="flex w-full justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card card={card} index={idx} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
