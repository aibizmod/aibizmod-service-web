'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconHover3D, GeometryVariant } from '@/components/ui/icon-3d-hover';
import { CardStrands } from '@/components/card-strands';
import { Reveal, WordsReveal } from '@/components/reveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface StageCard {
  id: string;
  step: string;
  kicker: string;
  title: string;
  details: string;
  geometry: GeometryVariant;
  origin: 'bottom-left' | 'bottom-right' | 'center';
}

const STAGES: StageCard[] = [
  {
    id: 'discovery',
    step: '01',
    kicker: '01 — DISCOVERY',
    title: 'Discovery',
    details:
      'We audit your current AI presence, map audience search patterns, and uncover high-impact visibility opportunities.',
    geometry: 'slices',
    origin: 'bottom-left',
  },
  {
    id: 'planning',
    step: '02',
    kicker: '02 — PLANNING',
    title: 'Planning',
    details:
      'We define custom prompt benchmarks, scope technical schema integrations, and establish clear delivery milestones.',
    geometry: 'grid',
    origin: 'bottom-right',
  },
  {
    id: 'design',
    step: '03',
    kicker: '03 — DESIGN',
    title: 'Design',
    details:
      'We craft structured data architectures, brand positioning models, and intuitive search monitoring dashboards.',
    geometry: 'stack',
    origin: 'center',
  },
  {
    id: 'build',
    step: '04',
    kicker: '04 — BUILD',
    title: 'Build',
    details:
      'We deploy multi-agent optimization engines, connect live API pipelines, and index structured entity graphs.',
    geometry: 'cross',
    origin: 'bottom-left',
  },
  {
    id: 'review',
    step: '05',
    kicker: '05 — REVIEW',
    title: 'Review',
    details:
      'We benchmark visibility across ChatGPT, Perplexity, and Claude, refining prompts and schema for maximum authority.',
    geometry: 'orbit',
    origin: 'bottom-right',
  },
  {
    id: 'launch',
    step: '06',
    kicker: '06 — LAUNCH',
    title: 'Launch',
    details:
      'We launch your continuous AI monitoring suite, deliver full team documentation, and activate live tracking analytics.',
    geometry: 'prism',
    origin: 'center',
  },
];

