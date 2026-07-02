import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/common/AnimatedSection";
import { blogPosts } from "@/data/blog";
import BlogCard from "@/components/blog/BlogCard";

export default function LatestBlogsSection() {
  const latestPosts = blogPosts.slice(0, 3);

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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
          {latestPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} delay={index * 0.06} />
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
