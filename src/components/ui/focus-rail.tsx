"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  meta?: string;
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  /** Pass true when the parent section already provides a background */
  noBg?: boolean;
  className?: string;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const BASE_SPRING = { type: "spring" as const, stiffness: 320, damping: 32, mass: 1 };
const TAP_SPRING  = { type: "spring" as const, stiffness: 480, damping: 20, mass: 1 };

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  noBg = false,
  className,
}: FocusRailProps) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState<number>(1024);

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const cardWidth = isMobile ? 260 : isTablet ? 320 : 380;
  const spacing = isMobile ? 220 : isTablet ? 290 : 380;

  const count = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem = items[activeIndex];

  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const onDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (offset.x < -50 || swipe < -2000) {
      handleNext();
    } else if (offset.x > 50 || swipe > 2000) {
      handlePrev();
    }
  };

  const visibleOffsets = [-1, 0, 1]; // Render only left, center, right to prevent rendering offscreen cards

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden outline-none select-none",
        !noBg && "bg-[#F8FEFF]",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="relative z-10 py-14 px-6 md:px-10">

        {/* ── 3-D Card Rail — landscape cards ───────────────────────────── */}
        <motion.div
          className="relative mx-auto flex h-[260px] w-full max-w-7xl items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ perspective: "1600px" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={onDragEnd}
        >
          {visibleOffsets.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter   = offset === 0;
            const dist       = Math.abs(offset);
            // landscape: wider spacing between cards
            const xOffset    = offset * spacing;
            const zOffset    = -dist * 100;
            const scale      = isCenter ? 1 : 0.82;
            const rotateY    = offset * -14;
            const opacity    = isCenter ? 1 : Math.max(0.08, 1 - dist * 0.48);
            const brightness = isCenter ? 1 : 0.6;

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  // landscape ratio — 16:10 gives a cinematic card shape
                  "absolute aspect-[16/10] overflow-hidden rounded-[20px]",
                  "border border-cyan-100 bg-white shadow-md",
                  isCenter
                    ? "z-20 shadow-[0_24px_70px_rgba(8,145,178,0.20),0_4px_20px_rgba(0,0,0,0.07)]"
                    : "z-10 cursor-pointer shadow-[0_10px_36px_rgba(59,130,246,0.08)]"
                )}
                initial={false}
                animate={{
                  x: xOffset, z: zOffset, scale, rotateY, opacity,
                  filter: `brightness(${brightness})`, // Keep only brightness transform (avoid expensive blur recalculations)
                }}
                transition={{
                  x: BASE_SPRING, z: BASE_SPRING, rotateY: BASE_SPRING,
                  opacity: BASE_SPRING,
                  scale: isCenter ? TAP_SPRING : BASE_SPRING,
                }}
                style={{ transformStyle: "preserve-3d", width: cardWidth }}
                onClick={() => {
                  if (offset !== 0) setActive((p) => p + offset);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt || item.title}
                  className="h-full w-full object-cover pointer-events-none"
                />
                {/* Subtle bottom vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                {/* Industry badge — only on the active card */}
                {isCenter && item.meta && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-3 left-3"
                  >
                    <span className="inline-flex items-center rounded-full border border-cyan-100 bg-white/75 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase text-cyan-700 shadow-[0_4px_12px_rgba(8,145,178,0.12)] backdrop-blur-md">
                      {item.meta}
                    </span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Info panel + controls ───────────────────────────────────── */}
        <div className="mx-auto mt-12 flex w-full max-w-4xl flex-col items-center gap-6 md:flex-row md:items-end md:justify-between">

          {/* Title / description */}
          <div className="flex-1 min-h-[6rem] flex flex-col justify-center items-center text-center md:items-start md:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
                exit={  { opacity: 0, y: -8,  filter: "blur(4px)" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-2"
              >
                {activeItem.meta && (
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0F172A]">
                    {activeItem.meta}
                  </span>
                )}
                <h3
                  className="font-display font-bold text-balance"
                  style={{ fontSize: "clamp(20px, 2.4vw, 28px)", lineHeight: 1.15, color: "#0E7490" }}
                >
                  {activeItem.title}
                </h3>
                {activeItem.description && (
                  <p className="max-w-md text-[14px] leading-[1.75] text-slate-500">
                    {activeItem.description}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            {/* Dot pips */}
            <div className="flex items-center gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to item ${i + 1}`}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === activeIndex
                      ? "w-5 h-[7px] bg-cyan-500"
                      : "w-[7px] h-[7px] bg-cyan-200 hover:bg-cyan-400"
                  )}
                />
              ))}
            </div>

            {/* Prev / count / Next */}
            <div className="inline-flex items-center gap-1 rounded-full border border-cyan-100 bg-white/55 px-1.5 py-1.5 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md">
              <button
                onClick={handlePrev}
                aria-label="Previous"
                className="rounded-full p-2 text-slate-400 transition hover:bg-cyan-50 hover:text-cyan-700 active:scale-90"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="min-w-[46px] text-center text-[11px] font-mono text-slate-400">
                {activeIndex + 1} / {count}
              </span>
              <button
                onClick={handleNext}
                aria-label="Next"
                className="rounded-full p-2 text-slate-400 transition hover:bg-cyan-50 hover:text-cyan-700 active:scale-90"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
