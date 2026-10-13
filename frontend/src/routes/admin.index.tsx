import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  GraduationCap,
  UserPlus,
  Star,
  Users,
  Mail,
  ArrowUpRight,
  ArrowRight,
  FileText,
  Award,
  MessageSquare,
  Inbox,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import {
  adminStatsSummary,
  adminListApplications,
  adminListTutors,
  adminListMessages,
} from "@/lib/tutor-api.functions";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

function AdminHome() {
  const { user } = useAuth();
  const statsFn = useServerFn(adminStatsSummary);
  const appsFn = useServerFn(adminListApplications);
  const tutorsFn = useServerFn(adminListTutors);
  const msgsFn = useServerFn(adminListMessages);

  const stats = useQuery({ queryKey: ["admin-stats"], queryFn: () => statsFn() });
  const apps = useQuery({ queryKey: ["admin-applications"], queryFn: () => appsFn() });
  const tutors = useQuery({ queryKey: ["admin-tutors"], queryFn: () => tutorsFn() });
  const msgs = useQuery({ queryKey: ["admin-messages"], queryFn: () => msgsFn() });

  // Time-based greeting + date are rendered client-side only to avoid an
  // SSR/client hydration mismatch; the interval also refreshes relative times.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const hour = now?.getHours() ?? -1;
  const greeting =
    hour < 0
      ? "Welcome back"
      : hour < 12
        ? "Good morning"
        : hour < 18
          ? "Good afternoon"
          : "Good evening";
  const dateStr = now
    ? now.toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
  const adminName = capitalize((user?.email ?? "").split("@")[0] || "Admin");

  const a = stats.data?.applications;
  const pending = a?.pending;
  const statusLine =
    pending == null
      ? "Loading your academy overview…"
      : pending > 0
        ? `${pending} application${pending === 1 ? "" : "s"} awaiting your review.`
        : "You're all caught up — no applications in the queue.";

  const statCards = [
    {
      label: "Pending applications",
      value: a?.pending,
      hint: "Awaiting review",
      icon: UserPlus,
      to: "/admin/applications" as const,
      tile: "bg-amber-100 text-amber-700",
    },
    {
      label: "Active tutors",
      value: stats.data?.tutors,
      hint: "Published on site",
      icon: GraduationCap,
      to: "/admin/tutors" as const,
      tile: "bg-primary-soft text-primary",
    },
    {
      label: "Trial bookings",
      value: stats.data?.bookings,
      hint: "Requested lessons",
      icon: Users,
      to: "/admin/students" as const,
      tile: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "Contact messages",
      value: stats.data?.messages,
      hint: "In your inbox",
      icon: Mail,
      to: "/admin/messages" as const,
      tile: "bg-sky-100 text-sky-700",
    },
  ];

  const pendingApps = (apps.data ?? []).filter((x: any) => x.status === "pending");
  const topTutors = (tutors.data ?? [])
    .filter((t: any) => t.is_active && !t.deleted_at)
    .sort((x: any, y: any) => (y.rating ?? 0) - (x.rating ?? 0))
    .slice(0, 5);
  const latestMessages = (msgs.data ?? []).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Operations hero — command-center header */}
      <section className="relative overflow-hidden rounded-3xl bg-ink text-white shadow-glow">
        <div
          className="blob h-64 w-64 -top-24 -left-10"
          style={{ background: "var(--color-primary-glow)" }}
        />
        <div
          className="blob h-72 w-72 -bottom-28 -right-8"
          style={{ background: "var(--color-gold-glow)" }}
        />
        <div className="noise" />
        <div className="relative z-10 flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
              <Sparkles className="h-3 w-3" /> Dashboard
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {greeting}, {adminName}
            </h1>
            <p className="mt-2 text-sm text-white/70">
              {dateStr && <span className="text-white/90">{dateStr}</span>}
              {dateStr && <span className="mx-2 text-white/30">·</span>}
              {statusLine}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/admin/applications" className="btn-gold">
              Review applications <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/admin/tutors"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Manage tutors
            </Link>
          </div>
        </div>
      </section>

      {/* KPI shortcuts */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <Link key={s.label} to={s.to} className="group card-surface card-surface-hover block p-5">
            <div className="flex items-start justify-between">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.tile}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-colors group-hover:text-primary" />
            </div>
            <div className="mt-4 font-display text-3xl font-bold tabular-nums text-ink">
              {stats.isLoading || s.value == null ? (
                <span className="inline-block h-7 w-12 animate-pulse rounded-md bg-surface-2 align-middle" />
              ) : (
                s.value
              )}
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {s.label}
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground/70">{s.hint}</div>
          </Link>
        ))}
      </div>

      {/* Recent applications + Top tutors */}
      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <div className="card-surface p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary shrink-0">
                <FileText className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-ink">Recent applications</h2>
                <p className="text-xs text-muted-foreground">Newest tutors awaiting review</p>
              </div>
            </div>
            <Link
              to="/admin/applications"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline whitespace-nowrap"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 pr-3 font-semibold">Applicant</th>
                  <th className="py-2 pr-3 font-semibold">Subject</th>
                  <th className="py-2 pr-3 font-semibold">Status</th>
                  <th className="py-2 pr-3 font-semibold text-right">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {pendingApps.slice(0, 6).map((x: any) => (
                  <tr
                    key={x.id}
                    className="border-t border-border transition-colors hover:bg-surface-2/70"
                  >
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary shrink-0">
                          {initials(x.full_name)}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate font-semibold text-ink">{x.full_name}</div>
                          <div className="truncate max-w-[200px] text-xs text-muted-foreground">
                            {x.professional_title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-3">
                      {x.subjects?.[0] ? (
                        <span className="inline-flex items-center rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink">
                          {x.subjects[0]}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="py-3 pr-3">
                      <StatusBadge status={x.status} />
                    </td>
                    <td className="py-3 pr-3 text-right text-xs text-muted-foreground whitespace-nowrap">
                      {timeAgo(x.created_at)}
                    </td>
                  </tr>
                ))}
                {apps.isLoading && (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                      Loading applications…
                    </td>
                  </tr>
                )}
                {!apps.isLoading && pendingApps.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-12 text-center">
                      <Inbox className="mx-auto h-8 w-8 text-muted-foreground/40" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        No applications in the queue.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-surface p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-soft text-[oklch(0.42_0.10_75)]">
                <Award className="h-4.5 w-4.5" />
              </div>
              <h2 className="text-lg font-bold text-ink">Top tutors</h2>
            </div>
            <Link to="/admin/tutors" className="text-xs font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          <ul className="mt-5 space-y-1">
            {topTutors.map((t: any, i: number) => (
              <li
                key={t.id}
                className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-surface-2"
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold shrink-0 ${
                    i === 0
                      ? "bg-gold text-gold-foreground"
                      : i === 1
                        ? "bg-primary-soft text-primary"
                        : "bg-surface-2 text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white shrink-0">
                  {initials(t.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-ink">{t.name}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {[t.subjects?.[0], t.curriculums?.[0]].filter(Boolean).join(" · ") || "—"}
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 text-sm font-semibold text-[oklch(0.42_0.10_75)]">
                  <Star className="h-3.5 w-3.5 fill-current text-gold" /> {t.rating ?? "—"}
                </div>
              </li>
            ))}
            {!tutors.isLoading && topTutors.length === 0 && (
              <li className="py-6 text-center text-sm text-muted-foreground">
                No tutors yet — approve an application to publish one.
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Recruitment pipeline + Latest messages */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card-surface p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <TrendingUp className="h-4.5 w-4.5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-ink">Recruitment pipeline</h2>
              <p className="text-xs text-muted-foreground">Application outcomes to date</p>
            </div>
          </div>

          {a ? (
            <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row">
              <ApprovalRing approved={a.approved} total={a.approved + a.pending + a.rejected} />
              <div className="w-full flex-1">
                <PipelineBar approved={a.approved} pending={a.pending} rejected={a.rejected} />
                <ul className="mt-4 space-y-2 text-sm">
                  <LegendRow color="bg-emerald-500" label="Approved" value={a.approved} />
                  <LegendRow color="bg-amber-400" label="In review" value={a.pending} />
                  <LegendRow color="bg-rose-500" label="Rejected" value={a.rejected} />
                </ul>
              </div>
            </div>
          ) : (
            <div className="mt-6 h-32 animate-pulse rounded-2xl bg-surface-2" />
          )}
        </div>

        <div className="card-surface p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                <MessageSquare className="h-4.5 w-4.5" />
              </div>
              <h2 className="text-lg font-bold text-ink">Latest messages</h2>
            </div>
            <Link
              to="/admin/messages"
              className="text-xs font-semibold text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <ul className="mt-5 space-y-1">
            {latestMessages.map((m: any) => (
              <li
                key={m.id}
                className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface-2"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-xs font-bold text-ink shrink-0">
                  {initials(m.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-ink">{m.name}</span>
                    {m.status === "unread" && (
                      <span className="h-2 w-2 rounded-full bg-gold shrink-0" title="Unread" />
                    )}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {m.subject || m.message}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">
                  {timeAgo(m.created_at)}
                </span>
              </li>
            ))}
            {!msgs.isLoading && latestMessages.length === 0 && (
              <li className="py-6 text-center text-sm text-muted-foreground">No messages yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Helpers ---------------- */

function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function initials(name?: string) {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function timeAgo(iso?: string) {
  if (!iso) return "—";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";
  const mins = Math.round((Date.now() - then) / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

function ApprovalRing({ approved, total }: { approved: number; total: number }) {
  const pct = total > 0 ? Math.round((approved / total) * 100) : 0;
  const r = 42;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div className="relative h-32 w-32 shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="var(--color-surface-2)"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ - dash}`}
        />
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-secondary)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-bold text-ink tabular-nums">{pct}%</span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Approved</span>
      </div>
    </div>
  );
}

function PipelineBar({
  approved,
  pending,
  rejected,
}: {
  approved: number;
  pending: number;
  rejected: number;
}) {
  const total = approved + pending + rejected;
  const w = (n: number) => (total > 0 ? `${(n / total) * 100}%` : "0%");
  return (
    <div className="flex h-3 w-full overflow-hidden rounded-full bg-surface-2">
      <div className="h-full bg-emerald-500" style={{ width: w(approved) }} />
      <div className="h-full bg-amber-400" style={{ width: w(pending) }} />
      <div className="h-full bg-rose-500" style={{ width: w(rejected) }} />
    </div>
  );
}

function LegendRow({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <li className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-muted-foreground">
        <span className={`h-2.5 w-2.5 rounded-full ${color}`} /> {label}
      </span>
      <span className="font-semibold text-ink tabular-nums">{value}</span>
    </li>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const s = String(status ?? "").toLowerCase();
  const tone =
    s === "active" || s === "approved"
      ? "bg-emerald-50 text-emerald-700"
      : s === "pending" || s === "review" || s === "new" || s === "unread" || s === "trial"
        ? "bg-amber-50 text-amber-700"
        : s === "interview"
          ? "bg-blue-50 text-blue-700"
          : s === "rejected" || s === "paused" || s === "cancelled"
            ? "bg-rose-50 text-rose-700"
            : s === "removed"
              ? "bg-slate-200 text-slate-700"
              : "bg-slate-100 text-slate-700";
  const label = status === "removed" ? "Removed" : status;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${tone}`}
    >
      {label}
    </span>
  );
}
