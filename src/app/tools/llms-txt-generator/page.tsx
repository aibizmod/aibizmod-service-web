import type { Metadata } from "next";
import LLMsTxtGeneratorClient from "@/components/tools/LLMsTxtGeneratorClient";

export const metadata: Metadata = {
  title: "Free llms.txt Generator & Auditor | AI SEO Tool | aibizmod",
  description:
    "Generate a perfectly formatted llms.txt file for ChatGPT, Perplexity, Claude, and AI crawlers. Audit existing llms.txt files and boost your AI visibility and GEO indexation instantly.",
  keywords: [
    "llms.txt generator",
    "llms.txt auditor",
    "AI SEO tool",
    "llms txt generator free",
    "generative engine optimization",
    "GEO audit",
    "AI crawler optimization",
    "ChatGPT search optimization",
    "Perplexity SEO",
  ],
  alternates: {
    canonical: "https://aibizmod.com/tools/llms-txt-generator",
  },
  openGraph: {
    title: "Free llms.txt Generator & Auditor | AI SEO Tool | aibizmod",
    description:
      "Generate a perfectly formatted llms.txt file for ChatGPT, Perplexity, Claude, and AI crawlers. Audit compliance and boost AI visibility instantly.",
    url: "/tools/llms-txt-generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free llms.txt Generator & Auditor | aibizmod",
    description:
      "Generate and audit llms.txt files for ChatGPT, Perplexity, and AI search engines. 100% free tool.",
  },
};

export default function LLMsTxtGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AIBizMod llms.txt Generator & Auditor",
    applicationCategory: "WebApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Generate and audit llms.txt files according to the official Answer.AI and llmstxt.org specification.",
    url: "https://aibizmod.com/tools/llms-txt-generator",
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
      <LLMsTxtGeneratorClient />
    </>
  );
}
