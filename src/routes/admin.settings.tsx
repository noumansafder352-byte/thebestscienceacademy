import { createFileRoute } from "@tanstack/react-router";
import type { ComponentType, ReactNode } from "react";
import { Building2, Info, Mail, Palette, Search, Settings as SettingsIcon } from "lucide-react";
import { AdminPageHeader } from "@/components/admin-ui";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsAdmin,
});

function SettingsAdmin() {
  return (
    <div className="max-w-3xl space-y-6">
      <AdminPageHeader
        icon={SettingsIcon}
        title="Settings"
        subtitle="Configure your academy's public presence and branding."
        accent="bg-slate-200 text-slate-700"
      />

      <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p className="text-sm">
          These fields are a preview — they aren't connected to a data store yet, so saving won't
          change the live site.
        </p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <SettingsCard
          icon={Building2}
          title="Academy"
          description="Your organisation's name and identity."
        >
          <Field label="Academy name" defaultValue="The Best Science Academy" />
        </SettingsCard>

        <SettingsCard
          icon={Search}
          title="Search & metadata"
          description="How your academy appears in search results and social shares."
        >
          <Field
            label="SEO title"
            defaultValue="World-class online tutors for international students"
          />
          <Field
            label="SEO description"
            defaultValue="Premium online tuition for IGCSE, O Level, A Level, IB, AQA and Edexcel."
            textarea
          />
        </SettingsCard>

        <SettingsCard
          icon={Palette}
          title="Branding"
          description="Primary and accent colours used across the site."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <ColorField label="Primary color" defaultValue="#2F2B8F" />
            <ColorField label="Accent color" defaultValue="#006B3F" />
          </div>
        </SettingsCard>

        <SettingsCard
          icon={Mail}
          title="Contact"
          description="Where enquiries and support requests are sent."
        >
          <Field
            label="Support email"
            defaultValue="hello@thebestscienceacademy.com"
            type="email"
          />
        </SettingsCard>

        <div className="flex items-center gap-3">
          <button className="btn-primary" type="submit">
            Save changes
          </button>
          <button className="btn-ghost" type="reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

function SettingsCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="card-surface p-6">
      <div className="mb-5 flex items-center gap-3 border-b border-border/70 pb-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-ink">{title}</h2>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  defaultValue,
  textarea,
  type = "text",
}: {
  label: string;
  defaultValue: string;
  textarea?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      {textarea ? (
        <textarea
          defaultValue={defaultValue}
          rows={3}
          className="mt-2 w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:bg-surface"
        />
      ) : (
        <input
          type={type}
          defaultValue={defaultValue}
          className="mt-2 h-11 w-full rounded-xl border border-border bg-surface-2 px-4 text-sm outline-none transition-colors focus:border-primary focus:bg-surface"
        />
      )}
    </label>
  );
}

function ColorField({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <div className="mt-2 flex items-center gap-3 rounded-xl border border-border bg-surface-2 px-3 py-2">
        <span
          className="h-7 w-7 shrink-0 rounded-lg border border-border"
          style={{ backgroundColor: defaultValue }}
        />
        <input
          defaultValue={defaultValue}
          className="h-7 w-full bg-transparent text-sm font-medium text-ink outline-none"
        />
      </div>
    </label>
  );
}
