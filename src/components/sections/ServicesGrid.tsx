'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/common/AnimatedSection';
import { services } from '@/data/services';
import { StarButton } from '@/components/ui/star-button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register once at module level — safe in client components
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceImages: Record<string, string> = {
  "ai-automation": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  "digital-marketing": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  "web-development": "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
  "software-development": "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=900&q=80",
  "mobile-app-development": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
  "hosting-infrastructure": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
  "customer-experience-management": "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  "it-consulting-it-services": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
};

export default function ServicesGrid() {
  // ─── UI-only React state (tab strip highlight) ───────────────────────────
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // ─── Click & Drag React state for the horizontal tab menu ───────────────
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // ─── All scroll-critical data lives in refs — zero re-renders on scroll ──
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const stripRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);          // current active card index (no re-render)
  const triggerTopsRef = useRef<number[]>([]); // scroll positions that activate each card
  const maxScrollYRef = useRef(99999);        // cached page scroll limit

  // GSAP quickSetters per card — created once after mount, write directly to DOM
  type CardSetters = { rotateX: (v: number) => void; scale: (v: number) => void; opacity: (v: number) => void };
  const cardSettersRef = useRef<CardSetters[]>([]);

  // Momentum scroll refs for the tab drag strip
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // ─── Measure card positions (runs once + on resize, never on scroll) ────
  const measureTops = useCallback(() => {
    const cards = cardRefs.current;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    const triggers = cards.map((card, idx) => {
      if (!card) return 0;
      // Temporarily un-stick to get the natural document position
      const prevPos = card.style.position;
      card.style.position = 'static';
      const top = card.getBoundingClientRect().top + window.scrollY;
      card.style.position = prevPos;

      const stickTop = isDesktop ? 140 + idx * 32 : 130 + idx * 20;
      return top - stickTop;
    });

    triggerTopsRef.current = triggers;

    const scroller = document.scrollingElement || document.documentElement;
    maxScrollYRef.current = scroller ? scroller.scrollHeight - scroller.clientHeight - 20 : 99999;
  }, []);

  // ─── Init: measure, build quickSetters, mount scroll spy ────────────────
  useEffect(() => {
    // Small delay so images/fonts have settled
    const t1 = setTimeout(measureTops, 50);
    const t2 = setTimeout(measureTops, 300);
    window.addEventListener('resize', measureTops, { passive: true });

    // Build one quickSetter triple per card — these bypass GSAP's tween engine
    cardSettersRef.current = cardRefs.current.map((card) => ({
      rotateX: card ? gsap.quickSetter(card, 'rotateX', 'deg') as (v: number) => void : () => {},
      scale:   card ? gsap.quickSetter(card, 'scale')    as (v: number) => void : () => {},
      opacity: card ? gsap.quickSetter(card, 'opacity')  as (v: number) => void : () => {},
    }));

    // ── Scroll spy — runs in rAF, touches zero React state ──
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        const scrollY = window.scrollY;
        const tops = triggerTopsRef.current;
        if (tops.length === 0) return;

        // Determine which card is active
        let next = 0;
        for (let i = 0; i < tops.length; i++) {
          if (scrollY >= tops[i] - 15) next = i;
          else break;
        }
        if (scrollY >= maxScrollYRef.current) next = tops.length - 1;

        const prev = activeIndexRef.current;
        activeIndexRef.current = next;

        // Apply 3D tilt directly via quickSetters — no React, no tween overhead
        const setters = cardSettersRef.current;
        setters.forEach((s, i) => {
          if (i < next) {
            // Buried card: tilt back with smooth lerp
            s.rotateX(-5);
            s.scale(0.965);
            s.opacity(0.72);
          } else {
            s.rotateX(0);
            s.scale(1);
            s.opacity(1);
          }
        });

        // Update tab strip only when the index actually changes (infrequent)
        if (prev !== next) {
          setActiveTabIndex(next);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', measureTops);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [measureTops]);

  // ─── Sync tab strip scroll when active tab changes ───────────────────────
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const activeTab = strip.children[activeTabIndex] as HTMLElement;
    if (!activeTab) return;

    const cRect = strip.getBoundingClientRect();
    const tRect = activeTab.getBoundingClientRect();
    const delta = tRect.left - cRect.left - (strip.clientWidth - activeTab.clientWidth) / 2;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    strip.scrollBy({ left: delta, behavior: reduced ? 'auto' : 'smooth' });
  }, [activeTabIndex]);

  const handleTabClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    if (isDragging) return;
    const tops = triggerTopsRef.current;
    if (tops[index] === undefined) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: Math.max(0, tops[index]),
      behavior: reduced ? 'auto' : 'smooth'
    });
  };

  // Inertial momentum animation loop
  const applyMomentum = () => {
    const strip = stripRef.current;
    if (!strip) return;

    let vel = velocityRef.current * 16; // Frame rate scaling multiplier
    const decay = 0.95; // Friction decay factor (closer to 1 = floats longer)

    const scrollLoop = () => {
      if (Math.abs(vel) < 0.5) return;
      strip.scrollLeft -= vel;
      vel *= decay;
      animationFrameRef.current = requestAnimationFrame(scrollLoop);
    };

    animationFrameRef.current = requestAnimationFrame(scrollLoop);
  };

  // Mouse drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const strip = stripRef.current;
    if (!strip) return;

    // Cancel any active momentum scroll before starting a new drag
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setIsDown(true);
    setIsDragging(false);
    setStartX(e.pageX - strip.offsetLeft);
    setScrollLeftState(strip.scrollLeft);

    lastXRef.current = e.pageX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    setIsDragging(false);
    if (Math.abs(velocityRef.current) > 0.1) {
      applyMomentum();
    }
  };

  const handleMouseUp = () => {
    setIsDown(false);
    // Reset dragging flag in the next tick so the click event has time to read it
    setTimeout(() => {
      setIsDragging(false);
    }, 50);

    // Apply momentum glide if user flicked the bar
    if (isDragging && Math.abs(velocityRef.current) > 0.1) {
      applyMomentum();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const strip = stripRef.current;
    if (!strip) return;
    const x = e.pageX - strip.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    
    if (Math.abs(x - startX) > 5) {
      setIsDragging(true);
    }
    
    strip.scrollLeft = scrollLeftState - walk;

    // Calculate instantaneous swipe velocity
    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      const dx = e.pageX - lastXRef.current;
      velocityRef.current = dx / dt;
    }
    lastXRef.current = e.pageX;
    lastTimeRef.current = now;
  };

  const themeStyles = {
    '--paper': '#F8FAFC',
    '--paper-2': '#FFFFFF',
    '--ink': '#0F172A',
    '--ink-soft': '#475569',
    '--rule': '#E0F2FE',
    '--accent': '#0891B2',
    '--accent-2': '#0E7490',
    backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.055) 1px, transparent 1px)",
    backgroundSize: "72px 72px",
  } as React.CSSProperties;

  const tabs = services.map((service, idx) => ({
    code: String(idx + 1).padStart(2, '0'),
    label: service.name,
  }));

  return (
    <section 
      id="services"
      className="relative overflow-visible bg-[var(--paper)] text-[var(--ink)] font-sans antialiased py-16 sm:py-24 border-t border-[var(--rule)]"
      style={themeStyles}
    >
      {/* Grid overlay radial gradient */}
      <div 
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(210,247,255,0.48),transparent_32%)]" 
        aria-hidden="true" 
      />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hww-shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        .hww-img-wrap::after {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%);
          transform: translateX(-100%);
          animation: hww-shimmer 6s ease-in-out infinite;
        }
        .hww-tab-strip {
          scrollbar-width: none;
        }
        .hww-tab-strip::-webkit-scrollbar {
          display: none;
        }
        .hww-stack-card {
          position: sticky;
          top: var(--stack-top, 136px);
        }
        .hww-stack-card[data-index="0"] { z-index: 10; }
        .hww-stack-card[data-index="1"] { z-index: 11; }
        .hww-stack-card[data-index="2"] { z-index: 12; }
        .hww-stack-card[data-index="3"] { z-index: 13; }
        .hww-stack-card[data-index="4"] { z-index: 14; }
        .hww-stack-card[data-index="5"] { z-index: 15; }
        .hww-stack-card[data-index="6"] { z-index: 16; }
        .hww-stack-card[data-index="7"] { z-index: 17; }
        @media (min-width: 768px) {
          .hww-stack-card[data-index="0"] { --stack-top: 140px; }
          .hww-stack-card[data-index="1"] { --stack-top: 172px; }
          .hww-stack-card[data-index="2"] { --stack-top: 204px; }
          .hww-stack-card[data-index="3"] { --stack-top: 236px; }
          .hww-stack-card[data-index="4"] { --stack-top: 268px; }
          .hww-stack-card[data-index="5"] { --stack-top: 300px; }
          .hww-stack-card[data-index="6"] { --stack-top: 332px; }
          .hww-stack-card[data-index="7"] { --stack-top: 364px; }
        }
        @media (max-width: 767px) {
          .hww-stack-card[data-index="0"] { --stack-top: 130px; }
          .hww-stack-card[data-index="1"] { --stack-top: 150px; }
          .hww-stack-card[data-index="2"] { --stack-top: 170px; }
          .hww-stack-card[data-index="3"] { --stack-top: 190px; }
          .hww-stack-card[data-index="4"] { --stack-top: 210px; }
          .hww-stack-card[data-index="5"] { --stack-top: 230px; }
          .hww-stack-card[data-index="6"] { --stack-top: 250px; }
          .hww-stack-card[data-index="7"] { --stack-top: 270px; }
        }
      `}} />

      {/* Grain overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 bg-repeat opacity-[0.035] mix-blend-multiply" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`
        }} 
      />

      <div className="relative z-10">
        {/* Section header */}
        <div className="mx-auto max-w-6xl px-5 sm:px-8 pb-10">
          <AnimatedSection className="flex flex-col items-start gap-3">
            <div className="flex items-center">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
                How We Help
              </span>
            </div>
            <h2 
              className="mt-6 font-display font-thin text-primary leading-[1.1] text-balance"
              style={{
                fontSize: "clamp(30px, 4vw, 44px)",
              }}
            >
              Practical Support <span className="font-normal text-[var(--ink)]">For Your Roadmap</span>
            </h2>
            <p className="mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-[var(--ink-soft)]">
              Eight ways our team plugs into your business, from focused web & mobile builds to custom software and automation setups. 
            </p>
          </AnimatedSection>
        </div>

        {/* Sticky boundary container wrapping only the Tab strip and the Stack of Cards */}
        <div className="relative">
          {/* Tab strip (sticky across stack) */}
          <div 
            className="sticky top-[68px] sm:top-[76px] border-y border-[var(--rule)] bg-[var(--paper)]/90 px-5 py-3.5 backdrop-blur-md sm:px-8"
            style={{ zIndex: 99 }}
          >
            <div className="mx-auto max-w-6xl">
              <div 
                ref={stripRef} 
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="hww-tab-strip flex items-center gap-2 overflow-x-auto select-none cursor-grab active:cursor-grabbing"
              >
                {tabs.map((tab, idx) => {
                  const isActive = activeTabIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={(e) => handleTabClick(e, idx)}
                      className={`tab-btn group flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-250 ${
                        isActive
                          ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] shadow-[0_4px_12px_rgba(15,23,42,0.12)]'
                          : 'bg-transparent text-[var(--ink-soft)] border-[var(--rule)] hover:bg-[var(--ink)]/[0.04] hover:text-[var(--ink)]'
                      }`}
                    >
                      <span className={`tab-code font-mono text-xs font-semibold transition-colors duration-250 ${
                        isActive ? 'text-[var(--accent)]' : 'text-[var(--ink-soft)]'
                      }`}>
                        {tab.code}
                      </span>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stack of Cards */}
          <div className="mx-auto max-w-6xl px-5 sm:px-8 relative z-10">
            <div className="relative pt-10 space-y-6" style={{ perspective: '1200px' }}>
              
              {services.map((service, index) => {
                const image = serviceImages[service.id] || "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80";
                const isEven = index % 2 === 0;
                const accentColorClass = isEven ? 'text-[var(--accent)]' : 'text-[var(--accent-2)]';
                const bulletBgClass = isEven ? 'bg-[var(--accent)]' : 'bg-[var(--accent-2)]';
                const indexStr = String(index + 1).padStart(2, '0');

                return (
                  <article 
                    key={service.id}
                    ref={(el) => { cardRefs.current[index] = el; }} 
                    data-index={index} 
                    className="hww-stack-card relative"
                    style={{
                      position: 'sticky',
                      top: 'var(--stack-top)',
                      zIndex: 10 + index,
                    } as React.CSSProperties}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-[var(--ink)]/12 bg-[var(--paper-2)] shadow-[0_30px_60px_-30px_rgba(15,23,42,0.15)]">
                      {/* Hairline corners */}
                      <span className="absolute top-3 left-3 w-2.5 h-2.5 border-l border-t border-[var(--ink)]/20"></span>
                      <span className="absolute top-3 right-3 w-2.5 h-2.5 border-r border-t border-[var(--ink)]/20"></span>
                      <span className="absolute bottom-3 left-3 w-2.5 h-2.5 border-l border-b border-[var(--ink)]/20"></span>
                      <span className="absolute bottom-3 right-3 w-2.5 h-2.5 border-r border-b border-[var(--ink)]/20"></span>
                      
                      {/* Clickable Header Area for scrolling */}
                      <div 
                        onClick={(e) => handleTabClick(e, index)}
                        className="absolute top-0 left-0 right-0 h-5 sm:h-8 cursor-pointer z-20 flex items-center px-6 pt-1 sm:pt-1.5"
                      >
                        <span className={`font-mono text-xs sm:text-lg font-bold ${accentColorClass}`}>
                          {indexStr}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-12 pt-3 sm:pt-5">
                        {/* Left content */}
                        <div className="md:col-span-7 p-6 sm:p-10 pt-4 sm:pt-6 flex flex-col justify-between">
                          <div>
                            <h3 className="font-display text-[26px] sm:text-[30px] font-semibold leading-tight tracking-tight text-[var(--ink)]">
                              {service.name}
                            </h3>
                            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-[var(--ink-soft)]">
                              {service.description}
                            </p>
                            <ul className="mt-7 space-y-2.5">
                              {service.capabilities.slice(0, 3).map((capability, capIdx) => (
                                <li 
                                  key={capIdx}
                                  className="flex items-start gap-3 text-sm text-[var(--ink)] transition-transform duration-300 hover:translate-x-1"
                                >
                                  <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${bulletBgClass}`}></span>
                                  {capability}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="pt-8">
                            <Link href={service.href}>
                              <StarButton
                                as="span"
                                backgroundColor="#0F172A"
                                textColor="text-[var(--paper)]"
                                className="w-fit cursor-pointer hover:scale-[1.02] transition-transform"
                              >
                                Explore capability
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" className="transform group-hover/star-button:translate-x-0.5 group-hover/star-button:-translate-y-0.5 transition-transform"><path d="M7 17L17 7M9 7h8v8"/></svg>
                              </StarButton>
                            </Link>
                          </div>
                        </div>
                        
                        {/* Right Image visualization */}
                        <div className="hww-img-wrap relative min-h-[140px] sm:min-h-[180px] md:min-h-0 md:col-span-5 bg-slate-900 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={image} 
                            alt={service.name} 
                            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-500 hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                          <span className="font-mono text-xs uppercase tracking-[0.2em] opacity-90">{service.id.replace(/-/g, ' ')}</span>
                          <span className="font-display text-sm italic opacity-95">vol. {indexStr}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Spacer so the last card can stack fully */}
            <div className="h-[25vh]"></div>

          </div>
        </div>
      </div> {/* End of Sticky Container */}

      {/* Closing Call to Action (Now outside the sticky container, so tab strip scrolls away naturally!) */}
      <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 mt-12 relative z-10">
        <div className="rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/80 p-8 text-[var(--paper)] sm:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.3)]">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">Not sure which fits?</p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl text-[var(--paper)]">Let&apos;s map it together in a 30-minute call.</h3>
            </div>
            <Link 
              href="/contact" 
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--paper)] px-5 py-3 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--accent)] hover:text-white transition-all duration-300 shadow-[0_4px_12px_rgba(15,23,42,0.1)]"
            >
              Book a call
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        </div>
      </div>

      </div>
    </section>
  );
}
