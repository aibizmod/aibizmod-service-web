"use client";

import Image from "next/image";
import AnimatedSection from "@/components/common/AnimatedSection";
import { CardStack } from "@/components/ui/card-stack";

const testimonials = [
  {
    quote:
      "The team at aibizmod understood our vision from day one. They built a platform that streamlined our entire project management workflow, saving us countless hours and improving team collaboration across the board.",
    title: "Chief Technology Officer",
    company: "PMSpace",
    logo: "/clients/pmspace.webp",
  },
  {
    quote:
      "aibizmod delivered beyond our expectations. Their lean approach to development meant we got a high-quality product in record time, and the ongoing support has been exceptional.",
    title: "VP of Engineering",
    company: "SpaceLean",
    logo: "/clients/spacelean.webp",
  },
  {
    quote:
      "aibizmod brought a level of professionalism and technical depth we had not seen before. Their team integrated seamlessly with ours and delivered a solution that actually scales.",
    title: "Head of Digital Transformation",
    company: "Texas Tech Services",
    logo: "/clients/texastech.svg",
  },
];

const cardStackItems = testimonials.map((t, index) => ({
  id: index,
  title: t.title,
  quote: t.quote,
  company: t.company,
  logo: t.logo,
}));

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-canvas">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-10">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
            Client Notes
          </span>
          <h2
            className="mt-5 font-display font-thin text-primary text-balance"
            style={{
              fontSize: "clamp(30px, 4vw, 44px)",
              lineHeight: 1.1,
            }}
          >
            What Clients Remember After Launch
          </h2>
          <p
            className="mt-4 text-muted-foreground max-w-xl mx-auto"
            style={{ fontSize: 17, lineHeight: 1.65 }}
          >
            Do not just take our word for it. Listen to what our clients say about working with us.
          </p>
        </AnimatedSection>

        {/* Testimonials stacked cards */}
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <CardStack
              items={cardStackItems}
              initialIndex={0}
              autoAdvance={true}
              intervalMs={4500}
              pauseOnHover={true}
              showDots={true}
              cardWidth={520}
              cardHeight={340}
              renderCard={(item, { active }) => (
                <div
                  className={`card-royal h-full w-full p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                    active
                      ? "border-cyan-400/50 shadow-[0_0_25px_rgba(6,182,212,0.15),0_8px_30px_rgba(6,182,212,0.06)]"
                      : "border-border/30 opacity-60"
                  }`}
                >
                  <div>
                    {/* Highlighted decorative quote icon */}
                    <div className="mb-3">
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M14.25 16.5H8.25C8.25 12.75 10.5 10.5 14.25 9.75V12.75C12 13.5 11.25 15 11.25 16.5H14.25ZM14.25 24.75H8.25V21H14.25V24.75ZM24.75 16.5H18.75C18.75 12.75 21 10.5 24.75 9.75V12.75C22.5 13.5 21.75 15 21.75 16.5H24.75ZM24.75 24.75H18.75V21H24.75V24.75Z"
                          fill="url(#quote-gradient)"
                        />
                        <defs>
                          <linearGradient id="quote-gradient" x1="8.25" y1="9.75" x2="27.75" y2="24.75" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#06B6D4" />
                            <stop offset="1" stopColor="#3B82F6" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Quote body */}
                    <p className="text-muted-foreground leading-relaxed text-[16px] md:text-[15px]">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div>
                    {/* Divider with cyan tint */}
                    <div className="my-5 h-px bg-gradient-to-r from-cyan-400/40 via-cyan-400/10 to-transparent" />

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full shrink-0 border-2 border-cyan-400/30 bg-white flex items-center justify-center p-1">
                        <Image
                          src={item.logo}
                          alt={`${item.company} client brand logo representing partner testimonial`}
                          width={40}
                          height={40}
                          className="rounded-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-ink text-sm">{item.title}, {item.company}</p>
                        <p className="text-[12px] text-cyan-600 font-medium">Client</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
