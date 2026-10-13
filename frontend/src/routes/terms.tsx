import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — The Best Science Academy" },
      { name: "description", content: "The terms that govern your use of The Best Science Academy's website and tutoring services." },
      { property: "og:title", content: "Terms & Conditions" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" description="Last updated 27 June 2026." />
      <section className="section">
        <div className="container-page max-w-3xl prose-doc">
          <h2>Agreement</h2>
          <p>By accessing or using The Best Science Academy ("the Academy"), you agree to these terms. If you do not agree, please discontinue use of the service.</p>
          <h2>Tutoring services</h2>
          <p>The Academy connects students and parents with vetted tutors for one-to-one online classes. We facilitate scheduling, billing and quality assurance but do not warrant specific academic outcomes.</p>
          <h2>Payments & cancellations</h2>
          <p>Trial classes are free. Paid lessons may be rescheduled with at least 24 hours' notice. Refunds for unused prepaid sessions are processed within 7 working days.</p>
          <h2>Conduct</h2>
          <p>Students, parents and tutors are expected to behave respectfully at all times. We reserve the right to suspend accounts that breach our community standards.</p>
          <h2>Intellectual property</h2>
          <p>All teaching materials, recordings and content shared during sessions remain the property of the Academy and its tutors and may not be redistributed without written consent.</p>
          <h2>Limitation of liability</h2>
          <p>The Academy is not liable for incidental or consequential damages arising from use of the service to the maximum extent permitted by law.</p>
          <h2>Contact</h2>
          <p>Questions? Email <a href="mailto:legal@thebestscienceacademy.com">legal@thebestscienceacademy.com</a>.</p>
        </div>
      </section>
    </SiteLayout>
  ),
});
