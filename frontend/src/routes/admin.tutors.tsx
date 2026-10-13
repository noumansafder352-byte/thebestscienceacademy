import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { AlertTriangle, GraduationCap, Inbox, Pencil, Star, Trash2 } from "lucide-react";
import { adminListTutors, adminSetTutorActive, adminDeleteTutor } from "@/lib/tutor-api.functions";
import {
  AdminAvatar,
  AdminPageHeader,
  EmptyState,
  FilterTabs,
  SearchInput,
  tableHeadRow,
  tableRow,
} from "@/components/admin-ui";

export const Route = createFileRoute("/admin/tutors")({
  component: TutorsAdmin,
});

type StatusFilter = "all" | "active" | "inactive";

function TutorsAdmin() {
  const listFn = useServerFn(adminListTutors);
  const toggleFn = useServerFn(adminSetTutorActive);
  const deleteFn = useServerFn(adminDeleteTutor);
  const qc = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [confirm, setConfirm] = useState<{ id: string; name: string } | null>(null);

  const { data } = useQuery({ queryKey: ["admin-tutors"], queryFn: () => listFn() });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-tutors"] });
    qc.invalidateQueries({ queryKey: ["public-tutors"] });
    qc.invalidateQueries({ queryKey: ["admin-stats"] });
    qc.invalidateQueries({ queryKey: ["admin-applications"] });
  };

  const toggle = useMutation({
    mutationFn: (v: { id: string; is_active: boolean }) => toggleFn({ data: v }),
    onSuccess: invalidate,
  });
  const remove = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      invalidate();
      setConfirm(null);
    },
  });

  const visible = useMemo(() => (data ?? []).filter((t: any) => !t.deleted_at), [data]);

  const rows = useMemo(() => {
    const search = q.toLowerCase();
    return visible.filter((t: any) => {
      if (filter === "active" && !t.is_active) return false;
      if (filter === "inactive" && t.is_active) return false;
      return t.name.toLowerCase().includes(search);
    });
  }, [visible, q, filter]);

  const counts = {
    all: visible.length,
    active: visible.filter((t: any) => t.is_active).length,
    inactive: visible.filter((t: any) => !t.is_active).length,
  };

  // This route file doubles as the layout for its nested routes
  // (e.g. /admin/tutors/$id/edit). When a child route is active, render it via
  // the <Outlet /> instead of the tutors list — without this the URL changes
  // but the edit page has nowhere to mount, so nothing appears.
  if (pathname !== "/admin/tutors") {
    return <Outlet />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={GraduationCap}
        title="Tutors"
        subtitle={`${counts.active} active · ${counts.inactive} inactive`}
      >
        <FilterTabs
          value={filter}
          onChange={setFilter}
          options={[
            { key: "all", label: "All", count: counts.all },
            { key: "active", label: "Active", count: counts.active },
            { key: "inactive", label: "Inactive", count: counts.inactive },
          ]}
        />
      </AdminPageHeader>

      <div className="card-surface p-5">
        <SearchInput value={q} onChange={setQ} placeholder="Search tutors…" className="max-w-sm" />
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={tableHeadRow}>
                <th className="py-3 pr-3 font-semibold">Name</th>
                <th className="py-3 pr-3 font-semibold">Subject</th>
                <th className="py-3 pr-3 font-semibold">Curriculum</th>
                <th className="py-3 pr-3 font-semibold">Rating</th>
                <th className="py-3 pr-3 font-semibold">Reviews</th>
                <th className="py-3 pr-3 font-semibold">Joined</th>
                <th className="py-3 pr-3 font-semibold">Status</th>
                <th className="py-3 pr-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t: any) => (
                <tr key={t.id} className={tableRow}>
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-3">
                      <AdminAvatar name={t.name} />
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-ink">{t.name}</span>
                        {t.is_featured && (
                          <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gold/15 text-[oklch(0.42_0.10_75)]">
                            <Star className="h-3 w-3 fill-current text-gold" /> Top
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-3 text-muted-foreground">{t.subjects?.[0] ?? "—"}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{t.curriculums?.[0] ?? "—"}</td>
                  <td className="py-3 pr-3">
                    <span className="inline-flex items-center gap-1 font-semibold text-[oklch(0.42_0.10_75)]">
                      <Star className="h-3.5 w-3.5 fill-current text-gold" />
                      {Number(t.rating ?? 0).toFixed(1)}
                    </span>
                  </td>
                  <td className="py-3 pr-3 text-muted-foreground">{t.reviews ?? 0}</td>
                  <td className="py-3 pr-3 text-muted-foreground whitespace-nowrap">
                    {new Date(t.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 pr-3">
                    <button
                      onClick={() => toggle.mutate({ id: t.id, is_active: !t.is_active })}
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${t.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-700"}`}
                    >
                      {t.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="py-3 pr-3 text-right whitespace-nowrap">
                    <Link
                      to="/tutors/$slug"
                      params={{ slug: t.slug }}
                      className="text-primary font-semibold text-xs mr-3"
                    >
                      View
                    </Link>
                    <Link
                      to="/admin/tutors/$id/edit"
                      params={{ id: t.id }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-ink hover:text-primary mr-3"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Link>
                    <button
                      onClick={() => setConfirm({ id: t.id, name: t.name })}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-destructive hover:opacity-80"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {data && rows.length === 0 && (
                <tr>
                  <td colSpan={8}>
                    <EmptyState
                      icon={Inbox}
                      title="No tutors match your filters"
                      hint="Try a different search or filter."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {confirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => !remove.isPending && setConfirm(null)}
        >
          <div className="w-full max-w-md card-surface p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-3">
              <div className="h-11 w-11 shrink-0 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-[var(--font-display)] font-bold text-lg text-ink">
                  Permanently delete tutor?
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="font-semibold text-ink">{confirm.name}</span> will be permanently
                  removed from the Find Tutors page, their public profile, and the admin tutors
                  list. This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setConfirm(null)}
                disabled={remove.isPending}
                className="btn-ghost !py-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => remove.mutate(confirm.id)}
                disabled={remove.isPending}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
              >
                <Trash2 className="h-4 w-4" />
                {remove.isPending ? "Deleting…" : "Yes, delete permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
