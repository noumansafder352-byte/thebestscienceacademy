import { r as __toESM } from "../_runtime.mjs";
import { c as require_react, i as useQuery, o as useQueryClient, s as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { E as RotateCcw, O as Phone, P as MessageCircle, R as Mail, f as TriangleAlert, ht as CircleCheck, m as Trash2, n as X, pt as CircleX, st as Download, x as Send, z as MailWarning } from "../_libs/lucide-react.mjs";
import { D as useServerFn, g as adminResendRejectionEmail, h as adminReopenApplication, l as adminListApplications, m as adminRejectApplication, n as adminApproveApplication, o as adminGetApplication, r as adminDeleteApplication, t as REJECTION_REASON_OPTIONS, y as adminUpdateApplicationNotes } from "./tutor-api.functions-BgQ4s39o.mjs";
import { n as StatusBadge } from "./admin.index-Cbm-Zwdx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.applications-CFjCabSL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ApplicationsAdmin() {
	const listFn = useServerFn(adminListApplications);
	const { data: apps } = useQuery({
		queryKey: ["admin-applications"],
		queryFn: () => listFn()
	});
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const counts = {
		pending: (apps ?? []).filter((a) => a.status === "pending").length,
		approved: (apps ?? []).filter((a) => a.status === "approved").length,
		rejected: (apps ?? []).filter((a) => a.status === "rejected").length,
		removed: (apps ?? []).filter((a) => a.status === "removed").length
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "heading-md",
				children: "Tutor applications"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Review, approve or reject incoming tutor applications."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					{
						label: "Pending",
						value: counts.pending
					},
					{
						label: "Approved",
						value: counts.approved
					},
					{
						label: "Rejected",
						value: counts.rejected
					},
					{
						label: "Removed",
						value: counts.removed
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: s.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-[var(--font-display)] text-2xl font-bold text-ink",
						children: s.value
					})]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card-surface p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-3 font-semibold",
									children: "Applicant"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-3 font-semibold",
									children: "Title"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-3 font-semibold",
									children: "Subjects"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-3 font-semibold",
									children: "Experience"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-3 font-semibold",
									children: "Submitted"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-3 font-semibold",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-3 font-semibold text-right",
									children: "Action"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [(apps ?? []).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border hover:bg-surface-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-3 font-medium text-ink",
									children: a.full_name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-3 text-muted-foreground truncate max-w-[220px]",
									children: a.professional_title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-3 text-muted-foreground truncate max-w-[200px]",
									children: (a.subjects ?? []).slice(0, 2).join(", ")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-3 text-muted-foreground",
									children: a.experience_years
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-3 text-muted-foreground",
									children: new Date(a.created_at).toLocaleDateString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: a.status })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-3 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setOpenId(a.id),
										className: "text-primary font-semibold text-xs",
										children: "Review →"
									})
								})
							]
						}, a.id)), apps && apps.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 7,
							className: "py-14 text-center text-muted-foreground",
							children: "No applications yet."
						}) })] })]
					})
				})
			}),
			openId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplicationDrawer, {
				id: openId,
				onClose: () => setOpenId(null)
			})
		]
	});
}
function ApplicationDrawer({ id, onClose }) {
	const getFn = useServerFn(adminGetApplication);
	const approveFn = useServerFn(adminApproveApplication);
	const rejectFn = useServerFn(adminRejectApplication);
	const resendFn = useServerFn(adminResendRejectionEmail);
	const reopenFn = useServerFn(adminReopenApplication);
	const deleteFn = useServerFn(adminDeleteApplication);
	const notesFn = useServerFn(adminUpdateApplicationNotes);
	const qc = useQueryClient();
	const { data: app, isLoading } = useQuery({
		queryKey: ["admin-application", id],
		queryFn: () => getFn({ data: { id } })
	});
	const [notes, setNotes] = (0, import_react.useState)("");
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	const [rejectOpen, setRejectOpen] = (0, import_react.useState)(false);
	const [rejectReason, setRejectReason] = (0, import_react.useState)(REJECTION_REASON_OPTIONS[0]);
	const [rejectComments, setRejectComments] = (0, import_react.useState)("");
	const invalidate = () => {
		qc.invalidateQueries({ queryKey: ["admin-applications"] });
		qc.invalidateQueries({ queryKey: ["admin-application", id] });
		qc.invalidateQueries({ queryKey: ["admin-tutors"] });
		qc.invalidateQueries({ queryKey: ["admin-stats"] });
		qc.invalidateQueries({ queryKey: ["public-tutors"] });
	};
	const approve = useMutation({
		mutationFn: () => approveFn({ data: { id } }),
		onSuccess: () => {
			invalidate();
			onClose();
		}
	});
	const reject = useMutation({
		mutationFn: () => rejectFn({ data: {
			id,
			reason: rejectReason,
			comments: rejectComments.trim() || null
		} }),
		onSuccess: () => {
			invalidate();
			setRejectOpen(false);
		}
	});
	const resend = useMutation({
		mutationFn: () => resendFn({ data: { id } }),
		onSuccess: invalidate
	});
	const reopen = useMutation({
		mutationFn: () => reopenFn({ data: { id } }),
		onSuccess: invalidate
	});
	const remove = useMutation({
		mutationFn: () => deleteFn({ data: { id } }),
		onSuccess: () => {
			invalidate();
			setConfirmDelete(false);
			onClose();
		}
	});
	const saveNotes = useMutation({
		mutationFn: () => notesFn({ data: {
			id,
			admin_notes: notes
		} }),
		onSuccess: invalidate
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex",
		onClick: onClose,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 bg-black/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-2xl bg-surface h-full overflow-y-auto shadow-2xl",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 bg-surface border-b border-border px-6 py-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "heading-md",
					children: "Application details"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "h-9 w-9 rounded-full hover:bg-surface-2 flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}), isLoading || !app ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-8 text-sm text-muted-foreground",
				children: "Loading…"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [app.photo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: app.photo_url,
							alt: app.full_name,
							className: "h-20 w-20 rounded-xl object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-20 w-20 rounded-xl bg-primary-soft text-primary flex items-center justify-center text-2xl font-bold",
							children: app.full_name?.[0]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-[var(--font-display)] font-bold text-lg text-ink",
									children: app.full_name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-primary font-semibold",
									children: app.professional_title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										app.city,
										", ",
										app.country,
										" · ",
										app.nationality
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: app.status })
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "Private contact (admin only)",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: Mail,
								label: "Email",
								value: app.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: Phone,
								label: "Phone",
								value: app.phone ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: MessageCircle,
								label: "WhatsApp",
								value: app.whatsapp ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Preferred contact",
								value: app.preferred_contact ?? "—"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "Professional",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Qualification",
								value: app.qualification ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Experience",
								value: app.experience_years ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Subjects",
								value: (app.subjects ?? []).join(", ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Curriculums",
								value: (app.curriculums ?? []).join(", ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Grade levels",
								value: (app.grade_levels ?? []).join(", ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Languages",
								value: (app.languages ?? []).join(", ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Timezone",
								value: app.timezone ?? "—"
							})
						]
					}),
					app.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Bio",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground leading-relaxed whitespace-pre-line",
							children: app.bio
						})
					}),
					app.methodology && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Methodology",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground leading-relaxed whitespace-pre-line",
							children: app.methodology
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "CV / Resume",
						children: app.cv_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: app.cv_url,
							target: "_blank",
							rel: "noreferrer",
							className: "btn-ghost !py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Download CV"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No CV uploaded."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "National ID / CNIC (private — admin verification only)",
						children: app.cnic_front_url || app.cnic_back_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid sm:grid-cols-2 gap-3",
							children: ["front", "back"].map((side) => {
								const url = side === "front" ? app.cnic_front_url : app.cnic_back_url;
								const label = side === "front" ? "Front" : "Back";
								if (!url) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-dashed border-border p-4 text-xs text-muted-foreground",
									children: [label, " not uploaded."]
								}, side);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border overflow-hidden bg-surface-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: url,
										target: "_blank",
										rel: "noreferrer",
										className: "block",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: url,
											alt: `National ID ${label}`,
											className: "w-full h-40 object-cover"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between p-2 gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] uppercase tracking-wider font-semibold text-primary",
											children: label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: url,
											download: true,
											target: "_blank",
											rel: "noreferrer",
											className: "btn-ghost !py-1.5 !px-2.5 text-[11px]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3 w-3" }), " Download"]
										})]
									})]
								}, side);
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No National ID uploaded."
						})
					}),
					app.status === "rejected" && app.rejection_reason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "Rejection details",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Reason",
								value: app.rejection_reason
							}),
							app.rejection_comments && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Comments",
								value: app.rejection_comments
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Rejected at",
								value: app.rejected_at ? new Date(app.rejected_at).toLocaleString() : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 pt-3 border-t border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailStatusBanner, {
									status: app.rejection_email_status,
									error: app.rejection_email_error,
									attemptedAt: app.rejection_email_attempted_at,
									onRetry: () => resend.mutate(),
									isRetrying: resend.isPending
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "Admin notes (private)",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							defaultValue: app.admin_notes ?? "",
							onChange: (e) => setNotes(e.target.value),
							rows: 3,
							className: "w-full px-3 py-2 rounded-lg border border-border bg-surface-2 text-sm",
							placeholder: "Notes about this applicant…"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => saveNotes.mutate(),
							className: "mt-2 btn-ghost !py-2 text-xs",
							children: "Save notes"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sticky bottom-0 bg-surface border-t border-border py-4 flex gap-3 flex-wrap",
						children: [
							app.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => approve.mutate(),
								disabled: approve.isPending,
								className: "btn-primary flex-1 min-w-[140px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }),
									" ",
									approve.isPending ? "Approving…" : "Approve & publish"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setRejectOpen(true),
								className: "btn-ghost flex-1 min-w-[120px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }), " Reject"]
							})] }),
							app.status === "rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => reopen.mutate(),
									disabled: reopen.isPending,
									className: "btn-ghost flex-1 min-w-[120px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }),
										" ",
										reopen.isPending ? "Reopening…" : "Reopen"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => approve.mutate(),
									disabled: approve.isPending,
									className: "btn-primary flex-1 min-w-[140px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }),
										" ",
										approve.isPending ? "Approving…" : "Approve now"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setConfirmDelete(true),
									className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive text-sm font-semibold hover:bg-destructive/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Delete permanently"]
								})
							] }),
							app.status === "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm text-muted-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-emerald-600" }), " This application has been approved and published."]
							}),
							app.status === "removed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm text-muted-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-slate-500" }), " This tutor was removed. Application kept for history."]
							})
						]
					}),
					confirmDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4",
						onClick: () => !remove.isPending && setConfirmDelete(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full max-w-md card-surface p-6",
							onClick: (e) => e.stopPropagation(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-11 w-11 shrink-0 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-[var(--font-display)] font-bold text-lg text-ink",
									children: "Delete application?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										"This will permanently remove the application from ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-ink",
											children: app.full_name
										}),
										". This cannot be undone."
									]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex justify-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setConfirmDelete(false),
									disabled: remove.isPending,
									className: "btn-ghost !py-2 text-sm",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => remove.mutate(),
									disabled: remove.isPending,
									className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }),
										" ",
										remove.isPending ? "Deleting…" : "Delete permanently"
									]
								})]
							})]
						})
					}),
					rejectOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4",
						onClick: () => !reject.isPending && setRejectOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full max-w-lg card-surface p-6",
							onClick: (e) => e.stopPropagation(),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-11 w-11 shrink-0 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-[var(--font-display)] font-bold text-lg text-ink",
											children: "Reject application?"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-sm text-muted-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-ink",
													children: app.full_name
												}),
												" will be notified by email at",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium text-ink",
													children: app.email
												}),
												"."
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
										children: ["Reason ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: rejectReason,
										onChange: (e) => setRejectReason(e.target.value),
										className: "mt-1.5 w-full px-3 py-2 rounded-lg border border-border bg-surface-2 text-sm",
										children: REJECTION_REASON_OPTIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: r,
											children: r
										}, r))
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
										children: "Additional comments (optional)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: rejectComments,
										onChange: (e) => setRejectComments(e.target.value),
										rows: 4,
										maxLength: 2e3,
										className: "mt-1.5 w-full px-3 py-2 rounded-lg border border-border bg-surface-2 text-sm",
										placeholder: "Share any additional context for the applicant…"
									})] })]
								}),
								reject.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-destructive",
									children: reject.error?.message ?? "Something went wrong. Please try again."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex justify-end gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setRejectOpen(false),
										disabled: reject.isPending,
										className: "btn-ghost !py-2 text-sm",
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => reject.mutate(),
										disabled: reject.isPending,
										className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }),
											" ",
											reject.isPending ? "Rejecting…" : "Confirm rejection & notify"
										]
									})]
								})
							]
						})
					})
				]
			})]
		})]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] uppercase tracking-wider font-semibold text-primary mb-3",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children
		})]
	});
}
function Row({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-2 text-sm",
		children: [
			Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-muted-foreground mt-0.5 shrink-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground w-32 shrink-0",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-ink font-medium break-words min-w-0",
				children: value
			})
		]
	});
}
function EmailStatusBanner({ status, error, attemptedAt, onRetry, isRetrying }) {
	const attempted = attemptedAt ? new Date(attemptedAt).toLocaleString() : null;
	const config = (() => {
		switch (status) {
			case "sent": return {
				tone: "bg-emerald-50 text-emerald-700 border-emerald-200",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }),
				label: "Rejection email sent",
				detail: attempted ? `Delivered · ${attempted}` : null
			};
			case "failed": return {
				tone: "bg-destructive/10 text-destructive border-destructive/30",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailWarning, { className: "h-4 w-4" }),
				label: "Email delivery failed",
				detail: error ?? "Unknown error"
			};
			case "skipped": return {
				tone: "bg-amber-50 text-amber-800 border-amber-200",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailWarning, { className: "h-4 w-4" }),
				label: "Email not sent — sender not configured",
				detail: "Configure the sender domain to enable delivery. Rejection is recorded."
			};
			default: return {
				tone: "bg-surface-2 text-muted-foreground border-border",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }),
				label: "No email attempt recorded",
				detail: null
			};
		}
	})();
	const canRetry = status === "failed" || status === "skipped";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `rounded-lg border p-3 ${config.tone}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5",
					children: config.icon
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold",
						children: config.label
					}), config.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-0.5 text-xs opacity-90 break-words",
						children: config.detail
					})]
				}),
				canRetry && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onRetry,
					disabled: isRetrying,
					className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/70 hover:bg-white text-xs font-semibold disabled:opacity-60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3 w-3" }),
						" ",
						isRetrying ? "Retrying…" : "Retry"
					]
				})
			]
		})
	});
}
//#endregion
export { ApplicationsAdmin as component };
