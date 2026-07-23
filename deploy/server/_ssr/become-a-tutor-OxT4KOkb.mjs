import { r as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Dt as Award, G as Layers, O as Phone, Q as GraduationCap, R as Mail, St as Briefcase, _ as Sparkles, a as Users, dt as Clock, ht as CircleCheck, kt as ArrowRight, lt as Coins, n as X, nt as FileText, ot as Earth, s as User, u as Upload, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as SiteLayout } from "./layout-DEKgj2GL.mjs";
import { t as PageHeader } from "./page-header-CAaZDPYW.mjs";
import { D as useServerFn, E as submitTutorApplication } from "./tutor-api.functions-BgQ4s39o.mjs";
import { t as supabase } from "./client-B11Yrd_E.mjs";
import { t as isValidPhoneNumber } from "../_libs/react-phone-number-input.mjs";
import { t as PhoneField } from "./phone-field-B0rtQnqm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/become-a-tutor-OxT4KOkb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var benefits = [
	{
		icon: Coins,
		title: "Competitive earnings",
		body: "Industry-leading rates in USD/GBP with prompt monthly payouts."
	},
	{
		icon: Earth,
		title: "International students",
		body: "Teach learners in the UK, UAE, Australia, Europe and Asia."
	},
	{
		icon: Clock,
		title: "Flexible hours",
		body: "Set your availability. Teach evenings, weekends or full-time."
	},
	{
		icon: GraduationCap,
		title: "Premium platform",
		body: "Smart whiteboard, recordings, and student management tools."
	},
	{
		icon: ShieldCheck,
		title: "Vetted faculty",
		body: "Stand alongside the strongest tutors in the region."
	},
	{
		icon: Users,
		title: "Long-term clients",
		body: "Most parents stay for full academic years, not single sessions."
	}
];
var subjectOptions = [
	"Mathematics",
	"Further Mathematics",
	"Physics",
	"Chemistry",
	"Biology",
	"English",
	"Literature",
	"Computer Science",
	"Business",
	"Economics",
	"Accounting",
	"Urdu",
	"Islamic Studies",
	"History",
	"Geography",
	"Psychology"
];
var gradeLevelOptions = [
	"Primary",
	"Middle School",
	"High School",
	"College",
	"University",
	"Adults"
];
var curriculumGroups = {
	"International": [
		"IGCSE",
		"GCSE",
		"O Level",
		"A Level",
		"IB",
		"AP",
		"AQA",
		"Edexcel",
		"LRN"
	],
	"Middle East": [
		"UAE",
		"Saudi Arabia",
		"Qatar",
		"Bahrain",
		"Kuwait"
	],
	"Asia": [
		"FBISE (Federal Board)",
		"Punjab Board",
		"CBSE",
		"ICSE",
		"Singapore"
	]
};
var initialFormData = {
	fullName: "",
	gender: "",
	nationality: "",
	countryOfResidence: "",
	city: "",
	languages: "",
	email: "",
	mobile: "",
	whatsapp: "",
	professionalTitle: "",
	teachingExperience: "",
	currentOccupation: "",
	highestQualification: "",
	degreeTitle: "",
	institution: "",
	graduationYear: "",
	bio: "",
	methodology: ""
};
var MAX_PHOTO_MB = 5;
var MAX_CV_MB = 5;
var NAME_RE = /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ '.-]{1,}$/;
var CURRENT_YEAR = (/* @__PURE__ */ new Date()).getFullYear();
var teachingExperienceOptions = [
	"Less than 1 Year",
	"1–3 Years",
	"3–5 Years",
	"5–10 Years",
	"10+ Years"
];
function BecomeATutorPage() {
	const [formData, setFormData] = (0, import_react.useState)(initialFormData);
	const [subjectQuery, setSubjectQuery] = (0, import_react.useState)("");
	const [selectedSubjects, setSelectedSubjects] = (0, import_react.useState)([]);
	const [selectedGrades, setSelectedGrades] = (0, import_react.useState)([]);
	const [selectedCurricula, setSelectedCurricula] = (0, import_react.useState)([]);
	const [photoFile, setPhotoFile] = (0, import_react.useState)(null);
	const [cvFile, setCvFile] = (0, import_react.useState)(null);
	const [cnicFrontFile, setCnicFrontFile] = (0, import_react.useState)(null);
	const [cnicBackFile, setCnicBackFile] = (0, import_react.useState)(null);
	const photoName = photoFile?.name ?? null;
	const cvName = cvFile?.name ?? null;
	const cnicFrontName = cnicFrontFile?.name ?? null;
	const cnicBackName = cnicBackFile?.name ?? null;
	const [agreed, setAgreed] = (0, import_react.useState)(false);
	const [preferredContact, setPreferredContact] = (0, import_react.useState)("Email");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [showSuccess, setShowSuccess] = (0, import_react.useState)(false);
	const [formKey, setFormKey] = (0, import_react.useState)(0);
	const submitFn = useServerFn(submitTutorApplication);
	const formTopRef = (0, import_react.useRef)(null);
	const subjectMatches = (0, import_react.useMemo)(() => {
		if (!subjectQuery.trim()) return subjectOptions.filter((s) => !selectedSubjects.includes(s));
		return subjectOptions.filter((s) => s.toLowerCase().includes(subjectQuery.toLowerCase()) && !selectedSubjects.includes(s));
	}, [subjectQuery, selectedSubjects]);
	const toggle = (arr, v, set) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
	const updateField = (key, value) => {
		setFormData((prev) => ({
			...prev,
			[key]: value
		}));
		if (errors[key]) setErrors((prev) => {
			const next = { ...prev };
			delete next[key];
			return next;
		});
	};
	const validate = () => {
		const next = {};
		const addError = (key, message) => {
			if (!next[key]) next[key] = message;
		};
		Object.keys(formData).forEach((key) => {
			if (key === "mobile" || key === "whatsapp") return;
			if (!formData[key].trim()) addError(key, "This field is required.");
		});
		if (formData.fullName && !NAME_RE.test(formData.fullName.trim())) addError("fullName", "Please enter a valid name (letters only).");
		if (formData.nationality && !NAME_RE.test(formData.nationality.trim())) addError("nationality", "Please enter a valid nationality.");
		if (formData.city && !/^[A-Za-zÀ-ÖØ-öø-ÿ '.-]{2,}$/.test(formData.city.trim())) addError("city", "Please enter a valid city.");
		if (formData.countryOfResidence && !/^[A-Za-zÀ-ÖØ-öø-ÿ '.-]{2,}$/.test(formData.countryOfResidence.trim())) addError("countryOfResidence", "Please enter a valid country.");
		if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) addError("email", "Please enter a valid email address.");
		if (!formData.mobile) addError("mobile", "Please enter your mobile number.");
		else if (!isValidPhoneNumber(formData.mobile)) addError("mobile", "Enter a valid phone number for the selected country.");
		if (!formData.whatsapp) addError("whatsapp", "Please enter your WhatsApp number.");
		else if (!isValidPhoneNumber(formData.whatsapp)) addError("whatsapp", "Enter a valid WhatsApp number for the selected country.");
		if (formData.teachingExperience && !teachingExperienceOptions.includes(formData.teachingExperience)) addError("teachingExperience", "Please choose from the list.");
		if (formData.graduationYear) {
			const y = Number(formData.graduationYear);
			if (!/^\d{4}$/.test(formData.graduationYear.trim()) || Number.isNaN(y) || y < 1950 || y > CURRENT_YEAR + 1) addError("graduationYear", `Enter a year between 1950 and ${CURRENT_YEAR + 1}.`);
		}
		if (formData.bio && formData.bio.trim().length < 60) addError("bio", "Bio should be at least 60 characters.");
		if (formData.methodology && formData.methodology.trim().length < 60) addError("methodology", "Please describe your methodology in a little more detail.");
		if (selectedSubjects.length === 0) addError("subjects", "Please select at least one subject.");
		if (selectedGrades.length === 0) addError("grades", "Please select at least one grade level.");
		if (selectedCurricula.length === 0) addError("curricula", "Please select at least one curriculum.");
		if (!photoFile) addError("photo", "Please upload a profile photo.");
		else {
			if (photoFile.size > MAX_PHOTO_MB * 1024 * 1024) addError("photo", `Photo must be under ${MAX_PHOTO_MB}MB.`);
			if (!/^image\/(jpeg|jpg|png|webp)$/.test(photoFile.type)) addError("photo", "Photo must be JPG, PNG, or WebP.");
		}
		if (!cvFile) addError("cv", "Please upload your CV / resume.");
		else {
			if (cvFile.size > MAX_CV_MB * 1024 * 1024) addError("cv", `CV must be under ${MAX_CV_MB}MB.`);
			if (!(/\.(pdf|docx?|)$/i.test(cvFile.name) || [
				"application/pdf",
				"application/msword",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
			].includes(cvFile.type))) addError("cv", "CV must be a PDF or Word document.");
		}
		for (const [key, file, label] of [[
			"cnicFront",
			cnicFrontFile,
			"National ID (front)"
		], [
			"cnicBack",
			cnicBackFile,
			"National ID (back)"
		]]) if (!file) addError(key, `Please upload the ${label} image.`);
		else {
			if (file.size > MAX_PHOTO_MB * 1024 * 1024) addError(key, `${label} must be under ${MAX_PHOTO_MB}MB.`);
			if (!/^image\/(jpeg|jpg|png|webp)$/.test(file.type)) addError(key, `${label} must be JPG, PNG, or WebP.`);
		}
		return next;
	};
	const resetAll = () => {
		setFormData(initialFormData);
		setSubjectQuery("");
		setSelectedSubjects([]);
		setSelectedGrades([]);
		setSelectedCurricula([]);
		setPhotoFile(null);
		setCvFile(null);
		setCnicFrontFile(null);
		setCnicBackFile(null);
		setAgreed(false);
		setPreferredContact("Email");
		setErrors({});
		setSubmitted(false);
		setFormKey((k) => k + 1);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		const validationErrors = validate();
		if (!agreed) validationErrors.agreed = "Please confirm the declaration to proceed.";
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			setTimeout(() => {
				document.querySelector("[data-error=\"true\"]")?.scrollIntoView({
					behavior: "smooth",
					block: "center"
				});
			}, 50);
			return;
		}
		setErrors({});
		if (!photoFile || !cvFile) return;
		setBusy(true);
		try {
			const stamp = Date.now();
			const photoPath = `applications/${stamp}-${sanitizeName(photoFile.name)}`;
			const cvPath = `applications/${stamp}-${sanitizeName(cvFile.name)}`;
			const cnicFrontPath = cnicFrontFile ? `applications/cnic/${stamp}-front-${sanitizeName(cnicFrontFile.name)}` : "";
			const cnicBackPath = cnicBackFile ? `applications/cnic/${stamp}-back-${sanitizeName(cnicBackFile.name)}` : "";
			const photoUp = await supabase.storage.from("tutor-photos").upload(photoPath, photoFile, { upsert: false });
			if (photoUp.error) throw photoUp.error;
			const cvUp = await supabase.storage.from("tutor-cvs").upload(cvPath, cvFile, { upsert: false });
			if (cvUp.error) throw cvUp.error;
			if (cnicFrontFile) {
				const up = await supabase.storage.from("tutor-cvs").upload(cnicFrontPath, cnicFrontFile, { upsert: false });
				if (up.error) throw up.error;
			}
			if (cnicBackFile) {
				const up = await supabase.storage.from("tutor-cvs").upload(cnicBackPath, cnicBackFile, { upsert: false });
				if (up.error) throw up.error;
			}
			await submitFn({ data: {
				full_name: formData.fullName,
				gender: formData.gender,
				nationality: formData.nationality,
				country: formData.countryOfResidence,
				city: formData.city,
				timezone: "",
				email: formData.email,
				phone: formData.mobile,
				whatsapp: formData.whatsapp,
				preferred_contact: preferredContact === "Phone" ? "Phone" : preferredContact,
				professional_title: formData.professionalTitle,
				qualification: `${formData.highestQualification} · ${formData.degreeTitle}`,
				experience_years: formData.teachingExperience,
				bio: formData.bio,
				methodology: formData.methodology,
				subjects: selectedSubjects,
				curriculums: selectedCurricula,
				grade_levels: selectedGrades,
				languages: formData.languages.split(",").map((s) => s.trim()).filter(Boolean),
				education: [{
					qualification: formData.highestQualification,
					degree: formData.degreeTitle,
					institution: formData.institution,
					year: formData.graduationYear
				}],
				schedule: [],
				photo_path: photoPath,
				cv_path: cvPath,
				cnic_front_path: cnicFrontPath,
				cnic_back_path: cnicBackPath
			} });
			resetAll();
			setShowSuccess(true);
		} catch (err) {
			setErrors({ submit: err?.message ?? "Something went wrong. Please try again." });
		} finally {
			setBusy(false);
		}
	};
	function sanitizeName(n) {
		return n.replace(/[^a-zA-Z0-9._-]+/g, "-");
	}
	const chipError = (key) => submitted && errors[key] ? errors[key] : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Careers · Tutors",
			title: "Teach international students. From anywhere.",
			description: "Join a curated faculty of educators delivering one-to-one lessons to students worldwide. Our recruitment portal takes under 10 minutes.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "#apply",
				className: "btn-primary",
				children: ["Start Application ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "Benefits"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "heading-lg mt-3 max-w-2xl",
						children: "A platform that respects your craft."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5",
						children: benefits.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-surface card-surface-hover p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 font-semibold text-ink",
									children: b.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground leading-relaxed",
									children: b.body
								})
							]
						}, b.title))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "apply",
			className: "section bg-surface border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page max-w-4xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center max-w-2xl mx-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "chip-gold",
								children: "Now hiring"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "heading-lg mt-4",
								children: "Teacher Application"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-muted-foreground",
								children: "We review every application personally. Expect a response within 5 working days."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: formTopRef }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "mt-12 space-y-8",
						noValidate: true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSection, {
								number: "01",
								icon: User,
								title: "Personal Information",
								description: "Tell us who you are.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Full Name",
											required: true,
											value: formData.fullName,
											onChange: (v) => updateField("fullName", v),
											error: submitted ? errors.fullName : void 0,
											placeholder: "e.g. Ayesha Khan"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileField, {
											label: "Profile Photo",
											required: true,
											icon: Upload,
											accept: "image/*",
											fileName: photoName,
											onFile: (file) => {
												setPhotoFile(file);
												if (file) setErrors((p) => {
													const n = { ...p };
													delete n.photo;
													return n;
												});
											},
											error: submitted ? errors.photo : void 0,
											hint: "JPG or PNG · Square photo recommended"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
											label: "Gender",
											required: true,
											value: formData.gender,
											onChange: (v) => updateField("gender", v),
											error: submitted ? errors.gender : void 0,
											options: ["Male", "Female"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Nationality",
											required: true,
											value: formData.nationality,
											onChange: (v) => updateField("nationality", v),
											error: submitted ? errors.nationality : void 0,
											placeholder: "e.g. Pakistani"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Country of Residence",
											required: true,
											value: formData.countryOfResidence,
											onChange: (v) => updateField("countryOfResidence", v),
											error: submitted ? errors.countryOfResidence : void 0,
											placeholder: "e.g. United Kingdom"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "City",
											required: true,
											value: formData.city,
											onChange: (v) => updateField("city", v),
											error: submitted ? errors.city : void 0,
											placeholder: "e.g. London"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Languages Spoken",
											required: true,
											value: formData.languages,
											onChange: (v) => updateField("languages", v),
											error: submitted ? errors.languages : void 0,
											placeholder: "e.g. English, Urdu",
											className: "sm:col-span-2"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileField, {
											label: "National ID / CNIC — Front",
											required: true,
											icon: Upload,
											accept: "image/*",
											fileName: cnicFrontName,
											onFile: (file) => {
												setCnicFrontFile(file);
												if (file) setErrors((p) => {
													const n = { ...p };
													delete n.cnicFront;
													return n;
												});
											},
											error: submitted ? errors.cnicFront : void 0,
											hint: "JPG, PNG or WebP · Admin verification only, kept private"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileField, {
											label: "National ID / CNIC — Back",
											required: true,
											icon: Upload,
											accept: "image/*",
											fileName: cnicBackName,
											onFile: (file) => {
												setCnicBackFile(file);
												if (file) setErrors((p) => {
													const n = { ...p };
													delete n.cnicBack;
													return n;
												});
											},
											error: submitted ? errors.cnicBack : void 0,
											hint: "JPG, PNG or WebP · Admin verification only, kept private"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSection, {
								number: "02",
								icon: Mail,
								title: "Contact Information",
								description: "How the academy will reach you during recruitment.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Email Address",
											required: true,
											type: "email",
											value: formData.email,
											onChange: (v) => updateField("email", v),
											error: submitted ? errors.email : void 0,
											placeholder: "you@example.com"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneField, {
											label: "Mobile Number",
											required: true,
											value: formData.mobile,
											onChange: (v) => updateField("mobile", v),
											error: submitted ? errors.mobile : void 0,
											placeholder: "Mobile number"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneField, {
											label: "WhatsApp Number",
											required: true,
											value: formData.whatsapp,
											onChange: (v) => updateField("whatsapp", v),
											error: submitted ? errors.whatsapp : void 0,
											placeholder: "WhatsApp number"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "text-sm font-semibold text-ink",
											children: ["Preferred Contact Method ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-primary",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 grid grid-cols-3 gap-2",
											children: [
												{
													v: "Email",
													Icon: Mail
												},
												{
													v: "WhatsApp",
													Icon: Phone
												},
												{
													v: "Phone",
													Icon: Phone
												}
											].map(({ v, Icon }) => {
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => setPreferredContact(v),
													className: `h-11 px-3 rounded-lg border text-sm font-medium inline-flex items-center justify-center gap-1.5 transition-colors ${preferredContact === v ? "bg-primary text-primary-foreground border-primary" : "bg-surface-2 text-ink border-border hover:border-primary/60"}`,
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }),
														" ",
														v
													]
												}, v);
											})
										})] })
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSection, {
								number: "03",
								icon: Briefcase,
								title: "Professional Information",
								description: "Your teaching background at a glance.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Professional Title",
											required: true,
											value: formData.professionalTitle,
											onChange: (v) => updateField("professionalTitle", v),
											error: submitted ? errors.professionalTitle : void 0,
											placeholder: "e.g. Senior A Level Physics Tutor",
											className: "sm:col-span-2"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
											label: "Teaching Experience",
											required: true,
											value: formData.teachingExperience,
											onChange: (v) => updateField("teachingExperience", v),
											error: submitted ? errors.teachingExperience : void 0,
											options: [
												"Less than 1 Year",
												"1–3 Years",
												"3–5 Years",
												"5–10 Years",
												"10+ Years"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Current Occupation",
											required: true,
											value: formData.currentOccupation,
											onChange: (v) => updateField("currentOccupation", v),
											error: submitted ? errors.currentOccupation : void 0,
											placeholder: "e.g. Full-time Tutor / School Teacher"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSection, {
								number: "04",
								icon: GraduationCap,
								title: "Educational Qualifications",
								description: "Your highest completed qualification.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
											label: "Highest Qualification",
											required: true,
											value: formData.highestQualification,
											onChange: (v) => updateField("highestQualification", v),
											error: submitted ? errors.highestQualification : void 0,
											options: [
												"Bachelor's",
												"Master's",
												"MPhil",
												"Doctorate (PhD)"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Degree Title",
											required: true,
											value: formData.degreeTitle,
											onChange: (v) => updateField("degreeTitle", v),
											error: submitted ? errors.degreeTitle : void 0,
											placeholder: "e.g. MSc Physics"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Institution Name",
											required: true,
											value: formData.institution,
											onChange: (v) => updateField("institution", v),
											error: submitted ? errors.institution : void 0,
											placeholder: "e.g. Punjab University"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Graduation Year",
											required: true,
											value: formData.graduationYear,
											onChange: (v) => updateField("graduationYear", v),
											error: submitted ? errors.graduationYear : void 0,
											placeholder: "e.g. 2016"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSection, {
								number: "05",
								icon: Layers,
								title: "Teaching Subjects",
								description: "Search and add every subject you teach.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-sm font-semibold text-ink",
										children: ["Subjects You Teach ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-primary",
											children: "*"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 card-surface p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap gap-1.5 mb-2",
												children: [selectedSubjects.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted-foreground py-1.5",
													children: "No subjects added yet."
												}), selectedSubjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
													label: s,
													onRemove: () => {
														toggle(selectedSubjects, s, setSelectedSubjects);
														setErrors((p) => {
															const n = { ...p };
															delete n.subjects;
															return n;
														});
													}
												}, s))]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: subjectQuery,
												onChange: (e) => setSubjectQuery(e.target.value),
												placeholder: "Search subjects…",
												className: "w-full h-10 px-3 rounded-lg border border-border bg-surface-2 text-sm ring-focus focus:bg-surface focus:border-primary"
											}),
											subjectQuery && subjectMatches.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-2 flex flex-wrap gap-1.5",
												children: subjectMatches.slice(0, 8).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => {
														toggle(selectedSubjects, s, setSelectedSubjects);
														setSubjectQuery("");
														setErrors((p) => {
															const n = { ...p };
															delete n.subjects;
															return n;
														});
													},
													className: "text-xs px-2.5 py-1 rounded-full bg-primary-soft text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors",
													children: ["+ ", s]
												}, s))
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: chipError("subjects") })
								] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormSection, {
								number: "06",
								icon: Users,
								title: "Grade Levels",
								description: "Select every level you can teach.",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-sm font-semibold text-ink",
										children: ["Grade Levels ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-primary",
											children: "*"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGrid, {
											options: gradeLevelOptions,
											selected: selectedGrades,
											onToggle: (v) => {
												toggle(selectedGrades, v, setSelectedGrades);
												setErrors((p) => {
													const n = { ...p };
													delete n.grades;
													return n;
												});
											}
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: chipError("grades") })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormSection, {
								number: "07",
								icon: Award,
								title: "Curriculum Expertise",
								description: "Select every board or curriculum you teach.",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-sm font-semibold text-ink",
										children: ["Curriculum Expertise ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-primary",
											children: "*"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 space-y-5",
										children: Object.entries(curriculumGroups).map(([group, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] uppercase tracking-wider font-semibold text-primary mb-2",
											children: group
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGrid, {
											options: items,
											selected: selectedCurricula,
											onToggle: (v) => {
												toggle(selectedCurricula, v, setSelectedCurricula);
												setErrors((p) => {
													const n = { ...p };
													delete n.curricula;
													return n;
												});
											}
										})] }, group))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: chipError("curricula") })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSection, {
								number: "08",
								icon: Sparkles,
								title: "Teacher Profile",
								description: "Introduce yourself to prospective families.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
										label: "Short Bio",
										required: true,
										value: formData.bio,
										onChange: (v) => updateField("bio", v),
										error: submitted ? errors.bio : void 0,
										hint: "200–500 words",
										placeholder: "A short professional biography — your background, experience and what makes your teaching stand out.",
										rows: 5
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
										label: "Teaching Methodology",
										required: true,
										value: formData.methodology,
										onChange: (v) => updateField("methodology", v),
										error: submitted ? errors.methodology : void 0,
										hint: "Describe your approach",
										placeholder: "How do you structure lessons? What frameworks and tools do you use? How do you measure progress?",
										rows: 5
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSection, {
								number: "09",
								icon: FileText,
								title: "Verification",
								description: "Upload your CV so we can verify your qualifications.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileField, {
									label: "CV / Resume",
									required: true,
									icon: Upload,
									accept: ".pdf,.doc,.docx",
									fileName: cvName,
									onFile: (file) => {
										setCvFile(file);
										if (file) setErrors((p) => {
											const n = { ...p };
											delete n.cv;
											return n;
										});
									},
									error: submitted ? errors.cv : void 0,
									hint: "PDF or DOC · Max 5MB"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormSection, {
								number: "10",
								icon: ShieldCheck,
								title: "Declaration",
								description: "Final confirmation before submission.",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: `flex gap-3 items-start cursor-pointer card-surface p-4 ${submitted && !agreed ? "border-destructive/60 bg-destructive/5" : ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: agreed,
										onChange: (e) => setAgreed(e.target.checked),
										className: "mt-0.5 h-5 w-5 rounded border-border text-primary focus:ring-primary shrink-0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm text-foreground/85 leading-relaxed",
										children: ["I confirm that all the information provided is accurate and understand that my application will be reviewed before approval.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-primary",
											children: " *"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: submitted && !agreed ? "Please confirm the declaration to proceed." : void 0 })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-4",
								children: [
									errors.submit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mb-4 p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-medium",
										children: errors.submit
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										disabled: busy,
										className: "btn-primary w-full sm:w-auto disabled:opacity-60",
										children: [
											busy ? "Submitting…" : "Submit Application",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-4 text-sm text-muted-foreground",
										children: [
											"Prefer email? Write to",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												className: "text-primary font-medium",
												href: "mailto:careers@thebestscienceacademy.com",
												children: "careers@thebestscienceacademy.com"
											})
										]
									})
								]
							})
						]
					}, formKey),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-14 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "btn-ghost",
							children: "Back to home"
						})
					})
				]
			})
		}),
		showSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4",
			onClick: () => setShowSuccess(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md card-surface p-8 text-center",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto h-14 w-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-7 w-7" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-5 font-[var(--font-display)] font-bold text-xl text-ink",
						children: "Application submitted"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Thank you — your application has been received. Our recruitment team will review your details and get back to you within 5 working days."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-col sm:flex-row gap-2 justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowSuccess(false),
							className: "btn-ghost",
							children: "Start a new application"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "btn-primary",
							children: "Back to home"
						})]
					})
				]
			})
		})
	] });
}
function FormSection({ number, icon: Icon, title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface p-6 lg:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-4 pb-5 mb-5 border-b border-border/70",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-11 w-11 shrink-0 rounded-xl bg-primary text-primary-foreground flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[11px] uppercase tracking-wider font-semibold text-primary",
						children: ["Step ", number]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-[var(--font-display)] font-semibold text-ink text-lg",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: description
					})
				]
			})]
		}), children]
	});
}
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
function Field({ label, required, type = "text", value, onChange, error, placeholder, className = "" }) {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type,
				value,
				onChange: (e) => onChange(e.target.value),
				required,
				placeholder,
				className: `mt-2 w-full h-11 px-4 rounded-lg border bg-surface-2 text-sm ring-focus focus:bg-surface focus:border-primary transition-colors ${error ? "border-destructive/70 focus:border-destructive" : "border-border"}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: error })
		]
	});
}
function SelectField({ label, required, value, onChange, error, options, className = "" }) {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value,
				onChange: (e) => onChange(e.target.value),
				required,
				className: `mt-2 w-full h-11 px-4 rounded-lg border bg-surface-2 text-sm font-medium ring-focus appearance-none focus:bg-surface focus:border-primary transition-colors ${error ? "border-destructive/70 focus:border-destructive" : "border-border"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: "",
					children: [
						"Select ",
						label.toLowerCase(),
						"…"
					]
				}), options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: o,
					children: o
				}, o))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: error })
		]
	});
}
function TextArea({ label, required, value, onChange, error, hint, placeholder, rows = 4 }) {
	const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-error": error ? "true" : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-semibold text-ink",
					children: [
						label,
						" ",
						required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "*"
						})
					]
				}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted-foreground",
					children: hint
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				rows,
				value,
				onChange: (e) => onChange(e.target.value),
				required,
				placeholder,
				className: `mt-2 w-full px-4 py-3 rounded-xl border bg-surface-2 text-sm ring-focus focus:bg-surface focus:border-primary transition-colors ${error ? "border-destructive/70 focus:border-destructive" : "border-border"}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1.5 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: error }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[11px] text-muted-foreground",
					children: [wordCount, " words"]
				})]
			})
		]
	});
}
function FileField({ label, required, icon: Icon, accept, fileName, onFile, error, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: `mt-2 flex items-center gap-3 cursor-pointer rounded-xl border border-dashed bg-surface-2 p-4 hover:bg-surface hover:border-primary transition-colors ${error ? "border-destructive/70" : "border-border"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-10 w-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `text-sm font-medium truncate ${error ? "text-destructive" : "text-ink"}`,
							children: fileName ?? `Click to upload ${label.toLowerCase()}`
						}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] text-muted-foreground mt-0.5",
							children: hint
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept,
						required: required && !fileName,
						className: "hidden",
						onChange: (e) => onFile(e.target.files?.[0] ?? null)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: error })
		]
	});
}
function ChipGrid({ options, selected, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: options.map((o) => {
			const active = selected.includes(o);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onToggle(o),
				className: `inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all ${active ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-surface-2 text-ink border-border hover:border-primary/50 hover:text-primary"}`,
				children: [active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), o]
			}, o);
		})
	});
}
function Tag({ label, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold pl-3 pr-1 py-1",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onRemove,
			className: "h-5 w-5 rounded-full hover:bg-white/20 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
		})]
	});
}
//#endregion
export { BecomeATutorPage as component };
