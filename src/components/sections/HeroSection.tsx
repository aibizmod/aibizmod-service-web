"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Search } from "lucide-react";
import {
  SiGoogleanalytics,
  SiGooglemaps,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiTypescript,
} from "react-icons/si";
import ShaderBackground from "@/components/ui/shader-background";
import { StarButton } from "@/components/ui/star-button";
import { TextReveal } from "@/components/ui/cascade-text";

const techStack = [
  { label: "TypeScript", icon: SiTypescript, color: "#3178C6", className: "left-[10%] top-[18%]", delay: "0s" },
  { label: "MongoDB", icon: SiMongodb, color: "#47A248", className: "right-[9%] top-[22%]", delay: "0.7s" },
  { label: "SQL", icon: SiPostgresql, color: "#4169E1", className: "left-[16%] bottom-[22%]", delay: "1.4s" },
  { label: "Geo", icon: SiGooglemaps, color: "#4285F4", className: "right-[15%] bottom-[24%]", delay: "2.1s" },
  { label: "SEO", icon: SiGoogleanalytics, color: "#E37400", className: "left-[6%] top-[52%]", delay: "2.8s" },
  { label: "JavaScript", icon: SiJavascript, color: "#F7DF1E", className: "right-[7%] top-[56%]", delay: "3.5s" },
];

export default function HeroSection() {
  const [domain, setDomain] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!domain.trim()) return;
    window.open(`/ai-visibility-audit-report?domain=${encodeURIComponent(domain.trim())}`, "_blank");
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-white">
      <ShaderBackground className="absolute inset-0 z-0 h-full w-full" />

      <div className="pointer-events-none absolute inset-0 z-10 hidden md:block" aria-hidden="true">
        {techStack.map((tech) => (
          <div
            key={tech.label}
            className={`absolute ${tech.className} flex h-12 w-12 animate-[float-tech_6s_ease-in-out_infinite] items-center justify-center rounded-full border border-white/75 bg-white/85 text-stone-700 shadow-[0_20px_38px_rgba(28,25,23,0.16),inset_0_1px_0_rgba(255,255,255,0.9)]`}
            style={{ animationDelay: tech.delay }}
          >
            <tech.icon color={tech.color} size={22} aria-hidden="true" />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
        <h1
          className="max-w-3xl font-display font-thin text-[#0F172A] text-balance"
          style={{ fontSize: "clamp(34px, 5vw, 58px)", lineHeight: 1.04 }}
        >
          Technology That Keeps
          <br />
          <TextReveal
            text="Business Connected"
            as="span"
            fontSize="inherit"
            color="#0F172A"
            hoverColor="#0891B2"
            className="font-thin normal-case tracking-tight"
            style={{ padding: 0 }}
          />
        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-6 text-stone-600 md:text-base md:leading-7">
          We build technology that brings teams together, makes daily work easier, and gives customers a smoother digital experience.
        </p>

        <div className="mt-10 w-full max-w-xl">
          <div className="relative rounded-2xl border border-stone-200 bg-white shadow-[0_18px_55px_rgba(59,130,246,0.12)] backdrop-blur-md overflow-hidden">
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-stone-400">
              <Search className="h-5 w-5" />
            </div>
            <form id="hero-audit-form" onSubmit={handleSubmit}>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Enter your domain (e.g., aibizmod.com)"
                className="w-full h-14 pl-12 pr-36 text-base text-[#0F172A] placeholder-stone-400 bg-transparent focus:outline-none focus:ring-0"
                aria-label="Domain to audit"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                {!domain.trim() ? (
                  <span className="inline-flex h-10 items-center gap-2 rounded-xl bg-stone-900/50 px-5 text-sm font-semibold text-white/50 cursor-not-allowed">
                    Check Visibility <ArrowRight size={16} />
                  </span>
                ) : (
                  <StarButton
                    as="span"
                    lightColor="#38bdf8"
                    backgroundColor="#0f172a"
                    className="h-10 px-5 text-sm font-semibold cursor-pointer"
                    onClick={() => {
                      const form = document.querySelector("#hero-audit-form") as HTMLFormElement;
                      form?.requestSubmit();
                    }}
                  >
                    Check Visibility <ArrowRight size={16} />
                  </StarButton>
                )}
              </div>
            </form>
          </div>
          <p className="mt-3 text-xs text-stone-400 text-center">
            Free AI visibility report · No account needed · Runs in ~15 seconds
          </p>
        </div>
      </div>
    </section>
  );
}
