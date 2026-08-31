'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getIndustryMaskConfig } from '@/data/industry-masks';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface IndustryScrollZoominAnimationProps {
  industrySlug?: string;
  industryName?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: React.ReactNode;
  outroTitle?: React.ReactNode;
  outroSubtitle?: React.ReactNode;
  videoSrc?: string;
  fallbackVideoSrc?: string;
  posterSrc?: string;
  maskSvgUri?: string;
  watermarkText?: string;
  accentColor?: string;
  className?: string;
}

export function IndustryScrollZoominAnimation({
  industrySlug = 'retail-ecommerce',
  industryName,
  eyebrow,
  title,
  subtitle,
  outroTitle,
  outroSubtitle,
  videoSrc,
  fallbackVideoSrc,
  posterSrc,
  maskSvgUri,
  watermarkText,
  accentColor,
  className = '',
}: IndustryScrollZoominAnimationProps) {
  const maskConfig = getIndustryMaskConfig(industrySlug, industryName);

  const activeEyebrow = eyebrow || maskConfig.eyebrow;
  const activeTitle = title || maskConfig.title;
  const activeSubtitle = subtitle || maskConfig.subtitle;
  const activeOutroTitle = outroTitle || maskConfig.outroTitle;
  const activeOutroSubtitle = outroSubtitle || maskConfig.outroSubtitle;
  const activeVideo = videoSrc || maskConfig.videoSrc;
  const activeFallbackVideo = fallbackVideoSrc || maskConfig.fallbackVideoSrc;
  const activePoster = posterSrc || maskConfig.posterSrc;
  const activeMaskUri = maskSvgUri || maskConfig.maskSvgUri;
  const activeWatermark = watermarkText || maskConfig.watermarkText;
  const activeAccent = accentColor || maskConfig.accentColor;

  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const maskLayerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;

    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }

    const ctx = gsap.context(() => {
      const getInitialSize = () => {
        if (typeof window === 'undefined') return 360;
        if (window.innerWidth < 640) return 240;
        if (window.innerWidth < 1024) return 320;
        return 400;
      };

      const initialSize = getInitialSize();

      if (maskLayerRef.current) {
        maskLayerRef.current.style.setProperty('--maskW', `${initialSize}px`);
        maskLayerRef.current.style.webkitMaskSize = `${initialSize}px`;
        maskLayerRef.current.style.maskSize = `${initialSize}px`;
        maskLayerRef.current.style.webkitMaskImage = `url('${activeMaskUri}')`;
        maskLayerRef.current.style.maskImage = `url('${activeMaskUri}')`;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=260%',
          scrub: 1.2,
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const startSize = getInitialSize();
            const maxZoomMultiplier = Math.max(
              38000,
              (typeof window !== 'undefined' ? window.innerWidth : 1920) * 26
            );

            // Exponential scale to expand smoothly through the silhouette center
            const currentSize = startSize + Math.pow(progress, 2.05) * maxZoomMultiplier;

            if (maskLayerRef.current) {
              // Seamless full video reveal towards the end of scroll
              if (progress >= 0.88) {
                maskLayerRef.current.style.webkitMaskImage = 'none';
                maskLayerRef.current.style.maskImage = 'none';
              } else {
                maskLayerRef.current.style.webkitMaskImage = `url('${activeMaskUri}')`;
                maskLayerRef.current.style.maskImage = `url('${activeMaskUri}')`;
                maskLayerRef.current.style.setProperty('--maskW', `${currentSize}px`);
                maskLayerRef.current.style.webkitMaskSize = `${currentSize}px`;
                maskLayerRef.current.style.maskSize = `${currentSize}px`;
              }
            }

            // Fade out ambient watermark towards the end so video is completely clean
            if (watermarkRef.current) {
              const watermarkFade = Math.max(0, 1 - progress * 1.5);
              watermarkRef.current.style.opacity = `${0.035 * watermarkFade}`;
            }

            // Fade out corner brackets and sector badge as video reaches full-screen
            if (overlayRef.current) {
              const overlayFade = progress > 0.7 ? Math.max(0, 1 - (progress - 0.7) * 3.5) : 1;
              overlayRef.current.style.opacity = `${overlayFade}`;
            }
          },
        },
      });

      tl.to(
        videoRef.current,
        {
          scale: 1.15,
          ease: 'none',
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeMaskUri, activeVideo, industrySlug]);

  return (
    <div className={`w-full bg-white text-slate-950 selection:bg-cyan-600 selection:text-white ${className}`}>
      {/* 1. INTRO / KEY CAPABILITY SECTION */}
      <section className="relative w-full min-h-[65vh] sm:min-h-[75vh] bg-white flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 py-16 sm:py-24 select-none border-t border-slate-100">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center px-2 sm:px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/80 bg-cyan-50/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-800 backdrop-blur-md mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-cyan-500" />
            {activeEyebrow}
          </div>

          <h2 className="text-[8vw] sm:text-[6.5vw] md:text-[5rem] lg:text-[6.2rem] font-black uppercase leading-[0.92] tracking-[-0.04em] text-slate-900 mb-6 select-none font-display">
            {activeTitle}
          </h2>

          <div className="max-w-3xl text-sm sm:text-base md:text-lg uppercase font-semibold leading-relaxed tracking-wider text-slate-600">
            {activeSubtitle}
          </div>
        </div>
      </section>

      {/* 2. CUSTOM SVG ICON MASK PORTAL WITH FULL VIDEO REVEAL */}
      <div
        ref={containerRef}
        className="relative w-full bg-white text-slate-900 selection:bg-cyan-600 selection:text-white"
        style={{ minHeight: '360vh' }}
      >
        <div
          ref={pinRef}
          className="motion-section__pin sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-white select-none relative"
        >
          {/* Overlay elements (fade smoothly on full zoom) */}
          <div ref={overlayRef} className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300">
            {/* Top-Left Corner Bracket */}
            <div className="absolute top-[14px] left-[14px] w-5 h-5 text-slate-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 10 10" fill="none" className="w-full h-full">
                <path d="M10 0V1H1V10H0V0H10Z" fill="currentColor" style={{ mixBlendMode: 'difference' }} />
              </svg>
            </div>

            {/* Top-Right Corner Bracket */}
            <div className="absolute top-[14px] right-[14px] w-5 h-5 text-slate-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 10 10" fill="none" className="w-full h-full">
                <path d="M10 0V10H9V1H0V0H10Z" fill="currentColor" style={{ mixBlendMode: 'difference' }} />
              </svg>
            </div>

            {/* Bottom-Left Corner Bracket */}
            <div className="absolute bottom-[14px] left-[14px] w-5 h-5 text-slate-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 10 10" fill="none" className="w-full h-full">
                <path d="M-4.37116e-07 0L1 -4.37114e-08L1 9L10 9L10 10L0 10L-4.37116e-07 0Z" fill="currentColor" style={{ mixBlendMode: 'difference' }} />
              </svg>
            </div>

            {/* Bottom-Right Corner Bracket */}
            <div className="absolute bottom-[14px] right-[14px] w-5 h-5 text-slate-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 10 10" fill="none" className="w-full h-full">
                <path d="M10 10L-4.37114e-07 10L-3.93402e-07 9L9 9L9 -4.37114e-08L10 0L10 10Z" fill="currentColor" style={{ mixBlendMode: 'difference' }} />
              </svg>
            </div>

            {/* Top Sector Indicator */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-800 backdrop-blur-md shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: activeAccent }} />
                {industrySlug.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Ambient Background Watermark */}
          <div
            ref={watermarkRef}
            className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none z-0 transition-opacity duration-300"
          >
            <span className="text-[20vw] font-black uppercase tracking-tighter text-slate-950 font-display">
              {activeWatermark}
            </span>
          </div>

          {/* Icon Mask Video Portal */}
          <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-center">
            <div
              ref={maskLayerRef}
              className="motion-section__bottom w-full h-full relative overflow-hidden flex items-center justify-center"
              style={{
                WebkitMaskImage: `url('${activeMaskUri}')`,
                maskImage: `url('${activeMaskUri}')`,
                WebkitMaskPosition: '50% 50%',
                maskPosition: '50% 50%',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskSize: 'var(--maskW, 400px)',
                maskSize: 'var(--maskW, 400px)',
                transition: 'mask-size 0.04s linear, -webkit-mask-size 0.04s linear',
              }}
            >
              <video
                ref={videoRef}
                className="motion-section__video w-full h-full object-cover will-change-transform bg-black"
                loop
                muted
                playsInline
                autoPlay
                preload="auto"
                poster={activePoster}
                style={{
                  transform: 'scale(1.0)',
                  transformOrigin: '50% 50%',
                }}
              >
                <source src={activeVideo} type="video/mp4" />
                {activeFallbackVideo && <source src={activeFallbackVideo} type="video/mp4" />}
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* 3. OUTRO / STRATEGIC OUTCOME SECTION */}
      <footer className="relative z-10 w-full min-h-[65vh] sm:min-h-[75vh] bg-white text-slate-950 flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 py-16 sm:py-24 select-none border-b border-slate-100">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center px-2 sm:px-4">
          <h2 className="text-[8vw] sm:text-[6.5vw] md:text-[5rem] lg:text-[6.2rem] font-black uppercase leading-[0.92] tracking-[-0.04em] text-slate-900 mb-6 select-none font-display">
            {activeOutroTitle}
          </h2>
          <div className="max-w-3xl text-sm sm:text-base md:text-lg uppercase font-semibold leading-relaxed tracking-wider text-slate-600">
            {activeOutroSubtitle}
          </div>
        </div>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .pin-spacer {
              background-color: #ffffff !important;
            }
          `,
        }}
      />
    </div>
  );
}

export default IndustryScrollZoominAnimation;
