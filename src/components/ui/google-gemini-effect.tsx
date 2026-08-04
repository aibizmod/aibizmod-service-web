"use client";
import { cn } from "@/lib/utils";
import React, { useState, FormEvent, useEffect, useRef } from "react";
import { ArrowRight, Search } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { TextShimmer } from "@/components/ui/text-shimmer";

const services = [
  "AI & Automation",
  "Digital Marketing",
  "Web Development",
  "Custom Software",
  "Mobile Apps",
  "Hosting & Infrastructure",
  "Customer Experience",
  "IT Consulting",
];

type GoogleGeminiEffectProps = {
  className?: string;
  compact?: boolean;
  initialDomain?: string;
  onSubmit?: (domain: string) => void | Promise<void>;
  submitLabel?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  showIntro?: boolean;
  showPrompt?: boolean;
  placeholder?: string;
  contentClassName?: string;
  cardClassName?: string;
};

const strandsConfig = [
  {
    d: "M0 663C145.5 663 191 666.265 269 647C326.5 630 339.5 621 397.5 566C439 531.5 455 529.5 490 523C509.664 519.348 521 503.736 538 504.236C553.591 504.236 562.429 514.739 584.66 522.749C592.042 525.408 600.2 526.237 607.356 523.019C624.755 515.195 641.446 496.324 657 496.735C673.408 496.735 693.545 519.572 712.903 526.769C718.727 528.934 725.184 528.395 730.902 525.965C751.726 517.115 764.085 497.106 782 496.735C794.831 496.47 804.103 508.859 822.469 518.515C835.13 525.171 850.214 526.815 862.827 520.069C875.952 513.049 889.748 502.706 903.5 503.736C922.677 505.171 935.293 510.562 945.817 515.673C954.234 519.76 963.095 522.792 972.199 524.954C996.012 530.611 1007.42 534.118 1034 549C1077.5 573.359 1082.5 594.5 1140 629C1206 670 1328.5 662.5 1440 662.5",
    gradientUrl: "url(#cyan-blue-grad-1)",
    multiplier: 0.4,
  },
  {
    d: "M0 587.5C147 587.5 277 587.5 310 573.5C348 563 392.5 543.5 408 535C434 523.5 426 526.235 479 515.235C494 512.729 523 510.435 534.5 512.735C554.5 516.735 555.5 523.235 576 523.735C592 523.735 616 496.735 633 497.235C648.671 497.235 661.31 515.052 684.774 524.942C692.004 527.989 700.2 528.738 707.349 525.505C724.886 517.575 741.932 498.33 757.5 498.742C773.864 498.742 791.711 520.623 810.403 527.654C816.218 529.841 822.661 529.246 828.451 526.991C849.246 518.893 861.599 502.112 879.5 501.742C886.47 501.597 896.865 506.047 907.429 510.911C930.879 521.707 957.139 519.639 982.951 520.063C1020.91 520.686 1037.5 530.797 1056.5 537C1102.24 556.627 1116.5 570.704 1180.5 579.235C1257.5 589.5 1279 587 1440 588",
    gradientUrl: "url(#cyan-blue-grad-2)",
    multiplier: 0.7,
  },
  {
    d: "M0 514C147.5 514.333 294.5 513.735 380.5 513.735C405.976 514.94 422.849 515.228 436.37 515.123C477.503 514.803 518.631 506.605 559.508 511.197C564.04 511.706 569.162 512.524 575 513.735C588 516.433 616 521.702 627.5 519.402C647.5 515.402 659 499.235 680.5 499.235C700.5 499.235 725 529.235 742 528.735C757.654 528.735 768.77 510.583 791.793 500.59C798.991 497.465 807.16 496.777 814.423 499.745C832.335 507.064 850.418 524.648 866 524.235C882.791 524.235 902.316 509.786 921.814 505.392C926.856 504.255 932.097 504.674 937.176 505.631C966.993 511.248 970.679 514.346 989.5 514.735C1006.3 515.083 1036.5 513.235 1055.5 513.235C1114.5 513.235 1090.5 513.235 1124 513.235C1177.5 513.235 1178.99 514.402 1241 514.402C1317.5 514.402 1274.5 512.568 1440 513.235",
    gradientUrl: "url(#cyan-blue-grad-3)",
    multiplier: 1.0,
  },
  {
    d: "M0 438.5C150.5 438.5 261 438.318 323.5 456.5C351 464.5 387.517 484.001 423.5 494.5C447.371 501.465 472 503.735 487 507.735C503.786 512.212 504.5 516.808 523 518.735C547 521.235 564.814 501.235 584.5 501.235C604.5 501.235 626 529.069 643 528.569C658.676 528.569 672.076 511.63 695.751 501.972C703.017 499.008 711.231 498.208 718.298 501.617C735.448 509.889 751.454 529.98 767 529.569C783.364 529.569 801.211 507.687 819.903 500.657C825.718 498.469 832.141 499.104 837.992 501.194C859.178 508.764 873.089 523.365 891 523.735C907.8 524.083 923 504.235 963 506.735C1034.5 506.735 1047.5 492.68 1071 481.5C1122.5 457 1142.23 452.871 1185 446.5C1255.5 436 1294 439 1439.5 439",
    gradientUrl: "url(#cyan-blue-grad-4)",
    multiplier: 1.3,
  },
  {
    d: "M0.5 364C145.288 362.349 195 361.5 265.5 378C322 391.223 399.182 457.5 411 467.5C424.176 478.649 456.916 491.677 496.259 502.699C498.746 503.396 501.16 504.304 503.511 505.374C517.104 511.558 541.149 520.911 551.5 521.236C571.5 521.236 590 498.736 611.5 498.736C631.5 498.736 652.5 529.236 669.5 528.736C685.171 528.736 697.81 510.924 721.274 501.036C728.505 497.988 736.716 497.231 743.812 500.579C761.362 508.857 778.421 529.148 794 528.736C810.375 528.736 829.35 508.68 848.364 502.179C854.243 500.169 860.624 500.802 866.535 502.718C886.961 509.338 898.141 519.866 916 520.236C932.8 520.583 934.5 510.236 967.5 501.736C1011.5 491 1007.5 493.5 1029.5 480C1069.5 453.5 1072 440.442 1128.5 403.5C1180.5 369.5 1275 360.374 1439 364",
    gradientUrl: "url(#cyan-blue-grad-5)",
    multiplier: 1.6,
  },
];



