"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Layers,
  X,
} from "lucide-react";
import type { KeywordGroup } from "@/app/api/keywords/route";

// ─── Intent detection ────────────────────────────────────────────────────────

export type Intent = "informational" | "commercial" | "transactional" | "navigational";

export const INTENT_LABELS: Record<
  Intent,
  { label: string; bg: string; hint: string }
> = {
  informational: {
    label: "Informational",
    bg: "bg-sky-50 border-sky-200 text-sky-700",
    hint: "Users seeking answers or knowledge",
  },
  commercial: {
    label: "Commercial",
    bg: "bg-violet-50 border-violet-200 text-violet-700",
    hint: "Users researching options before buying",
  },
  transactional: {
    label: "Transactional",
    bg: "bg-emerald-50 border-emerald-200 text-emerald-700",
    hint: "Users ready to buy or convert",
  },
  navigational: {
    label: "Navigational",
    bg: "bg-amber-50 border-amber-200 text-amber-700",
    hint: "Users looking for a specific brand or page",
  },
};

const TRANSACTIONAL = /\b(buy|order|price|pricing|cost|deal|discount|download|sign\s?up|subscribe|hire|quote|get|free trial|purchase)\b/i;
const COMMERCIAL = /\b(best|top|compare|vs|review|alternative|alternatives|cheap|affordable|for small business|for (personal|business) use|worth)\b/i;
const NAVIGATIONAL = /\b(aibizmod|login|sign in|account|official|website|app)\b/i;

export function detectIntent(keywords: string[]): Intent {
  const joined = keywords.join(" ").toLowerCase();
  if (TRANSACTIONAL.test(joined)) return "transactional";
  if (COMMERCIAL.test(joined)) return "commercial";
  if (NAVIGATIONAL.test(joined)) return "navigational";
  return "informational";
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export function longTailShare(keywords: string[]): number {
  if (keywords.length === 0) return 0;
  const lt = keywords.filter((k) => k.trim().split(/\s+/).length >= 3).length;
  return Math.round((lt / keywords.length) * 100);
}

// ─── CSV export ──────────────────────────────────────────────────────────────

export function exportCSV(result: { seed: string; allKeywords: string[]; clusters: KeywordGroup[] }) {
  const rows: string[] = [["Keyword", "Cluster", "Intent", "Words"].join(",")];
  for (const cluster of result.clusters) {
    const intent = detectIntent(cluster.keywords);
    for (const kw of cluster.keywords) {
      const words = kw.trim().split(/\s+/).length;
      const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
      rows.push([esc(kw), esc(cluster.label), intent, String(words)].join(","));
    }
  }
  const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `keyword-research-${result.seed
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Reusable report UI primitives ───────────────────────────────────────────

export function SectionHeader({
  icon,
  title,
  subtitle,
  iconGradient = "from-cyan-500 to-teal-500",
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  iconGradient?: string;
}) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div
        className={cn(
          "p-2.5 rounded-xl bg-gradient-to-br shadow-sm flex-shrink-0",
          iconGradient
        )}
      >
        <div className="text-white">{icon}</div>
      </div>
      <div>
        <h2
          className="text-xl font-bold text-slate-900"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-slate-500 mt-0.5 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export function StatTile({
  icon,
  label,
  value,
  color = "text-slate-900",
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color?: string;
  note?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 mb-2">
        {icon}
        <span className="truncate">{label}</span>
      </div>
      <div
        className={cn("text-2xl font-bold leading-none", color)}
        style={{ fontFamily: "Satoshi, sans-serif" }}
      >
        {value}
      </div>
      {note && <p className="text-[10px] text-slate-400 mt-1">{note}</p>}
    </div>
  );
}

export function ProgressBar({
  pct,
  gradient = "from-cyan-500 to-teal-500",
  height = "h-2",
}: {
  pct: number;
  gradient?: string;
  height?: string;
}) {
  return (
    <div className={cn("w-full rounded-full bg-slate-100 overflow-hidden", height)}>
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r transition-all duration-1000",
          gradient
        )}
        style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
      />
    </div>
  );
}

export function IntentPill({ intent }: { intent: Intent }) {
  const cfg = INTENT_LABELS[intent];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium",
        cfg.bg
      )}
    >
      {cfg.label}
    </span>
  );
}

export function ClusterCard({
  group,
  index,
  total,
}: {
  group: KeywordGroup;
  index: number;
  total: number;
}) {
  const [open, setOpen] = useState(false);
  const intent = detectIntent(group.keywords);
  const share = total > 0 ? Math.round((group.keywords.length / total) * 100) : 0;
  const VISIBLE = 12;
  const shown = open ? group.keywords : group.keywords.slice(0, VISIBLE);

  const copy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(group.keywords.join("\n"));
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left p-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-cyan-50 border border-cyan-100 text-cyan-700 text-[11px] font-bold flex-shrink-0">
                {index + 1}
              </span>
              <span
                className="text-sm font-bold text-slate-900 truncate"
                style={{ fontFamily: "Satoshi, sans-serif" }}
              >
                {group.label}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {group.keywords.length} keywords
            </p>
          </div>
          {open ? (
            <ChevronUp className="h-4 w-4 text-slate-400 flex-shrink-0" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <ProgressBar
            pct={share}
            gradient="from-cyan-500 to-teal-500"
            height="h-1.5"
          />
          <span className="text-[10px] font-semibold text-slate-500 whitespace-nowrap">
            {share}%
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <IntentPill intent={intent} />
          <span className="text-[10px] text-slate-400 truncate">
            {INTENT_LABELS[intent].hint}
          </span>
        </div>
      </button>

      <div className="px-4 pb-4 pt-0 border-t border-slate-50">
        <div className="flex flex-wrap gap-1.5 mt-3">
          {shown.map((kw, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-md bg-slate-50 border border-slate-100 px-2 py-1 text-[11px] text-slate-600"
            >
              {kw}
              <button
                onClick={() => navigator.clipboard?.writeText(kw)}
                className="text-slate-300 hover:text-cyan-600 transition"
                title={`Copy "${kw}"`}
              >
                <Copy className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        {group.keywords.length > VISIBLE && (
          <div className="mt-3 flex items-center justify-between">
            <button
              onClick={() => setOpen((o) => !o)}
              className="text-[11px] font-medium text-cyan-600 hover:text-cyan-700 transition"
            >
              {open ? "Show less" : `Show ${group.keywords.length - VISIBLE} more`}
            </button>
            <button
              onClick={copy}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-cyan-600 transition"
            >
              {open ? (
                <Check className="h-3 w-3 text-emerald-600" />
              ) : (
                <Layers className="h-3 w-3" />
              )}
              Copy cluster
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function Chip({ children, onRemove }: { children: React.ReactNode; onRemove?: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="text-slate-400 hover:text-slate-600 transition"
          aria-label="Remove"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}
