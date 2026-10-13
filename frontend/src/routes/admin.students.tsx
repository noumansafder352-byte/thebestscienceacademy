import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { CalendarClock, GraduationCap, Inbox, Users } from "lucide-react";
import { adminListBookings } from "@/lib/tutor-api.functions";
import { StatusBadge } from "./admin.index";
import {
  AdminAvatar,
  AdminPageHeader,
  EmptyState,
  StatTile,
  tableHeadRow,
  tableRow,
} from "@/components/admin-ui";

export const Route = createFileRoute("/admin/students")({
  component: StudentsAdmin,
});

function StudentsAdmin() {
  const listFn = useServerFn(adminListBookings);
  const { data, isLoading } = useQuery({ queryKey: ["admin-bookings"], queryFn: () => listFn() });

  const bookings = data ?? [];
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const newThisWeek = bookings.filter(
    (b: any) => new Date(b.created_at).getTime() >= weekAgo,
  ).length;
  const pending = bookings.filter(
    (b: any) =>
      (b.status ?? "").toLowerCase() === "pending" || (b.status ?? "").toLowerCase() === "trial",
  ).length;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={Users}
        title="Students & trial bookings"
        subtitle="Enquiries submitted through Book Free Trial and the contact form."
        accent="bg-emerald-100 text-emerald-700"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile
          icon={GraduationCap}
          label="Total bookings"
          value={isLoading ? "—" : bookings.length}
          accent="bg-primary-soft text-primary"
          hint="All time"
        />
        <StatTile
          icon={CalendarClock}
          label="New this week"
          value={isLoading ? "—" : newThisWeek}
          accent="bg-emerald-100 text-emerald-700"
          hint="Last 7 days"
        />
        <StatTile
          icon={Inbox}
          label="Awaiting response"
          value={isLoading ? "—" : pending}
          accent="bg-amber-100 text-amber-700"
          hint="Pending / trial"
        />
      </div>

      <div className="card-surface p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={tableHeadRow}>
                <th className="py-3 pr-3 font-semibold">Student</th>
                <th className="py-3 pr-3 font-semibold">Parent / Email</th>
                <th className="py-3 pr-3 font-semibold">Country</th>
                <th className="py-3 pr-3 font-semibold">Curriculum</th>
                <th className="py-3 pr-3 font-semibold">Subject</th>
                <th className="py-3 pr-3 font-semibold">Submitted</th>
                <th className="py-3 pr-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((s: any) => (
                <tr key={s.id} className={tableRow}>
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-3">
                      <AdminAvatar name={s.student_name} />
                      <span className="font-semibold text-ink">{s.student_name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-3 text-muted-foreground">
                    <div className="text-ink">{s.parent_name ?? "—"}</div>
                    <div className="text-xs">{s.email}</div>
                  </td>
                  <td className="py-3 pr-3 text-muted-foreground">{s.country ?? "—"}</td>
                  <td className="py-3 pr-3">
                    {s.curriculum ? (
                      <span className="inline-flex items-center rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink">
                        {s.curriculum}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="py-3 pr-3 text-muted-foreground">{s.subject ?? "—"}</td>
                  <td className="py-3 pr-3 text-muted-foreground whitespace-nowrap">
                    {new Date(s.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 pr-3">
                    <StatusBadge status={s.status} />
                  </td>
                </tr>
              ))}
              {!isLoading && bookings.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <EmptyState
                      icon={Inbox}
                      title="No bookings yet"
                      hint="Trial requests will appear here as they come in."
                    />
                  </td>
                </tr>
              )}
              {isLoading && (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-sm text-muted-foreground">
                    Loading bookings…
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
