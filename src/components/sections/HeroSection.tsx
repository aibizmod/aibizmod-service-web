"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
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
import AIVisibilityHero from "@/components/sections/AIVisibilityHero";

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/aibizmod",
    icon: FaLinkedinIn,
    color: "#0A66C2",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/aibizmod",
    icon: FaInstagram,
    color: "#E4405F",
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com/aibizmod",
    icon: FaPinterestP,
    color: "#E60023",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/aibizmod",
    icon: FaFacebookF,
    color: "#1877F2",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/442079460958",
    icon: FaWhatsapp,
    color: "#25D366",
  },
  {
    label: "Email",
    href: "mailto:hello@aibizmod.com",
    icon: MdEmail,
    color: "#EA4335",
  },
];

const techStack = [
  {
    label: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    className: "left-[10%] top-[18%]",
    delay: "0s",
  },
  {
    label: "MongoDB",
    icon: SiMongodb,
    color: "#47A248",
    className: "right-[9%] top-[22%]",
    delay: "0.7s",
  },
  {
    label: "SQL",
    icon: SiPostgresql,
    color: "#4169E1",
    className: "left-[16%] bottom-[22%]",
    delay: "1.4s",
  },
  {
    label: "Geo",
    icon: SiGooglemaps,
    color: "#4285F4",
    className: "right-[15%] bottom-[24%]",
    delay: "2.1s",
  },
  {
    label: "SEO",
    icon: SiGoogleanalytics,
    color: "#E37400",
    className: "left-[6%] top-[52%]",
    delay: "2.8s",
  },
  {
    label: "JavaScript",
    icon: SiJavascript,
    color: "#F7DF1E",
    className: "right-[7%] top-[56%]",
    delay: "3.5s",
  },
];

function handleMagneticMove(event: React.MouseEvent<HTMLAnchorElement>) {
  const link = event.currentTarget;
  const rect = link.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;

  link.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px) scale(1.08)`;
}

function handleMagneticLeave(event: React.MouseEvent<HTMLAnchorElement>) {
  event.currentTarget.style.transform = "translate(0, 0) scale(1)";
}

export default function HeroSection() {
  return (
    <section className="relative isolate pt-[68px] min-h-screen overflow-hidden bg-white">
      <ShaderBackground className="absolute inset-0 z-0 h-full w-full" />

      <div className="pointer-events-none absolute inset-0 z-10 hidden md:block" aria-hidden="true">
        {techStack.map((tech) => (
          <div
            key={tech.label}
            title={tech.label}
            className={`absolute ${tech.className} flex h-12 w-12 animate-[float-tech_6s_ease-in-out_infinite] will-change-transform items-center justify-center rounded-full border border-white/75 bg-white/85 text-stone-700 shadow-[0_20px_38px_rgba(28,25,23,0.16),inset_0_1px_0_rgba(255,255,255,0.9)]`}
            style={{ animationDelay: tech.delay }}
          >
            <tech.icon color={tech.color} size={22} aria-hidden="true" />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        <h1
          className="max-w-4xl font-display font-thin text-[#0F172A] text-balance"
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

        <div className="mt-6 max-w-2xl rounded-2xl border border-white/70 bg-white/85 px-6 py-4 shadow-[0_18px_55px_rgba(59,130,246,0.12)]">
          <p className="text-sm leading-6 text-stone-600 md:text-base md:leading-7">
            We build technology that brings teams together, makes daily work easier, and gives customers a smoother digital experience.
          </p>
        </div>

        <div className="mt-9 flex items-center justify-center">
          <Link href="/contact" aria-label="Get started">
            <StarButton
              as="span"
              lightColor="#38bdf8"
              backgroundColor="#0f172a"
              className="h-12 font-semibold shadow-[0_0_12px_rgba(56,189,248,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.55),0_0_4px_rgba(56,189,248,0.7)] transition hover:-translate-y-0.5 duration-300"
            >
              Get Started <ArrowRight size={16} aria-hidden="true" />
            </StarButton>
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          {socials.map(({ label, href, icon: Icon, color }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={label}
              title={label}
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-950/10 bg-white/85 shadow-[0_12px_28px_rgba(28,25,23,0.10)] transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:border-stone-950/15 hover:bg-white hover:shadow-[0_18px_36px_rgba(28,25,23,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600/40"
            >
              <Icon color={color} size={18} aria-hidden="true" />
            </a>
          ))}
        </div>

        <div className="mt-12 w-full">
          <AIVisibilityHero />
        </div>
      </div>
    </section>
  );
}
