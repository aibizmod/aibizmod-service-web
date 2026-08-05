"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface StrandOrbProps {
  size?: number;
  progress?: number;
  strands?: number;
  reducedMotion?: boolean;
  className?: string;
}

const R = 118;
const N = 160;
const CENTER = 200;

function easeOutCubic(p: number): number {
  return 1 - Math.pow(1 - Math.min(1, Math.max(0, p)), 3);
}

export function StrandOrb({
  size = 340,
  progress = 0,
  strands = 5,
  reducedMotion = false,
  className,
}: StrandOrbProps) {
  const pathRefs = useRef<(SVGPathElement | null)[]>(Array(strands).fill(null));
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsedSec = (timestamp - startTimeRef.current) / 1000;
      const t = reducedMotion ? 0 : elapsedSec;
      const m = reducedMotion ? 1 : easeOutCubic(Math.min(1, t / 1.1));
      const curProgress = progressRef.current;
      const calm = 1 - Math.min(1, Math.max(0, curProgress)) * 0.55;

      for (let k = 0; k < strands; k++) {
        const off = k * ((2 * Math.PI) / strands);
        const spin = t * (0.35 + k * 0.06) * (k % 2 === 1 ? -1 : 1);
        const points: [number, number][] = [];

        for (let s = 0; s < N; s++) {
          const u = s / (N - 1);

          // Flat line state
          const lx = 40 + u * 320;
          const ly = CENTER + Math.sin(u * 4 * Math.PI + off + t * 1.4) * (10 - k) * 1.2;

          // Ring state
          const a = u * 2 * Math.PI;
          const wob =
            Math.sin(a * 3 + spin * 2.2 + off) * 9 * calm +
            Math.sin(a * 5 - spin * 3.1 + off * 1.7) * 5 * calm +
            Math.sin(a * 9 + t * 2.4 + off) * 2.2 * calm;
          const rr = R - k * 4 + wob;
          const rx = CENTER + Math.cos(a + spin) * rr;
          const ry = CENTER + Math.sin(a + spin) * rr;

          // Morph interpolation
          const px = lx + (rx - lx) * m;
          const py = ly + (ry - ly) * m;

          points.push([px, py]);
        }

        // Generate SVG Path
        let d = `M ${points[0][0].toFixed(2)},${points[0][1].toFixed(2)}`;
        for (let i = 1; i < points.length; i++) {
          d += ` L ${points[i][0].toFixed(2)},${points[i][1].toFixed(2)}`;
        }
        d += " Z";

        if (pathRefs.current[k]) {
          pathRefs.current[k]!.setAttribute("d", d);
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [strands, reducedMotion]);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={cn("overflow-visible pointer-events-none select-none", className)}
    >
      <defs>
        <filter id="strand-orb-bloom" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="strand-orb-grad-0" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a5f3fc" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>

        <linearGradient id="strand-orb-grad-1" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>

      {/* Static guide circle at r=118 */}
      <circle
        cx="200"
        cy="200"
        r="118"
        fill="none"
        stroke="rgba(34,211,238,0.12)"
        strokeWidth="1"
      />

      <g filter="url(#strand-orb-bloom)">
        {Array.from({ length: strands }, (_, k) => (
          <path
            key={k}
            ref={(el) => {
              pathRefs.current[k] = el;
            }}
            stroke={`url(#strand-orb-grad-${k % 2})`}
            strokeWidth={k === 0 ? 1.6 : 1.1}
            strokeLinecap="round"
            fill="none"
            opacity={0.95 - k * 0.11}
            d=""
          />
        ))}
      </g>
    </svg>
  );
}

export default StrandOrb;
