"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, ArrowRight,
  Code2, Smartphone, TrendingUp, Server,
  Zap, Users, Lightbulb, Cpu, Phone,
  type LucideIcon,
} from "lucide-react";

import { countries } from "@/lib/countries";

// ─── Service items (mirrors ServicesGrid data) ────────────────────────────────

const serviceItems: {
  icon: LucideIcon;
  name: string;
  desc: string;
  href: string;
}[] = [
    {
      icon: Zap,
      name: "AI & Automation",
      desc: "AI agents, workflows & automation",
      href: "/services/ai-automation",
    },
    {
      icon: TrendingUp,
      name: "Digital Marketing",
      desc: "Campaign tracking & search optimization",
      href: "/services/digital-marketing",
    },
    {
      icon: Code2,
      name: "Web Development",
      desc: "Fast, responsive websites & web apps",
      href: "/services/web-development",
    },
    {
      icon: Cpu,
      name: "Custom Software Development",
      desc: "Custom internal & business operations tools",
      href: "/services/software-development",
    },
    {
      icon: Smartphone,
      name: "Mobile App Development",
      desc: "iOS & Android — native or cross-platform",
      href: "/services/mobile-app-development",
    },
    {
      icon: Server,
      name: "Hosting & Infrastructure",
      desc: "Scalable cloud with environment backups",
      href: "/services/hosting-infrastructure",
    },
    {
      icon: Users,
      name: "Customer Experience",
      desc: "CRM setup, ticket routing & support",
      href: "/services/customer-experience-management",
    },
    {
      icon: Lightbulb,
      name: "IT Consulting & IT Services",
      desc: "Strategic tech advisory & managed IT",
      href: "/services/it-consulting-it-services",
    },
  ];

// ─── Top-level nav links ──────────────────────────────────────────────────────

const navLinks = [
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
  { label: "FAQ",      href: "/faq" },
];

const springTransition = {
  type: "spring" as const,
  stiffness: 140,
  damping: 22,
  mass: 1.1,
};

