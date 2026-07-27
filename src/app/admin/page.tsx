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

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
      <div className="text-sm text-ink/50 mb-1">{label}</div>
      <div className="text-2xl font-display font-semibold text-ink">{value}</div>
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-semibold text-2xl text-ink">Dashboard</h1>
        <p className="text-sm text-ink/50 mt-1">Overview of all Aibizmod user activity</p>
      </div>

      {/* Analytics Cards */}
      {analytics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Users" value={analytics.totalUsers} />
          <StatCard label="Total Sessions" value={analytics.totalSessions} />
          <StatCard label="Total Page Views" value={analytics.totalPageViews} />
          <StatCard label="Total Clicks" value={analytics.totalClicks} />
          <StatCard label="Audit Reports" value={analytics.totalAuditReports} />
          <StatCard label="Total Duration" value={formatDuration(analytics.totalDurationSeconds)} />
          <StatCard label="Logged-in Users" value={analytics.loggedUsers} />
          <StatCard label="Conversion Rate" value={`${analytics.conversionRate}%`} />
          <StatCard label="Avg Session Duration" value={formatDuration(analytics.avgSessionDuration)} />
          <StatCard label="DAU" value={analytics.dailyActiveUsers} />
          <StatCard label="WAU" value={analytics.weeklyActiveUsers} />
          <StatCard label="MAU" value={analytics.monthlyActiveUsers} />
        </div>
      )}

      {/* Top Pages */}
      {analytics && analytics.topPages.length > 0 && (
        <div className="bg-surface rounded-2xl border border-border shadow-card p-6">
          <h2 className="font-display font-semibold text-lg text-ink mb-4">Top Pages</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-ink/50 font-medium">Path</th>
                  <th className="text-right py-2 px-3 text-ink/50 font-medium">Views</th>
                  <th className="text-right py-2 px-3 text-ink/50 font-medium">Avg Duration</th>
                </tr>
              </thead>
              <tbody>
                {analytics.topPages.map((p, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="py-2 px-3 font-mono text-xs text-royal-deep">{p.path}</td>
                    <td className="py-2 px-3 text-right">{p.views}</td>
                    <td className="py-2 px-3 text-right">{formatDuration(p.avgDuration)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top Clicks */}
      {analytics && analytics.topClicks.length > 0 && (
        <div className="bg-surface rounded-2xl border border-border shadow-card p-6">
          <h2 className="font-display font-semibold text-lg text-ink mb-4">Top Clicks</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-ink/50 font-medium">Path</th>
                  <th className="text-left py-2 px-3 text-ink/50 font-medium">Element</th>
                  <th className="text-right py-2 px-3 text-ink/50 font-medium">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {analytics.topClicks.map((c, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="py-2 px-3 font-mono text-xs text-royal-deep">{c.path}</td>
                    <td className="py-2 px-3 text-ink/70">{c.elementText || '—'}</td>
                    <td className="py-2 px-3 text-right font-semibold">{c.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User List */}
      <div className="bg-surface rounded-2xl border border-border shadow-card p-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            placeholder="Filter by domain..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-canvas text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal text-sm"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-border bg-canvas text-ink text-sm focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            onClick={handleSearch}
            className="px-6 py-2.5 rounded-xl bg-royal text-white font-medium text-sm hover:bg-royal-deep transition-colors"
          >
            Search
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 mb-4">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 text-ink/50 font-medium">User</th>
                <th className="text-left py-3 px-3 text-ink/50 font-medium">Domain</th>
                <th className="text-left py-3 px-3 text-ink/50 font-medium">Role</th>
                <th className="text-left py-3 px-3 text-ink/50 font-medium">Status</th>
                <th className="text-left py-3 px-3 text-ink/50 font-medium">Last Login</th>
                <th className="text-left py-3 px-3 text-ink/50 font-medium">Joined</th>
                <th className="text-right py-3 px-3 text-ink/50 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-ink/40">
                    Loading...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-ink/40">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.userId} className="border-b border-border/50 last:border-0 hover:bg-tint/30 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-medium text-ink">{u.firstName} {u.lastName}</div>
                      <div className="text-xs text-ink/40">{u.email}</div>
                    </td>
                    <td className="py-3 px-3 text-royal-deep font-mono text-xs">{u.domain}</td>
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
                    <td className="py-3 px-3 text-ink/60">{formatDate(u.lastLoginAt)}</td>
                    <td className="py-3 px-3 text-ink/60">{formatDate(u.createdAt)}</td>
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
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="text-sm text-ink/50">
            {totalCount} total users
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-4 py-2 rounded-xl border border-border text-sm font-medium disabled:opacity-30 hover:bg-tint transition-colors"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm text-ink/50">
              Page {page} of {Math.ceil(totalCount / limit)}
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
