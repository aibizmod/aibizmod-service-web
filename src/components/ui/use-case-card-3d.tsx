'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

// ─── Industry → image + accent mapping ───────────────────────────────────────

interface IndustryConfig {
  src: string;
  accentColor: string;
  glowColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
}

// Map normalised industry key → config
const INDUSTRY_MAP: Record<string, IndustryConfig> = {
  retail: {
    src: '/use-case-3d/industries/retail.webp',
    accentColor: 'hsl(38 92% 50%)',
    glowColor: 'rgba(245,158,11,0.25)',
    badgeBg: 'rgba(255,251,235,0.9)',
    badgeText: '#92400e',
    badgeBorder: 'rgba(252,211,77,0.6)',
  },
  finance: {
    src: '/use-case-3d/industries/finance.webp',
    accentColor: 'hsl(191 94% 46%)',
    glowColor: 'rgba(6,182,212,0.22)',
    badgeBg: 'rgba(236,254,255,0.9)',
    badgeText: '#0e7490',
    badgeBorder: 'rgba(103,232,249,0.6)',
  },
  'financial services': {
    src: '/use-case-3d/industries/finance.webp',
    accentColor: 'hsl(191 94% 46%)',
    glowColor: 'rgba(6,182,212,0.22)',
    badgeBg: 'rgba(236,254,255,0.9)',
    badgeText: '#0e7490',
    badgeBorder: 'rgba(103,232,249,0.6)',
  },
  healthcare: {
    src: '/use-case-3d/industries/healthcare.webp',
    accentColor: 'hsl(174 72% 42%)',
    glowColor: 'rgba(20,184,166,0.24)',
    badgeBg: 'rgba(240,253,250,0.9)',
    badgeText: '#115e59',
    badgeBorder: 'rgba(94,234,212,0.6)',
  },
  'healthcare tech': {
    src: '/use-case-3d/industries/healthcare.webp',
    accentColor: 'hsl(174 72% 42%)',
    glowColor: 'rgba(20,184,166,0.24)',
    badgeBg: 'rgba(240,253,250,0.9)',
    badgeText: '#115e59',
    badgeBorder: 'rgba(94,234,212,0.6)',
  },
  'e-commerce': {
    src: '/use-case-3d/industries/ecommerce.webp',
    accentColor: 'hsl(270 76% 60%)',
    glowColor: 'rgba(139,92,246,0.24)',
    badgeBg: 'rgba(245,243,255,0.9)',
    badgeText: '#6d28d9',
    badgeBorder: 'rgba(167,139,250,0.6)',
  },
  manufacturing: {
    src: '/use-case-3d/industries/manufacturing.webp',
    accentColor: 'hsl(217 91% 60%)',
    glowColor: 'rgba(59,130,246,0.24)',
    badgeBg: 'rgba(239,246,255,0.9)',
    badgeText: '#1e40af',
    badgeBorder: 'rgba(147,197,253,0.6)',
  },
  logistics: {
    src: '/use-case-3d/industries/logistics.webp',
    accentColor: 'hsl(160 84% 39%)',
    glowColor: 'rgba(16,185,129,0.24)',
    badgeBg: 'rgba(236,253,245,0.9)',
    badgeText: '#065f46',
    badgeBorder: 'rgba(110,231,183,0.6)',
  },
  saas: {
    src: '/use-case-3d/industries/saas.webp',
    accentColor: 'hsl(248 84% 64%)',
    glowColor: 'rgba(99,102,241,0.26)',
    badgeBg: 'rgba(238,242,255,0.9)',
    badgeText: '#3730a3',
    badgeBorder: 'rgba(165,180,252,0.6)',
  },
  legal: {
    src: '/use-case-3d/industries/legal.webp',
    accentColor: 'hsl(43 96% 56%)',
    glowColor: 'rgba(234,179,8,0.24)',
    badgeBg: 'rgba(254,252,232,0.9)',
    badgeText: '#713f12',
    badgeBorder: 'rgba(253,224,71,0.6)',
  },
  'legal tech': {
    src: '/use-case-3d/industries/legal.webp',
    accentColor: 'hsl(43 96% 56%)',
    glowColor: 'rgba(234,179,8,0.24)',
    badgeBg: 'rgba(254,252,232,0.9)',
    badgeText: '#713f12',
    badgeBorder: 'rgba(253,224,71,0.6)',
  },
  hr: {
    src: '/use-case-3d/industries/hr.webp',
    accentColor: 'hsl(340 82% 58%)',
    glowColor: 'rgba(236,72,153,0.22)',
    badgeBg: 'rgba(253,242,248,0.9)',
    badgeText: '#9d174d',
    badgeBorder: 'rgba(249,168,212,0.6)',
  },
  hospitality: {
    src: '/use-case-3d/industries/hospitality.webp',
    accentColor: 'hsl(26 90% 54%)',
    glowColor: 'rgba(249,115,22,0.24)',
    badgeBg: 'rgba(255,247,237,0.9)',
    badgeText: '#9a3412',
    badgeBorder: 'rgba(253,186,116,0.6)',
  },
  edtech: {
    src: '/use-case-3d/industries/edtech.webp',
    accentColor: 'hsl(200 94% 48%)',
    glowColor: 'rgba(14,165,233,0.24)',
    badgeBg: 'rgba(240,249,255,0.9)',
    badgeText: '#0c4a6e',
    badgeBorder: 'rgba(125,211,252,0.6)',
  },
};

