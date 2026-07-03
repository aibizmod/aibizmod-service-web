"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * StickyFooterLayout — Bluebird-style sticky footer.
 *
 * The footer is position:fixed at the bottom of the viewport (z-0).
 * The content sits in a bg-canvas card at z-10 and scrolls normally.
 * Below the visible sections is a transparent gap equal to the footer height.
 * Through that transparent gap the fixed footer is revealed — creating the
 * illusion that the footer stays put while the white card scrolls away from it.
 */
export default function StickyFooterLayout({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const updateHeight = () => {
      const height = el.offsetHeight;
      setFooterHeight(height);
    };

    const ro = new ResizeObserver(updateHeight);
    ro.observe(el);
    updateHeight();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;
      
      // Calculate remaining scroll height before reaching the bottom
      const distFromBottom = totalHeight - (scrollY + viewportHeight);
      
      // Reveal the footer only when within range of the bottom reveal spacer
      // (footerHeight is the spacer height; we add a 250px buffer for a smooth fade-in)
      const currentFooterHeight = el.offsetHeight || 400;
      setShowFooter(distFromBottom <= currentFooterHeight + 250);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    const t = setTimeout(handleScroll, 100);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      {/* Black backdrop for card rounding */}
      <div className="fixed inset-0 bg-black" style={{ zIndex: -1 }} aria-hidden="true" />

      {/* ── Content layer ── */}
      <div className="relative z-10 pointer-events-none">
        <div className="bg-canvas pointer-events-auto rounded-b-[20px] md:rounded-b-[40px] shadow-[0_8px_40px_rgba(0,0,0,0.12)] [&_main]:rounded-b-[20px] [&_main]:md:rounded-b-[40px] [&_section:last-of-type]:rounded-b-[20px] [&_section:last-of-type]:md:rounded-b-[40px] [&_>_*:last-child]:rounded-b-[20px] [&_>_*:last-child]:md:rounded-b-[40px]">
          {children}
        </div>

        {/* Spacer — only on desktop where footer is fixed */}
        <div className="hidden md:block" style={{ height: footerHeight }} aria-hidden="true" />
      </div>

      {/* ── Desktop: fixed footer (z-0) ── */}
      <div
        ref={footerRef}
        className="hidden md:block fixed bottom-0 left-0 right-0 transition-opacity duration-500 ease-in-out"
        style={{
          zIndex: 0,
          opacity: showFooter ? 1 : 0,
          pointerEvents: (showFooter ? "auto" : "none") as React.CSSProperties['pointerEvents'],
        }}
      >
        {footer}
      </div>

      {/* ── Mobile: footer in normal flow (no sticky) ── */}
      <div className="block md:hidden">
        {footer}
      </div>
    </>
  );
}
