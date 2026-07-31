"use client";

import { useState, useEffect, useCallback } from "react";
import { client } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

// ──────────────────────────────────────────────────────────────────────────────
// GraphQL
// ──────────────────────────────────────────────────────────────────────────────
const GET_AUDITS = gql`
  query AibizmodAuditReports($filter: AibizmodAuditReportFilterInput, $page: Int!, $limit: Int!) {
    aibizmodAuditReports(filter: $filter, page: $page, limit: $limit) {
      items {
        reportId
        domainAudited
        score
        band
        isLogined
        userId
        sessionId
        generatedAt
      }
      totalCount
    }
  }
`;

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────
interface AuditItem {
  reportId: string;
  domainAudited: string;
  score?: number;
  band?: string;
  isLogined: boolean;
  userId?: string;
  sessionId?: string;
  generatedAt?: string;
}

interface Filters {
  band: string;
  domain: string;
  isLogined: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────
function parseDate(d?: string | number | null): Date | null {
  if (!d && d !== 0) return null;
  const raw = typeof d === "string" && /^\d+$/.test(d.trim()) ? Number(d) : d;
  const date = new Date(raw);
  return isNaN(date.getTime()) ? null : date;
}

function formatDate(d?: string | number | null): string {
  const date = parseDate(d);
  if (!date) return "—";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const BAND_COLORS: Record<string, string> = {
  excellent: "bg-emerald-100 text-emerald-700 border-emerald-200",
  good: "bg-cyan-100 text-cyan-700 border-cyan-200",
  fair: "bg-amber-100 text-amber-700 border-amber-200",
  poor: "bg-red-100 text-red-700 border-red-200",
  critical: "bg-red-200 text-red-800 border-red-300",
};

function scoreColor(score?: number): string {
  if (!score) return "text-ink/40";
  if (score >= 80) return "text-emerald-600";
  if (score >= 65) return "text-cyan-600";
  if (score >= 45) return "text-amber-600";
  return "text-red-600";
}

function buildFilter(filters: Filters): Record<string, unknown> | undefined {
  const filter: Record<string, unknown> = {};
  if (filters.band) filter.band = filters.band;
  if (filters.domain.trim()) filter.domain = filters.domain.trim();
  if (filters.isLogined === "logged") filter.isLogined = true;
  if (filters.isLogined === "anonymous") filter.isLogined = false;
  return Object.keys(filter).length > 0 ? filter : undefined;
}

const PAGE_SIZE = 50;

// ──────────────────────────────────────────────────────────────────────────────
// Main page
// ──────────────────────────────────────────────────────────────────────────────
export default function AuditsAdminPage() {
  const [items, setItems] = useState<AuditItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState<Filters>({ band: "", domain: "", isLogined: "" });
  const [appliedFilters, setAppliedFilters] = useState<Filters>({ band: "", domain: "", isLogined: "" });

  const fetchPage = useCallback(async (pageNumber: number, reset: boolean) => {
    const setter = reset ? setLoading : setLoadMoreLoading;
    setter(true);
    setError("");
    try {
      const filter = buildFilter(appliedFilters);
      const { data } = await client.query<{
        aibizmodAuditReports: { items: AuditItem[]; totalCount: number };
      }>({
        query: GET_AUDITS,
        variables: { filter, page: pageNumber, limit: PAGE_SIZE },
        fetchPolicy: "network-only",
      });
      if (!data) return;
      setItems((prev) => (reset ? data.aibizmodAuditReports.items : [...prev, ...data.aibizmodAuditReports.items]));
      setTotalCount(data.aibizmodAuditReports.totalCount);
      setPage(pageNumber);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to load audits");
    } finally {
      setter(false);
    }
  }, [appliedFilters]);

  useEffect(() => {
    fetchPage(1, true);
  }, [fetchPage]);

  const applyFilters = () => {
    setAppliedFilters(filters);
    fetchPage(1, true);
  };

  const hasMore = items.length < totalCount;

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div>
        <h1 className="font-display font-bold text-2xl text-ink">Audit Reports</h1>
        <p className="text-sm text-ink/50 mt-1">
          All AI visibility audits run across the site — live from MongoDB.
        </p>
      </div>

      {/* ── Filters ── */}
      <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
        <div className="flex flex-col lg:flex-row lg:items-end gap-3">
          <div className="flex-1">
            <label className="text-xs font-semibold text-ink/40 uppercase tracking-wide block mb-1.5">
              Domain
            </label>
            <input
              type="text"
              value={filters.domain}
              onChange={(e) => setFilters((f) => ({ ...f, domain: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
              placeholder="e.g. acme.com"
              className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none focus:border-royal/50 focus:ring-2 focus:ring-royal/10"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-ink/40 uppercase tracking-wide block mb-1.5">
              Band
            </label>
            <select
              value={filters.band}
              onChange={(e) => setFilters((f) => ({ ...f, band: e.target.value }))}
              className="w-full lg:w-44 rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none focus:border-royal/50"
            >
              <option value="">All bands</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-ink/40 uppercase tracking-wide block mb-1.5">
              User type
            </label>
            <select
              value={filters.isLogined}
              onChange={(e) => setFilters((f) => ({ ...f, isLogined: e.target.value }))}
              className="w-full lg:w-44 rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none focus:border-royal/50"
            >
              <option value="">All</option>
              <option value="logged">Logged in</option>
              <option value="anonymous">Anonymous</option>
            </select>
          </div>
          <button
            onClick={applyFilters}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-royal text-white px-5 py-2.5 text-sm font-semibold hover:bg-royal-deep transition-colors"
          >
            Apply filters
          </button>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-ink">{totalCount} report{totalCount !== 1 ? "s" : ""} found</h2>
          {(filters.band || filters.domain || filters.isLogined) && (
            <span className="text-xs text-ink/40">Filtered</span>
          )}
        </div>

        {error && (
          <div className="px-6 py-4 text-sm text-red-600 bg-red-50 border-b border-red-100">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-royal border-t-transparent rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-5xl mb-4">🔍</span>
            <p className="text-sm text-ink/40">No audit reports match these filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-6 text-xs font-semibold text-ink/40 uppercase tracking-wide">Domain</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-ink/40 uppercase tracking-wide">Score</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-ink/40 uppercase tracking-wide">Band</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-ink/40 uppercase tracking-wide">User</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-ink/40 uppercase tracking-wide">Generated</th>
                  <th className="text-right py-3 px-6 text-xs font-semibold text-ink/40 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((a) => (
                  <tr key={a.reportId} className="border-b border-border/50 last:border-0 hover:bg-tint/30 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="font-medium text-ink">{a.domainAudited}</div>
                      <div className="font-mono text-[11px] text-ink/30 mt-0.5">{a.reportId}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      {a.score !== undefined ? (
                        <span className={`text-xl font-display font-bold ${scoreColor(a.score)}`}>{a.score}</span>
                      ) : (
                        <span className="text-ink/30">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      {a.band ? (
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border capitalize ${BAND_COLORS[a.band] || BAND_COLORS.poor}`}>
                          {a.band}
                        </span>
                      ) : (
                        <span className="text-ink/30">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      {a.userId ? (
                        <a
                          href={`/admin/${encodeURIComponent(a.userId)}`}
                          className="text-royal-deep hover:text-royal font-medium text-xs underline-offset-2 hover:underline"
                        >
                          {a.isLogined ? "Registered" : "Guest"} → profile
                        </a>
                      ) : (
                        <span className={`text-[11px] px-2 py-0.5 rounded-full ${a.isLogined ? "bg-emerald-50 text-emerald-700" : "bg-ink/5 text-ink/40"}`}>
                          {a.isLogined ? "Logged in" : "Anonymous"}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-xs text-ink/50 whitespace-nowrap">{formatDate(a.generatedAt)}</td>
                    <td className="py-3.5 px-6 text-right">
                      <a
                        href={`/audit/${a.reportId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-royal-deep hover:text-royal transition-colors"
                      >
                        View report
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && hasMore && (
          <div className="px-6 py-4 border-t border-border">
            <button
              onClick={() => fetchPage(page + 1, false)}
              disabled={loadMoreLoading}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-canvas px-4 py-2 text-sm font-medium text-ink/70 hover:bg-tint/50 disabled:opacity-50 transition-colors"
            >
              {loadMoreLoading && (
                <span className="w-4 h-4 border-2 border-royal border-t-transparent rounded-full animate-spin" />
              )}
              Load more ({items.length} of {totalCount})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
