import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Eye, HeartHandshake, Sparkles, GraduationCap, ArrowRight, Globe2, BookOpen, ClipboardCheck, Route as RouteIcon, MonitorPlay, LineChart, Quote } from "lucide-react";
import GB from "country-flag-icons/react/3x2/GB";
import AE from "country-flag-icons/react/3x2/AE";
import AU from "country-flag-icons/react/3x2/AU";
import { SiteLayout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Best Science Academy" },
      { name: "description", content: "Our story, mission and methodology. Premium online tutoring for international students by qualified Pakistani educators." },
      { property: "og:title", content: "About The Best Science Academy" },
      { property: "og:description", content: "World-class online tutors for international students." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Compass, title: "Mission", body: "To make world-class one-to-one education accessible to ambitious international students, regardless of where they live." },
  { icon: Eye, title: "Vision", body: "A global academy of brilliant Pakistani educators powering the academic success of students in every continent." },
  { icon: HeartHandshake, title: "Core Values", body: "Integrity, academic rigour, empathy and an obsession with measurable student progress." },
];

const servedCountries = [
  { name: "United Kingdom", Flag: GB, code: "UK", subtitle: "Primary Student Region", note: "Supporting students across the UK with expert tuition for IGCSE, O/A Levels, IB, AQA, Edexcel, LRN, and other international curricula." },
  { name: "Middle East", Flag: AE, code: "UAE", subtitle: "Primary Student Region", note: "Helping students across the UAE and the wider Middle East through flexible live online classes delivered by expert Pakistani tutors." },
  { name: "Asia–Pacific", Flag: AU, code: "AU", subtitle: "Primary Student Region", note: "Serving students across Australia and neighbouring Asia-Pacific regions with personalised one-to-one online learning." },
];

