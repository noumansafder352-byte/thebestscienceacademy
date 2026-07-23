import { s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.settings-CTBadbxN.js
var import_jsx_runtime = require_jsx_runtime();
function SettingsAdmin() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-3xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "heading-md",
			children: "Settings"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Configure your academy's public presence and branding."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "card-surface p-6 space-y-5",
			onSubmit: (e) => e.preventDefault(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Academy name",
					defaultValue: "The Best Science Academy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "SEO title",
					defaultValue: "World-class online tutors for international students"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "SEO description",
					defaultValue: "Premium online tuition for IGCSE, O Level, A Level, IB, AQA and Edexcel.",
					textarea: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid sm:grid-cols-2 gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Primary color",
						defaultValue: "#2F2B8F"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Accent color",
						defaultValue: "#006B3F"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Support email",
					defaultValue: "hello@thebestscienceacademy.com",
					type: "email"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-primary",
						type: "submit",
						children: "Save changes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-ghost",
						type: "reset",
						children: "Reset"
					})]
				})
			]
		})]
	});
}
function Field({ label, defaultValue, textarea, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-semibold text-ink",
			children: label
		}), textarea ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			defaultValue,
			rows: 3,
			className: "mt-2 w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-sm outline-none focus:border-primary"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			defaultValue,
			className: "mt-2 w-full h-11 px-4 rounded-xl border border-border bg-surface text-sm outline-none focus:border-primary"
		})]
	});
}
//#endregion
export { SettingsAdmin as component };