const renderTitle = (titleText: string) => {
  if (titleText.includes("Your Brand.")) {
    const parts = titleText.split("Your Brand.");
    return (
      <>
        {parts[0]}
        <TextShimmer
          as="span"
          duration={2.2}
          className="italic font-serif [--base-color:theme(colors.cyan.600)] [--base-gradient-color:#ffffff] dark:[--base-color:theme(colors.cyan.400)] dark:[--base-gradient-color:#ffffff]"
        >
          Your Brand.
        </TextShimmer>
        {parts[1]}
      </>
    );
  }
  return titleText;
};

export const GoogleGeminiEffect = ({
  className,
  compact = false,
  initialDomain = "",
  onSubmit,
  submitLabel = "Check AI Visibility",
  eyebrow = "AI VISIBILITY AUDIT FOR DIGITAL MARKETING",
  title = "See How AI Sees Your Brand.",
  description = "Audit how ChatGPT, Perplexity, Gemini, and Claude describe, cite, and rank your business — then close the gap before your competitors do.",
  showIntro = true,
  showPrompt = true,
  contentClassName,
  cardClassName,
}: GoogleGeminiEffectProps) => {
  const [domain, setDomain] = useState(initialDomain);
  const [isFocused, setIsFocused] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; strandIndex: number }[]>([]);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState("");

  useEffect(() => {
    if (isFocused) return;
    const domains = ["stripe.com", "airbnb.com", "apple.com", "vercel.com", "figma.com"];
    let currentIdx = 0;
    let initialTypeComplete = false;
    let currentStr = ""; 
    let isDeleting = false;
    let speed = 100;
    let timerId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!initialTypeComplete) {
        const fullTarget = "Enter your website — e.g. " + domains[0];
        currentStr = fullTarget.substring(0, currentStr.length + 1);
        setPlaceholderText(currentStr);
        speed = 50;

        if (currentStr === fullTarget) {
          initialTypeComplete = true;
          isDeleting = true;
          currentStr = domains[0];
          speed = 2500;
        }
      } else {
        const fullWord = domains[currentIdx];
        if (isDeleting) {
          currentStr = fullWord.substring(0, currentStr.length - 1);
          speed = 40;
        } else {
          currentStr = fullWord.substring(0, currentStr.length + 1);
          speed = 95;
        }

        setPlaceholderText("Enter your website — e.g. " + currentStr);

        if (!isDeleting && currentStr === fullWord) {
          isDeleting = true;
          speed = 2000;
        } else if (isDeleting && currentStr === "") {
          isDeleting = false;
          currentIdx = (currentIdx + 1) % domains.length;
          speed = 400;
        }
      }

      timerId = setTimeout(tick, speed);
    };

    timerId = setTimeout(tick, 1000);
    return () => clearTimeout(timerId);
  }, [isFocused]);

  useEffect(() => {
    const interval = setInterval(() => {
      setServiceIndex((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDomain(initialDomain);
  }, [initialDomain]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanedDomain = domain.trim();
    if (!cleanedDomain) return;

    if (onSubmit) {
      void onSubmit(cleanedDomain);
      return;
    }

    window.sessionStorage.setItem("pending-audit-domain", cleanedDomain);
    window.location.assign("/ai-visibility-audit-report");
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const strandsY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden bg-white", className)}
    >
      {/* Background Strands Layer (z-0) with scroll parallax */}
      <motion.div style={{ y: strandsY }} className="absolute inset-0 z-0">
        <svg
          width="1440"
          height="890"
          viewBox="0 0 1440 890"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="cyan-blue-grad-1" x1="0%" y1="0%" x2="100%" y2="40%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="cyan-blue-grad-2" x1="0%" y1="0%" x2="100%" y2="40%">
              <stop offset="0%" stopColor="#0891B2" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
            <linearGradient id="cyan-blue-grad-3" x1="0%" y1="0%" x2="100%" y2="40%">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="cyan-blue-grad-4" x1="0%" y1="0%" x2="100%" y2="40%">
              <stop offset="0%" stopColor="#0891B2" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="cyan-blue-grad-5" x1="0%" y1="0%" x2="100%" y2="40%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <filter id="cyan-glow-filter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {strandsConfig.map((strand, index) => {
            return (
              <motion.g
                key={index}
                animate={{
                  x: [0, 30, 0, -30, 0],
                  y: [-15, 0, 15, 0, -15],
                  scaleY: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 9 + index * 2.5, // Constant slow, elegant drift
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.45,
                }}
                style={{
                  transformOrigin: "center",
                }}
              >
                {/* Faint base path to show structural strand layout */}
                <motion.path
                  d={strand.d}
                  stroke={strand.gradientUrl}
                  strokeWidth="1.0"
                  fill="none"
                  initial={{ opacity: 0.22 }}
                  animate={{
                    opacity: 0.22,
                  }}
                />
                {/* Glowing, breathing outer-glow path */}
                <motion.path
                  d={strand.d}
                  stroke={strand.gradientUrl}
                  strokeWidth="2.2"
                  fill="none"
                  filter="url(#cyan-glow-filter)"
                  initial={{ opacity: 0.12 }}
                  animate={{
                    opacity: [0.12, 0.48, 0.12], // Constant soft, breathing glow
                  }}
                  transition={{
                    duration: 7 + index * 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.45,
                  }}
                />
                {/* Dynamically spawned keystroke comets traveling to the edges */}
                {ripples.map((ripple) => {
                  // Rendering optimization: Only draw comets on the single assigned strand for this keypress
                  if (ripple.strandIndex !== index) return null;
                  return (
                    <React.Fragment key={ripple.id}>
                      {/* Left-traveling comet */}
                      <motion.path
                        d={strand.d}
                        stroke={strand.gradientUrl}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray="100, 1600"
                        initial={{ strokeDashoffset: 800, opacity: 0.75 }}
                        animate={{
                          strokeDashoffset: [800, 1600],
                          opacity: [0.75, 0.75, 0],
                        }}
                        transition={{
                          duration: 0.9,
                          ease: "easeOut",
                        }}
                      />
                      {/* Right-traveling comet */}
                      <motion.path
                        d={strand.d}
                        stroke={strand.gradientUrl}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray="100, 1600"
                        initial={{ strokeDashoffset: 800, opacity: 0.75 }}
                        animate={{
                          strokeDashoffset: [800, 0],
                          opacity: [0.75, 0.75, 0],
                        }}
                        transition={{
                          duration: 0.95, // Consistent snappy zip
                          ease: "easeOut",
                        }}
                      />
                    </React.Fragment>
                  );
                })}
              </motion.g>
            );
          })}
        </svg>
      </motion.div>

      {/* Main Content Layer (z-10) with scroll parallax */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className={cn("relative z-10 flex h-full flex-col justify-center px-5 py-10 sm:px-6 lg:px-8", contentClassName)}
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          {showIntro && (
            <>
              {/* Top Pill Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/40 px-4 py-1.5 text-[11px] font-medium tracking-wider uppercase text-slate-500 shadow-sm backdrop-blur-sm mb-6">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Tracking Across:
                <span className="font-semibold text-slate-700">ChatGPT</span>
                <span className="text-slate-400">•</span>
                <span className="font-semibold text-slate-700">Perplexity</span>
                <span className="text-slate-400">•</span>
                <span className="font-semibold text-slate-700">Gemini</span>
                <span className="text-slate-400">•</span>
                <span className="font-semibold text-slate-700">Claude</span>
              </div>

              {/* Headline */}
              <h1
                className="max-w-4xl font-display font-medium text-slate-900"
                style={{ fontSize: "clamp(36px, 5.2vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
              >
                {renderTitle(title)}
              </h1>

              {/* Dynamic Service Tagline */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-sm font-medium text-slate-600 sm:text-base">
                <span>A Team Behind Visibility, Product, And Growth In</span>
                <span className="relative inline-block h-[22px] overflow-hidden text-left min-w-[210px] sm:h-6">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={services[serviceIndex]}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="absolute left-0 top-0 font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
                    >
                      {services[serviceIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>

              {/* Eyebrow / Sub-headline */}
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                {eyebrow}
              </p>

              {/* Description */}
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-[15px]">
                {description}
              </p>
            </>
          )}

          {!showIntro && (
            <div
              className={cn(
                "max-w-2xl rounded-2xl border border-white/60 bg-white/70 px-5 text-center shadow-[0_10px_35px_rgba(15,23,42,0.08)] backdrop-blur transition-all duration-500 overflow-hidden",
                showPrompt ? "mb-6 py-4 opacity-100 max-h-[260px]" : "mb-0 py-0 opacity-0 max-h-0"
              )}
            >
              <div className={cn(showPrompt ? "block" : "hidden")}> 
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
                  Why not list the AI search engines about your business?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  See how ChatGPT, Gemini, Claude, and Perplexity describe your brand and where you can improve.
                </p>
              </div>
            </div>
          )}

          <div
            className={cn(
              "mt-8 w-full max-w-2xl px-4 transition-all duration-700",
              cardClassName,
            )}
            style={{ animation: compact ? "fadeUp 700ms ease-out both" : undefined }}
          >
            {/* Search Capsule Bar */}
            {/* Search Capsule Bar with Breathing Glow */}
            <motion.form
              id="hero-audit-form"
              onSubmit={handleSubmit}
              className={cn(
                "group relative flex w-full items-center rounded-full border p-1.5 backdrop-blur-md transition-all duration-500",
                isFocused 
                  ? "border-cyan-400/80 bg-white" 
                  : "border-cyan-400/40 bg-white/95"
              )}
              animate={isFocused ? {
                boxShadow: "0 20px 45px rgba(6, 182, 212, 0.2), 0 0 0 1px rgba(6, 182, 212, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.6)"
              } : {
                boxShadow: [
                  "0 10px 35px rgba(8, 145, 178, 0.08), 0 0 0 0px rgba(6, 182, 212, 0), inset 0 1px 2px rgba(255, 255, 255, 0.4)",
                  "0 15px 45px rgba(8, 145, 178, 0.22), 0 0 14px 2px rgba(6, 182, 212, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.5)",
                  "0 10px 35px rgba(8, 145, 178, 0.08), 0 0 0 0px rgba(6, 182, 212, 0), inset 0 1px 2px rgba(255, 255, 255, 0.4)"
                ]
              }}
              transition={isFocused ? {
                duration: 0.3
              } : {
                duration: 4.0,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="pointer-events-none absolute left-5 flex items-center text-slate-400 transition-colors group-focus-within:text-cyan-500">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={domain}
                onChange={(e) => {
                  setDomain(e.target.value);
                  const newId = Date.now() + Math.random();
                  const strandIndex = Math.floor(Math.random() * 5); // Target a single random strand
                  setRipples((prev) => [...prev, { id: newId, strandIndex }].slice(-5));
                  setTimeout(() => {
                    setRipples((prev) => prev.filter((r) => r.id !== newId));
                  }, 1500); // Shorter cleanup time matches the 0.95s animation duration
                }}
                placeholder={placeholderText}
                className="h-11 w-full bg-transparent pl-11 pr-4 text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder:text-slate-400"
                aria-label="Domain to audit"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <button
                type="submit"
                className="h-11 rounded-full bg-cyan-600 px-6 font-sans text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-cyan-500 active:scale-98 transition-all flex items-center justify-center gap-1.5 shrink-0"
              >
                {submitLabel}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </motion.form>

            {/* Bottom Verification Badges */}
            <div className="mt-4 flex flex-wrap justify-center gap-6 text-[12px] font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="text-cyan-500 font-bold">✓</span> No signup required
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-cyan-500 font-bold">✓</span> Takes ~30 seconds
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-cyan-500 font-bold">✓</span> Free
              </span>
            </div>
          </div>
        </div>
      </motion.div>

    </div>

  );
};

