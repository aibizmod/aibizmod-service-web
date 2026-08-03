'use client';

import React, { useId } from 'react';
import { motion } from 'framer-motion';

interface CardStrandsProps {
  active?: boolean;
  className?: string;
  origin?: 'bottom-left' | 'bottom-right' | 'center';
}

export function CardStrands({
  active = false,
  className = '',
}: CardStrandsProps) {
  const gradientId = useId();

  return (
    <div className={`relative w-full pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 460 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={`w-full h-[60px] transition-opacity duration-500 ${
          active ? 'opacity-100' : 'opacity-40 group-hover:opacity-60'
        }`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0891b2" stopOpacity={active ? '0.6' : '0.25'} />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity={active ? '0.85' : '0.4'} />
            <stop offset="100%" stopColor="#0e7490" stopOpacity={active ? '0.5' : '0.15'} />
          </linearGradient>
        </defs>

        {/* Primary wave — smooth flowing line hugging bottom */}
        <motion.path
          d="M 0 38 Q 115 18 230 32 T 460 24"
          stroke={`url(#${gradientId})`}
          strokeWidth={active ? '2' : '1.5'}
          strokeLinecap="round"
          fill="none"
          animate={{
            d: active
              ? [
                  'M 0 38 Q 115 18 230 32 T 460 24',
                  'M 0 34 Q 115 28 230 20 T 460 30',
                  'M 0 38 Q 115 18 230 32 T 460 24',
                ]
              : 'M 0 38 Q 115 18 230 32 T 460 24',
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Secondary wave — offset rhythm */}
        <motion.path
          d="M 0 32 Q 115 42 230 26 T 460 38"
          stroke="#06b6d4"
          strokeOpacity={active ? 0.5 : 0.2}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: active
              ? [
                  'M 0 32 Q 115 42 230 26 T 460 38',
                  'M 0 36 Q 115 22 230 40 T 460 28',
                  'M 0 32 Q 115 42 230 26 T 460 38',
                ]
              : 'M 0 32 Q 115 42 230 26 T 460 38',
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Tertiary wave — subtle background */}
        <path
          d="M 0 28 Q 115 38 230 22 T 460 42"
          stroke="#0891b2"
          strokeOpacity={active ? 0.3 : 0.1}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default CardStrands;
