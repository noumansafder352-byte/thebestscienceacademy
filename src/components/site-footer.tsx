import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube, ArrowRight, Globe2 } from "lucide-react";
import footerLogo from "@/assets/footer-logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-[oklch(0.14_0.05_277)] text-white/85">
      {/* gradient top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="absolute inset-0 opacity-50">
        <div className="blob animate-blob h-[420px] w-[420px] bg-primary-glow/40 -top-32 -left-32" />
        <div className="blob animate-blob h-[360px] w-[360px] bg-gold/20 bottom-0 right-0" style={{ animationDelay: "3s" }} />
      </div>
      <div className="noise" />

      <div className="container-page relative py-20">
        {/* Newsletter */}
        <div className="card-glass !bg-white/5 !border-white/10 p-6 sm:p-8 md:p-10 mb-16 grid md:grid-cols-[1.3fr_1fr] gap-6 md:gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[0.65rem] sm:text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              <Globe2 className="h-4 w-4" /> The Academy Letter
            </div>
            <h3 className="mt-3 font-[var(--font-display)] text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
              Insights, exam tips and success stories — delivered monthly.
            </h3>
          </div>
          <form className="flex flex-col sm:flex-row gap-2.5 w-full min-w-0" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="your.email@example.com"
              className="w-full sm:flex-1 min-w-0 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/45 px-4 sm:px-5 py-3 sm:py-3.5 text-sm outline-none focus:border-gold/60 focus:bg-white/15 transition"
            />
            <button type="submit" className="btn-gold !py-3 sm:!py-3.5 !px-5 text-sm justify-center w-full sm:w-auto shrink-0">
              Subscribe <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-start">
              <img
                src={footerLogo.url}
                alt="The Best Science Academy"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed text-white/65 max-w-md">
              World-class online tutors for international students. Empowering learners across the UK, UAE, Australia, Europe and Asia with exam-ready expertise from outstanding educators.
            </p>
            <div className="flex gap-2.5">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="h-11 w-11 rounded-full border border-white/15 inline-flex items-center justify-center hover:bg-gold hover:text-ink hover:border-gold transition-all duration-300 hover:-translate-y-0.5">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Company" links={[
            { to: "/about", label: "About Us" },
            { to: "/become-a-tutor", label: "Become a Tutor" },
            { to: "/contact", label: "Contact" },
          ]} />
          <FooterCol title="Programs" links={[
            { to: "/programs", label: "IGCSE" },
            { to: "/programs", label: "O Level / A Level" },
            { to: "/programs", label: "IB · AQA · Edexcel" },
          ]} />
          <FooterCol title="Subjects" links={[
            { to: "/subjects", label: "Sciences" },
            { to: "/subjects", label: "Mathematics" },
            { to: "/subjects", label: "Humanities" },
          ]} />
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page py-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/55">
          <p>© {new Date().getFullYear()} The Best Science Academy. All rights reserved.</p>
          <a
            href="https://nexenstrategy.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold hover:translate-x-0.5 inline-block transition-all duration-200"
          >
            Design and Developed by Nexen Strategy
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="text-white text-sm font-bold mb-5 tracking-[0.18em] uppercase text-gold/90">{title}</h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-white/70 hover:text-gold hover:translate-x-1 inline-block transition-all duration-200">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
