import { r as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { L as MapPin, O as Phone, P as MessageCircle, R as Mail, dt as Clock, ht as CircleCheck, kt as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as SiteLayout } from "./layout-DEKgj2GL.mjs";
import { t as PageHeader } from "./page-header-CAaZDPYW.mjs";
import { D as useServerFn, T as submitTrialBooking, w as submitContactMessage } from "./tutor-api.functions-BgQ4s39o.mjs";
import { t as isValidPhoneNumber } from "../_libs/react-phone-number-input.mjs";
import { t as PhoneField } from "./phone-field-B0rtQnqm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-B-90XG-O.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyBooking = {
	student_name: "",
	parent_name: "",
	country: "",
	email: "",
	whatsapp: "",
	grade_level: "",
	curriculum: "",
	subject: "",
	notes: ""
};
function ContactPage() {
	const bookingFn = useServerFn(submitTrialBooking);
	const messageFn = useServerFn(submitContactMessage);
	const [form, setForm] = (0, import_react.useState)(emptyBooking);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const upd = (k) => (v) => setForm((p) => ({
		...p,
		[k]: v
	}));
	const onSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		if (!form.parent_name.trim() || form.parent_name.trim().length < 2) {
			setError("Please enter the parent's full name.");
			return;
		}
		if (!form.student_name.trim() || form.student_name.trim().length < 2) {
			setError("Please enter the student's name.");
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
			setError("Please enter a valid email address.");
			return;
		}
		if (form.whatsapp && !isValidPhoneNumber(form.whatsapp)) {
			setError("Please enter a valid WhatsApp number for the selected country.");
			return;
		}
		setBusy(true);
		try {
			await bookingFn({ data: {
				student_name: form.student_name || form.parent_name,
				parent_name: form.parent_name || null,
				email: form.email,
				whatsapp: form.whatsapp || null,
				country: form.country || null,
				curriculum: form.curriculum || null,
				subject: form.subject || null,
				grade_level: form.grade_level || null,
				notes: form.notes || null,
				tutor_slug: null,
				phone: null,
				preferred_time: null
			} });
			await messageFn({ data: {
				name: form.parent_name || form.student_name,
				email: form.email,
				phone: form.whatsapp || null,
				subject: `Free trial enquiry · ${form.subject || form.curriculum || "General"}`,
				message: form.notes || `Trial enquiry for ${form.student_name} (${form.grade_level || "—"}, ${form.curriculum || "—"}).`
			} });
			setDone(true);
			setForm(emptyBooking);
		} catch (err) {
			setError(err?.message ?? "Something went wrong. Please try again.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Contact",
		title: "Speak to our academic team.",
		description: "Tell us about your child's goals and we'll match the perfect tutor within 48 hours."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page grid lg:grid-cols-[1.1fr_1fr] gap-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-surface p-8 lg:p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "heading-md",
						children: "Book a free trial"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "No payment information required."
					}),
					done && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 p-4 rounded-xl bg-emerald-50 text-emerald-800 text-sm font-medium flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Thanks — your enquiry has been received. Our team will reply within one business day." })]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-medium",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "mt-8 grid sm:grid-cols-2 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Parent name",
								value: form.parent_name,
								onChange: upd("parent_name"),
								placeholder: "Your full name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Student name",
								value: form.student_name,
								onChange: upd("student_name"),
								placeholder: "Student's full name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Country",
								value: form.country,
								onChange: upd("country"),
								placeholder: "e.g. United Kingdom"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Email",
								type: "email",
								value: form.email,
								onChange: upd("email"),
								placeholder: "you@example.com"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneField, {
								label: "WhatsApp number",
								value: form.whatsapp,
								onChange: upd("whatsapp"),
								placeholder: "WhatsApp number"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Student's grade / year",
								value: form.grade_level,
								onChange: upd("grade_level"),
								placeholder: "e.g. Year 11"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Curriculum",
								value: form.curriculum,
								onChange: upd("curriculum"),
								placeholder: "e.g. IGCSE, A Level, IB"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Subjects of interest",
								value: form.subject,
								onChange: upd("subject"),
								placeholder: "e.g. Physics, Mathematics",
								className: "sm:col-span-2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium text-ink",
									children: "Anything else we should know?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									rows: 4,
									value: form.notes,
									onChange: (e) => upd("notes")(e.target.value),
									className: "mt-2 w-full px-4 py-3 rounded-2xl border border-border bg-surface-2 text-sm ring-focus focus:bg-surface focus:border-primary",
									placeholder: "Goals, preferred timing, exam dates…"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: busy,
								className: "btn-primary sm:col-span-2 mt-2 disabled:opacity-60",
								children: [
									busy ? "Sending…" : "Send Enquiry",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
								]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
						icon: MessageCircle,
						title: "WhatsApp",
						body: "+92 300 1234567",
						cta: "Chat now"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
						icon: Mail,
						title: "Email",
						body: "hello@thebestscienceacademy.com",
						cta: "Send mail"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
						icon: Phone,
						title: "Phone",
						body: "+92 21 1234 5678",
						cta: "Call us"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
						icon: MapPin,
						title: "Office",
						body: "Karachi, Pakistan",
						cta: "View on map"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-surface p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-ink",
								children: "Working hours"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 text-sm grid grid-cols-2 gap-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Mon – Fri"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-right text-ink",
									children: "09:00 – 22:00 PKT"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Saturday"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-right text-ink",
									children: "10:00 – 18:00 PKT"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Sunday"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-right text-ink",
									children: "Closed"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "card-surface overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-[16/10] bg-primary-soft flex items-center justify-center text-muted-foreground text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-6 w-6 text-primary" }), "Map placeholder"]
							})
						})
					})
				]
			})]
		})
	})] });
}
function Field({ label, type = "text", placeholder, value, onChange, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "text-sm font-medium text-ink",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			placeholder,
			value,
			onChange: (e) => onChange(e.target.value),
			className: "mt-2 w-full h-12 px-4 rounded-full border border-border bg-surface-2 text-sm ring-focus focus:bg-surface focus:border-primary"
		})]
	});
}
function InfoCard({ icon: Icon, title, body, cta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface card-surface-hover p-6 flex items-start gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-ink",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: body
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "text-sm font-semibold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all",
				children: [
					cta,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })
				]
			})
		]
	});
}
//#endregion
export { ContactPage as component };
