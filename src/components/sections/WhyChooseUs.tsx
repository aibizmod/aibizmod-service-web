"use client";

import { useEffect, useRef, useState, memo } from "react";
import { useInView, animate, motion, useScroll, useTransform } from "framer-motion";
import { Award, Clock, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/common/AnimatedSection";
import {
  TextRevealCard,
  TextRevealCardTitle,
  TextRevealCardDescription,
} from "@/components/ui/diagram-card";

// Counter component for animated statistics
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2.0,
        ease: "easeOut",
        onUpdate: (latest) => setCount(Math.round(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Section-wide floating canvas-based particles component with static Gravity behavior
const SectionCanvasParticles = ({
  hoveredCardCenter,
}: {
  hoveredCardCenter: { x: number; y: number; width: number; height: number } | null;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoveredCardCenterRef = useRef(hoveredCardCenter);

  // Sync refs with prop updates so the requestAnimationFrame loop can access it
  useEffect(() => {
    hoveredCardCenterRef.current = hoveredCardCenter;
  }, [hoveredCardCenter]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseVx: number;
      baseVy: number;
      radius: number;
      alpha: number;
      alphaSpeed: number;
    }> = [];

    // Initialize 250 particles for a rich but fast node grid
    const particleCount = 250;
    for (let i = 0; i < particleCount; i++) {
      const vx = (Math.random() - 0.5) * 0.7; // Faster base speeds
      const vy = (Math.random() - 0.5) * 0.7;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        radius: Math.random() * 1.5 + 0.8, // Tiny dots
        alpha: Math.random() * 0.35 + 0.05,
        alphaSpeed: (Math.random() * 0.001 + 0.0005) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    let wasHovered = false;

    const resizeObserver = new ResizeObserver(() => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });

    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const target = hoveredCardCenterRef.current;
      const isHoveredNow = target !== null;

      // Detect transition from hovered -> unhovered (burst scatter)
      if (!isHoveredNow && wasHovered) {
        particles.forEach((p) => {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 5 + 5; // Fast scatter speed (5px to 10px per frame)
          p.vx = Math.cos(angle) * speed;
          p.vy = Math.sin(angle) * speed;
        });
      }

      wasHovered = isHoveredNow;

      // Draw and update standard background particles with gravitational attraction
      particles.forEach((p) => {
        if (target !== null) {
          const dx = target.x - p.x;
          const dy = target.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Global pull force towards hovered card center
          const force = 0.00045;
          p.vx += dx * force;
          p.vy += dy * force;

          // Sticking damping when close to card center
          if (dist < 150) {
            p.vx *= 0.88;
            p.vy *= 0.88;
          }
        } else {
          // Disperse/Default state: return to base velocity slowly
          p.vx += (p.baseVx - p.vx) * 0.035;
          p.vy += (p.baseVy - p.vy) * 0.035;
        }

        // Limit speed to prevent launch
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = (target !== null) ? 2.0 : 10.0;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse alpha
        p.alpha += p.alphaSpeed;
        if (p.alpha > 0.45 || p.alpha < 0.05) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(8, 145, 178, ${p.alpha})`; // Cyan theme
        ctx.fill();
      });

      // Draw faint lines between close background particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            const alpha = (1 - dist / 85) * 0.07;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(8, 145, 178, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

const MemoizedSectionCanvasParticles = memo(SectionCanvasParticles);

const stats = [
  { numericValue: 10, suffix: "+", label: "Industries Worked With", icon: Globe },
  { numericValue: 24, suffix: "/7", label: "Support When Needed", icon: Clock },
  { textValue: "ISO", label: "Process-Led Delivery", icon: Award },
];

const values = [
  {
    title: "One Team, Not Hand-Offs",
    desc: "Our engineers, designers, and strategists work together from the start, so ideas, design, and development stay connected.",
    href: "/about",
    linkText: "Learn about our team",
    text: "Siloed Hand-Offs",
    revealText: "Unified Teamwork",
  },
  {
    title: "Clear Steps From Start to Finish",
    desc: "We use clear milestones, regular updates, and practical agile routines so you know what is happening and what comes next.",
    href: "/services",
    linkText: "View our services",
    text: "What is next?",
    revealText: "Clear Milestones",
  },
  {
    title: "Built to Be Maintained",
    desc: "We choose tools that can grow with your business instead of quick fixes that become expensive to repair later.",
    href: "/contact",
    linkText: "Talk to our engineers",
    text: "Short-term fixes",
    revealText: "Built to Last",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCardCenter, setHoveredCardCenter] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const scaleY1 = useTransform(scrollYProgress, [0.15, 0.95], [0, 1]);

  const handleCardMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const cardRect = event.currentTarget.getBoundingClientRect();
    const sectionRefRect = sectionRef.current.getBoundingClientRect();
    const x = cardRect.left - sectionRefRect.left + cardRect.width / 2;
    const y = cardRect.top - sectionRefRect.top + cardRect.height / 2;
    setHoveredCardCenter({
      x,
      y,
      width: cardRect.width,
      height: cardRect.height,
    });
  };

  const handleCardMouseLeave = () => {
    setHoveredCardCenter(null);
  };

  return (
    <section ref={sectionRef} id="why" className="py-28 px-6 bg-[#FAF9F6] relative z-20 overflow-hidden border-t border-slate-200/60">
      {/* Floating Node Particles for Section Background - attract/gravity mode active */}
      <MemoizedSectionCanvasParticles hoveredCardCenter={hoveredCardCenter} />

      {/* Premium background mesh glow elements */}
      <div className="absolute top-1/4 -right-1/4 w-[450px] h-[450px] rounded-full bg-cyan-200/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-1/4 w-[450px] h-[450px] rounded-full bg-blue-200/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading and Stats Grid */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            <AnimatedSection>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
                Why Work With Us
              </span>
              <h2
                className="mt-6 font-display font-thin text-primary leading-[1.1] text-balance"
                style={{
                  fontSize: "clamp(30px, 4vw, 44px)",
                }}
              >
                Straight Answers, Careful Work, Better Outcomes
              </h2>
              <p
                className="mt-4 text-muted-foreground text-[16px] leading-[1.7] mb-6"
              >
                We are not here just to write code. We care about the result, explain the trade-offs, and build with long-term use in mind.
              </p>
            </AnimatedSection>

            {/* Stats Grid / Bento Metrics */}
            <div className="grid gap-5 pt-8 border-t border-slate-200/60 mt-8 grid-cols-1 sm:grid-cols-3">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <AnimatedSection key={stat.label} delay={idx * 0.1} className="w-full">
                    <div className="bg-white/80 border border-slate-200/50 rounded-2xl p-5 shadow-[0_4px_18px_rgba(15,23,42,0.08)] hover:bg-[#0891B2] hover:border-transparent hover:shadow-[0_20px_40px_rgba(8,145,178,0.3),0_8px_16px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                      {/* Sparkline background graphic */}
                      <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-300">
                        <svg className="w-full h-full text-cyan-500/20 group-hover:text-white/30 transition-colors" viewBox="0 0 100 30" preserveAspectRatio="none">
                          <path
                            d={idx === 0 
                              ? "M0,25 C15,18 35,5 50,15 C65,22 80,8 100,5" 
                              : idx === 1 
                              ? "M0,22 C20,25 40,10 60,8 C80,6 90,2 100,3"
                              : "M0,28 C15,28 35,20 50,22 C65,25 85,15 100,10"
                            }
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>

                      {/* Top layout */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#ECFEFF] border border-cyan-100/50 text-[#0891B2] group-hover:bg-white/20 group-hover:border-white/30 group-hover:text-white transition-all duration-300">
                          <Icon size={15} />
                        </div>
                        
                        {/* Live pulse dot */}
                        <span className="relative flex h-1.5 w-1.5 mt-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 group-hover:bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500 group-hover:bg-white"></span>
                        </span>
                      </div>

                      {/* Value and Label */}
                      <div className="space-y-1">
                        <span className="block font-display text-[26px] font-bold text-ink group-hover:text-white tracking-tight leading-none transition-colors duration-300">
                          {stat.numericValue !== undefined ? (
                            <Counter value={stat.numericValue} suffix={stat.suffix} />
                          ) : (
                            stat.textValue
                          )}
                        </span>
                        <p className="text-[11px] font-bold text-muted-foreground group-hover:text-white/80 uppercase tracking-wider leading-none transition-colors duration-300">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
 
          {/* Right Column: Value Props Cards */}
          <div className="lg:col-span-7 relative space-y-8 lg:pl-24">
            {/* Scroll-animated vertical line — contained within this section */}
            <motion.div
              style={{ scaleY: scaleY1, originY: 0 }}
              className="absolute left-12 top-12 bottom-8 w-[2px] bg-gradient-to-b from-cyan-500/40 via-[#0891B2]/30 to-cyan-500/20 hidden md:block z-0"
            />

            {values.map((val, i) => {
              return (
                <AnimatedSection key={val.title} delay={i * 0.12}>
                  <div
                    onMouseEnter={handleCardMouseEnter}
                    onMouseLeave={handleCardMouseLeave}
                    className="w-full"
                  >
                    <TextRevealCard className="shadow-[0_4px_20px_rgba(15,23,42,0.02)]" showSpotlight={true}>
                      {/* Decorative Node SVG background */}
                      <div className="absolute right-0 bottom-0 w-32 h-32 text-cyan-500/5 group-hover:text-cyan-500/12 transition-colors duration-500 pointer-events-none">
                        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="80" cy="80" r="4" fill="currentColor" />
                          <circle cx="50" cy="50" r="3" fill="currentColor" />
                          <circle cx="20" cy="70" r="3" fill="currentColor" />
                          <line x1="80" y1="80" x2="50" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                          <line x1="50" y1="50" x2="20" y2="70" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                          <line x1="50" y1="50" x2="60" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                          <circle cx="60" cy="20" r="2" fill="currentColor" />
                        </svg>
                      </div>

                      <div className="space-y-2 relative z-10 w-full">
                        <TextRevealCardTitle
                          text={val.title}
                          revealText={val.revealText}
                          className="mb-0 w-full"
                        />
                        <TextRevealCardDescription className="text-muted-foreground text-[14.5px] leading-relaxed">
                          {val.desc}
                        </TextRevealCardDescription>
                        <div className="pt-2">
                          <Link href={val.href} className="inline-flex items-center gap-1 text-sm font-semibold text-[#0891B2] hover:text-[#0e7490] transition-colors">
                            {val.linkText} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </TextRevealCard>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
