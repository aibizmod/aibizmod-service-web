"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cardData } from "../../lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  id: number;
  title: string;
  description: string;
  index: number;
  totalCards: number;
  color: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  index,
  totalCards,
  color,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const targetScale = 1 - (totalCards - index) * 0.05;

    gsap.set(card, {
      scale: 1,
      transformOrigin: "center top",
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const scale = gsap.utils.interpolate(1, targetScale, progress);
        gsap.set(card, {
          scale: Math.max(scale, targetScale),
          transformOrigin: "center top",
        });
      },
    });

    return () => trigger.kill();
  }, [index, totalCards]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: 0,
      }}
    >
      <div
        ref={cardRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "640px",
          height: "400px",
          borderRadius: "24px",
          isolation: "isolate",
          top: `calc(-5vh + ${index * 25}px)`,
          transformOrigin: "top",
        }}
        className="card-content"
      >
        {/* Electric Border Effect */}
        <div
          style={{
            position: "absolute",
            inset: "-3px",
            borderRadius: "27px",
            padding: "3px",
            background: `conic-gradient(
              from 0deg,
              transparent 0deg,
              ${color} 60deg,
              ${color.replace("0.8", "0.6")} 120deg,
              transparent 180deg,
              ${color.replace("0.8", "0.4")} 240deg,
              transparent 360deg
            )`,
            zIndex: -1,
          }}
        />

        {/* Main Card Content */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: "24px",
            background: `
              linear-gradient(145deg, 
                rgba(255, 255, 255, 0.1), 
                rgba(255, 255, 255, 0.05)
              )
            `,
            backdropFilter: "blur(25px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.3),
              0 2px 8px rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              inset 0 -1px 0 rgba(255, 255, 255, 0.1)
            `,
            overflow: "hidden",
            padding: "2.5rem",
          }}
        >
          {/* Enhanced Glass reflection overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "60%",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)",
              pointerEvents: "none",
              borderRadius: "24px 24px 0 0",
            }}
          />

          {/* Glass shine effect */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              right: "10px",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)",
              borderRadius: "1px",
              pointerEvents: "none",
            }}
          />

          {/* Side glass reflection */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "2px",
              height: "100%",
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
              borderRadius: "24px 0 0 24px",
              pointerEvents: "none",
            }}
          />

          {/* Frosted glass texture */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 2px),
                radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 1px, transparent 2px),
                radial-gradient(circle at 40% 80%, rgba(255,255,255,0.06) 1px, transparent 2px)
              `,
              backgroundSize: "30px 30px, 25px 25px, 35px 35px",
              pointerEvents: "none",
              borderRadius: "24px",
              opacity: 0.7,
            }}
          />

          {/* Card Text Content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: "0.75rem",
                lineHeight: 1.2,
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontSize: "1rem",
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.6,
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export function StackedCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.fromTo(
      container,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      }
    );
  }, []);

  useEffect(() => {
    const desktop = desktopRef.current;
    if (!desktop) return;

    gsap.fromTo(
      desktop,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      {/* Mobile / tablet grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="relative overflow-hidden rounded-3xl border border-stone-200/80 bg-white/80 p-6 shadow-[0_8px_32px_rgba(15,23,42,0.09)] backdrop-blur-xl"
            style={{ isolation: "isolate" }}
          >
            <div className="relative z-10">
              <h3 className="font-display text-2xl font-thin leading-tight text-[#0F172A]">
                {card.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-stone-600">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop GSAP sticky stack */}
      <div
        ref={desktopRef}
        className="relative hidden pb-12 lg:block"
        style={{
          background:
            "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
          borderRadius: "24px",
          overflow: "hidden",
          minHeight: "500px",
        }}
      >
        <div ref={containerRef} className="relative">
          {cardData.map((card, index) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              index={index}
              totalCards={cardData.length}
              color={card.color}
            />
          ))}
        </div>
      </div>
    </>
  );
}
