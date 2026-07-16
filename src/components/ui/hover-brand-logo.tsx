import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const brands = [
  { id: 'spacelean',     name: 'Space Lean',    src: '/clients/spacelean.png',    website: 'https://spacelean.ai/' },
  { id: 'pmspace',       name: 'PMSpace AI',    src: '/clients/pmspace.png',       website: 'https://pmspace.ai/' },
  { id: 'spacecapture',  name: 'Space Capture', src: '/clients/spacecapture.png',  website: 'https://spacecapture.ai/' },
  { id: 'spacesign',     name: 'Space Sign',    src: '/clients/spacesign.png',    website: 'https://space-sign.ai/' },
  { id: 'spacehr',       name: 'Space HR',      src: '/clients/spacehr.png',      website: 'https://spacehr.net/' },
  { id: 'texastech',     name: 'TexasTech Services',    src: '/clients/texastech.svg',    website: 'https://texastechserv.com/' },
];

export default function HoverBrandLogo() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeBrand = brands.find(b => b.id === hoveredId);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes brandMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .brand-marquee-track {
          display: flex;
          width: max-content;
          animation: brandMarquee 10s linear infinite;
        }
        .brand-marquee-container:hover .brand-marquee-track {
          animation-play-state: paused;
        }
      ` }} />

      {/* Left: text */}
      <div className="flex-shrink-0 w-full lg:w-auto text-center lg:text-left mb-4 lg:mb-0">
        <p className="text-sm sm:text-base text-muted-foreground font-medium mb-1 tracking-tight">
          Used by
        </p>
        <div className="relative h-10 w-64 mx-auto lg:mx-0">
          <AnimatePresence mode="wait">
            <motion.p
              key={hoveredId ?? 'default'}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.16, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-2xl sm:text-3xl font-bold text-foreground leading-tight tracking-tight whitespace-nowrap"
            >
              {activeBrand?.name ?? 'Leading Companies'}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Right: auto-scrolling marquee slider */}
      <div 
        className="brand-marquee-container relative flex-grow overflow-hidden w-full lg:max-w-[70%] py-2"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
        }}
      >
        <div className="brand-marquee-track gap-4">
          {/* Render twice for infinite loop */}
          {[...brands, ...brands].map(({ id, name, src, website }, index) => {
            const isActive = hoveredId === id;
            return (
              <a
                key={`${id}-${index}`}
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className={[
                  'flex items-center justify-center h-20 w-44 px-4 rounded-2xl border transition-all duration-300 bg-white/85 backdrop-blur-sm shrink-0 focus:outline-none outline-none',
                  isActive
                    ? 'border-slate-300 shadow-[0_6px_16px_rgba(15,23,42,0.04)] scale-[1.03] opacity-100'
                    : 'border-slate-100/50 opacity-90 hover:opacity-100 hover:scale-[1.01] hover:border-slate-200',
                ].join(' ')}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Image
                  src={src}
                  alt={name}
                  fill
                  className="!relative !h-full !w-full object-contain max-h-[60px] transition-all duration-300"
                />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
