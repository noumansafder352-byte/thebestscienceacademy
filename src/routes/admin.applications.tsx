import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AlertTriangle, CheckCircle2, Download, Mail, MailWarning, MessageCircle, Phone, RotateCcw, Send, Trash2, X, XCircle } from "lucide-react";
import {
  adminListApplications,
  adminGetApplication,
  adminApproveApplication,
  adminRejectApplication,
  adminResendRejectionEmail,
  adminReopenApplication,
  adminDeleteApplication,
  adminUpdateApplicationNotes,
  REJECTION_REASON_OPTIONS,
} from "@/lib/tutor-api.functions";
import { StatusBadge } from "./admin.index";

export const Route = createFileRoute("/admin/applications")({
  component: ApplicationsAdmin,
});

function ApplicationsAdmin() {
  const listFn = useServerFn(adminListApplications);
  const { data: apps } = useQuery({ queryKey: ["admin-applications"], queryFn: () => listFn() });
  const [openId, setOpenId] = useState<string | null>(null);

  const counts = {
    pending: (apps ?? []).filter((a: any) => a.status === "pending").length,
    approved: (apps ?? []).filter((a: any) => a.status === "approved").length,
    rejected: (apps ?? []).filter((a: any) => a.status === "rejected").length,
    removed: (apps ?? []).filter((a: any) => a.status === "removed").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-md">Tutor applications</h1>
        <p className="mt-1 text-sm text-muted-foreground">Review, approve or reject incoming tutor applications.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Pending", value: counts.pending },
          { label: "Approved", value: counts.approved },
          { label: "Rejected", value: counts.rejected },
          { label: "Removed", value: counts.removed },
        ].map((s) => (
          <div key={s.label} className="card-surface p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</div>
            <div className="mt-1 font-[var(--font-display)] text-2xl font-bold text-ink">{s.value}</div>
          </div>
        ))}
      </div>


      <div className="card-surface p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-3 pr-3 font-semibold">Applicant</th>
                <th className="py-3 pr-3 font-semibold">Title</th>
                <th className="py-3 pr-3 font-semibold">Subjects</th>
                <th className="py-3 pr-3 font-semibold">Experience</th>
                <th className="py-3 pr-3 font-semibold">Submitted</th>
                <th className="py-3 pr-3 font-semibold">Status</th>
                <th className="py-3 pr-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {(apps ?? []).map((a: any) => (
                <tr key={a.id} className="border-b border-border hover:bg-surface-2">
                  <td className="py-3 pr-3 font-medium text-ink">{a.full_name}</td>
                  <td className="py-3 pr-3 text-muted-foreground truncate max-w-[220px]">{a.professional_title}</td>
                  <td className="py-3 pr-3 text-muted-foreground truncate max-w-[200px]">{(a.subjects ?? []).slice(0, 2).join(", ")}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{a.experience_years}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</td>
                  <td className="py-3 pr-3"><StatusBadge status={a.status} /></td>
                  <td className="py-3 pr-3 text-right">
                    <button onClick={() => setOpenId(a.id)} className="text-primary font-semibold text-xs">Review →</button>
                  </td>
                </tr>
              ))}
              {apps && apps.length === 0 && (
                <tr><td colSpan={7} className="py-14 text-center text-muted-foreground">No applications yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {openId && <ApplicationDrawer id={openId} onClose={() => setOpenId(null)} />}
    </div>
  );
}

