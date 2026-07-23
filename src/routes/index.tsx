import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Sparkles, GraduationCap, Globe2, BadgeCheck,
  Atom, FlaskConical, Leaf, BookOpen, Code2, Briefcase, Sigma,
  Calculator, Infinity as InfIcon, Languages, Moon, Star, Quote, PlayCircle,
  ShieldCheck, Users, Trophy, LineChart, CheckCircle2,
  UserCheck, CalendarClock, Wallet, Video, FileBarChart, Target, MousePointerClick,
  Scale, HeartPulse, Brain, Landmark, Map as MapIcon, MessageSquare,
} from "lucide-react";
import { SiteLayout } from "@/components/layout";
import { Counter } from "@/components/counter";
import {
  curriculums, subjects, stats, whyChoose, howItWorks, testimonials,
} from "@/lib/site-data";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { listPublicTutors } from "@/lib/tutor-api.functions";
import { TutorCard } from "@/components/tutor-card";
import heroTutor from "@/assets/hero-tutor.jpg";
import igcseLogo from "@/assets/boards/igcse.png.asset.json";
import oalevelsLogo from "@/assets/boards/oalevels.png.asset.json";
import aqaLogo from "@/assets/boards/aqa.png.asset.json";
import edexcelLogo from "@/assets/boards/edexcel.png.asset.json";
import lrnLogo from "@/assets/boards/lrn.png.asset.json";
import ibLogo from "@/assets/boards/ib.png.asset.json";
import fbiseLogo from "@/assets/boards/fbise.png.asset.json";

// const curriculumLogoMap: Record<string, { url: string }> = {
//   IGCSE: igcseLogo,
//   OALEVEL: oalevelsLogo,
//   OLEVEL: oalevelsLogo,
//   ALEVEL: oalevelsLogo,
//   IB: ibLogo,
//   AQA: aqaLogo,
//   EDEXCEL: edexcelLogo,
//   LRN: lrnLogo,
//   FBISE: fbiseLogo,
// };

const curriculumLogoMap: Record<string, string> = {
  IGCSE: "/image/igcse.png",
  OALEVEL: "/image/oalevels.png",
  OLEVEL: "/image/oalevels.png",
  ALEVEL: "/image/oalevels.png",
  IB: "/image/ib.png",
  AQA: "/image/aqa.png",
  EDEXCEL: "/image/edexcel.png",
  LRN: "/image/lrn.png",
  FBISE: "/image/fbise.png",
};

// Home page curriculums merge O Level & A Level into a single card
const homeCurriculums = [
  { code: "IGCSE", name: "IGCSE", desc: "Cambridge International General Certificate, Grades 9–10.", color: "primary" },
  { code: "OALEVEL", name: "O/A Level", desc: "Cambridge O Level and A Level preparation for international students worldwide.", color: "primary" },
  { code: "IB", name: "IB", desc: "International Baccalaureate MYP & DP across HL and SL.", color: "primary" },
  { code: "AQA", name: "AQA", desc: "UK-based AQA GCSE & A Level specifications.", color: "primary" },
  { code: "EDEXCEL", name: "Edexcel", desc: "Pearson Edexcel International GCSE & A Levels.", color: "primary" },
  { code: "LRN", name: "LRN", desc: "Learning Resource Network international qualifications.", color: "primary" },
  { code: "FBISE", name: "FBISE", desc: "Federal Board curriculum for overseas Pakistani students.", color: "primary" },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Best Science Academy — World-Class Online Tutors for International Students" },
      { name: "description", content: "Premium online one-to-one tuition for IGCSE, O Level, A Level, IB, AQA & Edexcel — expert tutors for students in the UK, UAE, Australia, Europe and Asia." },
      { property: "og:title", content: "The Best Science Academy" },
      { property: "og:description", content: "World-class online tutors for international students." },
    ],
  }),
  component: HomePage,
});

const subjectIcons: Record<string, typeof Atom> = {
  Sigma, Atom, FlaskConical, Leaf, BookOpen, Code2, Briefcase, LineChart,
  Calculator, Infinity: InfIcon, Languages, Moon,
  Scale, HeartPulse, Brain, Landmark, Map: MapIcon, MessageSquare, Users,
};

