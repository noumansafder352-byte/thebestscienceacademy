import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { adminListBookings } from "@/lib/tutor-api.functions";
import { StatusBadge } from "./admin.index";

export const Route = createFileRoute("/admin/students")({
  component: StudentsAdmin,
});

function StudentsAdmin() {
  const listFn = useServerFn(adminListBookings);
  const { data } = useQuery({ queryKey: ["admin-bookings"], queryFn: () => listFn() });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-md">Students & trial bookings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Enquiries submitted through Book Free Trial and the contact form.</p>
      </div>

      <div className="card-surface p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
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
              {(data ?? []).map((s: any) => (
                <tr key={s.id} className="border-b border-border hover:bg-surface-2">
                  <td className="py-3 pr-3 font-medium text-ink">{s.student_name}</td>
                  <td className="py-3 pr-3 text-muted-foreground">
                    <div>{s.parent_name ?? "—"}</div>
                    <div className="text-xs">{s.email}</div>
                  </td>
                  <td className="py-3 pr-3 text-muted-foreground">{s.country ?? "—"}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{s.curriculum ?? "—"}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{s.subject ?? "—"}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{new Date(s.created_at).toLocaleDateString()}</td>
                  <td className="py-3 pr-3"><StatusBadge status={s.status} /></td>
                </tr>
              ))}
              {data && data.length === 0 && (
                <tr><td colSpan={7} className="py-12 text-center text-muted-foreground">No bookings yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
