import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export function CurriculumBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide bg-primary-soft text-primary ring-1 ring-primary/15",
      className,
    )}>
      {label}
    </span>
  );
}

export function SubjectBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium text-ink bg-surface-2 border border-border/70",
      className,
    )}>
      {label}
    </span>
  );
}

type Availability = "Available" | "Limited Availability" | "Fully Booked";

export function AvailabilityBadge({ status, className }: { status: Availability; className?: string }) {
  const map: Record<Availability, { dot: string; text: string; bg: string }> = {
    "Available": { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50 ring-emerald-500/20" },
    "Limited Availability": { dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50 ring-amber-500/25" },
    "Fully Booked": { dot: "bg-rose-500", text: "text-rose-700", bg: "bg-rose-50 ring-rose-500/20" },
  };
  const s = map[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10.5px] font-semibold ring-1", s.bg, s.text, className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {status}
    </span>
  );
}

export function RatingPill({ rating, reviews, className }: { rating: number; reviews?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-semibold text-[oklch(0.42_0.10_75)]", className)}>
      <Star className="h-3.5 w-3.5 fill-current text-gold" />
      {rating.toFixed(1)}
      {reviews !== undefined && <span className="text-muted-foreground font-normal">({reviews})</span>}
    </span>
  );
}

const statusMap: Record<string, string> = {
  Review: "bg-amber-50 text-amber-700 ring-amber-500/25",
  Interview: "bg-sky-50 text-sky-700 ring-sky-500/25",
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-500/25",
  Pending: "bg-amber-50 text-amber-700 ring-amber-500/25",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-500/25",
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-500/25",
  "On Leave": "bg-slate-100 text-slate-700 ring-slate-500/25",
};

export function ApplicationStatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1",
      statusMap[status] ?? "bg-muted text-muted-foreground ring-border",
      className,
    )}>
      {status}
    </span>
  );
}
