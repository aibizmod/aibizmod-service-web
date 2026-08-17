import React from "react";

export function LogoI({
  className = "",
  dotClassName = "bg-cyan-500",
}: {
  className?: string;
  dotClassName?: string;
}) {
  return (
    <span className={`relative inline-block leading-none ${className}`} aria-hidden="true">
      {"\u0131"}
      <span
        className={`pointer-events-none absolute left-1/2 top-[0.16em] h-[0.18em] w-[0.18em] -translate-x-1/2 rounded-full ${dotClassName}`}
      />
    </span>
  );
}

export interface AibizmodLogoProps {
  className?: string;
  textColor?: string;
  secondDotClassName?: string;
  withPill?: boolean;
  size?: "sm" | "md" | "lg" | "inherit";
}

export function AibizmodLogo({
  className = "",
  textColor = "text-white",
  secondDotClassName,
  withPill = false,
  size = "inherit",
}: AibizmodLogoProps) {
  const sizeClasses = {
    sm: "text-[18px]",
    md: "text-[24px]",
    lg: "text-[32px]",
    inherit: "",
  }[size];

  const isDarkText =
    textColor.includes("slate-9") ||
    textColor.includes("slate-8") ||
    textColor.includes("black") ||
    textColor.includes("ink") ||
    textColor.includes("0F172A");

  const cyanColorClass = isDarkText ? "text-cyan-500" : "text-cyan-400";
  const firstDotClass = isDarkText ? "bg-cyan-500" : "bg-cyan-400";
  const secondDot = secondDotClassName || (isDarkText ? "bg-[#0F172A]" : "bg-white");

  const content = (
    <span
      className={`font-satoshi font-bold tracking-tight inline-flex items-baseline select-none ${textColor} ${sizeClasses} ${className}`}
    >
      <span>a</span>
      <LogoI dotClassName={firstDotClass} />
      <span className={cyanColorClass}>b</span>
      <LogoI className={cyanColorClass} dotClassName={secondDot} />
      <span className={cyanColorClass}>z</span>
      <span>mod</span>
    </span>
  );

  if (withPill) {
    return (
      <span
        className={`relative inline-flex items-center px-4 py-1.5 mx-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/35 shadow-[0_0_20px_rgba(6,182,212,0.18)] align-middle transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-500/15 ${className}`}
      >
        {content}
      </span>
    );
  }

  return content;
}

export default AibizmodLogo;
