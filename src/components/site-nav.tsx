import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@/assets/Final-logo.png.asset.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/subjects", label: "Subjects" },
  { to: "/tutors", label: "Find Tutors" },
  { to: "/become-a-tutor", label: "Become a Tutor" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full pointer-events-none">
      <div
        className={`pointer-events-auto transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
          scrolled ? "pt-2.5 md:pt-3" : "pt-5 md:pt-7"
        }`}
      >
        <div className={`container-page transition-all duration-700 ${scrolled ? "max-w-[1180px]" : ""}`}>
          <div className="relative">
            <header
              className={`relative flex items-center justify-between rounded-full transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] overflow-hidden bg-surface-2 border border-white/90 shadow-[0_4px_18px_-6px_rgba(0,0,0,0.06),0_20px_50px_-20px_rgba(0,0,0,0.10)] ${
                scrolled ? "h-[64px] px-2.5 md:px-3" : "h-[76px] px-3 md:px-4"
              }`}
            >

              {/* Logo */}
              <Link to="/" className="relative flex items-center ring-focus rounded-full group px-2 py-1">
                <img
                  src="/image/Final-logo.png"
                  alt="The Best Science Academy"
                  className={`w-auto object-contain transition-all duration-500 ${
                    scrolled ? "h-12 md:h-14" : "h-14 md:h-16"
                  }`}
                />
              </Link>

              {/* Nav */}
              <nav className="hidden lg:flex items-center gap-1">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="group relative px-4 py-2 text-[0.9rem] font-semibold tracking-[0.005em] text-foreground/70 transition-colors duration-300 hover:text-primary"
                    activeProps={{
                      className: "!text-primary",
                    }}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    <span className="relative inline-block">
                      {l.label}
                      <span className="pointer-events-none absolute left-1/2 -bottom-[3px] h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary via-secondary to-gold transition-all duration-400 ease-out group-hover:w-[60%] group-data-[status=active]:w-[60%]" />
                    </span>
                  </Link>
                ))}
              </nav>

              {/* CTA */}
              <div className="relative flex items-center gap-2 pr-1">
                <Link
                  to="/contact"
                  className="hidden sm:inline-flex relative items-center gap-2 pl-5 pr-4 py-2.5 rounded-full text-[0.85rem] font-semibold text-white overflow-hidden group transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
                >
                  {/* gradient fill */}
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary-glow bg-[length:220%_100%] bg-[position:0%_50%] group-hover:bg-[position:100%_50%] transition-[background-position] duration-700" />
                  {/* outer glow */}
                  <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/60 via-secondary/50 to-gold/60 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* gold under-shadow */}
                  <span className="absolute inset-x-3 -bottom-1 h-3 rounded-full bg-gold/35 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* inner ring + sheen */}
                  <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/30" />
                  <span className="absolute inset-x-2 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/35 to-transparent" />
                  <span className="relative">Book Free Trial</span>
                  <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30">
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
                <button
                  className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-white text-foreground shadow-soft"
                  onClick={() => setOpen((v) => !v)}
                  aria-label="Toggle menu"
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </header>
          </div>

          {open && (
            <div className="lg:hidden mt-2 rounded-3xl border border-border/60 bg-white shadow-float p-3 flex flex-col gap-1 animate-fade-up">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 rounded-2xl text-sm font-medium text-foreground transition-colors hover:text-primary"
                  activeProps={{ className: "!text-primary" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
                Book Free Trial <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
