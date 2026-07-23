import { r as __toESM } from "../_runtime.mjs";
import { c as require_react, i as useQuery, s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { S as Search, _ as Sparkles, et as Funnel, o as UsersRound, ot as Earth, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as SiteLayout } from "./layout-DEKgj2GL.mjs";
import { t as PageHeader } from "./page-header-CAaZDPYW.mjs";
import { C as listPublicTutors, D as useServerFn } from "./tutor-api.functions-BgQ4s39o.mjs";
import { t as TutorCard } from "./tutor-card-CvLY7nb4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutors.index-CxhbsdGk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var highlights = [
	{
		icon: UsersRound,
		label: "Vetted Tutors"
	},
	{
		icon: Earth,
		label: "Global Students"
	},
	{
		icon: ShieldCheck,
		label: "Every Tutor Verified"
	},
	{
		icon: Sparkles,
		label: "Free 20-min Trial"
	}
];
function TutorsPage() {
	const listFn = useServerFn(listPublicTutors);
	const { data, isLoading } = useQuery({
		queryKey: ["public-tutors"],
		queryFn: () => listFn()
	});
	const tutors = data ?? [];
	const [q, setQ] = (0, import_react.useState)("");
	const [curr, setCurr] = (0, import_react.useState)("All");
	const [subj, setSubj] = (0, import_react.useState)("All");
	const curriculumOptions = (0, import_react.useMemo)(() => ["All", ...new Set(tutors.flatMap((t) => t.curriculums ?? []))], [tutors]);
	const subjectOptions = (0, import_react.useMemo)(() => ["All", ...new Set(tutors.flatMap((t) => t.subjects ?? []))], [tutors]);
	const filtered = tutors.filter((t) => {
		if (q && !t.name.toLowerCase().includes(q.toLowerCase()) && !(t.qualification ?? "").toLowerCase().includes(q.toLowerCase()) && !(t.title ?? "").toLowerCase().includes(q.toLowerCase())) return false;
		if (curr !== "All" && !(t.curriculums ?? []).includes(curr)) return false;
		if (subj !== "All" && !(t.subjects ?? []).includes(subj)) return false;
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Find Tutors",
		title: "Meet your perfect tutor.",
		description: "Filter our vetted faculty by subject, curriculum and experience — then book a free trial in minutes."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section pt-10 lg:pt-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8",
					children: highlights.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-2xl border border-border/70 bg-surface px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-8 w-8 rounded-lg bg-primary-soft text-primary flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(h.icon, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold text-ink",
							children: h.label
						})]
					}, h.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-4 lg:p-5 grid md:grid-cols-[1.6fr_1fr_1fr_auto] gap-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: "Search name, title or qualification…",
								className: "w-full h-11 pl-10 pr-4 rounded-full border border-border bg-surface-2 text-sm ring-focus focus:bg-surface focus:border-primary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Curriculum",
							value: curr,
							onChange: setCurr,
							options: curriculumOptions
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Subject",
							value: subj,
							onChange: setSubj,
							options: subjectOptions
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "btn-primary h-11 !py-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4" }), " Apply"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"Showing ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-ink",
								children: filtered.length
							}),
							" of ",
							tutors.length,
							" tutors"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline text-xs text-muted-foreground",
						children: "Sorted by top-rated"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5",
					children: filtered.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TutorCard, { tutor: {
						slug: t.slug,
						name: t.name,
						title: t.title,
						photo: t.photo_url ?? "",
						qualification: t.qualification ?? "",
						experience: t.experience ?? "",
						subjects: t.subjects ?? [],
						curriculums: t.curriculums ?? [],
						languages: t.languages ?? [],
						rating: Number(t.rating ?? 5),
						availability: t.availability ?? "Available"
					} }, t.slug))
				}),
				!isLoading && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 text-center py-12 card-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-ink font-semibold",
						children: tutors.length === 0 ? "No tutors published yet." : "No tutors match those filters."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: tutors.length === 0 ? "Check back soon — approved tutors will appear here." : "Try broadening the subject or curriculum."
					})]
				})
			]
		})
	})] });
}
function Select({ label, value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "w-full h-11 px-4 rounded-full border border-border bg-surface-2 text-sm font-medium ring-focus appearance-none focus:bg-surface focus:border-primary",
			"aria-label": label,
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
				value: o,
				children: [
					label,
					": ",
					o
				]
			}, o))
		})
	});
}
//#endregion
export { TutorsPage as component };
