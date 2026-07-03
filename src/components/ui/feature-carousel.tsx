"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pizza04Icon,
  CommandFreeIcons,
  GlobalSearchIcon,
  AiCloudIcon,
  SmartPhone01Icon,
  CheckmarkCircle01Icon,
  DashboardSquare01Icon,
  MagicWandIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";

export interface CarouselFeature {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any; // Can be a Hugeicons icon definition or a LucideIcon component
  image: string;
  imageAlt?: string;
  description: string;
  isLucide?: boolean;
  deliverables?: string[];
}

// Default feature list using Hugeicons
const DEFAULT_FEATURES: CarouselFeature[] = [
  {
    id: "sustainable",
    label: "Sustainable Sourcing",
    icon: Pizza04Icon,
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200",
    imageAlt: "Locally grown organic produce from sustainable farms representing ethical sourcing.",
    description: "Ethically sourced ingredients from local farmers.",
  },
  {
    id: "community",
    label: "Community Focused",
    icon: CommandFreeIcons,
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200",
    imageAlt: "Team of professionals collaborating in an office representing community focused business strategy.",
    description: "Building stronger bonds through shared experiences.",
  },
  {
    id: "global",
    label: "Global Reach",
    icon: GlobalSearchIcon,
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200",
    imageAlt: "Business team connecting globally through international digital communication tools.",
    description: "Connecting visionaries across all continents.",
  },
  {
    id: "award",
    label: "Award Winning",
    icon: CheckmarkCircle01Icon,
    image:
      "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?q=80&w=1200",
    imageAlt: "Professionals celebrating a business milestone or award recognition for design excellence.",
    description: "Recognized excellence in design and innovation.",
  },
  {
    id: "cloud",
    label: "Cloud Ready",
    icon: AiCloudIcon,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
    imageAlt: "Planet earth from space with glowing digital network lines representing cloud readiness.",
    description: "Scale your infrastructure with seamless ease.",
  },
  {
    id: "mobile",
    label: "Mobile First",
    icon: SmartPhone01Icon,
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200",
    imageAlt: "Close-up of a mobile smartphone showing user experience interface design.",
    description: "A world-class experience on every single device.",
  },
  {
    id: "analytics",
    label: "Real-time Analytics",
    icon: DashboardSquare01Icon,
    image:
      "https://images.unsplash.com/photo-1551288049-bbda38a10ad5?q=80&w=1200",
    imageAlt: "Financial dashboard on a screen displaying real-time analytics graphs.",
    description: "Insights at your fingertips, updated in real-time.",
  },
  {
    id: "security",
    label: "Enterprise Security",
    icon: CheckmarkCircle01Icon,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
    imageAlt: "Cyber security screen showing secure cloud servers and data protection protocols.",
    description: "Bank-grade security protocols for your data.",
  },
  {
    id: "magic",
    label: "Magic Automations",
    icon: MagicWandIcon,
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200",
    imageAlt: "Robotic arm interacting with digital screen representing process automation and AI workflow integration.",
    description: "Let AI handle the repetitive tasks for you.",
  },
  {
    id: "local",
    label: "Locally Owned",
    icon: CheckmarkCircle01Icon,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200",
    imageAlt: "Business team working together in a locally owned office workspace.",
    description: "Supporting local businesses and creators.",
  },
];

const AUTO_PLAY_INTERVAL = 4000;

