import { r as __toESM } from "../_runtime.mjs";
import { c as require_react, i as useQuery, o as useQueryClient, s as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { B as MailOpen, O as Phone, R as Mail, S as Search, f as TriangleAlert, m as Trash2, n as X } from "../_libs/lucide-react.mjs";
import { D as useServerFn, d as adminListMessages, i as adminDeleteMessage, p as adminMarkMessageRead, s as adminGetMessage } from "./tutor-api.functions-BgQ4s39o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.messages-YJDPaw3J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MessagesAdmin() {
	const listFn = useServerFn(adminListMessages);
	const markFn = useServerFn(adminMarkMessageRead);
	const deleteFn = useServerFn(adminDeleteMessage);
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["admin-messages"],
		queryFn: () => listFn()
	});
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const [confirm, setConfirm] = (0, import_react.useState)(null);
	const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-messages"] });
	const mark = useMutation({
		mutationFn: (v) => markFn({ data: v }),
		onSuccess: invalidate
	});
	const remove = useMutation({
		mutationFn: (id) => deleteFn({ data: { id } }),
		onSuccess: () => {
			invalidate();
			setConfirm(null);
			setOpenId(null);
		}
	});
	const rows = (0, import_react.useMemo)(() => {
		const search = q.trim().toLowerCase();
		return (data ?? []).filter((m) => {
			if (filter !== "all" && m.status !== filter) return false;
			if (!search) return true;
			return [
				m.name,
				m.email,
				m.phone,
				m.subject,
				m.message
			].filter(Boolean).some((v) => v.toLowerCase().includes(search));
		});
	}, [
		data,
		q,
		filter
	]);
	const counts = {
		all: data?.length ?? 0,
		unread: (data ?? []).filter((m) => m.status === "unread").length,
		read: (data ?? []).filter((m) => m.status === "read").length
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "heading-md",
					children: "Messages"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Inbound enquiries from the contact form."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2 flex-wrap",
					children: [
						"all",
						"unread",
						"read"
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setFilter(f),
						className: `px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors capitalize ${filter === f ? "bg-primary text-primary-foreground border-primary" : "bg-surface text-ink border-border hover:border-primary/50"}`,
						children: [
							f,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-1 opacity-70",
								children: [
									"(",
									counts[f],
									")"
								]
							})
						]
					}, f))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search by name, email, subject, or message…",
						className: "w-full h-10 pl-9 pr-4 rounded-full border border-border bg-surface-2 text-sm outline-none focus:bg-surface focus:border-primary"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 divide-y divide-border",
					children: [rows.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-4 flex items-start justify-between gap-4 group cursor-pointer",
						onClick: () => {
							setOpenId(m.id);
							if (m.status === "unread") mark.mutate({
								id: m.id,
								status: "read"
							});
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4 min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-10 w-10 rounded-full bg-primary-soft text-primary flex items-center justify-center text-xs font-bold shrink-0",
								children: m.name.split(" ").map((p) => p[0]).slice(0, 2).join("")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 flex-wrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-semibold text-ink truncate",
											children: m.name
										}), m.status === "unread" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground px-1.5 py-0.5 rounded",
											children: "New"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground truncate",
										children: m.email
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-sm font-medium text-ink truncate",
										children: m.subject ?? "(no subject)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-xs text-muted-foreground line-clamp-2",
										children: m.message
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-end gap-2 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: new Date(m.created_at).toLocaleDateString()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: (e) => {
										e.stopPropagation();
										mark.mutate({
											id: m.id,
											status: m.status === "unread" ? "read" : "unread"
										});
									},
									className: "p-1.5 rounded-md hover:bg-surface-2 text-muted-foreground",
									title: m.status === "unread" ? "Mark as read" : "Mark as unread",
									children: m.status === "unread" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailOpen, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: (e) => {
										e.stopPropagation();
										setConfirm({
											id: m.id,
											name: m.name
										});
									},
									className: "p-1.5 rounded-md hover:bg-destructive/10 text-destructive",
									title: "Delete",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
								})]
							})]
						})]
					}, m.id)), data && rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-12 text-center text-sm text-muted-foreground",
						children: "No messages match your filters."
					})]
				})]
			}),
			openId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageDrawer, {
				id: openId,
				onClose: () => setOpenId(null),
				onDelete: (id, name) => setConfirm({
					id,
					name
				}),
				onToggle: (id, status) => mark.mutate({
					id,
					status
				})
			}),
			confirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4",
				onClick: () => !remove.isPending && setConfirm(null),
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
							children: "Delete message?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								"This will permanently remove the message from ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-ink",
									children: confirm.name
								}),
								". This action cannot be undone."
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setConfirm(null),
							disabled: remove.isPending,
							className: "btn-ghost !py-2 text-sm",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => remove.mutate(confirm.id),
							disabled: remove.isPending,
							className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }),
								" ",
								remove.isPending ? "Deleting…" : "Delete"
							]
						})]
					})]
				})
			})
		]
	});
}
function MessageDrawer({ id, onClose, onDelete, onToggle }) {
	const getFn = useServerFn(adminGetMessage);
	const { data: msg, isLoading } = useQuery({
		queryKey: ["admin-message", id],
		queryFn: () => getFn({ data: { id } })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex",
		onClick: onClose,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 bg-black/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-xl bg-surface h-full overflow-y-auto shadow-2xl",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 bg-surface border-b border-border px-6 py-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "heading-md",
					children: "Message details"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "h-9 w-9 rounded-full hover:bg-surface-2 flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}), isLoading || !msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-8 text-sm text-muted-foreground",
				children: "Loading…"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-14 w-14 rounded-2xl bg-primary-soft text-primary flex items-center justify-center text-lg font-bold shrink-0",
							children: msg.name.split(" ").map((p) => p[0]).slice(0, 2).join("")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-[var(--font-display)] font-bold text-lg text-ink break-words",
									children: msg.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: ["Received ", new Date(msg.created_at).toLocaleString()]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${msg.status === "unread" ? "bg-primary text-primary-foreground" : "bg-slate-100 text-slate-700"}`,
									children: msg.status
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-surface p-4 space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: Mail,
								label: "Email",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `mailto:${msg.email}`,
									className: "text-primary font-medium break-all",
									children: msg.email
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: Phone,
								label: "Mobile",
								children: msg.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `tel:${msg.phone}`,
									className: "text-primary font-medium break-all",
									children: msg.phone
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Not provided"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Subject",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-ink font-medium break-words",
									children: msg.subject ?? "(no subject)"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Submitted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-ink font-medium",
									children: new Date(msg.created_at).toLocaleString()
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] uppercase tracking-wider font-semibold text-primary mb-2",
						children: "Message"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "card-surface p-5 text-sm text-ink leading-relaxed whitespace-pre-line [overflow-wrap:anywhere]",
						children: msg.message
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sticky bottom-0 bg-surface border-t border-border py-4 flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onToggle(id, msg.status === "unread" ? "read" : "unread"),
							className: "btn-ghost flex-1 text-sm",
							children: msg.status === "unread" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailOpen, { className: "h-4 w-4" }), " Mark as read"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), " Mark as unread"] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onDelete(id, msg.name),
							className: "inline-flex items-center gap-2 flex-1 justify-center px-4 py-2 rounded-lg bg-destructive text-white text-sm font-semibold hover:opacity-90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Delete"]
						})]
					})
				]
			})]
		})]
	});
}
function Row({ icon: Icon, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-2",
		children: [
			Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-muted-foreground mt-0.5 shrink-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground w-24 shrink-0",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 flex-1",
				children
			})
		]
	});
}
//#endregion
export { MessagesAdmin as component };
