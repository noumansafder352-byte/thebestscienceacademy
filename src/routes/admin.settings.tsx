import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsAdmin,
});

function SettingsAdmin() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="heading-md">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Configure your academy's public presence and branding.</p>
      </div>

      <form className="card-surface p-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
        <Field label="Academy name" defaultValue="The Best Science Academy" />
        <Field label="SEO title" defaultValue="World-class online tutors for international students" />
        <Field label="SEO description" defaultValue="Premium online tuition for IGCSE, O Level, A Level, IB, AQA and Edexcel." textarea />
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Primary color" defaultValue="#2F2B8F" />
          <Field label="Accent color" defaultValue="#006B3F" />
        </div>
        <Field label="Support email" defaultValue="hello@thebestscienceacademy.com" type="email" />
        <div className="flex items-center gap-3 pt-2">
          <button className="btn-primary" type="submit">Save changes</button>
          <button className="btn-ghost" type="reset">Reset</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, defaultValue, textarea, type = "text" }: { label: string; defaultValue: string; textarea?: boolean; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      {textarea ? (
        <textarea defaultValue={defaultValue} rows={3} className="mt-2 w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-sm outline-none focus:border-primary" />
      ) : (
        <input type={type} defaultValue={defaultValue} className="mt-2 w-full h-11 px-4 rounded-xl border border-border bg-surface text-sm outline-none focus:border-primary" />
      )}
    </label>
  );
}
