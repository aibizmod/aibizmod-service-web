"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Search, Loader2, Shield, BarChart3, AlertCircle, CheckCircle } from "lucide-react";
import { StarButton } from "@/components/ui/star-button";
import ShaderBackground from "@/components/ui/shader-background";

interface AuditResult {
  score: number;
  band: string;
  citability?: number;
  scoreBreakDown?: Record<string, number>;
  recommendations: string[];
  checkedAt?: string;
}

const BAND_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  excellent: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  good: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
  foundation: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  critical: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
};

const BAND_LABELS: Record<string, string> = {
  excellent: "Excellent",
  good: "Good",
  foundation: "Foundation",
  critical: "Critical",
};

const CATEGORY_LABELS: Record<string, string> = {
  robots: "Robots.txt",
  llms: "LLMS.txt",
  schema: "JSON-LD Schema",
  meta: "Meta Tags",
  content: "Content",
  brand: "Brand & Entity",
  signals: "Signals",
  ai_discovery: "AI Discovery",
};

export default function AIVisibilityHero() {
  const [domain, setDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!domain.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/geo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: domain.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Audit failed");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 86) return "text-green-600";
    if (score >= 68) return "text-cyan-600";
    if (score >= 36) return "text-yellow-600";
    return "text-red-600";
  };

  const formatDomain = (url: string) => {
    try {
      return new URL(url.startsWith("http") ? url : `https://${url}`).hostname;
    } catch {
      return url;
    }
  };

  return (
    <section className="relative isolate pt-[68px] min-h-screen overflow-hidden bg-white">
      <ShaderBackground className="absolute inset-0 z-0 h-full w-full" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="w-full max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-sm font-medium text-cyan-700">
            <Shield className="h-4 w-4" />
            AI Visibility Audit
          </div>

          <h1 className="max-w-4xl font-display font-thin text-[#0F172A] text-balance" style={{ fontSize: "clamp(34px, 5vw, 58px)", lineHeight: 1.04 }}>
            Is Your Business Visible
            <br />
            <span className="font-thin normal-case tracking-tight text-cyan-600">To AI Search Engines?</span>
          </h1>

          <p className="mt-6 text-lg leading-7 text-stone-600 max-w-2xl mx-auto">
            ChatGPT, Perplexity, Gemini & Google AI Overviews cite only a handful of sources.
            Enter your domain to see your AI visibility score and exactly what to fix.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 w-full max-w-xl mx-auto">
            <div className="relative rounded-2xl border border-stone-200 bg-white/95 shadow-[0_18px_55px_rgba(59,130,246,0.12)] backdrop-blur-md overflow-hidden">
              <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-stone-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Enter your domain (e.g., aibizmod.com)"
                disabled={isLoading}
                className="w-full h-14 pl-12 pr-16 text-base text-[#0F172A] placeholder-stone-400 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
                aria-label="Domain to audit"
              />
              <button
                type="submit"
                disabled={isLoading || !domain.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-5 rounded-xl bg-[#0F172A] text-white text-sm font-semibold shadow-[0_0_12px_rgba(56,189,248,0.25)] transition hover:shadow-[0_0_20px_rgba(6,182,212,0.55)] hover:-translate-y-0.5 hover:bg-[#0891B2] disabled:opacity-50 disabled:hover:shadow-none disabled:hover:bg-[#0F172A] disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Auditing...
                  </span>
                ) : (
                  "Check AI Visibility"
                )}
              </button>
            </div>
            <p className="mt-3 text-xs text-stone-500 text-center">
              Free audit · Runs in ~15s · No account needed · Powered by GEO Optimizer
            </p>
          </form>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm text-center" role="alert">
              <AlertCircle className="mx-auto h-5 w-5 mb-2" />
              <p>{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-10 animate-fade-in" role="region" aria-live="polite">
              <div className="grid gap-6 md:grid-cols-2">
                <div className={`rounded-2xl border p-6 text-center ${BAND_COLORS[result.band]?.bg || "bg-stone-50"} ${BAND_COLORS[result.band]?.border || "border-stone-200"}`}>
                  <div className="mb-2 text-sm font-semibold uppercase tracking-wider">AI Visibility Score</div>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className={`text-6xl font-bold ${getScoreColor(result.score)}`}>
                      {result.score}
                    </span>
                    <span className="text-stone-400">/100</span>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium capitalize"
                    style={{
                      backgroundColor: BAND_COLORS[result.band]?.bg?.replace("bg-", "") || "",
                      color: BAND_COLORS[result.band]?.text?.replace("text-", "") || "",
                      borderColor: BAND_COLORS[result.band]?.border?.replace("border-", "") || "",
                    }}>
                    <span className={`relative ${BAND_COLORS[result.band]?.text || ""}`}>
                      {BAND_LABELS[result.band] || result.band}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-white p-6">
                  <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-stone-600">
                    <BarChart3 className="h-4 w-4 text-cyan-600" />
                    Category Breakdown
                  </div>
                  <div className="space-y-3">
                    {result.scoreBreakDown && Object.entries(result.scoreBreakDown).length > 0 ? (
                      Object.entries(result.scoreBreakDown).map(([key, value]) => {
                        const maxScores: Record<string, number> = {
                          robots: 18, llms: 18, schema: 16, meta: 14,
                          content: 12, brand: 10, signals: 6, ai_discovery: 6,
                        };
                        const max = maxScores[key] || 20;
                        const pct = Math.round((value / max) * 100);
                        return (
                          <div key={key} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium text-stone-700">{CATEGORY_LABELS[key] || key}</span>
                              <span className="text-stone-500">{value} / {max}</span>
                            </div>
                            <div className="h-2 rounded-full bg-stone-100 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${pct}%`,
                                  backgroundColor:
                                    pct >= 80 ? "#22c55e" : pct >= 60 ? "#06b6d4" : pct >= 40 ? "#eab308" : "#ef4444",
                                }}
                              />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-8 text-center text-stone-500">
                        Detailed breakdown not available
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 text-left">
                <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-stone-800">
                  <Shield className="h-5 w-5 text-cyan-600" />
                  Top Recommendations
                </div>
                <ul className="space-y-3">
                  {result.recommendations.slice(0, 5).map((rec, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-xl border border-stone-100 bg-stone-50 p-4">
                      <CheckCircle className="mt-0.5 h-5 w-5 text-green-600 shrink-0" />
                      <span className="text-stone-700 text-sm leading-relaxed">{rec}</span>
                    </li>
                  ))}
                  {result.recommendations.length > 5 && (
                    <li className="rounded-xl border border-stone-100 bg-stone-50 p-4 text-center text-sm text-stone-500">
                      +{result.recommendations.length - 5} more recommendations in full report
                    </li>
                  )}
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4">
                <a
                  href={`/contact?audit=${encodeURIComponent(domain)}&score=${result.score}`}
                  aria-label="Get expert help"
                >
                  <StarButton
                    as="span"
                    lightColor="#38bdf8"
                    backgroundColor="#0f172a"
                    className="h-12 font-semibold shadow-[0_0_12px_rgba(56,189,248,0.25)] transition hover:shadow-[0_0_20px_rgba(6,182,212,0.55),0_0_4px_rgba(56,189,248,0.7)] hover:-translate-y-0.5 duration-300"
                  >
                    Get Expert Help <ArrowRight size={16} aria-hidden="true" />
                  </StarButton>
                </a>
                <button
                  className="inline-flex h-12 items-center justify-center rounded-full border border-stone-200 bg-white/85 px-6 text-sm font-semibold text-[#0F172A] shadow-[0_12px_28px_rgba(28,25,23,0.10)] backdrop-blur-md transition hover:border-stone-300 hover:bg-white"
                >
                  Run Full Audit
                </button>
              </div>

              <p className="mt-6 text-xs text-stone-500 text-center">
                Audited {formatDomain(domain)} · {new Date(result.checkedAt ?? Date.now()).toLocaleString()} · Powered by
                <a href="https://github.com/Auriti-Labs/geo-optimizer-skill" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline ml-1">
                  GEO Optimizer
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}