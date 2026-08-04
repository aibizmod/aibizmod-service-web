'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export type Stage3DVariant = 'slices' | 'grid' | 'stack' | 'cross' | 'orbit' | 'prism';
export type GeometryVariant = Stage3DVariant;

interface IconHover3DProps {
  variant?: Stage3DVariant;
  iconSize?: number;
  centered?: boolean;
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const tweenTransition = {
  type: 'tween' as const,
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

const smoothDeactivate = {
  type: 'tween' as const,
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

/* ------------ shared cube-face style builder ------------ */
const face = (
  w: number,
  h: number,
  border: string,
  bg: string,
): React.CSSProperties => ({
  position: 'absolute',
  width: `${w}px`,
  height: `${h}px`,
  border: `3px solid ${border}`,
  backgroundColor: bg,
  backfaceVisibility: 'hidden',
  transition: 'border-color 0.7s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
});

/* ======================================================= */
/*  PUBLIC COMPONENT                                        */
/* ======================================================= */

export const IconHover3D: React.FC<IconHover3DProps> = ({
  variant = 'slices',
  iconSize = 150,
  centered = true,
  active = false,
  className = '',
  style = {},
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = active || isHovered;

  const sizePx = `${iconSize}px`;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: sizePx,
        height: sizePx,
        perspective: '1200px',
        ...style,
      }}
      className={`relative select-none ${centered ? 'mx-auto flex items-center justify-center' : 'inline-block'} ${className}`}
    >
      {/* Container that houses the icon + corner brackets */}
      <div className="relative w-[120px] h-[120px] flex items-center justify-center">
        {/* Corner Brackets — expand outward on active */}
        <CornerBracket pos="tl" active={isActive} />
        <CornerBracket pos="bl" active={isActive} />
        <CornerBracket pos="br" active={isActive} />
        <CornerBracket pos="tr" active={isActive} />

        {/* 3D Icon Area — border box container */}
        <div
          className="relative flex items-center justify-center overflow-visible"
          style={{
            width: '100px',
            height: '100px',
            border: `1px solid ${isActive ? 'rgba(8,145,178,0.35)' : 'rgba(15,23,42,0.12)'}`,
            transition: 'border-color 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* BG Container — scaled-down 3D stage */}
          <motion.div
            className="absolute"
            style={{
              width: '340px',
              height: '340px',
              overflow: 'visible',
              transformStyle: 'preserve-3d',
            }}
            animate={{
              scale: isActive ? 0.32 : 0.28,
              y: isActive ? [0, -6, 0, 4, 0] : 0,
            }}
            transition={
              isActive
                ? {
                    scale: tweenTransition,
                    y: {
                      duration: 3.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }
                : smoothDeactivate
            }
          >
            {/* The 3D geometry itself */}
            <motion.div
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transformStyle: 'preserve-3d',
                transformPerspective: 1200,
              }}
              animate={
                isActive
                  ? {
                      rotateX: [-28, -22, -32, -26, -28],
                      rotateY: [-43, -35, -48, -38, -43],
                      rotate: [49, 53, 46, 51, 49],
                      scale: [1.1, 1.14, 1.08, 1.12, 1.1],
                    }
                  : {
                      rotateX: 23,
                      rotateY: 33,
                      rotate: 49,
                      scale: 0.7,
                    }
              }
              transition={
                isActive
                  ? {
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  : smoothDeactivate
              }
            >
              {variant === 'slices' && <SlicesGeometry active={isActive} />}
              {variant === 'grid' && <GridGeometry active={isActive} />}
              {variant === 'stack' && <StackGeometry active={isActive} />}
              {variant === 'cross' && <CrossGeometry active={isActive} />}
              {variant === 'orbit' && <OrbitGeometry active={isActive} />}
              {variant === 'prism' && <PrismGeometry active={isActive} />}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* ======================================================= */
/*  CORNER BRACKET                                          */
/* ======================================================= */

function CornerBracket({ pos, active }: { pos: 'tl' | 'tr' | 'bl' | 'br'; active: boolean }) {
  const color = active ? '#22d3ee' : '#0f172a';
  const size = '20px';

  const posProps: Record<string, Record<string, string>> = {
    tl: { left: active ? '-8px' : '6px', top: active ? '-8px' : '6px' },
    tr: { right: active ? '-8px' : '6px', top: active ? '-8px' : '6px' },
    bl: { left: active ? '-8px' : '6px', bottom: active ? '-8px' : '6px' },
    br: { right: active ? '-8px' : '6px', bottom: active ? '-8px' : '6px' },
  };

  const borderStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderLeft: (pos === 'tl' || pos === 'bl') ? `3px solid ${color}` : 'none',
    borderRight: (pos === 'tr' || pos === 'br') ? `3px solid ${color}` : 'none',
    borderTop: (pos === 'tl' || pos === 'tr') ? `3px solid ${color}` : 'none',
    borderBottom: (pos === 'bl' || pos === 'br') ? `3px solid ${color}` : 'none',
    transition: 'border-color 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  return (
    <motion.div
      className="absolute z-10"
      animate={{
        ...posProps[pos],
        scale: active ? 1.5 : 1,
      }}
      transition={tweenTransition}
      style={borderStyle}
    />
  );
}

/* ======================================================= */
/*  SHARED: Single 3D Slab (a rectangular solid)            */
/* ======================================================= */

interface SlabProps {
  w: number;    // front face width
  h: number;    // front face height
  d: number;    // depth
  color: string;
  bg: string;
}

/** A single 3D rectangular prism built from 6 CSS faces */
function Slab({ w, h, d, color, bg }: SlabProps) {
  const hw = w / 2;
  const hh = h / 2;
  const hd = d / 2;

  return (
    <div
      style={{
        position: 'relative',
        width: `${w}px`,
        height: `${h}px`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Front */}
      <div style={{ ...face(w, h, color, bg), transform: `translateZ(${hd}px)` }} />
      {/* Back */}
      <div style={{ ...face(w, h, color, bg), transform: `translateZ(${-hd}px) rotateY(180deg)` }} />
      {/* Right */}
      <div
        style={{
          ...face(d, h, color, bg),
          left: `${hw - hd}px`,
          transform: `translateX(${hw - hd}px) rotateY(90deg)`,
        }}
      />
      {/* Left */}
      <div
        style={{
          ...face(d, h, color, bg),
          right: `${hw - hd}px`,
          transform: `translateX(${-(hw - hd)}px) rotateY(-90deg)`,
        }}
      />
      {/* Top */}
      <div
        style={{
          position: 'absolute',
          width: `${w}px`,
          height: `${d}px`,
          border: `3px solid ${color}`,
          backgroundColor: bg,
          top: `${-hd + hh - hd}px`,
          transform: `translateY(${-(hh - hd)}px) rotateX(90deg)`,
        }}
      />
      {/* Bottom */}
      <div
        style={{
          position: 'absolute',
          width: `${w}px`,
          height: `${d}px`,
          border: `3px solid ${color}`,
          backgroundColor: bg,
          bottom: `${-hd + hh - hd}px`,
          transform: `translateY(${hh - hd}px) rotateX(-90deg)`,
        }}
      />
    </div>
  );
}

/* ======================================================= */
/*  1. SLICES — Three horizontal slabs stacked (book stack) */
/*     Signature: Flat pages splitting apart vertically      */
/* ======================================================= */

function SlicesGeometry({ active }: { active: boolean }) {
  const color = active ? '#22d3ee' : '#0f172a';
  const bg = active ? 'rgba(8,145,178,0.12)' : 'white';

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        transformStyle: 'preserve-3d',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: active ? '28px' : '4px',
        transition: 'gap 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <Slab w={240} h={34} d={240} color={color} bg={bg} />
      <Slab w={240} h={34} d={240} color={color} bg={bg} />
      <Slab w={240} h={34} d={240} color={color} bg={bg} />
    </div>
  );
}

/* ======================================================= */
/*  2. GRID — 2×2 mini-cube matrix                          */
/*     Signature: Four small cubes in a grid pattern         */
/* ======================================================= */

function GridGeometry({ active }: { active: boolean }) {
  const color = active ? '#22d3ee' : '#0f172a';
  const bg = active ? 'rgba(8,145,178,0.12)' : 'white';
  const gap = active ? 40 : 8;
  const cubeSize = 100;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        transformStyle: 'preserve-3d',
        display: 'grid',
        gridTemplateColumns: `${cubeSize}px ${cubeSize}px`,
        gridTemplateRows: `${cubeSize}px ${cubeSize}px`,
        gap: `${gap}px`,
        transition: 'gap 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <Slab w={cubeSize} h={cubeSize} d={cubeSize} color={color} bg={bg} />
      <Slab w={cubeSize} h={cubeSize} d={cubeSize} color={color} bg={bg} />
      <Slab w={cubeSize} h={cubeSize} d={cubeSize} color={color} bg={bg} />
      <Slab w={cubeSize} h={cubeSize} d={cubeSize} color={color} bg={bg} />
    </div>
  );
}

/* ======================================================= */
/*  3. STACK — Fanned cards at progressive angles            */
/*     Signature: Layered cards fanning like a dealt hand    */
/* ======================================================= */

function StackGeometry({ active }: { active: boolean }) {
  const color = active ? '#22d3ee' : '#0f172a';
  const bg = active ? 'rgba(8,145,178,0.12)' : 'white';
  const angles = active ? [-18, -6, 6, 18] : [-3, -1, 1, 3];

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        transformStyle: 'preserve-3d',
      }}
    >
      {angles.map((angle, i) => (
        <div
          key={i}
          style={{
            position: i === 0 ? 'relative' : 'absolute',
            left: i === 0 ? undefined : '50%',
            top: i === 0 ? undefined : '50%',
            transform: i === 0
              ? `rotateZ(${angle}deg)`
              : `translate(-50%, -50%) rotateZ(${angle}deg) translateZ(${i * (active ? 22 : 6)}px)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Slab w={220} h={160} d={20} color={color} bg={bg} />
        </div>
      ))}
    </div>
  );
}

/* ======================================================= */
/*  4. CROSS — Interlocking L-beams                          */
/*     Signature: Two tall + short beams crossing at 90°     */
/* ======================================================= */

function CrossGeometry({ active }: { active: boolean }) {
  const color = active ? '#22d3ee' : '#0f172a';
  const bg = active ? 'rgba(8,145,178,0.12)' : 'white';

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Vertical beam */}
      <div style={{ transformStyle: 'preserve-3d' }}>
        <Slab w={60} h={260} d={60} color={color} bg={bg} />
      </div>
      {/* Horizontal beam crossing */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) rotateZ(90deg) translateY(${active ? '50px' : '0px'})`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Slab w={60} h={260} d={60} color={color} bg={bg} />
      </div>
      {/* Small accent cube at intersection */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) translateZ(${active ? '40px' : '0px'})`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Slab w={80} h={80} d={80} color={color} bg={active ? 'rgba(8,145,178,0.15)' : 'white'} />
      </div>
    </div>
  );
}

/* ======================================================= */
/*  5. ORBIT — Central cube with intersecting ring planes    */
/*     Signature: Nucleus with tilted orbital rings           */
/* ======================================================= */

function OrbitGeometry({ active }: { active: boolean }) {
  const color = active ? '#22d3ee' : '#0f172a';
  const bg = active ? 'rgba(8,145,178,0.12)' : 'white';

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Central solid cube — the nucleus */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          transformStyle: 'preserve-3d',
        }}
      >
        <Slab w={90} h={90} d={90} color={color} bg={bg} />
      </div>
      {/* Ring plane 1 — tilted XZ */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) rotateX(${active ? '75deg' : '50deg'}) rotateZ(${active ? '25deg' : '0deg'})`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Slab w={260} h={14} d={260} color={color} bg="transparent" />
      </div>
      {/* Ring plane 2 — tilted opposite */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) rotateY(${active ? '75deg' : '50deg'}) rotateZ(${active ? '-25deg' : '0deg'})`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Slab w={260} h={14} d={260} color={color} bg="transparent" />
      </div>
    </div>
  );
}

/* ======================================================= */
/*  6. PRISM — Stepped staircase / ziggurat                  */
/*     Signature: Three blocks ascending in size             */
/* ======================================================= */

function PrismGeometry({ active }: { active: boolean }) {
  const color = active ? '#22d3ee' : '#0f172a';
  const bg = active ? 'rgba(8,145,178,0.12)' : 'white';

  const steps = [
    { w: 80,  h: 70, offset: active ? -80 : -50, z: active ? 50 : 0 },
    { w: 150, h: 70, offset: active ? 0 : 0,      z: active ? 25 : 0 },
    { w: 240, h: 70, offset: active ? 80 : 50,     z: 0 },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        transformStyle: 'preserve-3d',
      }}
    >
      {steps.map((step, i) => (
        <div
          key={i}
          style={{
            position: i === 0 ? 'relative' : 'absolute',
            left: i === 0 ? undefined : '50%',
            top: i === 0 ? undefined : '50%',
            transform: i === 0
              ? `translateY(${step.offset}px) translateZ(${step.z}px)`
              : `translate(-50%, -50%) translateY(${step.offset}px) translateZ(${step.z}px)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Slab w={step.w} h={step.h} d={step.w} color={color} bg={bg} />
        </div>
      ))}
    </div>
  );
}

export default IconHover3D;
