import { s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Star } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutor-badges-D_kNNhg8.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function CurriculumBadge({ label, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide bg-primary-soft text-primary ring-1 ring-primary/15", className),
		children: label
	});
}
function SubjectBadge({ label, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium text-ink bg-surface-2 border border-border/70", className),
		children: label
	});
}
function RatingPill({ rating, reviews, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1 text-xs font-semibold text-[oklch(0.42_0.10_75)]", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-current text-gold" }),
			rating.toFixed(1),
			reviews !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-muted-foreground font-normal",
				children: [
					"(",
					reviews,
					")"
				]
			})
		]
	});
}
//#endregion
export { RatingPill as n, SubjectBadge as r, CurriculumBadge as t };
