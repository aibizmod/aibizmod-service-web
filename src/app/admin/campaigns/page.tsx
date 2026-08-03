"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { client } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

// ──────────────────────────────────────────────────────────────────────────────
// GraphQL
// ──────────────────────────────────────────────────────────────────────────────
const SEND_CAMPAIGN = gql`
  mutation AibizmodSendCampaignEmail($input: AibizmodSendCampaignEmailInput!) {
    aibizmodSendCampaignEmail(input: $input) {
      jobId
      recipientCount
      message
    }
  }
`;

const LIST_JOBS = gql`
  query AibizmodCampaignJobs($page: Int!, $limit: Int!) {
    aibizmodCampaignJobs(page: $page, limit: $limit) {
      items {
        jobId subject totalRecipients sentCount failedCount status startedAt completedAt createdAt
      }
      totalCount hasMore page limit
    }
  }
`;

const JOB_STATUS = gql`
  query AibizmodCampaignJobStatus($jobId: String!) {
    aibizmodCampaignJobStatus(jobId: $jobId) {
      jobId subject totalRecipients sentCount failedCount status startedAt completedAt
    }
  }
`;

const GET_ALL_USERS = gql`
  query AibizmodUsersForCampaign($page: Int!, $limit: Int!) {
    aibizmodUsers(page: $page, limit: $limit) {
      items { userId email firstName lastName domain status }
      totalCount
    }
  }
`;

