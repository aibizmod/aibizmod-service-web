"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { StarButton } from "@/components/ui/star-button";
import AnimatedSection from "@/components/common/AnimatedSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  const faqs = [
    {
      question: "What services does aibizmod provide?",
      answer: "We provide technology services including website development, custom software, mobile apps, digital marketing, cloud hosting, workflow automation, and IT consulting.",
    },
    {
      question: "How do you charge for projects, and how long do they take?",
      answer: "We keep pricing transparent and explain what you will get before work starts. Most projects take between 4 and 12 weeks, depending on scope. We can quote fixed pricing or time-and-materials.",
    },
    {
      question: "Do you offer support after launch?",
      answer: "Yes. We offer support agreements and ongoing maintenance to keep your applications secure, updated, and working well after launch.",
    },
    {
      question: "Can you add AI and automation to our workflow?",
      answer: "Yes. We can add AI tools, workflow automation, and data pipelines that fit into your existing systems and help save your team time.",
    },
    {
      question: "How do we start a project with aibizmod?",
      answer: "Go to our contact page or email aibizmod@outlook.com. We will schedule a call within 24 hours, discuss your goals, and suggest a practical next step.",
    },
  ];

  // Stagger-reveal each FAQ item as the accordion scrolls into view
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = accordionRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(".faq-item");
    gsap.set(items, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.55,
      ease: "power2.out",
      stagger: 0.1,
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section id="faq" className="py-24 px-6 bg-canvas border-t border-[#E0F2FE]">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="flex flex-col md:flex-row items-start justify-center gap-16">
          {/* Left Column: Text */}
          <div className="w-full md:w-[38%] shrink-0 space-y-5 md:sticky md:top-32">
            <p className="text-ink text-sm font-semibold uppercase tracking-[0.16em]">Questions Before We Start</p>
            <h2
              className="font-display font-thin text-primary text-balance"
              style={{
                fontSize: "clamp(30px, 4vw, 44px)",
                lineHeight: 1.1,
              }}
            >
              A Few Things Clients Usually Ask
            </h2>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              Find answers to questions about what aibizmod can do, how we charge, how long projects take, and what support we offer after launch.
            </p>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div ref={accordionRef} className="flex-1 space-y-4">

            <div className="mt-8 space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={cn(
                    "faq-item rounded-xl border cursor-pointer transition-all duration-300 overflow-hidden",
                    openIndex === index
                      ? "border-[#BAE6FD] bg-[#ECFEFF]/80 shadow-[0_2px_16px_rgba(8,145,178,0.10)]"
                      : "border-[#E0F2FE] bg-white hover:border-[#BAE6FD] hover:bg-[#F0FDFF]"
                  )}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  {/* Question row */}
                  <div className="flex items-center justify-between px-5 py-4 gap-4">
                    <h3 className={cn(
                      "text-[15.5px] font-medium leading-snug transition-colors duration-200 flex-1",
                      openIndex === index ? "text-[#0891B2] font-semibold" : "text-ink"
                    )}>
                      {faq.question}
                    </h3>
                    {/* Chevron */}
                    <svg
                      width="18" height="18" viewBox="0 0 18 18" fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={cn(
                        "transition-all duration-400 ease-in-out shrink-0",
                        openIndex === index ? "rotate-180 text-[#0891B2]" : "text-[#94A3B8]"
                      )}
                    >
                      <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Answer */}
                  <div className={cn(
                    "transition-all duration-500 ease-in-out overflow-hidden",
                    openIndex === index ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                  )}>
                    <div className="px-5 pb-5">
                      <p className="text-[14px] leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground text-[14px] pt-2">
              If you cannot find what you are looking for,{" "}
              <Link
                href="/contact"
                className="text-primary font-medium hover:underline focus-visible:outline-none"
              >
                contact our support team
              </Link>
            </p>

            {/* View All Button */}
            <Link href="/faq" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-3xl inline-flex mt-2">
              <StarButton
                as="span"
                lightColor="#38bdf8"
                backgroundColor="#0f172a"
                className="font-sans font-semibold text-[11px] uppercase tracking-[0.2em]"
              >
                View All FAQs
                <ArrowRight className="h-4 w-4 group-hover/star-button:translate-x-1 transition-transform duration-300" />
              </StarButton>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
