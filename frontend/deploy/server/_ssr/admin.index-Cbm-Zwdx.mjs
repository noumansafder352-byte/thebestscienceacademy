import { s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-Cbm-Zwdx.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./admin.index-BZ6iGpWb.mjs");
var Route = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
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
export { StatusBadge as n, Route as t };
