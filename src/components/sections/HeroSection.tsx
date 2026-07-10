"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { ArrowRight, Search, CheckCircle, Activity, Sparkles } from "lucide-react";
import { SiClaude, SiGooglegemini, SiPerplexity, SiJavascript, SiMongodb, SiTypescript, SiReact, SiNodedotjs } from "react-icons/si";
import { useScroll, useTransform } from "framer-motion";
import { StarButton } from "@/components/ui/star-button";
import AnimatedText from "@/components/ui/animated-text";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

const OpenAIIcon = ({ size = 20, color = "#10A37F" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v3.005l-2.607 1.5-2.602-1.5z"/>
  </svg>
);

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

export default function HeroSection() {
  const [domain, setDomain] = useState("");
  const [serviceIndex, setServiceIndex] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setServiceIndex((i) => (i + 1) % services.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!domain.trim()) return;
    window.open(`/ai-visibility-audit-report?domain=${encodeURIComponent(domain.trim())}`, "_blank");
  };

  return (
    <section ref={sectionRef} className="relative isolate bg-white h-[250vh]">
      {/* ── Gemini Lines Background ──────────────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <GoogleGeminiEffect
            pathLengths={[
              pathLengthFirst,
              pathLengthSecond,
              pathLengthThird,
              pathLengthFourth,
              pathLengthFifth,
            ]}
          />
        </div>

        {/* ── Hero Content (overlaid) ──────────────────────────────── */}
        <div className="relative z-10 mx-auto max-w-6xl w-full flex items-center h-full px-5 md:px-8">
          <div className="w-full">
            <p className="text-[22px] sm:text-[28px] md:text-[40px] font-semibold text-stone-900 leading-snug">
              A Team Behind Visibility, Product, and Growth.
            </p>
            <h1
              className="mt-3 md:mt-4 font-display font-medium text-stone-900"
              style={{ fontSize: "clamp(28px, 4.8vw, 56px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              <span className="relative inline-block min-h-[0.9em] gradient-text">
                <AnimatedText
                  key={services[serviceIndex]}
                  text={services[serviceIndex]}
                  className=""
                  animationType="letters"
                  duration={0.4}
                  staggerDelay={0.03}
                />
              </span>
            </h1>
            <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div>
                <p className="text-[14px] md:text-[17px] font-normal text-stone-500 leading-relaxed">
                  Track, audit, and improve how ChatGPT, Perplexity, Gemini, and Claude represent your brand.
                  Catch hallucinations before they cost you pipeline. Get recommended, not ignored.
                </p>
              </div>
              <div>
                <form id="hero-audit-form" onSubmit={handleSubmit} className="w-full">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-stone-400">
                        <Search className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="Enter your website URL"
                        className="w-full h-12 pl-10 pr-4 text-[14px] md:text-[15px] text-stone-900 placeholder-stone-400 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-cyan-300"
                        aria-label="Domain to audit"
                      />
                    </div>
                    <StarButton
                      as="span"
                      lightColor="#00f0ff"
                      backgroundColor="#0f172a"
                      borderWidth={2.2}
                      glow={true}
                      sparkGradient="conic-gradient(from 0deg, transparent 0deg, transparent 40deg, rgba(0, 240, 255, 0.7) 100deg, var(--light-color) 180deg, #ffffff 200deg, #00f0ff 220deg, rgba(0, 240, 255, 0.7) 280deg, transparent 330deg)"
                      className="font-sans font-semibold text-[11px] uppercase tracking-[0.2em] h-12 w-full sm:w-auto"
                      onClick={() => {
                        const form = document.querySelector("#hero-audit-form") as HTMLFormElement;
                        form?.requestSubmit();
                      }}
                    >
                      Check AI Visibility
                      <ArrowRight className="h-4 w-4 group-hover/star-button:translate-x-1 transition-transform duration-300" />
                    </StarButton>
                  </div>
                </form>
                <div className="mt-3 md:mt-4 flex flex-wrap justify-center md:justify-between gap-2 md:gap-3 text-[11px] md:text-[12px] text-stone-600">
                  <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 md:px-3 md:py-2" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(6,182,212,0.12) 100%)", border: "1px solid rgba(16,185,129,0.2)" }}>
                    <CheckCircle className="h-3 w-3 md:h-3.5 md:w-3.5 text-emerald-500" />
                    No signup required
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 md:px-3 md:py-2" style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(99,102,241,0.12) 100%)", border: "1px solid rgba(6,182,212,0.2)" }}>
                    <Activity className="h-3 w-3 md:h-3.5 md:w-3.5 text-cyan-500" />
                    Takes ~30 seconds
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 md:px-3 md:py-2" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.12) 100%)", border: "1px solid rgba(99,102,241,0.2)" }}>
                    <Sparkles className="h-3 w-3 md:h-3.5 md:w-3.5 text-indigo-500" />
                    Free
                  </span>
                </div>
              </div>
            </div>
            {/* Tech stack marquee */}
            <div className="mt-8 md:mt-12 overflow-hidden border-t border-stone-200/60 pt-4 md:pt-6">
              <div className="flex animate-marquee whitespace-nowrap" style={{"--duration": "30s"} as React.CSSProperties}>
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="inline-flex items-center gap-6 md:gap-10 mx-3 md:mx-5">
                    <span className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-600 transition-colors"><OpenAIIcon size={16} color="#10A37F" /> <span className="text-xs md:text-sm">ChatGPT</span></span>
                    <span className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiClaude size={16} color="#CC785C" /> <span className="text-xs md:text-sm">Claude</span></span>
                    <span className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiGooglegemini size={16} color="#4285F4" /> <span className="text-xs md:text-sm">Gemini</span></span>
                    <span className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiPerplexity size={16} color="#20B8CD" /> <span className="text-xs md:text-sm">Perplexity</span></span>
                    <span className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiTypescript size={16} color="#3178C6" /> <span className="text-xs md:text-sm">TypeScript</span></span>
                    <span className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiJavascript size={16} color="#F7DF1E" /> <span className="text-xs md:text-sm">JavaScript</span></span>
                    <span className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiMongodb size={16} color="#47A248" /> <span className="text-xs md:text-sm">MongoDB</span></span>
                    <span className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiReact size={16} color="#61DAFB" /> <span className="text-xs md:text-sm">React</span></span>
                    <span className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiNodedotjs size={16} color="#339933" /> <span className="text-xs md:text-sm">Node.js</span></span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
