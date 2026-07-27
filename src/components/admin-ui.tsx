import type { ComponentType, ReactNode } from "react";
import { Search } from "lucide-react";

/** Consistent page header used across every admin sub-page. */
export function AdminPageHeader({
  icon: Icon,
  title,
  subtitle,
  accent = "bg-primary-soft text-primary",
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
  accent?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-soft ${accent}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">{title}</h1>
          {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

/** Compact KPI tile with a colored icon chip. */
export function StatTile({
  icon: Icon,
  label,
  value,
  accent = "bg-primary-soft text-primary",
  hint,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: ReactNode;
  accent?: string;
  hint?: string;
}) {
  return (
    <div className="card-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${accent}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 font-display text-2xl font-bold tabular-nums text-ink">{value}</div>
      {hint && <div className="mt-0.5 text-xs text-muted-foreground/70">{hint}</div>}
    </div>
  );
}

/** Segmented pill control for status filters. */
export function FilterTabs<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { key: T; label: string; count?: number }[];
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
      {options.map((o) => {
        const active = value === o.key;
        return (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors ${
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-ink"
            }`}
          >
            {o.label}
            {o.count != null && (
              <span className={active ? "text-primary-foreground/75" : "text-muted-foreground/60"}>
                {o.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Rounded search field matching the admin shell. */
export function SearchInput({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-full border border-border bg-surface-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary focus:bg-surface"
      />
    </div>
  );
}

/** Friendly empty state — drop inside a table cell (with colSpan) or a card. */
export function EmptyState({
  icon: Icon,
  title,
  hint,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 text-muted-foreground/50">
        <Icon className="h-6 w-6" />
      </div>
      <p className="mt-3 text-sm font-medium text-ink">{title}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

/** Circular initials avatar. */
export function AdminAvatar({
  name,
  className = "h-9 w-9 text-xs",
}: {
  name?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-primary-soft font-bold text-primary ${className}`}
    >
      {adminInitials(name)}
    </div>
  );
}

export function adminInitials(name?: string) {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Shared table shell classes so every admin table matches. */
export const tableHeadRow =
  "text-left text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border";
export const tableRow =
  "border-b border-border/70 transition-colors hover:bg-surface-2/60 last:border-0";
