import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import AnimatedSection from "@/components/common/AnimatedSection";
import type { BlogPost } from "@/data/blog";

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex rounded-full border border-stone-200 bg-white/85 px-3 py-1 text-xs font-semibold text-stone-600">
      {category}
    </span>
  );
}

function AuthorLine({ post }: { post: BlogPost }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      {post.author.initials && (
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0F172A] text-[11px] font-bold text-white"
          aria-hidden="true"
        >
          {post.author.initials}
        </div>
      )}
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-stone-950">{post.author.name}</p>
        <p className="text-xs text-stone-500">{post.date}</p>
      </div>
    </div>
  );
}

type BlogCardProps = {
  post: BlogPost;
  delay?: number;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: () => void;
};

export default function BlogCard({ post, delay = 0, onMouseEnter, onMouseLeave }: BlogCardProps) {
  return (
    <AnimatedSection delay={delay} className="w-full flex justify-center">
      <Link
        href={`/blog/${post.slug}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="group flex w-full max-w-sm h-full flex-col overflow-hidden rounded-3xl border border-cyan-100/80 bg-white p-3 shadow-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.01]"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-stone-100">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-white/8" />
          <div className="absolute left-4 top-4">
            <CategoryBadge category={post.category} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-3 pt-2">
          <h2 className="font-display text-2xl font-normal leading-tight text-[#0F172A] text-balance transition group-hover:text-cyan-700">
            {post.title}
          </h2>
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-stone-600">{post.excerpt}</p>

          <div className="mt-7 flex items-end justify-between gap-4 border-t border-stone-200 pt-5">
            <AuthorLine post={post} />
            <div className="flex shrink-0 items-center gap-1 text-xs text-stone-500">
              <Clock size={12} aria-hidden="true" />
              {post.readTime}
            </div>
          </div>

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0F172A] transition group-hover:gap-3 group-hover:text-cyan-700">
            Read Article
            <ArrowRight size={15} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </AnimatedSection>
  );
}

export { CategoryBadge, AuthorLine };
