import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Menu, Moon, ShieldCheck, Sun, X } from "lucide-react";

import Logo from "./Logo";
import { Button } from "./ui/button";
import AskfirmWidgetEmbed from "./AskfirmWidgetEmbed";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/get-started", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem("nurture-next-theme") !== "light"; } catch { return true; }
  });

  useEffect(() => {
    try { localStorage.setItem("nurture-next-theme", isDark ? "dark" : "light"); } catch {}
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  const isAuthPage = location === "/login" || location === "/signup";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <div className={`min-h-[100dvh] w-full selection:bg-primary/20 selection:text-primary flex flex-col bg-background text-foreground${isDark ? " dark" : ""}`}>
      {!isAuthPage && (
        <>
          <div className="h-9 bg-navy text-white/90 text-xs">
            <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
              <p className="flex items-center gap-1.5 font-medium tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                SOC 2 aligned workflows and advisor-reviewed filing
              </p>
              <Link href="/contact" className="hidden md:inline-flex items-center gap-1 text-gold hover:text-white/80 transition-colors font-semibold">
                Book a compliance call <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <header
            className={`sticky top-0 z-50 border-b transition-all duration-300 ${
              scrolled
                ? "bg-background/92 border-border/70"
                : "bg-background/72 border-transparent"
            }`}
          >
            <div className="container mx-auto px-4 md:px-6 h-[4.5rem] flex items-center justify-between">
              <Link href="/" className="transition-opacity hover:opacity-90">
                <Logo size="sm" />
              </Link>

              <nav className="hidden md:flex items-center rounded-full border border-border bg-card/75 p-1 gap-1">
                {navLinks.map((link) => {
                  const active = location === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-2">
                {/* Theme toggle */}
                <button
                  onClick={toggleTheme}
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  className="relative flex items-center w-[52px] h-7 rounded-full border border-border bg-muted/60 hover:bg-muted transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring flex-shrink-0"
                >
                  <span
                    className={`absolute left-0.5 flex items-center justify-center w-6 h-6 rounded-full shadow-sm transition-all duration-300 ${
                      isDark
                        ? "translate-x-6 bg-primary"
                        : "translate-x-0 bg-background border border-border/60"
                    }`}
                  >
                    {isDark
                      ? <Moon className="w-3 h-3 text-primary-foreground" />
                      : <Sun className="w-3 h-3 text-amber-500" />
                    }
                  </span>
                </button>

                <Link
                  href="/login"
                  className="hidden md:inline-flex text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-3"
                >
                  Sign in
                </Link>
                <Button asChild size="sm" className="hidden md:inline-flex rounded-full h-10 px-5 font-semibold">
                  <Link href="/get-started">Start filing</Link>
                </Button>

                <button
                  className="md:hidden w-9 h-9 rounded-lg border border-border/80 flex items-center justify-center text-foreground"
                  onClick={() => setMobileOpen((prev) => !prev)}
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mobileOpen && (
              <div className="md:hidden border-t border-border bg-background/95">
                <div className="px-4 py-4 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        location === link.href
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-2 grid grid-cols-2 gap-2">
                    <Button variant="outline" className="rounded-xl" asChild>
                      <Link href="/login">Sign in</Link>
                    </Button>
                    <Button className="rounded-xl" asChild>
                      <Link href="/get-started">Start filing</Link>
                    </Button>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="mt-1 w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-colors border border-border/50"
                    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    <span>{isDark ? "Light mode" : "Dark mode"}</span>
                    <span className="relative flex items-center w-[52px] h-7 rounded-full border border-border bg-muted/60">
                      <span className={`absolute left-0.5 flex items-center justify-center w-6 h-6 rounded-full shadow-sm transition-all duration-300 ${isDark ? "translate-x-6 bg-primary" : "translate-x-0 bg-background border border-border/60"}`}>
                        {isDark ? <Moon className="w-3 h-3 text-primary-foreground" /> : <Sun className="w-3 h-3 text-amber-500" />}
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </header>
        </>
      )}

      <main className="flex-1 flex flex-col">{children}</main>

      {!isAuthPage && <AskfirmWidgetEmbed />}

      {!isAuthPage && (
        <footer className="bg-[hsl(223,42%,8%)] text-white/90">
          <div className="gold-rule" />
          <div className="container mx-auto px-4 md:px-6 py-14">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="space-y-4">
                <Logo variant="light" />
                <p className="text-sm text-white/65 leading-relaxed max-w-xs">
                  Full-service tax filing and compliance support built for salaried professionals,
                  founders, and growing businesses.
                </p>
                <p className="text-xs uppercase tracking-[0.22em] text-gold">Trusted by 12,000+ clients</p>
              </div>

              <div>
                <h4 className="font-semibold text-sm uppercase tracking-[0.12em] mb-4 text-white/75">Platform</h4>
                <ul className="space-y-2.5 text-sm text-white/65">
                  <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                  <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                  <li><Link href="/dashboard" className="hover:text-white transition-colors">Client Dashboard</Link></li>
                  <li><Link href="/get-started" className="hover:text-white transition-colors">Plans</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm uppercase tracking-[0.12em] mb-4 text-white/75">Services</h4>
                <ul className="space-y-2.5 text-sm text-white/65">
                  <li><Link href="/services" className="hover:text-white transition-colors">Individual & Business Returns</Link></li>
                  <li><Link href="/services" className="hover:text-white transition-colors">Sales Tax Compliance</Link></li>
                  <li><Link href="/services" className="hover:text-white transition-colors">Business Entity Setup</Link></li>
                  <li><Link href="/services" className="hover:text-white transition-colors">IRS & State Notice Response</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm uppercase tracking-[0.12em] mb-4 text-white/75">Company</h4>
                <ul className="space-y-2.5 text-sm text-white/65">
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/55">
              <p>Copyright {new Date().getFullYear()} Nurture Next. All rights reserved.</p>
              <p className="uppercase tracking-[0.16em]">Security first. Advisor led. Client focused.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

