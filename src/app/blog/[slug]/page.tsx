import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, BookOpen, Lightbulb, ExternalLink } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyFooterLayout from "@/components/layout/StickyFooterLayout";
import AnimatedSection from "@/components/common/AnimatedSection";
import { blogAuthor, blogPosts, getBlogPost } from "@/data/blog";

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogDetailPageProps): Metadata {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Blog post not found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://aibizmod.com/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | aibizmod`,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      images: [
        {
          url: post.image,
          alt: post.imageAlt,
        },
      ],
    },
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = getBlogPost(params.slug);

  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `https://aibizmod.com${post.image}`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: blogAuthor.name,
      url: blogAuthor.url,
      description: blogAuthor.bio,
    },
    publisher: {
      "@type": "Organization",
      name: "aibizmod",
      url: "https://aibizmod.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://aibizmod.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
          />

        <section className="relative overflow-hidden bg-white px-6 pb-12 pt-44 md:pb-16 md:pt-48">
          <div
            className="pointer-events-none absolute inset-x-0 top-24 h-48 opacity-50"
            style={{
              background:
                "radial-gradient(circle at 44% 18%, rgba(210,247,255,0.5), transparent 34%), linear-gradient(90deg, transparent, rgba(72,127,137,0.1), transparent)",
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-5xl">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/85 px-4 py-2 text-sm font-semibold text-stone-800 shadow-sm backdrop-blur transition hover:border-stone-300"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Back to Blog
            </Link>

            <AnimatedSection>
              <span className="inline-flex rounded-full border border-stone-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 shadow-sm backdrop-blur">
                {post.category}
              </span>
              <h1
                className="mt-7 max-w-4xl font-display font-normal text-[#0F172A] text-balance"
                style={{ fontSize: "clamp(34px, 5vw, 60px)", lineHeight: 1.04 }}
              >
                {post.title}
              </h1>

              {/* Answer summary — direct answer to the article’s main question */}
              <p className="mt-6 max-w-3xl text-base leading-8 text-stone-700 md:text-lg font-medium">
                {post.answerSummary}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-stone-500">
                <span className="font-semibold text-stone-950">
                  {post.author.name}
                </span>
                <span aria-hidden="true">·</span>
                <span>Last updated: {post.date}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={14} aria-hidden="true" />
                  {post.readTime}
                </span>
                {post.reviewer && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Reviewed by: {post.reviewer}</span>
                  </>
                )}
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="border-t border-stone-200 bg-stone-50 px-6 pb-24 pt-10">
          <div className="mx-auto max-w-5xl">
            <AnimatedSection>
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 960px, 100vw"
                  className="object-cover"
                />
              </div>
            </AnimatedSection>

            <article className="mx-auto mt-14 max-w-3xl">

              {/* Key Takeaways */}
              <AnimatedSection className="mb-14 rounded-2xl border border-cyan-200 bg-cyan-50/60 px-6 py-8 shadow-[0_14px_36px_rgba(15,23,42,0.05)] md:px-9">
                <div className="flex items-center gap-3 mb-5">
                  <BookOpen size={18} className="text-cyan-700 shrink-0" aria-hidden="true" />
                  <h2 className="font-display font-semibold text-[#0F172A]" style={{ fontSize: "clamp(18px, 2.5vw, 22px)", lineHeight: 1.2 }}>
                    Key Takeaways
                  </h2>
                </div>
                <ul className="space-y-3">
                  {post.keyTakeaways.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-7 text-stone-700">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              {/* Definitions (rendered only when present) */}
              {post.definitions && post.definitions.length > 0 && (
                <AnimatedSection className="mb-14 rounded-2xl border border-stone-200 bg-white px-6 py-8 shadow-[0_14px_36px_rgba(15,23,42,0.05)] md:px-9">
                  <div className="flex items-center gap-3 mb-5">
                    <Lightbulb size={18} className="text-stone-500 shrink-0" aria-hidden="true" />
                    <h2 className="font-display font-semibold text-[#0F172A]" style={{ fontSize: "clamp(18px, 2.5vw, 22px)", lineHeight: 1.2 }}>
                      Key Definitions
                    </h2>
                  </div>
                  <dl className="space-y-5">
                    {post.definitions.map((def) => (
                      <div key={def.term}>
                        <dt className="text-sm font-semibold text-[#0F172A]">{def.term}</dt>
                        <dd className="mt-1 text-sm leading-7 text-stone-600">{def.definition}</dd>
                      </div>
                    ))}
                  </dl>
                </AnimatedSection>
              )}

              {/* Article sections */}
              {post.sections.map((section) => (
                <AnimatedSection
                  key={section.heading}
                  className="mb-14 rounded-2xl border border-stone-200 bg-white px-6 py-8 shadow-[0_14px_36px_rgba(15,23,42,0.05)] last:mb-0 md:px-9"
                >
                  <h2
                    className="font-display font-normal text-[#0F172A] text-balance"
                    style={{ fontSize: "clamp(26px, 4vw, 40px)", lineHeight: 1.12 }}
                  >
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-5">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-8 text-stone-600 md:text-lg"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="mt-6 space-y-3 rounded-xl border border-stone-200 bg-stone-50 p-5">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-sm leading-7 text-stone-700"
                        >
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#0F172A]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.citations && section.citations.length > 0 && (
                    <div className="mt-6 border-t border-stone-100 pt-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">Sources</p>
                      <ul className="space-y-1">
                        {section.citations.map((cite) => (
                          <li key={cite.url}>
                            <a
                              href={cite.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-cyan-700 hover:text-cyan-900 transition-colors"
                            >
                              <ExternalLink size={11} aria-hidden="true" />
                              {cite.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </AnimatedSection>
              ))}

              {/* Related Services (rendered only when present) */}
              {post.relatedServices && post.relatedServices.length > 0 && (
                <AnimatedSection className="mb-14 rounded-2xl border border-stone-200 bg-white px-6 py-8 shadow-[0_14px_36px_rgba(15,23,42,0.05)] md:px-9">
                  <h2 className="font-display font-semibold text-[#0F172A] mb-5" style={{ fontSize: "clamp(18px, 2.5vw, 22px)", lineHeight: 1.2 }}>
                    Related Services
                  </h2>
                  <ul className="space-y-3">
                    {post.relatedServices.map((service) => (
                      <li key={service.href}>
                        <Link
                          href={service.href}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-900 transition-colors"
                        >
                          <ArrowRight size={14} aria-hidden="true" />
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AnimatedSection>
              )}

              {/* Reviewer (rendered only when present) */}
              {post.reviewer && (
                <AnimatedSection className="mb-14 rounded-2xl border border-stone-200 bg-stone-50 px-6 py-6 shadow-[0_14px_36px_rgba(15,23,42,0.05)] md:px-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400 mb-1">Reviewed by</p>
                  <p className="text-sm font-semibold text-stone-700">{post.reviewer}</p>
                </AnimatedSection>
              )}

            </article>

            <AnimatedSection className="mx-auto mt-14 max-w-3xl border-t border-stone-200 pt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F172A] transition hover:gap-3"
              >
                More aibizmod Notes
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </AnimatedSection>
          </div>
        </section>
        </main>
      </StickyFooterLayout>
    </>
  );
}
