import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Royal Amethyst & Gold — design tokens ────────────────────────
        // Hex values throughout so opacity modifiers (bg-royal/10) work.
        canvas:        "#F8FAFC",   // cool slate off-white page bg
        surface:       "#FFFFFF",   // cards, nav, raised elements
        ink:           "#0F172A",   // primary text, slate-900
        royal:         "#0891B2",   // cyan-600 — icons, highlights, gradient start
        "royal-deep":  "#0E7490",   // body links + small text (WCAG AA on white)
        gold:          "#B8860B",   // antique gold — rules, pill stars, hairlines ONLY
        "gold-light":  "#D4AF37",   // gold gradient highlight end
        tint:          "#ECFEFF",   // soft cyan wash — alt section bg, pill bg

        // ── Semantic aliases — remap all existing Tailwind class usages ───
        background:    "#F8FAFC",
        foreground:    "#0F172A",
        border:        "#E0F2FE",
        input:         "#E0F2FE",
        ring:          "#0891B2",

        card: {
          DEFAULT:    "#FFFFFF",
          foreground: "#0F172A",
        },
        muted: {
          DEFAULT:    "#ECFEFF",   // bg-muted → soft cyan tint
          foreground: "#475569",  // text-muted-foreground → muted slate-600
        },
        primary: {
          DEFAULT:    "#0891B2",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT:    "#ECFEFF",
          foreground: "#0F172A",
        },
        accent: {
          DEFAULT:    "#ECFEFF",
          foreground: "#0E7490",
        },
        popover: {
          DEFAULT:    "#FFFFFF",
          foreground: "#0F172A",
        },
        destructive: {
          DEFAULT:    "#EF4444",
          foreground: "#FFFFFF",
        },

        // ── Legacy tokens — preserved while pages are progressively restyled
        navy:            "#0A1628",
        "electric-blue": "#2563EB",
        "cyan-accent":   "#06B6D4",
        coral:           "#FF5A3C",
        "coral-deep":    "#C2410C",
      },

      borderRadius: {
        lg:   "var(--radius)",      // 16px
        md:   "var(--radius-md)",   // 10px
        sm:   "8px",
        card: "var(--radius)",
        btn:  "var(--radius-md)",
        pill: "999px",
        icon: "11px",
      },

      fontFamily: {
        sans:    ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-general-sans)", "var(--font-inter)", "Inter", "sans-serif"],
        inter:   ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
        fraunces: ["var(--font-fraunces)", "serif"],
        satoshi: ["var(--font-satoshi)", "sans-serif"],
      },

      fontSize: {
        hero:         ["64px", { lineHeight: "1.03", letterSpacing: "-0.03em" }],
        section:      ["38px", { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "card-title": ["20px", { lineHeight: "1.2" }],
        body:         ["17px", { lineHeight: "1.65" }],
        label:        ["13px", { lineHeight: "1.4" }],
      },

      boxShadow: {
        card:         "0 4px 24px rgba(15,23,42,0.06)",
        "card-hover": "0 12px 36px rgba(8,145,178,0.10)",
        btn:          "0 4px 24px rgba(8,145,178,0.28)",
        "btn-hover":  "0 8px 32px rgba(8,145,178,0.42)",
        float:        "0 30px 60px rgba(8,145,178,0.10)",
        badge:        "0 8px 24px rgba(15,23,42,0.12)",
      },

      backgroundImage: {
        "royal-gradient": "linear-gradient(120deg, #06B6D4, #3B82F6)",
        "gold-rule":      "linear-gradient(90deg, #D4AF37, #B8860B)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee var(--duration, 40s) linear infinite",
        "marquee-reverse": "marquee-reverse var(--duration, 40s) linear infinite",
        "scroll-left": "scroll-left 30s linear infinite",
        "scroll-right": "scroll-right 30s linear infinite",
        "word-fade-in": "word-fade-in 0.4s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(calc(-100% - var(--gap)))" },
          to: { transform: "translateX(0)" },
        },
        "scroll-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "scroll-right": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        "word-fade-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
