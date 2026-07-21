import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, GraduationCap, UserPlus, Calendar, Star, Users, Mail } from "lucide-react";
import { adminStatsSummary, adminListApplications, adminListTutors, adminListMessages } from "@/lib/tutor-api.functions";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

function AdminHome() {
  const statsFn = useServerFn(adminStatsSummary);
  const appsFn = useServerFn(adminListApplications);
  const tutorsFn = useServerFn(adminListTutors);
  const msgsFn = useServerFn(adminListMessages);

  const stats = useQuery({ queryKey: ["admin-stats"], queryFn: () => statsFn() });
  const apps = useQuery({ queryKey: ["admin-applications"], queryFn: () => appsFn() });
  const tutors = useQuery({ queryKey: ["admin-tutors"], queryFn: () => tutorsFn() });
  const msgs = useQuery({ queryKey: ["admin-messages"], queryFn: () => msgsFn() });

  const cards = [
    { label: "Pending applications", value: stats.data?.applications.pending ?? "—", icon: UserPlus },
    { label: "Active tutors", value: stats.data?.tutors ?? "—", icon: GraduationCap },
    { label: "Trial bookings", value: stats.data?.bookings ?? "—", icon: Users },
    { label: "Contact messages", value: stats.data?.messages ?? "—", icon: Mail },
  ];

  return (
    <div className="space-y-7">
      <div>
        <h1 className="heading-md">Welcome back, Admin</h1>
        <p className="mt-1 text-sm text-muted-foreground">Overview of applications, tutors and enquiries.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((s) => (
          <div key={s.label} className="card-surface p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</div>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-3 font-[var(--font-display)] text-3xl font-bold text-ink">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-5">
        <div className="card-surface p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="heading-md">Recent applications</h2>
              <p className="mt-1 text-sm text-muted-foreground">Latest tutor applications awaiting review.</p>
            </div>
            <UserPlus className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 pr-3 font-semibold">Applicant</th>
                  <th className="py-2 pr-3 font-semibold">Title</th>
                  <th className="py-2 pr-3 font-semibold">Subject</th>
                  <th className="py-2 pr-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {(apps.data ?? []).filter((a: any) => a.status === "pending").slice(0, 6).map((a: any) => (
                  <tr key={a.id} className="border-t border-border">
                    <td className="py-3 pr-3 font-medium text-ink">{a.full_name}</td>
                    <td className="py-3 pr-3 text-muted-foreground truncate max-w-[220px]">{a.professional_title}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{a.subjects?.[0] ?? "—"}</td>
                    <td className="py-3 pr-3"><StatusBadge status={a.status} /></td>
                  </tr>
                ))}
                {apps.data && apps.data.filter((a: any) => a.status === "pending").length === 0 && (
                  <tr><td colSpan={4} className="py-10 text-center text-muted-foreground text-sm">No pending applications.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-surface p-6">
          <div className="flex items-center justify-between">
            <h2 className="heading-md">Top tutors</h2>
            <Star className="h-5 w-5 text-gold" />
          </div>
          <ul className="mt-5 space-y-3">
            {(tutors.data ?? []).filter((t: any) => t.is_active && !t.deleted_at).slice(0, 5).map((t: any) => (
              <li key={t.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-full bg-primary-soft text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {t.name.split(" ").map((p: string) => p[0]).slice(-2).join("")}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-ink truncate">{t.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{t.subjects?.[0]} · {t.curriculums?.[0]}</div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-[oklch(0.42_0.10_75)] inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-current text-gold" /> {t.rating}
                </div>
              </li>
            ))}
            {tutors.data && tutors.data.length === 0 && (
              <li className="text-sm text-muted-foreground py-4">No tutors yet — approve an application to publish one.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card-surface p-6">
          <div className="flex items-center justify-between">
            <h2 className="heading-md">Growth</h2>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-5 text-sm text-muted-foreground">
            {stats.data ? (
              <>
                <p>{stats.data.applications.approved} approved applications total.</p>
                <p className="mt-2">{stats.data.applications.rejected} rejected · {stats.data.applications.pending} in review.</p>
              </>
            ) : "Loading…"}
          </div>
        </div>
        <div className="card-surface p-6">
          <div className="flex items-center justify-between">
            <h2 className="heading-md">Latest messages</h2>
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <ul className="mt-5 space-y-3">
            {(msgs.data ?? []).slice(0, 4).map((m: any) => (
              <li key={m.id} className="flex items-start justify-between gap-3 p-3 rounded-xl hover:bg-surface-2">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-ink truncate">{m.name} · {m.email}</div>
                  <div className="text-xs text-muted-foreground truncate">{m.subject ?? m.message}</div>
                </div>
                <div className="text-xs text-muted-foreground shrink-0 flex items-center gap-2">
                  {m.status === "unread" && <span className="h-2 w-2 rounded-full bg-gold" />}
                  {new Date(m.created_at).toLocaleDateString()}
                </div>
              </li>
            ))}
            {msgs.data && msgs.data.length === 0 && (
              <li className="text-sm text-muted-foreground py-4">No messages yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
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
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${tone}`}>{label}</span>;
}
