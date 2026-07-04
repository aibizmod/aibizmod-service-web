"use client";

import AnimatedSection from "@/components/common/AnimatedSection";
import ThreeDMarquee from "@/components/ui/3d-marquee";
import { StackedCards } from "@/components/ui/glass-cards";
import Link from "next/link";
import { StarButton } from "@/components/ui/star-button";
import { ArrowRight } from "lucide-react";

export default function ServicesGrid() {
  return (
    <section
      id="services"
      className="relative bg-white px-6 py-16 md:py-24"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15, 23, 42, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.055) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(210,247,255,0.48),transparent_32%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <AnimatedSection>
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
              How We Help
            </span>
            <ThreeDMarquee className="mt-6 max-w-full" />
            <h2
              className="mt-5 font-display font-thin text-primary text-balance"
              style={{
                fontSize: "clamp(30px, 4vw, 44px)",
                lineHeight: 1.1,
              }}
            >
              Practical Tech Support for Everyday Business Work
            </h2>
            <p
              className="mt-5 text-stone-600"
              style={{ fontSize: 18, lineHeight: 1.7 }}
            >
              We plan and build websites, apps, automations, and digital systems that make everyday business work easier.
            </p>
            <div className="mt-8">
              <Link
                href="/services"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-3xl inline-flex"
              >
                <StarButton
                  as="span"
                  lightColor="#00f0ff"
                  backgroundColor="#0f172a"
                  borderWidth={2.2}
                  glow={true}
                  sparkGradient="conic-gradient(from 0deg, transparent 0deg, transparent 40deg, rgba(0, 240, 255, 0.7) 100deg, var(--light-color) 180deg, #ffffff 200deg, #00f0ff 220deg, rgba(0, 240, 255, 0.7) 280deg, transparent 330deg)"
                  className="font-sans font-semibold text-[11px] uppercase tracking-[0.2em]"
                >
                  View Services
                  <ArrowRight className="h-4 w-4 group-hover/star-button:translate-x-1 transition-transform duration-300" />
                </StarButton>
              </Link>
            </div>
          </AnimatedSection>
        </div>

        <StackedCards />
      </div>
    </section>
  );
}
