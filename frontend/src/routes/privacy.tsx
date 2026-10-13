import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — The Best Science Academy" },
      { name: "description", content: "How The Best Science Academy collects, uses and protects your personal information." },
      { property: "og:title", content: "Privacy Policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="Last updated 27 June 2026." />
      <section className="section">
        <div className="container-page max-w-3xl prose-doc">
          <h2>Overview</h2>
          <p>The Best Science Academy ("we", "our") respects the privacy of every student, parent and tutor who uses our service. This policy explains what information we collect, how we use it, and the choices you have.</p>
          <h2>Information we collect</h2>
          <p>We collect information you provide when booking a trial, contacting us, or applying as a tutor — including name, email, phone, country, curriculum and a short message. We also collect anonymous analytics about how visitors use our website.</p>
          <h2>How we use information</h2>
          <p>We use your information to schedule consultations, match you with a tutor, send progress updates, and improve our service. We never sell personal data.</p>
          <h2>Data security</h2>
          <p>Personal data is stored on encrypted infrastructure with role-based access. Tutor application documents are stored only as long as required for verification.</p>
          <h2>Your rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data at any time by emailing <a href="mailto:privacy@thebestscienceacademy.com">privacy@thebestscienceacademy.com</a>.</p>
          <h2>Contact</h2>
          <p>Questions about this policy? Write to us at <a href="mailto:hello@thebestscienceacademy.com">hello@thebestscienceacademy.com</a>.</p>
        </div>
      </section>
    </SiteLayout>
  ),
});
