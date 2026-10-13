import { s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Scale, Ct as Brain, I as Map, K as Languages, N as MessageSquare, Ot as Atom, St as Briefcase, U as Leaf, X as HeartPulse, Y as Infinity$1, a as Users, j as Moon, kt as ArrowRight, q as Landmark, tt as FlaskConical, ut as CodeXml, v as Sigma, vt as ChartLine, wt as BookOpen, xt as Calculator } from "../_libs/lucide-react.mjs";
import { t as SiteLayout } from "./layout-DEKgj2GL.mjs";
import { t as PageHeader } from "./page-header-CAaZDPYW.mjs";
import { a as subjects } from "./site-data-DOc52N9b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/subjects-CMpWPS7n.js
var import_jsx_runtime = require_jsx_runtime();
var icons = {
	Sigma,
	Atom,
	FlaskConical,
	Leaf,
	BookOpen,
	Code2: CodeXml,
	Briefcase,
	LineChart: ChartLine,
	Calculator,
	Infinity: Infinity$1,
	Languages,
	Moon,
	Scale,
	HeartPulse,
	Brain,
	Landmark,
	Map,
	MessageSquare,
	Users
};
function SubjectsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Subjects",
		title: "Specialist tutors for every subject we offer.",
		description: "Each tutor is matched to their strongest subject area and exam board — no generalists, no compromise."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-page grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
			children: subjects.map((s) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface card-surface-hover p-7 group",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-12 w-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center group-hover:bg-gold group-hover:text-gold-foreground transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(icons[s.icon] ?? Atom, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 heading-md",
							children: s.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground leading-relaxed",
							children: "Structured curriculum coverage with past-paper practice, exam strategy and one-to-one mentoring."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid grid-cols-3 gap-3 text-center text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2 rounded-lg bg-surface-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-primary",
										children: "Topics"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-0.5 text-muted-foreground",
										children: "Full syllabus"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2 rounded-lg bg-surface-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-primary",
										children: "Exam Prep"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-0.5 text-muted-foreground",
										children: "Past papers"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2 rounded-lg bg-surface-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-primary",
										children: "Tutors"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-0.5 text-muted-foreground",
										children: "100+ available"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/tutors",
								className: "btn-ghost flex-1 !py-2.5 text-sm",
								children: "Available Tutors"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/contact",
								className: "btn-primary flex-1 !py-2.5 text-sm",
								children: ["Book Trial ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
							})]
						})
					]
				}, s.name);
			})
		})
	})] });
}
//#endregion
export { SubjectsPage as component };
