import { r as __toESM } from "../_runtime.mjs";
import { c as require_react, n as queryOptions, r as useSuspenseQuery, s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { N as notFound, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Globe, Dt as Award, K as Languages, L as MapPin, N as MessageSquare, Q as GraduationCap, _ as Sparkles, _t as ChevronDown, dt as Clock, g as Star, gt as ChevronUp, ht as CircleCheck, i as Video, kt as ArrowRight, s as User, wt as BookOpen, y as ShieldCheck, yt as Calendar } from "../_libs/lucide-react.mjs";
import { t as SiteLayout } from "./layout-DEKgj2GL.mjs";
import { D as useServerFn, S as getPublicTutorBySlug } from "./tutor-api.functions-BgQ4s39o.mjs";
import { t as Route } from "./tutors._slug-D7aG2YAW.mjs";
import { n as RatingPill, r as SubjectBadge, t as CurriculumBadge } from "./tutor-badges-D_kNNhg8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutors._slug-DgH2CrhU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReadMore({ text, collapsedLines = 8, className = "" }) {
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const [overflowing, setOverflowing] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const check = () => {
			if (expanded) {
				setOverflowing(true);
				return;
			}
			setOverflowing(el.scrollHeight - el.clientHeight > 4);
		};
		check();
		const ro = new ResizeObserver(check);
		ro.observe(el);
		return () => ro.disconnect();
	}, [
		text,
		expanded,
		collapsedLines
	]);
	const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			style: expanded ? void 0 : {
				display: "-webkit-box",
				WebkitLineClamp: collapsedLines,
				WebkitBoxOrient: "vertical",
				overflow: "hidden"
			},
			className: "prose-content text-[15px] leading-[1.85] text-muted-foreground [overflow-wrap:anywhere] [word-break:break-word] hyphens-auto space-y-4",
			children: paragraphs.length > 1 ? paragraphs.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "[overflow-wrap:anywhere]",
				children: p
			}, i)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "[overflow-wrap:anywhere] whitespace-pre-line",
				children: text
			})
		}), (overflowing || expanded) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setExpanded((v) => !v),
			className: "mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors",
			children: expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Read less ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Read more ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })] })
		})]
	});
}
var tutorQuery = (slug, fn) => queryOptions({
	queryKey: ["public-tutor", slug],
	queryFn: () => fn({ data: { slug } })
});
function TutorProfile() {
	const { slug } = Route.useParams();
	const { data: tutor } = useSuspenseQuery(tutorQuery(slug, useServerFn(getPublicTutorBySlug)));
	if (!tutor) throw notFound();
	const t = tutor;
	const languages = t.languages ?? [];
	const subjects = t.subjects ?? [];
	const curriculums = t.curriculums ?? [];
	const gradeLevels = t.grade_levels ?? [];
	const education = Array.isArray(t.education) ? t.education : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-x-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative bg-gradient-to-b from-primary-soft/60 via-surface to-background border-b border-border/70",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page pt-14 pb-14 lg:pt-20 lg:pb-20 grid lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] gap-10 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface overflow-hidden shadow-lift w-full max-w-full min-w-0 mx-auto lg:mx-0",
					style: { maxWidth: "340px" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-square overflow-hidden bg-primary-soft",
						children: t.photo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: t.photo_url,
							alt: t.name,
							className: "w-full h-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full h-full flex items-center justify-center text-primary text-6xl font-bold",
							children: t.name?.[0] ?? "T"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-between flex-wrap gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingPill, {
								rating: Number(t.rating ?? 5),
								reviews: t.reviews ?? 0
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-3 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
									label: "Experience",
									value: t.experience ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
									label: "Pass Rate",
									value: "98%"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
									label: "Re-bookings",
									value: "92%"
								})
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/tutors",
							className: "text-xs uppercase tracking-[0.18em] font-semibold text-primary",
							children: "← All tutors"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "heading-xl mt-3 break-words",
							children: t.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-lg text-primary font-semibold break-words",
							children: t.title
						}),
						t.qualification && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted-foreground break-words",
							children: t.qualification
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-2 text-sm",
							children: [
								t.experience && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "chip",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-3.5 w-3.5" }),
										" ",
										t.experience,
										" experience"
									]
								}),
								(t.city || t.country) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "chip",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }),
										" ",
										[t.city, t.country].filter(Boolean).join(", ")
									]
								}),
								t.timezone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "chip",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }),
										" ",
										t.timezone
									]
								}),
								languages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "chip",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-3.5 w-3.5" }),
										" ",
										languages.join(", ")
									]
								})
							]
						}),
						curriculums.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2",
								children: "Curriculum expertise"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: curriculums.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurriculumBadge, { label: c }, c))
							})]
						}),
						subjects.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2",
								children: "Subjects taught"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectBadge, { label: s }, s))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/contact",
								className: "btn-primary",
								children: ["Book Free Trial ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#about",
								className: "btn-ghost",
								children: "Read full profile"
							})]
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "about",
			className: "section",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page grid lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] gap-8 lg:gap-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-14",
					children: [
						t.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
							eyebrow: "About this tutor",
							icon: BookOpen,
							title: "Biography",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "card-surface p-6 sm:p-8 shadow-sm max-w-[75ch]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadMore, {
									text: t.bio,
									collapsedLines: 8
								})
							})
						}),
						education.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
							eyebrow: "Education",
							icon: GraduationCap,
							title: "Educational qualifications",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid sm:grid-cols-2 gap-4",
								children: education.map((ed, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card-surface p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] uppercase tracking-wider font-semibold text-primary",
											children: ed.qualification
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1.5 font-semibold text-ink",
											children: ed.degree
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 text-sm text-muted-foreground",
											children: ed.institution
										}),
										ed.year && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 text-xs text-muted-foreground inline-flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }),
												" Graduated ",
												ed.year
											]
										})
									]
								}, i))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
							eyebrow: "Expertise",
							icon: Award,
							title: "Subjects & curricula",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid sm:grid-cols-2 gap-4",
								children: [
									subjects.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillGroup, {
										title: "Subjects Taught",
										children: subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectBadge, { label: s }, s))
									}),
									curriculums.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillGroup, {
										title: "Curriculum Expertise",
										children: curriculums.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurriculumBadge, { label: c }, c))
									}),
									gradeLevels.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillGroup, {
										title: "Grade Levels",
										children: gradeLevels.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectBadge, { label: g }, g))
									}),
									languages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillGroup, {
										title: "Languages Spoken",
										children: languages.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectBadge, { label: l }, l))
									})
								]
							})
						}),
						t.methodology && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
							eyebrow: "Approach",
							icon: MessageSquare,
							title: "Teaching methodology",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "card-surface p-6 sm:p-8 shadow-sm max-w-[75ch]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadMore, {
									text: t.methodology,
									collapsedLines: 8
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 grid sm:grid-cols-2 gap-3",
								children: [
									{
										icon: Video,
										tx: "Recorded live classes on smart whiteboard"
									},
									{
										icon: Award,
										tx: "Mark-scheme aligned exam strategy"
									},
									{
										icon: MessageSquare,
										tx: "Between-class WhatsApp support"
									},
									{
										icon: CircleCheck,
										tx: "Monthly written progress report"
									}
								].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card-surface p-4 flex gap-3 items-start min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-9 w-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-ink font-medium leading-relaxed [overflow-wrap:anywhere]",
										children: f.tx
									})]
								}, f.tx))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
							eyebrow: "Verification",
							icon: ShieldCheck,
							title: "Credentials verified by academy",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid sm:grid-cols-3 gap-3 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifyRow, {
										icon: User,
										label: "Identity verified"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifyRow, {
										icon: GraduationCap,
										label: "Qualifications verified"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifyRow, {
										icon: Star,
										label: "Demo class passed"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs text-muted-foreground",
								children: "Tutor CV and contact details are held privately by the academy."
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "lg:sticky lg:top-28 self-start space-y-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-surface p-6 shadow-lift",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Trial session"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 font-[var(--font-display)] text-3xl font-bold text-ink",
								children: "Free"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "A 20-minute introduction with no obligation."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "btn-primary mt-5 w-full",
								children: "Book Free Trial"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "btn-ghost mt-3 w-full",
								children: "Message the academy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 pt-6 border-t border-border space-y-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Response time",
										value: "< 2 hours"
									}),
									t.nationality && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Nationality",
										value: t.nationality
									}),
									(t.city || t.country) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Based in",
										value: [t.city, t.country].filter(Boolean).join(", ")
									}),
									t.timezone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Time zone",
										value: t.timezone
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-surface p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-3.5 w-3.5" }), " International focus"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground leading-relaxed",
								children: "Teaching students worldwide with flexible scheduling across major time zones."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-primary" }), " Contact only through the academy"]
							})
						]
					})]
				})]
			})
		})]
	}) });
}
function Block({ eyebrow, icon: Icon, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "eyebrow inline-flex items-center gap-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }),
				" ",
				eyebrow
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "heading-md mt-3",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children
		})
	] });
}
function PillGroup({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-1.5",
			children
		})]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground shrink-0",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-semibold text-ink text-right truncate",
			children: value
		})]
	});
}
function MiniStat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface-2 border border-border/70 p-2.5 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-[var(--font-display)] font-bold text-ink text-sm",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5",
			children: label
		})]
	});
}
function VerifyRow({ icon: Icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500/20 font-semibold",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }),
			" ",
			label
		]
	});
}
//#endregion
export { TutorProfile as component };
