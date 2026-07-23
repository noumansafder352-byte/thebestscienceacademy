import { r as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _t as ChevronDown, gt as ChevronUp, ht as CircleCheck, kt as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as SiteLayout } from "./layout-DEKgj2GL.mjs";
import { t as PageHeader } from "./page-header-CAaZDPYW.mjs";
import { n as curriculums, t as curriculumComparison } from "./site-data-DOc52N9b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/programs-BhpRFjHa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ALL_SUBJECTS = [
	"Mathematics",
	"Additional Mathematics",
	"Mathematics Communication",
	"Physics",
	"Chemistry",
	"Biology",
	"English",
	"Urdu",
	"Computer Science",
	"ICT",
	"Economics",
	"Business Studies",
	"Accounting",
	"Law",
	"Sociology",
	"Psychology",
	"Physiology",
	"History",
	"Geography"
];
var overviewFor = {
	IGCSE: {
		overview: "The world's most popular international qualification for 14–16 year olds.",
		subjects: ALL_SUBJECTS,
		who: "Students in Years 10–11 preparing for Cambridge IGCSE exams."
	},
	OLEVEL: {
		overview: "A globally recognised secondary qualification trusted by employers and universities.",
		subjects: ALL_SUBJECTS,
		who: "Students in Grades 9–10 taking Cambridge O Level exams."
	},
	ALEVEL: {
		overview: "Rigorous university-entry preparation with subject depth that admissions teams respect.",
		subjects: ALL_SUBJECTS,
		who: "Students in Years 12–13 aiming for top universities."
	},
	IB: {
		overview: "International Baccalaureate Middle Years and Diploma Programme tutoring at HL and SL.",
		subjects: ALL_SUBJECTS,
		who: "IB MYP and DP students worldwide."
	},
	AQA: {
		overview: "UK-based GCSE and A Level support across all major AQA specifications.",
		subjects: ALL_SUBJECTS,
		who: "Students sitting AQA GCSE or A Level papers."
	},
	EDEXCEL: {
		overview: "Pearson Edexcel International GCSE and A Level coverage with past-paper precision.",
		subjects: ALL_SUBJECTS,
		who: "Edexcel International students worldwide."
	},
	LRN: {
		overview: "Learning Resource Network qualifications taught by specification-trained tutors.",
		subjects: ALL_SUBJECTS,
		who: "LRN registered students."
	},
	FBISE: {
		overview: "Federal Board of Pakistan curriculum for overseas Pakistani families.",
		subjects: ALL_SUBJECTS,
		who: "Overseas Pakistani students sitting FBISE exams."
	}
};
function ProgramsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageHeader, {
			eyebrow: "Programs",
			title: "Every major international curriculum, expertly taught.",
			description: "Choose your exam board and we'll match you with a specialist who knows it inside out.",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/contact",
				className: "btn-primary",
				children: ["Book Free Trial ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/tutors",
				className: "btn-ghost",
				children: "Find Tutors"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-page grid md:grid-cols-2 gap-6",
				children: curriculums.map((c) => {
					const info = overviewFor[c.code];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-surface card-surface-hover p-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-14 w-14 rounded-2xl bg-primary-soft text-primary flex items-center justify-center font-[var(--font-display)] font-bold",
									children: c.code.slice(0, 2)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "heading-md",
									children: c.name
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-muted-foreground leading-relaxed",
								children: info.overview
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectList, { subjects: info.subjects }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-start gap-3 p-4 rounded-xl bg-surface-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-primary mt-0.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-foreground/80",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: "Who it's for:"
										}),
										" ",
										info.who
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/contact",
								className: "btn-primary mt-7 w-full",
								children: ["Book Trial ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					}, c.code);
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section bg-surface border-y border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Compare"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "heading-lg mt-3",
							children: "Curriculum comparison at a glance."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground",
							children: "A quick side-by-side overview of the major exam boards we teach."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 card-surface overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm min-w-[720px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-4 px-5 font-semibold",
									children: "Curriculum"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-4 px-5 font-semibold",
									children: "Age"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-4 px-5 font-semibold",
									children: "Level"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-4 px-5 font-semibold",
									children: "Popular in"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-4 px-5 font-semibold",
									children: "Subjects"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-4 px-5 font-semibold",
									children: "Exam style"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: curriculumComparison.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border last:border-0 hover:bg-surface-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-4 px-5 font-semibold text-ink",
									children: row.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-4 px-5 text-muted-foreground",
									children: row.ages
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-4 px-5 text-muted-foreground",
									children: row.level
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-4 px-5 text-muted-foreground",
									children: row.countries
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-4 px-5 text-muted-foreground",
									children: row.subjects
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-4 px-5 text-muted-foreground",
									children: row.exam
								})
							]
						}, row.name)) })]
					})
				})]
			})
		})
	] });
}
function SubjectList({ subjects }) {
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const INITIAL = 5;
	const canToggle = subjects.length > INITIAL;
	const visible = expanded || !canToggle ? subjects : subjects.slice(0, INITIAL);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: "Subjects"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-1.5 overflow-hidden transition-all duration-300 ease-out",
				children: visible.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "chip animate-fade-up",
					children: s
				}, s))
			}),
			canToggle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setExpanded((v) => !v),
				className: "mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors",
				children: expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["View less ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["View more ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })] })
			})
		]
	});
}
//#endregion
export { ProgramsPage as component };
