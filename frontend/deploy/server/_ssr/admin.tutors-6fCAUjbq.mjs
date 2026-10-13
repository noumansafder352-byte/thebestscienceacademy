import { r as __toESM } from "../_runtime.mjs";
import { c as require_react, i as useQuery, o as useQueryClient, s as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as Search, f as TriangleAlert, g as Star, k as Pencil, m as Trash2 } from "../_libs/lucide-react.mjs";
import { D as useServerFn, _ as adminSetTutorActive, a as adminDeleteTutor, f as adminListTutors } from "./tutor-api.functions-BgQ4s39o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.tutors-6fCAUjbq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TutorsAdmin() {
	const listFn = useServerFn(adminListTutors);
	const toggleFn = useServerFn(adminSetTutorActive);
	const deleteFn = useServerFn(adminDeleteTutor);
	const qc = useQueryClient();
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [confirm, setConfirm] = (0, import_react.useState)(null);
	const { data } = useQuery({
		queryKey: ["admin-tutors"],
		queryFn: () => listFn()
	});
	const invalidate = () => {
		qc.invalidateQueries({ queryKey: ["admin-tutors"] });
		qc.invalidateQueries({ queryKey: ["public-tutors"] });
		qc.invalidateQueries({ queryKey: ["admin-stats"] });
		qc.invalidateQueries({ queryKey: ["admin-applications"] });
	};
	const toggle = useMutation({
		mutationFn: (v) => toggleFn({ data: v }),
		onSuccess: invalidate
	});
	const remove = useMutation({
		mutationFn: (id) => deleteFn({ data: { id } }),
		onSuccess: () => {
			invalidate();
			setConfirm(null);
		}
	});
	const visible = (0, import_react.useMemo)(() => (data ?? []).filter((t) => !t.deleted_at), [data]);
	const rows = (0, import_react.useMemo)(() => {
		const search = q.toLowerCase();
		return visible.filter((t) => {
			if (filter === "active" && !t.is_active) return false;
			if (filter === "inactive" && t.is_active) return false;
			return t.name.toLowerCase().includes(search);
		});
	}, [
		visible,
		q,
		filter
	]);
	const counts = {
		all: visible.length,
		active: visible.filter((t) => t.is_active).length,
		inactive: visible.filter((t) => !t.is_active).length
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "heading-md",
					children: "Tutors"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						counts.active,
						" active · ",
						counts.inactive,
						" inactive"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2 flex-wrap",
					children: [
						"all",
						"active",
						"inactive"
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setFilter(f),
						className: `px-3 py-1.5 rounded-full text-xs font-semibold border capitalize ${filter === f ? "bg-primary text-primary-foreground border-primary" : "bg-surface text-ink border-border hover:border-primary/50"}`,
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
					className: "relative max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search tutors…",
						className: "w-full h-10 pl-9 pr-4 rounded-full border border-border bg-surface-2 text-sm outline-none focus:bg-surface focus:border-primary"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-3 font-semibold",
									children: "Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-3 font-semibold",
									children: "Subject"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-3 font-semibold",
									children: "Curriculum"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-3 font-semibold",
									children: "Rating"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-3 font-semibold",
									children: "Reviews"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-3 font-semibold",
									children: "Joined"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-3 font-semibold",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-3 font-semibold text-right",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border hover:bg-surface-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-3 font-medium text-ink",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [t.name, t.is_featured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gold/15 text-[oklch(0.42_0.10_75)]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-current text-gold" }), " Top"]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-3 text-muted-foreground",
									children: t.subjects?.[0] ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-3 text-muted-foreground",
									children: t.curriculums?.[0] ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 font-semibold text-[oklch(0.42_0.10_75)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-current text-gold" }), Number(t.rating ?? 0).toFixed(1)]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-3 text-muted-foreground",
									children: t.reviews ?? 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-3 text-muted-foreground",
									children: new Date(t.created_at).toLocaleDateString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => toggle.mutate({
											id: t.id,
											is_active: !t.is_active
										}),
										className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${t.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-700"}`,
										children: t.is_active ? "Active" : "Inactive"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-3 pr-3 text-right whitespace-nowrap",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/tutors/$slug",
											params: { slug: t.slug },
											className: "text-primary font-semibold text-xs mr-3",
											children: "View"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/admin/tutors/$id/edit",
											params: { id: t.id },
											className: "inline-flex items-center gap-1 text-xs font-semibold text-ink hover:text-primary mr-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), " Edit"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setConfirm({
												id: t.id,
												name: t.name
											}),
											className: "inline-flex items-center gap-1 text-xs font-semibold text-destructive hover:opacity-80",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Delete"]
										})
									]
								})
							]
						}, t.id)), data && rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 8,
							className: "py-12 text-center text-muted-foreground",
							children: "No tutors match your filters."
						}) })] })]
					})
				})]
			}),
			confirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
				onClick: () => !remove.isPending && setConfirm(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md card-surface p-6",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-11 w-11 shrink-0 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-[var(--font-display)] font-bold text-lg text-ink",
								children: "Permanently delete tutor?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-ink",
									children: confirm.name
								}), " will be permanently removed from the Find Tutors page, their public profile, and the admin tutors list. This action cannot be undone."]
							})]
						})]
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), remove.isPending ? "Deleting…" : "Yes, delete permanently"]
						})]
					})]
				})
			})
		]
	});
}
//#endregion
export { TutorsAdmin as component };
