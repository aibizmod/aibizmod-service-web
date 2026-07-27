"use client";

/* eslint-disable @next/next/no-img-element */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThreeDMarqueeProps {
  images?: string[];
  className?: string;
}

const defaultImages = [
  "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=640&q=80",
];

const MARQUEE_ALT_MAP: Record<string, string> = {
  "1551434678-e076c223a692": "Web developers collaborating on a responsive desktop layout design at a computer workstation.",
  "1571171637578-41bc2dd41cd2": "Software engineers writing programming code and auditing system architectures in a development office.",
  "1512941937669-90a1b58e7e9c": "Hand holding a smartphone displaying a custom mobile application user interface.",
  "1460925895917-afdab827c52f": "Monitor displaying digital marketing analytics, keyword search data, and website traffic charts.",
  "1558494949-ef010cbdcc31": "Datacenter network servers representing cloud hosting infrastructure and secure database setups.",
  "1518770660439-4636190af475": "Microchip circuit board close-up representing hardware automation and system integration.",
  "1556761175-b413da4baf72": "Professionals collaborating in a workshop to optimize customer experience workflows.",
  "1552664730-d307ca884978": "Team whiteboard session mapping out IT strategy consulting goals and technology solutions.",
  "1519389950473-47ba0277781c": "Team meeting presenting software product metrics and analytics.",
  "1522071820081-009f0129c71c": "Software developers collaborating at a desk discussing user experience updates.",
  "1497366216548-37526070297c": "Modern workspace interior representing professional service environments.",
  "1497366754035-f200968a6e72": "Office conference room setup showcasing business strategy meeting workspace.",
  "1559136555-9303baea8ebd": "Team discussing project deliverables and schedule timelines in an office.",
  "1486406146926-c627a92ad1ab": "Modern commercial building exterior representing corporate hosting infrastructure.",
  "1504384308090-c894fdcc538d": "Operations center workspace with monitoring dashboards for system automation.",
  "1556761175-4b46a572b786": "Professional workshop session focused on business process improvement.",
};

function getMarqueeAlt(src: string): string {
  const match = src.match(/photo-([a-zA-Z0-9-]+)/);
  if (match && match[1]) {
    const id = match[1];
    if (MARQUEE_ALT_MAP[id]) {
      return MARQUEE_ALT_MAP[id];
    }
  }
  return "";
}

export default function ThreeDMarquee({
  images = defaultImages,
  className,
}: ThreeDMarqueeProps) {
  const chunkSize = Math.ceil(images.length / 3);
  const chunks = Array.from({ length: 3 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <div
      className={cn(
        "block h-[18rem] w-full overflow-hidden rounded-2xl bg-transparent max-xl:h-[16rem] max-sm:h-[13rem]",
        className
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div className="aspect-square size-[31rem] shrink-0 scale-[1.08] max-xl:size-[28rem] max-xl:scale-100 max-sm:size-[23rem] max-sm:scale-100">
          <div
            style={{ transform: "rotateX(45deg) rotateY(0deg) rotateZ(45deg)" }}
            className="relative right-[-42%] top-[-8%] grid size-full origin-top-left grid-cols-3 gap-3 [transform-style:preserve-3d] max-xl:right-[-38%] max-xl:top-[-12%] max-sm:right-[-38%] max-sm:top-[-5%] max-sm:gap-2"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.figure
                animate={{ y: colIndex % 2 === 0 ? 52 : -52 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                key={`${colIndex}-marquee`}
                className="flex flex-col items-start gap-3 max-sm:gap-2"
              >
                {subarray.map((src, imageIndex) => (
                  <div className="relative" key={`${imageIndex}-${src}`}>
                    <img
                      className="aspect-[4/3] h-full w-full select-none rounded-xl bg-neutral-100 object-cover shadow-[0_16px_36px_rgba(15,23,42,0.16)]"
                      src={src}
                      draggable={false}
                      alt={getMarqueeAlt(src)}
                      width={400}
                      height={300}
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
