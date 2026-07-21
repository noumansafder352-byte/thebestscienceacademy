import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { curriculums, curriculumComparison } from "@/lib/site-data";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs & Curriculums — The Best Science Academy" },
      { name: "description", content: "Expert one-to-one tuition for IGCSE, O Level, A Level, IB, AQA, Edexcel, LRN and FBISE." },
      { property: "og:title", content: "Programs & Curriculums" },
      { property: "og:description", content: "Every major international curriculum, expertly taught." },
    ],
  }),
  component: ProgramsPage,
});

const ALL_SUBJECTS = [
  "Mathematics", "Additional Mathematics", "Mathematics Communication",
  "Physics", "Chemistry", "Biology", "English", "Urdu",
  "Computer Science", "ICT", "Economics", "Business Studies", "Accounting",
  "Law", "Sociology", "Psychology", "Physiology", "History", "Geography",
];

const overviewFor: Record<string, { overview: string; subjects: string[]; who: string }> = {
  IGCSE: { overview: "The world's most popular international qualification for 14–16 year olds.", subjects: ALL_SUBJECTS, who: "Students in Years 10–11 preparing for Cambridge IGCSE exams." },
  OLEVEL: { overview: "A globally recognised secondary qualification trusted by employers and universities.", subjects: ALL_SUBJECTS, who: "Students in Grades 9–10 taking Cambridge O Level exams." },
  ALEVEL: { overview: "Rigorous university-entry preparation with subject depth that admissions teams respect.", subjects: ALL_SUBJECTS, who: "Students in Years 12–13 aiming for top universities." },
  IB: { overview: "International Baccalaureate Middle Years and Diploma Programme tutoring at HL and SL.", subjects: ALL_SUBJECTS, who: "IB MYP and DP students worldwide." },
  AQA: { overview: "UK-based GCSE and A Level support across all major AQA specifications.", subjects: ALL_SUBJECTS, who: "Students sitting AQA GCSE or A Level papers." },
  EDEXCEL: { overview: "Pearson Edexcel International GCSE and A Level coverage with past-paper precision.", subjects: ALL_SUBJECTS, who: "Edexcel International students worldwide." },
  LRN: { overview: "Learning Resource Network qualifications taught by specification-trained tutors.", subjects: ALL_SUBJECTS, who: "LRN registered students." },
  FBISE: { overview: "Federal Board of Pakistan curriculum for overseas Pakistani families.", subjects: ALL_SUBJECTS, who: "Overseas Pakistani students sitting FBISE exams." },
};

function ProgramsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Programs"
        title="Every major international curriculum, expertly taught."
        description="Choose your exam board and we'll match you with a specialist who knows it inside out."
      >
        <Link to="/contact" className="btn-primary">Book Free Trial <ArrowRight className="h-4 w-4" /></Link>
        <Link to="/tutors" className="btn-ghost">Find Tutors</Link>
      </PageHeader>

      <section className="section">
        <div className="container-page grid md:grid-cols-2 gap-6">
          {curriculums.map((c) => {
            const info = overviewFor[c.code];
            return (
              <div key={c.code} className="card-surface card-surface-hover p-7">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-primary-soft text-primary flex items-center justify-center font-[var(--font-display)] font-bold">
                    {c.code.slice(0, 2)}
                  </div>
                  <h3 className="heading-md">{c.name}</h3>
                </div>
                <p className="mt-5 text-muted-foreground leading-relaxed">{info.overview}</p>

                <SubjectList subjects={info.subjects} />

                <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-surface-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground/80"><span className="font-semibold">Who it's for:</span> {info.who}</p>
                </div>

                <Link to="/contact" className="btn-primary mt-7 w-full">
                  Book Trial <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section bg-surface border-y border-border">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="eyebrow">Compare</span>
            <h2 className="heading-lg mt-3">Curriculum comparison at a glance.</h2>
            <p className="mt-4 text-muted-foreground">A quick side-by-side overview of the major exam boards we teach.</p>
          </div>
          <div className="mt-10 card-surface overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                  <th className="py-4 px-5 font-semibold">Curriculum</th>
                  <th className="py-4 px-5 font-semibold">Age</th>
                  <th className="py-4 px-5 font-semibold">Level</th>
                  <th className="py-4 px-5 font-semibold">Popular in</th>
                  <th className="py-4 px-5 font-semibold">Subjects</th>
                  <th className="py-4 px-5 font-semibold">Exam style</th>
                </tr>
              </thead>
              <tbody>
                {curriculumComparison.map((row) => (
                  <tr key={row.name} className="border-b border-border last:border-0 hover:bg-surface-2">
                    <td className="py-4 px-5 font-semibold text-ink">{row.name}</td>
                    <td className="py-4 px-5 text-muted-foreground">{row.ages}</td>
                    <td className="py-4 px-5 text-muted-foreground">{row.level}</td>
                    <td className="py-4 px-5 text-muted-foreground">{row.countries}</td>
                    <td className="py-4 px-5 text-muted-foreground">{row.subjects}</td>
                    <td className="py-4 px-5 text-muted-foreground">{row.exam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function SubjectList({ subjects }: { subjects: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const INITIAL = 5;
  const canToggle = subjects.length > INITIAL;
  const visible = expanded || !canToggle ? subjects : subjects.slice(0, INITIAL);
  return (
    <div className="mt-6">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subjects</div>
      <div
        className="mt-3 flex flex-wrap gap-1.5 overflow-hidden transition-all duration-300 ease-out"
      >
        {visible.map((s) => (
          <span key={s} className="chip animate-fade-up">{s}</span>
        ))}
      </div>
      {canToggle && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          {expanded ? (
            <>View less <ChevronUp className="h-4 w-4" /></>
          ) : (
            <>View more <ChevronDown className="h-4 w-4" /></>
          )}
        </button>
      )}
    </div>
  );
}
