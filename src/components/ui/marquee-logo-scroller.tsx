"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

// Define the type for individual logo props
interface Logo {
  src: string;
  alt: string;
  website: string;
  gradient: {
    from: string;
    via: string;
    to: string;
  };
}

// Define the props for the main component
interface MarqueeLogoScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  logos: Logo[];
  speed?: "normal" | "slow" | "fast";
}

/**
 * A responsive, self-contained, and infinitely scrolling marquee component.
 * It pauses on hover and uses shadcn/ui theme variables for styling.
 * This component includes its own CSS animation and does not require tailwind.config.js modifications.
 */
const MarqueeLogoScroller = React.forwardRef<
  HTMLDivElement,
  MarqueeLogoScrollerProps
>(
  (
    { title, description, logos, speed = "normal", className, ...props },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClickedPaused, setIsClickedPaused] = useState(false);

    // Map speed prop to animation duration
    const durationMap = {
      normal: "40s",
      slow: "80s",
      fast: "5s",
    };
    const animationDuration = durationMap[speed];

    return (
      <>
        {/* The @keyframes for the marquee animation are defined directly here for robustness. */}
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>

        <section
          ref={ref}
          aria-label={title}
          className={cn(
            "w-full bg-background text-foreground rounded-lg border overflow-hidden",
            className,
          )}
          {...props}
        >
          {/* Header Section */}
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex flex-col items-center text-center gap-3 pb-6 md:pb-8 border-b">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-cyan-800">
                {title}
              </h2>
              <p className="text-muted-foreground max-w-md">{description}</p>
            </div>
          </div>

          {/* Marquee Section */}
          <div
            className="w-full overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsClickedPaused(false);
            }}
          >
            <div
              className="flex w-max items-center gap-4 pt-16 pb-4 pr-4 transition-all duration-300 ease-in-out"
              style={{
                animation: `marquee ${animationDuration} linear infinite`,
                animationPlayState:
                  isHovered || isClickedPaused ? "paused" : "running",
              }}
            >
              {/* Render logos twice to create a seamless loop */}
              {[...logos, ...logos].map((logo, index) => (
                <a
                  key={index}
                  href={logo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsClickedPaused(true)}
                  className="group relative h-24 w-40 shrink-0 flex items-center justify-center rounded-lg bg-secondary/70 overflow-visible transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                >
                  {/* Uniform light glow background revealed on hover */}
                  <div className="absolute inset-0 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 bg-gradient-to-br from-white/95 via-cyan-50/40 to-white/95" />
                  {/* Logo Image */}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="relative z-10 h-3/4 w-auto object-contain transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                  />

               
                  {/* Tooltip */}
                 {/* Tooltip */}
<div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none z-50">
  <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
    {logo.alt}
  </div>

  <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1"></div>
</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  },
);

MarqueeLogoScroller.displayName = "MarqueeLogoScroller";

export default MarqueeLogoScroller;
export { MarqueeLogoScroller };
