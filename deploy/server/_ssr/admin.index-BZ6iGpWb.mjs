import { i as useQuery, s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { Q as GraduationCap, R as Mail, a as Users, c as UserPlus, g as Star, p as TrendingUp, yt as Calendar } from "../_libs/lucide-react.mjs";
import { D as useServerFn, d as adminListMessages, f as adminListTutors, l as adminListApplications, v as adminStatsSummary } from "./tutor-api.functions-BgQ4s39o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-BZ6iGpWb.js
var import_jsx_runtime = require_jsx_runtime();
function AdminHome() {
	const statsFn = useServerFn(adminStatsSummary);
	const appsFn = useServerFn(adminListApplications);
	const tutorsFn = useServerFn(adminListTutors);
	const msgsFn = useServerFn(adminListMessages);
	const stats = useQuery({
		queryKey: ["admin-stats"],
		queryFn: () => statsFn()
	});
	const apps = useQuery({
		queryKey: ["admin-applications"],
		queryFn: () => appsFn()
	});
	const tutors = useQuery({
		queryKey: ["admin-tutors"],
		queryFn: () => tutorsFn()
	});
	const msgs = useQuery({
		queryKey: ["admin-messages"],
		queryFn: () => msgsFn()
	});
	const cards = [
		{
			label: "Pending applications",
			value: stats.data?.applications.pending ?? "—",
			icon: UserPlus
		},
		{
			label: "Active tutors",
			value: stats.data?.tutors ?? "—",
			icon: GraduationCap
		},
		{
			label: "Trial bookings",
			value: stats.data?.bookings ?? "—",
			icon: Users
		},
		{
			label: "Contact messages",
			value: stats.data?.messages ?? "—",
			icon: Mail
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "heading-md",
				children: "Welcome back, Admin"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Overview of applications, tutors and enquiries."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5",
				children: cards.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: s.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-4 w-4 text-primary" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 font-[var(--font-display)] text-3xl font-bold text-ink",
						children: s.value
					})]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-[2fr_1fr] gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "heading-md",
							children: "Recent applications"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Latest tutor applications awaiting review."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-5 w-5 text-primary" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "text-left text-xs uppercase tracking-wider text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-3 font-semibold",
										children: "Applicant"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-3 font-semibold",
										children: "Title"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-3 font-semibold",
										children: "Subject"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-3 font-semibold",
										children: "Status"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [(apps.data ?? []).filter((a) => a.status === "pending").slice(0, 6).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border",
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
										className: "py-3 pr-3 text-muted-foreground",
										children: a.subjects?.[0] ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: a.status })
									})
								]
							}, a.id)), apps.data && apps.data.filter((a) => a.status === "pending").length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 4,
								className: "py-10 text-center text-muted-foreground text-sm",
								children: "No pending applications."
							}) })] })]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "heading-md",
							children: "Top tutors"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-5 w-5 text-gold" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-5 space-y-3",
						children: [(tutors.data ?? []).filter((t) => t.is_active && !t.deleted_at).slice(0, 5).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-9 w-9 rounded-full bg-primary-soft text-primary flex items-center justify-center text-xs font-bold shrink-0",
									children: t.name.split(" ").map((p) => p[0]).slice(-2).join("")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-semibold text-ink truncate",
										children: t.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground truncate",
										children: [
											t.subjects?.[0],
											" · ",
											t.curriculums?.[0]
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm font-semibold text-[oklch(0.42_0.10_75)] inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-current text-gold" }),
									" ",
									t.rating
								]
							})]
						}, t.id)), tutors.data && tutors.data.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted-foreground py-4",
							children: "No tutors yet — approve an application to publish one."
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-2 gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "heading-md",
							children: "Growth"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-primary" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 text-sm text-muted-foreground",
						children: stats.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [stats.data.applications.approved, " approved applications total."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2",
							children: [
								stats.data.applications.rejected,
								" rejected · ",
								stats.data.applications.pending,
								" in review."
							]
						})] }) : "Loading…"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "heading-md",
							children: "Latest messages"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-5 w-5 text-primary" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-5 space-y-3",
						children: [(msgs.data ?? []).slice(0, 4).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start justify-between gap-3 p-3 rounded-xl hover:bg-surface-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm font-semibold text-ink truncate",
									children: [
										m.name,
										" · ",
										m.email
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground truncate",
									children: m.subject ?? m.message
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground shrink-0 flex items-center gap-2",
								children: [m.status === "unread" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-gold" }), new Date(m.created_at).toLocaleDateString()]
							})]
						}, m.id)), msgs.data && msgs.data.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted-foreground py-4",
							children: "No messages yet."
						})]
					})]
				})]
			})
		]
	});
}
function StatusBadge({ status }) {
	const s = String(status ?? "").toLowerCase();
	const tone = s === "active" || s === "approved" ? "bg-emerald-50 text-emerald-700" : s === "pending" || s === "review" || s === "new" || s === "unread" || s === "trial" ? "bg-amber-50 text-amber-700" : s === "interview" ? "bg-blue-50 text-blue-700" : s === "rejected" || s === "paused" || s === "cancelled" ? "bg-rose-50 text-rose-700" : s === "removed" ? "bg-slate-200 text-slate-700" : "bg-slate-100 text-slate-700";
	const label = status === "removed" ? "Removed" : status;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${tone}`,
		children: label
	});
}
//#endregion
export { StatusBadge, AdminHome as component };
