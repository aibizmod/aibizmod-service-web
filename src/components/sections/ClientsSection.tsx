"use client";

import AnimatedSection from "@/components/common/AnimatedSection";
import { LogoCloud } from "@/components/ui/logo-cloud-3";

const logos = [
  { src: "/clients/spacelean.png", alt: "SpaceLean company branding logo representing strategic partnership" },
  { src: "/clients/pmspace.png", alt: "PMSpace brand logo representing corporate collaboration" },
  { src: "/clients/spaceapp.png", alt: "SpaceApp tech company logo showing client integration" },
  { src: "/clients/spacesign.png", alt: "SpaceSign enterprise client logo showing platform integration" },
  { src: "/clients/spacehr.png", alt: "SpaceHR organization logo showing human resource management client" },
  { src: "/clients/texastech.svg", alt: "Texas Tech Services enterprise logo representing technology sector partner" },
];

export default function ClientsSection() {
  return (
    <section className="py-20 px-6 bg-canvas border-t border-border">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md">
            Our Clients
          </span>
          <h2
            className="mt-7 font-display font-bold"
            style={{ fontSize: "clamp(24px, 3vw, 34px)", lineHeight: 1.15, color: "#0E7490" }}
          >
            Trusted by Teams That Build the Future
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto leading-relaxed" style={{ fontSize: 16 }}>
            We are proud to work with innovative companies that push the boundaries of technology.
          </p>
        </AnimatedSection>

        <div className="rounded-2xl border border-border/60 bg-white/60 p-8 shadow-sm backdrop-blur-sm">
          <LogoCloud logos={logos} />
        </div>
      </div>
    </section>
  );
}
