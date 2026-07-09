"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HolographicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  spotlightColor?: string;
  maxTilt?: number;
}

export default function HolographicCard({
  children,
  className,
  glowColor = "rgba(34,211,238,0.95)",
  spotlightColor = "rgba(34,211,238,0.06)",
  maxTilt = 15,
  ...props
}: HolographicCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [isTilting, setIsTilting] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsTilting(true);
    const card = containerRef.current;
    if (card) {
      rectRef.current = card.getBoundingClientRect();
    }
    if (props.onMouseEnter) props.onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsTilting(false);
    rectRef.current = null;
    const card = containerRef.current;
    if (card) {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "50%");
    }
    if (props.onMouseLeave) props.onMouseLeave(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = containerRef.current;
    if (!card) return;
    
    let rect = rectRef.current;
    if (!rect) {
      rect = card.getBoundingClientRect();
      rectRef.current = rect;
    }

    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const percentX = Math.min(100, Math.max(0, (px / rect.width) * 100));
    const percentY = Math.min(100, Math.max(0, (py / rect.height) * 100));
    card.style.setProperty("--mx", percentX + "%");
    card.style.setProperty("--my", percentY + "%");

    const rotateY = (px / rect.width - 0.5) * maxTilt;
    const rotateX = -(py / rect.height - 0.5) * maxTilt;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    if (props.onMouseMove) props.onMouseMove(e);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={cn(
        "holographic-card relative overflow-hidden transition-all duration-300",
        isTilting ? "tilting" : "",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        ...props.style,
      }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .holographic-card {
          --mx: 50%;
          --my: 50%;
          transform: rotateX(0deg) rotateY(0deg);
          will-change: transform;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.04) inset,
            0 0 0 1px rgba(34,211,238,0.06) inset,
            0 30px 60px -20px rgba(3,10,25,0.55),
            0 12px 30px -8px rgba(8,145,178,0.12);
          transition: transform 0.6s cubic-bezier(0.16, 1.36, 0.36, 1), box-shadow 0.5s ease;
        }
        .holographic-card.tilting {
          transition: transform 0.15s ease-out, box-shadow 0.4s ease;
        }
        .holographic-card:hover {
          box-shadow:
            0 1px 0 rgba(255,255,255,0.05) inset,
            0 0 0 1px rgba(34,211,238,0.14) inset,
            0 40px 80px -20px rgba(3,10,25,0.6),
            0 16px 40px -8px rgba(8,145,178,0.22);
        }
        
        /* Spotlight border overlay inside card */
        .holographic-card::after {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          padding: 2.5px;
          background: radial-gradient(240px circle at var(--mx) var(--my), ${glowColor}, transparent 65%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
          z-index: 6;
        }
        .holographic-card:hover::after {
          opacity: 1;
        }
      ` }} />

      {/* Dotted Hologram Background Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-100"
        style={{
          backgroundImage: `radial-gradient(circle, ${spotlightColor} 1.2px, transparent 1.2px)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
