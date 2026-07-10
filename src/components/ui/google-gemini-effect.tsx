"use client";
import { cn } from "@/lib/utils";
import { motion, MotionValue } from "framer-motion";
import React, { useState, FormEvent, useEffect } from "react";
import { ArrowRight, Search, CheckCircle, Activity, Sparkles } from "lucide-react";
import { SiClaude, SiGooglegemini, SiPerplexity, SiJavascript, SiMongodb, SiTypescript, SiReact, SiNodedotjs } from "react-icons/si";
import AnimatedText from "@/components/ui/animated-text";
import { StarButton } from "@/components/ui/star-button";

const OpenAIIcon = ({ size = 20, color = "#10A37F" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v3.005l-2.607 1.5-2.602-1.5z"/>
  </svg>
);

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

const transition = {
  duration: 0,
  ease: "linear" as const,
};

export const GoogleGeminiEffect = ({
  pathLengths,
  className,
}: {
  pathLengths: MotionValue[];
  className?: string;
}) => {
  const [domain, setDomain] = useState("");
  const [serviceIndex, setServiceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setServiceIndex((i) => (i + 1) % services.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!domain.trim()) return;
    window.open(`/ai-visibility-audit-report?domain=${encodeURIComponent(domain.trim())}`, "_blank");
  };

  return (
    <div className={cn("relative", className)}>
      {/* ── SVG Lines Background ──────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
        <svg
          width="1440"
          height="890"
          viewBox="0 0 1440 890"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <motion.path
            d="M0 663C145.5 663 191 666.265 269 647C326.5 630 339.5 621 397.5 566C439 531.5 455 529.5 490 523C509.664 519.348 521 503.736 538 504.236C553.591 504.236 562.429 514.739 584.66 522.749C592.042 525.408 600.2 526.237 607.356 523.019C624.755 515.195 641.446 496.324 657 496.735C673.408 496.735 693.545 519.572 712.903 526.769C718.727 528.934 725.184 528.395 730.902 525.965C751.726 517.115 764.085 497.106 782 496.735C794.831 496.47 804.103 508.859 822.469 518.515C835.13 525.171 850.214 526.815 862.827 520.069C875.952 513.049 889.748 502.706 903.5 503.736C922.677 505.171 935.293 510.562 945.817 515.673C954.234 519.76 963.095 522.792 972.199 524.954C996.012 530.611 1007.42 534.118 1034 549C1077.5 573.359 1082.5 594.5 1140 629C1206 670 1328.5 662.5 1440 662.5"
            stroke="#FFB7C5" strokeWidth="2" fill="none"
            initial={{ pathLength: 0 }} style={{ pathLength: pathLengths[0] }} transition={transition}
          />
          <motion.path
            d="M0 587.5C147 587.5 277 587.5 310 573.5C348 563 392.5 543.5 408 535C434 523.5 426 526.235 479 515.235C494 512.729 523 510.435 534.5 512.735C554.5 516.735 555.5 523.235 576 523.735C592 523.735 616 496.735 633 497.235C648.671 497.235 661.31 515.052 684.774 524.942C692.004 527.989 700.2 528.738 707.349 525.505C724.886 517.575 741.932 498.33 757.5 498.742C773.864 498.742 791.711 520.623 810.403 527.654C816.218 529.841 822.661 529.246 828.451 526.991C849.246 518.893 861.599 502.112 879.5 501.742C886.47 501.597 896.865 506.047 907.429 510.911C930.879 521.707 957.139 519.639 982.951 520.063C1020.91 520.686 1037.5 530.797 1056.5 537C1102.24 556.627 1116.5 570.704 1180.5 579.235C1257.5 589.5 1279 587 1440 588"
            stroke="#FFDDB7" strokeWidth="2" fill="none"
            initial={{ pathLength: 0 }} style={{ pathLength: pathLengths[1] }} transition={transition}
          />
          <motion.path
            d="M0 514C147.5 514.333 294.5 513.735 380.5 513.735C405.976 514.94 422.849 515.228 436.37 515.123C477.503 514.803 518.631 506.605 559.508 511.197C564.04 511.706 569.162 512.524 575 513.735C588 516.433 616 521.702 627.5 519.402C647.5 515.402 659 499.235 680.5 499.235C700.5 499.235 725 529.235 742 528.735C757.654 528.735 768.77 510.583 791.793 500.59C798.991 497.465 807.16 496.777 814.423 499.745C832.335 507.064 850.418 524.648 866 524.235C882.791 524.235 902.316 509.786 921.814 505.392C926.856 504.255 932.097 504.674 937.176 505.631C966.993 511.248 970.679 514.346 989.5 514.735C1006.3 515.083 1036.5 513.235 1055.5 513.235C1114.5 513.235 1090.5 513.235 1124 513.235C1177.5 513.235 1178.99 514.402 1241 514.402C1317.5 514.402 1274.5 512.568 1440 513.235"
            stroke="#B1C5FF" strokeWidth="2" fill="none"
            initial={{ pathLength: 0 }} style={{ pathLength: pathLengths[2] }} transition={transition}
          />
          <motion.path
            d="M0 438.5C150.5 438.5 261 438.318 323.5 456.5C351 464.5 387.517 484.001 423.5 494.5C447.371 501.465 472 503.735 487 507.735C503.786 512.212 504.5 516.808 523 518.735C547 521.235 564.814 501.235 584.5 501.235C604.5 501.235 626 529.069 643 528.569C658.676 528.569 672.076 511.63 695.751 501.972C703.017 499.008 711.231 498.208 718.298 501.617C735.448 509.889 751.454 529.98 767 529.569C783.364 529.569 801.211 507.687 819.903 500.657C825.718 498.469 832.141 499.104 837.992 501.194C859.178 508.764 873.089 523.365 891 523.735C907.8 524.083 923 504.235 963 506.735C1034.5 506.735 1047.5 492.68 1071 481.5C1122.5 457 1142.23 452.871 1185 446.5C1255.5 436 1294 439 1439.5 439"
            stroke="#4FABFF" strokeWidth="2" fill="none"
            initial={{ pathLength: 0 }} style={{ pathLength: pathLengths[3] }} transition={transition}
          />
          <motion.path
            d="M0.5 364C145.288 362.349 195 361.5 265.5 378C322 391.223 399.182 457.5 411 467.5C424.176 478.649 456.916 491.677 496.259 502.699C498.746 503.396 501.16 504.304 503.511 505.374C517.104 511.558 541.149 520.911 551.5 521.236C571.5 521.236 590 498.736 611.5 498.736C631.5 498.736 652.5 529.236 669.5 528.736C685.171 528.736 697.81 510.924 721.274 501.036C728.505 497.988 736.716 497.231 743.812 500.579C761.362 508.857 778.421 529.148 794 528.736C810.375 528.736 829.35 508.68 848.364 502.179C854.243 500.169 860.624 500.802 866.535 502.718C886.961 509.338 898.141 519.866 916 520.236C932.8 520.583 934.5 510.236 967.5 501.736C1011.5 491 1007.5 493.5 1029.5 480C1069.5 453.5 1072 440.442 1128.5 403.5C1180.5 369.5 1275 360.374 1439 364"
            stroke="#076EFF" strokeWidth="2" fill="none"
            initial={{ pathLength: 0 }} style={{ pathLength: pathLengths[4] }} transition={transition}
          />
          {/* Blurred background paths */}
          <path d="M0 663C145.5 663 191 666.265 269 647C326.5 630 339.5 621 397.5 566C439 531.5 455 529.5 490 523C509.664 519.348 521 503.736 538 504.236C553.591 504.236 562.429 514.739 584.66 522.749C592.042 525.408 600.2 526.237 607.356 523.019C624.755 515.195 641.446 496.324 657 496.735C673.408 496.735 693.545 519.572 712.903 526.769C718.727 528.934 725.184 528.395 730.902 525.965C751.726 517.115 764.085 497.106 782 496.735C794.831 496.47 804.103 508.859 822.469 518.515C835.13 525.171 850.214 526.815 862.827 520.069C875.952 513.049 889.748 502.706 903.5 503.736C922.677 505.171 935.293 510.562 945.817 515.673C954.234 519.76 963.095 522.792 972.199 524.954C996.012 530.611 1007.42 534.118 1034 549C1077.5 573.359 1082.5 594.5 1140 629C1206 670 1328.5 662.5 1440 662.5" stroke="#FFB7C5" strokeWidth="2" fill="none" pathLength={1} filter="url(#blurMe)" />
          <path d="M0 587.5C147 587.5 277 587.5 310 573.5C348 563 392.5 543.5 408 535C434 523.5 426 526.235 479 515.235C494 512.729 523 510.435 534.5 512.735C554.5 516.735 555.5 523.235 576 523.735C592 523.735 616 496.735 633 497.235C648.671 497.235 661.31 515.052 684.774 524.942C692.004 527.989 700.2 528.738 707.349 525.505C724.886 517.575 741.932 498.33 757.5 498.742C773.864 498.742 791.711 520.623 810.403 527.654C816.218 529.841 822.661 529.246 828.451 526.991C849.246 518.893 861.599 502.112 879.5 501.742C886.47 501.597 896.865 506.047 907.429 510.911C930.879 521.707 957.139 519.639 982.951 520.063C1020.91 520.686 1037.5 530.797 1056.5 537C1102.24 556.627 1116.5 570.704 1180.5 579.235C1257.5 589.5 1279 587 1440 588" stroke="#FFDDB7" strokeWidth="2" fill="none" pathLength={1} filter="url(#blurMe)" />
          <path d="M0 514C147.5 514.333 294.5 513.735 380.5 513.735C405.976 514.94 422.849 515.228 436.37 515.123C477.503 514.803 518.631 506.605 559.508 511.197C564.04 511.706 569.162 512.524 575 513.735C588 516.433 616 521.702 627.5 519.402C647.5 515.402 659 499.235 680.5 499.235C700.5 499.235 725 529.235 742 528.735C757.654 528.735 768.77 510.583 791.793 500.59C798.991 497.465 807.16 496.777 814.423 499.745C832.335 507.064 850.418 524.648 866 524.235C882.791 524.235 902.316 509.786 921.814 505.392C926.856 504.255 932.097 504.674 937.176 505.631C966.993 511.248 970.679 514.346 989.5 514.735C1006.3 515.083 1036.5 513.235 1055.5 513.235C1114.5 513.235 1090.5 513.235 1124 513.235C1177.5 513.235 1178.99 514.402 1241 514.402C1317.5 514.402 1274.5 512.568 1440 513.235" stroke="#B1C5FF" strokeWidth="2" fill="none" pathLength={1} filter="url(#blurMe)" />
          <path d="M0 438.5C150.5 438.5 261 438.318 323.5 456.5C351 464.5 387.517 484.001 423.5 494.5C447.371 501.465 472 503.735 487 507.735C503.786 512.212 504.5 516.808 523 518.735C547 521.235 564.814 501.235 584.5 501.235C604.5 501.235 626 529.069 643 528.569C658.676 528.569 672.076 511.63 695.751 501.972C703.017 499.008 711.231 498.208 718.298 501.617C735.448 509.889 751.454 529.98 767 529.569C783.364 529.569 801.211 507.687 819.903 500.657C825.718 498.469 832.141 499.104 837.992 501.194C859.178 508.764 873.089 523.365 891 523.735C907.8 524.083 923 504.235 963 506.735C1034.5 506.735 1047.5 492.68 1071 481.5C1122.5 457 1142.23 452.871 1185 446.5C1255.5 436 1294 439 1439.5 439" stroke="#4FABFF" strokeWidth="2" fill="none" pathLength={1} filter="url(#blurMe)" />
          <path d="M0.5 364C145.288 362.349 195 361.5 265.5 378C322 391.223 399.182 457.5 411 467.5C424.176 478.649 456.916 491.677 496.259 502.699C498.746 503.396 501.16 504.304 503.511 505.374C517.104 511.558 541.149 520.911 551.5 521.236C571.5 521.236 590 498.736 611.5 498.736C631.5 498.736 652.5 529.236 669.5 528.736C685.171 528.736 697.81 510.924 721.274 501.036C728.505 497.988 736.716 497.231 743.812 500.579C761.362 508.857 778.421 529.148 794 528.736C810.375 528.736 829.35 508.68 848.364 502.179C854.243 500.169 860.624 500.802 866.535 502.718C886.961 509.338 898.141 519.866 916 520.236C932.8 520.583 934.5 510.236 967.5 501.736C1011.5 491 1007.5 493.5 1029.5 480C1069.5 453.5 1072 440.442 1128.5 403.5C1180.5 369.5 1275 360.374 1439 364" stroke="#076EFF" strokeWidth="2" fill="none" pathLength={1} filter="url(#blurMe)" />
          <defs>
            <filter id="blurMe">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* ── Hero Content (centered on top of lines) ───────────────── */}
      <div className="relative z-10 mx-auto max-w-6xl w-full flex items-center h-full px-5 md:px-8">
        <div className="w-full pt-10">
          <p className="text-[22px] sm:text-[28px] md:text-[40px] font-semibold text-stone-900 leading-snug">
            A Team Behind Visibility, Product, and Growth.
          </p>
          <h1
            className="mt-3 md:mt-4 font-display font-medium text-stone-900"
            style={{ fontSize: "clamp(28px, 4.8vw, 56px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            <span className="relative inline-block min-h-[0.9em] gradient-text">
              <AnimatedText
                key={services[serviceIndex]}
                text={services[serviceIndex]}
                className=""
                animationType="letters"
                duration={0.4}
                staggerDelay={0.03}
              />
            </span>
          </h1>
          <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div>
              <p className="text-[14px] md:text-[17px] font-normal text-stone-500 leading-relaxed">
                Track, audit, and improve how ChatGPT, Perplexity, Gemini, and Claude represent your brand.
                Catch hallucinations before they cost you pipeline. Get recommended, not ignored.
              </p>
            </div>
            <div>
              <form id="hero-audit-form" onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-stone-400">
                      <Search className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="Enter your website URL"
                      className="w-full h-12 pl-10 pr-4 text-[14px] md:text-[15px] text-stone-900 placeholder-stone-400 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-cyan-300"
                      aria-label="Domain to audit"
                    />
                  </div>
                  <StarButton
                    as="span"
                    lightColor="#00f0ff"
                    backgroundColor="#0f172a"
                    borderWidth={2.2}
                    glow={true}
                    sparkGradient="conic-gradient(from 0deg, transparent 0deg, transparent 40deg, rgba(0, 240, 255, 0.7) 100deg, var(--light-color) 180deg, #ffffff 200deg, #00f0ff 220deg, rgba(0, 240, 255, 0.7) 280deg, transparent 330deg)"
                    className="font-sans font-semibold text-[11px] uppercase tracking-[0.2em] h-12 w-full sm:w-auto"
                    onClick={() => {
                      const form = document.querySelector("#hero-audit-form") as HTMLFormElement;
                      form?.requestSubmit();
                    }}
                  >
                    Check AI Visibility
                    <ArrowRight className="h-4 w-4 group-hover/star-button:translate-x-1 transition-transform duration-300" />
                  </StarButton>
                </div>
              </form>
              <div className="mt-3 md:mt-4 flex flex-wrap justify-center md:justify-between gap-2 md:gap-3 text-[11px] md:text-[12px] text-stone-600">
                <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 md:px-3 md:py-2" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(6,182,212,0.12) 100%)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <CheckCircle className="h-3 w-3 md:h-3.5 md:w-3.5 text-emerald-500" />
                  No signup required
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 md:px-3 md:py-2" style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(99,102,241,0.12) 100%)", border: "1px solid rgba(6,182,212,0.2)" }}>
                  <Activity className="h-3 w-3 md:h-3.5 md:w-3.5 text-cyan-500" />
                  Takes ~30 seconds
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 md:px-3 md:py-2" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.12) 100%)", border: "1px solid rgba(99,102,241,0.2)" }}>
                  <Sparkles className="h-3 w-3 md:h-3.5 md:w-3.5 text-indigo-500" />
                  Free
                </span>
              </div>
            </div>
          </div>
          {/* Tech stack marquee */}
          <div className="mt-8 md:mt-12 overflow-hidden border-t border-stone-200/60 pt-4 md:pt-6">
            <div className="flex animate-marquee whitespace-nowrap" style={{"--duration": "30s"} as React.CSSProperties}>
              {[...Array(3)].map((_, i) => (
                <span key={i} className="inline-flex items-center gap-6 md:gap-10 mx-3 md:mx-5">
                  <span className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-600 transition-colors"><OpenAIIcon size={16} color="#10A37F" /> <span className="text-xs md:text-sm">ChatGPT</span></span>
                  <span className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiClaude size={16} color="#CC785C" /> <span className="text-xs md:text-sm">Claude</span></span>
                  <span className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiGooglegemini size={16} color="#4285F4" /> <span className="text-xs md:text-sm">Gemini</span></span>
                  <span className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiPerplexity size={16} color="#20B8CD" /> <span className="text-xs md:text-sm">Perplexity</span></span>
                  <span className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiTypescript size={16} color="#3178C6" /> <span className="text-xs md:text-sm">TypeScript</span></span>
                  <span className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiJavascript size={16} color="#F7DF1E" /> <span className="text-xs md:text-sm">JavaScript</span></span>
                  <span className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiMongodb size={16} color="#47A248" /> <span className="text-xs md:text-sm">MongoDB</span></span>
                  <span className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiReact size={16} color="#61DAFB" /> <span className="text-xs md:text-sm">React</span></span>
                  <span className="flex items-center gap-1.5 md:gap-2 text-stone-400 hover:text-stone-600 transition-colors"><SiNodedotjs size={16} color="#339933" /> <span className="text-xs md:text-sm">Node.js</span></span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
