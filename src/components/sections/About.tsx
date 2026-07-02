import AnimatedSection from "@/components/common/AnimatedSection";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12+", label: "Countries Served" },
  { value: "5yrs", label: "In Operation" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-card/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
              About Us
            </span>
            <h2 className="mt-5 font-heading text-3xl md:text-5xl font-bold leading-tight text-primary">
              We Are the Team{" "}
              <span className="gradient-text">Behind the Tech</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              aibizmod was founded by engineers who believed that technology
              should be intelligent, accessible, and beautifully crafted.
              Today, we partner with startups and enterprises alike to design
              systems that scale.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our multidisciplinary team brings deep expertise in AI research,
              distributed systems, and product design — shipping solutions that
              make a measurable difference.
            </p>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.15}>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl border border-border bg-card text-center"
                >
                  <p className="font-heading text-4xl font-bold gradient-text">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
