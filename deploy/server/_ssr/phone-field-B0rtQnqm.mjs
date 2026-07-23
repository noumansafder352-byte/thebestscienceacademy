import { s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as min_default } from "../_libs/react-phone-number-input.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/phone-field-B0rtQnqm.js
var import_jsx_runtime = require_jsx_runtime();
function FieldError({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-1.5 text-xs font-medium text-destructive flex items-center gap-1",
		"data-error": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-1 w-1 rounded-full bg-destructive" }),
			" ",
			message
		]
	});
}
function PhoneField({ label, required, value, onChange, error, placeholder, defaultCountry = "PK", className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		"data-error": error ? "true" : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm font-semibold text-ink",
				children: [
					label,
					" ",
					required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary",
						children: "*"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `mt-2 phone-field-wrap flex items-center h-11 px-3 rounded-lg border bg-surface-2 text-sm focus-within:bg-surface focus-within:border-primary transition-colors ${error ? "border-destructive/70" : "border-border"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(min_default, {
					international: true,
					countryCallingCodeEditable: false,
					defaultCountry,
					value: value || void 0,
					onChange: (v) => onChange(v ?? ""),
					placeholder: placeholder ?? "Enter phone number",
					className: "w-full min-w-0"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: error })
		]
	});
}
//#endregion
export { PhoneField as t };
