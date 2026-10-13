import { s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-header-CAaZDPYW.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ eyebrow, title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative overflow-hidden bg-surface border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page relative pt-16 pb-12 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28 text-center",
			children: [
				eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow justify-center",
					children: eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "heading-xl mt-4 sm:mt-5 max-w-4xl mx-auto",
					children: title
				}),
				description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed",
					children: description
				}),
				children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 sm:mt-10 flex flex-wrap justify-center gap-3",
					children
				})
			]
		})
	});
}
//#endregion
export { PageHeader as t };
