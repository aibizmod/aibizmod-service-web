"use client";

import { useState, useEffect, useCallback } from "react";
import { client } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

const GET_GLOBAL_ANALYTICS = gql`
  query AibizmodGlobalAnalytics {
    aibizmodGlobalAnalytics {
      totalUsers
      totalSessions
      totalPageViews
      totalClicks
      totalAuditReports
      totalDurationSeconds
      loggedUsers
      conversionRate
      avgSessionsPerUser
      avgSessionDuration
      dailyActiveUsers
      weeklyActiveUsers
      monthlyActiveUsers
      topPages {
        path
        views
        avgDuration
      }
      topClicks {
        path
        elementText
        clicks
      }
    }
  }
`;

const GET_USERS = gql`
  query AibizmodUsers($page: Int!, $limit: Int!, $domain: String, $status: String) {
    aibizmodUsers(page: $page, limit: $limit, domain: $domain, status: $status) {
      items {
        userId
        email
        firstName
        lastName
        domain
        companyName
        role
        status
        lastLoginAt
        createdAt
      }
      totalCount
      hasMore
      page
      limit
    }
  }
`;

interface GlobalAnalytics {
  totalUsers: number;
  totalSessions: number;
  totalPageViews: number;
  totalClicks: number;
  totalAuditReports: number;
  totalDurationSeconds: number;
  loggedUsers: number;
  conversionRate: number;
  avgSessionsPerUser: number;
  avgSessionDuration: number;
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  topPages: { path: string; views: number; avgDuration: number }[];
  topClicks: { path: string; elementText?: string; clicks: number }[];
}

interface UserItem {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  domain: string;
  companyName?: string;
  role: string;
  status: string;
  lastLoginAt?: string;
  createdAt?: string;
}

const fmt = (n: number) => (Number.isFinite(n) ? n.toLocaleString("en-US") : "0");
const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="admin-panel p-5">
      <p className="admin-label !mb-3">{label}</p>
      <p className="font-display text-[27px] font-semibold leading-none tracking-tight text-white tabular-nums">
        {value}
      </p>
    </div>
  );
}

function MetricGroup({ label, cols, children }: { label: string; cols: 2 | 3 | 4; children: React.ReactNode }) {
  const grid = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4" }[cols];
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 px-1">
        <span aria-hidden="true" className="h-px w-10 shrink-0 bg-gradient-to-r from-[#22D3EE] to-transparent" />
        <h2 className="admin-eyebrow">{label}</h2>
      </div>
      <div className={`grid grid-cols-2 gap-4 ${grid}`}>{children}</div>
    </section>
  );
}

function StickinessBand({ dau, wau, mau }: { dau: number; wau: number; mau: number }) {
  const max = Math.max(mau, 1);
  const daily = clamp(dau / max, 0, 1);
  const weekly = clamp(wau / max, 0, 1);
  const stickiness = mau > 0 ? Math.round((dau / mau) * 100) : 0;
  const weeklyOnly = clamp(weekly - daily, 0, 1);

  return (
    <div className="admin-panel admin-groove p-6 sm:p-7">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="admin-eyebrow">Audience stickiness</p>
          <p className="mt-4 font-display text-5xl font-semibold leading-none tracking-tight text-white tabular-nums">
            {fmt(dau)}
            <span className="ml-2 align-middle text-base font-normal text-slate-400">daily active</span>
          </p>
          <p className="mt-3 font-mono text-sm text-slate-400 tabular-nums">
            {fmt(wau)} WEEKLY · {fmt(mau)} MONTHLY
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-display text-4xl font-semibold leading-none text-cyan-300 tabular-nums">{stickiness}%</p>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            return daily
          </p>
        </div>
      </div>

      <div
        role="img"
        aria-label={`${stickiness}% of monthly active users return daily`}
        className="mt-7 flex h-2 w-full overflow-hidden rounded-full bg-white/[0.07]"
      >
        <span style={{ width: `${daily * 100}%`, background: "linear-gradient(90deg,#22D3EE,#0EA5E9)" }} />
        <span style={{ width: `${weeklyOnly * 100}%`, background: "rgba(34,211,238,0.28)" }} />
        <span className="flex-1 bg-white/[0.05]" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-cyan-400" />Daily</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-cyan-400/30" />Weekly</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-white/20" />Monthly</span>
      </div>
    </div>
  );
}

