import { r as __toESM } from "../_runtime.mjs";
import { c as require_react, i as useQuery, s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as MousePointerClick, C as Scale, Ct as Brain, Et as BadgeCheck, I as Map, K as Languages, N as MessageSquare, Ot as Atom, Q as GraduationCap, St as Briefcase, U as Leaf, X as HeartPulse, Y as Infinity$1, _ as Sparkles, a as Users, bt as CalendarClock, d as Trophy, g as Star, h as Target, ht as CircleCheck, i as Video, j as Moon, kt as ArrowRight, l as UserCheck, mt as CirclePlay, ot as Earth, q as Landmark, r as Wallet, rt as FileChartColumnIncreasing, tt as FlaskConical, ut as CodeXml, v as Sigma, vt as ChartLine, wt as BookOpen, xt as Calculator, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as SiteLayout } from "./layout-DEKgj2GL.mjs";
import { C as listPublicTutors, D as useServerFn } from "./tutor-api.functions-BgQ4s39o.mjs";
import { a as subjects, i as stats, o as testimonials, r as howItWorks, s as whyChoose } from "./site-data-DOc52N9b.mjs";
import { t as TutorCard } from "./tutor-card-CvLY7nb4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-hObuvzjM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Counter({ to, suffix = "", duration = 1600 }) {
	const [val, setVal] = (0, import_react.useState)(0);
	const ref = (0, import_react.useRef)(null);
	const started = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!ref.current) return;
		const obs = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting && !started.current) {
					started.current = true;
					const start = performance.now();
					const step = (t) => {
						const p = Math.min(1, (t - start) / duration);
						const eased = 1 - Math.pow(1 - p, 3);
						setVal(Math.round(to * eased));
						if (p < 1) requestAnimationFrame(step);
					};
					requestAnimationFrame(step);
				}
			});
		}, { threshold: .3 });
		obs.observe(ref.current);
		return () => obs.disconnect();
	}, [to, duration]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref,
		children: [val.toLocaleString(), suffix]
	});
}
var hero_tutor_default = "/assets/hero-tutor-BV9Hb4ag.jpg";
var igcse_png_asset_default = {
	version: 1,
	asset_id: "0193870c-718e-4f14-9c3e-d6ff5aec95f4",
	project_id: "5145809a-d258-43b7-85b4-066d1b7b5045",
	url: "/__l5e/assets-v1/0193870c-718e-4f14-9c3e-d6ff5aec95f4/igcse.png",
	r2_key: "a/v1/5145809a-d258-43b7-85b4-066d1b7b5045/0193870c-718e-4f14-9c3e-d6ff5aec95f4/igcse.png",
	original_filename: "igcse.png",
	size: 74154,
	content_type: "image/png",
	created_at: "2026-06-27T09:54:22Z"
};
var oalevels_png_asset_default = {
	version: 1,
	asset_id: "9208a21a-c095-45cb-8ed4-7f8cd9a073d6",
	project_id: "5145809a-d258-43b7-85b4-066d1b7b5045",
	url: "/__l5e/assets-v1/9208a21a-c095-45cb-8ed4-7f8cd9a073d6/oalevels.png",
	r2_key: "a/v1/5145809a-d258-43b7-85b4-066d1b7b5045/9208a21a-c095-45cb-8ed4-7f8cd9a073d6/oalevels.png",
	original_filename: "oalevels.png",
	size: 28108,
	content_type: "image/png",
	created_at: "2026-06-27T10:09:14Z"
};
var aqa_png_asset_default = {
	version: 1,
	asset_id: "4f07c87f-cfc5-4c0a-8e2b-9641241b5036",
	project_id: "5145809a-d258-43b7-85b4-066d1b7b5045",
	url: "/__l5e/assets-v1/4f07c87f-cfc5-4c0a-8e2b-9641241b5036/aqa.png",
	r2_key: "a/v1/5145809a-d258-43b7-85b4-066d1b7b5045/4f07c87f-cfc5-4c0a-8e2b-9641241b5036/aqa.png",
	original_filename: "aqa.png",
	size: 106064,
	content_type: "image/png",
	created_at: "2026-06-27T08:12:22Z"
};
var edexcel_png_asset_default = {
	version: 1,
	asset_id: "fa49b065-bb87-4941-83dc-948f63915246",
	project_id: "5145809a-d258-43b7-85b4-066d1b7b5045",
	url: "/__l5e/assets-v1/fa49b065-bb87-4941-83dc-948f63915246/edexcel.png",
	r2_key: "a/v1/5145809a-d258-43b7-85b4-066d1b7b5045/fa49b065-bb87-4941-83dc-948f63915246/edexcel.png",
	original_filename: "edexcel.png",
	size: 225973,
	content_type: "image/png",
	created_at: "2026-06-27T08:12:22Z"
};
var lrn_png_asset_default = {
	version: 1,
	asset_id: "9aef79fb-9185-4ff2-bd50-6cc606bea23e",
	project_id: "5145809a-d258-43b7-85b4-066d1b7b5045",
	url: "/__l5e/assets-v1/9aef79fb-9185-4ff2-bd50-6cc606bea23e/lrn.png",
	r2_key: "a/v1/5145809a-d258-43b7-85b4-066d1b7b5045/9aef79fb-9185-4ff2-bd50-6cc606bea23e/lrn.png",
	original_filename: "lrn.png",
	size: 10895,
	content_type: "image/png",
	created_at: "2026-06-27T08:12:22Z"
};
var ib_png_asset_default = {
	version: 1,
	asset_id: "4eccc3b8-d83e-4877-8388-14a7444db756",
	project_id: "5145809a-d258-43b7-85b4-066d1b7b5045",
	url: "/__l5e/assets-v1/4eccc3b8-d83e-4877-8388-14a7444db756/ib.png",
	r2_key: "a/v1/5145809a-d258-43b7-85b4-066d1b7b5045/4eccc3b8-d83e-4877-8388-14a7444db756/ib.png",
	original_filename: "ib.png",
	size: 170017,
	content_type: "image/png",
	created_at: "2026-06-27T08:12:22Z"
};
var fbise_png_asset_default = {
	version: 1,
	asset_id: "4a107d00-693b-4c13-a8f4-500d4877b0a1",
	project_id: "5145809a-d258-43b7-85b4-066d1b7b5045",
	url: "/__l5e/assets-v1/4a107d00-693b-4c13-a8f4-500d4877b0a1/fbise.png",
	r2_key: "a/v1/5145809a-d258-43b7-85b4-066d1b7b5045/4a107d00-693b-4c13-a8f4-500d4877b0a1/fbise.png",
	original_filename: "fbise.png",
	size: 121127,
	content_type: "image/png",
	created_at: "2026-06-27T08:12:22Z"
};
var curriculumLogoMap = {
	IGCSE: igcse_png_asset_default,
	OALEVEL: oalevels_png_asset_default,
	OLEVEL: oalevels_png_asset_default,
	ALEVEL: oalevels_png_asset_default,
	IB: ib_png_asset_default,
	AQA: aqa_png_asset_default,
	EDEXCEL: edexcel_png_asset_default,
	LRN: lrn_png_asset_default,
	FBISE: fbise_png_asset_default
};
var homeCurriculums = [
	{
		code: "IGCSE",
		name: "IGCSE",
		desc: "Cambridge International General Certificate, Grades 9–10.",
		color: "primary"
	},
	{
		code: "OALEVEL",
		name: "O/A Level",
		desc: "Cambridge O Level and A Level preparation for international students worldwide.",
		color: "primary"
	},
	{
		code: "IB",
		name: "IB",
		desc: "International Baccalaureate MYP & DP across HL and SL.",
		color: "primary"
	},
	{
		code: "AQA",
		name: "AQA",
		desc: "UK-based AQA GCSE & A Level specifications.",
		color: "primary"
	},
	{
		code: "EDEXCEL",
		name: "Edexcel",
		desc: "Pearson Edexcel International GCSE & A Levels.",
		color: "primary"
	},
	{
		code: "LRN",
		name: "LRN",
		desc: "Learning Resource Network international qualifications.",
		color: "primary"
	},
	{
		code: "FBISE",
		name: "FBISE",
		desc: "Federal Board curriculum for overseas Pakistani students.",
		color: "primary"
	}
];
var subjectIcons = {
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
var statIcons = [
	Users,
	GraduationCap,
	BookOpen,
	Earth,
	Trophy
];
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Curriculums, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Subjects, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyChoose, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedTutors, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCTA, {})
	] });
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative -mt-32 gradient-hero",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden pt-40 pb-32 md:pb-36 lg:pb-40",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 gradient-hero" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-grid-soft opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "blob animate-blob h-[520px] w-[520px] bg-primary/35 -top-40 -left-40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "blob animate-blob h-[480px] w-[480px] bg-gold/35 -top-20 -right-32",
					style: { animationDelay: "2.5s" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "blob animate-blob h-[420px] w-[420px] bg-secondary/25 bottom-[-160px] left-1/3",
					style: { animationDelay: "4s" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					className: "absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none",
					viewBox: "0 0 1200 600",
					preserveAspectRatio: "xMidYMid slice",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
						id: "dots",
						x: "0",
						y: "0",
						width: "14",
						height: "14",
						patternUnits: "userSpaceOnUse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "2",
							cy: "2",
							r: "1.2",
							fill: "currentColor"
						})
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: "600",
						cy: "300",
						rx: "560",
						ry: "240",
						fill: "url(#dots)",
						className: "text-primary"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page relative grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-fade-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "chip-gold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), "Trusted by families in 32+ countries"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "heading-xl mt-5",
								style: { fontSize: "clamp(2.25rem, 5vw, 4.25rem)" },
								children: [
									"World-class online tutors for",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "gradient-text",
										children: "international students"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: "."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed",
								children: "Premium one-to-one tuition from outstanding educators — purpose-built for the UK, UAE, Australia, Europe and Asia. IGCSE, A Level, IB, AQA & Edexcel."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/contact",
									className: "btn-primary",
									children: ["Book Free Trial ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/tutors",
									className: "btn-ghost",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-4 w-4" }), " Meet our tutors"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4 text-primary" }), " Vetted MSc & PhD educators"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-primary" }), " 100% safeguarding compliant"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { className: "h-4 w-4 text-primary" }), " All time zones"]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative animate-fade-up lg:pl-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-24 -left-16 h-72 w-72 rounded-full bg-gold/30 blur-[80px] animate-blob" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-primary/25 blur-[90px] animate-blob",
								style: { animationDelay: "3s" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/3 -right-10 h-44 w-44 rounded-full bg-secondary/20 blur-3xl" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-[5/6] max-w-[480px] mx-auto",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative h-full w-full rounded-[2.25rem] p-[2px] bg-gradient-to-br from-primary via-gold to-secondary shadow-float",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative h-full w-full rounded-[2.1rem] overflow-hidden bg-surface",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: hero_tutor_default,
													alt: "Online tutor teaching an international student",
													width: 1280,
													height: 1536,
													className: "h-full w-full object-cover"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-primary/55 via-primary/5 to-transparent" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gold/15 mix-blend-overlay" })
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hidden md:flex absolute -top-6 left-4 card-glass px-4 py-3.5 items-center gap-3 animate-float-slow shadow-float",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex -space-x-2.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "h-9 w-9 rounded-full bg-white border-2 border-white shadow-soft flex items-center justify-center text-lg",
													children: "🇬🇧"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "h-9 w-9 rounded-full bg-white border-2 border-white shadow-soft flex items-center justify-center text-lg",
													children: "🇦🇪"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "h-9 w-9 rounded-full bg-white border-2 border-white shadow-soft flex items-center justify-center text-lg",
													children: "🇦🇺"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "h-9 w-9 rounded-full bg-white border-2 border-white shadow-soft flex items-center justify-center text-lg",
													children: "🇪🇺"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pr-1 leading-tight",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[0.75rem] font-extrabold text-ink",
												children: "32+ countries"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[0.6rem] text-muted-foreground font-medium",
												children: "UK · UAE · AU · EU"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hidden lg:flex absolute lg:right-4 xl:-right-12 top-16 card-glass px-4 py-3.5 flex-col gap-2 animate-float-slow shadow-float w-[210px]",
										style: { animationDelay: "1.5s" },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground",
													children: "Avg uplift"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 text-[0.6rem] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLine, { className: "h-3 w-3" }), " 12m"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-[var(--font-display)] text-[1.75rem] font-extrabold gradient-text leading-none",
												children: "+2 grades"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex items-end gap-1.5 h-8",
												children: [
													35,
													50,
													42,
													65,
													58,
													80,
													95
												].map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "flex-1 rounded-t bg-gradient-to-t from-primary/35 to-gold/80",
													style: { height: `${h}%` }
												}, i))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[0.6rem] text-muted-foreground font-medium",
												children: "Across 1,200+ students"
											})
										]
									})
								]
							})
						]
					})]
				})
			]
		})
	});
}
function TrustBar() {
	const boards = [
		{
			src: igcse_png_asset_default.url,
			alt: "Cambridge IGCSE",
			className: "h-16 md:h-20"
		},
		{
			src: oalevels_png_asset_default.url,
			alt: "O & A Level Resources",
			className: "h-14 md:h-16"
		},
		{
			src: aqa_png_asset_default.url,
			alt: "AQA",
			className: "h-12 md:h-14"
		},
		{
			src: edexcel_png_asset_default.url,
			alt: "Edexcel",
			className: "h-12 md:h-14"
		},
		{
			src: lrn_png_asset_default.url,
			alt: "Learning Resource Network",
			className: "h-12 md:h-14"
		},
		{
			src: ib_png_asset_default.url,
			alt: "International Baccalaureate",
			className: "h-16 md:h-20"
		},
		{
			src: fbise_png_asset_default.url,
			alt: "Federal Board of Intermediate and Secondary Education",
			className: "h-16 md:h-20"
		}
	];
	const loop = [...boards, ...boards];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-page pt-16 md:pt-20 pb-12 md:pb-14",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center text-center max-w-3xl mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-[var(--font-display)] text-[1.75rem] md:text-[2.25rem] font-bold tracking-[-0.025em] text-ink leading-[1.15]",
						children: ["Aligned with ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "leading international examination boards"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground text-[0.95rem] md:text-base max-w-xl",
						children: "Our specifications mirror Cambridge, Edexcel, AQA, IB and more — so every lesson maps directly to your child's exam."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-gradient-to-r from-transparent to-primary/40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-gradient-to-l from-transparent to-primary/40" })
						]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative pb-14 md:pb-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-y-0 left-0 w-32 md:w-48 z-10 pointer-events-none bg-gradient-to-r from-background via-background/90 to-transparent",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-y-0 right-0 w-32 md:w-48 z-10 pointer-events-none bg-gradient-to-l from-background via-background/90 to-transparent",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex w-max animate-marquee",
						children: loop.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-center h-24 md:h-28 w-[180px] md:w-[220px] shrink-0 px-4 md:px-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: b.src,
								alt: b.alt,
								className: `${b.className} w-auto object-contain transition-none`,
								loading: "lazy"
							})
						}, `${b.alt}-${i}`))
					})
				})
			]
		})]
	});
}
function Stats() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative z-20 -mt-[60px] sm:-mt-[80px] md:-mt-[90px] lg:-mt-[95px]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-page relative",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 lg:gap-6",
				children: stats.map((s, i) => {
					const Icon = statIcons[i] ?? Star;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group relative rounded-[1.25rem] sm:rounded-[1.75rem] bg-white border border-border/70 shadow-[0_18px_40px_-22px_oklch(0.25_0.12_280/0.25)] hover:-translate-y-1 hover:shadow-[0_22px_44px_-22px_oklch(0.25_0.12_280/0.35)] hover:border-primary/25 transition-all duration-500 ease-out animate-fade-up px-3.5 pt-4 pb-3.5 sm:px-5 sm:pt-6 sm:pb-5 flex flex-col items-start",
						style: { animationDelay: `${i * 80}ms` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex items-center justify-between w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-8 w-8 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-primary-soft border border-primary/15 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-transparent transition-all duration-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "h-[14px] w-[14px] sm:h-[18px] sm:w-[18px]",
										strokeWidth: 1.75
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[0.55rem] sm:text-[0.6rem] font-bold tracking-[0.18em] text-muted-foreground/70",
									children: ["0", i + 1]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 sm:mt-5 font-[var(--font-display)] text-[1.35rem] sm:text-[2rem] md:text-[2.4rem] font-extrabold text-primary tracking-tight leading-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
									to: s.value,
									suffix: s.suffix
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1.5 sm:mt-2 text-[0.6rem] sm:text-[0.7rem] font-bold text-muted-foreground uppercase tracking-[0.14em] sm:tracking-[0.16em]",
								children: s.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-3 sm:mt-4 h-[2px] w-8 sm:w-10 rounded-full bg-primary/30 group-hover:w-16 sm:group-hover:w-20 group-hover:bg-primary transition-all duration-500" })
						]
					}, s.label);
				})
			})
		})
	});
}
function Curriculums() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section relative overflow-hidden bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "Curriculums"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "heading-lg mt-4",
						children: [
							"Every major international curriculum, ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "expertly taught"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-muted-foreground text-lg",
						children: "From Cambridge IGCSE to IB Diploma and Edexcel A Level — our tutors know each specification inside out."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7",
				children: homeCurriculums.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/programs",
					className: "group relative block ring-focus rounded-[1.75rem] bg-white border border-border/70 shadow-[0_20px_45px_-28px_oklch(0.25_0.12_280/0.3)] hover:shadow-[0_28px_55px_-25px_oklch(0.25_0.12_280/0.4)] hover:-translate-y-1.5 hover:border-primary/25 transition-all duration-500 ease-out animate-fade-up h-full p-7 flex flex-col",
					style: { animationDelay: `${i * 70}ms` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: curriculumLogoMap[c.code]?.url,
								alt: `${c.name} logo`,
								className: "h-16 w-auto max-w-[120px] object-contain"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[0.65rem] font-bold tracking-[0.18em] text-muted-foreground/70",
								children: ["0", i + 1]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "relative mt-7 text-[1.2rem] font-bold text-ink leading-tight",
							children: c.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "relative mt-3 text-[0.9rem] text-muted-foreground leading-relaxed flex-1",
							children: c.desc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-7 pt-5 border-t border-border/60 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all",
								children: ["Learn more ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-8 w-8 rounded-full border border-primary/20 flex items-center justify-center text-primary/60 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 -rotate-45 group-hover:rotate-0 transition-transform duration-400" })
							})]
						})
					]
				}, c.code))
			})]
		})
	});
}
function Subjects() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section relative overflow-hidden bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-end md:justify-between gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Subjects"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "heading-lg mt-4",
							children: [
								"Specialist tutors across ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "20+ subjects"
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-muted-foreground text-lg",
							children: "From sciences and mathematics to humanities and commerce — depth in every discipline."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/subjects",
					className: "btn-ghost self-start md:self-end md:mt-6",
					children: ["Browse all subjects ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 sm:mt-14 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4",
				children: subjects.map((s) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/subjects",
						className: "card-surface card-surface-hover p-2.5 sm:p-5 h-[72px] sm:h-auto flex items-center gap-2.5 sm:gap-4 group ring-focus",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-8 w-8 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-primary-soft text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-soft shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(subjectIcons[s.icon] ?? Atom, { className: "h-3.5 w-3.5 sm:h-5 sm:w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-ink text-xs sm:text-[0.95rem] leading-tight",
							children: s.name
						})]
					}, s.name);
				})
			})]
		})
	});
}
var whyIcons = [
	UserCheck,
	GraduationCap,
	CalendarClock,
	Wallet,
	Video,
	FileChartColumnIncreasing,
	Target,
	MousePointerClick
];
function WhyChoose() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section relative overflow-hidden bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-page relative",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-[0.95fr_1.25fr] gap-14 lg:gap-20 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:sticky lg:top-32 animate-fade-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Why Choose Us"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "heading-lg mt-4",
							children: [
								"A premium learning experience, ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "engineered for results"
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-lg text-muted-foreground leading-relaxed",
							children: "Every element of our academy — from the tutors we hire to the way each lesson is structured — is built to deliver measurable outcomes for international students."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-9 rounded-[1.65rem] bg-white border border-border/70 p-6 grid grid-cols-2 gap-5 shadow-soft",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-[var(--font-display)] text-3xl font-extrabold text-primary leading-none",
									children: "98%"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-muted-foreground",
									children: "Success rate"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-[var(--font-display)] text-3xl font-extrabold text-primary leading-none",
									children: "4.9★"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-muted-foreground",
									children: "Parent rating"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "col-span-2 pt-4 border-t border-border/70 flex items-center gap-3 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4 text-primary shrink-0" }), "Outcomes verified across 1,200+ student cohorts"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/about",
							className: "btn-ghost mt-8 inline-flex",
							children: ["Our methodology ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "relative space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-primary/25 to-transparent"
					}), whyChoose.map((w, i) => {
						const Icon = whyIcons[i % whyIcons.length];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "group relative animate-fade-up",
							style: { animationDelay: `${i * 70}ms` },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex gap-5 rounded-[1.5rem] p-5 md:p-6 bg-white border border-border/70 hover:border-primary/25 hover:-translate-y-0.5 transition-all duration-400 shadow-[0_8px_30px_-20px_oklch(0.25_0.12_280/0.25)] hover:shadow-[0_18px_40px_-22px_oklch(0.25_0.12_280/0.35)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative h-14 w-14 rounded-2xl bg-primary-soft border border-primary/15 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-transparent transition-all duration-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											className: "h-5 w-5",
											strokeWidth: 1.75
										})
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-bold text-ink text-base md:text-[1.05rem]",
											children: w.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[0.65rem] font-bold tracking-[0.18em] text-muted-foreground/70",
											children: ["0", i + 1]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 text-sm text-muted-foreground leading-relaxed",
										children: w.body
									})]
								})]
							})
						}, w.title);
					})]
				})]
			})
		})
	});
}
function HowItWorks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section relative overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center max-w-2xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "How It Works"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "heading-lg mt-4",
					children: [
						"From first call to top grades — ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "five clear steps"
						}),
						"."
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 grid md:grid-cols-5 gap-6 relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden md:block absolute top-9 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" }), howItWorks.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative text-center group",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mx-auto h-[72px] w-[72px] flex items-center justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full bg-primary/15 blur-md opacity-60 group-hover:opacity-90 transition-opacity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative h-16 w-16 rounded-full bg-surface border border-primary/30 text-primary flex items-center justify-center font-[var(--font-display)] font-extrabold shadow-glow",
								children: s.step
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 font-bold text-ink text-lg",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground leading-relaxed",
							children: s.body
						})
					]
				}, s.step))]
			})]
		})
	});
}
function FeaturedTutors() {
	const listFn = useServerFn(listPublicTutors);
	const { data } = useQuery({
		queryKey: ["public-tutors"],
		queryFn: () => listFn()
	});
	const featured = (data ?? []).slice(0, 4);
	if (featured.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-end md:justify-between gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Meet our faculty"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "heading-lg mt-4",
							children: [
								"A faculty of ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "brilliant educators"
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-lg text-muted-foreground",
							children: "Hand-picked teachers with international experience, strong qualifications and outstanding student reviews."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/tutors",
					className: "btn-ghost self-start md:self-end md:mt-6",
					children: ["View all tutors ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",
				children: featured.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TutorCard, { tutor: {
					slug: t.slug,
					name: t.name,
					title: t.title,
					photo: t.photo_url ?? "",
					qualification: t.qualification ?? "",
					experience: t.experience ?? "",
					subjects: t.subjects ?? [],
					curriculums: t.curriculums ?? [],
					languages: t.languages ?? [],
					rating: Number(t.rating ?? 5),
					availability: t.availability ?? "Available"
				} }, t.slug))
			})]
		})
	});
}
var testimonialMeta = [
	{
		initials: "SM",
		flag: "🇬🇧",
		country: "United Kingdom",
		accent: "from-primary/20 to-secondary/20"
	},
	{
		initials: "AJ",
		flag: "🇦🇪",
		country: "United Arab Emirates",
		accent: "from-gold/25 to-primary/15"
	},
	{
		initials: "LP",
		flag: "🇦🇺",
		country: "Australia",
		accent: "from-secondary/20 to-gold/20"
	}
];
function Testimonials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section relative overflow-hidden bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center max-w-2xl mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow justify-center",
						children: "Loved by parents & students"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "heading-lg mt-4",
						children: ["Real results. Real families. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "Worldwide."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-muted-foreground text-base md:text-lg",
						children: "A trusted partner for families across four continents — here's what they say."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16 grid md:grid-cols-3 gap-6 lg:gap-7",
				children: testimonials.map((t, i) => {
					const meta = testimonialMeta[i] ?? testimonialMeta[0];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "group relative rounded-[1.5rem] bg-white/80 backdrop-blur-md border border-white/70 p-7 md:p-8 shadow-[0_12px_32px_-20px_oklch(0.25_0.12_280/0.35)] hover:shadow-[0_24px_50px_-22px_oklch(0.33_0.18_277/0.4)] hover:-translate-y-1.5 hover:bg-white transition-all duration-500 ease-out animate-fade-up flex flex-col",
						style: { animationDelay: `${i * 90}ms` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "absolute top-5 right-6 text-[5rem] leading-none font-[var(--font-display)] text-primary/10 select-none group-hover:text-primary/15 transition-colors",
								children: "\""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative flex items-center gap-0.5 text-gold",
								children: Array.from({ length: 5 }).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-current" }, k))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
								className: "relative mt-5 text-[1rem] md:text-[1.02rem] leading-relaxed text-ink font-medium flex-1",
								children: [
									"\"",
									t.quote,
									"\""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
								className: "relative mt-7 pt-6 border-t border-border/70 flex items-center gap-3.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `relative h-12 w-12 rounded-full p-[1.5px] bg-gradient-to-br ${meta.accent}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full w-full rounded-full bg-white flex items-center justify-center font-[var(--font-display)] font-extrabold text-primary text-sm",
										children: meta.initials
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full bg-white border border-white shadow-soft flex items-center justify-center text-[0.7rem]",
										children: meta.flag
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-ink text-sm leading-tight",
										children: t.author
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[0.75rem] text-muted-foreground mt-0.5",
										children: t.role
									})]
								})]
							})
						]
					}, t.author);
				})
			})]
		})
	});
}
function FinalCTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-page",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative overflow-hidden rounded-[2rem] p-[2px] bg-gradient-to-br from-primary via-gold to-secondary shadow-float",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-[1.9rem] bg-gradient-to-br from-[oklch(0.20_0.10_278)] via-[oklch(0.25_0.14_278)] to-[oklch(0.18_0.10_277)] text-white p-10 md:p-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-20 -right-20 h-80 w-80 rounded-full bg-gold/30 blur-3xl animate-blob" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-primary-glow/30 blur-3xl animate-blob",
							style: { animationDelay: "2s" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-grid-soft opacity-10" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "noise" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative grid md:grid-cols-[1.4fr_1fr] gap-10 items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "chip-gold",
									children: "Free 20-minute consultation"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "heading-lg mt-5 text-white",
									style: { color: "white" },
									children: [
										"Give your child a ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "gradient-text-gold",
											children: "global academic advantage"
										}),
										"."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 text-white/80 max-w-xl leading-relaxed text-lg",
									children: "Speak to our academic team today and we'll match your child with the perfect tutor — typically within 48 hours."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-gold" }), " No card required"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-gold" }), " Cancel anytime"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-gold" }), " Money-back guarantee"]
										})
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-3 md:justify-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/contact",
									className: "btn-gold",
									children: ["Book Free Trial ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/programs",
									className: "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm",
									children: "Explore Programs"
								})]
							})]
						})
					]
				})
			})
		})
	});
}
//#endregion
export { HomePage as component };
