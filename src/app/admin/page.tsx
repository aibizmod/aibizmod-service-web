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

const fmt = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString("en-US") : "0";

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

function goldHairline() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-[2px] w-10 shrink-0 rounded-full bg-[linear-gradient(90deg,#D4AF37,#B8860B)]"
    />
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/40">
        {label}
      </p>
      <p className="mt-3 font-display text-[26px] font-semibold leading-none tracking-tight text-ink tabular-nums">
        {value}
      </p>
    </div>
  );
}

function MetricGroup({
  label,
  cols,
  children,
}: {
  label: string;
  cols: 2 | 3 | 4;
  children: React.ReactNode;
}) {
  const grid = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  }[cols];
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        {goldHairline()}
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/40">
          {label}
        </h2>
      </div>
      <div className={`grid grid-cols-2 gap-4 ${grid}`}>{children}</div>
    </section>
  );
}

function StickinessBand({
  dau,
  wau,
  mau,
}: {
  dau: number;
  wau: number;
  mau: number;
}) {
  const max = Math.max(mau, 1);
  const daily = clamp(dau / max, 0, 1);
  const weekly = clamp(wau / max, 0, 1);
  const stickiness = mau > 0 ? Math.round((dau / mau) * 100) : 0;
  const weeklyOnly = clamp(weekly - daily, 0, 1);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/40">
            Audience stickiness
          </p>
          <p className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink tabular-nums">
            {fmt(dau)}
            <span className="ml-2 text-base font-normal text-ink/40">
              daily active
            </span>
          </p>
          <p className="mt-1 text-sm text-ink/50 tabular-nums">
            {fmt(wau)} weekly · {fmt(mau)} monthly
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-display text-3xl font-semibold text-royal-deep tabular-nums">
            {stickiness}%
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-widest text-ink/40">
            return daily
          </p>
        </div>
      </div>

      <div
        role="img"
        aria-label={`${stickiness}% of monthly active users return daily`}
        className="mt-6 flex h-2.5 w-full overflow-hidden rounded-full bg-slate-200/60"
      >
        <span
          className="h-full rounded-l-full"
          style={{ width: `${daily * 100}%`, background: "linear-gradient(120deg,#06B6D4,#3B82F6)" }}
        />
        <span
          className="h-full"
          style={{ width: `${weeklyOnly * 100}%`, background: "rgba(8,145,178,0.28)" }}
        />
        <span className="h-full flex-1 rounded-r-full bg-slate-200/60" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-ink/40">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-cyan-500" />Daily
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: "rgba(8,145,178,0.28)" }} />
          Weekly
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-300" />Monthly
        </span>
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
    <div className="rounded-2xl border border-border bg-surface shadow-card">
      <div className="flex items-baseline justify-between gap-4 px-6 pt-6">
        <div className="flex items-center gap-3">
          {goldHairline()}
          <h2 className="font-display font-semibold text-lg text-ink">
            {title}
          </h2>
        </div>
        {hint && <span className="text-xs text-ink/40">{hint}</span>}
      </div>
      <div className="overflow-x-auto px-2 py-4">{children}</div>
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
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
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
      const { data } = await client.query<{ aibizmodGlobalAnalytics: GlobalAnalytics }>({
        query: GET_GLOBAL_ANALYTICS,
      });
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
          aibizmodUsers: {
            items: UserItem[];
            totalCount: number;
            hasMore: boolean;
          };
        }>({
          query: GET_USERS,
          variables: {
            page: pageNum,
            limit,
            domain: domainFilter || undefined,
            status: statusFilter || undefined,
          },
        });
        if (data) {
          setUsers(data.aibizmodUsers.items);
          setTotalCount(data.aibizmodUsers.totalCount);
          setHasMore(data.aibizmodUsers.hasMore);
        }
      } catch (err: unknown) {
        const graphQLError =
          err && typeof err === "object" && "graphQLErrors" in err
            ? (err.graphQLErrors as Array<{ message?: string }>)?.[0]?.message
            : undefined;
        setError(graphQLError || "Failed to fetch users");
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

  const topPageMax = analytics
    ? Math.max(...analytics.topPages.map((p) => p.views), 1)
    : 1;

  return (
    <div className="space-y-10">
      {/* Header — state read, not a title screen */}
      <header className="max-w-none">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-royal-deep">
            Operations
          </span>
        </div>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
          Performance at a glance
        </h1>
        {analytics ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/50">
            <span className="font-medium text-ink/70 tabular-nums">
              {fmt(analytics.totalSessions)}
            </span>{" "}
            sessions from{" "}
            <span className="font-medium text-ink/70 tabular-nums">
              {fmt(analytics.totalUsers)}
            </span>{" "}
            users ·{" "}
            <span className="font-medium text-ink/70 tabular-nums">
              {fmt(analytics.totalAuditReports)}
            </span>{" "}
            audit reports generated.
          </p>
        ) : (
          <p className="mt-2 text-sm text-ink/40">
            Loading a snapshot of activity…
          </p>
        )}
      </header>

      {/* Signature — audience stickiness */}
      {analytics && (
        <StickinessBand
          dau={analytics.dailyActiveUsers}
          wau={analytics.weeklyActiveUsers}
          mau={analytics.monthlyActiveUsers}
        />
      )}

      {/* Metric clusters — structure is information */}
      {analytics && (
        <div className="space-y-10">
          <MetricGroup label="Audience" cols={3}>
            <StatCard label="Total Users" value={fmt(analytics.totalUsers)} />
            <StatCard label="Logged-in Users" value={fmt(analytics.loggedUsers)} />
            <StatCard label="Sessions" value={fmt(analytics.totalSessions)} />
          </MetricGroup>

          <MetricGroup label="Engagement" cols={4}>
            <StatCard label="Page Views" value={fmt(analytics.totalPageViews)} />
            <StatCard label="Clicks" value={fmt(analytics.totalClicks)} />
            <StatCard
              label="Avg Session Duration"
              value={formatDuration(analytics.avgSessionDuration)}
            />
            <StatCard
              label="Total Duration"
              value={formatDuration(analytics.totalDurationSeconds)}
            />
          </MetricGroup>

          <MetricGroup label="Pipeline" cols={2}>
            <StatCard
              label="Audit Reports"
              value={fmt(analytics.totalAuditReports)}
            />
            <StatCard label="Conversion Rate" value={`${analytics.conversionRate}%`} />
          </MetricGroup>
        </div>
      )}

      {/* Top Pages — ranked, so rank numbers earn their place */}
      {analytics && analytics.topPages.length > 0 && (
        <TableCard title="Top Pages" hint="by views">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="w-12 py-2 px-3 text-left text-[11px] font-semibold uppercase tracking-widest text-ink/40">
                  Rank
                </th>
                <th className="py-2 px-3 text-left text-[11px] font-semibold uppercase tracking-widest text-ink/40">
                  Page
                </th>
                <th className="py-2 px-3 text-right text-[11px] font-semibold uppercase tracking-widest text-ink/40">
                  Views
                </th>
                <th className="py-2 px-3 text-right text-[11px] font-semibold uppercase tracking-widest text-ink/40">
                  Avg Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {analytics.topPages.map((p, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-tint/40 transition-colors">
                  <td className="py-3 px-3">
                    <span className="font-display text-xs font-semibold text-gold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <span className="relative h-1.5 w-24 overflow-hidden rounded-full bg-tint sm:w-36">
                        <span
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{
                            width: `${(p.views / topPageMax) * 100}%`,
                            background: "linear-gradient(90deg,#06B6D4,#3B82F6)",
                          }}
                        />
                      </span>
                      <span className="truncate font-mono text-xs text-royal-deep">
                        {p.path}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-medium tabular-nums text-ink">
                    {fmt(p.views)}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-ink/60">
                    {formatDuration(p.avgDuration)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>
      )}

      {/* Top Clicks */}
      {analytics && analytics.topClicks.length > 0 && (
        <TableCard title="Top Clicks" hint="most-clicked elements">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 px-3 text-left text-[11px] font-semibold uppercase tracking-widest text-ink/40">
                  Page
                </th>
                <th className="py-2 px-3 text-left text-[11px] font-semibold uppercase tracking-widest text-ink/40">
                  Element
                </th>
                <th className="py-2 px-3 text-right text-[11px] font-semibold uppercase tracking-widest text-ink/40">
                  Clicks
                </th>
              </tr>
            </thead>
            <tbody>
              {analytics.topClicks.map((c, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-tint/40 transition-colors">
                  <td className="py-3 px-3 font-mono text-xs text-royal-deep">
                    {c.path}
                  </td>
                  <td className="py-3 px-3 text-ink/70">{c.elementText || "—"}</td>
                  <td className="py-3 px-3 text-right font-semibold tabular-nums text-ink">
                    {fmt(c.clicks)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>
      )}

      {/* Users */}
      <div className="rounded-2xl border border-border bg-surface shadow-card">
        <div className="flex flex-col sm:flex-row gap-3 px-6 pt-6">
          <input
            type="text"
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            placeholder="Filter by domain…"
            aria-label="Filter by domain"
            className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-canvas text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal text-sm"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
            className="px-4 py-2.5 rounded-xl border border-border bg-canvas text-ink text-sm focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            onClick={handleSearch}
            className="px-6 py-2.5 rounded-xl bg-royal text-white font-medium text-sm hover:bg-royal-deep transition-colors"
          >
            Apply filters
          </button>
        </div>

        <div className="overflow-x-auto px-2 py-4">
          {error && (
            <div className="mx-4 mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-3 text-left text-[11px] font-semibold uppercase tracking-widest text-ink/40">
                  User
                </th>
                <th className="py-3 px-3 text-left text-[11px] font-semibold uppercase tracking-widest text-ink/40">
                  Domain
                </th>
                <th className="py-3 px-3 text-left text-[11px] font-semibold uppercase tracking-widest text-ink/40">
                  Role
                </th>
                <th className="py-3 px-3 text-left text-[11px] font-semibold uppercase tracking-widest text-ink/40">
                  Status
                </th>
                <th className="py-3 px-3 text-left text-[11px] font-semibold uppercase tracking-widest text-ink/40">
                  Last Login
                </th>
                <th className="py-3 px-3 text-left text-[11px] font-semibold uppercase tracking-widest text-ink/40">
                  Joined
                </th>
                <th className="py-3 px-3 text-right text-[11px] font-semibold uppercase tracking-widest text-ink/40">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-sm text-ink/40">
                    Loading users…
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center">
                    <p className="text-sm font-medium text-ink/70">
                      No matching users
                    </p>
                    <p className="mt-1 text-xs text-ink/40">
                      Try a different domain or status filter.
                    </p>
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.userId} className="border-b border-border/50 last:border-0 hover:bg-tint/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-medium text-ink">
                        {u.firstName} {u.lastName}
                      </div>
                      <div className="text-xs text-ink/40">{u.email}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-xs text-royal-deep">
                      {u.domain}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        u.role === "biz_admin" ? "bg-royal/10 text-royal" : "bg-tint text-ink/60"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        u.status === "active" ? "bg-green-50 text-green-700" : "bg-ink/5 text-ink/50"
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 tabular-nums text-ink/60">
                      {formatDate(u.lastLoginAt)}
                    </td>
                    <td className="py-3 px-3 tabular-nums text-ink/60">
                      {formatDate(u.createdAt)}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <a
                        href={`/admin/${u.userId}`}
                        className="text-royal-deep hover:text-royal text-xs font-medium"
                      >
                        View Details
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between gap-4 px-6 pb-6">
          <div className="text-sm text-ink/50 tabular-nums">
            {fmt(totalCount)} total users
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-4 py-2 rounded-xl border border-border text-sm font-medium disabled:opacity-30 hover:bg-tint transition-colors"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm text-ink/50 tabular-nums">
              Page {page} of {Math.max(Math.ceil(totalCount / limit), 1)}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasMore}
              className="px-4 py-2 rounded-xl border border-border text-sm font-medium disabled:opacity-30 hover:bg-tint transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