function TableCard({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="admin-panel admin-groove overflow-hidden">
      <div className="flex items-baseline justify-between gap-4 px-6 pb-4 pt-6">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-4 shrink-0 bg-[linear-gradient(90deg,#D4AF37,transparent)]" />
          <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
        </div>
        {hint && <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">{hint}</span>}
      </div>
      <div className="overflow-x-auto px-2 pb-2">{children}</div>
    </div>
  );
}

function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hrs > 0) return `${hrs}h ${mins}m`;
  return `${mins}m`;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<GlobalAnalytics | null>(null);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [domainFilter, setDomainFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const limit = 20;

  const fetchAnalytics = useCallback(async () => {
    try {
      const { data } = await client.query<{ aibizmodGlobalAnalytics: GlobalAnalytics }>({ query: GET_GLOBAL_ANALYTICS });
      if (data) setAnalytics(data.aibizmodGlobalAnalytics);
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    }
  }, []);

  const fetchUsers = useCallback(
    async (pageNum: number) => {
      setLoading(true);
      setError("");
      try {
        const { data } = await client.query<{
          aibizmodUsers: { items: UserItem[]; totalCount: number; hasMore: boolean };
        }>({
          query: GET_USERS,
          variables: { page: pageNum, limit, domain: domainFilter || undefined, status: statusFilter || undefined },
        });
        if (data) {
          setUsers(data.aibizmodUsers.items);
          setTotalCount(data.aibizmodUsers.totalCount);
          setHasMore(data.aibizmodUsers.hasMore);
        }
      } catch (err: unknown) {
        const gqlErr =
          err && typeof err === "object" && "graphQLErrors" in err
            ? (err.graphQLErrors as Array<{ message?: string }>)?.[0]?.message
            : undefined;
        setError(gqlErr || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    },
    [domainFilter, statusFilter]
  );

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  useEffect(() => {
    fetchUsers(page);
  }, [page, fetchUsers]);

  const handleSearch = () => {
    setPage(1);
    fetchUsers(1);
  };

  const topPageMax = analytics ? Math.max(...analytics.topPages.map((p) => p.views), 1) : 1;

  return (
    <div className="space-y-10">
      {/* Hero — state read with a live signal */}
      <header className="admin-panel admin-groove admin-aura px-7 py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="admin-live text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                Live signal
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Performance at a glance
            </h1>
            {analytics ? (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 tabular-nums">
                <span className="font-medium text-cyan-200">{fmt(analytics.totalSessions)}</span> sessions from{" "}
                <span className="font-medium text-cyan-200">{fmt(analytics.totalUsers)}</span> users ·{" "}
                <span className="font-medium text-cyan-200">{fmt(analytics.totalAuditReports)}</span> audit reports.
              </p>
            ) : (
              <p className="mt-3 text-sm text-slate-500">Reading a snapshot of activity…</p>
            )}
          </div>
          <div className="shrink-0 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Uptime window</p>
            <p className="mt-1 font-mono text-lg text-white tabular-nums">90 days</p>
          </div>
        </div>
      </header>

      {analytics && (
        <>
          <StickinessBand
            dau={analytics.dailyActiveUsers}
            wau={analytics.weeklyActiveUsers}
            mau={analytics.monthlyActiveUsers}
          />

          <div className="space-y-10">
            <MetricGroup label="Audience" cols={3}>
              <StatCard label="Total Users" value={fmt(analytics.totalUsers)} />
              <StatCard label="Logged-in Users" value={fmt(analytics.loggedUsers)} />
              <StatCard label="Sessions" value={fmt(analytics.totalSessions)} />
            </MetricGroup>

            <MetricGroup label="Engagement" cols={4}>
              <StatCard label="Page Views" value={fmt(analytics.totalPageViews)} />
              <StatCard label="Clicks" value={fmt(analytics.totalClicks)} />
              <StatCard label="Avg Session Duration" value={formatDuration(analytics.avgSessionDuration)} />
              <StatCard label="Total Duration" value={formatDuration(analytics.totalDurationSeconds)} />
            </MetricGroup>

            <MetricGroup label="Pipeline" cols={2}>
              <StatCard label="Audit Reports" value={fmt(analytics.totalAuditReports)} />
              <StatCard label="Conversion Rate" value={`${analytics.conversionRate}%`} />
            </MetricGroup>
          </div>

          {analytics.topPages.length > 0 && (
            <TableCard title="Top Pages" hint="by views">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-th w-14">Rank</th>
                    <th className="admin-th">Page</th>
                    <th className="admin-th text-right">Views</th>
                    <th className="admin-th text-right">Avg duration</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.topPages.map((p, i) => (
                    <tr key={i} className="admin-row">
                      <td className="admin-td">
                        <span className="font-mono text-xs font-semibold text-[#D4AF37]/90 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </td>
                      <td className="admin-td">
                        <div className="flex items-center gap-3">
                          <span className="relative h-1.5 w-24 overflow-hidden rounded-full bg-white/[0.07] sm:w-40">
                            <span
                              className="absolute inset-y-0 left-0 rounded-full"
                              style={{ width: `${(p.views / topPageMax) * 100}%`, background: "linear-gradient(90deg,#22D3EE,#0EA5E9)" }}
                            />
                          </span>
                          <span className="truncate font-mono text-xs text-cyan-200/90">{p.path}</span>
                        </div>
                      </td>
                      <td className="admin-td text-right font-medium text-white tabular-nums">{fmt(p.views)}</td>
                      <td className="admin-td text-right text-slate-400 tabular-nums">{formatDuration(p.avgDuration)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableCard>
          )}

          {analytics.topClicks.length > 0 && (
            <TableCard title="Top Clicks" hint="most-clicked elements">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-th">Page</th>
                    <th className="admin-th">Element</th>
                    <th className="admin-th text-right">Clicks</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.topClicks.map((c, i) => (
                    <tr key={i} className="admin-row">
                      <td className="admin-td font-mono text-xs text-cyan-200/90">{c.path}</td>
                      <td className="admin-td text-slate-300">{c.elementText || "—"}</td>
                      <td className="admin-td text-right font-semibold text-white tabular-nums">{fmt(c.clicks)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableCard>
          )}

          {/* Users */}
          <div className="admin-panel admin-groove overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-white/[0.07] p-5 sm:flex-row">
              <input
                type="text"
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
                placeholder="Filter by domain…"
                aria-label="Filter by domain"
                className="admin-input flex-1 px-4 py-2.5"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter by status"
                className="admin-input sm:w-44"
              >
                <option value="">All statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button onClick={handleSearch} className="admin-btn-primary px-6 py-2.5">
                Apply filters
              </button>
            </div>

            <div className="overflow-x-auto px-2 py-2">
              {error && (
                <div className="mx-4 mb-4 rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-th">User</th>
                    <th className="admin-th">Domain</th>
                    <th className="admin-th">Role</th>
                    <th className="admin-th">Status</th>
                    <th className="admin-th">Last login</th>
                    <th className="admin-th">Joined</th>
                    <th className="admin-th text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="admin-td py-10 text-center text-slate-500">
                        <span className="admin-live">Loading users</span>
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="admin-td py-12 text-center">
                        <p className="text-sm font-medium text-slate-300">No matching users</p>
                        <p className="mt-1 text-xs text-slate-500">Try a different domain or status filter.</p>
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.userId} className="admin-row">
                        <td className="admin-td">
                          <div className="font-medium text-white">
                            {u.firstName} {u.lastName}
                          </div>
                          <div className="text-xs text-slate-500">{u.email}</div>
                        </td>
                        <td className="admin-td font-mono text-xs text-cyan-200/90">{u.domain}</td>
                        <td className="admin-td">
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                              u.role === "biz_admin" ? "bg-cyan-400/15 text-cyan-300" : "bg-white/5 text-slate-400"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="admin-td">
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                              u.status === "active" ? "bg-emerald-400/10 text-emerald-300" : "bg-white/5 text-slate-500"
                            }`}
                          >
                            {u.status}
                          </span>
                        </td>
                        <td className="admin-td text-slate-400 tabular-nums">{formatDate(u.lastLoginAt)}</td>
                        <td className="admin-td text-slate-400 tabular-nums">{formatDate(u.createdAt)}</td>
                        <td className="admin-td text-right">
                          <a href={`/admin/${u.userId}`} className="text-xs font-medium text-cyan-300 hover:text-cyan-200">
                            View details →
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] px-6 py-5 sm:flex-row">
              <div className="text-sm text-slate-500 tabular-nums">{fmt(totalCount)} total users</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="admin-btn-ghost px-4 py-2 text-sm"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-slate-400 tabular-nums">
                  Page {page} / {Math.max(Math.ceil(totalCount / limit), 1)}
                </span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!hasMore}
                  className="admin-btn-ghost px-4 py-2 text-sm"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}