"use client";

import { useState, useEffect, useCallback } from "react";
import { client } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

// ──────────────────────────────────────────────────────────────────────────────
// GraphQL Queries
// ──────────────────────────────────────────────────────────────────────────────
const GET_USER = gql`
  query AibizmodUser($userId: String!) {
    aibizmodUser(userId: $userId) {
      userId email firstName lastName companyName domain role status lastLoginAt createdAt
    }
  }
`;

const GET_USER_ENGAGEMENT = gql`
  query AibizmodUserEngagement($userId: String!) {
    aibizmodUserEngagement(userId: $userId) {
      userId email totalSessions totalPageViews totalClicks totalDurationSeconds totalAuditReports leadScore lastSeenAt
    }
  }
`;

const GET_SESSIONS = gql`
  query AibizmodSessionsByUser($userId: String!, $page: Int!, $limit: Int!) {
    aibizmodSessionsByUser(userId: $userId, page: $page, limit: $limit) {
      items { sessionId userAgent referrer utmSource utmMedium utmCampaign startedAt lastActivityAt totalDurationSeconds }
      totalCount hasMore
    }
  }
`;

const GET_PAGEVIEWS = gql`
  query AibizmodPageViewsByUser($userId: String!, $page: Int!, $limit: Int!) {
    aibizmodPageViewsByUser(userId: $userId, page: $page, limit: $limit) {
      items { viewId path title durationSeconds scrollDepthPercent enteredAt }
      totalCount hasMore
    }
  }
`;

const GET_CLICKS = gql`
  query AibizmodClicksByUser($userId: String!, $page: Int!, $limit: Int!) {
    aibizmodClicksByUser(userId: $userId, page: $page, limit: $limit) {
      items { clickId path elementId elementText targetUrl clickedAt }
      totalCount hasMore
    }
  }
`;

