import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { AlertTriangle, Inbox, Mail, MailOpen, Phone, Trash2, X } from "lucide-react";
import {
  adminListMessages,
  adminMarkMessageRead,
  adminGetMessage,
  adminDeleteMessage,
} from "@/lib/tutor-api.functions";
import {
  AdminAvatar,
  AdminPageHeader,
  EmptyState,
  FilterTabs,
  SearchInput,
} from "@/components/admin-ui";

export const Route = createFileRoute("/admin/messages")({
  component: MessagesAdmin,
});

type Filter = "all" | "unread" | "read";

function MessagesAdmin() {
  const listFn = useServerFn(adminListMessages);
  const markFn = useServerFn(adminMarkMessageRead);
  const deleteFn = useServerFn(adminDeleteMessage);
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["admin-messages"], queryFn: () => listFn() });

  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{ id: string; name: string } | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-messages"] });

  const mark = useMutation({
    mutationFn: (v: { id: string; status: "read" | "unread" }) => markFn({ data: v }),
    onSuccess: invalidate,
  });
  const remove = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      invalidate();
      setConfirm(null);
      setOpenId(null);
    },
  });

  const rows = useMemo(() => {
    const search = q.trim().toLowerCase();
    return (data ?? []).filter((m: any) => {
      if (filter !== "all" && m.status !== filter) return false;
      if (!search) return true;
      return [m.name, m.email, m.phone, m.subject, m.message]
        .filter(Boolean)
        .some((v: string) => v.toLowerCase().includes(search));
    });
  }, [data, q, filter]);

  const counts = {
    all: data?.length ?? 0,
    unread: (data ?? []).filter((m: any) => m.status === "unread").length,
    read: (data ?? []).filter((m: any) => m.status === "read").length,
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={Mail}
        title="Messages"
        subtitle="Inbound enquiries from the contact form."
        accent="bg-sky-100 text-sky-700"
      >
        <FilterTabs
          value={filter}
          onChange={setFilter}
          options={[
            { key: "all", label: "All", count: counts.all },
            { key: "unread", label: "Unread", count: counts.unread },
            { key: "read", label: "Read", count: counts.read },
          ]}
        />
      </AdminPageHeader>

      <div className="card-surface p-5">
        <SearchInput
          value={q}
          onChange={setQ}
          placeholder="Search by name, email, subject, or message…"
          className="max-w-md"
        />

        <div className="mt-5 space-y-1">
          {rows.map((m: any) => (
            <div
              key={m.id}
              className={`group flex cursor-pointer items-start justify-between gap-4 rounded-xl border p-4 transition-colors ${
                m.status === "unread"
                  ? "border-primary/20 bg-primary-soft/40"
                  : "border-transparent hover:bg-surface-2"
              }`}
              onClick={() => {
                setOpenId(m.id);
                if (m.status === "unread") mark.mutate({ id: m.id, status: "read" });
              }}
            >
              <div className="flex min-w-0 flex-1 items-start gap-4">
                <AdminAvatar name={m.name} className="h-10 w-10 text-xs" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="truncate text-sm font-semibold text-ink">{m.name}</span>
                    {m.status === "unread" && (
                      <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                        New
                      </span>
                    )}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{m.email}</div>
                  <div className="mt-1 truncate text-sm font-medium text-ink">
                    {m.subject ?? "(no subject)"}
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{m.message}</p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <div className="whitespace-nowrap text-xs text-muted-foreground">
                  {new Date(m.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      mark.mutate({ id: m.id, status: m.status === "unread" ? "read" : "unread" });
                    }}
                    className="rounded-md p-1.5 text-muted-foreground hover:bg-surface-2"
                    title={m.status === "unread" ? "Mark as read" : "Mark as unread"}
                  >
                    {m.status === "unread" ? (
                      <MailOpen className="h-3.5 w-3.5" />
                    ) : (
                      <Mail className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirm({ id: m.id, name: m.name });
                    }}
                    className="rounded-md p-1.5 text-destructive hover:bg-destructive/10"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {data && rows.length === 0 && (
            <EmptyState
              icon={Inbox}
              title="No messages match your filters"
              hint="Inbound contact-form enquiries will appear here."
            />
          )}
        </div>
      </div>

      {openId && (
        <MessageDrawer
          id={openId}
          onClose={() => setOpenId(null)}
          onDelete={(id, name) => setConfirm({ id, name })}
          onToggle={(id, status) => mark.mutate({ id, status })}
        />
      )}

      {confirm && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onClick={() => !remove.isPending && setConfirm(null)}
        >
          <div className="w-full max-w-md card-surface p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-3">
              <div className="h-11 w-11 shrink-0 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-[var(--font-display)] font-bold text-lg text-ink">
                  Delete message?
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  This will permanently remove the message from{" "}
                  <span className="font-semibold text-ink">{confirm.name}</span>. This action cannot
                  be undone.
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
                <Trash2 className="h-4 w-4" /> {remove.isPending ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MessageDrawer({
  id,
  onClose,
  onDelete,
  onToggle,
}: {
  id: string;
  onClose: () => void;
  onDelete: (id: string, name: string) => void;
  onToggle: (id: string, status: "read" | "unread") => void;
}) {
  const getFn = useServerFn(adminGetMessage);
  const { data: msg, isLoading } = useQuery({
    queryKey: ["admin-message", id],
    queryFn: () => getFn({ data: { id } }),
  });

  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}>
      <div className="flex-1 bg-black/40" />
      <div
        className="w-full max-w-xl bg-surface h-full overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-surface border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="heading-md">Message details</h2>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full hover:bg-surface-2 flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isLoading || !msg ? (
          <div className="p-8 text-sm text-muted-foreground">Loading…</div>
        ) : (
          <div className="p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl bg-primary-soft text-primary flex items-center justify-center text-lg font-bold shrink-0">
                {(msg as any).name
                  .split(" ")
                  .map((p: string) => p[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className="min-w-0">
                <h3 className="font-[var(--font-display)] font-bold text-lg text-ink break-words">
                  {(msg as any).name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Received {new Date((msg as any).created_at).toLocaleString()}
                </p>
                <span
                  className={`mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    (msg as any).status === "unread"
                      ? "bg-primary text-primary-foreground"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {(msg as any).status}
                </span>
              </div>
            </div>

            <div className="card-surface p-4 space-y-3 text-sm">
              <Row icon={Mail} label="Email">
                <a
                  href={`mailto:${(msg as any).email}`}
                  className="text-primary font-medium break-all"
                >
                  {(msg as any).email}
                </a>
              </Row>
              <Row icon={Phone} label="Mobile">
                {(msg as any).phone ? (
                  <a
                    href={`tel:${(msg as any).phone}`}
                    className="text-primary font-medium break-all"
                  >
                    {(msg as any).phone}
                  </a>
                ) : (
                  <span className="text-muted-foreground">Not provided</span>
                )}
              </Row>
              <Row label="Subject">
                <span className="text-ink font-medium break-words">
                  {(msg as any).subject ?? "(no subject)"}
                </span>
              </Row>
              <Row label="Submitted">
                <span className="text-ink font-medium">
                  {new Date((msg as any).created_at).toLocaleString()}
                </span>
              </Row>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-primary mb-2">
                Message
              </div>
              <div className="card-surface p-5 text-sm text-ink leading-relaxed whitespace-pre-line [overflow-wrap:anywhere]">
                {(msg as any).message}
              </div>
            </div>

            <div className="sticky bottom-0 bg-surface border-t border-border py-4 flex gap-3">
              <button
                onClick={() => onToggle(id, (msg as any).status === "unread" ? "read" : "unread")}
                className="btn-ghost flex-1 text-sm"
              >
                {(msg as any).status === "unread" ? (
                  <>
                    <MailOpen className="h-4 w-4" /> Mark as read
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4" /> Mark as unread
                  </>
                )}
              </button>
              <button
                onClick={() => onDelete(id, (msg as any).name)}
                className="inline-flex items-center gap-2 flex-1 justify-center px-4 py-2 rounded-lg bg-destructive text-white text-sm font-semibold hover:opacity-90"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon?: any;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      {Icon && <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />}
      <span className="text-muted-foreground w-24 shrink-0">{label}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