export function HowProjectsMoveSection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const [focusIndex, setFocusIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pin = pinRef.current;
    const track = trackRef.current;
    const progressBar = progressBarRef.current;

    if (!pin || !track) return;

    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const ctx = gsap.context(() => {
      if (!mediaQuery.matches) return; // Desktop only horizontal scroll pin

      const getScrollAmount = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const getPinDistance = () => getScrollAmount() * 1.25;

      const snapPoints = STAGES.map((_, i) => i / (STAGES.length - 1));

      // Horizontal Track Translation Pin
      const scrollTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 0.4,
          start: 'top top',
          end: () => `+=${getPinDistance()}`,
          invalidateOnRefresh: true,
          snap: {
            snapTo: snapPoints,
            duration: { min: 0.15, max: 0.35 },
            delay: 0.05,
            ease: 'power1.inOut',
          },
        },
      });

      scrollTriggerRef.current = scrollTween.scrollTrigger || null;

      // Top Progress Rail Scaling (0 -> 1)
      if (progressBar) {
        gsap.fromTo(
          progressBar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: pin,
              scrub: true,
              start: 'top top',
              end: () => `+=${getPinDistance()}`,
            },
          }
        );
      }

      const focusIndexRef = { current: 0 };

      // Centre Focus Detection on GSAP Ticker with hysteresis
      const updateCentreFocus = () => {
        if (!cardRefs.current.length) return;

        const viewportCenter = window.innerWidth / 2;
        let closestDist = Infinity;
        let closestIdx = focusIndexRef.current;

        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const dist = Math.abs(viewportCenter - cardCenter);

          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = i;
          }
        });

        if (closestIdx !== focusIndexRef.current) {
          // Check hysteresis threshold (must be at least 30px closer to switch)
          const currentCard = cardRefs.current[focusIndexRef.current];
          if (currentCard) {
            const currentRect = currentCard.getBoundingClientRect();
            const currentDist = Math.abs(viewportCenter - (currentRect.left + currentRect.width / 2));
            if (closestDist < currentDist - 30) {
              focusIndexRef.current = closestIdx;
              setFocusIndex(closestIdx);
            }
          } else {
            focusIndexRef.current = closestIdx;
            setFocusIndex(closestIdx);
          }
        }
      };

      gsap.ticker.add(updateCentreFocus);

      return () => {
        gsap.ticker.remove(updateCentreFocus);
      };
    }, pin);

    return () => {
      ctx.revert();
    };
  }, []);

  // Jump to specific stage on indicator click
  const scrollToStage = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const progress = index / (STAGES.length - 1);
    const targetY = st.start + progress * (st.end - st.start);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full bg-white text-[#0f172a] snap-start overflow-hidden">
      {/* Outer Wrapper for GSAP Pinning */}
      <div ref={pinRef} className="min-h-screen w-full flex flex-col justify-center py-10 lg:py-14">
        
        {/* Top Progress Rail */}
        <div className="relative w-full h-[3px] bg-[#e7e5e4] mb-6 lg:mb-8">
          <div
            ref={progressBarRef}
            className="absolute top-0 left-0 h-full w-full bg-[#0891b2] origin-left transition-transform"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Section Header Block + Interactive Step Pills */}
        <div className="max-w-7xl mx-auto px-6 w-full mb-8 lg:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Reveal variant="fade-up">
              <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#0891b2] mb-2">
                HOW PROJECTS MOVE
              </span>
            </Reveal>

            <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-[#0f172a] tracking-tight mb-3">
              <WordsReveal text="From First Call to" accentWord="Launch" />{' '}
              <span className="font-display italic font-normal text-[#0891b2]">Launch</span>
            </h2>

            <Reveal variant="fade-up" delay={0.2}>
              <p className="text-base sm:text-lg text-[#78716c] max-w-2xl font-normal leading-relaxed">
                We agree on the goal first, break the work into clear stages, and keep you updated until live.
              </p>
            </Reveal>
          </div>

          {/* Interactive Step Navigator (Desktop) — Minimal dots */}
          <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
            {STAGES.map((s, idx) => {
              const isActive = (hoveredIndex === null && focusIndex === idx) || hoveredIndex === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollToStage(idx)}
                  className="group/nav flex flex-col items-center gap-1.5 transition-all duration-500 ease-out"
                >
                  <span
                    className={`text-[11px] font-mono font-medium tracking-wider transition-colors duration-500 ease-out ${
                      isActive ? 'text-[#0891b2]' : 'text-[#a8a29e] group-hover/nav:text-[#0f172a]'
                    }`}
                  >
                    {s.step}
                  </span>
                  <span
                    className={`block h-[2px] rounded-full transition-all duration-500 ease-out ${
                      isActive ? 'w-5 bg-[#0891b2]' : 'w-2 bg-[#d6d3d1] group-hover/nav:w-4 group-hover/nav:bg-[#78716c]'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Pinned Horizontal Track / Mobile Vertical Stack */}
        <div className="w-full overflow-visible">
          <div
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full lg:w-max flex-nowrap items-center lg:items-stretch px-6 lg:px-[calc(50vw-230px)]"
          >
            {STAGES.map((stage, i) => {
              const active = hoveredIndex === i || (hoveredIndex === null && focusIndex === i);

              return (
                <div
                  key={stage.id}
                  className="w-full lg:w-[460px] flex-shrink-0"
                  style={{ perspective: '1200px', height: '380px' }}
                >
                  <article
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => scrollToStage(i)}
                    className={`group relative w-full h-full rounded-[20px] border p-8 pb-4 overflow-hidden cursor-pointer flex flex-col ${
                      active
                        ? 'bg-[#0f172a] border-[#1e293b] shadow-[0_24px_60px_rgba(0,0,0,0.35)] opacity-100 z-20'
                        : 'bg-white border-[#e7e5e4] shadow-[0_8px_30px_rgba(0,0,0,0.04)] lg:opacity-50 z-10'
                    }`}
                    style={{
                      transform: active
                        ? 'rotateY(-4deg) rotateX(2deg) translateZ(20px) scale(1)'
                        : 'rotateY(0deg) rotateX(0deg) translateZ(0px) scale(0.96)',
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.7s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* Small 3D Icon — top left */}
                    <div className="mb-6">
                      <IconHover3D
                        variant={stage.geometry}
                        iconSize={72}
                        centered={false}
                        active={active}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-display font-semibold text-[26px] leading-tight mb-2 transition-colors duration-700 ease-out ${
                        active ? 'text-white' : 'text-[#0f172a]'
                      }`}
                    >
                      {stage.title}
                    </h3>

                    {/* Kicker */}
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0891b2] mb-4 font-mono">
                      {stage.kicker}
                    </span>

                    {/* Description */}
                    <p
                      className={`text-[15px] leading-relaxed max-w-sm mb-6 transition-colors duration-700 ease-out ${
                        active ? 'text-[#94a3b8]' : 'text-[#78716c]'
                      }`}
                    >
                      {stage.details}
                    </p>

                    {/* CardStrands Wave Motif — pinned to bottom edge */}
                    <div className="absolute bottom-0 left-0 right-0">
                      <CardStrands active={active} />
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowProjectsMoveSection;
