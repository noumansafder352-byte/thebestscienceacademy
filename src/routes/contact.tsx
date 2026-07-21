import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone, Clock, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { submitTrialBooking, submitContactMessage } from "@/lib/tutor-api.functions";
import { PhoneField, isValidPhoneNumber } from "@/components/phone-field";


export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Best Science Academy" },
      { name: "description", content: "Book a free trial, ask a question or get tutor recommendations. We respond within one business day." },
      { property: "og:title", content: "Contact The Best Science Academy" },
      { property: "og:description", content: "Book a free trial or speak to our academic team." },
    ],
  }),
  component: ContactPage,
});

type BookingForm = {
  student_name: string;
  parent_name: string;
  country: string;
  email: string;
  whatsapp: string;
  grade_level: string;
  curriculum: string;
  subject: string;
  notes: string;
};

const emptyBooking: BookingForm = {
  student_name: "", parent_name: "", country: "", email: "", whatsapp: "",
  grade_level: "", curriculum: "", subject: "", notes: "",
};

function ContactPage() {
  const bookingFn = useServerFn(submitTrialBooking);
  const messageFn = useServerFn(submitContactMessage);
  const [form, setForm] = useState<BookingForm>(emptyBooking);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upd = (k: keyof BookingForm) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.parent_name.trim() || form.parent_name.trim().length < 2) {
      setError("Please enter the parent's full name.");
      return;
    }
    if (!form.student_name.trim() || form.student_name.trim().length < 2) {
      setError("Please enter the student's name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.whatsapp && !isValidPhoneNumber(form.whatsapp)) {
      setError("Please enter a valid WhatsApp number for the selected country.");
      return;
    }

    setBusy(true);
    try {
      // Save as trial booking
      await bookingFn({
        data: {
          student_name: form.student_name || form.parent_name,
          parent_name: form.parent_name || null,
          email: form.email,
          whatsapp: form.whatsapp || null,
          country: form.country || null,
          curriculum: form.curriculum || null,
          subject: form.subject || null,
          grade_level: form.grade_level || null,
          notes: form.notes || null,
          tutor_slug: null,
          phone: null,
          preferred_time: null,
        },
      });
      // Also create a contact message so it shows in the inbox
      await messageFn({
        data: {
          name: form.parent_name || form.student_name,
          email: form.email,
          phone: form.whatsapp || null,
          subject: `Free trial enquiry · ${form.subject || form.curriculum || "General"}`,
          message: form.notes || `Trial enquiry for ${form.student_name} (${form.grade_level || "—"}, ${form.curriculum || "—"}).`,
        },
      });
      setDone(true);
      setForm(emptyBooking);
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title="Speak to our academic team."
        description="Tell us about your child's goals and we'll match the perfect tutor within 48 hours."
      />

      <section className="section">
        <div className="container-page grid lg:grid-cols-[1.1fr_1fr] gap-10">
          <div className="card-surface p-8 lg:p-10">
            <h2 className="heading-md">Book a free trial</h2>
            <p className="mt-2 text-sm text-muted-foreground">No payment information required.</p>

            {done && (
              <div className="mt-6 p-4 rounded-xl bg-emerald-50 text-emerald-800 text-sm font-medium flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                <span>Thanks — your enquiry has been received. Our team will reply within one business day.</span>
              </div>
            )}
            {error && (
              <div className="mt-6 p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-medium">{error}</div>
            )}

            <form onSubmit={onSubmit} className="mt-8 grid sm:grid-cols-2 gap-4">
              <Field label="Parent name" value={form.parent_name} onChange={upd("parent_name")} placeholder="Your full name" />
              <Field label="Student name" value={form.student_name} onChange={upd("student_name")} placeholder="Student's full name" />
              <Field label="Country" value={form.country} onChange={upd("country")} placeholder="e.g. United Kingdom" />
              <Field label="Email" type="email" value={form.email} onChange={upd("email")} placeholder="you@example.com" />
              <PhoneField label="WhatsApp number" value={form.whatsapp} onChange={upd("whatsapp")} placeholder="WhatsApp number" />
              <Field label="Student's grade / year" value={form.grade_level} onChange={upd("grade_level")} placeholder="e.g. Year 11" />
              <Field label="Curriculum" value={form.curriculum} onChange={upd("curriculum")} placeholder="e.g. IGCSE, A Level, IB" />
              <Field label="Subjects of interest" value={form.subject} onChange={upd("subject")} placeholder="e.g. Physics, Mathematics" className="sm:col-span-2" />
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-ink">Anything else we should know?</label>
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={(e) => upd("notes")(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-2xl border border-border bg-surface-2 text-sm ring-focus focus:bg-surface focus:border-primary"
                  placeholder="Goals, preferred timing, exam dates…"
                />
              </div>
              <button type="submit" disabled={busy} className="btn-primary sm:col-span-2 mt-2 disabled:opacity-60">
                {busy ? "Sending…" : "Send Enquiry"} <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="space-y-5">
            <InfoCard icon={MessageCircle} title="WhatsApp" body="+92 300 1234567" cta="Chat now" />
            <InfoCard icon={Mail} title="Email" body="hello@thebestscienceacademy.com" cta="Send mail" />
            <InfoCard icon={Phone} title="Phone" body="+92 21 1234 5678" cta="Call us" />
            <InfoCard icon={MapPin} title="Office" body="Karachi, Pakistan" cta="View on map" />
            <div className="card-surface p-6">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-ink">Working hours</h3>
              </div>
              <dl className="mt-4 text-sm grid grid-cols-2 gap-y-1.5">
                <dt className="text-muted-foreground">Mon – Fri</dt><dd className="text-right text-ink">09:00 – 22:00 PKT</dd>
                <dt className="text-muted-foreground">Saturday</dt><dd className="text-right text-ink">10:00 – 18:00 PKT</dd>
                <dt className="text-muted-foreground">Sunday</dt><dd className="text-right text-ink">Closed</dd>
              </dl>
            </div>
            <div className="card-surface overflow-hidden">
              <div className="aspect-[16/10] bg-primary-soft flex items-center justify-center text-muted-foreground text-sm">
                <div className="flex flex-col items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  Map placeholder
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, type = "text", placeholder, value, onChange, className = "" }: { label: string; type?: string; placeholder?: string; value: string; onChange: (v: string) => void; className?: string }) {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-ink">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full h-12 px-4 rounded-full border border-border bg-surface-2 text-sm ring-focus focus:bg-surface focus:border-primary"
      />
    </div>
  );
}

function InfoCard({ icon: Icon, title, body, cta }: { icon: typeof Mail; title: string; body: string; cta: string }) {
  return (
    <div className="card-surface card-surface-hover p-6 flex items-start gap-4">
      <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      </div>
      <button className="text-sm font-semibold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
        {cta} <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
