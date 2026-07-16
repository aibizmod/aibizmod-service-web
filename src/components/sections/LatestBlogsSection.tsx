"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/common/AnimatedSection";
import { blogPosts } from "@/data/blog";
import BlogCard from "@/components/blog/BlogCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LatestBlogsSection() {
  const latestPosts = blogPosts.slice(0, 3);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".blog-card-item");

    // Initial state — cards invisible, tilted and raised
    gsap.set(cards, { opacity: 0, y: 60, rotateY: 12, transformOrigin: "left center" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: grid,
        start: "top 82%",
        toggleActions: "play none none none",
      },
    });

    tl.to(cards, {
      opacity: 1,
      y: 0,
      rotateY: 0,
      duration: 0.75,
      ease: "power3.out",
      stagger: 0.14,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="py-24 px-6 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md">
            aibizmod Journal
          </span>
          <h2
            className="mt-7 font-display font-bold"
            style={{ fontSize: "clamp(26px, 3.5vw, 38px)", lineHeight: 1.1, color: "#0E7490" }}
          >
            Latest From Our Blog
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto leading-relaxed" style={{ fontSize: 16 }}>
            Practical notes on building a service brand — from AI automation to GEO and website strategy.
          </p>
        </AnimatedSection>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center"
          style={{ perspective: "1000px" }}
        >
          {latestPosts.map((post) => (
            <div key={post.slug} className="blog-card-item w-full flex justify-center">
              <BlogCard post={post} delay={0} />
            </div>
          ))}
        </div>

        <AnimatedSection delay={0.2} className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1E293B] shadow-[0_10px_24px_rgba(15,23,42,0.16)]"
          >
            View All Articles
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
