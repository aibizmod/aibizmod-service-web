import AnimatedSection from "@/components/common/AnimatedSection";
import SectionHeading from "@/components/common/SectionHeading";
import { RollingTextList, type ThemeColor } from "@/components/ui/rolling-list";

interface CapabilityItem {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

const capabilityImages: string[] = [
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=400&auto=format&fit=crop&q=60",
];

function getCapabilityAltText(index: number, title: string): string {
  switch (index) {
    case 0:
      return `Collaborative team of developers working on ${title} implementation projects in a modern tech workspace.`;
    case 1:
      return `Project managers reviewing business analytics and strategy details for ${title} services.`;
    case 2:
      return `Close-up view of microchips and circuitry representing technical execution of ${title}.`;
    case 3:
      return `Team brainstorming session at a whiteboard planning ${title} user experience and architecture.`;
    case 4:
      return `Desktop monitor displaying search engine optimization analytics and marketing metrics for ${title}.`;
    case 5:
      return `Secure cloud hosting server racks and database systems powering ${title} services.`;
    case 6:
      return `Business specialists collaborating around a table to optimize ${title} workflows.`;
    case 7:
      return `Software developers writing clean code on multiple monitors to support ${title}.`;
    case 8:
      return `Web developer testing mobile interfaces and programming code for ${title}.`;
    case 9:
      return `Professional planner analyzing business metrics and calendars to scale ${title} deliverables.`;
    case 10:
      return `Engineering workspace with computers showing tech tools and analytics for ${title}.`;
    case 11:
      return `Computer displaying real-time analytics graphs and performance metrics for ${title}.`;
    default:
      return title;
  }
}

export default function CapabilitiesRollingSection({
  capabilities,
  heading = "What This Service Includes",
}: {
  capabilities: CapabilityItem[];
  heading?: string;
}) {
  const color: ThemeColor = "cyan";

  const items = capabilities.map((cap, i) => ({
    id: i + 1,
    title: cap.title,
    description: cap.description,
    src: cap.image || capabilityImages[i % capabilityImages.length],
    alt: cap.imageAlt || getCapabilityAltText(i % capabilityImages.length, cap.title),
    color,
  }));

  if (items.length === 0) return null;

  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-20 bg-[#F8FEFF] border-y border-cyan-100/50">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(210,247,255,0.5),transparent_35%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl">
        <AnimatedSection className="mb-8 text-center">
          <SectionHeading
            eyebrow="Key Capabilities"
            heading={heading}
            centered
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mx-auto max-w-4xl">
            <RollingTextList items={items} />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
