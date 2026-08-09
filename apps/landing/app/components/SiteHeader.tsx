"use client";

import { usePathname, useRouter } from "next/navigation";
import { AnchorHTMLAttributes, MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { LanguageSwitcher, useLanguage } from "./LanguageProvider";
import { navigateWithTransition } from "./navigationTransition";

const serviceNav = [
  { label: "Inspection", href: "/services/inspection", note: "Visual & technical assessment" },
  { label: "Cleaning", href: "/services/cleaning", note: "Glass, facade & difficult access" },
  { label: "Maintenance", href: "/services/maintenance", note: "Sealant, leak & facade repair" },
  { label: "Painting & Blasting", href: "/services/painting-blasting", note: "Surface protection & coating" },
  { label: "Equipment Supplier", href: "/products", note: "Professional access & rescue gear" },
];

const trainingNav = [
  { label: "Schedule", href: "/training/schedule", note: "Upcoming 2026 batches" },
  { label: "TKPK", href: "/training/tkpk", note: "Tenaga Kerja Pada Ketinggian" },
  { label: "TKBT", href: "/training/tkbt", note: "Teknisi Akses Tali" },
  { label: "Confined Space", href: "/training/confined-space", note: "Entry, work & rescue" },
  { label: "Rescue Training", href: "/training/rescue-training", note: "High-angle team rescue" },
  { label: "Tree Climbing", href: "/training/tree-climbing", note: "Arborist access & positioning" },
  { label: "Registration", href: "/training/registration", note: "Register your interest" },
];

function withoutLocale(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && /^[a-z]{2}(?:-[a-z]{2})?$/.test(parts[0])) parts.shift();
  return `/${parts.join("/")}`;
}

function withLocale(href: string, language: string) {
  return `/${language}${href === "/" ? "" : href}`;
}

function ClientLink({ href, onClick, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }) {
  const router = useRouter();
  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target === "_blank") return;
    event.preventDefault();
    navigateWithTransition(href, router.push);
  };
  return <a {...props} href={href} onClick={navigate}>{children}</a>;
}

