"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
 * A responsive, velocity-controlled infinite scrolling marquee component.
 * Uses GSAP ScrollTrigger to increase velocity on scroll and decelerates smoothly on hover.
 */
const MarqueeLogoScroller = React.forwardRef<
  HTMLDivElement,
  MarqueeLogoScrollerProps
>(
  (
    { title, description, logos, speed = "normal", className, ...props },
    ref,
  ) => {
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // Register ScrollTrigger inside effect for safe Next.js SSR execution
      gsap.registerPlugin(ScrollTrigger);

      const scroller = scrollerRef.current;
      if (!scroller) return;

      // Base loop animation running infinitely
      const baseDuration = speed === "fast" ? 12 : speed === "slow" ? 60 : 25;
      
      const animation = gsap.to(scroller, {
        xPercent: -50,
        repeat: -1,
        duration: baseDuration,
        ease: "none",
      });

      // Track scroll velocity to dynamically speed up/slow down scroller
      const trigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          // Map velocity (pixels/sec) to a multiplier (from 1.0 to ~5.0 max)
          const multiplier = 1 + Math.min(Math.abs(velocity) * 0.0018, 5.0);
          
          gsap.to(animation, {
            timeScale: multiplier,
            duration: 0.5, // Smooth deceleration / acceleration
            overwrite: "auto",
          });
        },
      });

      // Clean transition of speed on hover (smooth slide to stop)
      let hoverTween: gsap.core.Tween | null = null;
      
      const handleMouseEnter = () => {
        if (hoverTween) hoverTween.kill();
        hoverTween = gsap.to(animation, { timeScale: 0, duration: 0.4, ease: "power2.out" });
      };

      const handleMouseLeave = () => {
        if (hoverTween) hoverTween.kill();
        // Return to 1.0 base timeScale smoothly
        hoverTween = gsap.to(animation, { timeScale: 1, duration: 0.5, ease: "power2.out" });
      };

      scroller.addEventListener("mouseenter", handleMouseEnter);
      scroller.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        animation.kill();
        trigger.kill();
        if (hoverTween) hoverTween.kill();
        scroller.removeEventListener("mouseenter", handleMouseEnter);
        scroller.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, [speed]);

    return (
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
        <div className="p-4 sm:p-6 md:p-8 lg:p-10">
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
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div
            ref={scrollerRef}
            className="flex w-max items-center gap-4 pt-16 pb-4 pr-4"
          >
            {/* Render logos twice to create a seamless loop */}
            {[...logos, ...logos].map((logo, index) => (
              <a
                key={index}
                href={logo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-24 w-40 shrink-0 flex items-center justify-center rounded-lg bg-secondary/70 overflow-visible transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                {/* Uniform light glow background revealed on hover */}
                <div className="absolute inset-0 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 bg-gradient-to-br from-white/95 via-cyan-50/40 to-white/95" />
                
                {/* Logo Image */}
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="160px"
                  className="relative z-10 p-3.5 object-contain transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                />

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
    );
  },
);

MarqueeLogoScroller.displayName = "MarqueeLogoScroller";

export default MarqueeLogoScroller;
export { MarqueeLogoScroller };
