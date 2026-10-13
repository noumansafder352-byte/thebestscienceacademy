import { Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, Languages } from "lucide-react";
import type { Tutor } from "@/lib/site-data";
import { CurriculumBadge, RatingPill, SubjectBadge } from "./tutor-badges";

export function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <article className="group card-surface card-surface-hover overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[5/4] overflow-hidden bg-primary-soft">
        <img
          src={tutor.photo}
          alt={tutor.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute top-2.5 right-2.5 rounded-full bg-white/95 backdrop-blur px-2 py-0.5 shadow-sm">
          <RatingPill rating={tutor.rating} />
        </div>

      </div>

      <div className="p-4 flex flex-col flex-1">
        <div>
          <h3 className="font-[var(--font-display)] font-semibold text-ink text-[15px] leading-tight truncate">
            {tutor.name}
          </h3>
          <p className="mt-0.5 text-[11.5px] text-primary font-semibold uppercase tracking-wide truncate">
            {tutor.title}
          </p>
        </div>

        <p className="mt-2 text-[11.5px] text-muted-foreground leading-snug line-clamp-2">
          {tutor.qualification}
        </p>

        <div className="mt-3 flex flex-wrap gap-1">
          {tutor.subjects.slice(0, 2).map((s) => <SubjectBadge key={s} label={s} />)}
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {tutor.curriculums.slice(0, 3).map((c) => <CurriculumBadge key={c} label={c} />)}
        </div>

        <div className="mt-3 pt-3 border-t border-border/70 flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1"><GraduationCap className="h-3 w-3" /> {tutor.experience}</span>
          <span className="inline-flex items-center gap-1 truncate"><Languages className="h-3 w-3" /> {tutor.languages.join(", ")}</span>
        </div>

        <Link
          to="/tutors/$slug"
          params={{ slug: tutor.slug }}
          className="mt-3 inline-flex items-center justify-center gap-1.5 w-full rounded-full bg-primary text-primary-foreground text-xs font-semibold py-2.5 hover:bg-primary/90 transition-colors"
        >
          View Profile <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
