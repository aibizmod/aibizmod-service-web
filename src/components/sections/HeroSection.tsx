"use client";

import { cn } from "@/lib/utils";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

type HeroSectionProps = {
  className?: string;
  compact?: boolean;
  initialDomain?: string;
  onSubmit?: (domain: string) => void | Promise<void>;
  showIntro?: boolean;
  showPrompt?: boolean;
  contentClassName?: string;
  cardClassName?: string;
  submitLabel?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  placeholder?: string;
};

export default function HeroSection({
  className,
  compact = false,
  initialDomain = "",
  onSubmit,
  showIntro = true,
  showPrompt = true,
  contentClassName,
  cardClassName,
  submitLabel,
  eyebrow,
  title,
  description,
  placeholder,
}: HeroSectionProps) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-transparent", compact ? "min-h-0" : "h-screen", className)}>
      <div className={cn("relative flex justify-center", compact ? "items-start py-4" : "items-center h-full")}> 
        <GoogleGeminiEffect
          className={cn(compact ? "w-full" : "h-screen w-full")}
          compact={compact}
          initialDomain={initialDomain}
          onSubmit={onSubmit}
          showIntro={showIntro}
          showPrompt={showPrompt}
          contentClassName={contentClassName}
          cardClassName={cardClassName}
          submitLabel={submitLabel}
          eyebrow={eyebrow}
          title={title}
          description={description}
          placeholder={placeholder}
        />
      </div>
    </section>
  );
}