export function FeatureCarousel({
  features = DEFAULT_FEATURES,
  autoPlayInterval = AUTO_PLAY_INTERVAL,
}: {
  features?: CarouselFeature[];
  autoPlayInterval?: number;
}) {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % features.length) + features.length) % features.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + features.length) % features.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, autoPlayInterval);
    return () => clearInterval(interval);
  }, [nextStep, isPaused, autoPlayInterval]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = features.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 lg:p-0">
      <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[3.5rem] flex flex-col lg:flex-row min-h-[500px] lg:h-[520px] border border-cyan-100/60 bg-white shadow-sm">
        {/* Left Column: Selector Chips (Navy background) */}
        <div className="w-full lg:w-[40%] min-h-[300px] md:min-h-[350px] lg:h-full relative z-30 flex flex-col justify-center bg-[#0A1628] lg:border-r border-white/10 overflow-hidden">
          {/* Subtle cyan glow inside navy panel */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.08),transparent_60%)]" />
          
          <div className="relative flex flex-col gap-2.5 lg:gap-3.5 justify-center items-center lg:items-start p-6 md:p-8 lg:p-12 w-full lg:pl-16">
            {/* Vertical Timeline Track Line (Desktop only) */}
            <div className="absolute left-[32px] top-[60px] bottom-[60px] w-[2px] bg-white/10 hidden lg:block" />

            {features.map((feature, index) => {
              const isActive = index === currentIndex;
              const IconComponent = feature.icon;

              return (
                <div key={feature.id} className="relative w-full flex items-center">
                  {/* Sliding active timeline segment */}
                  {isActive && (
                    <motion.div
                      layoutId="activeProcessLine"
                      className="absolute left-[-32px] top-[6px] bottom-[6px] w-[2px] bg-[#22D3EE] rounded-full shadow-[0_0_12px_rgba(34,211,238,0.6)] z-20 hidden lg:block"
                      transition={{ type: "spring", duration: 0.45, bounce: 0.12 }}
                    >
                      {/* Glowing traveling dot */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#22D3EE] shadow-[0_0_10px_#22D3EE] z-30" />
                    </motion.div>
                  )}

                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-3 px-4 md:px-5 lg:px-6 py-2.5 md:py-3 lg:py-3.5 rounded-full text-left group border w-full transition-transform active:scale-[0.97]",
                      isActive
                        ? "bg-white text-[#0A1628] border-transparent shadow-[0_4px_20px_rgba(34,211,238,0.15)] z-10"
                        : "bg-transparent text-slate-300 border-white/10 hover:bg-white/5 hover:border-white/20 hover:text-white"
                    )}
                    style={{
                      transition: "transform 200ms cubic-bezier(0.23, 1, 0.32, 1), background-color 200ms cubic-bezier(0.23, 1, 0.32, 1), border-color 200ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 200ms cubic-bezier(0.23, 1, 0.32, 1), color 200ms cubic-bezier(0.23, 1, 0.32, 1)",
                    }}
                  >
                    {/* Active autoplay progress bar */}
                    {isActive && (
                      <div className="absolute bottom-1.5 left-8 right-8 h-[2px] overflow-hidden z-20 rounded-full bg-slate-100/50">
                        <motion.div
                          key={step}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: isPaused ? 0 : 1 }}
                          transition={{
                            duration: isPaused ? 0 : autoPlayInterval / 1000,
                            ease: "linear",
                          }}
                          style={{
                            transformOrigin: "left",
                            width: "100%",
                          }}
                          className="h-full bg-[#0E7490] rounded-full"
                        />
                      </div>
                    )}

                    <span
                      className={cn(
                        "text-[10px] font-mono font-bold tracking-wider mr-0.5 transition-colors duration-200",
                        isActive ? "text-[#0E7490]" : "text-slate-400 group-hover:text-slate-200"
                      )}
                    >
                      {`0${index + 1}`}
                    </span>

                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-350",
                        isActive ? "text-[#0E7490]" : "text-slate-400 group-hover:text-slate-200"
                      )}
                    >
                      {feature.isLucide ? (
                        <IconComponent size={15} strokeWidth={2.2} />
                      ) : (
                        <HugeiconsIcon
                          icon={feature.icon}
                          size={15}
                          strokeWidth={2.2}
                        />
                      )}
                    </div>

                    <span className={cn(
                      "font-semibold text-xs md:text-[13px] tracking-tight whitespace-nowrap uppercase transition-colors duration-200",
                      isActive ? "text-[#0A1628]" : "text-slate-300 group-hover:text-white"
                    )}>
                      {feature.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Cards */}
        <div className="flex-1 min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] lg:h-full relative bg-slate-50/30 flex items-center justify-center py-12 lg:py-8 px-6 md:px-8 overflow-hidden border-t lg:border-t-0 lg:border-l border-cyan-100/30">
          {/* Decorative glow behind cards */}
          <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-cyan-300/10 to-blue-300/5 blur-3xl pointer-events-none z-0" />

          <div className="relative w-full max-w-[600px] aspect-[3/4] sm:aspect-[4/3] flex items-center justify-center">
            {features.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -120 : isNext ? 120 : 0,
                    y: 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.45 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    duration: 0.55,
                    bounce: 0.05,
                  }}
                  style={{
                    willChange: "transform, opacity",
                    display: status === "hidden" ? "none" : undefined,
                  }}
                  className="absolute inset-0 rounded-[2rem] md:rounded-[2.8rem] overflow-hidden border-4 md:border-8 border-white bg-white shadow-[0_20px_50px_rgba(8,145,178,0.15)] origin-center"
                >
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt || feature.label}
                    fill
                    className={cn(
                      "object-cover",
                      isActive ? "scale-105" : "scale-100"
                    )}
                    style={{
                      transition: "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
                      willChange: "transform",
                    }}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <div className="absolute top-4 right-4 lg:top-6 lg:right-6 flex gap-2 z-30 pointer-events-auto">
                        {/* Slide-in glassmorphic navigation buttons */}
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setStep((prev) => prev - 1);
                          }}
                          onMouseEnter={() => setIsPaused(true)}
                          onMouseLeave={() => setIsPaused(false)}
                          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/95 text-white hover:text-[#0A1628] border border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] active:scale-90 transition-all duration-200 cursor-pointer"
                          aria-label="Previous slide"
                        >
                          <ChevronLeft size={18} strokeWidth={2.5} />
                        </motion.button>
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setStep((prev) => prev + 1);
                          }}
                          onMouseEnter={() => setIsPaused(true)}
                          onMouseLeave={() => setIsPaused(false)}
                          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/95 text-white hover:text-[#0A1628] border border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] active:scale-90 transition-all duration-200 cursor-pointer"
                          aria-label="Next slide"
                        >
                          <ChevronRight size={18} strokeWidth={2.5} />
                        </motion.button>
                      </div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8 pt-16 sm:pt-24 lg:pt-28 bg-gradient-to-t from-black/95 via-black/65 to-transparent flex flex-col justify-end pointer-events-none"
                      >
                        <div className="bg-white/95 text-slate-800 px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em] w-fit shadow-sm mb-3 border border-slate-100/80">
                          {index + 1} • {feature.label}
                        </div>
                        <p className="text-white font-semibold text-sm sm:text-lg md:text-xl leading-snug tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                          {feature.description}
                        </p>
                        {feature.deliverables && feature.deliverables.length > 0 && (
                          <motion.ul
                            initial="hidden"
                            animate="visible"
                            variants={{
                              visible: { transition: { staggerChildren: 0.08 } }
                            }}
                            className="mt-2 sm:mt-4 space-y-1 sm:space-y-1.5 pointer-events-none"
                          >
                            {feature.deliverables.map((item, idx) => (
                              <motion.li
                                key={idx}
                                variants={{
                                  hidden: { opacity: 0, x: -10 },
                                  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
                                }}
                                className="flex items-start gap-2 text-[11px] sm:text-xs font-medium text-slate-100 leading-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}

                        {/* Step Flow Progress Dots */}
                        <div className="flex gap-1.5 mt-3 sm:mt-5 items-center pointer-events-none">
                          {features.map((_, i) => (
                            <div
                              key={i}
                              className={cn(
                                "h-1.5 rounded-full transition-all duration-300",
                                i === index ? "w-6 bg-cyan-400" : "w-1.5 bg-white/30"
                              )}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
