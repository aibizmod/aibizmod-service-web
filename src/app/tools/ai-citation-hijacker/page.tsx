import type { Metadata } from "next";
import AICitationHijackerClient from "@/components/tools/AICitationHijackerClient";

export const metadata: Metadata = {
  title: "Free AI Citation Hijacker & Community Source Finder | GEO SEO Tool | aibizmod",
  description:
    "Discover the exact Reddit threads, YouTube transcripts, and niche blogs cited by ChatGPT, Perplexity, and Google AI Overviews for your industry. Get 1-click authentic responses to flip recommendations to your brand.",
  keywords: [
    "AI citation hijacker",
    "GEO tool",
    "Reddit AI citations",
    "YouTube transcript SEO",
    "Perplexity citation finder",
    "ChatGPT search optimization",
    "AI search visibility",
    "generative engine optimization",
    "competitor citation tracker",
  ],
  alternates: {
    canonical: "https://aibizmod.com/tools/ai-citation-hijacker",
  },
  openGraph: {
    title: "Free AI Citation Hijacker & Community Source Finder | aibizmod",
    description:
      "Discover the exact Reddit threads, YouTube transcripts, and niche blogs cited by ChatGPT and Perplexity. Get 1-click authentic responses to get your brand recommended.",
    url: "/tools/ai-citation-hijacker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Citation Hijacker & Community Source Finder | aibizmod",
    description:
      "Find out which Reddit threads and YouTube videos ChatGPT & Perplexity cite in your niche. Flip AI recommendations to your brand.",
  },
};

export default function AICitationHijackerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AIBizMod AI Citation Hijacker & Source Finder",
    applicationCategory: "WebApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free GEO tool to discover and optimize third-party community citations (Reddit, YouTube, niche blogs) powering ChatGPT and Perplexity search answers.",
    url: "https://aibizmod.com/tools/ai-citation-hijacker",
    provider: {
      "@type": "Organization",
      name: "aibizmod",
      url: "https://aibizmod.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AICitationHijackerClient />
    </>
  );
}
