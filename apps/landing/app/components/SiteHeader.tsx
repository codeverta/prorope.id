"use client";

import { usePathname, useRouter } from "next/navigation";
import { AnchorHTMLAttributes, MouseEvent, ReactNode, useState } from "react";
import { LanguageSwitcher, useLanguage } from "./LanguageProvider";

const serviceNav = [
  { label: "Inspection", href: "/services/inspection", note: "Visual & technical assessment" },
  { label: "Cleaning", href: "/services/cleaning", note: "Glass, facade & difficult access" },
  { label: "Maintenance", href: "/services/maintenance", note: "Sealant, leak & facade repair" },
  { label: "Painting & Blasting", href: "/services/painting-blasting", note: "Surface protection & coating" },
  { label: "Equipment Supplier", href: "/products", note: "Professional access & rescue gear" },
];

const trainingNav = [
  { label: "Schedule", href: "/training/schedule", note: "Upcoming 2026 batches" },
  { label: "Registration", href: "/training/registration", note: "Register your interest" },
  { label: "TKPK", href: "/training/tkpk", note: "Tenaga Kerja Pada Ketinggian" },
  { label: "TKBT", href: "/training/tkbt", note: "Teknisi Akses Tali" },
  { label: "Confined Space", href: "/training/confined-space", note: "Entry, work & rescue" },
  { label: "Rescue Training", href: "/training/rescue-training", note: "High-angle team rescue" },
  { label: "Tree Climbing", href: "/training/tree-climbing", note: "Arborist access & positioning" },
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
    router.push(href);
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
  const closeAll = () => { setOpen(false); setOpenDropdown(null); };
  const href = (path: string) => withLocale(path, language);
  const active = (path: string, nested = false) => nested ? pathname === path || pathname.startsWith(`${path}/`) : pathname === path;

  return (
    <header className={`site-header ${dark ? "site-header--dark" : ""}`}>
      <div className="shell header-inner">
        <Brand inverse={dark} />
        <button className="menu-button" aria-label="Buka menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navigasi utama">
          <ClientLink className={active("/about") ? "is-active" : ""} href={href("/about")} onClick={closeAll}>About</ClientLink>
          <div className={`nav-group ${active("/services", true) ? "is-active" : ""} ${openDropdown === "services" ? "is-open" : ""}`}>
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
          <div className={`nav-group nav-group--training ${active("/training", true) ? "is-active" : ""} ${openDropdown === "training" ? "is-open" : ""}`}>
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
          <a className="nav-instagram" href="https://www.instagram.com/prorope.services/" target="_blank" rel="noreferrer">Instagram ↗</a>
          <LanguageSwitcher />
          <ClientLink className={`button button--small ${active("/contact") ? "is-active" : ""}`} href={href("/contact")} onClick={closeAll}>Request a quote</ClientLink>
        </nav>
      </div>
    </header>
  );
}
