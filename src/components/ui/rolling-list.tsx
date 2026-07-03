import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";

export type ThemeColor = "blue" | "indigo" | "cyan" | "emerald" | "orange" | "yellow" | "pink";

export interface ListItem {
  id: number;
  title: string;
  description: string;
  src: string;
  alt: string;
  color: ThemeColor;
}

const colorTextMap: Record<ThemeColor, string> = {
  blue: "text-blue-500",
  indigo: "text-indigo-500",
  cyan: "text-cyan-500",
  emerald: "text-emerald-500",
  orange: "text-orange-500",
  yellow: "text-yellow-500",
  pink: "text-pink-500",
};


const colorOverlayMap: Record<ThemeColor, string> = {
  blue: "bg-blue-600/15",
  indigo: "bg-indigo-600/15",
  cyan: "bg-cyan-600/15",
  emerald: "bg-emerald-600/15",
  orange: "bg-orange-600/15",
  yellow: "bg-yellow-600/15",
  pink: "bg-pink-600/15",
};

function RollingTextItem({ item }: { item: ListItem }) {
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      setIsActive(true);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      setIsActive(false);
    }
  };

  const handleClick = () => {
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) {
      setIsActive((prev) => !prev);
    }
  };

  const springTransition = {
    type: "spring" as const,
    stiffness: 220,
    damping: 24,
  };

  return (
    <motion.div
      layout
      transition={springTransition}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="group relative w-full border-b border-neutral-200 py-5 md:py-6 cursor-pointer select-none"
    >
      <motion.div
        layout
        transition={springTransition}
        className={cn(
          "flex justify-between gap-3 md:gap-6",
          isActive ? "flex-col md:flex-row items-start pt-2" : "flex-col md:flex-row items-start md:items-center"
        )}
      >
        {/* ── Title — left side, original position ─────────────────────── */}
        <div
          className={cn(
            "shrink-0 min-w-0",
            isActive
              ? "w-full md:w-auto max-w-full md:max-w-[45%] lg:max-w-[50%]"
              : "w-full md:max-w-[60%]"
          )}
        >
          <div className="relative overflow-y-clip h-14 md:h-[72px]">
            <div
              className={cn(
                "transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
                isActive ? "-translate-y-14 md:-translate-y-[72px]" : "translate-y-0"
              )}
            >
              {/* Default state */}
              <div className="h-14 md:h-[72px] flex items-center gap-1.5 md:gap-2">
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-neutral-900 shrink-0 transition-colors duration-300" />
                <h3 className="text-base md:text-xl font-bold text-neutral-900 uppercase tracking-tight leading-none">
                  {item.title}
                </h3>
              </div>
              {/* Hover state — accent italic roll */}
              <div className="h-14 md:h-[72px] flex items-center gap-1.5 md:gap-2">
                <ChevronDown className={cn("w-4 h-4 md:w-5 md:h-5 shrink-0 transition-colors duration-300", colorTextMap[item.color])} />
                <h3
                  className={cn(
                    "text-base md:text-xl font-bold uppercase tracking-tight italic leading-none",
                    colorTextMap[item.color]
                  )}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right slot: description and image container ────────────────── */}
        <motion.div
          layout
          transition={springTransition}
          className={cn(
            "relative shrink-0 rounded-2xl border border-cyan-100/80 bg-white shadow-md overflow-hidden flex flex-col",
            isActive
              ? "w-full md:w-[280px] lg:w-[390px] h-auto gap-4 p-4"
              : "w-full md:w-80 h-auto md:h-[44px] px-4 py-2 justify-center"
          )}
        >
          {/* Image Container */}
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={springTransition}
            className={cn(
              "overflow-hidden rounded-xl",
              isActive
                ? "relative w-full h-32 md:h-[185px] mb-0"
                : "relative w-full h-0 pointer-events-none mb-0"
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className={cn(
                "object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isActive ? "scale-105" : ""
              )}
              sizes={isActive ? "(max-width: 768px) 100vw, 390px" : "1px"}
              priority={isActive}
            />
            <div className={cn("absolute inset-0 mix-blend-overlay", colorOverlayMap[item.color])} />
          </motion.div>

          {/* Description Container */}
          <motion.div
            layout
            transition={springTransition}
            className="relative w-full flex items-center"
          >
            <p
              className={cn(
                "text-sm leading-relaxed transition-colors duration-500",
                isActive ? "text-neutral-600 font-normal" : "text-neutral-500 line-clamp-2 md:line-clamp-1"
              )}
            >
              {item.description}
            </p>
          </motion.div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}

function RollingTextList({ items, heading }: { items: ListItem[]; heading?: string }) {
  if (items.length === 0) return null;

  return (
    <div className="w-full flex flex-col">
      {heading && (
        <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-neutral-500">
          {heading}
        </h3>
      )}
      <div className="w-full flex flex-col">
        {items.map((item) => (
          <RollingTextItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export { RollingTextList };