function BrandI({
  className = "",
  dotClassName,
}: {
  className?: string;
  dotClassName: string;
}) {
  return (
    <span
      className={`relative inline-block h-[0.78em] w-[0.22em] align-[-0.02em] ${className}`}
      aria-hidden="true"
    >
      <span
        className="absolute bottom-0 left-1/2 h-[0.52em] w-[0.14em] -translate-x-1/2 rounded-full bg-current"
      />
      <span
        className={`absolute left-1/2 top-[0.14em] h-[0.16em] w-[0.16em] -translate-x-1/2 rounded-full ${dotClassName}`}
      />
    </span>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const contactRef = useRef<HTMLDivElement>(null);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileContactRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Click outside to close contact dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const inDesktop = contactRef.current && contactRef.current.contains(e.target as Node);
      const inMobile = mobileContactRef.current && mobileContactRef.current.contains(e.target as Node);
      if (!inDesktop && !inMobile) {
        setContactOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Auto-cycle through countries every 4s, pause when dropdown is open
  useEffect(() => {
    if (contactOpen) return;
    const timer = setInterval(() => {
      setSelectedCountry((prev) => {
        const idx = countries.findIndex((c) => c.code === prev.code);
        return countries[(idx + 1) % countries.length];
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [contactOpen]);

  const pillClass = "bg-cyan-500/8 border border-cyan-400/30";

  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const contactTimer = useRef<ReturnType<typeof setTimeout>>();

  const openServices = () => { clearTimeout(closeTimer.current); setServicesOpen(true); };
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setServicesOpen(false), 120); };

  const openContact   = () => { clearTimeout(contactTimer.current); setContactOpen(true);  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled((prev) => {
        if (!prev && currentScrollY > 50) return true;
        if (prev && currentScrollY < 15) return false;
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
    setContactOpen(false);
  }, [pathname]);

  // Escape key closes services dropdown
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Clean up timer on unmount
  useEffect(() => () => {
    clearTimeout(closeTimer.current);
    clearTimeout(contactTimer.current);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={`fixed z-50 top-0 left-0 right-0 w-full pointer-events-none flex flex-col items-center transition-colors duration-300 ${
      scrolled ? "" : "bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/60"
    }`}>
      <motion.nav
        layout
        transition={springTransition}
        className={`pointer-events-auto flex items-center justify-between border transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 rounded-full ${
          scrolled
            ? "mt-4 w-[92%] md:w-fit h-[52px] bg-slate-950/75 border-cyan-400/30 shadow-[0_8px_32px_rgba(6,182,212,0.18)] backdrop-blur-md px-4 lg:px-6 gap-4 lg:gap-6"
            : "w-full max-w-7xl px-4 lg:px-6 h-[68px] gap-4 lg:gap-5 border-transparent shadow-none"
        }`}
        aria-label="Main navigation"
      >
        {/* ── Logo ─────────────────────────────────────────────────────── */}
        <motion.div
          layout
          className="flex items-center shrink-0 relative"
          onMouseEnter={() => setHoveredIndex(999)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Link
            href="/"
            aria-label="aibizmod — go to home"
            className={`relative px-4 py-2 rounded-full font-satoshi font-bold text-[26px] tracking-tight select-none ${
              scrolled ? "text-white" : "text-white"
            }`}
          >
            {hoveredIndex === 999 && (
              <motion.span
                layoutId="nav-hover-pill"
                className={`absolute inset-0 rounded-full -z-10 ${pillClass}`}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}

            <span>a</span>
            <BrandI dotClassName="bg-cyan-400" />
            <span className="text-cyan-400">b</span>
            <BrandI className="text-cyan-400" dotClassName="bg-white" />
            <span className="text-cyan-400">z</span>
            <span>mod</span>

            {/* Active dot under logo when scrolled home */}
            {pathname === "/" && scrolled && (
              <motion.span
                layoutId="nav-active-dot"
                className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] w-[3px] rounded-full bg-cyan-400"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
            )}
          </Link>
        </motion.div>

        {/* ── Desktop nav ───────────────────────────────────────────────── */}
        <ul
          className={`hidden lg:flex items-center relative ${
            scrolled ? "gap-1.5" : "gap-4 xl:gap-7"
          }`}
          role="list"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navLinks.map((item, index) => {
            const active = isActive(item.href);

            /* Services — hover dropdown */
            if (item.hasDropdown) {
              return (
                <motion.li
                  layout
                  transition={springTransition}
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <div
                    onMouseEnter={openServices}
                    onMouseLeave={scheduleClose}
                  >
                    {/* Trigger button */}
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={servicesOpen}
                      aria-controls="services-dropdown"
                      onClick={() => setServicesOpen((p) => !p)}
                      className={`relative flex items-center gap-1 text-[14px] font-medium px-3 py-2 transition-colors duration-300 rounded-full focus-visible:outline-none ${
                        scrolled
                          ? active
                            ? "text-cyan-400 font-semibold"
                            : "text-stone-300 hover:text-white"
                          : active
                            ? "text-cyan-400 font-semibold"
                            : "text-stone-300 hover:text-white"
                      }`}
                    >
                      {/* Shared hover background tab */}
                      {hoveredIndex === index && (
                        <motion.span
                          layoutId="nav-hover-pill"
                          className={`absolute inset-0 rounded-full -z-10 ${pillClass}`}
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}

                      <span className="relative z-10 flex items-center gap-1">
                        Services
                        <ChevronDown
                          size={14}
                          aria-hidden="true"
                          className={`transition-transform duration-200 mt-px ${servicesOpen ? "rotate-180" : ""
                            }`}
                        />
                      </span>
                    </button>

                    {/* ── Dropdown panel ───────────────────────────────── */}
                    <div
                      id="services-dropdown"
                      role="region"
                      aria-label="Services"
                      onMouseEnter={openServices}
                      onMouseLeave={scheduleClose}
                      className={`absolute z-10 w-[90vw] max-w-[540px] rounded-card shadow-float border
                        transition-all duration-200 origin-top
                        top-[calc(100%+8px)] left-1/2 -translate-x-1/2 shadow-2xl
                        bg-slate-950/95 border-cyan-500/20 text-white
                        ${servicesOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                        }`}
                    >
                      {/* Upward caret */}
                      <div
                        className="absolute -top-[5px] w-2.5 h-2.5 rotate-45 border-l border-t bg-slate-950 border-cyan-500/20"
                        style={scrolled ? { left: "50%", transform: "translateX(-50%) rotate(45deg)" } : { left: "20px", transform: "rotate(45deg)" }}
                        aria-hidden="true"
                      />

                      {/* Service items grid */}
                      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {serviceItems.map((svc) => {
                          const Icon = svc.icon;
                          return (
                            <Link
                              key={svc.href}
                              href={svc.href}
                              onClick={() => setServicesOpen(false)}
                              className="group flex items-start gap-3 p-3 rounded-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 hover:bg-white/5"
                            >
                              {/* Small icon box */}
                              <div
                                className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 mt-0.5"
                                style={{
                                  background: "rgba(255,255,255,0.06)",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                }}
                              >
                                <Icon size={15} aria-hidden="true" className="text-cyan-400" />
                              </div>
                              <div className="min-w-0">
                                <p className={`text-[14px] font-semibold leading-snug transition-colors ${
                                    scrolled ? "text-white group-hover:text-cyan-400" : "text-white group-hover:text-cyan-400"
                                }`}>
                                  {svc.name}
                                </p>
                                <p className={`text-[11px] mt-0.5 leading-snug ${scrolled ? "text-stone-400" : "text-stone-400"}`}>
                                  {svc.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Footer "View all" link */}
                      <div className="px-3 pb-3">
                        <div className="border-t pt-3 border-white/10">
                          <Link
                            href="/services"
                            onClick={() => setServicesOpen(false)}
                            className={`flex items-center justify-center gap-1.5 py-2 text-[14px] font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 ${
                              scrolled
                                ? "text-cyan-400 hover:text-white hover:bg-white/5"
                                : "text-cyan-400 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            View all services
                            <ArrowRight size={13} aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            }

            /* Regular link */
            return (
              <motion.li
                layout
                transition={springTransition}
                key={item.href}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex flex-col items-center text-[14px] font-medium px-3 py-2 transition-colors duration-300 rounded-full focus-visible:outline-none ${
                    scrolled
                      ? active
                        ? "text-cyan-400 font-semibold"
                        : "text-stone-300 hover:text-white"
                      : active
                        ? "text-cyan-400 font-semibold"
                        : "text-stone-300 hover:text-white"
                  }`}
                >
                  {/* Shared hover background tab */}
                  {hoveredIndex === index && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className={`absolute inset-0 rounded-full -z-10 ${pillClass}`}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {/* Active dot */}
                  {active && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="mt-0.5 h-[3px] w-[3px] rounded-full bg-cyan-400"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>

        {/* ── Desktop CTA & Contact Selector - remove when scrolled ── */}
        <AnimatePresence>
          {!scrolled && (
            <motion.div
              layout
              initial={{ opacity: 1, width: "auto" }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0, transition: { duration: 0.2 } }}
              transition={springTransition}
              className="hidden lg:flex items-center gap-1.5 lg:gap-2 shrink-0 relative flex-nowrap whitespace-nowrap"
              style={{ overflow: scrolled ? "hidden" : "visible" }}
            >
              <Link href="/contact" className="btn-primary py-[8px] px-5 text-[14px] rounded-full">
                Let&rsquo;s Connect
              </Link>

              {/* Country Selector Dropdown */}
              <div
                className="relative"
                ref={contactRef}
                onMouseEnter={openContact}
              >
                <button
                  type="button"
                  onClick={() => setContactOpen((p) => !p)}
                  className="flex items-center gap-2 px-4 py-[8.5px] text-[14px] font-semibold text-white bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-full transition-all focus-visible:outline-none select-none cursor-pointer"
                >
                  <span key={selectedCountry.code} className="flex items-center gap-2 min-w-[90px] xl:min-w-[240px] justify-center animate-fade-in overflow-hidden">
                    <span className="text-[14px] leading-none select-none">{selectedCountry.flag}</span>
                    <span className="tracking-tight text-white/95">{selectedCountry.code}</span>
                    <span className="text-white/90 font-mono text-[14px] hidden xl:inline">{selectedCountry.phone}</span>
                  </span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 text-white/60 ${contactOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {contactOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute z-10 w-[90vw] max-w-[540px] rounded-card shadow-float border
                        transition-all duration-200 origin-top
                        top-[calc(100%+8px)] right-0 shadow-2xl
                        bg-slate-950/95 border-cyan-500/20 text-white"
                      ref={desktopDropdownRef}
                      onMouseEnter={openContact}
                    >
                      {/* Upward caret */}
                      <div
                        className="absolute -top-[5px] w-2.5 h-2.5 rotate-45 border-l border-t bg-slate-950 border-cyan-500/20"
                        style={{ right: "20px", transform: "rotate(45deg)" }}
                        aria-hidden="true"
                      />

                      {/* Country items grid */}
                      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {countries.map((country) => (
                          <div
                            key={country.code}
                            onClick={() => {
                              setSelectedCountry(country);
                              setContactOpen(false);
                            }}
                            className="group flex items-start gap-3 p-3 rounded-[10px] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 hover:bg-white/5"
                          >
                            {/* Flag icon box */}
                            <div
                              className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 mt-0.5"
                              style={{
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.1)",
                              }}
                            >
                              <span className="text-[16px] select-none leading-none">{country.flag}</span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-[14px] font-semibold leading-snug text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                                {country.phone}
                              </p>
                              <p className="text-[11px] mt-0.5 leading-snug text-stone-400">
                                {country.name}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="px-3 pb-3">
                        <div className="border-t pt-3 border-white/10">
                          <a
                            href="tel:+16464215740"
                            className="flex items-center justify-center gap-1.5 py-2 text-[14px] font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 text-cyan-400 hover:text-white hover:bg-white/5"
                          >
                            Call main office
                            <Phone size={13} aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Mobile hamburger ──────────────────────────────────────────── */}
        <button
          type="button"
          className={`lg:hidden p-2.5 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 ${
            scrolled ? "text-white hover:bg-white/10" : "text-white hover:bg-white/10"
          }`}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen
            ? <X size={20} aria-hidden="true" />
            : <Menu size={20} aria-hidden="true" />}
        </button>
      </motion.nav>

      {/* ── Mobile menu ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={springTransition}
            className={`lg:hidden z-50 pointer-events-auto origin-top mt-2 w-[92%] max-w-sm rounded-2xl shadow-2xl p-2 backdrop-blur-md overflow-x-hidden ${
              scrolled
                ? "bg-slate-950/95 border border-cyan-500/20 text-white"
                : "bg-slate-950/95 border border-cyan-500/20 text-white"
            }`}
            role="navigation"
            aria-label="Mobile navigation"
            data-lenis-prevent
          >
            <ul className="px-4 pt-3 pb-5 flex flex-col gap-0.5" role="list">
              {navLinks.map((item) => {
                const active = isActive(item.href);

                /* Services — expandable sub-list */
                if (item.hasDropdown) {
                  return (
                    <li key={item.href}>
                      <button
                        type="button"
                        aria-expanded={mobileServicesOpen}
                        onClick={() => setMobileServicesOpen((p) => !p)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-[14px] rounded-md transition-colors focus-visible:outline-none
                          ${scrolled
                            ? active
                              ? "text-cyan-400 font-semibold bg-white/5"
                              : "text-stone-300 font-medium hover:text-white hover:bg-white/5"
                            : active
                              ? "text-royal-deep font-semibold bg-tint"
                              : "text-muted-foreground font-medium hover:text-ink hover:bg-tint/60"
                          }`}
                      >
                        <span className="flex items-center gap-2">
                          {active && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
                          )}
                          Services
                        </span>
                        <ChevronDown
                          size={14}
                          aria-hidden="true"
                          className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      {/* Sub-list */}
                      {mobileServicesOpen && (
                        <ul className={`mt-1 ml-3 pl-3 border-l-2 pb-2 grid grid-cols-1 sm:grid-cols-2 gap-0.5 ${
                          scrolled ? "border-white/10" : "border-white/10"
                        }`}>
                          {serviceItems.map((svc) => {
                            const Icon = svc.icon;
                            return (
                              <li key={svc.href}>
                                <Link
                                  key={svc.href}
                                  href={svc.href}
                                  onClick={() => {
                                    setMenuOpen(false);
                                    setMobileServicesOpen(false);
                                  }}
                                  className={`flex items-center gap-2.5 px-3 py-2 text-[14px] rounded-md transition-colors ${
                                    scrolled
                                      ? "text-stone-400 hover:text-white hover:bg-white/5"
                                      : "text-muted-foreground hover:text-ink hover:bg-tint/60"
                                    }`}
                                >
                                  <Icon
                                    size={13}
                                    className="shrink-0 text-cyan-400"
                                    aria-hidden="true"
                                  />
                                  {svc.name}
                                </Link>
                              </li>
                            );
                          })}
                          <li className="col-span-full">
                            <Link
                              href="/services"
                              onClick={() => {
                                setMenuOpen(false);
                                setMobileServicesOpen(false);
                              }}
                              className={`flex items-center gap-1.5 px-3 py-2 text-[14px] font-semibold rounded-md transition-colors ${
                                scrolled
                                  ? "text-cyan-400 hover:bg-white/5"
                                  : "text-cyan-400 hover:bg-white/5"
                              }`}
                            >
                              View all services
                              <ArrowRight size={12} aria-hidden="true" />
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  );
                }

                /* Regular mobile link */
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 text-[14px] rounded-md transition-colors focus-visible:outline-none
                        ${scrolled
                          ? active
                            ? "text-cyan-400 font-semibold bg-white/5"
                            : "text-stone-300 font-medium hover:text-white hover:bg-white/5"
                          : active
                            ? "text-royal-deep font-semibold bg-tint"
                            : "text-muted-foreground font-medium hover:text-ink hover:bg-tint/60"
                        }`}
                    >
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
                      )}
                      {item.label}
                    </Link>
                  </li>
                );
              })}

              <li className="pt-3 px-3 flex flex-col gap-2.5">
                <Link
                  href="/contact"
                  className="btn-primary w-full rounded-full text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Let&rsquo;s Connect
                </Link>

                {/* Mobile Country Selector */}
                <div className="w-full" ref={mobileContactRef}>
                  <button
                    type="button"
                    onClick={() => setContactOpen((p) => !p)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-[14px] font-semibold text-white bg-slate-900 border border-slate-800 rounded-full transition-all focus-visible:outline-none select-none cursor-pointer"
                  >
                    <div key={selectedCountry.code} className="flex items-center gap-2 min-w-[130px] justify-center animate-fade-in">
                      <span className="text-[14px] leading-none">{selectedCountry.flag}</span>
                      <span>{selectedCountry.code}</span>
                      <span className="text-white/90 font-mono text-[14px]">{selectedCountry.phone}</span>
                    </div>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 text-white/60 ${contactOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {contactOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 w-full max-h-[60vh] overflow-y-auto rounded-xl bg-slate-950/95 border border-cyan-500/20 text-left whitespace-normal overscroll-contain scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
                        ref={mobileDropdownRef}
                      >
                        <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-1">
                          {countries.map((country) => (
                            <div
                              key={country.code}
                              onClick={() => {
                                setSelectedCountry(country);
                                setContactOpen(false);
                              }}
                              className="w-full flex items-start justify-between gap-3 p-2.5 rounded-[10px] transition-all cursor-pointer border border-transparent hover:bg-white/5 hover:border-white/10"
                            >
                              <span className="text-[18px] select-none mt-0.5 leading-none">{country.flag}</span>
                              <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex items-center justify-between">
                                  <a
                                    href={`tel:${country.phone.replace(/\s+/g, "")}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="font-bold text-[13px] text-white hover:text-cyan-400 transition-colors"
                                  >
                                    {country.phone}
                                  </a>
                                  <a
                                    href={`tel:${country.phone.replace(/\s+/g, "")}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-cyan-400 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
                                    aria-label={`Call ${country.name} office`}
                                  >
                                    <Phone size={12} strokeWidth={2.5} />
                                  </a>
                                </div>
                                <p className="text-[11px] text-stone-200 font-medium leading-normal font-sans">
                                  {country.name}
                                </p>
                                <p className="text-[10px] text-stone-400 leading-normal font-sans pt-0.5 break-words">
                                  {country.address}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
