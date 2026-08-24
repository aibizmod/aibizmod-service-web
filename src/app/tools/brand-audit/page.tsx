import type { Metadata } from "next";
import BrandAuditClient from "@/components/tools/BrandAuditClient";

export const metadata: Metadata = {
  title: "Free Brand Audit Tool for AI Search | aibizmod",
  description:
    "Audit how clearly your website communicates your brand to ChatGPT, Perplexity, Gemini, Claude, and AI answer engines. Get AI visibility scores, prompts, and fixes.",
  keywords: [
    "brand audit tool",
    "AI brand audit",
    "AI visibility audit",
    "ChatGPT brand visibility",
    "Perplexity brand audit",
    "generative engine optimization",
    "GEO audit tool",
    "brand visibility checker",
  ],
  alternates: {
    canonical: "https://aibizmod.com/tools/brand-audit",
  },
  openGraph: {
    title: "Free Brand Audit Tool for AI Search | aibizmod",
    description:
      "Score your brand entity clarity, AI citability, proof signals, and platform readiness across AI answer engines.",
    url: "/tools/brand-audit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Brand Audit Tool for AI Search | aibizmod",
    description:
      "Audit how AI engines understand your brand and get a practical action plan.",
  },
};

export default function BrandAuditPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AIBizMod Brand Audit Tool",
    applicationCategory: "WebApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Audit brand entity clarity, AI citability signals, trust proof, and platform readiness for AI search engines.",
    url: "https://aibizmod.com/tools/brand-audit",
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
      <BrandAuditClient />
    </>
  );
}
