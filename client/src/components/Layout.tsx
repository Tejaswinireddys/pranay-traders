import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Logo } from "./Logo";
import { BUSINESS, whatsappLink, gmailComposeLink } from "@/lib/business";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  Facebook,
  Sun,
  Moon,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Updates", href: "/updates" },
  { label: "Contact", href: "/contact" },
];

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = true || prefers; // default to dark for charcoal mood
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);
  const toggle = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };
  return { dark, toggle };
}

function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => setOpen(false), [location]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" data-testid="link-home-logo">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors hover-elevate ${
                  active
                    ? "text-primary"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            data-testid="button-theme-toggle"
            className="hidden h-9 w-9 items-center justify-center rounded-md text-foreground/70 hover-elevate sm:flex"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link href="/contact" className="hidden sm:block">
            <Button
              size="sm"
              className="font-semibold"
              data-testid="button-nav-quote"
            >
              Request Bulk Quote
            </Button>
          </Link>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md text-foreground lg:hidden hover-elevate"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            data-testid="button-menu-toggle"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`link-mobilenav-${item.label.toLowerCase()}`}
                className={`rounded-md px-3 py-3 text-base font-semibold hover-elevate ${
                  location === item.href ? "text-primary" : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="mt-2">
              <Button className="w-full font-semibold" data-testid="button-mobile-quote">
                Request Bulk Quote
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-sidebar text-sidebar-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-sidebar-foreground/70">
            Trusted wood charcoal suppliers and traders based in Andhra Pradesh,
            India. Quality supply, timely delivery and honest pricing for bulk
            and retail buyers.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={BUSINESS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-testid="link-footer-linkedin"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-sidebar-border hover-elevate"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              data-testid="link-footer-instagram"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-sidebar-border hover-elevate"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={BUSINESS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              data-testid="link-footer-facebook"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-sidebar-border hover-elevate"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={whatsappLink("Hello Pranay Traders, I would like to enquire about charcoal supply.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              data-testid="link-footer-whatsapp"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-sidebar-border hover-elevate"
            >
              <SiWhatsapp className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sidebar-foreground/75 hover:text-primary"
                  data-testid={`link-footer-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">
            Products
          </h4>
          <ul className="space-y-2.5 text-sm text-sidebar-foreground/75">
            <li>Wood Charcoal</li>
            <li>Bulk Charcoal Bags</li>
            <li>Restaurant / BBQ Charcoal</li>
            <li>Industrial Charcoal Supply</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">
            Get in Touch
          </h4>
          <ul className="space-y-3 text-sm text-sidebar-foreground/75">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href={`tel:${BUSINESS.phoneRaw}`} className="hover:text-primary">
                {BUSINESS.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div className="flex flex-col">
                <a
                  href={gmailComposeLink(
                    BUSINESS.emailPrimary,
                    "Charcoal Inquiry — Pranay Traders"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  {BUSINESS.emailPrimary}
                </a>
                <a
                  href={gmailComposeLink(
                    BUSINESS.emailSecondary,
                    "Charcoal Inquiry — Pranay Traders"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  {BUSINESS.emailSecondary}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {BUSINESS.location}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sidebar-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-sidebar-foreground/55 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Pranay Traders. All rights reserved.</p>
          <p>Wood Charcoal Suppliers · Andhra Pradesh, India</p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(
        "Hello Pranay Traders, I would like to enquire about charcoal supply."
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      data-testid="button-whatsapp-float"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <SiWhatsapp className="h-7 w-7" />
    </a>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
