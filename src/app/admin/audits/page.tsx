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
  excellent: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
  good: "bg-cyan-400/10 text-cyan-300 border-cyan-400/30",
  fair: "bg-amber-400/10 text-amber-300 border-amber-400/30",
  poor: "bg-red-400/10 text-red-300 border-red-400/30",
  critical: "bg-red-500/15 text-red-400 border-red-400/40",
};

function scoreColor(score?: number): string {
  if (!score) return "text-slate-600";
  if (score >= 80) return "text-emerald-300";
  if (score >= 65) return "text-cyan-300";
  if (score >= 45) return "text-amber-300";
  return "text-red-400";
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
    <div className="space-y-8">
      {/* ── Header ── */}
      <header className="admin-panel admin-groove admin-aura px-7 py-7">
        <div className="flex items-center gap-3">
          <span className="admin-live text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
            Live · mongo
          </span>
        </div>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white">Audit reports</h1>
        <p className="mt-2 text-sm text-slate-400">Every AI visibility audit run across the site, live from the store.</p>
      </header>

      {/* ── Filters ── */}
      <div className="admin-panel p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="flex-1">
            <label className="admin-label">Domain</label>
            <input
              type="text"
              value={filters.domain}
              onChange={(e) => setFilters((f) => ({ ...f, domain: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
              placeholder="e.g. acme.com"
              className="admin-input px-3.5 py-2.5"
            />
          </div>
          <div className="lg:w-44">
            <label className="admin-label">Band</label>
            <select
              value={filters.band}
              onChange={(e) => setFilters((f) => ({ ...f, band: e.target.value }))}
              className="admin-input px-3.5 py-2.5"
            >
              <option value="">All bands</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div className="lg:w-44">
            <label className="admin-label">User type</label>
            <select
              value={filters.isLogined}
              onChange={(e) => setFilters((f) => ({ ...f, isLogined: e.target.value }))}
              className="admin-input px-3.5 py-2.5"
            >
              <option value="">All</option>
              <option value="logged">Logged in</option>
              <option value="anonymous">Anonymous</option>
            </select>
          </div>
          <button onClick={applyFilters} className="admin-btn-primary px-5 py-2.5">
            Apply filters
          </button>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="admin-panel admin-groove overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-4">
          <h2 className="text-sm font-semibold text-slate-300 tabular-nums">
            {totalCount} report{totalCount !== 1 ? "s" : ""}
          </h2>
          {(filters.band || filters.domain || filters.isLogined) && (
            <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">filtered</span>
          )}
        </div>

        {error && (
          <div className="border-b border-red-400/20 bg-red-500/10 px-6 py-4 text-sm text-red-300">{error}</div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <span className="admin-live text-sm text-slate-500">Loading audits</span>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-sm font-medium text-slate-300">No audit reports match these filters.</p>
            <p className="mt-1 text-xs text-slate-500">Clear a band, mode, or domain and try again.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="admin-th">Domain</th>
                  <th className="admin-th">Score</th>
                  <th className="admin-th">Band</th>
                  <th className="admin-th">User</th>
                  <th className="admin-th">Generated</th>
                  <th className="admin-th text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((a) => (
                  <tr key={a.reportId} className="admin-row">
                    <td className="admin-td">
                      <div className="text-sm font-medium text-white">{a.domainAudited}</div>
                      <div className="mt-0.5 font-mono text-[11px] text-slate-600">{a.reportId}</div>
                    </td>
                    <td className="admin-td">
                      {a.score !== undefined ? (
                        <span className={`font-display text-2xl font-bold tabular-nums ${scoreColor(a.score)}`}>
                          {a.score}
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="admin-td">
                      {a.band ? (
                        <span className={`inline-block rounded-full border px-2 py-0.5 text-[11px] font-semibold capitalize ${BAND_COLORS[a.band] || BAND_COLORS.poor}`}>
                          {a.band}
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="admin-td">
                      {a.userId ? (
                        <a
                          href={`/admin/${encodeURIComponent(a.userId)}`}
                          className="text-xs font-medium text-cyan-300 underline-offset-2 hover:text-cyan-200 hover:underline"
                        >
                          {a.isLogined ? "Registered" : "Guest"} → profile
                        </a>
                      ) : (
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${a.isLogined ? "bg-emerald-400/10 text-emerald-300" : "bg-white/5 text-slate-500"}`}>
                          {a.isLogined ? "Logged in" : "Anonymous"}
                        </span>
                      )}
                    </td>
                    <td className="admin-td whitespace-nowrap text-xs text-slate-400 tabular-nums">
                      {formatDate(a.generatedAt)}
                    </td>
                    <td className="admin-td text-right">
                      <a
                        href={`/audit/${a.reportId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
                      >
                        View report
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="border-t border-white/[0.07] px-6 py-4">
            <button
              onClick={() => fetchPage(page + 1, false)}
              disabled={loadMoreLoading}
              className="admin-btn-ghost inline-flex items-center gap-2 px-4 py-2 text-sm"
            >
              {loadMoreLoading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />}
              Load more ({items.length} of {totalCount})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
