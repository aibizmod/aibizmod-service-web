import type { Metadata } from "next";
import AiReadinessContent from "@/components/readiness/AiReadinessContent";

export const metadata: Metadata = {
  title: "AI Readiness Score | Free AI Adoption Assessment | aibizmod",
  description:
    "Answer 18 questions about your data, processes, people, and tech stack to get a free AI readiness score and a tailored automation adoption roadmap. No signup required.",
  keywords: [
    "AI readiness assessment",
    "AI readiness score",
    "AI adoption assessment",
    "automation readiness check",
    "is my business ready for AI",
    "AI maturity assessment",
    "business AI readiness quiz",
    "automation readiness",
  ],
  alternates: { canonical: "https://aibizmod.com/ai-readiness-score" },
  openGraph: {
    title: "AI Readiness Score | aibizmod",
    description:
      "Get a free AI readiness score and a tailored automation adoption roadmap based on your data, processes, and tech stack.",
    url: "/ai-readiness-score",
  },
};

export default function AiReadinessScorePage() {
  return <AiReadinessContent />;
}