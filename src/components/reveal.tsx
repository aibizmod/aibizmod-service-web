'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type RevealVariant =
  | 'fade-up'
  | 'scale'
  | 'clip-up'
  | 'flip-in'
  | 'slide-left'
  | 'slide-right'
  | 'stagger-children';

interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const customEasing = [0.25, 0.46, 0.45, 0.94] as const;

export function Reveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.7,
  className = '',
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    }
  }, []);

  const getVariants = () => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      };
    }

    switch (variant) {
      case 'fade-up':
        return {
          hidden: { opacity: 0, y: 36 },
          visible: { opacity: 1, y: 0 },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.88 },
          visible: { opacity: 1, scale: 1 },
        };
      case 'clip-up':
        return {
          hidden: { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)', y: 20 },
          visible: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', y: 0 },
        };
      case 'flip-in':
        return {
          hidden: { opacity: 0, rotateY: 45, y: 24 },
          visible: { opacity: 1, rotateY: 0, y: 0 },
        };
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        };
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 },
        };
      case 'stagger-children':
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: delay,
            },
          },
        };
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration: prefersReducedMotion ? 0.01 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: customEasing,
      }}
      className={`will-change-transform ${className}`}
      style={variant === 'flip-in' ? { perspective: 1000 } : undefined}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- WORDS REVEAL ---------------- */
interface WordsRevealProps {
  text: string;
  delay?: number;
  className?: string;
  accentWord?: string;
}

export function WordsReveal({
  text,
  delay = 0,
  className = '',
  accentWord,
}: WordsRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: customEasing,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
    >
      {words.map((word, i) => {
        const isAccent = accentWord && word.toLowerCase().includes(accentWord.toLowerCase());

        return (
          <motion.span
            key={i}
            variants={wordVariants}
            className={`inline-block ${
              isAccent ? 'font-display italic text-[#0891b2]' : ''
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

export default Reveal;