function ApplicationDrawer({ id, onClose }: { id: string; onClose: () => void }) {
  const getFn = useServerFn(adminGetApplication);
  const approveFn = useServerFn(adminApproveApplication);
  const rejectFn = useServerFn(adminRejectApplication);
  const resendFn = useServerFn(adminResendRejectionEmail);
  const reopenFn = useServerFn(adminReopenApplication);
  const deleteFn = useServerFn(adminDeleteApplication);
  const notesFn = useServerFn(adminUpdateApplicationNotes);
  const qc = useQueryClient();
  const { data: app, isLoading } = useQuery({ queryKey: ["admin-application", id], queryFn: () => getFn({ data: { id } }) });
  const [notes, setNotes] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState<string>(REJECTION_REASON_OPTIONS[0]);
  const [rejectComments, setRejectComments] = useState("");

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-applications"] });
    qc.invalidateQueries({ queryKey: ["admin-application", id] });
    qc.invalidateQueries({ queryKey: ["admin-tutors"] });
    qc.invalidateQueries({ queryKey: ["admin-stats"] });
    qc.invalidateQueries({ queryKey: ["public-tutors"] });
  };

  const approve = useMutation({
    mutationFn: () => approveFn({ data: { id } }),
    onSuccess: () => { invalidate(); onClose(); },
  });
  const reject = useMutation({
    mutationFn: () =>
      rejectFn({ data: { id, reason: rejectReason, comments: rejectComments.trim() || null } }),
    onSuccess: () => { invalidate(); setRejectOpen(false); },
  });
  const resend = useMutation({
    mutationFn: () => resendFn({ data: { id } }),
    onSuccess: invalidate,
  });
  const reopen = useMutation({
    mutationFn: () => reopenFn({ data: { id } }),
    onSuccess: invalidate,
  });
  const remove = useMutation({
    mutationFn: () => deleteFn({ data: { id } }),
    onSuccess: () => { invalidate(); setConfirmDelete(false); onClose(); },
  });
  const saveNotes = useMutation({
    mutationFn: () => notesFn({ data: { id, admin_notes: notes } }),
    onSuccess: invalidate,
  });

  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}>
      <div className="flex-1 bg-black/40" />
      <div className="w-full max-w-2xl bg-surface h-full overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-surface border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="heading-md">Application details</h2>
          <button onClick={onClose} className="h-9 w-9 rounded-full hover:bg-surface-2 flex items-center justify-center"><X className="h-4 w-4" /></button>
        </div>

        {isLoading || !app ? (
          <div className="p-8 text-sm text-muted-foreground">Loading…</div>
        ) : (
          <div className="p-6 space-y-6">
            <div className="flex items-start gap-4">
              {app.photo_url ? (
                <img src={app.photo_url} alt={app.full_name} className="h-20 w-20 rounded-xl object-cover" />
              ) : (
                <div className="h-20 w-20 rounded-xl bg-primary-soft text-primary flex items-center justify-center text-2xl font-bold">
                  {app.full_name?.[0]}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-[var(--font-display)] font-bold text-lg text-ink">{app.full_name}</h3>
                <p className="text-sm text-primary font-semibold">{app.professional_title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{app.city}, {app.country} · {app.nationality}</p>
                <div className="mt-2"><StatusBadge status={app.status} /></div>
              </div>
            </div>

            <Section title="Private contact (admin only)">
              <Row icon={Mail} label="Email" value={app.email} />
              <Row icon={Phone} label="Phone" value={app.phone ?? "—"} />
              <Row icon={MessageCircle} label="WhatsApp" value={app.whatsapp ?? "—"} />
              <Row label="Preferred contact" value={app.preferred_contact ?? "—"} />
            </Section>

            <Section title="Professional">
              <Row label="Qualification" value={app.qualification ?? "—"} />
              <Row label="Experience" value={app.experience_years ?? "—"} />
              <Row label="Subjects" value={(app.subjects ?? []).join(", ")} />
              <Row label="Curriculums" value={(app.curriculums ?? []).join(", ")} />
              <Row label="Grade levels" value={(app.grade_levels ?? []).join(", ")} />
              <Row label="Languages" value={(app.languages ?? []).join(", ")} />
              <Row label="Timezone" value={app.timezone ?? "—"} />
            </Section>

            {app.bio && (
              <Section title="Bio">
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{app.bio}</p>
              </Section>
            )}

            {app.methodology && (
              <Section title="Methodology">
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{app.methodology}</p>
              </Section>
            )}

            <Section title="CV / Resume">
              {app.cv_url ? (
                <a href={app.cv_url} target="_blank" rel="noreferrer" className="btn-ghost !py-2 text-sm">
                  <Download className="h-4 w-4" /> Download CV
                </a>
              ) : <p className="text-sm text-muted-foreground">No CV uploaded.</p>}
            </Section>

            <Section title="National ID / CNIC (private — admin verification only)">
              {(app.cnic_front_url || app.cnic_back_url) ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  {(["front", "back"] as const).map((side) => {
                    const url = side === "front" ? app.cnic_front_url : app.cnic_back_url;
                    const label = side === "front" ? "Front" : "Back";
                    if (!url) {
                      return (
                        <div key={side} className="rounded-lg border border-dashed border-border p-4 text-xs text-muted-foreground">
                          {label} not uploaded.
                        </div>
                      );
                    }
                    return (
                      <div key={side} className="rounded-lg border border-border overflow-hidden bg-surface-2">
                        <a href={url} target="_blank" rel="noreferrer" className="block">
                          <img src={url} alt={`National ID ${label}`} className="w-full h-40 object-cover" />
                        </a>
                        <div className="flex items-center justify-between p-2 gap-2">
                          <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">{label}</span>
                          <a
                            href={url}
                            download
                            target="_blank"
                            rel="noreferrer"
                            className="btn-ghost !py-1.5 !px-2.5 text-[11px]"
                          >
                            <Download className="h-3 w-3" /> Download
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No National ID uploaded.</p>
              )}
            </Section>

            {app.status === "rejected" && app.rejection_reason && (
              <Section title="Rejection details">
                <Row label="Reason" value={app.rejection_reason} />
                {app.rejection_comments && (
                  <Row label="Comments" value={app.rejection_comments} />
                )}
                <Row
                  label="Rejected at"
                  value={app.rejected_at ? new Date(app.rejected_at).toLocaleString() : "—"}
                />
                <div className="mt-3 pt-3 border-t border-border">
                  <EmailStatusBanner
                    status={app.rejection_email_status}
                    error={app.rejection_email_error}
                    attemptedAt={app.rejection_email_attempted_at}
                    onRetry={() => resend.mutate()}
                    isRetrying={resend.isPending}
                  />
                </div>
              </Section>
            )}


            <Section title="Admin notes (private)">
              <textarea
                defaultValue={app.admin_notes ?? ""}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-border bg-surface-2 text-sm"
                placeholder="Notes about this applicant…"
              />
              <button onClick={() => saveNotes.mutate()} className="mt-2 btn-ghost !py-2 text-xs">Save notes</button>
            </Section>

            <div className="sticky bottom-0 bg-surface border-t border-border py-4 flex gap-3 flex-wrap">
              {app.status === "pending" && (
                <>
                  <button onClick={() => approve.mutate()} disabled={approve.isPending} className="btn-primary flex-1 min-w-[140px]">
                    <CheckCircle2 className="h-4 w-4" /> {approve.isPending ? "Approving…" : "Approve & publish"}
                  </button>
                  <button onClick={() => setRejectOpen(true)} className="btn-ghost flex-1 min-w-[120px]">
                    <XCircle className="h-4 w-4" /> Reject
                  </button>
                </>
              )}
              {app.status === "rejected" && (
                <>
                  <button onClick={() => reopen.mutate()} disabled={reopen.isPending} className="btn-ghost flex-1 min-w-[120px]">
                    <RotateCcw className="h-4 w-4" /> {reopen.isPending ? "Reopening…" : "Reopen"}
                  </button>
                  <button onClick={() => approve.mutate()} disabled={approve.isPending} className="btn-primary flex-1 min-w-[140px]">
                    <CheckCircle2 className="h-4 w-4" /> {approve.isPending ? "Approving…" : "Approve now"}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive text-sm font-semibold hover:bg-destructive/20"
                  >
                    <Trash2 className="h-4 w-4" /> Delete permanently
                  </button>
                </>
              )}
              {app.status === "approved" && (
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> This application has been approved and published.
                </div>
              )}
              {app.status === "removed" && (
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Trash2 className="h-4 w-4 text-slate-500" /> This tutor was removed. Application kept for history.
                </div>
              )}
            </div>

            {confirmDelete && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={() => !remove.isPending && setConfirmDelete(false)}>
                <div className="w-full max-w-md card-surface p-6" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 shrink-0 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-[var(--font-display)] font-bold text-lg text-ink">Delete application?</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        This will permanently remove the application from <span className="font-semibold text-ink">{app.full_name}</span>. This cannot be undone.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-2">
                    <button onClick={() => setConfirmDelete(false)} disabled={remove.isPending} className="btn-ghost !py-2 text-sm">Cancel</button>
                    <button
                      onClick={() => remove.mutate()}
                      disabled={remove.isPending}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
                    >
                      <Trash2 className="h-4 w-4" /> {remove.isPending ? "Deleting…" : "Delete permanently"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {rejectOpen && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={() => !reject.isPending && setRejectOpen(false)}>
                <div className="w-full max-w-lg card-surface p-6" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 shrink-0 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center">
                      <XCircle className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-[var(--font-display)] font-bold text-lg text-ink">Reject application?</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        <span className="font-semibold text-ink">{app.full_name}</span> will be notified by email at{" "}
                        <span className="font-medium text-ink">{app.email}</span>.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reason <span className="text-destructive">*</span></label>
                      <select
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        className="mt-1.5 w-full px-3 py-2 rounded-lg border border-border bg-surface-2 text-sm"
                      >
                        {REJECTION_REASON_OPTIONS.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Additional comments (optional)</label>
                      <textarea
                        value={rejectComments}
                        onChange={(e) => setRejectComments(e.target.value)}
                        rows={4}
                        maxLength={2000}
                        className="mt-1.5 w-full px-3 py-2 rounded-lg border border-border bg-surface-2 text-sm"
                        placeholder="Share any additional context for the applicant…"
                      />
                    </div>
                  </div>

                  {reject.isError && (
                    <p className="mt-3 text-sm text-destructive">
                      {(reject.error as Error)?.message ?? "Something went wrong. Please try again."}
                    </p>
                  )}

                  <div className="mt-6 flex justify-end gap-2">
                    <button onClick={() => setRejectOpen(false)} disabled={reject.isPending} className="btn-ghost !py-2 text-sm">Cancel</button>
                    <button
                      onClick={() => reject.mutate()}
                      disabled={reject.isPending}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
                    >
                      <XCircle className="h-4 w-4" /> {reject.isPending ? "Rejecting…" : "Confirm rejection & notify"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card-surface p-4">
      <div className="text-[11px] uppercase tracking-wider font-semibold text-primary mb-3">{title}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon?: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      {Icon && <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />}
      <span className="text-muted-foreground w-32 shrink-0">{label}</span>
      <span className="text-ink font-medium break-words min-w-0">{value}</span>
    </div>
  );
}

function EmailStatusBanner({
  status,
  error,
  attemptedAt,
  onRetry,
  isRetrying,
}: {
  status?: string | null;
  error?: string | null;
  attemptedAt?: string | null;
  onRetry: () => void;
  isRetrying: boolean;
}) {
  const attempted = attemptedAt ? new Date(attemptedAt).toLocaleString() : null;

  const config = (() => {
    switch (status) {
      case "sent":
        return { tone: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <Mail className="h-4 w-4" />, label: "Rejection email sent", detail: attempted ? `Delivered · ${attempted}` : null };
      case "failed":
        return { tone: "bg-destructive/10 text-destructive border-destructive/30", icon: <MailWarning className="h-4 w-4" />, label: "Email delivery failed", detail: error ?? "Unknown error" };
      case "skipped":
        return { tone: "bg-amber-50 text-amber-800 border-amber-200", icon: <MailWarning className="h-4 w-4" />, label: "Email not sent — sender not configured", detail: "Configure the sender domain to enable delivery. Rejection is recorded." };
      default:
        return { tone: "bg-surface-2 text-muted-foreground border-border", icon: <Mail className="h-4 w-4" />, label: "No email attempt recorded", detail: null };
    }
  })();

  const canRetry = status === "failed" || status === "skipped";

  return (
    <div className={`rounded-lg border p-3 ${config.tone}`}>
      <div className="flex items-start gap-2">
        <div className="mt-0.5">{config.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold">{config.label}</div>
          {config.detail && <div className="mt-0.5 text-xs opacity-90 break-words">{config.detail}</div>}
        </div>
        {canRetry && (
          <button
            onClick={onRetry}
            disabled={isRetrying}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/70 hover:bg-white text-xs font-semibold disabled:opacity-60"
          >
            <Send className="h-3 w-3" /> {isRetrying ? "Retrying…" : "Retry"}
          </button>
        )}
      </div>
    </div>
  );
}