// Industry name variations → normalised key
const INDUSTRY_ALIASES: Record<string, string> = {
  'food and beverage': 'hospitality',
  'food & beverage': 'hospitality',
  cafe: 'hospitality',
  hotel: 'hospitality',
  restaurant: 'hospitality',
  'internal operations': 'hr',
  operations: 'hr',
  sales: 'finance',
  'professional services': 'saas',
  subscription: 'saas',
  content: 'saas',
  property: 'ecommerce',
  'customer support': 'saas',
  fitness: 'healthcare',
};

// Accent palette for index-based fallback (when industry not in map)
const FALLBACK_ACCENTS: IndustryConfig[] = [
  {
    src: '/use-case-3d/industries/saas.webp',
    accentColor: 'hsl(248 84% 64%)',
    glowColor: 'rgba(99,102,241,0.26)',
    badgeBg: 'rgba(238,242,255,0.9)',
    badgeText: '#3730a3',
    badgeBorder: 'rgba(165,180,252,0.6)',
  },
  {
    src: '/use-case-3d/industries/finance.webp',
    accentColor: 'hsl(191 94% 46%)',
    glowColor: 'rgba(6,182,212,0.22)',
    badgeBg: 'rgba(236,254,255,0.9)',
    badgeText: '#0e7490',
    badgeBorder: 'rgba(103,232,249,0.6)',
  },
  {
    src: '/use-case-3d/industries/retail.webp',
    accentColor: 'hsl(38 92% 50%)',
    glowColor: 'rgba(245,158,11,0.25)',
    badgeBg: 'rgba(255,251,235,0.9)',
    badgeText: '#92400e',
    badgeBorder: 'rgba(252,211,77,0.6)',
  },
];

function resolveConfig(industry: string | undefined, index: number): IndustryConfig {
  if (!industry) return FALLBACK_ACCENTS[index % FALLBACK_ACCENTS.length];
  const key = industry.toLowerCase().trim();
  if (INDUSTRY_MAP[key]) return INDUSTRY_MAP[key];
  const aliasKey = INDUSTRY_ALIASES[key];
  if (aliasKey && INDUSTRY_MAP[aliasKey]) return INDUSTRY_MAP[aliasKey];
  return FALLBACK_ACCENTS[index % FALLBACK_ACCENTS.length];
}

