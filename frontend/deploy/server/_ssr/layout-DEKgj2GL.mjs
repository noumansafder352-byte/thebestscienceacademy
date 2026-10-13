import { r as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Menu, H as Linkedin, J as Instagram, it as Facebook, kt as ArrowRight, n as X, ot as Earth, t as Youtube } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/layout-DEKgj2GL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Final_logo_png_asset_default = {
	version: 1,
	asset_id: "3f7a0916-8196-4040-a576-49905d4c61c0",
	project_id: "5145809a-d258-43b7-85b4-066d1b7b5045",
	url: "/__l5e/assets-v1/3f7a0916-8196-4040-a576-49905d4c61c0/Final-logo.png",
	r2_key: "a/v1/5145809a-d258-43b7-85b4-066d1b7b5045/3f7a0916-8196-4040-a576-49905d4c61c0/Final-logo.png",
	original_filename: "Final-logo.png",
	size: 6784,
	content_type: "image/png",
	created_at: "2026-07-03T07:20:45Z"
};
var links = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/programs",
		label: "Programs"
	},
	{
		to: "/subjects",
		label: "Subjects"
	},
	{
		to: "/tutors",
		label: "Find Tutors"
	},
	{
		to: "/become-a-tutor",
		label: "Become a Tutor"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteNav() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sticky top-0 z-50 w-full pointer-events-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `pointer-events-auto transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${scrolled ? "pt-2.5 md:pt-3" : "pt-5 md:pt-7"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `container-page transition-all duration-700 ${scrolled ? "max-w-[1180px]" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: `relative flex items-center justify-between rounded-full transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] overflow-hidden bg-surface-2 border border-white/90 shadow-[0_4px_18px_-6px_rgba(0,0,0,0.06),0_20px_50px_-20px_rgba(0,0,0,0.10)] ${scrolled ? "h-[64px] px-2.5 md:px-3" : "h-[76px] px-3 md:px-4"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "relative flex items-center ring-focus rounded-full group px-2 py-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: Final_logo_png_asset_default.url,
									alt: "The Best Science Academy",
									className: `w-auto object-contain transition-all duration-500 ${scrolled ? "h-12 md:h-14" : "h-14 md:h-16"}`
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								className: "hidden lg:flex items-center gap-1",
								children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: l.to,
									className: "group relative px-4 py-2 text-[0.9rem] font-semibold tracking-[0.005em] text-foreground/70 transition-colors duration-300 hover:text-primary",
									activeProps: { className: "!text-primary" },
									activeOptions: { exact: l.to === "/" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative inline-block",
										children: [l.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary via-secondary to-gold transition-all duration-400 ease-out group-hover:w-[60%] group-data-[status=active]:w-[60%]" })]
									})
								}, l.to))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex items-center gap-2 pr-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/contact",
									className: "hidden sm:inline-flex relative items-center gap-2 pl-5 pr-4 py-2.5 rounded-full text-[0.85rem] font-semibold text-white overflow-hidden group transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary-glow bg-[length:220%_100%] bg-[position:0%_50%] group-hover:bg-[position:100%_50%] transition-[background-position] duration-700" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -inset-1 rounded-full bg-gradient-to-r from-primary/60 via-secondary/50 to-gold/60 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-3 -bottom-1 h-3 rounded-full bg-gold/35 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full ring-1 ring-inset ring-white/30" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-2 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/35 to-transparent" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "relative",
											children: "Book Free Trial"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" })
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-white text-foreground shadow-soft",
									onClick: () => setOpen((v) => !v),
									"aria-label": "Toggle menu",
									children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
								})]
							})
						]
					})
				}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:hidden mt-2 rounded-3xl border border-border/60 bg-white shadow-float p-3 flex flex-col gap-1 animate-fade-up",
					children: [links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						onClick: () => setOpen(false),
						className: "px-3 py-3 rounded-2xl text-sm font-medium text-foreground transition-colors hover:text-primary",
						activeProps: { className: "!text-primary" },
						activeOptions: { exact: l.to === "/" },
						children: l.label
					}, l.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/contact",
						onClick: () => setOpen(false),
						className: "btn-primary mt-2 w-full",
						children: ["Book Free Trial ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})]
				})]
			})
		})
	});
}
var footer_logo_png_asset_default = {
	version: 1,
	asset_id: "88eeffb3-420d-4a34-a9e0-6ffc2fb36673",
	project_id: "5145809a-d258-43b7-85b4-066d1b7b5045",
	url: "/__l5e/assets-v1/88eeffb3-420d-4a34-a9e0-6ffc2fb36673/The-Best-Science-Academy-White-Theme.png",
	r2_key: "a/v1/5145809a-d258-43b7-85b4-066d1b7b5045/88eeffb3-420d-4a34-a9e0-6ffc2fb36673/The-Best-Science-Academy-White-Theme.png",
	original_filename: "The-Best-Science-Academy-White-Theme.png",
	size: 4453,
	content_type: "image/png",
	created_at: "2026-07-03T07:44:17Z"
};
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative mt-32 overflow-hidden bg-[oklch(0.14_0.05_277)] text-white/85",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 opacity-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "blob animate-blob h-[420px] w-[420px] bg-primary-glow/40 -top-32 -left-32" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "blob animate-blob h-[360px] w-[360px] bg-gold/20 bottom-0 right-0",
					style: { animationDelay: "3s" }
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "noise" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page relative py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-glass !bg-white/5 !border-white/10 p-6 sm:p-8 md:p-10 mb-16 grid md:grid-cols-[1.3fr_1fr] gap-6 md:gap-8 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 text-[0.65rem] sm:text-xs font-semibold tracking-[0.2em] uppercase text-gold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { className: "h-4 w-4" }), " The Academy Letter"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-3 font-[var(--font-display)] text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight",
						children: "Insights, exam tips and success stories — delivered monthly."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex flex-col sm:flex-row gap-2.5 w-full min-w-0",
						onSubmit: (e) => e.preventDefault(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							required: true,
							placeholder: "your.email@example.com",
							className: "w-full sm:flex-1 min-w-0 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/45 px-4 sm:px-5 py-3 sm:py-3.5 text-sm outline-none focus:border-gold/60 focus:bg-white/15 transition"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "btn-gold !py-3 sm:!py-3.5 !px-5 text-sm justify-center w-full sm:w-auto shrink-0",
							children: ["Subscribe ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-12 lg:grid-cols-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-2 space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-start",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: footer_logo_png_asset_default.url,
										alt: "The Best Science Academy",
										className: "h-12 sm:h-16 md:h-20 w-auto object-contain"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-relaxed text-white/65 max-w-md",
									children: "World-class online tutors for international students. Empowering learners across the UK, UAE, Australia, Europe and Asia with exam-ready expertise from outstanding educators."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-2.5",
									children: [
										Facebook,
										Instagram,
										Linkedin,
										Youtube
									].map((Icon, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "h-11 w-11 rounded-full border border-white/15 inline-flex items-center justify-center hover:bg-gold hover:text-ink hover:border-gold transition-all duration-300 hover:-translate-y-0.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
									}, i))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
							title: "Company",
							links: [
								{
									to: "/about",
									label: "About Us"
								},
								{
									to: "/become-a-tutor",
									label: "Become a Tutor"
								},
								{
									to: "/contact",
									label: "Contact"
								}
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
							title: "Programs",
							links: [
								{
									to: "/programs",
									label: "IGCSE"
								},
								{
									to: "/programs",
									label: "O Level / A Level"
								},
								{
									to: "/programs",
									label: "IB · AQA · Edexcel"
								}
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
							title: "Subjects",
							links: [
								{
									to: "/subjects",
									label: "Sciences"
								},
								{
									to: "/subjects",
									label: "Mathematics"
								},
								{
									to: "/subjects",
									label: "Humanities"
								}
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative border-t border-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page py-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/55",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" The Best Science Academy. All rights reserved."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://nexenstrategy.com/",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "hover:text-gold hover:translate-x-0.5 inline-block transition-all duration-200",
						children: "Design and Developed by Nexen Strategy"
					})]
				})
			})
		]
	});
}
function FooterCol({ title, links }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
		className: "text-white text-sm font-bold mb-5 tracking-[0.18em] uppercase text-gold/90",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-3",
		children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: l.to,
			className: "text-sm text-white/70 hover:text-gold hover:translate-x-1 inline-block transition-all duration-200",
			children: l.label
		}) }, l.label))
	})] });
}
function SiteLayout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { SiteLayout as t };
