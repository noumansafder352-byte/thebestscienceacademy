import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useRef, useState } from "react";
import {
  ArrowRight, Award, Briefcase, CheckCircle2, Clock, Coins, FileText,
  Globe2, GraduationCap, Layers, Languages as LangIcon, Mail, MapPin,
  Phone, ShieldCheck, Sparkles, Upload, User, Users, X,
} from "lucide-react";
import { SiteLayout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { supabase } from "@/integrations/supabase/client";
import { submitTutorApplication } from "@/lib/tutor-api.functions";
import { PhoneField, isValidPhoneNumber } from "@/components/phone-field";


export const Route = createFileRoute("/become-a-tutor")({
  head: () => ({
    meta: [
      { title: "Become a Tutor — The Best Science Academy" },
      { name: "description", content: "Apply to join a global academy. Teach international students online with a premium platform, competitive pay and flexible hours." },
      { property: "og:title", content: "Become a Tutor" },
      { property: "og:description", content: "Teach international students online from anywhere." },
    ],
  }),
  component: BecomeATutorPage,
});

const benefits = [
  { icon: Coins, title: "Competitive earnings", body: "Industry-leading rates in USD/GBP with prompt monthly payouts." },
  { icon: Globe2, title: "International students", body: "Teach learners in the UK, UAE, Australia, Europe and Asia." },
  { icon: Clock, title: "Flexible hours", body: "Set your availability. Teach evenings, weekends or full-time." },
  { icon: GraduationCap, title: "Premium platform", body: "Smart whiteboard, recordings, and student management tools." },
  { icon: ShieldCheck, title: "Vetted faculty", body: "Stand alongside the strongest tutors in the region." },
  { icon: Users, title: "Long-term clients", body: "Most parents stay for full academic years, not single sessions." },
];

const subjectOptions = [
  "Mathematics", "Further Mathematics", "Physics", "Chemistry", "Biology",
  "English", "Literature", "Computer Science", "Business", "Economics",
  "Accounting", "Urdu", "Islamic Studies", "History", "Geography", "Psychology",
];

const gradeLevelOptions = ["Primary", "Middle School", "High School", "College", "University", "Adults"];

const curriculumGroups: Record<string, string[]> = {
  "International": ["IGCSE", "GCSE", "O Level", "A Level", "IB", "AP", "AQA", "Edexcel", "LRN"],
  // "Middle East": ["UAE", "Saudi Arabia", "Qatar", "Bahrain", "Kuwait"],
  "Asia": ["FBISE (Federal Board)", "Punjab Board", "CBSE", "ICSE"],
};


type FormData = {
  fullName: string;
  gender: string;
  nationality: string;
  countryOfResidence: string;
  city: string;
  languages: string;
  email: string;
  mobile: string;
  whatsapp: string;
  professionalTitle: string;
  teachingExperience: string;
  currentOccupation: string;
  highestQualification: string;
  degreeTitle: string;
  institution: string;
  graduationYear: string;
  bio: string;
  methodology: string;
};

const initialFormData: FormData = {
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
  methodology: "",
};


const MAX_PHOTO_MB = 5;
const MAX_CV_MB = 5;
const NAME_RE = /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ '.-]{1,}$/;
const CURRENT_YEAR = new Date().getFullYear();
const teachingExperienceOptions = ["Less than 1 Year", "1–3 Years", "3–5 Years", "5–10 Years", "10+ Years"];

function BecomeATutorPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [subjectQuery, setSubjectQuery] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedCurricula, setSelectedCurricula] = useState<string[]>([]);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cnicFrontFile, setCnicFrontFile] = useState<File | null>(null);
  const [cnicBackFile, setCnicBackFile] = useState<File | null>(null);
  const photoName = photoFile?.name ?? null;
  const cvName = cvFile?.name ?? null;
  const cnicFrontName = cnicFrontFile?.name ?? null;
  const cnicBackName = cnicBackFile?.name ?? null;
  const [agreed, setAgreed] = useState(false);
  const [preferredContact, setPreferredContact] = useState<"Email" | "WhatsApp" | "Phone">("Email");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formKey, setFormKey] = useState(0); // used to reset uncontrolled inputs (file inputs)
  const submitFn = useServerFn(submitTutorApplication);
  const formTopRef = useRef<HTMLDivElement>(null);

  const subjectMatches = useMemo(() => {
    if (!subjectQuery.trim()) return subjectOptions.filter((s) => !selectedSubjects.includes(s));
    return subjectOptions.filter(
      (s) => s.toLowerCase().includes(subjectQuery.toLowerCase()) && !selectedSubjects.includes(s),
    );
  }, [subjectQuery, selectedSubjects]);

  const toggle = (arr: string[], v: string, set: (a: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const updateField = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validate = (): Record<string, string> => {
    const next: Record<string, string> = {};
    const addError = (key: string, message: string) => {
      if (!next[key]) next[key] = message;
    };

    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      // mobile/whatsapp validated separately below
      if (key === "mobile" || key === "whatsapp") return;
      if (!formData[key].trim()) {
        addError(key, "This field is required.");
      }
    });

    // Names — no digits or symbols
    if (formData.fullName && !NAME_RE.test(formData.fullName.trim())) {
      addError("fullName", "Please enter a valid name (letters only).");
    }
    if (formData.nationality && !NAME_RE.test(formData.nationality.trim())) {
      addError("nationality", "Please enter a valid nationality.");
    }
    if (formData.city && !/^[A-Za-zÀ-ÖØ-öø-ÿ '.-]{2,}$/.test(formData.city.trim())) {
      addError("city", "Please enter a valid city.");
    }
    if (formData.countryOfResidence && !/^[A-Za-zÀ-ÖØ-öø-ÿ '.-]{2,}$/.test(formData.countryOfResidence.trim())) {
      addError("countryOfResidence", "Please enter a valid country.");
    }

    // Email
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) {
      addError("email", "Please enter a valid email address.");
    }

    // Phone numbers (international)
    if (!formData.mobile) addError("mobile", "Please enter your mobile number.");
    else if (!isValidPhoneNumber(formData.mobile)) addError("mobile", "Enter a valid phone number for the selected country.");
    if (!formData.whatsapp) addError("whatsapp", "Please enter your WhatsApp number.");
    else if (!isValidPhoneNumber(formData.whatsapp)) addError("whatsapp", "Enter a valid WhatsApp number for the selected country.");

    // Teaching experience — predefined
    if (formData.teachingExperience && !teachingExperienceOptions.includes(formData.teachingExperience)) {
      addError("teachingExperience", "Please choose from the list.");
    }

    // Graduation year — numeric within reasonable range
    if (formData.graduationYear) {
      const y = Number(formData.graduationYear);
      if (!/^\d{4}$/.test(formData.graduationYear.trim()) || Number.isNaN(y) || y < 1950 || y > CURRENT_YEAR + 1) {
        addError("graduationYear", `Enter a year between 1950 and ${CURRENT_YEAR + 1}.`);
      }
    }

    // Bio / methodology min length
    if (formData.bio && formData.bio.trim().length < 60) {
      addError("bio", "Bio should be at least 60 characters.");
    }
    if (formData.methodology && formData.methodology.trim().length < 60) {
      addError("methodology", "Please describe your methodology in a little more detail.");
    }

    if (selectedSubjects.length === 0) addError("subjects", "Please select at least one subject.");
    if (selectedGrades.length === 0) addError("grades", "Please select at least one grade level.");
    if (selectedCurricula.length === 0) addError("curricula", "Please select at least one curriculum.");

    // Files
    if (!photoFile) addError("photo", "Please upload a profile photo.");
    else {
      if (photoFile.size > MAX_PHOTO_MB * 1024 * 1024) addError("photo", `Photo must be under ${MAX_PHOTO_MB}MB.`);
      if (!/^image\/(jpeg|jpg|png|webp)$/.test(photoFile.type)) addError("photo", "Photo must be JPG, PNG, or WebP.");
    }
    if (!cvFile) addError("cv", "Please upload your CV / resume.");
    else {
      if (cvFile.size > MAX_CV_MB * 1024 * 1024) addError("cv", `CV must be under ${MAX_CV_MB}MB.`);
      const okType = /\.(pdf|docx?|)$/i.test(cvFile.name) || ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(cvFile.type);
      if (!okType) addError("cv", "CV must be a PDF or Word document.");
    }
    for (const [key, file, label] of [
      ["cnicFront", cnicFrontFile, "National ID (front)"] as const,
      ["cnicBack", cnicBackFile, "National ID (back)"] as const,
    ]) {
      if (!file) addError(key, `Please upload the ${label} image.`);
      else {
        if (file.size > MAX_PHOTO_MB * 1024 * 1024) addError(key, `${label} must be under ${MAX_PHOTO_MB}MB.`);
        if (!/^image\/(jpeg|jpg|png|webp)$/.test(file.type)) addError(key, `${label} must be JPG, PNG, or WebP.`);
      }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validate();
    if (!agreed) validationErrors.agreed = "Please confirm the declaration to proceed.";
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTimeout(() => {
        const firstError = document.querySelector('[data-error="true"]');
        firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
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

      await submitFn({
        data: {
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
            year: formData.graduationYear,
          }],
          schedule: [],
          photo_path: photoPath,
          cv_path: cvPath,
          cnic_front_path: cnicFrontPath,
          cnic_back_path: cnicBackPath,
        },
      });
      // Success — reset & show modal, do not scroll
      resetAll();
      setShowSuccess(true);
    } catch (err: any) {
      setErrors({ submit: err?.message ?? "Something went wrong. Please try again." });
    } finally {
      setBusy(false);
    }
  };

  function sanitizeName(n: string) {
    return n.replace(/[^a-zA-Z0-9._-]+/g, "-");
  }


  const chipError = (key: string) => (submitted && errors[key] ? errors[key] : undefined);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Careers · Tutors"
        title="Teach international students. From anywhere."
        description="Join a curated faculty of educators delivering one-to-one lessons to students worldwide. Our recruitment portal takes under 10 minutes."
      >
        <a href="#apply" className="btn-primary">Start Application <ArrowRight className="h-4 w-4" /></a>
      </PageHeader>

      <section className="section">
        <div className="container-page">
          <span className="eyebrow">Benefits</span>
          <h2 className="heading-lg mt-3 max-w-2xl">A platform that respects your craft.</h2>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="card-surface card-surface-hover p-6">
                <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-ink">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="section bg-surface border-t border-border">
        <div className="container-page max-w-4xl">
          <div className="text-center max-w-2xl mx-auto">
            <span className="chip-gold">Now hiring</span>
            <h2 className="heading-lg mt-4">Teacher Application</h2>
            <p className="mt-3 text-muted-foreground">
              We review every application personally. Expect a response within 5 working days.
            </p>
          </div>

          <div ref={formTopRef} />
          <form key={formKey} onSubmit={handleSubmit} className="mt-12 space-y-8" noValidate>

            {/* 1. Personal Info */}
            <FormSection number="01" icon={User} title="Personal Information" description="Tell us who you are.">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Full Name"
                  required
                  value={formData.fullName}
                  onChange={(v) => updateField("fullName", v)}
                  error={submitted ? errors.fullName : undefined}
                  placeholder="e.g. Ayesha Khan"
                />
                <FileField
                  label="Profile Photo"
                  required
                  icon={Upload}
                  accept="image/*"
                  fileName={photoName}
                  onFile={(file) => { setPhotoFile(file); if (file) setErrors((p) => { const n = { ...p }; delete n.photo; return n; }); }}
                  error={submitted ? errors.photo : undefined}
                  hint="JPG or PNG · Square photo recommended"
                />
                <SelectField
                  label="Gender"
                  required
                  value={formData.gender}
                  onChange={(v) => updateField("gender", v)}
                  error={submitted ? errors.gender : undefined}
                  options={["Male", "Female"]}
                />
                <Field
                  label="Nationality"
                  required
                  value={formData.nationality}
                  onChange={(v) => updateField("nationality", v)}
                  error={submitted ? errors.nationality : undefined}
                  placeholder="e.g. Pakistani"
                />
                <Field
                  label="Country of Residence"
                  required
                  value={formData.countryOfResidence}
                  onChange={(v) => updateField("countryOfResidence", v)}
                  error={submitted ? errors.countryOfResidence : undefined}
                  placeholder="e.g. United Kingdom"
                />
                <Field
                  label="City"
                  required
                  value={formData.city}
                  onChange={(v) => updateField("city", v)}
                  error={submitted ? errors.city : undefined}
                  placeholder="e.g. London"
                />
                <Field
                  label="Languages Spoken"
                  required
                  value={formData.languages}
                  onChange={(v) => updateField("languages", v)}
                  error={submitted ? errors.languages : undefined}
                  placeholder="e.g. English, Urdu"
                  className="sm:col-span-2"
                />
                <FileField
                  label="National ID / CNIC — Front"
                  required
                  icon={Upload}
                  accept="image/*"
                  fileName={cnicFrontName}
                  onFile={(file) => { setCnicFrontFile(file); if (file) setErrors((p) => { const n = { ...p }; delete n.cnicFront; return n; }); }}
                  error={submitted ? errors.cnicFront : undefined}
                  hint="JPG, PNG or WebP · Admin verification only, kept private"
                />
                <FileField
                  label="National ID / CNIC — Back"
                  required
                  icon={Upload}
                  accept="image/*"
                  fileName={cnicBackName}
                  onFile={(file) => { setCnicBackFile(file); if (file) setErrors((p) => { const n = { ...p }; delete n.cnicBack; return n; }); }}
                  error={submitted ? errors.cnicBack : undefined}
                  hint="JPG, PNG or WebP · Admin verification only, kept private"
                />
              </div>
            </FormSection>


            {/* 2. Contact Information */}
            <FormSection number="02" icon={Mail} title="Contact Information" description="How the academy will reach you during recruitment.">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Email Address"
                  required
                  type="email"
                  value={formData.email}
                  onChange={(v) => updateField("email", v)}
                  error={submitted ? errors.email : undefined}
                  placeholder="you@example.com"
                />
                <PhoneField
                  label="Mobile Number"
                  required
                  value={formData.mobile}
                  onChange={(v) => updateField("mobile", v)}
                  error={submitted ? errors.mobile : undefined}
                  placeholder="Mobile number"
                />
                <PhoneField
                  label="WhatsApp Number"
                  required
                  value={formData.whatsapp}
                  onChange={(v) => updateField("whatsapp", v)}
                  error={submitted ? errors.whatsapp : undefined}
                  placeholder="WhatsApp number"
                />

                <div>
                  <label className="text-sm font-semibold text-ink">
                    Preferred Contact Method <span className="text-primary">*</span>
                  </label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {([
                      { v: "Email", Icon: Mail },
                      { v: "WhatsApp", Icon: Phone },
                      { v: "Phone", Icon: Phone },
                    ] as const).map(({ v, Icon }) => {
                      const active = preferredContact === v;
                      return (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setPreferredContact(v)}
                          className={`h-11 px-3 rounded-lg border text-sm font-medium inline-flex items-center justify-center gap-1.5 transition-colors ${
                            active
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-surface-2 text-ink border-border hover:border-primary/60"
                          }`}
                        >
                          <Icon className="h-4 w-4" /> {v}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </FormSection>

            {/* 3. Professional Info */}
            <FormSection number="03" icon={Briefcase} title="Professional Information" description="Your teaching background at a glance.">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Professional Title"
                  required
                  value={formData.professionalTitle}
                  onChange={(v) => updateField("professionalTitle", v)}
                  error={submitted ? errors.professionalTitle : undefined}
                  placeholder="e.g. Senior A Level Physics Tutor"
                  className="sm:col-span-2"
                />
                <SelectField
                  label="Teaching Experience"
                  required
                  value={formData.teachingExperience}
                  onChange={(v) => updateField("teachingExperience", v)}
                  error={submitted ? errors.teachingExperience : undefined}
                  options={["Less than 1 Year", "1–3 Years", "3–5 Years", "5–10 Years", "10+ Years"]}
                />
                <Field
                  label="Current Occupation"
                  required
                  value={formData.currentOccupation}
                  onChange={(v) => updateField("currentOccupation", v)}
                  error={submitted ? errors.currentOccupation : undefined}
                  placeholder="e.g. Full-time Tutor / School Teacher"
                />
              </div>
            </FormSection>

            {/* 4. Education */}
            <FormSection number="04" icon={GraduationCap} title="Educational Qualifications" description="Your highest completed qualification.">
              <div className="grid sm:grid-cols-2 gap-4">
                <SelectField
                  label="Highest Qualification"
                  required
                  value={formData.highestQualification}
                  onChange={(v) => updateField("highestQualification", v)}
                  error={submitted ? errors.highestQualification : undefined}
                  options={["Bachelor's", "Master's", "MPhil", "Doctorate (PhD)"]}
                />
                <Field
                  label="Degree Title"
                  required
                  value={formData.degreeTitle}
                  onChange={(v) => updateField("degreeTitle", v)}
                  error={submitted ? errors.degreeTitle : undefined}
                  placeholder="e.g. MSc Physics"
                />
                <Field
                  label="Institution Name"
                  required
                  value={formData.institution}
                  onChange={(v) => updateField("institution", v)}
                  error={submitted ? errors.institution : undefined}
                  placeholder="e.g. Punjab University"
                />
                <Field
                  label="Graduation Year"
                  required
                  value={formData.graduationYear}
                  onChange={(v) => updateField("graduationYear", v)}
                  error={submitted ? errors.graduationYear : undefined}
                  placeholder="e.g. 2016"
                />
              </div>
            </FormSection>

            {/* 5. Subjects */}
            <FormSection number="05" icon={Layers} title="Teaching Subjects" description="Search and add every subject you teach.">
              <div>
                <label className="text-sm font-semibold text-ink">
                  Subjects You Teach <span className="text-primary">*</span>
                </label>
                <div className="mt-2 card-surface p-3">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {selectedSubjects.length === 0 && (
                      <span className="text-xs text-muted-foreground py-1.5">No subjects added yet.</span>
                    )}
                    {selectedSubjects.map((s) => (
                      <Tag key={s} label={s} onRemove={() => { toggle(selectedSubjects, s, setSelectedSubjects); setErrors((p) => { const n = { ...p }; delete n.subjects; return n; }); }} />
                    ))}
                  </div>
                  <input
                    value={subjectQuery}
                    onChange={(e) => setSubjectQuery(e.target.value)}
                    placeholder="Search subjects…"
                    className="w-full h-10 px-3 rounded-lg border border-border bg-surface-2 text-sm ring-focus focus:bg-surface focus:border-primary"
                  />
                  {subjectQuery && subjectMatches.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {subjectMatches.slice(0, 8).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => { toggle(selectedSubjects, s, setSelectedSubjects); setSubjectQuery(""); setErrors((p) => { const n = { ...p }; delete n.subjects; return n; }); }}
                          className="text-xs px-2.5 py-1 rounded-full bg-primary-soft text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          + {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <FieldError message={chipError("subjects")} />
              </div>
            </FormSection>

            {/* 6. Grade Levels */}
            <FormSection number="06" icon={Users} title="Grade Levels" description="Select every level you can teach.">
              <label className="text-sm font-semibold text-ink">
                Grade Levels <span className="text-primary">*</span>
              </label>
              <div className="mt-2">
                <ChipGrid
                  options={gradeLevelOptions}
                  selected={selectedGrades}
                  onToggle={(v) => { toggle(selectedGrades, v, setSelectedGrades); setErrors((p) => { const n = { ...p }; delete n.grades; return n; }); }}
                />
              </div>
              <FieldError message={chipError("grades")} />
            </FormSection>

            {/* 7. Curriculum */}
            <FormSection number="07" icon={Award} title="Curriculum Expertise" description="Select every board or curriculum you teach.">
              <label className="text-sm font-semibold text-ink">
                Curriculum Expertise <span className="text-primary">*</span>
              </label>
              <div className="mt-2 space-y-5">
                {Object.entries(curriculumGroups).map(([group, items]) => (
                  <div key={group}>
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-primary mb-2">{group}</div>
                    <ChipGrid
                      options={items}
                      selected={selectedCurricula}
                      onToggle={(v) => { toggle(selectedCurricula, v, setSelectedCurricula); setErrors((p) => { const n = { ...p }; delete n.curricula; return n; }); }}
                    />
                  </div>
                ))}
              </div>
              <FieldError message={chipError("curricula")} />
            </FormSection>

            {/* 8. Profile */}
            <FormSection number="08" icon={Sparkles} title="Teacher Profile" description="Introduce yourself to prospective families.">

              <div className="space-y-5">
                <TextArea
                  label="Short Bio"
                  required
                  value={formData.bio}
                  onChange={(v) => updateField("bio", v)}
                  error={submitted ? errors.bio : undefined}
                  hint="200–500 words"
                  placeholder="A short professional biography — your background, experience and what makes your teaching stand out."
                  rows={5}
                />
                <TextArea
                  label="Teaching Methodology"
                  required
                  value={formData.methodology}
                  onChange={(v) => updateField("methodology", v)}
                  error={submitted ? errors.methodology : undefined}
                  hint="Describe your approach"
                  placeholder="How do you structure lessons? What frameworks and tools do you use? How do you measure progress?"
                  rows={5}
                />
              </div>
            </FormSection>

            {/* 10. Verification */}
            <FormSection number="09" icon={FileText} title="Verification" description="Upload your CV so we can verify your qualifications.">
              <FileField
                label="CV / Resume"
                required
                icon={Upload}
                accept=".pdf,.doc,.docx"
                fileName={cvName}
                onFile={(file) => { setCvFile(file); if (file) setErrors((p) => { const n = { ...p }; delete n.cv; return n; }); }}
                error={submitted ? errors.cv : undefined}
                hint="PDF or DOC · Max 5MB"
              />
            </FormSection>

            {/* 11. Declaration */}
            <FormSection number="10" icon={ShieldCheck} title="Declaration" description="Final confirmation before submission.">
              <label className={`flex gap-3 items-start cursor-pointer card-surface p-4 ${submitted && !agreed ? "border-destructive/60 bg-destructive/5" : ""}`}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-5 w-5 rounded border-border text-primary focus:ring-primary shrink-0"
                />
                <span className="text-sm text-foreground/85 leading-relaxed">
                  I confirm that all the information provided is accurate and understand that my application will be reviewed before approval.
                  <span className="text-primary"> *</span>
                </span>
              </label>
              <FieldError message={submitted && !agreed ? "Please confirm the declaration to proceed." : undefined} />
            </FormSection>

            <div className="pt-4">
              {errors.submit && (
                <div className="mb-4 p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-medium">
                  {errors.submit}
                </div>
              )}
              <button
                type="submit"
                disabled={busy}
                className="btn-primary w-full sm:w-auto disabled:opacity-60"
              >
                {busy ? "Submitting…" : "Submit Application"} <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-4 text-sm text-muted-foreground">
                Prefer email? Write to{" "}
                <a className="text-primary font-medium" href="mailto:info@thebestscienceacademy.com">
                  info@thebestscienceacademy.com
                </a>
              </p>
            </div>

          </form>

          <div className="mt-14 text-center">
            <Link to="/" className="btn-ghost">Back to home</Link>
          </div>
        </div>
      </section>

      {showSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4" onClick={() => setShowSuccess(false)}>
          <div className="w-full max-w-md card-surface p-8 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto h-14 w-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="mt-5 font-[var(--font-display)] font-bold text-xl text-ink">Application submitted</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you — your application has been received. Our recruitment team will review your details and get back to you within 5 working days.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => setShowSuccess(false)}
                className="btn-ghost"
              >
                Start a new application
              </button>
              <Link to="/" className="btn-primary">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>

  );
}

/* ---------------- Form primitives ---------------- */

function FormSection({
  number, icon: Icon, title, description, children,
}: {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-surface p-6 lg:p-8">
      <div className="flex items-start gap-4 pb-5 mb-5 border-b border-border/70">
        <div className="h-11 w-11 shrink-0 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-primary">Step {number}</div>
          <h3 className="font-[var(--font-display)] font-semibold text-ink text-lg">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs font-medium text-destructive flex items-center gap-1" data-error="true">
      <span className="inline-block h-1 w-1 rounded-full bg-destructive" /> {message}
    </p>
  );
}

function Field({
  label, required, type = "text", value, onChange, error, placeholder, className = "",
}: { label: string; required?: boolean; type?: string; value: string; onChange: (v: string) => void; error?: string; placeholder?: string; className?: string }) {
  return (
    <div className={className} data-error={error ? "true" : undefined}>
      <label className="text-sm font-semibold text-ink">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className={`mt-2 w-full h-11 px-4 rounded-lg border bg-surface-2 text-sm ring-focus focus:bg-surface focus:border-primary transition-colors ${
          error ? "border-destructive/70 focus:border-destructive" : "border-border"
        }`}
      />
      <FieldError message={error} />
    </div>
  );
}

function SelectField({
  label, required, value, onChange, error, options, className = "",
}: { label: string; required?: boolean; value: string; onChange: (v: string) => void; error?: string; options: string[]; className?: string }) {
  return (
    <div className={className} data-error={error ? "true" : undefined}>
      <label className="text-sm font-semibold text-ink">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`mt-2 w-full h-11 px-4 rounded-lg border bg-surface-2 text-sm font-medium ring-focus appearance-none focus:bg-surface focus:border-primary transition-colors ${
          error ? "border-destructive/70 focus:border-destructive" : "border-border"
        }`}
      >
        <option value="">Select {label.toLowerCase()}…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <FieldError message={error} />
    </div>
  );
}

function TextArea({
  label, required, value, onChange, error, hint, placeholder, rows = 4,
}: { label: string; required?: boolean; value: string; onChange: (v: string) => void; error?: string; hint?: string; placeholder?: string; rows?: number }) {
  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
  return (
    <div data-error={error ? "true" : undefined}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-ink">
          {label} {required && <span className="text-primary">*</span>}
        </label>
        {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
      </div>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className={`mt-2 w-full px-4 py-3 rounded-xl border bg-surface-2 text-sm ring-focus focus:bg-surface focus:border-primary transition-colors ${
          error ? "border-destructive/70 focus:border-destructive" : "border-border"
        }`}
      />
      <div className="mt-1.5 flex items-center justify-between">
        <FieldError message={error} />
        <span className="text-[11px] text-muted-foreground">{wordCount} words</span>
      </div>
    </div>
  );
}

function FileField({
  label, required, icon: Icon, accept, fileName, onFile, error, hint,
}: {
  label: string; required?: boolean; icon: React.ComponentType<{ className?: string }>;
  accept?: string; fileName: string | null; onFile: (file: File | null) => void; error?: string; hint?: string;
}) {
  return (
    <div data-error={error ? "true" : undefined}>
      <label className="text-sm font-semibold text-ink">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <label className={`mt-2 flex items-center gap-3 cursor-pointer rounded-xl border border-dashed bg-surface-2 p-4 hover:bg-surface hover:border-primary transition-colors ${
        error ? "border-destructive/70" : "border-border"
      }`}>
        <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center shrink-0">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className={`text-sm font-medium truncate ${error ? "text-destructive" : "text-ink"}`}>
            {fileName ?? `Click to upload ${label.toLowerCase()}`}
          </div>
          {hint && <div className="text-[11px] text-muted-foreground mt-0.5">{hint}</div>}
        </div>
        <input
          type="file"
          accept={accept}
          required={required && !fileName}
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
      </label>
      <FieldError message={error} />
    </div>
  );
}

function ChipGrid({
  options, selected, onToggle,
}: { options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = selected.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all ${
              active
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-surface-2 text-ink border-border hover:border-primary/50 hover:text-primary"
            }`}
          >
            {active && <CheckCircle2 className="h-3 w-3" />}
            {o}
          </button>
        );
      })}
    </div>
  );
}

function Tag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold pl-3 pr-1 py-1">
      {label}
      <button type="button" onClick={onRemove} className="h-5 w-5 rounded-full hover:bg-white/20 flex items-center justify-center">
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

/* Unused-import guard — keeps lucide imports intentional if refactored */
void MapPin; void LangIcon;
