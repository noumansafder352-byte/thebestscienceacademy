import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search, Filter, Sparkles, Users2, Globe2, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { TutorCard } from "@/components/tutor-card";
import { listPublicTutors } from "@/lib/tutor-api.functions";

export const Route = createFileRoute("/tutors/")({
  head: () => ({
    meta: [
      { title: "Find Tutors — The Best Science Academy" },
      { name: "description", content: "Browse vetted online tutors for IGCSE, O Level, A Level, IB and more. Filter by subject, curriculum and experience." },
      { property: "og:title", content: "Find Tutors" },
      { property: "og:description", content: "Browse our vetted online tutors." },
    ],
    links: [{ rel: "canonical", href: "/tutors" }],
  }),
  component: TutorsPage,
});

const highlights = [
  { icon: Users2, label: "Vetted Tutors" },
  { icon: Globe2, label: "Global Students" },
  { icon: ShieldCheck, label: "Every Tutor Verified" },
  { icon: Sparkles, label: "Free 20-min Trial" },
];

function TutorsPage() {
  const listFn = useServerFn(listPublicTutors);
  const { data, isLoading } = useQuery({ queryKey: ["public-tutors"], queryFn: () => listFn() });
  const tutors = data ?? [];

  const [q, setQ] = useState("");
  const [curr, setCurr] = useState("All");
  const [subj, setSubj] = useState("All");

  const curriculumOptions = useMemo(() => ["All", ...new Set(tutors.flatMap((t: any) => t.curriculums ?? []))], [tutors]);
  const subjectOptions = useMemo(() => ["All", ...new Set(tutors.flatMap((t: any) => t.subjects ?? []))], [tutors]);

  const filtered = tutors.filter((t: any) => {
    if (q && !t.name.toLowerCase().includes(q.toLowerCase()) && !(t.qualification ?? "").toLowerCase().includes(q.toLowerCase()) && !(t.title ?? "").toLowerCase().includes(q.toLowerCase())) return false;
    if (curr !== "All" && !(t.curriculums ?? []).includes(curr)) return false;
    if (subj !== "All" && !(t.subjects ?? []).includes(subj)) return false;
    return true;
  });


  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Find Tutors"
        title="Meet your perfect tutor."
        description="Filter our vetted faculty by subject, curriculum and experience — then book a free trial in minutes."
      />

      <section className="section pt-10 lg:pt-14">
        <div className="container-page">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {highlights.map((h) => (
              <div key={h.label} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface px-4 py-3">
                <span className="h-8 w-8 rounded-lg bg-primary-soft text-primary flex items-center justify-center shrink-0">
                  <h.icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-ink">{h.label}</span>
              </div>
            ))}
          </div>

          <div className="card-surface p-4 lg:p-5 grid md:grid-cols-[1.6fr_1fr_1fr_auto] gap-2.5">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name, title or qualification…"
                className="w-full h-11 pl-10 pr-4 rounded-full border border-border bg-surface-2 text-sm ring-focus focus:bg-surface focus:border-primary"
              />
            </div>
            <Select label="Curriculum" value={curr} onChange={setCurr} options={curriculumOptions as string[]} />
            <Select label="Subject" value={subj} onChange={setSubj} options={subjectOptions as string[]} />
            <button className="btn-primary h-11 !py-0">
              <Filter className="h-4 w-4" /> Apply
            </button>
          </div>


          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-ink">{filtered.length}</span> of {tutors.length} tutors
            </p>
            <span className="hidden sm:inline text-xs text-muted-foreground">Sorted by top-rated</span>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((t: any) => (
              <TutorCard
                key={t.slug}
                tutor={{
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
                  availability: t.availability ?? "Available",
                } as any}
              />
            ))}
          </div>

          {!isLoading && filtered.length === 0 && (
            <div className="mt-16 text-center py-12 card-surface">
              <p className="text-ink font-semibold">
                {tutors.length === 0 ? "No tutors published yet." : "No tutors match those filters."}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {tutors.length === 0 ? "Check back soon — approved tutors will appear here." : "Try broadening the subject or curriculum."}
              </p>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 px-4 rounded-full border border-border bg-surface-2 text-sm font-medium ring-focus appearance-none focus:bg-surface focus:border-primary"
        aria-label={label}
      >
        {options.map((o) => <option key={o} value={o}>{label}: {o}</option>)}
      </select>
    </div>
  );
}
