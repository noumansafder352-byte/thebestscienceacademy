import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import {
  ArrowRight, Award, BookOpen, Calendar, CheckCircle2, Clock,
  GraduationCap, Globe, Languages, MapPin, MessageSquare,
  ShieldCheck, Sparkles, Star, User, Video,
} from "lucide-react";
import { SiteLayout } from "@/components/layout";
import { CurriculumBadge, RatingPill, SubjectBadge } from "@/components/tutor-badges";
import { ReadMore } from "@/components/read-more";
import { getPublicTutorBySlug } from "@/lib/tutor-api.functions";
// Availability/Weekly Timetable section intentionally removed.

const tutorQuery = (slug: string, fn: any) =>
  queryOptions({
    queryKey: ["public-tutor", slug],
    queryFn: () => fn({ data: { slug } }),
  });

export const Route = createFileRoute("/tutors/$slug")({
  head: () => ({
    meta: [
      { title: "Tutor Profile — The Best Science Academy" },
      { name: "description", content: "Premium online tutor profile." },
    ],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-page section text-center">
        <h1 className="heading-lg">Tutor not found</h1>
        <p className="mt-3 text-muted-foreground">The tutor you're looking for doesn't exist.</p>
        <Link to="/tutors" className="btn-primary mt-6 inline-flex">Browse all tutors</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <div className="container-page section text-center">
        <h1 className="heading-lg">Something went wrong</h1>
        <Link to="/tutors" className="btn-primary mt-6 inline-flex">Back to tutors</Link>
      </div>
    </SiteLayout>
  ),
  component: TutorProfile,
});

function TutorProfile() {
  const { slug } = Route.useParams();
  const getFn = useServerFn(getPublicTutorBySlug);
  const { data: tutor } = useSuspenseQuery(tutorQuery(slug, getFn));

  if (!tutor) throw notFound();

  const t: any = tutor;
  const languages: string[] = t.languages ?? [];
  const subjects: string[] = t.subjects ?? [];
  const curriculums: string[] = t.curriculums ?? [];
  const gradeLevels: string[] = t.grade_levels ?? [];
  const education: any[] = Array.isArray(t.education) ? t.education : [];

  return (
    <SiteLayout>
      <div className="overflow-x-hidden">
      <section className="relative bg-gradient-to-b from-primary-soft/60 via-surface to-background border-b border-border/70">
        <div className="container-page pt-14 pb-14 lg:pt-20 lg:pb-20 grid lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] gap-10 items-start">
          <div className="card-surface overflow-hidden shadow-lift w-full max-w-full min-w-0 mx-auto lg:mx-0" style={{ maxWidth: '340px' }}>
            <div className="aspect-square overflow-hidden bg-primary-soft">
              {t.photo_url ? (
                <img src={t.photo_url} alt={t.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-primary text-6xl font-bold">
                  {t.name?.[0] ?? "T"}
                </div>
              )}
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <RatingPill rating={Number(t.rating ?? 5)} reviews={t.reviews ?? 0} />
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <MiniStat label="Experience" value={t.experience ?? "—"} />
                <MiniStat label="Pass Rate" value="98%" />
                <MiniStat label="Re-bookings" value="92%" />
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <Link to="/tutors" className="text-xs uppercase tracking-[0.18em] font-semibold text-primary">← All tutors</Link>
            <h1 className="heading-xl mt-3 break-words">{t.name}</h1>
            <p className="mt-3 text-lg text-primary font-semibold break-words">{t.title}</p>
            {t.qualification && <p className="mt-2 text-muted-foreground break-words">{t.qualification}</p>}

            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              {t.experience && <span className="chip"><GraduationCap className="h-3.5 w-3.5" /> {t.experience} experience</span>}
              {(t.city || t.country) && <span className="chip"><MapPin className="h-3.5 w-3.5" /> {[t.city, t.country].filter(Boolean).join(", ")}</span>}
              {t.timezone && <span className="chip"><Clock className="h-3.5 w-3.5" /> {t.timezone}</span>}
              {languages.length > 0 && <span className="chip"><Languages className="h-3.5 w-3.5" /> {languages.join(", ")}</span>}
            </div>

            {curriculums.length > 0 && (
              <div className="mt-6">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Curriculum expertise</div>
                <div className="flex flex-wrap gap-1.5">
                  {curriculums.map((c) => <CurriculumBadge key={c} label={c} />)}
                </div>
              </div>
            )}

            {subjects.length > 0 && (
              <div className="mt-4">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Subjects taught</div>
                <div className="flex flex-wrap gap-1.5">
                  {subjects.map((s) => <SubjectBadge key={s} label={s} />)}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Book Free Trial <ArrowRight className="h-4 w-4" /></Link>
              <a href="#about" className="btn-ghost">Read full profile</a>
            </div>
          </div>
        </div>
      </section>


      <section id="about" className="section">
        <div className="container-page grid lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] gap-8 lg:gap-12">

          <div className="space-y-14">
            {t.bio && (
              <Block eyebrow="About this tutor" icon={BookOpen} title="Biography">
                <div className="card-surface p-6 sm:p-8 shadow-sm max-w-[75ch]">
                  <ReadMore text={t.bio} collapsedLines={8} />
                </div>
              </Block>
            )}

            {education.length > 0 && (
              <Block eyebrow="Education" icon={GraduationCap} title="Educational qualifications">
                <div className="grid sm:grid-cols-2 gap-4">
                  {education.map((ed, i) => (
                    <div key={i} className="card-surface p-5">
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-primary">{ed.qualification}</div>
                      <div className="mt-1.5 font-semibold text-ink">{ed.degree}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{ed.institution}</div>
                      {ed.year && <div className="mt-2 text-xs text-muted-foreground inline-flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" /> Graduated {ed.year}
                      </div>}
                    </div>
                  ))}
                </div>
              </Block>
            )}

            <Block eyebrow="Expertise" icon={Award} title="Subjects & curricula">
              <div className="grid sm:grid-cols-2 gap-4">
                {subjects.length > 0 && <PillGroup title="Subjects Taught">{subjects.map((s) => <SubjectBadge key={s} label={s} />)}</PillGroup>}
                {curriculums.length > 0 && <PillGroup title="Curriculum Expertise">{curriculums.map((c) => <CurriculumBadge key={c} label={c} />)}</PillGroup>}
                {gradeLevels.length > 0 && <PillGroup title="Grade Levels">{gradeLevels.map((g) => <SubjectBadge key={g} label={g} />)}</PillGroup>}
                {languages.length > 0 && <PillGroup title="Languages Spoken">{languages.map((l) => <SubjectBadge key={l} label={l} />)}</PillGroup>}
              </div>
            </Block>

            {t.methodology && (
              <Block eyebrow="Approach" icon={MessageSquare} title="Teaching methodology">
                <div className="card-surface p-6 sm:p-8 shadow-sm max-w-[75ch]">
                  <ReadMore text={t.methodology} collapsedLines={8} />
                </div>
                <div className="mt-5 grid sm:grid-cols-2 gap-3">
                  {[
                    { icon: Video, tx: "Recorded live classes on smart whiteboard" },
                    { icon: Award, tx: "Mark-scheme aligned exam strategy" },
                    { icon: MessageSquare, tx: "Between-class WhatsApp support" },
                    { icon: CheckCircle2, tx: "Monthly written progress report" },
                  ].map((f) => (
                    <div key={f.tx} className="card-surface p-4 flex gap-3 items-start min-w-0">
                      <div className="h-9 w-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center shrink-0">
                        <f.icon className="h-4 w-4" />
                      </div>
                      <p className="text-sm text-ink font-medium leading-relaxed [overflow-wrap:anywhere]">{f.tx}</p>
                    </div>
                  ))}
                </div>
              </Block>
            )}


            <Block eyebrow="Verification" icon={ShieldCheck} title="Credentials verified by academy">
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                <VerifyRow icon={User} label="Identity verified" />
                <VerifyRow icon={GraduationCap} label="Qualifications verified" />
                <VerifyRow icon={Star} label="Demo class passed" />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Tutor CV and contact details are held privately by the academy.</p>
            </Block>
          </div>

          <aside className="lg:sticky lg:top-28 self-start space-y-5">
            <div className="card-surface p-6 shadow-lift">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trial session</div>
              <div className="mt-1 font-[var(--font-display)] text-3xl font-bold text-ink">Free</div>
              <p className="mt-2 text-sm text-muted-foreground">A 20-minute introduction with no obligation.</p>
              <Link to="/contact" className="btn-primary mt-5 w-full">Book Free Trial</Link>
              <Link to="/contact" className="btn-ghost mt-3 w-full">Message the academy</Link>
              <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm">
                <Row label="Response time" value="< 2 hours" />
                {t.nationality && <Row label="Nationality" value={t.nationality} />}
                {(t.city || t.country) && <Row label="Based in" value={[t.city, t.country].filter(Boolean).join(", ")} />}
                {t.timezone && <Row label="Time zone" value={t.timezone} />}
              </div>
            </div>

            <div className="card-surface p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" /> International focus
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Teaching students worldwide with flexible scheduling across major time zones.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Contact only through the academy
              </div>
            </div>
          </aside>
        </div>
      </section>
      </div>
    </SiteLayout>
  );
}


function Block({ eyebrow, icon: Icon, title, children }: { eyebrow: string; icon: any; title: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="eyebrow inline-flex items-center gap-1.5"><Icon className="h-3.5 w-3.5" /> {eyebrow}</span>
      <h2 className="heading-md mt-3">{title}</h2>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function PillGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card-surface p-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="mt-3 flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="font-semibold text-ink text-right truncate">{value}</span>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface-2 border border-border/70 p-2.5 text-center">
      <div className="font-[var(--font-display)] font-bold text-ink text-sm">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function VerifyRow({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500/20 font-semibold">
      <Icon className="h-3.5 w-3.5" /> {label}
    </div>
  );
}
