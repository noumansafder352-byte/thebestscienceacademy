import { r as __toESM } from "../_runtime.mjs";
import { c as require_react, i as useQuery, o as useQueryClient, s as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { At as ArrowLeft, ht as CircleCheck, n as X, u as Upload, w as Save } from "../_libs/lucide-react.mjs";
import { D as useServerFn, b as adminUpdateTutor, c as adminGetTutor } from "./tutor-api.functions-BgQ4s39o.mjs";
import { t as supabase } from "./client-B11Yrd_E.mjs";
import { t as Route } from "./admin.tutors._id.edit-DhHTS00s.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.tutors._id.edit-KcCiDLIw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CURRICULA = [
	"IGCSE",
	"GCSE",
	"O Level",
	"A Level",
	"IB",
	"AP",
	"AQA",
	"Edexcel",
	"LRN",
	"UAE",
	"Saudi Arabia",
	"Qatar",
	"Bahrain",
	"Kuwait",
	"FBISE (Federal Board)",
	"Punjab Board",
	"CBSE",
	"ICSE",
	"Singapore"
];
var GRADES = [
	"Primary",
	"Middle School",
	"High School",
	"College",
	"University",
	"Adults"
];
var AVAIL_OPTIONS = [
	"Available",
	"Fully Booked",
	"Limited Availability"
];
var DAY_OPTIONS = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
	"Sun"
];
var SLOT_OPTIONS = [
	"Morning (9–12 PM)",
	"Afternoon (12–4 PM)",
	"Evening (4–8 PM)",
	"Night (8–11 PM)"
];
function EditTutorPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const getFn = useServerFn(adminGetTutor);
	const updateFn = useServerFn(adminUpdateTutor);
	const { data: tutor, isLoading } = useQuery({
		queryKey: ["admin-tutor", id],
		queryFn: () => getFn({ data: { id } })
	});
	const [form, setForm] = (0, import_react.useState)(null);
	const [subjectsText, setSubjectsText] = (0, import_react.useState)("");
	const [languagesText, setLanguagesText] = (0, import_react.useState)("");
	const [photoFile, setPhotoFile] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (tutor && !form) {
			setForm({ ...tutor });
			setSubjectsText((tutor.subjects ?? []).join(", "));
			setLanguagesText((tutor.languages ?? []).join(", "));
		}
	}, [tutor, form]);
	const update = useMutation({
		mutationFn: (patch) => updateFn({ data: {
			id,
			patch
		} }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["admin-tutors"] });
			qc.invalidateQueries({ queryKey: ["admin-tutor", id] });
			qc.invalidateQueries({ queryKey: ["public-tutors"] });
			qc.invalidateQueries({ queryKey: ["public-tutor", tutor?.slug] });
		}
	});
	if (isLoading || !form) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-sm text-muted-foreground",
		children: "Loading tutor…"
	});
	if (!tutor) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Tutor not found."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/admin/tutors",
			className: "btn-ghost mt-4",
			children: "Back"
		})]
	});
	const set = (k, v) => setForm((p) => ({
		...p,
		[k]: v
	}));
	const toggleArr = (k, v) => setForm((p) => {
		const arr = p[k] ?? [];
		return {
			...p,
			[k]: arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]
		};
	});
	const onSave = async () => {
		setError(null);
		setSaving(true);
		setSaved(false);
		try {
			let photoPath = form.photo_url;
			if (photoFile) {
				if (photoFile.size > 5 * 1024 * 1024) throw new Error("Photo must be under 5MB.");
				if (!/^image\/(jpeg|jpg|png|webp)$/.test(photoFile.type)) throw new Error("Photo must be JPG, PNG, or WebP.");
				const path = `tutors/${id}-${Date.now()}-${photoFile.name.replace(/[^a-zA-Z0-9._-]+/g, "-")}`;
				const up = await supabase.storage.from("tutor-photos").upload(path, photoFile, { upsert: false });
				if (up.error) throw up.error;
				photoPath = path;
			}
			const patch = {
				name: form.name,
				title: form.title,
				qualification: form.qualification,
				experience: form.experience,
				bio: form.bio,
				methodology: form.methodology,
				gender: form.gender,
				nationality: form.nationality,
				country: form.country,
				city: form.city,
				timezone: form.timezone,
				availability: form.availability,
				subjects: subjectsText.split(",").map((s) => s.trim()).filter(Boolean),
				curriculums: form.curriculums ?? [],
				grade_levels: form.grade_levels ?? [],
				languages: languagesText.split(",").map((s) => s.trim()).filter(Boolean),
				education: Array.isArray(form.education) ? form.education.filter((e) => e && (e.degree || e.institution || e.qualification || e.year)) : [],
				schedule: Array.isArray(form.schedule) ? form.schedule.filter((s) => s?.day && Array.isArray(s.slots) && s.slots.length > 0) : [],
				is_active: !!form.is_active,
				is_featured: !!form.is_featured,
				rating: Number.isFinite(Number(form.rating)) ? Math.max(0, Math.min(5, Number(form.rating))) : 5,
				reviews: Number.isFinite(Number(form.reviews)) ? Math.max(0, Math.floor(Number(form.reviews))) : 0,
				photo_url: photoPath
			};
			await update.mutateAsync(patch);
			setSaved(true);
			setPhotoFile(null);
		} catch (e) {
			setError(e?.message ?? "Failed to save changes.");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-4xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/tutors",
							className: "text-xs uppercase tracking-wider font-semibold text-primary inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3" }), " Tutors"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "heading-md mt-2 truncate",
							children: "Edit tutor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Changes appear on the public profile immediately."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "inline-flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: !!form.is_active,
							onChange: (e) => set("is_active", e.target.checked),
							className: "h-4 w-4 rounded border-border"
						}), "Active on public site"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onSave,
						disabled: saving,
						className: "btn-primary disabled:opacity-60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }),
							" ",
							saving ? "Saving…" : "Save changes"
						]
					})]
				})]
			}),
			saved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 rounded-xl bg-emerald-50 text-emerald-800 text-sm font-medium flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), " Changes saved successfully."]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-medium flex items-start gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4 mt-0.5 shrink-0" }),
					" ",
					error
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Profile photo",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 flex-wrap",
					children: [
						tutor.photo_url_signed && !photoFile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: tutor.photo_url_signed,
							alt: tutor.name,
							className: "h-20 w-20 rounded-xl object-cover"
						}),
						photoFile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-20 w-20 rounded-xl bg-primary-soft flex items-center justify-center text-xs text-primary font-semibold text-center px-2 break-all",
							children: photoFile.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "btn-ghost cursor-pointer !py-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }),
								" Replace photo",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: "image/jpeg,image/png,image/webp",
									className: "hidden",
									onChange: (e) => setPhotoFile(e.target.files?.[0] ?? null)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "JPG, PNG or WebP · Max 5MB"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Personal information",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						label: "Full name",
						value: form.name ?? "",
						onChange: (v) => set("name", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						label: "Professional title",
						value: form.title ?? "",
						onChange: (v) => set("title", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						label: "Gender",
						value: form.gender ?? "",
						onChange: (v) => set("gender", v),
						options: ["Male", "Female"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						label: "Nationality",
						value: form.nationality ?? "",
						onChange: (v) => set("nationality", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						label: "Country",
						value: form.country ?? "",
						onChange: (v) => set("country", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						label: "City",
						value: form.city ?? "",
						onChange: (v) => set("city", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						label: "Timezone",
						value: form.timezone ?? "",
						onChange: (v) => set("timezone", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						label: "Availability",
						value: form.availability ?? "Available",
						onChange: (v) => set("availability", v),
						options: AVAIL_OPTIONS
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Professional information",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						label: "Qualification",
						value: form.qualification ?? "",
						onChange: (v) => set("qualification", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						label: "Teaching experience",
						value: form.experience ?? "",
						onChange: (v) => set("experience", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						label: "Subjects (comma-separated)",
						value: subjectsText,
						onChange: setSubjectsText,
						className: "sm:col-span-2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						label: "Languages spoken (comma-separated)",
						value: languagesText,
						onChange: setLanguagesText,
						className: "sm:col-span-2"
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Ratings & visibility",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-semibold text-ink",
						children: "Overall rating (0 – 5)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 0,
						max: 5,
						step: .1,
						value: form.rating ?? 5,
						onChange: (e) => set("rating", e.target.value === "" ? "" : Number(e.target.value)),
						className: "mt-2 w-full h-11 px-4 rounded-lg border border-border bg-surface-2 text-sm focus:bg-surface focus:border-primary"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-semibold text-ink",
						children: "Number of reviews"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 0,
						step: 1,
						value: form.reviews ?? 0,
						onChange: (e) => set("reviews", e.target.value === "" ? "" : Number(e.target.value)),
						className: "mt-2 w-full h-11 px-4 rounded-lg border border-border bg-surface-2 text-sm focus:bg-surface focus:border-primary"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "inline-flex items-center gap-2 text-sm sm:col-span-2 mt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: !!form.is_featured,
								onChange: (e) => set("is_featured", e.target.checked),
								className: "h-4 w-4 rounded border-border"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-ink",
								children: "Featured / Top tutor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "— pinned to the top of Find Tutors"
							})
						]
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Curriculum expertise",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGrid, {
					options: CURRICULA,
					selected: form.curriculums ?? [],
					onToggle: (v) => toggleArr("curriculums", v)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Grade levels",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGrid, {
					options: GRADES,
					selected: form.grade_levels ?? [],
					onToggle: (v) => toggleArr("grade_levels", v)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Weekly availability",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduleEditor, {
					schedule: Array.isArray(form.schedule) ? form.schedule : [],
					onChange: (next) => set("schedule", next)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Educational qualifications",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EducationEditor, {
					items: Array.isArray(form.education) ? form.education : [],
					onChange: (next) => set("education", next)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Bio",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					rows: 5,
					value: form.bio ?? "",
					onChange: (e) => set("bio", e.target.value),
					className: "w-full px-4 py-3 rounded-xl border border-border bg-surface-2 text-sm focus:bg-surface focus:border-primary"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Teaching methodology",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					rows: 5,
					value: form.methodology ?? "",
					onChange: (e) => set("methodology", e.target.value),
					className: "w-full px-4 py-3 rounded-xl border border-border bg-surface-2 text-sm focus:bg-surface focus:border-primary"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => navigate({ to: "/admin/tutors" }),
					className: "btn-ghost",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onSave,
					disabled: saving,
					className: "btn-primary disabled:opacity-60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }),
						" ",
						saving ? "Saving…" : "Save changes"
					]
				})]
			})
		]
	});
}
function Card({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-[var(--font-display)] font-semibold text-ink text-lg mb-4",
			children: title
		}), children]
	});
}
function Grid({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid sm:grid-cols-2 gap-4",
		children
	});
}
function Text({ label, value, onChange, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "text-sm font-semibold text-ink",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "mt-2 w-full h-11 px-4 rounded-lg border border-border bg-surface-2 text-sm focus:bg-surface focus:border-primary"
		})]
	});
}
function Select({ label, value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "text-sm font-semibold text-ink",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
		value,
		onChange: (e) => onChange(e.target.value),
		className: "mt-2 w-full h-11 px-4 rounded-lg border border-border bg-surface-2 text-sm font-medium focus:bg-surface focus:border-primary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: "",
			children: "Select…"
		}), options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: o,
			children: o
		}, o))]
	})] });
}
function ChipGrid({ options, selected, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: options.map((o) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onToggle(o),
				className: `px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${selected.includes(o) ? "bg-primary text-primary-foreground border-primary" : "bg-surface-2 text-ink border-border hover:border-primary/50"}`,
				children: o
			}, o);
		})
	});
}
function ScheduleEditor({ schedule, onChange }) {
	const norm = (d) => {
		const k = d.trim().toLowerCase();
		return DAY_OPTIONS.find((x) => x.toLowerCase() === k || k.startsWith(x.toLowerCase())) ?? null;
	};
	const bySlot = /* @__PURE__ */ new Map();
	for (const e of schedule ?? []) {
		const m = norm(e?.day ?? "");
		if (m) bySlot.set(m, Array.isArray(e.slots) ? e.slots : []);
	}
	const emit = (map) => {
		onChange(DAY_OPTIONS.filter((d) => (map.get(d) ?? []).length > 0).map((d) => ({
			day: d,
			slots: map.get(d) ?? []
		})));
	};
	const toggleSlot = (day, slot) => {
		const next = new Map(bySlot);
		const cur = next.get(day) ?? [];
		next.set(day, cur.includes(slot) ? cur.filter((s) => s !== slot) : [...cur, slot]);
		emit(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: "Select the days and time slots this tutor is available."
		}), DAY_OPTIONS.map((d) => {
			const slots = bySlot.get(d) ?? [];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[64px_1fr] gap-3 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold text-ink mt-2",
					children: d
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: SLOT_OPTIONS.map((s) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => toggleSlot(d, s),
							className: `px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${slots.includes(s) ? "bg-primary text-primary-foreground border-primary" : "bg-surface-2 text-ink border-border hover:border-primary/50"}`,
							children: s
						}, s);
					})
				})]
			}, d);
		})]
	});
}
function EducationEditor({ items, onChange }) {
	const list = items.length ? items : [{
		qualification: "",
		degree: "",
		institution: "",
		year: ""
	}];
	const update = (i, k, v) => {
		onChange(list.map((it, idx) => idx === i ? {
			...it,
			[k]: v
		} : it));
	};
	const add = () => onChange([...list, {
		qualification: "",
		degree: "",
		institution: "",
		year: ""
	}]);
	const remove = (i) => onChange(list.filter((_, idx) => idx !== i));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [list.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid sm:grid-cols-2 gap-3 p-4 rounded-xl border border-border bg-surface-2/50",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					placeholder: "Qualification (e.g. Bachelor's)",
					value: it.qualification ?? "",
					onChange: (e) => update(i, "qualification", e.target.value),
					className: "h-11 px-4 rounded-lg border border-border bg-surface text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					placeholder: "Degree / Subject",
					value: it.degree ?? "",
					onChange: (e) => update(i, "degree", e.target.value),
					className: "h-11 px-4 rounded-lg border border-border bg-surface text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					placeholder: "Institution",
					value: it.institution ?? "",
					onChange: (e) => update(i, "institution", e.target.value),
					className: "h-11 px-4 rounded-lg border border-border bg-surface text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						placeholder: "Year",
						value: it.year ?? "",
						onChange: (e) => update(i, "year", e.target.value),
						className: "flex-1 h-11 px-4 rounded-lg border border-border bg-surface text-sm"
					}), list.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => remove(i),
						className: "btn-ghost !py-2 text-xs",
						children: "Remove"
					})]
				})
			]
		}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: add,
			className: "btn-ghost text-sm",
			children: "+ Add qualification"
		})]
	});
}
//#endregion
export { EditTutorPage as component };
