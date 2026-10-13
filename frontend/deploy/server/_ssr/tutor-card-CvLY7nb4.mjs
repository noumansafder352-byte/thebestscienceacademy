import { s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { K as Languages, Q as GraduationCap, kt as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as RatingPill, r as SubjectBadge, t as CurriculumBadge } from "./tutor-badges-D_kNNhg8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutor-card-CvLY7nb4.js
var import_jsx_runtime = require_jsx_runtime();
function TutorCard({ tutor }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group card-surface card-surface-hover overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[5/4] overflow-hidden bg-primary-soft",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: tutor.photo,
				alt: tutor.name,
				loading: "lazy",
				className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-2.5 right-2.5 rounded-full bg-white/95 backdrop-blur px-2 py-0.5 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingPill, { rating: tutor.rating })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 flex flex-col flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-[var(--font-display)] font-semibold text-ink text-[15px] leading-tight truncate",
					children: tutor.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-[11.5px] text-primary font-semibold uppercase tracking-wide truncate",
					children: tutor.title
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[11.5px] text-muted-foreground leading-snug line-clamp-2",
					children: tutor.qualification
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-1",
					children: tutor.subjects.slice(0, 2).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectBadge, { label: s }, s))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-1",
					children: tutor.curriculums.slice(0, 3).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurriculumBadge, { label: c }, c))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 pt-3 border-t border-border/70 flex items-center justify-between text-[11px] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-3 w-3" }),
							" ",
							tutor.experience
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 truncate",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-3 w-3" }),
							" ",
							tutor.languages.join(", ")
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/tutors/$slug",
					params: { slug: tutor.slug },
					className: "mt-3 inline-flex items-center justify-center gap-1.5 w-full rounded-full bg-primary text-primary-foreground text-xs font-semibold py-2.5 hover:bg-primary/90 transition-colors",
					children: ["View Profile ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
				})
			]
		})]
	});
}
//#endregion
export { TutorCard as t };