export function Brand({ inverse = false }: { inverse?: boolean }) {
  const { language } = useLanguage();
  return (
    <ClientLink className={`brand ${inverse ? "brand--inverse" : ""}`} href={withLocale("/", language)} aria-label="Pro Rope home">
      <span className="brand__logo" aria-hidden="true"><img src="/prorope-logo.jpg" alt="" /></span>
    </ClientLink>
  );
}

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const { language } = useLanguage();
  const pathname = withoutLocale(usePathname());
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"services" | "training" | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const closeAll = () => { setOpen(false); setOpenDropdown(null); };
  const href = (path: string) => withLocale(path, language);
  const active = (path: string, nested = false) => nested ? pathname === path || pathname.startsWith(`${path}/`) : pathname === path;

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const current = window.scrollY;
        const delta = current - lastScrollY.current;
        setScrolled(current > 16);
        if (current <= 120 || delta < -6) setHidden(false);
        else if (delta > 6 && !open) {
          setHidden(true);
          setOpenDropdown(null);
        }
        lastScrollY.current = current;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const showDropdown = (dropdown: "services" | "training") => {
    setHidden(false);
    setOpenDropdown(dropdown);
  };

  const hideDropdown = (dropdown: "services" | "training") => {
    setOpenDropdown(current => current === dropdown ? null : current);
  };

  const canHover = () => window.matchMedia("(min-width: 1001px) and (hover: hover)").matches;

  return (
    <header className={`site-header ${dark ? "site-header--dark" : ""} ${scrolled ? "is-scrolled" : ""} ${hidden ? "is-hidden" : ""}`}>
      <div className="header-topbar">
        <div className="shell header-topbar__inner">
          <div className="header-contact-links">
            <a href="https://wa.me/6282210401004" target="_blank" rel="noreferrer" aria-label="WhatsApp Faris di +62 822-1040-1004">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.45L3.5 20.5l1.4-4.25A8.5 8.5 0 1 1 20.5 11.7Z" /><path d="M8.2 7.65c.25-.3.58-.27.83-.08l1.16 1.48c.2.25.15.53-.03.78l-.58.73c-.16.2-.12.43 0 .64.54.94 1.3 1.7 2.24 2.25.22.12.45.16.65 0l.78-.62c.24-.2.52-.23.77-.04l1.42 1.08c.28.21.31.55.1.84-.48.66-1.23 1.05-2.05.95-1.67-.2-3.7-1.52-5.12-2.94-1.4-1.42-2.71-3.42-2.9-5.07-.1-.78.28-1.52.81-2Z" /></svg>
              <span>+62 822-1040-1004 <small>(Faris)</small></span>
            </a>
            <a href="mailto:contact@prorope.id" aria-label="Email contact@prorope.id">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
              <span>contact@prorope.id</span>
            </a>
          </div>
          <a className="header-instagram" href="https://www.instagram.com/prorope.services/" target="_blank" rel="noreferrer" aria-label="Instagram Pro Rope Services">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.25" /><circle cx="17.4" cy="6.7" r="1" className="instagram-dot" /></svg>
          </a>
        </div>
      </div>
      <div className="shell header-inner">
        <Brand inverse={dark} />
        <button className="menu-button" aria-label="Buka menu" aria-expanded={open} onClick={() => { setHidden(false); setOpen(!open); }}><span /><span /></button>
        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navigasi utama">
          <ClientLink className={active("/") ? "is-active" : ""} href={href("/")} onClick={closeAll}>Beranda</ClientLink>
          <ClientLink className={active("/about") ? "is-active" : ""} href={href("/about")} onClick={closeAll}>About</ClientLink>
          <div className={`nav-group ${active("/services", true) ? "is-active" : ""} ${openDropdown === "services" ? "is-open" : ""}`} onMouseEnter={() => { if (canHover()) showDropdown("services"); }} onMouseLeave={() => { if (canHover()) hideDropdown("services"); }}>
            <div className="nav-group__trigger">
              <ClientLink href={href("/services")} onClick={closeAll}>Services</ClientLink>
              <button aria-label="Buka menu Services" aria-expanded={openDropdown === "services"} aria-controls="services-dropdown" onClick={() => setOpenDropdown(openDropdown === "services" ? null : "services")}><span aria-hidden="true" /></button>
            </div>
            <div className="nav-dropdown" id="services-dropdown">
              <div className="nav-dropdown__head"><span>01</span><div><strong>Our Services</strong><small>Work safely at every height.</small></div></div>
              {serviceNav.map((item, index) => <ClientLink className={active(item.href) ? "is-active" : ""} key={item.href} href={href(item.href)} onClick={closeAll}><span>0{index + 1}</span><div><strong>{item.label}</strong><small>{item.note}</small></div><i>↗</i></ClientLink>)}
              <ClientLink className="nav-dropdown__all" href={href("/services")} onClick={closeAll}>Explore all services <span>→</span></ClientLink>
            </div>
          </div>
          <div className={`nav-group nav-group--training ${active("/training", true) ? "is-active" : ""} ${openDropdown === "training" ? "is-open" : ""}`} onMouseEnter={() => { if (canHover()) showDropdown("training"); }} onMouseLeave={() => { if (canHover()) hideDropdown("training"); }}>
            <div className="nav-group__trigger">
              <ClientLink href={href("/training")} onClick={closeAll}>Training</ClientLink>
              <button aria-label="Buka menu Training" aria-expanded={openDropdown === "training"} aria-controls="training-dropdown" onClick={() => setOpenDropdown(openDropdown === "training" ? null : "training")}><span aria-hidden="true" /></button>
            </div>
            <div className="nav-dropdown nav-dropdown--training" id="training-dropdown">
              <div className="nav-dropdown__head"><span>02</span><div><strong>Training Academy</strong><small>Competence for the real world.</small></div></div>
              {trainingNav.map((item, index) => <ClientLink className={active(item.href) ? "is-active" : ""} key={item.href} href={href(item.href)} onClick={closeAll}><span>0{index + 1}</span><div><strong>{item.label}</strong><small>{item.note}</small></div><i>↗</i></ClientLink>)}
              <ClientLink className="nav-dropdown__all" href={href("/training")} onClick={closeAll}>Explore all programs <span>→</span></ClientLink>
            </div>
          </div>
          <ClientLink className={active("/projects") ? "is-active" : ""} href={href("/projects")} onClick={closeAll}>Projects</ClientLink>
          <ClientLink className={active("/news", true) ? "is-active" : ""} href={href("/news")} onClick={closeAll}>News</ClientLink>
          <LanguageSwitcher />
          <a className="button button--small" href="https://wa.me/6282210401004" target="_blank" rel="noreferrer" onClick={closeAll}>Contact us</a>
        </nav>
      </div>
    </header>
  );
}