const USE_CASE_ALT_MAP: Record<string, string> = {
  retail: "Boutique retail shop interior with products displayed representing business operations solutions.",
  finance: "Financial services chart depicting investment growth and accounting analysis.",
  'financial services': "Financial services chart depicting investment growth and accounting analysis.",
  healthcare: "Healthcare medical professional using a digital tablet for patient care systems.",
  'healthcare tech': "Healthcare medical professional using a digital tablet for patient care systems.",
  'e-commerce': "Hand carrying a packaged product representing retail ecommerce shipping services.",
  manufacturing: "Automated industrial manufacturing robot arm on a factory production line.",
  logistics: "Cargo shipping vessel at a port representing supply chain logistics operations.",
  saas: "Web dashboard showing business intelligence metrics for software application solutions.",
  legal: "Law office scales of justice representing legal tech consulting services.",
  'legal tech': "Law office scales of justice representing legal tech consulting services.",
  hr: "Human resources manager conducting an interview for company recruitment and onboarding.",
  hospitality: "Luxury hotel resort infinity swimming pool representing customer experience management.",
  edtech: "Laptops and study materials in a classroom setting representing education technology systems.",
};

function getUseCaseAlt(badge: string | undefined, heading: string): string {
  if (!badge) return heading;
  const key = badge.toLowerCase().trim();
  if (USE_CASE_ALT_MAP[key]) return USE_CASE_ALT_MAP[key];
  return heading;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface UseCaseCard3DProps {
  heading: string;
  text: string;
  badge?: string;       // industry name
  index: number;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const UseCaseCard3D: React.FC<UseCaseCard3DProps> = ({
  heading,
  text,
  badge,
  index,
  className = '',
}) => {
  const prefersReduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const cfg = resolveConfig(badge, index);

  return (
    <motion.div
      className={`group relative flex flex-col rounded-[24px] overflow-hidden border bg-white ${className}`}
      style={{
        borderColor: hovered ? cfg.accentColor : 'rgba(186,230,253,0.8)',
        boxShadow: hovered
          ? `0 20px 60px ${cfg.glowColor}, 0 4px 16px rgba(0,0,0,0.08)`
          : '0 12px 40px rgba(8,145,178,0.07)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
    >
      {/* ── Image panel ──────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: 190,
          background: `radial-gradient(ellipse at 50% 80%, ${cfg.glowColor.replace(/[\d.]+\)$/, '0.15)')}, transparent 70%), #0b0f1a`,
        }}
      >
        {/* Hover glow overlay */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${cfg.glowColor}, transparent 65%)`,
          }}
          animate={{ opacity: hovered ? 1 : 0.3 }}
          transition={{ duration: 0.35 }}
        />

        {/* Industry image */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center"
          animate={
            prefersReduced
              ? {}
              : hovered
              ? { scale: 1.06, y: -4 }
              : { scale: 1, y: 0 }
          }
          transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="relative w-full h-full">
            <Image
              src={cfg.src}
              alt={getUseCaseAlt(badge, heading)}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 3}
            />
          </div>
        </motion.div>

        {/* Bottom gradient fade so card content reads cleanly */}
        <div
          className="absolute bottom-0 left-0 right-0 h-10 z-30 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #ffffff, transparent)' }}
        />

        {/* Accent accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] z-40"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${cfg.accentColor} 40%, ${cfg.accentColor} 60%, transparent 100%)`,
          }}
          animate={{ opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* ── Text content ─────────────────────────────────────── */}
      <div className="flex flex-col gap-3 p-6 flex-1">
        {/* Industry badge */}
        {badge && (
          <span
            className="inline-flex self-start items-center rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: cfg.badgeBg,
              color: cfg.badgeText,
              border: `1px solid ${cfg.badgeBorder}`,
            }}
          >
            {badge}
          </span>
        )}

        {/* Heading */}
        <h3
          className="font-display font-semibold text-[#0F172A] leading-snug"
          style={{ fontSize: 16 }}
        >
          {heading}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed flex-1">{text}</p>

        {/* Animated accent underline */}
        <motion.div
          className="h-[3px] rounded-full mt-2"
          style={{
            background: `linear-gradient(90deg, ${cfg.accentColor}, transparent)`,
            transformOrigin: 'left',
          }}
          animate={{ scaleX: hovered ? 1 : 0.25, opacity: hovered ? 1 : 0.45 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};
