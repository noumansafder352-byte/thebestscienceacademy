import { s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as SiteLayout } from "./layout-DEKgj2GL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutors._slug-Ccd6XP7m.js
var import_jsx_runtime = require_jsx_runtime();
var SplitErrorComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "container-page section text-center",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "heading-lg",
		children: "Something went wrong"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/tutors",
		className: "btn-primary mt-6 inline-flex",
		children: "Back to tutors"
	})]
}) });
//#endregion
export { SplitErrorComponent as errorComponent };
