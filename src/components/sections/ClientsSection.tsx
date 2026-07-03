import AnimatedSection from "@/components/common/AnimatedSection";
import MarqueeLogoScroller from "@/components/ui/marquee-logo-scroller";

const logos = [
  {
    src: "/clients/spacelean.png",
    alt: "SpaceLean",
    website: "https://spacelean.ai/",
    gradient: { from: "#0E7490", via: "#22D3EE", to: "#ECFEFF" },
  },
  {
    src: "/clients/pmspace.png",
    alt: "PMSpaceAi",
    website: "https://pmspace.ai/",
    gradient: { from: "#0284C7", via: "#38BDF8", to: "#F0F9FF" },
  },
  {
    src: "/clients/spaceapp.png",
    alt: "SpaceApp",
    website: "https://spacelean.ai/",
    gradient: { from: "#0F172A", via: "#475569", to: "#F8FAFC" },
  },
  {
    src: "/clients/spacesign.png",
    alt: "SpaceSign",
    website: "https://space-sign.ai/",
    gradient: { from: "#0891B2", via: "#22D3EE", to: "#ECFEFF" },
  },
  {
    src: "/clients/spacehr.png",
    alt: "SpaceHR ",
    website: "https://spacehr.net/",
    gradient: { from: "#06B6D4", via: "#67E8F9", to: "#CFFAFE" },
  },
  {
    src: "/clients/texastech.svg",
    alt: "Texas ",
    website: "https://texastechserv.com/",
    gradient: { from: "#2563EB", via: "#3B82F6", to: "#DBEAFE" },
  },
];

export default function ClientsSection() {
  return (
    <section className="py-20 px-6 bg-canvas border-t border-border">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <MarqueeLogoScroller
            title="Trusted by Businesses Worldwide"
            description="Founders, developers, and business leaders across the globe choose us for their digital asset operations."
            logos={logos}
            speed="normal"
          />
        </AnimatedSection>
      </div>
    </section>
  );
}
