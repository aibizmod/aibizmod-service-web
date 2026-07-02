import AnimatedSection from "@/components/common/AnimatedSection";
import { Service } from "@/types";

const services: Service[] = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description:
      "Custom ML models, LLM integrations, and intelligent automation pipelines tailored to your business processes.",
    icon: "🧠",
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    description:
      "Scalable, secure cloud architecture on AWS, GCP, or Azure — designed for reliability and cost efficiency.",
    icon: "☁️",
  },
  {
    id: "software",
    title: "Software Engineering",
    description:
      "Full-stack web and API development with modern frameworks, built for performance and maintainability.",
    icon: "⚡",
  },
  {
    id: "data",
    title: "Data Engineering",
    description:
      "End-to-end data pipelines, analytics platforms, and real-time streaming solutions that turn data into decisions.",
    icon: "📊",
  },
  {
    id: "security",
    title: "Cybersecurity",
    description:
      "Security audits, penetration testing, and zero-trust architecture to protect your systems and data.",
    icon: "🔐",
  },
  {
    id: "consulting",
    title: "Tech Consulting",
    description:
      "Strategic technology advisory — from architecture reviews to digital transformation roadmaps.",
    icon: "🚀",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
            What We Build
          </span>
          <h2 className="mt-5 font-heading text-3xl md:text-5xl font-bold text-primary">
            What We <span className="gradient-text">Build</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            A full spectrum of technology services to accelerate your growth.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 0.08}>
              <div className="h-full p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:glow transition-all duration-300 group">
                <span className="text-3xl">{service.icon}</span>
                <h3 className="font-heading mt-4 text-lg font-semibold group-hover:gradient-text transition-all">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
