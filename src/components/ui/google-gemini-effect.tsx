"use client";
import { cn } from "@/lib/utils";
import React, { useState, FormEvent, useEffect } from "react";
import { ArrowRight, Search, CheckCircle, Activity, Sparkles } from "lucide-react";
import { StarButton } from "@/components/ui/star-button";

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

export const GoogleGeminiEffect = ({
  className,
  compact = false,
  initialDomain = "",
  onSubmit,
  submitLabel = "Check AI Visibility",
  eyebrow = "AI visibility for modern growth teams",
  title = "A team behind visibility, product, and growth.",
  description = "Audit how your brand appears in ChatGPT, Perplexity, Gemini, and Claude. Surface gaps, fix them fast, and become the answer buyers already trust.",
  showIntro = true,
  showPrompt = true,
  placeholder = "Enter your website URL",
  contentClassName,
  cardClassName,
}: GoogleGeminiEffectProps) => {
  const [domain, setDomain] = useState(initialDomain);

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

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-white", className)}>
      <div className="absolute inset-0">
        <svg
          width="1440"
          height="890"
          viewBox="0 0 1440 890"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full object-cover opacity-40"
          preserveAspectRatio="xMidYMid slice"
        >
          <path d="M0 663C145.5 663 191 666.265 269 647C326.5 630 339.5 621 397.5 566C439 531.5 455 529.5 490 523C509.664 519.348 521 503.736 538 504.236C553.591 504.236 562.429 514.739 584.66 522.749C592.042 525.408 600.2 526.237 607.356 523.019C624.755 515.195 641.446 496.324 657 496.735C673.408 496.735 693.545 519.572 712.903 526.769C718.727 528.934 725.184 528.395 730.902 525.965C751.726 517.115 764.085 497.106 782 496.735C794.831 496.47 804.103 508.859 822.469 518.515C835.13 525.171 850.214 526.815 862.827 520.069C875.952 513.049 889.748 502.706 903.5 503.736C922.677 505.171 935.293 510.562 945.817 515.673C954.234 519.76 963.095 522.792 972.199 524.954C996.012 530.611 1007.42 534.118 1034 549C1077.5 573.359 1082.5 594.5 1140 629C1206 670 1328.5 662.5 1440 662.5" stroke="#FFB7C5" strokeWidth="2" fill="none" />
          <path d="M0 587.5C147 587.5 277 587.5 310 573.5C348 563 392.5 543.5 408 535C434 523.5 426 526.235 479 515.235C494 512.729 523 510.435 534.5 512.735C554.5 516.735 555.5 523.235 576 523.735C592 523.735 616 496.735 633 497.235C648.671 497.235 661.31 515.052 684.774 524.942C692.004 527.989 700.2 528.738 707.349 525.505C724.886 517.575 741.932 498.33 757.5 498.742C773.864 498.742 791.711 520.623 810.403 527.654C816.218 529.841 822.661 529.246 828.451 526.991C849.246 518.893 861.599 502.112 879.5 501.742C886.47 501.597 896.865 506.047 907.429 510.911C930.879 521.707 957.139 519.639 982.951 520.063C1020.91 520.686 1037.5 530.797 1056.5 537C1102.24 556.627 1116.5 570.704 1180.5 579.235C1257.5 589.5 1279 587 1440 588" stroke="#FFDDB7" strokeWidth="2" fill="none" />
          <path d="M0 514C147.5 514.333 294.5 513.735 380.5 513.735C405.976 514.94 422.849 515.228 436.37 515.123C477.503 514.803 518.631 506.605 559.508 511.197C564.04 511.706 569.162 512.524 575 513.735C588 516.433 616 521.702 627.5 519.402C647.5 515.402 659 499.235 680.5 499.235C700.5 499.235 725 529.235 742 528.735C757.654 528.735 768.77 510.583 791.793 500.59C798.991 497.465 807.16 496.777 814.423 499.745C832.335 507.064 850.418 524.648 866 524.235C882.791 524.235 902.316 509.786 921.814 505.392C926.856 504.255 932.097 504.674 937.176 505.631C966.993 511.248 970.679 514.346 989.5 514.735C1006.3 515.083 1036.5 513.235 1055.5 513.235C1114.5 513.235 1090.5 513.235 1124 513.235C1177.5 513.235 1178.99 514.402 1241 514.402C1317.5 514.402 1274.5 512.568 1440 513.235" stroke="#B1C5FF" strokeWidth="2" fill="none" />
          <path d="M0 438.5C150.5 438.5 261 438.318 323.5 456.5C351 464.5 387.517 484.001 423.5 494.5C447.371 501.465 472 503.735 487 507.735C503.786 512.212 504.5 516.808 523 518.735C547 521.235 564.814 501.235 584.5 501.235C604.5 501.235 626 529.069 643 528.569C658.676 528.569 672.076 511.63 695.751 501.972C703.017 499.008 711.231 498.208 718.298 501.617C735.448 509.889 751.454 529.98 767 529.569C783.364 529.569 801.211 507.687 819.903 500.657C825.718 498.469 832.141 499.104 837.992 501.194C859.178 508.764 873.089 523.365 891 523.735C907.8 524.083 923 504.235 963 506.735C1034.5 506.735 1047.5 492.68 1071 481.5C1122.5 457 1142.23 452.871 1185 446.5C1255.5 436 1294 439 1439.5 439" stroke="#4FABFF" strokeWidth="2" fill="none" />
          <path d="M0.5 364C145.288 362.349 195 361.5 265.5 378C322 391.223 399.182 457.5 411 467.5C424.176 478.649 456.916 491.677 496.259 502.699C498.746 503.396 501.16 504.304 503.511 505.374C517.104 511.558 541.149 520.911 551.5 521.236C571.5 521.236 590 498.736 611.5 498.736C631.5 498.736 652.5 529.236 669.5 528.736C685.171 528.736 697.81 510.924 721.274 501.036C728.505 497.988 736.716 497.231 743.812 500.579C761.362 508.857 778.421 529.148 794 528.736C810.375 528.736 829.35 508.68 848.364 502.179C854.243 500.169 860.624 500.802 866.535 502.718C886.961 509.338 898.141 519.866 916 520.236C932.8 520.583 934.5 510.236 967.5 501.736C1011.5 491 1007.5 493.5 1029.5 480C1069.5 453.5 1072 440.442 1128.5 403.5C1180.5 369.5 1275 360.374 1439 364" stroke="#076EFF" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className={cn("relative z-10 flex h-full flex-col justify-center px-5 py-10 sm:px-6 lg:px-8", contentClassName)}>
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          {showIntro && (
            <>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">{eyebrow}</p>
              <h1
                className="mt-4 max-w-4xl font-display font-medium text-stone-900"
                style={{ fontSize: "clamp(32px, 4.8vw, 56px)", lineHeight: 1.08, letterSpacing: "-0.025em" }}
              >
                {title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">{description}</p>
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
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  See how ChatGPT, Gemini, Claude, and Perplexity describe your brand and where you can improve.
                </p>
              </div>
            </div>
          )}

          <div
            className={cn(
              "mt-2 w-full rounded-[28px] border border-stone-200/80 bg-white/90 p-3 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-all duration-700 sm:p-4",
              compact ? "max-w-6xl" : "max-w-2xl",
              cardClassName,
            )}
            style={{ animation: compact ? "fadeUp 700ms ease-out both" : undefined }}
          >
            <form id="hero-audit-form" onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:flex-row">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-stone-400">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder={placeholder}
                  className="h-12 w-full rounded-2xl border border-stone-200 bg-white/90 pl-10 pr-4 text-[14px] text-stone-900 outline-none placeholder:text-stone-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
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
                className="h-12 w-full font-sans text-[11px] font-semibold uppercase tracking-[0.2em] sm:w-auto"
                onClick={() => {
                  const form = document.querySelector("#hero-audit-form") as HTMLFormElement;
                  form?.requestSubmit();
                }}
              >
                {submitLabel}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/star-button:translate-x-1" />
              </StarButton>
            </form>

            <div className="mt-3 flex flex-wrap justify-center gap-2 text-[11px] text-stone-600 sm:gap-3 sm:text-[12px]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white/80 px-3 py-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                No signup required
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white/80 px-3 py-1.5">
                <Activity className="h-3.5 w-3.5 text-cyan-500" />
                Takes ~30 seconds
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white/80 px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                Free
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