const methodology = [
  { icon: ClipboardCheck, step: "01", title: "Diagnostic First", body: "A structured baseline assessment maps the student's exact position against their exam board." },
  { icon: RouteIcon, step: "02", title: "Custom Syllabus", body: "Your tutor designs a bespoke plan with weekly milestones, homework and revision cycles." },
  { icon: MonitorPlay, step: "03", title: "Live Smartboard Classes", body: "Interactive one-to-one sessions on our smart whiteboard — recorded and aligned with school timing." },
  { icon: LineChart, step: "04", title: "Monthly Reports", body: "Quantified, written progress reports sent to parents every month — no guesswork, no surprises." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About Us"
        title="A modern academy built around extraordinary teaching."
        description="We connect international families with the most talented Pakistani educators — delivering one-to-one academic support that's measurably more effective than the classroom."
      />

      {/* Our Story */}
      <section className="section">
        <div className="container-page grid lg:grid-cols-[1.05fr_1fr] gap-14 items-start">
          <div className="animate-fade-in-up">
            <span className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> Our Story</span>
            <h2 className="heading-lg mt-3">Founded by educators, for ambitious students worldwide.</h2>

            <div className="mt-8 space-y-6">
              <div className="relative pl-6 border-l-2 border-primary/25">
                <p className="text-base sm:text-lg leading-relaxed text-ink/85 font-medium">
                  Talent is universal — access to brilliant teachers is not.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  The Best Science Academy was founded on that single conviction. Today, we bridge the gap by recruiting from Pakistan's strongest universities and pairing those educators with international students preparing for the world's top exam boards.
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-secondary/30">
                <p className="text-base leading-relaxed text-ink/85 font-medium">
                  Consistent, measurable results.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Our students sit IGCSE, O Level, A Level, IB, AQA and Edexcel — and consistently outperform their school predictions.
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { k: "4,200+", v: "Students" },
                { k: "180+", v: "Tutors" },
                { k: "3", v: "Regions" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl border border-border/70 bg-white p-4 text-center shadow-soft">
                  <div className="text-xl sm:text-2xl font-bold text-primary font-[var(--font-display)]">{s.k}</div>
                  <div className="mt-1 text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fade-in-up" style={{ animationDelay: "120ms" }}>
            {values.map((v) => (
              <div key={v.title} className="card-surface card-surface-hover p-6">
                <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.body}</p>
              </div>
            ))}
            <div className="card-surface p-6 bg-primary text-white sm:col-span-2">
              <GraduationCap className="h-7 w-7 text-gold" />
              <h3 className="mt-3 font-semibold text-white">Why Pakistani Tutors</h3>
              <p className="mt-2 text-sm text-white/85 leading-relaxed">
                Pakistan's top universities produce remarkable subject specialists with strong English fluency, deep exam-board knowledge and a service mindset that translates into outstanding teaching outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Countries We Serve */}
      <section className="section relative overflow-hidden bg-surface border-y border-border">
        {/* subtle global background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.025] pointer-events-none select-none blur-[1px]">
          <svg viewBox="0 0 200 200" className="w-full h-full text-primary" fill="none" stroke="currentColor" strokeWidth="0.8">
            <circle cx="100" cy="100" r="90" />
            <ellipse cx="100" cy="100" rx="90" ry="36" />
            <ellipse cx="100" cy="100" rx="90" ry="72" />
            <ellipse cx="100" cy="100" rx="36" ry="90" />
            <ellipse cx="100" cy="100" rx="72" ry="90" />
            <line x1="10" y1="100" x2="190" y2="100" />
            <line x1="100" y1="10" x2="100" y2="190" />
          </svg>
        </div>
        <div className="container-page relative">
          <div className="max-w-2xl">
            <span className="eyebrow"><Globe2 className="h-3.5 w-3.5" /> Global Reach</span>
            <h2 className="heading-lg mt-3">Teaching Students Across the Globe</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We provide live online tuition to students around the world. While our strongest student communities are in the United Kingdom, the Middle East, and Australia, our expert tutors support learners globally across multiple international curricula and time zones.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servedCountries.map((c, i) => (
              <div
                key={c.code}
                className="group relative rounded-3xl bg-white border border-border/70 p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elegant animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute top-6 right-6 text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-muted-foreground group-hover:text-primary transition-colors">
                  {c.code}
                </div>
                <div className="w-20 h-auto rounded-sm overflow-hidden shadow-md ring-1 ring-border/40 bg-white transition-transform duration-300 group-hover:scale-105">
                  <c.Flag className="w-full h-auto" aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-[var(--font-display)] text-xl font-bold text-ink">{c.name}</h3>
                <p className="mt-1 text-xs font-semibold tracking-[0.15em] uppercase text-primary/80">{c.subtitle}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.note}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                  Active students
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mx-auto text-center">
            <span className="eyebrow justify-center"><BookOpen className="h-3.5 w-3.5" /> Our Methodology</span>
            <h2 className="heading-lg mt-3">Personalised. Structured. Accountable.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A four-step process built to turn ambition into measurable academic progress.
            </p>
          </div>

          <div className="mt-14 relative">
            <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {methodology.map((m, i) => (
                <div
                  key={m.step}
                  className="relative rounded-3xl bg-white border border-border/70 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elegant animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-elegant">
                    <m.icon className="h-6 w-6" />
                    <span className="absolute -top-2 -right-2 h-6 min-w-6 px-1.5 rounded-full bg-secondary text-white text-[0.65rem] font-bold flex items-center justify-center shadow-sm">
                      {m.step}
                    </span>
                  </div>
                  <h3 className="mt-5 font-[var(--font-display)] text-lg font-bold text-ink leading-snug">{m.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 rounded-3xl bg-primary text-white p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-elegant">
            <Quote className="h-10 w-10 text-gold shrink-0" />
            <p className="text-base sm:text-lg leading-relaxed text-white/90 flex-1">
              Every student begins with a diagnostic. From there, everything — the syllabus, the classes, the reports — is built around their goals.
            </p>
            <Link to="/contact" className="btn-gold shrink-0">
              Book Free Trial <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