// ──────────────────────────────────────────────────────────────────────────────
// Pre-built templates (mirrors the backend seed file)
// ──────────────────────────────────────────────────────────────────────────────
const PRESET_TEMPLATES = [
  {
    id: "launch-announcement",
    label: "Launch Announcement",
    emoji: "🚀",
    tag: "Welcome",
    subject: "Welcome to Aibizmod — Your AI-Powered Business Growth Starts Now",
    body: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:32px;background:#f8fafc;border-radius:12px;">
  <h1 style="color:#0f172a;">Welcome to Aibizmod!</h1>
  <p style="color:#334155;">We are excited to have you on board. Aibizmod helps you audit, analyze, and optimize your AI visibility.</p>
  <p style="color:#334155;">Get started by running your first AI Visibility Audit today.</p>
  <p><a href="https://aibizmod.com/ai-visibility-audit-report" style="background:#0f172a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;">Run Your First Audit</a></p>
  <p style="color:#64748b;">Best,<br/>The Aibizmod Team</p>
</div>`,
  },
  {
    id: "audit-ready",
    label: "Audit Results Ready",
    emoji: "📊",
    tag: "Report",
    subject: "Your AI Visibility Audit is Ready",
    body: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:32px;background:#f8fafc;border-radius:12px;">
  <h1 style="color:#0f172a;">Your Audit Results Are In</h1>
  <p style="color:#334155;">We have analyzed your domain and compiled a comprehensive AI Visibility report.</p>
  <p style="color:#334155;"><strong>Your Score:</strong> {{score}}/100</p>
  <p><a href="https://aibizmod.com/ai-visibility-audit-report" style="background:#0f172a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;">View Full Report</a></p>
  <p style="color:#64748b;">Best,<br/>The Aibizmod Team</p>
</div>`,
  },
  {
    id: "newsletter",
    label: "Monthly Newsletter",
    emoji: "📰",
    tag: "Newsletter",
    subject: "Aibizmod Monthly — New Features & Insights",
    body: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:32px;background:#f8fafc;border-radius:12px;">
  <h1 style="color:#0f172a;">This Month at Aibizmod</h1>
  <p style="color:#334155;">Here are the latest updates, tips, and insights to help you improve your AI visibility.</p>
  <h2 style="color:#0f172a;">What's New</h2>
  <ul style="color:#334155;">
    <li>Enhanced audit scoring with AI-powered recommendations</li>
    <li>New dashboard with engagement analytics</li>
    <li>Improved campaign email tracking</li>
  </ul>
  <p><a href="https://aibizmod.com/blog" style="color:#0070f3;">Read the full update →</a></p>
  <p style="color:#64748b;">Best,<br/>The Aibizmod Team</p>
</div>`,
  },
  {
    id: "outreach-a",
    label: "Outreach — Part 1",
    emoji: "📣",
    tag: "Outreach",
    subject: "See How Your Business Performs in AI Search",
    body: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:32px;background:#f8fafc;border-radius:12px;">
  <h1 style="color:#0f172a;">Is Your Business AI-Ready?</h1>
  <p style="color:#334155;">We noticed you haven't tried our AI Visibility Audit yet. Discover how AI models like ChatGPT, Claude, and Gemini perceive your brand.</p>
  <p><a href="https://aibizmod.com/ai-visibility-audit-report" style="background:#0f172a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;">Run Free Audit</a></p>
  <p style="color:#64748b;">Best,<br/>The Aibizmod Team</p>
</div>`,
  },
  {
    id: "outreach-b",
    label: "Outreach — Part 2",
    emoji: "⚡",
    tag: "Outreach",
    subject: "Most Businesses Score Below 50 — See Where You Stand",
    body: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:32px;background:#f8fafc;border-radius:12px;">
  <h1 style="color:#0f172a;">The AI Visibility Gap</h1>
  <p style="color:#334155;">Did you know that most businesses score below 50/100 on AI visibility? Find out where your brand stands with a free audit.</p>
  <p><a href="https://aibizmod.com/ai-visibility-audit-report" style="background:#0f172a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;">Check Your Score</a></p>
  <p style="color:#64748b;">Best,<br/>The Aibizmod Team</p>
</div>`,
  },
  {
    id: "outreach-c",
    label: "Outreach — Part 3",
    emoji: "⏰",
    tag: "Outreach",
    subject: "Last Chance — Claim Your Free AI Visibility Audit",
    body: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:32px;background:#f8fafc;border-radius:12px;">
  <h1 style="color:#0f172a;">Don't Miss Out</h1>
  <p style="color:#334155;">This is your last opportunity to claim a free AI Visibility Audit. Understand how AI sees your business and get actionable recommendations.</p>
  <p><a href="https://aibizmod.com/ai-visibility-audit-report" style="background:#0f172a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;">Claim Now</a></p>
  <p style="color:#64748b;">Best,<br/>The Aibizmod Team</p>
</div>`,
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────
interface CampaignJob {
  jobId: string; subject: string; totalRecipients: number;
  sentCount: number; failedCount: number; status: string;
  startedAt?: string; completedAt?: string; createdAt?: string;
}
interface UserOption { userId: string; email: string; firstName?: string; lastName?: string; domain: string; status: string; }

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────
function parseDate(d?: string | null): Date | null {
  if (!d) return null;
  const raw = /^\d+$/.test(d.trim()) ? Number(d) : d;
  const date = new Date(raw);
  return isNaN(date.getTime()) ? null : date;
}
function fmt(d?: string | null) {
  const date = parseDate(d);
  if (!date) return "—";
  return date.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function StatusBadge({ status, sent, total, failed }: { status: string; sent: number; total: number; failed: number }) {
  if (status === "processing") {
    const pct = total > 0 ? Math.round((sent / total) * 100) : 0;
    return (
      <div className="flex flex-col gap-1.5 min-w-[130px]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-semibold text-amber-300">Sending… {pct}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden">
          <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-[11px] text-slate-500 tabular-nums">{sent}/{total} sent{failed > 0 ? `, ${failed} failed` : ""}</span>
      </div>
    );
  }
  if (status === "completed") return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5">
        <span className="text-sm text-emerald-400">✓</span>
        <span className="text-xs font-semibold text-emerald-300">Completed</span>
      </div>
      <span className="text-[11px] text-slate-500 tabular-nums">{sent}/{total} sent{failed > 0 ? `, ${failed} failed` : ""}</span>
    </div>
  );
  if (status === "failed") return (
    <div className="flex items-center gap-1.5">
      <span className="text-sm text-red-400">✕</span>
      <span className="text-xs font-semibold text-red-300">Failed</span>
    </div>
  );
  return <span className="text-xs text-slate-500">{status}</span>;
}

// ──────────────────────────────────────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────────────────────────────────────
export default function CampaignsPage() {
  // Compose state
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [recipientMode, setRecipientMode] = useState<"all" | "manual">("all");
  const [manualEmails, setManualEmails] = useState("");
  const [allUsers, setAllUsers] = useState<UserOption[]>([]);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [domainFilter, setDomainFilter] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ jobId: string; recipientCount: number; message: string } | null>(null);
  const [sendError, setSendError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Jobs list state
  const [jobs, setJobs] = useState<CampaignJob[]>([]);
  const [jobsTotal, setJobsTotal] = useState(0);
  const [jobsLoading, setJobsLoading] = useState(true);

  // Active job polling
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [pollingJobId, setPollingJobId] = useState<string | null>(null);

  // ── Load all users for recipient selection ────────────────────────────────
  const loadAllUsers = useCallback(async () => {
    if (usersLoaded) return;
    try {
      const { data } = await client.query<{ aibizmodUsers: { items: UserOption[]; totalCount: number } }>({
        query: GET_ALL_USERS,
        variables: { page: 1, limit: 500 },
        fetchPolicy: "network-only",
      });
      if (data) {
        setAllUsers(data.aibizmodUsers.items.filter(u => u.status === "active"));
        setUsersLoaded(true);
      }
    } catch (e) { console.error(e); }
  }, [usersLoaded]);

  useEffect(() => { loadAllUsers(); }, [loadAllUsers]);

  // ── Load jobs list ────────────────────────────────────────────────────────
  const fetchJobs = useCallback(async () => {
    try {
      const { data } = await client.query<{ aibizmodCampaignJobs: { items: CampaignJob[]; totalCount: number } }>({
        query: LIST_JOBS,
        variables: { page: 1, limit: 50 },
        fetchPolicy: "network-only",
      });
      if (data) {
        setJobs(data.aibizmodCampaignJobs.items);
        setJobsTotal(data.aibizmodCampaignJobs.totalCount);
      }
    } catch (e) { console.error(e); }
    finally { setJobsLoading(false); }
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  // ── Poll active job status ────────────────────────────────────────────────
  const pollJob = useCallback(async (jobId: string) => {
    try {
      const { data } = await client.query<{ aibizmodCampaignJobStatus: CampaignJob }>({
        query: JOB_STATUS,
        variables: { jobId },
        fetchPolicy: "network-only",
      });
      const updated = data?.aibizmodCampaignJobStatus;
      if (updated) {
        setJobs(prev => prev.map(j => j.jobId === jobId ? { ...j, ...updated } : j));
        if (updated.status !== "processing") {
          // Stop polling when done
          if (pollingRef.current) clearInterval(pollingRef.current);
          setPollingJobId(null);
        }
      }
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    if (!pollingJobId) return;
    pollingRef.current = setInterval(() => pollJob(pollingJobId), 3000);
    return () => { if (pollingRef.current) clearInterval(pollingRef.current); };
  }, [pollingJobId, pollJob]);

  // ── Computed recipients ────────────────────────────────────────────────────
  const filteredUsers = domainFilter
    ? allUsers.filter(u => u.domain?.includes(domainFilter.toLowerCase()))
    : allUsers;

  const recipients: string[] = recipientMode === "all"
    ? filteredUsers.map(u => u.email)
    : manualEmails.split(/[\n,;]+/).map(e => e.trim()).filter(e => e.includes("@"));

  // ── Send campaign ─────────────────────────────────────────────────────────
  const handleSend = async () => {
    setSendError("");
    setSendResult(null);
    if (!subject.trim()) { setSendError("Subject is required."); return; }
    if (!message.trim()) { setSendError("Email body is required."); return; }
    if (recipients.length === 0) { setSendError("No valid recipients selected."); return; }

    setSending(true);
    try {
      const { data } = await client.mutate<{ aibizmodSendCampaignEmail: { jobId: string; recipientCount: number; message: string } }>({
        mutation: SEND_CAMPAIGN,
        variables: {
          input: {
            subject,
            message,
            recipients: recipients.map(email => ({ email })),
          },
        },
      });
      if (data?.aibizmodSendCampaignEmail) {
        const result = data.aibizmodSendCampaignEmail;
        setSendResult(result);
        // Add new job optimistically
        const newJob: CampaignJob = {
          jobId: result.jobId, subject,
          totalRecipients: result.recipientCount,
          sentCount: 0, failedCount: 0, status: "processing",
          startedAt: new Date().toISOString(),
        };
        setJobs(prev => [newJob, ...prev]);
        setJobsTotal(t => t + 1);
        setPollingJobId(result.jobId);
        // Reset form
        setSubject(""); setMessage(""); setManualEmails(""); setDomainFilter("");
      }
    } catch (e: unknown) {
      const err = e as { graphQLErrors?: Array<{ message?: string }>; message?: string };
      const msg = err?.graphQLErrors?.[0]?.message || err?.message || "Failed to send campaign";
      setSendError(msg);
    } finally { setSending(false); }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <header className="admin-panel admin-groove admin-aura px-7 py-7">
        <div className="flex items-center gap-3">
          <span className="admin-live text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
            Dispatch
          </span>
        </div>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white">Email campaigns</h1>
        <p className="mt-2 text-sm text-slate-400">Compose and send bulk email to Aibizmod users, then watch delivery live.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">

        {/* ── COMPOSE PANEL ── */}
        <div className="admin-panel admin-groove overflow-hidden">
          <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-6 py-4">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <h2 className="font-display font-semibold text-white">Compose campaign</h2>
          </div>
          <div className="p-6 space-y-6">

            {/* Template Picker */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="admin-label !mb-0">Start from a template</label>
                <button
                  onClick={() => setShowTemplatePicker(p => !p)}
                  className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition flex items-center gap-1"
                >
                  {showTemplatePicker ? "▲ Hide" : "▼ Choose template"}
                </button>
              </div>

              {showTemplatePicker && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                  {PRESET_TEMPLATES.map(tpl => (
                    <button
                      key={tpl.id}
                      onClick={() => {
                        setSubject(tpl.subject);
                        setMessage(tpl.body);
                        setSelectedTemplateId(tpl.id);
                        setShowTemplatePicker(false);
                      }}
                      className={`flex flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition ${
                        selectedTemplateId === tpl.id
                          ? "border-cyan-400/50 bg-cyan-400/10"
                          : "border-white/10 bg-white/[0.03] hover:border-cyan-400/30 hover:bg-cyan-400/5"
                      }`}
                    >
                      <span className="text-xl">{tpl.emoji}</span>
                      <span className="text-xs font-semibold text-white leading-tight">{tpl.label}</span>
                      <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                        tpl.tag === "Welcome" ? "bg-emerald-400/10 text-emerald-300" :
                        tpl.tag === "Report" ? "bg-cyan-400/10 text-cyan-300" :
                        tpl.tag === "Newsletter" ? "bg-purple-400/10 text-purple-300" :
                        "bg-amber-400/10 text-amber-300"
                      }`}>{tpl.tag}</span>
                    </button>
                  ))}
                </div>
              )}

              {selectedTemplateId && !showTemplatePicker && (
                <div className="flex items-center gap-2 mb-3 rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 py-2">
                  <span className="text-sm">{PRESET_TEMPLATES.find(t => t.id === selectedTemplateId)?.emoji}</span>
                  <span className="flex-1 text-xs font-medium text-cyan-300">
                    Template: {PRESET_TEMPLATES.find(t => t.id === selectedTemplateId)?.label}
                  </span>
                  <button
                    onClick={() => { setSelectedTemplateId(null); setSubject(""); setMessage(""); }}
                    className="text-[11px] text-slate-500 hover:text-red-300 transition"
                  >
                    ✕ Clear
                  </button>
                </div>
              )}
            </div>

            {/* Subject */}
            <div>
              <label className="admin-label">Subject line</label>
              <input
                type="text"
                value={subject}
                onChange={e => { setSubject(e.target.value); setSelectedTemplateId(null); }}
                placeholder="e.g. Improve your AI visibility today"
                className="admin-input px-4 py-2.5"
              />
            </div>

            {/* Recipients */}
            <div>
              <label className="admin-label">Recipients</label>
              <div className="flex gap-2 mb-3">
                {(["all", "manual"] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setRecipientMode(mode)}
                    className={`rounded-xl border px-4 py-1.5 text-xs font-semibold transition ${
                      recipientMode === mode
                        ? "border-cyan-400/60 bg-cyan-400/15 text-cyan-200"
                        : "border-white/10 text-slate-400 hover:border-cyan-400/30 hover:text-white"
                    }`}
                  >
                    {mode === "all" ? "All active users" : "Custom list"}
                  </button>
                ))}
              </div>

              {recipientMode === "all" ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={domainFilter}
                    onChange={e => setDomainFilter(e.target.value)}
                    placeholder="Filter by domain (leave blank for all)"
                    className="admin-input px-4 py-2"
                  />
                  <div className="px-1 text-xs text-slate-500 tabular-nums">
                    {usersLoaded
                      ? <><span className="font-semibold text-cyan-300">{recipients.length}</span> active users selected</>
                      : "Loading users…"}
                  </div>
                </div>
              ) : (
                <div>
                  <textarea
                    value={manualEmails}
                    onChange={e => setManualEmails(e.target.value)}
                    placeholder={"Paste emails separated by commas, semicolons, or newlines:\nuser@company.com\nanother@example.com"}
                    rows={4}
                    className="admin-input resize-y px-4 py-2.5 font-mono"
                  />
                  <div className="mt-1 px-1 text-xs text-slate-500 tabular-nums">
                    <span className="font-semibold text-cyan-300">{recipients.length}</span> valid email{recipients.length !== 1 ? "s" : ""} parsed
                  </div>
                </div>
              )}
            </div>

            {/* Message body */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="admin-label !mb-0">Email body (HTML)</label>
                <button
                  onClick={() => setShowPreview(p => !p)}
                  className="text-xs text-cyan-300 hover:text-cyan-200 font-medium transition"
                >
                  {showPreview ? "Hide preview" : "Show preview"}
                </button>
              </div>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder={"<h2>Hello!</h2>\n<p>Your message here...</p>\n<p><a href=\"https://aibizmod.com\">Visit Aibizmod</a></p>"}
                rows={10}
                className="admin-input resize-y px-4 py-2.5 font-mono"
              />
              <p className="px-1 mt-1 text-[11px] text-slate-500">
                Supports HTML. Click and open-tracking pixels are injected automatically.
              </p>
            </div>

            {/* Preview */}
            {showPreview && message && (
              <div className="rounded-xl border border-white/10 overflow-hidden">
                <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-400">
                  <span>📧</span> Email preview — <span className="font-mono text-cyan-300">{subject || "(no subject)"}</span>
                </div>
                <div
                  className="max-w-none bg-white p-5 text-sm prose prose-sm"
                  dangerouslySetInnerHTML={{ __html: message }}
                />
              </div>
            )}

            {/* Error / Success */}
            {sendError && (
              <div className="rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-300">
                {sendError}
              </div>
            )}
            {sendResult && (
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                <div className="text-sm font-semibold text-emerald-300">Campaign queued</div>
                <div className="mt-1 text-xs text-emerald-200">{sendResult.message}</div>
                <div className="mt-1 font-mono text-[11px] text-emerald-300/70">Job ID: {sendResult.jobId}</div>
              </div>
            )}

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={sending || recipients.length === 0 || !subject.trim() || !message.trim()}
              className="admin-btn-primary w-full py-3 text-sm active:scale-[0.99]"
            >
              {sending
                ? "Sending…"
                : `Send to ${recipients.length} recipient${recipients.length !== 1 ? "s" : ""}`}
            </button>
          </div>
        </div>

        {/* ── STATUS PANEL ── */}
        <div className="admin-panel admin-groove overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <h2 className="font-display font-semibold text-white">Campaign history</h2>
              {jobsTotal > 0 && (
                <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-xs font-semibold text-cyan-300 tabular-nums">{jobsTotal}</span>
              )}
            </div>
            <button
              onClick={fetchJobs}
              className="text-xs text-slate-500 transition hover:text-cyan-300 font-medium"
            >
              ↺ Refresh
            </button>
          </div>

          <div className="p-4">
            {jobsLoading ? (
              <div className="flex items-center justify-center py-16">
                <span className="admin-live text-sm text-slate-500">Loading campaigns</span>
              </div>
            ) : jobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-sm font-medium text-slate-300">No campaigns sent yet.</p>
                <p className="mt-1 text-xs text-slate-500">Compose your first one on the left.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {jobs.map(job => (
                  <div
                    key={job.jobId}
                    className={`rounded-xl border p-4 transition-all ${
                      job.status === "processing"
                        ? "border-amber-400/20 bg-amber-400/5"
                        : job.status === "completed"
                        ? "border-emerald-400/20 bg-emerald-400/5"
                        : job.status === "failed"
                        ? "border-red-400/20 bg-red-400/5"
                        : "border-white/10 bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="truncate text-sm font-semibold text-white">{job.subject}</div>
                          <div className="mt-0.5 font-mono text-[11px] text-slate-600">{job.jobId}</div>
                        </div>
                        <div className="flex-shrink-0">
                          <StatusBadge
                            status={job.status}
                            sent={job.sentCount}
                            total={job.totalRecipients}
                            failed={job.failedCount}
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 tabular-nums">
                        <span>{job.totalRecipients} recipients</span>
                        {job.status === "completed" && (
                          <>
                            <span className="text-emerald-300">{job.sentCount} sent</span>
                            {job.failedCount > 0 && <span className="text-red-300">{job.failedCount} failed</span>}
                          </>
                        )}
                        <span>Started {fmt(job.startedAt || job.createdAt)}</span>
                        {job.completedAt && <span>Done {fmt(job.completedAt)}</span>}
                      </div>

                      {job.status === "completed" && job.totalRecipients > 0 && (
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-emerald-400"
                              style={{ width: `${Math.round((job.sentCount / job.totalRecipients) * 100)}%` }}
                            />
                          </div>
                          <span className="w-10 text-right text-[11px] font-semibold text-emerald-300 tabular-nums">
                            {Math.round((job.sentCount / job.totalRecipients) * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
