import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Atom, FlaskConical, Leaf, BookOpen, Code2, Briefcase, LineChart, Sigma, Calculator, Infinity as InfIcon, Languages, Moon, Scale, HeartPulse, Brain, Landmark, Map as MapIcon, MessageSquare, Users } from "lucide-react";
import { SiteLayout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { subjects } from "@/lib/site-data";

export const Route = createFileRoute("/subjects")({
  head: () => ({
    meta: [
      { title: "Subjects — The Best Science Academy" },
      { name: "description", content: "Specialist online tuition across Mathematics, Physics, Chemistry, Biology, English and more." },
      { property: "og:title", content: "Subjects" },
      { property: "og:description", content: "Specialist online tutors across 12+ subjects." },
    ],
  }),
  component: SubjectsPage,
});

const icons: Record<string, typeof Atom> = {
  Sigma, Atom, FlaskConical, Leaf, BookOpen, Code2, Briefcase, LineChart, Calculator, Infinity: InfIcon, Languages, Moon,
  Scale, HeartPulse, Brain, Landmark, Map: MapIcon, MessageSquare, Users,
};

function SubjectsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Subjects"
        title="Specialist tutors for every subject we offer."
        description="Each tutor is matched to their strongest subject area and exam board — no generalists, no compromise."
      />

      <section className="section">
        <div className="container-page grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((s) => {
            const Icon = icons[s.icon] ?? Atom;
            return (
              <div key={s.name} className="card-surface card-surface-hover p-7 group">
                <div className="h-12 w-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center group-hover:bg-gold group-hover:text-gold-foreground transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 heading-md">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Structured curriculum coverage with past-paper practice, exam strategy and one-to-one mentoring.
                </p>

                <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-2 rounded-lg bg-surface-2">
                    <div className="font-bold text-primary">Topics</div>
                    <div className="mt-0.5 text-muted-foreground">Full syllabus</div>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-2">
                    <div className="font-bold text-primary">Exam Prep</div>
                    <div className="mt-0.5 text-muted-foreground">Past papers</div>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-2">
                    <div className="font-bold text-primary">Tutors</div>
                    <div className="mt-0.5 text-muted-foreground">100+ available</div>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <Link to="/tutors" className="btn-ghost flex-1 !py-2.5 text-sm">Available Tutors</Link>
                  <Link to="/contact" className="btn-primary flex-1 !py-2.5 text-sm">Book Trial <ArrowRight className="h-3.5 w-3.5" /></Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