const GET_AUDITS = gql`
  query AibizmodAuditReportsByUser($userId: String!, $page: Int!, $limit: Int!) {
    aibizmodAuditReportsByUser(userId: $userId, page: $page, limit: $limit) {
      items { reportId domainAudited score band isLogined generatedAt }
      totalCount hasMore
    }
  }
`;

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────
interface UserInfo {
  userId: string; email: string; firstName?: string; lastName?: string;
  companyName?: string; domain: string; role: string; status: string;
  lastLoginAt?: string; createdAt?: string;
}
interface Engagement {
  totalSessions: number; totalPageViews: number; totalClicks: number;
  totalDurationSeconds: number; totalAuditReports: number; leadScore: number; lastSeenAt?: string;
}
interface SessionItem {
  sessionId: string; userAgent?: string; referrer?: string;
  utmSource?: string; utmMedium?: string; utmCampaign?: string;
  startedAt?: string; lastActivityAt?: string; totalDurationSeconds?: number;
}
interface PageViewItem {
  viewId: string; path: string; title?: string;
  durationSeconds?: number; scrollDepthPercent?: number; enteredAt?: string;
}
interface ClickItem {
  clickId: string; path: string; elementId?: string;
  elementText?: string; targetUrl?: string; clickedAt?: string;
}
interface AuditItem {
  reportId: string; domainAudited: string; score?: number;
  band?: string; isLogined: boolean; generatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────
function formatDuration(s: number): string {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
}
function parseDate(d?: string | number | null): Date | null {
  if (!d && d !== 0) return null;
  // If it's a pure numeric string (MongoDB epoch ms), convert to number first
  const raw = typeof d === "string" && /^\d+$/.test(d.trim()) ? Number(d) : d;
  const date = new Date(raw);
  return isNaN(date.getTime()) ? null : date;
}
function formatDate(d?: string | number | null): string {
  const date = parseDate(d);
  if (!date) return "—";
  return date.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function formatDateShort(d?: string | number | null): string {
  const date = parseDate(d);
  if (!date) return "—";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function truncate(s?: string, max = 40): string {
  if (!s) return "—";
  return s.length > max ? s.slice(0, max) + "…" : s;
}
function deviceFromUA(ua?: string): string {
  if (!ua) return "Unknown";
  if (/mobile/i.test(ua)) return "📱 Mobile";
  if (/tablet/i.test(ua)) return "📟 Tablet";
  return "🖥️ Desktop";
}

// Band colors
const BAND_COLORS: Record<string, string> = {
  excellent: "bg-emerald-100 text-emerald-700 border-emerald-200",
  good: "bg-cyan-100 text-cyan-700 border-cyan-200",
  fair: "bg-amber-100 text-amber-700 border-amber-200",
  poor: "bg-red-100 text-red-700 border-red-200",
  critical: "bg-red-200 text-red-800 border-red-300",
};

// Score color
function scoreColor(score?: number): string {
  if (!score) return "text-ink/40";
  if (score >= 80) return "text-emerald-600";
  if (score >= 65) return "text-cyan-600";
  if (score >= 45) return "text-amber-600";
  return "text-red-600";
}

// ──────────────────────────────────────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card p-5 flex flex-col gap-1">
      <div className="text-xs text-ink/40 font-medium uppercase tracking-wide">{label}</div>
      <div className="text-2xl font-display font-bold text-ink leading-none">{value}</div>
      {sub && <div className="text-xs text-ink/40">{sub}</div>}
    </div>
  );
}

function LeadScoreBadge({ score }: { score: number }) {
  const color = score >= 200 ? "from-emerald-500 to-teal-600" :
    score >= 100 ? "from-cyan-500 to-blue-600" :
    score >= 50 ? "from-amber-500 to-orange-500" : "from-slate-400 to-slate-500";
  const label = score >= 200 ? "Hot Lead" : score >= 100 ? "Warm Lead" : score >= 50 ? "Engaged" : "Cold";
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${color} text-white text-sm font-semibold shadow`}>
      <span className="text-lg">{score >= 200 ? "🔥" : score >= 100 ? "⚡" : score >= 50 ? "💡" : "❄️"}</span>
      <span>{score} pts — {label}</span>
    </div>
  );
}

function ScrollBar({ pct }: { pct: number }) {
  const color = pct >= 80 ? "bg-emerald-400" : pct >= 50 ? "bg-cyan-400" : pct >= 25 ? "bg-amber-400" : "bg-red-400";
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-1.5 rounded-full bg-ink/10 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-ink/60 w-8 text-right">{pct}%</span>
    </div>
  );
}

type Tab = "overview" | "sessions" | "pageviews" | "clicks" | "audits";

// ──────────────────────────────────────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────────────────────────────────────
export default function UserDetailPage({ params }: { params: { userId: string } }) {
  const { userId } = params;

  const [user, setUser] = useState<UserInfo | null>(null);
  const [engagement, setEngagement] = useState<Engagement | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [pageviews, setPageviews] = useState<PageViewItem[]>([]);
  const [clicks, setClicks] = useState<ClickItem[]>([]);
  const [audits, setAudits] = useState<AuditItem[]>([]);

  const [sessionTotal, setSessionTotal] = useState(0);
  const [pageviewTotal, setPageviewTotal] = useState(0);
  const [clickTotal, setClickTotal] = useState(0);
  const [auditTotal, setAuditTotal] = useState(0);

  const [tabLoading, setTabLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user + engagement on mount
  useEffect(() => {
    async function load() {
      try {
        const [ur, er] = await Promise.all([
          client.query<{ aibizmodUser: UserInfo }>({ query: GET_USER, variables: { userId } }),
          client.query<{ aibizmodUserEngagement: Engagement }>({ query: GET_USER_ENGAGEMENT, variables: { userId } }),
        ]);
        if (ur.data) setUser(ur.data.aibizmodUser);
        if (er.data) setEngagement(er.data.aibizmodUserEngagement);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    }
    load();
  }, [userId]);

  const fetchSessions = useCallback(async () => {
    setTabLoading(true);
    try {
      const { data } = await client.query<{ aibizmodSessionsByUser: { items: SessionItem[]; totalCount: number } }>({
        query: GET_SESSIONS, variables: { userId, page: 1, limit: 50 },
      });
      if (!data) return;
      setSessions(data.aibizmodSessionsByUser.items);
      setSessionTotal(data.aibizmodSessionsByUser.totalCount);
    } catch (e) { console.error(e); } finally { setTabLoading(false); }
  }, [userId]);

  const fetchPageviews = useCallback(async () => {
    setTabLoading(true);
    try {
      const { data } = await client.query<{ aibizmodPageViewsByUser: { items: PageViewItem[]; totalCount: number } }>({
        query: GET_PAGEVIEWS, variables: { userId, page: 1, limit: 100 },
      });
      if (!data) return;
      setPageviews(data.aibizmodPageViewsByUser.items);
      setPageviewTotal(data.aibizmodPageViewsByUser.totalCount);
    } catch (e) { console.error(e); } finally { setTabLoading(false); }
  }, [userId]);

  const fetchClicks = useCallback(async () => {
    setTabLoading(true);
    try {
      const { data } = await client.query<{ aibizmodClicksByUser: { items: ClickItem[]; totalCount: number } }>({
        query: GET_CLICKS, variables: { userId, page: 1, limit: 100 },
      });
      if (!data) return;
      setClicks(data.aibizmodClicksByUser.items);
      setClickTotal(data.aibizmodClicksByUser.totalCount);
    } catch (e) { console.error(e); } finally { setTabLoading(false); }
  }, [userId]);

  const fetchAudits = useCallback(async () => {
    setTabLoading(true);
    try {
      const { data } = await client.query<{ aibizmodAuditReportsByUser: { items: AuditItem[]; totalCount: number } }>({
        query: GET_AUDITS, variables: { userId, page: 1, limit: 50 },
      });
      if (!data) return;
      setAudits(data.aibizmodAuditReportsByUser.items);
      setAuditTotal(data.aibizmodAuditReportsByUser.totalCount);
    } catch (e) { console.error(e); } finally { setTabLoading(false); }
  }, [userId]);

  useEffect(() => {
    if (activeTab === "sessions") fetchSessions();
    else if (activeTab === "pageviews") fetchPageviews();
    else if (activeTab === "clicks") fetchClicks();
    else if (activeTab === "audits") fetchAudits();
  }, [activeTab, fetchSessions, fetchPageviews, fetchClicks, fetchAudits]);

  // ─── Loading / Not Found ───────────────────────────────────────────────────
  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-royal border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <div className="text-sm text-ink/40">Loading user profile...</div>
      </div>
    </div>
  );

  if (!user) return (
    <div className="text-center py-24">
      <div className="text-4xl mb-4">👤</div>
      <div className="text-ink/40 mb-2">User not found</div>
      <a href="/admin" className="text-royal-deep hover:text-royal text-sm font-medium">← Back to Dashboard</a>
    </div>
  );

  // ─── Computed overview insights ────────────────────────────────────────────
  const avgTimePerSession = engagement && engagement.totalSessions > 0
    ? Math.floor(engagement.totalDurationSeconds / engagement.totalSessions)
    : 0;
  const pagesPerSession = engagement && engagement.totalSessions > 0
    ? (engagement.totalPageViews / engagement.totalSessions).toFixed(1)
    : "0";

  const TABS: { key: Tab; label: string; count?: number }[] = [
    { key: "overview", label: "Overview" },
    { key: "sessions", label: "Sessions", count: sessionTotal },
    { key: "pageviews", label: "Pages Visited", count: pageviewTotal },
    { key: "clicks", label: "Clicks", count: clickTotal },
    { key: "audits", label: "Audit Reports", count: auditTotal },
  ];

  return (
    <div className="space-y-6">

      {/* ── Back link ── */}
      <a href="/admin" className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-royal font-medium transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </a>

      {/* ── User Header card ── */}
      <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
        <div className="bg-gradient-to-r from-royal/5 via-transparent to-transparent px-6 pt-6 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-royal/20 to-royal-deep/30 flex items-center justify-center text-royal font-display font-bold text-xl flex-shrink-0">
                {(user.firstName?.[0] || user.email[0]).toUpperCase()}
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-ink">
                  {user.firstName || ""} {user.lastName || ""}
                  {!user.firstName && !user.lastName && <span className="text-ink/40">(No name set)</span>}
                </h1>
                <div className="text-sm text-ink/50 mt-0.5">{user.email}</div>
                {user.companyName && <div className="text-xs text-ink/40 mt-0.5">{user.companyName}</div>}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                user.role === "biz_admin" ? "bg-royal/10 text-royal border-royal/20" : "bg-tint text-ink/60 border-border"
              }`}>
                {user.role === "biz_admin" ? "👑 Admin" : "👤 User"}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                user.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-ink/5 text-ink/50 border-border"
              }`}>
                {user.status === "active" ? "● Active" : "○ Inactive"}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink/50">
            <div><span className="font-semibold text-ink/70">Domain:</span> <span className="font-mono">{user.domain}</span></div>
            <div><span className="font-semibold text-ink/70">Joined:</span> {formatDateShort(user.createdAt)}</div>
            <div><span className="font-semibold text-ink/70">Last login:</span> {formatDate(user.lastLoginAt)}</div>
            <div><span className="font-semibold text-ink/70">User ID:</span> <span className="font-mono">{user.userId}</span></div>
          </div>
        </div>

        {/* Lead score banner */}
        {engagement && (
          <div className="border-t border-border px-6 py-3 bg-tint/30 flex items-center justify-between flex-wrap gap-3">
            <LeadScoreBadge score={engagement.leadScore} />
            <div className="text-xs text-ink/40">
              Score = sessions×5 + page views×2 + clicks×1 + min(time/60, 100) + audits×20
            </div>
          </div>
        )}
      </div>

      {/* ── Engagement Stats grid ── */}
      {engagement && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <StatCard label="Lead Score" value={engagement.leadScore} sub="Engagement rank" />
          <StatCard label="Sessions" value={engagement.totalSessions} sub={`~${pagesPerSession} pages/session`} />
          <StatCard label="Page Views" value={engagement.totalPageViews} />
          <StatCard label="Clicks" value={engagement.totalClicks} />
          <StatCard label="Total Time" value={formatDuration(engagement.totalDurationSeconds)} sub={`~${formatDuration(avgTimePerSession)}/session`} />
          <StatCard label="Audit Reports" value={engagement.totalAuditReports} />
          <StatCard label="Last Seen" value={formatDateShort(engagement.lastSeenAt)} sub={engagement.lastSeenAt ? formatDate(engagement.lastSeenAt) : "—"} />
        </div>
      )}

      {/* ── Tabs ── */}
      <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
        {/* Tab Bar */}
        <div className="flex border-b border-border overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === tab.key
                  ? "text-royal border-b-2 border-royal bg-royal/5"
                  : "text-ink/40 hover:text-ink/70 hover:bg-tint/50"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  activeTab === tab.key ? "bg-royal/10 text-royal" : "bg-ink/10 text-ink/50"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-6">
          {tabLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-royal border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* ── OVERVIEW TAB ── */}
          {!tabLoading && activeTab === "overview" && engagement && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-display font-semibold text-ink mb-4">Activity Summary</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Behavior insights */}
                  {[
                    {
                      icon: "📊",
                      title: "Engagement Level",
                      detail: engagement.leadScore >= 200 ? "Very high — power user" :
                        engagement.leadScore >= 100 ? "High — regularly active" :
                        engagement.leadScore >= 50 ? "Moderate — exploring" : "Low — just started",
                    },
                    {
                      icon: "⏱️",
                      title: "Avg. Session Duration",
                      detail: avgTimePerSession > 0 ? formatDuration(avgTimePerSession) : "No data yet",
                    },
                    {
                      icon: "📄",
                      title: "Pages per Session",
                      detail: `${pagesPerSession} pages on average`,
                    },
                    {
                      icon: "🔍",
                      title: "Audit Reports Run",
                      detail: engagement.totalAuditReports > 0
                        ? `${engagement.totalAuditReports} audit${engagement.totalAuditReports > 1 ? "s" : ""} — actively researching`
                        : "No audits run yet",
                    },
                    {
                      icon: "🖱️",
                      title: "Total Clicks Tracked",
                      detail: `${engagement.totalClicks} click events recorded`,
                    },
                    {
                      icon: "🕐",
                      title: "Last Seen",
                      detail: engagement.lastSeenAt ? formatDate(engagement.lastSeenAt) : "Never",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-canvas hover:bg-tint/30 transition-colors">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <div className="text-xs font-semibold text-ink/50 uppercase tracking-wide mb-0.5">{item.title}</div>
                        <div className="text-sm font-medium text-ink">{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-ink/40">
                  Click the tabs above to explore full sessions, page visit history, click events, and AI audit reports for this user.
                  All data is live from MongoDB — no caching.
                </p>
              </div>
            </div>
          )}

          {/* ── SESSIONS TAB ── */}
          {!tabLoading && activeTab === "sessions" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-ink">{sessionTotal} session{sessionTotal !== 1 ? "s" : ""} recorded</h2>
              </div>
              {sessions.length === 0 ? (
                <EmptyState icon="🔗" message="No sessions recorded for this user yet." />
              ) : (
                <div className="space-y-2">
                  {sessions.map((s) => (
                    <div key={s.sessionId} className="rounded-xl border border-border bg-canvas p-4 hover:bg-tint/30 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{deviceFromUA(s.userAgent)}</span>
                          {s.utmSource && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-royal/10 text-royal font-medium border border-royal/20">
                              utm: {s.utmSource}
                            </span>
                          )}
                          {s.referrer && !s.utmSource && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-tint text-ink/60 font-medium border border-border truncate max-w-[180px]">
                              ref: {truncate(s.referrer, 30)}
                            </span>
                          )}
                          {!s.utmSource && !s.referrer && (
                            <span className="text-xs text-ink/30">Direct visit</span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-ink/50">
                          <span className="font-semibold text-ink">{formatDuration(s.totalDurationSeconds || 0)}</span>
                          <span>{formatDate(s.startedAt)}</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-ink/30 font-mono">{s.sessionId}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── PAGE VIEWS TAB ── */}
          {!tabLoading && activeTab === "pageviews" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-ink">{pageviewTotal} page view{pageviewTotal !== 1 ? "s" : ""} recorded</h2>
              </div>
              {pageviews.length === 0 ? (
                <EmptyState icon="📄" message="No page views recorded for this user yet." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-ink/40 uppercase tracking-wide">Page</th>
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-ink/40 uppercase tracking-wide">Time Spent</th>
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-ink/40 uppercase tracking-wide w-40">Scroll Depth</th>
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-ink/40 uppercase tracking-wide">Visited</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageviews.map((pv) => (
                        <tr key={pv.viewId} className="border-b border-border/50 last:border-0 hover:bg-tint/30 transition-colors">
                          <td className="py-3 px-3">
                            <div className="font-mono text-xs text-royal-deep font-medium">{pv.path}</div>
                            {pv.title && <div className="text-[11px] text-ink/40 mt-0.5">{truncate(pv.title, 50)}</div>}
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-sm font-semibold text-ink">{formatDuration(pv.durationSeconds || 0)}</span>
                          </td>
                          <td className="py-3 px-3">
                            <ScrollBar pct={pv.scrollDepthPercent || 0} />
                          </td>
                          <td className="py-3 px-3 text-xs text-ink/50">{formatDate(pv.enteredAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── CLICKS TAB ── */}
          {!tabLoading && activeTab === "clicks" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-ink">{clickTotal} click{clickTotal !== 1 ? "s" : ""} recorded</h2>
              </div>
              {clicks.length === 0 ? (
                <EmptyState icon="🖱️" message="No clicks recorded for this user yet." />
              ) : (
                <div className="space-y-2">
                  {clicks.map((c) => (
                    <div key={c.clickId} className="flex items-center gap-3 rounded-xl border border-border bg-canvas p-3.5 hover:bg-tint/30 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-royal/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs">🖱️</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-ink text-sm truncate">
                          {c.elementText || c.elementId || <span className="text-ink/30">Unknown element</span>}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-mono text-[11px] text-royal-deep">{c.path}</span>
                          {c.targetUrl && (
                            <>
                              <span className="text-ink/20">→</span>
                              <span className="text-[11px] text-ink/40 truncate max-w-[140px]">{truncate(c.targetUrl, 40)}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-ink/40 flex-shrink-0 text-right">{formatDate(c.clickedAt)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── AUDIT REPORTS TAB ── */}
          {!tabLoading && activeTab === "audits" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-ink">{auditTotal} audit report{auditTotal !== 1 ? "s" : ""} generated</h2>
              </div>
              {audits.length === 0 ? (
                <EmptyState icon="🔍" message="This user hasn't run any AI visibility audits yet." />
              ) : (
                <div className="space-y-3">
                  {audits.map((a) => (
                    <div key={a.reportId} className="rounded-xl border border-border bg-canvas p-4 hover:bg-tint/30 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center text-lg flex-shrink-0">
                            🔍
                          </div>
                          <div>
                            <div className="font-semibold text-ink text-sm">{a.domainAudited}</div>
                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                              {a.band && (
                                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border capitalize ${BAND_COLORS[a.band] || BAND_COLORS.poor}`}>
                                  {a.band}
                                </span>
                              )}
                              <span className={`text-xs px-1.5 py-0.5 rounded-full ${a.isLogined ? "bg-emerald-50 text-emerald-700" : "bg-ink/5 text-ink/40"}`}>
                                {a.isLogined ? "Logged in" : "Anonymous"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {a.score !== undefined && (
                            <div className={`text-3xl font-display font-bold leading-none ${scoreColor(a.score)}`}>
                              {a.score}
                              <span className="text-sm font-normal text-ink/30">/100</span>
                            </div>
                          )}
                          <div className="text-xs text-ink/40 mt-1">{formatDate(a.generatedAt)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Empty state helper
// ──────────────────────────────────────────────────────────────────────────────
function EmptyState({ icon, message }: { icon: string; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="text-5xl mb-4">{icon}</span>
      <p className="text-sm text-ink/40">{message}</p>
    </div>
  );
}
