import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowLeft, Save, Upload } from "lucide-react";
import {
  adminGetTutor,
  adminUpdateTutor,
} from "@/lib/tutor-api.functions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/tutors/$id/edit")({
  component: EditTutorPage,
});

const CURRICULA = ["IGCSE", "GCSE", "O Level", "A Level", "IB", "AP", "AQA", "Edexcel", "LRN", "UAE", "Saudi Arabia", "Qatar", "Bahrain", "Kuwait", "FBISE (Federal Board)", "Punjab Board", "CBSE", "ICSE", "Singapore"];
const GRADES = ["Primary", "Middle School", "High School", "College", "University", "Adults"];
const AVAIL_OPTIONS = ["Available", "Fully Booked", "Limited Availability"] as const;
const DAY_OPTIONS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOT_OPTIONS = ["Morning (9–12 PM)", "Afternoon (12–4 PM)", "Evening (4–8 PM)", "Night (8–11 PM)"];

function EditTutorPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const getFn = useServerFn(adminGetTutor);
  const updateFn = useServerFn(adminUpdateTutor);

  const { data: tutor, isLoading } = useQuery({
    queryKey: ["admin-tutor", id],
    queryFn: () => getFn({ data: { id } }),
  });

  const [form, setForm] = useState<any>(null);
  const [subjectsText, setSubjectsText] = useState("");
  const [languagesText, setLanguagesText] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (tutor && !form) {
      setForm({ ...tutor });
      setSubjectsText((tutor.subjects ?? []).join(", "));
      setLanguagesText((tutor.languages ?? []).join(", "));
    }
  }, [tutor, form]);

  const update = useMutation({
    mutationFn: (patch: any) => updateFn({ data: { id, patch } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-tutors"] });
      qc.invalidateQueries({ queryKey: ["admin-tutor", id] });
      qc.invalidateQueries({ queryKey: ["public-tutors"] });
      qc.invalidateQueries({ queryKey: ["public-tutor", tutor?.slug] });
    },
  });

  if (isLoading || !form) {
    return <div className="p-8 text-sm text-muted-foreground">Loading tutor…</div>;
  }
  if (!tutor) {
    return (
      <div className="p-8">
        <p className="text-sm text-muted-foreground">Tutor not found.</p>
        <Link to="/admin/tutors" className="btn-ghost mt-4">Back</Link>
      </div>
    );
  }

  const set = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));
  const toggleArr = (k: string, v: string) =>
    setForm((p: any) => {
      const arr: string[] = p[k] ?? [];
      return { ...p, [k]: arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v] };
    });

  const onSave = async () => {
    setSaving(true);
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
      const patch: any = {
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
        education: Array.isArray(form.education) ? form.education.filter((e: any) => e && (e.degree || e.institution || e.qualification || e.year)) : [],
        schedule: Array.isArray(form.schedule) ? form.schedule.filter((s: any) => s?.day && Array.isArray(s.slots) && s.slots.length > 0) : [],
        is_active: !!form.is_active,
        is_featured: !!form.is_featured,
        rating: Number.isFinite(Number(form.rating)) ? Math.max(0, Math.min(5, Number(form.rating))) : 5,
        reviews: Number.isFinite(Number(form.reviews)) ? Math.max(0, Math.floor(Number(form.reviews))) : 0,
        photo_url: photoPath,
      };
      await update.mutateAsync(patch);
      setPhotoFile(null);
      toast.success("Changes saved", {
        description: `${form.name || "This tutor"}'s profile has been updated.`,
      });
    } catch (e: any) {
      toast.error("Couldn't save changes", {
        description: e?.message ?? "Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <Link to="/admin/tutors" className="text-xs uppercase tracking-wider font-semibold text-primary inline-flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Tutors
          </Link>
          <h1 className="heading-md mt-2 truncate">Edit tutor</h1>
          <p className="mt-1 text-sm text-muted-foreground">Changes appear on the public profile immediately.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!form.is_active} onChange={(e) => set("is_active", e.target.checked)} className="h-4 w-4 rounded border-border" />
            Active on public site
          </label>
          <button onClick={onSave} disabled={saving} className="btn-primary disabled:opacity-60">
            <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>

      <Card title="Profile photo">
        <div className="flex items-center gap-4 flex-wrap">
          {tutor.photo_url_signed && !photoFile && (
            <img src={tutor.photo_url_signed} alt={tutor.name} className="h-20 w-20 rounded-xl object-cover" />
          )}
          {photoFile && (
            <div className="h-20 w-20 rounded-xl bg-primary-soft flex items-center justify-center text-xs text-primary font-semibold text-center px-2 break-all">
              {photoFile.name}
            </div>
          )}
          <label className="btn-ghost cursor-pointer !py-2 text-sm">
            <Upload className="h-4 w-4" /> Replace photo
            <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)} />
          </label>
          <p className="text-xs text-muted-foreground">JPG, PNG or WebP · Max 5MB</p>
        </div>
      </Card>

      <Card title="Personal information">
        <Grid>
          <Text label="Full name" value={form.name ?? ""} onChange={(v) => set("name", v)} />
          <Text label="Professional title" value={form.title ?? ""} onChange={(v) => set("title", v)} />
          <Select label="Gender" value={form.gender ?? ""} onChange={(v) => set("gender", v)} options={["Male", "Female"]} />
          <Text label="Nationality" value={form.nationality ?? ""} onChange={(v) => set("nationality", v)} />
          <Text label="Country" value={form.country ?? ""} onChange={(v) => set("country", v)} />
          <Text label="City" value={form.city ?? ""} onChange={(v) => set("city", v)} />
          <Text label="Timezone" value={form.timezone ?? ""} onChange={(v) => set("timezone", v)} />
          <Select label="Availability" value={form.availability ?? "Available"} onChange={(v) => set("availability", v)} options={AVAIL_OPTIONS as unknown as string[]} />
        </Grid>
      </Card>

      <Card title="Professional information">
        <Grid>
          <Text label="Qualification" value={form.qualification ?? ""} onChange={(v) => set("qualification", v)} />
          <Text label="Teaching experience" value={form.experience ?? ""} onChange={(v) => set("experience", v)} />
          <Text label="Subjects (comma-separated)" value={subjectsText} onChange={setSubjectsText} className="sm:col-span-2" />
          <Text label="Languages spoken (comma-separated)" value={languagesText} onChange={setLanguagesText} className="sm:col-span-2" />
        </Grid>
      </Card>

      <Card title="Ratings & visibility">
        <Grid>
          <div>
            <label className="text-sm font-semibold text-ink">Overall rating (0 – 5)</label>
            <input
              type="number" min={0} max={5} step={0.1}
              value={form.rating ?? 5}
              onChange={(e) => set("rating", e.target.value === "" ? "" : Number(e.target.value))}
              className="mt-2 w-full h-11 px-4 rounded-lg border border-border bg-surface-2 text-sm focus:bg-surface focus:border-primary"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink">Number of reviews</label>
            <input
              type="number" min={0} step={1}
              value={form.reviews ?? 0}
              onChange={(e) => set("reviews", e.target.value === "" ? "" : Number(e.target.value))}
              className="mt-2 w-full h-11 px-4 rounded-lg border border-border bg-surface-2 text-sm focus:bg-surface focus:border-primary"
            />
          </div>
          <label className="inline-flex items-center gap-2 text-sm sm:col-span-2 mt-1">
            <input
              type="checkbox"
              checked={!!form.is_featured}
              onChange={(e) => set("is_featured", e.target.checked)}
              className="h-4 w-4 rounded border-border"
            />
            <span className="font-medium text-ink">Featured / Top tutor</span>
            <span className="text-xs text-muted-foreground">— pinned to the top of Find Tutors</span>
          </label>
        </Grid>
      </Card>

      <Card title="Curriculum expertise">
        <ChipGrid options={CURRICULA} selected={form.curriculums ?? []} onToggle={(v) => toggleArr("curriculums", v)} />
      </Card>

      <Card title="Grade levels">
        <ChipGrid options={GRADES} selected={form.grade_levels ?? []} onToggle={(v) => toggleArr("grade_levels", v)} />
      </Card>

      <Card title="Weekly availability">
        <ScheduleEditor
          schedule={Array.isArray(form.schedule) ? form.schedule : []}
          onChange={(next) => set("schedule", next)}
        />
      </Card>

      <Card title="Educational qualifications">
        <EducationEditor
          items={Array.isArray(form.education) ? form.education : []}
          onChange={(next) => set("education", next)}
        />
      </Card>


      <Card title="Bio">
        <textarea
          rows={5}
          value={form.bio ?? ""}
          onChange={(e) => set("bio", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-border bg-surface-2 text-sm focus:bg-surface focus:border-primary"
        />
      </Card>

      <Card title="Teaching methodology">
        <textarea
          rows={5}
          value={form.methodology ?? ""}
          onChange={(e) => set("methodology", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-border bg-surface-2 text-sm focus:bg-surface focus:border-primary"
        />
      </Card>

      <div className="flex items-center justify-between gap-3 pt-2">
        <button onClick={() => navigate({ to: "/admin/tutors" })} className="btn-ghost">Cancel</button>
        <button onClick={onSave} disabled={saving} className="btn-primary disabled:opacity-60">
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card-surface p-6">
      <h2 className="font-[var(--font-display)] font-semibold text-ink text-lg mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 gap-4">{children}</div>;
}

function Text({ label, value, onChange, className = "" }: { label: string; value: string; onChange: (v: string) => void; className?: string }) {
  return (
    <div className={className}>
      <label className="text-sm font-semibold text-ink">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full h-11 px-4 rounded-lg border border-border bg-surface-2 text-sm focus:bg-surface focus:border-primary"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="text-sm font-semibold text-ink">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full h-11 px-4 rounded-lg border border-border bg-surface-2 text-sm font-medium focus:bg-surface focus:border-primary"
      >
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function ChipGrid({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = selected.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              active ? "bg-primary text-primary-foreground border-primary" : "bg-surface-2 text-ink border-border hover:border-primary/50"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

type ScheduleEntry = { day: string; slots: string[] };

function ScheduleEditor({ schedule, onChange }: { schedule: ScheduleEntry[]; onChange: (v: ScheduleEntry[]) => void }) {
  const norm = (d: string) => {
    const k = d.trim().toLowerCase();
    return DAY_OPTIONS.find((x) => x.toLowerCase() === k || k.startsWith(x.toLowerCase())) ?? null;
  };
  const bySlot = new Map<string, string[]>();
  for (const e of schedule ?? []) {
    const m = norm(e?.day ?? "");
    if (m) bySlot.set(m, Array.isArray(e.slots) ? e.slots : []);
  }
  const emit = (map: Map<string, string[]>) => {
    onChange(DAY_OPTIONS.filter((d) => (map.get(d) ?? []).length > 0).map((d) => ({ day: d, slots: map.get(d) ?? [] })));
  };
  const toggleSlot = (day: string, slot: string) => {
    const next = new Map(bySlot);
    const cur = next.get(day) ?? [];
    next.set(day, cur.includes(slot) ? cur.filter((s) => s !== slot) : [...cur, slot]);
    emit(next);
  };
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Select the days and time slots this tutor is available.</p>
      {DAY_OPTIONS.map((d) => {
        const slots = bySlot.get(d) ?? [];
        return (
          <div key={d} className="grid grid-cols-[64px_1fr] gap-3 items-start">
            <div className="text-sm font-semibold text-ink mt-2">{d}</div>
            <div className="flex flex-wrap gap-2">
              {SLOT_OPTIONS.map((s) => {
                const active = slots.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSlot(d, s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      active ? "bg-primary text-primary-foreground border-primary" : "bg-surface-2 text-ink border-border hover:border-primary/50"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

type EduItem = { qualification?: string; degree?: string; institution?: string; year?: string };

function EducationEditor({ items, onChange }: { items: EduItem[]; onChange: (v: EduItem[]) => void }) {
  const list = items.length ? items : [{ qualification: "", degree: "", institution: "", year: "" }];
  const update = (i: number, k: keyof EduItem, v: string) => {
    const next = list.map((it, idx) => (idx === i ? { ...it, [k]: v } : it));
    onChange(next);
  };
  const add = () => onChange([...list, { qualification: "", degree: "", institution: "", year: "" }]);
  const remove = (i: number) => onChange(list.filter((_, idx) => idx !== i));
  return (
    <div className="space-y-4">
      {list.map((it, i) => (
        <div key={i} className="grid sm:grid-cols-2 gap-3 p-4 rounded-xl border border-border bg-surface-2/50">
          <input placeholder="Qualification (e.g. Bachelor's)" value={it.qualification ?? ""} onChange={(e) => update(i, "qualification", e.target.value)} className="h-11 px-4 rounded-lg border border-border bg-surface text-sm" />
          <input placeholder="Degree / Subject" value={it.degree ?? ""} onChange={(e) => update(i, "degree", e.target.value)} className="h-11 px-4 rounded-lg border border-border bg-surface text-sm" />
          <input placeholder="Institution" value={it.institution ?? ""} onChange={(e) => update(i, "institution", e.target.value)} className="h-11 px-4 rounded-lg border border-border bg-surface text-sm" />
          <div className="flex gap-2">
            <input placeholder="Year" value={it.year ?? ""} onChange={(e) => update(i, "year", e.target.value)} className="flex-1 h-11 px-4 rounded-lg border border-border bg-surface text-sm" />
            {list.length > 1 && (
              <button type="button" onClick={() => remove(i)} className="btn-ghost !py-2 text-xs">Remove</button>
            )}
          </div>
        </div>
      ))}
      <button type="button" onClick={add} className="btn-ghost text-sm">+ Add qualification</button>
    </div>
  );
}

