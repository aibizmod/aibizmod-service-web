"use client";

import { useState, FormEvent, useEffect } from "react";
import { ArrowRight, Search, CheckCircle, Activity, Sparkles } from "lucide-react";
import { SiOpenai, SiClaude, SiGooglegemini, SiPerplexity, SiJavascript, SiMongodb, SiTypescript, SiReact, SiNodedotjs } from "react-icons/si";
import ShaderBackground from "@/components/ui/shader-background";
import { StarButton } from "@/components/ui/star-button";
import AnimatedText from "@/components/ui/animated-text";

const services = [
  "AI & Automation",
  "Digital Marketing",
  "Web Development",
  "Custom Software",
  "Mobile Apps",
  "Hosting & Infrastructure",
  "Customer Experience",
  "IT Consulting",
];

type HeroVariant = 1 | 2 | 3 | 4;

interface HeroSectionProps {
  variant?: HeroVariant;
}

export default function HeroSection({ variant = 4 }: HeroSectionProps) {
  const [domain, setDomain] = useState("");
  const [serviceIndex, setServiceIndex] = useState(0);

  useEffect(() => {
    if (variant !== 4) return;
    const interval = setInterval(() => {
      setServiceIndex((i) => (i + 1) % services.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [variant]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!domain.trim()) return;
    window.open(`/ai-visibility-audit-report?domain=${encodeURIComponent(domain.trim())}`, "_blank");
  };

  const inputField = (
    <form id="hero-audit-form" onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-stone-400">
          <Search className="h-4 w-4" />
        </div>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter your website URL"
          className="w-full h-12 pl-10 pr-36 text-[15px] text-stone-900 placeholder-stone-400 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-cyan-300"
          aria-label="Domain to audit"
        />
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
          <StarButton
            as="span"
            lightColor="#38bdf8"
            backgroundColor="#0f172a"
            className="h-9 px-4 text-[13px] font-medium cursor-pointer"
            onClick={() => {
              const form = document.querySelector("#hero-audit-form") as HTMLFormElement;
              form?.requestSubmit();
            }}
          >
            Check visibility <ArrowRight size={15} />
          </StarButton>
        </div>
      </div>
    </form>
  );

  if (variant === 4) {
    return (
      <section className="relative isolate min-h-screen bg-white">
        <ShaderBackground className="absolute inset-0 z-0 h-full w-full" />
        <div className="relative z-10 mx-auto max-w-6xl min-h-screen flex items-center">
          <div className="w-full">
            <p className="text-[28px] md:text-[40px] font-semibold text-stone-900 leading-snug">
              A Team Behind Visibility, Product, and Growth.
            </p>
            <h1
              className="mt-4 font-display font-medium text-stone-900"
              style={{ fontSize: "clamp(36px, 4.8vw, 56px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              <span className="relative inline-block min-w-[220px] min-h-[0.9em]">
                <AnimatedText
                  key={services[serviceIndex]}
                  text={services[serviceIndex]}
                  className="text-cyan-600"
                  animationType="letters"
                  duration={0.4}
                  staggerDelay={0.03}
                />
              </span>
            </h1>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-[15px] md:text-[17px] font-normal text-stone-500 leading-relaxed">
                  Track, audit, and improve how ChatGPT, Perplexity, Gemini, and Claude represent your brand.
                  Catch hallucinations before they cost you pipeline. Get recommended, not ignored.
                </p>
              </div>
              <div>
                {inputField}
                <div className="mt-4 flex flex-wrap gap-3 text-[12px] text-stone-500">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-stone-100 px-3 py-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    No signup required
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-stone-100 px-3 py-2">
                    <Activity className="h-3.5 w-3.5 text-cyan-500" />
                    Takes ~30 seconds
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-stone-100 px-3 py-2">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
                    Free
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-12 overflow-hidden border-t border-stone-200/60 pt-6">
              <div className="flex animate-marquee whitespace-nowrap" style={{"--duration": "30s"} as React.CSSProperties}>
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="inline-flex items-center gap-10 mx-5">
                    <span className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiOpenai size={20} color="#10A37F" /> ChatGPT</span>
                    <span className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiClaude size={20} color="#CC785C" /> Claude</span>
                    <span className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiGooglegemini size={20} color="#4285F4" /> Gemini</span>
                    <span className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiPerplexity size={20} color="#20B8CD" /> Perplexity</span>
                    <span className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiTypescript size={20} color="#3178C6" /> TypeScript</span>
                    <span className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiJavascript size={20} color="#F7DF1E" /> JavaScript</span>
                    <span className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiMongodb size={20} color="#47A248" /> MongoDB</span>
                    <span className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiReact size={20} color="#61DAFB" /> React</span>
                    <span className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiNodedotjs size={20} color="#339933" /> Node.js</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate min-h-screen bg-white">
      <ShaderBackground className="absolute inset-0 z-0 h-full w-full" />
      <div className="relative z-10 mx-auto max-w-6xl min-h-screen flex items-center">
        <div className="w-full max-w-2xl">
          <p className="text-[28px] md:text-[40px] font-semibold text-stone-900 leading-snug">
            A Team Behind Visibility, Product, and Growth.
          </p>
          <h1
            className="mt-4 font-display font-medium text-stone-900"
            style={{ fontSize: "clamp(36px, 4.8vw, 56px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            <span className="text-cyan-600">Technology</span>{" "}
            <span className="text-stone-400 font-thin">&amp;</span>{" "}
            <span className="text-cyan-600">AI Visibility</span>
            <span className="block text-stone-900 font-extralight mt-2">
              Business Connected.
            </span>
          </h1>
          <p className="mt-5 text-[15px] leading-7 text-stone-500">
            We build your digital stack and optimize how AI platforms see your brand. One partner. Full visibility.
          </p>
          <div className="mt-8 w-full max-w-md">
            {inputField}
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-stone-400">
              <span className="inline-flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                No signup required
              </span>
              <span className="inline-flex items-center gap-1">
                <Activity className="h-3.5 w-3.5 text-cyan-500" />
                Takes ~30 seconds
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