const statIcons = [Users, GraduationCap, BookOpen, Globe2, Trophy];

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <Stats />
      <TrustBar />
      <Curriculums />
      <Subjects />
      <WhyChoose />
      <HowItWorks />
      <FeaturedTutors />
      <Testimonials />
      <FinalCTA />
    </SiteLayout>
  );
}

/* ----------------------------- HERO ----------------------------- */
function Hero() {
  return (
    <div className="relative -mt-32 gradient-hero">
      <section className="relative overflow-hidden pt-40 pb-32 md:pb-36 lg:pb-40">
      {/* Layered background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-grid-soft opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" />
      <div className="blob animate-blob h-[520px] w-[520px] bg-primary/35 -top-40 -left-40" />
      <div className="blob animate-blob h-[480px] w-[480px] bg-gold/35 -top-20 -right-32" style={{ animationDelay: "2.5s" }} />
      <div className="blob animate-blob h-[420px] w-[420px] bg-secondary/25 bottom-[-160px] left-1/3" style={{ animationDelay: "4s" }} />
      {/* world map suggestion */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="currentColor" />
          </pattern>
        </defs>
        <ellipse cx="600" cy="300" rx="560" ry="240" fill="url(#dots)" className="text-primary" />
      </svg>

      <div className="container-page relative grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        <div className="animate-fade-up">
          <span className="chip-gold">
            <Sparkles className="h-3.5 w-3.5" />
            Trusted by families in 32+ countries
          </span>
          <h1 className="heading-xl mt-5" style={{ fontSize: "clamp(2.25rem, 5vw, 4.25rem)" }}>
            World-class online tutors for{" "}
            <span className="gradient-text">international students</span>
            <span className="text-primary">.</span>
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Premium one-to-one tuition from outstanding educators — purpose-built for the UK, UAE, Australia, Europe and Asia. IGCSE, A Level, IB, AQA & Edexcel.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">
              Book Free Trial <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/tutors" className="btn-ghost">
              <PlayCircle className="h-4 w-4" /> Meet our tutors
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-primary" /> Vetted MSc & PhD educators</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> 100% safeguarding compliant</div>
            <div className="flex items-center gap-2"><Globe2 className="h-4 w-4 text-primary" /> All time zones</div>
          </div>
        </div>

        <div className="relative animate-fade-up lg:pl-4">
          {/* Ambient gradient halos */}
          <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-gold/30 blur-[80px] animate-blob" />
          <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-primary/25 blur-[90px] animate-blob" style={{ animationDelay: "3s" }} />
          <div className="absolute top-1/3 -right-10 h-44 w-44 rounded-full bg-secondary/20 blur-3xl" />


          {/* Main composition stage */}
          <div className="relative aspect-[5/6] max-w-[480px] mx-auto">

            {/* Image with gradient ring */}
            <div className="relative h-full w-full rounded-[2.25rem] p-[2px] bg-gradient-to-br from-primary via-gold to-secondary shadow-float">
              <div className="relative h-full w-full rounded-[2.1rem] overflow-hidden bg-surface">
                <img
                  src={heroTutor}
                  alt="Online tutor teaching an international student"
                  width={1280}
                  height={1536}
                  className="h-full w-full object-cover"
                />
                {/* purple wash for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-primary/5 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gold/15 mix-blend-overlay" />

              </div>
            </div>

            {/* Country availability — top left */}
            <div className="hidden md:flex absolute -top-6 left-4 card-glass px-4 py-3.5 items-center gap-3 animate-float-slow shadow-float">
              <div className="flex -space-x-2.5">
                <span className="h-9 w-9 rounded-full bg-white border-2 border-white shadow-soft flex items-center justify-center text-lg">🇬🇧</span>
                <span className="h-9 w-9 rounded-full bg-white border-2 border-white shadow-soft flex items-center justify-center text-lg">🇦🇪</span>
                <span className="h-9 w-9 rounded-full bg-white border-2 border-white shadow-soft flex items-center justify-center text-lg">🇦🇺</span>
                <span className="h-9 w-9 rounded-full bg-white border-2 border-white shadow-soft flex items-center justify-center text-lg">🇪🇺</span>
              </div>
              <div className="pr-1 leading-tight">
                <div className="text-[0.75rem] font-extrabold text-ink">32+ countries</div>
                <div className="text-[0.6rem] text-muted-foreground font-medium">UK · UAE · AU · EU</div>
              </div>
            </div>

            {/* Grade uplift — top right */}
            <div className="hidden lg:flex absolute lg:right-4 xl:-right-12 top-16 card-glass px-4 py-3.5 flex-col gap-2 animate-float-slow shadow-float w-[210px]" style={{ animationDelay: "1.5s" }}>
              <div className="flex items-center justify-between">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">Avg uplift</span>
                <span className="inline-flex items-center gap-1 text-[0.6rem] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <LineChart className="h-3 w-3" /> 12m
                </span>
              </div>
              <div className="font-[var(--font-display)] text-[1.75rem] font-extrabold gradient-text leading-none">+2 grades</div>
              <div className="flex items-end gap-1.5 h-8">
                {[35, 50, 42, 65, 58, 80, 95].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-primary/35 to-gold/80"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="text-[0.6rem] text-muted-foreground font-medium">Across 1,200+ students</div>
            </div>

          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

/* --------------------------- TRUST BAR --------------------------- */
function TrustBar() {
  const boards = [
    { src: "/image/igcse.png", alt: "Cambridge IGCSE", className: "h-16 md:h-20" },
    { src: "/image/oalevels.png", alt: "O & A Level Resources", className: "h-14 md:h-16" },
    { src: "/image/aqa.png", alt: "AQA", className: "h-12 md:h-14" },
    { src: "/image/edexcel.png", alt: "Edexcel", className: "h-12 md:h-14" },
    { src: "/image/lrn.png", alt: "Learning Resource Network", className: "h-12 md:h-14" },
    { src: "/image/ib.png", alt: "International Baccalaureate", className: "h-16 md:h-20" },
    { src: "/image/fbise.png", alt: "Federal Board of Intermediate and Secondary Education", className: "h-16 md:h-20" },
  ];
  // duplicate for seamless infinite loop
  const loop = [...boards, ...boards];

  return (
    <section className="relative bg-background">
      <div className="container-page pt-16 md:pt-20 pb-12 md:pb-14">
        {/* Heading */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 className="font-[var(--font-display)] text-[1.75rem] md:text-[2.25rem] font-bold tracking-[-0.025em] text-ink leading-[1.15]">
            Aligned with <span className="text-primary">leading international examination boards</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-[0.95rem] md:text-base max-w-xl">
            Our specifications mirror Cambridge, Edexcel, AQA, IB and more — so every lesson maps directly to your child's exam.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-primary/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-primary/40" />
          </div>
        </div>
      </div>

      {/* Infinite marquee */}
      <div className="relative pb-14 md:pb-16">
        <div
          className="absolute inset-y-0 left-0 w-32 md:w-48 z-10 pointer-events-none bg-gradient-to-r from-background via-background/90 to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-y-0 right-0 w-32 md:w-48 z-10 pointer-events-none bg-gradient-to-l from-background via-background/90 to-transparent"
          aria-hidden
        />
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee">
            {loop.map((b, i) => (
              <div
                key={`${b.alt}-${i}`}
                className="flex items-center justify-center h-24 md:h-28 w-[180px] md:w-[220px] shrink-0 px-4 md:px-6"
              >
                <img
                  src={b.src}
                  alt={b.alt}
                  className={`${b.className} w-auto object-contain transition-none`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



/* ----------------------------- STATS ----------------------------- */
function Stats() {
  return (
    <section className="relative z-20 -mt-[60px] sm:-mt-[80px] md:-mt-[90px] lg:-mt-[95px]">
      <div className="container-page relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {stats.map((s, i) => {
            const Icon = statIcons[i] ?? Star;
            return (
              <div
                key={s.label}
                className="group relative rounded-[1.25rem] sm:rounded-[1.75rem] bg-white border border-border/70 shadow-[0_18px_40px_-22px_oklch(0.25_0.12_280/0.25)] hover:-translate-y-1 hover:shadow-[0_22px_44px_-22px_oklch(0.25_0.12_280/0.35)] hover:border-primary/25 transition-all duration-500 ease-out animate-fade-up px-3.5 pt-4 pb-3.5 sm:px-5 sm:pt-6 sm:pb-5 flex flex-col items-start"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="relative flex items-center justify-between w-full">
                  <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-primary-soft border border-primary/15 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-transparent transition-all duration-400">
                    <Icon className="h-[14px] w-[14px] sm:h-[18px] sm:w-[18px]" strokeWidth={1.75} />
                  </div>
                  <span className="text-[0.55rem] sm:text-[0.6rem] font-bold tracking-[0.18em] text-muted-foreground/70">0{i + 1}</span>
                </div>

                <div className="mt-3 sm:mt-5 font-[var(--font-display)] text-[1.35rem] sm:text-[2rem] md:text-[2.4rem] font-extrabold text-primary tracking-tight leading-none">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1.5 sm:mt-2 text-[0.6rem] sm:text-[0.7rem] font-bold text-muted-foreground uppercase tracking-[0.14em] sm:tracking-[0.16em]">
                  {s.label}
                </div>
                <span className="mt-3 sm:mt-4 h-[2px] w-8 sm:w-10 rounded-full bg-primary/30 group-hover:w-16 sm:group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- CURRICULUMS -------------------------- */
function Curriculums() {
  return (
    <section className="section relative overflow-hidden bg-background">
      <div className="container-page relative">
        <div className="max-w-3xl">
          <span className="eyebrow">Curriculums</span>
          <h2 className="heading-lg mt-4">
            Every major international curriculum, <span className="text-primary">expertly taught</span>.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">From Cambridge IGCSE to IB Diploma and Edexcel A Level — our tutors know each specification inside out.</p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {homeCurriculums.map((c, i) => (
            <Link
              to="/programs"
              key={c.code}
              className="group relative block ring-focus rounded-[1.75rem] bg-white border border-border/70 shadow-[0_20px_45px_-28px_oklch(0.25_0.12_280/0.3)] hover:shadow-[0_28px_55px_-25px_oklch(0.25_0.12_280/0.4)] hover:-translate-y-1.5 hover:border-primary/25 transition-all duration-500 ease-out animate-fade-up h-full p-7 flex flex-col"
              style={{ animationDelay: `${i * 70}ms` }}
            >
                <div className="relative flex items-start justify-between">
                  {/* <img
                    src={curriculumLogoMap[c.code]?.url}
                    alt={`${c.name} logo`}
                    className="h-16 w-auto max-w-[120px] object-contain"
                  /> */}
                  <img
                    src={curriculumLogoMap[c.code]}
                    alt={`${c.name} logo`}
                    className="h-16 w-auto max-w-[120px] object-contain"
                  />
                  <span className="text-[0.65rem] font-bold tracking-[0.18em] text-muted-foreground/70">0{i + 1}</span>
                </div>

                <h3 className="relative mt-7 text-[1.2rem] font-bold text-ink leading-tight">{c.name}</h3>
                <p className="relative mt-3 text-[0.9rem] text-muted-foreground leading-relaxed flex-1">{c.desc}</p>

                <div className="relative mt-7 pt-5 border-t border-border/60 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                  <span className="h-8 w-8 rounded-full border border-primary/20 flex items-center justify-center text-primary/60 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-400">
                    <ArrowRight className="h-3.5 w-3.5 -rotate-45 group-hover:rotate-0 transition-transform duration-400" />
                  </span>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- SUBJECTS --------------------------- */
function Subjects() {
  return (
    <section className="section relative overflow-hidden bg-background">
      <div className="container-page relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow">Subjects</span>
            <h2 className="heading-lg mt-4">Specialist tutors across <span className="text-primary">20+ subjects</span>.</h2>
            <p className="mt-5 text-muted-foreground text-lg">From sciences and mathematics to humanities and commerce — depth in every discipline.</p>
          </div>
          <Link to="/subjects" className="btn-ghost self-start md:self-end md:mt-6">
            Browse all subjects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {subjects.map((s) => {
            const Icon = subjectIcons[s.icon] ?? Atom;
            return (
              <Link
                key={s.name}
                to="/subjects"
                className="card-surface card-surface-hover p-2.5 sm:p-5 h-[72px] sm:h-auto flex items-center gap-2.5 sm:gap-4 group ring-focus"
              >
                <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-primary-soft text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-soft shrink-0">
                  <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                </div>
                <span className="font-bold text-ink text-xs sm:text-[0.95rem] leading-tight">{s.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- WHY CHOOSE -------------------------- */
const whyIcons = [UserCheck, GraduationCap, CalendarClock, Wallet, Video, FileBarChart, Target, MousePointerClick];

function WhyChoose() {
  return (
    <section className="section relative overflow-hidden bg-background">

      <div className="container-page relative">
        <div className="grid lg:grid-cols-[0.95fr_1.25fr] gap-14 lg:gap-20 items-start">
          {/* LEFT — sticky intro panel */}
          <div className="lg:sticky lg:top-32 animate-fade-up">
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="heading-lg mt-4">
              A premium learning experience, <span className="text-primary">engineered for results</span>.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Every element of our academy — from the tutors we hire to the way each lesson is structured — is built to deliver measurable outcomes for international students.
            </p>

            {/* mini stat panel */}
            <div className="mt-9 rounded-[1.65rem] bg-white border border-border/70 p-6 grid grid-cols-2 gap-5 shadow-soft">
              <div>
                <div className="font-[var(--font-display)] text-3xl font-extrabold text-primary leading-none">98%</div>
                <div className="mt-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">Success rate</div>
              </div>
              <div>
                <div className="font-[var(--font-display)] text-3xl font-extrabold text-primary leading-none">4.9★</div>
                <div className="mt-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">Parent rating</div>
              </div>
              <div className="col-span-2 pt-4 border-t border-border/70 flex items-center gap-3 text-sm text-muted-foreground">
                <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
                Outcomes verified across 1,200+ student cohorts
              </div>
            </div>

            <Link to="/about" className="btn-ghost mt-8 inline-flex">
              Our methodology <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* RIGHT — premium feature list */}
          <ul className="relative space-y-4">
            {/* connecting vertical line */}
            <span aria-hidden className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
            {whyChoose.map((w, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <li
                  key={w.title}
                  className="group relative animate-fade-up"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div className="relative flex gap-5 rounded-[1.5rem] p-5 md:p-6 bg-white border border-border/70 hover:border-primary/25 hover:-translate-y-0.5 transition-all duration-400 shadow-[0_8px_30px_-20px_oklch(0.25_0.12_280/0.25)] hover:shadow-[0_18px_40px_-22px_oklch(0.25_0.12_280/0.35)]">
                    {/* icon */}
                    <div className="relative shrink-0">
                      <div className="relative h-14 w-14 rounded-2xl bg-primary-soft border border-primary/15 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-transparent transition-all duration-400">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-bold text-ink text-base md:text-[1.05rem]">{w.title}</h3>
                        <span className="text-[0.65rem] font-bold tracking-[0.18em] text-muted-foreground/70">0{i + 1}</span>
                      </div>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{w.body}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}


/* -------------------------- HOW IT WORKS -------------------------- */
function HowItWorks() {
  return (
    <section className="section relative overflow-hidden">
      <div className="container-page relative">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">How It Works</span>
          <h2 className="heading-lg mt-4">From first call to top grades — <span className="text-primary">five clear steps</span>.</h2>
        </div>

        <div className="mt-16 grid md:grid-cols-5 gap-6 relative">
          <div className="hidden md:block absolute top-9 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          {howItWorks.map((s) => (
            <div key={s.step} className="relative text-center group">
              <div className="relative mx-auto h-[72px] w-[72px] flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-primary/15 blur-md opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="relative h-16 w-16 rounded-full bg-surface border border-primary/30 text-primary flex items-center justify-center font-[var(--font-display)] font-extrabold shadow-glow">
                  {s.step}
                </div>
              </div>
              <h3 className="mt-6 font-bold text-ink text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------ FEATURED TUTORS ------------------------ */
function FeaturedTutors() {
  const listFn = useServerFn(listPublicTutors);
  const { data } = useQuery({ queryKey: ["public-tutors"], queryFn: () => listFn() });
  const featured = (data ?? []).slice(0, 4);
  if (featured.length === 0) return null;

  return (
    <section className="section">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow">Meet our faculty</span>
            <h2 className="heading-lg mt-4">A faculty of <span className="text-primary">brilliant educators</span>.</h2>
            <p className="mt-5 text-lg text-muted-foreground">Hand-picked teachers with international experience, strong qualifications and outstanding student reviews.</p>
          </div>
          <Link to="/tutors" className="btn-ghost self-start md:self-end md:mt-6">
            View all tutors <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((t: any) => (
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
      </div>
    </section>
  );
}


/* --------------------------- TESTIMONIALS --------------------------- */
const testimonialMeta = [
  { initials: "SM", flag: "🇬🇧", country: "United Kingdom", accent: "from-primary/20 to-secondary/20" },
  { initials: "AJ", flag: "🇦🇪", country: "United Arab Emirates", accent: "from-gold/25 to-primary/15" },
  { initials: "LP", flag: "🇦🇺", country: "Australia", accent: "from-secondary/20 to-gold/20" },
];

function Testimonials() {
  return (
    <section className="section relative overflow-hidden bg-background">
      <div className="container-page relative">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow justify-center">Loved by parents & students</span>
          <h2 className="heading-lg mt-4">Real results. Real families. <span className="text-primary">Worldwide.</span></h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg">
            A trusted partner for families across four continents — here's what they say.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 lg:gap-7">
          {testimonials.map((t, i) => {
            const meta = testimonialMeta[i] ?? testimonialMeta[0];
            return (
              <figure
                key={t.author}
                className="group relative rounded-[1.5rem] bg-white/80 backdrop-blur-md border border-white/70 p-7 md:p-8 shadow-[0_12px_32px_-20px_oklch(0.25_0.12_280/0.35)] hover:shadow-[0_24px_50px_-22px_oklch(0.33_0.18_277/0.4)] hover:-translate-y-1.5 hover:bg-white transition-all duration-500 ease-out animate-fade-up flex flex-col"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                {/* decorative quote */}
                <span aria-hidden className="absolute top-5 right-6 text-[5rem] leading-none font-[var(--font-display)] text-primary/10 select-none group-hover:text-primary/15 transition-colors">"</span>

                {/* stars */}
                <div className="relative flex items-center gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <blockquote className="relative mt-5 text-[1rem] md:text-[1.02rem] leading-relaxed text-ink font-medium flex-1">
                  "{t.quote}"
                </blockquote>

                <figcaption className="relative mt-7 pt-6 border-t border-border/70 flex items-center gap-3.5">
                  <div className={`relative h-12 w-12 rounded-full p-[1.5px] bg-gradient-to-br ${meta.accent}`}>
                    <div className="h-full w-full rounded-full bg-white flex items-center justify-center font-[var(--font-display)] font-extrabold text-primary text-sm">
                      {meta.initials}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full bg-white border border-white shadow-soft flex items-center justify-center text-[0.7rem]">
                      {meta.flag}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-ink text-sm leading-tight">{t.author}</div>
                    <div className="text-[0.75rem] text-muted-foreground mt-0.5">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}


/* ----------------------------- FINAL CTA ----------------------------- */
function FinalCTA() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] p-[2px] bg-gradient-to-br from-primary via-gold to-secondary shadow-float">
          <div className="relative overflow-hidden rounded-[1.9rem] bg-gradient-to-br from-[oklch(0.20_0.10_278)] via-[oklch(0.25_0.14_278)] to-[oklch(0.18_0.10_277)] text-white p-10 md:p-16">
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-gold/30 blur-3xl animate-blob" />
            <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-primary-glow/30 blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
            <div className="absolute inset-0 bg-grid-soft opacity-10" />
            <div className="noise" />

            <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
              <div>
                <span className="chip-gold">Free 20-minute consultation</span>
                <h2 className="heading-lg mt-5 text-white" style={{ color: "white" }}>
                  Give your child a <span className="gradient-text-gold">global academic advantage</span>.
                </h2>
                <p className="mt-5 text-white/80 max-w-xl leading-relaxed text-lg">
                  Speak to our academic team today and we'll match your child with the perfect tutor — typically within 48 hours.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
                  <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-gold" /> No card required</span>
                  <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-gold" /> Cancel anytime</span>
                  <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-gold" /> Money-back guarantee</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Link to="/contact" className="btn-gold">
                  Book Free Trial <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/programs" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm">
                  Explore Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
